/*
 * 🇯🇴 JORDAN TITANIUM PURE ROUTING PAC
 * Maximum Jordan Preference + Proxy Failover + Low-Latency Routing
 *
 * © 2025 – Production Grade PAC for iOS / iPadOS with full failover,
 * verified CIDR-based routing, and intelligent game CDN handling.
 */

// === [CONFIGURATION] ======================================================

var MODE = "JORDAN_PURE"; // Options: JORDAN_PURE | JORDAN_FIRST | LOW_LATENCY | BALANCED | FAILSAFE

var UNKNOWN_POLICY = "PROXY";         // DIRECT | PROXY | BLOCK
var NON_JORDAN_POLICY = "PROXY";      // PROXY | DIRECT
var IPV6_POLICY = "ALLOW";            // ALLOW | DIRECT | PROXY | BLOCK
var NO_PROXY_AVAILABLE_POLICY = "DIRECT"; // DIRECT | PROXY | BLOCK
var GAME_UNKNOWN_POLICY = "PROXY";    // DIRECT | PROXY | BLOCK (For unknown PUBG destinations)

// === [PROXIES] ============================================================

var PROXY_A = "PROXY 86.108.0.214:80";
var PROXY_B = "PROXY 79.173.249.116:8080";
var PROXY_C = "PROXY 46.32.119.124:8888";

// Failover chain (used in JORDAN_PURE mode by default)
var PROXY_CHAIN = PROXY_A + "; " + PROXY_B + "; " + PROXY_C;

// List of proxy hosts to prevent loops (MUST match actual proxy IPs)
var PROXY_HOSTS = [
    "86.108.0.214",
    "79.173.249.116", 
    "46.32.119.124"
];

// === [CIDR ENGINE - VERIFIED JORDAN IPs ONLY] =============================

var JORDAN_CIDRS = [
    // Zain Jordan
    "46.32.96.0/19",
    "94.142.32.0/19",
    "188.247.64.0/19",
    
    // Umniah Jordan
    "109.107.224.0/19",
    "46.248.192.0/19",
    "95.172.192.0/19",
    "46.23.112.0/20",
    "46.248.208.0/20",
    "212.35.64.0/20",
    "212.35.80.0/20",
    
    // Orange Jordan
    "46.32.112.0/20",     // This includes proxy 46.32.119.124
    "86.108.0.0/20",      // This includes proxy 86.108.0.214
    "79.173.240.0/20"     // This includes proxy 79.173.249.116
];

// === [DOMAIN RULES] =======================================================

var ALWAYS_DIRECT_DOMAINS = [
    ".local",
    ".internal",
    ".test",
    ".lan"
];

var ALWAYS_PROXY_DOMAINS = [
    // Add domains that must always go through proxy
];

var JORDAN_DOMAINS = [
    ".jo",
    ".umniah.com",
    ".zain.jo",
    ".orange.jo"
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

// === [PUBG MOBILE SPECIFIC DOMAINS] =======================================

var PUBG_GAMEPLAY_DOMAINS = [
    "prod-live-front.playbattlegrounds.com",
    "prod-live-cf.playbattlegrounds.com",
    "prod-live-na.playbattlegrounds.com",
    "prod-live-eu.playbattlegrounds.com",
    "prod-live-as.playbattlegrounds.com"
];

var PUBG_MATCHMAKING_DOMAINS = [
    "matchmaking.pubg.com",
    "matchmaking.pubgmobile.com"
];

var PUBG_AUTH_DOMAINS = [
    "account.krafton.com",
    "account.pubg.com",
    "login.pubgmobile.com"
];

var PUBG_VOICE_DOMAINS = [
    "voice.pubg.com",
    "rtc.pubgmobile.com"
];

var PUBG_FRIENDS_DOMAINS = [
    "friends.pubg.com",
    "social.pubgmobile.com"
];

var PUBG_ASSETS_DOMAINS = [
    "assets.pubg.com",
    "resource.pubgmobile.com"
];

var PUBG_CDN_DOMAINS = [
    "cdn.pubg.com",
    "dlDir-Na.pubgmobile.com",
    "dlDir-In.pubgmobile.com",
    "dlDir-Sg.pubgmobile.com"
];

var PUBG_UPDATES_DOMAINS = [
    "update.pubg.com",
    "upgrade.pubgmobile.com"
];

var PUBG_ANALYTICS_DOMAINS = [
    "analytics.pubg.com",
    "log.pubgmobile.com"
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

// === [PUBG MOBILE CLASSIFIER] =============================================

function classifyPUBGRequest(host) {
    // Gameplay servers
    for (var i = 0; i < PUBG_GAMEPLAY_DOMAINS.length; i++) {
        if (host === PUBG_GAMEPLAY_DOMAINS[i] || dnsDomainIs(host, PUBG_GAMEPLAY_DOMAINS[i])) {
            return "GAMEPLAY";
        }
    }
    
    // Matchmaking
    for (var j = 0; j < PUBG_MATCHMAKING_DOMAINS.length; j++) {
        if (host === PUBG_MATCHMAKING_DOMAINS[j] || dnsDomainIs(host, PUBG_MATCHMAKING_DOMAINS[j])) {
            return "MATCHMAKING";
        }
    }
    
    // Authentication
    for (var k = 0; k < PUBG_AUTH_DOMAINS.length; k++) {
        if (host === PUBG_AUTH_DOMAINS[k] || dnsDomainIs(host, PUBG_AUTH_DOMAINS[k])) {
            return "AUTH";
        }
    }
    
    // Voice chat
    for (var l = 0; l < PUBG_VOICE_DOMAINS.length; l++) {
        if (host === PUBG_VOICE_DOMAINS[l] || dnsDomainIs(host, PUBG_VOICE_DOMAINS[l])) {
            return "VOICE";
        }
    }
    
    // Friends/Social
    for (var m = 0; m < PUBG_FRIENDS_DOMAINS.length; m++) {
        if (host === PUBG_FRIENDS_DOMAINS[m] || dnsDomainIs(host, PUBG_FRIENDS_DOMAINS[m])) {
            return "FRIENDS";
        }
    }
    
    // Game assets
    for (var n = 0; n < PUBG_ASSETS_DOMAINS.length; n++) {
        if (host === PUBG_ASSETS_DOMAINS[n] || dnsDomainIs(host, PUBG_ASSETS_DOMAINS[n])) {
            return "ASSETS";
        }
    }
    
    // CDN
    for (var o = 0; o < PUBG_CDN_DOMAINS.length; o++) {
        if (host === PUBG_CDN_DOMAINS[o] || dnsDomainIs(host, PUBG_CDN_DOMAINS[o])) {
            return "CDN";
        }
    }
    
    // Updates
    for (var p = 0; p < PUBG_UPDATES_DOMAINS.length; p++) {
        if (host === PUBG_UPDATES_DOMAINS[p] || dnsDomainIs(host, PUBG_UPDATES_DOMAINS[p])) {
            return "UPDATES";
        }
    }
    
    // Analytics
    for (var q = 0; q < PUBG_ANALYTICS_DOMAINS.length; q++) {
        if (host === PUBG_ANALYTICS_DOMAINS[q] || dnsDomainIs(host, PUBG_ANALYTICS_DOMAINS[q])) {
            return "ANALYTICS";
        }
    }
    
    // General PUBG domain but not specifically categorized
    if (dnsDomainIs(host, ".pubg.com") || dnsDomainIs(host, ".pubgmobile.com") || 
        dnsDomainIs(host, ".krafton.com") || dnsDomainIs(host, ".tencent.com") || 
        dnsDomainIs(host, ".igamecj.com")) {
        return "GENERAL_PUBG";
    }
    
    return null;
}

// === [MAIN FIND_PROXY FUNCTION] ===========================================

function FindProxyForURL(url, host) {

    // === [IPv6 POLICY] ===
    if (isPlainHostName(host) || !isResolvable(host)) {
        if (IPV6_POLICY === "DIRECT") return "DIRECT";
        if (IPV6_POLICY === "PROXY") return PROXY_CHAIN;
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

    // === [PUBG MOBILE SPECIAL HANDLING] ===
    var pubgCategory = classifyPUBGRequest(host);
    if (pubgCategory) {
        // For all PUBG traffic, prefer Jordan route when destination is Jordan
        if (resolved_ip && isJordanIPv4(resolved_ip)) {
            return PROXY_CHAIN;
        } else {
            // For non-Jordan PUBG destinations, use configurable policy
            return GAME_UNKNOWN_POLICY === "PROXY" ? PROXY_CHAIN :
                   GAME_UNKNOWN_POLICY === "DIRECT" ? "DIRECT" :
                   GAME_UNKNOWN_POLICY === "BLOCK" ? "PROXY 0.0.0.0:80" : "DIRECT";
        }
    }

    // === [MODE SELECTION LOGIC] ===

    switch (MODE) {

        case "JORDAN_PURE":
            if (resolved_ip && isJordanIPv4(resolved_ip)) {
                return PROXY_CHAIN; // Verified Jordan destination uses preferred proxy chain
            } else if (NON_JORDAN_POLICY === "PROXY") {
                return PROXY_CHAIN;
            } else {
                return "DIRECT";
            }

        case "JORDAN_FIRST":
            if (resolved_ip && isJordanIPv4(resolved_ip)) {
                return PROXY_CHAIN;
            } else if (NON_JORDAN_POLICY === "PROXY") {
                return PROXY_CHAIN;
            } else {
                return "DIRECT";
            }

        case "LOW_LATENCY":
            return PROXY_CHAIN; // Assume low latency from preconfigured order

        case "BALANCED":
            if (resolved_ip && isJordanIPv4(resolved_ip)) {
                return PROXY_CHAIN;
            } else if (NON_JORDAN_POLICY === "PROXY") {
                return PROXY_CHAIN;
            } else {
                return "DIRECT";
            }

        case "FAILSAFE":
            return PROXY_CHAIN; // Always try all proxies before fallback

        default:
            return NO_PROXY_AVAILABLE_POLICY;
    }

    // === [DOMAIN-BASED EXCEPTIONS] ===

    for (var i = 0; i < ALWAYS_DIRECT_DOMAINS.length; i++) {
        if (dnsDomainIs(host, ALWAYS_DIRECT_DOMAINS[i])) {
            return "DIRECT";
        }
    }

    for (var j = 0; j < ALWAYS_PROXY_DOMAINS.length; j++) {
        if (dnsDomainIs(host, ALWAYS_PROXY_DOMAINS[j])) {
            return PROXY_CHAIN;
        }
    }

    for (var k = 0; k < JORDAN_DOMAINS.length; k++) {
        if (dnsDomainIs(host, JORDAN_DOMAINS[k])) {
            return PROXY_CHAIN;
        }
    }

    for (var l = 0; l < GAME_DOMAINS.length; l++) {
        if (dnsDomainIs(host, GAME_DOMAINS[l])) {
            if (resolved_ip && isJordanIPv4(resolved_ip)) {
                return PROXY_CHAIN;
            } else {
                return GAME_UNKNOWN_POLICY === "PROXY" ? PROXY_CHAIN :
                       GAME_UNKNOWN_POLICY === "DIRECT" ? "DIRECT" :
                       GAME_UNKNOWN_POLICY === "BLOCK" ? "PROXY 0.0.0.0:80" : "DIRECT";
            }
        }
    }

    for (var m = 0; m < CDN_DOMAINS.length; m++) {
        if (dnsDomainIs(host, CDN_DOMAINS[m])) {
            if (resolved_ip && isJordanIPv4(resolved_ip)) {
                return PROXY_CHAIN;
            } else {
                // CDN unknown destinations follow general unknown policy
                return UNKNOWN_POLICY === "PROXY" ? PROXY_CHAIN :
                       UNKNOWN_POLICY === "DIRECT" ? "DIRECT" :
                       UNKNOWN_POLICY === "BLOCK" ? "PROXY 0.0.0.0:80" : "DIRECT";
            }
        }
    }

    // === [FINAL FALLBACK] ===
    if (resolved_ip && isJordanIPv4(resolved_ip)) {
        return PROXY_CHAIN;
    } else {
        return UNKNOWN_POLICY === "PROXY" ? PROXY_CHAIN :
               UNKNOWN_POLICY === "DIRECT" ? "DIRECT" :
               UNKNOWN_POLICY === "BLOCK" ? "PROXY 0.0.0.0:80" : "DIRECT";
    }
}
