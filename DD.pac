/* =========================================================
   T | JORDAN TITANIUM CORE
   🎮 PUBG MOBILE — MAX DETECTION / STICKY ROUTING
   🇯🇴 Jordan Residential Priority
   🔒 Zero DIRECT
   ⚡ Fast PAC-compatible logic
   ========================================================= */


/* =========================================================
   🌐 PROXY DEFINITIONS
   ========================================================= */

var PROXY_A = "PROXY 85.159.217.18:80";
var PROXY_B = "PROXY 94.142.42.162:80";
var PROXY_C = "PROXY 92.253.92.171:80";


/* =========================================================
   ⚡ ULTRA HASH
   ========================================================= */

function ultraHash(str) {

  var h = 2166136261;

  for (var i = 0; i < str.length; i++) {

    h ^= str.charCodeAt(i);

    h +=
      (h << 1) +
      (h << 4) +
      (h << 7) +
      (h << 8) +
      (h << 24);
  }

  return h >>> 0;
}


/* =========================================================
   🇯🇴 JORDAN — PRIMARY RESIDENTIAL
   ========================================================= */

function isJordanResidential(host) {

  return (
    isInNet(host,"194.165.128.0","255.255.224.0") ||
    isInNet(host,"79.134.128.0","255.255.224.0") ||
    isInNet(host,"46.32.96.0","255.255.224.0") ||
    isInNet(host,"37.17.192.0","255.255.240.0") ||
    /* Orange / Residential */

    isInNet(host,"46.185.128.0","255.255.128.0") ||
    isInNet(host,"86.108.0.0","255.255.128.0") ||
    isInNet(host,"92.253.0.0","255.255.128.0") ||
    isInNet(host,"94.249.0.0","255.255.128.0") ||
    isInNet(host,"149.200.128.0","255.255.128.0") ||

    /* Jordan Residential */

    isInNet(host,"37.202.64.0","255.255.192.0") ||
    isInNet(host,"94.142.32.0","255.255.224.0") ||
    isInNet(host,"79.173.192.0","255.255.192.0") ||

    isInNet(host,"213.186.160.0","255.255.224.0") ||
    isInNet(host,"213.139.32.0","255.255.224.0") ||
    isInNet(host,"212.34.0.0","255.255.224.0") ||
    isInNet(host,"84.18.32.0","255.255.224.0") ||
    isInNet(host,"84.18.64.0","255.255.224.0") ||
    isInNet(host,"81.28.112.0","255.255.240.0")
  );
}


/* =========================================================
   🇯🇴 JORDAN — EXTENDED RESIDENTIAL
   ========================================================= */

function isJordanExtended(host) {

  return (

    isInNet(host,"176.28.128.0","255.255.128.0") ||
    isInNet(host,"109.107.224.0","255.255.224.0") ||
    isInNet(host,"109.237.192.0","255.255.240.0") ||

    isInNet(host,"95.141.208.0","255.255.240.0") ||
    isInNet(host,"95.172.192.0","255.255.224.0") ||

    isInNet(host,"91.106.96.0","255.255.240.0") ||
    isInNet(host,"93.93.144.0","255.255.248.0") ||
    isInNet(host,"93.95.200.0","255.255.248.0") ||
    isInNet(host,"94.127.208.0","255.255.248.0") ||

    isInNet(host,"176.57.0.0","255.255.224.0") ||
    isInNet(host,"178.20.184.0","255.255.248.0") ||

    isInNet(host,"37.17.192.0","255.255.240.0") ||
    isInNet(host,"37.44.32.0","255.255.248.0") ||
    isInNet(host,"37.75.144.0","255.255.248.0") ||
    isInNet(host,"37.123.64.0","255.255.224.0") ||

    isInNet(host,"46.23.112.0","255.255.240.0") ||
    isInNet(host,"46.248.192.0","255.255.224.0") ||

    isInNet(host,"87.236.232.0","255.255.248.0") ||
    isInNet(host,"87.238.128.0","255.255.248.0") ||
    isInNet(host,"89.28.216.0","255.255.248.0") ||
    isInNet(host,"89.38.152.0","255.255.254.0")
  );
}


/* =========================================================
   🇯🇴 JORDAN — SMALL RESIDENTIAL NETWORKS
   ========================================================= */

function isJordanSmallResidential(host) {

  return (

    isInNet(host,"62.72.161.0","255.255.255.0") ||
    isInNet(host,"62.72.162.0","255.255.255.0") ||
    isInNet(host,"62.72.165.0","255.255.255.0") ||
    isInNet(host,"62.72.166.0","255.255.255.0") ||

    isInNet(host,"62.72.168.0","255.255.252.0") ||

    isInNet(host,"62.72.174.0","255.255.255.0") ||
    isInNet(host,"62.72.176.0","255.255.255.0") ||
    isInNet(host,"62.72.179.0","255.255.255.0") ||
    isInNet(host,"62.72.180.0","255.255.255.0") ||

    isInNet(host,"62.72.184.0","255.255.252.0") ||
    isInNet(host,"62.72.191.0","255.255.255.0")
  );
}


/* =========================================================
   📊 JORDAN TIER
   ========================================================= */

function regionTier(host) {

  if (isJordanResidential(host)) {
    return 3;
  }

  if (isJordanSmallResidential(host)) {
    return 3;
  }

  if (isJordanExtended(host)) {
    return 2;
  }

  return 1;
}


/* =========================================================
   🎮 PUBG — DIRECT IDENTIFIERS
   ========================================================= */

function isPUBGDirect(s) {

  return (

    /(^|[.\-_])pubg([.\-_]|$)/.test(s) ||
    /(^|[.\-_])pubgm([.\-_]|$)/.test(s) ||
    /(^|[.\-_])pubgmobile([.\-_]|$)/.test(s) ||
    /(^|[.\-_])pubgsea([.\-_]|$)/.test(s) ||
    /(^|[.\-_])pubgkr([.\-_]|$)/.test(s) ||
    /(^|[.\-_])pubgcs([.\-_]|$)/.test(s)
  );
}


/* =========================================================
   🎮 PUBG — PUBLISHER / GAME ENGINE
   ========================================================= */

function isPUBGPublisher(s) {

  return (

    /(^|[.\-_])krafton([.\-_]|$)/.test(s) ||
    /(^|[.\-_])tencent([.\-_]|$)/.test(s) ||
    /(^|[.\-_])lightspeed([.\-_]|$)/.test(s) ||
    /(^|[.\-_])proximabeta([.\-_]|$)/.test(s) ||
    /(^|[.\-_])igame([.\-_]|$)/.test(s)
  );
}


/* =========================================================
   🎮 PUBG — CLOUD / INFRASTRUCTURE
   ========================================================= */

function isPUBGInfra(s) {

  return (

    /qcloud/.test(s) ||
    /myqcloud/.test(s) ||
    /tencentcs/.test(s) ||

    /amazonaws/.test(s) ||
    /aliyun/.test(s) ||
    /alibaba/.test(s) ||
    /cloudfront/.test(s)
  );
}


/* =========================================================
   🎮 PUBG — GAME SERVICES
   ========================================================= */

function isPUBGService(s) {

  return (

    /matchmaking/.test(s) ||
    /matchmaker/.test(s) ||
    /gameserver/.test(s) ||
    /game-server/.test(s) ||
    /gamesession/.test(s) ||
    /game-session/.test(s) ||

    /sessionserver/.test(s) ||
    /session-server/.test(s) ||

    /matchserver/.test(s) ||
    /match-server/.test(s) ||

    /dispatcher/.test(s) ||
    /allocation/.test(s)
  );
}


/* =========================================================
   🎮 PUBG — MAP / GAME MODE
   ========================================================= */

function isPUBGMode(s) {

  return (

    /erangel/.test(s) ||
    /livik/.test(s) ||
    /sanhok/.test(s) ||
    /miramar/.test(s) ||
    /vikendi/.test(s) ||
    /karakin/.test(s) ||
    /nusa/.test(s) ||

    /tdm/.test(s) ||
    /teamdeathmatch/.test(s) ||

    /payload/.test(s) ||
    /metroroyale/.test(s) ||
    /metro-royale/.test(s)
  );
}


/* =========================================================
   🎮 PUBG — API / SESSION
   ========================================================= */

function isPUBGAPI(u) {

  return (

    /(\/api\/|\/v1\/|\/v2\/|\/v3\/)/.test(u) &&

    /(game|match|session|battle|player|server|region)/.test(u)
  );
}


/* =========================================================
   🎮 PUBG — REGION / SERVER DISCOVERY
   ========================================================= */

function isPUBGServerDiscovery(s,u) {

  return (

    /(serverlist|server-list|serverlist|realm|routing)/.test(u) &&

    /(game|match|player|pubg|pubgm|tencent|krafton)/.test(s)
  );
}


/* =========================================================
   🎮 PUBG — UPDATE / RESOURCE
   ========================================================= */

function isPUBGResource(s,u) {

  return (

    /(patch|update|resource|asset|hotfix)/.test(u) &&

    /(pubg|pubgm|tencent|lightspeed|proximabeta|krafton)/.test(s)
  );
}


/* =========================================================
   🧠 PUBG — CONFIDENCE ENGINE
   ========================================================= */

function getPUBGScore(host,url) {

  var h = (host || "").toLowerCase();
  var u = (url || "").toLowerCase();

  h = h.replace(/^\.+|\.+$/g,"");
  u = u.replace(/[\r\n\t]/g,"");

  var s = h + " " + u;

  var score = 0;

  /* Direct PUBG */

  if (isPUBGDirect(s)) {
    score += 100;
  }

  /* Publisher */

  if (isPUBGPublisher(s)) {
    score += 85;
  }

  /* Game infrastructure */

  if (isPUBGInfra(s)) {
    score += 25;
  }

  /* Match / session infrastructure */

  if (isPUBGService(s)) {
    score += 70;
  }

  /* Game modes */

  if (isPUBGMode(s)) {
    score += 45;
  }

  /* API */

  if (isPUBGAPI(u)) {
    score += 35;
  }

  /* Server discovery */

  if (isPUBGServerDiscovery(s,u)) {
    score += 40;
  }

  /* Resources */

  if (isPUBGResource(s,u)) {
    score += 30;
  }

  /*
     Generic game keywords are intentionally weak.
     This prevents unrelated games from being routed.
  */

  if (
    /match/.test(s) &&
    /(game|session|battle|server)/.test(s)
  ) {
    score += 15;
  }

  if (
    /battle/.test(s) &&
    /(game|match|session|server)/.test(s)
  ) {
    score += 15;
  }

  return score;
}


/* =========================================================
   🏆 PUBG FINAL DETECTION
   ========================================================= */

function isPUBG(host,url) {

  /*
     60+ = strong confidence
  */

  return getPUBGScore(host,url) >= 60;
}


/* =========================================================
   🔒 STICKY CORE
   ========================================================= */

var LOCKED_CORE = null;


/* =========================================================
   🚀 CORE SELECTION
   ========================================================= */

function selectCore(host,url) {

  /*
     Once selected:
     NEVER switch during PAC lifetime.
  */

  if (LOCKED_CORE !== null) {
    return LOCKED_CORE;
  }


  var tier = regionTier(host);


  /* =======================================================
     🇯🇴 TIER 3 — PRIMARY JORDAN
     ======================================================= */

  if (tier === 3) {

    LOCKED_CORE = PROXY_A;

    return LOCKED_CORE;
  }


  /* =======================================================
     🇯🇴 TIER 2 — EXTENDED JORDAN
     ======================================================= */

  if (tier === 2) {

    LOCKED_CORE = PROXY_A;

    return LOCKED_CORE;
  }


  /* =======================================================
     🌍 UNKNOWN — DETERMINISTIC FALLBACK
     ======================================================= */

  var hash = ultraHash(
    host + "|" + url
  );

  var selector = hash % 3;


  if (selector === 0) {

    LOCKED_CORE = PROXY_A;

  } else if (selector === 1) {

    LOCKED_CORE = PROXY_B;

  } else {

    LOCKED_CORE = PROXY_C;
  }


  return LOCKED_CORE;
}


/* =========================================================
   🛡️ NON-PUBG ROUTING
   ========================================================= */

function selectNonPUBGCore() {

  /*
     Zero DIRECT.
     Primary proxy remains sticky.
  */

  return PROXY_A;
}


/* =========================================================
   🚀 MAIN PAC ENGINE
   ========================================================= */

function FindProxyForURL(url,host) {

  /*
     Normalize
  */

  host = host || "";
  url = url || "";


  /* =======================================================
     🎮 PUBG
     ======================================================= */

  if (isPUBG(host,url)) {

    return selectCore(host,url);
  }


  /* =======================================================
     🌐 EVERYTHING ELSE
     ======================================================= */

  return selectNonPUBGCore();
}
