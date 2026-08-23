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
var PROXY_B = "PROXY 85.159.217.18:443";
var PROXY_C = "PROXY 92.253.2.100:8080";


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
   🇯🇴 JORDAN — PRIMARY RESIDENTIAL (/17 إلى /19)
   ========================================================= */

function isJordanResidential(host) {

  return (
    isInNet(host,"84.18.32.0","255.255.224.0") ||
    isInNet(host,"37.202.64.0","255.255.192.0") ||
    isInNet(host,"92.253.0.0","255.255.128.0") ||
    isInNet(host,"46.32.96.0","255.255.224.0") ||
    isInNet(host,"91.186.224.0","255.255.224.0") ||
    isInNet(host,"176.57.0.0","255.255.224.0") ||
    isInNet(host,"212.35.64.0","255.255.224.0")
  );
}


/* =========================================================
   🇯🇴 JORDAN — EXTENDED RESIDENTIAL (/20 إلى /21)
   ========================================================= */

function isJordanExtended(host) {

  return (

    /* /20 */
    isInNet(host,"37.17.192.0","255.255.240.0") ||
    isInNet(host,"77.245.0.0","255.255.240.0") ||
    isInNet(host,"80.10.64.0","255.255.240.0") ||
    isInNet(host,"95.141.208.0","255.255.240.0") ||
    isInNet(host,"109.237.192.0","255.255.240.0") ||
    isInNet(host,"217.23.32.0","255.255.240.0") ||

    /* /21 */
    isInNet(host,"5.198.240.0","255.255.248.0") ||
    isInNet(host,"87.236.232.0","255.255.248.0") ||
    isInNet(host,"141.0.0.0","255.255.248.0") ||
    isInNet(host,"176.241.64.0","255.255.248.0") ||
    isInNet(host,"188.247.72.0","255.255.248.0")
  );
}


/* =========================================================
   🇯🇴 JORDAN — SMALL RESIDENTIAL NETWORKS (/22 إلى /32)
   ========================================================= */

function isJordanSmallResidential(host) {

  return (

    isInNet(host,"185.12.244.0","255.255.252.0") ||
    isInNet(host,"185.51.212.0","255.255.252.0") ||
    isInNet(host,"185.80.104.0","255.255.252.0") ||
    isInNet(host,"185.109.192.0","255.255.252.0") ||
    isInNet(host,"185.160.236.0","255.255.252.0") ||
    isInNet(host,"185.176.44.0","255.255.252.0") ||
    isInNet(host,"185.200.128.0","255.255.252.0") ||
    isInNet(host,"188.247.64.0","255.255.252.0") ||
    isInNet(host,"185.27.118.0","255.255.254.0") ||
    isInNet(host,"193.108.134.0","255.255.254.0") ||
    isInNet(host,"193.203.110.0","255.255.254.0") ||
    isInNet(host,"62.72.162.0","255.255.255.0") ||
    isInNet(host,"93.115.15.0","255.255.255.0") ||
    isInNet(host,"146.19.239.0","255.255.255.0") ||
    isInNet(host,"151.242.83.0","255.255.255.0") ||
    isInNet(host,"164.137.63.0","255.255.255.0") ||
    isInNet(host,"165.85.27.0","255.255.255.0") ||
    isInNet(host,"195.20.216.0","255.255.255.0") ||
    isInNet(host,"188.247.92.128","255.255.255.128") ||
    isInNet(host,"63.246.33.64","255.255.255.192") ||
    isInNet(host,"31.24.85.160","255.255.255.224") ||
    isInNet(host,"165.1.195.96","255.255.255.240") ||
    isInNet(host,"172.225.160.176","255.255.255.240") ||
    isInNet(host,"155.2.167.40","255.255.255.248") ||
    isInNet(host,"188.247.92.40","255.255.255.254") ||
    isInNet(host,"157.167.239.163","255.255.255.255") ||
    isInNet(host,"162.10.8.113","255.255.255.255") ||
    isInNet(host,"163.116.170.96","255.255.255.255") ||
    isInNet(host,"165.1.195.65","255.255.255.255")
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

    /(serverlist|server-list|realm|routing)/.test(u) &&

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

  if (isPUBGDirect(s)) {
    score += 100;
  }

  if (isPUBGPublisher(s)) {
    score += 85;
  }

  if (isPUBGInfra(s)) {
    score += 25;
  }

  if (isPUBGService(s)) {
    score += 70;
  }

  if (isPUBGMode(s)) {
    score += 45;
  }

  if (isPUBGAPI(u)) {
    score += 35;
  }

  if (isPUBGServerDiscovery(s,u)) {
    score += 40;
  }

  if (isPUBGResource(s,u)) {
    score += 30;
  }

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

  if (tier === 3) {

    LOCKED_CORE = PROXY_A;

    return LOCKED_CORE;
  }

  if (tier === 2) {

    LOCKED_CORE = PROXY_A;

    return LOCKED_CORE;
  }

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
