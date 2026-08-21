// ============================================================
// PUBG MOBILE — JORDAN LOCK v10.0 [ADVANCED]
// Smart Routing Engine / Zero-Latency / Bandwidth Shaping
// Strict Block Mode (No DIRECT)
// ============================================================

var PROXY = "PROXY 109.237.205.83:20001";
var BLOCK = "PROXY 0.0.0.0:0";

// ============================================================
// 1. DOMAIN FINGERPRINTING (Zero-Latency Routing)
// تصنيف النطاقات حسب الأولوية لتسريع التوجيه وتقليل حمل DNS
// ============================================================
var DOMAIN_TIERS = {
    // Tier 0: سيرفرات الماتش الحساسة للزمن (أولوية قصوى)
    TIER_0_MATCH: /^(.*\.)?(match|battle|relay|gamesvr|ingame|tmgp|sgame|gameplay).*\.(pubgmobile|tencent|krafton|levelinfinite|pubg)\.(com|mobile|net)$|^(.*\.)?(erangel|livik|miramar|vikendi|karakin|nusa|rondo)\./i,
    
    // Tier 1: اللوبي، المصادقة، وقوائم الانتظار
    TIER_1_LOBBY: /^(.*\.)?(lobby|auth|login|queue|matchmaking|gateway|session|profile|inventory|store|catalog|config|region|passport)\./i,
    
    // Tier 2: التتبع، الإعلانات، وتحليلات البيانات (يجب تدميرها لتوفير الباندويث)
    TIER_2_TELEMETRY: /^(.*\.)?(telemetry|analytics|tracking|ads|log|report|crashlytics|bugly|adjust|appsflyer|facebook|google)\./i,
    
    // Tier 3: سيرفرات التحديث والـ CDN (يجب حجبها لعدم استهلاك البروكسي)
    TIER_3_CDN: /^(.*\.)?(cdn|update|download|asset|static|patchdl|hotfix|res)\./i
};

// ============================================================
// 2. REGEX IP MATCHER (Ultra-Fast Engine)
// محرك مطابقة IP بالتعبيرات النمطية (أسرع بكثير من الحلقات)
// ============================================================

// نطاقات الماتش (/29)
var MATCH_IP_REGEX = /^2a01:970[0-7]:|^2a02:f0c[0-7]:/i;

// نطاقات اللوبي (/29, /32, /42)
// ملاحظة: تم تحويل النطاقات إلى Regex دقيق ومضغوط
var LOBBY_IP_REGEX = new RegExp(
    "^2a01:970[0-7]:" +          // 2a01:9700-9707
    "|^2a02:f0c[0-7]:" +         // 2a02:f0c0-f0c7
    "|^2a00:18d[89a-f]:" +       // 2a00:18d8-18df
    "|^2a00:4620:" +             // 2a00:4620
    "|^2a05:750[0-7]:" +         // 2a05:7500-7507
    "|^2a03:6d00:" +             // 2a03:6d00
    "|^2a03:b640:" +             // 2a03:b640
    "|^2a05:74c[0-7]:" +         // 2a05:74c0-74c7
    "|^2a13:8d4[0-7]:" +         // 2a13:8d40-8d47
    "|^2a00:18d0:" +             // 2a00:18d0
    "|^2a02:25d8:" +             // 2a02:25d8
    "|^2a0d:3344:37[c-f][0-9a-f]:", // /42 range (37c0 - 37ff)
    "i"
);

// نطاقات البنية التحتية الأردنية (Orange Jordan AS8376)
var JORDAN_PEER_REGEX = /^2a01:9700:1b05:|^2a01:9700:17e|^2a01:9700:1c/i;

// ============================================================
// 3. SESSION & STATE MANAGEMENT
// إدارة الجلسات ومنع التذبذب (Debouncing)
// ============================================================
var SESSION = {
    matchNet: null,
    lobbyNet: null,
    lastHost: null,
    lockTime: 0
};

// ============================================================
// 4. MAIN ROUTING ENGINE
// ============================================================
function FindProxyForURL(url, host) {
    // حجب النطاقات المحلية فوراً
    if (isPlainHostName(host) || host.indexOf(".") === -1) return BLOCK;

    var hostLower = host.toLowerCase();
    var urlLower = url.toLowerCase();

    // --------------------------------------------------------
    // PHASE 1: DOMAIN FINGERPRINTING (بدون استهلاك DNS)
    // --------------------------------------------------------
    
    // حجب التتبع والإعلانات والـ CDN (حماية عرض النطاق)
    if (DOMAIN_TIERS.TIER_2_TELEMETRY.test(hostLower) || DOMAIN_TIERS.TIER_3_CDN.test(hostLower)) {
        return BLOCK;
    }

    var isMatchDomain = DOMAIN_TIERS.TIER_0_MATCH.test(hostLower);
    var isLobbyDomain = DOMAIN_TIERS.TIER_1_LOBBY.test(hostLower);
    var isPUBGDomain  = /pubg|tencent|krafton|lightspeed|levelinfinite/i.test(hostLower);

    // إذا لم يكن نطاق PUBG، احجبه بالكامل (Strict Mode)
    if (!isPUBGDomain) return BLOCK;

    // --------------------------------------------------------
    // PHASE 2: IP DEEP LOCKING (تحليل IP للنطاقات الحساسة)
    // --------------------------------------------------------
    var ip = "";
    try {
        // نقوم بحل DNS فقط إذا كان النطاق حساساً ويحتاج قفلاً
        if (isMatchDomain || isLobbyDomain) {
            ip = dnsResolve(host);
        }
    } catch(e) {
        ip = "";
    }

    var isIPv6 = ip && ip.indexOf(":") !== -1;
    var isIPv4 = ip && ip.indexOf(".") !== -1;

    // --------------------------------------------------------
    // PHASE 3: MATCH LOCK (Lock /29)
    // --------------------------------------------------------
    if (isMatchDomain) {
        // إذا كان IPv6، تحقق من النطاقات المحددة
        if (isIPv6 && MATCH_IP_REGEX.test(ip)) {
            var net32 = ip.split(":").slice(0, 2).join(":");
            
            if (!SESSION.matchNet) {
                SESSION.matchNet = net32;
                SESSION.lockTime = Date.now();
                return PROXY;
            }
            // قفل الشبكة: إذا تغير الـ /32، احظره لمنع التسرب
            return (net32 === SESSION.matchNet) ? PROXY : BLOCK;
        }
        // إذا كان IPv4 أو لم يطابق النطاق، احجبه لضمان عدم التسرب لسيرفرات أخرى
        return BLOCK; 
    }

    // --------------------------------------------------------
    // PHASE 4: LOBBY DYNAMIC ROUTING
    // --------------------------------------------------------
    if (isLobbyDomain) {
        if (isIPv6 && LOBBY_IP_REGEX.test(ip)) {
            var net32L = ip.split(":").slice(0, 2).join(":");
            
            if (!SESSION.lobbyNet || SESSION.lobbyNet !== net32L) {
                SESSION.lobbyNet = net32L; // تحديث ديناميكي للولي
            }
            return PROXY;
        }
        return BLOCK;
    }

    // --------------------------------------------------------
    // PHASE 5: JORDAN INFRASTRUCTURE BIAS
    // --------------------------------------------------------
    if (isIPv6 && JORDAN_PEER_REGEX.test(ip)) {
        return PROXY;
    }

    // --------------------------------------------------------
    // DEFAULT: STRICT BLOCK
    // أي شيء آخر لا ينتمي لـ PUBG أو لا يطابق الشروط يتم تدميره
    // --------------------------------------------------------
    return BLOCK;
}
