// =========================================================
// 🇯🇴 PUBG MOBILE — JORDAN PAC ROUTING
// Clean Routing Version
// Traceroute / Anti-Cheat / Telemetry = DIRECT (Zero Interference)
// Foreign Match/Lobby = AGGRESSIVE BLOCK
// =========================================================

// ================= PROXIES =================
var MATCH_JO = "PROXY 46.185.131.218:20001";

var LOBBY_POOL = [
  "PROXY 212.35.66.45:8085",
  "PROXY 212.35.66.45:8181",
  "PROXY 46.185.131.218:443"
];

var BLOCK  = "PROXY 127.0.0.1:9"; // Blackhole for aggressive blocking
var DIRECT = "DIRECT";

// =========================================================
// 🇯🇴 STRICT JORDAN IPV4
// =========================================================
var JORDAN_REAL_CIDRs = [
  // AS9038 — Umniah
  ["46.248.192.0",  "255.255.224.0"], ["95.172.192.0",  "255.255.224.0"], ["109.107.224.0", "255.255.224.0"],
  ["37.220.112.0",  "255.255.240.0"], ["46.23.112.0",   "255.255.240.0"], ["46.248.208.0",  "255.255.240.0"],
  ["91.186.224.0",  "255.255.240.0"], ["92.241.32.0",   "255.255.240.0"], ["212.35.64.0",   "255.255.240.0"],
  ["212.35.80.0",   "255.255.240.0"], ["212.118.0.0",   "255.255.240.0"], ["212.118.16.0",  "255.255.240.0"],

  // AS8376 — Orange Jordan
  ["46.185.128.0",  "255.255.128.0"], ["86.108.0.0",    "255.255.128.0"], ["92.253.0.0",    "255.255.128.0"],
  ["94.249.0.0",    "255.255.128.0"], ["149.200.128.0", "255.255.128.0"], ["37.202.64.0",   "255.255.192.0"],
  ["79.173.192.0",  "255.255.192.0"], ["194.165.128.0", "255.255.224.0"]
];

// =========================================================
// SESSION
// =========================================================
var SESSION = { matchNet: null, matchHost: null, dnsCache: {} };

// =========================================================
// HELPERS
// =========================================================
function norm(h) {
  var i = h.indexOf(":");
  return i > -1 ? h.substring(0, i) : h;
}

function isInList(ip, list) {
  for (var i = 0; i < list.length; i++) {
    if (isInNet(ip, list[i][0], list[i][1])) return true;
  }
  return false;
}

function resolvePinned(host) {
  if (SESSION.dnsCache[host]) return SESSION.dnsCache[host];
  try {
    var ip = dnsResolve(host);
    if (ip) SESSION.dnsCache[host] = ip;
    return ip;
  } catch (e) { return null; }
}

function pickLobbyProxy(host) {
  var h = 0;
  for (var i = 0; i < host.length; i++) h = (h + host.charCodeAt(i)) % LOBBY_POOL.length;
  return LOBBY_POOL[h];
}

// =========================================================
// DETECTION FUNCTIONS
// =========================================================

// 1. كشف نطاقات ببجي الأساسية
function isPUBG(h, u) {
  var data = h + u;
  if (/pubg|tencent|krafton|lightspeed|levelinfinite|proximabeta|playfab|igamecj|gcloudcs|myqcloud|tpns|voovlive|trtc|dnspod|qcloud|tencent-cloud/i.test(data)) return true;
  if (/akamaized|cloudfront|fastly|edgekey|edgesuite|akadns|llnwd|footprint/i.test(h) && /pubg|tencent|krafton|patch|update|asset|download|pak|obb/i.test(u)) return true;
  return false;
}

// 2. 🚨 Traceroute / Anti-Cheat / Telemetry (مباشر بدون تداخل)
function isDirectTraffic(u, h) {
  return /anticheat|guard|security|tpns|log|report|trace|traceroute|analytics|beacon|crash|dump|telemetry|metric|ping|nettest|networktest|qos|latency|diag|diagnostics|icmp|echo/i.test(u + h);
}

// 3. خوادم اللعب
function isMatch(u, h) {
  return /match|battle|game|combat|realtime|sync|udp|tick|room|ingame|pvp|classic|ranked|arena|tdm|metro|royale|erangel|livik|miramar|sanhok|vikendi|deston|taego|karakin|nusa|rondo|relay|gamesvr|gameserver|fps/i.test(u + h);
}

// 4. اللوبي والمصادقة
function isLobby(u, h) {
  return /lobby|matchmaking|queue|dispatch|gateway|region|join|recruit|login|auth|profile|inventory|store|config|api|passport|account|oauth|token|session|user|data|event|shop|mall/i.test(u + h);
}

// 5. الدردشة الصوتية والاجتماعية
function isSocial(u, h) {
  return /friend|invite|squad|team|party|clan|presence|social|chat|msg|voip|rtc|voice|trtc|audio|mic|speaker|gcloud|ilb/i.test(u + h);
}

// 6. التحديثات والموارد
function isCDN(u, h) {
  return /cdn|asset|resource|patch|update|media|content|static|download|bundle|pak|obb|dl|res|img|video|vod/i.test(u + h);
}

// =========================================================
// MAIN PAC ROUTING
// =========================================================
function FindProxyForURL(url, host) {
  host = norm(host.toLowerCase());

  // 1. أي شيء غير PUBG يمر مباشرة
  if (!isPUBG(host, url)) return DIRECT;

  // 2. 🚨 Traceroute & Anti-Cheat & Telemetry -> DIRECT فوراً (بدون فحص IP وبدون بروكسي)
  // هذا يضمن عدم تداخل البروكسي مع حزم الحماية واختبارات الشبكة
  if (isDirectTraffic(url, host)) return DIRECT;

  // 3. جلب الـ IP
  var ip = resolvePinned(host);

  // 4. حظر IPv6 أو فشل DNS
  if (!ip || ip.indexOf(":") > -1) return BLOCK;

  // 5. 🚫 STRICT JORDAN CHECK (الحظر الشرس للسيرفرات الأجنبية)
  if (!isInList(ip, JORDAN_REAL_CIDRs)) return BLOCK;

  // =======================================================
  // MATCH (تثبيت الجلسة)
  // =======================================================
  if (isMatch(url, host)) {
    var parts = ip.split(".");
    var net24 = parts[0] + "." + parts[1] + "." + parts[2];

    if (!SESSION.matchNet) {
      SESSION.matchNet  = net24;
      SESSION.matchHost = host;
      return MATCH_JO;
    }

    if (net24 === SESSION.matchNet) return MATCH_JO;

    if (isInList(ip, JORDAN_REAL_CIDRs)) {
      SESSION.matchNet  = net24;
      SESSION.matchHost = host;
      return MATCH_JO;
    }

    return BLOCK;
  }

  // =======================================================
  // LOBBY / SOCIAL / VOIP / CDN
  // =======================================================
  if (isLobby(url, host) || isSocial(url, host) || isCDN(url, host)) {
    return pickLobbyProxy(host);
  }

  // =======================================================
  // FALLBACK
  // =======================================================
  return pickLobbyProxy(host);
}
