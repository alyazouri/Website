// ============================================================
// PUBG MOBILE — JORDAN LOCK v9.0
// Ultra Low Ping / Dynamic Rotation
// Las + Infrastructure Detection
// ============================================================

var PROXY  = "PROXY 37.220.121.71:10010";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 0.0.0.0:0";

// ============================================================
// SESSION
// ============================================================
var SESSION = {
  matchNet:  null,
  matchHost: null,
  lobbyNet:  null
};

// ============================================================
// PRIORITY
// ============================================================
var PRIORITY = {
  CRITICAL: /match|battle|classic|ranked|arena|tdm|metro|royale|erangel|livik|miramar|vikendi|karakin|nusa|rondo|fpp|tpp|squad|duo|solo|quickmatch|ingame|gamesvr|relay/i,
  LOBBY:    /lobby|matchmaking|queue|login|auth|region|gateway|session|profile|inventory|store|catalog|patch|update|cdn|config/i
};

// ============================================================
// HELPERS
// ============================================================
function isPUBG(h, u){
  return /pubg|tencent|krafton|lightspeed|levelinfinite/i.test(h + u);
}

function isIPv6(ip){
  return ip && ip.indexOf(":") !== -1;
}

// ============================================================
// MATCH SERVERS — /29 ranges
// ============================================================
var MATCH_PREFIXES = [
  // 2a01:9700: /29 → 9700-9707
  "2a01:9700:", "2a01:9701:", "2a01:9702:", "2a01:9703:",
  "2a01:9704:", "2a01:9705:", "2a01:9706:", "2a01:9707:",
  // 2a02:f0c0: /29 → f0c0-f0c7
  "2a02:f0c0:", "2a02:f0c1:", "2a02:f0c2:", "2a02:f0c3:",
  "2a02:f0c4:", "2a02:f0c5:", "2a02:f0c6:", "2a02:f0c7:"
];

function isMatchIPv6(ip){
  for (var i = 0; i < MATCH_PREFIXES.length; i++){
    if (ip.indexOf(MATCH_PREFIXES[i]) === 0) return true;
  }
  return false;
}

// ============================================================
// LOBBY SERVERS — Dynamic Rotation
// ============================================================
var LOBBY_PREFIXES = [
  // 2a01:9700: /29 → 9700-9707
  "2a01:9700:", "2a01:9701:", "2a01:9702:", "2a01:9703:",
  "2a01:9704:", "2a01:9705:", "2a01:9706:", "2a01:9707:",
  // 2a00:18d8: /29 → 18d8-18df
  "2a00:18d8:", "2a00:18d9:", "2a00:18da:", "2a00:18db:",
  "2a00:18dc:", "2a00:18dd:", "2a00:18de:", "2a00:18df:",
  // 2a00:4620: /32
  "2a00:4620:",
  // 2a05:7500: /29 → 7500-7507
  "2a05:7500:", "2a05:7501:", "2a05:7502:", "2a05:7503:",
  "2a05:7504:", "2a05:7505:", "2a05:7506:", "2a05:7507:",
  // 2a02:f0c0: /29 → f0c0-f0c7
  "2a02:f0c0:", "2a02:f0c1:", "2a02:f0c2:", "2a02:f0c3:",
  "2a02:f0c4:", "2a02:f0c5:", "2a02:f0c6:", "2a02:f0c7:",
  // 2a03:6d00: /32
  "2a03:6d00:",
  // 2a03:b640: /32
  "2a03:b640:",
  // 2a05:74c0: /29 → 74c0-74c7
  "2a05:74c0:", "2a05:74c1:", "2a05:74c2:", "2a05:74c3:",
  "2a05:74c4:", "2a05:74c5:", "2a05:74c6:", "2a05:74c7:",
  // 2a13:8d40: /29 → 8d40-8d47
  "2a13:8d40:", "2a13:8d41:", "2a13:8d42:", "2a13:8d43:",
  "2a13:8d44:", "2a13:8d45:", "2a13:8d46:", "2a13:8d47:",
  // 2a00:18d0: /32
  "2a00:18d0:",
  // 2a02:25d8: /32
  "2a02:25d8:"
];

function isLobbyIPv6(ip){
  for (var i = 0; i < LOBBY_PREFIXES.length; i++){
    if (ip.indexOf(LOBBY_PREFIXES[i]) === 0) return true;
  }
  // /42 range: 2a0d:3344:37c0-37ff
  if (ip.indexOf("2a0d:3344:") === 0){
    var nc = ip.indexOf(":", 11);
    if (nc > 11){
      var g3 = ip.substring(11, nc);
      while (g3.length < 4) g3 = "0" + g3;
      if (g3 >= "37c0" && g3 <= "37ff") return true;
    }
  }
  return false;
}

// ============================================================
// JORDAN PEER / INFRASTRUCTURE BIAS
// Orange Jordan — AS8376
// ============================================================
function isJordanPeer(ip){
  return (
    ip.indexOf("2a01:9700:1b05:") === 0 ||
    ip.indexOf("2a01:9700:17e")   === 0 ||
    ip.indexOf("2a01:9700:1c")    === 0
  );
}

// ============================================================
// MAIN
// ============================================================
function FindProxyForURL(url, host){

  var ip = "";
  try {
    ip = dnsResolve(host);
  } catch(e) {
    ip = "";
  }

  if (isPlainHostName(host))
    return DIRECT;

  if (!isPUBG(host, url))
    return DIRECT;

  if (!ip || !isIPv6(ip))
    return BLOCK;

  var data  = (host + url).toLowerCase();
  var parts = ip.split(":");

  var isCritical = PRIORITY.CRITICAL.test(data);
  var isLobby    = PRIORITY.LOBBY.test(data);

  // ============================================================
  // MATCH LOCK — /32 (أول مجموعتين)
  // ============================================================
  if (isCritical && isMatchIPv6(ip)){

    var net32 = parts.slice(0, 2).join(":");

    if (!SESSION.matchNet){
      SESSION.matchNet  = net32;
      SESSION.matchHost = host;
      return PROXY;
    }

    if (net32 !== SESSION.matchNet)
      return BLOCK;

    return PROXY;
  }

  // ============================================================
  // DYNAMIC LOBBY — /32 (أول مجموعتين)
  // ============================================================
  if (isLobby && isLobbyIPv6(ip)){

    var net32L = parts.slice(0, 2).join(":");

    if (!SESSION.lobbyNet){
      SESSION.lobbyNet = net32L;
      return PROXY;
    }

    if (SESSION.lobbyNet !== net32L){
      SESSION.lobbyNet = net32L;
      return PROXY;
    }

    return PROXY;
  }

  // ============================================================
  // JORDAN PEER BIAS
  // ============================================================
  if (isJordanPeer(ip))
    return PROXY;

  return BLOCK;
}
