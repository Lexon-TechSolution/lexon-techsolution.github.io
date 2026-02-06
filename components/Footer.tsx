
import React from 'react';
import { TRANSLATIONS, getIcon } from '../constants';
import { Language } from '../types';

interface FooterProps {
  lang: Language;
  onOpenContact: () => void;
}

const Footer: React.FC<FooterProps> = ({ lang, onOpenContact }) => {
  const t = TRANSLATIONS[lang];

  return (
    <footer className="bg-[#020617] pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <div className="logo-group mb-6">
              <h2 className="logo text-xl font-bold text-white tracking-tight leading-none">
                LEXON <span className="text-electric-cyan">TECH</span> SOLUTIONS
              </h2>
              <p className="tagline text-[10px] text-slate-500 font-medium tracking-[0.2em] uppercase mt-1">
                LEXON MARKET AGENCY & SK DESIGNER
              </p>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Empowering African and International businesses with intelligent automation systems that drive growth and reduce manual friction.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-electric-cyan hover:text-slate-950 transition-all">{getIcon('Facebook', 18)}</a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-electric-cyan hover:text-slate-950 transition-all">{getIcon('Linkedin', 18)}</a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-electric-cyan hover:text-slate-950 transition-all">{getIcon('Twitter', 18)}</a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Solutions</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#solutions" className="hover:text-electric-cyan transition-colors">Lexon Grace (Church)</a></li>
              <li><a href="#solutions" className="hover:text-electric-cyan transition-colors">Lexon Academic (Schools)</a></li>
              <li><a href="#solutions" className="hover:text-electric-cyan transition-colors">Lexon Stay (Hotels)</a></li>
              <li><a href="#solutions" className="hover:text-electric-cyan transition-colors">Enterprise ERP</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Company</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#about" className="hover:text-electric-cyan transition-colors">About Lexon</a></li>
              <li><a href="#triad" className="hover:text-electric-cyan transition-colors">The Triad Model</a></li>
              <li><a href="#roi" className="hover:text-electric-cyan transition-colors">ROI Case Studies</a></li>
              <li><button onClick={onOpenContact} className="hover:text-electric-cyan transition-colors">Request Quote</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">{t.contactTitle}</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <span className="text-electric-cyan shrink-0">{getIcon('MapPin', 18)}</span>
                <span>Lexon Plaza, 4th Floor<br />Dar es Salaam, Tanzania</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-electric-cyan shrink-0">{getIcon('Phone', 18)}</span>
                <a href="tel:+255621887100" className="hover:text-white transition-colors">+255 621 887 100</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-electric-cyan shrink-0">{getIcon('Mail', 18)}</span>
                <span>contact@lexontech.co.tz</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Lexon Tech Solutions Co. Ltd. All rights reserved. CEO: Mohamedi M. Saidi.
          </p>
          <div className="flex gap-6 text-[10px] text-slate-500 uppercase font-bold tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
