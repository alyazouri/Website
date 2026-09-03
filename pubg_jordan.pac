/* =========================================================
   🇯🇴 JORDAN TITANIUM PAC — auto-generated
   🎮 PUBG MOBILE GLOBAL — Jordan-pure routing
   🕒 2026-09-03 02:15  |  v2.2 — كله على البروكسي، بدون DIRECT
   🔗 Proxies: 2 شغّال  |  النطاقات: 127 أردنية
   =========================================================
   مسار كل الاتصالات (PUBG + التصفح) — بترتيب الفشل التلقائي:
   1️⃣  PROXY 79.173.251.21:20001   (أردني — أساسي)
   2️⃣  PROXY 86.108.11.20:443      (أردني — بديل)
   ⛔ لا يوجد DIRECT نهائياً بالسكربت
   ========================================================= */

/* ====== ⚙️ إعدادات البروكسي — عدّل من هنا فقط ====== */

/* نوع البروكسي:
   "PROXY"   = HTTP/HTTPS proxy (الافتراضي)
   "SOCKS5"  = إذا البروكسي عندك SOCKS5 غيّر هون بس */
var PROTO = "PROXY";

/* البروكسيات الأردنية — بترتيب الأولوية (الأول أساسي، الثاني بديل) */
var JO_PROXIES = [
  "79.173.251.21:20001",   /* 🇯🇴 أردني — ضمن 79.173.192.0/18  */
  "86.108.11.20:443"       /* 🇯🇴 أردني — ضمن 86.108.0.0/17    */
];

/* بناء سلسلة الفشل التلقائي: proxy1; proxy2 (بدون DIRECT نهائياً) */
function buildProxyChain(proxies) {
  var chain = [];
  for (var i = 0; i < proxies.length; i++) {
    chain.push(PROTO + " " + proxies[i]);
  }
  return chain.join("; ");
}

/* 🎮 مسار PUBG — بروكسي أردني فقط */
var PUBG_CORE = buildProxyChain(JO_PROXIES);

/* 🌐 مسار التصفح العام — نفس البروكسي الأردني (بدون DIRECT) */
var WEB_CORE = buildProxyChain(JO_PROXIES);

/* ====== نهاية الإعدادات ====== */

function isJordanResidential(host) {
  return (
    isInNet(host,"2.59.52.0","255.255.252.0") ||
    isInNet(host,"5.45.128.0","255.255.240.0") ||
    isInNet(host,"5.198.240.0","255.255.248.0") ||
    isInNet(host,"5.199.184.0","255.255.252.0") ||
    isInNet(host,"37.17.192.0","255.255.240.0") ||
    isInNet(host,"37.44.32.0","255.255.248.0") ||
    isInNet(host,"37.75.144.0","255.255.248.0") ||
    isInNet(host,"37.123.64.0","255.255.224.0") ||
    isInNet(host,"37.152.0.0","255.255.248.0") ||
    isInNet(host,"37.202.64.0","255.255.192.0") ||
    isInNet(host,"37.220.112.0","255.255.240.0") ||
    isInNet(host,"37.252.222.0","255.255.255.0") ||
    isInNet(host,"45.142.196.0","255.255.252.0") ||
    isInNet(host,"46.23.112.0","255.255.240.0") ||
    isInNet(host,"46.32.96.0","255.255.224.0") ||
    isInNet(host,"46.185.128.0","255.255.128.0") ||
    isInNet(host,"46.248.192.0","255.255.224.0") ||
    isInNet(host,"62.72.160.0","255.255.224.0") ||
    isInNet(host,"77.245.0.0","255.255.240.0") ||
    isInNet(host,"79.134.128.0","255.255.224.0") ||
    isInNet(host,"79.173.192.0","255.255.192.0") ||
    isInNet(host,"80.90.160.0","255.255.240.0") ||
    isInNet(host,"81.21.0.0","255.255.240.0") ||
    isInNet(host,"81.28.112.0","255.255.240.0") ||
    isInNet(host,"82.212.64.0","255.255.192.0") ||
    isInNet(host,"84.18.32.0","255.255.224.0") ||
    isInNet(host,"84.18.64.0","255.255.224.0") ||
    isInNet(host,"84.252.106.0","255.255.255.0") ||
    isInNet(host,"85.159.216.0","255.255.248.0") ||
    isInNet(host,"86.108.0.0","255.255.128.0") ||
    isInNet(host,"87.236.232.0","255.255.248.0") ||
    isInNet(host,"87.238.128.0","255.255.248.0") ||
    isInNet(host,"89.20.49.0","255.255.255.0") ||
    isInNet(host,"89.28.216.0","255.255.248.0") ||
    isInNet(host,"89.38.152.0","255.255.254.0") ||
    isInNet(host,"91.106.96.0","255.255.240.0") ||
    isInNet(host,"91.132.100.0","255.255.255.0") ||
    isInNet(host,"91.186.224.0","255.255.224.0") ||
    isInNet(host,"91.209.248.0","255.255.255.0") ||
    isInNet(host,"91.212.0.0","255.255.255.0") ||
    isInNet(host,"91.220.195.0","255.255.255.0") ||
    isInNet(host,"91.223.202.0","255.255.255.0") ||
    isInNet(host,"92.241.32.0","255.255.224.0") ||
    isInNet(host,"92.253.0.0","255.255.128.0") ||
    isInNet(host,"93.93.144.0","255.255.248.0") ||
    isInNet(host,"93.95.200.0","255.255.248.0") ||
    isInNet(host,"93.115.2.0","255.255.254.0") ||
    isInNet(host,"93.115.15.0","255.255.255.0") ||
    isInNet(host,"93.191.176.0","255.255.248.0") ||
    isInNet(host,"94.127.208.0","255.255.248.0") ||
    isInNet(host,"94.142.32.0","255.255.224.0") ||
    isInNet(host,"94.249.0.0","255.255.128.0") ||
    isInNet(host,"95.141.208.0","255.255.240.0") ||
    isInNet(host,"95.172.192.0","255.255.224.0") ||
    isInNet(host,"109.107.224.0","255.255.224.0") ||
    isInNet(host,"109.237.192.0","255.255.240.0") ||
    isInNet(host,"141.0.0.0","255.255.248.0") ||
    isInNet(host,"141.98.64.0","255.255.252.0") ||
    isInNet(host,"141.105.56.0","255.255.248.0") ||
    isInNet(host,"146.19.239.0","255.255.255.0") ||
    isInNet(host,"146.19.246.0","255.255.255.0") ||
    isInNet(host,"149.200.128.0","255.255.128.0") ||
    isInNet(host,"176.28.128.0","255.255.128.0") ||
    isInNet(host,"176.29.0.0","255.255.0.0") ||
    isInNet(host,"176.57.0.0","255.255.224.0") ||
    isInNet(host,"176.57.48.0","255.255.240.0") ||
    isInNet(host,"176.118.39.0","255.255.255.0") ||
    isInNet(host,"176.241.64.0","255.255.248.0") ||
    isInNet(host,"178.20.184.0","255.255.248.0") ||
    isInNet(host,"178.77.128.0","255.255.192.0") ||
    isInNet(host,"178.238.176.0","255.255.240.0") ||
    isInNet(host,"185.10.216.0","255.255.252.0") ||
    isInNet(host,"185.12.244.0","255.255.252.0") ||
    isInNet(host,"185.14.132.0","255.255.252.0") ||
    isInNet(host,"185.19.112.0","255.255.252.0") ||
    isInNet(host,"185.24.128.0","255.255.252.0") ||
    isInNet(host,"185.30.248.0","255.255.252.0") ||
    isInNet(host,"185.33.28.0","255.255.252.0") ||
    isInNet(host,"185.40.19.0","255.255.255.0") ||
    isInNet(host,"185.43.146.0","255.255.255.0") ||
    isInNet(host,"185.51.212.0","255.255.252.0") ||
    isInNet(host,"185.57.120.0","255.255.252.0") ||
    isInNet(host,"185.68.54.0","255.255.255.0") ||
    isInNet(host,"185.80.24.0","255.255.252.0") ||
    isInNet(host,"185.80.104.0","255.255.252.0") ||
    isInNet(host,"185.98.220.0","255.255.252.0") ||
    isInNet(host,"185.98.224.0","255.255.252.0") ||
    isInNet(host,"185.109.120.0","255.255.252.0") ||
    isInNet(host,"185.109.192.0","255.255.252.0") ||
    isInNet(host,"185.135.200.0","255.255.252.0") ||
    isInNet(host,"185.139.220.0","255.255.252.0") ||
    isInNet(host,"185.159.180.0","255.255.252.0") ||
    isInNet(host,"185.160.236.0","255.255.252.0") ||
    isInNet(host,"185.163.205.0","255.255.255.0") ||
    isInNet(host,"185.173.56.0","255.255.252.0") ||
    isInNet(host,"185.175.248.0","255.255.252.0") ||
    isInNet(host,"185.176.44.0","255.255.252.0") ||
    isInNet(host,"185.180.80.0","255.255.252.0") ||
    isInNet(host,"185.182.136.0","255.255.252.0") ||
    isInNet(host,"185.193.176.0","255.255.252.0") ||
    isInNet(host,"185.197.176.0","255.255.252.0") ||
    isInNet(host,"185.200.128.0","255.255.252.0") ||
    isInNet(host,"185.234.111.0","255.255.255.0") ||
    isInNet(host,"185.241.62.0","255.255.255.0") ||
    isInNet(host,"185.253.112.0","255.255.252.0") ||
    isInNet(host,"188.123.160.0","255.255.224.0") ||
    isInNet(host,"188.247.64.0","255.255.224.0") ||
    isInNet(host,"193.17.53.0","255.255.255.0") ||
    isInNet(host,"193.108.134.0","255.255.254.0") ||
    isInNet(host,"193.111.29.0","255.255.255.0") ||
    isInNet(host,"193.188.64.0","255.255.224.0") ||
    isInNet(host,"193.189.148.0","255.255.255.0") ||
    isInNet(host,"193.203.24.0","255.255.254.0") ||
    isInNet(host,"193.203.110.0","255.255.254.0") ||
    isInNet(host,"194.104.95.0","255.255.255.0") ||
    isInNet(host,"194.110.236.0","255.255.255.0") ||
    isInNet(host,"194.165.128.0","255.255.224.0") ||
    isInNet(host,"195.18.9.0","255.255.255.0") ||
    isInNet(host,"195.20.216.0","255.255.255.0") ||
    isInNet(host,"212.34.0.0","255.255.224.0") ||
    isInNet(host,"212.35.64.0","255.255.224.0") ||
    isInNet(host,"212.118.0.0","255.255.224.0") ||
    isInNet(host,"213.139.32.0","255.255.224.0") ||
    isInNet(host,"213.186.160.0","255.255.224.0") ||
    isInNet(host,"217.23.32.0","255.255.240.0") ||
    isInNet(host,"217.29.240.0","255.255.240.0") ||
    isInNet(host,"217.144.0.0","255.255.240.0")
  );
}

function isPUBGDirect(s) {
  return (
    /(^|[.\-_])pubg([.\-_]|$)/.test(s) ||
    /(^|[.\-_])pubgm([.\-_]|$)/.test(s) ||
    /(^|[.\-_])pubgmobile([.\-_]|$)/.test(s) ||
    /(^|[.\-_])pubgsea([.\-_]|$)/.test(s) ||
    /(^|[.\-_])pubgkr([.\-_]|$)/.test(s) ||
    /(^|[.\-_])pubgcs([.\-_]|$)/.test(s)
  );
}

function isPUBGPublisher(s) {
  return (
    /(^|[.\-_])krafton([.\-_]|$)/.test(s) ||
    /(^|[.\-_])tencent([.\-_]|$)/.test(s) ||
    /(^|[.\-_])lightspeed([.\-_]|$)/.test(s) ||
    /(^|[.\-_])proximabeta([.\-_]|$)/.test(s) ||
    /(^|[.\-_])levelinfinite([.\-_]|$)/.test(s) ||
    /(^|[.\-_])igame([.\-_]|$)/.test(s)
  );
}

function isPUBGInfra(s) {
  return (
    /qcloud/.test(s) ||
    /myqcloud/.test(s) ||
    /tencentcs/.test(s) ||
    /gtimg\.cn/.test(s) ||
    /\.qq\.com/.test(s) ||
    /amazonaws/.test(s) ||
    /aliyun/.test(s) ||
    /alibaba/.test(s) ||
    /cloudfront/.test(s)
  );
}

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
    /allocation/.test(s)
  );
}

function isPUBGMode(s) {
  return (
    /erangel/.test(s) || /livik/.test(s) || /sanhok/.test(s) ||
    /miramar/.test(s) || /vikendi/.test(s) || /karakin/.test(s) ||
    /nusa/.test(s) || /tdm/.test(s) || /teamdeathmatch/.test(s) ||
    /payload/.test(s) || /metroroyale/.test(s) || /metro-royale/.test(s)
  );
}

function isPUBGAPI(u) {
  return (
    /(\/api\/|\/v1\/|\/v2\/|\/v3\/)/.test(u) &&
    /(game|match|session|battle|player|server|region)/.test(u)
  );
}

function isPUBGServerDiscovery(s,u) {
  return (
    /(serverlist|server-list|realm|routing)/.test(u) &&
    /(game|match|player|pubg|pubgm|tencent|krafton)/.test(s)
  );
}

function isPUBGResource(s,u) {
  return (
    /(patch|update|resource|asset|hotfix)/.test(u) &&
    /(pubg|pubgm|tencent|lightspeed|proximabeta|krafton)/.test(s)
  );
}

function getPUBGScore(host,url) {
  var h = (host || "").toLowerCase();
  var u = (url || "").toLowerCase();
  h = h.replace(/^\.+|\.+$/g,"");
  u = u.replace(/[\r\n\t]/g,"");
  var s = h + " " + u;
  var score = 0;
  if (isPUBGDirect(s)) score += 100;
  if (isPUBGPublisher(s)) score += 85;
  if (isPUBGInfra(s)) score += 25;
  if (isPUBGService(s)) score += 70;
  if (isPUBGMode(s)) score += 45;
  if (isPUBGAPI(u)) score += 35;
  if (isPUBGServerDiscovery(s,u)) score += 40;
  if (isPUBGResource(s,u)) score += 30;
  if (/match/.test(s) && /(game|session|battle|server)/.test(s)) score += 15;
  if (/battle/.test(s) && /(game|match|session|server)/.test(s)) score += 15;
  return score;
}

function isPUBG(host,url) {
  return getPUBGScore(host,url) >= 60;
}

function FindProxyForURL(url,host) {
  host = host || "";
  url  = url  || "";

  /* 🎮 كل دومينات/مسارات PUBG العالمية → بروكسي أردني (فشل تلقائي بين البروكسيات فقط) */
  if (isPUBG(host,url)) {
    return PUBG_CORE;
  }

  /* 🌐 أي طلب تاني (تصفح عام) → نفس البروكسي الأردني — بدون DIRECT */
  return WEB_CORE;
}
