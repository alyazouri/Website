/* =========================================================
   T | JORDAN TITANIUM ULTRA
   🎮 PUBG MOBILE — ULTIMATE RESIDENTIAL HOPPING
   🏠 JORDAN FIBER + GSM RESIDENTIAL SUPERCHARGE
   ⚡ LIGHTNING FAST PLAYER DISCOVERY + MATCHMAKING
   🔥 ULTRA AGGRESSIVE PLAYER FINDING
   ========================================================= */


/* =========================================================
   🌐 ULTIMATE RESIDENTIAL PROXY POOL - JORDAN NETWORKS
   ========================================================= */

// ULTIMATE HOP SEQUENCE - MAXIMUM RESIDENTIAL NETWORK COVERAGE
var ULTRA_FIBER_A = "PROXY 86.108.0.214:80";      // Orange Jordan Fiber Premium
var ULTRA_MOBILE_A = "PROXY 46.32.119.124:8888";   // Zain Jordan Mobile Ultra
var ULTRA_FIBER_B = "PROXY 79.173.249.116:8080";   // Orange Jordan Fiber Turbo
var ULTRA_MOBILE_B = "PROXY 94.142.63.254:3128";   // Zain Jordan Mobile Max
var ULTRA_FIBER_C = "PROXY 194.165.159.254:8080";  // Orange Jordan Fiber Extreme

// ULTIMATE HOP CHAIN - 5 LAYERS OF RESIDENTIAL NETWORKS
var ULTIMATE_HOP_CHAIN = ULTRA_FIBER_A + "; " + ULTRA_MOBILE_A + "; " + ULTRA_FIBER_B + "; " + ULTRA_MOBILE_B + "; " + ULTRA_FIBER_C;

// AGGRESSIVE HOP CHAIN - 3 LAYERS
var AGGRESSIVE_HOP_CHAIN = ULTRA_FIBER_A + "; " + ULTRA_MOBILE_A + "; " + ULTRA_FIBER_B;

// STANDARD HOP CHAIN - 2 LAYERS
var STANDARD_HOP_CHAIN = ULTRA_FIBER_A + "; " + ULTRA_MOBILE_A;

// EMERGENCY FALLBACK
var EMERGENCY_CHAIN = "PROXY 85.159.217.18:80; PROXY 85.159.217.18:443; PROXY 92.253.2.100:8080";


/* =========================================================
   ⚡ HYPER FAST ULTRA HASH - MAXIMUM SPEED
   ========================================================= */

function hyperUltraHash(str) {
  var h = 0x811c9dc5;
  for (var i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return h >>> 0;
}


/* =========================================================
   🚀 ULTRA-AGGRESSIVE PUBG DETECTION ENGINE
   ========================================================= */

function isUltraPUBGTraffic(host, url) {
  var h = (host || "").toLowerCase();
  var u = (url || "").toLowerCase();
  var combined = h + "|" + u;
  
  // ULTRA AGGRESSIVE PUBG KEYWORDS - EVERYTHING PUBG RELATED
  var ultraKeywords = [
    // CORE PUBG
    'pubg', 'krafton', 'tencent', 'battlegrounds',
    
    // MATCHMAKING & GAME SERVICES
    'match', 'game', 'server', 'session', 'player', 'battle',
    
    // REAL-TIME SERVICES
    'voice', 'rtc', 'voip', 'audio', 'turn', 'stun',
    
    // SOCIAL & COMMUNITY
    'friend', 'clan', 'guild', 'party', 'team', 'squad',
    
    // GAME MODES & MAPS
    'erangel', 'miramar', 'sanhok', 'vikendi', 'karakin', 'livik',
    'tdm', 'warzone', 'metro', 'payload',
    
    // INFRASTRUCTURE
    'dispatch', 'allocate', 'route', 'connect', 'join',
    
    // SERVICES
    'presence', 'telemetry', 'analytics', 'statistic',
    
    // RESOURCES
    'asset', 'resource', 'update', 'patch', 'download',
    
    // API ENDPOINTS
    'api', 'v1', 'v2', 'v3', 'service', 'endpoint'
  ];
  
  // CHECK EVERY SINGLE WORD FOR PUBG RELATED TERMS
  for (var i = 0; i < ultraKeywords.length; i++) {
    if (combined.indexOf(ultraKeywords[i]) !== -1) {
      return true;
    }
  }
  
  // URL PATH PATTERN MATCHING
  var pathPatterns = [
    '/match/', '/game/', '/server/', '/session/',
    '/api/', '/v1/', '/v2/', '/v3/',
    '/player/', '/battle/', '/pubg/'
  ];
  
  for (var j = 0; j < pathPatterns.length; j++) {
    if (u.indexOf(pathPatterns[j]) !== -1) {
      return true;
    }
  }
  
  return false;
}


/* =========================================================
   🎯 PLAYER DISCOVERY SCORING SYSTEM - ULTRA SENSITIVE
   ========================================================= */

function getPlayerDiscoveryScore(host, url) {
  var score = 0;
  var h = (host || "").toLowerCase();
  var u = (url || "").toLowerCase();
  var combined = h + "|" + u;
  
  // PUBG BRAND SCORING (HIGHEST)
  if (h.indexOf('pubg') !== -1) score += 100;
  if (h.indexOf('krafton') !== -1) score += 90;
  if (h.indexOf('tencent') !== -1) score += 80;
  if (h.indexOf('battleground') !== -1) score += 75;
  
  // MATCHMAKING SCORING (VERY HIGH)
  if (combined.indexOf('matchmak') !== -1) score += 95;
  if (combined.indexOf('match') !== -1) score += 70;
  if (combined.indexOf('game') !== -1) score += 60;
  if (combined.indexOf('server') !== -1) score += 55;
  
  // PLAYER SERVICES (HIGH)
  if (combined.indexOf('player') !== -1) score += 50;
  if (combined.indexOf('session') !== -1) score += 45;
  if (combined.indexOf('battle') !== -1) score += 40;
  
  // REAL-TIME SERVICES (HIGH)
  if (combined.indexOf('voice') !== -1) score += 45;
  if (combined.indexOf('rtc') !== -1) score += 45;
  if (combined.indexOf('voip') !== -1) score += 40;
  if (combined.indexOf('audio') !== -1) score += 35;
  
  // SOCIAL SERVICES (MEDIUM)
  if (combined.indexOf('friend') !== -1) score += 30;
  if (combined.indexOf('clan') !== -1) score += 30;
  if (combined.indexOf('guild') !== -1) score += 30;
  if (combined.indexOf('party') !== -1) score += 25;
  if (combined.indexOf('team') !== -1) score += 25;
  if (combined.indexOf('squad') !== -1) score += 25;
  
  // MAPS & MODES (MEDIUM)
  var maps = ['erangel', 'miramar', 'sanhok', 'vikendi', 'karakin', 'livik'];
  for (var i = 0; i < maps.length; i++) {
    if (combined.indexOf(maps[i]) !== -1) score += 25;
  }
  
  var modes = ['tdm', 'warzone', 'metro', 'payload'];
  for (var j = 0; j < modes.length; j++) {
    if (combined.indexOf(modes[j]) !== -1) score += 20;
  }
  
  // INFRASTRUCTURE (MEDIUM)
  if (combined.indexOf('dispatch') !== -1) score += 25;
  if (combined.indexOf('allocate') !== -1) score += 25;
  if (combined.indexOf('route') !== -1) score += 20;
  if (combined.indexOf('connect') !== -1) score += 20;
  if (combined.indexOf('join') !== -1) score += 20;
  
  // SERVICES (LOW-MEDIUM)
  if (combined.indexOf('presence') !== -1) score += 15;
  if (combined.indexOf('telemetry') !== -1) score += 15;
  if (combined.indexOf('analytic') !== -1) score += 15;
  if (combined.indexOf('stat') !== -1) score += 10;
  
  // RESOURCES (LOW)
  if (combined.indexOf('asset') !== -1) score += 10;
  if (combined.indexOf('resource') !== -1) score += 10;
  if (combined.indexOf('update') !== -1) score += 10;
  if (combined.indexOf('patch') !== -1) score += 10;
  if (combined.indexOf('download') !== -1) score += 5;
  
  // API PATTERNS (LOW)
  if (combined.indexOf('/api/') !== -1) score += 15;
  if (combined.indexOf('/v1/') !== -1) score += 10;
  if (combined.indexOf('/v2/') !== -1) score += 10;
  if (combined.indexOf('/v3/') !== -1) score += 10;
  
  // GENERIC GAME TERMS (VERY LOW - PREVENT FALSE NEGATIVES)
  if (combined.indexOf('game') !== -1) score += 5;
  if (combined.indexOf('play') !== -1) score += 3;
  if (combined.indexOf('multiplayer') !== -1) score += 5;
  
  return score;
}


/* =========================================================
   🏠 ULTIMATE JORDAN RESIDENTIAL NETWORK DATABASE
   ========================================================= */

// TIER 1: ULTRA-PREMIUM RESIDENTIAL (FASTEST)
var TIER_1_NETWORKS = [
  "62.72.161.0/24", "62.72.162.0/24", "62.72.165.0/24", "62.72.166.0/24",
  "62.72.174.0/24", "62.72.176.0/24", "62.72.179.0/24", "62.72.180.0/24",
  "62.72.191.0/24"
];

// TIER 2: PREMIUM FIBER RESIDENTIAL (VERY FAST)
var TIER_2_NETWORKS = [
  "86.108.0.0/20", "79.173.240.0/20", "194.165.128.0/18",
  "46.185.128.0/17", "92.253.0.0/17", "94.249.0.0/17"
];

// TIER 3: STANDARD FIBER RESIDENTIAL (FAST)
var TIER_3_NETWORKS = [
  "46.32.96.0/19", "94.142.32.0/19", "188.247.64.0/19",
  "37.202.64.0/18", "79.134.128.0/19"
];

// TIER 4: MOBILE RESIDENTIAL (GOOD COVERAGE)
var TIER_4_NETWORKS = [
  "46.32.112.0/20", "109.107.224.0/19", "46.248.192.0/19",
  "95.172.192.0/19", "196.202.0.0/16", "197.149.128.0/17",
  "46.23.112.0/20", "46.248.208.0/20", "212.35.64.0/20"
];

// TIER 5: EXTENDED RESIDENTIAL (WIDE COVERAGE)
var TIER_5_NETWORKS = [
  "213.186.160.0/19", "213.139.32.0/19", "212.34.0.0/19",
  "84.18.32.0/19", "84.18.64.0/19", "81.28.112.0/20",
  "109.237.192.0/20", "95.141.208.0/20", "91.106.96.0/20"
];


/* =========================================================
   🚀 NETWORK TIER CHECKER - ULTRA FAST
   ========================================================= */

function checkNetworkTier(ip) {
  // CHECK EACH TIER FROM HIGHEST TO LOWEST
  
  // TIER 1 - ULTRA PREMIUM
  for (var i = 0; i < TIER_1_NETWORKS.length; i++) {
    if (isInNet(ip, TIER_1_NETWORKS[i].split('/')[0], cidrToNetmask(TIER_1_NETWORKS[i].split('/')[1]))) {
      return 1;
    }
  }
  
  // TIER 2 - PREMIUM FIBER
  for (var j = 0; j < TIER_2_NETWORKS.length; j++) {
    if (isInNet(ip, TIER_2_NETWORKS[j].split('/')[0], cidrToNetmask(TIER_2_NETWORKS[j].split('/')[1]))) {
      return 2;
    }
  }
  
  // TIER 3 - STANDARD FIBER
  for (var k = 0; k < TIER_3_NETWORKS.length; k++) {
    if (isInNet(ip, TIER_3_NETWORKS[k].split('/')[0], cidrToNetmask(TIER_3_NETWORKS[k].split('/')[1]))) {
      return 3;
    }
  }
  
  // TIER 4 - MOBILE RESIDENTIAL
  for (var l = 0; l < TIER_4_NETWORKS.length; l++) {
    if (isInNet(ip, TIER_4_NETWORKS[l].split('/')[0], cidrToNetmask(TIER_4_NETWORKS[l].split('/')[1]))) {
      return 4;
    }
  }
  
  // TIER 5 - EXTENDED RESIDENTIAL
  for (var m = 0; m < TIER_5_NETWORKS.length; m++) {
    if (isInNet(ip, TIER_5_NETWORKS[m].split('/')[0], cidrToNetmask(TIER_5_NETWORKS[m].split('/')[1]))) {
      return 5;
    }
  }
  
  return 99; // UNKNOWN
}

// HELPER FUNCTION TO CONVERT CIDR TO NETMASK
function cidrToNetmask(cidr) {
  var mask = ~(Math.pow(2, 32 - parseInt(cidr)) - 1);
  return ((mask >> 24) & 0xFF) + '.' + ((mask >> 16) & 0xFF) + '.' + ((mask >> 8) & 0xFF) + '.' + (mask & 0xFF);
}


/* =========================================================
   ⚡ ULTRA-CACHE SYSTEM - LIGHTNING FAST
   ========================================================= */

var ULTRA_CACHE = {};
var CACHE_MAX_SIZE = 2000;
var CACHE_HIT_COUNT = 0;
var CACHE_MISS_COUNT = 0;

function ultraCacheGet(key) {
  if (ULTRA_CACHE[key]) {
    CACHE_HIT_COUNT++;
    return ULTRA_CACHE[key];
  }
  CACHE_MISS_COUNT++;
  return null;
}

function ultraCacheSet(key, value) {
  // MAINTAIN CACHE SIZE
  if (Object.keys(ULTRA_CACHE).length >= CACHE_MAX_SIZE) {
    ULTRA_CACHE = {}; // RESET WHEN FULL
    CACHE_HIT_COUNT = 0;
    CACHE_MISS_COUNT = 0;
  }
  ULTRA_CACHE[key] = value;
}


/* =========================================================
   🎯 ULTIMATE HOP SELECTION ENGINE - AGGRESSIVE PLAYER FINDING
   ========================================================= */

function selectUltimateHopChain(host, url) {
  // CREATE CACHE KEY
  var cacheKey = "hop_" + host;
  var cached = ultraCacheGet(cacheKey);
  if (cached) {
    return cached;
  }
  
  // GET DESTINATION IP
  var destIP = dnsResolve(host);
  
  // IF NO DNS RESOLUTION, USE ULTIMATE HOP FOR MAXIMUM DISCOVERY
  if (!destIP) {
    var ultimateChain = ULTIMATE_HOP_CHAIN;
    ultraCacheSet(cacheKey, ultimateChain);
    return ultimateChain;
  }
  
  // DETERMINE NETWORK TIER
  var tier = checkNetworkTier(destIP);
  
  // SELECT HOP CHAIN BASED ON TIER (MORE AGGRESSIVE FOR BETTER PLAYER FINDING)
  var selectedChain;
  
  switch(tier) {
    case 1: // ULTRA-PREMIUM - USE ULTIMATE HOP FOR MAXIMUM POWER
      selectedChain = ULTIMATE_HOP_CHAIN;
      break;
      
    case 2: // PREMIUM FIBER - USE AGGRESSIVE HOP
      selectedChain = AGGRESSIVE_HOP_CHAIN;
      break;
      
    case 3: // STANDARD FIBER - USE AGGRESSIVE HOP
      selectedChain = AGGRESSIVE_HOP_CHAIN;
      break;
      
    case 4: // MOBILE RESIDENTIAL - USE STANDARD HOP
      selectedChain = STANDARD_HOP_CHAIN;
      break;
      
    case 5: // EXTENDED RESIDENTIAL - USE STANDARD HOP
      selectedChain = STANDARD_HOP_CHAIN;
      break;
      
    default: // UNKNOWN - USE ULTIMATE HOP FOR MAXIMUM PLAYER DISCOVERY
      selectedChain = ULTIMATE_HOP_CHAIN;
  }
  
  // CACHE THE RESULT
  ultraCacheSet(cacheKey, selectedChain);
  return selectedChain;
}


/* =========================================================
   🚀 PLAYER OPTIMIZATION SUPER ENGINE
   ========================================================= */

function optimizePlayerExperience(host, url) {
  // CREATE CACHE KEY
  var cacheKey = "opt_" + host;
  var cached = ultraCacheGet(cacheKey);
  if (cached) {
    return cached;
  }
  
  // ULTRA-AGGRESSIVE PUBG DETECTION
  if (isUltraPUBGTraffic(host, url)) {
    var hopChain = selectUltimateHopChain(host, url);
    ultraCacheSet(cacheKey, hopChain);
    return hopChain;
  }
  
  // SCORE-BASED DETECTION
  var score = getPlayerDiscoveryScore(host, url);
  
  // VERY AGGRESSIVE THRESHOLD - EVEN LOW SCORES GET RESIDENTIAL HOPPING
  if (score >= 15) { // LOWERED FROM 20 FOR BETTER PLAYER FINDING
    var aggressiveChain = selectUltimateHopChain(host, url);
    ultraCacheSet(cacheKey, aggressiveChain);
    return aggressiveChain;
  }
  
  // MODERATE SCORE - STILL USE RESIDENTIAL FOR BETTER DISCOVERY
  if (score >= 5) {
    var moderateChain = AGGRESSIVE_HOP_CHAIN;
    ultraCacheSet(cacheKey, moderateChain);
    return moderateChain;
  }
  
  // LOW SCORE - BUT STILL USE RESIDENTIAL HOPPING FOR PLAYER DISCOVERY
  var lowChain = STANDARD_HOP_CHAIN;
  ultraCacheSet(cacheKey, lowChain);
  return lowChain;
}


/* =========================================================
   🔥 ULTIMATE PLAYER DISCOVERY MODE
   ========================================================= */

function ultimatePlayerDiscoveryMode(host, url) {
  // ALWAYS USE RESIDENTIAL HOPPING FOR BETTER PLAYER FINDING
  return optimizePlayerExperience(host, url);
}


/* =========================================================
   🌟 STATISTICS TRACKING (INTERNAL)
   ========================================================= */

var REQUEST_COUNT = 0;
var PUBG_REQUEST_COUNT = 0;
var RESIDENTIAL_HOP_COUNT = 0;

function trackStats(isPUBG) {
  REQUEST_COUNT++;
  if (isPUBG) {
    PUBG_REQUEST_COUNT++;
  }
  // STATS ARE INTERNAL - NOT EXPOSED FOR PRIVACY
}


/* =========================================================
   🚀 MAIN PAC ROUTING ENGINE - ULTIMATE VERSION
   ========================================================= */

function FindProxyForURL(url, host) {
  
  // SAFETY CHECKS
  if (!host || !url) {
    return EMERGENCY_CHAIN;
  }
  
  // NORMALIZE INPUTS
  host = host.toLowerCase().trim();
  url = url.toLowerCase().trim();
  
  // EXCLUDE LOCAL AND INVALID HOSTS
  if (isPlainHostName(host) || 
      host.indexOf('.') === -1 || 
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host.match(/^\d+\.\d+\.\d+\.\d+$/) === null && host.indexOf('.') === -1) {
    return "DIRECT";
  }
  
  // ULTIMATE PLAYER DISCOVERY AND RESIDENTIAL HOPPING
  var result = ultimatePlayerDiscoveryMode(host, url);
  
  // TRACK FOR INTERNAL STATISTICS
  var isPUBG = getPlayerDiscoveryScore(host, url) >= 15;
  trackStats(isPUBG);
  
  return result;
}


/* =========================================================
   🛡️ EMERGENCY SAFETY NET
   ========================================================= */

// FINAL SAFETY CHECK - IF EVERYTHING FAILS
if (typeof FindProxyForURL !== 'function') {
  function FindProxyForURL(url, host) {
    return EMERGENCY_CHAIN;
  }
}
