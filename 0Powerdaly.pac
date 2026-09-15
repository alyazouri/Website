// ============================================================
//  PAC Script - AS9038 (Zain Jordan) + EXCLUSIONS
//  🔒 وضع الإغلاق الكامل المطور - STRICT LOCKDOWN + EXCEPTIONS
//  ✅ المسموح: AS9038 + YouTube + GitHub
//  ❌ المحجوب: أي شيء آخر خارج هذه الدائرة
// ============================================================

function FindProxyForURL(url, host) {

    var DIRECT  = "DIRECT";
    var BLOCKED = "PROXY 0.0.0.0:0"; // حجب تام

    // 1. ✅ السماح للـ Localhost
    if (isPlainHostName(host) || host === "127.0.0.1" || host === "localhost") {
        return DIRECT;
    }

    // 2. ✅ استثناء منصة YouTube (يشمل خوادم الفيديو والصور)
    if (dnsDomainIs(host, "youtube.com") || 
        shExpMatch(host, "*.youtube.com") ||
        shExpMatch(host, "*.googlevideo.com") || 
        shExpMatch(host, "*.ytimg.com") || 
        shExpMatch(host, "*.ggpht.com") ||
        shExpMatch(host, "*.youtu.be")) {
        return DIRECT;
    }

    // 3. ✅ استثناء منصة GitHub (يشمل الملفات البرمجية والمواقع التابعة)
    if (dnsDomainIs(host, "github.com") || 
        shExpMatch(host, "*.github.com") ||
        shExpMatch(host, "*.githubusercontent.com") || 
        shExpMatch(host, "*.github.io") || 
        shExpMatch(host, "*.github.blog")) {
        return DIRECT;
    }

    // 4. تحويل الدومين إلى IP للفحص الشرس
    var ip = dnsResolve(host);
    if (!ip) return BLOCKED;

    // ═══════════════════════════════════════════
    // 🟢 نطاقات AS9038 (Zain Jordan) - DIRECT
    // ═══════════════════════════════════════════

    // -- النطاقات الكبرى /18
    if (isInNet(ip, "79.173.128.0",  "255.255.192.0") ||
        isInNet(ip, "84.235.128.0",  "255.255.192.0") ||
        isInNet(ip, "86.108.0.0",    "255.255.192.0") ||
        isInNet(ip, "94.188.128.0",  "255.255.192.0") ||
        isInNet(ip, "188.247.128.0", "255.255.192.0")) return DIRECT;

    // -- النطاقات /19
    if (isInNet(ip, "80.90.160.0",   "255.255.224.0") ||
        isInNet(ip, "82.212.64.0",   "255.255.224.0") ||
        isInNet(ip, "87.236.128.0",  "255.255.224.0") ||
        isInNet(ip, "89.200.160.0",  "255.255.224.0") ||
        isInNet(ip, "91.106.96.0",   "255.255.224.0") ||
        isInNet(ip, "109.107.224.0", "255.255.224.0") ||
        isInNet(ip, "176.67.64.0",   "255.255.224.0") ||
        isInNet(ip, "212.118.0.0",   "255.255.224.0") ||
        isInNet(ip, "37.98.192.0",   "255.255.224.0") ||
        isInNet(ip, "78.158.160.0",  "255.255.224.0")) return DIRECT;

    // -- النطاقات /20 و /21 و /22 و /24
    if (isInNet(ip, "31.186.240.0",  "255.255.240.0") ||
        isInNet(ip, "37.44.32.0",    "255.255.240.0") ||
        isInNet(ip, "46.23.96.0",    "255.255.240.0") ||
        isInNet(ip, "176.67.80.0",   "255.255.240.0") ||
        isInNet(ip, "212.35.64.0",   "255.255.240.0") ||
        isInNet(ip, "212.118.16.0",  "255.255.240.0") ||
        isInNet(ip, "194.170.16.0",  "255.255.248.0") ||
        isInNet(ip, "212.118.32.0",  "255.255.248.0") ||
        isInNet(ip, "45.140.52.0",   "255.255.252.0") ||
        isInNet(ip, "85.159.220.0",  "255.255.252.0") ||
        isInNet(ip, "185.80.24.0",   "255.255.252.0") ||
        isInNet(ip, "195.144.124.0", "255.255.252.0") ||
        isInNet(ip, "77.75.118.0",   "255.255.255.0") ||
        isInNet(ip, "193.188.4.0",   "255.255.255.0") ||
        isInNet(ip, "194.9.4.0",     "255.255.255.0")) return DIRECT;

    // ═══════════════════════════════════════════
    // 🟢 دعم IPv6 لنطاق زين
    // ═══════════════════════════════════════════
    if (typeof myIpAddressEx === "function") {
        var ips = myIpAddressEx();
        if (ips.indexOf("2a03:b640") !== -1) return DIRECT;
    }

    // ═══════════════════════════════════════════
    // 🔴 الإغلاق النهائي - أي شيء لم يذكر أعلاه يحجب
    // ═══════════════════════════════════════════
    return BLOCKED;
}
