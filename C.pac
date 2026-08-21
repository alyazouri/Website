// ============================================================
// PUBG IPv4 ROTATION LOCK — ENHANCED EDITION
// GeoIP Prioritization | Smart Failover | Session Stickiness
// ISP Filtering | Debug Logging | Subnet Blacklist/Whitelist
// Health Scoring Framework | Config-Driven
// ============================================================

// ================= EMBEDDED CONFIG =================
// في الإنتاج: استضف هذا كملف JSON منفصل وافتحه بـ fetch()
// هنا مدمج للتوافق مع PAC القياسي

var CONFIG = {
  "rotation": {
    "intervalMs": 60000,
    "failoverThresholdMs": 5000,
    "healthCheckIntervalMs": 300000
  },
  "proxies": {
    "main": "SOCKS5 92.253.111.235:1080; SOCKS 92.253.111.235:1080",
    "fallback": [
      "PROXY 46.185.131.170:8080",
      "PROXY 86.108.63.131:80"
    ]
  },
  "subnets": [
    { "base": "86.108.0.0",     "len": 17, "isp": "Orange Jordan",      "tier": 1, "tags": ["residential", "fiber"],      "blacklisted": false },
    { "base": "92.253.0.0",     "len": 17, "isp": "Orange Jordan LNS3", "tier": 1, "tags": ["residential", "adsl"],         "blacklisted": false },
    { "base": "94.249.0.0",     "len": 17, "isp": "Orange Jordan LNS4", "tier": 1, "tags": ["residential", "adsl"],         "blacklisted": false },
    { "base": "46.185.128.0",   "len": 17, "isp": "Umniah",             "tier": 1, "tags": ["residential", "fiber"],        "blacklisted": false },
    { "base": "149.200.128.0",  "len": 17, "isp": "Zain Jordan",        "tier": 1, "tags": ["residential", "fiber"],        "blacklisted": false },
    { "base": "37.202.64.0",    "len": 18, "isp": "Orange Jordan",      "tier": 2, "tags": ["residential"],                 "blacklisted": false },
    { "base": "79.173.192.0",   "len": 18, "isp": "Umniah",             "tier": 2, "tags": ["residential"],                 "blacklisted": false },
    { "base": "194.165.128.0",  "len": 19, "isp": "Zain Jordan",        "tier": 2, "tags": ["residential"],                 "blacklisted": false },
    { "base": "79.134.128.0",   "len": 19, "isp": "Orange Jordan",      "tier": 2, "tags": ["residential"],                 "blacklisted": false },
    { "base": "213.186.160.0",  "len": 19, "isp": "Orange Jordan",      "tier": 2, "tags": ["adsl"],                        "blacklisted": false },
    { "base": "213.139.32.0",   "len": 19, "isp": "Umniah",             "tier": 3, "tags": ["business"],                    "blacklisted": false },
    { "base": "212.34.0.0",     "len": 19, "isp": "Zain Jordan",        "tier": 3, "tags": ["business"],                    "blacklisted": false },
    { "base": "84.18.32.0",     "len": 19, "isp": "Orange Jordan",      "tier": 3, "tags": ["business"],                    "blacklisted": false },
    { "base": "84.18.64.0",     "len": 19, "isp": "Orange Jordan",      "tier": 3, "tags": ["business"],                    "blacklisted": false },
    { "base": "81.28.112.0",    "len": 20, "isp": "Orange Jordan",      "tier": 3, "tags": ["business"],                    "blacklisted": false },
    { "base": "62.72.161.0",    "len": 24, "isp": "Orange Jordan",      "tier": 4, "tags": ["legacy", "small"],             "blacklisted": false },
    { "base": "62.72.162.0",    "len": 24, "isp": "Orange Jordan",      "tier": 4, "tags": ["legacy", "small"],             "blacklisted": false },
    { "base": "62.72.165.0",    "len": 24, "isp": "Orange Jordan",      "tier": 4, "tags": ["legacy", "small"],             "blacklisted": false },
    { "base": "62.72.166.0",    "len": 24, "isp": "Orange Jordan",      "tier": 4, "tags": ["legacy", "small"],             "blacklisted": false },
    { "base": "62.72.168.0",    "len": 22, "isp": "Orange Jordan",      "tier": 4, "tags": ["legacy", "small"],             "blacklisted": false },
    { "base": "62.72.174.0",    "len": 24, "isp": "Orange Jordan",      "tier": 4, "tags": ["legacy", "small"],             "blacklisted": false },
    { "base": "62.72.176.0",    "len": 24, "isp": "Orange Jordan",      "tier": 4, "tags": ["legacy", "small"],             "blacklisted": false },
    { "base": "62.72.179.0",    "len": 24, "isp": "Orange Jordan",      "tier": 4, "tags": ["legacy", "small"],             "blacklisted": false },
    { "base": "62.72.180.0",    "len": 24, "isp": "Orange Jordan",      "tier": 4, "tags": ["legacy", "small"],             "blacklisted": false },
    { "base": "62.72.184.0",    "len": 22, "isp": "Orange Jordan",      "tier": 4, "tags": ["legacy", "small"],             "blacklisted": false },
    { "base": "62.72.191.0",    "len": 24, "isp": "Orange Jordan",      "tier": 4, "tags": ["legacy", "small"],             "blacklisted": false }
  ],
  "geoip": {
    "jordanGameServers": [
      "185.185.185.185",
      "185.185.185.186"
    ],
    "preferTier": [1, 2],
    "avoidTags": ["legacy", "business"]
  },
  "session": {
    "lobbyLockCIDR": 16,
    "matchLockCIDR": 24,
    "maxLobbyChanges": 2,
    "maxMatchChanges": 0,
    "resetOnDisconnect": true
  },
  "failover": {
    "enabled": true,
    "maxRetries": 2,
    "retryDelayMs": 2000,
    "healthCheckUrl": "http://connectivitycheck.gstatic.com/generate_204"
  },
  "logging": {
    "enabled": true,
    "level": "debug",
    "prefix": "[PUBG-PAC] "
  },
  "blacklist": {
    "enabled": true,
    "subnets": [],
    "ips": []
  },
  "whitelist": {
    "enabled": false,
    "subnets": []
  }
};

// ================= CONSTANTS =================
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 127.0.0.1:1";

// ================= STATE =================
var ROTATION = {
  index: 0,
  startTime: 0,
  duration: CONFIG.rotation.intervalMs,
  lastHealthCheck: 0,
  healthScores: {},
  failedSubnets: {}
};

var SESSION = {
  lobby: null,
  match: null,
  active: false,
  lobbyChanges: 0,
  matchChanges: 0,
  lastLobbyNet: null,
  lastMatchNet: null
};

var FAILOVER = {
  currentProxyIndex: 0,
  retries: 0,
  lastFailTime: 0,
  proxyChain: null
};

var LOG_BUFFER = [];

// ================= LOGGING =================
function log(level, msg) {
  if (!CONFIG.logging.enabled) return;
  var levels = { debug: 0, info: 1, warn: 2, error: 3 };
  var configLevel = levels[CONFIG.logging.level] || 0;
  if (levels[level] < configLevel) return;

  var timestamp = new Date().toISOString();
  var line = CONFIG.logging.prefix + "[" + level.toUpperCase() + "] " + timestamp + " " + msg;
  LOG_BUFFER.push(line);
  if (LOG_BUFFER.length > 200) LOG_BUFFER.shift();

  // PAC لا يدعم console.log في كل البيئات، لكن بعضها يدعمه
  try { console.log(line); } catch (e) {}
}

function getLogs() {
  return LOG_BUFFER.join("\n");
}

// ================= UTILITIES =================
function isIPv4(ip) {
  if (!ip || ip.indexOf(":") !== -1) return false;
  var p = ip.split(".");
  if (p.length !== 4) return false;
  for (var i = 0; i < 4; i++) {
    if (!/^\d{1,3}$/.test(p[i])) return false;
    var v = parseInt(p[i], 10);
    if (isNaN(v) || v < 0 || v > 255) return false;
  }
  return true;
}

function ipToLong(ip) {
  var p = ip.split(".");
  return (parseInt(p[0], 10) * 16777216) +
         (parseInt(p[1], 10) * 65536)    +
         (parseInt(p[2], 10) * 256)      +
          parseInt(p[3], 10);
}

function matchIPv4Prefix(ip, base, prefixLen) {
  if (!isIPv4(ip) || !isIPv4(base)) return false;
  var size  = Math.pow(2, 32 - prefixLen);
  var start = Math.floor(ipToLong(base) / size) * size;
  var end   = start + size;
  var val   = ipToLong(ip);
  return (val >= start && val < end);
}

function getNet(ip, cidr) {
  var p = ip.split(".");
  var parts = Math.min(4, Math.ceil(cidr / 8));
  return p.slice(0, parts).join(".");
}

// ================= SUBNET MANAGEMENT =================
function getFilteredSubnets() {
  var list = CONFIG.subnets.filter(function(s) {
    if (CONFIG.blacklist.enabled && s.blacklisted) return false;
    if (CONFIG.blacklist.enabled && CONFIG.blacklist.subnets.indexOf(s.base + "/" + s.len) !== -1) return false;
    if (CONFIG.whitelist.enabled && CONFIG.whitelist.subnets.length > 0) {
      if (CONFIG.whitelist.subnets.indexOf(s.base + "/" + s.len) === -1) return false;
    }
    // GeoIP: تجنب التاجات غير المرغوبة
    if (CONFIG.geoip.avoidTags) {
      for (var i = 0; i < CONFIG.geoip.avoidTags.length; i++) {
        if (s.tags.indexOf(CONFIG.geoip.avoidTags[i]) !== -1) return false;
      }
    }
    // تفضيل تييرات معينة
    if (CONFIG.geoip.preferTier && CONFIG.geoip.preferTier.length > 0) {
      if (CONFIG.geoip.preferTier.indexOf(s.tier) === -1) return false;
    }
    return true;
  });

  // ترتيب حسب التير (الأفضل أولاً) ثم حجم النطاق (الأصغر أولاً = أكثر دقة)
  list.sort(function(a, b) {
    if (a.tier !== b.tier) return a.tier - b.tier;
    return a.len - b.len; // /24 قبل /17
  });

  return list;
}

var FILTERED_SUBNETS = null;
function getSubnetList() {
  if (!FILTERED_SUBNETS) {
    FILTERED_SUBNETS = getFilteredSubnets();
    log("info", "Filtered subnets: " + FILTERED_SUBNETS.length + " / " + CONFIG.subnets.length);
  }
  return FILTERED_SUBNETS;
}

function invalidateSubnetCache() {
  FILTERED_SUBNETS = null;
}

// ================= ROTATION LOGIC =================
function getActiveSubnet() {
  var list = getSubnetList();
  if (list.length === 0) {
    log("error", "No valid subnets available!");
    return CONFIG.subnets[0];
  }

  var now = new Date().getTime();

  if (ROTATION.startTime === 0) {
    ROTATION.startTime = now;
    log("info", "Rotation started at index 0: " + list[0].base + "/" + list[0].len);
  }

  var elapsed = now - ROTATION.startTime;

  if (elapsed >= ROTATION.duration) {
    var jumps = Math.floor(elapsed / ROTATION.duration);
    var oldIndex = ROTATION.index;
    ROTATION.index = (ROTATION.index + jumps) % list.length;
    ROTATION.startTime = ROTATION.startTime + jumps * ROTATION.duration;

    if (oldIndex !== ROTATION.index) {
      var subnet = list[ROTATION.index];
      log("info", "Rotation: " + oldIndex + " -> " + ROTATION.index + " (" + subnet.base + "/" + subnet.len + " " + subnet.isp + ")");
      // إعادة تعيين الفايلوفر عند تغيير النطاق
      FAILOVER.currentProxyIndex = 0;
      FAILOVER.retries = 0;
      FAILOVER.proxyChain = null;
    }
  }

  return list[ROTATION.index];
}

function isIPInActiveSubnet(ip) {
  var subnet = getActiveSubnet();
  return matchIPv4Prefix(ip, subnet.base, subnet.len);
}

function isIPInAnySubnet(ip) {
  var list = getSubnetList();
  for (var i = 0; i < list.length; i++) {
    if (matchIPv4Prefix(ip, list[i].base, list[i].len)) return true;
  }
  return false;
}

// ================= HEALTH SCORING FRAMEWORK =================
// ملاحظة: PAC لا يستطيع عمل ping حقيقي. هذا إطار للعمل مع أداة خارجية
// تستدعي setHealthScore(subnetIndex, score) من JavaScript المضيف

function setHealthScore(subnetIndex, score) {
  var list = getSubnetList();
  if (subnetIndex >= 0 && subnetIndex < list.length) {
    ROTATION.healthScores[subnetIndex] = score;
    log("debug", "Health score for subnet " + subnetIndex + " (" + list[subnetIndex].base + "): " + score);
  }
}

function getHealthScore(subnetIndex) {
  return ROTATION.healthScores[subnetIndex] !== undefined ? ROTATION.healthScores[subnetIndex] : 100;
}

function markSubnetFailed(subnetIndex) {
  var now = new Date().getTime();
  ROTATION.failedSubnets[subnetIndex] = now;
  log("warn", "Subnet " + subnetIndex + " marked as failed");
}

function isSubnetHealthy(subnetIndex) {
  var failTime = ROTATION.failedSubnets[subnetIndex];
  if (!failTime) return true;
  // اعتبار النطاق فاشل لمدة 5 دقائق
  return (new Date().getTime() - failTime) > 300000;
}

// ================= PROXY FAILOVER =================
function buildProxyChain() {
  var main = CONFIG.proxies.main;
  var fallback = CONFIG.proxies.fallback;
  var chain = [main].concat(fallback);
  FAILOVER.proxyChain = chain;
  FAILOVER.currentProxyIndex = 0;
  return chain.join("; ");
}

function getCurrentProxy() {
  if (!FAILOVER.proxyChain) {
    buildProxyChain();
  }
  var idx = FAILOVER.currentProxyIndex;
  if (idx >= FAILOVER.proxyChain.length) idx = FAILOVER.proxyChain.length - 1;
  return FAILOVER.proxyChain[idx];
}

function getFullProxyChain() {
  if (!FAILOVER.proxyChain) {
    buildProxyChain();
  }
  return FAILOVER.proxyChain.join("; ");
}

function triggerFailover(reason) {
  if (!CONFIG.failover.enabled) return false;

  var now = new Date().getTime();
  if (now - FAILOVER.lastFailTime < CONFIG.failover.retryDelayMs) {
    log("debug", "Failover throttled");
    return false;
  }

  if (FAILOVER.currentProxyIndex < FAILOVER.proxyChain.length - 1) {
    FAILOVER.currentProxyIndex++;
    FAILOVER.retries++;
    FAILOVER.lastFailTime = now;
    log("warn", "Failover to proxy index " + FAILOVER.currentProxyIndex + " (" + reason + ")");
    return true;
  }

  log("error", "All proxies exhausted");
  return false;
}

function resetFailover() {
  FAILOVER.currentProxyIndex = 0;
  FAILOVER.retries = 0;
  FAILOVER.lastFailTime = 0;
}

// ================= PUBG DETECTION =================
function isPUBG(host) {
  host = host.toLowerCase();
  var keywords = [
    "pubg", "tencent", "krafton", "levelinfinite",
    "lightspeed", "proximabeta", "igamecube"
  ];
  for (var i = 0; i < keywords.length; i++) {
    if (host.indexOf(keywords[i]) !== -1) return true;
  }
  return false;
}

function isLobby(data) {
  var patterns = [
    "lobby", "login", "auth", "session", "gateway", "queue",
    "profile", "inventory", "store", "shop", "event", "mission",
    "friends", "party", "team", "settings", "patch", "update",
    "cdn", "download", "config", "version", "announce", "notice"
  ];
  data = data.toLowerCase();
  for (var i = 0; i < patterns.length; i++) {
    if (data.indexOf(patterns[i]) !== -1) return true;
  }
  return false;
}

function isMatch(data) {
  var patterns = [
    "match", "battle", "classic", "ranked", "arena", "tdm",
    "royale", "war", "payload", "metro", "zombie", "gamesvr",
    "relay", "combat", "survival", "spectate", "replay",
    "stats", "leaderboard", "season", "tournament"
  ];
  data = data.toLowerCase();
  for (var i = 0; i < patterns.length; i++) {
    if (data.indexOf(patterns[i]) !== -1) return true;
  }
  return false;
}

// ================= SESSION MANAGEMENT =================
function enforceSessionLock(ip, data) {
  var lobby = isLobby(data);
  var match = isMatch(data);
  var netLobby = getNet(ip, CONFIG.session.lobbyLockCIDR);
  var netMatch = getNet(ip, CONFIG.session.matchLockCIDR);

  // إعادة ضبط عند انتهاء الماتش
  if (!match && SESSION.active) {
    log("info", "Match ended, resetting session");
    SESSION.match = null;
    SESSION.active = false;
    SESSION.matchChanges = 0;
    SESSION.lastMatchNet = null;
  }

  // ===== LOBBY LOCK (/16) =====
  if (lobby) {
    if (!SESSION.lobby) {
      SESSION.lobby = netLobby;
      SESSION.lastLobbyNet = netLobby;
      log("info", "Lobby locked to /" + CONFIG.session.lobbyLockCIDR + ": " + SESSION.lobby);
    } else if (netLobby !== SESSION.lobby) {
      SESSION.lobbyChanges++;
      log("warn", "Lobby network change detected: " + SESSION.lobby + " -> " + netLobby + " (changes: " + SESSION.lobbyChanges + ")");

      if (SESSION.lobbyChanges > CONFIG.session.maxLobbyChanges) {
        log("error", "Max lobby changes exceeded, blocking");
        return BLOCK;
      }
      // تحديث اللوك للنطاق الجديد (مع تسجيل)
      SESSION.lastLobbyNet = SESSION.lobby;
      SESSION.lobby = netLobby;
    }
    return null; // استمرار
  }

  // ===== MATCH LOCK (/24) =====
  if (match) {
    if (!SESSION.match) {
      SESSION.match = netMatch;
      SESSION.lastMatchNet = netMatch;
      SESSION.active = true;
      log("info", "Match locked to /" + CONFIG.session.matchLockCIDR + ": " + SESSION.match);
    } else if (netMatch !== SESSION.match) {
      SESSION.matchChanges++;
      log("warn", "Match network change detected: " + SESSION.match + " -> " + netMatch + " (changes: " + SESSION.matchChanges + ")");

      if (SESSION.matchChanges > CONFIG.session.maxMatchChanges) {
        log("error", "Max match changes exceeded, blocking");
        return BLOCK;
      }
      // للماتش: صارم جداً - لا نحدث اللوك، نحظر فقط
      return BLOCK;
    }
    return null; // استمرار
  }

  return null;
}

// ================= MAIN ENGINE =================
function FindProxyForURL(url, host) {
  // 1. نطاقات محلية
  if (isPlainHostName(host)) {
    log("debug", "Local host: " + host + " -> DIRECT");
    return DIRECT;
  }

  // 2. فقط PUBG
  if (!isPUBG(host)) {
    log("debug", "Non-PUBG host: " + host + " -> DIRECT");
    return DIRECT;
  }

  // 3. حل DNS
  var ip = dnsResolve(host);
  if (!ip) {
    log("warn", "DNS resolve failed for: " + host + " -> Full proxy chain");
    return getFullProxyChain();
  }

  log("debug", "Resolved " + host + " -> " + ip);

  // 4. فلترة IPv4
  if (!isIPv4(ip)) {
    log("warn", "Non-IPv4 address: " + ip + " -> BLOCK");
    return BLOCK;
  }

  // 5. تحقق القائمة السوداء للعناوين
  if (CONFIG.blacklist.enabled && CONFIG.blacklist.ips.indexOf(ip) !== -1) {
    log("warn", "IP blacklisted: " + ip + " -> BLOCK");
    return BLOCK;
  }

  // 6. تحقق النطاق النشط
  if (!isIPInActiveSubnet(ip)) {
    var active = getActiveSubnet();
    log("warn", "IP " + ip + " not in active subnet (" + active.base + "/" + active.len + ") -> BLOCK");
    return BLOCK;
  }

  // 7. تحقق أي نطاق مسموح
  if (!isIPInAnySubnet(ip)) {
    log("warn", "IP " + ip + " not in any allowed subnet -> BLOCK");
    return BLOCK;
  }

  // 8. إدارة الجلسة (لوك اللوبي/الماتش)
  var data = host + " " + url;
  var sessionResult = enforceSessionLock(ip, data);
  if (sessionResult === BLOCK) {
    return BLOCK;
  }

  // 9. إرجاع سلسلة البروكسي
  var proxy = getFullProxyChain();
  log("debug", host + " (" + ip + ") -> PROXY");
  return proxy;
}

// ================= EXPORTED API (للأدوات الخارجية) =================
// هذه الدوال يمكن استدعاؤها من JavaScript المضيف (HTTP Injector, SSTap, إلخ)

function __PUBG_PAC__getActiveSubnet() {
  return getActiveSubnet();
}

function __PUBG_PAC__getRotationState() {
  return {
    index: ROTATION.index,
    subnet: getActiveSubnet(),
    elapsed: new Date().getTime() - ROTATION.startTime,
    duration: ROTATION.duration
  };
}

function __PUBG_PAC__getSessionState() {
  return {
    lobby: SESSION.lobby,
    match: SESSION.match,
    active: SESSION.active,
    lobbyChanges: SESSION.lobbyChanges,
    matchChanges: SESSION.matchChanges
  };
}

function __PUBG_PAC__getProxyState() {
  return {
    currentIndex: FAILOVER.currentProxyIndex,
    chain: FAILOVER.proxyChain,
    retries: FAILOVER.retries
  };
}

function __PUBG_PAC__getLogs() {
  return getLogs();
}

function __PUBG_PAC__setHealthScore(idx, score) {
  setHealthScore(idx, score);
}

function __PUBG_PAC__blacklistSubnet(base, len) {
  var key = base + "/" + len;
  if (CONFIG.blacklist.subnets.indexOf(key) === -1) {
    CONFIG.blacklist.subnets.push(key);
    invalidateSubnetCache();
    log("info", "Blacklisted subnet: " + key);
  }
}

function __PUBG_PAC__whitelistSubnet(base, len) {
  var key = base + "/" + len;
  if (CONFIG.whitelist.subnets.indexOf(key) === -1) {
    CONFIG.whitelist.subnets.push(key);
    invalidateSubnetCache();
    log("info", "Whitelisted subnet: " + key);
  }
}

function __PUBG_PAC__resetSession() {
  SESSION.lobby = null;
  SESSION.match = null;
  SESSION.active = false;
  SESSION.lobbyChanges = 0;
  SESSION.matchChanges = 0;
  SESSION.lastLobbyNet = null;
  SESSION.lastMatchNet = null;
  log("info", "Session manually reset");
}

function __PUBG_PAC__forceRotation(nextIndex) {
  var list = getSubnetList();
  if (nextIndex >= 0 && nextIndex < list.length) {
    ROTATION.index = nextIndex;
    ROTATION.startTime = new Date().getTime();
    FAILOVER.currentProxyIndex = 0;
    FAILOVER.retries = 0;
    log("info", "Forced rotation to index " + nextIndex);
  }
}
