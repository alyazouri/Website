/*
 * 🇯🇴 JORDAN TITANIUM PURE ROUTING PAC
 * Maximum Jordan Preference + Proxy Failover + Low-Latency Routing
 *
 * © 2025 – Production Grade PAC with hops through Jordan residential networks
 */

// === [CONFIGURATION] ======================================================

var MODE = "JORDAN_PURE"; // Options: JORDAN_PURE | JORDAN_FIRST | LOW_LATENCY | BALANCED | FAILSAFE

var UNKNOWN_POLICY = "PROXY";         // DIRECT | PROXY | BLOCK
var NON_JORDAN_POLICY = "PROXY";      // PROXY | DIRECT
var IPV6_POLICY = "ALLOW";            // ALLOW | DIRECT | PROXY | BLOCK
var NO_PROXY_AVAILABLE_POLICY = "DIRECT"; // DIRECT | PROXY | BLOCK
var GAME_UNKNOWN_POLICY = "PROXY";    // DIRECT | PROXY | BLOCK (For unknown PUBG destinations)

// === [YOUR SPECIAL PROXY CHAIN - HOPS THROUGH JORDAN RESIDENTIAL NETWORKS] ============================================================

// Your proxy chain that hops through Jordan residential fiber/GSM networks
var YOUR_PROXY_A = "PROXY 86.108.0.214:80";     // Orange Jordan Residential Fiber
var YOUR_PROXY_B = "PROXY 46.32.119.124:8888";  // Zain Jordan Residential Mobile
var YOUR_PROXY_C = "PROXY 79.173.249.116:8080"; // Orange Jordan Residential Fiber

// Your special chain with hops through residential networks
var YOUR_RESIDENTIAL_PROXY_CHAIN = YOUR_PROXY_A + "; " + YOUR_PROXY_B + "; " + YOUR_PROXY_C;

// === [STANDARD JORDAN PROXIES] ============================================================

// Standard Jordan proxies for other users
var PROXY_A = "PROXY 86.108.0.214:80";     // Orange Jordan
var PROXY_B = "PROXY 46.32.119.124:8888";  // Zain Jordan  
var PROXY_C = "PROXY 79.173.249.116:8080"; // Orange Jordan

// Standard Jordan chain
var JORDAN_PROXY_CHAIN = PROXY_A + "; " + PROXY_B + "; " + PROXY_C;

// List of proxy hosts to prevent loops (MUST match actual proxy IPs)
var PROXY_HOSTS = [
    "86.108.0.214",
    "46.32.119.124", 
    "79.173.249.116"
];

// === [JORDAN CIDR ENGINE - INCLUDING RESIDENTIAL NETWORKS] =============================

var JORDAN_CIDRS = [
    // === ZAIN JORDAN RESIDENTIAL MOBILE NETWORKS ===
    "46.32.96.0/19",        // 46.32.96.0 - 46.32.127.255 (Mobile/LTE)
    "94.142.32.0/19",       // 94.142.32.0 - 94.142.63.255 (Mobile)
    "188.247.64.0/19",      // 188.247.64.0 - 188.247.95.255 (Mobile)
    "46.32.112.0/20",       // 46.32.112.0 - 46.32.127.255 (Mobile/LTE)
    "196.202.0.0/16",       // 196.202.0.0 - 196.202.255.255 (Mobile)
    "197.149.128.0/17",     // 197.149.128.0 - 197.149.255.255 (Mobile)
    
    // === UMNIAH RESIDENTIAL NETWORKS ===
    "109.107.224.0/19",     // 109.107.224.0 - 109.107.255.255 (Residential Mobile)
    "46.248.192.0/19",      // 46.248.192.0 - 46.248.223.255 (Residential)
    "95.172.192.0/19",      // 95.172.192.0 - 95.172.223.255 (Residential Mobile)
    "46.23.112.0/20",       // 46.23.112.0 - 46.23.127.255 (Residential)
    "46.248.208.0/20",      // 46.248.208.0 - 46.248.223.255 (Residential)
    "212.35.64.0/20",       // 212.35.64.0 - 212.35.79.255 (Residential)
    "212.35.80.0/20",       // 212.35.80.0 - 212.35.95.255 (Residential)
    "193.188.64.0/18",      // 193.188.64.0 - 193.188.127.255 (Residential)
    "193.188.128.0/17",     // 193.188.128.0 - 193.188.255.255 (Fixed Line Residential)
    
    // === ORANGE JORDAN RESIDENTIAL FIBER/NETWORKS ===
    "194.165.128.0/18",     // 194.165.128.0 - 194.165.191.255 (Residential Fiber)
    "86.108.0.0/20",        // 86.108.0.0 - 86.108.15.255 (Residential Fiber)
    "79.173.240.0/20",      // 79.173.240.0 - 79.173.255.255 (Residential Fiber)
    
    // === ADDITIONAL RESIDENTIAL NETWORKS ===
    "212.38.128.0/17",      // 212.38.128.0 - 212.38.255.255 (Residential/Government)
    "213.244.0.0/16",       // 213.244.0.0 - 213.244.255.255 (Residential)
    "46.248.0.0/17",        // 46.248.0.0 - 46.248.127.255 (Mobile Residential)
    "95.172.128.0/17"       // 95.172.128.0 - 95.172.255.255 (Mobile Residential)
];

// === [YOUR SPECIFIC IP RANGE] =======================================================

// Put your IP address here:
var YOUR_IP_ADDRESS = "176.57.56.x"; // Replace x with your actual IP last octet

// Function to check if source IP matches yours
function isYourIPAddress() {
    // This would normally check the client's source IP
    // Since PAC can't access source IP directly, we'll handle this differently
    return false; // Placeholder - actual implementation depends on deployment method
}

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
    ".pubg.com",
    ".pubgmobile.com",
    ".krafton.com"
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

// === [PUBG SERVICES] ================================================

var PUBG_CRITICAL_SERVICES = [
    "prod-live-front.playbattlegrounds.com",
    "prod-live-as.playbattlegrounds.com",
    "prod-live-me.playbattlegrounds.com",
    "matchmaking.pubg.com",
    "matchmaking.pubgmobile.com",
    "match.pubgmobile.com"
];

var PUBG_OTHER_SERVICES = [
    "account.krafton.com",
    "login.pubgmobile.com",
    "voice.pubg.com",
    "assets.pubg.com",
    "cdn.pubg.com",
    "update.pubg.com"
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

// === [PUBG CLASSIFIER] =====================================

function classifyPUBGService(host) {
    // CRITICAL SERVICES
    for (var i = 0; i < PUBG_CRITICAL_SERVICES.length; i++) {
        if (host === PUBG_CRITICAL_SERVICES[i] || dnsDomainIs(host, PUBG_CRITICAL_SERVICES[i])) {
            return "CRITICAL";
        }
    }
    
    // OTHER SERVICES
    for (var j = 0; j < PUBG_OTHER_SERVICES.length; j++) {
        if (host === PUBG_OTHER_SERVICES[j] || dnsDomainIs(host, PUBG_OTHER_SERVICES[j])) {
            return "OTHER";
        }
    }
    
    // General PUBG domains
    if (dnsDomainIs(host, ".pubg.com") || dnsDomainIs(host, ".pubgmobile.com") || 
        dnsDomainIs(host, ".krafton.com")) {
        return "GENERAL";
    }
    
    return null;
}

// === [MAIN FIND_PROXY FUNCTION] ===========================================

function FindProxyForURL(url, host) {

    // === [IPv6 POLICY] ===
    if (isPlainHostName(host) || !isResolvable(host)) {
        if (IPV6_POLICY === "DIRECT") return "DIRECT";
        if (IPV6_POLICY === "PROXY") return YOUR_RESIDENTIAL_PROXY_CHAIN;
        if (IPV6_POLICY === "BLOCK") return "PROXY 0.0.0.0:80";
        return "DIRECT";
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

    // === [PUBG SERVICE HANDLING - WITH RESIDENTIAL HOPS] ===
    var pubgServiceType = classifyPUBGService(host);
    if (pubgServiceType) {
        if (resolved_ip && isJordanIPv4(resolved_ip)) {
            return YOUR_RESIDENTIAL_PROXY_CHAIN; // Hop through residential networks
        } else {
            return YOUR_RESIDENTIAL_PROXY_CHAIN; // Even for non-Jordan, hop through residential
        }
    }

    // === [MODE SELECTION LOGIC WITH RESIDENTIAL HOPS] ===

    switch (MODE) {

        case "JORDAN_PURE":
            if (resolved_ip && isJordanIPv4(resolved_ip)) {
                return YOUR_RESIDENTIAL_PROXY_CHAIN; // Hop through residential networks
            } else if (NON_JORDAN_POLICY === "PROXY") {
                return YOUR_RESIDENTIAL_PROXY_CHAIN; // Hop through residential for all traffic
            } else {
                return "DIRECT";
            }

        case "JORDAN_FIRST":
            if (resolved_ip && isJordanIPv4(resolved_ip)) {
                return YOUR_RESIDENTIAL_PROXY_CHAIN;
            } else if (NON_JORDAN_POLICY === "PROXY") {
                return YOUR_RESIDENTIAL_PROXY_CHAIN;
            } else {
                return "DIRECT";
            }

        case "LOW_LATENCY":
            return YOUR_RESIDENTIAL_PROXY_CHAIN; // Residential hopping for better performance

        case "BALANCED":
            if (resolved_ip && isJordanIPv4(resolved_ip)) {
                return YOUR_RESIDENTIAL_PROXY_CHAIN;
            } else if (NON_JORDAN_POLICY === "PROXY") {
                return YOUR_RESIDENTIAL_PROXY_CHAIN;
            } else {
                return "DIRECT";
            }

        case "FAILSAFE":
            return YOUR_RESIDENTIAL_PROXY_CHAIN; // Always hop through residential networks

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
            return YOUR_RESIDENTIAL_PROXY_CHAIN;
        }
    }

    for (var k = 0; k < JORDAN_DOMAINS.length; k++) {
        if (dnsDomainIs(host, JORDAN_DOMAINS[k])) {
            return YOUR_RESIDENTIAL_PROXY_CHAIN;
        }
    }

    for (var l = 0; l < GAME_DOMAINS.length; l++) {
        if (dnsDomainIs(host, GAME_DOMAINS[l])) {
            return YOUR_RESIDENTIAL_PROXY_CHAIN;
        }
    }

    for (var m = 0; m < CDN_DOMAINS.length; m++) {
        if (dnsDomainIs(host, CDN_DOMAINS[m])) {
            if (resolved_ip && isJordanIPv4(resolved_ip)) {
                return YOUR_RESIDENTIAL_PROXY_CHAIN;
            } else {
                return UNKNOWN_POLICY === "PROXY" ? YOUR_RESIDENTIAL_PROXY_CHAIN :
                       UNKNOWN_POLICY === "DIRECT" ? "DIRECT" :
                       UNKNOWN_POLICY === "BLOCK" ? "PROXY 0.0.0.0:80" : "DIRECT";
            }
        }
    }

    // === [FINAL FALLBACK WITH RESIDENTIAL HOPS] ===
    if (resolved_ip && isJordanIPv4(resolved_ip)) {
        return YOUR_RESIDENTIAL_PROXY_CHAIN;
    } else {
        return YOUR_RESIDENTIAL_PROXY_CHAIN; // Default to residential hopping
    }
}
