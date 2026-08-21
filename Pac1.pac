// ============================================================
// PUBG IPv6 ROTATION LOCK FINAL — FIXED INVITE
// Round-Robin Subnet Rotation (60s per subnet)
// 12 Subnets — Lobby(4) + Match(5)
// FIXED: Team Invite / Squad Join Issue
// ============================================================

var PROXY  = "PROXY 46.185.131.218:443";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 127.0.0.1:1";

// ================= 12 SUBNET DEFINITIONS =================

var SUBNETS = [
  { prefix: "2a00:18d8:0000:0000:0000:0000:0000:0000", len: 29 },
  { prefix: "2a01:9700:0000:0000:0000:0000:0000:0000", len: 29 },
  { prefix: "2a00:4620:0000:0000:0000:0000:0000:0000", len: 32 },
  { prefix: "2a05:7500:0000:0000:0000:0000:0000:0000", len: 29 },
  { prefix: "2a02:f0c0:0000:0000:0000:0000:0000:0000", len: 29 },
  { prefix: "2a03:6d00:0000:0000:0000:0000:0000:0000", len: 32 },
  { prefix: "2a03:b640:0000:0000:0000:0000:0000:0000", len: 32 },
  { prefix: "2a05:74c0:0000:0000:0000:0000:0000:0000", len: 29 },
  { prefix: "2a13:8d40:0000:0000:0000:0000:0000:0000", len: 29 },
  { prefix: "2a0d:3344:37c0:0000:0000:0000:0000:0000", len: 42 },
  { prefix: "2a00:18d0:0000:0000:0000:0000:0000:0000", len: 32 },
  { prefix: "2a02:25d8:0000:0000:0000:0000:0000:0000", len: 32 }
];

// ================= ROTATION STATE =================

var ROTATION = {
  index:     0,
  startTime: 0,
  duration:  60000
};

// ================= SESSION STATE =================

var SESSION = {
  lobbyNets: {},     // ← مصفوفة بدل قيمة واحدة (حل مشكلة الدعوات)
  matchNet:  null,
  matchActive: false
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

function matchIPv6Prefix(ipExpanded, prefixExpanded, prefixLen) {
  var ipGroups   = ipExpanded.split(":");
  var prefGroups = prefixExpanded.split(":");

  var fullGroups    = Math.floor(prefixLen / 16);
  var remainderBits = prefixLen % 16;

  for (var i = 0; i < fullGroups; i++) {
    if (ipGroups[i] !== prefGroups[i])
      return false;
  }

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

function getActiveSubnet() {
  var now = new Date().getTime();

  if (ROTATION.startTime === 0) {
    ROTATION.startTime = now;
  }

  var elapsed = now - ROTATION.startTime;

  if (elapsed >= ROTATION.duration) {
    var jumps          = Math.floor(elapsed / ROTATION.duration);
    ROTATION.index     = (ROTATION.index + jumps) % SUBNETS.length;
    ROTATION.startTime = ROTATION.startTime + jumps * ROTATION.duration;
  }

  return SUBNETS[ROTATION.index];
}

function isIPInActiveSubnet(ipExpanded) {
  var subnet = getActiveSubnet();
  return matchIPv6Prefix(ipExpanded, subnet.prefix, subnet.len);
}

// ================= PUBG DETECTION =================
// توسعة لتشمل خدمات الدعوات والشات

function isPUBG(host) {
  host = host.toLowerCase();
  return (
    host.indexOf("pubg")           !== -1 ||
    host.indexOf("tencent")        !== -1 ||
    host.indexOf("krafton")        !== -1 ||
    host.indexOf("levelinfinite")  !== -1 ||
    host.indexOf("lightspeed")     !== -1 ||
    host.indexOf("gpubgm")         !== -1 ||
    host.indexOf("igamecj")        !== -1 ||
    host.indexOf("gcloud")         !== -1 ||
    host.indexOf("qcloud")         !== -1 ||
    host.indexOf("tmgcloud")       !== -1 ||
    host.indexOf("sns")            !== -1 ||
    host.indexOf("im")             !== -1
  );
}

// ================= LOBBY =================
// توسعة الأنماط لتشمل الدعوات والقبول والانضمام

function isLobby(data) {
  return /lobby|login|auth|session|gateway|queue|profile|inventory|store|shop|event|mission|friends|party|team|settings|patch|update|cdn|download|invite|accept|join|social|friend|squad|group|clan|chat|msg|message|push|notify|notification|present|gift|exchange|rank|season|badge|title|crate|supply|rp|uc|bgmi/i
    .test(data);
}

// ================= MATCH =================

function isMatch(data) {
  return /match|battle|classic|ranked|arena|tdm|royale|war|payload|metro|zombie|gamesvr|relay|combat|survival|spectate|gameplay|ingame/i
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

// ================= LOBBY SESSION HANDLER =================
// يسمح بعدة خوادم لובי (لحل مشكلة الدعوات)

function handleLobby(net4) {
  var allowed = 5;  // الحد الأقصى لعدد خوادم اللובי المتزامنة

  // إذا الخادم مسجل مسبقاً → مسموح
  if (SESSION.lobbyNets[net4])
    return true;

  // عد الخوادم الحالية
  var count = 0;
  for (var k in SESSION.lobbyNets) {
    if (SESSION.lobbyNets.hasOwnProperty(k))
      count++;
  }

  // إذا لم نصل الحد → سجل الخادم الجديد
  if (count < allowed) {
    SESSION.lobbyNets[net4] = true;
    return true;
  }

  // وصلنا الحد → حظر
  return false;
}

// ================= MAIN ENGINE =================

function FindProxyForURL(url, host) {

  if (isPlainHostName(host))
    return DIRECT;

  if (!isPUBG(host))
    return DIRECT;

  var ip = dnsResolve(host);

  if (!ip)
    return PROXY;

  var fullIP = ip;

  if (isIPv6(ip))
    fullIP = expandIPv6(ip);

  if (!isIPv6(fullIP) || !isIPInActiveSubnet(fullIP))
    return BLOCK;

  var data  = (host + url).toLowerCase();
  var lobby = isLobby(data);
  var match = isMatch(data);

  var net4 = getNet4(fullIP);
  var net5 = getNet5(fullIP);

  // إعادة ضبط عند انتهاء الماتش
  if (!match && SESSION.matchActive) {
    SESSION.matchNet    = null;
    SESSION.matchActive = false;
  }

  // ===== LOBBY (4 segments) — يسمح بعدة خوادم =====
  if (lobby) {
    if (!handleLobby(net4))
      return BLOCK;
    return PROXY;
  }

  // ===== MATCH (5 segments) =====
  if (match) {
    if (!SESSION.matchNet) {
      SESSION.matchNet    = net5;
      SESSION.matchActive = true;
    }

    if (net5 !== SESSION.matchNet)
      return BLOCK;

    return PROXY;
  }

  return PROXY;
}
