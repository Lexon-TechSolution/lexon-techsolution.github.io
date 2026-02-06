import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { MessageSquare, X, Send, Bot, LayoutDashboard, AlertCircle, TrendingUp } from 'lucide-react';

const CONTACT_NUMBER = "+255 621 887 100";
const GEMINI_API_KEY = "AIzaSyCSvFaNB3m1CZpOYLWLezh9JaOZtp9fWyw"; 

const MiniDemoView: React.FC = () => (
  <div className="bg-slate-900 border border-cyan-400/40 rounded-2xl p-4 my-4 shadow-2xl">
    <div className="flex items-center gap-2 mb-3 border-b border-white/10 pb-2">
      <LayoutDashboard size={14} className="text-cyan-400" />
      <span className="text-[10px] font-black uppercase tracking-widest text-white">Lexon Live Dashboard</span>
    </div>
    <div className="space-y-3">
      <div className="grid grid-cols-4 text-[9px] font-black text-slate-500 uppercase">
        <span>Item</span><span>Stock</span><span>Sold</span><span>Rem.</span>
      </div>
      <div className="grid grid-cols-4 text-[11px] text-white">
        <span>Sugar 1kg</span><span>100</span><span className="text-green-400">30</span><span className="text-cyan-400">70</span>
      </div>
    </div>
    <div className="mt-4 flex justify-between items-center text-[10px] font-black uppercase">
      <div className="text-green-400 flex items-center gap-1"><TrendingUp size={12} /> Sales: 110k</div>
      <div className="text-orange-400 animate-pulse flex items-center gap-1"><AlertCircle size={12} /> Stock Low!</div>
    </div>
  </div>
);

const LexonAI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string; isDemo?: boolean }[]>([
    { role: 'model', text: 'Habari! Karibu Lexon AI. Nitakuuliza maswali 5 pekee kugundua kama biashara yako inapoteza pesa. Unafanya biashara gani?' }
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
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      // HAPA NDIPO KAZI ILIPO - 1.5 FLASH NI LAZIMA
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
      });

      const result = await model.generateContent(userMsg);
      const response = await result.response;
      const aiText = response.text();
      
      const hasDemo = aiText.includes("[SHOW_DEMO]");
      const cleanText = aiText.replace("[SHOW_DEMO]", "");

      setMessages(prev => [...prev, { role: 'model', text: cleanText, isDemo: hasDemo }]);
    } catch (error: any) {
      console.error("API ERROR:", error);
      setMessages(prev => [...prev, { role: 'model', text: `Tatizo la API. Hakikisha umei-Refresh browser. CEO: ${CONTACT_NUMBER}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} className="w-16 h-16 bg-cyan-400 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
          <MessageSquare size={28} />
        </button>
      ) : (
        <div className="w-[350px] md:w-[400px] h-[550px] bg-slate-950 rounded-3xl flex flex-col border border-white/10 overflow-hidden shadow-2xl">
          <div className="bg-cyan-400 p-4 flex justify-between items-center font-bold">
            <span className="flex items-center gap-2"><Bot size={20}/> Lexon AI</span>
            <button onClick={() => setIsOpen(false)}><X size={20}/></button>
          </div>
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-[13px] ${m.role === 'user' ? 'bg-cyan-400 text-black font-bold' : 'bg-white/10 text-white'}`}>
                  {m.text}
                  {m.isDemo && <MiniDemoView />}
                </div>
              </div>
            ))}
            {loading && <div className="text-cyan-400 text-xs animate-pulse">Lexon anafikiri...</div>}
          </div>
          <div className="p-4 border-t border-white/5 flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Jibu hapa..." className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-cyan-400" />
            <button onClick={handleSend} className="bg-cyan-400 p-2 rounded-xl"><Send size={20}/></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LexonAI;
