/*
 * 🇯🇴🇰🇼 ALYAZOURI — JORDAN / KUWAIT PURE ROUTING PAC
 * Strong CIDR Database
 *
 * Jordan + Kuwait only
 * No Cloudflare / Google / Akamai / VPN / WARP ranges
 * No random foreign networks
 *
 * PAC limitation:
 * - PAC cannot measure real-time ping.
 * - PROXY entries are failover, not load balancing.
 */

var MODE = "BALANCED";

/* ============================================================
 * POLICY
 * ============================================================ */

var STRICT_JORDAN_EGRESS = false;

var UNKNOWN_POLICY        = "DIRECT";
var NON_JORDAN_POLICY     = "DIRECT";
var IPV6_POLICY           = "DIRECT";
var GAME_UNKNOWN_POLICY   = "JORDAN";
var NO_PROXY_AVAILABLE    = "DIRECT";


/* ============================================================
 * PROXY CHAINS
 * ============================================================ */

var JORDAN_GSM_PROXY =
    "PROXY 85.159.217.18:80";

var JORDAN_FIBER_PROXY =
    "PROXY 46.32.119.124:8888";

var JORDAN_RESIDENTIAL_PROXY =
    "PROXY 79.173.249.116:8080";

var JORDAN_ISP_PROXY =
    "PROXY 92.253.2.100:8080";


/*
 * Failover chain:
 *
 * GSM
 *  ↓
 * FIBER
 *  ↓
 * RESIDENTIAL
 *  ↓
 * ISP
 *  ↓
 * DIRECT
 *
 * PAC does NOT perform ping/load balancing.
 */

var JORDAN_PROXY_CHAIN =
    JORDAN_GSM_PROXY + "; " +
    JORDAN_FIBER_PROXY + "; " +
    JORDAN_RESIDENTIAL_PROXY + "; " +
    JORDAN_ISP_PROXY + "; DIRECT";


/* ============================================================
 * 🇯🇴 JORDAN — STRONG CORE NETWORKS
 * ============================================================ */

var JORDAN_GSM_CIDRS = [

    // Zain Jordan / mobile
    "46.32.96.0/19",

    // Zain Jordan
    "188.247.80.0/21"
];


var JORDAN_FIBER_CIDRS = [

    // Orange Jordan
    "46.185.128.0/17",
    "82.212.64.0/18",
    "92.253.0.0/17",
    "94.249.0.0/17",
    "149.200.128.0/17",

    // Jordan fixed / ISP
    "86.108.0.0/17",
    "176.28.128.0/17",
    "176.29.0.0/16"
];


var JORDAN_RESIDENTIAL_CIDRS = [

    // Major Jordan residential pools
    "46.32.96.0/19",
    "46.185.128.0/17",

    "82.212.64.0/18",
    "86.108.0.0/17",

    "92.253.0.0/17",
    "94.249.0.0/17",

    "149.200.128.0/17",

    "176.28.128.0/17",
    "176.29.0.0/16",

    "188.247.80.0/21"
];


var JORDAN_ISP_CIDRS = [

    // Jordan Telecom
    "212.34.0.0/19",

    // NITC / Jordan network
    "193.188.64.0/19"
];


var JORDAN_HOSTING_CIDRS = [

    /*
     * Kept separate intentionally.
     * Do not treat these as residential.
     */

    "91.220.32.0/19",
    "185.8.192.0/18",
    "185.144.0.0/16",
    "193.189.0.0/16"
];


/* ============================================================
 * 🇯🇴 JORDAN IPv6
 * ============================================================ */

var JORDAN_IPV6_CIDRS = [

    // Orange Jordan
    "2a01:9700::/29",
    "2a00:18d8::/29",

    // Umniah
    "2a00:4620::/32",
    "2a05:7500::/29",
    "2a02:f0c0::/29",
    "2a03:6d00::/32",
    "2a03:b640::/32",
    "2a05:74c0::/29",

    // Zain / Fastlink
    "2a13:8d40::/29",

    // DAMAMAX
    "2a00:18d0::/32",

    // Blink
    "2a02:25d8::/32",

    // Starlink Jordan
    "2a0d:3344:37c0::/42"
];


/* ============================================================
 * 🇰🇼 KUWAIT — STRONG NETWORKS
 * ============================================================ */

var KUWAIT_CIDRS = [

    // Fast / major Kuwait networks
    "46.186.128.0/17",

    // Kuwait Telecom / major ISP pools
    "62.150.0.0/18",
    "62.150.64.0/20",
    "62.150.80.0/21",
    "62.150.88.0/22",
    "62.150.93.0/24",
    "62.150.94.0/23",
    "62.150.96.0/19",
    "62.150.128.0/17",

    "62.215.0.0/19",
    "62.215.32.0/21",
    "62.215.40.0/25",
    "62.215.40.128/27",
    "62.215.40.160/29",
    "62.215.40.172/30",
    "62.215.40.176/28",
    "62.215.40.192/26",
    "62.215.41.0/24",
    "62.215.42.0/23",
    "62.215.44.0/22",
    "62.215.48.0/20",
    "62.215.64.0/18",
    "62.215.128.0/17",

    // Kuwait ISP pools
    "78.89.0.0/17",
    "78.89.128.0/22",
    "78.89.132.0/24",
    "78.89.134.0/23",
    "78.89.136.0/21",
    "78.89.144.0/20",
    "78.89.160.0/19",
    "78.89.192.0/18",

    "78.154.192.0/18",
    "78.159.160.0/19",

    "80.184.0.0/16",
    "83.96.0.0/17",

    "89.251.80.0/20",
    "91.140.128.0/17",

    "94.187.160.0/19",
    "95.66.0.0/17",

    // Kuwait mobile / telecom
    "168.187.0.0/16",
    "178.53.0.0/16",
    "178.61.0.0/16",
    "178.161.0.0/17",

    // Kuwait mobile networks
    "188.70.0.0/15",
    "188.236.0.0/16",

    // Kuwait government / enterprise networks
    // kept as country CIDRs, NOT residential
    "193.188.48.0/20",
    "193.188.160.0/19",

    "212.43.0.0/19"
];


/* ============================================================
 * 🇰🇼 KUWAIT IPv6
 * ============================================================ */

var KUWAIT_IPV6_CIDRS = [
    /*
     * No unverified IPv6 ranges added here.
     *
     * This is intentional:
     * country detection alone is not enough to classify
     * an IPv6 block as Kuwait residential.
     */
];


/* ============================================================
 * HELPERS
 * ============================================================ */

function isValidIPv4(ip) {
    if (!ip) return false;

    var p = ip.split(".");
    if (p.length !== 4) return false;

    for (var i = 0; i < 4; i++) {
        if (!/^\d+$/.test(p[i])) return false;

        var n = parseInt(p[i], 10);

        if (n < 0 || n > 255)
            return false;
    }

    return true;
}


function ipv4ToInt(ip) {

    if (!isValidIPv4(ip))
        return -1;

    var p = ip.split(".");

    return (
        ((parseInt(p[0], 10) << 24) >>> 0) +
        ((parseInt(p[1], 10) << 16) >>> 0) +
        ((parseInt(p[2], 10) << 8) >>> 0) +
        parseInt(p[3], 10)
    ) >>> 0;
}


function cidrMask(prefix) {

    if (prefix <= 0)
        return 0;

    if (prefix >= 32)
        return 0xFFFFFFFF;

    return (0xFFFFFFFF << (32 - prefix)) >>> 0;
}


function ipv4InCIDR(ip, cidr) {

    if (!isValidIPv4(ip))
        return false;

    var parts = cidr.split("/");

    if (parts.length !== 2)
        return false;

    var network = ipv4ToInt(parts[0]);
    var prefix = parseInt(parts[1], 10);

    if (network < 0 || prefix < 0 || prefix > 32)
        return false;

    var value = ipv4ToInt(ip);
    var mask = cidrMask(prefix);

    return ((value & mask) >>> 0) ===
           ((network & mask) >>> 0);
}


function isIPv6(ip) {

    if (!ip)
        return false;

    return ip.indexOf(":") !== -1;
}


function ipv6InCIDR(ip, cidr) {

    /*
     * PAC-compatible lightweight IPv6 prefix matcher.
     *
     * It compares normalized textual hexadecimal prefixes.
     */

    if (!isIPv6(ip))
        return false;

    var parts = cidr.split("/");

    if (parts.length !== 2)
        return false;

    var base = parts[0].toLowerCase();
    var prefix = parseInt(parts[1], 10);

    if (isNaN(prefix))
        return false;

    /*
     * PAC implementations differ significantly in IPv6 support.
     * Conservative fallback:
     * compare the hexadecimal prefix represented by the CIDR.
     */

    if (prefix === 0)
        return true;

    var neededHex = Math.floor(prefix / 4);

    var ipCompact = ip.toLowerCase();
    var baseCompact = base.toLowerCase();

    /*
     * Direct prefix check for common /29-/32 IPv6 allocations.
     */
    if (neededHex <= 0)
        return true;

    return ipCompact.substring(0, neededHex) ===
           baseCompact.substring(0, neededHex);
}


function matchesCIDRList(ip, list) {

    if (!ip || !list)
        return false;

    for (var i = 0; i < list.length; i++) {

        if (isIPv6(ip)) {

            if (ipv6InCIDR(ip, list[i]))
                return true;

        } else {

            if (ipv4InCIDR(ip, list[i]))
                return true;
        }
    }

    return false;
}


/* ============================================================
 * PRIVATE / LOCAL
 * ============================================================ */

function isPrivateIPv4(ip) {

    if (!isValidIPv4(ip))
        return false;

    return (
        ipv4InCIDR(ip, "10.0.0.0/8") ||
        ipv4InCIDR(ip, "172.16.0.0/12") ||
        ipv4InCIDR(ip, "192.168.0.0/16") ||
        ipv4InCIDR(ip, "127.0.0.0/8") ||

        // CGNAT
        ipv4InCIDR(ip, "100.64.0.0/10") ||

        // Link-local
        ipv4InCIDR(ip, "169.254.0.0/16")
    );
}


/* ============================================================
 * COUNTRY CLASSIFICATION
 * ============================================================ */

function isJordanIP(ip) {

    if (!ip)
        return false;

    if (isIPv6(ip))
        return matchesCIDRList(ip, JORDAN_IPV6_CIDRS);

    return (
        matchesCIDRList(ip, JORDAN_GSM_CIDRS) ||
        matchesCIDRList(ip, JORDAN_FIBER_CIDRS) ||
        matchesCIDRList(ip, JORDAN_RESIDENTIAL_CIDRS) ||
        matchesCIDRList(ip, JORDAN_ISP_CIDRS) ||
        matchesCIDRList(ip, JORDAN_HOSTING_CIDRS)
    );
}


function isKuwaitIP(ip) {

    if (!ip)
        return false;

    if (isIPv6(ip))
        return matchesCIDRList(ip, KUWAIT_IPV6_CIDRS);

    return matchesCIDRList(ip, KUWAIT_CIDRS);
}


/* ============================================================
 * PROVIDER CLASSIFICATION
 * ============================================================ */

function isJordanGSM(ip) {
    return matchesCIDRList(ip, JORDAN_GSM_CIDRS);
}


function isJordanFiber(ip) {
    return matchesCIDRList(ip, JORDAN_FIBER_CIDRS);
}


function isJordanResidential(ip) {
    return matchesCIDRList(ip, JORDAN_RESIDENTIAL_CIDRS);
}


function isJordanISP(ip) {
    return matchesCIDRList(ip, JORDAN_ISP_CIDRS);
}


/* ============================================================
 * HOST / DOMAIN HELPERS
 * ============================================================ */

function isLocalHost(host) {

    if (!host)
        return false;

    host = host.toLowerCase();

    return (
        host === "localhost" ||
        dnsDomainIs(host, ".local") ||
        dnsDomainIs(host, ".lan") ||
        dnsDomainIs(host, ".home")
    );
}


function isJordanDomain(host) {

    if (!host)
        return false;

    host = host.toLowerCase();

    return (
        dnsDomainIs(host, ".jo") ||
        host === "jo" ||
        dnsDomainIs(host, ".com.jo") ||
        dnsDomainIs(host, ".net.jo") ||
        dnsDomainIs(host, ".org.jo")
    );
}


function isKuwaitDomain(host) {

    if (!host)
        return false;

    host = host.toLowerCase();

    return (
        dnsDomainIs(host, ".kw") ||
        dnsDomainIs(host, ".com.kw") ||
        dnsDomainIs(host, ".net.kw") ||
        dnsDomainIs(host, ".org.kw")
    );
}


/* ============================================================
 * GAME DETECTION
 * ============================================================ */

function isGameHost(host) {

    if (!host)
        return false;

    host = host.toLowerCase();

    return (
        dnsDomainIs(host, "pubgmobile.com") ||
        dnsDomainIs(host, ".pubgmobile.com") ||
        dnsDomainIs(host, "tencent.com") ||
        dnsDomainIs(host, ".tencent.com")
    );
}


/* ============================================================
 * CDN / STATIC CONTENT
 * ============================================================ */

function isCDNHost(host) {

    if (!host)
        return false;

    host = host.toLowerCase();

    return (
        dnsDomainIs(host, ".cloudfront.net") ||
        dnsDomainIs(host, ".akamaihd.net") ||
        dnsDomainIs(host, ".akamaized.net") ||
        dnsDomainIs(host, ".fastly.net") ||
        dnsDomainIs(host, ".edgekey.net")
    );
}


/* ============================================================
 * PROXY LOOP PROTECTION
 * ============================================================ */

function proxyLoopProtection(host) {

    if (!host)
        return false;

    host = host.toLowerCase();

    /*
     * Never proxy obvious local/private names.
     */

    if (isLocalHost(host))
        return true;

    return false;
}


/* ============================================================
 * JORDAN ROUTING
 * ============================================================ */

function routeJordan(ip) {

    if (!ip)
        return JORDAN_PROXY_CHAIN;

    /*
     * GSM gets highest priority.
     */

    if (isJordanGSM(ip))
        return JORDAN_GSM_PROXY + "; " +
               JORDAN_FIBER_PROXY + "; DIRECT";


    /*
     * Fiber / fixed networks.
     */

    if (isJordanFiber(ip))
        return JORDAN_FIBER_PROXY + "; " +
               JORDAN_RESIDENTIAL_PROXY + "; " +
               JORDAN_ISP_PROXY + "; DIRECT";


    /*
     * Residential.
     */

    if (isJordanResidential(ip))
        return JORDAN_RESIDENTIAL_PROXY + "; " +
               JORDAN_FIBER_PROXY + "; " +
               JORDAN_ISP_PROXY + "; DIRECT";


    /*
     * ISP.
     */

    if (isJordanISP(ip))
        return JORDAN_ISP_PROXY + "; " +
               JORDAN_FIBER_PROXY + "; DIRECT";


    return JORDAN_PROXY_CHAIN;
}


/* ============================================================
 * KUWAIT ROUTING
 * ============================================================ */

function routeKuwait(ip) {

    /*
     * Kuwait is included as a country database,
     * but we do NOT force Kuwait traffic through
     * Jordan proxies.
     */

    return DIRECT;
}


/* ============================================================
 * MAIN ROUTER
 * ============================================================ */

function FindProxyForURL(url, host) {

    if (!host)
        return DIRECT;

    host = host.toLowerCase();

    /* --------------------------------------------------------
     * LOCAL
     * -------------------------------------------------------- */

    if (proxyLoopProtection(host))
        return DIRECT;


    /* --------------------------------------------------------
     * DIRECT LOCAL IP
     * -------------------------------------------------------- */

    var ip = null;

    /*
     * PAC dnsResolve can fail.
     */

    try {
        ip = dnsResolve(host);
    } catch (e) {
        ip = null;
    }


    if (ip && isPrivateIPv4(ip))
        return DIRECT;


    /* --------------------------------------------------------
     * IPv6
     * -------------------------------------------------------- */

    if (ip && isIPv6(ip)) {

        if (matchesCIDRList(ip, JORDAN_IPV6_CIDRS)) {

            if (isGameHost(host))
                return JORDAN_PROXY_CHAIN;

            return DIRECT;
        }

        return IPV6_POLICY;
    }


    /* --------------------------------------------------------
     * JORDAN DESTINATION
     * -------------------------------------------------------- */

    if (ip && isJordanIP(ip)) {

        /*
         * Jordan game traffic:
         * prioritize Jordan path.
         */

        if (isGameHost(host))
            return routeJordan(ip);

        /*
         * Normal Jordan destination:
         * direct is generally preferable.
         */

        return DIRECT;
    }


    /* --------------------------------------------------------
     * KUWAIT DESTINATION
     * -------------------------------------------------------- */

    if (ip && isKuwaitIP(ip)) {

        /*
         * Keep Kuwait traffic direct.
         */

        return routeKuwait(ip);
    }


    /* --------------------------------------------------------
     * COUNTRY DOMAINS
     * -------------------------------------------------------- */

    if (isJordanDomain(host)) {

        if (isGameHost(host))
            return JORDAN_PROXY_CHAIN;

        return DIRECT;
    }


    if (isKuwaitDomain(host))
        return DIRECT;


    /* --------------------------------------------------------
     * CDN
     * -------------------------------------------------------- */

    if (isCDNHost(host))
        return DIRECT;


    /* --------------------------------------------------------
     * PUBG / GAME TRAFFIC
     * -------------------------------------------------------- */

    if (isGameHost(host)) {

        /*
         * Unknown PUBG endpoint:
         * use Jordan route because GAME_UNKNOWN_POLICY
         * is JORDAN.
         */

        if (GAME_UNKNOWN_POLICY === "JORDAN")
            return JORDAN_PROXY_CHAIN;

        return DIRECT;
    }


    /* --------------------------------------------------------
     * UNKNOWN
     * -------------------------------------------------------- */

    return UNKNOWN_POLICY;
}
