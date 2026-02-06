import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { 
  MessageSquare, X, Send, Bot, Sparkles, Bell, 
  LayoutDashboard, AlertCircle, TrendingUp, CheckCircle2,
  RotateCcw 
} from 'lucide-react';

const CONTACT_NUMBER = "+255 621 887 100";
// Hii ndiyo Key yako tuliyoihakiki
const GEMINI_API_KEY = "AIzaSyCSvFaNB3m1CZpOYLWLezh9JaOZtp9fWyw"; 

const MiniDemoView: React.FC = () => (
  <div className="bg-slate-900/95 border border-cyan-400/40 rounded-2xl p-4 my-4 shadow-2xl animate-in slide-in-from-bottom-2">
    <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
      <LayoutDashboard size={14} className="text-cyan-400" />
      <span className="text-[10px] font-black uppercase tracking-widest text-white">Lexon Live Dashboard</span>
    </div>
    <div className="space-y-3">
      <div className="grid grid-cols-4 text-[9px] font-black text-slate-500 uppercase">
        <span>Item</span><span>Stock</span><span>Sold</span><span>Rem.</span>
      </div>
      <div className="grid grid-cols-4 text-[11px] text-white border-b border-white/5 pb-2">
        <span>Sugar 1kg</span><span>100</span><span className="text-green-400">30</span><span className="text-cyan-400">70</span>
      </div>
      <div className="grid grid-cols-4 text-[11px] text-white border-b border-white/5 pb-2">
        <span>Flour 2kg</span><span>50</span><span className="text-green-400">20</span><span className="text-orange-400">30</span>
      </div>
    </div>
    <div className="mt-4 flex justify-between items-center">
      <div className="text-[10px] text-green-400 font-black uppercase flex items-center gap-1">
        <TrendingUp size={12} /> Sales: Tsh 110,000
      </div>
      <div className="text-[10px] text-orange-400 font-black animate-pulse flex items-center gap-1">
        <AlertCircle size={12} /> Stock Low!
      </div>
    </div>
  </div>
);

const LexonAI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string; isDemo?: boolean }[]>([
    { 
      role: 'model', 
      text: 'Habari! Karibu Lexon AI Assistant. Nitakuuliza maswali 5 pekee kugundua kama biashara yako inapoteza pesa bila wewe kujua.\n\nTayari? Tuanze. Unafanya biashara ya aina gani?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      // Tumesasisha hapa kutumia GoogleGenerativeAI
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      
      // TUMEREKEBISHA JINA LA MODEL HAPA (gemini-1.5-flash)
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: `You are Lexon AI Assistant. CEO is Mohamedi M. Saidi. 
        Ask 5 business questions to identify losses. 
        If you finish the diagnosis, add [SHOW_DEMO] at the end of your response.`
      });

      const chat = model.startChat({
        history: messages.map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }],
        })),
      });

      const result = await chat.sendMessage(userMsg);
      const response = await result.response;
      const aiText = response.text();
      
      const hasDemo = aiText.includes("[SHOW_DEMO]");
      const cleanText = aiText.replace("[SHOW_DEMO]", "");

      setMessages(prev => [...prev, { role: 'model', text: cleanText, isDemo: hasDemo }]);
    } catch (error: any) {
      console.error("AI ERROR:", error);
      let errorDesc = "Samahani, kuna tatizo la kiufundi.";
      if(error.message?.includes("400")) errorDesc = "Kosa: Model name is wrong or request invalid.";
      if(error.message?.includes("403")) errorDesc = "Kosa: API Key haina ruhusa.";
      
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: `${errorDesc} Wasiliana na CEO: ${CONTACT_NUMBER}` 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)} 
          className="w-16 h-16 bg-cyan-400 text-slate-950 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:scale-110 transition-all"
        >
          <MessageSquare size={28} />
        </button>
      ) : (
        <div className="w-[350px] md:w-[420px] h-[600px] bg-slate-950 rounded-[2rem] flex flex-col border border-white/10 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
          <div className="bg-cyan-400 p-5 flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-2">
              <Bot className="text-slate-900" size={20} />
              <div>
                <h3 className="text-slate-900 font-black text-[10px] uppercase tracking-widest">Lexon AI</h3>
                <div className="flex items-center gap-1"><span className="w-1 h-1 bg-green-600 rounded-full animate-pulse"></span><span className="text-slate-800 text-[8px] font-bold">LIVE AUDIT</span></div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-black/10 rounded-full"><X size={20} className="text-slate-900" /></button>
          </div>

          <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4 scroll-smooth">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-[13px] leading-relaxed shadow-md ${
                  m.role === 'user' ? 'bg-cyan-400 text-slate-950 font-bold rounded-tr-none' : 'bg-white/10 text-white border border-white/10 rounded-tl-none'
                }`}>
                  {m.text}
                  {m.isDemo && <MiniDemoView />}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-1 p-2">
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            )}
          </div>

          <div className="p-4 bg-slate-900/80 border-t border-white/5">
            <div className="flex gap-2">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Andika jibu hapa..."
                className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-cyan-400 transition-all"
              />
              <button 
                onClick={handleSend} 
                disabled={loading || !input.trim()}
                className="bg-cyan-400 p-3 rounded-xl text-slate-950 disabled:opacity-50 hover:scale-105 active:scale-95 transition-all"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LexonAI;
