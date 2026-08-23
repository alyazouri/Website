// PUBG Mobile PAC — JO > Gulf/SA priority, sticky, zero internet DIRECT
// ES3. LAN only DIRECT.

// --- priority pools (first working hop wins; PAC failover is left-to-right)
// Fill JO_RESIDENTIAL with live Jordan ip:port when you have them.
var JO_RESIDENTIAL = [
];

var SA_GULF = [
    "47.91.104.88:3128",
    "47.91.121.127:3128",
    "47.91.120.190:8080",
    "47.91.115.179:8080",
    "47.91.110.148:8083",
    "47.91.109.17:8888",
    "139.185.52.142:5222"
];

function toProxy(addr) {
    return "PROXY " + addr;
}

function buildChain(list) {
    var s = "";
    var i;
    for (i = 0; i < list.length; i++) {
        if (i) s += "; ";
        s += toProxy(list[i]);
    }
    return s;
}

function mergePriority() {
    var out = [];
    var i;
    for (i = 0; i < JO_RESIDENTIAL.length; i++) out.push(JO_RESIDENTIAL[i]);
    for (i = 0; i < SA_GULF.length; i++) out.push(SA_GULF[i]);
    return out;
}

var POOL = mergePriority();

function rotateChain(start) {
    var n = POOL.length;
    if (n === 0) return "DIRECT";
    var s = "";
    var i;
    for (i = 0; i < n; i++) {
        if (i) s += "; ";
        s += toProxy(POOL[(start + i) % n]);
    }
    return s;
}

// Matchmaking / recruitment / in-match always start at index 0 = Jordan first, then SA/Gulf
var CHAIN_MATCHMAKE = rotateChain(0);
var CHAIN_RECRUIT   = rotateChain(0);
var CHAIN_TEAMMATE  = rotateChain(0);
var CHAIN_OPPONENT  = rotateChain(0);
var CHAIN_VOICE     = rotateChain(JO_RESIDENTIAL.length > 0 ? 0 : 5);
var CHAIN_FAST      = rotateChain(JO_RESIDENTIAL.length > 0 ? 0 : 2);
var CHAIN_SECURE    = rotateChain(JO_RESIDENTIAL.length > 0 ? 0 : 6);

var _cache = {};
var _n = 0;

function cacheGet(k) { return _cache[k] ? _cache[k] : null; }
function cacheSet(k, v) {
    if (_n > 1500) { _cache = {}; _n = 0; }
    if (!_cache[k]) _n++;
    _cache[k] = v;
}

function suf(h, d) {
    if (h === d) return true;
    var s = "." + d;
    var i = h.length - s.length;
    return i > 0 && h.substring(i) === s;
}

function inArr(h, a) {
    var i;
    for (i = 0; i < a.length; i++) if (suf(h, a[i])) return true;
    return false;
}

function hash(s) {
    var h = 5381, i;
    for (i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) & 0x7FFFFFFF;
    return h;
}

function sticky(h) {
    if (POOL.length === 0) return "DIRECT";
    return rotateChain(hash(h) % POOL.length);
}

function isLan(h) {
    if (isPlainHostName(h)) return true;
    if (h === "localhost" || h === "127.0.0.1" || h === "::1") return true;
    if (shExpMatch(h, "*.local") || shExpMatch(h, "*.lan") || shExpMatch(h, "*.internal")) return true;
    if (isInNet(h, "10.0.0.0", "255.0.0.0")) return true;
    if (isInNet(h, "172.16.0.0", "255.240.0.0")) return true;
    if (isInNet(h, "192.168.0.0", "255.255.0.0")) return true;
    if (isInNet(h, "127.0.0.0", "255.0.0.0")) return true;
    if (isInNet(h, "169.254.0.0", "255.255.0.0")) return true;
    return false;
}

function path(u, p) { return u.toLowerCase().indexOf(p) !== -1; }

var H_MATCH = [
    "match.pubgmobile.com", "lobby.pubgmobile.com", "room.pubgmobile.com",
    "custom.pubgmobile.com", "ranked.pubgmobile.com", "classic.pubgmobile.com",
    "arcade.pubgmobile.com", "arena.pubgmobile.com", "tdm.pubgmobile.com",
    "match.igamecj.com", "lobby.igamecj.com", "room.igamecj.com",
    "match.proximabeta.com", "lobby.proximabeta.com"
];

var H_RECRUIT = [
    "social.pubgmobile.com", "friend.pubgmobile.com", "clan.pubgmobile.com",
    "crew.pubgmobile.com", "team.pubgmobile.com", "guild.pubgmobile.com",
    "chat.pubgmobile.com", "message.pubgmobile.com"
];

var H_VOICE = [
    "voice.pubgmobile.com", "voip.pubgmobile.com", "rtc.pubgmobile.com",
    "audio.pubgmobile.com", "voice.igamecj.com", "voip.igamecj.com"
];

var H_LIVE = [
    "livem.pubgmobile.com", "spectate.pubgmobile.com", "replay.pubgmobile.com",
    "live.pubgmobile.com", "stream.pubgmobile.com"
];

var H_CDN = [
    "cdn.pubgmobile.com", "mcdn.pubgmobile.com", "download.pubgmobile.com",
    "update.pubgmobile.com", "patch.pubgmobile.com", "asset.pubgmobile.com",
    "tencentyun.com", "dlied1.qq.com", "dlied2.qq.com", "dlied3.qq.com",
    "dlied4.qq.com", "dlied5.qq.com"
];

var H_AUTH = [
    "login.pubgmobile.com", "auth.pubgmobile.com", "account.pubgmobile.com",
    "pay.pubgmobile.com", "store.pubgmobile.com", "uc.pubgmobile.com"
];

var H_GAME = [
    "pubgmobile.com", "pubg.com", "gpubgm.com", "igamecj.com",
    "proximabeta.com", "proximabeta.net", "tencent.com", "qq.com",
    "krafton.com"
];

function isGameHost(h) {
    return h.indexOf("pubg") !== -1 || h.indexOf("igamecj") !== -1 ||
           h.indexOf("proximabeta") !== -1 || h.indexOf("gpubgm") !== -1 ||
           h.indexOf("tencentyun") !== -1;
}

function FindProxyForURL(url, host) {
    host = host.toLowerCase();
    if (isLan(host)) return "DIRECT";

    var c = cacheGet(host);
    if (c) return c;

    var r;

    // 1) matchmaking + in-match: JO first, then Gulf/SA
    if (inArr(host, H_MATCH) || path(url, "/match") || path(url, "/lobby") ||
        path(url, "/room") || path(url, "/ranked")) {
        r = CHAIN_MATCHMAKE;
        cacheSet(host, r);
        return r;
    }

    // 2) recruitment / party / clan: same JO-first chain
    if (inArr(host, H_RECRUIT) || path(url, "/friend") || path(url, "/clan") ||
        path(url, "/team") || path(url, "/recruit")) {
        r = CHAIN_RECRUIT;
        cacheSet(host, r);
        return r;
    }

    // 3) teammates / opponents share same egress (sticky JO-first)
    if (path(url, "/player") || path(url, "/opponent") || path(url, "/teammate")) {
        r = CHAIN_TEAMMATE;
        cacheSet(host, r);
        return r;
    }

    if (inArr(host, H_VOICE) || path(url, "/voice") || path(url, "/voip")) {
        r = CHAIN_VOICE;
        cacheSet(host, r);
        return r;
    }
    if (inArr(host, H_LIVE) || path(url, "/live/") || path(url, "/stream/")) {
        r = CHAIN_FAST;
        cacheSet(host, r);
        return r;
    }
    if (inArr(host, H_CDN) || path(url, "/update") || path(url, "/download")) {
        r = CHAIN_FAST;
        cacheSet(host, r);
        return r;
    }
    if (inArr(host, H_AUTH) || path(url, "/login") || path(url, "/oauth")) {
        r = CHAIN_SECURE;
        cacheSet(host, r);
        return r;
    }
    if (inArr(host, H_GAME) || isGameHost(host)) {
        r = CHAIN_MATCHMAKE;
        cacheSet(host, r);
        return r;
    }

    r = sticky(host);
    cacheSet(host, r);
    return r;
}

function FindProxyForURLEx(url, host) {
    return FindProxyForURL(url, host);
}
