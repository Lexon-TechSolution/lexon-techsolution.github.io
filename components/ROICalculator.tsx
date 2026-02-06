
import React, { useState } from 'react';
import { Industry, Language } from '../types';
import { TRANSLATIONS } from '../constants';
import { TrendingUp, Clock, DollarSign, ArrowRight } from 'lucide-react';

interface ROICalculatorProps {
  lang: Language;
  onOpenContact: () => void;
}

const ROICalculator: React.FC<ROICalculatorProps> = ({ lang, onOpenContact }) => {
  const [industry, setIndustry] = useState<Industry>('CORPORATE');
  const [volume, setVolume] = useState<number>(100); 
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(15);

  const calculateSavings = () => {
    // Business logic: 60% of manual tasks can be automated
    const timeSavedPerMonth = (hoursPerWeek * 4) * 0.6;
    
    // Average operational cost multipliers based on industry
    const multiplier = {
      CHURCH: 15, // Lower avg cost per member interaction
      SCHOOL: 25, // Academic admin costs
      HOTEL: 45,  // High inventory/booking complexity
      CORPORATE: 35 // Standard ERP efficiency
    }[industry];

    const moneySaved = timeSavedPerMonth * multiplier * (volume / 50);
    
    return {
      hours: Math.round(timeSavedPerMonth),
      money: Math.round(moneySaved).toLocaleString()
    };
  };

  const results = calculateSavings();
  const t = TRANSLATIONS[lang];

  const industryLabels = {
    CHURCH: lang === 'EN' ? 'Members' : 'Waumini',
    SCHOOL: lang === 'EN' ? 'Students' : 'Wanafunzi',
    HOTEL: lang === 'EN' ? 'Rooms/Month' : 'Vyumba/Mwezi',
    CORPORATE: lang === 'EN' ? 'Staff' : 'Wafanyakazi'
  };

  return (
    <section id="roi" className="py-24 bg-[#020617]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="glass p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] border border-cyan-500/10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="order-2 lg:order-1">
            <h3 className="text-electric-cyan font-bold uppercase tracking-[0.2em] text-xs md:sm mb-4">
              Financial Impact
            </h3>
            <h2 className="text-2xl md:text-5xl font-bold text-white mb-6">
              {t.roiTitle}
            </h2>
            <p className="text-slate-400 mb-10 text-sm md:text-base leading-relaxed">
              {t.roiSubtext}
            </p>

            <div className="space-y-8">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-4 uppercase tracking-wider">Select Industry</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['CHURCH', 'SCHOOL', 'HOTEL', 'CORPORATE'] as Industry[]).map((ind) => (
                    <button
                      key={ind}
                      onClick={() => setIndustry(ind)}
                      className={`px-3 py-2.5 rounded-xl text-[10px] font-bold transition-all border ${
                        industry === ind
                          ? 'bg-electric-cyan border-electric-cyan text-slate-950'
                          : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                      }`}
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-xs text-slate-400 uppercase tracking-widest">{industryLabels[industry]}</label>
                    <span className="text-electric-cyan font-bold">{volume}</span>
                  </div>
                  <input 
                    type="range" min="10" max="1000" step="10" value={volume} 
                    onChange={(e) => setVolume(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-electric-cyan"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-xs text-slate-400 uppercase tracking-widest">{lang === 'EN' ? 'Manual Hours/Week' : 'Saa za Kazi/Wiki'}</label>
                    <span className="text-electric-cyan font-bold">{hoursPerWeek}h</span>
                  </div>
                  <input 
                    type="range" min="5" max="80" step="5" value={hoursPerWeek} 
                    onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-electric-cyan"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 bg-gradient-to-br from-cyan-500/10 to-blue-600/5 p-8 md:p-12 rounded-[2rem] border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <TrendingUp size={120} />
            </div>
            
            <div className="relative z-10 space-y-12">
              <div className="text-center md:text-left">
                <p className="text-slate-400 text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-4">Estimated Monthly Savings</p>
                <div className="flex flex-col gap-8">
                  <div>
                    <div className="flex items-center gap-3 text-electric-cyan mb-1 justify-center md:justify-start">
                      <Clock size={24} />
                      <span className="text-4xl md:text-6xl font-black text-white">{results.hours}h</span>
                    </div>
                    <p className="text-slate-500 text-xs uppercase font-bold tracking-widest">Administrative Hours Reclaimed</p>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 text-green-400 mb-1 justify-center md:justify-start">
                      <DollarSign size={24} />
                      <span className="text-4xl md:text-6xl font-black text-white">${results.money}</span>
                    </div>
                    <p className="text-slate-500 text-xs uppercase font-bold tracking-widest">Operational Capital Saved</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={onOpenContact}
                className="w-full py-5 bg-electric-cyan text-slate-950 rounded-2xl font-black text-sm uppercase tracking-widest hover:shadow-[0_0_40px_rgba(34,211,238,0.3)] transition-all flex items-center justify-center gap-2 group/btn"
              >
                {lang === 'EN' ? 'Claim Your Full Audit' : 'Pata Tathmini Kamili'}
                <ArrowRight size={18} className="group-hover/btn:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
