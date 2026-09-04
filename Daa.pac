/* =========================================================
   T | JORDAN TITANIUM CORE v3
   🎮 PUBG MOBILE — STABLE LOW-JITTER ROUTING
   🇯🇴 JORDAN NETWORK PRIORITY
   🔒 SESSION-PERSISTENT / STICKY ROUTING
   ⚡ LOW-LATENCY PRIORITY
   🛡️ PROXY FAILOVER
   🖼️ PLAYER AVATAR ONLY → DIRECT
   🏆 CLAN / TEAM → PROXY
   🌐 UNKNOWN → PROXY
   ========================================================= */


/* =========================================================
   🌐 PROXY DEFINITIONS
   ========================================================= */

var PROXY_A = "PROXY 85.159.220.116:80";
var PROXY_B = "PROXY 92.253.119.135:80";
var PROXY_C = "PROXY 86.108.108.68:80";


/* =========================================================
   🔁 FAILOVER CHAINS
   ========================================================= */

var PROXY_CHAIN_A =
    PROXY_A + "; " +
    PROXY_B + "; " +
    PROXY_C;

var PROXY_CHAIN_B =
    PROXY_B + "; " +
    PROXY_A + "; " +
    PROXY_C;

var PROXY_CHAIN_C =
    PROXY_C + "; " +
    PROXY_A + "; " +
    PROXY_B;


/* =========================================================
   🔒 GLOBAL STICKY CORE
   ========================================================= */

var LOCKED_CORE = null;


/* =========================================================
   🧠 PAC CACHE
   ========================================================= */

var SCORE_CACHE = {};
var ROUTE_CACHE = {};

var CACHE_LIMIT = 512;


/* =========================================================
   ⚡ ULTRA HASH
   ========================================================= */

function ultraHash(str) {

    var h = 2166136261;

    for (var i = 0; i < str.length; i++) {

        h ^= str.charCodeAt(i);

        h +=
            (h << 1) +
            (h << 4) +
            (h << 7) +
            (h << 8) +
            (h << 24);
    }

    return h >>> 0;
}


/* =========================================================
   🧹 NORMALIZATION
   ========================================================= */

function normalizeHost(host) {

    host = host || "";

    host = host.toLowerCase();

    host = host.replace(/^\.+|\.+$/g, "");

    return host;
}


function normalizeURL(url) {

    url = url || "";

    url = url.toLowerCase();

    url = url.replace(/[\r\n\t]/g, "");

    return url;
}


/* =========================================================
   🇯🇴 JORDAN — PRIMARY RESIDENTIAL
   ========================================================= */

function isJordanResidential(host) {

    host = normalizeHost(host);

    return (

        /* Orange ADSL */

        isInNet(host,
            "46.185.180.0",
            "255.255.252.0") ||

        isInNet(host,
            "46.185.210.0",
            "255.255.254.0") ||

        isInNet(host,
            "46.185.220.0",
            "255.255.254.0") ||


        /* Orange residential */

        isInNet(host,
            "86.108.9.0",
            "255.255.255.0") ||

        isInNet(host,
            "86.108.10.0",
            "255.255.255.0") ||

        isInNet(host,
            "86.108.11.0",
            "255.255.255.0") ||

        isInNet(host,
            "86.108.12.0",
            "255.255.255.0") ||

        isInNet(host,
            "86.108.13.0",
            "255.255.255.0") ||

        isInNet(host,
            "86.108.14.0",
            "255.255.255.0") ||

        isInNet(host,
            "86.108.15.0",
            "255.255.255.0") ||


        /* Orange / JDC */

        isInNet(host,
            "86.108.28.0",
            "255.255.252.0") ||

        isInNet(host,
            "86.108.36.0",
            "255.255.252.0") ||

        isInNet(host,
            "86.108.40.0",
            "255.255.252.0") ||

        isInNet(host,
            "86.108.44.0",
            "255.255.252.0") ||

        isInNet(host,
            "86.108.48.0",
            "255.255.252.0") ||

        isInNet(host,
            "86.108.52.0",
            "255.255.252.0") ||

        isInNet(host,
            "86.108.56.0",
            "255.255.252.0") ||

        isInNet(host,
            "86.108.60.0",
            "255.255.252.0") ||


        /* Orange 149.200 */

        isInNet(host,
            "149.200.136.0",
            "255.255.255.0") ||

        isInNet(host,
            "149.200.137.0",
            "255.255.255.0") ||

        isInNet(host,
            "149.200.138.0",
            "255.255.255.0") ||

        isInNet(host,
            "149.200.139.0",
            "255.255.255.0") ||

        isInNet(host,
            "149.200.140.0",
            "255.255.255.0") ||

        isInNet(host,
            "149.200.141.0",
            "255.255.255.0") ||

        isInNet(host,
            "149.200.142.0",
            "255.255.255.0") ||

        isInNet(host,
            "149.200.143.0",
            "255.255.255.0") ||

        isInNet(host,
            "149.200.255.0",
            "255.255.255.0") ||


        /* Orange ADSL */

        isInNet(host,
            "213.186.173.0",
            "255.255.255.0") ||

        isInNet(host,
            "213.186.175.0",
            "255.255.255.0") ||

        isInNet(host,
            "213.186.176.0",
            "255.255.255.0") ||

        isInNet(host,
            "213.186.177.0",
            "255.255.255.0") ||

        isInNet(host,
            "213.186.179.0",
            "255.255.255.0") ||

        isInNet(host,
            "213.186.180.0",
            "255.255.255.0") ||

        isInNet(host,
            "213.186.182.0",
            "255.255.255.0") ||

        isInNet(host,
            "213.186.183.0",
            "255.255.255.0") ||

        isInNet(host,
            "213.186.184.0",
            "255.255.255.0") ||

        isInNet(host,
            "213.186.185.0",
            "255.255.255.0") ||

        isInNet(host,
            "213.186.187.0",
            "255.255.255.0") ||

        isInNet(host,
            "213.186.189.0",
            "255.255.255.0") ||

        isInNet(host,
            "213.186.190.0",
            "255.255.255.0") ||

        isInNet(host,
            "213.186.191.0",
            "255.255.255.0")
    );
}


/* =========================================================
   🇯🇴 JORDAN — EXTENDED
   ========================================================= */

function isJordanExtended(host) {

    host = normalizeHost(host);

    return (

        isInNet(host,
            "82.212.64.0",
            "255.255.192.0") ||

        isInNet(host,
            "188.123.160.0",
            "255.255.224.0")
    );
}


/* =========================================================
   🇯🇴 JORDAN — MOBILE
   ========================================================= */

function isJordanMobile(host) {

    host = normalizeHost(host);

    return (

        isInNet(host,
            "176.28.128.0",
            "255.255.128.0")
    );
}


/* =========================================================
   🇯🇴 JORDAN — SMALL RESIDENTIAL
   ========================================================= */

function isJordanSmallResidential(host) {

    host = normalizeHost(host);

    return (

        isInNet(host,
            "62.72.161.0",
            "255.255.255.0") ||

        isInNet(host,
            "62.72.162.0",
            "255.255.255.0") ||

        isInNet(host,
            "62.72.165.0",
            "255.255.255.0") ||

        isInNet(host,
            "62.72.166.0",
            "255.255.255.0") ||

        isInNet(host,
            "62.72.168.0",
            "255.255.252.0") ||

        isInNet(host,
            "62.72.174.0",
            "255.255.255.0") ||

        isInNet(host,
            "62.72.176.0",
            "255.255.255.0") ||

        isInNet(host,
            "62.72.179.0",
            "255.255.255.0") ||

        isInNet(host,
            "62.72.180.0",
            "255.255.255.0") ||

        isInNet(host,
            "62.72.184.0",
            "255.255.252.0") ||

        isInNet(host,
            "62.72.191.0",
            "255.255.255.0")
    );
}


/* =========================================================
   📊 REGION TIER
   ========================================================= */

function regionTier(host) {

    host = normalizeHost(host);

    if (isJordanResidential(host)) {
        return 3;
    }

    if (isJordanSmallResidential(host)) {
        return 3;
    }

    if (isJordanMobile(host)) {
        return 3;
    }

    if (isJordanExtended(host)) {
        return 2;
    }

    return 1;
}


/* =========================================================
   🎮 PUBG IDENTIFIERS
   ========================================================= */

function isPUBGIdentifier(s) {

    return (

        /(^|[.\-_])pubg([.\-_]|$)/.test(s) ||

        /(^|[.\-_])pubgm([.\-_]|$)/.test(s) ||

        /(^|[.\-_])pubgmobile([.\-_]|$)/.test(s) ||

        /(^|[.\-_])pubgsea([.\-_]|$)/.test(s) ||

        /(^|[.\-_])pubgkr([.\-_]|$)/.test(s) ||

        /(^|[.\-_])pubgcs([.\-_]|$)/.test(s) ||

        /(^|[.\-_])pubgme([.\-_]|$)/.test(s)
    );
}


/* =========================================================
   🎮 PUBLISHER
   ========================================================= */

function isPUBGPublisher(s) {

    return (

        /(^|[.\-_])krafton([.\-_]|$)/.test(s) ||

        /(^|[.\-_])tencent([.\-_]|$)/.test(s) ||

        /(^|[.\-_])lightspeed([.\-_]|$)/.test(s) ||

        /(^|[.\-_])proximabeta([.\-_]|$)/.test(s) ||

        /(^|[.\-_])igame([.\-_]|$)/.test(s) ||

        /(^|[.\-_])levelinfinite([.\-_]|$)/.test(s)
    );
}


/* =========================================================
   ☁️ CLOUD / INFRA
   ========================================================= */

function isPUBGInfra(s) {

    return (

        /qcloud/.test(s) ||
        /myqcloud/.test(s) ||
        /tencentcs/.test(s) ||
        /tencentcloud/.test(s) ||

        /amazonaws/.test(s) ||
        /aliyun/.test(s) ||
        /alibaba/.test(s) ||

        /cloudfront/.test(s)
    );
}


/* =========================================================
   🎮 GAME SERVICES
   ========================================================= */

function isPUBGService(s) {

    return (

        /matchmaking/.test(s) ||
        /matchmaker/.test(s) ||

        /gameserver/.test(s) ||
        /game-server/.test(s) ||

        /gamesession/.test(s) ||
        /game-session/.test(s) ||

        /sessionserver/.test(s) ||
        /session-server/.test(s) ||

        /matchserver/.test(s) ||
        /match-server/.test(s) ||

        /dispatcher/.test(s) ||
        /allocation/.test(s) ||

        /lobby/.test(s) ||
        /gateway/.test(s) ||

        /realtime/.test(s) ||
        /realtimegame/.test(s)
    );
}


/* =========================================================
   🗺️ MAPS / MODES
   ========================================================= */

function isPUBGMode(s) {

    return (

        /erangel/.test(s) ||
        /livik/.test(s) ||
        /sanhok/.test(s) ||
        /miramar/.test(s) ||
        /vikendi/.test(s) ||
        /karakin/.test(s) ||
        /nusa/.test(s) ||

        /tdm/.test(s) ||
        /teamdeathmatch/.test(s) ||

        /payload/.test(s) ||
        /metroroyale/.test(s) ||
        /metro-royale/.test(s) ||

        /arena/.test(s) ||
        /classic/.test(s) ||
        /ranked/.test(s)
    );
}


/* =========================================================
   🔌 API
   ========================================================= */

function isPUBGAPI(u) {

    return (

        /(\/api\/|\/v1\/|\/v2\/|\/v3\/|\/v4\/)/.test(u) &&

        /(game|match|session|battle|player|server|region|lobby|team|clan)/.test(u)
    );
}


/* =========================================================
   🌍 SERVER DISCOVERY
   ========================================================= */

function isPUBGServerDiscovery(s,u) {

    return (

        /(serverlist|server-list|realm|routing|regionlist|region-list|endpoint)/.test(u) &&

        /(game|match|player|pubg|pubgm|tencent|krafton|server)/.test(s)
    );
}


/* =========================================================
   📦 RESOURCES / PATCHES
   ========================================================= */

function isPUBGResource(s,u) {

    return (

        /(patch|update|resource|asset|hotfix|download|manifest|version)/.test(u) &&

        /(pubg|pubgm|tencent|lightspeed|proximabeta|krafton|game)/.test(s)
    );
}


/* =========================================================
   🔐 AUTH
   ========================================================= */

function isPUBGAuth(s) {

    return (

        /login/.test(s) ||
        /signin/.test(s) ||
        /auth/.test(s) ||
        /oauth/.test(s) ||
        /token/.test(s) ||
        /account/.test(s) ||
        /identity/.test(s)
    );
}


/* =========================================================
   👥 SOCIAL
   ========================================================= */

function isPUBGSocial(s) {

    return (

        /friend/.test(s) ||
        /friends/.test(s) ||
        /social/.test(s) ||
        /squad/.test(s) ||
        /team/.test(s) ||
        /clan/.test(s) ||
        /guild/.test(s)
    );
}


/* =========================================================
   👤 PLAYER PROFILE
   ========================================================= */

function isPlayerProfile(s,u) {

    return (

        /(profile|playerprofile|player-profile|userinfo|user-info|avatar|headicon|portrait)/.test(u) &&

        /(player|user|profile|avatar|pubg|pubgm)/.test(s)
    );
}


/* =========================================================
   🖼️ PLAYER AVATAR — DIRECT
   ========================================================= */

function isPlayerAvatar(host,url) {

    var h = normalizeHost(host);
    var u = normalizeURL(url);

    var s = h + " " + u;


    if (!isPlayerProfile(s,u)) {

        return false;
    }


    return (

        /avatar/.test(u) ||
        /headicon/.test(u) ||
        /portrait/.test(u) ||
        /playeravatar/.test(u) ||
        /player-avatar/.test(u)
    );
}


/* =========================================================
   🏆 CLAN / TEAM IMAGE
   ========================================================= */

function isClanTeamAsset(host,url) {

    var h = normalizeHost(host);
    var u = normalizeURL(url);

    var s = h + " " + u;


    return (

        /clanicon/.test(s) ||
        /clan-icon/.test(s) ||

        /guildicon/.test(s) ||
        /guild-icon/.test(s) ||

        /teamicon/.test(s) ||
        /team-icon/.test(s) ||

        /clan/.test(s) ||
        /guild/.test(s) ||

        /emblem/.test(s) ||
        /badge/.test(s)
    );
}


/* =========================================================
   🧠 PUBG SCORE
   ========================================================= */

function getPUBGScore(host,url) {

    var h = normalizeHost(host);
    var u = normalizeURL(url);

    var key = h + "|" + u;


    if (SCORE_CACHE[key] !== undefined) {

        return SCORE_CACHE[key];
    }


    var s = h + " " + u;

    var score = 0;


    if (isPUBGIdentifier(s)) {
        score += 100;
    }


    if (isPUBGPublisher(s)) {
        score += 85;
    }


    if (isPUBGInfra(s)) {
        score += 25;
    }


    if (isPUBGService(s)) {
        score += 70;
    }


    if (isPUBGMode(s)) {
        score += 45;
    }


    if (isPUBGAPI(u)) {
        score += 35;
    }


    if (isPUBGServerDiscovery(s,u)) {
        score += 40;
    }


    if (isPUBGResource(s,u)) {
        score += 30;
    }


    if (isPUBGAuth(s)) {
        score += 35;
    }


    if (isPUBGSocial(s)) {
        score += 20;
    }


    if (
        /match/.test(s) &&
        /(game|session|battle|server)/.test(s)
    ) {

        score += 15;
    }


    if (
        /battle/.test(s) &&
        /(game|match|session|server)/.test(s)
    ) {

        score += 15;
    }


    SCORE_CACHE[key] = score;


    return score;
}


/* =========================================================
   🏆 PUBG DETECTION
   ========================================================= */

function isPUBG(host,url) {

    return getPUBGScore(host,url) >= 60;
}


/* =========================================================
   🔒 STICKY PROXY SELECTION
   ========================================================= */

function selectCore(host,url) {

    /*
       Once selected, keep the same core.
       It survives:
       - Lobby
       - Match
       - Results
       - Profile
       - Next match
       - Background requests
    */

    if (LOCKED_CORE !== null) {

        return LOCKED_CORE;
    }


    var tier = regionTier(host);


    /*
       Jordan residential/mobile:
       primary core.
    */

    if (tier === 3) {

        LOCKED_CORE = PROXY_A;

        return LOCKED_CORE;
    }


    /*
       Extended Jordan:
       primary core.
    */

    if (tier === 2) {

        LOCKED_CORE = PROXY_A;

        return LOCKED_CORE;
    }


    /*
       Unknown destination:
       deterministic initial choice.
    */

    var hash = ultraHash(
        normalizeHost(host) +
        "|" +
        normalizeURL(url)
    );


    var selector = hash % 3;


    if (selector === 0) {

        LOCKED_CORE = PROXY_A;

    } else if (selector === 1) {

        LOCKED_CORE = PROXY_B;

    } else {

        LOCKED_CORE = PROXY_C;
    }


    return LOCKED_CORE;
}


/* =========================================================
   🛡️ STABLE FAILOVER
   ========================================================= */

function selectStableProxy(host,url) {

    var core = selectCore(host,url);


    if (core === PROXY_A) {

        return PROXY_CHAIN_A;
    }


    if (core === PROXY_B) {

        return PROXY_CHAIN_B;
    }


    return PROXY_CHAIN_C;
}


/* =========================================================
   🖼️ IMAGE ROUTING
   ========================================================= */

function selectImageRoute(host,url) {

    /*
       Individual player avatar:
       DIRECT.
    */

    if (isPlayerAvatar(host,url)) {

        return "DIRECT";
    }


    /*
       Clan/team:
       always proxy.
    */

    if (isClanTeamAsset(host,url)) {

        return selectStableProxy(host,url);
    }


    /*
       Everything else:
       proxy.
    */

    return selectStableProxy(host,url);
}


/* =========================================================
   🌐 DEFAULT ROUTE
   ========================================================= */

function selectNonPUBGCore(host,url) {

    /*
       ZERO DIRECT.

       This prevents unknown traffic from
       bypassing the proxy.
    */

    return selectStableProxy(host,url);
}


/* =========================================================
   🧠 MASTER ROUTER
   ========================================================= */

function routeTraffic(host,url) {

    host = normalizeHost(host);
    url = normalizeURL(url);


    var key = host + "|" + url;


    if (ROUTE_CACHE[key] !== undefined) {

        return ROUTE_CACHE[key];
    }


    var route;


    /*
       1 — Player Avatar
    */

    if (isPlayerAvatar(host,url)) {

        route = "DIRECT";
    }


    /*
       2 — Clan / Team
    */

    else if (isClanTeamAsset(host,url)) {

        route = selectStableProxy(host,url);
    }


    /*
       3 — PUBG
    */

    else if (isPUBG(host,url)) {

        route = selectStableProxy(host,url);
    }


    /*
       4 — Everything else
    */

    else {

        route = selectNonPUBGCore(host,url);
    }


    ROUTE_CACHE[key] = route;


    return route;
}


/* =========================================================
   🚀 MAIN PAC
   ========================================================= */

function FindProxyForURL(url,host) {

    host = normalizeHost(host);
    url = normalizeURL(url);


    /* =====================================================
       👤 PLAYER AVATAR
       ===================================================== */

    if (isPlayerAvatar(host,url)) {

        return "DIRECT";
    }


    /* =====================================================
       🏆 CLAN / TEAM
       ===================================================== */

    if (isClanTeamAsset(host,url)) {

        return selectStableProxy(host,url);
    }


    /* =====================================================
       🎮 PUBG MOBILE
       ===================================================== */

    if (isPUBG(host,url)) {

        return selectStableProxy(host,url);
    }


    /* =====================================================
       🌐 EVERYTHING ELSE
       ===================================================== */

    return selectNonPUBGCore(host,url);
}
