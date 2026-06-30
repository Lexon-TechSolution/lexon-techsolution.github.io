import React, { createContext, useContext, useState, useEffect } from 'react';

export type LanguageCode = 'en' | 'sw' | 'fr' | 'ar' | 'pt' | 'zu' | 'yo' | 'am';

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  region: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', region: 'Global / West & Southern Africa' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili', flag: '🇹🇿', region: 'East Africa / EAC' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇸🇳', region: 'Francophone West & Central Africa' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇪🇬', region: 'North Africa' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇦🇴', region: 'Angola / Mozambique' },
  { code: 'zu', name: 'Zulu', nativeName: 'isiZulu', flag: '🇿🇦', region: 'Southern Africa' },
  { code: 'yo', name: 'Yoruba/Hausa', nativeName: 'Yoruba/Hausa', flag: '🇳🇬', region: 'West Africa / Nigeria' },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ', flag: '🇪🇹', region: 'East Africa / Ethiopia' },
];

export interface TranslationDictionary {
  [key: string]: {
    [code in LanguageCode]: string;
  };
}

export const translations: TranslationDictionary = {
  // Navigation
  'nav.home': {
    en: 'Home',
    sw: 'Mwanzo',
    fr: 'Accueil',
    ar: 'الرئيسية',
    pt: 'Início',
    zu: 'Ekhaya',
    yo: 'Ile',
    am: 'መነሻ'
  },
  'nav.about': {
    en: 'About Us',
    sw: 'Kuhusu Sisi',
    fr: 'À propos',
    ar: 'من نحن',
    pt: 'Sobre Nós',
    zu: 'Mayelana Nathi',
    yo: 'Nipa Wa',
    am: 'ስለ እኛ'
  },
  'nav.solutions': {
    en: 'Solutions',
    sw: 'Mifumo Yetu',
    fr: 'Solutions',
    ar: 'حلولنا',
    pt: 'Soluções',
    zu: 'Izixazululo',
    yo: 'Awọn ojutu',
    am: 'መፍትሄዎች'
  },
  'nav.products': {
    en: 'Products',
    sw: 'Bidhaa',
    fr: 'Produits',
    ar: 'المنتجات',
    pt: 'Produtos',
    zu: 'Imikhiqizo',
    yo: 'Awọn ọja',
    am: 'ምርቶች'
  },
  'nav.projects': {
    en: 'Projects',
    sw: 'Miradi',
    fr: 'Projets',
    ar: 'المشاريع',
    pt: 'Projectos',
    zu: 'Amaphrojekthi',
    yo: 'Awọn iṣẹ akanṣe',
    am: 'ፕሮጀክቶች'
  },
  'nav.pricing': {
    en: 'Pricing',
    sw: 'Gharama',
    fr: 'Tarifs',
    ar: 'الأسعار',
    pt: 'Preços',
    zu: 'Amanani',
    yo: 'Iye owo',
    am: 'ዋጋ'
  },
  'nav.blog': {
    en: 'Blog/Digest',
    sw: 'Habari/Blogu',
    fr: 'Blog/Actualités',
    ar: 'المدونة',
    pt: 'Blogue',
    zu: 'Ibhulogi',
    yo: 'Bulọọgi',
    am: 'ብሎግ'
  },
  'nav.contact': {
    en: 'Contact Us',
    sw: 'Wasiliana Nasi',
    fr: 'Contactez-nous',
    ar: 'اتصل بنا',
    pt: 'Contacte-nos',
    zu: 'Thintana Nathi',
    yo: 'Kan si wa',
    am: 'ያግኙን'
  },
  'nav.admin': {
    en: 'Admin',
    sw: 'Usimamizi',
    fr: 'Admin',
    ar: 'الإدارة',
    pt: 'Admin',
    zu: 'Ukuphatha',
    yo: 'Alakoso',
    am: 'አስተዳዳሪ'
  },
  
  // Hero section
  'hero.tagline': {
    en: '✦ DIGITAL INFRASTRUCTURE OF MODERN ORGANIZATIONS AFRICA',
    sw: '✦ MIUNDOMBINU YA KIDIGITALI YA TAASISI ZA KISASA AFRIKA',
    fr: '✦ INFRASTRUCTURE NUMÉRIQUE DES ORGANISATIONS MODERNES EN AFRIQUE',
    ar: '✦ البنية التحتية الرقمية للمؤسسات الحديثة في إفريقيا',
    pt: '✦ INFRAESTRUTURA DIGITAL DE ORGANIZAÇÕES MODERNAS EM ÁFRICA',
    zu: '✦ INGCALASIZINDA YEZAMAKHAMPANI EZINGCONO E-AFRIKA',
    yo: '✦ INFRASTRUCTURE DIGITAL TI AWỌN EGBE TABI AJỌ TITUN NI AFRICA',
    am: '✦ የአፍሪካ ዘመናዊ ድርጅቶች ዲጂታል መሠረተ ልማት'
  },
  'hero.title.part1': {
    en: 'AUTOMATE YOUR',
    sw: 'BORESHA KAZI ZA',
    fr: 'AUTOMATISEZ VOTRE',
    ar: 'أتمتة أعمالك',
    pt: 'AUTOMATIZE O SEU',
    zu: 'ZENZAKALELE',
    yo: 'NṢE TI',
    am: 'ድርጅትዎን በራስ-'
  },
  'hero.title.part2': {
    en: 'BUSINESS',
    sw: 'BIASHARA YAKO',
    fr: 'ENTREPRISE',
    ar: 'الرقمنة المباشرة',
    pt: 'NEGÓCIO',
    zu: 'IBHIZINISI LAKHO',
    yo: 'IṢẸ RẸ',
    am: 'ሰሪ ያድርጉት'
  },
  'hero.desc': {
    en: 'We develop robust cloud automation platforms, school portal directories, and religious systems across Africa to eliminate paperwork borders and safeguard organizational data.',
    sw: 'Tunatengeneza mifumo thabiti ya kiotomatiki ya usimamizi na kurekodi kumbukumbu ya shule na makanisa barani Afrika ili kuondoa matumizi ya karatasi na kulinda data zako.',
    fr: 'Nous développons des plateformes d’automatisation cloud robustes, des portails scolaires et des systèmes religieux en Afrique pour éliminer la paperasse et sécuriser les données.',
    ar: 'نحن نطور منصات أتمتة سحابية قوية، وبوابات مدارس، وأنظمة برمجية دينية عبر إفريقيا لإنهاء المعاملات الورقية وحفظ البيانات المؤسسية بشكل آمن.',
    pt: 'Desenvolvemos plataformas robustas de automação na nuvem, portais escolares e sistemas religiosos em toda a África para eliminar o papel e salvaguardar dados institucionais.',
    zu: 'Senza izixhobo zamafu zamakhompiyutha, isikole sezinhlelo zokulawula, kanye namasistimu ebandla kulo lonke elase-Afrika ukuze kuqedwe amaphepha nokuvikela imininingwane.',
    yo: 'A nṣe idagbasoke awọn eto adaṣe awọsanma lagbara, awọn ọna abawọle ile-iwe, ati awọn eto ẹsin kaakiri Afirika lati mu iṣẹ iwe kuro ati lati daabobo data.',
    am: 'የወረቀት አጠቃቀምን በማስወገድ እና በየተቋማቱ ያሉ መረጃዎችን ደህንነት ለመጠበ የሚረዱ አዳዲስ የደመና መፍትሄዎችን፣ የትምህርት ቤት ፖርታሎችን እና የሃይማኖት ተቋማት መዝገቦችን በአፍሪካ እናዘጋጃለን።'
  },
  'hero.btn.register': {
    en: 'Activate Solution',
    sw: 'Sajili Sasa hivi',
    fr: 'Activer la Solution',
    ar: 'امتلك النظام الآن',
    pt: 'Ativar Solução',
    zu: 'Qalisa Manje',
    yo: 'Bẹrẹ Gba Ojutu',
    am: 'መተግበሪያውን ይጀምሩ'
  },
  'hero.btn.explore': {
    en: 'Explore Systems',
    sw: 'Gundua Mifumo Yetu',
    fr: 'Découvrir Nos Systèmes',
    ar: 'اكتشف الأنظمة',
    pt: 'Explorar Sistemas',
    zu: 'Hlola Amasistimu',
    yo: 'Gba Alaye Kikun',
    am: 'ስርዓቶቻችንን ይጎብኙ'
  },

  // About and intro section
  'intro.header': {
    en: 'Lexon is a specialized architect of cloud registers, customized school portals, and religious database technology.',
    sw: 'Lexon inatengeneza mifumo bora ya kumbukumbu za kimtandao, usimamizi wa shule na makanisa kote barani Afrika.',
    fr: 'Lexon est un architecte spécialisé de registres cloud, de portails scolaires personnalisés et de technologies de bases de données religieuses.',
    ar: 'ليكسون لتكنولوجيا المعلومات هي الشركة المتخصصة والرائدة في إدارة السجلات السحابية وبوابات المدارس وتكنولوجيا السجلات الدينية وإدارة المبيعات.',
    pt: 'A Lexon é um arquiteto especializado em registros na nuvem, portais escolares personalizados e tecnologia de bancos de dados religiosos.',
    zu: 'I-Lexon ingumdwebi okhethekile we-cloud, abaphathi bezikole, nebandla kulo lonke elase-Afrika.',
    yo: 'Lexon jẹ oluṣeto amọja ti awọn igbasilẹ awọsanma, awọn ọna abawọle ile-iwe, ati Imọ-ẹrogbọn data fun isin.',
    am: 'ሌክሰን የዲጂታል መዛግብት፣ የተስተካከሉ የትምህርት ቤት መግቢያዎች እና የሃይማኖት ተቋማት የመረጃ ቋት ቴክኖሎጂዎች ግንባታ ባለሙያ ነው።'
  },
  'intro.desc1': {
    en: 'By integrating educational hubs, regional church branches, and retail warehouses into secure cloud environments, we eliminate manual paperwork boundaries. Our customizable software modules maximize accuracy, align data rosters, and give managers complete visibility.',
    sw: 'Kwa kuleta pamoja vituo vya shule, matawi ya makanisa, na stoo za biashara kwenye mifumo salama ya wingu(cloud), tunaondoa kabisa karatasi. Mifumo yetu inakupa usahihi wa data na ufuatiliaji rahisi kwa viongozi.',
    fr: 'En intégrant les pôles éducatifs, les églises régionales et les entrepôts de vente dans le cloud, nous éliminons la paperasse. Nos modules logiciels personnalisables maximisent la précision et offrent une visibilité complète.',
    ar: 'من خلال دمج الصروح التعليمية وفروع الكنائس والمستودعات التجارية في بيئة سحابية فائقة الأمان، نقضي على الأعمال الورقية. وتضمن برمجياتنا دقة قصوى ورؤية شاملة للإدارة.',
    pt: 'Ao integrar centros educacionais, filiais regionais de igrejas e armazéns de retalho em nuvens seguras, eliminamos o papel. Nossos módulos maximizam a precisão e dão visibilidade aos gestores.',
    zu: 'Ngemuva kokuhlanganisa ama-hubs, amabandla ezifunda kanye nezitolo endaweni evikelekile yefu, siqeda amaphepha. Izinhlelo zethu zilula kuhlanganisa imininingwane.',
    yo: 'Nipa sisọpọ awọn ibudo eto-ẹkọ mọ, awọn ẹka ijọsin agbegbe, ati awọn ile-itaja soobu sinu awọsanma, a mu iṣẹ iwe kuro jakejado ati pe a pese ririn rọrun fun awọn oludari.',
    am: 'በትምህርት ተቋማት፣ በአጥቢያ አብያተ ክርስቲያናት ቅርንጫፎች እና በችርቻሮ መጋዘኖች መካከል ያለውን መስተጋብር በዲጂታል መንገድ በማገናኘት የወረቀት ስራዎችን እናስወግዳለን። ይሄም አስተዳዳሪዎች ሙሉ ታይነት እንዲኖራቸው ያግዛል።'
  },
  'intro.desc2': {
    en: 'As modern software systems across Africa advance, we are proud to provide the primary source code backbone driving structural organization and smart automation.',
    sw: 'Kama waanzilishi wa mifumo ya kisasa ya kiteknolojia barani Afrika, tunajivunia kutoa muundo dhabiti unaosukuma mapinduzi ya kidijitali na mifumo ya kiotomatiki.',
    fr: 'Alors que les logiciels se développent en Afrique, nous sommes fiers de fournir les infrastructures de code qui propulsent l’organisation structurelle et l’automatisation intelligente.',
    ar: 'بينما تتقدم البرمجيات الحديثة في إفريقيا، نفخر بتقديم البنية البرمجية الأساسية التي تقود مسيرة الرقمنة والتحول الذكي والمثمر.',
    pt: 'À medida que os sistemas avançam em África, orgulhamo-nos de fornecer a base de código essencial que impulsiona a organização estrutural e automatização inteligente.',
    zu: 'Njengoba izinhlelo zekhompiyutha zihluthulela phambili e-Afrika, siyajabula ukuhlinzeka isisekelo sezobuchwepheshe kuyo yonke imikhakha.',
    yo: 'Bi awọn eto sọfitiwia ode oni kọja Afirika ṣe n tẹsiwaju, a ni igberaga lati pese kokoro ati orisun pataki fun adaṣiṣẹ.',
    am: 'በአፍሪካ ዘመናዊ የሶፍትዌር ስርዓቶች እያደጉ ሲሄዱ የዲጂታል ማዘመኛዎችን እና ስማርት አውቶሜሽን ስርዓቶችን ለማምጣት በመቻላችን እንኮራለን።'
  },
  
  // Products and systems titles & descriptions
  'prod.school.title': {
    en: 'LEXON SCHOOL SYSTEM (SMS)',
    sw: 'MFUMO WA SHULE WA LEXON (SMS)',
    fr: 'LEXON SCHOOL SYSTEM (SMS)',
    ar: 'نظام ليكسون للمدارس (SMS)',
    pt: 'SISTEMA ESCOLAR LEXON (SMS)',
    zu: 'LEXON SCHOOL SYSTEM (SMS)',
    yo: 'LEXON SCHOOL SYSTEM (SMS)',
    am: 'የሌክሰን ትምህርት ቤት አስተዳደር (SMS)'
  },
  'prod.school.desc': {
    en: 'Register all students, automatically calculate national GPAs, manage fee reports, and dispatch report cards instantly.',
    sw: 'Sajili wanafunzi wote, hesabu GPA za kitaifa, dhibiti ripoti za bakaa la ada, na utume kadi za matokeo kwa sekunde 1.',
    fr: 'Enregistrez les étudiants, calculez automatiquement les moyennes, gérez les rapports et envoyez les relevés instantanément.',
    ar: 'تسجيل الطلاب وحساب المعدلات التراكمية وتقارير مستحقات الرسوم الدراسية وإرسال نتائج التقارير فوراً.',
    pt: 'Registe estudantes, calcule notas médias automaticamente, faça relatórios sobre propinas e envie dados instantaneamente.',
    zu: 'Bhalisa abafundi, ubale imiphumela yezivivinyo zikazwelonke, uphathe imali yesikole, futhi uthumele imibiko yefoni.',
    yo: 'Forukọsilẹ gbogbo awọn ọmọ ile-iwe, ṣe iṣiro adaṣe GPA, ṣakoso awọn ijabọ owo ile-iwe, ati firanṣẹ lẹsẹkẹsẹ.',
    am: 'ሁሉንም ተማሪዎች ይመዝግቡ፣ ብሔራዊ ደረጃን የጠበቁ ውጤቶችን (GPA) በራስ-ሰር ያሰሉ፣ የክፍያ መዛግብትን ይከታተሉ።'
  },
  'prod.church.title': {
    en: 'eMINISTRY CHURCH CLOUD',
    sw: 'MFUMO WA MAKANISA (eMINISTRY CLOUD)',
    fr: 'eMINISTRY CHURCH CLOUD',
    ar: 'نظام الكنائس والمؤسسات الدينية',
    pt: 'eMINISTRY CHURCH CLOUD',
    zu: 'eMINISTRY CHURCH CLOUD',
    yo: 'eMINISTRY CHURCH CLOUD',
    am: 'አገልግሎት የቤተክርስቲያን ደመና (eMINISTRY)'
  },
  'prod.church.desc': {
    en: 'Durable registry platform matching growing congregations. Track member databases, cell groups, and announcements.',
    sw: 'Mfumo dhabiti wa kuandikisha waumini, cell groups, idara, kufuatilia ahadi, sadaka, na ujumbe wa SMS.',
    fr: 'Plateforme d’enregistrement solide pour les congrégations. Suivez les membres, les dîmes et les groupes.',
    ar: 'منصة سحابية متقدمة لتسجيل الرعاة والمؤمنين، ومتابعة العطاء والتبرعات وإدارة الشؤون والاجتماعات.',
    pt: 'Plataforma robusta para congregações em crescimento. Registo de membros, dízimos, células e grupos.',
    zu: 'Isixazululo se-cloud sokubhalisa amalungu ebandla, uphathe iminikelo nezimali, futhi uthumele imilayezo.',
    yo: 'Platform iforukọsilẹ gigun fun awọn ijọ. Tọpinpin alaye nipa awọn ọmọ ẹgbẹ, ida-mẹwa, ipejọpọ ti ile.',
    am: 'የአባላት ምዝገባን፣ የአጥቢያ አስራትና መዋጮዎችን፣ የሴል ግሩፕ መዋቅሮችን ለመከታተል የሚረዳ መተግበሪያ።'
  },
  'prod.retail.title': {
    en: 'RETAIL ERP & INVENTORY',
    sw: 'MFUMO WA MAUZO NA STOO (RETAIL ERP)',
    fr: 'RETAIL ERP & INVENTAIRE',
    ar: 'نظام المبيعات والمخازن (RETAIL ERP)',
    pt: 'RETAIL ERP & INVENTÁRIO',
    zu: 'RETAIL ERP & INVENTORY',
    yo: 'RETAIL ERP & INVENTORY',
    am: 'የችርቻሮ ERP እና የዕቃዎች ቁጥጥር'
  },
  'prod.retail.desc': {
    en: 'Maintain warehouse stock with active barcode scanning, generate consumer receipts, and track credits or debts.',
    sw: 'Dhibiti bidhaa zote kwa barcode, tengeneza risiti za kipekee za mauzo, na usimamie madeni au mikopo.',
    fr: 'Gérez le stock de votre entrepôt par codes-barres, générez des factures et suivez le crédit et les dettes.',
    ar: 'إدارة المخازن باستخدام مسح الباركود، وإصدار الفواتير وطباعتها، ومتابعة حسابات الدائنين والمدينين.',
    pt: 'Controle o stock com leitor de código de barras, emita facturas térmicas de clientes, organize registos.',
    zu: 'Phatha impahla yesitolo ngokufunda amabhakhodi (barcodes), udale amarisidi, uphathe izikweletu namakhasimende.',
    yo: 'Ṣakoso awọn ọja nipa lilo scan barcode, ṣe agbejade awọn iwe isanwo oruka, ki o tọpinpin gbogbo gbese.',
    am: 'በአሞሌ ኮด (Barcode) እቃዎችን መመዝገብ፣ ደረሰኞችን ማመንጨት፣ የደንበኞችን ዕዳ መቆጣጠር።'
  },

  // Church Showcase Showcase Section
  'church.showcase.tagline': {
    en: '✦ DIGITAL CONGREGATIONS SUITE',
    sw: '✦ MFUMO WA MAKANISA KIDIGITALI',
    fr: '✦ SUITE DES CONGRÉGATIONS NUMÉRIQUES',
    ar: '✦ منصة الرعاية والخدمات الكنسية الرقمية',
    pt: '✦ SUÍTE DE CONGREGAÇÃO DIGITAL',
    zu: '✦ INGCALASIZINDA YEBANDLA',
    yo: '✦ AWỌN EGBE TABI IṢẸ IJỌ ONI-DIGITAL',
    am: '✦ የዲጂታል ጉባኤዎች ስርዓት'
  },
  'church.showcase.title': {
    en: 'eMinistry Church System',
    sw: 'Mfumo wa Makanisa wa eMinistry',
    fr: 'Système d’Église eMinistry',
    ar: 'نظام إدارة الكنائس الإلكتروني (eMinistry)',
    pt: 'Sistema de Igreja eMinistry',
    zu: 'Uhlelo lwebandla i-eMinistry',
    yo: 'Eto Iṣẹ Ijọba eMinistry',
    am: 'የኢሚኒስትሪ የቤተክርስቲያን ስርዓት'
  },
  'church.showcase.desc': {
    en: 'Our flagship church coordination program matches the scale of growing congregations. Connect branch offices directly, handle member directories, and broadcast custom mass announcements securely. Live now at lexonchurch.com.',
    sw: 'Mfumo wetu mkuu wa usimamizi wa makanisa unakupa uwezo wa kusimamia waumini, matawi yote na mawasiliano ya usalama kote barani Afrika. Live sasa kupitia lexonchurch.com.',
    fr: 'Notre programme phare de coordination d’églises en Afrique. Connectez directement les succursales, gérez les annuaires de membres et diffusez des annonces sécurisées. En ligne sur lexonchurch.com.',
    ar: 'برنامج التنسيق الكنسي الرائد يلبي تطلعات الرعايا المتزايدة. اربط الفروع الإقليمية مباشرة، وأدر أدلة الأعضاء، وبث الإعلانات الجماعية بأمان. متاح الآن على lexonchurch.com.',
    pt: 'Nosso programa principal de coordenação de igrejas acompanha o crescimento das congregações. Conecte filiais diretamente, faça gestão de membros e emita comunicados com segurança. Online em lexonchurch.com.',
    zu: 'Uhlelo lwethu lokudidiyela ibandla luhlangabezana nezidingo zamabandla akhulayo. Xhuma amagatsha ebandla kalula, uphathe amalungu, futhi uthumele imilayezo ngokuphephile ku-lexonchurch.com.',
    yo: 'Eto iṣakoso ijọ wa ti o ni agbara n kọja iwọn ti awọn ijọ ti o ndagba. So awọn ẹka ijọsin pọ, ṣakono alaye ọmọ ẹgbẹ, ki o firanṣẹ awọn ikede pataki lori lexonchurch.com.',
    am: 'ዋነኛው የቤተክርስቲያን ማስተባበሪያ ስርዓታችን የአጥቢያዎችን እድገት የሚመጥን ነው። ቅርንጫፎችን በቀጥታ ያገናኙ፣ አባላትን ያስተዳድሩ እና መልዕክቶችን በደህና ይላኩ። አሁን በ lexonchurch.com ላይ ቀጥታ ይገኛል።'
  },
  'church.showcase.feature1': {
    en: 'Comprehensive member directory databases',
    sw: 'Daftari kamili na salama la washirika',
    fr: 'Bases de données d’annuaires de membres complètes',
    ar: 'أدلة وقواعد بيانات شاملة للأعضاء',
    pt: 'Bancos de dados abrangentes de membros',
    zu: 'Ulwazi oluphelele lwamalungu',
    yo: 'Ibi ipamọ data ọmọ ẹgbẹ to peye',
    am: 'አጠቃላይ የአባላት መረጃ ቋት'
  },
  'church.showcase.feature2': {
    en: 'Cell group networks & spatial logs',
    sw: 'Usimamizi wa vikundi na cell groups',
    fr: 'Gestion des cellules de prière et réseaux',
    ar: 'شبكات مجموعات الخدمة والاجتماعات',
    pt: 'Redes de células e grupos de oração',
    zu: 'Amaseli nemithandazo yasemakhaya',
    yo: 'Nẹtiwọọki ipejọpọ ile ti ijọsin',
    am: 'የሕዋስ ቡድኖች አውታረ መረቦች'
  },
  'church.showcase.feature3': {
    en: 'Instant customized text bulletins',
    sw: 'Ujumbe wa matangazo na taarifa kwa washiriki',
    fr: 'Bulletins texte instantanés et personnalisés',
    ar: 'بث رسائل نصية فورية ومخصصة للإعلانات',
    pt: 'Boletins de texto instantâneos e personalizados',
    zu: 'Ukuthumela imilayezo khona manje',
    yo: 'Firanṣẹ awọn ikede ni kiakia',
    am: 'ፈጣን የፅሁፍ መልዕክቶች'
  },
  'church.showcase.feature4': {
    en: 'Continuous branch reports auditing',
    sw: 'Ripoti na takwimu za kila wiki za matawi',
    fr: 'Audit continu des rapports de succursales',
    ar: 'تدقيق ومتابعة تقارير الفروع باستمرار',
    pt: 'Auditoria contínua de relatórios de filiais',
    zu: 'Ukuhlola imibiko yamagatsha njalo',
    yo: 'Ṣiṣe ayẹwo awọn ijabọ ti awọn ẹka',
    am: 'ቀጣይነት ያለው የቅርንጫፍ ሪፖርቶች ክትትል'
  },
  'church.showcase.feature5': {
    en: 'Ministry departments calendar planners',
    sw: 'Kupanga ratiba za idara na huduma',
    fr: 'Planificateurs de calendrier des ministères',
    ar: 'مخططي وتقاويم فعاليات أقسام الخدمة',
    pt: 'Planeadores para calendários de ministérios',
    zu: 'Ikhalenda lemisebenzi nemicimbi',
    yo: 'Olùṣeto kalẹnda fun awọn apa ijọ',
    am: 'የአገልግሎቶች የቀን መቁጠሪያ እቅድ አውጪዎች'
  },
  'church.showcase.feature6': {
    en: 'Leadership hierarchies registries',
    sw: 'Usimamizi wa viongozi na ngazi zote',
    fr: 'Registres des hiérarchies de leadership',
    ar: 'سجلات تدرج الهياكل القيادية والإشرافية',
    pt: 'Registos de hierarquias de liderança',
    zu: 'Uhlu nezigaba zabaholi bebandla',
    yo: 'Akọsilẹ ti awọn olori ati awọn abajade',
    am: 'የመሪዎች መዝገብ መዋቅሮች'
  },
  'church.showcase.feature7': {
    en: 'Member family linkage histories',
    sw: 'Kihistoria na viungo vya kifamilia vya waumini',
    fr: 'Historique des liens familiaux des membres',
    ar: 'تتبع صلات القرابة العائلية للأعضاء',
    pt: 'Históricos de ligações familiares de membros',
    zu: 'Umlando wezibonelelo nemindeni',
    yo: 'Itan ati awọn isopọ idile ti awọn ọmọ ijọ',
    am: 'የአባላት ቤተሰብ ትስስር ታሪክ'
  },
  'church.showcase.feature8': {
    en: 'Highly secure data storage archives',
    sw: 'Ulinzi na uhifadhi bora wa kumbukumbu na data',
    fr: 'Archives de stockage de données hautement sécurisées',
    ar: 'أرشيف وحفظ بيانات آمن وفائق الحماية',
    pt: 'Arquivos de armazenamento altamente seguros',
    zu: 'Ukugcinwa kwedatha okuphephile',
    yo: 'Ibi ipamọ data to ni aabo to gaju',
    am: 'ከፍተኛ ጥበቃ ያለው የመረጃ መዝገብ ቤት'
  },

  // Big flyer banner
  'banner.title': {
    en: 'EMPOWER YOUR ORGANIZATION!',
    sw: 'BONYEZA MAPINDUZI YA KIDIGITALI!',
    fr: 'ACTIVEZ LE POUVOIR NUMÉRIQUE !',
    ar: 'قم بتمكين وتطوير مؤسستك الآن!',
    pt: 'CAPACITE A SUA ORGANIZAÇÃO!',
    zu: 'NETHEZEKISA IBANDLA LAKHO!',
    yo: 'FUN IDAGBASOKE EGBE RẸ TI',
    am: 'ተቋምዎን በዲጂታል ያዘምኑ!'
  },
  'banner.desc': {
    en: 'Register, Manage and Scale your entire congregation or institution with a single unified cloud system linking all regional networks across Africa.',
    sw: 'Sajili, Simamia na Kukuza taasisi au kanisa lako kwa mfumo mmoja salama unaounganisha mitandao yote kote barani Afrika.',
    fr: 'Enregistrez, gérez et développez votre congrégation ou institution avec un système cloud unifié reliant tous vos réseaux régionaux en Afrique.',
    ar: 'سجل وأدر وطور كنيستك أو مؤسستك بالكامل عبر نظام سحابي موحد يربط كافة الشبكات الإقليمية في إفريقيا.',
    pt: 'Registe, gerencie e expanda toda a sua congregação ou instituição com um único sistema unificado na nuvem que liga todas as redes regionais em África.',
    zu: 'Bhalisa, uphathe futhi ukhulise ibandla lakho noma isikhungo sakho ngohlelo olulodwa lwe-cloud oluxhumanisa wonke amagatsha e-Afrika.',
    yo: 'Forukọsilẹ, ṣakoso ati mu ijọ rẹ dagba pẹlu eto awọsanma iṣọkan kan ti o so gbogbo awọn nẹtiwọọki agbegbe pọ jakejado Afirika.',
    am: 'በአፍሪካ ያሉ የክልል አውታረ መረቦችን በሚያገናኝ አንድ ወጥ የደመና ስርዓት መላውን ጉባኤዎን ወይም ተቋምዎን ይመዝግቡ፣ ያስተዳድሩ እና ያሳድጉ።'
  },
  'banner.feature1.title': {
    en: 'Track Guests, Members, and Partners',
    sw: 'Sajili Wageni, Waumini na Washirika Wote',
    fr: 'Suivi des invités, membres et partenaires',
    ar: 'متابعة الزوار والأعضاء والشركاء',
    pt: 'Registo de visitantes, membros e parceiros',
    zu: 'Gcina ulwazi lwabavakashi namalungu',
    yo: 'Tọpinpin awọn alejo, awọn ọmọ ẹgbẹ ati alabaṣepọ',
    am: 'እንግዶችን፣ አባላትን እና አጋሮችን ይከታተሉ'
  },
  'banner.feature1.desc': {
    en: 'Save all profiles, family linkages, and milestones in high-speed cloud space.',
    sw: 'Hifadhi taarifa zote za waumini, viungo vya familia zao, na hatua zote kwenye server salama.',
    fr: 'Sauvegardez tous les profils et jalons dans un espace cloud sécurisé.',
    ar: 'احفظ ملفات التعريف، والروابط العائلية، والإحصاءات في مساحة سحابية سريعة.',
    pt: 'Salve todos os perfis e ligações familiares em espaço seguro na nuvem.',
    zu: 'Gcina wonke amagama nezibongo nemindeni yabo elwini lefu elivikelekile.',
    yo: 'Hifadhi gbogbo awọn alaye ati awọn ibatan ẹgbẹ ninu awọsanma to mọ.',
    am: 'ሁሉንም መገለጫዎች፣ የቤተሰብ ትስስሮችን በደመና መረጃ ቋት ላይ ያስቀምጡ።'
  },
  'banner.feature2.title': {
    en: 'Instant Reporting & Analytics',
    sw: 'Ripoti Thabiti Ndani ya Sekunde Chache',
    fr: 'Rapports et analyses instantanés',
    ar: 'تقارير وتحليلات مالية فورية ودقيقة',
    pt: 'Relatórios e análises financeiras instantâneas',
    zu: 'Imibiko yezimali nezahluko khona manje',
    yo: 'Ijabọ ati awọn atupale ni kiakia',
    am: 'ፈጣን ሪፖርቶች እና ትንታኔዎች'
  },
  'banner.feature2.desc': {
    en: 'Access financial balances, tithes, branch reports, and custom weekly summaries.',
    sw: 'Pata muhtasari wa kifedha, michango ya sadaka na ahadi, na ripoti za matawi yote.',
    fr: 'Accédez aux soldes financiers, aux dîmes et aux résumés hebdomadaires.',
    ar: 'الوصول إلى الأرصدة المالية والصدقات وتقارير الفروع والملخصات الأسبوعية.',
    pt: 'Acesso a saldos financeiros, dízimos e resumos semanais personalizados.',
    zu: 'Hlola izimali, iminikelo, imibiko yamasonto onke namagatsha kalula.',
    yo: 'Gba alaye nipa owo, idamẹwa, ati ijabo ọsọọsẹ fun awọn oludari.',
    am: 'የፋይናንስ ቀሪ ሂሳቦችን፣ አስራቶችን እና ሳምንታዊ ማጠቃለያዎችን ያግኙ።'
  },
  'banner.feature3.title': {
    en: 'Manage Workflows On-The-Go',
    sw: 'Simamia Idara na Shughuli Popote Ulipo',
    fr: 'Gérez vos activités où que vous soyez',
    ar: 'إدارة المهام والأعمال أثناء تنقلك',
    pt: 'Gerencie fluxos de trabalho em qualquer lugar',
    zu: 'Phatha imisebenzi noma kuphi lapho ukhona',
    yo: 'Ṣakoso awọn iṣẹ ati apa ijọ lati ibikibi',
    am: 'የስራ ሂደቶችን ከየትኛውም ቦታ ሆነው ያስተዳድሩ'
  },
  'banner.feature3.desc': {
    en: 'Audit cell departments, assembly schedules, and branch activities over any mobile device.',
    sw: 'Fuatilia cell groups na ratiba za kila ibada ukiwa mahali popote, muda wowote.',
    fr: 'Supervisez les cellules, les plannings et les cultes depuis n’importe quel mobile.',
    ar: 'متابعة الخدمة والاجتماعات وأنشطة الكنيسة عبر الهواتف بمرونة كاملة.',
    pt: 'Acompanhe as células, programações de cultos e atividades via telemóvel.',
    zu: 'Fuatilia amabandla, izinsuku nezikhathi zemihlangano kalula ngocingo lwakho.',
    yo: 'Ṣayẹwo awọn kalẹnda ati iṣẹ ijọ lori ẹrọ alagbeka eyikeyi.',
    am: 'በማንኛውም የሞባይል መሳሪያ የቅርንጫፍ እንቅስቃሴዎችን እና ስብሰባዎችን ይከታተሉ።'
  },
  'banner.feature4.title': {
    en: 'Automated SMS Engagement',
    sw: 'Mawasiliano na Ufuatiliaji wa Kiotomatiki',
    fr: 'Engagement automatisé par SMS',
    ar: 'التواصل التفاعلي والآمن عبر الرسائل القصيرة',
    pt: 'Comunicação automatizada por SMS',
    zu: 'Ukuxhumana okuzenzakalelayo nge-SMS',
    yo: 'Sise ibasọrọ pẹlu SMS kiakia',
    am: 'አውቶማቲክ የፅሁፍ መልዕክት ግንኙነት'
  },
  'banner.feature4.desc': {
    en: 'Send customized greetings, event bulletins, and reports to thousands of users instantly.',
    sw: 'Tuma salamu, kadi za matokeo au matangazo ya vikundi kwa sekunde chache kwa maelfu ya watu.',
    fr: 'Envoyez des salutations et des bulletins d’information à des milliers de personnes.',
    ar: 'إرسال تهانٍ مخصصة، ونشرات فعاليات، وتقارير للآلاف من الأعضاء بثوانٍ معدودة.',
    pt: 'Envie saudações personalizadas e boletins informativos para milhares de pessoas.',
    zu: 'Thumela imikhonzo, izaziso zemicimbi, nemibiko ezinkulungwaneni zamalungu ngokushesha.',
    yo: 'Firansẹ awọn ikini ikore, alaye ipejọ ati ijabo si ẹgbẹẹgbẹrun eniyan lẹsẹkẹsẹ.',
    am: 'ለአስር ሺዎች ለሚቆጠሩ ተጠቃሚዎች የደስታ መግለጫዎችን እና ማስታወቂያዎችን በፍጥነት ይላኩ።'
  },
  'banner.quote': {
    en: '"Maintain absolute organization and secure your structural records. Go digital today!"',
    sw: '"Hakikisha taasisi yako inaenda kisasa na salama kila siku bila usumbufu wowote! Unganisha leo."',
    fr: '"Maintenez une organisation absolue et sécurisez vos registres. Passez au numérique dès aujourd’hui !"',
    ar: '"حافظ على التنظيم الكامل والسرية القصوى لسجلاتك الهيكلية. انطلق نحو الرقمنة اليوم!"',
    pt: '"Mantenha a organização absoluta e proteja os seus registos estruturais. Mude para o digital hoje!"',
    zu: '"Qinisekisa ukuthi ibandla lakho lihamba ngendlela efanele nsuku zonke. Qala uhlelo lwedijithali manje!"',
    yo: '"Rii daju pe iṣẹ rẹ nlọ ni aabo ati ni iṣọkan lojoojumọ laisi iṣoro kankan! Bẹrẹ loni."',
    am: '"ፍጹም ሥርዓትን ያስጠብቁ እና የመረጃዎችዎን ደህንነት ይጠብቁ። ዛሬውኑ ወደ ዲጂታል ይሸጋገሩ!"'
  },
  'banner.btn.register': {
    en: 'Register Your Institution',
    sw: 'Sajili Taasisi Yako',
    fr: 'Enregistrer Votre Institution',
    ar: 'سجل مؤسستك الآن',
    pt: 'Registe a Sua Instituição',
    zu: 'Bhalisa isikhungo sakho',
    yo: 'Forukọsilẹ Egbe Rẹ Loni',
    am: 'ተቋምዎን ይመዝግቡ'
  },
  'banner.flagship': {
    en: '★ GLOBAL FLAGSHIP SUITE / WWW.LEXONCHURCH.COM ★',
    sw: '★ MFUMO MKUU WA KIDIGITALI / WWW.LEXONCHURCH.COM ★',
    fr: '★ SUITE MONDIALE / WWW.LEXONCHURCH.COM ★',
    ar: '★ المنظومة العالمية الموثوقة لأتمتة الكنائس / WWW.LEXONCHURCH.COM ★',
    pt: '★ SUÍTE GLOBAL / WWW.LEXONCHURCH.COM ★',
    zu: '★ UHLELO LOKUQALA LWEFU / WWW.LEXONCHURCH.COM ★',
    yo: '★ APAPO IṢẸ IJỌ TI LORI LUPU / WWW.LEXONCHURCH.COM ★',
    am: '★ ዋነኛው የአፍሪካ መፍትሄ / WWW.LEXONCHURCH.COM ★'
  },

  // Interactive Live Phone Stats Mockup
  'phone.live': {
    en: '● LIVE CLOUD',
    sw: '● LIVE CLOUD',
    fr: '● DIRECT CLOUD',
    ar: '● مباشر سحابي',
    pt: '● NUVEM LIVE',
    zu: '● LIVE CLOUD',
    yo: '● LIVE CLOUD',
    am: '● ደመና ቀጥታ'
  },
  'phone.welcome': {
    en: 'Welcome, Reverend!',
    sw: 'Karibu, Mchungaji!',
    fr: 'Bienvenue, Révérend !',
    ar: 'مرحباً، سيادة الراعي الموقر!',
    pt: 'Bem-vindo, Reverendo !',
    zu: 'Karibu, Mchungaji!',
    yo: 'Kaabo, Alufa!',
    am: 'እንኳን ደህና መጡ፣ ቄስ!'
  },
  'phone.summary': {
    en: 'Here is your active cloud summary for today.',
    sw: 'Huu ni muhtasari wa shughuli za leo.',
    fr: 'Voici votre résumé d’activité cloud d’aujourd’hui.',
    ar: 'إليك ملخص وإحصاءات المعاملات السحابية النشطة لليوم.',
    pt: 'Aqui está o seu resumo de atividade na nuvem de hoje.',
    zu: 'Nayi imibiko yesikhungo sakho namuhla.',
    yo: 'Eyi ni atupale kukuru fun iṣẹ rẹ loni.',
    am: 'የዛሬው ንቁ የደመና ማጠቃለያዎ ይህ ነው።'
  },
  'phone.guests': {
    en: 'Guests Today',
    sw: 'Wageni Leo',
    fr: 'Invités Aujourd’hui',
    ar: 'الزوار الجدد اليوم',
    pt: 'Visitantes de Hoje',
    zu: 'Abavakashi Namuhla',
    yo: 'Alejo Loni',
    am: 'የዛሬ እንግዶች'
  },
  'phone.members': {
    en: 'Total Members',
    sw: 'Waumini Jumla',
    fr: 'Total Membres',
    ar: 'إجمالي الرعية/الأعضاء',
    pt: 'Total de Membros',
    zu: 'Amalungu Ephelele',
    yo: 'Apapo Ọmọ Ẹgbẹ',
    am: 'አጠቃላይ አባላት'
  },
  'phone.attendance': {
    en: 'Attendance',
    sw: 'Mahudhurio',
    fr: 'Présence',
    ar: 'نسبة الحضور والالتزام',
    pt: 'Assiduidade',
    zu: 'Abakhona Namuhla',
    yo: 'Iwaju Awọn Eniyan',
    am: 'ተገኝተዋል'
  },
  'phone.tithes': {
    en: 'Total Tithes',
    sw: 'Sadaka & Tithes',
    fr: 'Total des Dîmes',
    ar: 'إجمالي العطايا والمساهمات',
    pt: 'Total de Dízimos',
    zu: 'Iminikelo Ephelele',
    yo: 'Apapo Idamẹwa',
    am: 'ጠቅላላ አስራት'
  },
  'phone.events': {
    en: 'Active Events',
    sw: 'Matukio Yaliyopo',
    fr: 'Événements Actifs',
    ar: 'الفعاليات الجارية الآن',
    pt: 'Eventos Ativos',
    zu: 'Imicimbi Edlule',
    yo: 'Awọn iṣẹlẹ ti o n lọ lowo',
    am: 'ንቁ ክስተቶች'
  },
  'phone.service': {
    en: '⛪ Main Worship Service',
    sw: '⛪ Ibada Kuu',
    fr: '⛪ Culte Principal',
    ar: '⛪ القداس الاجتماعي الرئيسي',
    pt: '⛪ Culto Principal',
    zu: '⛪ Inkonzo Enkulu',
    yo: '⛪ Isin Ijọ Lori Lupu',
    am: '⛪ ዋናው የአምልኮ አገልግሎት'
  },
  'phone.sunday': {
    en: 'Sunday',
    sw: 'Jumapili',
    fr: 'Dimanche',
    ar: 'الأحد',
    pt: 'Domingo',
    zu: 'ISonta',
    yo: 'Ojọ Isinmi',
    am: 'እሑድ'
  },

  // Schools card representation
  'card.school.tagline': {
    en: 'ACADEMICS CONTROL & DIGITAL REGISTERS',
    sw: 'USIMAMIZI WA MASOMO NA REKODI ZA SHULE',
    fr: 'CONTRÔLE ACADÉMIQUE ET REGISTRES NUMÉRIQUES',
    ar: 'التحكم الأكاديمي وإدارة السجلات الرقمية للمدارس',
    pt: 'CONTROLE ACADÉMICO E REGISTOS DIGITAIS',
    zu: 'ABAPHATHI BEZIKOLO NEDAFTARI LALIDIGITHALI',
    yo: 'IṢAKOSO ETO-ẸKỌ ATI AKỌSÌLẸ ONI-DIGITAL',
    am: 'የትምህርት ቁጥጥር እና ዲጂታል መዛግብት'
  },
  'card.school.title': {
    en: 'Lexon School Portal (SMS / MSSIS)',
    sw: 'Mfumo wa Shule wa Lexon (SMS / MSSIS)',
    fr: 'Portail Scolaire Lexon (SMS / MSSIS)',
    ar: 'بوابة ليكسون للمدارس والجامعات (SMS)',
    pt: 'Portal Escolar Lexon (SMS / MSSIS)',
    zu: 'Uhlelo lwesikole lwase-Lexon',
    yo: 'Lexon School Portal (SMS / MSSIS)',
    am: 'የሌክሰን ትምህርት ቤት ፖርታል (SMS / MSSIS)'
  },
  'card.school.desc': {
    en: 'A centralized multi-tenant education workspace coordinating class directories, parent bulletins, grade-books with automated GPA division scoring (perfectly compliant with national requirements), and tuition fees ledger processing.',
    sw: 'Mfumo wa pamoja wa elimu unaounganisha madarasa yote, usajili, ripoti za bakaa la ada ya wanafunzi, na hesabu za GPA za kitaifa (NECTA) za mwanafunzi kiotomatiki.',
    fr: 'Un espace éducatif centralisé coordonnant les classes, les bulletins des parents, les carnets de notes conformes aux moyennes nationales et les frais de scolarité.',
    ar: 'مساحة عمل تعليمية متكاملة لتنسيق الفصول الدراسية، والتواصل مع أولياء الأمور، وإصدار الشهادات وحساب الدرجات بدقة متناهية، وإدارة حسابات المصروفات الدراسية.',
    pt: 'Espaço académico centralizado coordenando classes, boletins de pais, caderneta de notas com cálculo automático de pontuações e processamento de pagamentos.',
    zu: 'Uhlelo oluhlanganisa amakilasi wonke, ukubhaliswa kwabafundi, ukuthunyelwa kwemiphumela nezaziso kubazali nge-SMS kalula.',
    yo: 'Alaye eto-ẹkọ ti o so gbogbo kilasi, akọsilẹ ikẹkọ, iwe esi, ati iṣakoso owo ile-iwe pọ fun rọrun tọpinpin.',
    am: 'የክፍል ማውጫዎችን፣ ለወላጆች የሚላኩ መግለጫዎችን፣ ብሔራዊ ደረጃውን የጠበቀ ውጤት አሰጣጥን እና የትምህርት ክፍያዎችን በአንድ ማዕከል የሚያስተዳድር መተግበሪያ።'
  },
  'card.school.btn': {
    en: 'Explore School Specs',
    sw: 'Gundua Mfumo wa Shule',
    fr: 'Découvrir Spécifications Scolaires',
    ar: 'اكتشف أنظمة المدارس',
    pt: 'Explorar Recursos Escolares',
    zu: 'Hlola Uhlelo Lwesikole',
    yo: 'Gba Alaye Ile-iwe',
    am: 'የትምህርት ቤት ዝርዝሮችን ይጎብኙ'
  },

  // Retail Card representation
  'card.retail.tagline': {
    en: 'RETAIL SAAS & BILLING CORE',
    sw: 'MIFUMO YA BIASHARA NA MAUZO (RETAIL ERP)',
    fr: 'CENTRE DE FACTURATION ET VENTE SAAS',
    ar: 'المنظومة السحابية المتقدمة للمبيعات وفواتير العملاء',
    pt: 'NÚCLEO DE VENDA RETALHO SAAS',
    zu: 'RETAIL SAAS & BILLING CORE',
    yo: 'RETAIL SAAS & BILLING CORE',
    am: 'የችርቻሮ SAAS እና የክፍያ ማዕከል'
  },
  'card.retail.title': {
    en: 'Lexon Retail ERP & Billing',
    sw: 'Mfumo wa Mauzo na Stoo (Retail ERP & Billing)',
    fr: 'Lexon Retail ERP & Facturation',
    ar: 'نظام ليكسون للمبيعات والفواتير والمخازن',
    pt: 'Lexon Retalho ERP e Facturação',
    zu: 'Uhlelo lwezitolo be-Lexon Retail ERP',
    yo: 'Lexon Retail ERP & Billing',
    am: 'የሌክሰን የችርቻሮ ERP እና የክፍያ ስርዓት'
  },
  'card.retail.desc': {
    en: 'High-performance warehouse tracking suites. Support barcode scanning registers, invoice PDF compiling, supplier credit registries, and multi-location ledger balances with responsive, secure cloud compliance.',
    sw: 'Mifumo ya kisasa ya ufuatiliaji wa stoo yako, miamala ya barcode, risiti za mafuta na bidhaa, pamoja na ufuatiliaji wa mikopo na madeni ya wateja kwa urahisi.',
    fr: 'Suites de suivi d’entrepôt haute performance. Prend en charge le scan de codes-barres, les factures PDF, les registres de crédit fournisseur et les balances.',
    ar: 'برمجيات متقدمة لإدارة المستودعات، والربط بالقوارئ والباركود، وإصدار الفواتير وطباعتها على الطابعات الحرارية، ومتابعة مديونيات وحسابات العملاء والموردين.',
    pt: 'Suítes de controlo de stock de alto desempenho. Suporte a código de barras, faturas em PDF, depósitos e relatórios financeiros em tempo real com segurança na nuvem.',
    zu: 'Uhlelo lokulandela impahla yesitolo ngamabhakhodi, ukunamathisela amarisidi, namakhadi wemalimboleko namalungu alula kabi.',
    yo: 'Sọfitiwia pataki lati ṣakoso ile-itaja, scan barcode, risiti fun awọn alabara, ati tọpinpin idiyele ati awọn iṣẹ gbese lati ibikibi.',
    am: 'የመጋዘን እቃዎችን በአሞሌ ኮድ (Barcode) ለመቆጣጠር፣ የፒዲኤፍ ደረሰኞችን ለማመንጨት፣ የደንበኞችንና የሻጮችን የሂሳብ መዛግብት ለመከታተል የሚረዳ መተግበሪያ።'
  },
  'card.retail.btn': {
    en: 'Solutions Dossier',
    sw: 'Gundua Zaidi',
    fr: 'Dossier de Solutions',
    ar: 'اكتشف تفاصيل نظام المبيعات',
    pt: 'Dossiê de Soluções',
    zu: 'Bona ezinye izixazululo',
    yo: 'Gba Alaye Soobu',
    am: 'የመፍትሄዎች ዝርዝር'
  },

  // Trust numbers
  'stats.automated_schools.title': {
    en: 'Tanzanian educational schools automated',
    sw: 'Shule zilizowekewa mifumo yetu safi',
    fr: 'Établissements scolaires automatisés',
    ar: 'مؤسسة تعليمية تم أتمتتها وتطويرها',
    pt: 'Escolas e institutos educacionais automatizados',
    zu: 'Izikole ezinohlelo lwethu zizonke',
    yo: 'Awọn ile-iwe ti o ti gba adaṣe',
    am: 'ዲጂታል የተደረጉ የትምህርት ተቋማት'
  },
  'stats.parishes_active.title': {
    en: 'Parishes on active eMinistry registers',
    sw: 'Makanisa yanayotumia eMinistry',
    fr: 'Paroisses sur les registres eMinistry',
    ar: 'أبرشية ورعية تدار عبر eMinistry',
    pt: 'Paróquias ativas no sistema eMinistry',
    zu: 'Amabandla nemicimbi ephethwe yithi',
    yo: 'Awọn ijọ ti o nlo eMinistry',
    am: 'በኢሚኒስትሪ የሚጠቀሙ አብያተ ክርስቲያናት'
  },
  'stats.active_users.title': {
    en: 'Active roster users served database space',
    sw: 'Tani ya waumini na watumiaji katika database',
    fr: 'Utilisateurs actifs bénéficiant de notre cloud',
    ar: 'مستخدم نشط يخدمهم خادمنا السحابي بشكل يومي',
    pt: 'Utilizadores ativos em nossos servidores na nuvem',
    zu: 'Amalungu Ephelele kusizindalwazi sethu',
    yo: 'Awọn olumulo lọwọlọwọ lori database',
    am: 'በመረጃ ቋቱ ላይ ያሉ ንቁ ተጠቃሚዎች'
  },
  'stats.alerts_broadcasted.title': {
    en: 'Total system text alerts broadcasted',
    sw: 'Ujumbe wa SMS uliotumwa kupitia mifumo',
    fr: 'Alertes SMS diffusées via nos systèmes',
    ar: 'رسالة نصية مرسلة بنجاح لمختلف المستخدمين',
    pt: 'Alertas SMS enviados com sucesso através do sistema',
    zu: 'Imilayezo ye-SMS ethunyelwe kuze kube manje',
    yo: 'Apapo SMS ikede ti a ti firanṣẹ',
    am: 'በበሩ በኩል የተላኩ አጠቃላይ መልዕክቶች'
  },

  // Compliance Certifications
  'compliance.title': {
    en: 'Systems Compliance & Security Standards',
    sw: 'Viwango vya Ulinzi na Uthibitishaji wa Mifumo',
    fr: 'Normes de Conformité et de Sécurité des Systèmes',
    ar: 'معايير الامتثال والأمان والشهادات الرسمية للأنظمة',
    pt: 'Padrões de Conformidade e Segurança de Sistemas',
    zu: 'Ukuphepha namazinga wezinhlelo zethu',
    yo: 'Awọn iṣeduro Aabo ati Awọn Ilana Iṣe',
    am: 'የስርዓቶች ተገዢነት እና የደህንነት ደረጃዎች'
  },
  'compliance.item1.title': {
    en: 'Telecom Licensing',
    sw: 'Mamlaka ya TCRA',
    fr: 'Licence de Télécommunication',
    ar: 'التراخيص الوطنية للخدمات',
    pt: 'Licenciamento de Telecomunicações',
    zu: 'Izimvume zefoni',
    yo: 'Iwe-asẹ ibasọrọ',
    am: 'የቴሌኮም ፈቃድ'
  },
  'compliance.item1.desc': {
    en: 'Approved SMS Delivery',
    sw: 'Kutuma SMS Chini ya Usimamizi',
    fr: 'Distribution de SMS Approuvée',
    ar: 'تسليم معتمد للرسائل القصيرة المخصصة',
    pt: 'Distribuição Autorizada de SMS',
    zu: 'Ukuthumela imilayezo okuvunyelwe',
    yo: 'Ifiranṣẹ SMS ti o ni aṣẹ',
    am: 'የተፈቀደ የፅሁፍ መልዕክት ማድረስ'
  },
  'compliance.item2.title': {
    en: 'Data Security Acts',
    sw: 'Sheria ya Kulinda Data',
    fr: 'Lois sur la Protection des Données',
    ar: 'قوانين تكنولوجيا المعلومات وحماية البيانات',
    pt: 'Leis de Proteção de Dados',
    zu: 'Ukuvikelwa kwedatha namalungu',
    yo: 'Ofin aabo data',
    am: 'የመረጃ ደህንነት ህጎች'
  },
  'compliance.item2.desc': {
    en: 'Compliant Registries',
    sw: 'Uhifadhi Salama wa Taarifa',
    fr: 'Registres de Données Conformes',
    ar: 'مستودعات وسجلات متوافقة بالكامل',
    pt: 'Registos de Dados em Conformidade',
    zu: 'Uhlu namagama ahlelekile',
    yo: 'Iforukọsilẹ to ni aabo',
    am: 'የተሟሉ መዛግብት'
  },
  'compliance.item3.title': {
    en: 'ISO 27001 Standard',
    sw: 'Mifumo ya ISO 27001',
    fr: 'Norme ISO 27001',
    ar: 'معايير ISO 27001 الدولية',
    pt: 'Norma ISO 27001',
    zu: 'Amanani we-ISO 27001',
    yo: 'Ilana ISO 27001',
    am: 'ISO 27001 ደረጃ'
  },
  'compliance.item3.desc': {
    en: 'Encrypted Servers',
    sw: 'Server Zilizolindwa kwa Usimbaji',
    fr: 'Serveurs hautement cryptés',
    ar: 'خوادم مشفرة وفائقة السرية',
    pt: 'Servidores altamente criptografados',
    zu: 'Amaprosesa afihliwe',
    yo: 'Awọn olupin to ni aabo giga',
    am: 'የተመሰጠሩ አገልጋዮች'
  },
  'compliance.item4.title': {
    en: 'Regional Safety Codes',
    sw: 'Viwango na Sheria za Biashara',
    fr: 'Codes Régionaux de Sécurité',
    ar: 'اللوائح والقوانين التجارية المحلية',
    pt: 'Normas de Segurança de Negócios',
    zu: 'Imithetho yezitolo ezweni lakini',
    yo: 'Awọn ilana soobu ti agbegbe',
    am: 'የክልል የደህንነት ደንቦች'
  },
  'compliance.item4.desc': {
    en: 'Authorized Cloud Storage ERP',
    sw: 'ERP Inayofuata Taratibu',
    fr: 'ERP Cloud Autorisé et Conforme',
    ar: 'منظومة مخازن سحابية مرخصة وقانونية',
    pt: 'ERP Conforme com Regulamentação Técnica',
    zu: 'Izimali nempahla ehlelwe kahle',
    yo: 'Cloud ERP to gba iyọọda',
    am: 'ደህንነቱ የተጠበቀ የደመና ERP'
  },
  'simulator.title': {
    en: 'Live System Simulator & Real-Time Sync',
    sw: 'Mifumo Yetu Kazini (Mubashara na Sync)',
    fr: 'Simulateur de Système en Direct et Synchro',
    ar: 'محاكي الأنظمة المتكاملة والمزامنة الفورية',
    pt: 'Simulador de Sistema ao Vivo e Sincronização',
    zu: 'Hlola ukuthi zisebenza kanjani izinhlelo',
    yo: 'Simulator Eto Live & Sync Akoko',
    am: 'ቀጥታ ስርዓት አስመሳይ እና እውነተኛ ግንኙነት'
  },
  'simulator.desc': {
    en: 'Interact with real-time snapshots of our active cloud systems. Monitor how Lexon automatically updates school ledger dashboards, schedules church tasks, and organizes retail sales databases instantly across East Africa.',
    sw: 'Shuhudia jinsi mifumo ya Lexon inavyofanya kazi mubashara. Fuatilia usawazishaji wa taarifa za shule, makanisa na maduka jinsi unavyotokea kwa sekunde chache popote ulipo barani Afrika.',
    fr: 'Découvrez des instantanés de nos systèmes cloud actifs. Observez comment Lexon met à jour les tableaux de bord et organise les bases de données instantanément en Afrique.',
    ar: 'تفاعل مع لقطات حية للتطبيقات السحابية النشطة واستمتع بمراقبة المزامنة ومتابعة تحديث البيانات.',
    pt: 'Interaja com capturas de tela em tempo real dos nossos sistemas ativos. Monitorize as atualizações automáticas.',
    zu: 'Hlola futhi ubuke ukuthi uhlelo lungasiza kanjani ibandla noma isikole sakho manje.',
    yo: 'Ṣayẹwo bi awọn ọna abawọle ṣe n ṣiṣẹ lati ṣe imudojuiwọn awọn alaye lẹsẹkẹsẹ.',
    am: 'የእኛን የደመና ስርዓቶች ቀጥታ ቅጽበታዊ መግለጫዎችን ይመልከቱ። መረጃዎች እንዴት ወዲያውኑ እንደሚዘምኑ ይከታተሉ።'
  },
  'simulator.badge': {
    en: 'LIVE CLOUD VIEW',
    sw: 'TAZAMA MUBASHARA',
    fr: 'APERÇU EN DIRECT',
    ar: 'عرض حي وسحابي',
    pt: 'VISUALIZAÇÃO AO VIVO',
    zu: 'BUKA MANJE',
    yo: 'WO LIVE',
    am: 'ቀጥታ እይታ'
  }
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('lexon_site_lang');
    if (saved && LANGUAGE_OPTIONS.some(opt => opt.code === saved)) {
      return saved as LanguageCode;
    }
    return 'en'; // Default to English as explicitly requested!
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('lexon_site_lang', lang);
  };

  const t = (key: string): string => {
    const trans = translations[key];
    if (!trans) return key;
    return trans[language] || trans['en'] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
