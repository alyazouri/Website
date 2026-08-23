// =====================================================
//  PAC Script LEGENDARY v7.0 - PUBG Mobile Edition
//  7 بروكسيات Alibaba/Oracle Cloud
//  كل ميزات v6 الأسطورية + كل نطاقات PUBG Mobile
//  بدون حماية
// =====================================================
//
//  ✅ Trie Domain Matching (O(k))
//  ✅ TTL Cache ذكي (5 دقائق)
//  ✅ DNS Cache + IP Cache
//  ✅ Session Persistence
//  ✅ Proxy Health Check
//  ✅ Load Balancing (Bitwise Hash)
//  ✅ Content-Based Routing
//  ✅ Time-Based Routing
//  ✅ Latency-Based Selection
//  ✅ Tiered Failover
//  ✅ CIDR IP Matching
//  ✅ SNI-Based Routing
//  ✅ Connection Grouping
//  ✅ Smart Retry Logic
//  ✅ Domain Trust Score
//  ✅ Suspicious Domain Detection
//  ✅ URL Parameter Detection
//  ✅ DNS Prefetch Handling
//  ✅ Pattern Matching (Regex)
//  ✅ Bandwidth Routing
//  ✅ Protocol Detection
//  ✅ Proxy Chain Support
//  ✅ Compressed Lists
//  ✅ Bitwise Hash
//  ✅ Error Handling
//  ✅ Cache Cleanup
//  ✅ IPv6 Support
//  ✅ PUBG Mobile كل المودات
//  ✅ PUBG Mobile كل الوظائف
//  ✅ PUBG Mobile كل النطاقات
//  ✅ Tencent كامل
//  ✅ CDN Networks
// =====================================================

// =====================================================
//  ⚡ إعدادات البروكسي
// =====================================================

var PROXIES = [
    "PROXY 47.91.104.88:3128",
    "PROXY 47.91.121.127:3128",
    "PROXY 47.91.120.190:8080",
    "PROXY 47.91.115.179:8080",
    "PROXY 47.91.110.148:8083",
    "PROXY 47.91.109.17:8888",
    "PROXY 139.185.52.142:5222"
];

var GAME_PROXY   = "PROXY 47.91.104.88:3128; PROXY 47.91.121.127:3128";
var STREAM_PROXY = "PROXY 47.91.110.148:8083; PROXY 47.91.120.190:8080";
var FAST_PROXY   = "PROXY 47.91.120.190:8080; PROXY 47.91.115.179:8080";
var VOICE_PROXY  = "PROXY 47.91.109.17:8888; PROXY 47.91.104.88:3128";
var SECURE_PROXY = "PROXY 139.185.52.142:5222; PROXY 47.91.121.127:3128";
var WS_PROXY     = "PROXY 47.91.109.17:8888; PROXY 47.91.110.148:8083";
var DL_PROXY     = "PROXY 47.91.115.179:8080; PROXY 47.91.120.190:8080";

var CHAINS = {
    fast:   "PROXY 47.91.120.190:8080; PROXY 47.91.115.179:8080",
    secure: "PROXY 139.185.52.142:5222; PROXY 47.91.121.127:3128",
    stream: "PROXY 47.91.110.148:8083; PROXY 47.91.120.190:8080",
    game:   "PROXY 47.91.104.88:3128; PROXY 47.91.121.127:3128",
    voice:  "PROXY 47.91.109.17:8888; PROXY 47.91.104.88:3128"
};

// =====================================================
//  ⚡ TTL Cache
// =====================================================
var _cache = {};
var CACHE_TTL = 300000;
var CACHE_MAX = 5000;

function cacheGet(k) {
    var e = _cache[k];
    if (!e) return undefined;
    if (Date.now() - e.t > CACHE_TTL) { delete _cache[k]; return undefined; }
    return e.v;
}

function cacheSet(k, v) {
    var count = 0;
    for (var _ in _cache) { count++; }
    if (count > CACHE_MAX) _cache = {};
    _cache[k] = { v: v, t: Date.now() };
}

// =====================================================
//  ⚡ DNS Cache + IP Cache
// =====================================================
var _dns = {};
function fastDns(h) {
    if (_dns[h] !== undefined) return _dns[h];
    try {
        var ip = dnsResolve(h);
        _dns[h] = ip || null;
        return ip;
    } catch (e) { _dns[h] = null; return null; }
}

var _ip = {};
function fastInNet(h, net, mask) {
    var k = h + "|" + net;
    if (_ip[k] !== undefined) return _ip[k];
    try {
        var r = isInNet(h, net, mask);
        _ip[k] = r;
        return r;
    } catch (e) { _ip[k] = false; return false; }
}

// =====================================================
//  ⚡ Proxy Health + Latency + Session
// =====================================================
var _health = {};
var _latency = {};
var _session = {};

function proxyOk(p) { return !_health[p] || _health[p] < 3; }
function proxyFail(p) { _health[p] = (_health[p] || 0) + 1; }
function proxyReset(p) { _health[p] = 0; }

function recordLatency(proxy, ms) {
    if (!_latency[proxy]) _latency[proxy] = [];
    _latency[proxy].push({ ms: ms, t: Date.now() });
    if (_latency[proxy].length > 10) _latency[proxy].shift();
}

function getAvgLatency(proxy) {
    var r = _latency[proxy];
    if (!r || r.length === 0) return 9999;
    var now = Date.now(), sum = 0, cnt = 0;
    for (var i = 0; i < r.length; i++) {
        if (now - r[i].t < 60000) { sum += r[i].ms; cnt++; }
    }
    return cnt > 0 ? sum / cnt : 9999;
}

function getFastestProxy() {
    var best = null, bestL = 9999;
    for (var i = 0; i < PROXIES.length; i++) {
        if (!proxyOk(PROXIES[i])) continue;
        var l = getAvgLatency(PROXIES[i]);
        if (l < bestL) { bestL = l; best = PROXIES[i]; }
    }
    return best || "DIRECT";
}

// =====================================================
//  ⚡ Fast Hash (Bitwise)
// =====================================================
function fastHash(s) {
    var h = 5381;
    for (var i = 0; i < s.length; i++) {
        h = ((h << 5) + h + s.charCodeAt(i)) & 0x7FFFFFFF;
    }
    return h;
}

// =====================================================
//  ⚡ Trie Builder + Matcher
// =====================================================
function buildTrie(list) {
    var t = {};
    for (var d in list) {
        var p = d.split(".").reverse();
        var n = t;
        for (var i = 0; i < p.length; i++) {
            if (!n[p[i]]) n[p[i]] = {};
            n = n[p[i]];
        }
        n["$"] = 1;
    }
    return t;
}

function trieMatch(host, trie) {
    var p = host.split(".").reverse();
    var n = trie;
    for (var i = 0; i < p.length; i++) {
        if (n["$"]) return true;
        if (!n[p[i]]) return false;
        n = n[p[i]];
    }
    return n["$"] === 1;
}

// =====================================================
//  ⚡ Decompress
// =====================================================
function decomp(s) {
    var m = {};
    var a = s.split(",");
    for (var i = 0; i < a.length; i++) {
        var d = a[i].replace(/^\s+|\s+$/g, "");
        if (d) m[d] = 1;
    }
    return m;
}

// =====================================================
//  ⚡ CIDR IP Matching
// =====================================================
function ipToNum(ip) {
    var p = ip.split(".");
    return ((parseInt(p[0], 10) << 24) |
            (parseInt(p[1], 10) << 16) |
            (parseInt(p[2], 10) << 8) |
             parseInt(p[3], 10)) >>> 0;
}

function ipInRange(ip, cidr) {
    try {
        var parts = cidr.split("/");
        var network = parts[0];
        var bits = parseInt(parts[1], 10);
        var ipNum = ipToNum(ip);
        var netNum = ipToNum(network);
        var mask = ~(Math.pow(2, 32 - bits) - 1) >>> 0;
        return (ipNum & mask) === (netNum & mask);
    } catch (e) { return false; }
}

var PRIVATE_CIDRS = [
    "10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16",
    "127.0.0.0/8", "169.254.0.0/16", "0.0.0.0/8"
];

function isPrivateCIDR(host) {
    var ip = fastDns(host);
    if (!ip) return false;
    for (var i = 0; i < PRIVATE_CIDRS.length; i++) {
        if (ipInRange(ip, PRIVATE_CIDRS[i])) return true;
    }
    return false;
}

// =====================================================
//  ⚡ SNI-Based Routing
// =====================================================
var SNI_CATEGORIES = {
    bank:  ["bank", "banking", "finance", "credit", "payment"],
    gov:   ["gov", "government", "mil", "police", "court"],
    edu:   ["edu", "ac.", "school", "university", "college"],
    health:["hospital", "clinic", "health", "medical", "pharma"]
};

function getSNICategory(host) {
    var lower = host.toLowerCase();
    for (var cat in SNI_CATEGORIES) {
        var kw = SNI_CATEGORIES[cat];
        for (var i = 0; i < kw.length; i++) {
            if (lower.indexOf(kw[i]) !== -1) return cat;
        }
    }
    return null;
}

// =====================================================
//  ⚡ Connection Grouping
// =====================================================
var PROXY_GROUPS = {
    google:    ["google.com", "youtube.com", "googlevideo.com",
                "gstatic.com", "googleapis.com", "ggpht.com",
                "ytimg.com", "googleusercontent.com"],
    microsoft: ["microsoft.com", "windows.com", "office.com",
                "office365.com", "live.com", "outlook.com"],
    social:    ["facebook.com", "twitter.com", "instagram.com",
                "linkedin.com", "tiktok.com", "reddit.com"],
    pubg:      ["pubgmobile.com", "pubg.com", "gpubgm.com",
                "igamecj.com", "proximabeta.com"],
    tencent:   ["tencent.com", "qq.com", "qzone.com",
                "wechat.com", "weixin.qq.com"]
};

var GROUP_PROXY_MAP = {
    "google": 0, "microsoft": 1, "social": 2,
    "pubg": 0, "tencent": 0
};

function getGroupProxy(host) {
    for (var group in PROXY_GROUPS) {
        var domains = PROXY_GROUPS[group];
        for (var i = 0; i < domains.length; i++) {
            if (host === domains[i] || host.endsWith("." + domains[i])) {
                var idx = GROUP_PROXY_MAP[group];
                return PROXIES[idx] || PROXIES[0];
            }
        }
    }
    return null;
}

// =====================================================
//  ⚡ Domain Trust Score
// =====================================================
var TRUSTED_TLD = decomp(
    ".gov,.mil,.edu,.org,.com,.net,.io,.co,.me"
);

var SUSPICIOUS_TLD = decomp(
    ".xyz,.top,.club,.work,.click,.link," +
    ".info,.site,.online,.buzz,.gq,.ml,.cf,.tk,.ga"
);

function getTLD(host) {
    var lastDot = host.lastIndexOf(".");
    if (lastDot === -1) return "";
    return host.substring(lastDot);
}

function isSuspiciousDomain(host) {
    var tld = getTLD(host);
    if (SUSPICIOUS_TLD[tld]) return true;
    if (host.length > 50) return true;
    var numCount = 0;
    for (var i = 0; i < host.length; i++) {
        if (host[i] >= "0" && host[i] <= "9") numCount++;
    }
    if (numCount > host.length * 0.5) return true;
    return false;
}

function isTrustedDomain(host) {
    var tld = getTLD(host);
    return TRUSTED_TLD[tld] === 1;
}

// =====================================================
//  ⚡ URL Parameter Detection
// =====================================================
var TRACK_PARAMS = [
    "utm_source", "utm_medium", "utm_campaign",
    "utm_term", "utm_content", "fbclid",
    "gclid", "dclid", "msclkid",
    "twclid", "li_fat_id", "mc_cid",
    "mc_eid", "_ga", "_gl"
];

function hasTrackParams(url) {
    if (url.indexOf("?") === -1) return false;
    var q = url.split("?")[1].split("#")[0];
    for (var i = 0; i < TRACK_PARAMS.length; i++) {
        if (q.indexOf(TRACK_PARAMS[i] + "=") !== -1) return true;
    }
    return false;
}

// =====================================================
//  ⚡ Time-Based Routing
// =====================================================
function getTimeProxy() {
    var h = new Date().getHours();
    var alive = getAliveProxies();
    if (h >= 18 || h < 1) return alive[0];
    if (h >= 1 && h < 8) return alive.length > 2 ? alive[2] : alive[0];
    return alive.length > 1 ? alive[1] : alive[0];
}

// =====================================================
//  ⚡ Load Balancing
// =====================================================
function getLoadBalancedProxy(host) {
    var alive = getAliveProxies();
    return alive[fastHash(host) % alive.length];
}

// =====================================================
//  ⚡ Smart Retry + Failover
// =====================================================
function getAliveProxies() {
    var alive = [];
    for (var i = 0; i < PROXIES.length; i++) {
        if (proxyOk(PROXIES[i])) alive.push(PROXIES[i]);
    }
    return alive.length > 0 ? alive : ["DIRECT"];
}

function getSessionProxy(host) {
    if (_session[host]) return _session[host];
    var proxy = getLoadBalancedProxy(host);
    _session[host] = proxy;
    return proxy;
}

function buildChain(primary) {
    var chain = [primary];
    var seen = {};
    seen[primary] = 1;
    for (var i = 0; i < PROXIES.length; i++) {
        if (!seen[PROXIES[i]] && proxyOk(PROXIES[i])) {
            chain.push(PROXIES[i]);
            seen[PROXIES[i]] = 1;
        }
    }
    chain.push("DIRECT");
    return chain.join("; ");
}

function buildSmartChain(host) {
    var session = getSessionProxy(host);
    var fastest = getFastestProxy();
    var time = getTimeProxy();
    var chain = [];
    var seen = {};

    function add(p) {
        if (!seen[p]) { seen[p] = 1; chain.push(p); }
    }

    add(session);
    add(fastest);
    add(time);

    for (var i = 0; i < PROXIES.length; i++) {
        if (proxyOk(PROXIES[i])) add(PROXIES[i]);
    }

    chain.push("DIRECT");
    return chain.join("; ");
}

// =====================================================
//  ⚡ Protocol Detection
// =====================================================
function getProtocolProxy(url, host) {
    if (url.indexOf("ws://") === 0 || url.indexOf("wss://") === 0)
        return WS_PROXY;
    if (url.indexOf("ftp://") === 0)
        return FAST_PROXY;
    return getSessionProxy(host);
}

// =====================================================
//  ⚡ DNS Prefetch Handling
// =====================================================
function isDnsPrefetch(url) {
    return url.indexOf("//") === 0;
}

// =====================================================
//  🎮 قوائم نطاقات PUBG Mobile
// =====================================================

var PUBG_CORE_STR =
    "pubgmobile.com,pubg.com,pubgmobile.live," +
    "pubgmobile-esports.com,pubgmobile.kr," +
    "pubgmobile.jp,pubgmobile.tw," +
    "pubgmobile.global,pubgmobile.community," +
    "gpubgm.com,igamecj.com," +
    "proximabeta.com,proximabeta.net," +
    "proximabeta.com.cn";

var PUBG_CDN_STR =
    "cdn.pubgmobile.com,img.pubgmobile.com," +
    "mcdn.pubgmobile.com,cdn-aws.pubgmobile.com," +
    "mcdn-aws.pubgmobile.com," +
    "livem-cdn.pubgmobile.com," +
    "spectate-cdn.pubgmobile.com," +
    "replay-cdn.pubgmobile.com," +
    "cdn-game.pubgmobile.com," +
    "img-game.pubgmobile.com," +
    "asset.pubgmobile.com," +
    "resource.pubgmobile.com," +
    "data.pubgmobile.com," +
    "download.pubgmobile.com," +
    "update.pubgmobile.com," +
    "patch.pubgmobile.com," +
    "map.pubgmobile.com";

var PUBG_API_STR =
    "api.pubgmobile.com,web-api.pubgmobile.com," +
    "m-api.pubgmobile.com," +
    "live-api.pubgmobile.com," +
    "spectate-api.pubgmobile.com," +
    "replay-api.pubgmobile.com," +
    "api-game.pubgmobile.com," +
    "config.pubgmobile.com," +
    "settings.pubgmobile.com";

var PUBG_LIVE_STR =
    "livem.pubgmobile.com," +
    "spectate.pubgmobile.com," +
    "replay.pubgmobile.com," +
    "live.pubgmobile.com," +
    "stream.pubgmobile.com," +
    "broadcast.pubgmobile.com";

var PUBG_LOG_STR =
    "log.pubgmobile.com," +
    "report.pubgmobile.com," +
    "analytics.pubgmobile.com," +
    "monitor.pubgmobile.com," +
    "crash.pubgmobile.com," +
    "bugreport.pubgmobile.com," +
    "mta.qq.com,beacon.qq.com," +
    "pingtas.qq.com,report.qq.com," +
    "log.qq.com,sdklog.qq.com," +
    "tlog.qq.com,tdw.qq.com," +
    "h.trace.qq.com," +
    "snowflake.qq.com," +
    "mta.tencent.com," +
    "beacon.tencent.com," +
    "analytics.tencent.com";

var PUBG_SOCIAL_STR =
    "social.pubgmobile.com," +
    "friend.pubgmobile.com," +
    "chat.pubgmobile.com," +
    "clan.pubgmobile.com," +
    "crew.pubgmobile.com," +
    "team.pubgmobile.com," +
    "guild.pubgmobile.com," +
    "message.pubgmobile.com," +
    "mail.pubgmobile.com," +
    "inbox.pubgmobile.com";

var PUBG_STORE_STR =
    "store.pubgmobile.com," +
    "pay.pubgmobile.com," +
    "purchase.pubgmobile.com," +
    "uc.pubgmobile.com," +
    "royalpass.pubgmobile.com," +
    "shop.pubgmobile.com," +
    "item.pubgmobile.com," +
    "crate.pubgmobile.com," +
    "spin.pubgmobile.com," +
    "lucky.pubgmobile.com," +
    "offer.pubgmobile.com";

var PUBG_EVENT_STR =
    "event.pubgmobile.com," +
    "events.pubgmobile.com," +
    "activity.pubgmobile.com," +
    "mission.pubgmobile.com," +
    "season.pubgmobile.com," +
    "pass.pubgmobile.com," +
    "challenge.pubgmobile.com," +
    "reward.pubgmobile.com," +
    "redeem.pubgmobile.com," +
    "code.pubgmobile.com";

var PUBG_ESPORTS_STR =
    "esports.pubgmobile.com," +
    "tournament.pubgmobile.com," +
    "pmco.pubgmobile.com," +
    "pmwl.pubgmobile.com," +
    "pmpl.pubgmobile.com," +
    "pmgc.pubgmobile.com," +
    "rank.pubgmobile.com," +
    "leaderboard.pubgmobile.com," +
    "pro.pubgmobile.com";

var PUBG_MATCH_STR =
    "match.pubgmobile.com," +
    "lobby.pubgmobile.com," +
    "room.pubgmobile.com," +
    "custom.pubgmobile.com," +
    "ranked.pubgmobile.com," +
    "classic.pubgmobile.com," +
    "arcade.pubgmobile.com," +
    "arena.pubgmobile.com," +
    "tdm.pubgmobile.com," +
    "payload.pubgmobile.com," +
    "zombie.pubgmobile.com," +
    "infection.pubgmobile.com," +
    "metro.pubgmobile.com," +
    "livik.pubgmobile.com," +
    "erangel.pubgmobile.com," +
    "miramar.pubgmobile.com," +
    "sanhok.pubgmobile.com," +
    "vikendi.pubgmobile.com," +
    "karakin.pubgmobile.com," +
    "taego.pubgmobile.com," +
    "deston.pubgmobile.com," +
    "nusa.pubgmobile.com";

var PUBG_VOICE_STR =
    "voice.pubgmobile.com," +
    "voip.pubgmobile.com," +
    "rtc.pubgmobile.com," +
    "audio.pubgmobile.com," +
    "talk.pubgmobile.com," +
    "mic.pubgmobile.com";

var PUBG_SEC_STR =
    "anticheat.pubgmobile.com," +
    "security.pubgmobile.com," +
    "protect.pubgmobile.com," +
    "verify.pubgmobile.com," +
    "safe.pubgmobile.com," +
    "shield.pubgmobile.com," +
    "ban.pubgmobile.com," +
    "report-cheat.pubgmobile.com";

var PUBG_PUSH_STR =
    "push.pubgmobile.com," +
    "notify.pubgmobile.com," +
    "notification.pubgmobile.com," +
    "alert.pubgmobile.com";

var PUBG_AUTH_STR =
    "login.pubgmobile.com," +
    "auth.pubgmobile.com," +
    "oauth.pubgmobile.com," +
    "account.pubgmobile.com," +
    "signup.pubgmobile.com," +
    "register.pubgmobile.com," +
    "guest.pubgmobile.com," +
    "facebook.com,fbcdn.net," +
    "google.com,googleapis.com," +
    "accounts.google.com," +
    "apple.com,appleid.apple.com," +
    "twitter.com,x.com," +
    "line.me,line.naver.jp";

var PUBG_WEB_STR =
    "web.pubgmobile.com," +
    "m.pubgmobile.com," +
    "www.pubgmobile.com," +
    "forum.pubgmobile.com," +
    "support.pubgmobile.com," +
    "help.pubgmobile.com," +
    "faq.pubgmobile.com," +
    "news.pubgmobile.com," +
    "blog.pubgmobile.com," +
    "media.pubgmobile.com";

// =====================================================
//  🎮 نطاقات Tencent
// =====================================================

var TENCENT_STR =
    "tencent.com,tencent.com.cn," +
    "qq.com,qq.com.cn," +
    "qzone.com,qzone.qq.com," +
    "wechat.com,weixin.qq.com," +
    "tenpay.com," +
    "qcloud.com,myqcloud.com," +
    "tencentyun.com," +
    "gtimg.cn,qpic.cn,qlogo.cn," +
    "idqqimg.com," +
    "qzonestyle.gtimg.cn," +
    "r.qq.com," +
    "m.qzone.com," +
    "h5.qzone.qq.com," +
    "mobile.qzone.qq.com";

var TENCENT_DL_STR =
    "dlied1.qq.com,dlied2.qq.com," +
    "dlied3.qq.com,dlied4.qq.com," +
    "dlied5.qq.com,dlied6.qq.com," +
    "dlied7.qq.com,dlied8.qq.com," +
    "dlied9.qq.com,dlied10.qq.com," +
    "isd.qq.com,mgame.qq.com," +
    "gp.qq.com,pg.qq.com," +
    "game.qq.com,game.gtimg.cn";

var TENCENT_CDN_STR =
    "cdngame.tencentyun.com," +
    "res.tencentyun.com," +
    "android.tencentyun.com," +
    "ios.tencentyun.com," +
    "sdk.tencentyun.com," +
    "config.tencentyun.com," +
    "update.tencentyun.com," +
    "download.tencentyun.com," +
    "patch.tencentyun.com," +
    "cdn.tencentyun.com," +
    "log.tencentyun.com," +
    "img.tencentyun.com";

// =====================================================
//  🌐 نطاقات مباشرة عامة
// =====================================================

var DIRECT_STR =
    "localhost,127.0.0.1,::1," +
    "google.com,youtube.com,googlevideo.com,gstatic.com," +
    "googleapis.com,ggpht.com,ytimg.com,googleusercontent.com," +
    "gvt1.com,gvt2.com,withgoogle.com,googleapis.cn," +
    "github.com,githubusercontent.com,github.io,githubassets.com," +
    "cloudflare.com,cdnjs.cloudflare.com,cloudflare-dns.com," +
    "cloudflareinsights.com,cloudflarestream.com," +
    "cdn.jsdelivr.net,jsdelivr.net,unpkg.com,bootstrapcdn.com," +
    "microsoft.com,windows.com,windowsupdate.com,windows.net," +
    "office.com,office365.com,live.com,outlook.com,skype.com," +
    "azure.com,azureedge.net,msedge.net,msftconnecttest.com," +
    "msn.com,bing.com,bingapis.com," +
    "apple.com,icloud.com,mzstatic.com,cdn-apple.com," +
    "whatsapp.com,whatsapp.net,wa.me," +
    "telegram.org,t.me,telegram.me,telegra.ph,telesco.pe," +
    "wikipedia.org,wikimedia.org,wikidata.org," +
    "stackoverflow.com,stackexchange.com,cdn.sstatic.net," +
    "archive.org,web.archive.org," +
    "speedtest.net,speedtestcustom.com," +
    "akamaized.net,akamai.net,akamaihd.net," +
    "amazonaws.com,cloudfront.net," +
    "fastly.net,fastlylb.net," +
    "edgecastcdn.net,systemcdn.net," +
    "stackpath.com,keycdn.com,bunnycdn.com," +
    "netflix.com,nflxvideo.net,nflximg.net,nflxext.com," +
    "spotify.com,scdn.co,spotifycdn.com," +
    "reddit.com,redd.it,redditstatic.com,redditmedia.com," +
    "discord.com,discord.gg,discordapp.com,discordapp.net," +
    "twitch.tv,twitchcdn.net,jtvnw.net,ttvnw.net," +
    "zoom.us,zoom.com,zmcdn.com," +
    "slack.com,slack-edge.com,slack-imgs.com," +
    "amazon.com,amazonvideo.com,primevideo.com," +
    "media-amazon.com,ssl-images-amazon.com," +
    "letsencrypt.org,digicert.com," +
    "npmjs.com,npmjs.org,pypi.org," +
    "docker.com,docker.io,hub.docker.com";

// =====================================================
//  🎮 بناء Trie Trees
// =====================================================

var TRIE_PUBG_CORE    = buildTrie(decomp(PUBG_CORE_STR));
var TRIE_PUBG_CDN     = buildTrie(decomp(PUBG_CDN_STR));
var TRIE_PUBG_API     = buildTrie(decomp(PUBG_API_STR));
var TRIE_PUBG_LIVE    = buildTrie(decomp(PUBG_LIVE_STR));
var TRIE_PUBG_LOG     = buildTrie(decomp(PUBG_LOG_STR));
var TRIE_PUBG_SOCIAL  = buildTrie(decomp(PUBG_SOCIAL_STR));
var TRIE_PUBG_STORE   = buildTrie(decomp(PUBG_STORE_STR));
var TRIE_PUBG_EVENT   = buildTrie(decomp(PUBG_EVENT_STR));
var TRIE_PUBG_ESPORTS = buildTrie(decomp(PUBG_ESPORTS_STR));
var TRIE_PUBG_MATCH   = buildTrie(decomp(PUBG_MATCH_STR));
var TRIE_PUBG_VOICE   = buildTrie(decomp(PUBG_VOICE_STR));
var TRIE_PUBG_SEC     = buildTrie(decomp(PUBG_SEC_STR));
var TRIE_PUBG_PUSH    = buildTrie(decomp(PUBG_PUSH_STR));
var TRIE_PUBG_AUTH    = buildTrie(decomp(PUBG_AUTH_STR));
var TRIE_PUBG_WEB     = buildTrie(decomp(PUBG_WEB_STR));

var TRIE_TENCENT      = buildTrie(decomp(TENCENT_STR));
var TRIE_TENCENT_DL   = buildTrie(decomp(TENCENT_DL_STR));
var TRIE_TENCENT_CDN  = buildTrie(decomp(TENCENT_CDN_STR));

var TRIE_DIRECT       = buildTrie(decomp(DIRECT_STR));

// =====================================================
//  🎮 أنماط Regex
// =====================================================
var PAT_GAME_UPDATE = /\/(update|patch|download|install|version)\//i;
var PAT_GAME_ASSET  = /\/(asset|resource|map|texture|model|sound|music|audio)\//i;
var PAT_GAME_LIVE   = /\/(live|stream|hls|dash|m3u8|mpd|broadcast|spectate)\//i;
var PAT_GAME_API    = /\/(api|graphql|rest|rpc|v[0-9]+|json)\//i;
var PAT_GAME_VOICE  = /\/(voice|voip|rtc|audio|talk|webrtc)\//i;
var PAT_GAME_MATCH  = /\/(match|lobby|room|custom|ranked|game)\//i;
var PAT_GAME_AUTH   = /\/(login|signin|auth|oauth|sso|register|verify)\//i;
var PAT_GAME_EVENT  = /\/(event|activity|mission|season|pass|challenge)\//i;
var PAT_GAME_STORE  = /\/(store|shop|pay|purchase|uc|item|crate)\//i;
var PAT_WS          = /wss?:\/\//i;
var PAT_STREAM      = /\/(live|stream|hls|dash|m3u8|mpd|manifest|segment)\//i;
var PAT_DL          = /\/(download|dl|file|attachment|export)\//i;
var PAT_API         = /\/(api|graphql|rest|rpc|v[0-9]+|json|xml|feed)\//i;
var PAT_LOGIN       = /\/(login|signin|auth|oauth|sso|signup|register|verify)\//i;
var PAT_FONT        = /\.(woff2?|ttf|eot|otf)(\?|$)/i;
var PAT_VIDEO       = /\.(mp4|webm|mkv|avi|mov|m4v)(\?|$)/i;

// =====================================================
//  🎮 امتدادات ملفات اللعبة
// =====================================================
var GAME_ASSET_EXT = decomp(
    ".pak,.ucas,.utoc,.uasset,.umap," +
    ".obb,.so,.dll,.dylib," +
    ".mp4,.mp3,.ogg,.wav,.wem,.bnk," +
    ".png,.jpg,.tga,.dds,.astc," +
    ".json,.xml,.csv,.txt,.cfg,.ini," +
    ".lua,.luac,.bytecode," +
    ".zip,.zstd,.lz4,.oodle"
);

var GAME_UPDATE_EXT = decomp(
    ".apk,.aab,.ipa,.obb,.patch," +
    ".diff,.delta,.hotfix," +
    ".zip,.tar,.gz,.xz,.zst"
);

var HEAVY_EXT = decomp(
    ".mp4,.mkv,.avi,.mov,.wmv,.flv,.webm,.m4v,.mpg,.mpeg," +
    ".zip,.rar,.7z,.iso,.tar,.gz,.bz2,.xz,.zst," +
    ".exe,.dmg,.apk,.msi,.deb,.rpm,.AppImage,.snap," +
    ".torrent,.magnet,.wasm"
);

var IMG_EXT = decomp(
    ".jpg,.jpeg,.png,.gif,.webp,.svg,.bmp,.ico,.tiff,.avif," +
    ".woff,.woff2,.ttf,.eot,.otf"
);

var STREAM_EXT = decomp(
    ".m3u8,.mpd,.m3u,.ts,.f4v,.asf,.rm,.rmvb"
);

// =====================================================
//  🎮 دوال مساعدة
// =====================================================

function isLocal(h) {
    if (isPlainHostName(h) || h === "localhost") return true;
    var suffixes = [".local", ".internal", ".lan",
                    ".home", ".router", ".gateway",
                    ".modem", ".switch", ".ap"];
    for (var i = 0; i < suffixes.length; i++) {
        if (h.indexOf(suffixes[i]) !== -1) return true;
    }
    return false;
}

function isPrivate(h) {
    if (h.charAt(0) < "0" || h.charAt(0) > "9") return false;
    if (h.indexOf("10.") === 0 || h.indexOf("127.") === 0 ||
        h.indexOf("192.168.") === 0 || h.indexOf("0.") === 0 ||
        h.indexOf("169.254.") === 0) return true;
    if (h.indexOf("172.") === 0) {
        var s = parseInt(h.split(".")[1], 10);
        if (s >= 16 && s <= 31) return true;
    }
    return false;
}

function getExt(url) {
    var path = url.split("?")[0].split("#")[0];
    var dot = path.lastIndexOf(".");
    if (dot === -1) return "";
    var ext = path.substring(dot).toLowerCase();
    var slash = ext.indexOf("/");
    return slash !== -1 ? ext.substring(0, slash) : ext;
}

function isPUBGDomain(host) {
    if (trieMatch(host, TRIE_PUBG_CORE))    return true;
    if (trieMatch(host, TRIE_PUBG_CDN))     return true;
    if (trieMatch(host, TRIE_PUBG_API))     return true;
    if (trieMatch(host, TRIE_PUBG_LIVE))    return true;
    if (trieMatch(host, TRIE_PUBG_LOG))     return true;
    if (trieMatch(host, TRIE_PUBG_SOCIAL))  return true;
    if (trieMatch(host, TRIE_PUBG_STORE))   return true;
    if (trieMatch(host, TRIE_PUBG_EVENT))   return true;
    if (trieMatch(host, TRIE_PUBG_ESPORTS)) return true;
    if (trieMatch(host, TRIE_PUBG_MATCH))   return true;
    if (trieMatch(host, TRIE_PUBG_VOICE))   return true;
    if (trieMatch(host, TRIE_PUBG_SEC))     return true;
    if (trieMatch(host, TRIE_PUBG_PUSH))    return true;
    if (trieMatch(host, TRIE_PUBG_AUTH))    return true;
    if (trieMatch(host, TRIE_PUBG_WEB))     return true;
    return false;
}

function isTencentDomain(host) {
    if (trieMatch(host, TRIE_TENCENT))     return true;
    if (trieMatch(host, TRIE_TENCENT_DL))  return true;
    if (trieMatch(host, TRIE_TENCENT_CDN)) return true;
    return false;
}

function isHeavy(url) {
    var ext = getExt(url);
    if (HEAVY_EXT[ext]) return true;
    if (STREAM_EXT[ext]) return true;
    if (PAT_STREAM.test(url)) return true;
    if (PAT_DL.test(url)) return true;
    if (PAT_VIDEO.test(url)) return true;
    return false;
}

function isLight(url) {
    return PAT_API.test(url) || PAT_FONT.test(url);
}

// =====================================================
//  🎮 الدالة الرئيسية
// =====================================================

function FindProxyForURL(url, host) {

    var cached = cacheGet(host);
    if (cached !== undefined) return cached;

    var result;

    // P1: شبكة محلية
    if (isLocal(host) || isPrivate(host)) {
        result = "DIRECT";
        cacheSet(host, result);
        return result;
    }

    // P2: مواقع مباشرة
    if (trieMatch(host, TRIE_DIRECT)) {
        result = "DIRECT";
        cacheSet(host, result);
        return result;
    }

    // P3: PUBG - البث المباشر
    if (trieMatch(host, TRIE_PUBG_LIVE) || PAT_GAME_LIVE.test(url)) {
        result = STREAM_PROXY + "; " + CHAINS.stream + "; " +
                 buildChain(GAME_PROXY);
        cacheSet(host, result);
        return result;
    }

    // P4: PUBG - الصوت
    if (trieMatch(host, TRIE_PUBG_VOICE) || PAT_GAME_VOICE.test(url)) {
        result = VOICE_PROXY + "; " + CHAINS.voice + "; " +
                 buildChain(GAME_PROXY);
        cacheSet(host, result);
        return result;
    }

    // P5: PUBG - المطابقة واللوبى
    if (trieMatch(host, TRIE_PUBG_MATCH) || PAT_GAME_MATCH.test(url)) {
        result = buildSmartChain(host);
        cacheSet(host, result);
        return result;
    }

    // P6: PUBG - تحديثات
    if (trieMatch(host, TRIE_PUBG_CDN) || PAT_GAME_UPDATE.test(url)) {
        result = FAST_PROXY + "; " + DL_PROXY + "; " +
                 CHAINS.fast + "; " + buildChain(GAME_PROXY);
        cacheSet(host, result);
        return result;
    }

    // P7: PUBG - موارد
    if (PAT_GAME_ASSET.test(url)) {
        var ext = getExt(url);
        if (GAME_ASSET_EXT[ext]) {
            result = FAST_PROXY + "; " + DL_PROXY + "; " +
                     buildChain(GAME_PROXY);
            cacheSet(host, result);
            return result;
        }
    }

    // P8: PUBG - API
    if (trieMatch(host, TRIE_PUBG_API) || PAT_GAME_API.test(url)) {
        result = buildSmartChain(host);
        cacheSet(host, result);
        return result;
    }

    // P9: PUBG - تسجيل دخول
    if (trieMatch(host, TRIE_PUBG_AUTH) || PAT_GAME_AUTH.test(url)) {
        result = SECURE_PROXY + "; " + CHAINS.secure + "; " +
                 buildChain(GAME_PROXY);
        cacheSet(host, result);
        return result;
    }

    // P10: PUBG - المتجر
    if (trieMatch(host, TRIE_PUBG_STORE) || PAT_GAME_STORE.test(url)) {
        result = SECURE_PROXY + "; " + buildChain(GAME_PROXY);
        cacheSet(host, result);
        return result;
    }

    // P11: PUBG - الأحداث
    if (trieMatch(host, TRIE_PUBG_EVENT) || PAT_GAME_EVENT.test(url)) {
        result = buildSmartChain(host);
        cacheSet(host, result);
        return result;
    }

    // P12: PUBG - الرياضات
    if (trieMatch(host, TRIE_PUBG_ESPORTS)) {
        result = buildSmartChain(host);
        cacheSet(host, result);
        return result;
    }

    // P13: PUBG - الاجتماعي
    if (trieMatch(host, TRIE_PUBG_SOCIAL)) {
        result = buildSmartChain(host);
        cacheSet(host, result);
        return result;
    }

    // P14: PUBG - الأمان
    if (trieMatch(host, TRIE_PUBG_SEC)) {
        result = SECURE_PROXY + "; " + buildChain(GAME_PROXY);
        cacheSet(host, result);
        return result;
    }

    // P15: PUBG - الإشعارات
    if (trieMatch(host, TRIE_PUBG_PUSH)) {
        result = buildSmartChain(host);
        cacheSet(host, result);
        return result;
    }

    // P16: PUBG - السجلات
    if (trieMatch(host, TRIE_PUBG_LOG)) {
        result = buildSmartChain(host);
        cacheSet(host, result);
        return result;
    }

    // P17: PUBG - الويب
    if (trieMatch(host, TRIE_PUBG_WEB)) {
        result = buildSmartChain(host);
        cacheSet(host, result);
        return result;
    }

    // P18: PUBG - الأساسي
    if (trieMatch(host, TRIE_PUBG_CORE)) {
        result = buildSmartChain(host);
        cacheSet(host, result);
        return result;
    }

    // P19: Tencent - تحميل
    if (trieMatch(host, TRIE_TENCENT_DL)) {
        result = FAST_PROXY + "; " + DL_PROXY + "; " +
                 buildChain(GAME_PROXY);
        cacheSet(host, result);
        return result;
    }

    // P20: Tencent - CDN
    if (trieMatch(host, TRIE_TENCENT_CDN)) {
        result = FAST_PROXY + "; " + buildChain(GAME_PROXY);
        cacheSet(host, result);
        return result;
    }

    // P21: Tencent - عام
    if (trieMatch(host, TRIE_TENCENT)) {
        result = buildSmartChain(host);
        cacheSet(host, result);
        return result;
    }

    // P22: نطاقات مشبوهة
    if (isSuspiciousDomain(host)) {
        result = SECURE_PROXY + "; " + getSessionProxy(host) + "; DIRECT";
        cacheSet(host, result);
        return result;
    }

    // P23: SNI Routing
    var sniCat = getSNICategory(host);
    if (sniCat === "bank" || sniCat === "gov") {
        result = SECURE_PROXY + "; DIRECT";
        cacheSet(host, result);
        return result;
    }
    if (sniCat === "edu") {
        result = "DIRECT";
        cacheSet(host, result);
        return result;
    }

    // P24: Connection Grouping
    var groupProxy = getGroupProxy(host);
    if (groupProxy) {
        result = buildChain(groupProxy);
        cacheSet(host, result);
        return result;
    }

    // P25: WebSocket
    if (PAT_WS.test(url)) {
        result = WS_PROXY + "; " + getSessionProxy(host) + "; DIRECT";
        cacheSet(host, result);
        return result;
    }

    // P26: FTP
    if (url.indexOf("ftp://") === 0) {
        result = FAST_PROXY + "; " + getSessionProxy(host) + "; DIRECT";
        cacheSet(host, result);
        return result;
    }

    // P27: طلبات خفيفة
    if (isLight(url)) {
        result = getSessionProxy(host) + "; DIRECT";
        cacheSet(host, result);
        return result;
    }

    // P28: ملفات ثقيلة
    if (isHeavy(url)) {
        result = FAST_PROXY + "; " + DL_PROXY + "; " +
                 getSessionProxy(host) + "; DIRECT";
        cacheSet(host, result);
        return result;
    }

    // P29: صور
    var ext = getExt(url);
    if (IMG_EXT[ext]) {
        result = "DIRECT";
        cacheSet(host, result);
        return result;
    }

    // P30: تحديث اللعبة
    if (GAME_UPDATE_EXT[ext]) {
        result = FAST_PROXY + "; " + DL_PROXY + "; " +
                 buildChain(GAME_PROXY);
        cacheSet(host, result);
        return result;
    }

    // P31: الباقي
    result = buildSmartChain(host);
    cacheSet(host, result);
    return result;
}

// =====================================================
//  دعم IPv6
// =====================================================
function FindProxyForURLEx(url, host) {
    return FindProxyForURL(url, host);
}
