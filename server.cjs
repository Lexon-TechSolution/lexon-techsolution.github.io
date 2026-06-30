var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_vite = require("vite");
var import_path = __toESM(require("path"), 1);
var import_url = require("url");
var import_genai = require("@google/genai");
var import_app = require("firebase-admin/app");
var import_auth = require("firebase-admin/auth");
var import_app2 = require("firebase/app");
var import_firestore = require("firebase/firestore");
var import_fs = __toESM(require("fs"), 1);
var import_meta = {};
var __filename = (0, import_url.fileURLToPath)(import_meta.url);
var __dirname = import_path.default.dirname(__filename);
var configPath = import_path.default.resolve(__dirname, "./firebase-applet-config.json");
var firebaseConfig = JSON.parse(import_fs.default.readFileSync(configPath, "utf8"));
var adminApp = (0, import_app.getApps)().length === 0 ? (0, import_app.initializeApp)({ projectId: firebaseConfig.projectId }) : (0, import_app.getApp)();
var webApp = (0, import_app2.initializeApp)(firebaseConfig);
var db = (0, import_firestore.getFirestore)(webApp, firebaseConfig.firestoreDatabaseId);
async function verifyAdmin(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: Missing Authorization header" });
    }
    const idToken = authHeader.split("Bearer ")[1];
    const decodedToken = await (0, import_auth.getAuth)().verifyIdToken(idToken);
    if (!decodedToken.uid) {
      return res.status(403).json({ error: "Forbidden: Invalid credentials" });
    }
    req.user = decodedToken;
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(403).json({ error: "Forbidden: " + err.message });
  }
}
function getLocalInteractiveResponse(message, clicks = [], currentUrl = "") {
  const msg = message.toLowerCase();
  const lastClick = clicks.length > 0 ? clicks[clicks.length - 1] : "";
  const clickedInfo = clicks.length > 0 ? `

*(Kutokana na historia yako kwenye tovuti yetu, naona ulitazama: **"${clicks.slice(-3).join(" \u2192 ")}"**)*` : "";
  let header = `\u2728 **eMinistry Platform AI**

`;
  if (msg.includes("sadaka") || msg.includes("mchango") || msg.includes("michango") || msg.includes("tithing") || msg.includes("giving") || msg.includes("fedha") || msg.includes("selcom") || msg.includes("malipo") || msg.includes("mshahara") || msg.includes("pesa")) {
    return header + `Habari! Kuhusu **Mifumo ya Sadaka na Michango ya Kidijitali (eSadaka & Tithing)**:
nchini Tanzania, parishi na makanisa mengi yanakabiliwa na changamoto ya usimamizi na usalama wa michango. eMinistry inatatua hili kupitia:

1. **Selcom & Pop-up Integration**: Waumini wanaweza kutoa michango, sadaka, na zaka kwa kutumia mitandao yote ya simu kwa urahisi kabisa (M-Pesa, Tigo Pesa, Airtel Money, HaloPesa) kwa ushirikiano bora kabisa na Selcom.
2. **Instant Receipt via SMS (Next SMS)**: Kila muumini anapotoa sadaka au zaka, anapokea ujumbe mfupi wa SMS wa kumshukuru mara moja: *"Mpendwa Muumini, Sadaka yako ya Tsh X imepokelewa heri na baraka kwako."*
3. **Ledger System**: Mtunza hazina anapata ripoti safi za kifedha ambazo zinajazwa kiotomatiki wakati malipo yanapofanyika (real-time reconciliation).

Je, ungependa tuweke mfumo huu kwenye diocese au parishi yako? Tafadhali wasiliana nasi moja kwa moja kwa kupiga simu **+255 621 887 100**! ${clickedInfo}`;
  }
  if (msg.includes("necta") || msg.includes("calculation") || msg.includes("shule") || msg.includes("grade") || msg.includes("auto") || msg.includes("marks") || msg.includes("ripoti") || msg.includes("mwanzo") || msg.includes("matokeo") || msg.includes("shuleni")) {
    return header + `Karibu! **NECTA Auto-Calculations & Management Information System**:
Mifumo yetu ya elimu mashuleni (MSSIS na IMS) imeundwa mahususi kurahisisha kazi za walimu kwa kuondoa hesabu zote za mikono wakati wa kuandaa ripoti za mitihani na viwango vya NECTA:

* \u{1F4CA} **Auto-Grade Engine**: Unaingiza alama (marks) za wanafunzi mara moja tu, na mfumo wetu unapiga hesabu zote za GPA, madaraja (Division I to IV), na nafasi (positioning) kiotomatiki kwa kufuata viwango vyote vya hivi karibuni vya NECTA nchini Tanzania.
* \u{1F4DD} **Automatic Report Cards**: Inazalisha kadi za ripoti (report cards) na kupanga matokeo (grades layout) kwa kila darasa kwa sekunde moja tu.
* \u{1F4AC} **Automated Parent SMS**: Mfumo unamtumia kila mzazi SMS ya matokeo ya mwanafunzi kiotomatiki jopo la walimu likishaidhinisha.

Mifumo yetu inatumika kuanzia shule za awali hadi za sekondari. Ungependa kuona demo ya mfumo huu mashuleni kwenu? Wasiliana nasi kupitia ukurasa wetu wa **Contact Us** au tupigie simu **+255 621 887 100**! ${clickedInfo}`;
  }
  if (msg.includes("sms") || msg.includes("next") || msg.includes("ujumbe") || msg.includes("broadcast") || msg.includes("bulk") || msg.includes("nextsms")) {
    return header + `Habari yako! Kuhusu mfumo wetu wa **Next SMS**:
Next SMS ni uti wa mgongo wa mawasiliano wa eMinistry Platform. Inakusaidia kuwa karibu na waumini wako au wazazi kila wakati:

* \u{1F4F1} **Bulk SMS Campaign**: Tuma matangazo ya jumuiya, ratiba za ibada, michango ya ujenzi, au sala za siku kwa waumini wote kwa kubofya mara moja tu.
* \u{1F514} **Auto-Reminders**: Mfumo unakumbusha waumini kiotomatiki kuhusu vikao vya jumuiya, ratiba za ibada, au ahadi za maendeleo ya kanisa.
* \u{1F512} **Dar es Salaam Local Operator Gateway**: Connection imara yenye speed kubwa kwa ushirikiano na makampuni ya mawasiliano nchini Tanzania (TCRA certified).

Je, ungetaka kujumuisha mifumo yetu ya SMS kwenye taasisi yako leo? Tupigie **+255 621 887 100** na timu yetu ya Dar es Salaam itakusaidia mara moja! ${clickedInfo}`;
  }
  if (msg.includes("pastor") || msg.includes("hans") || msg.includes("worship") || msg.includes("ibada") || msg.includes("church") || msg.includes("kanisa") || msg.includes("grace") || msg.includes("glory") || msg.includes("chanika") || msg.includes("zingiziwa")) {
    return header + `Spiritual Guidance kwa **Grace & Glory TAG Church (Tanzania)**:
Ibada zetu zote zinaongozwa na mlezi wetu wa kiroho **Mtumishi Pastor Hans** na waalimu wa kwaya zetu:

* \u26EA **Location**: Chanika Zingiziwa, Dar es Salaam, Tanzania.
* \u231A **Time**: Kila siku ya **Jumapili kuanzia saa 02:00 ASBH** (Sunday Worship Mass).
* \u{1F4DC} **Theme yetu ya Kiroho**: *Faith in Action*. Tunaamini kuwa imani bila matendo imekufa!
* \u{1F4DE} **Direct Contact**: Unaweza kuongea na Pastor Hans au kupata mwongozo wa kiroho moja kwa moja kwa kupiga simu **+255 621 887 100**. Unakaribishwa sana, wote mnakaribishwa (All Are Welcome).

Je, una swali lingine kuhusu ibada zetu au unahitaji maombi? Tupo hapa kukusaidia! ${clickedInfo}`;
  }
  if (msg.includes("lexon") || msg.includes("team") || msg.includes("saidi") || msg.includes("mohamed") || msg.includes("gaston") || msg.includes("ceo") || msg.includes("developers") || msg.includes("ushindi") || msg.includes("tujenge")) {
    return header + `Habari! Kuhusu **Lexon Digital Suite & Developers Team**:
Sisi ni timu imara ya wahandisi wa programu (developers) wenye makazi yetu jijini **Dar es Salaam, Tanzania**. Lengo letu kuu ni **"Tujenge Ushindi Mmoja"**:

* \u{1F4BB} Tunajenga mifumo madhubuti ya ERP, micro-ledger, tovuti za parishi na shule, na mifumo ya SMS nchini kote.
* \u{1F680} Core Developer wetu ni **Saidi Mohamed Saidi**, unaweza kuwasiliana naye kwa barua pepe: **saidimohamedisaidi7@gmail.com** kwa makubaliano ya kibiashara, ushirikiano, ama joint capital projects.
* \u{1F91D} Tunamiliki na kuendesha miradi ya pamoja katika nchi za Afrika Mashariki (East Africa Venture Capital Collaboration).

Kama una wazo kubwa la kibiashara, we are open and let's collaborate! ${clickedInfo}`;
  }
  if (msg.includes("pricing") || msg.includes("bei") || msg.includes("gharama") || msg.includes("cost") || msg.includes("free")) {
    return header + `Safi! Kuhusu **Pricing & Packages za eMinistry Platform**:
Tunatoa gharama rafiki sana kulingana na mahitaji ya parishi, diocese au taasisi yako ya elimu:

1. **Parish/Congregant Hub**: Gharama rahisi inayojumuisha congregant ledger, kadi za kidijitali za kutoa sadaka ya ujenzi, na kadi za ripoti.
2. **Next SMS Solution**: Unalipia tu idadi ya meseji unazotuma (Pay-as-you-go kwa kiwango cha chini kabisa nchini Tanzania).
3. **NECTA Auto-Calculation Engine**: Leseni ya kila mwaka inayotegemea idadi ya wanafunzi shuleni, ikiwemo uandaaji wa ripoti na mafunzo kwa walimu wote.

Tafadhali jaza fomu ya mawasiliano kwenye ukurasa wa **Contact Us** au tupigie kwa simu **+255 621 887 100** ili tukupatie nukuu mahususi (custom quote) ya bei kwa ajili ya taasisi yako! ${clickedInfo}`;
  }
  if (msg.includes("contact") || msg.includes("piga") || msg.includes("simu") || msg.includes("mawasiliano") || msg.includes("namba") || msg.includes("phone") || msg.includes("email") || msg.includes("barua") || msg.includes("pepe")) {
    return header + `Mambo! Unaweza kuwasiliana na timu yetu ya **eMinistry Tanzania** kwa urahisi kabisa:

* \u{1F4DE} **Piga Simu**: **+255 621 887 100** (Direct Line ya Huduma kwa Wateja na Ushauri wa Mifumo).
* \u2709\uFE0F **Barua Pepe (CEO)**: **saidimohamedisaidi7@gmail.com** (Saidi Mohamed Saidi).
* \u26EA **Ofisi & Ibada**: Chanika Zingiziwa, Dar es Salaam.
* \u{1F4DD} **Fomu ya Tovuti**: Unaweza kwenda kwenye page ya **Contact** na ukaandika huduma unayovutiwa nayo nayo, na tutakupigia simu ndani ya saa 2!

Tuko hapa kuhakikisha huduma zako zote zinaendeshwa kidijitali kwa ulinzi mkubwa! ${clickedInfo}`;
  }
  let clickContextTopic = "";
  if (lastClick) {
    if (lastClick.toLowerCase().includes("service") || lastClick.toLowerCase().includes("portfolio")) {
      clickContextTopic = `huduma zetu za kiwango cha juu za parishi, shule na biashara nchini Tanzania`;
    } else if (lastClick.toLowerCase().includes("pricing") || lastClick.toLowerCase().includes("bei")) {
      clickContextTopic = `gharama zetu rafiki za kuunganisha tithing, NECTA grading na SMS`;
    } else if (lastClick.toLowerCase().includes("project") || lastClick.toLowerCase().includes("shughuli")) {
      clickContextTopic = `miradi yetu mikubwa ya miaka ya hivi karibuni kote Afrika Mashariki`;
    } else if (lastClick.toLowerCase().includes("contact") || lastClick.toLowerCase().includes("us")) {
      clickContextTopic = `jinsi ya kuanza kuandikisha parishi yako leo kwenye fomu yetu`;
    } else {
      clickContextTopic = `huduma ya "${lastClick}"`;
    }
  }
  const welcomeLines = clickContextTopic ? `Naona umekuwa ukiangalia hususani **${clickContextTopic}**. Hilo ni chaguo safi sana! 

Je, ungependa nikupe maelezo ya kina jinsi tunavyoweza kuweka mfumo huo wa **Sadaka za Kidijitali (Selcom)**, **NECTA Auto-Calculations (kwa shule)**, au **Next SMS (kwa kutoa taarifa)** kwenye taasisi yako?` : `Mimi ni eMinistry Platform AI na niko kushirikiana nawe kila wakati. Tunawezesha makanisa na shule kote nchini Tanzania na Afrika Mashariki kuondokana na madaftari ya mikono na kuhamia kwenye mifumo imara ya kidijitali. 

Unaweza kuniuliza kuhusu:
1. **Sadaka za Kidijital (Selcom Integration)**
2. **NECTA Auto-Calculations & School Reports**
3. **Next SMS (Bulk Messaging nchini Tanzania)**
4. **Mtumishi Pastor Hans na Ibada za Grace & Glory (T)**`;
  return header + `Habari yako! Karibu kwenye eMinistry Platform chat. 

${welcomeLines}

Tafadhali jisikie huru kuuliza swali lolote, au unaweza kutupigia simu moja kwa moja kwa **+255 621 887 100** kama unahitaji huduma ya haraka!`;
}
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  const isDev = process.env.NODE_ENV !== "production" || !__filename.includes("dist");
  console.log(`[Server] Starting in ${isDev ? "DEVELOPMENT" : "PRODUCTION"} mode`);
  console.log(`[Server] __filename: ${__filename}`);
  console.log(`[Server] NODE_ENV: ${process.env.NODE_ENV}`);
  app.use(import_express.default.json());
  if (!isDev) {
    app.use("/src/assets/images", import_express.default.static(import_path.default.join(process.cwd(), "src/assets/images")));
    app.use("/assets/images", import_express.default.static(import_path.default.join(process.cwd(), "src/assets/images")));
  }
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });
  const seedInitialBlogPosts = async () => {
    try {
      const checkPost = await (0, import_firestore.getDocs)((0, import_firestore.query)((0, import_firestore.collection)(db, "blog_posts"), (0, import_firestore.where)("slug", "==", "kubadilisha-taasisi-kidijitali-tanzania"), (0, import_firestore.limit)(1)));
      if (checkPost.empty) {
        console.log("Seeding fresh high-quality Swahili blog posts in Firestore...");
        const allPosts = await (0, import_firestore.getDocs)((0, import_firestore.collection)(db, "blog_posts"));
        const batch = (0, import_firestore.writeBatch)(db);
        allPosts.docs.forEach((d) => {
          batch.delete(d.ref);
        });
        await batch.commit();
        const initialData = [
          {
            title: "Njia 3 Bora za Kubadilisha Taasisi Yako Kuwa ya Kidijitali nchini Tanzania: Mwongozo wa Lexon Tech Solutions",
            slug: "kubadilisha-taasisi-kidijitali-tanzania",
            date: (/* @__PURE__ */ new Date()).toISOString(),
            coverImage: "/src/assets/images/lexon_africa_hero_1781473586403.jpg",
            excerpt: "Fahamu jinsi mifumo yetu mitatu mikuu\u2014MSSIS, eMinistry, na Lexon ERP\u2014inavyosaidia shule, makanisa, na biashara nchini Tanzania kurahisisha kazi na kuongeza ufanisi wa 100%.",
            content: "Ulimwengu wa sasa unakwenda kasi sana kiteknolojia, na nchini Tanzania, taasisi na biashara nyingi zinatambua umuhimu wa kuacha matumizi ya karatasi na kalamu (manual bookkeeping) na kuanza kutumia mifumo ya kidijitali. Lexon Tech Solutions Co. Ltd inayo furaha kukuletea mifumo mitatu mikuu ambayo imebuniwa mahususi kurahisisha utendaji kazi, kuongeza uwazi, na kuleta ufanisi wa hali ya juu.\n\nKatika makala hii, tutaangazia nguzo tatu kuu za kidijitali zitakazosaidia kubadilisha taasisi yako leo:\n\n### 1. Mfumo wa Usimamizi wa Shule wa MSSIS (Lexon School Systems)\nUendeshaji wa shule unahitaji umakini mkubwa kuanzia uandikishaji wa wanafunzi, uingizaji wa alama, hadi mawasiliano na wazazi. **MSSIS** ni suluhisho thabiti linaloruhusu walimu kufanya mambo yafuatayo kwa mbofyo mmoja:\n*   **Grading ya NECTA Otomatiki**: Mfumo unakokotoa alama, madaraja (Division I-IV), GPA, na nafasi ya mwanafunzi kiotomatiki bila makosa ya kibinadamu.\n*   **Ripoti za Kidijitali za Kila Muhula**: Kuzalisha kadi za ripoti kwa sekunde chache na kuzituma kwa wazazi.\n*   **Mawasiliano ya SMS kwa Wazazi (Next SMS)**: Wazazi wanapokea ujumbe mfupi wa matokeo na mahudhurio ya watoto wao moja kwa moja kwenye simu zao za mkononi.\n\n### 2. Mfumo wa eMinistry Church Suite (lexonchurch.com)\nMakanisa na taasisi za kidini zinakabiliwa na changamoto ya usimamizi wa waumini na michango ya fedha. **eMinistry** inaleta mapinduzi ya kidijitali parishini kwako:\n*   **Kadi za Kidijitali zenye QR Code**: Waumini wanapata vitambulisho vya kielektroniki vinavyowasaidia kusajili mahudhurio na kutoa michango kwa haraka.\n*   **Ukusanyaji wa Sadaka na Zaka kwa Selcom**: Waumini wanaweza kutoa sadaka kupitia mitandao yote ya simu nchini Tanzania (M-Pesa, Tigo Pesa, Airtel Money, HaloPesa) na fedha kuingia moja kwa moja kwenye akaunti ya parishi.\n*   **SMS za Shukrani za Papo kwa Papo**: Muumini anapata SMS ya shukrani papo hapo anapotoa mchango wake, na kuongeza uwazi na uaminifu.\n\n### 3. Mfumo wa Lexon Retail ERP & Stock Accounting\nKwa wafanyabiashara, supermarkets, na famasi, usimamizi wa bidhaa zilizopo (inventory) na mauzo ya kila siku ndio uhai wa biashara. **Lexon Retail ERP** inasaidia:\n*   **POS na Barcode Hardware API**: Uuzaji wa haraka kwa kuscan bidhaa and kutoa risiti sahihi.\n*   **Ufuatiliaji wa Stoo na Bidhaa Zinazoisha Muda**: Mfumo unakupa taarifa mapema bidhaa fulani inapoisha au inapokaribia muda wa kuharibika (expiration tracking).\n*   **Ripoti za Fedha (Profit & Loss)**: Ukokotoaji wa faida na hasara kwa kila tawi, na kudhibiti miamala yote ya kifedha kwa usahihi wa 99.9%.\n\nKama upo tayari kuleta mageuzi haya kwenye taasisi au biashara yako, wasiliana na wataalamu wetu wa Lexon Tech Solutions leo kupitia ukurasa wetu wa mawasiliano au tupigie simu moja kwa moja kupitia **+255 621 887 100**!"
          },
          {
            title: "Usimamizi wa Shule wa Kidijitali: Jinsi Mfumo wa MSSIS Unavyookoa Zaidi ya Masaa 20 ya Kazi ya Walimu kila Juma",
            slug: "usimamizi-wa-shule-kidijitali-mssis",
            date: new Date(Date.now() - 864e5).toISOString(),
            coverImage: "/src/assets/images/lexon_school_dashboard_1781473641711.jpg",
            excerpt: "Walimu wanatumia muda mwingi kupiga hesabu za ripoti za wanafunzi kwa mkono nchini Tanzania. Fahamu jinsi mfumo wa MSSIS unavyoondoa mzigo huo na kuongeza ufanisi wa 100%.",
            content: "Kazi ya mwalimu nchini Tanzania imekuwa na changamoto nyingi, ikiwemo mzigo mkubwa wa kiutawala (administrative workload) wakati wa mitihani. Walimu hutumia masaa mengi, nyakati zingine hata usiku kucha, kupiga hesabu za darasa, kutafuta GPA, kupanga madaraja ya NECTA, na kujaza ripoti za karatasi kwa kila mwanafunzi. \n\nHapa ndipo **MSSIS School Management System** inapokuja kusaidia na kuondoa kabisa mzigo huu.\n\n### Nini Maana ya MSSIS?\nMSSIS ni mfumo wa kisasa wa wingu (cloud system) ulioundwa kurahisisha uendeshaji mzima wa shule kuanzia za awali hadi sekondari nchini Tanzania. \n\n### Sifa Kuu za Mfumo Huu Zinazookoa Muda wa Walimu:\n\n1. **Ukokotoaji wa Alama wa Papo kwa Papo (Auto-Grading)**\nMwalimu anahitaji tu kuingiza alama (marks) za somo mara moja kwenye mfumo. Mfumo unajua sheria zote za NECTA na unakokotoa kiotomatiki:\n*   Madaraja (Division I hadi IV, au A hadi F)\n*   Wastani na Nafasi ya kila mwanafunzi darasani (Position)\n*   GPA ya kila darasa na somo\n\n2. **Kuzalisha Report Cards kwa Sekunde Chache**\nMuda wa kuandika kadi za ripoti kwa mkono umepitwa na wakati. Ukiwa na MSSIS, unaweza kupakua ripoti za darasa zima zikiwa zimekamilika kwa kubofya kitufe kimoja tu. Ripoti hizi zinaambatana na maoni ya mwalimu ya kiotomatiki kulingana na ufaulu wa mwanafunzi.\n\n3. **Mfumo wa Next SMS kwa Wazazi**\nBadala ya kusubiri hadi mwisho wa muhula au kuwapa wanafunzi ripoti za karatasi ambazo zinaweza kupotea njiani, mfumo unamtumia mzazi ujumbe mfupi (SMS) wenye matokeo ya mwanafunzi mara tu matokeo yanapoidhinishwa na uongozi wa shule. Hili linaongeza ushirikiano bora kati ya shule na wazazi.\n\n4. **Usimamizi wa Ada na Malipo**\nMSSIS also ina sehemu ya uhasibu inayorekodi ada zote zilizolipwa na kila mwanafunzi, kutoa risiti za kidijitali, na kutuma arifa za SMS kiotomatiki kwa wazazi wenye madeni.\n\n### Jiunge na Shule za Kidijitali Tanzania Leo!\nKuwa shule ya mfano nchini kwa kuacha mbinu za kizamani. Wasiliana na Lexon Tech Solutions leo kwa simu **+255 621 887 100** au utume ujumbe kwenye ukurasa wetu wa **Contact Us** au kupiga WhatsApp ili tukupatie Demo ya bure!"
          },
          {
            title: "Usimamizi wa Fedha za Kanisa: Jinsi ya Kutumia Mfumo wa eMinistry Kuongeza Uwazi na Kukusanya Sadaka kwa Selcom",
            slug: "usimamizi-wa-fedha-za-kanisa-eministry",
            date: new Date(Date.now() - 1728e5).toISOString(),
            coverImage: "/src/assets/images/lexon_church_poster_1782554597194.jpg",
            excerpt: "Makanisa mengi yanapoteza muda na usahihi kwenye usimamizi wa michango na sadaka za kaimu. Jifunze jinsi mfumo wa eMinistry unavyounganisha sadaka ya simu kwa njia salama kabisa.",
            content: 'Katika karne hii ya 21, huduma za kanisa na usimamizi wa waumini zinahitaji kuendeshwa kwa weledi, urahisi, na uwazi mkubwa. Changamoto kubwa inayoyakabili makanisa mengi nchini Tanzania ni njia za ukusanyaji na usimamizi wa sadaka, zaka, na michango ya ujenzi. Matumizi ya madaftari ya mikono na kuhesabu fedha taslimu baada ya ibada mara nyingi huleta ucheleweshaji na uwezekano wa makosa ya kiuhasibu.\n\nMfumo wa **eMinistry Church Suite (lexonchurch.com)** umezaliwa kutatua changamoto hizi zote na kuleta amani ya kiroho na kiutawala.\n\n### Jinsi eMinistry Inavyobadilisha Uhasibu wa Kanisa Lako:\n\n1. **Ushirikiano Bora na Selcom Mobile Money**\nKupitia eMinistry, waumini wanaweza kutoa sadaka zao, zaka, au michango maalum kwa kutumia simu zao za mkononi kupitia huduma zote kuu za kifedha (M-Pesa, Tigo Pesa, Airtel Money, HaloPesa). Miamala yote inachakatwa kwa ushirikiano na Selcom and kuingia moja kwa moja kwenye akaunti ya benki ya kanisa. Hii inapunguza hatari ya kubeba fedha taslimu (cash handling risks).\n\n2. **Ujumbe wa Shukrani wa Papo kwa Papo (Next SMS)**\nKiga mara muumini anapotoa sadaka au zaka yake kwa kutumia mfumo, mfumo unamtumia ujumbe wa SMS wa shukrani papo hapo: *"Mpendwa Muumini, Sadaka yako ya Tsh 20,000 imepokelewa kwa usalama. Ubarikiwe sana."* Hii inajenga uaminifu mkubwa na uwazi kati ya waumini na viongozi wa kanisa.\n\n3. **Vitambulisho vya Kidijitali vyenye QR Code**\nUkiwa na eMinistry, kila muumini anaweza kupewa kitambulisho cha kidijitali (Digital ID Card) chenye QR Code yake binafsi. Wakati wa ibada, semina, au mikutano ya jumuiya, viongozi wanaweza kuscan QR Code hizi kwa haraka kurekodi mahudhurio au kusajili mchango wa muumini.\n\n4. **Ripoti za Kichungaji na Kitakwimu**\nMchungaji au Askofu anaweza kuona takwimu zote za kanisa lake kwa mbofyo mmoja:\n*   Idadi kamili ya waumini waliosajiliwa na familia zao.\n*   Ukuaji wa kiroho kupitia mahudhurio ya jumuiya.\n*   Ripoti safi ya mapato na matumizi ya kanisa kwa kila mwezi, jambo linalofanya vikao vya kamati ya fedha kuwa rahisi sana.\n\n### Anza Kutumia eMinistry Leo!\nMakanisa mengi, Majimbo na Parishi nchini Tanzania yameanza kuona matunda ya kidijitali kupitia eMinistry. Usibaki nyuma! Wasiliana nasi leo kwa simu **+255 621 887 100** au jaza fomu yetu ya mawasiliano ili uanze safari yako ya kidijitali.'
          }
        ];
        for (const post of initialData) {
          await (0, import_firestore.addDoc)((0, import_firestore.collection)(db, "blog_posts"), post);
        }
        console.log("Fresh Swahili seeding completed successfully.");
      }
    } catch (err) {
      console.warn("Could not seed database:", err);
    }
  };
  app.get("/api/blog_posts", async (req, res) => {
    try {
      await seedInitialBlogPosts();
      const snapshot = await (0, import_firestore.getDocs)((0, import_firestore.query)((0, import_firestore.collection)(db, "blog_posts"), (0, import_firestore.orderBy)("date", "desc")));
      const posts = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      res.json(posts);
    } catch (err) {
      console.error("Failed to fetch blog posts:", err);
      res.status(500).json({ error: err.message });
    }
  });
  app.get("/api/blog_posts/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const snapshot = await (0, import_firestore.getDocs)((0, import_firestore.query)((0, import_firestore.collection)(db, "blog_posts"), (0, import_firestore.where)("slug", "==", slug), (0, import_firestore.limit)(1)));
      if (snapshot.empty) {
        return res.status(404).json({ error: "Post not found" });
      }
      const d = snapshot.docs[0];
      res.json({ id: d.id, ...d.data() });
    } catch (err) {
      console.error("Failed to fetch blog post:", err);
      res.status(500).json({ error: err.message });
    }
  });
  app.post("/api/blog_posts", verifyAdmin, async (req, res) => {
    try {
      const { title, slug, content, coverImage, excerpt } = req.body;
      if (!title || !slug || !content) {
        return res.status(400).json({ error: "Title, slug, and content are required" });
      }
      const existingSnapshot = await (0, import_firestore.getDocs)((0, import_firestore.query)((0, import_firestore.collection)(db, "blog_posts"), (0, import_firestore.where)("slug", "==", slug), (0, import_firestore.limit)(1)));
      if (!existingSnapshot.empty) {
        return res.status(400).json({ error: "A blog post with this slug already exists" });
      }
      const newPost = {
        title,
        slug,
        content,
        coverImage: coverImage || "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80",
        excerpt: excerpt || content.substring(0, 150).replace(/[#*`\n]/g, " ") + "...",
        date: (/* @__PURE__ */ new Date()).toISOString()
      };
      const docRef = await (0, import_firestore.addDoc)((0, import_firestore.collection)(db, "blog_posts"), newPost);
      res.json({ id: docRef.id, message: "Blog post published successfully", post: newPost });
    } catch (err) {
      console.error("Failed to publish blog post:", err);
      res.status(500).json({ error: err.message });
    }
  });
  app.post("/api/leads", async (req, res) => {
    try {
      const leadData = req.body;
      const docRef = await (0, import_firestore.addDoc)((0, import_firestore.collection)(db, "leads"), {
        ...leadData,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      });
      res.json({ id: docRef.id, message: "Lead submitted successfully" });
    } catch (err) {
      console.error("Failed to submit lead:", err);
      res.status(500).json({ error: err.message });
    }
  });
  app.get("/api/leads", verifyAdmin, async (req, res) => {
    try {
      const snapshot = await (0, import_firestore.getDocs)((0, import_firestore.query)((0, import_firestore.collection)(db, "leads"), (0, import_firestore.orderBy)("createdAt", "desc")));
      const leads = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      res.json(leads);
    } catch (err) {
      console.error("Failed to fetch leads:", err);
      res.status(500).json({ error: err.message });
    }
  });
  app.patch("/api/leads/:id", verifyAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      await (0, import_firestore.updateDoc)((0, import_firestore.doc)(db, "leads", id), { status });
      res.json({ message: "Lead status updated successfully" });
    } catch (err) {
      console.error("Failed to update lead status:", err);
      res.status(500).json({ error: err.message });
    }
  });
  app.post("/api/ai/chat", async (req, res) => {
    const { message, history, clicks, currentUrl } = req.body || {};
    try {
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.warn("GEMINI_API_KEY is missing. Using local support responder.");
        const fallbackText = getLocalInteractiveResponse(message, clicks, currentUrl);
        return res.json({ text: fallbackText });
      }
      const ai = new import_genai.GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build"
          }
        }
      });
      const clicksContext = clicks && clicks.length > 0 ? `The user's recent clicked buttons/sections on this session: ${clicks.map((c) => `"${c}"`).join(", ")}.` : "No clicks recorded in this session yet.";
      const urlContext = currentUrl ? `The user is currently viewing page route: ${currentUrl}.` : "";
      const systemInstruction = `You are eMINISTRY Platform AI, the ultra-intelligent, context-aware digital companion for eMinistry Platform (based in Dar es Salaam, Tanzania).
Your role is to guide faith-based organizations (dioceses, parishes, churches), schools (nursery, primary, secondary via MSSIS), higher learning institutes (via IMS), and business clients in Tanzania and East Africa to digitize their operations using eMinistry's financial & operational infrastructure.

You are floating PERSISTENTLY everywhere across the entire website.

CRITICAL FEATURE - Tracked User Clicks & Actions:
${clicksContext}
${urlContext}

IMPORTANT INTEGRATION RULES:
1. Speak a warm, friendly and highly natural blend of beautiful East African Swahili (Kiswahili) and polished professional English. Start with a warm greeting like "Habari yako!" or "Karibu eMinistry!" or "Je, unajua..." depending on context.
2. Since you see exactly what the user clicked/tapped (from the clicks context above), ALWAYS acknowledge their actions or active page gracefully in your greeting! For example:
   - If they clicked "Diocese & Church Hubs", say: "Habari! Naona umetembelea huduma yetu ya 'Diocese & Church Hubs'. Je, ungetaka nikufafanulie jinsi gani tunajiunga na Selcom au kutoa michango kupitia SMS au dondoo za kidijitali?"
   - If they clicked "Request Integration", say: "Karibu sana! Kuchagua 'Request Integration' ni hatua safi kuongeza tija. Mimi eMinistry AI nipo hapa kukuongoza hatua kwa hatua."
3. Guide user queries with clear, humble, and technical accuracy. Keep responses compact, highly readable, and structured in Markdown format.
4. Encourage them to request integration or register their contact info if they have specific needs.`;
      const contents = [];
      if (history && Array.isArray(history)) {
        for (const turn of history) {
          contents.push({
            role: turn.role === "assistant" ? "model" : "user",
            parts: [{ text: turn.content }]
          });
        }
      }
      contents.push({
        role: "user",
        parts: [{ text: message }]
      });
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.7
        }
      });
      res.json({ text: response.text });
    } catch (err) {
      console.error("Gemini API Error:", err);
      const fallbackText = getLocalInteractiveResponse(message, clicks, currentUrl);
      return res.json({ text: fallbackText });
    }
  });
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      console.log("Contact received:", { name, email, subject, message });
      res.status(200).json({ message: "Success" });
    } catch (err) {
      res.status(500).json({ error: "Failed to send message" });
    }
  });
  if (isDev) {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
