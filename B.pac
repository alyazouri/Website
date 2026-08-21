// ============================================================
// PUBG IPv4 ROTATION LOCK — FINAL (SOCKS5 Main + HTTP Failover)
// Round-Robin Subnet Rotation (60s per subnet)
// 26 Subnets (Jordan) — Lobby(/16) + Match(/24)  •  دورة كاملة = 26 دقيقة
// ============================================================

// ================= PROXY LIST =================

// البروكسي الرئيسي — SOCKS
// SOCKS5 أولاً، ثم SOCKS (SOCKS4) للتطبيقات القديمة التي لا تدعم كلمة SOCKS5
var SOCKS_MAIN = "SOCKS5 92.253.111.235:1080; SOCKS 92.253.111.235:1080";

var PROXY1 = "PROXY 46.185.131.170:8080";   // احتياطي HTTP أول
var PROXY2 = "PROXY 86.108.63.131:80";      // احتياطي HTTP ثاني

// السلسلة النهائية: SOCKS رئيسي ← HTTP احتياطي ← HTTP احتياطي
var PROXY  = SOCKS_MAIN + "; " + PROXY1 + "; " + PROXY2;

var DIRECT = "DIRECT";
var BLOCK  = "PROXY 127.0.0.1:1";

// ================= 26 SUBNET DEFINITIONS =================
// base = عنوان الشبكة   |   len = طول البادئة (CIDR)

var SUBNETS = [
  { base: "86.108.0.0",     len: 17 },   //  0  ADSL / فايبر — سكني رئيسي
  { base: "92.253.0.0",     len: 17 },   //  1  ADSL (LNS3) — سكني
  { base: "94.249.0.0",     len: 17 },   //  2  ADSL (LNS4) — سكني
  { base: "46.185.128.0",   len: 17 },   //  3
  { base: "149.200.128.0",  len: 17 },   //  4
  { base: "37.202.64.0",    len: 18 },   //  5
  { base: "79.173.192.0",   len: 18 },   //  6
  { base: "194.165.128.0",  len: 19 },   //  7
  { base: "79.134.128.0",   len: 19 },   //  8
  { base: "213.186.160.0",  len: 19 },   //  9  ADSL
  { base: "213.139.32.0",   len: 19 },   // 10
  { base: "212.34.0.0",     len: 19 },   // 11
  { base: "84.18.32.0",     len: 19 },   // 12
  { base: "84.18.64.0",     len: 19 },   // 13
  { base: "81.28.112.0",    len: 20 },   // 14
  { base: "62.72.161.0",    len: 24 },   // 15
  { base: "62.72.162.0",    len: 24 },   // 16
  { base: "62.72.165.0",    len: 24 },   // 17
  { base: "62.72.166.0",    len: 24 },   // 18
  { base: "62.72.168.0",    len: 22 },   // 19
  { base: "62.72.174.0",    len: 24 },   // 20
  { base: "62.72.176.0",    len: 24 },   // 21
  { base: "62.72.179.0",    len: 24 },   // 22
  { base: "62.72.180.0",    len: 24 },   // 23
  { base: "62.72.184.0",    len: 22 },   // 24
  { base: "62.72.191.0",    len: 24 }    // 25
];

// ================= ROTATION STATE =================

var ROTATION = {
  index:     0,
  startTime: 0,
  duration:  60000   // 60 ثانية لكل نطاق
};

// ================= SESSION STATE =================

var SESSION = {
  lobby:  null,
  match:  null,
  active: false
};

// ================= IPv4 CHECK =================
// التحقق أن النص عنوان IPv4 صالح (وليس IPv6 أو اسم مضيف)

function isIPv4(ip) {
  if (!ip || ip.indexOf(":") !== -1)
    return false;

  var p = ip.split(".");
  if (p.length !== 4)
    return false;

  for (var i = 0; i < 4; i++) {
    if (!/^\d{1,3}$/.test(p[i]))
      return false;
    var v = parseInt(p[i], 10);
    if (isNaN(v) || v < 0 || v > 255)
      return false;
  }

  return true;
}

// ================= IPv4 -> NUMBER =================
// استخدام الضرب بدل الإزاحة لتفادي مشاكل الإشارة في 32-bit

function ipToLong(ip) {
  var p = ip.split(".");
  return (parseInt(p[0], 10) * 16777216) +
         (parseInt(p[1], 10) * 65536)    +
         (parseInt(p[2], 10) * 256)      +
          parseInt(p[3], 10);
}

// ================= PREFIX MATCHING =================
// مطابقة العنوان مع النطاق حسب طول الـ CIDR

function matchIPv4Prefix(ip, base, prefixLen) {
  if (!isIPv4(ip) || !isIPv4(base))
    return false;

  var size  = Math.pow(2, 32 - prefixLen);   // عدد العناوين داخل النطاق
  var start = Math.floor(ipToLong(base) / size) * size;
  var end   = start + size;
  var val   = ipToLong(ip);

  return (val >= start && val < end);
}

// ================= ROTATION LOGIC =================
// التدوير الدائري — كل نطاق يشتغل 60 ثانية ثم ينتقل للتالي

function getActiveSubnet() {
  var now = new Date().getTime();

  // أول مرة — ابدأ العداد
  if (ROTATION.startTime === 0) {
    ROTATION.startTime = now;
  }

  var elapsed = now - ROTATION.startTime;

  // احسب كم فترة 60 ثانية مرت
  if (elapsed >= ROTATION.duration) {
    var jumps          = Math.floor(elapsed / ROTATION.duration);
    ROTATION.index     = (ROTATION.index + jumps) % SUBNETS.length;
    ROTATION.startTime = ROTATION.startTime + jumps * ROTATION.duration;
  }

  return SUBNETS[ROTATION.index];
}

// ================= PROXY SELECTION (اختياري) =================
// إذا أردت تبديل ترتيب البروكسيات مع كل نطاق بدل الترتيب الثابت:
// استبدل كل "return PROXY;" بـ "return getProxy();" وفعّل الدالة التالية.
//
// function getProxy() {
//   getActiveSubnet();                       // تحديث المؤشر
//   return (ROTATION.index % 2 === 0)
//     ? SOCKS_MAIN + "; " + PROXY1 + "; " + PROXY2
//     : SOCKS_MAIN + "; " + PROXY2 + "; " + PROXY1;
// }

// ================= ACTIVE SUBNET CHECK =================
// هل العنوان يندرج تحت النطاق النشط حالياً؟

function isIPInActiveSubnet(ip) {
  var subnet = getActiveSubnet();
  return matchIPv4Prefix(ip, subnet.base, subnet.len);
}

// ================= ANY SUBNET CHECK =================
// هل العنوان يندرج تحت أي نطاق من القائمة؟ (اختياري للتشخيص)

function isIPInAnySubnet(ip) {
  for (var i = 0; i < SUBNETS.length; i++) {
    if (matchIPv4Prefix(ip, SUBNETS[i].base, SUBNETS[i].len))
      return true;
  }
  return false;
}

// ================= PUBG DETECTION =================

function isPUBG(host) {
  host = host.toLowerCase();
  return (
    host.indexOf("pubg")           !== -1 ||
    host.indexOf("tencent")        !== -1 ||
    host.indexOf("krafton")        !== -1 ||
    host.indexOf("levelinfinite")  !== -1 ||
    host.indexOf("lightspeed")     !== -1
  );
}

// ================= LOBBY =================

function isLobby(data) {
  return /lobby|login|auth|session|gateway|queue|profile|inventory|store|shop|event|mission|friends|party|team|settings|patch|update|cdn|download/i
    .test(data);
}

// ================= MATCH =================

function isMatch(data) {
  return /match|battle|classic|ranked|arena|tdm|royale|war|payload|metro|zombie|gamesvr|relay|combat|survival|spectate/i
    .test(data);
}

// ================= NETWORK SEGMENTS =================
// Lobby يُقفل على /16 (أول خانتين)
// Match يُقفل على /24 (أول ثلاث خانات)

function getNet2(ip) {
  var p = ip.split(".");
  return p[0] + "." + p[1];
}

function getNet3(ip) {
  var p = ip.split(".");
  return p[0] + "." + p[1] + "." + p[2];
}

// ================= MAIN ENGINE =================

function FindProxyForURL(url, host) {

  // تجاهل النطاقات المحلية
  if (isPlainHostName(host))
    return DIRECT;

  // فقط PUBG
  if (!isPUBG(host))
    return DIRECT;

  // حل اسم المضيف
  var ip = dnsResolve(host);

  if (!ip)
    return PROXY;

  // ===== فلترة النطاق النشط فقط =====
  // إذا العنوان ليس IPv4 صالح → يُحظر
  // إذا العنوان IPv4 لكن خارج النطاق النشط → يُحظر
  if (!isIPv4(ip) || !isIPInActiveSubnet(ip))
    return BLOCK;

  // تحليل نوع البيانات
  var data  = (host + url).toLowerCase();
  var lobby = isLobby(data);
  var match = isMatch(data);

  var net2 = getNet2(ip);
  var net3 = getNet3(ip);

  // إعادة ضبط عند انتهاء الماتش
  if (!match && SESSION.active) {
    SESSION.match  = null;
    SESSION.active = false;
  }

  // ===== LOBBY (/16 lock) =====
  if (lobby) {
    if (!SESSION.lobby)
      SESSION.lobby = net2;

    if (net2 !== SESSION.lobby)
      return BLOCK;

    return PROXY;
  }

  // ===== MATCH (/24 lock) =====
  if (match) {
    if (!SESSION.match) {
      SESSION.match  = net3;
      SESSION.active = true;
    }

    if (net3 !== SESSION.match)
      return BLOCK;

    return PROXY;
  }

  return PROXY;
}
