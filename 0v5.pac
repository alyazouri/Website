/* =========================================================
   🇯🇴 JORDAN PURE ROUTING — MAXIMUM LOCAL PATH
   Production-Grade PAC Engine for Optimal Jordan Network Routing
   
   Core Philosophy:
   "Jordan-first when Jordan is technically beneficial, 
    latency-first when it is not, 
    DIRECT when no verified advantage exists."
   ========================================================= */


/* =========================================================
   🛠️ CONFIGURATION SECTION
   ========================================================= */

// Routing Mode Configuration
var MODE = "JORDAN_PURE"; // Options: JORDAN_PURE | JORDAN_FIRST | LOW_LATENCY | BALANCED | DIRECT_FALLBACK

// Policy Configuration
var UNKNOWN_POLICY = "DIRECT";         // DIRECT | PROXY | BLOCK
var NON_JORDAN_POLICY = "DIRECT";     // DIRECT | PROXY
var IPV6_POLICY = "DIRECT";           // DIRECT | PROXY | BLOCK | ALLOW
var NO_PROXY_AVAILABLE_POLICY = "DIRECT"; // DIRECT | BLOCK

// Game Traffic Policy
var GAME_UNKNOWN_POLICY = "DIRECT";    // DIRECT | PROXY | BLOCK

// Security Policy
var SECURE_TRAFFIC_DIRECT = true;     // Force DIRECT for sensitive domains


/* =========================================================
   🔌 PROXY CONFIGURATION
   ========================================================= */

// Verified Jordan Proxies (Replace with actual working proxies)
var PROXY_A = "PROXY 85.159.217.18:80";    // Example Jordan Proxy A
var PROXY_B = "PROXY 85.159.217.18:443";   // Example Jordan Proxy B
var PROXY_C = "PROXY 92.253.2.100:8080";   // Example Jordan Proxy C

// Proxy Chain with Priority
var PROXY_CHAIN = PROXY_A + "; " + PROXY_B + "; " + PROXY_C;

// Proxy Hosts to Prevent Loops
var PROXY_HOSTS = [
    "85.159.217.18",
    "92.253.2.100"
];


/* =========================================================
   🇯🇴 JORDAN NETWORK CIDR DATABASE
   ========================================================= */

// Jordan GSM/LTE/5G Mobile Networks
var JORDAN_GSM_CIDRS = [
    "46.32.96.0/19",        // Zain Jordan Mobile
    "94.142.32.0/19",       // Zain Jordan Mobile
    "188.247.64.0/19",      // Zain Jordan Mobile
    "46.32.112.0/20",       // Zain Jordan LTE
    "196.202.0.0/16",       // Zain Jordan Mobile
    "197.149.128.0/17",     // Zain Jordan Mobile
    "109.107.224.0/19",     // Umniah Mobile
    "46.248.192.0/19",      // Umniah Mobile
    "95.172.192.0/19",      // Umniah Mobile
    "46.23.112.0/20",       // Umniah LTE
    "46.248.208.0/20",      // Umniah LTE
    "212.35.64.0/20",       // Umniah LTE
    "212.35.80.0/20",       // Umniah LTE
    "46.248.0.0/17",        // Extended Mobile Range
    "95.172.128.0/17"       // Extended Mobile Range
];

// Jordan Home Fiber/Fixed Broadband
var JORDAN_FIBER_CIDRS = [
    "194.165.128.0/18",     // Orange Jordan Fiber
    "86.108.0.0/16",        // Orange Jordan Fiber
    "79.173.240.0/20",      // Orange Jordan Fiber
    "193.188.64.0/18",      // Umniah Fixed Line
    "193.188.128.0/17",     // Umniah Fixed Line
    "213.186.160.0/19",     // Additional Fiber Networks
    "213.139.32.0/19",      // Additional Fiber Networks
    "212.34.0.0/19"         // Additional Fiber Networks
];

// Jordan Residential Networks (Mixed Fiber/Mobile)
var JORDAN_RESIDENTIAL_CIDRS = [
    "62.72.161.0/24",       // Premium Residential
    "62.72.162.0/24",       // Premium Residential
    "62.72.165.0/24",       // Premium Residential
    "62.72.166.0/24",       // Premium Residential
    "62.72.168.0/22",       // Residential Cluster
    "62.72.174.0/24",       // Residential
    "62.72.176.0/24",       // Residential
    "62.72.179.0/24",       // Residential
    "62.72.180.0/24",       // Residential
    "62.72.184.0/22",       // Residential Cluster
    "62.72.191.0/24"        // Residential
];

// Jordan ISP Infrastructure
var JORDAN_ISP_CIDRS = [
    "91.220.32.0/19",       // ISP Infrastructure
    "185.8.192.0/18",       // ISP Networks
    "185.144.0.0/16",       // ISP Networks
    "193.189.0.0/16",       // ISP Networks
    "212.38.128.0/17",      // Government/ISP Networks
    "213.244.0.0/16"        // Government/ISP Networks
];

// Jordan Hosting/Data Centers
var JORDAN_HOSTING_CIDRS = [
    "91.220.32.0/19",       // Data Centers
    "185.8.192.0/18",       // Hosting Providers
    "185.144.0.0/16"        // Hosting Providers
];

// Jordan IPv6 Networks (Limited Availability)
var JORDAN_IPV6_CIDRS = [
    // Currently limited IPv6 deployment in Jordan
    // Add when verified IPv6 CIDRs become available
];


/* =========================================================
   🌐 DOMAIN RULES
   ========================================================= */

// Jordan Local Domains
var JORDAN_LOCAL_DOMAINS = [
    ".jo",
    ".umniah.com",
    ".zain.jo",
    ".orange.jo",
    ".damamax.jo",
    ".blink.jo",
    ".go.jo",
    ".edu.jo",
    ".mil.jo",
    ".gov.jo"
];

// Jordan ISP Domains
var JORDAN_ISP_DOMAINS = [
    ".umniah.com",
    ".zain.jo",
    ".orange.jo",
    ".damamax.jo",
    ".blink.jo"
];

// Jordan Services
var JORDAN_SERVICES = [
    ".jo",
    ".umniah.com",
    ".zain.jo",
    ".orange.jo",
    ".damamax.jo",
    ".blink.jo",
    ".go.jo",
    ".edu.jo"
];

// Gaming Domains
var GAME_DOMAINS = [
    ".pubg.com",
    ".pubgmobile.com",
    ".krafton.com",
    ".tencent.com",
    ".supercell.com",
    ".riotgames.com",
    ".ea.com",
    ".ubisoft.com",
    ".blizzard.com",
    ".activision.com",
    ".nexon.com",
    ".garena.com"
];

// CDN Domains
var CDN_DOMAINS = [
    ".cloudflare.com",
    ".akamai.net",
    ".edgekey.net",
    ".fastly.net",
    ".cloudfront.net",
    ".azureedge.net",
    ".googleusercontent.com",
    ".facebook.com",
    ".fbcdn.net"
];

// Global Domains (Generally Direct)
var GLOBAL_DOMAINS = [
    ".google.com",
    ".youtube.com",
    ".facebook.com",
    ".twitter.com",
    ".instagram.com",
    ".linkedin.com",
    ".microsoft.com",
    ".apple.com",
    ".amazon.com"
];

// Secure/Direct Domains (Always Direct)
var SECURE_DIRECT_DOMAINS = [
    ".bank",
    ".gov",
    ".mil",
    ".apple.com",
    ".icloud.com",
    ".paypal.com",
    ".visa.com",
    ".mastercard.com",
    ".amazontrust.com",
    ".entrust.net",
    ".globalsign.com",
    ".digicert.com",
    ".sectigo.com",
    ".godaddy.com"
];


/* =========================================================
   🛡️ UTILITY FUNCTIONS
   ========================================================= */

// Convert IP to Integer for CIDR matching
function ipToInt(ip) {
    var parts = ip.split(".");
    return (parseInt(parts[0]) << 24) |
           (parseInt(parts[1]) << 16) |
           (parseInt(parts[2]) << 8) |
           parseInt(parts[3]);
}

// Validate IPv4
function isIPv4(ip) {
    return /^(\d{1,3}\.){3}\d{1,3}$/.test(ip);
}

// Check if IP is in CIDR block
function isInCIDR(ip, cidr) {
    if (!isIPv4(ip)) return false;
    var parts = cidr.split("/");
    var subnet = parts[0];
    var prefixLength = parseInt(parts[1]);

    var mask = ~((1 << (32 - prefixLength)) - 1);
    return (ipToInt(ip) & mask) === (ipToInt(subnet) & mask);
}

// Check if IP belongs to any Jordan GSM network
function isJordanGSM(ip) {
    for (var i = 0; i < JORDAN_GSM_CIDRS.length; i++) {
        if (isInCIDR(ip, JORDAN_GSM_CIDRS[i])) {
            return true;
        }
    }
    return false;
}

// Check if IP belongs to any Jordan Fiber network
function isJordanFiber(ip) {
    for (var i = 0; i < JORDAN_FIBER_CIDRS.length; i++) {
        if (isInCIDR(ip, JORDAN_FIBER_CIDRS[i])) {
            return true;
        }
    }
    return false;
}

// Check if IP belongs to any Jordan Residential network
function isJordanResidential(ip) {
    for (var i = 0; i < JORDAN_RESIDENTIAL_CIDRS.length; i++) {
        if (isInCIDR(ip, JORDAN_RESIDENTIAL_CIDRS[i])) {
            return true;
        }
    }
    return false;
}

// Check if IP belongs to any Jordan ISP infrastructure
function isJordanISP(ip) {
    for (var i = 0; i < JORDAN_ISP_CIDRS.length; i++) {
        if (isInCIDR(ip, JORDAN_ISP_CIDRS[i])) {
            return true;
        }
    }
    return false;
}

// Check if IP belongs to any Jordan Hosting network
function isJordanHosting(ip) {
    for (var i = 0; i < JORDAN_HOSTING_CIDRS.length; i++) {
        if (isInCIDR(ip, JORDAN_HOSTING_CIDRS[i])) {
            return true;
        }
    }
    return false;
}

// Comprehensive Jordan IP check
function isJordanIP(ip) {
    return isJordanGSM(ip) || 
           isJordanFiber(ip) || 
           isJordanResidential(ip) || 
           isJordanISP(ip) || 
           isJordanHosting(ip);
}

// Check for private/reserved IP addresses
function isPrivateIP(ip) {
    return isInCIDR(ip, "127.0.0.0/8") ||    // Loopback
           isInCIDR(ip, "10.0.0.0/8") ||     // Private Class A
           isInCIDR(ip, "172.16.0.0/12") ||  // Private Class B
           isInCIDR(ip, "192.168.0.0/16") || // Private Class C
           isInCIDR(ip, "169.254.0.0/16") || // Link-local
           ip === "0.0.0.0" ||               // Unspecified
           isInCIDR(ip, "224.0.0.0/4") ||    // Multicast
           ip === "255.255.255.255";         // Broadcast
}


/* =========================================================
   🚦 ROUTING DECISION ENGINE
   ========================================================= */

// Determine the best route for a given destination
function determineBestRoute(host, resolvedIP) {
    // Handle IPv6
    if (isPlainHostName(host) || !isResolvable(host)) {
        if (IPV6_POLICY === "DIRECT") return "DIRECT";
        if (IPV6_POLICY === "PROXY") return PROXY_CHAIN;
        if (IPV6_POLICY === "BLOCK") return "PROXY 0.0.0.0:80";
        return "DIRECT";
    }

    // Check for private IPs
    if (resolvedIP && isPrivateIP(resolvedIP)) {
        return "DIRECT";
    }

    // Check for proxy loop prevention
    if (resolvedIP && PROXY_HOSTS.indexOf(resolvedIP) !== -1) {
        return "DIRECT";
    }

    // Handle secure domains
    if (SECURE_TRAFFIC_DIRECT) {
        for (var s = 0; s < SECURE_DIRECT_DOMAINS.length; s++) {
            if (dnsDomainIs(host, SECURE_DIRECT_DOMAINS[s])) {
                return "DIRECT";
            }
        }
    }

    // Check if destination is in Jordan
    var isDestinationJordan = resolvedIP && isJordanIP(resolvedIP);

    // Mode-based routing decisions
    switch (MODE) {
        case "JORDAN_PURE":
            if (isDestinationJordan) {
                // For Jordan destinations, prefer DIRECT for lowest latency
                return "DIRECT";
            } else if (NON_JORDAN_POLICY === "PROXY") {
                return PROXY_CHAIN;
            } else {
                return "DIRECT";
            }

        case "JORDAN_FIRST":
            if (isDestinationJordan) {
                return "DIRECT";
            } else if (NON_JORDAN_POLICY === "PROXY") {
                return PROXY_CHAIN;
            } else {
                return "DIRECT";
            }

        case "LOW_LATENCY":
            // For latency optimization, prefer DIRECT when possible
            return "DIRECT";

        case "BALANCED":
            if (isDestinationJordan) {
                return "DIRECT";
            } else if (NON_JORDAN_POLICY === "PROXY") {
                return PROXY_CHAIN;
            } else {
                return "DIRECT";
            }

        case "DIRECT_FALLBACK":
            return "DIRECT";

        default:
            return "DIRECT";
    }
}


/* =========================================================
   🌐 DOMAIN-BASED ROUTING
   ========================================================= */

// Check if host belongs to Jordan domains
function isJordanDomain(host) {
    for (var i = 0; i < JORDAN_LOCAL_DOMAINS.length; i++) {
        if (dnsDomainIs(host, JORDAN_LOCAL_DOMAINS[i])) {
            return true;
        }
    }
    return false;
}

// Check if host belongs to gaming domains
function isGameDomain(host) {
    for (var i = 0; i < GAME_DOMAINS.length; i++) {
        if (dnsDomainIs(host, GAME_DOMAINS[i])) {
            return true;
        }
    }
    return false;
}

// Check if host belongs to CDN domains
function isCDNDomain(host) {
    for (var i = 0; i < CDN_DOMAINS.length; i++) {
        if (dnsDomainIs(host, CDN_DOMAINS[i])) {
            return true;
        }
    }
    return false;
}


/* =========================================================
   🚀 MAIN PAC FUNCTION
   ========================================================= */

function FindProxyForURL(url, host) {
    // Input validation
    if (!host || host.length === 0) {
        return NO_PROXY_AVAILABLE_POLICY === "DIRECT" ? "DIRECT" : "PROXY 0.0.0.0:80";
    }

    // Normalize host
    var cleanHost = host.toLowerCase().trim();

    // Handle local/invalid hosts
    if (isPlainHostName(cleanHost) || 
        cleanHost.indexOf('.') === -1 || 
        cleanHost === 'localhost') {
        return "DIRECT";
    }

    // Resolve IP address
    var resolvedIP = dnsResolve(cleanHost);

    // Domain-based routing overrides
    // Secure domains always direct
    if (SECURE_TRAFFIC_DIRECT) {
        for (var s = 0; s < SECURE_DIRECT_DOMAINS.length; s++) {
            if (dnsDomainIs(cleanHost, SECURE_DIRECT_DOMAINS[s])) {
                return "DIRECT";
            }
        }
    }

    // Jordan domains
    if (isJordanDomain(cleanHost)) {
        // For Jordan domains, check if destination is actually in Jordan
        if (resolvedIP && isJordanIP(resolvedIP)) {
            return "DIRECT"; // Prefer direct for genuine Jordan destinations
        } else {
            // If domain is .jo but resolves outside Jordan, use policy
            return NON_JORDAN_POLICY === "PROXY" ? PROXY_CHAIN : "DIRECT";
        }
    }

    // Gaming traffic
    if (isGameDomain(cleanHost)) {
        // For gaming, prioritize low latency
        if (resolvedIP && isJordanIP(resolvedIP)) {
            return "DIRECT"; // Jordan game servers direct
        } else {
            // For non-Jordan game servers, use game policy
            return GAME_UNKNOWN_POLICY === "PROXY" ? PROXY_CHAIN : "DIRECT";
        }
    }

    // CDN traffic
    if (isCDNDomain(cleanHost)) {
        // CDNs should typically be direct for performance
        return "DIRECT";
    }

    // Main routing decision
    return determineBestRoute(cleanHost, resolvedIP);
}
