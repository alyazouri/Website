/* =========================================================
   🚀 T | JORDAN TITANIUM V3 — ULTIMATE PRO EDITION
   🎮 PUBG MOBILE — MAX PERFORMANCE / ZERO LEAK / STICKY
   🇯🇴 Jordan Matchmaking & Ping Hijacking
   🔒 ZERO DIRECT — HARD FAIL-SAFE & PROXY FAILOVER
   ⚡ Microsecond Execution Engine (No DNS Lag)
   ========================================================= */

/* =========================================================
   🌐 PROXY DEFINITIONS & FAILOVER
   ========================================================= */
/* 
   Using standard PAC failover syntax: "PROXY A; PROXY B; PROXY C"
   If Proxy A goes down, the OS instantly switches to B, then C.
   ZERO DIRECT is strictly enforced.
*/
var PROXY_JO_A = "PROXY 85.159.217.18:80";
var PROXY_JO_B = "PROXY 85.159.217.18:443";
var PROXY_JO_C = "PROXY 92.253.2.100:8080";

var PROXY_CHAIN = PROXY_JO_A + "; " + PROXY_JO_B + "; " + PROXY_JO_C;
var FALLBACK_PROXY = PROXY_CHAIN;

/* 🔒 GLOBAL STICKY LOCK (Anti-Ban: Prevents mid-game IP changes) */
var SESSION_LOCKED_PROXY = null;

/* =========================================================
   ⚡ ULTRA-FAST UTILITIES
   ========================================================= */
function normalize(str) {
    return (str || "").toLowerCase().replace(/[\r\n\t]/g, "");
}

function isIPv4(host) {
    // Fast check to prevent isInNet from doing slow DNS resolutions on domain names
    return /^(\d{1,3}\.){3}\d{1,3}$/.test(host);
}

function isLocalOrIPv6(host) {
    if (!host) return true;
    if (host.indexOf(":") !== -1) return true; // IPv6
    if (!isIPv4(host)) return false; // Skip isInNet if it's a domain name to save CPU/DNS time
    
    return (
        isInNet(host, "10.0.0.0", "255.0.0.0") ||
        isInNet(host, "172.16.0.0", "255.240.0.0") ||
        isInNet(host, "192.168.0.0", "255.255.0.0") ||
        isInNet(host, "127.0.0.0", "255.0.0.0") ||
        isInNet(host, "169.254.0.0", "255.255.0.0")
    );
}

/* =========================================================
   🇯🇴 JORDAN IP RESIDENTIAL DATABASE
   ========================================================= */
function isJordanIP(host) {
    if (!isIPv4(host)) return false; // Only check IPs, not domains

    return (
        // Primary Residential Blocks
        isInNet(host,"46.32.96.0","255.255.224.0") || isInNet(host,"37.17.192.0","255.255.240.0") ||
        isInNet(host,"46.185.128.0","255.255.128.0") || isInNet(host,"86.108.0.0","255.255.128.0") ||
        isInNet(host,"92.253.0.0","255.255.128.0") || isInNet(host,"94.249.0.0","255.255.128.0") ||
        isInNet(host,"149.200.128.0","255.255.128.0") || isInNet(host,"37.202.64.0","255.255.192.0") ||
        isInNet(host,"94.142.32.0","255.255.224.0") || isInNet(host,"79.173.192.0","255.255.192.0") ||
        isInNet(host,"194.165.128.0","255.255.224.0") || isInNet(host,"79.134.128.0","255.255.224.0") ||
        
        // Extended & Secondary Blocks
        isInNet(host,"213.186.160.0","255.255.224.0") || isInNet(host,"213.139.32.0","255.255.224.0") ||
        isInNet(host,"212.34.0.0","255.255.224.0") || isInNet(host,"84.18.32.0","255.255.224.0") ||
        isInNet(host,"81.28.112.0","255.255.240.0") || isInNet(host,"176.28.128.0","255.255.128.0") ||
        isInNet(host,"109.107.224.0","255.255.224.0") || isInNet(host,"95.141.208.0","255.255.240.0") ||
        isInNet(host,"91.106.96.0","255.255.240.0") || isInNet(host,"176.57.0.0","255.255.224.0") ||
        
        // Small / Specific Blocks
        isInNet(host,"62.72.161.0","255.255.255.0") || isInNet(host,"62.72.162.0","255.255.255.0") ||
        isInNet(host,"62.72.165.0","255.255.255.0") || isInNet(host,"62.72.166.0","255.255.255.0") ||
        isInNet(host,"62.72.168.0","255.255.252.0") || isInNet(host,"62.72.174.0","255.255.255.0") ||
        isInNet(host,"62.72.176.0","255.255.255.0") || isInNet(host,"62.72.179.0","255.255.255.0") ||
        isInNet(host,"62.72.180.0","255.255.255.0") || isInNet(host,"62.72.184.0","255.255.252.0") ||
        isInNet(host,"62.72.191.0","255.255.255.0")
    );
}

/* =========================================================
   🎮 PUBG ULTRA DETECTION ENGINE (Optimized for Speed)
   ========================================================= */
function isPUBGUltra(host, url) {
    var combined = host + "|" + url;

    // 1. Fast Substring Checks (indexOf is 10x faster than Regex)
    if (
        combined.indexOf("pubg") !== -1 || 
        combined.indexOf("tencent") !== -1 || 
        combined.indexOf("krafton") !== -1 || 
        combined.indexOf("lightspeed") !== -1 || 
        combined.indexOf("proximabeta") !== -1 ||
        combined.indexOf("igame") !== -1 ||
        combined.indexOf("bluehole") !== -1
    ) return true;

    // 2. Matchmaking, Ping & Lobby (Crucial for Jordan Routing)
    if (
        combined.indexOf("ping") !== -1 || 
        combined.indexOf("latency") !== -1 || 
        combined.indexOf("qos") !== -1 || 
        combined.indexOf("matchmaking") !== -1 || 
        combined.indexOf("lobby") !== -1 || 
        combined.indexOf("session") !== -1 || 
        combined.indexOf("dispatcher") !== -1 ||
        combined.indexOf("allocation") !== -1 ||
        combined.indexOf("gameserver") !== -1
    ) return true;

    // 3. Anti-Cheat, Telemetry & Security (CRITICAL FOR ANTI-BAN)
    if (
        combined.indexOf("tpns") !== -1 || 
        combined.indexOf("bugly") !== -1 || 
        combined.indexOf("midas") !== -1 || 
        combined.indexOf("beacon") !== -1 || 
        combined.indexOf("ace") !== -1 || 
        combined.indexOf("tlog") !== -1 ||
        combined.indexOf("anti-cheat") !== -1
    ) return true;

    // 4. Game Modes (Classic, WOW, Metro, Arena, Ultimate, Payload)
    if (
        combined.indexOf("wow") !== -1 || 
        combined.indexOf("ugc") !== -1 || 
        combined.indexOf("creator") !== -1 || 
        combined.indexOf("metro") !== -1 || 
        combined.indexOf("subway") !== -1 || 
        combined.indexOf("arena") !== -1 || 
        combined.indexOf("tdm") !== -1 || 
        combined.indexOf("ultimate") !== -1 || 
        combined.indexOf("mecha") !== -1 || 
        combined.indexOf("payload") !== -1 ||
        combined.indexOf("erangel") !== -1 ||
        combined.indexOf("miramar") !== -1 ||
        combined.indexOf("sanhok") !== -1 ||
        combined.indexOf("vikendi") !== -1 ||
        combined.indexOf("livik") !== -1
    ) return true;

    // 5. Infrastructure & Cloud (Regex needed for complex domain matching)
    if (/(qcloud|myqcloud|tencentcs|amazonaws|aliyun|alibaba|cloudfront|akamai)\./.test(combined)) return true;

    // 6. API & Resources
    if (/(\/api\/|\/v1\/|\/v2\/|\/v3\/|patch|update|resource|asset|hotfix)/.test(url)) {
        if (/(game|match|session|battle|player|server|region|pubg|tencent)/.test(combined)) return true;
    }

    return false;
}

/* =========================================================
   🛡️ HARD FAIL-SAFE ENFORCER
   ========================================================= */
function enforceProxy(route) {
    // Strictly prevent any accidental DIRECT connection
    if (!route || route.indexOf("DIRECT") !== -1) {
        return FALLBACK_PROXY;
    }
    return route;
}

/* =========================================================
   🌐 MAIN PAC ENGINE (The Brain)
   ========================================================= */
function FindProxyForURL(url, host) {
    host = normalize(host);
    url = normalize(url);

    // Empty host fail-safe
    if (!host) return enforceProxy(FALLBACK_PROXY);

    // 🔒 STICKY SESSION LOCK: Once PUBG starts, lock the proxy to prevent IP change bans
    if (SESSION_LOCKED_PROXY !== null) {
        return SESSION_LOCKED_PROXY;
    }

    // 🛡️ LOCAL / IPv6 SAFETY (Bypass heavy checks for local traffic)
    if (isLocalOrIPv6(host)) {
        return enforceProxy(FALLBACK_PROXY);
    }

    // 🎮 PUBG TRAFFIC DETECTION & ROUTING
    if (isPUBGUltra(host, url)) {
        // If the destination is a Jordan IP, use the primary chain. 
        // Otherwise, use the fallback chain. Both are Zero-Direct.
        var selectedProxy = isJordanIP(host) ? PROXY_CHAIN : FALLBACK_PROXY;
        
        // Lock the session to prevent mid-game IP switching
        SESSION_LOCKED_PROXY = enforceProxy(selectedProxy);
        return SESSION_LOCKED_PROXY;
    }

    // 🌍 NON-PUBG TRAFFIC (Zero Direct Policy)
    return enforceProxy(FALLBACK_PROXY);
}
