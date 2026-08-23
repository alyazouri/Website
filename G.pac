/* =====================================================================
 *  PAC Script  v7.1  —  PUBG Mobile Edition (Jordan Proxies)
 *  إعادة كتابة نظيفة لنسخة v7.0
 * ---------------------------------------------------------------------
 *  ما الذي تغيّر عن v7.0 ؟
 *   1) إصلاح خطأ الكاش: كان يخزّن النتيجة حسب الـ host فقط بينما القرار
 *      يعتمد على الـ URL أيضاً → نتائج خاطئة. الآن المفتاح = host|category.
 *   2) سلاسل البروكسي كانت تصل إلى 40 عنصراً (المتصفح قد يستغرق دقائق
 *      قبل الفشل). الآن أقصى طول = MAX_CHAIN (افتراضي 3) + DIRECT.
 *   3) حذف الكود الميت: قياس زمن الاستجابة (latency) و Health Check
 *      مستحيلان داخل PAC — لا يوجد أي API يعيد نتيجة الاتصال للسكربت.
 *   4) توافق مع محرّكات PAC القديمة: لا endsWith / Date.now / str[i]
 *      / Object.keys / arrow functions.
 *   5) إزالة google.com و facebook.com و apple.com من قائمة "auth"
 *      الخاصة بـ PUBG (كانت تتعارض مع قائمة DIRECT وتوجّه كل جوجل عبر
 *      البروكسي).
 *   6) تبسيط ضخم: كل نطاقات *.pubgmobile.com كانت مكرّرة في 15 شجرة؛
 *      الآن شجرة لواحق واحدة + خريطة تصنيف حسب الـ subdomain.
 *   7) دوال getExt / trieMatch / hasTrackParams أعيدت كتابتها بشكل صحيح.
 *   8) كل الإعدادات القابلة للتعديل صارت في كتلة CONFIG واحدة بالأعلى.
 * ===================================================================== */

/* =====================================================================
 *  1) CONFIG — عدّل من هنا فقط
 * ===================================================================== */

var CONFIG = {
    MAX_CHAIN:        3,      // أقصى عدد بروكسيات في السلسلة الواحدة
    DIRECT_FALLBACK:  true,   // إضافة DIRECT في نهاية السلسلة
    CACHE_TTL_MS:     300000, // 5 دقائق
    CACHE_MAX:        3000,
    IMAGES_DIRECT:    false,  // true = الصور والخطوط بدون بروكسي (أسرع/أقل خصوصية)
    LOGS_DIRECT:      true,   // true = نطاقات التتبّع والسجلات تذهب DIRECT
    SOCKS_KEYWORD:    "SOCKS5" // بعض العملاء القديمة تحتاج "SOCKS" بدل "SOCKS5"
};

/* =====================================================================
 *  2) مجمّعات البروكسي الأردنية
 * ===================================================================== */

var POOL_443 = [               // الأفضل للألعاب والتشفير (يمر عبر الجدران)
    "91.106.109.26:443",
    "91.106.111.87:443",
    "37.202.64.94:443",
    "37.202.100.213:443",
    "91.106.106.221:443",
    "37.75.144.112:443",
    "77.245.0.26:443",
    "94.142.56.191:443",
    "46.185.139.47:443",
    "92.253.22.123:443"
];

var POOL_80 = [                // تصفّح عام سريع
    "46.185.161.251:80",
    "212.118.24.171:80",
    "212.35.74.166:80",
    "212.34.29.181:80",
    "91.106.105.13:80",
    "37.202.127.58:80",
    "176.29.176.46:80",
    "91.106.97.65:80",
    "217.23.33.132:80",
    "85.159.217.18:80",
    "86.108.1.150:80",
    "37.152.4.162:80",
    "37.75.144.251:80",
    "46.32.102.8:80",
    "46.32.104.102:80",
    "80.90.174.29:80",
    "77.245.13.126:80",
    "82.212.72.70:80",
    "82.212.87.26:80",
    "213.186.174.8:80",
    "37.220.121.191:80",
    "46.185.178.81:80",
    "92.253.22.13:80",
    "92.253.127.233:80",
    "94.142.42.162:80"
];

var POOL_8080 = [              // تنزيلات / ملفات ثقيلة
    "86.108.78.173:8080",
    "80.90.173.28:8080",
    "46.185.131.170:8080",
    "92.253.121.230:8080"
];

var POOL_SOCKS = [             // UDP-ish / صوت / WebSocket
    "92.253.111.235:1080"
];

/* تحويل العناوين إلى صيغة PAC */
function fmt(list, keyword) {
    var out = [], i;
    for (i = 0; i < list.length; i++) out.push(keyword + " " + list[i]);
    return out;
}

var PX_443   = fmt(POOL_443,   "PROXY");
var PX_80    = fmt(POOL_80,    "PROXY");
var PX_8080  = fmt(POOL_8080,  "PROXY");
var PX_SOCKS = fmt(POOL_SOCKS, CONFIG.SOCKS_KEYWORD);

/* المجمّعات حسب الغرض (بترتيب الأولوية) */
var POOLS = {
    game:   PX_SOCKS.concat(PX_443),          // زمن استجابة منخفض + مشفّر
    voice:  PX_SOCKS.concat(PX_443),
    ws:     PX_SOCKS.concat(PX_443),
    secure: PX_443,                            // دفع / تسجيل دخول / بنوك
    stream: PX_443.concat(PX_80),
    fast:   PX_80.concat(PX_443),              // تصفّح عام
    dl:     PX_8080.concat(PX_80),             // تنزيلات
    all:    PX_443.concat(PX_80, PX_8080, PX_SOCKS)
};

/* =====================================================================
 *  3) أدوات مساعدة (متوافقة مع محرّكات PAC القديمة)
 * ===================================================================== */

function nowMs() { return (new Date()).getTime(); }

/* DJB2 — hash ثابت لنفس المضيف = جلسة ثابتة (Session Persistence) */
function fastHash(s) {
    var h = 5381, i;
    for (i = 0; i < s.length; i++) {
        h = ((h << 5) + h + s.charCodeAt(i)) & 0x7FFFFFFF;
    }
    return h;
}

/* هل ينتهي a باللاحقة b (بدون endsWith) */
function endsWithStr(a, b) {
    if (b.length > a.length) return false;
    return a.lastIndexOf(b) === a.length - b.length;
}

function startsWithStr(a, b) {
    return a.lastIndexOf(b, 0) === 0;
}

/* "a,b,c" → { a:1, b:1, c:1 } */
function decomp(s) {
    var m = {}, a = s.split(","), i, d;
    for (i = 0; i < a.length; i++) {
        d = a[i].replace(/^\s+|\s+$/g, "");
        if (d) m[d] = 1;
    }
    return m;
}

/* =====================================================================
 *  4) Trie لمطابقة لواحق النطاقات — O(عدد المقاطع)
 * ===================================================================== */

function buildTrie(map) {
    var t = {}, d, parts, node, i;
    for (d in map) {
        if (!map.hasOwnProperty(d)) continue;
        parts = d.split(".");
        node = t;
        for (i = parts.length - 1; i >= 0; i--) {
            if (!node[parts[i]]) node[parts[i]] = {};
            node = node[parts[i]];
        }
        node.$ = 1;           // نهاية نطاق مسجَّل
    }
    return t;
}

/* يطابق النطاق نفسه وكل نطاقاته الفرعية */
function trieMatch(host, trie) {
    var parts = host.split("."), node = trie, i, label;
    for (i = parts.length - 1; i >= 0; i--) {
        label = parts[i];
        if (!node[label]) return false;
        node = node[label];
        if (node.$ === 1) return true;   // لاحقة مطابِقة → أوقف
    }
    return false;
}

/* =====================================================================
 *  5) اختيار البروكسي وبناء السلسلة
 * ===================================================================== */

/* اختيار ثابت (sticky) للمضيف نفسه + توزيع حِمل بين المضيفين */
function pickIndex(host, len) {
    if (len <= 0) return 0;
    return fastHash(host) % len;
}

/* انزياح حسب الوقت: يوزّع الضغط في ساعات الذروة على بروكسيات مختلفة */
function timeShift() {
    var h = (new Date()).getHours();
    if (h >= 18 || h < 1) return 0;   // ذروة المساء
    if (h < 8)            return 2;   // ليلاً
    return 1;                          // نهاراً
}

/*
 * يبني سلسلة "PROXY a; PROXY b; PROXY c; DIRECT"
 * pools: مصفوفة مجمّعات مرتّبة بالأولوية (تُدمج مع إزالة التكرار)
 */
function buildChain(host, pools, allowDirect) {
    var merged = [], seen = {}, i, j, p, pool;

    for (i = 0; i < pools.length; i++) {
        pool = pools[i];
        for (j = 0; j < pool.length; j++) {
            p = pool[j];
            if (!seen[p]) { seen[p] = 1; merged.push(p); }
        }
    }
    if (merged.length === 0) return "DIRECT";

    var start = (pickIndex(host, merged.length) + timeShift()) % merged.length;
    var chain = [], n = merged.length < CONFIG.MAX_CHAIN
                        ? merged.length : CONFIG.MAX_CHAIN;

    for (i = 0; i < n; i++) chain.push(merged[(start + i) % merged.length]);

    if (allowDirect !== false && CONFIG.DIRECT_FALLBACK) chain.push("DIRECT");
    return chain.join("; ");
}

/* اختصارات */
function chainGame(h)   { return buildChain(h, [POOLS.game],               true);  }
function chainVoice(h)  { return buildChain(h, [POOLS.voice],              true);  }
function chainWS(h)     { return buildChain(h, [POOLS.ws],                 true);  }
function chainStream(h) { return buildChain(h, [POOLS.stream],             true);  }
function chainSecure(h) { return buildChain(h, [POOLS.secure],             true);  }
function chainDL(h)     { return buildChain(h, [POOLS.dl, POOLS.fast],     true);  }
function chainFast(h)   { return buildChain(h, [POOLS.fast],               true);  }
function chainAny(h)    { return buildChain(h, [POOLS.fast, POOLS.secure], true);  }

/* =====================================================================
 *  6) كاش بمفتاح (host + نوع الطلب)  ← إصلاح خطأ v7.0
 * ===================================================================== */

var _cache = {};
var _cacheCount = 0;

function cacheGet(k) {
    var e = _cache[k];
    if (!e) return undefined;
    if (nowMs() - e.t > CONFIG.CACHE_TTL_MS) { delete _cache[k]; return undefined; }
    return e.v;
}

function cacheSet(k, v) {
    if (_cacheCount > CONFIG.CACHE_MAX) { _cache = {}; _cacheCount = 0; }
    if (!_cache[k]) _cacheCount++;
    _cache[k] = { v: v, t: nowMs() };
    return v;
}

/* =====================================================================
 *  7) كاش DNS  (dnsResolve بطيء ومُعطِّل — نستدعيه بأقل قدر ممكن)
 * ===================================================================== */

var _dns = {};
function fastDns(h) {
    if (_dns.hasOwnProperty(h)) return _dns[h];
    var ip = null;
    try { ip = dnsResolve(h) || null; } catch (e) { ip = null; }
    _dns[h] = ip;
    return ip;
}

/* =====================================================================
 *  8) CIDR / شبكات خاصة
 * ===================================================================== */

var RE_IPV4 = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;

function ipToNum(ip) {
    var p = ip.split(".");
    return (((parseInt(p[0], 10) << 24) >>> 0) +
            ((parseInt(p[1], 10) << 16) >>> 0) +
            ((parseInt(p[2], 10) << 8)  >>> 0) +
              parseInt(p[3], 10)) >>> 0;
}

function ipInCidr(ip, cidr) {
    var parts = cidr.split("/");
    var bits  = parseInt(parts[1], 10);
    if (bits === 0) return true;
    var mask  = (0xFFFFFFFF << (32 - bits)) >>> 0;
    return ((ipToNum(ip) & mask) >>> 0) === ((ipToNum(parts[0]) & mask) >>> 0);
}

var PRIVATE_CIDRS = [
    "10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16",
    "127.0.0.0/8", "169.254.0.0/16", "100.64.0.0/10", "0.0.0.0/8"
];

function isPrivateIP(h) {
    if (!RE_IPV4.test(h)) return false;
    var i;
    for (i = 0; i < PRIVATE_CIDRS.length; i++) {
        if (ipInCidr(h, PRIVATE_CIDRS[i])) return true;
    }
    return false;
}

/* IPv6 محلي: ::1 و fc00::/7 و fe80::/10 */
function isPrivateIPv6(h) {
    var s = h.replace(/^\[|\]$/g, "").toLowerCase();
    if (s.indexOf(":") === -1) return false;
    if (s === "::1" || s === "::") return true;
    return /^(f[cd]|fe[89ab])/.test(s);
}

var LOCAL_SUFFIX = [".local", ".internal", ".lan", ".home", ".intranet",
                    ".corp", ".router", ".gateway", ".modem", ".localdomain"];

function isLocalHost(h) {
    if (h === "localhost" || endsWithStr(h, ".localhost")) return true;
    if (isPlainHostName(h)) return true;
    var i;
    for (i = 0; i < LOCAL_SUFFIX.length; i++) {
        if (endsWithStr(h, LOCAL_SUFFIX[i])) return true;
    }
    return false;
}

/* =====================================================================
 *  9) قوائم النطاقات
 * ===================================================================== */

/* --- جذور PUBG / Krafton / Proxima ------------------------------- */
var PUBG_ROOT_STR =
    "pubgmobile.com,pubg.com,pubgmobile.live,pubgmobile-esports.com," +
    "pubgmobile.kr,pubgmobile.jp,pubgmobile.tw,pubgmobile.global," +
    "pubgmobile.community,gpubgm.com,igamecj.com," +
    "proximabeta.com,proximabeta.net,proximabeta.com.cn," +
    "krafton.com,pubgcorp.com,battlegroundsmobileindia.com," +
    "pubgmobile.vn,vng.com.vn";

/* --- Tencent (الجذور تغطي كل النطاقات الفرعية تلقائياً) ---------- */
var TENCENT_ROOT_STR =
    "tencent.com,tencent.com.cn,qq.com,qq.com.cn,qzone.com," +
    "wechat.com,tenpay.com,qcloud.com,myqcloud.com,tencentyun.com," +
    "gtimg.cn,qpic.cn,qlogo.cn,idqqimg.com,tencent-cloud.net";

/* --- نطاقات تنزيل Tencent (تحتاج مسار تنزيل سريع) ---------------- */
var TENCENT_DL_STR =
    "dlied1.qq.com,dlied2.qq.com,dlied3.qq.com,dlied4.qq.com," +
    "dlied5.qq.com,dlied6.qq.com,dlied7.qq.com,dlied8.qq.com," +
    "dlied9.qq.com,dlied10.qq.com,isd.qq.com,mgame.qq.com," +
    "gp.qq.com,pg.qq.com,game.gtimg.cn,cdngame.tencentyun.com," +
    "download.tencentyun.com,patch.tencentyun.com,update.tencentyun.com";

/* --- تتبّع / سجلات / إحصاءات (لا فائدة من تمريرها عبر البروكسي) -- */
var TELEMETRY_STR =
    "mta.qq.com,beacon.qq.com,pingtas.qq.com,report.qq.com," +
    "log.qq.com,sdklog.qq.com,tlog.qq.com,tdw.qq.com," +
    "h.trace.qq.com,snowflake.qq.com,mta.tencent.com," +
    "beacon.tencent.com,analytics.tencent.com," +
    "log.tencentyun.com,log.pubgmobile.com,report.pubgmobile.com," +
    "analytics.pubgmobile.com,monitor.pubgmobile.com," +
    "crash.pubgmobile.com,bugreport.pubgmobile.com";

/* --- نطاقات عامة تذهب DIRECT (بدون بروكسي) ----------------------- */
var DIRECT_STR =
    "localhost," +
    "google.com,youtube.com,googlevideo.com,gstatic.com,googleapis.com," +
    "ggpht.com,ytimg.com,googleusercontent.com,gvt1.com,gvt2.com," +
    "github.com,githubusercontent.com,github.io,githubassets.com," +
    "cloudflare.com,cloudflare-dns.com,cloudflareinsights.com," +
    "jsdelivr.net,unpkg.com,bootstrapcdn.com," +
    "microsoft.com,windows.com,windowsupdate.com,windows.net," +
    "office.com,office365.com,live.com,outlook.com,skype.com," +
    "azure.com,azureedge.net,msedge.net,msftconnecttest.com," +
    "msn.com,bing.com,bingapis.com," +
    "apple.com,icloud.com,mzstatic.com,cdn-apple.com," +
    "whatsapp.com,whatsapp.net,wa.me," +
    "telegram.org,t.me,telegram.me,telegra.ph,telesco.pe," +
    "wikipedia.org,wikimedia.org,wikidata.org," +
    "stackoverflow.com,stackexchange.com,sstatic.net," +
    "archive.org,speedtest.net,speedtestcustom.com," +
    "akamaized.net,akamai.net,akamaihd.net," +
    "amazonaws.com,cloudfront.net,fastly.net,fastlylb.net," +
    "edgecastcdn.net,stackpath.com,keycdn.com,bunnycdn.com,b-cdn.net," +
    "netflix.com,nflxvideo.net,nflximg.net,nflxext.com," +
    "spotify.com,scdn.co,spotifycdn.com," +
    "reddit.com,redd.it,redditstatic.com,redditmedia.com," +
    "discord.com,discord.gg,discordapp.com,discordapp.net," +
    "twitch.tv,twitchcdn.net,jtvnw.net,ttvnw.net," +
    "zoom.us,zoom.com,zmcdn.com,slack.com,slack-edge.com," +
    "amazon.com,amazonvideo.com,primevideo.com,media-amazon.com," +
    "letsencrypt.org,digicert.com," +
    "npmjs.com,npmjs.org,pypi.org,docker.com,docker.io," +
    "jo";        // النطاقات الأردنية محلياً = أسرع مباشرة

/* --- مزوّدو تسجيل الدخول (تُستخدم داخل اللعبة) ------------------- */
var LOGIN_STR =
    "facebook.com,fbcdn.net,accounts.google.com,appleid.apple.com," +
    "twitter.com,x.com,line.me,line.naver.jp,vk.com";

var TRIE_PUBG       = buildTrie(decomp(PUBG_ROOT_STR));
var TRIE_TENCENT    = buildTrie(decomp(TENCENT_ROOT_STR));
var TRIE_TENCENT_DL = buildTrie(decomp(TENCENT_DL_STR));
var TRIE_TELEMETRY  = buildTrie(decomp(TELEMETRY_STR));
var TRIE_DIRECT     = buildTrie(decomp(DIRECT_STR));
var TRIE_LOGIN      = buildTrie(decomp(LOGIN_STR));

/* =====================================================================
 * 10) تصنيف نطاقات PUBG الفرعية
 *     بدل 15 شجرة مكرّرة: خريطة label → فئة على أول مقطع من المضيف
 * ===================================================================== */

var PUBG_SUB = {
    /* بث مباشر / مشاهدة */
    "livem":"stream", "live":"stream", "stream":"stream", "broadcast":"stream",
    "spectate":"stream", "replay":"stream", "livem-cdn":"stream",
    "spectate-cdn":"stream", "replay-cdn":"stream",

    /* صوت */
    "voice":"voice", "voip":"voice", "rtc":"voice", "audio":"voice",
    "talk":"voice", "mic":"voice",

    /* تنزيل / تحديث / موارد */
    "cdn":"dl", "mcdn":"dl", "cdn-aws":"dl", "mcdn-aws":"dl",
    "cdn-game":"dl", "img":"dl", "img-game":"dl", "asset":"dl",
    "resource":"dl", "data":"dl", "download":"dl", "update":"dl",
    "patch":"dl", "map":"dl",

    /* أمان / دفع / حساب */
    "login":"secure", "auth":"secure", "oauth":"secure", "account":"secure",
    "signup":"secure", "register":"secure", "guest":"secure",
    "store":"secure", "pay":"secure", "purchase":"secure", "uc":"secure",
    "royalpass":"secure", "shop":"secure", "anticheat":"secure",
    "security":"secure", "protect":"secure", "verify":"secure",
    "safe":"secure", "shield":"secure", "ban":"secure",

    /* لعب فعلي منخفض الزمن */
    "match":"game", "lobby":"game", "room":"game", "custom":"game",
    "ranked":"game", "classic":"game", "arcade":"game", "arena":"game",
    "tdm":"game", "payload":"game", "zombie":"game", "metro":"game",
    "api":"game", "web-api":"game", "m-api":"game", "live-api":"game",
    "api-game":"game", "config":"game", "settings":"game",
    "push":"game", "notify":"game", "notification":"game",

    /* واجهات ويب عادية */
    "www":"fast", "web":"fast", "m":"fast", "forum":"fast",
    "support":"fast", "help":"fast", "faq":"fast", "news":"fast",
    "blog":"fast", "media":"fast"
};

function pubgCategory(host) {
    var label = host.split(".")[0].toLowerCase();
    var cat = PUBG_SUB[label];
    return cat ? cat : "game";       // الافتراضي: مسار اللعب
}

/* =====================================================================
 * 11) أنماط المسارات والامتدادات
 * ===================================================================== */

var PAT_WS        = /^wss?:\/\//i;
var PAT_FTP       = /^ftp:\/\//i;

var PAT_LIVE      = /(^|[\/._-])(live|stream|hls|dash|manifest|segment|broadcast|spectate|replay)([\/._-]|$)/i;
var PAT_VOICE     = /(^|[\/._-])(voice|voip|webrtc|rtc)([\/._-]|$)/i;
var PAT_UPDATE    = /(^|[\/._-])(update|patch|download|install|hotfix|version)([\/._-]|$)/i;
var PAT_ASSET     = /(^|[\/._-])(asset|assets|resource|resources|texture|model|bundle)([\/._-]|$)/i;
var PAT_AUTH      = /(^|[\/._-])(login|signin|auth|oauth|sso|signup|register|verify|token)([\/._-]|$)/i;
var PAT_PAY       = /(^|[\/._-])(pay|payment|purchase|checkout|billing|store|shop|crate)([\/._-]|$)/i;
var PAT_MATCH     = /(^|[\/._-])(match|matchmaking|lobby|room|ranked|session|realtime)([\/._-]|$)/i;
var PAT_API       = /(^|[\/._-])(api|graphql|rest|rpc|v[0-9]+)([\/._-]|$)/i;

var STREAM_EXT = decomp(".m3u8,.mpd,.m3u,.ts,.f4v,.asf,.rm,.rmvb");

var HEAVY_EXT = decomp(
    ".mp4,.mkv,.avi,.mov,.wmv,.flv,.webm,.m4v,.mpg,.mpeg," +
    ".zip,.rar,.7z,.iso,.tar,.gz,.bz2,.xz,.zst," +
    ".exe,.dmg,.apk,.aab,.ipa,.obb,.msi,.deb,.rpm,.appimage,.snap," +
    ".pak,.ucas,.utoc,.uasset,.umap,.bnk,.wem,.wasm,.torrent"
);

var LIGHT_EXT = decomp(
    ".jpg,.jpeg,.png,.gif,.webp,.svg,.bmp,.ico,.tiff,.avif," +
    ".woff,.woff2,.ttf,.eot,.otf,.css,.js,.json"
);

function getExt(url) {
    var path = url.split("#")[0].split("?")[0];
    var slash = path.lastIndexOf("/");
    var name  = slash === -1 ? path : path.substring(slash + 1);
    var dot   = name.lastIndexOf(".");
    if (dot <= 0) return "";
    return name.substring(dot).toLowerCase();
}

/* =====================================================================
 * 12) نطاقات مشبوهة / حسّاسة
 * ===================================================================== */

var SUSPICIOUS_TLD = decomp(
    ".xyz,.top,.club,.work,.click,.link,.site,.online,.buzz," +
    ".gq,.ml,.cf,.tk,.ga,.rest,.cam,.zip,.mov,.quest"
);

var SENSITIVE_KW = ["bank", "banking", "finance", "credit", "payment",
                    "wallet", "invoice", "gov.", "hospital", "clinic",
                    "health", "medical", "insur"];

function getTLD(host) {
    var d = host.lastIndexOf(".");
    return d === -1 ? "" : host.substring(d).toLowerCase();
}

function isSuspicious(host) {
    if (SUSPICIOUS_TLD[getTLD(host)]) return true;
    if (host.length > 60) return true;
    var digits = 0, i, c;
    for (i = 0; i < host.length; i++) {
        c = host.charAt(i);
        if (c >= "0" && c <= "9") digits++;
    }
    return digits > host.length * 0.5;
}

function isSensitive(host) {
    var lower = host.toLowerCase(), i;
    for (i = 0; i < SENSITIVE_KW.length; i++) {
        if (lower.indexOf(SENSITIVE_KW[i]) !== -1) return true;
    }
    return false;
}

/* =====================================================================
 * 13) الدالة الرئيسية
 * ===================================================================== */

function FindProxyForURL(url, host) {
    try {
        return route(url, ("" + host).toLowerCase());
    } catch (e) {
        return "DIRECT";     // أي خطأ ⇒ لا تقطع الإنترنت عن المستخدم
    }
}

function route(url, host) {

    /* ---- 0) شبكة محلية: لا كاش، لا بروكسي --------------------- */
    if (isLocalHost(host) || isPrivateIP(host) || isPrivateIPv6(host)) {
        return "DIRECT";
    }

    /* ---- 1) تحديد فئة الطلب (المفتاح الصحيح للكاش) ------------ */
    var kind = classify(url, host);
    var key  = host + "|" + kind;

    var hit = cacheGet(key);
    if (hit !== undefined) return hit;

    /* ---- 2) بناء النتيجة حسب الفئة ---------------------------- */
    var r;
    switch (kind) {
        case "direct":  r = "DIRECT";          break;
        case "stream":  r = chainStream(host); break;
        case "voice":   r = chainVoice(host);  break;
        case "ws":      r = chainWS(host);     break;
        case "game":    r = chainGame(host);   break;
        case "secure":  r = chainSecure(host); break;
        case "dl":      r = chainDL(host);     break;
        case "fast":    r = chainFast(host);   break;
        default:        r = chainAny(host);    break;
    }
    return cacheSet(key, r);
}

/* ترتيب الأولويات — أول تطابق يفوز */
function classify(url, host) {

    var ext = getExt(url);

    /* P1: بروتوكولات خاصة */
    if (PAT_WS.test(url))  return "ws";
    if (PAT_FTP.test(url)) return "dl";

    /* P2: نطاقات التتبّع والسجلات */
    if (trieMatch(host, TRIE_TELEMETRY)) {
        return CONFIG.LOGS_DIRECT ? "direct" : "fast";
    }

    /* P3: PUBG / Krafton / Proxima */
    if (trieMatch(host, TRIE_PUBG)) {
        var cat = pubgCategory(host);
        /* المسار يرجّح الفئة إذا كان النطاق عامّاً */
        if (PAT_LIVE.test(url))   return "stream";
        if (PAT_VOICE.test(url))  return "voice";
        if (PAT_AUTH.test(url) || PAT_PAY.test(url)) return "secure";
        if (PAT_UPDATE.test(url) || PAT_ASSET.test(url) || HEAVY_EXT[ext]) return "dl";
        if (PAT_MATCH.test(url) || PAT_API.test(url)) return "game";
        return cat;
    }

    /* P4: Tencent */
    if (trieMatch(host, TRIE_TENCENT_DL)) return "dl";
    if (trieMatch(host, TRIE_TENCENT)) {
        if (PAT_UPDATE.test(url) || HEAVY_EXT[ext]) return "dl";
        if (PAT_AUTH.test(url) || PAT_PAY.test(url)) return "secure";
        return "game";
    }

    /* P5: مزوّدو تسجيل الدخول */
    if (trieMatch(host, TRIE_LOGIN)) return "secure";

    /* P6: نطاقات حسّاسة أو مشبوهة → دائماً عبر 443 (قبل قائمة DIRECT) */
    if (isSensitive(host) || isSuspicious(host)) return "secure";

    /* P7: قائمة DIRECT العامة */
    if (trieMatch(host, TRIE_DIRECT)) return "direct";

    /* P8: حسب المحتوى */
    if (STREAM_EXT[ext] || PAT_LIVE.test(url)) return "stream";
    if (HEAVY_EXT[ext]  || PAT_UPDATE.test(url)) return "dl";
    if (PAT_AUTH.test(url) || PAT_PAY.test(url)) return "secure";
    if (LIGHT_EXT[ext]) return CONFIG.IMAGES_DIRECT ? "direct" : "fast";
    if (PAT_API.test(url)) return "fast";

    /* P9: الباقي */
    return "any";
}

/* دعم عملاء IPv6 (Chrome/Android يستدعيها إن وُجدت) */
function FindProxyForURLEx(url, host) {
    return FindProxyForURL(url, host);
}
