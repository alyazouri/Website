// ============================================================
// PUBG IPv6 ROTATION LOCK FINAL
// Round-Robin Subnet Rotation (60s per subnet)
// 12 Subnets — Lobby(4) + Match(5)
// ============================================================

var PROXY  = "PROXY 46.185.131.170:8080";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 127.0.0.1:1";

// ================= 12 SUBNET DEFINITIONS =================

var SUBNETS = [
  { prefix: "2a01:9700:0000:0000:0000:0000:0000:0000", len: 29 },   // 0
  { prefix: "2a00:18d8:0000:0000:0000:0000:0000:0000", len: 29 },   // 1
  { prefix: "2a00:4620:0000:0000:0000:0000:0000:0000", len: 32 },   // 2
  { prefix: "2a05:7500:0000:0000:0000:0000:0000:0000", len: 29 },   // 3
  { prefix: "2a02:f0c0:0000:0000:0000:0000:0000:0000", len: 29 },   // 4
  { prefix: "2a03:6d00:0000:0000:0000:0000:0000:0000", len: 32 },   // 5
  { prefix: "2a03:b640:0000:0000:0000:0000:0000:0000", len: 32 },   // 6
  { prefix: "2a05:74c0:0000:0000:0000:0000:0000:0000", len: 29 },   // 7
  { prefix: "2a13:8d40:0000:0000:0000:0000:0000:0000", len: 29 },   // 8
  { prefix: "2a0d:3344:37c0:0000:0000:0000:0000:0000", len: 42 },   // 9
  { prefix: "2a00:18d0:0000:0000:0000:0000:0000:0000", len: 32 },   // 10
  { prefix: "2a02:25d8:0000:0000:0000:0000:0000:0000", len: 32 }    // 11
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

// ================= IPv6 CHECK =================

function isIPv6(ip) {
  return ip && ip.indexOf(":") !== -1;
}

// ================= EXPAND IPv6 =================

function expandIPv6(address) {
  if (!address || address.indexOf(":") === -1)
    return address;

  var parts = address.split("::");
  var full  = [];

  if (parts.length === 2) {
    var left    = parts[0] ? parts[0].split(":") : [];
    var right   = parts[1] ? parts[1].split(":") : [];
    var missing = 8 - (left.length + right.length);

    full = left;
    for (var i = 0; i < missing; i++)
      full.push("0000");
    full = full.concat(right);
  } else {
    full = address.split(":");
  }

  for (var j = 0; j < full.length; j++) {
    while (full[j].length < 4)
      full[j] = "0" + full[j];
  }

  return full.join(":").toLowerCase();
}

// ================= PREFIX MATCHING =================
// مطابقة العنوان مع الـ Prefix حسب طول الـ Subnet

function matchIPv6Prefix(ipExpanded, prefixExpanded, prefixLen) {
  var ipGroups   = ipExpanded.split(":");
  var prefGroups = prefixExpanded.split(":");

  var fullGroups    = Math.floor(prefixLen / 16);
  var remainderBits = prefixLen % 16;

  // مقارنة الـ Groups الكاملة
  for (var i = 0; i < fullGroups; i++) {
    if (ipGroups[i] !== prefGroups[i])
      return false;
  }

  // مقارنة الـ Bits المتبقية مع Mask
  if (remainderBits > 0) {
    var mask     = (0xFFFF << (16 - remainderBits)) & 0xFFFF;
    var ipVal    = parseInt(ipGroups[fullGroups], 16);
    var prefVal  = parseInt(prefGroups[fullGroups], 16);
    if ((ipVal & mask) !== (prefVal & mask))
      return false;
  }

  return true;
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

// ================= ACTIVE SUBNET CHECK =================
// هل العنوان يندرج تحت النطاق النشط حالياً؟

function isIPInActiveSubnet(ipExpanded) {
  var subnet = getActiveSubnet();
  return matchIPv6Prefix(ipExpanded, subnet.prefix, subnet.len);
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

function getNet4(ip) {
  var p = ip.split(":");
  return p[0] + ":" + p[1] + ":" + p[2] + ":" + p[3];
}

function getNet5(ip) {
  var p = ip.split(":");
  return p[0] + ":" + p[1] + ":" + p[2] + ":" + p[3] + ":" + p[4];
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

  // توسيع IPv6
  var fullIP = ip;
  if (isIPv6(ip))
    fullIP = expandIPv6(ip);

  // ===== فلترة النطاق النشط فقط =====
  // إذا العنوان IPv4 → يُحظر
  // إذا العنوان IPv6 لكن خارج النطاق النشط → يُحظر
  if (!isIPv6(fullIP) || !isIPInActiveSubnet(fullIP))
    return BLOCK;

  // تحليل نوع البيانات
  var data  = (host + url).toLowerCase();
  var lobby = isLobby(data);
  var match = isMatch(data);

  var net4 = getNet4(fullIP);
  var net5 = getNet5(fullIP);

  // إعادة ضبط عند انتهاء الماتش
  if (!match && SESSION.active) {
    SESSION.match  = null;
    SESSION.active = false;
  }

  // ===== LOBBY (4 segments) =====
  if (lobby) {
    if (!SESSION.lobby)
      SESSION.lobby = net4;

    if (net4 !== SESSION.lobby)
      return BLOCK;

    return PROXY;
  }

  // ===== MATCH (5 segments) =====
  if (match) {
    if (!SESSION.match) {
      SESSION.match  = net5;
      SESSION.active = true;
    }

    if (net5 !== SESSION.match)
      return BLOCK;

    return PROXY;
  }

  return PROXY;
}
