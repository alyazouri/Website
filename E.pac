/* =========================================================
   T | JORDAN TITANIUM CORE V4 [ULTIMATE EDITION]
   🎮 PUBG MOBILE — MAX DETECTION / TRAFFIC SEPARATION
   🇯🇴 Jordan Residential Priority
   🔒 Zero DIRECT (Except Profile Pics)
   ⚡ DNS-Lag Prevention / WebView Offloading / Matchmaking Isolation
   ========================================================= */


/* =========================================================
   🌐 PROXY DEFINITIONS (Role-Based Routing)
   ========================================================= */
var PROXY_A = "PROXY 85.159.217.18:80";   // 🏆 GOLDEN: Gameplay, Matchmaking, API
var PROXY_B = "PROXY 85.159.217.18:443";  // 📦 SILVER: Lobby Assets, CDN, Updates
var PROXY_C = "PROXY 92.253.2.100:8080";  // 🗑️ DUMP: Telemetry, Ads, WebView, Social


/* =========================================================
   ⚡ ULTRA HASH (For Deterministic Fallback)
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
   🛡️ DNS-LAG PREVENTION (Crucial for Zero Stutter)
   ========================================================= */
function isIP(host) {
  /* 
     Only check isInNet if the host is a raw IP.
     Prevents silent DNS lookups that cause micro-stutters.
  */
  return /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(host);
}


/* =========================================================
   🇯🇴 JORDAN IP TIERS (Comprehensive Residential Check)
   ========================================================= */
function isJordanResidential(host) {
  return (
    isInNet(host,"46.32.96.0","255.255.224.0") || isInNet(host,"37.17.192.0","255.255.240.0") ||
    isInNet(host,"46.185.128.0","255.255.128.0") || isInNet(host,"86.108.0.0","255.255.128.0") ||
    isInNet(host,"92.253.0.0","255.255.128.0") || isInNet(host,"94.249.0.0","255.255.128.0") ||
    isInNet(host,"149.200.128.0","255.255.128.0") || isInNet(host,"37.202.64.0","255.255.192.0") ||
    isInNet(host,"94.142.32.0","255.255.224.0") || isInNet(host,"79.173.192.0","255.255.192.0") ||
    isInNet(host,"194.165.128.0","255.255.224.0") || isInNet(host,"79.134.128.0","255.255.224.0") ||
    isInNet(host,"213.186.160.0","255.255.224.0") || isInNet(host,"213.139.32.0","255.255.224.0") ||
    isInNet(host,"212.34.0.0","255.255.224.0") || isInNet(host,"84.18.32.0","255.255.224.0") ||
    isInNet(host,"84.18.64.0","255.255.224.0") || isInNet(host,"81.28.112.0","255.255.240.0")
  );
}

function isJordanExtended(host) {
  return (
    isInNet(host,"176.28.128.0","255.255.128.0") || isInNet(host,"109.107.224.0","255.255.224.0") ||
    isInNet(host,"109.237.192.0","255.255.240.0") || isInNet(host,"95.141.208.0","255.255.240.0") ||
    isInNet(host,"95.172.192.0","255.255.224.0") || isInNet(host,"91.106.96.0","255.255.240.0") ||
    isInNet(host,"93.93.144.0","255.255.248.0") || isInNet(host,"93.95.200.0","255.255.248.0") ||
    isInNet(host,"94.127.208.0","255.255.248.0") || isInNet(host,"176.57.0.0","255.255.224.0") ||
    isInNet(host,"178.20.184.0","255.255.248.0") || isInNet(host,"37.17.192.0","255.255.240.0") ||
    isInNet(host,"37.44.32.0","255.255.248.0") || isInNet(host,"37.75.144.0","255.255.248.0") ||
    isInNet(host,"37.123.64.0","255.255.224.0") || isInNet(host,"46.23.112.0","255.255.240.0") ||
    isInNet(host,"46.248.192.0","255.255.224.0") || isInNet(host,"87.236.232.0","255.255.248.0") ||
    isInNet(host,"87.238.128.0","255.255.248.0") || isInNet(host,"89.28.216.0","255.255.248.0") ||
    isInNet(host,"89.38.152.0","255.255.254.0")
  );
}

function isJordanSmallResidential(host) {
  return (
    isInNet(host,"62.72.161.0","255.255.255.0") || isInNet(host,"62.72.162.0","255.255.255.0") ||
    isInNet(host,"62.72.165.0","255.255.255.0") || isInNet(host,"62.72.166.0","255.255.255.0") ||
    isInNet(host,"62.72.168.0","255.255.252.0") || isInNet(host,"62.72.174.0","255.255.255.0") ||
    isInNet(host,"62.72.176.0","255.255.255.0") || isInNet(host,"62.72.179.0","255.255.255.0") ||
    isInNet(host,"62.72.180.0","255.255.255.0") || isInNet(host,"62.72.184.0","255.255.252.0") ||
    isInNet(host,"62.72.191.0","255.255.255.0")
  );
}

function regionTier(host) {
  if (isJordanResidential(host) || isJordanSmallResidential(host)) return 3;
  if (isJordanExtended(host)) return 2;
  return 1;
}


/* =========================================================
   🖼️ PLAYER PROFILE PICTURES — EXCLUSION (DIRECT)
   ========================================================= */
function isPlayerProfilePicture(url) {
  var u = url.toLowerCase();
  return (
    u.indexOf("/avatar/") != -1 || u.indexOf("/headicon/") != -1 || 
    u.indexOf("/profilepic") != -1 || u.indexOf("/playerpic") != -1 || 
    u.indexOf("/face/") != -1 || u.indexOf("/portrait/") != -1 ||
    u.indexOf("/roleicon/") != -1 || u.indexOf("/charactericon/") != -1
  );
}


/* =========================================================
   🗑️ TELEMETRY / ADS / WEBVIEW / BLOATWARE (Offload to DUMP)
   ========================================================= */
function isPUBGBloatware(s) {
  return (
    /telemetry/.test(s) || /log[.-]/.test(s) || /tracking/.test(s) || 
    /report/.test(s) || /beacon/.test(s) || /analytics/.test(s) || 
    /ads?([.\-_]|$)/.test(s) || /advert/.test(s) || /promotion/.test(s) ||
    /webview/.test(s) || /browser/.test(s) || /facebook/.test(s) || 
    /tiktok/.test(s) || /twitter/.test(s) || /instagram/.test(s) ||
    /snapchat/.test(s) || /youtube\.com/.test(s)
  );
}


/* =========================================================
   📦 LOBBY ASSETS / CDN / UPDATES (Offload to SILVER)
   ========================================================= */
function isPUBLobbyAsset(s, u) {
  return (
    /(patch|update|resource|asset|hotfix|cdn|static|media|lobby)/.test(u) &&
    /(pubg|pubgm|tencent|lightspeed|proximabeta|krafton|qcloud|aliyun|myqcloud)/.test(s)
  );
}


/* =========================================================
   🎮 PUBG — MAX DETECTION ENGINE
   ========================================================= */
function isPUBGDirect(s) {
  return (/(^|[.\-_])pubg([.\-_]|$)/.test(s) || /(^|[.\-_])pubgm([.\-_]|$)/.test(s) || 
          /(^|[.\-_])pubgmobile([.\-_]|$)/.test(s) || /(^|[.\-_])pubgsea([.\-_]|$)/.test(s));
}

function isPUBGPublisher(s) {
  return (/(^|[.\-_])krafton([.\-_]|$)/.test(s) || /(^|[.\-_])tencent([.\-_]|$)/.test(s) || 
          /(^|[.\-_])lightspeed([.\-_]|$)/.test(s) || /(^|[.\-_])proximabeta([.\-_]|$)/.test(s));
}

function isPUBGInfra(s) {
  return (/qcloud/.test(s) || /myqcloud/.test(s) || /tencentcs/.test(s) || 
          /amazonaws/.test(s) || /aliyun/.test(s) || /alibaba/.test(s) || /cloudfront/.test(s));
}

function isPUBGService(s) {
  return (/matchmaking/.test(s) || /matchmaker/.test(s) || /gameserver/.test(s) || 
          /sessionserver/.test(s) || /dispatcher/.test(s) || /allocation/.test(s));
}

function isPUBGMode(s) {
  return (/erangel/.test(s) || /livik/.test(s) || /sanhok/.test(s) || /miramar/.test(s) || 
          /vikendi/.test(s) || /karakin/.test(s) || /nusa/.test(s) || /metroroyale/.test(s));
}

function getPUBGScore(host, url) {
  var h = host.toLowerCase();
  var u = url.toLowerCase();
  var s = h + " " + u;
  var score = 0;

  if (isPUBGDirect(s)) score += 100;
  if (isPUBGPublisher(s)) score += 85;
  if (isPUBGService(s)) score += 70;
  if (isPUBGMode(s)) score += 45;
  if (isPUBGInfra(s)) score += 25;
  
  // API / Session check
  if (/(\/api\/|\/v1\/|\/v2\/)/.test(u) && /(game|match|session|battle|player)/.test(u)) score += 35;
  
  // Resource check
  if (/(patch|update|resource|asset)/.test(u) && /(pubg|tencent|krafton)/.test(s)) score += 30;

  return score;
}

function isPUBG(host, url) {
  return getPUBGScore(host, url) >= 60;
}


/* =========================================================
   🔒 SMART STICKY CORE (Gameplay & Matchmaking)
   ========================================================= */
var LOCKED_GAME_CORE = null;

function selectGameCore(host) {
  if (LOCKED_GAME_CORE !== null) return LOCKED_GAME_CORE;

  // Only check IP tiers if host is actually an IP (Prevents DNS Lag)
  if (isIP(host)) {
    var tier = regionTier(host);
    if (tier >= 2) {
      LOCKED_GAME_CORE = PROXY_A;
      return LOCKED_GAME_CORE;
    }
  }

  // Fallback deterministic selection for domains/unknown IPs
  var hash = ultraHash(host);
  LOCKED_GAME_CORE = (hash % 3 === 0) ? PROXY_A : (hash % 3 === 1) ? PROXY_B : PROXY_C;
  return LOCKED_GAME_CORE;
}


/* =========================================================
   🚀 MAIN PAC ENGINE (V4 Ultimate Architecture)
   ========================================================= */
function FindProxyForURL(url, host) {
  host = host || "";
  url = url || "";
  var s = (host + " " + url).toLowerCase();

  // 1️⃣ 🖼️ PROFILE PICTURES -> DIRECT (User Request)
  if (isPlayerProfilePicture(url)) {
    return "DIRECT";
  }

  // 2️⃣ 🗑️ BLOATWARE / TELEMETRY / WEBVIEW -> DUMP (PROXY_C)
  // Keeps the game network 100% clean from background noise and social media trackers
  if (isPUBGBloatware(s)) {
    return PROXY_C;
  }

  // 3️⃣ 📦 LOBBY / CDN / UPDATES -> SILVER (PROXY_B)
  // Speeds up lobby loading without clogging the gameplay pipe
  if (isPUBLobbyAsset(host, url)) {
    return PROXY_B;
  }

  // 4️⃣ 🎮 PUBG DETECTION & ROUTING
  if (isPUBG(host, url)) {
    
    // ⚡ MATCHMAKING ISOLATION: Force Golden Proxy for API/Matchmaking
    // Ensures lowest ping and fastest queue times
    if (/(\/matchmaking\/|\/matchmaker\/|\/api\/.*match|\/dispatcher\/|\/allocation\/)/.test(url)) {
      return LOCKED_GAME_CORE || PROXY_A;
    }

    // 🏆 CORE GAMEPLAY -> GOLDEN (PROXY_A)
    return selectGameCore(host);
  }

  // 5️⃣ 🌐 EVERYTHING ELSE -> GOLDEN (PROXY_A)
  // Zero DIRECT policy for non-game traffic
  return PROXY_A;
}
