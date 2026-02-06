
import React from 'react';
import { SOLUTIONS, TRANSLATIONS, getIcon } from '../constants';
import { Language } from '../types';
import { CheckCircle2, ChevronRight } from 'lucide-react';

interface SolutionsProps {
  lang: Language;
  onOpenContact: () => void;
}

const Solutions: React.FC<SolutionsProps> = ({ lang, onOpenContact }) => {
  const t = TRANSLATIONS[lang];

  return (
    <section id="solutions" className="py-24 bg-[#020617] relative">
      {/* Pattern background accent */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#22D3EE 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <h3 className="text-electric-cyan font-bold uppercase tracking-[0.2em] text-sm mb-4">
              Our Expertise
            </h3>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              {t.solutionsTitle}
            </h2>
          </div>
          <p className="text-slate-400 md:max-w-xs text-sm leading-relaxed">
            Scalable digital infrastructure built by experts who understand that technology must serve the bottom line.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SOLUTIONS.map((solution) => (
            <div 
              key={solution.id} 
              className="group glass p-8 rounded-3xl hover:border-electric-cyan/30 transition-all hover:bg-white/[0.03] flex flex-col h-full overflow-hidden relative"
            >
              {/* Subtle card glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-cyan-500/5 blur-3xl rounded-full group-hover:bg-cyan-500/10 transition-all"></div>
              
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-electric-cyan mb-8 group-hover:scale-110 transition-transform relative z-10">
                {getIcon(solution.icon, 32)}
              </div>
              
              <div className="mb-4 relative z-10">
                <span className="text-[10px] uppercase tracking-widest font-bold text-cyan-400/60 block mb-1">
                  {solution.name}
                </span>
                <h4 className="text-2xl font-bold text-white">
                  {solution.tagline}
                </h4>
              </div>

              <p className="text-slate-400 mb-8 text-sm leading-relaxed relative z-10">
                {solution.impact}
              </p>

              <ul className="space-y-3 mb-10 flex-grow relative z-10">
                {solution.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                    <CheckCircle2 size={16} className="text-electric-cyan mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={onOpenContact}
                className="w-full flex items-center justify-between px-6 py-4 bg-white/5 border border-white/10 rounded-xl text-sm font-bold group-hover:bg-electric-cyan group-hover:text-slate-950 transition-all relative z-10"
              >
                {lang === Language.EN ? "Request Demo" : "Omba Demo"}
                <ChevronRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;
