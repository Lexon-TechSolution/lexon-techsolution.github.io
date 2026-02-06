
import React from 'react';
import { Language } from '../types';

const IdealState: React.FC<{ lang: Language }> = ({ lang }) => {
  return (
    <section className="py-24 bg-[#020617] relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
        <h2 className="text-3xl md:text-6xl font-bold text-white mb-12 tracking-tight">
          {lang === 'EN' ? 'Your Business, ' : 'Biashara Yako, '}
          <span className="text-electric-cyan">Re-Imagined.</span>
        </h2>
        
        <div className="relative group">
          <img 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-[500px] object-cover rounded-[3rem] border border-white/5 opacity-40 group-hover:opacity-60 transition-opacity"
            alt="Ideal Future"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-t from-slate-950 via-transparent to-transparent">
             <div className="max-w-3xl">
                <p className="text-xl md:text-3xl text-white font-medium italic leading-relaxed mb-8">
                  {lang === 'EN' 
                    ? '"Imagine waking up to a dashboard that shows every cent earned, every task completed, and every customer satisfied—all while you were asleep."' 
                    : '"Fikiria kuamka na kuona dashibodi inayoonyesha kila senti iliyopatikana, kila kazi iliyokamilika, na kila mteja ameridhika—yote hayo ukiwa umelala."'}
                </p>
                <div className="flex justify-center gap-4">
                  <div className="px-6 py-2 rounded-full border border-electric-cyan/30 text-electric-cyan text-xs font-bold uppercase tracking-widest">Efficiency</div>
                  <div className="px-6 py-2 rounded-full border border-electric-cyan/30 text-electric-cyan text-xs font-bold uppercase tracking-widest">ROI</div>
                  <div className="px-6 py-2 rounded-full border border-electric-cyan/30 text-electric-cyan text-xs font-bold uppercase tracking-widest">Peace</div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IdealState;
