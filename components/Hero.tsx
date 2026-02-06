
import React from 'react';
import { TRANSLATIONS } from '../constants';
import { Language } from '../types';
import { ArrowRight, Play, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  lang: Language;
  onOpenContact: () => void;
}

const Hero: React.FC<HeroProps> = ({ lang, onOpenContact }) => {
  const t = TRANSLATIONS[lang];

  return (
    <section className="relative pt-32 pb-16 md:pt-60 md:pb-40 overflow-hidden">
      {/* Background Imagery */}
      <div className="absolute inset-0 -z-20">
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
          className="w-full h-full object-cover opacity-10 md:opacity-20"
          alt="Technology"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/40 via-[#020617] to-[#020617]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-electric-cyan text-[10px] md:text-xs font-bold mb-6 uppercase tracking-widest animate-pulse">
          <CheckCircle2 size={14} /> Leading Business Automation in Tanzania
        </div>

        <h2 className="text-3xl md:text-7xl font-bold text-white max-w-4xl mx-auto leading-[1.1] mb-6 md:mb-8 text-balance">
          {t.heroTitle}
        </h2>

        <p className="text-base md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed px-4 md:px-0">
          {t.heroSubtext}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 sm:px-0">
          <button 
            onClick={onOpenContact}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-electric-cyan text-slate-950 rounded-xl font-bold text-lg hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:-translate-y-1 transition-all"
          >
            {t.ctaDemo} <Play size={20} fill="currentColor" />
          </button>
          <button 
            onClick={onOpenContact}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-white/5 text-white rounded-xl font-bold text-lg border border-white/10 hover:bg-white/10 transition-all"
          >
            {t.ctaQuote} <ArrowRight size={20} />
          </button>
        </div>

        {/* Responsive Stat Pills */}
        <div className="mt-16 md:mt-24 grid grid-cols-3 gap-4 md:flex md:justify-center md:gap-16">
          <div className="text-center group">
            <div className="text-xl md:text-3xl font-bold text-white group-hover:text-electric-cyan transition-colors">40%</div>
            <div className="text-[8px] md:text-sm text-slate-500 uppercase tracking-widest mt-1">Cost Savings</div>
          </div>
          <div className="text-center group">
            <div className="text-xl md:text-3xl font-bold text-white group-hover:text-electric-cyan transition-colors">100+</div>
            <div className="text-[8px] md:text-sm text-slate-500 uppercase tracking-widest mt-1">Systems Built</div>
          </div>
          <div className="text-center group">
            <div className="text-xl md:text-3xl font-bold text-white group-hover:text-electric-cyan transition-colors">24/7</div>
            <div className="text-[8px] md:text-sm text-slate-500 uppercase tracking-widest mt-1">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
