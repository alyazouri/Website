// ============================================================
// PUBG IPv6 ROTATION LOCK — JORDAN PLAYERS FIX
// Round-Robin (60s) | IPv4=FREE | IPv6=ROTATION
// 12 Subnets | Lobby=FREE | Match=LOCKED
// ALL 23 PUBG Functions | FIXED: No Players Issue
// ============================================================

var PROXY  = "PROXY 46.185.131.218:443";
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 127.0.0.1:1";

// ================= 12 SUBNET DEFINITIONS =================

var SUBNETS = [
  { prefix: "2a01:9700:0000:0000:0000:0000:0000:0000", len: 29 },
  { prefix: "2a00:18d8:0000:0000:0000:0000:0000:0000", len: 29 },
  { prefix: "2a00:4620:0000:0000:0000:0000:0000:0000", len: 32 },
  { prefix: "2a05:7500:0000:0000:0000:0000:0000:0000", len: 29 },
  { prefix: "2a02:f0c0:0000:0000:0000:0000:0000:0000", len: 29 },
  { prefix: "2a03:6d00:0000:0000:0000:0000:0000:0000", len: 32 },
  { prefix: "2a03:b640:0000:0000:0000:0000:0000:0000", len: 32 },
  { prefix: "2a05:74c0:0000:0000:0000:0000:0000:0000", len: 29 },
  { prefix: "2a13:8d40:0000:0000:0000:0000:0000:0000", len: 29 },
  { prefix: "2a0d:3344:37c0:0000:0000:0000:0000:0000", len: 42 },
  { prefix: "2a00:18d0:0000:0000:0000:0000:0000:0000", len: 32 },
  { prefix: "2a02:25d8:0000:0000:0000:0000:0000:0000", len: 32 }
];

// ================= ROTATION STATE =================

var ROTATION = {
  index:     0,
  startTime: 0,
  duration:  60000
};

// ================= SESSION STATE =================

var SESSION = {
  matchNet:    null,
  matchActive: false
};

// ================= IPv6 CHECK =================

function isIPv6(ip) {
  return ip && ip.indexOf(":") !== -1;
}

// ================= EXPAND IPv6 =================

function expandIPv6(address) {
  if (!address || address.indexOf(":") === -1)
    return address;

  var parts = address.split("::");
  var full  = [];

  if (parts.length === 2) {
    var left    = parts[0] ? parts[0].split(":") : [];
    var right   = parts[1] ? parts[1].split(":") : [];
    var missing = 8 - (left.length + right.length);

    full = left;
    for (var i = 0; i < missing; i++)
      full.push("0000");
    full = full.concat(right);
  } else {
    full = address.split(":");
  }

  for (var j = 0; j < full.length; j++) {
    while (full[j].length < 4)
      full[j] = "0" + full[j];
  }

  return full.join(":").toLowerCase();
}

// ================= PREFIX MATCHING =================

function matchIPv6Prefix(ipExpanded, prefixExpanded, prefixLen) {
  var ipGroups   = ipExpanded.split(":");
  var prefGroups = prefixExpanded.split(":");

  var fullGroups    = Math.floor(prefixLen / 16);
  var remainderBits = prefixLen % 16;

  for (var i = 0; i < fullGroups; i++) {
    if (ipGroups[i] !== prefGroups[i])
      return false;
  }

  if (remainderBits > 0) {
    var mask     = (0xFFFF << (16 - remainderBits)) & 0xFFFF;
    var ipVal    = parseInt(ipGroups[fullGroups], 16);
    var prefVal  = parseInt(prefGroups[fullGroups], 16);
    if ((ipVal & mask) !== (prefVal & mask))
      return false;
  }

  return true;
}

// ================= ROTATION LOGIC =================
// لا يدور أثناء الماتش النشط

function getActiveSubnet() {
  var now = new Date().getTime();

  if (ROTATION.startTime === 0)
    ROTATION.startTime = now;

  // تجميد الدوران أثناء الماتش
  if (SESSION.matchActive)
    return SUBNETS[ROTATION.index];

  var elapsed = now - ROTATION.startTime;

  if (elapsed >= ROTATION.duration) {
    var jumps          = Math.floor(elapsed / ROTATION.duration);
    ROTATION.index     = (ROTATION.index + jumps) % SUBNETS.length;
    ROTATION.startTime = ROTATION.startTime + jumps * ROTATION.duration;
  }

  return SUBNETS[ROTATION.index];
}

function isIPInActiveSubnet(ipExpanded) {
  var subnet = getActiveSubnet();
  return matchIPv6Prefix(ipExpanded, subnet.prefix, subnet.len);
}

// ================= IPv4 NETWORK SEGMENT =================

function getIPv4Net16(ip) {
  var p = ip.split(".");
  return p[0] + "." + p[1];
}

// ================= IPv6 NETWORK SEGMENT =================

function getNet5(ip) {
  var p = ip.split(":");
  return p[0] + ":" + p[1] + ":" + p[2] + ":" + p[3] + ":" + p[4];
}

// ============================================================
//                    PUBG DOMAIN DETECTION
// ============================================================

function isPUBG(host) {
  host = host.toLowerCase();

  // العاب Tencent / Krafton
  if (host.indexOf("pubgmobile")      !== -1) return true;
  if (host.indexOf("pubg")            !== -1) return true;
  if (host.indexOf("tencent")         !== -1) return true;
  if (host.indexOf("krafton")         !== -1) return true;
  if (host.indexOf("levelinfinite")   !== -1) return true;
  if (host.indexOf("lightspeed")      !== -1) return true;
  if (host.indexOf("gpubgm")          !== -1) return true;
  if (host.indexOf("igamecj")         !== -1) return true;

  // خدمات السحابة
  if (host.indexOf("gcloud")          !== -1) return true;
  if (host.indexOf("qcloud")          !== -1) return true;
  if (host.indexOf("tmgcloud")        !== -1) return true;
  if (host.indexOf("mycloud")         !== -1) return true;

  // خدمات اجتماعية
  if (host.indexOf("sns")             !== -1) return true;
  if (host.indexOf("push")            !== -1) return true;

  // خدمات الدفع
  if (host.indexOf("midas")           !== -1) return true;
  if (host.indexOf("tlog")            !== -1) return true;
  if (host.indexOf("awspa")           !== -1) return true;

  // خدمات العاب
  if (host.indexOf("proximabeta")     !== -1) return true;
  if (host.indexOf("battlelab")       !== -1) return true;
  if (host.indexOf("gamefeed")        !== -1) return true;
  if (host.indexOf("gamemetrics")     !== -1) return true;
  if (host.indexOf("matchmaker")      !== -1) return true;
  if (host.indexOf("liveapi")         !== -1) return true;
  if (host.indexOf("gameapi")         !== -1) return true;

  return false;
}

// ============================================================
//          23 PUBG FUNCTION CATEGORIES
// ============================================================

// 1. الملف الشخصي
function isProfile(data) {
  return /profile|playerinfo|player\.info|player\.data|player\.detail|playerprofile|userprofile|userinfo|account\.info|account\.detail|account\.data|accountinfo|basicinfo|personinfo|portrait|avatar|frame|banner|title|badge|namecard|emblem|logo|nickname|username|displayname|level|exp|experience|rp|royalpass|season\.info|season\.data|rank\.info|rank\.data|tier|rating|mmr|stats|statistic|career|history|match\.history|battle\.history|combat\.data|report|overview|summary/i.test(data);
}

// 2. قائمة الأصدقاء
function isFriends(data) {
  return /friend|friendlist|friend\.list|friend\.info|friend\.data|friend\.request|friend\.accept|friend\.decline|friend\.reject|friend\.remove|friend\.delete|friend\.block|friend\.unblock|friend\.search|friend\.find|friend\.suggest|friend\.recommend|recent\.player|recent\.played|nearby\.player|nearby\.user|blacklist|blocklist|block\.list|ignore\.list|mute\.list/i.test(data);
}

// 3. إضافة صديق
function isAddFriend(data) {
  return /addfriend|add\.friend|friendadd|friend\.add|sendrequest|send\.request|follow|unfollow|subscribe|befriend|befriending|addbuddy|buddy\.add|addteammate|companion\.add/i.test(data);
}

// 4. البانر
function isBanner(data) {
  return /banner|frame|background|backdrop|theme|skin\.ui|ui\.skin|lobby\.bg|lobbybg|lobby\.background|lobby\.theme|lobbyframe|lobby\.frame|lobbybanner|lobby\.banner|profile\.banner|profile\.frame|nameplate|plate|border|outline|glow|effect\.ui|ui\.effect/i.test(data);
}

// 5. ساعات النشاط
function isOnlineHours(data) {
  return /online\.hours|onlinehours|active\.hours|activehours|play\.time|playtime|game\.time|gametime|session\.time|sessiontime|login\.time|logintime|last\.login|lastlogin|last\.online|lastonline|last\.seen|lastseen|last\.active|lastactive|presence|onlinestatus|online\.status|activity|usetime|usage\.time|daily\.time|dailytime|weekly\.time|weeklytime|hourly|timezone|time\.zone/i.test(data);
}

// 6. اللغة
function isLanguage(data) {
  return /language|lang|locale|localization|i18n|translation|translate|lang\.set|setlang|changelanguage|switchlang|multilingual|langpack|lang\.pack|lang\.data|lang\.list|lang\.option|lang\.config|lang\.settings|languagelist|language\.list|language\.option|language\.settings|language\.config/i.test(data);
}

// 7. الرتبة
function isTier(data) {
  return /tier|rank|rating|mmr|elo|division|league|grade|standing|position|leaderboard|leader|top\.player|top\.rank|toplist|rang|stufe|level\.info|level\.data|level\.up|levelup|leveling|progression|progress|milestone|achievement\.rank/i.test(data);
}

// 8. الجنس
function isGender(data) {
  return /gender|sex|male|female|character\.type|character\.gender|char\.gender|char\.sex|avatar\.gender|avatar\.sex|player\.gender|player\.sex|user\.gender|user\.sex|account\.gender|account\.sex|body\.type|bodytype|appearance\.gender|appearance\.sex/i.test(data);
}

// 9. الدعوات
function isInvite(data) {
  return /invite|invitation|invited|inviting|invite\.send|sendinvite|invite\.accept|acceptinvite|invite\.decline|declineinvite|invite\.cancel|cancelinvite|invite\.reject|rejectinvite|invite\.request|inviterequest|request\.invite|joinrequest|join\.request|asktojoin|ask\.join|apply|application|recruit|recruiting|recruitment|hiring|lookingfor|lfg|lfm|lft|lfs/i.test(data);
}

// 10. الفريق
function isTeam(data) {
  return /team|squad|party|group|platoon|squad\.info|squad\.data|squad\.list|squad\.member|squad\.create|squad\.join|squad\.leave|squad\.kick|squad\.disband|squad\.invite|squad\.chat|party\.info|party\.data|party\.list|party\.member|party\.create|party\.join|party\.leave|party\.kick|party\.disband|party\.invite|team\.info|team\.data|team\.list|team\.member|team\.create|team\.join|team\.leave|team\.kick|team\.disband|team\.invite|team\.slot|slot|member\.list|memberlist|roster|lineup|formation/i.test(data);
}

// 11. الشات
function isChat(data) {
  return /chat|msg|message|messaging|conversation|inbox|outbox|sendmsg|send\.message|msg\.send|message\.send|recvmsg|recv\.message|msg\.recv|message\.recv|msg\.list|msg\.history|chat\.history|chat\.list|chat\.room|chatroom|chat\.channel|chatchannel|whisper|direct\.message|dm|pm|privatemsg|private\.msg|team\.chat|squad\.chat|all\.chat|voice\.chat|voicemsg|voice\.message|emote|emoji|sticker|quickchat|quick\.chat|canned|preset\.msg|autoreply|auto\.reply/i.test(data);
}

// 12. الكلان
function isClan(data) {
  return /clan|guild|crew|faction|alliance|clan\.info|clan\.data|clan\.list|clan\.member|clan\.create|clan\.join|clan\.leave|clan\.kick|clan\.disband|clan\.invite|clan\.chat|clan\.war|clan\.rank|clan\.level|clan\.exp|clan\.shop|clan\.event|clan\.mission|clan\.badge|clan\.banner|clan\.emblem|clan\.log|guild\.info|guild\.data|guild\.list|guild\.member|guild\.create|guild\.join|guild\.leave|guild\.kick/i.test(data);
}

// 13. المتجر
function isStore(data) {
  return /store|shop|purchase|buy|buying|cart|checkout|payment|pay|billing|subscribe|subscription|recharge|topup|top\.up|diamond|diamonds|uc|unknown\.cash|silver|coin|coins|gold|coupon|voucher|redeem|redeemcode|redeem\.code|giftcode|gift\.code|promo|promo\.code|promo\.offer|offer|bundle|pack|crate|supply|supply\.crate|premium\.crate|classic\.crate|special\.crate|lucky\.spin|spin|wheel|gacha|draw|scratch|lottery|royale\.pass|rp|rp\.purchase|rp\.mission|rp\.reward|elite|elite\.pass|plus\.pass/i.test(data);
}

// 14. الأحداث
function isEvents(data) {
  return /event|events|mission|missions|quest|quests|task|tasks|challenge|challenges|achievement|achievements|daily|daily\.mission|daily\.task|daily\.quest|daily\.challenge|weekly|weekly\.mission|weekly\.task|weekly\.quest|weekly\.challenge|season\.mission|season\.task|season\.quest|season\.challenge|special\.event|special\.mission|limited|limited\.time|timed\.event|seasonal|seasonal\.event|bonus|bonus\.event|reward|rewards|claim|redeem\.reward|collect\.reward|milestone|progression|progress|battlepass|battle\.pass/i.test(data);
}

// 15. الإعدادات
function isSettings(data) {
  return /settings|setting|config|configuration|option|options|preference|preferences|sensitivity|control|controls|layout|hud|graphic|graphics|audio|sound|voice|display|screen|resolution|fps|quality|customize|customization|custom\.match|custom\.room|room\.create|room\.join|room\.info|room\.data|room\.list|room\.settings|room\.config|create\.room|join\.room/i.test(data);
}

// 16. التحديث
function isUpdate(data) {
  return /update|patch|download|cdn|version|ver\.check|version\.check|hotfix|hotfixes|maintenance|announce|announcement|news|notice|notices|bulletin|bulletins|info\.notice|push\.notice|system\.notice|important\.notice|patch\.notes|update\.notes|changelog|change\.log|release\.notes/i.test(data);
}

// 17. الإشعارات
function isNotification(data) {
  return /notify|notification|notifications|alert|alerts|notice|push\.notice|push\.alert|push\.notify|badge\.count|unread|un\.read|bell|inbox\.count|msg\.count|mail|mailbox|mail\.box|mail\.list|mail\.read|mail\.claim|mail\.delete|mail\.send|gift\.mail|system\.mail|event\.mail|reward\.mail/i.test(data);
}

// 18. البث
function isStream(data) {
  return /stream|streaming|streamer|broadcast|watch|spectate|spectator|replay|highlight|clip|video|recording|record|live|livestream|live\.stream|esports|tournament|competitive/i.test(data);
}

// 19. السيرفر
function isRegion(data) {
  return /server|region|area|zone|location|server\.list|server\.info|server\.data|server\.select|server\.change|switch\.server|change\.server|server\.status|ping\.check|ping\.test|latency|network\.test|connection\.test|server\.ping/i.test(data);
}

// 20. البحث
function isSearch(data) {
  return /search|find|lookup|query|search\.player|player\.search|search\.user|user\.search|search\.friend|friend\.search|search\.team|team\.search|search\.clan|clan\.search|search\.room|room\.search|search\.match|match\.search|discover|browse|recommend|suggestion|suggest|nearby|global\.search|world\.search/i.test(data);
}

// 21. السكنات
function isOutfit(data) {
  return /outfit|skin|skins|cosmetic|cosmetics|wardrobe|closet|inventory|items|item\.list|item\.data|item\.info|equip|equipment|equip\.item|unequip|wear|wearable|clothing|dress|hat|helmet|backpack|parachute|pan|gun\.skin|weapon\.skin|vehicle\.skin|vehicle\.customize|emote|emotes|gesture|gestures|dance|dances|pose|poses|spray|sprays|spraypaint|finish|finishing\.move|crate\.item|supply\.item|set\.item|collection|collect/i.test(data);
}

// 22. الأصدقاء المقترحين
function isSuggested(data) {
  return /suggest|suggested|recommend|recommended|people\.you\.may\.know|may\.know|mutual|mutual\.friend|contacts|contact|sync|sync\.contact|import\.contact|phone\.contact|facebook\.friend|google\.friend|apple\.friend|social\.connect|social\.bind|social\.link|bind|bindaccount|linkaccount|connect\.account/i.test(data);
}

// 23. التقييم
function isRateReport(data) {
  return /rate|rating|like|likes|thumbs|upvote|downvote|vote|report|flag|complain|complaint|feedback|review|reviews|survey|like\.player|rate\.player|report\.player|feedback\.submit|report\.submit|abuse|harass|cheating\.report|toxic|penalty|sanction|punish|ban|restrict|violation/i.test(data);
}

// ============================================================
//              MATCH DETECTION (مقفل)
// ============================================================

function isMatch(data) {
  return /match\.|matchmaking|matchmake|matching|queue\.match|match\.queue|match\.start|match\.end|match\.finish|match\.result|match\.reward|battle\.|battlefield|battlehost|classic\.|ranked\.|arena\.|tdm\.|royale\.|war\.|payload\.|metro\.|zombie\.|zombiemode|gamesvr|game\.server|relay\.|combat\.|survival\.|spectate\.|gameplay\.|ingame\.|deathcam|killcam|parachute\.land|airdrop\.|loot\.|pick\.up|pickup|drop\.item|dropitem|equip\.gun|reload\.gun|shoot\.gun|aim\.gun|scope\.gun|heal\.|revive\.|knock|knocked|crouch|prone|crawl|swim|drive|vehicle\.drive|enter\.vehicle|exit\.vehicle|gas\.zone|bluezone|safezone|playzone|circle\.shrink|alive\.count|kill\.count|killfeed|kill\.feed|kill\.log|damage\.log|loot\.box|airdrop|supply\.drop|flaredrop|carepackage/i.test(data);
}

// ============================================================
//                     MAIN ENGINE
// ============================================================

function FindProxyForURL(url, host) {

  // تجاهل النطاقات المحلية
  if (isPlainHostName(host))
    return DIRECT;

  // فقط PUBG
  if (!isPUBG(host))
    return DIRECT;

  // حل اسم المضيف
  var ip = dnsResolve(host);

  if (!ip)
    return PROXY;

  var data  = (host + url).toLowerCase();
  var match = isMatch(data);

  // ==========================================================
  //  IPv4: كل شي يمر عبر البروكسي الأردني
  //  dnsResolve يرجع IPv4 دائماً — لا نحظره!
  // ==========================================================
  if (!isIPv6(ip)) {

    // قفل الماتش على شبكة IPv4 واحدة (/16)
    if (match) {
      var net16 = getIPv4Net16(ip);

      if (!SESSION.matchNet) {
        SESSION.matchNet    = net16;
        SESSION.matchActive = true;
      }

      if (net16 !== SESSION.matchNet)
        return BLOCK;

      return PROXY;
    }

    // خروج من الماتش
    if (SESSION.matchActive) {
      SESSION.matchNet    = null;
      SESSION.matchActive = false;
    }

    // كل شي ثاني (لובי / تجنيد / دعوات / بروفايل) = حراً
    return PROXY;
  }

  // ==========================================================
  //  IPv6: دوران + قفل الماتش
  // ==========================================================
  var fullIP = expandIPv6(ip);

  // فلترة: النطاق النشط فقط
  if (!isIPInActiveSubnet(fullIP))
    return BLOCK;

  // قفل الماتش على شبكة IPv6 واحدة (net5)
  if (match) {
    var net5 = getNet5(fullIP);

    if (!SESSION.matchNet) {
      SESSION.matchNet    = net5;
      SESSION.matchActive = true;
    }

    if (net5 !== SESSION.matchNet)
      return BLOCK;

    return PROXY;
  }

  // خروج من الماتش
  if (SESSION.matchActive) {
    SESSION.matchNet    = null;
    SESSION.matchActive = false;
  }

  return PROXY;
}
