import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap, Wind, ShieldAlert } from "lucide-react";

interface IntroSequenceProps {
  onComplete: () => void;
}

export const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<"kimbunga" | "heroman" | "impact" | "reveal" | "done">("kimbunga");
  const [hasSkipped, setHasSkipped] = useState(false);

  useEffect(() => {
    // Stage choreography timeline
    const t1 = setTimeout(() => {
      if (!hasSkipped) setPhase("heroman");
    }, 1800); // Kimbunga plays for 1.8s

    const t2 = setTimeout(() => {
      if (!hasSkipped) setPhase("impact");
    }, 2800); // Hero flying in takes 1s, then strikes "kimbola!"

    const t3 = setTimeout(() => {
      if (!hasSkipped) setPhase("reveal");
    }, 3400); // Shaking & shockwave releases text

    const t4 = setTimeout(() => {
      if (!hasSkipped) {
        setPhase("done");
        setTimeout(onComplete, 800); // Smooth transition out
      }
    }, 6000); // Reveal stays for 2.6s, then finishes

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete, hasSkipped]);

  const handleSkip = () => {
    setHasSkipped(true);
    setPhase("done");
    onComplete();
  };

  if (phase === "done") return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-gradient-to-tr from-[#0F172A] via-[#1E1B4B] to-[#311042]">
      {/* Background stars or digital grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,91,255,0.08)_0%,transparent_70%)]" />
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute bottom-10 right-10 z-[110] flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white/95 text-xs font-bold font-mono tracking-widest uppercase px-5 py-3 rounded-full border border-white/15 backdrop-blur-md transition-all cursor-pointer shadow-lg active:scale-95"
      >
        <span>Ruka Utangulizi</span>
        <Sparkles size={14} className="text-amber-400" />
      </button>

      {/* PHASE 1: KIMBUNGA (Cyclone/Tornado Whirlwind Swirl) */}
      <AnimatePresence>
        {phase === "kimbunga" && (
          <motion.div
            key="kimbunga"
            exit={{ opacity: 0, scale: 0.8, filter: "blur(20px)" }}
            className="relative flex flex-col items-center justify-center scale-90 sm:scale-100"
          >
            {/* Swirling hurricane gradient circles */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="w-72 h-72 rounded-full border-t-4 border-r-4 border-b border-l-0 border-[#635bff] relative flex items-center justify-center shadow-[0_0_80px_rgba(99,91,255,0.4)]"
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="w-56 h-56 rounded-full border-b-4 border-l-4 border-t border-r-0 border-pink-500 flex items-center justify-center shadow-[0_0_60px_rgba(236,72,153,0.3)]"
              >
                <div className="w-40 h-40 rounded-full border-t-4 border-r-4 border-cyan-400 opacity-80 animate-spin" style={{ animationDuration: "0.8s" }} />
              </motion.div>
            </motion.div>

            {/* Tornado spiral winds */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.1, y: 150 }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0.1, 1.5 + i * 0.2, 0.1],
                  y: [-100 - i * 30, 100 + i * 30],
                  rotate: [0, 360 * (i % 2 === 0 ? 1 : -1)],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2 + i * 0.1,
                  ease: "easeInOut",
                }}
                className="absolute text-cyan-400 pointer-events-none"
              >
                <Wind size={40 + i * 15} className="opacity-40 filter blur-[1px]" />
              </motion.div>
            ))}

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: [0, 1, 0.8], y: 0 }}
              className="text-white/80 font-mono text-xs uppercase tracking-[0.3em] font-bold mt-12 text-center"
            >
              Kimbunga cha Kidijitali Kinaanza...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PHASE 2: HERO MAN / SPIDER-MAN DROP */}
      <AnimatePresence>
        {phase === "heroman" && (
          <motion.div
            key="heroman"
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            {/* Speed line vectors for drop effect */}
            <div className="absolute inset-Y-0 w-1 flex flex-col justify-between opacity-30">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="w-1 h-32 bg-gradient-to-b from-transparent via-white/50 to-transparent animate-pulse" />
              ))}
            </div>

            {/* Stylized flying Hero figure descending rapidly */}
            <motion.div
              initial={{ y: -800, scale: 3.5, rotate: 18, filter: "blur(8px)" }}
              animate={{
                y: 0,
                scale: 1,
                rotate: 0,
                filter: "blur(0px)",
              }}
              transition={{
                type: "spring",
                stiffness: 110,
                damping: 14,
                mass: 0.9,
              }}
              className="relative flex flex-col items-center"
            >
              {/* Flying aura */}
              <div className="absolute -inset-8 bg-gradient-to-t from-pink-500 via-[#635bff] to-cyan-400 rounded-full blur-2xl opacity-60 animate-pulse" />

              {/* Spider-Man / Flying Hero Silhouette SVG */}
              <svg
                width="200"
                height="200"
                viewBox="0 0 512 512"
                className="relative text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.8)] filter"
                fill="currentColor"
              >
                {/* Custom epic vector outline representing a muscular superhero landing gracefully */}
                <path d="M256,40 C280,40 300,60 300,85 C300,105 285,120 256,130 C227,120 212,105 212,85 C212,60 232,40 256,40 Z M190,160 L322,160 C340,160 355,175 350,195 L310,310 C305,325 320,335 330,340 L410,390 C425,400 420,425 400,425 L340,425 C320,425 305,410 295,395 L270,350 L242,350 L217,350 L195,350 L170,350 L217,395 C207,410 192,425 172,425 L112,425 C92,425 87,400 102,390 L182,340 C192,335 207,325 202,310 L162,195 C157,175 172,160 190,160 Z" />
                {/* Jet streams */}
                <path d="M120,440 L160,500 L130,440 Z" fill="#22D3EE" opacity="0.6" />
                <path d="M392,440 L352,500 L382,440 Z" fill="#F43F5E" opacity="0.6" />
                <path d="M256,430 L256,510 L256,430 Z" stroke="#635BEF" strokeWidth="12" />
              </svg>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-white font-black font-mono tracking-widest text-sm uppercase mt-4 bg-black/60 px-4 py-1.5 rounded-full border border-white/10"
              >
                HERO ARRIVING...
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PHASE 3: IMPACT & KIMBOLA FLASH (Shockwave / Explosion) */}
      <AnimatePresence>
        {phase === "impact" && (
          <motion.div
            key="impact"
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            {/* Blinding screen flash */}
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-white z-[120]"
            />

            {/* Expanding Shockwave Ring */}
            <motion.div
              initial={{ scale: 0.1, opacity: 1, borderWidth: 80 }}
              animate={{
                scale: 3.5,
                opacity: 0,
                borderWidth: 2,
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-96 h-96 rounded-full border border-cyan-400 absolute"
            />

            {/* Glowing neon explosion layers */}
            <motion.div
              initial={{ scale: 0.2, opacity: 1 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{ duration: 0.9, delay: 0.05, ease: "easeOut" }}
              className="w-80 h-80 rounded-full bg-gradient-to-r from-pink-500 via-[#635bff] to-indigo-600 absolute blur-xl"
            />

            {/* Flying energy particle chunks */}
            {[...Array(16)].map((_, i) => {
              const angle = (i * 360) / 16;
              const rad = (angle * Math.PI) / 180;
              const xDir = Math.cos(rad) * 450;
              const yDir = Math.sin(rad) * 450;
              
              return (
                <motion.div
                  key={i}
                  initial={{ x: 0, y: 0, scale: 2, opacity: 1 }}
                  animate={{ x: xDir, y: yDir, scale: 0.2, opacity: 0, rotate: 360 }}
                  transition={{ duration: 0.75, ease: "easeOut" }}
                  className="absolute w-4 h-4 bg-white rounded-lg shadow-[0_0_15px_#22D3EE]"
                />
              );
            })}

            {/* Impact strike effect */}
            <Zap size={150} className="text-amber-300 drop-shadow-[0_0_40px_rgba(251,191,36,0.95)] animate-bounce" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* PHASE 4: FINAL RELEASING REVEAL OF eMINISTRY AGENCY */}
      <AnimatePresence>
        {phase === "reveal" && (
          <motion.div
            key="reveal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ y: -80, opacity: 0, filter: "blur(15px)" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center text-center px-4"
          >
            {/* Ambient gold / purple glow sphere */}
            <div className="absolute w-[450px] h-[450px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

            <motion.div
              initial={{ scale: 0.4, rotate: -8 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 130, damping: 14 }}
              className="relative flex flex-col items-center"
            >
              {/* Dynamic shining star flares representing "kimbola strike unleash" */}
              <motion.div
                animate={{ scale: [1, 1.3, 1], rotate: [0, 90, 180] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="text-amber-400 mb-6 drop-shadow-[0_0_20px_rgba(251,191,36,0.5)]"
              >
                <Sparkles size={48} className="animate-pulse" />
              </motion.div>

              {/* BRAND TEXT: eMINISTRY TECH */}
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-none select-none">
                <span className="text-white drop-shadow-[0_4px_15px_rgba(0,0,0,0.5)]">eMINISTRY</span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-[#8b5cf6] to-pink-500 bg-clip-text text-transparent drop-shadow-[0_2px_45px_rgba(99,91,255,0.6)] font-black uppercase tracking-widest text-4xl sm:text-5xl lg:text-6xl mt-2 block">
                  TECH.
                </span>
              </h1>

              {/* Sleek digital badge subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 px-6 py-2.5 rounded-2xl bg-indigo-950/80 border border-indigo-700/40 shadow-inner inline-flex items-center gap-2.5"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                <span className="text-xs sm:text-sm font-bold font-mono tracking-widest text-indigo-200">
                  PLATFORM ACTIVE & SECURED
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
