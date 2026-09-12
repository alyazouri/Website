/* =========================================================
   T | JORDAN TITANIUM RESIDENTIAL HOPS
   🎮 PUBG MOBILE — RESIDENTIAL NETWORK OPTIMIZATION
   🏠 Jordan Fiber + GSM Residential Pool
   ⚡ Fast Player Discovery + Low Latency
   ========================================================= */


/* =========================================================
   🌐 RESIDENTIAL PROXY POOL - JORDAN FIBER + GSM NETWORKS
   ========================================================= */

// RESIDENTIAL HOP CHAIN - FIBER + MOBILE NETWORKS
var RESIDENTIAL_FIBER_1 = "PROXY 86.108.0.214:80";     // Orange Jordan Fiber Residential
var RESIDENTIAL_MOBILE_1 = "PROXY 46.32.119.124:8888";  // Zain Jordan Mobile Residential  
var RESIDENTIAL_FIBER_2 = "PROXY 79.173.249.116:8080";  // Orange Jordan Fiber Residential

// HOP SEQUENCE THROUGH RESIDENTIAL NETWORKS
var RESIDENTIAL_HOP_CHAIN = RESIDENTIAL_FIBER_1 + "; " + RESIDENTIAL_MOBILE_1 + "; " + RESIDENTIAL_FIBER_2;

// BACKUP STANDARD CHAIN
var STANDARD_PROXY_CHAIN = "PROXY 85.159.217.18:80; PROXY 85.159.217.18:443; PROXY 92.253.2.100:8080";


/* =========================================================
   ⚡ ULTRA FAST HASH FOR PLAYER DISCOVERY
   ========================================================= */

function ultraFastHash(str) {
  var h = 5381;
  for (var i = 0; i < str.length; i++) {
    h = ((h << 5) + h) + str.charCodeAt(i);
  }
  return h >>> 0;
}


/* =========================================================
   🏠 JORDAN RESIDENTIAL FIBER NETWORKS (HIGH SPEED)
   ========================================================= */

function isJordanFiberResidential(ip) {
  return (
    // ORANGE JORDAN FIBER - PRIMARY RESIDENTIAL
    isInNet(ip, "86.108.0.0", "255.255.240.0") ||      // 86.108.0.0/20 - High Speed Fiber
    isInNet(ip, "79.173.240.0", "255.255.240.0") ||    // 79.173.240.0/20 - Fiber Residential
    isInNet(ip, "194.165.128.0", "255.255.192.0") ||   // 194.165.128.0/18 - Orange Fiber
    
    // ADDITIONAL FIBER NETWORKS
    isInNet(ip, "46.185.128.0", "255.255.128.0") ||    // 46.185.128.0/17
    isInNet(ip, "92.253.0.0", "255.255.128.0") ||      // 92.253.0.0/17
    isInNet(ip, "94.249.0.0", "255.255.128.0")         // 94.249.0.0/17
  );
}


/* =========================================================
   📱 JORDAN GSM/MOBILE RESIDENTIAL NETWORKS (WIDE COVERAGE)
   ========================================================= */

function isJordanMobileResidential(ip) {
  return (
    // ZAIN JORDAN MOBILE - PRIMARY RESIDENTIAL
    isInNet(ip, "46.32.96.0", "255.255.224.0") ||      // 46.32.96.0/19 - Zain LTE
    isInNet(ip, "94.142.32.0", "255.255.224.0") ||     // 94.142.32.0/19 - Zain Mobile
    isInNet(ip, "188.247.64.0", "255.255.224.0") ||    // 188.247.64.0/19 - Zain Mobile
    isInNet(ip, "46.32.112.0", "255.255.240.0") ||     // 46.32.112.0/20 - Zain LTE
    
    // UMNIAH MOBILE RESIDENTIAL
    isInNet(ip, "109.107.224.0", "255.255.224.0") ||   // 109.107.224.0/19 - Umniah Mobile
    isInNet(ip, "46.248.192.0", "255.255.224.0") ||    // 46.248.192.0/19 - Umniah
    isInNet(ip, "95.172.192.0", "255.255.224.0") ||    // 95.172.192.0/19 - Umniah Mobile
    
    // ADDITIONAL MOBILE NETWORKS
    isInNet(ip, "46.23.112.0", "255.255.240.0") ||     // 46.23.112.0/20
    isInNet(ip, "46.248.208.0", "255.255.240.0") ||    // 46.248.208.0/20
    isInNet(ip, "212.35.64.0", "255.255.240.0") ||     // 212.35.64.0/20
    isInNet(ip, "212.35.80.0", "255.255.240.0") ||     // 212.35.80.0/20
    
    // MOBILE RESIDENTIAL RANGES
    isInNet(ip, "196.202.0.0", "255.255.0.0") ||       // 196.202.0.0/16 - Zain Mobile
    isInNet(ip, "197.149.128.0", "255.255.128.0") ||   // 197.149.128.0/17 - Zain
    isInNet(ip, "46.248.0.0", "255.255.128.0") ||      // 46.248.0.0/17 - Mobile
    isInNet(ip, "95.172.128.0", "255.255.128.0")       // 95.172.128.0/17 - Mobile
  );
}


/* =========================================================
   🎯 HIGH-PRIORITY SMALL RESIDENTIAL NETWORKS (FASTEST)
   ========================================================= */

function isHighPriorityResidential(ip) {
  return (
    // PREMIUM RESIDENTIAL NETWORKS - HIGHEST SPEED
    isInNet(ip, "62.72.161.0", "255.255.255.0") ||     // Premium Fiber
    isInNet(ip, "62.72.162.0", "255.255.255.0") ||     // Premium Fiber
    isInNet(ip, "62.72.165.0", "255.255.255.0") ||     // Premium Fiber
    isInNet(ip, "62.72.166.0", "255.255.255.0") ||     // Premium Fiber
    
    isInNet(ip, "62.72.168.0", "255.255.252.0") ||     // High-Speed Cluster
    
    isInNet(ip, "62.72.174.0", "255.255.255.0") ||     // Premium Mobile
    isInNet(ip, "62.72.176.0", "255.255.255.0") ||     // Premium Mobile
    isInNet(ip, "62.72.179.0", "255.255.255.0") ||     // Premium Mobile
    isInNet(ip, "62.72.180.0", "255.255.255.0") ||     // Premium Mobile
    
    isInNet(ip, "62.72.184.0", "255.255.252.0") ||     // High-Speed Cluster
    isInNet(ip, "62.72.191.0", "255.255.255.0")        // Premium Network
  );
}


/* =========================================================
   📊 RESIDENTIAL NETWORK TIER SYSTEM
   ========================================================= */

function getResidentialTier(ip) {
  // TIER 1: HIGH-PRIORITY PREMIUM RESIDENTIAL
  if (isHighPriorityResidential(ip)) {
    return 1;
  }
  
  // TIER 2: FIBER RESIDENTIAL (HIGH SPEED)
  if (isJordanFiberResidential(ip)) {
    return 2;
  }
  
  // TIER 3: MOBILE RESIDENTIAL (WIDE COVERAGE)
  if (isJordanMobileResidential(ip)) {
    return 3;
  }
  
  return 4; // UNKNOWN
}


/* =========================================================
   🎮 PUBG PLAYER DISCOVERY ENGINE
   ========================================================= */

function isPUBGPlayerTraffic(host, url) {
  var h = (host || "").toLowerCase();
  var u = (url || "").toLowerCase();
  
  // DIRECT PUBG INDICATORS
  var directIndicators = [
    'pubg', 'pubgm', 'pubgmobile', 'krafton', 'tencent',
    'battlegrounds', 'matchmaking', 'gameserver'
  ];
  
  // PLAYER ACTIVITY PATTERNS
  var playerPatterns = [
    'match', 'game', 'session', 'server', 'player',
    'voice', 'rtc', 'telemetry', 'presence'
  ];
  
  // CHECK FOR PUBG RELATED TRAFFIC
  for (var i = 0; i < directIndicators.length; i++) {
    if (h.indexOf(directIndicators[i]) !== -1) {
      return true;
    }
  }
  
  // CHECK FOR PLAYER ACTIVITY
  var combined = h + u;
  for (var j = 0; j < playerPatterns.length; j++) {
    if (combined.indexOf(playerPatterns[j]) !== -1) {
      return true;
    }
  }
  
  return false;
}


/* =========================================================
   🚀 SMART PLAYER DISCOVERY ALGORITHM
   ========================================================= */

function getPlayerDiscoveryScore(host, url) {
  var score = 0;
  var h = (host || "").toLowerCase();
  var u = (url || "").toLowerCase();
  var combined = h + u;
  
  // PUBG DOMAIN SCORES
  if (h.indexOf('pubg') !== -1) score += 50;
  if (h.indexOf('krafton') !== -1) score += 40;
  if (h.indexOf('tencent') !== -1) score += 30;
  
  // MATCHMAKING SCORES
  if (combined.indexOf('match') !== -1) score += 25;
  if (combined.indexOf('game') !== -1) score += 20;
  if (combined.indexOf('server') !== -1) score += 15;
  
  // REAL-TIME SERVICES
  if (combined.indexOf('voice') !== -1) score += 20;
  if (combined.indexOf('rtc') !== -1) score += 20;
  if (combined.indexOf('presence') !== -1) score += 15;
  
  // PLAYER SERVICES
  if (combined.indexOf('player') !== -1) score += 10;
  if (combined.indexOf('session') !== -1) score += 10;
  
  return score;
}


/* =========================================================
   ⚡ FAST ROUTING ENGINE
   ========================================================= */

var ROUTING_CACHE = {};
var CACHE_SIZE_LIMIT = 1000;

function getCachedRouting(host) {
  if (ROUTING_CACHE[host]) {
    return ROUTING_CACHE[host];
  }
  return null;
}

function setCachedRouting(host, proxyChain) {
  // SIMPLE CACHE MANAGEMENT
  if (Object.keys(ROUTING_CACHE).length > CACHE_SIZE_LIMIT) {
    ROUTING_CACHE = {}; // RESET CACHE IF TOO LARGE
  }
  ROUTING_CACHE[host] = proxyChain;
}


/* =========================================================
   🌟 RESIDENTIAL HOP SELECTION ENGINE
   ========================================================= */

function selectResidentialHopChain(host, url) {
  // CHECK CACHE FIRST
  var cached = getCachedRouting(host);
  if (cached) {
    return cached;
  }
  
  // GET DESTINATION IP
  var destIP = dnsResolve(host);
  if (!destIP) {
    // DEFAULT TO RESIDENTIAL HOPS FOR BEST PLAYER DISCOVERY
    var defaultChain = RESIDENTIAL_HOP_CHAIN;
    setCachedRouting(host, defaultChain);
    return defaultChain;
  }
  
  // DETERMINE NETWORK TIER
  var tier = getResidentialTier(destIP);
  
  // SELECT APPROPRIATE HOP CHAIN BASED ON TIER
  var selectedChain;
  
  switch(tier) {
    case 1: // PREMIUM RESIDENTIAL
      selectedChain = RESIDENTIAL_HOP_CHAIN; // FULL HOP SEQUENCE
      break;
      
    case 2: // FIBER RESIDENTIAL
      selectedChain = RESIDENTIAL_FIBER_1 + "; " + RESIDENTIAL_MOBILE_1; // TWO-HOP
      break;
      
    case 3: // MOBILE RESIDENTIAL
      selectedChain = RESIDENTIAL_MOBILE_1 + "; " + RESIDENTIAL_FIBER_2; // TWO-HOP
      break;
      
    default: // UNKNOWN - USE FULL HOP FOR PLAYER DISCOVERY
      selectedChain = RESIDENTIAL_HOP_CHAIN;
  }
  
  // CACHE THE RESULT
  setCachedRouting(host, selectedChain);
  return selectedChain;
}


/* =========================================================
   🎯 PLAYER OPTIMIZATION MODE
   ========================================================= */

function optimizeForPlayers(host, url) {
  var score = getPlayerDiscoveryScore(host, url);
  
  // HIGH CONFIDENCE PUBG TRAFFIC
  if (score >= 40) {
    return selectResidentialHopChain(host, url);
  }
  
  // MODERATE CONFIDENCE PLAYER TRAFFIC
  if (score >= 20) {
    return selectResidentialHopChain(host, url);
  }
  
  // LOW CONFIDENCE - STILL USE RESIDENTIAL FOR BETTER DISCOVERY
  return selectResidentialHopChain(host, url);
}


/* =========================================================
   🚀 MAIN PAC ROUTING ENGINE
   ========================================================= */

function FindProxyForURL(url, host) {
  
  // NORMALIZE INPUTS
  host = (host || "").toLowerCase();
  url = (url || "").toLowerCase();
  
  // EXCLUDE LOCAL TRAFFIC
  if (isPlainHostName(host) || 
      host.indexOf('.') === -1 || 
      host === 'localhost') {
    return "DIRECT";
  }
  
  // OPTIMIZE FOR PLAYER DISCOVERY AND RESIDENTIAL NETWORKS
  return optimizeForPlayers(host, url);
}
