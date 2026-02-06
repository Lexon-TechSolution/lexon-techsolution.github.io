import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const LexonAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'model', text: 'Habari! Karibu Lexon AI. Unafanya biashara gani?' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  const GEMINI_API_KEY = "AIzaSyCSvFaNB3m1CZpOYLWLezh9JaOZtp9fWyw";

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      // HAPA NDIPO TUNAPOBADILISHA ILI ISOME 1.5-FLASH
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(userMsg);
      const response = await result.response;
      setMessages(prev => [...prev, { role: 'model', text: response.text() }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "Jaribu tena sasa hivi, refresh ukurasa." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999 }}>
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} style={{ padding: '15px 25px', borderRadius: '50px', background: '#22d3ee', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
          Open Chat
        </button>
      ) : (
        <div style={{ width: '320px', height: '450px', background: '#0f172a', borderRadius: '20px', display: 'flex', flexDirection: 'column', border: '1px solid #334155', color: 'white' }}>
          <div style={{ padding: '15px', background: '#22d3ee', color: 'black', borderRadius: '20px 20px 0 0', display: 'flex', justifyContent: 'space-between' }}>
            <b>Lexon Bot</b>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', fontWeight: 'bold' }}>X</button>
          </div>
          <div style={{ flexGrow: 1, overflowY: 'auto', padding: '15px' }}>
            {messages.map((m, i) => (
              <div key={i} style={{ marginBottom: '10px', textAlign: m.role === 'user' ? 'right' : 'left' }}>
                <span style={{ background: m.role === 'user' ? '#22d3ee' : '#1e293b', color: m.role === 'user' ? 'black' : 'white', padding: '8px 12px', borderRadius: '10px', display: 'inline-block', fontSize: '13px' }}>
                  {m.text}
                </span>
              </div>
            ))}
          </div>
          <div style={{ padding: '15px', display: 'flex', gap: '5px' }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} style={{ flexGrow: 1, padding: '8px', borderRadius: '5px', border: 'none' }} placeholder="Jibu..." />
            <button onClick={handleSend} style={{ background: '#22d3ee', border: 'none', padding: '8px', borderRadius: '5px' }}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LexonAI;
