import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const LexonAI = () => {
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState("Bonyeza 'JARIBU' kuona kama AI inafanya kazi.");

  const testAI = async () => {
    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI("AIzaSyCSvFaNB3m1CZpOYLWLezh9JaOZtp9fWyw");
      // HAPA TUNATUMIA MODEL SAHIHI
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent("Sema 'Lexon AI ipo tayari!'");
      const response = await result.response;
      setChat(response.text());
    } catch (e: any) {
      setChat("Kosa bado lipo: " + e.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', background: 'white', padding: '20px', borderRadius: '10px', color: 'black', zIndex: 9999, border: '5px solid cyan' }}>
      <h3>LEXON TEST V3</h3>
      <p>{chat}</p>
      <button onClick={testAI} disabled={loading} style={{ background: 'cyan', padding: '10px' }}>
        {loading ? "Inafanya kazi..." : "JARIBU AI SASA"}
      </button>
    </div>
  );
};

export default LexonAI;
