/* =========================================================
   T | JORDAN TITANIUM ULTRA v2
   🎮 PUBG MOBILE — MAX JORDAN PRESENCE + ULTRA LOW PING
   🇯🇴 Zero Jitter / Sticky Jordan Core / Fastest Matchmaking
   🔒 Zero DIRECT — 100% Proxied
   ⚡ Optimized for Jordan Residential (IPv4 + IPv6)
   📌 Best paired with Orange/Umniah DNS for maximum local players
   ========================================================= */


/* =========================================================
   🌐 PROXY DEFINITIONS (Jordan Priority)
   ========================================================= */

var JORDAN_CORE   = "PROXY 85.159.217.18:80";   // Primary — Best for Jordan presence & low ping
var PROXY_B       = "PROXY 94.142.42.162:80";   // Fallback only
var PROXY_C       = "PROXY 92.253.92.171:80";   // Fallback only


/* =========================================================
   ⚡ ULTRA HASH (used only for non-PUBG)
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
   🇯🇴 JORDAN — PRIMARY RESIDENTIAL (IPv4) — EXPANDED
   ========================================================= */

function isJordanResidential(host) {
  return (
    isInNet(host,"194.165.128.0","255.255.224.0") ||
    isInNet(host,"79.134.128.0","255.255.224.0") ||
    isInNet(host,"46.32.96.0","255.255.224.0") ||
    isInNet(host,"37.17.192.0","255.255.240.0") ||

    /* Orange Jordan Residential (highest priority) */
    isInNet(host,"46.185.128.0","255.255.128.0") ||
    isInNet(host,"86.108.0.0","255.255.128.0") ||
    isInNet(host,"92.253.0.0","255.255.128.0") ||
    isInNet(host,"94.249.0.0","255.255.128.0") ||
    isInNet(host,"149.200.128.0","255.255.128.0") ||

    /* Umniah / Major Residential */
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
   🇯🇴 JORDAN — EXTENDED RESIDENTIAL (IPv4)
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
   🇯🇴 JORDAN — SMALL RESIDENTIAL NETWORKS (IPv4)
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
   🇯🇴 JORDAN — IPV6 RESIDENTIAL / ISP RANGES (Full)
   ========================================================= */

function isJordanIPv6(host) {
  return (
    /* Orange Jordan */
    isInNet(host,"2a01:9700::","ffff:ffe0:0000:0000:0000:0000:0000:0000") ||

    /* Umniah */
    isInNet(host,"2a00:4620::","ffff:ffff:0000:0000:0000:0000:0000:0000") ||
    isInNet(host,"2a05:7500::","ffff:ffe0:0000:0000:0000:0000:0000:0000") ||
    isInNet(host,"2a02:f0c0::","ffff:ffe0:0000:0000:0000:0000:0000:0000") ||
    isInNet(host,"2a03:6d00::","ffff:ffff:0000:0000:0000:0000:0000:0000") ||
    isInNet(host,"2a03:b640::","ffff:ffff:0000:0000:0000:0000:0000:0000") ||
    isInNet(host,"2a05:74c0::","ffff:ffe0:0000:0000:0000:0000:0000:0000") ||

    /* Zain Jordan / Fastlink */
    isInNet(host,"2a13:8d40::","ffff:ffe0:0000:0000:0000:0000:0000:0000") ||

    /* Starlink Jordan */
    isInNet(host,"2a0d:3344:37c0::","ffff:ffff:ffc0:0000:0000:0000:0000:0000") ||

    /* Blink */
    isInNet(host,"2a02:25d8::","ffff:ffff:0000:0000:0000:0000:0000:0000") ||

    /* DAMAMAX */
    isInNet(host,"2a00:18d0::","ffff:ffff:0000:0000:0000:0000:0000:0000")
  );
}


/* =========================================================
   📊 JORDAN TIER (Enhanced for PUBG)
   ========================================================= */

function regionTier(host) {
  if (isJordanResidential(host) || isJordanSmallResidential(host) || isJordanIPv6(host)) {
    return 3;   // Highest Jordan priority
  }
  if (isJordanExtended(host)) {
    return 2;
  }
  return 1;
}


/* =========================================================
   🎮 PUBG — ENHANCED DETECTION (More Aggressive + Faster)
   ========================================================= */

function isPUBGDirect(s) {
  return (
    /(^|[.\-_])pubg([.\-_]|$)/.test(s) ||
    /(^|[.\-_])pubgm([.\-_]|$)/.test(s) ||
    /(^|[.\-_])pubgmobile([.\-_]|$)/.test(s) ||
    /(^|[.\-_])pubgsea([.\-_]|$)/.test(s) ||
    /(^|[.\-_])pubgkr([.\-_]|$)/.test(s) ||
    /(^|[.\-_])pubgcs([.\-_]|$)/.test(s) ||
    /(^|[.\-_])battlegrounds?([.\-_]|$)/.test(s) ||
    /(^|[.\-_])royale([.\-_]|$)/.test(s)
  );
}

function isPUBGPublisher(s) {
  return (
    /(^|[.\-_])krafton([.\-_]|$)/.test(s) ||
    /(^|[.\-_])tencent([.\-_]|$)/.test(s) ||
    /(^|[.\-_])lightspeed([.\-_]|$)/.test(s) ||
    /(^|[.\-_])proximabeta([.\-_]|$)/.test(s) ||
    /(^|[.\-_])igame([.\-_]|$)/.test(s) ||
    /tencentgames/.test(s) ||
    /igamecj/.test(s)
  );
}

function isPUBGInfra(s) {
  return (
    /qcloud/.test(s) || /myqcloud/.test(s) || /tencentcs/.test(s) ||
    /amazonaws/.test(s) || /aliyun/.test(s) || /alibaba/.test(s) ||
    /cloudfront/.test(s) || /gcloud/.test(s)
  );
}

function isPUBGService(s) {
  return (
    /matchmaking/.test(s) || /matchmaker/.test(s) ||
    /gameserver/.test(s) || /game-server/.test(s) ||
    /gamesession/.test(s) || /game-session/.test(s) ||
    /sessionserver/.test(s) || /session-server/.test(s) ||
    /matchserver/.test(s) || /match-server/.test(s) ||
    /dispatcher/.test(s) || /allocation/.test(s) ||
    /lobby/.test(s) || /login/.test(s) || /auth/.test(s)
  );
}

function isPUBGMode(s) {
  return (
    /erangel/.test(s) || /livik/.test(s) || /sanhok/.test(s) ||
    /miramar/.test(s) || /vikendi/.test(s) || /karakin/.test(s) ||
    /nusa/.test(s) || /tdm/.test(s) || /teamdeathmatch/.test(s) ||
    /payload/.test(s) || /metroroyale/.test(s) || /metro-royale/.test(s)
  );
}

function isPUBGAPI(u) {
  return (
    /(\/api\/|\/v1\/|\/v2\/|\/v3\/|\/v4\/)/.test(u) &&
    /(game|match|session|battle|player|server|region|lobby)/.test(u)
  );
}

function isPUBGServerDiscovery(s,u) {
  return (
    /(serverlist|server-list|serverlist|realm|routing|region|me|asia|sg|hk)/.test(u) &&
    /(game|match|player|pubg|pubgm|tencent|krafton)/.test(s)
  );
}

function isPUBGResource(s,u) {
  return (
    /(patch|update|resource|asset|hotfix|cdn|download)/.test(u) &&
    /(pubg|pubgm|tencent|lightspeed|proximabeta|krafton)/.test(s)
  );
}


/* =========================================================
   🧠 ULTRA PUBG CONFIDENCE ENGINE (Faster + Stronger)
   ========================================================= */

function getPUBGScore(host,url) {
  var h = (host || "").toLowerCase();
  var u = (url || "").toLowerCase();

  h = h.replace(/^\.+|\.+$/g,"");
  u = u.replace(/[\r\n\t]/g,"");

  var s = h + " " + u;
  var score = 0;

  /* Direct PUBG — instant high score */
  if (isPUBGDirect(s)) score += 120;

  /* Publisher / Engine */
  if (isPUBGPublisher(s)) score += 90;

  /* Critical: Matchmaking & Services (fastest recruitment) */
  if (isPUBGService(s)) score += 85;

  /* Server discovery / Region routing (key for Jordan servers) */
  if (isPUBGServerDiscovery(s,u)) score += 75;

  /* Game modes */
  if (isPUBGMode(s)) score += 50;

  /* Infrastructure */
  if (isPUBGInfra(s)) score += 30;

  /* API calls */
  if (isPUBGAPI(u)) score += 40;

  /* Resources */
  if (isPUBGResource(s,u)) score += 35;

  /* Generic but strong game signals */
  if (/match/.test(s) && /(game|session|battle|server|lobby)/.test(s)) score += 25;
  if (/battle/.test(s) && /(game|match|session|server)/.test(s)) score += 25;
  if (/server|region|lobby/.test(s)) score += 20;

  /* Extra boost for ME / Asia / Jordan-friendly endpoints */
  if (/(me|asia|middleeast|jordan|sg|hk|sea)/.test(s + " " + u)) score += 15;

  return score;
}


/* =========================================================
   🏆 PUBG FINAL DETECTION (Lower threshold for speed)
   ========================================================= */

function isPUBG(host,url) {
  /*
     Threshold lowered to 55 for faster & more aggressive detection.
     Critical for fastest matchmaking and maximum Jordan routing.
  */
  return getPUBGScore(host,url) >= 55;
}


/* =========================================================
   🔒 ULTRA STICKY CORE — ZERO JITTER
   ========================================================= */

var LOCKED_CORE = null;
var PUBG_LOCKED = false;   // Extra strict lock for PUBG only


/* =========================================================
   🚀 CORE SELECTION — MAX JORDAN + ZERO FLUCTUATION
   ========================================================= */

function selectCore(host,url) {
  /*
     ULTRA STRICT RULES:
     - Once PUBG is detected → LOCKED to JORDAN_CORE forever
     - No more hash for PUBG traffic (eliminates jitter)
     - All PUBG goes through Jordan residential proxy
     - This maximizes Jordanian players + lowest consistent ping
  */

  if (PUBG_LOCKED && LOCKED_CORE !== null) {
    return LOCKED_CORE;
  }

  if (LOCKED_CORE !== null) {
    return LOCKED_CORE;
  }

  var tier = regionTier(host);

  /* =======================================================
     🇯🇴 PUBG TRAFFIC → ALWAYS JORDAN CORE (No exception)
     This is the key change for "more Jordanians + low ping + fast matchmaking"
     ======================================================= */
  if (isPUBG(host,url)) {
    PUBG_LOCKED = true;
    LOCKED_CORE = JORDAN_CORE;
    return LOCKED_CORE;
  }

  /* =======================================================
     🇯🇴 TIER 3 & 2 → JORDAN CORE (Non-PUBG)
     ======================================================= */
  if (tier === 3 || tier === 2) {
    LOCKED_CORE = JORDAN_CORE;
    return LOCKED_CORE;
  }

  /* =======================================================
     🌍 NON-PUBG UNKNOWN → Light hash (rarely used)
     ======================================================= */
  var hash = ultraHash(host + "|" + url);
  var selector = hash % 3;

  if (selector === 0) {
    LOCKED_CORE = JORDAN_CORE;
  } else if (selector === 1) {
    LOCKED_CORE = PROXY_B;
  } else {
    LOCKED_CORE = PROXY_C;
  }

  return LOCKED_CORE;
}


/* =========================================================
   🛡️ NON-PUBG ROUTING (Always prefer Jordan when possible)
   ========================================================= */

function selectNonPUBGCore() {
  /*
     Zero DIRECT.
     Everything non-PUBG still prefers Jordan Core for compatibility.
  */
  return JORDAN_CORE;
}


/* =========================================================
   🚀 MAIN PAC ENGINE — OPTIMIZED
   ========================================================= */

function FindProxyForURL(url,host) {
  host = (host || "").trim();
  url  = (url  || "").trim();

  /* Early exit for empty */
  if (!host) return JORDAN_CORE;

  /* =======================================================
     🎮 PUBG — Force Jordan Core immediately
     ======================================================= */
  if (isPUBG(host,url)) {
    return selectCore(host,url);
  }

  /* =======================================================
     🌐 EVERYTHING ELSE
     ======================================================= */
  return selectNonPUBGCore();
}
