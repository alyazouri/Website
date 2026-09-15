// ============================================================
//  PAC Script - AS9038 (Zain Jordan) + EXCLUSIONS
//  🔒 وضع الإغلاق الكامل المطور - STRICT LOCKDOWN + EXCEPTIONS
//  ✅ المسموح: Localhost + YouTube + GitHub + AS9038
//  ❌ المحجوب: أي شيء آخر خارج هذه الدائرة
// ============================================================

function FindProxyForURL(url, host) {
    var DIRECT  = "DIRECT";
    var BLOCKED = "PROXY 0.0.0.0:0"; // حجب تام

    // 1. ✅ السماح للـ Localhost والشبكة المحلية (LAN)
    if (isPlainHostName(host) || 
        host === "127.0.0.1" || 
        host === "localhost" ||
        isInNet(dnsResolve(host), "10.0.0.0", "255.0.0.0") ||     // شبكة 10.x.x.x
        isInNet(dnsResolve(host), "172.16.0.0", "255.240.0.0") ||  // شبكة 172.16-31.x.x
        isInNet(dnsResolve(host), "192.168.0.0", "255.255.0.0")) { // شبكة 192.168.x.x
        return DIRECT;
    }

    // 2. ✅ استثناء منصة YouTube (جميع النطاقات الفرعية وخوادمها)
    if (dnsDomainIs(host, "youtube.com") || 
        shExpMatch(host, "*.youtube.com") ||
        shExpMatch(host, "*.googlevideo.com") || 
        shExpMatch(host, "*.ytimg.com") || 
        shExpMatch(host, "*.ggpht.com") ||
        shExpMatch(host, "*.youtu.be")) {
        return DIRECT;
    }

    // 3. ✅ استثناء منصة GitHub (جميع النطاقات الفرعية)
    if (dnsDomainIs(host, "github.com") || 
        shExpMatch(host, "*.github.com") ||
        shExpMatch(host, "*.githubusercontent.com") || 
        shExpMatch(host, "*.github.io") || 
        shExpMatch(host, "*.github.blog")) {
        return DIRECT;
    }

    // 4. ✅ التحقق من نطاقات AS9038 (Zain Jordan) عبر DNS Resolution
    var ip = dnsResolve(host);
    if (ip) {
        // النطاقات الكبرى /18
        if (isInNet(ip, "79.173.128.0",  "255.255.192.0") ||
            isInNet(ip, "84.235.128.0",  "255.255.192.0") ||
            isInNet(ip, "86.108.0.0",    "255.255.192.0") ||
            isInNet(ip, "94.188.128.0",  "255.255.192.0") ||
            isInNet(ip, "188.247.128.0", "255.255.192.0")) return DIRECT;

        // النطاقات /19
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

        // النطاقات /20 و /21 و /22 و /24
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
    }

    // 5. ✅ دعم IPv6 لنطاق زين (AS9038)
    if (typeof myIpAddressEx === "function") {
        var ips = myIpAddressEx();
        if (ips && ips.indexOf("2a03:b640") !== -1) return DIRECT;
    }

    // 6. 🔴 الإغلاق النهائي - أي شيء لم يذكر أعلاه يحجب
    return BLOCKED;
}
