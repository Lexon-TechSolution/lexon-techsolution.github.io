
import React from 'react';
import { Shield, Target, User, Cpu, Award } from 'lucide-react';
import { Language } from '../types';

interface AboutProps {
  lang: Language;
}

const About: React.FC<AboutProps> = ({ lang }) => {
  return (
    <section id="about" className="py-24 bg-[#020617] relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="relative group">
            <div className="absolute -inset-4 bg-electric-cyan/10 blur-3xl rounded-full opacity-50"></div>
            <div className="relative overflow-hidden rounded-[3rem] border border-white/10 aspect-[4/5] md:aspect-square">
              <img 
                src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2073&auto=format&fit=crop" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                alt="Corporate Headquarters"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              
              <div className="absolute bottom-8 left-8 right-8 glass p-6 rounded-2xl border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-electric-cyan/20 flex items-center justify-center text-electric-cyan">
                    <User size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">Mohamedi M. Saidi</h4>
                    <p className="text-electric-cyan text-xs font-bold uppercase tracking-widest">Chief Executive Officer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-electric-cyan font-bold uppercase tracking-[0.2em] text-sm mb-4">
              {lang === 'EN' ? 'The Visionary' : 'Kiongozi wa Maono'}
            </h3>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
              {lang === 'EN' ? 'Leading the Digital Revolution in Africa' : 'Tunaongoza Mapinduzi ya Kidijitali Afrika'}
            </h2>
            
            <div className="space-y-6 text-slate-400 text-base md:text-lg leading-relaxed mb-10">
              <p>
                {lang === 'EN' 
                  ? "Lexon Tech Solutions Co. Ltd, under the leadership of CEO Mohamedi M. Saidi, is dedicated to solving the most complex business challenges through technology. We don't just build software; we build ROI engines."
                  : "Lexon Tech Solutions Co. Ltd, chini ya uongozi wa CEO Mohamedi M. Saidi, imejitolea kutatua changamoto ngumu zaidi za biashara kupitia teknolojia. Hatujengi programu tu; tunajenga mifumo ya kuongeza faida."}
              </p>
              <p>
                {lang === 'EN'
                  ? "We specialize in Church Automation (Lexon Grace), School Management (Lexon Academic), Hospitality (Lexon Stay), and custom Corporate ERPs that eliminate manual errors and maximize efficiency."
                  : "Tuna utaalam katika Mifumo ya Makanisa (Lexon Grace), Usimamizi wa Shule (Lexon Academic), Hospitality (Lexon Stay), na ERP za makampuni zinazoondoa makosa ya kibinadamu na kuongeza ufanisi."}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-electric-cyan/30 transition-all">
                <Cpu className="text-electric-cyan mb-3" size={24} />
                <h5 className="text-white font-bold text-sm mb-1">{lang === 'EN' ? 'Tech Excellence' : 'Ufundi wa Hali ya Juu'}</h5>
                <p className="text-[10px] text-slate-500">{lang === 'EN' ? 'Built with global standards' : 'Imejengwa kwa viwango vya kimataifa'}</p>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:border-electric-cyan/30 transition-all">
                <Shield className="text-electric-cyan mb-3" size={24} />
                <h5 className="text-white font-bold text-sm mb-1">{lang === 'EN' ? 'Reliability' : 'Uaminifu'}</h5>
                <p className="text-[10px] text-slate-500">{lang === 'EN' ? 'Secure and robust systems' : 'Mifumo salama na imara'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
