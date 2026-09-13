/* =========================================================
   🇯🇴 JORDAN PURE TITANIUM ROUTING ENGINE
   Production-Grade PAC - Smart Game Routing
   
   Core Principle:
   "DIRECT first for performance,
    JORDAN PROXY when Jordan servers/access needed,
    DIRECT as safe fallback"
   ========================================================= */


/* =========================================================
   🛠️ CONFIGURATION SECTION - BALANCED POLICY
   ========================================================= */

// Routing Mode Selection - Balanced approach
var MODE = "BALANCED"; // DIRECT + Jordan access when needed

// Strict Jordan Egress Control
var STRICT_JORDAN_EGRESS = false; // Allow DIRECT fallback

// Policy Configuration - Smart approach
var UNKNOWN_POLICY = "DIRECT";         // DIRECT for general browsing
var NON_JORDAN_POLICY = "DIRECT";      // DIRECT for performance
var IPV6_POLICY = "DIRECT";            // DIRECT for speed
var GAME_UNKNOWN_POLICY = "JORDAN";    // JORDAN for game server access
var NO_PROXY_AVAILABLE_POLICY = "DIRECT"; // DIRECT safe fallback


/* =========================================================
   🔌 PROXY CONFIGURATION
   ========================================================= */

// Verified Jordan Proxies (Prioritized for gaming)
var JORDAN_GSM_PROXY = "PROXY 85.159.217.18:80";      // Zain Jordan GSM
var JORDAN_FIBER_PROXY = "PROXY 46.32.119.124:8888";    // Orange Jordan Fiber
var JORDAN_RESIDENTIAL_PROXY = "PROXY 79.173.249.116:8080"; // Orange Jordan Residential
var JORDAN_ISP_PROXY = "PROXY 92.253.2.100:8080";      // Additional Jordan ISP

// Jordan Proxy Chain (GSM first for gaming)
var JORDAN_PROXY_CHAIN = JORDAN_GSM_PROXY + "; " + 
                        JORDAN_FIBER_PROXY + "; " + 
                        JORDAN_RESIDENTIAL_PROXY + "; " + 
                        JORDAN_ISP_PROXY;

// Standard Proxy Chain
var PROXY_CHAIN = JORDAN_GSM_PROXY + "; " + 
                  JORDAN_FIBER_PROXY + "; " + 
                  JORDAN_RESIDENTIAL_PROXY + "; " + 
                  JORDAN_ISP_PROXY;

// Proxy Endpoints to Prevent Loops
var PROXY_ENDPOINTS = [
    "85.159.217.18",
    "46.32.119.124",
    "79.173.249.116",
    "92.253.2.100"
];


/* =========================================================
   🇯🇴 JORDAN NETWORK CIDR DATABASE
   ========================================================= */

// Jordan GSM/LTE/5G Mobile Networks
var JORDAN_GSM_CIDRS = [
// 🇯🇴 JORDAN GSM / LTE / 5G — MOBILE NETWORKs

    // ==============================
    // 🇯🇴 ZAIN JORDAN — AS48832
    // ==============================

    "46.32.96.0/19",
    "94.142.32.0/19",
    "188.247.64.0/19",


    // ==============================
    // 🇯🇴 UMNIAH — AS9038
    // ==============================

    "109.107.224.0/19",
    "46.248.192.0/19",
    "95.172.192.0/19",
    "46.23.112.0/20",
    "46.248.208.0/20",


    // ==============================
    // 🇯🇴 ORANGE JORDAN — AS8376
    // ==============================

    // Mobile-only prefixes require
    // separate BGP/RDAP verification
    // before adding them here.
];

// Jordan Home Fiber/Fixed Broadband
var JORDAN_FIBER_CIDRS = [

    // 🇯🇴 Orange Jordan — AS8376
    "86.108.0.0/17",
    "92.253.0.0/17",
    "94.249.0.0/17",
    "149.200.128.0/17",
    "194.165.128.0/19",

    // 🇯🇴 Zain Jordan — AS48832
    "46.32.96.0/19",
    "176.28.128.0/17",
    "176.29.0.0/16",

    // 🇯🇴 Umniah — AS9038
    "46.248.192.0/19",
    "46.248.208.0/20",
    "95.172.192.0/19",
    "109.107.224.0/19"
];

// Jordan Residential Networks
var JORDAN_RESIDENTIAL_CIDRS = [

    // =========================================================
    // 🇯🇴 ZAIN JORDAN — AS48832
    // =========================================================

    "46.32.96.0/19",
    "94.142.32.0/19",
    "188.247.64.0/19",
    "176.28.128.0/17",
    "176.29.0.0/16",
    "77.245.0.0/20",
    "80.90.160.0/20",
    "87.238.128.0/21",
    "185.109.192.0/22",


    // =========================================================
    // 🇯🇴 UMNIAH — AS9038
    // =========================================================

    "5.45.128.0/22",
    "46.23.112.0/20",
    "46.248.192.0/19",
    "46.248.208.0/20",
    "95.172.192.0/19",
    "109.107.224.0/19",


    // =========================================================
    // 🇯🇴 ORANGE JORDAN — AS8376
    // =========================================================

    "86.108.0.0/17",
    "92.253.0.0/17",
    "94.249.0.0/17",
    "149.200.128.0/17",
    "194.165.128.0/19"
];

// Jordan ISP Infrastructure
var JORDAN_ISP_CIDRS = [
    "212.38.128.0/17",      // ISP Infrastructure
    "213.244.0.0/16",       // ISP Infrastructure
    "193.188.0.0/16",       // ISP Networks
    "91.220.32.0/19",       // ISP Infrastructure
    "185.8.192.0/18",       // ISP Networks
    "185.144.0.0/16"        // ISP Networks
];

// Jordan Hosting/Data Centers
var JORDAN_HOSTING_CIDRS = [
    "91.220.32.0/19",       // Data Centers
    "185.8.192.0/18",       // Hosting Providers
    "185.144.0.0/16",       // Hosting Providers
    "193.189.0.0/16"        // Hosting Providers
];

// Jordan IPv6 Networks (Candidate List)
var JORDAN_IPV6_CIDRS = [
    "2a01:9700::/29",
    "2a00:18d8::/29",
    "2a00:4620::/32",
    "2a05:7500::/29",
    "2a02:f0c0::/29"
];


/* =========================================================
   🌐 DOMAIN RULES
   ========================================================= */

// Jordan Domains
var JORDAN_DOMAINS = [
    ".jo",
    ".gov.jo",
    ".edu.jo",
    ".com.jo",
    ".net.jo",
    ".org.jo",
    ".umniah.com",
    ".zain.jo",
    ".orange.jo"
];

// Gaming Domains (Smart routing for Jordan servers)
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

// CDN Domains (DIRECT for performance)
var CDN_DOMAINS = [
    ".cloudfront.net",
    ".akamaihd.net",
    ".akamaized.net",
    ".fastly.net",
    ".gstatic.com",
    ".googleapis.com",
    ".fbcdn.net",
    ".cloudflare.com",
    ".edgekey.net",
    ".azureedge.net"
];


/* =========================================================
   🛡️ UTILITY FUNCTIONS
   ========================================================= */

// Normalize hostname
function normalizeHost(host) {
    if (!host) return "";
    return host.toLowerCase().trim();
}

// Check for localhost
function isLocalHost(host) {
    var normalized = normalizeHost(host);
    return normalized === "localhost" || 
           normalized === "localhost.localdomain" ||
           normalized === "";
}

// Check for private IPv4 addresses
function isPrivateIPv4(ip) {
    if (!ip || typeof ip !== "string") return true;
    
    // Parse IP
    var parts = ip.split(".");
    if (parts.length !== 4) return true;
    
    for (var i = 0; i < parts.length; i++) {
        var num = parseInt(parts[i]);
        if (isNaN(num) || num < 0 || num > 255) return true;
    }
    
    // Check private ranges
    var ipInt = (parseInt(parts[0]) << 24) | 
                (parseInt(parts[1]) << 16) | 
                (parseInt(parts[2]) << 8) | 
                parseInt(parts[3]);
                
    // 10.0.0.0/8
    if ((ipInt & 0xFF000000) === 0x0A000000) return true;
    
    // 172.16.0.0/12
    if ((ipInt & 0xFFF00000) === 0xAC100000) return true;
    
    // 192.168.0.0/16
    if ((ipInt & 0xFFFF0000) === 0xC0A80000) return true;
    
    // 127.0.0.0/8
    if ((ipInt & 0xFF000000) === 0x7F000000) return true;
    
    // 169.254.0.0/16
    if ((ipInt & 0xFFFF0000) === 0xA9FE0000) return true;
    
    return false;
}

// Convert CIDR to mask
function cidrMask(prefixLength) {
    if (prefixLength < 0 || prefixLength > 32) return 0;
    return ~((1 << (32 - prefixLength)) - 1);
}

// Match IP against CIDR list
function matchCIDRList(ip, cidrList) {
    if (!ip || !cidrList || !Array.isArray(cidrList)) return false;
    
    for (var i = 0; i < cidrList.length; i++) {
        var cidr = cidrList[i];
        if (typeof cidr !== "string") continue;
        
        var parts = cidr.split("/");
        if (parts.length !== 2) continue;
        
        var subnet = parts[0];
        var prefixLength = parseInt(parts[1]);
        if (isNaN(prefixLength) || prefixLength < 0 || prefixLength > 32) continue;
        
        // Convert to integers
        var ipParts = ip.split(".");
        var subnetParts = subnet.split(".");
        
        if (ipParts.length !== 4 || subnetParts.length !== 4) continue;
        
        var ipInt = (parseInt(ipParts[0]) << 24) | 
                   (parseInt(ipParts[1]) << 16) | 
                   (parseInt(ipParts[2]) << 8) | 
                   parseInt(ipParts[3]);
                   
        var subnetInt = (parseInt(subnetParts[0]) << 24) | 
                       (parseInt(subnetParts[1]) << 16) | 
                       (parseInt(subnetParts[2]) << 8) | 
                       parseInt(subnetParts[3]);
        
        var mask = cidrMask(prefixLength);
        
        if ((ipInt & mask) === (subnetInt & mask)) {
            return true;
        }
    }
    
    return false;
}

// Check if IP belongs to Jordan GSM networks
function isJordanGSM(ip) {
    return matchCIDRList(ip, JORDAN_GSM_CIDRS);
}

// Check if IP belongs to Jordan Fiber networks
function isJordanFiber(ip) {
    return matchCIDRList(ip, JORDAN_FIBER_CIDRS);
}

// Check if IP belongs to Jordan Residential networks
function isJordanResidential(ip) {
    return matchCIDRList(ip, JORDAN_RESIDENTIAL_CIDRS);
}

// Check if IP belongs to Jordan ISP networks
function isJordanISP(ip) {
    return matchCIDRList(ip, JORDAN_ISP_CIDRS);
}

// Check if IP belongs to Jordan Hosting networks
function isJordanHosting(ip) {
    return matchCIDRList(ip, JORDAN_HOSTING_CIDRS);
}

// Check if IP belongs to Jordan IPv6 networks
function isJordanIPv6(ip) {
    // Only check if isInNetEx function is available
    if (typeof isInNetEx !== "function") {
        return false;
    }
    
    // Check each IPv6 CIDR
    for (var i = 0; i < JORDAN_IPV6_CIDRS.length; i++) {
        try {
            if (isInNetEx(ip, JORDAN_IPV6_CIDRS[i])) {
                return true;
            }
        } catch (e) {
            // Continue checking other CIDRs
        }
    }
    
    return false;
}

// Check if host is Jordan domain
function isJordanDomain(host) {
    var normalized = normalizeHost(host);
    for (var i = 0; i < JORDAN_DOMAINS.length; i++) {
        if (normalized.endsWith(JORDAN_DOMAINS[i])) {
            return true;
        }
    }
    return false;
}

// Determine if destination is Jordan
function isJordanDestination(ip, host) {
    if (ip) {
        return isJordanGSM(ip) || 
               isJordanFiber(ip) || 
               isJordanResidential(ip) || 
               isJordanISP(ip) || 
               isJordanHosting(ip);
    }
    
    // Fallback to domain check
    return isJordanDomain(host);
}

// Check if host is game domain
function isGameDomain(host) {
    var normalized = normalizeHost(host);
    for (var i = 0; i < GAME_DOMAINS.length; i++) {
        if (normalized.endsWith(GAME_DOMAINS[i])) {
            return true;
        }
    }
    return false;
}

// Check if host is CDN domain
function isCDNDomain(host) {
    var normalized = normalizeHost(host);
    for (var i = 0; i < CDN_DOMAINS.length; i++) {
        if (normalized.endsWith(CDN_DOMAINS[i])) {
            return true;
        }
    }
    return false;
}

// Check if IP is proxy endpoint
function isProxyEndpoint(ip) {
    if (!ip || !Array.isArray(PROXY_ENDPOINTS)) return false;
    return PROXY_ENDPOINTS.indexOf(ip) !== -1;
}


/* =========================================================
   🎮 SMART GAME ROUTING ENGINE
   ========================================================= */

// Smart game routing for Jordan server access
function routeGameTraffic(host, resolvedIP) {
    // Check if destination is in Jordan
    var isJordanDest = resolvedIP && isJordanDestination(resolvedIP, host);
    
    // If destination is Jordan, use Jordan proxy for proper matchmaking
    if (isJordanDest) {
        return JORDAN_PROXY_CHAIN; // Jordan proxy for Jordan servers
    }
    
    // For non-Jordan game servers, check policy
    if (GAME_UNKNOWN_POLICY === "JORDAN") {
        return JORDAN_PROXY_CHAIN; // Jordan proxy for better regional access
    } else {
        return "DIRECT"; // Direct for international servers
    }
}

// Smart routing function
function smartRoute(host, resolvedIP) {
    // Handle localhost and private IPs
    if (isLocalHost(host) || (resolvedIP && isPrivateIPv4(resolvedIP))) {
        return "DIRECT";
    }
    
    // Prevent proxy loops
    if (resolvedIP && isProxyEndpoint(resolvedIP)) {
        return "DIRECT";
    }
    
    // Determine destination type
    var isJordanDest = resolvedIP && isJordanDestination(resolvedIP, host);
    var isGameDest = isGameDomain(host);
    var isCDNDest = isCDNDomain(host);
    var isJordanDomainOnly = isJordanDomain(host) && !resolvedIP;
    
    // Handle IPv6
    if (!resolvedIP && typeof isInNetEx === "function") {
        try {
            // Try to resolve IPv6
        } catch (e) {
            // Fall through to IPv6 policy
        }
        
        if (IPV6_POLICY === "DIRECT") return "DIRECT";
        if (IPV6_POLICY === "PROXY") return JORDAN_PROXY_CHAIN;
        if (IPV6_POLICY === "BLOCK") return "PROXY 0.0.0.0:80";
        return "DIRECT";
    }
    
    // Handle game traffic - Smart Jordan access
    if (isGameDest) {
        return routeGameTraffic(host, resolvedIP);
    }
    
    // Handle CDN traffic - Always DIRECT for performance
    if (isCDNDest) {
        return "DIRECT";
    }
    
    // Handle Jordan destinations - DIRECT for performance
    if (isJordanDest) {
        return "DIRECT";
    }
    
    // Handle Jordan domains without IP - Policy based
    if (isJordanDomainOnly) {
        return UNKNOWN_POLICY === "PROXY" ? JORDAN_PROXY_CHAIN : "DIRECT";
    }
    
    // Handle unknown destinations
    return UNKNOWN_POLICY === "PROXY" ? PROXY_CHAIN : "DIRECT";
}


/* =========================================================
   🎯 MAIN PAC FUNCTION
   ========================================================= */

function FindProxyForURL(url, host) {
    // Input validation
    if (!host || typeof host !== "string") {
        return "DIRECT";
    }
    
    // Normalize input
    var cleanHost = normalizeHost(host);
    
    // Quick bypass for local hosts
    if (isLocalHost(cleanHost)) {
        return "DIRECT";
    }
    
    // Resolve IP address
    var resolvedIP = null;
    try {
        resolvedIP = dnsResolve(cleanHost);
    } catch (e) {
        // DNS resolution failed, proceed with domain-only logic
    }
    
    // Perform smart routing decision
    try {
        return smartRoute(cleanHost, resolvedIP);
    } catch (e) {
        // Fallback in case of errors
        return "DIRECT";
    }
}
