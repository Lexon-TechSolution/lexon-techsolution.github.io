import React from 'react';
import { Target, Eye, Cpu, Layers, TrendingUp } from 'lucide-react';
import SEO from '../components/layout/SEO';
import { motion } from 'framer-motion';
import saidPortraitImg from '../assets/images/lexon_consultant_hero_1782560344465.jpg';
import schoolDashboardImg from '../assets/images/lexon_school_dashboard_1781473641711.jpg';
import churchPosterImg from '../assets/images/lexon_church_poster_1782554597194.jpg';

const About: React.FC = () => {
  return (
    <div className="pt-28 pb-20 bg-white text-slate-800">
      <SEO 
        title="About Us | Lexon Tech Solutions"
        description="Learn about Lexon Tech, our strategic roadmap, payment frameworks, and mission to advance digital services in East Africa."
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-left">
        
        {/* SECTION 1: STORY HEADER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          <div className="lg:col-span-7">
            <span className="block text-xs font-black tracking-widest text-[#facc15] uppercase mb-4">
              ABOUT OUR COMPANY
            </span>
            <h1 className="text-4xl sm:text-5xl font-display font-black text-slate-900 leading-[1.1] mb-6">
              Engineering African <br />
              <span className="text-[#1e3a8a]">Enterprise Databases</span>
            </h1>
            <p className="text-base text-slate-650 font-semibold leading-relaxed mb-6 max-w-xl">
              Lexon Tech Solutions is a dedicated enterprise technology and custom software systems developer operating across Africa, with headquarters in Dar es Salaam, Tanzania. We specialize in streamlining administrative workloads by providing customized portals and digital registers for schools, religious institutions, corporate offices, and local enterprise operations.
            </p>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xl">
              Through the deployment of our advanced school management portal, comprehensive eMinistry databases (lexonchurch.com/eMinistry), and custom enterprise registers, we empower thousands of daily users to complete crucial admin workflows in real-time.
            </p>
          </div>

          {/* Fact Sheet numbers */}
          <div className="lg:col-span-5 bg-[#1e3a8a]/5 border-2 border-[#1e3a8a]/20 p-8 rounded-[32px] shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#facc15]" />
            <h3 className="text-lg font-black text-[#1e3a8a] mb-6 border-b border-[#1e3a8a]/10 pb-3 font-display">
              Lexon Key Metric Logs
            </h3>
            <div className="space-y-6">
              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold block">Years of System Activity</span>
                <span className="text-3xl font-black text-[#1e3a8a]">5+ Years Live</span>
              </div>
              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold block">Software Hours Engineered</span>
                <span className="text-3xl font-black text-[#eab308]">15K+ Hours</span>
              </div>
              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold block">Integrations Deployed</span>
                <span className="text-3xl font-black text-[#1e3a8a]">1,500+ Nodes</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: THE TRIAD ADVANTAGE */}
        <section className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="block text-xs font-black tracking-widest text-[#facc15] uppercase mb-2">
              WHY CHOOSE US
            </span>
            <h2 className="text-3xl font-display font-black text-slate-900">
              The Triad Advantage
            </h2>
            <p className="text-slate-500 text-sm font-semibold mt-2">
              Our core three-pronged deployment philosophy guarantees absolute runtime reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Advantage 1 */}
            <motion.div 
              whileHover={{ 
                scale: 1.025,
                y: -6,
                rotate: [0, -0.8, 0.8, -0.5, 0.5, 0],
                transition: { duration: 0.4 }
              }}
              className="bg-white border-2 border-[#1e3a8a]/10 rounded-2xl p-6 hover:bg-slate-50 hover:border-[#facc15] transition-all duration-300 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-[#1e3a8a]/10 border-2 border-[#1e3a8a]/20 text-[#1e3a8a] flex items-center justify-center mb-6">
                <Cpu size={20} />
              </div>
              <h3 className="text-xl font-black text-[#1e3a8a] mb-3">Enterprise Systems</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                We build administrative databases on highly secure, low-latency structures, safeguarding school portals and member records against diagnostic discrepancies.
              </p>
            </motion.div>

            {/* Advantage 2 */}
            <motion.div 
              whileHover={{ 
                scale: 1.025,
                y: -6,
                rotate: [0, -0.8, 0.8, -0.5, 0.5, 0],
                transition: { duration: 0.4 }
              }}
              className="bg-white border-2 border-[#1e3a8a]/10 rounded-2xl p-6 hover:bg-slate-50 hover:border-[#facc15] transition-all duration-300 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-[#facc15]/10 border-2 border-[#facc15]/30 text-[#eab308] flex items-center justify-center mb-6">
                <Layers size={20} />
              </div>
              <h3 className="text-xl font-black text-[#1e3a8a] mb-3">Local UX Alignment</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Our responsive designs are optimized for standard handheld screens and slow local connection feeds, assuring seamless transactions under on-ground settings.
              </p>
            </motion.div>

            {/* Advantage 3 */}
            <motion.div 
              whileHover={{ 
                scale: 1.025,
                y: -6,
                rotate: [0, -0.8, 0.8, -0.5, 0.5, 0],
                transition: { duration: 0.4 }
              }}
              className="bg-white border-2 border-[#1e3a8a]/10 rounded-2xl p-6 hover:bg-slate-50 hover:border-[#facc15] transition-all duration-300 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-[#1e3a8a]/10 border-2 border-[#1e3a8a]/20 text-[#1e3a8a] flex items-center justify-center mb-6">
                <TrendingUp size={20} />
              </div>
              <h3 className="text-xl font-black text-[#1e3a8a] mb-3">Sustained Growth</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Every solution comes equipped with extensive auditing capabilities and automatic next-generation SMS summaries to streamline management workflows.
              </p>
            </motion.div>

          </div>
        </section>

        {/* SECTION: OUR CORE AUTOMATED SYSTEMS PREVIEWS */}
        <section className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#facc15] font-black bg-[#facc15]/10 px-2.5 py-1 rounded">WHAT WE CHOOSE TO BUILD</span>
            <h2 className="text-3xl font-display font-black text-[#1e3a8a] mt-3">
              Our Core Automated Systems
            </h2>
            <p className="text-slate-500 text-sm font-semibold mt-1">
              Mitandao thabiti iliyoundwa kurahisisha kazi kote barani Afrika.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* School System Preview */}
            <motion.div 
              whileHover={{ 
                scale: 1.02,
                y: -6,
                rotate: [0, -0.8, 0.8, -0.5, 0.5, 0],
                transition: { duration: 0.4 }
              }}
              className="bg-slate-50 rounded-[32px] p-6 border-2 border-[#1e3a8a]/10 hover:border-[#facc15] hover:shadow-md transition-all duration-300 group text-left cursor-pointer"
            >
              <div className="aspect-[16/10] rounded-2.5xl overflow-hidden mb-6 bg-slate-150 border-2 border-[#1e3a8a]/10 shadow-sm">
                <img 
                  src={schoolDashboardImg} 
                  alt="Lexon School Management Portal Screenshot" 
                  className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-xl font-black text-[#1e3a8a] mb-2">Lexon School Management System (SMS)</h3>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Mfumo wa kisasa wa kiotomatiki unaoratibu matokeo (grades/GPA) ya wanafunzi, kutoa ripoti, na kusimamia malipo ya ada, kufuatana na miongozo yote ya mifumo ya elimu.
              </p>
            </motion.div>

            {/* eMinistry Preview */}
            <motion.div 
              whileHover={{ 
                scale: 1.02,
                y: -6,
                rotate: [0, -0.8, 0.8, -0.5, 0.5, 0],
                transition: { duration: 0.4 }
              }}
              className="bg-slate-50 rounded-[32px] p-6 border-2 border-[#1e3a8a]/10 hover:border-[#facc15] hover:shadow-md transition-all duration-300 group text-left cursor-pointer"
            >
              <div className="aspect-[16/10] rounded-2.5xl overflow-hidden mb-6 bg-slate-150 border-2 border-[#1e3a8a]/10 shadow-sm">
                <img 
                  src={churchPosterImg} 
                  alt="eMinistry Church Portal Illustration" 
                  className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-xl font-black text-[#1e3a8a] mb-2">eMinistry Church Administration Suite</h3>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Database salama ya makanisa na parishi nchini Tanzania na barani Afrika. Inasajili waumini mara moja tu, kurahisisha cell groups, na kutuma ujumbe mfupi wa SMS kiotomatiki.
              </p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3: VISION & MISSION */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          
          <div className="p-10 rounded-2xl bg-[#facc15]/5 border-2 border-[#facc15]/20 relative">
            <div className="absolute top-0 right-10 w-12 h-1 bg-[#1e3a8a]" />
            <div className="w-10 h-10 rounded-full bg-[#facc15]/20 flex items-center justify-center text-[#eab308] mb-5">
              <Eye size={20} />
            </div>
            <h3 className="text-2xl font-black text-[#1e3a8a] mb-4 font-display">
              Our Vision
            </h3>
            <p className="text-sm text-slate-650 leading-relaxed font-semibold">
              To be the most trustworthy enterprise software partner and custom secure billing systems developer across the African continent, allowing businesses and schools to manage data safely.
            </p>
          </div>

          <div className="p-10 rounded-2xl bg-[#1e3a8a]/5 border-2 border-[#1e3a8a]/15 relative">
            <div className="absolute top-0 right-10 w-12 h-1 bg-[#facc15]" />
            <div className="w-10 h-10 rounded-full bg-[#1e3a8a]/10 flex items-center justify-center text-[#1e3a8a] mb-5">
              <Target size={20} />
            </div>
            <h3 className="text-2xl font-black text-[#1e3a8a] mb-4 font-display">
              Our Mission
            </h3>
            <p className="text-sm text-slate-650 leading-relaxed font-semibold">
              Engineering secure, cloud-enabled web platforms that eliminate coordination delays, protect client database privacy metrics, and assist corporate leaders with visual tools.
            </p>
          </div>

        </div>

        {/* SECTION 4: LEAD PERFORMANCE AND SYSTEM ARCHITECT */}
        <section className="mb-20">
          <div className="bg-[#1e3a8a]/5 border-2 border-[#1e3a8a]/15 rounded-[40px] p-8 md:p-12 lg:p-16 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-[#1e3a8a] via-[#facc15] to-[#1e3a8a]" />
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #1e3a8a 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }} />
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              {/* Profile Image container */}
              <div className="md:col-span-5 lg:col-span-4 flex justify-center">
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-full md:aspect-square bg-slate-200 border-4 border-[#facc15] shadow-xl rounded-[32px] overflow-hidden group">
                  <img 
                    src={saidPortraitImg} 
                    alt="Said Mohamed Saidi, Lead Systems Architect at Lexon Tech" 
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60" />
                  <span className="absolute bottom-4 left-4 text-[#facc15] text-[9px] font-mono font-black tracking-widest uppercase bg-[#1e3a8a]/90 px-2.5 py-1 rounded-md backdrop-blur-xs">
                    LEAD ARCHITECT
                  </span>
                </div>
              </div>

              {/* Narratives and details */}
              <div className="md:col-span-7 lg:col-span-8 text-left space-y-4">
                <span className="inline-block bg-[#1e3a8a] text-[#facc15] text-[9.5px] font-black tracking-widest px-3 py-1.5 rounded uppercase font-mono">
                  ★ FOUNDER & SYSTEMS ARCHITECT ★
                </span>
                <h3 className="text-3xl sm:text-4xl font-display font-black text-slate-900 leading-none">
                  Said Mohamed Saidi
                </h3>
                <p className="text-xs uppercase tracking-wider text-[#1e3a8a] font-mono font-black">
                  Lead Systems Architect & Chief Technology Officer
                </p>
                
                <p className="text-sm sm:text-[14.5px] text-slate-650 font-semibold leading-relaxed">
                  "Kila siku tunajitahidi kuunda zana rahisi na salama kurahisisha usimamizi wa mifumo barani Afrika. Naunganisha nguvu zangu na timu nzima ya uhandisi kuhakikisha kuwa taasisi za kielimu, kidini na kibiashara zinapata mifumo madhubuti, ya haraka na yenye usalama mkubwa zaidi wa data zao za siri."
                </p>

                <div className="grid grid-cols-2 gap-4 pt-2 max-w-md">
                  <div className="bg-white border border-slate-250/60 rounded-2xl p-4">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold block">HQ operations</span>
                    <span className="text-xs font-black text-slate-800 block mt-0.5">Dar es Salaam Office</span>
                  </div>
                  <div className="bg-[#1e3a8a]/5 border border-[#1e3a8a]/10 rounded-2xl p-4">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold block">Support Email</span>
                    <span className="text-xs font-black text-[#1e3a8a] block mt-0.5 select-all font-mono">lexonsupport@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Operational Footer Note */}
        <div className="max-w-xl mx-auto text-center border-t border-slate-200 pt-10">
          <p className="italic text-slate-600 font-semibold">
            "Kila siku tunajitahidi kuunda zana rahisi na salama kurahisisha usimamizi wa mifumo barani Afrika."
          </p>
          <p className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-black mt-2">
            — Said Mohamed Saidi, Lead Systems Architect
          </p>
        </div>

      </div>
    </div>
  );
};

export default About;
