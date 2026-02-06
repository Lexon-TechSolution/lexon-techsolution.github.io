import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { 
  MessageSquare, X, Send, Bot, Sparkles, Bell, 
  LayoutDashboard, AlertCircle, TrendingUp, CheckCircle2,
  RotateCcw 
} from 'lucide-react';

const CONTACT_NUMBER = "+255 621 887 100";

// NIMEPESITI KEY YAKO HAPA MOJA KWA MOJA ILI KUONDOA SHIDA YA .ENV
const GEMINI_API_KEY = "AIzaSyCSvFaNB3m1CZpOYLWLezh9JaOZtp9fWyw; 

const MiniDemoView: React.FC = () => (
  <div className="bg-slate-900/95 border border-electric-cyan/40 rounded-2xl p-4 my-4 overflow-hidden animate-in fade-in slide-in-from-bottom-2 shadow-2xl">
    <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
      <LayoutDashboard size={14} className="text-electric-cyan" />
      <span className="text-[10px] font-black uppercase tracking-widest text-white">Lexon Live Dashboard (Sample)</span>
    </div>
    <div className="space-y-3">
      <div className="grid grid-cols-4 text-[9px] font-black text-slate-500 uppercase tracking-tighter">
        <span>Item</span><span>Stock</span><span>Sold</span><span>Rem.</span>
      </div>
      <div className="grid grid-cols-4 text-[11px] text-white border-b border-white/5 pb-2">
        <span className="font-medium">Sugar 1kg</span><span>100</span><span className="text-green-400 font-bold">30</span><span className="text-electric-cyan font-bold">70</span>
      </div>
      <div className="grid grid-cols-4 text-[11px] text-white border-b border-white/5 pb-2">
        <span className="font-medium">Flour 2kg</span><span>50</span><span className="text-green-400 font-bold">20</span><span className="text-orange-400 font-bold">30</span>
      </div>
    </div>
    <div className="mt-4 pt-2 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[10px] text-green-400 font-black uppercase">
          <TrendingUp size={12} /> <span>Sales: Tsh 110,000</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-orange-400 font-black uppercase animate-pulse">
          <AlertCircle size={12} /> <span>Stock Low!</span>
        </div>
      </div>
    </div>
  </div>
);

const LexonAI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string; isDemo?: boolean }[]>([
    { 
      role: 'model', 
      text: 'Habari! Karibu Lexon AI Assistant. Nitakuuliza maswali 5 pekee kugundua kama biashara yako inapoteza pesa bila wewe kujua.\n\nTayari? Tuiteanze. Unafanya biashara ya aina gani?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastLead, setLastLead] = useState<{name: string, text: string} | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) setShowGreeting(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const resetChat = () => {
    if (window.confirm("Je, unataka kuanza audit upya?")) {
      setMessages([
        { 
          role: 'model', 
          text: 'Habari! Karibu Lexon AI Assistant. Nitakuuliza maswali 5 pekee kugundua kama biashara yako inapoteza pesa bila wewe kujua.\n\nTayari? Tuiteanze. Unafanya biashara ya aina gani?' 
        }
      ]);
      setInput('');
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);
    setShowGreeting(false);

    setLastLead({ name: "Mteja", text: userMsg });
    setTimeout(() => setLastLead(null), 6000);

    try {
      const genAI = new GoogleGenAI(GEMINI_API_KEY);
      // Imetumika gemini-1.5-flash ambayo ni thabiti zaidi
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: `You are "Lexon AI Business Diagnostic Assistant" by Lexon Tech Solutions. CEO: Mohamedi M. Saidi.
        MISSION: Diagnose business weaknesses and guide them to Lexon automation.
        CONVERSATION FLOW:
        1. Ask Business Type.
        2. Ask Recording Method (Notebook, Excel, System).
        3. Ask Report Speed.
        4. Ask Staff count.
        5. Ask Loss history.
        CONCLUSION: Give a warning about money loss and tag [SHOW_DEMO] at the end.`
      });

      const chat = model.startChat({
        history: messages.map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }],
        })),
      });

      const result = await chat.sendMessage(userMsg);
      const aiText = result.response.text();
      
      const hasDemo = aiText.includes("[SHOW_DEMO]");
      const cleanText = aiText.replace("[SHOW_DEMO]", "");

      setMessages(prev => [...prev, { role: 'model', text: cleanText, isDemo: hasDemo }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Samahani, kuna tatizo la mtandao. Unaweza kumpata CEO moja kwa moja hapa: " + CONTACT_NUMBER }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {lastLead && (
        <div className="fixed top-20 right-4 z-[200] bg-slate-900 border-l-4 border-cyan-400 p-4 rounded-xl shadow-2xl animate-in slide-in-from-right-full duration-500 max-w-[280px]">
          <div className="flex items-center gap-2 mb-1.5">
            <Bell className="text-cyan-400 animate-ring" size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest text-white">Lead Mpya</span>
          </div>
          <p className="text-slate-400 text-[11px] italic font-medium leading-snug">"{lastLead.text}"</p>
        </div>
      )}

      <div className={`fixed z-[100] font-sans transition-all duration-300 ${isOpen ? 'inset-0 md:inset-auto md:bottom-6 md:right-6' : 'bottom-6 right-6'}`}>
        {showGreeting && !isOpen && (
          <div className="absolute bottom-20 right-0 w-72 bg-white p-5 rounded-2xl shadow-2xl border border-cyan-400/20 animate-in fade-in slide-in-from-bottom-4 group cursor-pointer" onClick={() => setIsOpen(true)}>
            <button onClick={(e) => { e.stopPropagation(); setShowGreeting(false); }} className="absolute -top-2 -right-2 bg-slate-900 text-white rounded-full p-1.5 shadow-lg"><X size={12} /></button>
            <div className="flex gap-4">
              <div className="bg-cyan-400/20 p-2.5 rounded-full h-fit text-cyan-400 animate-pulse"><Sparkles size={18} /></div>
              <div>
                <p className="text-slate-900 text-[13px] font-black uppercase tracking-tight">Audit Biashara Yako</p>
                <p className="text-slate-600 text-xs">Gundua kama unapoteza pesa bila kujua...</p>
              </div>
            </div>
          </div>
        )}

        {!isOpen ? (
          <button 
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 bg-cyan-400 text-slate-950 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(34,211,238,0.5)] hover:scale-110 active:scale-95 transition-all relative group"
          >
            <MessageSquare size={28} />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-slate-950 animate-pulse flex items-center justify-center text-[10px] font-black text-white">1</span>
          </button>
        ) : (
          <div className="w-full h-full md:w-[420px] md:h-[650px] bg-[#020617] md:rounded-[2.5rem] flex flex-col shadow-2xl border border-white/10 overflow-hidden animate-in zoom-in-95 duration-300">
            {/* HEADER */}
            <div className="bg-cyan-400 p-5 flex justify-between items-center border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-950 rounded-xl flex items-center justify-center"><Bot className="text-cyan-400" size={20} /></div>
                <div>
                  <h3 className="text-slate-950 font-black text-xs uppercase tracking-widest leading-none">Lexon AI</h3>
                  <div className="flex items-center gap-1 mt-1"><span className="w-1.5 h-1.5 bg-green-900 rounded-full animate-pulse"></span><span className="text-slate-900 text-[9px] font-black uppercase tracking-widest">Live Audit</span></div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={resetChat} title="Anza upya" className="p-2 text-slate-950 hover:bg-black/10 rounded-lg transition-colors">
                  <RotateCcw size={18} />
                </button>
                <button onClick={() => setIsOpen(false)} className="p-2 text-slate-950 hover:bg-black/10 rounded-lg transition-colors">
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* MESSAGES */}
            <div ref={scrollRef} className="flex-grow overflow-y-auto p-5 space-y-6 bg-slate-950/40">
              {messages.map((m, i) => (
                <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-[14px] leading-relaxed shadow-lg ${
                    m.role === 'user' 
                    ? 'bg-cyan-400 text-slate-950 font-bold rounded-tr-none' 
                    : 'bg-white/10 text-slate-100 border border-white/10 rounded-tl-none backdrop-blur-md'
                  }`}>
                    {m.text.split('\n').map((line, idx) => <p key={idx} className={idx > 0 ? 'mt-2' : ''}>{line}</p>)}
                    {m.isDemo && <MiniDemoView />}
                  </div>
                  {m.isDemo && (
                    <button 
                      onClick={() => window.open(`https://wa.me/255621887100?text=Habari, nimefanya audit na Lexon AI, nahitaji book free demo ya mfumo.`, '_blank')}
                      className="mt-3 w-[85%] py-3 bg-green-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-green-600 transition-all shadow-xl shadow-green-500/20"
                    >
                      <CheckCircle2 size={14} /> Book Free Demo
                    </button>
                  )}
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
            </div>

            {/* INPUT */}
            <div className="p-5 border-t border-white/5 bg-slate-950/90 pb-8 md:pb-5">
              <div className="flex gap-3">
                <input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Andika jibu hapa..."
                  className="flex-grow bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:border-cyan-400 outline-none text-white transition-all placeholder:text-slate-600"
                />
                <button 
                  onClick={handleSend} 
                  disabled={loading || !input.trim()} 
                  className="bg-cyan-400 text-slate-950 p-4 rounded-2xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                >
                  <Send size={24} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default LexonAI;
