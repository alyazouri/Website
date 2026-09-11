/*
 * 🇯🇴 JORDAN TITANIUM — ACCURATE JORDAN CIDR ENGINE
 *
 * FULL INTERNET PROXY MODE
 *
 * EVERYTHING → PROXY
 *
 * DIRECT:
 *   • YouTube
 *   • GitHub
 *   • Local/private networks
 *   • Proxy endpoints
 *
 * Jordan CIDRs are used for CLASSIFICATION only.
 *
 * IMPORTANT:
 * A Jordan ASN/prefix does NOT automatically mean
 * every IP inside it is residential.
 *
 * Therefore this engine uses:
 *
 *   JORDAN_ACCESS_CIDRS
 *
 * rather than falsely labeling everything "residential".
 *
 * Proxy order = FAILOVER, NOT MULTI-HOP.
 *
 * YOUR PUBLIC IP:
 *   176.57.56.137
 *
 * © 2026 ALYAZOURI
 */


// ============================================================================
// YOUR PUBLIC IP — REFERENCE ONLY
// ============================================================================

var YOUR_IP_ADDRESS = "176.57.56.137";

/*
 * PAC cannot directly inspect the client's public source IP.
 *
 * This value is informational/configuration reference only.
 */


// ============================================================================
// PROXY POOL
// ============================================================================

var PROXY_A = "PROXY 86.108.0.214:80";
var PROXY_B = "PROXY 46.32.119.124:8888";
var PROXY_C = "PROXY 79.173.249.116:8080";


/*
 * FAILOVER:
 *
 * A
 * ↓ failure
 * B
 * ↓ failure
 * C
 *
 * NOT:
 *
 * A → B → C
 *
 * PAC does not create true multi-hop routing
 * using semicolon-separated PROXY entries.
 */

var PROXY_POOL =
    PROXY_A + "; " +
    PROXY_B + "; " +
    PROXY_C;


// ============================================================================
// PROXY HOSTS
// ============================================================================

var PROXY_HOSTS = [
    "86.108.0.214",
    "46.32.119.124",
    "79.173.249.116"
];


// ============================================================================
// 🇯🇴 JORDAN — ZAIN / AS48832
// ============================================================================
//
// Current sources confirm:
//
// 46.32.96.0/19
// 94.142.32.0/19
// 188.247.64.0/19
//
// AS48832 is Jordanian Mobile Phone Services Ltd.
// The ASN is an ISP/access network.
//
// Additional current Zain prefixes exist, but we do not
// blindly classify every AS48832 prefix as residential.
//
// ============================================================================

var JORDAN_ZAIN_CIDRS = [

    "46.32.96.0/19",
    "94.142.32.0/19",
    "188.247.64.0/19",

    // Current Zain access/broadband ranges
    "176.28.128.0/17",
    "176.29.0.0/16",
    "77.245.0.0/20",
    "80.90.160.0/20",
    "87.238.128.0/21",
    "185.109.192.0/22",
    "185.159.180.0/22"
];


/*
 * NOTE:
 *
 * 46.32.112.0/20 is NOT separately required because
 * it is completely contained inside:
 *
 * 46.32.96.0/19
 *
 * Keeping both would be redundant.
 */


// ============================================================================
// 🇯🇴 JORDAN — UMNIAH / AS9038
// ============================================================================
//
// Current ASN data identifies AS9038 as a Jordan consumer ISP.
//
// Verified/current access ranges include:
// ============================================================================

var JORDAN_UMNIAH_CIDRS = [

    "46.248.192.0/19",
    "95.172.192.0/19",
    "109.107.224.0/19",

    "46.23.112.0/20",
    "46.248.208.0/20",

    "212.35.64.0/20",
    "212.35.80.0/20",

    "85.159.216.0/21",

    "91.106.96.0/21",

    "91.186.224.0/20",
    "92.241.32.0/20",

    "37.220.112.0/20",

    "178.238.176.0/21",
    "178.238.184.0/21",

    "185.80.104.0/22"
];


// ============================================================================
// 🇯🇴 JORDAN — ORANGE / AS8376
// ============================================================================
//
// Orange's current Jordan allocations include:
//
// 86.108.0.0/17
// 79.173.192.0/18
// 194.165.128.0/19
//
// IMPORTANT:
// These are ISP/access allocations, NOT guaranteed
// residential-only blocks.
//
// ============================================================================

var JORDAN_ORANGE_CIDRS = [

    "86.108.0.0/17",
    "79.173.192.0/18",
    "194.165.128.0/19",

    // Additional Orange Jordan access allocations
    "37.202.64.0/18",
    "46.185.128.0/17",
    "92.253.0.0/17",
    "94.249.0.0/17",
    "149.200.128.0/17"
];


// ============================================================================
// ALL JORDAN ACCESS CIDRS
// ============================================================================

var JORDAN_ACCESS_CIDRS =
    JORDAN_ZAIN_CIDRS
    .concat(JORDAN_UMNIAH_CIDRS)
    .concat(JORDAN_ORANGE_CIDRS);


// ============================================================================
// DIRECT DOMAINS — YOUTUBE
// ============================================================================

var YOUTUBE_DOMAINS = [

    "youtube.com",
    "www.youtube.com",
    "m.youtube.com",

    "youtu.be",

    "youtube-nocookie.com",
    "www.youtube-nocookie.com",

    "googlevideo.com",

    "ytimg.com",

    "youtubei.googleapis.com"
];


// ============================================================================
// DIRECT DOMAINS — GITHUB
// ============================================================================

var GITHUB_DOMAINS = [

    "github.com",
    "www.github.com",

    "api.github.com",

    "raw.githubusercontent.com",

    "githubusercontent.com",

    "objects.githubusercontent.com",

    "githubassets.com",

    "github.io",

    "github.dev",

    "github.community"
];


// ============================================================================
// DIRECT SUFFIXES
// ============================================================================

var DIRECT_SUFFIXES = [

    ".youtube.com",
    ".youtube-nocookie.com",
    ".googlevideo.com",
    ".ytimg.com",

    ".github.com",
    ".githubusercontent.com",
    ".githubassets.com",
    ".github.io"
];


// ============================================================================
// DOMAIN MATCH
// ============================================================================

function isDirectDomain(host) {

    if (!host) return false;

    host = host.toLowerCase();


    // Exact domains

    for (var i = 0; i < YOUTUBE_DOMAINS.length; i++) {

        if (host === YOUTUBE_DOMAINS[i]) {
            return true;
        }
    }


    for (var j = 0; j < GITHUB_DOMAINS.length; j++) {

        if (host === GITHUB_DOMAINS[j]) {
            return true;
        }
    }


    // Subdomains

    for (var k = 0; k < DIRECT_SUFFIXES.length; k++) {

        if (
            host === DIRECT_SUFFIXES[k].substring(1) ||
            dnsDomainIs(host, DIRECT_SUFFIXES[k])
        ) {
            return true;
        }
    }


    return false;
}


// ============================================================================
// IPv4
// ============================================================================

function isIPv4(ip) {

    if (!ip) return false;

    return /^(\d{1,3}\.){3}\d{1,3}$/.test(ip);
}


function ipToInt(ip) {

    var p = ip.split(".");

    return (
        ((parseInt(p[0], 10) << 24) >>> 0) +
        ((parseInt(p[1], 10) << 16) >>> 0) +
        ((parseInt(p[2], 10) << 8) >>> 0) +
        (parseInt(p[3], 10) >>> 0)
    ) >>> 0;
}


// ============================================================================
// CIDR ENGINE
// ============================================================================

function isInCIDR(ip, cidr) {

    if (!isIPv4(ip)) return false;

    var parts = cidr.split("/");

    var network = parts[0];
    var prefix = parseInt(parts[1], 10);


    if (prefix < 0 || prefix > 32) {
        return false;
    }


    if (prefix === 0) {
        return true;
    }


    var mask =
        (0xFFFFFFFF << (32 - prefix)) >>> 0;


    return (
        (ipToInt(ip) & mask) >>> 0
    ) === (
        (ipToInt(network) & mask) >>> 0
    );
}


// ============================================================================
// JORDAN CLASSIFIER
// ============================================================================

function isJordanIPv4(ip) {

    if (!isIPv4(ip)) return false;


    for (var i = 0; i < JORDAN_ACCESS_CIDRS.length; i++) {

        if (
            isInCIDR(
                ip,
                JORDAN_ACCESS_CIDRS[i]
            )
        ) {
            return true;
        }
    }


    return false;
}


// ============================================================================
// PROVIDER CLASSIFIER
// ============================================================================

function getJordanProvider(ip) {

    if (!isIPv4(ip)) {
        return null;
    }


    // ZAIN

    for (var i = 0; i < JORDAN_ZAIN_CIDRS.length; i++) {

        if (
            isInCIDR(
                ip,
                JORDAN_ZAIN_CIDRS[i]
            )
        ) {
            return "ZAIN";
        }
    }


    // UMNIAH

    for (var j = 0; j < JORDAN_UMNIAH_CIDRS.length; j++) {

        if (
            isInCIDR(
                ip,
                JORDAN_UMNIAH_CIDRS[j]
            )
        ) {
            return "UMNIAH";
        }
    }


    // ORANGE

    for (var k = 0; k < JORDAN_ORANGE_CIDRS.length; k++) {

        if (
            isInCIDR(
                ip,
                JORDAN_ORANGE_CIDRS[k]
            )
        ) {
            return "ORANGE";
        }
    }


    return null;
}


// ============================================================================
// PRIVATE NETWORK
// ============================================================================

function isPrivateIPv4(ip) {

    if (!isIPv4(ip)) return false;


    return (

        isInCIDR(ip, "10.0.0.0/8") ||

        isInCIDR(ip, "172.16.0.0/12") ||

        isInCIDR(ip, "192.168.0.0/16") ||

        isInCIDR(ip, "127.0.0.0/8") ||

        isInCIDR(ip, "169.254.0.0/16") ||

        isInCIDR(ip, "100.64.0.0/10") ||

        isInCIDR(ip, "224.0.0.0/4") ||

        ip === "0.0.0.0" ||

        ip === "255.255.255.255"
    );
}


// ============================================================================
// IPv6
// ============================================================================

function isIPv6(ip) {

    if (!ip) return false;

    return ip.indexOf(":") !== -1;
}


// ============================================================================
// PROXY LOOP
// ============================================================================

function isProxyHost(ip) {

    if (!ip) return false;


    for (var i = 0; i < PROXY_HOSTS.length; i++) {

        if (ip === PROXY_HOSTS[i]) {
            return true;
        }
    }


    return false;
}


// ============================================================================
// MAIN PAC FUNCTION
// ============================================================================

function FindProxyForURL(url, host) {

    // ------------------------------------------------------------------------
    // NO HOST
    // ------------------------------------------------------------------------

    if (!host) {
        return PROXY_POOL;
    }


    host = host.toLowerCase();


    // ------------------------------------------------------------------------
    // YOUTUBE / GITHUB
    // ------------------------------------------------------------------------

    /*
     * These are the ONLY public Internet exceptions.
     */

    if (isDirectDomain(host)) {
        return "DIRECT";
    }


    // ------------------------------------------------------------------------
    // LOCAL HOSTNAMES
    // ------------------------------------------------------------------------

    if (isPlainHostName(host)) {
        return "DIRECT";
    }


    // ------------------------------------------------------------------------
    // DNS RESOLUTION
    // ------------------------------------------------------------------------

    var resolvedIP = null;

    try {

        resolvedIP = dnsResolve(host);

    } catch (e) {

        resolvedIP = null;
    }


    // ------------------------------------------------------------------------
    // DNS FAILURE
    // ------------------------------------------------------------------------

    /*
     * Cannot resolve?
     *
     * Still send it through proxy.
     */

    if (!resolvedIP) {
        return PROXY_POOL;
    }


    // ------------------------------------------------------------------------
    // PROXY LOOP PREVENTION
    // ------------------------------------------------------------------------

    if (isProxyHost(resolvedIP)) {
        return "DIRECT";
    }


    // ------------------------------------------------------------------------
    // PRIVATE NETWORK
    // ------------------------------------------------------------------------

    if (isPrivateIPv4(resolvedIP)) {
        return "DIRECT";
    }


    // ------------------------------------------------------------------------
    // IPv6
    // ------------------------------------------------------------------------

    if (isIPv6(resolvedIP)) {

        /*
         * YouTube/GitHub already excluded above.
         *
         * Everything else → proxy.
         */

        return PROXY_POOL;
    }


    // ------------------------------------------------------------------------
    // JORDAN CLASSIFICATION
    // ------------------------------------------------------------------------

    var jordanProvider =
        getJordanProvider(resolvedIP);


    /*
     * We intentionally do NOT change routing here.
     *
     * Whether destination is:
     *
     * ZAIN
     * UMNIAH
     * ORANGE
     * OTHER JORDAN
     * NON-JORDAN
     *
     * ALL PUBLIC INTERNET TRAFFIC STILL GOES:
     *
     *              ↓
     *         PROXY POOL
     *
     * Jordan classification is available for future
     * provider-specific routing logic.
     */


    // ------------------------------------------------------------------------
    // EVERYTHING ELSE
    // ------------------------------------------------------------------------

    return PROXY_POOL;
}


// ============================================================================
// END
// ============================================================================
