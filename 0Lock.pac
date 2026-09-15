// =========================================================
// 🇯🇴 PUBG MOBILE — JORDAN PAC ROUTING
// Clean Routing Version
// Anti-Cheat / Telemetry classification removed
// =========================================================


// ================= PROXIES =================

var MATCH_JO = "PROXY 46.185.131.218:20001";

var LOBBY_POOL = [
  "PROXY 212.35.66.45:8085",
  "PROXY 212.35.66.45:8181",
  "PROXY 46.185.131.218:443"
];

var BLOCK  = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";


// =========================================================
// 🇯🇴 STRICT JORDAN IPV4
// =========================================================

var JORDAN_REAL_CIDRs = [

  // =======================================================
  // AS9038 — Umniah
  // =======================================================

  ["46.248.192.0",  "255.255.224.0"], // /19
  ["95.172.192.0",  "255.255.224.0"], // /19
  ["109.107.224.0", "255.255.224.0"], // /19

  ["37.220.112.0",  "255.255.240.0"], // /20
  ["46.23.112.0",   "255.255.240.0"], // /20
  ["46.248.208.0",  "255.255.240.0"], // /20
  ["91.186.224.0",  "255.255.240.0"], // /20
  ["92.241.32.0",   "255.255.240.0"], // /20

  ["212.35.64.0",   "255.255.240.0"], // /20
  ["212.35.80.0",   "255.255.240.0"], // /20

  ["212.118.0.0",   "255.255.240.0"], // /20
  ["212.118.16.0",  "255.255.240.0"], // /20


  // =======================================================
  // AS8376 — Orange Jordan
  // =======================================================

  ["46.185.128.0",  "255.255.128.0"], // /17
  ["86.108.0.0",    "255.255.128.0"], // /17
  ["92.253.0.0",    "255.255.128.0"], // /17
  ["94.249.0.0",    "255.255.128.0"], // /17
  ["149.200.128.0", "255.255.128.0"], // /17

  ["37.202.64.0",   "255.255.192.0"], // /18
  ["79.173.192.0",  "255.255.192.0"], // /18

  ["194.165.128.0", "255.255.224.0"]  // /19
];


// =========================================================
// SESSION
// =========================================================

var SESSION = {
  matchNet: null,
  matchHost: null,
  dnsCache: {}
};


// =========================================================
// HELPERS
// =========================================================

function norm(h) {
  var i = h.indexOf(":");

  if (i > -1)
    return h.substring(0, i);

  return h;
}


function isInList(ip, list) {

  for (var i = 0; i < list.length; i++) {

    if (isInNet(
      ip,
      list[i][0],
      list[i][1]
    )) {
      return true;
    }
  }

  return false;
}


function resolvePinned(host) {

  if (SESSION.dnsCache[host])
    return SESSION.dnsCache[host];

  try {

    var ip = dnsResolve(host);

    if (ip)
      SESSION.dnsCache[host] = ip;

    return ip;

  } catch (e) {

    return null;
  }
}


function pickLobbyProxy(host) {

  var h = 0;

  for (var i = 0; i < host.length; i++) {

    h =
      (h + host.charCodeAt(i))
      % LOBBY_POOL.length;
  }

  return LOBBY_POOL[h];
}


// =========================================================
// PUBG DETECTION
// =========================================================

function isPUBG(h, u) {

  var data = h + u;

  // -------------------------------------------------------
  // PUBG / Tencent / Krafton / Level Infinite
  // -------------------------------------------------------

  if (
    /pubg|
      tencent|
      krafton|
      lightspeed|
      levelinfinite|
      proximabeta|
      playfab|
      igamecj|
      gcloudcs|
      myqcloud|
      tpns|
      voovlive|
      trtc|
      dnspod|
      qcloud|
      tencent-cloud
    /ix.test(data)
  ) {
    return true;
  }


  // -------------------------------------------------------
  // CDN المرتبط بمحتوى اللعبة
  // -------------------------------------------------------

  if (
    /akamaized|
      cloudfront|
      fastly|
      edgekey|
      edgesuite|
      akadns|
      llnwd|
      footprint
    /ix.test(h)
    &&
    /pubg|
      tencent|
      krafton|
      patch|
      update|
      asset|
      download|
      pak|
      obb
    /ix.test(u)
  ) {
    return true;
  }

  return false;
}


// =========================================================
// MATCH DETECTION
// =========================================================

function isMatch(u, h) {

  return /match|
    battle|
    game|
    combat|
    realtime|
    sync|
    udp|
    tick|
    room|
    ingame|
    pvp|
    classic|
    ranked|
    arena|
    tdm|
    metro|
    royale|
    erangel|
    livik|
    miramar|
    sanhok|
    vikendi|
    deston|
    taego|
    karakin|
    nusa|
    rondo|
    relay|
    gamesvr|
    gameserver|
    fps|
    ping
  /ix.test(u + h);
}


// =========================================================
// LOBBY / AUTH
// =========================================================

function isLobby(u, h) {

  return /lobby|
    matchmaking|
    queue|
    dispatch|
    gateway|
    region|
    join|
    recruit|
    login|
    auth|
    profile|
    inventory|
    store|
    config|
    api|
    passport|
    account|
    oauth|
    token|
    session|
    user|
    data|
    event|
    shop|
    mall
  /ix.test(u + h);
}


// =========================================================
// SOCIAL / VOIP
// =========================================================

function isSocial(u, h) {

  return /friend|
    invite|
    squad|
    team|
    party|
    clan|
    presence|
    social|
    chat|
    msg|
    voip|
    rtc|
    voice|
    trtc|
    audio|
    mic|
    speaker|
    gcloud|
    ilb
  /ix.test(u + h);
}


// =========================================================
// CDN / GAME RESOURCES
// =========================================================

function isCDN(u, h) {

  return /cdn|
    asset|
    resource|
    patch|
    update|
    media|
    content|
    static|
    download|
    bundle|
    pak|
    obb|
    dl|
    res|
    img|
    video|
    vod
  /ix.test(u + h);
}


// =========================================================
// MAIN PAC ROUTING
// =========================================================

function FindProxyForURL(url, host) {

  // -------------------------------------------------------
  // Normalize host
  // -------------------------------------------------------

  host = norm(
    host.toLowerCase()
  );


  // -------------------------------------------------------
  // أي شيء غير PUBG = DIRECT
  // -------------------------------------------------------

  if (!isPUBG(host, url))
    return DIRECT;


  // -------------------------------------------------------
  // DNS resolution
  // -------------------------------------------------------

  var ip = resolvePinned(host);


  // -------------------------------------------------------
  // لا يوجد IPv4 صالح
  // -------------------------------------------------------

  if (!ip || ip.indexOf(":") > -1)
    return BLOCK;


  // -------------------------------------------------------
  // STRICT JORDAN CHECK
  // -------------------------------------------------------

  if (!isInList(
    ip,
    JORDAN_REAL_CIDRs
  )) {
    return BLOCK;
  }


  // =======================================================
  // MATCH
  // =======================================================

  if (isMatch(url, host)) {

    var parts = ip.split(".");

    var net24 =
      parts[0] + "." +
      parts[1] + "." +
      parts[2];


    // -----------------------------------------------------
    // أول Match
    // -----------------------------------------------------

    if (!SESSION.matchNet) {

      SESSION.matchNet  = net24;
      SESSION.matchHost = host;

      return MATCH_JO;
    }


    // -----------------------------------------------------
    // نفس /24
    // -----------------------------------------------------

    if (
      net24 === SESSION.matchNet
    ) {
      return MATCH_JO;
    }


    // -----------------------------------------------------
    // شبكة أردنية أخرى
    // -----------------------------------------------------

    if (
      isInList(
        ip,
        JORDAN_REAL_CIDRs
      )
    ) {

      SESSION.matchNet  = net24;
      SESSION.matchHost = host;

      return MATCH_JO;
    }


    return BLOCK;
  }


  // =======================================================
  // LOBBY / SOCIAL / VOIP / CDN
  // =======================================================

  if (
    isLobby(url, host) ||
    isSocial(url, host) ||
    isCDN(url, host)
  ) {

    return pickLobbyProxy(host);
  }


  // =======================================================
  // FALLBACK
  // =======================================================

  return pickLobbyProxy(host);
}
