import React from 'react';
import { SERVICES, getIcon } from '../constants';
import { CheckCircle, ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/layout/SEO';
import { motion } from 'framer-motion';

const Services: React.FC = () => {
  return (
    <div className="pt-28 pb-20 bg-white text-slate-800">
      <SEO 
        title="Solutions & Services | Lexon Tech Solutions"
        description="Learn about our custom administrative portals, school reporting registers, eMinistry church databases, and reliable SMS integrations."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-left">
        
        {/* Header Introduction */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="inline-block text-xs font-black tracking-widest text-[#10b981] bg-[#10b981]/5 px-3 py-1 rounded mb-4">
            OUR TECHNICAL HORIZONS
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-black text-slate-900 leading-none mb-4">
            Solutions & Integrations
          </h1>
          <p className="text-slate-600 font-medium text-base">
            Enterprise software integrations designed to coordinate institution databases, support school registers on-ground, and secure organizational data streams.
          </p>
        </div>

        {/* Dynamic Services Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {SERVICES.map((service) => (
            <motion.div 
              key={service.id}
              whileHover={{ 
                scale: 1.025,
                y: -6,
                rotate: [0, -0.8, 0.8, -0.5, 0.5, 0],
                transition: { duration: 0.4 }
              }}
              className="bg-slate-50 border-2 border-[#1e3a8a]/10 p-8 rounded-3xl hover:bg-white hover:border-[#facc15] hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="flex items-center gap-4 mb-6">
                  {/* Service Icon */}
                  <div className="w-12 h-12 rounded-xl bg-[#1e3a8a]/5 border-2 border-[#1e3a8a]/10 flex items-center justify-center text-[#1e3a8a] shrink-0">
                    {getIcon(service.icon, 22)}
                  </div>
                  <div>
                    <span className="block text-[9.5px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                       Vertical /{service.id}
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 leading-none mt-0.5">
                      {service.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed font-semibold mb-6">
                  {service.description}
                </p>

                {/* Features Grid */}
                <div className="space-y-2.5 mb-8">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-slate-700 font-bold">
                      <CheckCircle className="text-[#10b981] shrink-0" size={14} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action buttons inside card */}
              <div className="pt-6 border-t border-slate-200/80 flex items-center justify-between">
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#10b981] font-black">
                   TANZANIA COMPLIANT
                </span>
                <Link 
                  to="/contact" 
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-800 hover:text-[#1e3a8a] transition-colors"
                >
                  Consult Now <ChevronRight size={16} />
                </Link>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Giant Bottom Call-to-Action Bar */}
        <section className="mt-20 bg-[#1e3a8a] text-white rounded-[32px] p-8 md:p-12 text-center md:text-left relative overflow-hidden shadow-md">
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
          
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="max-w-xl">
              <h3 className="text-3xl font-display font-black mb-3">
                Need a Bespoke Software Architecture?
              </h3>
              <p className="text-white/85 text-sm leading-relaxed font-semibold">
                Our core systems division builds custom administrative portals, localized ledger records, and automation workflows on a client or project specification basis.
              </p>
            </div>
            
            <Link 
              to="/contact" 
              className="bg-white hover:bg-slate-50 text-[#1e3a8a] font-black px-8 py-4 rounded-full text-sm inline-flex items-center gap-1.5 transition-all shadow-md shrink-0"
            >
              Get in Touch <ArrowRight size={16} />
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Services;
