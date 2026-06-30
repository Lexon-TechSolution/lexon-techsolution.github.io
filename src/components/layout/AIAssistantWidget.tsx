import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, Loader2, Bot } from "lucide-react";
import { useLocation } from "react-router-dom";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Client-side high-fidelity interactive Swahili/English support engine for 100% static hosting compatibility (e.g. GitHub Pages)
function getLocalInteractiveResponse(message: string, clicks: string[] = [], currentUrl: string = ""): string {
  const msg = message.toLowerCase();
  const lastClick = clicks.length > 0 ? clicks[clicks.length - 1] : "";
  const clickedInfo = clicks.length > 0 
    ? `\n\n*(Kutokana na historia yako kwenye tovuti yetu, naona ulitazama: **"${clicks.slice(-3).join(" → ")}"**)*`
    : "";

  let header = `✨ **eMinistry Platform AI**\n\n`;

  // 1. Sadaka / Offering / Michango / Selcom / Pesa
  if (msg.includes("sadaka") || msg.includes("mchango") || msg.includes("michango") || msg.includes("tithing") || msg.includes("giving") || msg.includes("fedha") || msg.includes("selcom") || msg.includes("malipo") || msg.includes("mshahara") || msg.includes("pesa")) {
    return header + `Habari! Kuhusu **Mifumo ya Sadaka na Michango ya Kidijitali (eSadaka & Tithing)**:
nchini Tanzania, parishi na makanisa mengi yanakabiliwa na changamoto ya usimamizi na usalama wa michango. eMinistry inatatua hili kupitia:

1. **Selcom & Pop-up Integration**: Waumini wanaweza kutoa michango, sadaka, na zaka kwa kutumia mitandao yote ya simu kwa urahisi kabisa (M-Pesa, Tigo Pesa, Airtel Money, HaloPesa) kwa ushirikiano bora kabisa na Selcom.
2. **Instant Receipt via SMS (Next SMS)**: Kila muumini anapotoa sadaka au zaka, anapokea ujumbe mfupi wa SMS wa kumshukuru mara moja: *\"Mpendwa Muumini, Sadaka yako ya Tsh X imepokelewa heri na baraka kwako.\"*
3. **Ledger System**: Mtunza hazina anapata ripoti safi za kifedha ambazo zinajazwa kiotomatiki wakati malipo yanapofanyika (real-time reconciliation).

Je, ungependa tuweke mfumo huu kwenye diocese au parishi yako? Tafadhali wasiliana nasi moja kwa moja kwa kupiga simu **+255 621 887 100**! ${clickedInfo}`;
  }

  // 2. NECTA / Auto-Calculations / Shule
  if (msg.includes("necta") || msg.includes("calculation") || msg.includes("shule") || msg.includes("grade") || msg.includes("auto") || msg.includes("marks") || msg.includes("ripoti") || msg.includes("mwanzo") || msg.includes("matokeo") || msg.includes("shuleni")) {
    return header + `Karibu! **NECTA Auto-Calculations & Management Information System**:
Mifumo yetu ya elimu mashuleni (MSSIS na IMS) imeundwa mahususi kurahisisha kazi za walimu kwa kuondoa hesabu zote za mikono wakati wa kuandaa ripoti za mitihani na viwango vya NECTA:

* 📊 **Auto-Grade Engine**: Unaingiza alama (marks) za wanafunzi mara moja tu, na mfumo wetu unapiga hesabu zote za GPA, madaraja (Division I to IV), na nafasi (positioning) kiotomatiki kwa kufuata viwango vyote vya hivi karibuni vya NECTA nchini Tanzania.
* 📝 **Automatic Report Cards**: Inazalisha kadi za ripoti (report cards) na kupanga matokeo (grades layout) kwa kila darasa kwa sekunde moja tu.
* 💬 **Automated Parent SMS**: Mfumo unamtumia kila mzazi SMS ya matokeo ya mwanafunzi kiotomatiki jopo la walimu likishaidhinisha.

Mifumo yetu inatumika kuanzia shule za awali hadi za sekondari. Ungependa kuona demo ya mfumo huu mashuleni kwenu? Wasiliana nasi kupitia ukurasa wetu wa **Contact Us** au tupigie simu **+255 621 887 100**! ${clickedInfo}`;
  }

  // 3. SMS / Next SMS / Broadcast
  if (msg.includes("sms") || msg.includes("next") || msg.includes("ujumbe") || msg.includes("broadcast") || msg.includes("bulk") || msg.includes("nextsms")) {
    return header + `Habari yako! Kuhusu mfumo wetu wa **Next SMS**:
Next SMS ni uti wa mgongo wa mawasiliano wa eMinistry Platform. Inakusaidia kuwa karibu na waumini wako au wazazi kila wakati:

* 📱 **Bulk SMS Campaign**: Tuma matangazo ya jumuiya, ratiba za ibada, michango ya ujenzi, au sala za siku kwa waumini wote kwa kubofya mara moja tu.
* 🔔 **Auto-Reminders**: Mfumo unakumbusha waumini kiotomatiki kuhusu vikao vya jumuiya, ratiba za ibada, au ahadi za maendeleo ya kanisa.
* 🔒 **Dar es Salaam Local Operator Gateway**: Connection imara yenye speed kubwa kwa ushirikiano na makampuni ya mawasiliano nchini Tanzania (TCRA certified).

Je, ungetaka kujumuisha mifumo yetu ya SMS kwenye taasisi yako leo? Tupigie **+255 621 887 100** na timu yetu ya Dar es Salaam ni tayari kukusaidia mara moja! ${clickedInfo}`;
  }

  // 4. Pastor Hans / Grace & Glory
  if (msg.includes("pastor") || msg.includes("hans") || msg.includes("worship") || msg.includes("ibada") || msg.includes("church") || msg.includes("kanisa") || msg.includes("grace") || msg.includes("glory") || msg.includes("chanika") || msg.includes("zingiziwa")) {
    return header + `Spiritual Guidance kwa **Grace & Glory TAG Church (Tanzania)**:
Ibada zetu zote zinaongozwa na mlezi wetu wa kiroho **Mtumishi Pastor Hans** na waalimu wa kwaya zetu:

* ⛪ **Location**: Chanika Zingiziwa, Dar es Salaam, Tanzania.
* ⌚ **Time**: Kila siku ya **Jumapili kuanzia saa 02:00 ASBH** (Sunday Worship Mass).
* 📜 **Theme yetu ya Kiroho**: *Faith in Action*. Tunaamini kuwa imani bila matendo imekufa!
* 📞 **Direct Contact**: Unaweza kuongea na Pastor Hans au kupata mwongozo wa kiroho moja kwa moja kwa kupiga simu **+255 621 887 100**. Unakaribishwa sana, wote mnakaribishwa (All Are Welcome).

Je, una swali lingine kuhusu ibada zetu au unahitaji maombi? Tupo hapa kukusaidia! ${clickedInfo}`;
  }

  // 5. Lexon Team / Saidi Mohamed / CEO / Gaston
  if (msg.includes("lexon") || msg.includes("team") || msg.includes("saidi") || msg.includes("mohamed") || msg.includes("gaston") || msg.includes("ceo") || msg.includes("developers") || msg.includes("ushindi") || msg.includes("tujenge")) {
    return header + `Habari! Kuhusu **Lexon Digital Suite & Developers Team**:
Sisi ni timu imara ya wahandisi wa programu (developers) wenye makazi yetu jijini **Dar es Salaam, Tanzania**. Lengo letu kuu ni **\"Tujenge Ushindi Mmoja\"**:

* 💻 Tunajenga mifumo madhubuti ya ERP, micro-ledger, tovuti za parishi na shule, na mifumo ya SMS nchini kote.
* 🚀 Core Developer wetu ni **Saidi Mohamed Saidi**, unaweza kuwasiliana naye kwa barua pepe: **lexonsupport@gmail.com** kwa makubaliano ya kibiashara, ushirikiano, ama joint capital projects.
* 🤝 Tunamiliki na kuendesha miradi ya pamoja katika nchi za Afrika Mashariki (East Africa Venture Capital Collaboration).

Kama una wazo kubwa la kibiashara, we are open and let's collaborate! ${clickedInfo}`;
  }

  // 6. Pricing / Bei / Gharama
  if (msg.includes("pricing") || msg.includes("bei") || msg.includes("gharama") || msg.includes("cost") || msg.includes("free")) {
    return header + `Safi! Kuhusu **Pricing & Packages za eMinistry Platform**:
Tunatoa gharama rafiki sana kulingana na mahitaji ya parishi, diocese au taasisi yako ya elimu:

1. **Parish/Congregant Hub**: Gharama rahisi inayojumuisha congregant ledger, kadi za kidijitali za kutoa sadaka ya ujenzi, na kadi za ripoti.
2. **Next SMS Solution**: Unalipia tu idadi ya meseji unazotuma (Pay-as-you-go kwa kiwango cha chini kabisa nchini Tanzania).
3. **NECTA Auto-Calculation Engine**: Leseni ya kila mwaka inayotegemea idadi ya wanafunzi shuleni, ikiwemo uandaaji wa ripoti na mafunzo kwa walimu wote.

Tafadhali jaza fomu ya mawasiliano kwenye ukurasa wa **Contact Us** au tupigie kwa simu **+255 621 887 100** ili tukupatie nukuu mahususi (custom quote) ya bei kwa ajili ya taasisi yako! ${clickedInfo}`;
  }

  // 7. Contact / Mawasiliano / Phone / Piga simu
  if (msg.includes("contact") || msg.includes("piga") || msg.includes("simu") || msg.includes("mawasiliano") || msg.includes("namba") || msg.includes("phone") || msg.includes("email") || msg.includes("barua") || msg.includes("pepe")) {
    return header + `Mambo! Unaweza kuwasiliana na timu yetu ya **eMinistry Tanzania** kwa urahisi kabisa:

* 📞 **Piga Simu**: **+255 621 887 100** (Direct Line ya Huduma kwa Wateja na Ushauri wa Mifumo).
* ✉️ **Barua Pepe (CEO)**: **lexonsupport@gmail.com** (Saidi Mohamed Saidi).
* ⛪ **Ofisi & Ibada**: Chanika Zingiziwa, Dar es Salaam.
* 📝 **Fomu ya Tovuti**: Unaweza kwenda kwenye page ya **Contact** na ukaandika huduma unayovutiwa nayo nayo, na tutakupigia simu ndani ya saa 2!

Tuko hapa kuhakikisha huduma zako zote zinaendeshwa kidijitali kwa ulinzi mkubwa! ${clickedInfo}`;
  }

  let clickContextTopic = "";
  if (lastClick) {
    if (lastClick.toLowerCase().includes("service") || lastClick.toLowerCase().includes("portfolio")) {
      clickContextTopic = `huduma zetu za kiwango cha juu za parishi, shule na biashara nchini Tanzania`;
    } else if (lastClick.toLowerCase().includes("pricing") || lastClick.toLowerCase().includes("bei")) {
      clickContextTopic = `gharama zetu rafiki za kuunganisha tithing, NECTA grading na SMS`;
    } else if (lastClick.toLowerCase().includes("project") || lastClick.toLowerCase().includes("shughuli")) {
      clickContextTopic = `miradi yetu mikubwa ya miaka ya hivi karibuni kote Afrika Mashariki`;
    } else if (lastClick.toLowerCase().includes("contact") || lastClick.toLowerCase().includes("us")) {
      clickContextTopic = `jinsi ya kuanza kuandikisha parishi yako leo kwenye fomu yetu`;
    } else {
      clickContextTopic = `huduma ya "${lastClick}"`;
    }
  }

  const welcomeLines = clickContextTopic 
    ? `Naona umekuwa ukiangalia hususani **${clickContextTopic}**. Hilo ni chaguo safi sana!\n\nJe, ungependa nikupe maelezo ya kina jinsi tunavyoweza kuweka mfumo huo wa **Sadaka za Kidijitali (Selcom)**, **NECTA Auto-Calculations (kwa shule)**, au **Next SMS (kwa kutoa taarifa)** kwenye taasisi yako?`
    : `Mimi ni eMinistry Platform AI na niko kushirikiana nawe kila wakati. Tunawezesha makanisa na shule kote nchini Tanzania na Afrika Mashariki kuondokana na madaftari ya mikono na kuhamia kwenye mifumo imara ya kidijitali.

Unaweza kuniuliza kuhusu:
1. **Sadaka za Kidijital (Selcom Integration)**
2. **NECTA Auto-Calculations & School Reports**
3. **Next SMS (Bulk Messaging nchini Tanzania)**
4. **Mtumishi Pastor Hans na Ibada za Grace & Glory (T)**`;

  return header + `Habari yako! Karibu kwenye eMinistry Platform chat.

${welcomeLines}

Tafadhali jisikie huru kuuliza swali lolote, au unaweza kutupigia simu moja kwa moja kwa **+255 621 887 100** kama unahitaji huduma ya haraka!`;
}

export const AIAssistantWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [clicks, setClicks] = useState<string[]>([]);
  const [unreadGlow, setUnreadGlow] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Load click tracking history from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("lexon_clicks");
      if (saved) {
        setClicks(JSON.parse(saved));
      }
    } catch (e) {
      console.warn("Could not parse clicks key", e);
    }
  }, []);

  // Global listener to track clicked buttons, sections, links
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable = target.closest("button, a, [role='button'], [data-click]");
      if (clickable) {
        let label = clickable.getAttribute("data-click") || clickable.textContent?.trim() || "";
        // Extract descriptive label
        if (label) {
          label = label.replace(/\s+/g, " ").substring(0, 60).trim();
          // Filter out generic labels like icons or very short strings
          if (label.length > 3 && !label.includes("<svg") && label.length < 80) {
            setClicks((prev) => {
              const updated = [...prev, label].slice(-8); // Keep last 8 clicks
              localStorage.setItem("lexon_clicks", JSON.stringify(updated));
              return updated;
            });
            // Trigger a elegant subtle particle pulse or glow occasionally to show AI represents attention
            setUnreadGlow(true);
          }
        }
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, []);

  // Set up initial greeting when the chat drawer is opened
  useEffect(() => {
    if (messages.length === 0) {
      let welcomeMsg = "Habari yako! Mimi ni Lexon AI, msaidizi wako wa karibu. ";
      
      if (clicks.length > 0) {
        const lastClick = clicks[clicks.length - 1];
        welcomeMsg += `Naona umekuwa ukisoma au kugusa mifumo yetu ya "${lastClick}". Je, ungetaka nikufafanulie jinsi gani tunajiunga na Selcom au kutoa tithing kwa SMS nchini Tanzania?`;
      } else {
        welcomeMsg += "Niko hapa kukusaidia kurahisisha mifumo ya parishi yako, diocese, au kampuni yako kutoka kwenye manual kwenda kwenye kasi kubwa ya kidijitali. Una swali gani leo?";
      }

      setMessages([{ role: "assistant", content: welcomeMsg }]);
    }
  }, [isOpen, messages.length, clicks]);

  // Scroll to bottom on updates
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setInput("");
    setUnreadGlow(false);
    
    const updatedMessages = [...messages, { role: "user", content: userText } as Message];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          history: updatedMessages.slice(0, -1),
          clicks: clicks,
          currentUrl: location.pathname
        })
      });

      if (!response.ok) {
        throw new Error("Failed to post message");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.text || "Samahani nimepata hitilafu ndogo ya mtandao." }]);
    } catch (err) {
      console.warn("API Server unreachable/missing. Using high-fidelity Swahili client-side responder.", err);
      const localResponse = getLocalInteractiveResponse(userText, clicks, location.pathname);
      setMessages((prev) => [...prev, { role: "assistant", content: localResponse }]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickQuestion = (q: string) => {
    setInput(q);
  };

  return (
    <>
      {/* Absolute persistent floating AI launcher */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {/* Subtle proactive dynamic bubble hint */}
        <AnimatePresence>
          {unreadGlow && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mb-3 bg-slate-900 text-white text-xs border border-slate-800 rounded-2xl py-2 px-4 shadow-[0_4px_20px_rgba(99,91,255,0.25)] max-w-xs text-right leading-snug cursor-pointer relative"
              onClick={() => { setIsOpen(true); setUnreadGlow(false); }}
            >
              <div className="absolute right-4 -bottom-1.5 w-3 h-3 bg-slate-900 border-r border-b border-slate-800 rotate-45" />
              <div className="flex items-center gap-1.5 font-bold text-indigo-400 mb-0.5">
                <Sparkles size={11} className="animate-spin text-emerald-400" />
                <span>Lexon AI Assistant</span>
              </div>
              <span>Je, una shida na {clicks[clicks.length - 1] || "mifumo ya parishi"}? Bofya hapa nikuongoze!</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => { setIsOpen(!isOpen); setUnreadGlow(false); }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className={`w-14 h-14 rounded-full flex items-center justify-center cursor-pointer shadow-[0_0_25px_rgba(99,91,255,0.5)] transition-all ${
            isOpen 
              ? "bg-slate-900 text-white border border-slate-800 hover:bg-slate-800" 
              : "bg-[#635bff] text-white hover:bg-indigo-600"
          }`}
          aria-label="Open AI Assistant"
        >
          {isOpen ? <X size={24} /> : <div className="relative"><MessageSquare size={24} />{unreadGlow && <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border border-white animate-ping" />}</div>}
        </motion.button>
      </div>

      {/* Floating chatbot window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.93 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.93 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed bottom-24 right-6 w-[360px] sm:w-[420px] max-h-[620px] h-[80vh] bg-slate-950 border border-slate-800/90 rounded-[28px] shadow-[0_0_50px_rgba(0,0,0,0.6)] overflow-hidden z-50 flex flex-col font-sans"
          >
            {/* Window Header */}
            <div className="p-5 bg-gradient-to-r from-slate-900 to-indigo-950/40 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-[0_0_15px_rgba(99,91,255,0.2)]">
                  <Bot size={22} className="animate-pulse" />
                </div>
                <div>
                  <h3 className="text-white text-sm font-black tracking-tight flex items-center gap-1.5">
                    Lexon Intelligent AI
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </h3>
                  <p className="text-[10px] text-indigo-300 font-mono font-bold uppercase tracking-wider">East African Core Support</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Click History Badge Indicator (No tech-slop, clean and elegant) */}
            {clicks.length > 0 && (
              <div className="px-5 py-2 bg-slate-900/50 border-b border-slate-900/80 flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest shrink-0">Click log:</span>
                {clicks.slice(-3).map((lbl, idx) => (
                  <span key={idx} className="text-[10px] bg-indigo-950/40 text-indigo-300 font-medium px-2 py-0.5 rounded-full border border-indigo-900/20 shrink-0">
                    {lbl}
                  </span>
                ))}
              </div>
            )}

            {/* Message Pane */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 max-h-[380px] bg-slate-950/90">
              {messages.map((msg, i) => (
                <div 
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`max-w-[85%] rounded-2xl p-3.5 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#635bff] text-white rounded-tr-none font-medium shadow-[0_4px_15px_rgba(99,91,255,0.3)]"
                        : "bg-slate-900 text-slate-100 border border-slate-800/80 rounded-tl-none font-normal"
                    }`}
                  >
                    {/* Render message with line breaks */}
                    {msg.content.split("\n").map((line, blockIdx) => (
                      <p key={blockIdx} className={blockIdx > 0 ? "mt-1.5" : ""}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-slate-900 text-slate-400 border border-slate-800/80 rounded-2xl rounded-tl-none p-3.5 flex items-center gap-2.5">
                    <Loader2 size={16} className="animate-spin text-indigo-400" />
                    <span className="text-xs font-medium font-mono">Lexon AI inafikiria...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Bottom Panel Actions & Input */}
            <div className="p-4 bg-slate-900/60 border-t border-slate-800/70">
              {/* Quick suggestions */}
              {messages.length < 3 && !loading && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <button
                    onClick={() => handleQuickQuestion("Tueleze kuhusu mfumo wa Diocese Hub?")}
                    className="text-[10px] sm:text-xs bg-slate-950 hover:bg-slate-800 text-slate-300 font-bold border border-slate-800 rounded-full px-3 py-1.5 transition-all text-left cursor-pointer"
                  >
                    Diocese Hub ni nini?
                  </button>
                  <button
                    onClick={() => handleQuickQuestion("Mnaendesha kazi vipi Selcom Tanzania?")}
                    className="text-[10px] sm:text-xs bg-slate-950 hover:bg-slate-800 text-slate-300 font-bold border border-slate-800 rounded-full px-3 py-1.5 transition-all text-left cursor-pointer"
                  >
                    Inaendana na Selcom?
                  </button>
                </div>
              )}

              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Je, unashida ya nini? Uliza hapa..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 placeholder-slate-500 transition-all font-medium"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="w-11 h-11 rounded-2xl bg-[#635bff] hover:bg-indigo-600 disabled:bg-slate-800 disabled:text-slate-600 text-white flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-md"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
