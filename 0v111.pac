/* =========================================================
   T | JORDAN TITANIUM CORE V2.1 (Full IPv6 Explicit)
   🎮 PUBG MOBILE — MAX DETECTION / STICKY ROUTING
   🇯🇴 Jordan Residential Priority + ALL IPv6 RANGES
   🔒 Zero DIRECT / Fast PAC-compatible logic
   ========================================================= */

/* =========================================================
   🌐 PROXY DEFINITIONS
   ========================================================= */
var PROXY_A = "PROXY 212.34.6.85:80";
var PROXY_B = "PROXY 82.212.84.109:3478";
var PROXY_C = "PROXY 176.29.199.164:3478";

/* =========================================================
   🛡️ SMART LOCAL BYPASS
   ========================================================= */
function isLocal(host) {
    if (!host) return false;
    var h = host.toLowerCase();
    if (h === "localhost" || h === "127.0.0.1" || h === "::1") return true;
    if (/^10\./.test(h)) return true;
    if (/^192\.168\./.test(h)) return true;
    if (/^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(h)) return true;
    if (/^169\.254\./.test(h)) return true;
    return false;
}

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
   🇯🇴 JORDAN IPv4 RESIDENTIAL (Optimized)
   ========================================================= */
function isJordanIPv4(host) {
    if (!/^\d+\.\d+\.\d+\.\d+$/.test(host)) return false;
    return (
        isInNet(host, "2.17.24.0", "255.255.252.0") ||
        isInNet(host, "212.34.0.0", "255.255.224.0") || // Covers all 212.34.x.x including 212.34.7.0/24
        isInNet(host, "213.139.32.0", "255.255.224.0") || // Covers all 213.139.x.x
        isInNet(host, "86.108.17.0", "255.255.255.0") ||
        isInNet(host, "86.108.20.0", "255.255.255.0") ||
        isInNet(host, "94.249.4.0", "255.255.255.0")
    );
}

/* =========================================================
   🇯🇴 JORDAN IPv6 RESIDENTIAL (EXPLICIT LIST)
   Note: isInNet fails on IPv6. We use explicit prefix matching.
   ========================================================= */
function isJordanIPv6(host) {
    if (host.indexOf(":") === -1) return false; // Not IPv6
    
    // Remove brackets if present (e.g., [2a00:18d8::1])
    var h = host.toLowerCase().replace(/[\[\]]/g, "");
    
    // Explicitly listing ALL requested IPv6 ranges
    var ipv6Prefixes = [
        "2a00:18d8:100:",  // 2a00:18d8:100::/44
        "2a00:18d8:110:",  // 2a00:18d8:110::/44
        "2a00:18d8:120:",  // 2a00:18d8:120::/44
        "2a00:18d8:130:",  // 2a00:18d8:130::/44
        "2a00:18d8:140:",  // 2a00:18d8:140::/44
        "2a00:18d8:150:",  // 2a00:18d8:150::/44
        "2a00:18d8:160:",  // 2a00:18d8:160::/44
        "2a00:18d8:170:",  // 2a00:18d8:170::/44
        "2a00:18d8:2:",    // 2a00:18d8:2::/48
        "2a00:18d8:3:",    // 2a00:18d8:3::/48
        "2a00:18d8:3c:",   // 2a00:18d8:3c::/47
        "2a00:18d8:3e:",   // 2a00:18d8:3e::/47
        "2a00:18d8:4001:", // 2a00:18d8:4001::/48
        "2a00:18d8:4002:", // 2a00:18d8:4002::/48
        "2a00:18d8:40:",   // 2a00:18d8:40::/44
        "2a00:18d8:4:",    // 2a00:18d8:4::/48
        "2a00:18d8:50:",   // 2a00:18d8:50::/48 (Also covers typo 2a00:18d8:5...)
        "2a00:18d8:60:",   // 2a00:18d8:60::/44
        "2a00:18d8:70:",   // 2a00:18d8:70::/44
        "2a00:18d8:80:",   // 2a00:18d8:80::/44
        "2a00:18d8:90:",   // 2a00:18d8:90::/44
        "2a00:18d8:c0:",   // 2a00:18d8:c0::/44
        "2a00:18d8:d0:",   // 2a00:18d8:d0::/44
        "2a00:18d8:e0:",   // 2a00:18d8:e0::/44
        "2a00:18d8:f0:",   // 2a00:18d8:f0::/44
        "2a00:18d8:"       // Catch-all for 2a00:18d8::/29, ::/32, ::/48
    ];

    for (var i = 0; i < ipv6Prefixes.length; i++) {
        if (h.indexOf(ipv6Prefixes[i]) === 0) {
            return true;
        }
    }
    return false;
}

/* =========================================================
   🇯🇴 JORDAN — COMBINED RESIDENTIAL CHECK
   ========================================================= */
function isJordanResidential(host) {
    return isJordanIPv4(host) || isJordanIPv6(host);
}

/* =========================================================
   📊 JORDAN TIER EVALUATION
   ========================================================= */
function regionTier(host) {
    if (isJordanResidential(host)) return 3;
    return 1;
}

/* =========================================================
   🎮 PUBG — IDENTIFIERS & HEURISTICS
   ========================================================= */
function isPUBGDirect(s) {
    return /(^|[.\-_])(pubg|pubgm|pubgmobile|pubgsea|pubgkr|pubgcs)([.\-_]|$)/.test(s);
}
function isPUBGPublisher(s) {
    return /(^|[.\-_])(krafton|tencent|lightspeed|proximabeta|igame|tencentcs)([.\-_]|$)/.test(s) || /amazonaws/.test(s);
}
function isPUBGInfra(s) {
    return /(qcloud|myqcloud|aliyun|alibaba|cloudfront|akamai|fastly)/.test(s);
}
function isPUBGService(s) {
    return /(matchmaking|matchmaker|gameserver|game-server|gamesession|game-session|sessionserver|session-server|matchserver|match-server|dispatcher|allocation)/.test(s);
}
function isPUBGMode(s) {
    return /(erangel|livik|sanhok|miramar|vikendi|karakin|nusa|tdm|teamdeathmatch|payload|metroroyale|metro-royale)/.test(s);
}
function isPUBGAPI(u) {
    return /(\/api\/|\/v1\/|\/v2\/|\/v3\/)/.test(u) && /(game|match|session|battle|player|server|region)/.test(u);
}
function isPUBGServerDiscovery(s, u) {
    return /(serverlist|server-list|realm|routing)/.test(u) && /(game|match|player|pubg|pubgm|tencent|krafton)/.test(s);
}
function isPUBGResource(s, u) {
    return /(patch|update|resource|asset|hotfix)/.test(u) && /(pubg|pubgm|tencent|lightspeed|proximabeta|krafton)/.test(s);
}

/* =========================================================
   🧠 PUBG — CONFIDENCE ENGINE
   ========================================================= */
function getPUBGScore(host, url) {
    var h = (host || "").toLowerCase().replace(/^\.+|\.+$/g, "");
    var u = (url || "").toLowerCase().replace(/[\r\n\t]/g, "");
    var s = h + " " + u;
    var score = 0;

    if (isPUBGDirect(s)) score += 100;
    if (isPUBGPublisher(s)) score += 85;
    if (isPUBGService(s)) score += 70;
    if (isPUBGMode(s)) score += 45;
    if (isPUBGServerDiscovery(s, u)) score += 40;
    if (isPUBGAPI(u)) score += 35;
    if (isPUBGResource(s, u)) score += 30;
    if (isPUBGInfra(s)) score += 25;

    if (/match/.test(s) && /(game|session|battle|server)/.test(s)) score += 15;
    if (/battle/.test(s) && /(game|match|session|server)/.test(s)) score += 15;

    return score;
}

function isPUBG(host, url) {
    return getPUBGScore(host, url) >= 60;
}

/* =========================================================
   🔒 STICKY CORE ENGINE
   ========================================================= */
var LOCKED_CORE = null;

function selectCore(host, url) {
    if (LOCKED_CORE !== null) return LOCKED_CORE;
    var tier = regionTier(host);

    if (tier === 3) {
        LOCKED_CORE = PROXY_A;
        return LOCKED_CORE;
    }

    var hash = ultraHash(host + "|" + url);
    var selector = hash % 3;

    if (selector === 0) LOCKED_CORE = PROXY_A;
    else if (selector === 1) LOCKED_CORE = PROXY_B;
    else LOCKED_CORE = PROXY_C;

    return LOCKED_CORE;
}

function selectNonPUBGCore() {
    return PROXY_A;
}

/* =========================================================
   🚀 MAIN PAC ENGINE
   ========================================================= */
function FindProxyForURL(url, host) {
    host = host || "";
    url = url || "";

    if (isLocal(host)) return "DIRECT";
    if (isPUBG(host, url)) return selectCore(host, url);
    
    return selectNonPUBGCore();
}
