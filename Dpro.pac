/* =========================================================
   T | JORDAN GOLD CORE
   🎮 PUBG MOBILE — STABLE JORDAN ROUTING
   🇯🇴 JORDAN ISP / RESIDENTIAL CLASSIFICATION
   🏆 SOCIAL + MATCHMAKING + SERVER DISCOVERY
   🔒 ZERO DIRECT EXCEPT YOUTUBE + GITHUB
   ⚡ PAC COMPATIBLE / LOW COMPLEXITY
   ========================================================= */


/* =========================================================
   🇯🇴 CORE PROXY
   ========================================================= */

/*
   IMPORTANT:
   The proxy itself must be genuinely located/operated in Jordan
   if Jordan egress is required.

   PAC cannot verify the physical location of a proxy.
*/

var JORDAN_CORE = "PROXY 85.159.217.18:80";


/* =========================================================
   🚫 DIRECT EXCLUSIONS
   ========================================================= */

function isYouTube(host) {

    host = (host || "").toLowerCase();

    return (
        dnsDomainIs(host, "youtube.com") ||
        dnsDomainIs(host, ".youtube.com") ||

        dnsDomainIs(host, "youtube-nocookie.com") ||
        dnsDomainIs(host, ".youtube-nocookie.com") ||

        dnsDomainIs(host, "youtu.be") ||
        dnsDomainIs(host, ".youtu.be") ||

        dnsDomainIs(host, "ytimg.com") ||
        dnsDomainIs(host, ".ytimg.com") ||

        dnsDomainIs(host, "googlevideo.com") ||
        dnsDomainIs(host, ".googlevideo.com") ||

        dnsDomainIs(host, "youtubei.googleapis.com") ||
        dnsDomainIs(host, ".youtubei.googleapis.com")
    );
}


function isGitHub(host) {

    host = (host || "").toLowerCase();

    return (
        dnsDomainIs(host, "github.com") ||
        dnsDomainIs(host, ".github.com") ||

        dnsDomainIs(host, "github.io") ||
        dnsDomainIs(host, ".github.io") ||

        dnsDomainIs(host, "githubusercontent.com") ||
        dnsDomainIs(host, ".githubusercontent.com") ||

        dnsDomainIs(host, "githubassets.com") ||
        dnsDomainIs(host, ".githubassets.com") ||

        dnsDomainIs(host, "githubapp.com") ||
        dnsDomainIs(host, ".githubapp.com") ||

        dnsDomainIs(host, "api.github.com") ||

        dnsDomainIs(host, "raw.githubusercontent.com") ||
        dnsDomainIs(host, "codeload.github.com") ||

        dnsDomainIs(host, "objects.githubusercontent.com") ||

        dnsDomainIs(
            host,
            "release-assets.githubusercontent.com"
        ) ||

        dnsDomainIs(
            host,
            "github-releases.githubusercontent.com"
        )
    );
}


function isDirectExcluded(host) {

    return (
        isYouTube(host) ||
        isGitHub(host)
    );
}


/* =========================================================
   🇯🇴 JORDAN — TIER 3
   HIGH CONFIDENCE ISP / CUSTOMER NETWORKS
   ========================================================= */


/* ---------------------------------------------------------
   ZAIN JORDAN — AS48832
   --------------------------------------------------------- */

function isZainJordan(host) {

    return (

        /* Zain broadband */

        isInNet(
            host,
            "46.32.96.0",
            "255.255.224.0"
        ) ||

        /* Zain pool */

        isInNet(
            host,
            "94.142.32.0",
            "255.255.224.0"
        ) ||

        /* Zain Jordan */

        isInNet(
            host,
            "87.238.128.0",
            "255.255.248.0"
        ) ||

        /* Zain large Jordan block */

        isInNet(
            host,
            "176.28.128.0",
            "255.255.128.0"
        )
    );
}


/* ---------------------------------------------------------
   ORANGE JORDAN — AS8376
   --------------------------------------------------------- */

function isOrangeJordan(host) {

    return (

        /* Orange ADSL customers */

        isInNet(
            host,
            "46.185.128.0",
            "255.255.128.0"
        ) ||

        isInNet(
            host,
            "79.173.192.0",
            "255.255.192.0"
        ) ||

        isInNet(
            host,
            "86.108.0.0",
            "255.255.128.0"
        ) ||

        isInNet(
            host,
            "92.253.0.0",
            "255.255.128.0"
        ) ||

        isInNet(
            host,
            "94.249.0.0",
            "255.255.128.0"
        ) ||

        isInNet(
            host,
            "149.200.128.0",
            "255.255.128.0"
        ) ||

        isInNet(
            host,
            "37.202.64.0",
            "255.255.192.0"
        )
    );
}


/* ---------------------------------------------------------
   BATELCO / UMNIAH JORDAN — AS9038
   --------------------------------------------------------- */

function isBatelcoJordan(host) {

    return (

        isInNet(
            host,
            "109.107.224.0",
            "255.255.224.0"
        ) ||

        isInNet(
            host,
            "95.172.192.0",
            "255.255.224.0"
        ) ||

        isInNet(
            host,
            "46.23.112.0",
            "255.255.240.0"
        ) ||

        isInNet(
            host,
            "46.248.192.0",
            "255.255.224.0"
        )
    );
}


/* =========================================================
   🇯🇴 JORDAN — TIER 2
   EXTENDED ISP NETWORKS
   ========================================================= */

function isJordanExtended(host) {

    return (

        isInNet(
            host,
            "37.17.192.0",
            "255.255.240.0"
        ) ||

        isInNet(
            host,
            "37.44.32.0",
            "255.255.248.0"
        ) ||

        isInNet(
            host,
            "37.75.144.0",
            "255.255.248.0"
        ) ||

        isInNet(
            host,
            "37.123.64.0",
            "255.255.224.0"
        ) ||

        isInNet(
            host,
            "81.28.112.0",
            "255.255.240.0"
        ) ||

        isInNet(
            host,
            "84.18.32.0",
            "255.255.224.0"
        ) ||

        isInNet(
            host,
            "84.18.64.0",
            "255.255.224.0"
        ) ||

        isInNet(
            host,
            "87.236.232.0",
            "255.255.248.0"
        ) ||

        isInNet(
            host,
            "89.28.216.0",
            "255.255.248.0"
        ) ||

        isInNet(
            host,
            "89.38.152.0",
            "255.255.254.0"
        ) ||

        isInNet(
            host,
            "93.93.144.0",
            "255.255.248.0"
        ) ||

        isInNet(
            host,
            "93.95.200.0",
            "255.255.248.0"
        ) ||

        isInNet(
            host,
            "94.127.208.0",
            "255.255.248.0"
        ) ||

        isInNet(
            host,
            "95.141.208.0",
            "255.255.240.0"
        ) ||

        isInNet(
            host,
            "176.57.0.0",
            "255.255.224.0"
        ) ||

        isInNet(
            host,
            "178.20.184.0",
            "255.255.248.0"
        )
    );
}


/* =========================================================
   🇯🇴 JORDAN REGION CLASSIFIER
   ========================================================= */

function jordanTier(host) {

    if (isZainJordan(host)) {
        return 3;
    }

    if (isOrangeJordan(host)) {
        return 3;
    }

    if (isBatelcoJordan(host)) {
        return 3;
    }

    if (isJordanExtended(host)) {
        return 2;
    }

    return 1;
}


/* =========================================================
   🎮 PUBG — CORE DOMAIN DETECTION
   ========================================================= */

function isPUBGCore(s) {

    return (

        /(^|[.\-_])pubg([.\-_]|$)/.test(s) ||
        /(^|[.\-_])pubgm([.\-_]|$)/.test(s) ||
        /(^|[.\-_])pubgmobile([.\-_]|$)/.test(s) ||
        /(^|[.\-_])pubgsea([.\-_]|$)/.test(s) ||
        /(^|[.\-_])pubgkr([.\-_]|$)/.test(s) ||
        /(^|[.\-_])pubgcs([.\-_]|$)/.test(s)
    );
}


/* =========================================================
   🎮 PUBG — PUBLISHERS
   ========================================================= */

function isPUBGPublisher(s) {

    return (

        /(^|[.\-_])krafton([.\-_]|$)/.test(s) ||
        /(^|[.\-_])tencent([.\-_]|$)/.test(s) ||
        /(^|[.\-_])lightspeed([.\-_]|$)/.test(s) ||
        /(^|[.\-_])proximabeta([.\-_]|$)/.test(s) ||
        /(^|[.\-_])igame([.\-_]|$)/.test(s)
    );
}


/* =========================================================
   🎮 PUBG — MATCHMAKING
   ========================================================= */

function isPUBGMatchmaking(s) {

    return (

        /matchmaking/.test(s) ||
        /matchmaker/.test(s) ||
        /matchserver/.test(s) ||
        /match-server/.test(s) ||

        /gamesession/.test(s) ||
        /game-session/.test(s) ||

        /sessionserver/.test(s) ||
        /session-server/.test(s) ||

        /gameserver/.test(s) ||
        /game-server/.test(s) ||

        /dispatcher/.test(s) ||
        /allocation/.test(s)
    );
}


/* =========================================================
   👥 PUBG — SOCIAL / TEAM / FRIEND
   ========================================================= */

function isPUBGSocial(s) {

    return (

        /friend/.test(s) ||
        /friends/.test(s) ||

        /social/.test(s) ||

        /recruit/.test(s) ||
        /recruitment/.test(s) ||

        /team/.test(s) ||
        /squad/.test(s) ||

        /party/.test(s) ||

        /invite/.test(s) ||
        /invitation/.test(s) ||

        /profile/.test(s) ||
        /player/.test(s) ||

        /clan/.test(s) ||
        /guild/.test(s)
    );
}


/* =========================================================
   🌍 PUBG — SERVER / REGION DISCOVERY
   ========================================================= */

function isPUBGRegionDiscovery(s,u) {

    return (

        /(serverlist|server-list|serverdiscovery|server-discovery)/.test(u) ||

        /(realm|routing|region|regionlist|region-list)/.test(u)
    ) &&

    /(pubg|pubgm|game|match|server|player|tencent|krafton)/.test(s);
}


/* =========================================================
   🔌 PUBG — API
   ========================================================= */

function isPUBGAPI(u) {

    return (

        /(\/api\/|\/v1\/|\/v2\/|\/v3\/)/.test(u) &&

        /(game|match|session|battle|player|server|region|team|social)/.test(u)
    );
}


/* =========================================================
   🎮 PUBG — MODES
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
        /metro-royale/.test(s)
    );
}


/* =========================================================
   📦 PUBG — UPDATE / RESOURCE
   ========================================================= */

function isPUBGResource(s,u) {

    return (

        /(patch|update|resource|asset|hotfix)/.test(u) &&

        /(pubg|pubgm|tencent|lightspeed|proximabeta|krafton)/.test(s)
    );
}


/* =========================================================
   ☁️ PUBG — CLOUD INFRASTRUCTURE
   ========================================================= */

function isPUBGInfra(s) {

    return (

        /qcloud/.test(s) ||
        /myqcloud/.test(s) ||
        /tencentcs/.test(s) ||

        /amazonaws/.test(s) ||
        /aliyun/.test(s) ||
        /alibaba/.test(s) ||
        /cloudfront/.test(s)
    );
}


/* =========================================================
   🧠 PUBG CONFIDENCE SCORE
   ========================================================= */

function getPUBGScore(host,url) {

    var h = (host || "").toLowerCase();
    var u = (url || "").toLowerCase();

    h = h.replace(/^\.+|\.+$/g,"");
    u = u.replace(/[\r\n\t]/g,"");

    var s = h + " " + u;

    var score = 0;


    /* PUBG */

    if (isPUBGCore(s)) {
        score += 120;
    }


    /* Publisher */

    if (isPUBGPublisher(s)) {
        score += 100;
    }


    /* Matchmaking */

    if (isPUBGMatchmaking(s)) {
        score += 80;
    }


    /* Social */

    if (isPUBGSocial(s)) {
        score += 65;
    }


    /* Region discovery */

    if (isPUBGRegionDiscovery(s,u)) {
        score += 60;
    }


    /* API */

    if (isPUBGAPI(u)) {
        score += 40;
    }


    /* Game mode */

    if (isPUBGMode(s)) {
        score += 35;
    }


    /* Resources */

    if (isPUBGResource(s,u)) {
        score += 25;
    }


    /* Infrastructure */

    if (isPUBGInfra(s)) {
        score += 20;
    }


    /* Combined high-confidence signals */

    if (
        isPUBGCore(s) &&
        isPUBGMatchmaking(s)
    ) {
        score += 50;
    }


    if (
        isPUBGSocial(s) &&
        isPUBGMatchmaking(s)
    ) {
        score += 40;
    }


    if (
        isPUBGRegionDiscovery(s,u) &&
        isPUBGMatchmaking(s)
    ) {
        score += 40;
    }


    return score;
}


/* =========================================================
   🏆 FINAL PUBG DETECTION
   ========================================================= */

function isPUBG(host,url) {

    return getPUBGScore(host,url) >= 60;
}


/* =========================================================
   🔒 STICKY JORDAN CORE
   ========================================================= */

var LOCKED_CORE = null;


function selectJordanCore(host,url) {

    /*
       One stable exit.

       No random rotation.
       No foreign fallback.
       No PROXY_B.
       No PROXY_C.
    */

    if (LOCKED_CORE !== null) {
        return LOCKED_CORE;
    }

    LOCKED_CORE = JORDAN_CORE;

    return LOCKED_CORE;
}


/* =========================================================
   🎯 PUBG PRIORITY ROUTER
   ========================================================= */

function selectPUBGRoute(host,url) {

    var h = (host || "").toLowerCase();
    var u = (url || "").toLowerCase();

    var s = h + " " + u;


    /* -----------------------------------------------------
       PRIORITY 1 — SOCIAL / TEAM / RECRUITMENT
       ----------------------------------------------------- */

    if (isPUBGSocial(s)) {
        return selectJordanCore(host,url);
    }


    /* -----------------------------------------------------
       PRIORITY 2 — MATCHMAKING
       ----------------------------------------------------- */

    if (isPUBGMatchmaking(s)) {
        return selectJordanCore(host,url);
    }


    /* -----------------------------------------------------
       PRIORITY 3 — REGION / SERVER DISCOVERY
       ----------------------------------------------------- */

    if (isPUBGRegionDiscovery(s,u)) {
        return selectJordanCore(host,url);
    }


    /* -----------------------------------------------------
       PRIORITY 4 — ALL PUBG
       ----------------------------------------------------- */

    return selectJordanCore(host,url);
}


/* =========================================================
   🌐 NON-PUBG
   ========================================================= */

function selectNonPUBGCore() {

    return JORDAN_CORE;
}


/* =========================================================
   🚀 FINAL PAC ENGINE
   ========================================================= */

function FindProxyForURL(url,host) {

    host = host || "";
    url = url || "";


    /* =====================================================
       🚫 YOUTUBE + GITHUB
       DIRECT ONLY
       ===================================================== */

    if (isDirectExcluded(host)) {
        return "DIRECT";
    }


    /* =====================================================
       🎮 PUBG
       JORDAN CORE
       ===================================================== */

    if (isPUBG(host,url)) {
        return selectPUBGRoute(host,url);
    }


    /* =====================================================
       🌐 EVERYTHING ELSE
       JORDAN CORE
       ===================================================== */

    return selectNonPUBGCore();
}
