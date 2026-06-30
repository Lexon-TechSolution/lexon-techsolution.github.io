import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle, 
  Database,
  GraduationCap,
  Store,
  ChevronRight,
  BookOpen, 
  MessageSquare,
  Globe,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/layout/SEO';
import { useLanguage } from '../context/LanguageContext';
import { 
  MssisMockup, 
  EministryChurchMockup, 
  AccountingMockup 
} from '../components/TanzanianSystemMockups';
import { auth } from '../lib/firebase';

const renderProjectVisual = (mockupType: string) => {
  switch (mockupType) {
    case 'school':
      return (
        <div className="w-full scale-[0.98] hover:scale-100 transition-all duration-500 rounded-2xl overflow-hidden shadow-2xl">
          <MssisMockup />
        </div>
      );
    case 'church':
      return (
        <div className="w-full scale-[0.98] hover:scale-100 transition-all duration-500 rounded-2xl overflow-hidden shadow-2xl">
          <EministryChurchMockup />
        </div>
      );
    case 'accounting':
      return (
        <div className="w-full scale-[0.98] hover:scale-100 transition-all duration-500 rounded-2xl overflow-hidden shadow-2xl">
          <AccountingMockup />
        </div>
      );
    default:
      return null;
  }
};

const Projects: React.FC = () => {
  const { language } = useLanguage();
  const isSw = language === 'sw';

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAdmin(!!user);
    });
    return () => unsubscribe();
  }, []);

  const projectsData = {
    sw: [
      {
        id: 'mssis-school',
        title: 'MSSIS School System - Tanzania',
        industry: 'ELIMU & AKADEMIA',
        icon: GraduationCap,
        accentColor: 'from-[#7c3aed] to-[#4f46e5]',
        accentShadow: 'shadow-purple-500/10',
        textColor: 'text-purple-600',
        bgColor: 'bg-purple-500/5',
        borderColor: 'border-purple-500/20',
        highlightText: 'Usimamizi wa Shule usio na Kikomo',
        description: 'Mradi wa kisasa wa kielelezo uliosimikwa kwenye shule kote nchini Tanzania. Unajumuisha utoaji wa ripoti za matokeo otomatiki kulingana na muundo wa NECTA, utumaji wa ujumbe (SMS) kwa wazazi kwa sekunde chache, pamoja na udhibiti mzima wa ada na rasilimali.',
        features: [
          'Kukokotoa GPA, madaraja na nafasi kiotomatiki kwa miongozo ya NECTA.',
          'Utumaji wa ripoti na matokeo ya wanafunzi kwa SMS papo hapo kwa wazazi.',
          'Uhasibu safi wa shule unaorekodi ada zote na kutoa risiti za kidijitali.'
        ],
        metrics: [
          { label: 'Usahihi wa Ripoti', value: '100% Sahihi' },
          { label: 'Kasi ya Kazi ya Walimu', value: '+95% Haraka' },
          { label: 'Wanafunzi Waliosajiliwa', value: '45,000+' }
        ],
        technologies: ['React', 'TypeScript', 'Node.js', 'Firestore', 'Tanzania SMS Api'],
        mockupType: 'school',
        productLink: '/products'
      },
      {
        id: 'eministry-grace',
        title: 'eMinistry Church Suite - lexonchurch.com',
        industry: 'TAASISI & MAKANISA',
        icon: Globe,
        accentColor: 'from-[#06b6d4] to-[#0891b2]',
        accentShadow: 'shadow-cyan-500/10',
        textColor: 'text-cyan-600',
        bgColor: 'bg-cyan-500/5',
        borderColor: 'border-cyan-500/20',
        highlightText: 'Mageuzi ya Kidijitali ya Parishi',
        description: 'Mfumo thabiti uliosimikwa kwenye Majimbo, Parishi, na Makanisa ya ndani kwa ajili ya kusimamia usajili wa waumini, vikundi vya seli, ripoti za kichungaji, idara, na kadi za waumini za kielektroniki zenye QR Code.',
        features: [
          'Ukusanyaji salama wa sadaka na zaka kwa simu kwa ushirikiano na Selcom.',
          'Kadi za kidijitali za waumini zenye QR Code kwa ajili ya mahudhurio ya haraka.',
          'Ripoti safi za kifedha na kitakwimu za parishi au jimbo zima.'
        ],
        metrics: [
          { label: 'Muda wa Kusawazisha', value: '< 2 Seconds' },
          { label: 'Makanisa Amilifu', value: '250+ Matawi' },
          { label: 'Kasi ya SMS Arifa', value: 'Mubashara' }
        ],
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase Cloud', 'Selcom Gateway'],
        mockupType: 'church',
        productLink: '/products'
      },
      {
        id: 'retail-erp',
        title: 'Lexon Retail ERP & Stock Accounting',
        industry: 'BIASHARA & ERP',
        icon: Store,
        accentColor: 'from-[#f59e0b] to-[#d97706]',
        accentShadow: 'shadow-amber-500/10',
        textColor: 'text-amber-600',
        bgColor: 'bg-amber-500/5',
        borderColor: 'border-amber-500/20',
        highlightText: 'Uhasibu na Udhibiti wa Stoo',
        description: 'Mfumo jumuishi wa mauzo (POS) na usimamizi wa stoo kwa maduka ya jumla na reja reja, supermarkets, na famasi. Unajumuisha skanning ya haraka ya barcode, ufuatiliaji wa bidhaa zinazoisha muda wake, na ukokotoaji wa kodi kwa usahihi kabisa.',
        features: [
          'Barcode hardware API ya kuscan bidhaa na kutoa risiti sahihi papo hapo.',
          'Ufuatiliaji thabiti wa stoo yenye bidhaa zaidi ya milioni 1 (SKU Items).',
          'Arifa za mapema kwa bidhaa zinazoisha stoo au kukaribia tarehe ya kuharibika.'
        ],
        metrics: [
          { label: 'Usahihi wa Hesabu', value: '99.9% Sahihi' },
          { label: 'Uokoaji wa Muda', value: '+85% Ufanisi' },
          { label: 'Bidhaa Zinazofuatiliwa', value: '1M+ Items' }
        ],
        technologies: ['React', 'Vite', 'Express', 'Drizzle ORM', 'Barcode Hardware API'],
        mockupType: 'accounting',
        productLink: '/products'
      }
    ],
    en: [
      {
        id: 'mssis-school',
        title: 'MSSIS School System - Tanzania',
        industry: 'EDUCATION & ACADEMIA',
        icon: GraduationCap,
        accentColor: 'from-[#7c3aed] to-[#4f46e5]',
        accentShadow: 'shadow-purple-500/10',
        textColor: 'text-purple-600',
        bgColor: 'bg-purple-500/5',
        borderColor: 'border-purple-500/20',
        highlightText: 'End-to-End Educational Management',
        description: 'A benchmark educational cloud system deployed across schools in Tanzania. Integrates automated NECTA-compliant academic grading, high-speed automated parent SMS notification logs, and unified tuition fee bookkeeping.',
        features: [
          'Automatic calculation of grades, class rankings, and division profiles based on NECTA standards.',
          'High-speed SMS distribution of quarterly report cards directly to parent devices.',
          'Full billing subsystem tracking installment schedules and dispatching reminders.'
        ],
        metrics: [
          { label: 'Grading Accuracy', value: '100% Reliable' },
          { label: 'Teacher Workload Red.', value: '+95% Saved' },
          { label: 'Enrolled Students', value: '45,000+' }
        ],
        technologies: ['React', 'TypeScript', 'Node.js', 'Firestore', 'Tanzania SMS Api'],
        mockupType: 'school',
        productLink: '/products'
      },
      {
        id: 'eministry-grace',
        title: 'eMinistry Church Suite - Regional Deployment',
        industry: 'INSTITUTIONS & RELIGIOUS',
        icon: Globe,
        accentColor: 'from-[#06b6d4] to-[#0891b2]',
        accentShadow: 'shadow-cyan-500/10',
        textColor: 'text-cyan-600',
        bgColor: 'bg-cyan-500/5',
        borderColor: 'border-cyan-500/20',
        highlightText: 'Sleek Parish Cloud Migration',
        description: 'A robust cloud platform managing regional dioceses, parish networks, and local congregations. Coordinates comprehensive member profiles, household registries, pastoral analytics, cell groups, and custom event logs.',
        features: [
          'Direct integration with Selcom gateway for instant mobile money collections (M-Pesa, Tigo Pesa).',
          'Automated Next SMS message queue trigger verifying contribution post-events within milliseconds.',
          'Pastoral metrics tracking growth indexes and group schedules across thousands of households.'
        ],
        metrics: [
          { label: 'Database Sync Latency', value: '< 2 Seconds' },
          { label: 'Active Parishes', value: '250+ Branches' },
          { label: 'SMS Notification rate', value: 'Instant' }
        ],
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Firebase Cloud', 'Selcom Gateway'],
        mockupType: 'church',
        productLink: '/products'
      },
      {
        id: 'retail-erp',
        title: 'Lexon Retail ERP & Stock Accounting',
        industry: 'RETAIL & ENTERPRISE ERP',
        icon: Store,
        accentColor: 'from-[#f59e0b] to-[#d97706]',
        accentShadow: 'shadow-amber-500/10',
        textColor: 'text-amber-600',
        bgColor: 'bg-amber-500/5',
        borderColor: 'border-amber-500/20',
        highlightText: 'Precision Stock Ledger Controls',
        description: 'An advanced multi-branch point-of-sale and warehouse inventory tracking suite. Tracks real-time barcode registers, automated low-stock warnings, supplier balances, expiration dates, and secure financial audits.',
        features: [
          'Barcode hardware API ensuring ultra-fast checkout and unified receipt dispatching.',
          'Continuous inventory tracking across catalog sizes containing over 1 million unique SKU items.',
          'Expiry Date guard systems auto-flagging nearing product groups across storage depots.'
        ],
        metrics: [
          { label: 'Inventory Auditing', value: '99.9% Accurate' },
          { label: 'Checkout Speedup', value: '+85% Boost' },
          { label: 'Monitored SKU Items', value: '1M+ Items' }
        ],
        technologies: ['React', 'Vite', 'Express', 'Drizzle ORM', 'Barcode Hardware API'],
        mockupType: 'accounting',
        productLink: '/products'
      }
    ]
  };

  const currentProjects = projectsData[isSw ? 'sw' : 'en'];

  return (
    <div className="bg-[#f8fafc] text-slate-800 min-h-screen">
      <SEO 
        title={isSw ? "Mifumo yetu Mitatu Mikuu - Lexon Tech" : "Our Flagship Systems - Lexon Tech Solutions"}
        description={isSw 
          ? "Tazama mifumo yetu mitatu mikuu ya kiteknolojia iliyoundwa kwa viwango bora kabisa: MSSIS, eMinistry, na Lexon Retail ERP." 
          : "Explore our three major enterprise software solutions crafted for education, church admin, and retail operations."}
      />

      {/* Cinematic Hero Section - Immersive Dark Navy Theme */}
      <div className="relative overflow-hidden bg-slate-950 pt-36 pb-28 text-white border-b border-slate-900">
        {/* Background Glowing Ambient Halos */}
        <div className="absolute top-1/4 left-1/4 w-[35rem] h-[35rem] bg-[#1e3a8a]/20 rounded-full filter blur-[130px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-indigo-500/10 rounded-full filter blur-[130px] pointer-events-none" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-cyan-500/5 rounded-full filter blur-[100px] pointer-events-none" />

        {/* Abstract Mesh Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center lg:text-left">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-3xl">
              <motion.div 
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-xs font-mono font-bold tracking-widest uppercase mb-6 mx-auto lg:mx-0"
              >
                <Sparkles size={14} className="text-[#facc15] animate-pulse" />
                {isSw ? 'MIFUMO YETU YA KISASA NCHINI' : 'OUR PREMIER PLATFORMS'}
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-sans font-black tracking-tight leading-tight"
              >
                {isSw ? 'Mifumo Yetu ' : 'Our Three '}
                <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
                  {isSw ? 'Mitatu Mikuu' : 'Flagship Systems'}
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl font-medium"
              >
                {isSw 
                  ? 'Tumebuni na kusimika suluhisho imara, salama na rahisi kutumia kwa ajili ya taasisi za elimu, makanisa na makampuni ya biashara nchini Tanzania.' 
                  : 'Engineered for exceptional scale, bulletproof security, and seamless deployment across Tanzania and East Africa.'}
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4"
              >
                <Link 
                  to="/contact" 
                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-wider rounded-xl text-xs transition-transform hover:-translate-y-0.5 shadow-lg shadow-blue-500/20 inline-flex items-center gap-2 cursor-pointer"
                >
                  {isSw ? 'Omba Maonyesho ya Bure' : 'Book a Demo'}
                  <ArrowUpRight size={14} />
                </Link>
                <a 
                  href="#projects-showcase" 
                  className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 hover:border-slate-700 font-bold uppercase tracking-wider rounded-xl text-xs transition-colors inline-flex items-center gap-2 cursor-pointer"
                >
                  {isSw ? 'Gundua Mifumo' : 'Discover Systems'}
                  <ChevronRight size={14} />
                </a>
              </motion.div>
            </div>

            {/* Glowing stats widget */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="w-full max-w-sm bg-slate-900/60 border border-slate-800 backdrop-blur-md p-6 rounded-3xl shadow-2xl relative"
            >
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <span className="flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
              </div>

              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-400" />
                {isSw ? 'TAKTAK ZA MIFUMO' : 'SYSTEM METRICS'}
              </h3>

              <div className="space-y-6">
                <div>
                  <div className="text-3xl font-black text-white font-mono">154+</div>
                  <div className="text-xs text-slate-400 font-medium mt-1">
                    {isSw ? 'Majimbo, Shule & Maduka Amilifu' : 'Active Parishes, Schools & Outlets'}
                  </div>
                </div>
                <hr className="border-slate-800" />
                <div>
                  <div className="text-3xl font-black text-white font-mono">1M+</div>
                  <div className="text-xs text-slate-400 font-medium mt-1">
                    {isSw ? 'Miamala Inayochakatwa kila Siku' : 'Processed Daily Transactions'}
                  </div>
                </div>
                <hr className="border-slate-800" />
                <div>
                  <div className="text-3xl font-black text-white font-mono">99.99%</div>
                  <div className="text-xs text-slate-400 font-medium mt-1">
                    {isSw ? 'Uhakika wa Mfumo Kuwa Hewani' : 'Guaranteed System Uptime'}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Showcase Layout */}
      <div id="projects-showcase" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        
        {/* Swahili Introductory Divider */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="text-[#1e3a8a] font-mono text-xs font-black uppercase tracking-widest mb-3">
            {isSw ? '/ UFANISI NA TEKNOLOJIA' : '/ ENGINEERING & COMPLIANCE'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans font-black tracking-tight text-slate-900 leading-tight">
            {isSw ? 'Mifumo Iliyothibitishwa Kurahisisha Kazi Zako' : 'Proven Digital Ecosystems for Local Sectors'}
          </h2>
          <p className="mt-4 text-slate-600 font-medium text-sm sm:text-base leading-relaxed">
            {isSw 
              ? 'Kila mfumo umesanifiwa kulingana na mazingira halisi ya kiutendaji na kikodi nchini Tanzania, ukiondoa makosa na kuleta udhibiti kamili.' 
              : 'Our architectures are carefully customized for administrative, linguistic, and regulatory environments in East Africa.'}
          </p>
        </div>

        {/* Flagship Projects Grid */}
        <div className="space-y-28">
          {currentProjects.map((project, idx) => {
            const ProjectIcon = project.icon;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="grid lg:grid-cols-12 gap-12 items-center bg-white border border-slate-200/60 rounded-[32px] p-8 lg:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden group"
              >
                {/* Floating subtle background light */}
                <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-b ${project.accentColor} opacity-[0.02] filter blur-[60px] pointer-events-none -z-10`} />

                {/* Left Column (Alternating layout for Visuals) */}
                <div className={`lg:col-span-6 ${idx % 2 === 0 ? 'lg:order-1' : 'lg:order-2'} relative`}>
                  <div className={`absolute -inset-4 bg-gradient-to-tr ${project.accentColor} opacity-5 rounded-[40px] filter blur-xl -z-10`} />
                  
                  {/* Laptop mockup frame header details */}
                  <div className="bg-slate-900 rounded-t-2xl p-3 flex items-center justify-between border-b border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                    </div>
                    <div className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                      {project.id === 'mssis-school' ? 'mssis.lexon.co.tz' : project.id === 'eministry-grace' ? 'lexonchurch.com' : 'retail.lexon.co.tz'}
                    </div>
                    <div className="w-6" />
                  </div>

                  {/* Rendering Mockup Component */}
                  <div className="border border-slate-800/20 rounded-b-2xl overflow-hidden bg-slate-950 p-1 lg:p-2 shadow-2xl relative">
                    {renderProjectVisual(project.mockupType)}
                  </div>

                  {/* Float Info Box */}
                  <div className={`absolute -bottom-4 -right-4 bg-gradient-to-r ${project.accentColor} text-white border-2 border-white px-5 py-3 rounded-2xl shadow-xl z-20 flex flex-col ${project.accentShadow}`}>
                    <span className="text-[8px] text-white/70 uppercase tracking-widest font-black">
                      {isSw ? 'IDARA YA HUDUMA' : 'VERTICAL'}
                    </span>
                    <span className="font-extrabold text-white tracking-wider text-xs uppercase mt-0.5 font-sans">
                      {project.industry}
                    </span>
                  </div>
                </div>

                {/* Right Column (Alternating layout for Content) */}
                <div className={`lg:col-span-6 ${idx % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                  {/* Category Pill */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`p-2 rounded-xl ${project.bgColor} ${project.textColor} border ${project.borderColor}`}>
                      <ProjectIcon size={18} />
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-wider ${project.textColor}`}>
                      {project.highlightText}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-2xl sm:text-4xl font-sans font-black text-slate-900 mb-4 tracking-tight leading-tight">
                    {project.title}
                  </h3>

                  {/* Project Description */}
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                    {project.description}
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-3 mb-6">
                    {project.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm font-semibold text-slate-700">
                        <CheckCircle size={16} className={`${project.textColor} shrink-0 mt-0.5`} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Metrics Box */}
                  <div className="grid grid-cols-3 gap-4 p-5 bg-slate-50 border border-slate-200/80 rounded-2xl mb-8">
                    {project.metrics.map((m, i) => (
                      <div key={i} className={`border-l-2 ${project.borderColor.replace('border-', 'border-')} pl-3`}>
                        <div className="text-sm sm:text-base font-mono font-black text-slate-900 tracking-tight">{m.value}</div>
                        <div className="text-[9px] uppercase text-slate-400 tracking-wider font-extrabold mt-1">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Built With Tech Badges */}
                  <div className="mb-8">
                    <span className="text-[10px] font-mono uppercase text-slate-400 tracking-widest font-extrabold mb-3.5 block">
                      {isSw ? 'ZANA NA TEKNOLOJIA' : 'ENGINEERED WITH'}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className={`px-3 py-1 ${project.bgColor} ${project.textColor} rounded-lg text-[10px] font-mono font-extrabold border ${project.borderColor}`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action row with inquiry triggers */}
                  <div className="flex flex-wrap gap-3 items-center">
                    <Link 
                      to={project.productLink}
                      className={`inline-flex items-center gap-1.5 bg-gradient-to-r ${project.accentColor} text-white font-black py-3 px-6 rounded-xl text-xs transition-transform hover:-translate-y-0.5 shadow-lg ${project.accentShadow} cursor-pointer`}
                    >
                      {isSw ? 'Angalia Huduma Hii' : 'Explore Platform'}
                      <ArrowUpRight size={14} />
                    </Link>

                    <Link 
                      to="/contact" 
                      className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 font-bold py-3 px-5 rounded-xl text-xs transition-colors cursor-pointer"
                    >
                      {isSw ? 'Pata Maelezo / Wasub' : 'Inquire / WhatsApp'}
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* National Standards & Quality Seal - Tanzania Theme */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 rounded-[32px] bg-white border border-slate-200 p-8 lg:p-16 text-center relative overflow-hidden shadow-lg"
        >
          {/* Flag-colored accent strip at top */}
          <div className="absolute top-0 left-0 right-0 h-[4px] flex">
            <span className="w-1/3 bg-[#16a34a] h-full" /> {/* Green */}
            <span className="w-1/6 bg-[#f59e0b] h-full" /> {/* Yellow */}
            <span className="w-1/6 bg-black h-full" />    {/* Black */}
            <span className="w-1/3 bg-[#2563eb] h-full" /> {/* Blue */}
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20 mb-2 shadow-xs">
              <ShieldCheck size={32} className="animate-pulse" />
            </div>

            <h3 className="text-2xl sm:text-3xl font-sans font-black text-slate-900 leading-tight">
              {isSw ? 'Viwango vya Ubora vya Kitaifa nchini Tanzania' : 'Regional Compliance & Server Reliability'}
            </h3>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-semibold">
              {isSw 
                ? 'Mifumo yetu yote mitatu inatii kikamilifu miongozo na mifumo ya kiserikali na kiusalama nchini ikiwemo sheria za TRA, miongozo ya ufaulu wa NECTA pamoja na makusanyo ya sadaka kwa ushirikiano rasmi na Selcom.'
                : 'Our solutions comply with municipal data privacy directives, automatic TRA-aligned tax ledgers, and official Selcom payment APIs with millisecond notification latencies.'}
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-5 text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-lg"><Award size={14} className="text-emerald-500" /> NECTA CALC APPROVED</span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-lg"><Database size={14} className="text-emerald-500" /> CLOUD DEPLOYED</span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-lg"><CheckCircle size={14} className="text-emerald-500" /> SELCOM REGISTERED</span>
            </div>
          </div>
        </motion.section>

        {/* Live Demo Request Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-slate-900 to-slate-950 rounded-[32px] p-8 lg:p-12 text-center text-white relative overflow-hidden shadow-2xl border border-slate-800"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full filter blur-[100px] pointer-events-none" />
          
          <div className="max-w-xl mx-auto space-y-6 relative z-10">
            <h3 className="text-2xl sm:text-3xl font-sans font-black">
              {isSw ? 'Unahitaji Maonyesho ya Mfumo?' : 'Want a Personal Deep-Dive?'}
            </h3>
            <p className="text-slate-300 text-sm font-semibold">
              {isSw 
                ? 'Timu yetu ya kiufundi ipo tayari kukupitisha kwenye mfumo uliouchagua kwa njia ya zoom au kuja moja kwa moja ofisini kwako.' 
                : 'Schedule a screen-share session with our product engineers or request an on-site system installation walkthrough.'}
            </p>
            <div>
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 bg-[#10b981] hover:bg-[#0da270] text-white font-black uppercase tracking-widest px-8 py-4 rounded-xl text-xs transition-transform hover:-translate-y-0.5 shadow-lg shadow-emerald-500/10 cursor-pointer"
              >
                {isSw ? 'Wasiliana Nasi Sasa' : 'Schedule Call Now'}
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Projects;
