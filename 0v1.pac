/*
 * 🇯🇴 JORDAN TITANIUM PURE ROUTING PAC
 * Maximum Jordan Preference + Proxy Failover + Low-Latency Routing
 *
 * © 2025 – Production Grade PAC with maximum Jordan server priority
 */

// === [CONFIGURATION] ======================================================

var MODE = "JORDAN_PURE"; // Options: JORDAN_PURE | JORDAN_FIRST | LOW_LATENCY | BALANCED | FAILSAFE

var UNKNOWN_POLICY = "PROXY";         // DIRECT | PROXY | BLOCK
var NON_JORDAN_POLICY = "PROXY";      // PROXY | DIRECT
var IPV6_POLICY = "ALLOW";            // ALLOW | DIRECT | PROXY | BLOCK
var NO_PROXY_AVAILABLE_POLICY = "DIRECT"; // DIRECT | PROXY | BLOCK
var GAME_UNKNOWN_POLICY = "PROXY";    // DIRECT | PROXY | BLOCK (For unknown PUBG destinations)

// === [JORDAN-FIRST PROXIES] ============================================================

// Jordan-first optimized proxies (prioritize Jordan exit points)
var PROXY_A = "PROXY 86.108.0.214:80";     // Orange Jordan - Primary (Jordan exit)
var PROXY_B = "PROXY 46.32.119.124:8888";  // Zain Jordan - Secondary (Jordan exit)  
var PROXY_C = "PROXY 79.173.249.116:8080"; // Orange Jordan - Tertiary (Jordan exit)

// Jordan-first chain prioritizing Jordan exit IPs
var JORDAN_PROXY_CHAIN = PROXY_A + "; " + PROXY_B + "; " + PROXY_C;

// Standard fallback chain
var PROXY_CHAIN = PROXY_A + "; " + PROXY_B + "; " + PROXY_C;

// List of proxy hosts to prevent loops (MUST match actual proxy IPs)
var PROXY_HOSTS = [
    "86.108.0.214",
    "46.32.119.124", 
    "79.173.249.116"
];

// === [JORDAN CIDR ENGINE - COMPREHENSIVE COVERAGE] =============================

var JORDAN_CIDRS = [
    // === ZAIN JORDAN (AS30870) ===
    "46.32.96.0/19",        // 46.32.96.0 - 46.32.127.255
    "94.142.32.0/19",       // 94.142.32.0 - 94.142.63.255
    "188.247.64.0/19",      // 188.247.64.0 - 188.247.95.255
    "46.32.112.0/20",       // 46.32.112.0 - 46.32.127.255 (includes proxy 46.32.119.124)
    
    // === UMNIAH (AS9038) ===
    "109.107.224.0/19",     // 109.107.224.0 - 109.107.255.255
    "46.248.192.0/19",      // 46.248.192.0 - 46.248.223.255
    "95.172.192.0/19",      // 95.172.192.0 - 95.172.223.255
    "46.23.112.0/20",       // 46.23.112.0 - 46.23.127.255
    "46.248.208.0/20",      // 46.248.208.0 - 46.248.223.255
    "212.35.64.0/20",       // 212.35.64.0 - 212.35.79.255
    "212.35.80.0/20",       // 212.35.80.0 - 212.35.95.255
    
    // === ORANGE JORDAN (AS42297) ===
    "194.165.128.0/18",     // 194.165.128.0 - 194.165.191.255
    "86.108.0.0/20",        // 86.108.0.0 - 86.108.15.255 (includes proxy 86.108.0.214)
    "79.173.240.0/20",      // 79.173.240.0 - 79.173.255.255 (includes proxy 79.173.249.116)
    
    // === Additional Jordan Networks ===
    "193.188.64.0/18",      // 193.188.64.0 - 193.188.127.255 (Umniah additional)
    "193.188.128.0/17",     // 193.188.128.0 - 193.188.255.255 (Umniah fixed line)
    "196.202.0.0/16",       // 196.202.0.0 - 196.202.255.255 (Zain mobile)
    "197.149.128.0/17",     // 197.149.128.0 - 197.149.255.255 (Zain additional)
    
    // === Government and Institutional Networks ===
    "212.38.128.0/17",      // 212.38.128.0 - 212.38.255.255
    "213.244.0.0/16",       // 213.244.0.0 - 213.244.255.255
    "193.188.0.0/16",       // 193.188.0.0 - 193.188.255.255 (Various Jordan networks)
    
    // === Mobile Networks ===
    "46.248.0.0/17",        // 46.248.0.0 - 46.248.127.255 (Mobile ranges)
    "95.172.128.0/17",      // 95.172.128.0 - 95.172.255.255 (Mobile ranges)
    
    // === Data Centers and Hosting ===
    "91.220.32.0/19",       // 91.220.32.0 - 91.220.63.255
    "185.8.192.0/18",       // 185.8.192.0 - 185.8.255.255
    "185.144.0.0/16",       // 185.144.0.0 - 185.144.255.255
    "193.189.0.0/16"        // 193.189.0.0 - 193.189.255.255
];

// === [JORDAN SERVER DOMAINS] =======================================================

var JORDAN_SERVER_DOMAINS = [
    // Jordan-specific gaming servers (if any exist)
    ".jo",
    ".umniah.com",
    ".zain.jo",
    ".orange.jo"
];

// === [PUBG JORDAN-SPECIFIC DOMAINS] ================================================

// === JORDAN REGION PUBG SERVICES ===
var PUBG_JORDAN_SERVICES = [
    // Middle East region servers (closest to Jordan)
    "prod-live-me.playbattlegrounds.com",
    "match-me.pubgmobile.com",
    "cdn-me.pubgmobile.com",
    "dlDir-Me.pubgmobile.com"
];

// === CRITICAL PUBG SERVICES ===
var PUBG_CRITICAL_SERVICES = [
    // Real-time gameplay and matchmaking (highest priority)
    "prod-live-front.playbattlegrounds.com",
    "prod-live-as.playbattlegrounds.com",  // Asia region (geographically closest)
    "prod-live-me.playbattlegrounds.com",  // Middle East region (Jordan area)
    "matchmaking.pubg.com",
    "matchmaking.pubgmobile.com",
    "match.pubgmobile.com",
    "match-global.pubgmobile.com",
    "match-as.pubgmobile.com",
    "match-me.pubgmobile.com"
];

// === REAL-TIME SERVICES ===
var PUBG_REALTIME_SERVICES = [
    // Voice chat and real-time communication
    "voice.pubg.com",
    "rtc.pubgmobile.com",
    "voip.pubgmobile.com",
    "rtc-global.pubgmobile.com",
    "turn.pubgmobile.com",
    "stun.pubgmobile.com",
    
    // Presence and friends (real-time updates)
    "friends.pubg.com",
    "social.pubgmobile.com",
    "presence.pubg.com",
    "chat.pubgmobile.com"
];

// === AUTHENTICATION SERVICES ===
var PUBG_AUTH_SERVICES = [
    "account.krafton.com",
    "account.pubg.com",
    "login.pubgmobile.com",
    "auth.pubg.com",
    "oauth.krafton.com"
];

// === OTHER PUBG SERVICES ===
var PUBG_OTHER_SERVICES = [
    "assets.pubg.com",
    "resource.pubgmobile.com",
    "static.pubg.com",
    "content.pubg.com",
    "cdn.pubg.com",
    "download.pubg.com",
    "dl.pubgmobile.com",
    "update.pubg.com",
    "upgrade.pubgmobile.com",
    "patch.pubg.com",
    "analytics.pubg.com",
    "log.pubgmobile.com",
    "telemetry.pubg.com"
];

// === [DOMAIN RULES] =======================================================

var ALWAYS_DIRECT_DOMAINS = [
    ".local",
    ".internal",
    ".test",
    ".lan",
    ".corp",
    ".home"
];

var ALWAYS_PROXY_DOMAINS = [
    // Critical gaming domains that must always go through Jordan proxies
    ".pubg.com",
    ".pubgmobile.com",
    ".krafton.com"
];

var GAME_DOMAINS = [
    ".pubg.com",
    ".pubgmobile.com",
    ".krafton.com",
    ".tencent.com",
    ".igamecj.com"
];

var CDN_DOMAINS = [
    ".cloudflare.com",
    ".akamai.net",
    ".edgekey.net",
    ".fastly.net",
    ".cloudfront.net"
];

// === [UTILITY FUNCTIONS] ==================================================

function ipToInt(ip) {
    var parts = ip.split(".");
    return (parseInt(parts[0]) << 24) |
           (parseInt(parts[1]) << 16) |
           (parseInt(parts[2]) << 8) |
           parseInt(parts[3]);
}

function isIPv4(ip) {
    return /^(\d{1,3}\.){3}\d{1,3}$/.test(ip);
}

function isInCIDR(ip, cidr) {
    if (!isIPv4(ip)) return false;
    var parts = cidr.split("/");
    var subnet = parts[0];
    var prefixLength = parseInt(parts[1]);

    var mask = ~((1 << (32 - prefixLength)) - 1);
    return (ipToInt(ip) & mask) === (ipToInt(subnet) & mask);
}

function isJordanIPv4(ip) {
    for (var i = 0; i < JORDAN_CIDRS.length; i++) {
        if (isInCIDR(ip, JORDAN_CIDRS[i])) {
            return true;
        }
    }
    return false;
}

function isPrivateIPv4(ip) {
    return isInCIDR(ip, "127.0.0.0/8") ||
           isInCIDR(ip, "10.0.0.0/8") ||
           isInCIDR(ip, "172.16.0.0/12") ||
           isInCIDR(ip, "192.168.0.0/16") ||
           isInCIDR(ip, "169.254.0.0/16") ||
           isInCIDR(ip, "100.64.0.0/10") ||
           ip === "0.0.0.0" ||
           isInCIDR(ip, "224.0.0.0/4") ||
           ip === "255.255.255.255";
}

// === [JORDAN-SPECIFIC PUBG CLASSIFIER] =====================================

function classifyPUBGService(host) {
    // JORDAN REGION SERVICES - Highest priority
    for (var i = 0; i < PUBG_JORDAN_SERVICES.length; i++) {
        if (host === PUBG_JORDAN_SERVICES[i] || dnsDomainIs(host, PUBG_JORDAN_SERVICES[i])) {
            return "JORDAN_REGION";
        }
    }
    
    // CRITICAL SERVICES - High priority
    for (var j = 0; j < PUBG_CRITICAL_SERVICES.length; j++) {
        if (host === PUBG_CRITICAL_SERVICES[j] || dnsDomainIs(host, PUBG_CRITICAL_SERVICES[j])) {
            return "CRITICAL";
        }
    }
    
    // REAL-TIME SERVICES - Medium-high priority
    for (var k = 0; k < PUBG_REALTIME_SERVICES.length; k++) {
        if (host === PUBG_REALTIME_SERVICES[k] || dnsDomainIs(host, PUBG_REALTIME_SERVICES[k])) {
            return "REALTIME";
        }
    }
    
    // AUTHENTICATION SERVICES
    for (var l = 0; l < PUBG_AUTH_SERVICES.length; l++) {
        if (host === PUBG_AUTH_SERVICES[l] || dnsDomainIs(host, PUBG_AUTH_SERVICES[l])) {
            return "AUTH";
        }
    }
    
    // OTHER SERVICES - Standard priority
    for (var m = 0; m < PUBG_OTHER_SERVICES.length; m++) {
        if (host === PUBG_OTHER_SERVICES[m] || dnsDomainIs(host, PUBG_OTHER_SERVICES[m])) {
            return "OTHER";
        }
    }
    
    // General PUBG domains
    if (dnsDomainIs(host, ".pubg.com") || dnsDomainIs(host, ".pubgmobile.com") || 
        dnsDomainIs(host, ".krafton.com")) {
        return "GENERAL_PUBG";
    }
    
    return null;
}

// === [MAIN FIND_PROXY FUNCTION] ===========================================

function FindProxyForURL(url, host) {

    // === [IPv6 POLICY] ===
    if (isPlainHostName(host) || !isResolvable(host)) {
        if (IPV6_POLICY === "DIRECT") return "DIRECT";
        if (IPV6_POLICY === "PROXY") return JORDAN_PROXY_CHAIN;
        if (IPV6_POLICY === "BLOCK") return "PROXY 0.0.0.0:80"; // Block via invalid proxy
        return "DIRECT"; // Default: allow system to choose
    }

    var resolved_ip = dnsResolve(host);

    // === [PROXY LOOP PREVENTION] ===
    if (resolved_ip && PROXY_HOSTS.indexOf(resolved_ip) !== -1) {
        return "DIRECT";
    }

    // === [PRIVATE / LOCAL NETWORK] ===
    if (isPrivateIPv4(resolved_ip)) {
        return "DIRECT";
    }

    // === [JORDAN SERVER DETECTION] ===
    var isJordanDestination = resolved_ip && isJordanIPv4(resolved_ip);
    
    // === [JORDAN-SPECIFIC PUBG HANDLING] ===
    var pubgServiceType = classifyPUBGService(host);
    if (pubgServiceType) {
        // Always prioritize Jordan route for PUBG services
        if (isJordanDestination) {
            return JORDAN_PROXY_CHAIN;
        } else {
            // For non-Jordan destinations, still use Jordan proxies for optimal routing
            return JORDAN_PROXY_CHAIN;
        }
    }

    // === [MODE SELECTION LOGIC WITH JORDAN PRIORITY] ===

    switch (MODE) {

        case "JORDAN_PURE":
            if (isJordanDestination) {
                return JORDAN_PROXY_CHAIN; // Always use Jordan-first chain for Jordan destinations
            } else if (NON_JORDAN_POLICY === "PROXY") {
                return JORDAN_PROXY_CHAIN; // Even for non-Jordan, prefer Jordan proxies
            } else {
                return "DIRECT";
            }

        case "JORDAN_FIRST":
            if (isJordanDestination) {
                return JORDAN_PROXY_CHAIN;
            } else if (NON_JORDAN_POLICY === "PROXY") {
                return JORDAN_PROXY_CHAIN;
            } else {
                return "DIRECT";
            }

        case "LOW_LATENCY":
            return JORDAN_PROXY_CHAIN; // Jordan proxies likely lowest latency for Jordan users

        case "BALANCED":
            if (isJordanDestination) {
                return JORDAN_PROXY_CHAIN;
            } else if (NON_JORDAN_POLICY === "PROXY") {
                return JORDAN_PROXY_CHAIN;
            } else {
                return "DIRECT";
            }

        case "FAILSAFE":
            return JORDAN_PROXY_CHAIN; // Always try Jordan-first proxies

        default:
            return NO_PROXY_AVAILABLE_POLICY;
    }

    // === [DOMAIN-BASED EXCEPTIONS WITH JORDAN PRIORITY] ===

    for (var i = 0; i < ALWAYS_DIRECT_DOMAINS.length; i++) {
        if (dnsDomainIs(host, ALWAYS_DIRECT_DOMAINS[i])) {
            return "DIRECT";
        }
    }

    for (var j = 0; j < ALWAYS_PROXY_DOMAINS.length; j++) {
        if (dnsDomainIs(host, ALWAYS_PROXY_DOMAINS[j])) {
            return JORDAN_PROXY_CHAIN;
        }
    }

    for (var k = 0; k < JORDAN_SERVER_DOMAINS.length; k++) {
        if (dnsDomainIs(host, JORDAN_SERVER_DOMAINS[k])) {
            return JORDAN_PROXY_CHAIN;
        }
    }

    for (var l = 0; l < GAME_DOMAINS.length; l++) {
        if (dnsDomainIs(host, GAME_DOMAINS[l])) {
            return JORDAN_PROXY_CHAIN;
        }
    }

    for (var m = 0; m < CDN_DOMAINS.length; m++) {
        if (dnsDomainIs(host, CDN_DOMAINS[m])) {
            if (isJordanDestination) {
                return JORDAN_PROXY_CHAIN;
            } else {
                return UNKNOWN_POLICY === "PROXY" ? JORDAN_PROXY_CHAIN :
                       UNKNOWN_POLICY === "DIRECT" ? "DIRECT" :
                       UNKNOWN_POLICY === "BLOCK" ? "PROXY 0.0.0.0:80" : "DIRECT";
            }
        }
    }

    // === [FINAL FALLBACK WITH JORDAN PRIORITY] ===
    if (isJordanDestination) {
        return JORDAN_PROXY_CHAIN;
    } else {
        return UNKNOWN_POLICY === "PROXY" ? JORDAN_PROXY_CHAIN :
               UNKNOWN_POLICY === "DIRECT" ? "DIRECT" :
               UNKNOWN_POLICY === "BLOCK" ? "PROXY 0.0.0.0:80" : "DIRECT";
    }
}
