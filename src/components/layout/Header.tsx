import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, LayoutDashboard, LogOut, Globe, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { auth } from '../../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useLanguage, LANGUAGE_OPTIONS, LanguageCode } from '../../context/LanguageContext';

const ADMIN_EMAIL = "saidimohamedisaidi7@gmail.com";

const LOCALIZED_NAV_LINKS = [
  { key: 'nav.home', path: '/' },
  { key: 'nav.about', path: '/about' },
  { key: 'nav.solutions', path: '/services' },
  { key: 'nav.products', path: '/products' },
  { key: 'nav.projects', path: '/projects' },
  { key: 'nav.pricing', path: '/pricing' },
  { key: 'nav.blog', path: '/blog' },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  
  const { language, setLanguage, t } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAdmin(user?.email === ADMIN_EMAIL);
    });
    return () => unsubscribe();
  }, []);

  // Click outside to close language dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    signOut(auth);
  };

  const currentOption = LANGUAGE_OPTIONS.find(opt => opt.code === language) || LANGUAGE_OPTIONS[0];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all duration-300">
      {/* Brilliant top golden-yellow bar */}
      <div className="h-[5px] bg-[#facc15] w-full" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Custom brand Balloon Logo for LEXON */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center shrink-0">
              {/* Outer dialog bubble in brand corporate blue */}
              <div className="bg-[#1e3a8a] group-hover:bg-[#1d4ed8] text-white px-4 py-2.5 rounded-2xl font-black text-2xl tracking-tighter shadow-md flex items-center justify-center relative transition-colors duration-300">
                <span>lexon</span>
                {/* Speech tail to replicate our customized symbol perfectly */}
                <div className="absolute -bottom-2 left-4 w-4 h-4 bg-[#1e3a8a] rounded-sm rotate-45 transform origin-top-left -z-10 group-hover:bg-[#1d4ed8] transition-colors duration-300" />
              </div>
            </div>
            
            <div className="flex flex-col border-l border-slate-300 pl-3">
              <span className="font-display text-xs font-black tracking-[0.25em] text-[#facc15] uppercase leading-none">TECH SOLUTIONS</span>
              <span className="text-[9px] text-slate-500 font-bold tracking-wider mt-0.5">CO. LTD - AFRICA</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {LOCALIZED_NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => cn(
                  "text-[14px] font-semibold tracking-wide transition-colors py-2 relative hover:text-[#1e3a8a]",
                  isActive ? "text-[#1e3a8a] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-[#facc15] after:rounded-full" : "text-slate-700"
                )}
              >
                {t(link.key)}
              </NavLink>
            ))}
            {isAdmin && (
              <NavLink
                to="/leads"
                className={({ isActive }) => cn(
                  "text-[14px] font-bold flex items-center gap-1 transition-colors hover:text-[#1e3a8a]",
                  isActive ? "text-[#1e3a8a]" : "text-slate-700"
                )}
              >
                <LayoutDashboard size={14} /> {t('nav.admin')}
              </NavLink>
            )}

            {/* Premium Language Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 transition-all text-xs font-bold text-slate-700 cursor-pointer select-none"
              >
                <span className="text-sm">{currentOption.flag}</span>
                <span className="uppercase font-mono">{currentOption.code}</span>
                <ChevronDown size={12} className={cn("text-slate-400 transition-transform duration-200", isLangOpen && "transform rotate-180")} />
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-64 rounded-xl bg-white border border-slate-200 shadow-xl overflow-hidden py-1 z-50"
                  >
                    <div className="px-3 py-1.5 bg-slate-50 border-b border-slate-100 text-[10px] uppercase font-black tracking-widest text-[#1e3a8a] font-mono">
                      Select African Region / Lang
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {LANGUAGE_OPTIONS.map((opt) => (
                        <button
                          key={opt.code}
                          onClick={() => {
                            setLanguage(opt.code);
                            setIsLangOpen(false);
                          }}
                          className={cn(
                            "w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center justify-between text-xs transition-colors",
                            language === opt.code ? "bg-blue-50/50 font-bold text-[#1e3a8a]" : "text-slate-700"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-base shrink-0">{opt.flag}</span>
                            <div className="flex flex-col">
                              <span className="font-semibold leading-tight">{opt.nativeName}</span>
                              <span className="text-[9px] text-slate-400 font-mono mt-0.5">{opt.region}</span>
                            </div>
                          </div>
                          {language === opt.code && (
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {isAdmin ? (
               <button onClick={handleLogout} className="text-slate-500 hover:text-[#1e3a8a] transition-colors cursor-pointer ml-2">
                  <LogOut size={18} />
               </button>
            ) : (
              <Link to="/contact" className="bg-[#1e3a8a] hover:bg-[#1d4ed8] text-white font-bold py-2.5 px-5 rounded-full text-sm inline-flex items-center gap-1.5 transition-colors shadow-sm ml-2">
                {t('nav.contact')} <ChevronRight size={14} />
              </Link>
            )}
          </nav>

          {/* Mobile Right Side Controls */}
          <div className="lg:hidden flex items-center gap-3">
            {/* Mobile simplified language toggle button */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-bold text-slate-700 cursor-pointer"
              >
                <span className="text-sm">{currentOption.flag}</span>
                <span className="uppercase font-mono text-[10px]">{currentOption.code}</span>
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-56 rounded-xl bg-white border border-slate-200 shadow-xl overflow-hidden py-1 z-50"
                  >
                    {LANGUAGE_OPTIONS.map((opt) => (
                      <button
                        key={opt.code}
                        onClick={() => {
                          setLanguage(opt.code);
                          setIsLangOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-3 py-2 hover:bg-slate-50 flex items-center gap-2 text-xs transition-colors",
                          language === opt.code ? "bg-blue-50/50 font-bold text-[#1e3a8a]" : "text-slate-700"
                        )}
                      >
                        <span className="text-base">{opt.flag}</span>
                        <div className="flex flex-col">
                          <span className="font-semibold">{opt.nativeName}</span>
                          <span className="text-[8.5px] text-slate-400 font-mono leading-none">{opt.name}</span>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Toggle */}
            <button 
              className="text-slate-800 p-2 cursor-pointer rounded-lg hover:bg-slate-100"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden absolute top-20 left-0 right-0 bg-white border-b border-slate-200 py-6 px-6 shadow-xl"
          >
            <nav className="flex flex-col gap-4 items-center">
              {LOCALIZED_NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                   to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => cn(
                    "text-base font-semibold transition-colors hover:text-[#1e3a8a]",
                    isActive ? "text-[#1e3a8a] font-bold" : "text-slate-600"
                  )}
                >
                  {t(link.key)}
                </NavLink>
              ))}
              {isAdmin && (
                <NavLink
                  to="/leads"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => cn(
                    "text-base font-bold flex items-center gap-1 transition-colors hover:text-[#1e3a8a]",
                    isActive ? "text-[#1e3a8a]" : "text-slate-600"
                  )}
                >
                  <LayoutDashboard size={18} /> {t('nav.admin')}
                </NavLink>
              )}
              {isAdmin && (
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="text-base font-medium text-red-650 hover:text-red-500 transition-colors flex items-center gap-2 mt-2"
                >
                  <LogOut size={18} /> Sign Out
                </button>
              )}
              <Link 
                to="/contact" 
                onClick={() => setIsOpen(false)}
                className="bg-[#1e3a8a] hover:bg-[#1d4ed8] text-white w-full max-w-xs text-center font-bold py-3 rounded-full mt-2 block"
              >
                {t('nav.contact')}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
