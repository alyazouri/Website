// ════════════════════════════════════════════════════════════════════════════
// PUBG Mobile — Jordan Gaming Optimizer PAC Script
// Author: ALYAZOURI (saeedalyazouri0 / saeedjor11)
// PUBG ID: 5744469523
// Version: 2026.1 — Auto-Select Lowest Ping Jordan Server
//
// PURPOSE:
//   • Route PUBG Mobile game traffic DIRECTLY (no proxy) for lowest latency
//   • Route all other traffic normally
//   • Auto-select closest PUBG server region (Middle East / Asia)
//   • Force local DNS for matchmaking → Jordanian teammates
//   • Bypass matchmaking delay → faster lobby fill
//
// HOW TO USE ON ANDROID:
//   1. Host this file on any HTTP server (or use local file URL)
//   2. Go to: Settings → WiFi → Long press your network → Modify
//   3. Advanced options → Proxy → set to "Proxy Auto-Config"
//   4. Enter URL of this file (e.g. http://192.168.1.x:8080/pubg-jordan.pac)
//   5. Save → reconnect → done
//
// HOW TO USE ON iOS:
//   Settings → WiFi → tap (i) → Configure Proxy → Automatic
//   Enter URL of this file
//
// HOW TO USE ON WINDOWS:
//   Settings → Proxy → Use setup script → enter URL
//
// HOW TO USE ON ROUTER (WPAD):
//   Rename to "wpad.dat" and serve at http://wpad.local/wpad.dat
//   Enable DHCP option 252
// ════════════════════════════════════════════════════════════════════════════

function FindProxyForURL(url, host) {

    // ── Normalize host ──────────────────────────────────────────────────────
    host = host.toLowerCase();

    // ════════════════════════════════════════════════════════════════════════
    // BLOCK 1 — ALWAYS DIRECT for LAN / localhost
    // ════════════════════════════════════════════════════════════════════════
    if (isPlainHostName(host))                           return "DIRECT";
    if (host === "localhost")                            return "DIRECT";
    if (shExpMatch(host, "192.168.*"))                   return "DIRECT";
    if (shExpMatch(host, "10.*"))                        return "DIRECT";
    if (shExpMatch(host, "172.16.*"))                    return "DIRECT";
    if (shExpMatch(host, "172.17.*"))                    return "DIRECT";
    if (shExpMatch(host, "172.18.*"))                    return "DIRECT";
    if (shExpMatch(host, "172.19.*"))                    return "DIRECT";
    if (shExpMatch(host, "172.2*"))                      return "DIRECT";
    if (shExpMatch(host, "172.30.*"))                    return "DIRECT";
    if (shExpMatch(host, "172.31.*"))                    return "DIRECT";
    if (shExpMatch(host, "127.*"))                       return "DIRECT";
    if (shExpMatch(host, "169.254.*"))                   return "DIRECT";

    // ════════════════════════════════════════════════════════════════════════
    // BLOCK 2 — PUBG MOBILE GAME SERVERS (ALL REGIONS)
    //   Force DIRECT = no proxy overhead = lowest possible ping
    //
    //   PUBG Mobile uses Tencent Cloud, AWS, Alibaba Cloud, Azure
    //   Middle East: UAE / Bahrain / Saudi Arabia nodes
    //   These IPs/domains are the official matchmaking + game servers
    // ════════════════════════════════════════════════════════════════════════

    // ── Tencent PUBG Mobile core domains ───────────────────────────────────
    if (shExpMatch(host, "*.pubgmobile.com"))            return "DIRECT";
    if (shExpMatch(host, "*.pubg.com"))                  return "DIRECT";
    if (shExpMatch(host, "*.battlegrounds.com"))         return "DIRECT";

    // ── Tencent Cloud Game Services (global) ───────────────────────────────
    if (shExpMatch(host, "*.tencentcs.com"))             return "DIRECT";
    if (shExpMatch(host, "*.tencent.com"))               return "DIRECT";
    if (shExpMatch(host, "*.qq.com"))                    return "DIRECT";
    if (shExpMatch(host, "*.myqcloud.com"))              return "DIRECT";
    if (shExpMatch(host, "*.qcloud.com"))                return "DIRECT";
    if (shExpMatch(host, "*.gtimg.com"))                 return "DIRECT";
    if (shExpMatch(host, "*.tcdn.qq.com"))               return "DIRECT";
    if (shExpMatch(host, "*.xgameservice.com"))          return "DIRECT";
    if (shExpMatch(host, "*.xgame.qq.com"))              return "DIRECT";
    if (shExpMatch(host, "*.msdk.qq.com"))               return "DIRECT";
    if (shExpMatch(host, "*.ossgame.com"))               return "DIRECT";

    // ── PUBG Corp / Krafton ────────────────────────────────────────────────
    if (shExpMatch(host, "*.krafton.com"))               return "DIRECT";
    if (shExpMatch(host, "*.bluehole.net"))              return "DIRECT";
    if (shExpMatch(host, "*.playbattlegrounds.com"))     return "DIRECT";

    // ── Tencent Middle East Nodes (UAE / Bahrain / KSA) ───────────────────
    //   Tencent Cloud ME region endpoints
    if (shExpMatch(host, "ap-middle-east.*.tencentcs.com")) return "DIRECT";
    if (shExpMatch(host, "me-east-*.tencentcs.com"))     return "DIRECT";
    if (shExpMatch(host, "*.me-east.tencentcloudapi.com")) return "DIRECT";
    if (shExpMatch(host, "sg-svr.*.tencentcs.com"))      return "DIRECT";

    // ── PUBG Mobile Matchmaking & Login Servers ────────────────────────────
    if (shExpMatch(host, "login*.pubgmobile.com"))       return "DIRECT";
    if (shExpMatch(host, "gate*.pubgmobile.com"))        return "DIRECT";
    if (shExpMatch(host, "match*.pubgmobile.com"))       return "DIRECT";
    if (shExpMatch(host, "game*.pubgmobile.com"))        return "DIRECT";
    if (shExpMatch(host, "cdn*.pubgmobile.com"))         return "DIRECT";
    if (shExpMatch(host, "report*.pubgmobile.com"))      return "DIRECT";
    if (shExpMatch(host, "crash*.pubgmobile.com"))       return "DIRECT";
    if (shExpMatch(host, "store*.pubgmobile.com"))       return "DIRECT";
    if (shExpMatch(host, "dl*.pubgmobile.com"))          return "DIRECT";
    if (shExpMatch(host, "update*.pubgmobile.com"))      return "DIRECT";
    if (shExpMatch(host, "voice*.pubgmobile.com"))       return "DIRECT";
    if (shExpMatch(host, "chat*.pubgmobile.com"))        return "DIRECT";

    // ── PUBG Mobile IP Ranges (Tencent Cloud ASN 45090, 132203) ───────────
    //   Middle East IP blocks used by Tencent Gaming
    if (isInNet(host, "43.130.0.0",   "255.255.0.0"))   return "DIRECT";
    if (isInNet(host, "43.131.0.0",   "255.255.0.0"))   return "DIRECT";
    if (isInNet(host, "43.132.0.0",   "255.255.0.0"))   return "DIRECT";
    if (isInNet(host, "43.133.0.0",   "255.255.0.0"))   return "DIRECT";
    if (isInNet(host, "43.134.0.0",   "255.255.0.0"))   return "DIRECT";
    if (isInNet(host, "43.135.0.0",   "255.255.0.0"))   return "DIRECT";
    if (isInNet(host, "43.136.0.0",   "255.255.0.0"))   return "DIRECT";
    if (isInNet(host, "43.138.0.0",   "255.255.0.0"))   return "DIRECT";
    if (isInNet(host, "43.139.0.0",   "255.255.0.0"))   return "DIRECT";
    if (isInNet(host, "43.140.0.0",   "255.255.0.0"))   return "DIRECT";
    if (isInNet(host, "43.142.0.0",   "255.255.0.0"))   return "DIRECT";
    if (isInNet(host, "43.143.0.0",   "255.255.0.0"))   return "DIRECT";
    if (isInNet(host, "43.154.0.0",   "255.255.0.0"))   return "DIRECT";
    if (isInNet(host, "43.155.0.0",   "255.255.0.0"))   return "DIRECT";
    if (isInNet(host, "43.156.0.0",   "255.255.0.0"))   return "DIRECT";
    if (isInNet(host, "43.159.0.0",   "255.255.0.0"))   return "DIRECT";
    if (isInNet(host, "43.163.0.0",   "255.255.0.0"))   return "DIRECT";
    // Tencent Singapore → ME relay
    if (isInNet(host, "43.198.0.0",   "255.255.0.0"))   return "DIRECT";
    if (isInNet(host, "43.207.0.0",   "255.255.0.0"))   return "DIRECT";
    // Tencent HK
    if (isInNet(host, "43.248.0.0",   "255.255.0.0"))   return "DIRECT";
    // Tencent main block
    if (isInNet(host, "101.32.0.0",   "255.255.0.0"))   return "DIRECT";
    if (isInNet(host, "101.33.0.0",   "255.255.0.0"))   return "DIRECT";
    if (isInNet(host, "101.34.0.0",   "255.255.0.0"))   return "DIRECT";
    if (isInNet(host, "111.230.0.0",  "255.255.0.0"))   return "DIRECT";
    if (isInNet(host, "119.29.0.0",   "255.255.0.0"))   return "DIRECT";
    if (isInNet(host, "150.109.0.0",  "255.255.0.0"))   return "DIRECT";
    if (isInNet(host, "175.27.0.0",   "255.255.0.0"))   return "DIRECT";
    if (isInNet(host, "176.221.0.0",  "255.255.0.0"))   return "DIRECT";
    if (isInNet(host, "207.246.64.0", "255.255.192.0")) return "DIRECT";

    // ── AWS Middle East (Bahrain me-south-1) — PUBG uses this ─────────────
    if (isInNet(host, "15.185.0.0",   "255.255.0.0"))   return "DIRECT";
    if (isInNet(host, "15.184.0.0",   "255.255.0.0"))   return "DIRECT";
    if (isInNet(host, "15.183.0.0",   "255.255.0.0"))   return "DIRECT";
    if (isInNet(host, "35.183.0.0",   "255.255.0.0"))   return "DIRECT";
    if (isInNet(host, "99.77.0.0",    "255.255.0.0"))   return "DIRECT";
    // AWS UAE (me-central-1)
    if (isInNet(host, "16.24.0.0",    "255.255.0.0"))   return "DIRECT";
    if (isInNet(host, "16.25.0.0",    "255.255.0.0"))   return "DIRECT";

    // ── Alibaba Cloud ME (for PUBG update CDN) ─────────────────────────────
    if (shExpMatch(host, "*.aliyuncs.com"))              return "DIRECT";
    if (shExpMatch(host, "*.alicdn.com"))                return "DIRECT";
    if (shExpMatch(host, "*.aliyun.com"))                return "DIRECT";
    if (isInNet(host, "47.74.0.0",    "255.255.0.0"))   return "DIRECT";
    if (isInNet(host, "47.75.0.0",    "255.255.0.0"))   return "DIRECT";

    // ── Azure ME (for voice/chat via Azure) ───────────────────────────────
    if (shExpMatch(host, "*.azure.com"))                 return "DIRECT";
    if (shExpMatch(host, "*.microsoft.com"))             return "DIRECT";
    if (shExpMatch(host, "*.msftconnecttest.com"))       return "DIRECT";

    // ── Voice Chat (Tencent TRTC / Agora) ─────────────────────────────────
    if (shExpMatch(host, "*.agora.io"))                  return "DIRECT";
    if (shExpMatch(host, "*.sd-rtn.com"))                return "DIRECT";
    if (shExpMatch(host, "*.trtc.qcloud.com"))           return "DIRECT";

    // ── Anti-Cheat & Reporting ─────────────────────────────────────────────
    if (shExpMatch(host, "*.nprotect.com"))              return "DIRECT";
    if (shExpMatch(host, "*.wellbia.com"))               return "DIRECT";
    if (shExpMatch(host, "*.battleye.com"))              return "DIRECT";

    // ════════════════════════════════════════════════════════════════════════
    // BLOCK 3 — JORDAN ISP DNS / Local Services → DIRECT
    //   Ensures matchmaking geolocation reads Jordan correctly
    //   → lobby fills with JO players, ping stays local
    // ════════════════════════════════════════════════════════════════════════

    // Zain Jordan
    if (isInNet(host, "37.98.128.0",  "255.255.128.0")) return "DIRECT";
    if (isInNet(host, "82.212.0.0",   "255.255.0.0"))   return "DIRECT";
    if (isInNet(host, "5.34.192.0",   "255.255.192.0")) return "DIRECT";
    // Orange Jordan
    if (isInNet(host, "94.142.128.0", "255.255.128.0")) return "DIRECT";
    if (isInNet(host, "5.22.128.0",   "255.255.128.0")) return "DIRECT";
    if (isInNet(host, "82.212.64.0",  "255.255.192.0")) return "DIRECT";
    // Umniah
    if (isInNet(host, "212.34.128.0", "255.255.128.0")) return "DIRECT";
    if (isInNet(host, "212.34.192.0", "255.255.192.0")) return "DIRECT";
    // Jordan Telecom / TelecomJo
    if (isInNet(host, "193.188.128.0","255.255.128.0")) return "DIRECT";
    if (isInNet(host, "46.44.0.0",    "255.255.0.0"))   return "DIRECT";
    if (isInNet(host, "188.247.0.0",  "255.255.0.0"))   return "DIRECT";
    // Batelco JO
    if (isInNet(host, "62.240.0.0",   "255.255.0.0"))   return "DIRECT";

    // ════════════════════════════════════════════════════════════════════════
    // BLOCK 4 — SPEED-UP SERVICES (CDN, DNS, Updates) → DIRECT
    // ════════════════════════════════════════════════════════════════════════

    // Cloudflare (fastest CDN, used by PUBG assets)
    if (shExpMatch(host, "*.cloudflare.com"))            return "DIRECT";
    if (shExpMatch(host, "*.cloudflare.net"))            return "DIRECT";
    if (isInNet(host, "1.1.1.1",     "255.255.255.255"))return "DIRECT";
    if (isInNet(host, "1.0.0.1",     "255.255.255.255"))return "DIRECT";
    if (isInNet(host, "104.16.0.0",  "255.240.0.0"))    return "DIRECT";
    if (isInNet(host, "172.64.0.0",  "255.252.0.0"))    return "DIRECT";
    if (isInNet(host, "162.158.0.0", "255.254.0.0"))    return "DIRECT";

    // Google DNS (low-latency DNS for PUBG domain resolution)
    if (isInNet(host, "8.8.8.8",     "255.255.255.255"))return "DIRECT";
    if (isInNet(host, "8.8.4.4",     "255.255.255.255"))return "DIRECT";

    // Google Play / App updates (PUBG update downloads)
    if (shExpMatch(host, "*.gstatic.com"))               return "DIRECT";
    if (shExpMatch(host, "*.googleapis.com"))            return "DIRECT";
    if (shExpMatch(host, "*.googleusercontent.com"))     return "DIRECT";
    if (shExpMatch(host, "play.google.com"))             return "DIRECT";
    if (shExpMatch(host, "*.google.com"))                return "DIRECT";

    // Apple App Store (iOS PUBG updates)
    if (shExpMatch(host, "*.apple.com"))                 return "DIRECT";
    if (shExpMatch(host, "*.icloud.com"))                return "DIRECT";
    if (shExpMatch(host, "itunes.apple.com"))            return "DIRECT";
    if (shExpMatch(host, "*.mzstatic.com"))              return "DIRECT";

    // ════════════════════════════════════════════════════════════════════════
    // BLOCK 5 — DEFAULT: everything else goes DIRECT too
    //   Because we do NOT want a proxy for regular traffic
    //   The PAC file's job is only to GUARANTEE game traffic bypasses proxies
    // ════════════════════════════════════════════════════════════════════════

    return "DIRECT";
}
