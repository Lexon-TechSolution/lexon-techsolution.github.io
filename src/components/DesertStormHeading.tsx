import React from 'react';
import { motion } from 'framer-motion';

export const DesertStormHeading: React.FC = () => {
  const line1 = "Financial Operation,";
  const line2 = "Operational Infrastructure,";
  const line3 = "eMINISTRY TECH.";

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.02,
      }
    }
  };

  const letterVariants = {
    hidden: (i: number) => {
      // Calculate a spiral stormy starting offset based on character index
      const angle = (i * 45) * (Math.PI / 180);
      const distance = 400 + (i % 6) * 60;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      
      return {
        opacity: 0,
        scale: 0.1,
        x,
        y,
        rotate: (i % 2 === 0 ? 360 : -360) + (i * 20),
        skewX: i % 2 === 0 ? 40 : -40,
        filter: "blur(16px)"
      };
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      rotate: 0,
      skewX: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        stiffness: 90,
        damping: 14,
        mass: 1.15
      }
    }
  };

  const renderWords = (text: string, isGradient = false) => {
    return text.split(" ").map((word, wordIdx) => (
      <span key={wordIdx} className="inline-block whitespace-nowrap mr-3 sm:mr-4 md:mr-5">
        {word.split("").map((char, charIdx) => {
          // Absolute sequential index for spiral layout computation
          const seqIndex = wordIdx * 10 + charIdx;
          return (
            <motion.span
              key={charIdx}
              custom={seqIndex}
              variants={letterVariants}
              className={`inline-block ${isGradient ? 'gradient-text font-black' : 'text-slate-900'}`}
              style={{ display: 'inline-block', transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
            >
              {char}
            </motion.span>
          );
        })}
      </span>
    ));
  };

  return (
    <motion.h1
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="text-5xl sm:text-6xl lg:text-7xl font-display font-black leading-[1.05] tracking-tight mb-8"
      style={{ perspective: '800px' }}
    >
      <div className="block">{renderWords(line1)}</div>
      <div className="block">{renderWords(line2)}</div>
      <div className="block mt-1 sm:mt-2 h-[1.12em] select-none">{renderWords(line3, true)}</div>
    </motion.h1>
  );
};
