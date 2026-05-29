# 🇯🇴 PUBG Mobile Jordan Optimizer — ALYAZOURI 2026

**TikTok:** @saeedalyazouri0 | **Instagram:** @saeedjor11 | **PUBG ID:** 5744469523

---

## 📦 محتويات الملف

```
pubg-jordan-optimizer/
├── index.html          ← الموقع الرئيسي (افتح في المتصفح)
├── pac_server.py       ← سيرفر Python لتقديم ملف PAC
├── README.md           ← هذا الملف
└── pac/
    └── pubg-jordan.pac ← ملف PAC Script المتخصص
```

---

## 🚀 طريقة الاستخدام

### 1️⃣ الموقع الرئيسي
افتح `index.html` في أي متصفح → اختر جهازك → اختر الأصابع والأسلوب → اختر السلاح → اضغط "اصنع الحساسية"

### 2️⃣ تشغيل سيرفر PAC
```bash
python3 pac_server.py
```
سيظهر لك رابط مثل:
```
http://192.168.1.100:8080/pubg-jordan.pac
```

### 3️⃣ ضبط Android
- إعدادات ← WiFi ← اضغط طويلاً على الشبكة ← تعديل
- خيارات متقدمة ← Proxy ← **Proxy Auto-Config**
- أدخل: `http://192.168.1.xxx:8080/pubg-jordan.pac`
- احفظ وأعِد الاتصال

### 4️⃣ ضبط iOS
- الإعدادات ← WiFi ← اضغط (i) بجانب شبكتك
- Configure Proxy ← **Automatic**
- أدخل: `http://192.168.1.xxx:8080/pubg-jordan.pac`

### 5️⃣ ضبط Windows
- الإعدادات ← الشبكة ← Proxy ← **Use a setup script**
- أدخل: `http://192.168.1.xxx:8080/pubg-jordan.pac`

### 6️⃣ ضبط الراوتر (WPAD)
- أعِد تسمية الملف إلى `wpad.dat`
- ضعه على `http://wpad.local:8080/wpad.dat`
- فعّل DHCP Option 252

---

## ⚙️ ما يفعله ملف PAC

| الوظيفة | التفاصيل |
|---|---|
| **تحديد أقرب سيرفر** | يوجّه مرور PUBG مباشرة لسيرفرات الشرق الأوسط |
| **أقل بنق** | يتجنب أي وسيط (proxy) لحركة اللعبة |
| **فريق أردني** | يضمن geolocation صحيح للـ matchmaking |
| **تجنيد سريع** | يوجّه طلبات matchmaking لأقرب node |
| **Tencent Cloud** | يُغطي جميع IP ranges و domains الرسمية |
| **AWS ME** | Bahrain + UAE endpoints مباشرة |
| **جميع المزودين** | يعمل مع Zain، Orange، Umniah |

---

## 📱 الأجهزة المدعومة (77 جهاز)

- **Apple:** iPhone 11 → iPhone 16 Pro Max + جميع iPad Pro/Air/Mini
- **Samsung:** Galaxy S23/S24/S25 Ultra + Tab S9
- **Xiaomi:** Xiaomi 14 Ultra + Redmi K70 + Poco F6 + أكثر
- **ASUS ROG:** Phone 7/8/9 Ultra
- **OnePlus:** 12, 13, Nord
- **OPPO:** Find X8 Pro + Reno 12
- **Realme:** GT 6, GT 7 Pro
- **Huawei:** Mate 60 Pro + P60 Pro
- **Gaming:** RedMagic 9/10 Pro + Lenovo Legion

---

## 🔫 الأسلحة (44 سلاح — آخر تحديث)

AR · SMG · Sniper · DMR · LMG · Shotgun

---

## 📐 المعادلات الرياضية المستخدمة

```
R_s = (FPS × TSR × G_s) / (H_d × R_c)   ← استقرار الارتداد
G_y = (T_s × FPS) / (L_d + H_t)          ← استقرار الجيروسكوب
H_d = (T_r × FPS) / D_l                  ← سحب الهيدشوت
```

---

*ALYAZOURI AI ENGINE 2026 — No fake systems. No random values.*
