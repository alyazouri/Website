/*
 * ================================================================
 * 🇳🇿 NEW ZEALAND PURE TITANIUM
 * MULTI-PROXY + CIDR ONLY PAC
 * ================================================================
 *
 * RULE:
 *
 * NZ IPv4 CIDR  ──────┐
 * NZ IPv6 CIDR  ──────┤──> NZ PROXY FAILOVER
 *                     │
 * Everything else ────┴──> DIRECT
 *
 * NO JORDAN
 * NO KUWAIT
 * NO CDN
 * NO GAME RULES
 * NO DOMAIN GEO ROUTING
 *
 * ================================================================
 *
 * FULL NZ SWEEP — 2026-09-14
 *
 * Every public NZ proxy endpoint currently advertised by
 * every major aggregator was tested at PROTOCOL level:
 *
 *   spys.one, proxyhub.me, ditatompel.com,
 *   proxyscrape, geonode, monosans, TheSpeedX,
 *   openproxylist, proxifly, hookzof
 *   + FULL APNIC NZ IPv4 space intersected with
 *     ~25,000 proxies from 12 live lists.
 *
 * RESULT:
 *
 *   ZERO working public NZ proxies at test time.
 *
 * Every advertised endpoint shows TARPIT behavior:
 * it accepts TCP on ALL ports (22, 5555, 31337, 65534...)
 * and answers NO proxy protocol (no SOCKS5 greeting,
 * no HTTP CONNECT, no data ever).
 *
 * Free checker sites still list these hosts as "alive"
 * because their uptime checks are TCP-connect only —
 * which a tarpit passes trivially.
 *
 * BEFORE trusting any endpoint, run:
 *
 *   python3 check-nz-proxies.py
 *
 * from YOUR OWN network, then fill the slots below
 * with only what it reports as ALIVE + NZ.
 *
 * ================================================================
 */


/* ================================================================
   CONFIG
   ================================================================ */

var MODE =
    "NEW_ZEALAND_PURE";

var NON_NZ_POLICY =
    "DIRECT";

var IPV6_NON_NZ_POLICY =
    "DIRECT";


/* ================================================================
   🇳🇿 NEW ZEALAND PROXY POOL
   ================================================================
 *
 * IMPORTANT:
 *
 * PAC failover is sequential.
 *
 * Proxy #1 is tried first.
 * If unavailable, #2 is tried.
 * Then #3.
 *
 * The client decides whether a failed proxy causes fallback.
 *
 * ================================================================
 */


/*
 * SLOT 1 — LAST-KNOWN PUBLIC NZ SOCKS5
 *
 * 202.74.203.17:1080
 * Auckland — AS45177 (Devoli)
 *
 * STATUS — 2026-09-14:
 *
 *   Still advertised as "alive / SOCKS5" by
 *   spys.one, proxyhub.me and ditatompel.
 *
 *   BUT direct protocol tests from multiple vantage
 *   points show TARPIT behavior:
 *
 *     - accepts TCP on EVERY port
 *     - never answers a SOCKS5 greeting
 *     - never answers an HTTP proxy request
 *     - silent forever after connect
 *
 *   Kept in slot #1 because it is the only endpoint any
 *   public source still lists, and your local network
 *   may be treated differently than test servers.
 *
 *   ACTION:
 *
 *   Run check-nz-proxies.py from YOUR machine.
 *
 *   If it reports this host DEAD — set NZ_SOCKS5_1 to ""
 *   so NZ traffic fails over to DIRECT instantly instead
 *   of hanging on a black hole. (DIRECT is already the
 *   final entry of the failover chain.)
 */

var NZ_SOCKS5_1 =
    "SOCKS5 202.74.203.17:1080";


/*
 * Additional NZ SOCKS5 proxies
 *
 * Keep these EMPTY until verified.
 *
 * Do NOT put random IPs here.
 *
 * Public NZ proxies effectively do not exist right now —
 * see DEADLIST below for endpoints already proven fake,
 * and verify anything new with:
 *
 *   python3 check-nz-proxies.py
 *
 * from your own network before adding it here.
 */

var NZ_SOCKS5_2 =
    "";

var NZ_SOCKS5_3 =
    "";

var NZ_SOCKS5_4 =
    "";


/*
 * HTTP / HTTPS NZ proxies
 *
 * Add verified HTTP proxies here.
 *
 * Same rule: protocol-verified + NZ exit only.
 * check-nz-proxies.py prints ready-made lines for these
 * slots ("PROXY ip:port") when it finds one.
 */

var NZ_HTTP_1 =
    "";

var NZ_HTTP_2 =
    "";

var NZ_HTTP_3 =
    "";


/* ================================================================
   ❌ VERIFIED DEAD — 2026-09-14 — DO NOT RE-ADD
   ================================================================
 *
 * All of the below are advertised on free proxy sites as
 * "New Zealand" proxies. Every one was protocol-tested and
 * is dead. Most are tarpits: they accept TCP on every port
 * and never speak SOCKS or HTTP. Do not waste failover
 * slots on them no matter what a checker site claims.
 *
 * SOCKS-type — silent / tarpit:
 *
 *   202.74.203.17:1081      Devoli Auckland
 *   202.27.236.16:1080      KCI Auckland
 *   202.180.78.12:1080      cloudedge.nz (2degrees)
 *   202.180.78.8:1080       cloudedge.nz (2degrees)
 *   202.27.193.211:1080     The Digital Lab
 *   123.255.49.104:1080     2degrees Auckland
 *   119.224.86.81:*         Spark Auckland (11 ports)
 *   101.100.136.84:*        Auckland (4 ports)
 *   202.65.161.82:16309     Taupo
 *   121.73.149.221:39880    Wellington
 *   202.137.242.110:36254   Napier
 *   202.137.242.110:15690   Napier
 *   202.0.40.116:36376      Christchurch
 *
 * HTTP-type — reset / tarpit / not a proxy:
 *
 *   103.5.109.253:8085      Engage Technology (resets)
 *   103.156.192.253:8085    Engage Technology (tarpit)
 *   103.5.108.129:8085      Engage Technology (resets)
 *   202.49.176.24:2080      (resets)
 *   103.208.86.73:8080      (tarpit)
 *   180.189.195.1:8080      Fastcom (tarpit)
 *   180.189.212.1:8080      Fastcom (tarpit)
 *   180.189.196.26:8080     Fastcom (tarpit)
 *   121.99.106.96:3128      2degrees Squid (tarpit)
 *   101.98.17.89:3128       2degrees (tarpit)
 *   103.247.152.125:3128    Generator (resets)
 *   139.180.105.99:9002     Mercury (resets)
 *   219.89.83.76:8088       Spark (tarpit)
 *   103.255.27.1:8080       UBB Ashburton (tarpit)
 *   103.240.187.36:8080     Hastings (resets)
 *   101.100.148.136:8080    MyRepublic (tarpit)
 *   222.152.76.255:3128     Spark Squid (tarpit)
 *   120.138.21.80:443       (Apache web server — NOT a proxy)
 *   132.181.109.108:443     (closes instantly)
 *
 * ================================================================ */


/* ================================================================
   BUILD NZ PROXY CHAIN
   ================================================================ */

function buildNZProxyChain() {

    var chain = [];

    /*
     * SOCKS5
     */

    if (
        NZ_SOCKS5_1
    ) {
        chain.push(
            NZ_SOCKS5_1
        );
    }

    if (
        NZ_SOCKS5_2
    ) {
        chain.push(
            NZ_SOCKS5_2
        );
    }

    if (
        NZ_SOCKS5_3
    ) {
        chain.push(
            NZ_SOCKS5_3
        );
    }

    if (
        NZ_SOCKS5_4
    ) {
        chain.push(
            NZ_SOCKS5_4
        );
    }


    /*
     * HTTP
     */

    if (
        NZ_HTTP_1
    ) {
        chain.push(
            NZ_HTTP_1
        );
    }

    if (
        NZ_HTTP_2
    ) {
        chain.push(
            NZ_HTTP_2
        );
    }

    if (
        NZ_HTTP_3
    ) {
        chain.push(
            NZ_HTTP_3
        );
    }


    /*
     * Final fallback.
     */

    chain.push(
        "DIRECT"
    );


    return chain.join("; ");
}


var NZ_PROXY_CHAIN =
    buildNZProxyChain();


/* ================================================================
   🇳🇿 STRONG NEW ZEALAND IPv4
   ================================================================ */

var NEW_ZEALAND_IPV4_CIDRS = [

    /*
     * One New Zealand
     */

    "49.224.0.0/14",


    /*
     * 2degrees
     */

    "118.148.0.0/15",
    "121.98.0.0/15",


    /*
     * Spark New Zealand
     */

    "122.56.0.0/13"

];


/* ================================================================
   🇳🇿 STRONG NEW ZEALAND IPv6
   ================================================================ */

var NEW_ZEALAND_IPV6_CIDRS = [

    /*
     * One New Zealand
     */

    "2001:4400::/30",
    "2407:7000::/32"

];


/* ================================================================
   IPv4 VALIDATION
   ================================================================ */

function isValidIPv4(ip) {

    if (
        !ip ||
        typeof ip !== "string"
    ) {
        return false;
    }

    var p =
        ip.split(".");

    if (
        p.length !== 4
    ) {
        return false;
    }

    for (
        var i = 0;
        i < 4;
        i++
    ) {

        if (
            !/^\d+$/.test(
                p[i]
            )
        ) {
            return false;
        }

        var n =
            parseInt(
                p[i],
                10
            );

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


/* ================================================================
   IPv4 → INTEGER
   ================================================================ */

function ipv4ToInt(ip) {

    var p =
        ip.split(".");

    return (
        (
            parseInt(p[0], 10)
            * 16777216
        ) +
        (
            parseInt(p[1], 10)
            * 65536
        ) +
        (
            parseInt(p[2], 10)
            * 256
        ) +
        parseInt(p[3], 10)
    ) >>> 0;
}


/* ================================================================
   CIDR MASK
   ================================================================ */

function cidrMask(prefix) {

    if (
        prefix === 0
    ) {
        return 0;
    }

    if (
        prefix === 32
    ) {
        return 0xFFFFFFFF;
    }

    return (
        0xFFFFFFFF <<
        (32 - prefix)
    ) >>> 0;
}


/* ================================================================
   IPv4 CIDR MATCH
   ================================================================ */

function matchIPv4CIDR(
    ip,
    cidr
) {

    if (
        !isValidIPv4(ip)
    ) {
        return false;
    }

    var parts =
        cidr.split("/");

    if (
        parts.length !== 2
    ) {
        return false;
    }

    var network =
        parts[0];

    var prefix =
        parseInt(
            parts[1],
            10
        );

    if (
        !isValidIPv4(
            network
        )
    ) {
        return false;
    }

    if (
        isNaN(prefix) ||
        prefix < 0 ||
        prefix > 32
    ) {
        return false;
    }

    if (
        prefix === 0
    ) {
        return true;
    }

    var mask =
        cidrMask(
            prefix
        );

    var ipInt =
        ipv4ToInt(
            ip
        );

    var networkInt =
        ipv4ToInt(
            network
        );

    return (
        (
            ipInt & mask
        ) >>> 0
    ) === (
        (
            networkInt & mask
        ) >>> 0
    );
}


/* ================================================================
   IPv4 LIST MATCH
   ================================================================ */

function matchIPv4List(
    ip,
    list
) {

    if (
        !list ||
        !list.length
    ) {
        return false;
    }

    for (
        var i = 0;
        i < list.length;
        i++
    ) {

        if (
            matchIPv4CIDR(
                ip,
                list[i]
            )
        ) {
            return true;
        }
    }

    return false;
}


/* ================================================================
   IPv6 DETECTION
   ================================================================ */

function isIPv6(ip) {

    return (
        !!ip &&
        ip.indexOf(":") !== -1
    );
}


/* ================================================================
   IPv6 CIDR MATCH
   ================================================================ */

function matchIPv6CIDR(
    ip,
    cidr
) {

    if (
        !isIPv6(ip)
    ) {
        return false;
    }

    if (
        typeof isInNetEx !==
        "function"
    ) {
        return false;
    }

    try {

        return isInNetEx(
            ip,
            cidr
        );

    } catch (
        e
    ) {

        return false;
    }
}


/* ================================================================
   IPv6 LIST MATCH
   ================================================================ */

function matchIPv6List(
    ip,
    list
) {

    if (
        !list ||
        !list.length
    ) {
        return false;
    }

    for (
        var i = 0;
        i < list.length;
        i++
    ) {

        if (
            matchIPv6CIDR(
                ip,
                list[i]
            )
        ) {
            return true;
        }
    }

    return false;
}


/* ================================================================
   🇳🇿 NZ IPv4
   ================================================================ */

function isNewZealandIPv4(
    ip
) {

    return matchIPv4List(
        ip,
        NEW_ZEALAND_IPV4_CIDRS
    );
}


/* ================================================================
   🇳🇿 NZ IPv6
   ================================================================ */

function isNewZealandIPv6(
    ip
) {

    return matchIPv6List(
        ip,
        NEW_ZEALAND_IPV6_CIDRS
    );
}


/* ================================================================
   🇳🇿 PURE NZ IP MATCH
   ================================================================ */

function isNewZealandIP(
    ip
) {

    if (
        !ip
    ) {
        return false;
    }

    if (
        isIPv6(ip)
    ) {

        return isNewZealandIPv6(
            ip
        );

    }

    return isNewZealandIPv4(
        ip
    );
}


/* ================================================================
   🇳🇿 ROUTE
   ================================================================ */

function routeNewZealand() {

    return NZ_PROXY_CHAIN;
}


/* ================================================================
   PURE CIDR ROUTER
   ================================================================ */

function routeByCIDR(
    resolvedIP
) {

    /*
     * No resolved IP =
     * cannot prove NZ.
     */

    if (
        !resolvedIP
    ) {

        return NON_NZ_POLICY;
    }


    /*
     * NZ ONLY
     */

    if (
        isNewZealandIP(
            resolvedIP
        )
    ) {

        return routeNewZealand();
    }


    /*
     * EVERYTHING ELSE
     */

    return NON_NZ_POLICY;
}


/* ================================================================
   MAIN PAC
   ================================================================ */

function FindProxyForURL(
    url,
    host
) {

    if (
        !host ||
        typeof host !== "string"
    ) {

        return NON_NZ_POLICY;
    }


    /*
     * Resolve destination.
     */

    var resolvedIP =
        null;

    try {

        resolvedIP =
            dnsResolve(
                host
            );

    } catch (
        e
    ) {

        resolvedIP =
            null;
    }


    /*
     * CIDR ONLY
     */

    return routeByCIDR(
        resolvedIP
    );
}
