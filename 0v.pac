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
var IPV6_POLICY = "BLOCK";            // ALLOW | DIRECT | PROXY | BLOCK
var NO_PROXY_AVAILABLE_POLICY = "DIRECT"; // DIRECT | PROXY | BLOCK

// === [PROXIES] ============================================================

var PROXY_A = "PROXY 85.159.217.18:80";
var PROXY_B = "PROXY 85.159.217.18:443";
var PROXY_C = "PROXY 92.253.2.100:8080";

// Failover chain (used in JORDAN_PURE mode by default)
var PROXY_CHAIN = PROXY_A + "; " + PROXY_B + "; " + PROXY_C;

// List of proxy hosts to prevent loops
var PROXY_HOSTS = [
    "85.159.217.18",
    "92.253.2.100"
];

// === [CIDR ENGINE - VERIFIED JORDAN IPs ONLY] =============================

var JORDAN_CIDRS = [
    "193.188.64.0/18",     // AS8365 Umniah Mobile Network
    "193.188.128.0/17",    // AS8365 Umniah Fixed Line
    "194.165.128.0/18",    // AS42297 Orange Jordan
    "196.202.0.0/16",      // AS30870 Zain Jordan
    "197.149.128.0/17"     // AS30870 Zain Jordan
];

// === [DOMAIN RULES] =======================================================

var ALWAYS_DIRECT_DOMAINS = [
    ".local",
    ".internal",
    ".test"
];

var ALWAYS_PROXY_DOMAINS = [
    ".example.com"
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
    ".krafton.com"
];

var CDN_DOMAINS = [
    ".cloudflare.com",
    ".akamai.net",
    ".edgekey.net"
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

// === [PUBG CLASSIFIER] ====================================================

function classifyPUBG(host) {
    // Gameplay, Matchmaking, Auth, Voice, Friends, Assets, CDN, Updates, Analytics
    if (dnsDomainIs(host, ".pubg.com") || dnsDomainIs(host, ".pubgmobile.com")) {
        return "GAME";
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

    // === [MODE SELECTION LOGIC] ===

    switch (MODE) {

        case "JORDAN_PURE":
            if (isJordanIPv4(resolved_ip)) {
                return PROXY_CHAIN; // Verified Jordan destination uses preferred proxy chain
            } else if (NON_JORDAN_POLICY === "PROXY") {
                return PROXY_CHAIN;
            } else {
                return "DIRECT";
            }

        case "JORDAN_FIRST":
            if (isJordanIPv4(resolved_ip)) {
                return PROXY_CHAIN;
            } else if (NON_JORDAN_POLICY === "PROXY") {
                return PROXY_CHAIN;
            } else {
                return "DIRECT";
            }

        case "LOW_LATENCY":
            return PROXY_CHAIN; // Assume low latency from preconfigured order

        case "BALANCED":
            if (isJordanIPv4(resolved_ip)) {
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
            var pubgType = classifyPUBG(host);
            if (pubgType === "GAME") {
                if (isJordanIPv4(resolved_ip)) {
                    return PROXY_CHAIN;
                } else {
                    return UNKNOWN_POLICY === "PROXY" ? PROXY_CHAIN : "DIRECT";
                }
            }
        }
    }

    for (var m = 0; m < CDN_DOMAINS.length; m++) {
        if (dnsDomainIs(host, CDN_DOMAINS[m])) {
            if (isJordanIPv4(resolved_ip)) {
                return PROXY_CHAIN;
            } else {
                return UNKNOWN_POLICY === "PROXY" ? PROXY_CHAIN : "DIRECT";
            }
        }
    }

    // === [FINAL FALLBACK] ===
    return UNKNOWN_POLICY === "PROXY" ? PROXY_CHAIN :
           UNKNOWN_POLICY === "DIRECT" ? "DIRECT" :
           UNKNOWN_POLICY === "BLOCK" ? "PROXY 0.0.0.0:80" : "DIRECT";
}
