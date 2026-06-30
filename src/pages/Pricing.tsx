import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Github, Layers, BookOpen, Briefcase } from 'lucide-react';
import SEO from '../components/layout/SEO';
import { useLanguage } from '../context/LanguageContext';

type ProductType = 'church' | 'school' | 'accounting';

const Pricing: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProductType>('church');
  const { language } = useLanguage();
  
  const isSwahili = language === 'sw';

  // Customized pricing data exactly matching user instructions:
  // - Church starts at 25, 55, and 75 per month
  // - School is 50,000 per month
  // - Accounting is 20 per month
  const pricingData = {
    church: {
      title: isSwahili ? "Mifumo ya Makanisa (e-Ministry)" : "e-Ministry / Lexon Church",
      subtitle: isSwahili 
        ? "Mfumo wetu mkuu wa usimamizi wa makanisa unakupa uwezo wa kusimamia waumini, matawi yote na mawasiliano kote Afrika."
        : "Our flagship church coordination suite scales seamlessly with your congregation to handle member directories, branches, and SMS alerts.",
      icon: <Layers size={18} className="text-[#1e3a8a]" />,
      plans: [
        {
          name: isSwahili ? "Kiwango cha Kwanza (Starter)" : "Starter Parish",
          price: "Tsh 65,000",
          period: isSwahili ? "/ mwezi" : "/ month",
          desc: isSwahili 
            ? "Inafaa kwa parishi ndogo zinazoanza kutumia mifumo ya kidijitali." 
            : "Perfect for local parishes starting their digital administration journey.",
          popular: false,
          features: isSwahili ? [
            "Usajili wa Waumini hadi 500",
            "Usimamizi wa Vikundi & Jumuiya",
            "Kumbukumbu za Sadaka na Zaka",
            "Ripoti za wiki kupitia SMS",
            "Msaada wa barua pepe wa kiwango cha kwanza"
          ] : [
            "Up to 500 Registered Members",
            "Small Group & Cell Coordination",
            "Basic Tithe & Offering Registers",
            "Weekly Summary Alerts via SMS",
            "Standard email & ticket support"
          ]
        },
        {
          name: isSwahili ? "Kiwango cha Kati (Standard)" : "Standard Diocese",
          price: "Tsh 145,000",
          period: isSwahili ? "/ mwezi" : "/ month",
          desc: isSwahili 
            ? "Mfumo thabiti wenye ujumbe wa SMS kwa parishi zilizoimarika na matawi yao." 
            : "Advanced multi-tier database for established parishes and dioceses.",
          popular: true,
          features: isSwahili ? [
            "Usajili wa Waumini hadi 2,500",
            "Vikundi vyote vya Kikanisa na Idara",
            "Risiti za Kidijitali papo hapo kupitia SMS",
            "Usimamizi kamili wa Leja ya Fedha",
            "Msaada maalum wa simu na WhatsApp 24/7"
          ] : [
            "Up to 2,500 Registered Members",
            "All Church Groups & Departments",
            "Instant Automated Next SMS Receipts",
            "Comprehensive Ledger registers",
            "24/7 Priority WhatsApp & Phone support"
          ]
        },
        {
          name: isSwahili ? "Kiwango cha Juu (Enterprise)" : "Enterprise Cathedral",
          price: "Tsh 195,000",
          period: isSwahili ? "/ mwezi" : "/ month",
          desc: isSwahili 
            ? "Maingiliano kamili ya matawi yote nchi nzima na usalama mkubwa zaidi wa data." 
            : "Complete visual dashboard, unlimited messages, and multi-branch syncing.",
          popular: false,
          features: isSwahili ? [
            "Idadi ya Waumini BILA KIKOMO",
            "Uunganishaji kamili wa Matawi (Multi-branch)",
            "Ripoti za Ukaguzi wa Kifedha (Auditable sheets)",
            "Tovuti maalum na Domain yako (Custom brand domain)",
            "Mafunzo ya viongozi na Meneja maalum wa akaunti"
          ] : [
            "Unlimited Registered Members",
            "Multi-branch and Station Synchronization",
            "Audit-ready Financial Analytical Sheets",
            "Custom Portal Domain & Logo branding",
            "Dedicated Account Manager & Admin training"
          ]
        }
      ]
    },
    school: {
      title: isSwahili ? "Mfumo wa Shule (Lexon School Portal)" : "Lexon School Portal (MSSIS)",
      subtitle: isSwahili 
        ? "Mfumo wa kisasa wa kiotomatiki unaoratibu matokeo (grades/GPA) ya wanafunzi, ripoti, na kusimamia malipo ya ada."
        : "Advanced academic portal tracking student terminal grades, report cards, fee ledger deposits, and instant parent alerts.",
      icon: <BookOpen size={18} className="text-[#1e3a8a]" />,
      plans: [
        {
          name: isSwahili ? "Uandikishaji wa Kitaaluma (Academic Core)" : "Academic Core Portal",
          price: "Tsh 50,000",
          period: isSwahili ? "/ mwezi" : "/ month",
          desc: isSwahili 
            ? "Kiwango cha kipekee chenye uwezo wa juu kwa shule za msingi, sekondari na vyuo." 
            : "Complete system access tailored for local primary, secondary, and preparatory schools.",
          popular: true,
          features: isSwahili ? [
            "Idadi ya wanafunzi na walimu bila kikomo",
            "Uingizaji wa Matokeo & GPA za kila muhula",
            "Kadi za Maendeleo ya Kitaaluma (Report cards)",
            "Mfumo wa Next SMS kutuma matokeo kwa wazazi",
            "Ufuatiliaji wa ada na kutoa risiti za kidijitali",
            "Msaada thabiti wa kiufundi kutoka kwa wahandisi wetu"
          ] : [
            "Unlimited Student & Teacher Profiles",
            "Terminal Exam grading & automated GPA calculation",
            "Beautiful academic progress report cards",
            "Integrated Next SMS parental alert gateway",
            "School fee deposit ledger & balances dashboard",
            "Comprehensive technical support & training manuals"
          ]
        }
      ]
    },
    accounting: {
      title: isSwahili ? "Mfumo wa Hesabu (Lexon Accounting)" : "Lexon Accounting Software",
      subtitle: isSwahili 
        ? "Mfumo imara wa leja ya fedha unaorahisisha ankara za kitaalamu, kufuatilia mtiririko wa fedha, na usajili wa kodi."
        : "Professional-grade ledger system to streamline custom invoicing, cashflow tracking, vendor accounts, and regional tax compliance.",
      icon: <Briefcase size={18} className="text-[#1e3a8a]" />,
      plans: [
        {
          name: isSwahili ? "Leja ya Biashara (Business Ledger)" : "Business Ledger Suite",
          price: "Tsh 50,000",
          period: isSwahili ? "/ mwezi" : "/ month",
          desc: isSwahili 
            ? "Suluhisho kamili la hesabu na usimamizi wa kodi kwa maduka na makampuni ya ndani." 
            : "Complete control over double-entry accounting transactions, custom invoices, and tax reporting.",
          popular: true,
          features: isSwahili ? [
            "Leja Kuu Salama ya Double-Entry",
            "Utengenezaji wa Ankara (Invoices/Bills) za kitaalamu",
            "Ufuatiliaji wa Matumizi na Mikataba ya Wauzaji",
            "Ripoti za Faida na Hasara (P&L) kiotomatiki",
            "Mifumo ya kodi na VAT tayari kwa Afrika Mashariki",
            "Uhifadhi salama wa data kwenye wingu letu (Secure cloud storage)"
          ] : [
            "Secure Double-Entry General Ledger",
            "Custom Professional Invoice & Billing Creator",
            "Expense Tracking & Vendor Accounts management",
            "Automated Real-time Profit & Loss statements",
            "Tax (VAT ready) compliance for East African frameworks",
            "Encrypted database storage on our secure cloud server"
          ]
        }
      ]
    }
  };

  const activeProduct = pricingData[activeTab];

  return (
    <div className="pt-32 pb-24 bg-white text-slate-700">
      <SEO 
        title={isSwahili ? "Bei na Gharama za Mifumo Yetu" : "Our Pricing Plans"}
        description="Investment tiers designed to scale alongside your organization's progressive integration—from school portals to enterprise suites."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 rounded-full bg-[#facc15]/10 border border-[#facc15]/30 text-[#eab308] text-xs font-bold uppercase tracking-wider mb-6"
          >
            {isSwahili ? "SURA YA KAZI NA GHARAMA" : "Product-Specific Investment Plans"}
          </motion.div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-black tracking-tight text-slate-900 mb-6">
            {isSwahili ? "Gharama " : "Simple "}
            <span className="text-[#1e3a8a]">{isSwahili ? "Mizani." : "Pricing."}</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto px-2 font-medium">
            {isSwahili 
              ? "Gharama maalum na rahisi kulingana na mahitaji ya taasisi yako. Chagua bidhaa kuona gharama zake." 
              : "Transparent investment tiers tailored precisely per product to match the scale of your growing organization."}
          </p>
        </div>

        {/* Tab Switcher - Yellow and Blue themed */}
        <div className="flex justify-center mb-12">
          <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1.5 border border-slate-200 shadow-sm max-w-full overflow-x-auto">
            
            {/* Tab 1: Church */}
            <button
              onClick={() => setActiveTab('church')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'church'
                  ? 'bg-[#1e3a8a] text-[#facc15] shadow-md scale-[1.02]'
                  : 'text-slate-600 hover:bg-slate-200/60 hover:text-[#1e3a8a]'
              }`}
            >
              <Layers size={15} />
              {isSwahili ? "e-Ministry (Church)" : "e-Ministry (Church)"}
            </button>

            {/* Tab 2: School */}
            <button
              onClick={() => setActiveTab('school')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'school'
                  ? 'bg-[#1e3a8a] text-[#facc15] shadow-md scale-[1.02]'
                  : 'text-slate-600 hover:bg-slate-200/60 hover:text-[#1e3a8a]'
              }`}
            >
              <BookOpen size={15} />
              {isSwahili ? "School Portal" : "School Portal (MSSIS)"}
            </button>

            {/* Tab 3: Accounting */}
            <button
              onClick={() => setActiveTab('accounting')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'accounting'
                  ? 'bg-[#1e3a8a] text-[#facc15] shadow-md scale-[1.02]'
                  : 'text-slate-600 hover:bg-slate-200/60 hover:text-[#1e3a8a]'
              }`}
            >
              <Briefcase size={15} />
              {isSwahili ? "Accounting" : "Accounting Software"}
            </button>

          </div>
        </div>

        {/* Product Overview Title */}
        <div className="max-w-4xl mx-auto text-center mb-12 border-b border-slate-150 pb-8">
          <div className="flex justify-center items-center gap-2.5 mb-3">
            {activeProduct.icon}
            <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900">
              {activeProduct.title}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto font-semibold">
            {activeProduct.subtitle}
          </p>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
          {activeProduct.plans.map((plan, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              whileHover={{ 
                scale: 1.025,
                y: -6,
                rotate: [0, -0.8, 0.8, -0.5, 0.5, 0],
                transition: { duration: 0.4 }
              }}
              className={`flex-1 min-w-[280px] max-w-[380px] bg-slate-50 border-2 rounded-[32px] p-8 flex flex-col justify-between relative shadow-sm transition-all ${
                plan.popular 
                  ? 'border-[#1e3a8a] bg-slate-50/70 shadow-lg' 
                  : 'border-[#1e3a8a]/10 hover:border-[#facc15]'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#facc15] text-[#1e3a8a] text-[9px] font-black uppercase tracking-widest rounded-full shadow-md">
                  {isSwahili ? "Inayopendekezwa Zaidi" : "Most Popular"}
                </div>
              )}
              <div>
                <div className="mb-6">
                  <div className="text-[#1e3a8a] font-mono text-[10px] uppercase font-bold tracking-wider mb-1">
                    {isSwahili ? "GADA LA HUDUMA" : "SERVICE TIER"}
                  </div>
                  <h3 className="text-xl font-black text-slate-900">{plan.name}</h3>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-[#1e3a8a] font-mono">{plan.price}</span>
                    <span className="text-slate-500 text-xs font-bold">{plan.period}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 font-bold leading-relaxed">{plan.desc}</div>
                </div>

                <div className="border-t border-slate-200/60 pt-6 mb-8">
                  <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest block mb-4">
                    {isSwahili ? "Vipengele vya Mfumo:" : "Features Included:"}
                  </span>
                  <ul className="space-y-3.5 text-[13px]">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-slate-700 font-semibold leading-tight">
                        <Check size={14} className="text-[#eab308] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <a
                href={`/contact?product=${activeTab}&plan=${encodeURIComponent(plan.name)}`}
                className={`w-full flex justify-center items-center py-4 rounded-2xl text-xs font-bold transition-all text-center cursor-pointer ${
                  plan.popular
                    ? 'bg-[#1e3a8a] text-[#facc15] hover:bg-[#1d4ed8] shadow-sm'
                    : 'border border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a]/5'
                }`}
              >
                {isSwahili ? "Sajili Mfumo Sasa" : "Choose this Plan"}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Quote Section for custom builds */}
        <div className="mt-20 max-w-4xl mx-auto bg-slate-50 border border-slate-200/60 rounded-[32px] p-8 sm:p-10 text-center relative overflow-hidden shadow-xs">
          <div className="absolute top-0 left-0 right-0 h-[4px] bg-[#facc15]" />
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-3">
            {isSwahili ? "Je, Una Mahitaji Maalum ya Kipekee?" : "Need a Fully Customized Network?"}
          </h3>
          <p className="text-sm text-slate-650 font-semibold max-w-2xl mx-auto mb-6">
            {isSwahili 
              ? "Tunatoa huduma ya kuunda mifumo kulingana na miundo, miongozo na nembo ya taasisi yako. Wasiliana na wasanifu wetu wa mifumo leo kupata bei yako."
              : "For dioceses, regional school associations, or central enterprise databases requiring private server networks, custom USSD modules, or white-label solutions."}
          </p>
          <a 
            href="/contact?product=custom"
            className="inline-flex items-center gap-2 bg-[#1e3a8a] hover:bg-[#1d4ed8] text-white text-xs sm:text-sm font-bold py-3 px-8 rounded-full shadow-sm transition-colors cursor-pointer"
          >
            {isSwahili ? "Tuma Ombi la Makadirio (Get Quote)" : "Consult Systems Architect"}
          </a>
        </div>

        <div className="mt-16 text-center text-slate-400 text-xs font-mono tracking-wider max-w-2xl mx-auto px-4">
          {isSwahili 
            ? "Mikataba na leseni zote za usajili zinasimamiwa na Lexon Tech Solutions Co. Ltd nchini Tanzania na Afrika Mashariki."
            : "All system licenses, software contracts, and updates are administered securely by Lexon Tech Solutions Co. Ltd."}
        </div>

      </div>
    </div>
  );
};

export default Pricing;
