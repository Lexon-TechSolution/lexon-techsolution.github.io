import React, { useState, useEffect } from 'react'; // Nimeongeza useEffect hapa
import { Language } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import Opportunity from './components/Opportunity';
import Solutions from './components/Solutions';
import About from './components/About';
import IdealState from './components/IdealState';
import TriadModel from './components/TriadModel';
import ROICalculator from './components/ROICalculator';
import TrustAuthority from './components/TrustAuthority';
import News from './components/News';
import WhyLexon from './components/WhyLexon';
import Footer from './components/Footer';
import ChatAssistant from './components/LexonBot.tsx';
import ContactModal from './components/ContactModal';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(Language.EN);
  const [isContactOpen, setIsContactOpen] = useState(false);

  // SEO Update: Hii inabadilisha jina la website yako Google bila kugusa index.html
  useEffect(() => {
    document.title = "Lexon Tech Solution | IT Solutions & Mifumo ya Mauzo (POS) Tanzania";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Lexon Tech Solution: Tunatoa mifumo ya IT, Administration Systems, na POS kuzuia upotevu wa fedha na kuongeza mauzo kwa biashara Tanzania.");
    }
  }, []);

  const toggleLang = () => {
    setLang(prev => prev === Language.EN ? Language.SW : Language.EN);
  };

  const openContact = () => setIsContactOpen(true);
  const closeContact = () => setIsContactOpen(false);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-cyan-500 selection:text-white flex flex-col scroll-smooth">
      <Header lang={lang} onToggleLang={toggleLang} onOpenContact={openContact} />
      
      <main className="flex-grow">
        <Hero lang={lang} onOpenContact={openContact} />
        <Opportunity lang={lang} />
        <Solutions lang={lang} onOpenContact={openContact} />
        <About lang={lang} />
        <IdealState lang={lang} />
        <TriadModel lang={lang} />
        <ROICalculator lang={lang} onOpenContact={openContact} />
        <WhyLexon lang={lang} />
        <News lang={lang} />
        <TrustAuthority />
      </main>

      <Footer lang={lang} onOpenContact={openContact} />
      
      <ContactModal 
        isOpen={isContactOpen} 
        onClose={closeContact} 
        lang={lang} 
      />
      
      <ChatAssistant />
    </div>
  );
};

export default App;
