
import React from 'react';
import { getIcon } from '../constants';
import { Language } from '../types';

const Opportunity: React.FC<{ lang: Language }> = ({ lang }) => {
  return (
    <section className="py-24 bg-[#0B1120] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2 relative">
          <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop" 
              className="w-full h-[400px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
              alt="Technology Opportunity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
          </div>
          {/* Floating Pill */}
          <div className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl border-electric-cyan/20 animate-bounce">
            <div className="text-electric-cyan font-bold text-xl">+65%</div>
            <div className="text-[10px] text-slate-400 uppercase tracking-widest">Growth Potential</div>
          </div>
        </div>

        <div className="lg:w-1/2">
          <h3 className="text-electric-cyan font-bold uppercase tracking-[0.2em] text-sm mb-4">
            {lang === 'EN' ? 'The Opportunity' : 'Fursa Iliyopo'}
          </h3>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {lang === 'EN' ? 'Stop Leaking Profit Through Manual Labor' : 'Acha Kupoteza Faida Kwa Kazi Za Mikono'}
          </h2>
          <p className="text-slate-400 text-lg mb-8 leading-relaxed">
            {lang === 'EN' 
              ? 'Most businesses in Africa lose up to 30% of their revenue due to poor tracking and manual error. We turn this leak into your greatest competitive advantage.' 
              : 'Biashara nyingi barani Afrika hupoteza hadi 30% ya mapato kutokana na ufuatiliaji duni na makosa ya mikono. Tunabadilisha upotevu huu kuwa faida yako kubwa.'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="text-electric-cyan">{getIcon('Target', 24)}</div>
              <div>
                <h4 className="text-white font-bold mb-1">Precision Tracking</h4>
                <p className="text-xs text-slate-500">Zero error data collection</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="text-electric-cyan">{getIcon('Lightbulb', 24)}</div>
              <div>
                <h4 className="text-white font-bold mb-1">Smart Insights</h4>
                <p className="text-xs text-slate-500">Predictive growth models</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Opportunity;
