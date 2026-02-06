import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai"; // Imesahihishwa hapa
import { 
  MessageSquare, X, Send, Bot, Sparkles, Bell, 
  LayoutDashboard, AlertCircle, TrendingUp, CheckCircle2,
  RotateCcw 
} from 'lucide-react';

const CONTACT_NUMBER = "+255 621 887 100";
const GEMINI_API_KEY = "AIzaSyCUUZWPPVT8k5m1Gi-O488OJpFL5B9sFVg"; 

const MiniDemoView: React.FC = () => (
  <div className="bg-slate-900/95 border border-cyan-400/40 rounded-2xl p-4 my-4 overflow-hidden animate-in fade-in slide-in-from-bottom-2 shadow-2xl">
    <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
      <LayoutDashboard size={14} className="text-cyan-400" />
      <span className="text-[10px] font-black uppercase tracking-widest text-white">Lexon Live Dashboard (Sample)</span>
    </div>
    <div className="space-y-3">
      <div className="grid grid-cols-4 text-[9px] font-black text-slate-500 uppercase tracking-tighter">
        <span>Item</span><span>Stock</span><span>Sold</span><span>Rem.</span>
      </div>
      <div className="grid grid-cols-4 text-[11px] text-white border-b border-white/5 pb-2">
        <span className="font-medium">Sugar 1kg</span><span>100</span><span className="text-green-400 font-bold">30</span><span className="text-cyan-400 font-bold">70</span>
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
  const [isCompleted, setIsCompleted] = useState(false); // Hii ni kwa ajili ya kuonyesha X mwishoni
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string; isDemo?: boolean }[]>([
    { 
      role: 'model', 
      text: 'Habari! Karibu Lexon AI Assistant. Nitakuuliza maswali 5 pekee kugundua kama biashara yako inapoteza pesa bila wewe kujua.\n\nTayari? Tuanze. Unafanya biashara ya aina gani?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastLead, setLastLead] = useState<{name: string, text: string} | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => { if (!isOpen) setShowGreeting(true); }, 4000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  const resetChat = () => {
    if (window.confirm("Je, unataka kuanza audit upya?")) {
      setMessages([{ role: 'model', text: 'Habari! Karibu Lexon AI Assistant. Nitakuuliza maswali 5 pekee kugundua kama biashara yako inapoteza pesa bila wewe kujua.\n\nTayari? Tuanze. Unafanya biashara ya aina gani?' }]);
      setInput('');
      setLoading(false);
      setIsCompleted(false);
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
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: `You are "Lexon AI Business Diagnostic Assistant" by Lexon Tech Solutions. CEO: Mohamedi M. Saidi. 
        MISSION: Diagnose business weaknesses and guide them to Lexon automation. 
        CONVERSATION FLOW: 1. Ask Business Type. 2. Ask Recording Method. 3. Ask Report Speed. 4. Ask Staff count. 5. Ask Loss history. 
        CONCLUSION: Give a warning about money loss and tag [SHOW_DEMO] at the end.`
      });

      const chat = model.startChat({
        history: messages.map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.text }] })),
      });

      const result = await chat.sendMessage(userMsg);
      const aiText = result.response.text();
      
      const hasDemo = aiText.includes("[SHOW_DEMO]");
      const cleanText = aiText.replace("[SHOW_DEMO]", "");

      if (hasDemo) setIsCompleted(true); // Mazungumzo yameisha

      setMessages(prev => [...prev, { role: 'model', text: cleanText, isDemo: hasDemo }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Samahani, kuna tatizo la mtandao. Unaweza kumpata CEO: " + CONTACT_NUMBER }]);
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
        {!isOpen ? (
          <button onClick={() => setIsOpen(true)} className="w-16 h-16 bg-cyan-400 text-slate-950 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(34,211,238,0.5)] hover:scale-110 active:scale-95 transition-all">
            <MessageSquare size={28} />
          </button>
        ) : (
          <div className="w-full h-full md:w-[400px] md:h-[600px] bg-[#020617] md:rounded-[2rem] flex flex-col shadow-2xl border border-white/10 overflow-hidden">
            <div className="bg-cyan-400 p-5 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3 text-slate-950">
                <Bot size={20} />
                <span className="font-black text-xs uppercase tracking-widest">Lexon Audit</span>
              </div>
              <div className="flex gap-2">
                 <button onClick={resetChat} className="p-2 text-slate-950"><RotateCcw size={18} /></button>
                 <button onClick={() => setIsOpen(false)} className="p-2 text-slate-950"><X size={20} /></button>
              </div>
            </div>

            <div ref={scrollRef} className="flex-grow overflow-y-auto p-5 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${m.role === 'user' ? 'bg-cyan-400 text-slate-950 font-bold' : 'bg-white/10 text-white'}`}>
                    {m.text}
                    {m.isDemo && <MiniDemoView />}
                  </div>
                </div>
              ))}
              {loading && <div className="text-cyan-400 text-xs animate-pulse">Lexon anafikiri...</div>}
              
              {/* KITUFE CHA KUFUNGA KIKITOKEA MWISHONI */}
              {isCompleted && (
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-full py-3 bg-slate-800 text-cyan-400 rounded-xl text-xs font-bold uppercase tracking-widest border border-cyan-400/30 hover:bg-slate-700 transition-all mt-4 flex items-center justify-center gap-2"
                >
                  <X size={14} /> Funga Mazungumzo
                </button>
              )}
            </div>

            {!isCompleted && (
              <div className="p-4 bg-slate-900 flex gap-2">
                <input 
                  value={input} 
                  onChange={(e) => setInput(e.target.value)} 
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Andika hapa..." 
                  className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-cyan-400" 
                />
                <button onClick={handleSend} className="bg-cyan-400 p-3 rounded-xl text-slate-950"><Send size={20} /></button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default LexonAI;
