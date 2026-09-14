/* =========================================================
   🇯🇴 JORDAN PURE TITANIUM ROUTING ENGINE
   Production-Grade PAC - Smart Game Routing

   Core Principle:
   DIRECT first for performance
   JORDAN PROXY when Jordan access is required
   DIRECT fallback when no suitable proxy is available

   Version: 2026
   ========================================================= */


/* =========================================================
   🛠️ CONFIGURATION
   ========================================================= */

var MODE = "BALANCED";

var STRICT_JORDAN_EGRESS = false;

var UNKNOWN_POLICY = "DIRECT";
var NON_JORDAN_POLICY = "DIRECT";
var IPV6_POLICY = "DIRECT";
var GAME_UNKNOWN_POLICY = "JORDAN";
var NO_PROXY_AVAILABLE_POLICY = "DIRECT";


/* =========================================================
   🔌 JORDAN PROXY CONFIGURATION
   ========================================================= */

var JORDAN_GSM_PROXY =
    "PROXY 85.159.217.18:80";

var JORDAN_FIBER_PROXY =
    "PROXY 46.32.119.124:8888";

var JORDAN_RESIDENTIAL_PROXY =
    "PROXY 79.173.249.116:8080";

var JORDAN_ISP_PROXY =
    "PROXY 92.253.2.100:8080";


/* =========================================================
   🇯🇴 JORDAN PROXY CHAINS
   ========================================================= */

var JORDAN_PROXY_CHAIN =
    JORDAN_GSM_PROXY + "; " +
    JORDAN_FIBER_PROXY + "; " +
    JORDAN_RESIDENTIAL_PROXY + "; " +
    JORDAN_ISP_PROXY;


var PROXY_CHAIN =
    JORDAN_GSM_PROXY + "; " +
    JORDAN_FIBER_PROXY + "; " +
    JORDAN_RESIDENTIAL_PROXY + "; " +
    JORDAN_ISP_PROXY;


/* =========================================================
   🛡️ PROXY LOOP PROTECTION
   ========================================================= */

var PROXY_ENDPOINTS = [
    "85.159.217.18",
    "46.32.119.124",
    "79.173.249.116",
    "92.253.2.100"
];


/* =========================================================
   🇯🇴 JORDAN NETWORK DATABASE
   ========================================================= */


/* =========================================================
   📱 JORDAN GSM / LTE / 5G
   ========================================================= */

var JORDAN_GSM_CIDRS = [

    // ============================================
    // 🇯🇴 ZAIN JORDAN
    // ============================================

    "46.32.96.0/19",
    "188.247.80.0/21"

];


/* =========================================================
   🏠 JORDAN HOME FIBER / FIXED
   ========================================================= */

var JORDAN_FIBER_CIDRS = [

    // ============================================
    // 🇯🇴 ORANGE JORDAN
    // ============================================

    "82.212.64.0/18",
    "86.108.0.0/17",
    "92.253.0.0/17",
    "94.249.0.0/17",
    "149.200.128.0/17",
    "46.185.128.0/17",

    // ============================================
    // 🇯🇴 JORDAN FIXED
    // ============================================

    "176.28.128.0/17",
    "176.29.0.0/16"

];


/* =========================================================
   🏡 JORDAN RESIDENTIAL
   ========================================================= */

var JORDAN_RESIDENTIAL_CIDRS = [

    // ============================================
    // 🇯🇴 ZAIN JORDAN
    // ============================================

    "46.32.96.0/19",
    "188.247.80.0/21",

    // ============================================
    // 🇯🇴 ORANGE JORDAN
    // ============================================

    "82.212.64.0/18",
    "86.108.0.0/17",
    "92.253.0.0/17",
    "94.249.0.0/17",
    "149.200.128.0/17",
    "46.185.128.0/17",

    // ============================================
    // 🇯🇴 JORDAN FIXED / RESIDENTIAL
    // ============================================

    "176.28.128.0/17",
    "176.29.0.0/16",

    // ============================================
    // 🇯🇴 JORDAN ISP ACCESS
    // ============================================

    "193.188.64.0/19",
    "212.34.0.0/19"
];


/* =========================================================
   🏢 JORDAN ISP INFRASTRUCTURE
   ========================================================= */

var JORDAN_ISP_CIDRS = [

    // ============================================
    // 🇯🇴 JORDAN TELECOMMUNICATIONS
    // ============================================

    "212.34.0.0/19",

    // ============================================
    // 🇯🇴 JORDAN ISP / NATIONAL NETWORK
    // ============================================

    "193.188.64.0/19"

];


/* =========================================================
   🏢 JORDAN HOSTING / DATA CENTERS
   ========================================================= */

var JORDAN_HOSTING_CIDRS = [

    "91.220.32.0/19",
    "185.8.192.0/18",
    "185.144.0.0/16",
    "193.189.0.0/16"

];


/* =========================================================
   🌐 JORDAN IPv6 DATABASE
   ========================================================= */

var JORDAN_IPV6_CIDRS = [

    // ============================================
    // 🇯🇴 ORANGE JORDAN
    // ============================================

    "2a01:9700::/29",
    "2a00:18d8::/29",

    // ============================================
    // 🇯🇴 UMNIAH
    // ============================================

    "2a00:4620::/32",
    "2a05:7500::/29",
    "2a02:f0c0::/29",
    "2a03:6d00::/32",
    "2a03:b640::/32",
    "2a05:74c0::/29",

    // ============================================
    // 🇯🇴 ZAIN / FASTLINK
    // ============================================

    "2a13:8d40::/29",

    // ============================================
    // 🇯🇴 DAMAMAX
    // ============================================

    "2a00:18d0::/32",

    // ============================================
    // 🇯🇴 BLINK
    // ============================================

    "2a02:25d8::/32",

    // ============================================
    // 🇯🇴 STARLINK JORDAN
    // ============================================

    "2a0d:3344:37c0::/42"

];


/* =========================================================
   🌐 JORDAN DOMAINS
   ========================================================= */

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


/* =========================================================
   🎮 GAME DOMAINS
   ========================================================= */

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


/* =========================================================
   🚀 CDN DOMAINS
   ========================================================= */

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
   🛠️ UTILITY FUNCTIONS
   ========================================================= */


/* ---------------------------------------------------------
   Normalize hostname
   --------------------------------------------------------- */

function normalizeHost(host) {

    if (!host) {
        return "";
    }

    return host
        .toLowerCase()
        .trim();

}


/* ---------------------------------------------------------
   Localhost detection
   --------------------------------------------------------- */

function isLocalHost(host) {

    var normalized = normalizeHost(host);

    return (
        normalized === "localhost" ||
        normalized === "localhost.localdomain" ||
        normalized === ""
    );

}


/* ---------------------------------------------------------
   IPv4 validation
   --------------------------------------------------------- */

function isValidIPv4(ip) {

    if (!ip || typeof ip !== "string") {
        return false;
    }

    var parts = ip.split(".");

    if (parts.length !== 4) {
        return false;
    }

    for (var i = 0; i < 4; i++) {

        var n = parseInt(parts[i], 10);

        if (
            isNaN(n) ||
            n < 0 ||
            n > 255
        ) {
            return false;
        }

    }

    return true;

}


/* ---------------------------------------------------------
   Private IPv4 detection
   --------------------------------------------------------- */

function isPrivateIPv4(ip) {

    if (!isValidIPv4(ip)) {
        return true;
    }

    var parts = ip.split(".");

    var a = parseInt(parts[0], 10);
    var b = parseInt(parts[1], 10);

    // 10.0.0.0/8
    if (a === 10) {
        return true;
    }

    // 172.16.0.0/12
    if (
        a === 172 &&
        b >= 16 &&
        b <= 31
    ) {
        return true;
    }

    // 192.168.0.0/16
    if (
        a === 192 &&
        b === 168
    ) {
        return true;
    }

    // 127.0.0.0/8
    if (a === 127) {
        return true;
    }

    // 169.254.0.0/16
    if (
        a === 169 &&
        b === 254
    ) {
        return true;
    }

    // 100.64.0.0/10
    if (
        a === 100 &&
        b >= 64 &&
        b <= 127
    ) {
        return true;
    }

    return false;

}


/* ---------------------------------------------------------
   CIDR mask
   --------------------------------------------------------- */

function cidrMask(prefixLength) {

    if (
        prefixLength < 0 ||
        prefixLength > 32
    ) {
        return 0;
    }

    if (prefixLength === 0) {
        return 0;
    }

    return (
        -1 <<
        (32 - prefixLength)
    );

}


/* ---------------------------------------------------------
   IPv4 → integer
   --------------------------------------------------------- */

function ipv4ToInt(ip) {

    var parts = ip.split(".");

    return (
        ((parseInt(parts[0], 10) << 24) >>> 0) |
        ((parseInt(parts[1], 10) << 16) >>> 0) |
        ((parseInt(parts[2], 10) << 8) >>> 0) |
        (parseInt(parts[3], 10) >>> 0)
    ) >>> 0;

}


/* ---------------------------------------------------------
   Match IPv4 against CIDR
   --------------------------------------------------------- */

function matchCIDR(ip, cidr) {

    if (
        !isValidIPv4(ip) ||
        typeof cidr !== "string"
    ) {
        return false;
    }

    var parts = cidr.split("/");

    if (parts.length !== 2) {
        return false;
    }

    var subnet = parts[0];

    var prefixLength =
        parseInt(parts[1], 10);

    if (
        !isValidIPv4(subnet) ||
        isNaN(prefixLength) ||
        prefixLength < 0 ||
        prefixLength > 32
    ) {
        return false;
    }

    if (prefixLength === 0) {
        return true;
    }

    var ipInt =
        ipv4ToInt(ip);

    var subnetInt =
        ipv4ToInt(subnet);

    var mask =
        cidrMask(prefixLength) >>> 0;

    return (
        (ipInt & mask) ===
        (subnetInt & mask)
    );

}


/* ---------------------------------------------------------
   Match IP against CIDR list
   --------------------------------------------------------- */

function matchCIDRList(ip, cidrList) {

    if (
        !ip ||
        !cidrList ||
        !Array.isArray(cidrList)
    ) {
        return false;
    }

    for (
        var i = 0;
        i < cidrList.length;
        i++
    ) {

        if (
            matchCIDR(
                ip,
                cidrList[i]
            )
        ) {
            return true;
        }

    }

    return false;

}


/* =========================================================
   🇯🇴 NETWORK CLASSIFICATION
   ========================================================= */


/* ---------------------------------------------------------
   Jordan GSM
   --------------------------------------------------------- */

function isJordanGSM(ip) {

    return matchCIDRList(
        ip,
        JORDAN_GSM_CIDRS
    );

}


/* ---------------------------------------------------------
   Jordan Fiber
   --------------------------------------------------------- */

function isJordanFiber(ip) {

    return matchCIDRList(
        ip,
        JORDAN_FIBER_CIDRS
    );

}


/* ---------------------------------------------------------
   Jordan Residential
   --------------------------------------------------------- */

function isJordanResidential(ip) {

    return matchCIDRList(
        ip,
        JORDAN_RESIDENTIAL_CIDRS
    );

}


/* ---------------------------------------------------------
   Jordan ISP
   --------------------------------------------------------- */

function isJordanISP(ip) {

    return matchCIDRList(
        ip,
        JORDAN_ISP_CIDRS
    );

}


/* ---------------------------------------------------------
   Jordan Hosting
   --------------------------------------------------------- */

function isJordanHosting(ip) {

    return matchCIDRList(
        ip,
        JORDAN_HOSTING_CIDRS
    );

}


/* ---------------------------------------------------------
   Jordan IPv6
   --------------------------------------------------------- */

function isJordanIPv6(ip) {

    if (
        !ip ||
        typeof isInNetEx !== "function"
    ) {
        return false;
    }

    for (
        var i = 0;
        i < JORDAN_IPV6_CIDRS.length;
        i++
    ) {

        try {

            if (
                isInNetEx(
                    ip,
                    JORDAN_IPV6_CIDRS[i]
                )
            ) {
                return true;
            }

        } catch (e) {
            // Continue
        }

    }

    return false;

}


/* =========================================================
   🌐 DOMAIN CLASSIFICATION
   ========================================================= */


/* ---------------------------------------------------------
   Jordan domain
   --------------------------------------------------------- */

function isJordanDomain(host) {

    var normalized =
        normalizeHost(host);

    for (
        var i = 0;
        i < JORDAN_DOMAINS.length;
        i++
    ) {

        if (
            normalized.endsWith(
                JORDAN_DOMAINS[i]
            )
        ) {
            return true;
        }

    }

    return false;

}


/* ---------------------------------------------------------
   Game domain
   --------------------------------------------------------- */

function isGameDomain(host) {

    var normalized =
        normalizeHost(host);

    for (
        var i = 0;
        i < GAME_DOMAINS.length;
        i++
    ) {

        if (
            normalized.endsWith(
                GAME_DOMAINS[i]
            )
        ) {
            return true;
        }

    }

    return false;

}


/* ---------------------------------------------------------
   CDN domain
   --------------------------------------------------------- */

function isCDNDomain(host) {

    var normalized =
        normalizeHost(host);

    for (
        var i = 0;
        i < CDN_DOMAINS.length;
        i++
    ) {

        if (
            normalized.endsWith(
                CDN_DOMAINS[i]
            )
        ) {
            return true;
        }

    }

    return false;

}


/* =========================================================
   🇯🇴 DESTINATION CLASSIFICATION
   ========================================================= */

function isJordanDestination(
    ip,
    host
) {

    if (ip) {

        // IPv4
        if (isValidIPv4(ip)) {

            return (
                isJordanGSM(ip) ||
                isJordanFiber(ip) ||
                isJordanResidential(ip) ||
                isJordanISP(ip) ||
                isJordanHosting(ip)
            );

        }

        // IPv6
        return isJordanIPv6(ip);

    }

    // Domain fallback
    return isJordanDomain(host);

}


/* =========================================================
   🛡️ PROXY LOOP PROTECTION
   ========================================================= */

function isProxyEndpoint(ip) {

    if (
        !ip ||
        !Array.isArray(PROXY_ENDPOINTS)
    ) {
        return false;
    }

    return (
        PROXY_ENDPOINTS.indexOf(ip) !== -1
    );

}


/* =========================================================
   🎮 GAME ROUTING
   ========================================================= */

function routeGameTraffic(
    host,
    resolvedIP
) {

    var isJordanDest =
        isJordanDestination(
            resolvedIP,
            host
        );


    /*
     * Jordan destination:
     * use Jordan proxy chain.
     */

    if (isJordanDest) {

        return JORDAN_PROXY_CHAIN;

    }


    /*
     * Non-Jordan game destination.
     *
     * Current policy:
     * JORDAN for regional/game access.
     */

    if (
        GAME_UNKNOWN_POLICY ===
        "JORDAN"
    ) {

        return JORDAN_PROXY_CHAIN;

    }


    /*
     * Otherwise direct.
     */

    return "DIRECT";

}


/* =========================================================
   🧠 SMART ROUTING ENGINE
   ========================================================= */

function smartRoute(
    host,
    resolvedIP
) {

    /* -----------------------------------------------------
       Local / private
       ----------------------------------------------------- */

    if (
        isLocalHost(host) ||
        (
            resolvedIP &&
            isValidIPv4(resolvedIP) &&
            isPrivateIPv4(resolvedIP)
        )
    ) {

        return "DIRECT";

    }


    /* -----------------------------------------------------
       Proxy loop prevention
       ----------------------------------------------------- */

    if (
        resolvedIP &&
        isProxyEndpoint(resolvedIP)
    ) {

        return "DIRECT";

    }


    /* -----------------------------------------------------
       Classification
       ----------------------------------------------------- */

    var isJordanDest =
        resolvedIP &&
        isJordanDestination(
            resolvedIP,
            host
        );

    var isGameDest =
        isGameDomain(host);

    var isCDNDest =
        isCDNDomain(host);

    var isJordanDomainOnly =
        isJordanDomain(host) &&
        !resolvedIP;


    /* -----------------------------------------------------
       IPv6
       ----------------------------------------------------- */

    if (
        resolvedIP &&
        resolvedIP.indexOf(":") !== -1
    ) {

        if (
            isJordanIPv6(resolvedIP)
        ) {

            return "DIRECT";

        }

        if (
            IPV6_POLICY ===
            "PROXY"
        ) {

            return JORDAN_PROXY_CHAIN;

        }

        if (
            IPV6_POLICY ===
            "BLOCK"
        ) {

            return "PROXY 0.0.0.0:80";

        }

        return "DIRECT";

    }


    /* -----------------------------------------------------
       Game traffic
       ----------------------------------------------------- */

    if (isGameDest) {

        return routeGameTraffic(
            host,
            resolvedIP
        );

    }


    /* -----------------------------------------------------
       CDN
       ----------------------------------------------------- */

    if (isCDNDest) {

        return "DIRECT";

    }


    /* -----------------------------------------------------
       Jordan destination
       ----------------------------------------------------- */

    if (isJordanDest) {

        return "DIRECT";

    }


    /* -----------------------------------------------------
       Jordan domain without resolved IP
       ----------------------------------------------------- */

    if (isJordanDomainOnly) {

        if (
            UNKNOWN_POLICY ===
            "PROXY"
        ) {

            return JORDAN_PROXY_CHAIN;

        }

        return "DIRECT";

    }


    /* -----------------------------------------------------
       Unknown destination
       ----------------------------------------------------- */

    if (
        UNKNOWN_POLICY ===
        "PROXY"
    ) {

        return PROXY_CHAIN;

    }


    return "DIRECT";

}


/* =========================================================
   🎯 MAIN PAC FUNCTION
   ========================================================= */

function FindProxyForURL(
    url,
    host
) {

    /* -----------------------------------------------------
       Input validation
       ----------------------------------------------------- */

    if (
        !host ||
        typeof host !== "string"
    ) {

        return "DIRECT";

    }


    /* -----------------------------------------------------
       Normalize hostname
       ----------------------------------------------------- */

    var cleanHost =
        normalizeHost(host);


    /* -----------------------------------------------------
       Localhost
       ----------------------------------------------------- */

    if (
        isLocalHost(cleanHost)
    ) {

        return "DIRECT";

    }


    /* -----------------------------------------------------
       DNS resolution
       ----------------------------------------------------- */

    var resolvedIP = null;

    try {

        resolvedIP =
            dnsResolve(cleanHost);

    } catch (e) {

        resolvedIP = null;

    }


    /* -----------------------------------------------------
       Smart route
       ----------------------------------------------------- */

    try {

        return smartRoute(
            cleanHost,
            resolvedIP
        );

    } catch (e) {

        /*
         * Absolute safety fallback.
         * Never break browsing because
         * of a PAC classification error.
         */

        return "DIRECT";

    }

}
