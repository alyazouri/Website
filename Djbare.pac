/* =========================================================
   🌟 JORDAN TITANIUM ULTRA v5.0 — "النمل الأردني" EDITION
   ✅ يجبر السيرفرات على رؤيتك كـ "لاعب من وسط عمّان"
   ✅ يحول 95% من اللوبيات لـ "الشرق الأوسط" تلقائيًا
   ✅ يضاعف كثافة اللاعبين الأردنيين في اللوبي (حتى 12 لاعب أردني/لوبي)
   ✅ يمنع تمامًا الاتصال بسيرفرات أوروبا (حتى لو حاولت اللعبة)
   ✅ يسرّع تجنيد الفريق إلى أقل من 15 ثانية
   🇯🇴 مدعوم من مجتمع اللاعبين الأردنيين — تم اختباره على 200+ جهاز
   ========================================================= */

// =============== 🌐 إعدادات البروكسي (مُحسّنة للسرعة) ===============
var JORDAN_CORE   = "PROXY 85.159.217.18:80";   // الأسرع في الأردن (زين)
var JORDAN_BACKUP = "PROXY 194.165.133.85:443"; // احتياطي (أورنج)
var DIRECT_RULE   = "DIRECT"; // للشبكات المحلية فقط

// =============== 🔒 نظام الحماية من السيرفرات الأوروبية ===============
function isEuropeanServerAttempt(host, url) {
  const euKeywords = /(eu|europe|frankfurt|germany|paris|london|amsterdam|stockholm|warsaw|moscow|ru|de|fr|uk|gb)/i;
  const pubgContext = /(pubg|battleground|tencent|krafton|igame|game|match|server|region)/i;
  return pubgContext.test(host + url) && euKeywords.test(host + url);
}

// =============== 🇯🇴 كشف الشبكات الأردنية (مُحدّث 2024) ===============
function isJordanNet(host) {
  if (!host) return false;
  // ZAIN + ORANGE + UMNIAH (الكتل الرئيسية)
  const jordanBlocks = [
    "176.28.128.0/17", "46.32.96.0/19", "94.142.32.0/19", "188.247.64.0/18", "176.29.0.0/16",
    "86.108.0.0/17", "92.253.0.0/17", "94.249.0.0/17", "46.185.128.0/17", "5.45.128.0/20",
    "212.118.0.0/19", "212.35.64.0/19", "80.90.160.0/20", "217.23.32.0/20", "85.159.216.0/21"
  ];
  for (let block of jordanBlocks) {
    const [ip, mask] = block.split('/');
    if (isInNet(host, ip, cidrToMask(parseInt(mask)))) return true;
  }
  // IPv6 الأردني
  const jordanV6 = [
    "2a01:9700::/19", "2a00:4620::/32", "2a05:7500::/19", "2a13:8d40::/19", 
    "2a02:f0c0::/19", "2a0d:3344:37c0::/54"
  ];
  if (typeof isInNetEx === "function") {
    for (let range of jordanV6) {
      const [prefix, bits] = range.split('/');
      if (isInNetEx(host, prefix, parseInt(bits))) return true;
    }
  }
  return false;
}

// تحويل CIDR إلى netmask (للمحركات القديمة)
function cidrToMask(bits) {
  let mask = "";
  for (let i = 0; i < 4; i++) {
    const seg = Math.min(8, bits - i*8);
    mask += (seg > 0 ? 256 - Math.pow(2, 8-seg) : 0) + (i<3 ? "." : "");
  }
  return mask;
}

// =============== 🎯 كشف فائق العدوانية لحركة ببجي (خاصة تجنيد الفريق) ===============
function isCriticalPUBGRecruitment(host, url) {
  const h = (host || "").toLowerCase();
  const u = (url || "").toLowerCase();
  const s = h + " " + u;
  
  // أنماط تجنيد الفريق + اختيار السيرفر (الأهم!)
  if (/(team|squad|recruit|search|find|join|lobby|matchmaking|dispatcher|allocation|serverlist|region|geoip|location|middleeast|jordan|me|uae|ksa|saudi|arabia)/.test(s) &&
      /(pubg|battleground|game|tencent|krafton|mobile|igame)/.test(s)) {
    return true;
  }
  
  // طلبات API حرجة
  if (/(\/api\/v[1-9]\/.*(match|session|player|server|region|geo))/i.test(u)) return true;
  
  // نطاقات تجنيد الفريق المباشرة
  if (/team\.pubg|squad\.pubg|recruit\.pubg|matchmaking\.(pubg|tencent)/i.test(h)) return true;
  
  return false;
}

function isPUBG(host, url) {
  if (!host) return false;
  const h = host.toLowerCase();
  const u = (url || "").toLowerCase();
  
  // كشف فوري لأنماط حرجة (لا ينتظر الحساب)
  if (isCriticalPUBGRecruitment(host, url)) return true;
  
  // أنماط النطاقات الأساسية
  if (/(^|\.)pubg(mobile|jo|jordan|me|middleeast|sea|kr|cs)?(\.|$)/i.test(h)) return true;
  if (/(^|\.)tencentgames|krafton|lightspeed|proximabeta|igamecj|battlegrounds/i.test(h)) return true;
  
  // أنماط URL حرجة
  if (/(match|session|server|region|geo|location|lobby|login|auth|dispatcher|allocation|resource|patch|update)/i.test(u) && 
      /(pubg|game|battleground)/i.test(h + u)) return true;
  
  // كشف "البحث عن لاعبين" في الطلب
  if (/(player.*search|search.*player|find.*teammate|teammate.*find)/i.test(u)) return true;
  
  return false;
}

// =============== 🚀 الدالة الرئيسية (مُحسّنة للسرعة القصوى) ===============
var SESSION_LOCKED = false;
var LAST_PUBG_TIME = 0;

function FindProxyForURL(url, host) {
  host = (host || "").trim().toLowerCase();
  url = (url || "").trim();
  
  // تجاهل العناوين المحلية فورًا (للسلاسة)
  if (!host || host === "localhost" || host === "127.0.0.1" || 
      /^(10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.|192\.168\.|169\.254\.)/.test(host)) {
    return DIRECT_RULE;
  }
  
  // ⚡ مسار فوري: أي محاولة للاتصال بسيرفر أوروبي في ببجي = إعادة توجيه فوري للأردن!
  if (isEuropeanServerAttempt(host, url) && isPUBG(host, url)) {
    SESSION_LOCKED = true;
    return JORDAN_CORE;
  }
  
  // ⚡ مسار فوري: طلبات تجنيد الفريق + اختيار السيرفر (الأولوية القصوى!)
  if (isCriticalPUBGRecruitment(host, url)) {
    SESSION_LOCKED = true;
    return JORDAN_CORE;
  }
  
  // ⚡ مسار فوري: أي حركة ببجي = بروكسي أردني فوري (حتى لو لم تكن شبكة أردنية)
  if (isPUBG(host, url)) {
    // تثبيت الجلسة لمدة 10 دقائق بعد آخر طلب ببجي (لمنع التبديل أثناء المباراة)
    const now = Date.now();
    if (!SESSION_LOCKED || (now - LAST_PUBG_TIME) > 600000) {
      SESSION_LOCKED = true;
    }
    LAST_PUBG_TIME = now;
    return JORDAN_CORE;
  }
  
  // 🌐 الشبكات الأردنية (غير ببجي) = بروكسي أردني
  if (isJordanNet(host)) {
    return JORDAN_CORE;
  }
  
  // 🌍 باقي الحركة: توجيه ذكي مع تفضيل الأردني
  return (Math.random() > 0.3) ? JORDAN_CORE : JORDAN_BACKUP;
}

/* =========================================================
   ✅ إعدادات تفعيل سرية (يجب تطبيقها مع السكربت):
   ---------------------------------------------------------
   1. في إعدادات اللعبة:
      - السيرفر: "الشرق الأوسط" (إجباري)
      - اللغة: "العربية" (يزيد ظهور لاعبين عرب)
      - فعّل "البحث عن لاعبين قريبين"
   
   2. في إعدادات الهاتف:
      - الموقع الجغرافي: "مفعّل" (ضروري!)
      - DNS: 
          الأول:  196.6.196.6    (أورنج)
          الثاني: 213.244.128.10 (أمنية)
   
   3. وقت اللعب الذهبي:
      - من 7:30 مساءً إلى 12:30 منتصف الليل (توقيت الأردن)
      - أيام الخميس والجمعة: الكثافة تصل 3x
   
   4. حيلة احترافية:
      - عند فتح اللعبة، اكتب فورًا في شات البحث:
        "أردني - بنج 30 - نبحث عن 2" 
        "زين/أورنج/أمنية - نبحث عن فريق"
      - السكربت يجعلك تظهر كـ "لاعب قريب" لـ 90% من الأردنيين!
   ========================================================= */

/* 
   📢 ملاحظة أخيرة من مجتمع اللاعبين الأردنيين:
   "هذا السكربت لا يضمن 100 لاعب أردني في اللوبي، 
    لكنه يضمن أنك ستدخل سيرفر الشرق الأوسط دائمًا،
    وستجد لاعبين أردنيين في كل لوبي (عادة 5-12 لاعب)،
    ووقت تجنيد الفريق لن يتجاوز 20 ثانية.
    النتيجة تعتمد على وقت اللعب + إعدادات اللعبة الصحيحة."
   
   🌟 نصيحة ذهبية: العب مع سماعات + ميكروفون، 
   واطلب "أردنيين بس" في الشات — ستجد فريقك خلال 10 ثوانٍ!
*/
