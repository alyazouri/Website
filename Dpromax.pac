/* =========================================================
   T | نواة الأردن الذهبية
   🎮 PUBG MOBILE — توجيه أردني مستقر
   🇯🇴 استخدام نطاقات الأردن التي حددها المستخدم فقط
   🏆 التجنيد + الفريق + الخصم + المطابقة + اكتشاف الخوادم
   🔒 DIRECT فقط ليوتيوب وجيت هب
   ⚡ متوافق مع PAC وبأقل تعقيد ممكن
   ========================================================= */


/* =========================================================
   🇯🇴 البروكسي الأساسي
   ========================================================= */

/*
   يجب أن يكون البروكسي نفسه موجودًا فعليًا داخل الأردن
   إذا كان الهدف أن يكون الخروج الشبكي أردنيًا.
*/

var JORDAN_CORE = "PROXY 85.159.217.18:80";


/* =========================================================
   🚫 الاستثناءات التي تعمل DIRECT
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
   🇯🇴 شبكات الأردن — الشبكات الأربعة فقط
   =========================================================

   الترتيب:

   1 — 86.108.0.0/17
   2 — 46.32.96.0/19
   3 — 188.247.0.0/16
   4 — 94.142.32.0/19

   لا توجد أي شبكة أخرى هنا.
   ========================================================= */

function isJordanNetwork(host) {

    return (

        /* 1 — الشبكة الأولى */

        isInNet(
            host,
            "86.108.0.0",
            "255.255.128.0"
        ) ||

        /* 2 — الشبكة الثانية */

        isInNet(
            host,
            "46.32.96.0",
            "255.255.224.0"
        ) ||

        /* 3 — الشبكة الثالثة */

        isInNet(
            host,
            "188.247.0.0",
            "255.255.0.0"
        ) ||

        /* 4 — الشبكة الرابعة */

        isInNet(
            host,
            "94.142.32.0",
            "255.255.224.0"
        )
    );
}


/* =========================================================
   🇯🇴 تصنيف الشبكة الأردنية
   ========================================================= */

function jordanTier(host) {

    if (isJordanNetwork(host)) {
        return 3;
    }

    return 1;
}


/* =========================================================
   🎮 اكتشاف نطاقات PUBG الأساسية
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
   🎮 الناشرون المرتبطون بـ PUBG
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
   🎯 اكتشاف المطابقة
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
   👥 اكتشاف التجنيد والفريق واللاعبين والخصوم
   ========================================================= */

function isPUBGSocial(s) {

    return (

        /* الأصدقاء */

        /friend/.test(s) ||
        /friends/.test(s) ||

        /* التواصل */

        /social/.test(s) ||

        /* التجنيد */

        /recruit/.test(s) ||
        /recruitment/.test(s) ||
        /recruiting/.test(s) ||

        /* الفريق */

        /team/.test(s) ||
        /teammate/.test(s) ||
        /teammates/.test(s) ||

        /squad/.test(s) ||

        /* المجموعة */

        /party/.test(s) ||

        /* الدعوات */

        /invite/.test(s) ||
        /invitation/.test(s) ||

        /* اللاعب */

        /profile/.test(s) ||
        /player/.test(s) ||

        /* العشيرة */

        /clan/.test(s) ||
        /guild/.test(s) ||

        /* الخصم */

        /opponent/.test(s) ||
        /enemy/.test(s) ||
        /rival/.test(s) ||
        /adversary/.test(s)
    );
}


/* =========================================================
   🔥 اكتشاف التجنيد بشكل منفصل
   ========================================================= */

function isPUBGRecruitment(s) {

    return (
        /recruit/.test(s) ||
        /recruitment/.test(s) ||
        /recruiting/.test(s)
    );
}


/* =========================================================
   🔥 اكتشاف الفريق بشكل منفصل
   ========================================================= */

function isPUBGTeam(s) {

    return (
        /team/.test(s) ||
        /teammate/.test(s) ||
        /teammates/.test(s) ||
        /squad/.test(s) ||
        /party/.test(s)
    );
}


/* =========================================================
   🔥 اكتشاف الخصم بشكل منفصل
   ========================================================= */

function isPUBGOpponent(s) {

    return (
        /opponent/.test(s) ||
        /enemy/.test(s) ||
        /rival/.test(s) ||
        /adversary/.test(s)
    );
}


/* =========================================================
   🌍 اكتشاف المنطقة والخوادم
   ========================================================= */

function isPUBGRegionDiscovery(s,u) {

    return (

        /(serverlist|server-list|serverdiscovery|server-discovery)/.test(u) ||

        /(realm|routing|region|regionlist|region-list)/.test(u)

    ) &&

    /(pubg|pubgm|game|match|server|player|tencent|krafton)/.test(s);
}


/* =========================================================
   🔌 اكتشاف واجهات API
   ========================================================= */

function isPUBGAPI(u) {

    return (

        /(\/api\/|\/v1\/|\/v2\/|\/v3\/)/.test(u) &&

        /(game|match|session|battle|player|server|region|team|social)/.test(u)
    );
}


/* =========================================================
   🎮 اكتشاف أوضاع اللعب
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
   📦 اكتشاف التحديثات والموارد
   ========================================================= */

function isPUBGResource(s,u) {

    return (

        /(patch|update|resource|asset|hotfix)/.test(u) &&

        /(pubg|pubgm|tencent|lightspeed|proximabeta|krafton)/.test(s)
    );
}


/* =========================================================
   ☁️ البنية السحابية
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
   🧠 نظام حساب نقاط PUBG
   ========================================================= */

function getPUBGScore(host,url) {

    var h = (host || "").toLowerCase();
    var u = (url || "").toLowerCase();

    h = h.replace(/^\.+|\.+$/g,"");
    u = u.replace(/[\r\n\t]/g,"");

    var s = h + " " + u;

    var score = 0;


    /* PUBG الأساسي */

    if (isPUBGCore(s)) {
        score += 120;
    }


    /* الناشر */

    if (isPUBGPublisher(s)) {
        score += 100;
    }


    /* المطابقة */

    if (isPUBGMatchmaking(s)) {
        score += 80;
    }


    /* التواصل */

    if (isPUBGSocial(s)) {
        score += 140;
    }


    /* =====================================================
       🔥 أولوية التجنيد
       ===================================================== */

    if (isPUBGRecruitment(s)) {
        score += 100;
    }


    /* =====================================================
       🔥 أولوية الفريق
       ===================================================== */

    if (isPUBGTeam(s)) {
        score += 100;
    }


    /* =====================================================
       🔥 أولوية الخصم
       ===================================================== */

    if (isPUBGOpponent(s)) {
        score += 100;
    }


    /* اكتشاف المنطقة */

    if (isPUBGRegionDiscovery(s,u)) {
        score += 60;
    }


    /* API */

    if (isPUBGAPI(u)) {
        score += 40;
    }


    /* أوضاع اللعب */

    if (isPUBGMode(s)) {
        score += 35;
    }


    /* الموارد */

    if (isPUBGResource(s,u)) {
        score += 25;
    }


    /* البنية السحابية */

    if (isPUBGInfra(s)) {
        score += 20;
    }


    /* =====================================================
       🔥 إشارات مركبة قوية
       ===================================================== */

    if (
        isPUBGCore(s) &&
        isPUBGMatchmaking(s)
    ) {
        score += 50;
    }


    /* التجنيد + المطابقة */

    if (
        isPUBGRecruitment(s) &&
        isPUBGMatchmaking(s)
    ) {
        score += 80;
    }


    /* الفريق + المطابقة */

    if (
        isPUBGTeam(s) &&
        isPUBGMatchmaking(s)
    ) {
        score += 80;
    }


    /* الخصم + المطابقة */

    if (
        isPUBGOpponent(s) &&
        isPUBGMatchmaking(s)
    ) {
        score += 80;
    }


    /* التواصل + المطابقة */

    if (
        isPUBGSocial(s) &&
        isPUBGMatchmaking(s)
    ) {
        score += 70;
    }


    /* المنطقة + المطابقة */

    if (
        isPUBGRegionDiscovery(s,u) &&
        isPUBGMatchmaking(s)
    ) {
        score += 40;
    }


    return score;
}


/* =========================================================
   🏆 اكتشاف PUBG النهائي
   ========================================================= */

function isPUBG(host,url) {

    return getPUBGScore(host,url) >= 60;
}


/* =========================================================
   🔒 تثبيت البروكسي الأردني
   ========================================================= */

var LOCKED_CORE = null;


function selectJordanCore(host,url) {

    /*
       استخدام بروكسي واحد ثابت.
       لا يوجد تدوير عشوائي.
       لا يوجد بروكسي أجنبي احتياطي.
    */

    if (LOCKED_CORE !== null) {
        return LOCKED_CORE;
    }

    LOCKED_CORE = JORDAN_CORE;

    return LOCKED_CORE;
}


/* =========================================================
   🎯 توجيه PUBG حسب الأولوية
   ========================================================= */

function selectPUBGRoute(host,url) {

    var h = (host || "").toLowerCase();
    var u = (url || "").toLowerCase();

    var s = h + " " + u;


    /* =====================================================
       الأولوية 1 — التجنيد
       ===================================================== */

    if (isPUBGRecruitment(s)) {
        return selectJordanCore(host,url);
    }


    /* =====================================================
       الأولوية 2 — الفريق
       ===================================================== */

    if (isPUBGTeam(s)) {
        return selectJordanCore(host,url);
    }


    /* =====================================================
       الأولوية 3 — الخصم
       ===================================================== */

    if (isPUBGOpponent(s)) {
        return selectJordanCore(host,url);
    }


    /* =====================================================
       الأولوية 4 — التواصل
       ===================================================== */

    if (isPUBGSocial(s)) {
        return selectJordanCore(host,url);
    }


    /* =====================================================
       الأولوية 5 — المطابقة
       ===================================================== */

    if (isPUBGMatchmaking(s)) {
        return selectJordanCore(host,url);
    }


    /* =====================================================
       الأولوية 6 — اكتشاف المنطقة والخادم
       ===================================================== */

    if (isPUBGRegionDiscovery(s,u)) {
        return selectJordanCore(host,url);
    }


    /* =====================================================
       الأولوية 7 — PUBG بشكل عام
       ===================================================== */

    return selectJordanCore(host,url);
}


/* =========================================================
   🌐 توجيه الاتصالات غير الخاصة بـ PUBG
   ========================================================= */

function selectNonPUBGCore() {

    return JORDAN_CORE;
}


/* =========================================================
   🚀 محرك PAC النهائي
   ========================================================= */

function FindProxyForURL(url,host) {

    host = host || "";
    url = url || "";


    /* =====================================================
       🚫 يوتيوب + جيت هب
       DIRECT فقط
       ===================================================== */

    if (isDirectExcluded(host)) {
        return "DIRECT";
    }


    /* =====================================================
       🎮 PUBG
       التوجيه عبر النواة الأردنية
       ===================================================== */

    if (isPUBG(host,url)) {
        return selectPUBGRoute(host,url);
    }


    /* =====================================================
       🌐 كل الاتصالات الأخرى
       ===================================================== */

    return selectNonPUBGCore();
}
