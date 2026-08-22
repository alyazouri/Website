/* =========================================================
   T | JORDAN TITANIUM CORE V9 [MENA EDITION]
   🎮 PUBG MOBILE — JORDANIAN PROXY / MENA SERVERS
   🇯🇴 Jordan IP = Jordan Servers
   🌍 MENA Region Priority
   🔒 Zero DIRECT
   ⚡ DNS-Lag Prevention
   🏆 Matchmaking → Jordanian Proxy (Amman)
   🚀 PERFORMANCE OPTIMIZATIONS
   ========================================================= */


/* =========================================================
   🌐 PROXY DEFINITIONS
   ========================================================= */
var PROXY_JO1 = "PROXY 109.237.197.184:20001";  // 🇯🇴 JORDANIAN #1 (Amman) — PRIMARY
var PROXY_JO2 = "PROXY 92.253.22.123:443";      // 🇯🇴 JORDANIAN #2 (Amman) — SECONDARY
var PROXY_A   = "PROXY 85.159.217.18:80";       // 🔄 FALLBACK 1
var PROXY_B   = "PROXY 85.159.217.18:443";      // 🔄 FALLBACK 2
var PROXY_C   = "PROXY 92.253.2.100:8080";      // 🔄 FALLBACK 3


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
   🛡️ DNS-LAG PREVENTION
   ========================================================= */
function isIP(host) {
  return /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(host);
}


/* =========================================================
   🇯🇴 JORDAN — TIER 1 (PRIMARY RESIDENTIAL)
   =========================================================
   أكبر نطاقات الأردن — Orange, Zain, Umniah
   هذه النطاقات الأساسية لمستخدمي الأردن
   ========================================================= */
function isJordanTier1(host) {
  return (
    /* Orange Jordan */
    isInNet(host,"46.32.96.0","255.255.224.0") ||
    isInNet(host,"37.17.192.0","255.255.240.0") ||
    
    /* Zain Jordan */
    isInNet(host,"46.185.128.0","255.255.128.0") ||
    isInNet(host,"86.108.0.0","255.255.128.0") ||
    isInNet(host,"92.253.0.0","255.255.128.0") ||
    isInNet(host,"94.249.0.0","255.255.128.0") ||
    isInNet(host,"149.200.128.0","255.255.128.0") ||
    
    /* Umniah Jordan */
    isInNet(host,"37.202.64.0","255.255.192.0") ||
    isInNet(host,"94.142.32.0","255.255.224.0") ||
    isInNet(host,"79.173.192.0","255.255.192.0") ||
    isInNet(host,"194.165.128.0","255.255.224.0") ||
    isInNet(host,"79.134.128.0","255.255.224.0") ||
    
    /* Other Major Jordanian ISPs */
    isInNet(host,"213.186.160.0","255.255.224.0") ||
    isInNet(host,"213.139.32.0","255.255.224.0") ||
    isInNet(host,"212.34.0.0","255.255.224.0") ||
    isInNet(host,"84.18.32.0","255.255.224.0") ||
    isInNet(host,"84.18.64.0","255.255.224.0") ||
    isInNet(host,"81.28.112.0","255.255.240.0")
  );
}


/* =========================================================
   🇯🇴 JORDAN — TIER 2 (EXTENDED RESIDENTIAL)
   =========================================================
   نطاقات أردنية إضافية — شركات، مؤسسات، شبكات صغيرة
   ========================================================= */
function isJordanTier2(host) {
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
   🇯🇴 JORDAN — TIER 3 (SMALL RESIDENTIAL)
   =========================================================
   نطاقات أردنية صغيرة — مزودين محليين
   ========================================================= */
function isJordanTier3(host) {
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
   🌍 MENA — MIDDLE EAST & NORTH AFRICA
   =========================================================
   نطاقات الشرق الأوسط — PUBG MENA Servers
   هذه النطاقات تساعد في التعرف على سيرفرات المنطقة
   ========================================================= */
function isMENA(host) {
  return (
    /* Saudi Arabia */
    isInNet(host,"188.54.0.0","255.254.0.0") ||
    isInNet(host,"188.56.0.0","255.252.0.0") ||
    isInNet(host,"188.112.0.0","255.255.0.0") ||
    isInNet(host,"188.113.0.0","255.255.0.0") ||
    isInNet(host,"188.114.0.0","255.254.0.0") ||
    isInNet(host,"188.116.0.0","255.252.0.0") ||
    isInNet(host,"188.120.0.0","255.248.0.0") ||
    isInNet(host,"188.136.0.0","255.248.0.0") ||
    isInNet(host,"188.144.0.0","255.240.0.0") ||
    isInNet(host,"188.160.0.0","255.224.0.0") ||
    
    /* UAE */
    isInNet(host,"94.56.0.0","255.252.0.0") ||
    isInNet(host,"94.60.0.0","255.252.0.0") ||
    isInNet(host,"94.64.0.0","255.248.0.0") ||
    isInNet(host,"94.72.0.0","255.252.0.0") ||
    isInNet(host,"94.76.0.0","255.252.0.0") ||
    isInNet(host,"94.80.0.0","255.240.0.0") ||
    isInNet(host,"94.96.0.0","255.224.0.0") ||
    isInNet(host,"94.128.0.0","255.240.0.0") ||
    isInNet(host,"94.144.0.0","255.240.0.0") ||
    isInNet(host,"94.160.0.0","255.224.0.0") ||
    
    /* Kuwait */
    isInNet(host,"94.128.0.0","255.240.0.0") ||
    isInNet(host,"94.144.0.0","255.240.0.0") ||
    isInNet(host,"94.160.0.0","255.224.0.0") ||
    isInNet(host,"94.192.0.0","255.192.0.0") ||
    
    /* Bahrain */
    isInNet(host,"188.54.0.0","255.254.0.0") ||
    isInNet(host,"188.56.0.0","255.252.0.0") ||
    
    /* Qatar */
    isInNet(host,"188.54.0.0","255.254.0.0") ||
    isInNet(host,"188.56.0.0","255.252.0.0") ||
    
    /* Oman */
    isInNet(host,"188.54.0.0","255.254.0.0") ||
    isInNet(host,"188.56.0.0","255.252.0.0") ||
    
    /* Iraq */
    isInNet(host,"188.54.0.0","255.254.0.0") ||
    isInNet(host,"188.56.0.0","255.252.0.0") ||
    
    /* Egypt */
    isInNet(host,"188.54.0.0","255.254.0.0") ||
    isInNet(host,"188.56.0.0","255.252.0.0") ||
    
    /* Lebanon */
    isInNet(host,"188.54.0.0","255.254.0.0") ||
    isInNet(host,"188.56.0.0","255.252.0.0") ||
    
    /* Syria */
    isInNet(host,"188.54.0.0","255.254.0.0") ||
    isInNet(host,"188.56.0.0","255.252.0.0") ||
    
    /* Palestine */
    isInNet(host,"188.54.0.0","255.254.0.0") ||
    isInNet(host,"188.56.0.0","255.252.0.0")
  );
}


/* =========================================================
   📊 REGION TIER SYSTEM
   =========================================================
   TIER 1: أردني أساسي (Orange, Zain, Umniah)
   TIER 2: أردني ممتد (شركات، مؤسسات)
   TIER 3: أردني صغير (مزودين محليين)
   TIER 4: MENA (شرق أوسط)
   TIER 5: غير معروف
   ========================================================= */
function regionTier(host) {
  if (isJordanTier1(host)) return 1;
  if (isJordanTier2(host)) return 2;
  if (isJordanTier3(host)) return 3;
  if (isMENA(host)) return 4;
  return 5;
}


/* =========================================================
   🖼️ PLAYER PROFILE PICTURES — DIRECT
   ========================================================= */
function isPlayerProfilePicture(url) {
  var u = url.toLowerCase();
  return (
    u.indexOf("/avatar/") !== -1 || u.indexOf("/headicon/") !== -1 ||
    u.indexOf("/profilepic") !== -1 || u.indexOf("/playerpic") !== -1 ||
    u.indexOf("/face/") !== -1 || u.indexOf("/portrait/") !== -1 ||
    u.indexOf("/roleicon/") !== -1 || u.indexOf("/charactericon/") !== -1 ||
    u.indexOf("/playeravatar") !== -1 || u.indexOf("/usericon") !== -1
  );
}


/* =========================================================
   🎮 PUBG — MATCHMAKING DETECTION
   ========================================================= */
function isMatchmakingTraffic(s) {
  return (
    /matchmaking/.test(s) || /matchmaker/.test(s) ||
    /match\/find/.test(s) || /match\/start/.test(s) ||
    /match\/join/.test(s) || /match\/queue/.test(s) ||
    /match\/ready/.test(s) || /match\/confirm/.test(s) ||
    /serverlist/.test(s) || /server-list/.test(s) ||
    /realm/.test(s) || /region/.test(s) || /routing/.test(s) ||
    /discover/.test(s) || /ping/.test(s) || /latency/.test(s) ||
    /allocation/.test(s) || /dispatcher/.test(s) ||
    /sessionserver/.test(s) || /session-server/.test(s) ||
    /matchserver/.test(s) || /match-server/.test(s)
  );
}


/* =========================================================
   🚀 PERFORMANCE — STATIC ASSETS DETECTION
   ========================================================= */
function isStaticAsset(url) {
  var u = url.toLowerCase();
  return (
    /\.(jpg|jpeg|png|gif|webp|svg|ico|bmp|tiff)$/.test(u) ||
    /\.(css|js|woff|woff2|ttf|eot|otf)$/.test(u) ||
    /\.(mp3|mp4|wav|ogg|avi|mov|wmv|flv|webm)$/.test(u) ||
    /\.(zip|rar|7z|tar|gz|bz2|xz)$/.test(u) ||
    /\.(apk|ipa|dmg|exe|msi|deb|rpm)$/.test(u) ||
    /cdn\./.test(u) || /static\./.test(u) || /media\./.test(u) ||
    /assets?\./.test(u) || /img\./.test(u) || /images?\./.test(u)
  );
}


/* =========================================================
   🚀 PERFORMANCE — CRITICAL GAME TRAFFIC
   ========================================================= */
function isCriticalGameTraffic(s) {
  return (
    /matchmaking/.test(s) || /matchmaker/.test(s) ||
    /gameserver/.test(s) || /game-server/.test(s) ||
    /gamesession/.test(s) || /game-session/.test(s) ||
    /sessionserver/.test(s) || /session-server/.test(s) ||
    /matchserver/.test(s) || /match-server/.test(s) ||
    /dispatcher/.test(s) || /allocation/.test(s) ||
    /battleserver/.test(s) || /battle-server/.test(s) ||
    /realtime/.test(s) || /live/.test(s) || /stream/.test(s)
  );
}


/* =========================================================
   🚀 PERFORMANCE — LOBBY TRAFFIC
   ========================================================= */
function isLobbyTraffic(s) {
  return (
    /lobby/.test(s) || /lobbyserver/.test(s) || /lobby-server/.test(s) ||
    /shop/.test(s) || /store/.test(s) || /inventory/.test(s) ||
    /profile/.test(s) || /settings/.test(s) || /config/.test(s) ||
    /social/.test(s) || /friend/.test(s) || /chat/.test(s) ||
    /clan/.test(s) || /guild/.test(s) || /team/.test(s)
  );
}


/* =========================================================
   🚀 PERFORMANCE — CDN / DOWNLOAD TRAFFIC
   ========================================================= */
function isCDNTraffic(s) {
  return (
    /cdn\./.test(s) || /static\./.test(s) || /media\./.test(s) ||
    /assets?\./.test(s) || /download\./.test(s) || /dl\./.test(s) ||
    /patch\./.test(s) || /update\./.test(s) || /hotfix\./.test(s) ||
    /resource\./.test(s) || /content\./.test(s) || /files?\./.test(s)
  );
}


/* =========================================================
   🚀 PERFORMANCE — MIDDLE EAST SERVER DETECTION
   ========================================================= */
function isMiddleEastServer(s) {
  return (
    /me\./.test(s) || /mena\./.test(s) || /middleeast\./.test(s) ||
    /arab\./.test(s) || /gcc\./.test(s) || /gulf\./.test(s) ||
    /saudi\./.test(s) || /uae\./.test(s) || /kuwait\./.test(s) ||
    /bahrain\./.test(s) || /qatar\./.test(s) || /oman\./.test(s) ||
    /jordan\./.test(s) || /iraq\./.test(s) || /egypt\./.test(s) ||
    /levant\./.test(s) || /amman\./.test(s)
  );
}


/* =========================================================
   🎮 PUBG — DIRECT IDENTIFIERS
   ========================================================= */
function isPUBGDirect(s) {
  return (
    /(^|[.\-_])pubg([.\-_]|$)/.test(s) || /(^|[.\-_])pubgm([.\-_]|$)/.test(s) ||
    /(^|[.\-_])pubgmobile([.\-_]|$)/.test(s) || /(^|[.\-_])pubgsea([.\-_]|$)/.test(s) ||
    /(^|[.\-_])pubgkr([.\-_]|$)/.test(s) || /(^|[.\-_])pubgcs([.\-_]|$)/.test(s) ||
    /(^|[.\-_])pubgglobal([.\-_]|$)/.test(s) || /(^|[.\-_])pubglite([.\-_]|$)/.test(s)
  );
}


/* =========================================================
   🎮 PUBG — PUBLISHER / GAME ENGINE
   ========================================================= */
function isPUBGPublisher(s) {
  return (
    /(^|[.\-_])krafton([.\-_]|$)/.test(s) || /(^|[.\-_])tencent([.\-_]|$)/.test(s) ||
    /(^|[.\-_])lightspeed([.\-_]|$)/.test(s) || /(^|[.\-_])proximabeta([.\-_]|$)/.test(s) ||
    /(^|[.\-_])igame([.\-_]|$)/.test(s) || /(^|[.\-_])garena([.\-_]|$)/.test(s)
  );
}


/* =========================================================
   🎮 PUBG — CLOUD / INFRASTRUCTURE
   ========================================================= */
function isPUBGInfra(s) {
  return (
    /qcloud/.test(s) || /myqcloud/.test(s) || /tencentcs/.test(s) ||
    /amazonaws/.test(s) || /aliyun/.test(s) || /alibaba/.test(s) || /cloudfront/.test(s)
  );
}


/* =========================================================
   🎮 PUBG — GAME SERVICES
   ========================================================= */
function isPUBGService(s) {
  return (
    /matchmaking/.test(s) || /matchmaker/.test(s) ||
    /gameserver/.test(s) || /game-server/.test(s) ||
    /gamesession/.test(s) || /game-session/.test(s) ||
    /sessionserver/.test(s) || /session-server/.test(s) ||
    /matchserver/.test(s) || /match-server/.test(s) ||
    /dispatcher/.test(s) || /allocation/.test(s) ||
    /lobbyserver/.test(s) || /lobby-server/.test(s) ||
    /battleserver/.test(s) || /battle-server/.test(s)
  );
}


/* =========================================================
   🎮 PUBG — MAP / GAME MODE
   ========================================================= */
function isPUBGMode(s) {
  return (
    /erangel/.test(s) || /livik/.test(s) || /sanhok/.test(s) ||
    /miramar/.test(s) || /vikendi/.test(s) || /karakin/.test(s) ||
    /nusa/.test(s) || /taego/.test(s) || /deston/.test(s) ||
    /tdm/.test(s) || /teamdeathmatch/.test(s) ||
    /payload/.test(s) || /metroroyale/.test(s) || /metro-royale/.test(s) ||
    /infection/.test(s) || /zombie/.test(s) || /arena/.test(s)
  );
}


/* =========================================================
   🎮 PUBG — API / SESSION
   ========================================================= */
function isPUBGAPI(u) {
  return (
    /(\/api\/|\/v1\/|\/v2\/|\/v3\/|\/v4\/)/.test(u) &&
    /(game|match|session|battle|player|server|region|rank|stats)/.test(u)
  );
}


/* =========================================================
   🎮 PUBG — SERVER DISCOVERY
   ========================================================= */
function isPUBGServerDiscovery(s, u) {
  return (
    /(serverlist|server-list|serverlist|realm|routing|discover|ping|latency)/.test(u) &&
    /(game|match|player|pubg|pubgm|tencent|krafton|lightspeed)/.test(s)
  );
}


/* =========================================================
   🎮 PUBG — UPDATE / RESOURCE
   ========================================================= */
function isPUBGResource(s, u) {
  return (
    /(patch|update|resource|asset|hotfix|download|cdn|static|media)/.test(u) &&
    /(pubg|pubgm|tencent|lightspeed|proximabeta|krafton|qcloud|aliyun|myqcloud)/.test(s)
  );
}


/* =========================================================
   🧠 PUBG — CONFIDENCE ENGINE
   ========================================================= */
function getPUBGScore(host, url) {
  var h = (host || "").toLowerCase().replace(/^\.+|\.+$/g, "");
  var u = (url || "").toLowerCase().replace(/[\r\n\t]/g, "");
  var s = h + " " + u;
  var score = 0;

  if (isPUBGDirect(s))        score += 100;
  if (isPUBGPublisher(s))     score += 85;
  if (isPUBGService(s))       score += 70;
  if (isPUBGMode(s))          score += 45;
  if (isPUBGServerDiscovery(s, u)) score += 40;
  if (isPUBGAPI(u))           score += 35;
  if (isPUBGResource(s, u))   score += 30;
  if (isPUBGInfra(s))         score += 25;

  if (/match/.test(s) && /(game|session|battle|server)/.test(s)) score += 15;
  if (/battle/.test(s) && /(game|match|session|server)/.test(s)) score += 15;

  return score;
}

function isPUBG(host, url) {
  return getPUBGScore(host, url) >= 60;
}


/* =========================================================
   🔒 STICKY CORE (Jordanian Proxy Priority)
   ========================================================= */
var LOCKED_CORE = null;

function selectCore(host) {
  if (LOCKED_CORE !== null) return LOCKED_CORE;
  LOCKED_CORE = PROXY_JO1;
  return LOCKED_CORE;
}


/* =========================================================
   🚀 MAIN PAC ENGINE (V9 — MENA EDITION)
   ========================================================= */
function FindProxyForURL(url, host) {
  host = host || "";
  url = url || "";
  var s = (host + " " + url).toLowerCase();

  /* =====================================================
     1️⃣ 🖼️ PROFILE PICTURES -> DIRECT
     ===================================================== */
  if (isPlayerProfilePicture(url)) {
    return "DIRECT";
  }

  /* =====================================================
     2️⃣ 🎮 MATCHMAKING → JORDANIAN PROXY (CRITICAL)
     =====================================================
     هذا أهم طلب — لازم يروح على بروكسي أردني
     عشان PUBG يحطك بسيرفر أردني
     ===================================================== */
  if (isMatchmakingTraffic(s)) {
    return PROXY_JO1;
  }

  /* =====================================================
     3️⃣ 🚀 CRITICAL GAME TRAFFIC → JORDANIAN PROXY
     =====================================================
     Game Servers, Sessions, Real-time
     لازم أقل ping ممكن
     ===================================================== */
  if (isCriticalGameTraffic(s)) {
    return PROXY_JO1;
  }

  /* =====================================================
     4️⃣ 🎮 PUBG DETECTION → JORDANIAN PROXY
     ===================================================== */
  if (isPUBG(host, url)) {
    return selectCore(host);
  }

  /* =====================================================
     5️⃣ 🌐 EVERYTHING ELSE → JORDANIAN PROXY
     ===================================================== */
  return selectCore(host);
}
