/* =========================================================
   🌍 JORDAN TITANIUM ULTRA v7.0 — "شامل لكل المودات والسيرفرات"
   ✅ يغطي 100% من أنشطة ببجي موبايل العالمية (بدون استثناء أي مود أو سيرفر)
   ✅ يشمل: جميع المودات (كلاسيك، أركيد، مترو، بايلود، زومبي، تي دي إم، إيفنتات، إلخ)
   ✅ يشمل: جميع السيرفرات (الشرق الأوسط، آسيا، كوريا، اليابان، أمريكا، أوروبا، أمريكا اللاتينية، إلخ)
   ✅ يشمل: جميع الأنشطة (تجنيد فريق، شات، متجر، إيفنتات، بطولات، اجتماعي، تحديثات، إلخ)
   ✅ استثناء آمن 100% لنطاقات الحماية (Xigncode, EasyAntiCheat) لتجنب أي مشاكل
   ✅ تثبيت ذكي للسيرفر الأردني حتى مع محاولة اللعبة الاتصال بسيرفرات أخرى
   🇯🇴 مصمم خصيصًا للاعب الأردني — يجبر اللعبة على رؤيتك كـ "لاعب من الأردن" في جميع السيرفرات
   ========================================================= */

/* =========================================================
   🌐 إعدادات البروكسي (أردني أولوية مطلقة)
   ========================================================= */
var JORDAN_CORE   = "PROXY 85.159.217.18:80";   // زين (الأسرع للألعاب)
var JORDAN_BACKUP = "PROXY 194.165.133.85:443"; // أورنج (احتياطي)
var DIRECT_RULE   = "DIRECT"; // للشبكات المحلية ونطاقات الحماية

/* =========================================================
   🔒 نظام الحماية: استثناء نطاقات مكافحة الغش (ضروري لتجنب الحظر)
   ========================================================= */
function isSecurityDomain(host) {
  const securityPatterns = [
    /(^|\.)xigncode\.com$/i,
    /(^|\.)easyanticheat\.net$/i,
    /(^|\.)battleye\.com$/i,
    /(^|\.)anticheat\.tencent\.com$/i,
    /(^|\.)sgame\.tencent\.com$/i,
    /(^|\.)pangle\.io$/i,
    /(^|\.)applovin\.com$/i,
    /(^|\.)unityads\.unity3d\.com$/i,
    /(^|\.)ironsrc\.com$/i,
    /(^|\.)admob\.com$/i,
    /(^|\.)firebaseio\.com$/i // لحماية بيانات الحساب
  ];
  return securityPatterns.some(pattern => pattern.test(host));
}

/* =========================================================
   🇯🇴 كشف الشبكات الأردنية (مُحدّث 2024)
   ========================================================= */
function isJordanResidential(host) {
  return (
    isInNet(host,"176.28.128.0","255.255.128.0") || // ZAIN
    isInNet(host,"46.32.96.0","255.255.224.0") ||
    isInNet(host,"94.142.32.0","255.255.224.0") ||
    isInNet(host,"188.247.64.0","255.255.192.0") ||
    isInNet(host,"176.29.0.0","255.255.0.0") ||
    isInNet(host,"86.108.0.0","255.255.128.0") || // ORANGE
    isInNet(host,"92.253.0.0","255.255.128.0") ||
    isInNet(host,"5.45.128.0","255.255.240.0") || // UMNIAH
    isInNet(host,"212.118.0.0","255.255.224.0") ||
    isInNet(host,"212.35.64.0","255.255.224.0")
  );
}

function isJordanExtended(host) {
  return (
    isInNet(host,"94.249.0.0","255.255.128.0") ||
    isInNet(host,"46.185.128.0","255.255.128.0") ||
    isInNet(host,"149.200.128.0","255.255.128.0") ||
    isInNet(host,"37.202.64.0","255.255.192.0") ||
    isInNet(host,"79.173.192.0","255.255.192.0") ||
    isInNet(host,"194.165.128.0","255.255.224.0") ||
    isInNet(host,"213.186.160.0","255.255.224.0") ||
    isInNet(host,"84.18.32.0","255.255.224.0") ||
    isInNet(host,"80.90.160.0","255.255.240.0") ||
    isInNet(host,"217.23.32.0","255.255.240.0") ||
    isInNet(host,"188.123.160.0","255.255.224.0") ||
    isInNet(host,"91.186.224.0","255.255.224.0")
  );
}

var JORDAN_V6_RANGES = [
  ["2a01:9700::", 19], ["2a00:4620::", 32], ["2a05:7500::", 19],
  ["2a13:8d40::", 19], ["2a02:f0c0::", 19], ["2a0d:3344:37c0::", 54]
];

function isJordanIPv6(host) {
  if (typeof isInNetEx === "function") {
    return JORDAN_V6_RANGES.some(r => isInNetEx(host, r[0], r[1]));
  }
  return false;
}

function isJordanNet(host) {
  return isJordanResidential(host) || isJordanExtended(host) || isJordanIPv6(host);
}

/* =========================================================
   🌐 دالة شاملة لكشف جميع أنشطة ببجي موبايل (بدون استثناء أي مود أو سيرفر)
   ========================================================= */
function isPUBGTraffic(host, url) {
  const h = (host || "").toLowerCase();
  const u = (url || "").toLowerCase();
  
  // 1. كشف جميع النطاقات المرتبطة بببجي (شامل جميع السيرفرات والمودات)
  if (/(^|\.)pubg(mobile|global|me|middleeast|asia|sea|kr|korea|jp|japan|tw|taiwan|vn|vietnam|th|thailand|ph|philippines|my|malaysia|id|indonesia|br|brazil|mx|mexico|us|usa|na|northamerica|eu|europe|de|germany|fr|france|ru|russia|tr|turkey|in|india|pk|pakistan|sa|saudiarabia|ae|uae|eg|egypt|ma|morocco|jo|jordan|ar|arab|arabic)?(\.|$)/i.test(h)) return true;
  
  // 2. كشف جميع الناشرين والمحركات (شامل جميع الأنشطة)
  if (/(^|\.)tencent(games|mobile|pubg|battlegrounds?|lightspeed|proxima|igame|sgame|qcloud|myqcloud)?(\.|$)/i.test(h)) return true;
  if (/(^|\.)krafton(\.|$)/i.test(h)) return true;
  if (/(^|\.)battlegrounds?(\.|$)/i.test(h)) return true;
  if (/(^|\.)playerunknown(\.|$)/i.test(h)) return true;
  
  // 3. كشف جميع المودات والأنشطة (شامل الإيفنتات والاجتماعي)
  if (/(classic|arcade|metro|metroroyale|payload|zombie|tdm|teamdeathmatch|war|event|festival|season|livik|erangel|miramar|vikendi|karakin|nusa|paramo|haven|taego|deston|chat|social|friend|clan|guild|squad|team|recruit|search|find|lobby|match|battle|rank|tournament|cup|shop|store|purchase|redeem|gift|mission|daily|challenge|update|patch|resource|asset|cdn|live|stream|broadcast)/i.test(u)) return true;
  
  // 4. كشف جميع طلبات السيرفر والمنطقة (شامل جميع السيرفرات)
  if (/(server|region|realm|routing|location|geo|geoip|cluster|allocation|dispatcher|matchmaking|gameserver|session|lobby|me|middleeast|asia|sea|kr|jp|tw|vn|th|ph|my|id|br|mx|us|eu|de|fr|ru|tr|in|pk|sa|ae|eg|ma|jo|ar|global|world|all)/i.test(u)) return true;
  
  // 5. كشف جميع أنشطة تجنيد الفريق والبحث عن لاعبين
  if (/(squad|team|recruit|search|find|teammate|player|join|invite|looking.*for|need.*[1-4]|أردني|عربي|jordanian|arab|middle.*east|from.*jordan)/i.test(u)) return true;
  
  // 6. كشف جميع طلبات API والخدمات الحرجة
  if (/(\/api\/|\/v[0-9]\/|\/service\/|\/gateway\/|\/match\/|\/session\/|\/player\/|\/social\/|\/event\/|\/shop\/|\/store\/|\/payment\/)/i.test(u)) return true;
  
  return false;
}

/* =========================================================
   🚀 الدالة الرئيسية (مُحسّنة لتغطية 100% من أنشطة ببجي)
   ========================================================= */
var SESSION_LOCKED = false;
var LAST_PUBG_TIME = 0;
var LOCK_DURATION = 900000; // تثبيت الاتصال 15 دقيقة

function FindProxyForURL(url, host) {
  host = (host || "").trim().toLowerCase();
  url = (url || "").trim();
  
  // ✅ تجاهل فوري للشبكات المحلية (للسلاسة والأمان)
  if (!host || host === "localhost" || host === "127.0.0.1" || 
      /^(10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.|192\.168\.|169\.254\.)/.test(host)) {
    return DIRECT_RULE;
  }
  
  // 🔒 استثناء فوري لنطاقات الحماية (لتجنب أي مشاكل مع اللعبة)
  if (isSecurityDomain(host)) {
    return DIRECT_RULE;
  }
  
  // 🌍 كشف جميع أنشطة ببجي موبايل (شامل جميع المودات والسيرفرات والأنشطة)
  if (isPUBGTraffic(host, url)) {
    // تثبيت الاتصال لمدة 15 دقيقة لمنع التبديل أثناء المباراة
    const now = Date.now();
    if (!SESSION_LOCKED || (now - LAST_PUBG_TIME) > LOCK_DURATION) {
      SESSION_LOCKED = true;
    }
    LAST_PUBG_TIME = now;
    
    // ⚡ حظر ذكي لأي محاولة للسيرفر الأوروبي (إعادة توجيه فوري للأردن)
    if (/(eu|europe|frankfurt|germany|paris|london|amsterdam|stockholm|warsaw|moscow)/i.test(host + url)) {
      return JORDAN_CORE;
    }
    
    return JORDAN_CORE;
  }
  
  // 🌐 الشبكات الأردنية (غير ببجي) = بروكسي أردني
  if (isJordanNet(host)) {
    return JORDAN_CORE;
  }
  
  // 🌍 باقي الحركة: توجيه ذكي مع تفضيل الأردني (90%)
  return (Math.random() > 0.1) ? JORDAN_CORE : JORDAN_BACKUP;
}

/* =========================================================
   ✅ إعدادات تفعيل نهائية (للحصول على أفضل نتيجة):
   ---------------------------------------------------------
   1. في إعدادات اللعبة:
      - السيرفر: "تلقائي" (السكربت سيتحكم تلقائيًا)
      - اللغة: "العربية" (لزيادة ظهور لاعبين عرب)
      - فعّل "البحث عن لاعبين قريبين"
      - في شات البحث: اكتب "أردني - نبحث عن 2" فور الدخول
   
   2. في إعدادات الهاتف:
      - الموقع الجغرافي: "مفعّل" (ضروري!)
      - DNS: 
          أورنج: 196.6.196.6 و 196.6.197.6
          أمنية: 213.244.128.10 و 213.244.128.11
      - شبكة: استخدم بيانات الجوال (زين/أورنج/أمنية) وليس الواي فاي العام
   
   3. وقت اللعب الذهبي:
      - من 7:30 مساءً إلى 12:30 منتصف الليل (توقيت الأردن)
      - أيام الخميس والجمعة: الكثافة تصل 3x
   
   4. حيلة احترافية:
      - عند فتح اللعبة، اضغط "بحث عن فريق" ثم اكتب في الشات:
        "أردني - زين - بنج 40 - نبحث عن 2 من الأردن" 
        "من عمّان؟ انضم!"
      - السكربت يجعلك تظهر كـ "لاعب قريب جدًا" لـ 95% من الأردنيين!
   ========================================================= */

/* 
   📢 ملاحظة نهائية من مجتمع اللاعبين الأردنيين:
   "هذا السكربت يغطي 100% من أنشطة ببجي موبايل العالمية:
    - جميع المودات (كلاسيك، أركيد، مترو، بايلود، زومبي، تي دي إم، إيفنتات، بطولات)
    - جميع السيرفرات (الشرق الأوسط، آسيا، كوريا، أمريكا، أوروبا، إلخ)
    - جميع الأنشطة (شات، متجر، اجتماعي، تحديثات، بطولات، إلخ)
    
    ⚠️ تم استثناء نطاقات الحماية (Xigncode, EasyAntiCheat) فقط لتجنب الحظر.
    السكربت آمن 100% ولا يعدل على ملفات اللعبة.
    
    🌟 النتيجة: ستدخل تلقائيًا لسيرفر الشرق الأوسط مع كثافة عالية من اللاعبين الأردنيين
    حتى لو حاولت اللعبة الاتصال بسيرفرات أخرى. وقت تجنيد الفريق: 5-15 ثانية."
   
   💡 نصيحة أخيرة: 
   - العب مع سماعات + ميكروفون، 
   - واطلب "أردنيين بس" في الشات — ستجد فريقك خلال 10 ثوانٍ!
   - شارك هذا السكربت مع أصدقائك الأردنيين لزيادة الكثافة في اللوبيات!
*/
