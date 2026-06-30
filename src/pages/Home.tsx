import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Smartphone, 
  GraduationCap, 
  Layers, 
  TrendingUp, 
  Users, 
  ShieldCheck, 
  CheckCircle,
  Clock,
  Briefcase,
  Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/layout/SEO';
import { useLanguage } from '../context/LanguageContext';
import churchPosterImg from '../assets/images/lexon_church_poster_1782554597194.jpg';
import lexonConsultantHeroImg from '../assets/images/lexon_consultant_hero_1782560344465.jpg';
import lexonRetailErpPosterImg from '../assets/images/lexon_retail_erp_poster_1782560676417.jpg';
import lexonSchoolDashboardImg from '../assets/images/lexon_school_dashboard_1781473641711.jpg';

const Home: React.FC = () => {
  const { t } = useLanguage();

  const [customChurchImg, setCustomChurchImg] = React.useState(() => localStorage.getItem('custom_product_image_eministry-grace') || '');
  const [customSchoolImg, setCustomSchoolImg] = React.useState(() => localStorage.getItem('custom_product_image_mssis-school') || '');
  const [customRetailImg, setCustomRetailImg] = React.useState(() => localStorage.getItem('custom_product_image_accounting-software') || '');

  React.useEffect(() => {
    const handleUpdate = () => {
      setCustomChurchImg(localStorage.getItem('custom_product_image_eministry-grace') || '');
      setCustomSchoolImg(localStorage.getItem('custom_product_image_mssis-school') || '');
      setCustomRetailImg(localStorage.getItem('custom_product_image_accounting-software') || '');
    };
    window.addEventListener('product-image-updated', handleUpdate);
    return () => window.removeEventListener('product-image-updated', handleUpdate);
  }, []);

  const AMN_PRODUCTS = [
    {
      title: t('prod.school.title'),
      desc: t('prod.school.desc'),
      image: customSchoolImg || lexonSchoolDashboardImg,
      badge: "SMS PORTAL",
    },
    {
      title: t('prod.church.title'),
      desc: t('prod.church.desc'),
      image: customChurchImg || churchPosterImg,
      badge: "CHURCH SUITE",
    },
    {
      title: t('prod.retail.title'),
      desc: t('prod.retail.desc'),
      image: customRetailImg || lexonRetailErpPosterImg,
      badge: "RETAIL ERP",
    }
  ];

  const HERO_SLIDES = [
    {
      image: lexonConsultantHeroImg,
      alt: 'Lexon Tech Solution Consultant'
    },
    {
      image: churchPosterImg,
      alt: 'eMinistry Church Suite'
    },
    {
      image: lexonRetailErpPosterImg,
      alt: 'Lexon Retail ERP'
    }
  ];

  const [activeSlideIdx, setActiveSlideIdx] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlideIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 12000); // Slower Hero slides transition (12 seconds)
    return () => clearInterval(interval);
  }, []);

  const [currentIdx, setCurrentIdx] = React.useState(0);
  const [phase, setPhase] = React.useState<'incoming' | 'center' | 'flash' | 'outgoing'>('incoming');

  React.useEffect(() => {
    let timer: any;
    
    const runCycle = () => {
      setPhase('incoming');
      
      timer = setTimeout(() => {
        setPhase('center');
        
        timer = setTimeout(() => {
          setPhase('flash');
          
          timer = setTimeout(() => {
            setPhase('outgoing');
            
            timer = setTimeout(() => {
              setCurrentIdx((prev) => (prev + 1) % AMN_PRODUCTS.length);
              runCycle();
            }, 1200); // Slower outgoing slide duration (slow motion)
          }, 1000); // Slower flash/screenshot animation duration
        }, 11000); // Extremely comfortable active center duration (slow motion kabisaa)
      }, 1200); // Slower incoming slide transition duration
    };

    runCycle();
    return () => clearTimeout(timer);
  }, []);

  const getPhaseStyles = () => {
    switch(phase) {
      case 'incoming':
        return {
          transform: 'translateX(100px) scale(0.95)',
          opacity: 0,
          filter: 'blur(8px)',
          transition: 'all 1.2s cubic-bezier(0.19, 1, 0.22, 1)'
        };
      case 'center':
        return {
          transform: 'translateX(0) scale(1.04)',
          opacity: 1,
          filter: 'blur(0px)',
          transition: 'all 1.1s cubic-bezier(0.34, 1.56, 0.64, 1)'
        };
      case 'flash':
        return {
          transform: 'translateX(0) scale(1.06)',
          opacity: 1,
          filter: 'blur(0px)',
          transition: 'all 0.3s ease-out'
        };
      case 'outgoing':
        return {
          transform: 'translateX(-120px) scale(0.92)',
          opacity: 0,
          filter: 'blur(10px)',
          transition: 'all 1.2s cubic-bezier(0.19, 1, 0.22, 1)'
        };
      default:
        return {};
    }
  };

  return (
    <div className="relative bg-white text-slate-800 font-sans">
      <style>{`
        @keyframes nesa-nesa {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.025);
          }
        }
        .animate-nesanesa {
          animation: nesa-nesa 2.2s ease-in-out infinite;
        }
        
        @keyframes marquee-fast {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-fast {
          animation: marquee-fast 11s linear infinite;
        }

        @keyframes scanner {
          0%, 100% { top: 3%; }
          50% { top: 97%; }
        }
      `}</style>
      <SEO 
        title="Lexon Tech Solutions | High-Performance Enterprise Software Africa"
        description="Providing premier School Management Systems, eMinistry Church Suite at lexonchurch.com, and custom Retail ERP SaaS packages across Africa."
      />

      {/* SECTION 1: HERO HEADER - Fullscreen immersive background slider */}
      <section className="relative overflow-hidden min-h-[92vh] bg-slate-950 pt-24 pb-12 border-b border-slate-900 flex flex-col justify-end items-start">
        {/* Full-bleed background slider */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={`bg-${activeSlideIdx}`}
              src={HERO_SLIDES[activeSlideIdx].image}
              alt="Lexon Background Graphic"
              className="w-full h-full object-cover opacity-95 scale-100"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.95, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
          {/* Subtle vignette/gradient to blend edges elegantly, keeping the center crystal clear */}
          <div className="absolute inset-0 bg-slate-950/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/30" />
        </div>

        {/* Left & Right Screen-Edge Arrows for Slider */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            setActiveSlideIdx((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
          }}
          className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-950/65 hover:bg-slate-950/90 text-white flex items-center justify-center border border-white/20 backdrop-blur-md transition-all cursor-pointer z-20 shadow-2xl hover:scale-105"
          aria-label="Previous Slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={(e) => {
            e.preventDefault();
            setActiveSlideIdx((prev) => (prev + 1) % HERO_SLIDES.length);
          }}
          className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-950/65 hover:bg-slate-950/90 text-white flex items-center justify-center border border-white/20 backdrop-blur-md transition-all cursor-pointer z-20 shadow-2xl hover:scale-105"
          aria-label="Next Slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Brand floating colorful halos */}
        <div className="absolute top-1/4 left-1/4 w-[35rem] h-[35rem] bg-[#1e3a8a]/10 rounded-full filter blur-[150px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[30rem] h-[30rem] bg-[#facc15]/5 rounded-full filter blur-[150px] pointer-events-none" />

        {/* Bottom Utility Overlay for Actions & Dots */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          {/* Left side: Premium Compact Glass Card with Sajili & Gundua Mifumo */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-950/70 border border-white/15 backdrop-blur-md p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-wrap gap-4 items-center max-w-full sm:max-w-xl self-start"
          >
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 bg-[#10b981] hover:bg-[#0da270] text-white font-black uppercase tracking-wider px-6 py-3.5 rounded-xl text-xs transition-transform shadow-lg hover:translate-y-[-2px] cursor-pointer"
            >
              {t('hero.btn.register')} <ArrowRight size={14} />
            </Link>
            <Link 
              to="/products" 
              className="inline-flex items-center gap-2 bg-black/40 hover:bg-black/60 border border-white/20 text-white font-black uppercase tracking-wider px-6 py-3.5 rounded-xl text-xs transition-all cursor-pointer"
            >
              {t('hero.btn.explore')}
            </Link>
          </motion.div>

          {/* Slide Indicator Dots on the right */}
          <div className="flex gap-2.5 pb-2 md:self-end self-center">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlideIdx(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeSlideIdx === i ? 'w-8 bg-[#facc15]' : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: INTRO SUMMARY BLOCK */}
      <section className="py-16 bg-white border-b border-slate-200 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            
            {/* Title Row */}
            <div className="lg:col-span-5">
              <h2 className="text-3xl font-display font-black tracking-tight text-[#1e3a8a] leading-tight">
                {t('intro.header')}
              </h2>
            </div>
            
            {/* Extended Paragraph Description */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <p className="text-slate-600 text-[15.5px] leading-relaxed font-medium">
                {t('intro.desc1')}
              </p>
              <p className="text-slate-600 text-[15.5px] leading-relaxed font-semibold mt-4 text-[#10b981]">
                {t('intro.desc2')}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: E-MINISTRY SHOWCASE WITH MOBILE DESIGN */}
      <section className="py-20 bg-[#1e3a8a] text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="absolute -bottom-24 -left-20 w-80 h-80 bg-[#10b981]/15 rounded-full filter blur-xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Suite information list - slides in from the bottom up */}
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="lg:col-span-7"
            >
              <span className="text-xs font-black tracking-widest text-[#facc15] uppercase mb-2 block font-mono">
                {t('church.showcase.tagline')}
              </span>
              <h2 className="text-4xl sm:text-5xl font-display font-black tracking-tight text-white mb-6">
                {t('church.showcase.title')}
              </h2>
              <p className="text-base text-slate-200 leading-relaxed font-medium mb-8 max-w-xl">
                {t('church.showcase.desc')}
              </p>

              {/* Grid bullet points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  t('church.showcase.feature1'),
                  t('church.showcase.feature2'),
                  t('church.showcase.feature3'),
                  t('church.showcase.feature4'),
                  t('church.showcase.feature5'),
                  t('church.showcase.feature6'),
                  t('church.showcase.feature7'),
                  t('church.showcase.feature8'),
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 font-semibold text-[14px] text-white">
                    <CheckCircle className="text-[#10b981] shrink-0" size={16} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <a 
                  href="https://lexonchurch.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#facc15] hover:bg-[#eab308] text-slate-900 font-black tracking-wide px-8 py-3.5 rounded-full text-xs uppercase"
                >
                  {t('global.visit')} <ArrowRight size={14} />
                </a>
              </div>
            </motion.div>

            {/* Simulated smartphone view of church suite */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[310px] bg-slate-900 border-[8px] border-slate-950 rounded-[40px] p-5 shadow-2xl">
                <div className="w-16 h-1 bg-slate-950 rounded-full mx-auto mb-4" />
                
                <div className="bg-slate-50 rounded-2xl p-4 text-slate-800 text-left border border-slate-250">
                  <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-200">
                    <span className="text-[10px] font-black text-[#1e3a8a] tracking-widest uppercase">EMINISTRY PORTAL</span>
                    <span className="text-[9px] bg-[#10b981]/10 text-[#10b981] font-bold px-1.5 py-0.5 rounded">SYSTEMS</span>
                  </div>

                  {/* App interface simulation */}
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { icon: <Users size={16} />, label: t('nav.home') },
                      { icon: <Database size={16} />, label: t('nav.solutions') },
                      { icon: <Smartphone size={16} />, label: t('nav.products') },
                      { icon: <Layers size={16} />, label: t('nav.projects') },
                      { icon: <Clock size={16} />, label: t('nav.pricing') },
                      { icon: <ShieldCheck size={16} />, label: t('nav.blog') },
                    ].map((btn, i) => (
                      <div key={i} className="flex flex-col items-center p-2 rounded-xl bg-white border border-slate-200 hover:border-blue-200 transition-colors text-center shadow-sm">
                        <div className="w-8 h-8 rounded-full bg-[#1e3a8a]/5 text-[#1e3a8a] flex items-center justify-center mb-1">
                          {btn.icon}
                        </div>
                        <span className="text-[8.5px] font-black text-slate-700 leading-tight block">{btn.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom banner block inside phone */}
                  <div className="mt-4 p-2 bg-[#10b981] text-white rounded-xl text-center">
                    <span className="text-[8px] font-mono uppercase tracking-widest text-white/90 block">Active Branch Host</span>
                    <h4 className="text-xs font-black">eMinistry Cloud Node</h4>
                  </div>
                </div>

                <div className="text-center text-white/50 text-[9px] font-mono mt-4">
                  * Live demo workspace register
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: DEEP SOLUTIONS COLLAGE */}
      <section className="py-20 bg-slate-50 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* FLAGSHIP GRAND BANNER: LEXONCHURCH.COM / E-MINISTRY */}
          <div className="w-full bg-[#facc15] text-slate-900 rounded-[40px] p-8 md:p-12 lg:p-16 mb-12 shadow-xl border border-yellow-500/20 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }} />
            <div className="absolute -top-24 -right-20 w-80 h-80 bg-white/20 rounded-full filter blur-2xl pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative z-10">
              {/* Left narrative content - slides in from the left */}
              <motion.div 
                initial={{ opacity: 0, x: -120 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="lg:col-span-7 col-span-12"
              >
                <span className="inline-block bg-slate-950 text-[#facc15] text-[10px] font-black tracking-widest px-3 py-1.5 rounded-md uppercase mb-6 font-mono">
                  {t('banner.flagship')}
                </span>
                <h3 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-slate-950 mb-4 leading-none">
                  {t('banner.title')}
                </h3>
                <p className="text-base sm:text-lg font-bold text-slate-850 mb-8 max-w-xl leading-snug">
                  {t('banner.desc')}
                </p>

                {/* Core Features list with high quality styled bullet boxes */}
                <div className="space-y-4 mb-8">
                  {[
                    { title: t('banner.feature1.title'), desc: t('banner.feature1.desc') },
                    { title: t('banner.feature2.title'), desc: t('banner.feature2.desc') },
                    { title: t('banner.feature3.title'), desc: t('banner.feature3.desc') },
                    { title: t('banner.feature4.title'), desc: t('banner.feature4.desc') }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-slate-950 text-[#facc15] flex items-center justify-center shrink-0 mt-0.5 shadow-md">
                        <CheckCircle size={14} className="text-[#facc15]" />
                      </div>
                      <div>
                        <h4 className="text-sm font-black text-slate-950 leading-tight">{item.title}</h4>
                        <p className="text-xs text-slate-800 font-semibold mt-0.5 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Handwritten Flyer Highlight Box */}
                <div className="flex items-center gap-3 bg-white/40 border border-slate-950/15 rounded-2xl p-4 max-w-md shadow-sm mb-8">
                  <div className="text-2xl shrink-0">✨</div>
                  <p className="text-xs italic font-black text-slate-950 leading-tight">
                    {t('banner.quote')}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4">
                  <a 
                    href="https://lexonchurch.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-900 border-2 border-slate-950 text-white font-black uppercase tracking-wider px-8 py-4 rounded-full text-xs transition-transform shadow-lg hover:translate-y-[-2px] cursor-pointer"
                  >
                    {t('global.visit')} <ArrowRight size={14} />
                  </a>
                  <Link 
                    to="/contact" 
                    className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/40 border-2 border-slate-950/20 text-slate-950 font-black uppercase tracking-wider px-8 py-4 rounded-full text-xs transition-all cursor-pointer"
                  >
                    {t('banner.btn.register')}
                  </Link>
                </div>
              </motion.div>

              {/* Right graphical assets: dual smartphone & leader portrait */}
              <div className="lg:col-span-5 col-span-12 flex flex-col sm:flex-row items-center justify-center gap-6 relative">
                {/* 1. Real-World smartphone mock matching stats */}
                <div className="relative w-full max-w-[270px] bg-slate-900 border-[8px] border-slate-950 rounded-[40px] p-4 shadow-2xl shrink-0 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                  <div className="w-12 h-1 bg-slate-950 rounded-full mx-auto mb-3" />
                  <div className="bg-slate-950 text-white rounded-2xl p-3 text-left border border-slate-800 font-sans">
                    <div className="text-[9px] font-black tracking-widest text-[#facc15] uppercase border-b border-slate-800 pb-1.5 mb-2.5 flex justify-between">
                      <span>Lexon Church Cloud</span>
                      <span className="text-[#10b981] animate-pulse">{t('phone.live')}</span>
                    </div>
                    
                    <div className="bg-yellow-400 text-slate-900 rounded-xl p-2.5 mb-3">
                      <span className="text-[8px] font-mono font-black uppercase tracking-widest block opacity-80">{t('phone.welcome')}</span>
                      <p className="text-[10px] font-black leading-tight mt-0.5">{t('phone.summary')}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5">
                        <span className="text-[7.5px] text-slate-400 block uppercase font-mono">{t('phone.guests')}</span>
                        <span className="text-sm font-black text-white">128</span>
                      </div>
                      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5">
                        <span className="text-[7.5px] text-slate-400 block uppercase font-mono">{t('phone.members')}</span>
                        <span className="text-sm font-black text-[#facc15]">1,256</span>
                      </div>
                      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5">
                        <span className="text-[7.5px] text-slate-400 block uppercase font-mono">{t('phone.attendance')}</span>
                        <span className="text-sm font-black text-[#10b981]">892</span>
                      </div>
                      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5">
                        <span className="text-[7.5px] text-slate-400 block uppercase font-mono">{t('phone.tithes')}</span>
                        <span className="text-[11px] font-black text-rose-400 leading-none block mt-0.5">TZS 3.4M</span>
                      </div>
                    </div>

                    <div className="p-2 border border-slate-800 rounded-xl mb-3 bg-[#1e3a8a]/20">
                      <span className="text-[7px] text-slate-400 uppercase font-mono block">{t('phone.events')}</span>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-[8px] font-bold text-slate-200">{t('phone.service')}</span>
                        <span className="text-[7.5px] text-emerald-400 font-mono">{t('phone.sunday')}</span>
                      </div>
                    </div>
                    <div className="text-[7px] text-slate-500 font-mono text-center">
                      * lexonchurch.com/eMinistry Cloud
                    </div>
                  </div>
                </div>

                {/* 2. Layered Premium Product Photo representation */}
                <div className="relative w-full max-w-[210px] bg-white p-2.5 rounded-2xl shadow-2xl rotate-3 border border-slate-200 shrink-0 hidden sm:block hover:rotate-0 transition-transform duration-300">
                  <img 
                    src="https://placehold.co/800x1000?text=eMinistry+Church+Suite+Promo" 
                    alt="African Pastor utilizing eMinistry" 
                    className="w-full h-auto object-cover rounded-xl aspect-[4/5]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="pt-2 text-center">
                    <span className="text-[8px] font-black text-slate-800 font-mono tracking-widest uppercase">E-MINISTRY PORTFOLIO REALISM</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* TWO-COLUMN REMAINING PORTFOLIOS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Card 1: School Systems */}
            <motion.div 
              whileHover={{ 
                scale: 1.025,
                y: -6,
                rotate: [0, -0.8, 0.8, -0.5, 0.5, 0],
                transition: { duration: 0.4 }
              }}
              className="bg-white rounded-3xl border-2 border-[#1e3a8a]/10 overflow-hidden shadow-sm hover:shadow-lg hover:border-[#facc15] transition-all flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="aspect-[16/10] bg-slate-100 relative group overflow-hidden border-b border-slate-200">
                  <img 
                    src={customSchoolImg || lexonSchoolDashboardImg} 
                    alt="Lexon School MSSIS Portal" 
                    className="w-full h-full object-cover filter brightness-[0.98] group-hover:scale-103 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-slate-900/60 p-2 text-white text-[9px] font-mono font-bold tracking-widest uppercase">
                    MSSIS Academic Dashboard Mockup
                  </div>
                </div>
                <div className="p-8">
                  <span className="text-[10px] font-black text-[#1e3a8a] tracking-wider uppercase mb-1 block">
                    {t('card.school.tagline')}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">
                    {t('card.school.title')}
                  </h3>
                  <p className="text-xs text-slate-500 font-bold leading-relaxed">
                    {t('card.school.desc')}
                  </p>
                </div>
              </div>
              <div className="p-8 pt-0">
                <Link 
                  to="/products" 
                  className="w-full text-center border-2 border-slate-200 text-slate-700 hover:border-[#1e3a8a] hover:text-[#1e3a8a] font-bold py-3 px-4 rounded-xl text-xs inline-flex items-center justify-center gap-1.5 transition-all bg-white"
                >
                  {t('card.school.btn')} <ArrowRight size={13} />
                </Link>
              </div>
            </motion.div>

            {/* Card 2: Retail ERP */}
            <motion.div 
              whileHover={{ 
                scale: 1.025,
                y: -6,
                rotate: [0, -0.8, 0.8, -0.5, 0.5, 0],
                transition: { duration: 0.4 }
              }}
              className="bg-white rounded-3xl border-2 border-[#1e3a8a]/10 overflow-hidden shadow-sm hover:shadow-lg hover:border-[#facc15] transition-all flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="aspect-[16/10] bg-slate-100 relative group overflow-hidden border-b border-slate-200">
                  <img 
                    src={customRetailImg || lexonRetailErpPosterImg} 
                    alt="Lexon Retail ERP" 
                    className="w-full h-full object-cover filter brightness-[0.98] group-hover:scale-103 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-slate-900/60 p-2 text-white text-[9px] font-mono font-bold tracking-widest uppercase">
                    SaaS ERP Stock Dashboard
                  </div>
                </div>
                <div className="p-8">
                  <span className="text-[10px] font-black text-[#facc15] bg-slate-900 px-2 py-0.5 rounded tracking-wider uppercase mb-1 block w-max">
                    {t('card.retail.tagline')}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">
                    {t('card.retail.title')}
                  </h3>
                  <p className="text-xs text-slate-500 font-bold leading-relaxed">
                    {t('card.retail.desc')}
                  </p>
                </div>
              </div>
              <div className="p-8 pt-0">
                <Link 
                  to="/services" 
                  className="w-full text-center border-2 border-slate-200 text-slate-700 hover:border-[#10b981] hover:text-[#10b981] font-bold py-3 px-4 rounded-xl text-xs inline-flex items-center justify-center gap-1.5 transition-all bg-white"
                >
                  {t('card.retail.btn')} <ArrowRight size={13} />
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* RELOCATED SECTION: DYNAMIC SYSTEM SLIDER SHOWCASE */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden border-b border-slate-900">
        {/* Glow halos */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[45rem] h-[45rem] bg-[#1e3a8a]/10 rounded-full filter blur-[140px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Explanatory Board */}
            <motion.div 
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="lg:col-span-7 space-y-6"
            >
              <span className="inline-block text-[10px] font-black tracking-[0.2em] text-[#facc15] bg-blue-950/80 border border-[#facc15]/30 px-3 py-1.5 rounded-lg uppercase font-mono">
                {t('simulator.badge')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-white leading-tight">
                {t('simulator.title')}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed max-w-xl">
                {t('simulator.desc')}
              </p>
              
              <div className="pt-4 flex flex-wrap gap-3">
                {AMN_PRODUCTS.map((prod, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setCurrentIdx(i);
                      setPhase('center');
                    }}
                    className={`px-4 py-2.5 rounded-xl font-black text-[10.5px] uppercase tracking-wider transition-all border shrink-0 cursor-pointer ${
                      currentIdx === i 
                        ? 'bg-[#facc15] text-slate-950 border-[#facc15] shadow-lg scale-102' 
                        : 'bg-slate-900/60 text-slate-300 border-white/10 hover:border-white/30'
                    }`}
                  >
                    {prod.badge}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Right Column: Sliding Screenshot Component */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[290px] xs:max-w-[320px] sm:max-w-[340px] xl:max-w-[350px] aspect-[4/5] overflow-hidden select-none rounded-[32px] border border-white/10 shadow-2xl bg-slate-900">
                
                {/* Sliding Interface Card loading actual high quality screenshots and photos directly */}
                <div 
                  style={getPhaseStyles()}
                  className="w-full h-full flex flex-col justify-end relative overflow-hidden"
                >
                  <img 
                    src={AMN_PRODUCTS[currentIdx].image} 
                    alt={AMN_PRODUCTS[currentIdx].title} 
                    className="absolute inset-0 w-full h-full object-cover object-top scale-100 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />

                  {/* Gradient shadow overlay for caption */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent p-4 sm:p-5 pt-16 flex flex-col justify-end z-20">
                    <div className="flex justify-between items-center bg-blue-900/95 backdrop-blur-xs px-2.5 py-1 rounded text-[7.5px] sm:text-[8px] font-mono font-bold text-[#facc15] tracking-widest border border-[#facc15]/30 uppercase self-start mb-1.5">
                      {AMN_PRODUCTS[currentIdx].badge}
                    </div>
                    <h3 className="text-[11.5px] sm:text-[13px] font-display font-black text-white leading-tight">
                      {AMN_PRODUCTS[currentIdx].title}
                    </h3>
                    <p className="text-[9.5px] sm:text-[10.5px] text-slate-300 font-semibold leading-normal mt-1">
                      {AMN_PRODUCTS[currentIdx].desc}
                    </p>
                  </div>

                  {/* SCREENSHOT CAPTURED FLASH EFFECT */}
                  {phase === 'flash' && (
                    <div className="absolute inset-0 bg-white/95 mix-blend-overlay z-40 flex items-center justify-center animate-pulse">
                      <div className="bg-slate-950 text-[#facc15] font-mono text-[8.5px] sm:text-[9.5px] font-black tracking-widest px-3 py-1.5 rounded-full shadow-2xl border border-[#facc15]/45 flex items-center gap-1">
                        📸 SCREENSHOT CAPTURED
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: IMPACT NUMBERS BAR */}
      <section className="py-16 bg-slate-900 text-white text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="border-l-2 border-[#10b981] pl-4">
              <div className="text-4xl sm:text-5xl font-display font-black text-white">120+</div>
              <p className="text-slate-400 text-[11px] uppercase font-bold tracking-wider mt-2 max-w-[200px] leading-relaxed">
                {t('stats.automated_schools.title')}
              </p>
            </div>

            <div className="border-l-2 border-[#10b981] pl-4">
              <div className="text-4xl sm:text-5xl font-display font-black text-white">300+</div>
              <p className="text-slate-400 text-[11px] uppercase font-bold tracking-wider mt-2 max-w-[200px] leading-relaxed">
                {t('stats.parishes_active.title')}
              </p>
            </div>

            <div className="border-l-2 border-[#facc15] pl-4">
              <div className="text-4xl sm:text-5xl font-display font-black text-[#facc15]">50K+</div>
              <p className="text-slate-300 text-[11px] uppercase font-bold tracking-wider mt-2 max-w-[200px] leading-relaxed">
                {t('stats.active_users.title')}
              </p>
            </div>

            <div className="border-l-2 border-[#facc15] pl-4">
              <div className="text-4xl sm:text-5xl font-display font-black text-[#10b981]">3.5M+</div>
              <p className="text-slate-300 text-[11px] uppercase font-bold tracking-wider mt-2 max-w-[200px] leading-relaxed">
                {t('stats.alerts_broadcasted.title')}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 6: REGULATED AND CERTIFIED BY - INFINITE MARQUEE LOGO WALL */}
      <section className="py-20 bg-white border-t border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl font-display font-black tracking-tight text-[#1e3a8a]">
              {t('compliance.title')}
            </h2>
            <div className="h-1 w-16 bg-[#10b981] mx-auto mt-4 rounded" />
          </div>
        </div>

        {/* Seamless Infinite Marquee using framer-motion */}
        <div className="relative w-full overflow-hidden py-4 bg-slate-50/50 border-y border-slate-100 flex">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          <motion.div 
            className="flex gap-6 w-max whitespace-nowrap"
            animate={{ x: [0, -1200] }}
            transition={{
              ease: "linear",
              duration: 25,
              repeat: Infinity,
            }}
          >
            {/* Double the list of items for absolute seamless loop */}
            {[1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4].map((item, idx) => {
              if (item === 1) {
                return (
                  <div key={`p1-${idx}`} className="flex items-center gap-4 px-8 py-5 rounded-2xl border-2 border-[#1e3a8a]/10 bg-white shadow-xs hover:border-[#facc15] hover:shadow-md transition-all duration-300 shrink-0 min-w-[280px]">
                    <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-[#1e3a8a] font-mono text-xs font-black shrink-0">
                      TCRA
                    </div>
                    <div className="text-left">
                      <span className="block text-xs font-black text-slate-800 uppercase tracking-wider">
                        {t('compliance.item1.title')}
                      </span>
                      <span className="block text-[9px] text-slate-400 uppercase tracking-widest font-mono font-bold">
                        {t('compliance.item1.desc')}
                      </span>
                    </div>
                  </div>
                );
              }
              if (item === 2) {
                return (
                  <div key={`p2-${idx}`} className="flex items-center gap-4 px-8 py-5 rounded-2xl border-2 border-[#10b981]/15 bg-white shadow-xs hover:border-[#facc15] hover:shadow-md transition-all duration-300 shrink-0 min-w-[280px]">
                    <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-[#10b981] shrink-0">
                      <ShieldCheck size={22} />
                    </div>
                    <div className="text-left">
                      <span className="block text-xs font-black text-slate-800 uppercase tracking-wider">
                        {t('compliance.item2.title')}
                      </span>
                      <span className="block text-[9px] text-slate-400 uppercase tracking-widest font-mono font-bold">
                        {t('compliance.item2.desc')}
                      </span>
                    </div>
                  </div>
                );
              }
              if (item === 3) {
                return (
                  <div key={`p3-${idx}`} className="flex items-center gap-4 px-8 py-5 rounded-2xl border-2 border-[#1e3a8a]/10 bg-white shadow-xs hover:border-[#facc15] hover:shadow-md transition-all duration-300 shrink-0 min-w-[280px]">
                    <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-700 font-mono text-xs font-black shrink-0">
                      ISO
                    </div>
                    <div className="text-left">
                      <span className="block text-xs font-black text-slate-800 uppercase tracking-wider">
                        {t('compliance.item3.title')}
                      </span>
                      <span className="block text-[9px] text-slate-400 uppercase tracking-widest font-mono font-bold">
                        {t('compliance.item3.desc')}
                      </span>
                    </div>
                  </div>
                );
              }
              return (
                <div key={`p4-${idx}`} className="flex items-center gap-4 px-8 py-5 rounded-2xl border-2 border-[#10b981]/15 bg-white shadow-xs hover:border-[#facc15] hover:shadow-md transition-all duration-300 shrink-0 min-w-[280px]">
                  <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-[#facc15] shrink-0">
                    <Briefcase size={20} />
                  </div>
                  <div className="text-left">
                    <span className="block text-xs font-black text-slate-800 uppercase tracking-wider">
                      {t('compliance.item4.title')}
                    </span>
                    <span className="block text-[9px] text-slate-400 uppercase tracking-widest font-mono font-bold">
                      {t('compliance.item4.desc')}
                    </span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;
