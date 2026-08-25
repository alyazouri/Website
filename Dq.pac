/* =========================================================
   T | JORDAN TITANIUM CORE
   🎮 PUBG MOBILE — MAX DETECTION / STICKY ROUTING
   🇯🇴 Jordan Residential Priority (UPDATED ASNs)
   🔒 Zero DIRECT
   ⚡ Fast PAC-compatible logic
   ========================================================= */

/* =========================================================
   🌐 PROXY DEFINITIONS
   ========================================================= */

var PROXY_A = "PROXY 85.159.217.18:80";
var PROXY_B = "PROXY 85.159.217.18:443";
var PROXY_C = "PROXY 92.253.2.100:8080";

/* =========================================================
   ⚡ ULTRA HASH
   ========================================================= */

function ultraHash(str) {
  var h = 2166136261;
  for (var i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return h >>> 0;
}

/* =========================================================
   🇯🇴 JORDAN — PRIMARY RESIDENTIAL (النطاقات الجديدة - TIER 3)
   ========================================================= */

function isJordanResidential(host) {
  return (
isInNet(host, "79.173.192.0", "255.255.192.0") ||
isInNet(host, "46.185.128.0", "255.255.128.0") ||
isInNet(host, "86.108.0.0", "255.255.128.0") ||
isInNet(host, "92.253.0.0", "255.255.128.0") ||
isInNet(host, "94.249.0.0", "255.255.128.0") ||
isInNet(host, "37.202.64.0", "255.255.192.0") ||
isInNet(host, "149.200.128.0", "255.255.128.0") ||
isInNet(host, "37.44.32.0", "255.255.248.0") ||
isInNet(host, "5.198.240.0", "255.255.248.0") ||
isInNet(host, "5.45.128.0", "255.255.240.0") ||
isInNet(host, "37.152.0.0", "255.255.248.0")
  );
}

/* =========================================================
   🇯🇴 JORDAN — EXTENDED RESIDENTIAL (TIER 2 - النطاقات الاحتياطية)
   ========================================================= */

function isJordanExtended(host) {
  return (
isInNet(host, "176.29.0.0", "255.255.0.0") ||
isInNet(host, "176.28.128.0", "255.255.128.0") ||
isInNet(host, "188.247.64.0", "255.255.252.0") ||
isInNet(host, "46.32.96.0", "255.255.224.0") ||
isInNet(host, "77.245.0.0", "255.255.240.0") ||
isInNet(host, "80.90.160.0", "255.255.240.0") ||
isInNet(host, "87.238.128.0", "255.255.248.0") ||
isInNet(host, "94.142.32.0", "255.255.224.0")
  );
}

/* =========================================================
   🇯🇴 JORDAN — SMALL RESIDENTIAL NETWORKS
   ========================================================= */

function isJordanSmallResidential(host) {
  return (
isInNet(host, "5.45.128.0", "255.255.240.0") ||
isInNet(host, "37.152.0.0", "255.255.248.0") ||
isInNet(host, "87.238.128.0", "255.255.248.0") ||
isInNet(host, "94.142.32.0", "255.255.224.0")
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

  if (isPUBGDirect(s)) score += 100;
  if (isPUBGPublisher(s)) score += 85;
  if (isPUBGInfra(s)) score += 25;
  if (isPUBGService(s)) score += 70;
  if (isPUBGMode(s)) score += 45;
  if (isPUBGAPI(u)) score += 35;
  if (isPUBGServerDiscovery(s,u)) score += 40;
  if (isPUBGResource(s,u)) score += 30;

  if (/match/.test(s) && /(game|session|battle|server)/.test(s)) score += 15;
  if (/battle/.test(s) && /(game|match|session|server)/.test(s)) score += 15;

  return score;
}

/* =========================================================
   🏆 PUBG FINAL DETECTION
   ========================================================= */

function isPUBG(host,url) {
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
  if (LOCKED_CORE !== null) {
    return LOCKED_CORE;
  }

  var tier = regionTier(host);

  /* 🇯🇴 TIER 3 — PRIMARY JORDAN (النطاقات المستبدلة) */
  if (tier === 3) {
    LOCKED_CORE = PROXY_A;
    return LOCKED_CORE;
  }

  /* 🇯🇴 TIER 2 — EXTENDED JORDAN */
  if (tier === 2) {
    LOCKED_CORE = PROXY_A;
    return LOCKED_CORE;
  }

  /* 🌍 UNKNOWN — DETERMINISTIC FALLBACK */
  var hash = ultraHash(host + "|" + url);
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
  return PROXY_A;
}

/* =========================================================
   🚀 MAIN PAC ENGINE
   ========================================================= */

function FindProxyForURL(url,host) {
  host = host || "";
  url = url || "";

  if (isPUBG(host,url)) {
    return selectCore(host,url);
  }

  return selectNonPUBGCore();
}
