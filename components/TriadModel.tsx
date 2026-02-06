
import React from 'react';
import { TRANSLATIONS, getIcon } from '../constants';
import { Language } from '../types';

interface TriadProps {
  lang: Language;
}

const TriadModel: React.FC<TriadProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <section id="triad" className="py-24 bg-[#0B1120] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
        <h3 className="text-electric-cyan font-bold uppercase tracking-[0.2em] text-sm mb-4">
          Integrated Ecosystem
        </h3>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          {t.triadTitle}
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto mb-20">
          {t.triadSubtext}
        </p>

        <div className="relative max-w-4xl mx-auto">
          {/* Connector SVG for Desktop */}
          <div className="hidden lg:block absolute inset-0 -z-10">
            <svg className="w-full h-full" viewBox="0 0 1000 600">
              <path 
                d="M500 100 L250 450 L750 450 Z" 
                fill="none" 
                stroke="rgba(34, 211, 238, 0.1)" 
                strokeWidth="2" 
                strokeDasharray="10 10"
              />
              <circle cx="500" cy="100" r="150" fill="url(#grad1)" fillOpacity="0.05" />
              <circle cx="250" cy="450" r="150" fill="url(#grad2)" fillOpacity="0.05" />
              <circle cx="750" cy="450" r="150" fill="url(#grad3)" fillOpacity="0.05" />
              <defs>
                <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#22D3EE" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
                <radialGradient id="grad2" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#22D3EE" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
                <radialGradient id="grad3" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#22D3EE" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-electric-cyan mb-6 shadow-[0_0_30px_rgba(34,211,238,0.1)]">
                {getIcon('Cpu', 48)}
              </div>
              <h4 className="text-xl font-bold text-white mb-3 tracking-wide">LEXON DEV</h4>
              <p className="text-slate-400 text-sm">Intelligent Automation & Backend Engineering</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-electric-cyan mb-6 shadow-[0_0_30px_rgba(34,211,238,0.1)]">
                {getIcon('PenTool', 48)}
              </div>
              <h4 className="text-xl font-bold text-white mb-3 tracking-wide">SK DESIGNER</h4>
              <p className="text-slate-400 text-sm">Brand Identity & Digital UX/UI Systems</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-3xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-electric-cyan mb-6 shadow-[0_0_30px_rgba(34,211,238,0.1)]">
                {getIcon('TrendingUp', 48)}
              </div>
              <h4 className="text-xl font-bold text-white mb-3 tracking-wide">LEXON GROWTH</h4>
              <p className="text-slate-400 text-sm">Marketing, Scale & Customer Acquisition</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TriadModel;
