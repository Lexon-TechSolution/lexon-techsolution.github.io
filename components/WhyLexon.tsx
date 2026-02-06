import React from 'react';
import { TRANSLATIONS } from '../constants';
import { Language } from '../types';
import { ShieldCheck, Zap, Users, BarChart3 } from 'lucide-react';

interface WhyLexonProps {
  lang: Language;
}

const WhyLexon: React.FC<WhyLexonProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  const features = [
    {
      icon: <ShieldCheck className="text-electric-cyan" />,
      title: "Business-First Engineering",
      desc: "Our systems are designed by Economics & Business experts to ensure every line of code adds profit."
    },
    {
      icon: <Zap className="text-electric-cyan" />,
      title: "Rapid Implementation",
      desc: "Don't wait months. We deploy automated workflows in weeks, providing immediate relief to your staff."
    },
    {
      icon: <Users className="text-electric-cyan" />,
      title: "User-Centric Interfaces",
      desc: "Software only works if people use it. We focus on frictionless, beautiful design for higher adoption."
    },
    {
      icon: <BarChart3 className="text-electric-cyan" />,
      title: "Data-Driven Decisions",
      desc: "Every Lexon system includes live dashboards that turn your operational data into actionable insights."
    }
  ];

  return (
    <section className="py-24 bg-[#0B1120]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            {t.whyLexonTitle}
          </h2>
          <div className="w-24 h-1 bg-electric-cyan mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="flex flex-col items-center text-center p-6 group">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 transition-all duration-300">
                {/* Fixed TypeScript error: React.cloneElement requires the cloned element to have a prop type compatible with the second argument. Casting to React.ReactElement<any> allows the 'size' property for generic icon components. */}
                {React.cloneElement(f.icon as React.ReactElement<any>, { size: 32 })}
              </div>
              <h4 className="text-lg font-bold text-white mb-3">{f.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-cyan-500/5 border border-cyan-500/10 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
          <div className="p-3 bg-cyan-500/20 rounded-full">
            <ShieldCheck size={40} className="text-electric-cyan" />
          </div>
          <div>
            <p className="text-xl md:text-2xl font-semibold text-white">
              "Systems Designed by Business & Economics Experts to Increase Profit and Reduce Costs"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyLexon;