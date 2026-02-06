
import React from 'react';
import { Language } from '../types';
import { Globe, Menu } from 'lucide-react';

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  onOpenContact: () => void;
}

const Header: React.FC<HeaderProps> = ({ lang, onToggleLang, onOpenContact }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <div className="logo-group text-left">
          <a href="#" className="block">
            <h1 className="logo text-lg md:text-2xl font-bold text-white tracking-tight leading-none">
              LEXON <span className="text-electric-cyan">TECH</span> SOLUTIONS
            </h1>
            <p className="tagline text-[8px] md:text-xs text-slate-400 font-medium tracking-[0.2em] uppercase mt-1">
              LEXON MARKET AGENCY & SK DESIGNER
            </p>
          </a>
        </div>

        <nav className="flex items-center gap-4 md:gap-8">
          <ul className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-slate-400">
            <li><a href="#solutions" className="hover:text-electric-cyan transition-colors">Solutions</a></li>
            <li><a href="#about" className="hover:text-electric-cyan transition-colors">About</a></li>
            <li><a href="#roi" className="hover:text-electric-cyan transition-colors">ROI</a></li>
            <li><a href="#news" className="hover:text-electric-cyan transition-colors">Insights</a></li>
          </ul>

          <div className="flex items-center gap-3 md:gap-4">
            <button 
              onClick={onToggleLang}
              className="flex items-center gap-2 text-[10px] md:text-xs font-bold bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10 transition-all text-slate-200"
            >
              <Globe size={14} className="text-electric-cyan" />
              <span>{lang}</span>
            </button>
            <button 
              onClick={onOpenContact}
              className="bg-electric-cyan text-slate-950 px-4 md:px-6 py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform"
            >
              {lang === Language.EN ? "Demo" : "Omba Demo"}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
