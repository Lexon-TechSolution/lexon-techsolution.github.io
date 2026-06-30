
import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, ChevronRight, MessageCircle } from 'lucide-react';
import SEO from '../components/layout/SEO';

const FAQ: React.FC = () => {
  const faqs = [
    {
      q: "How long is the implementation for Lexon Grace?",
      a: "Standard divine administration deployments take 14-21 days, including staff training and data migration."
    },
    {
      q: "Can Lexon systems integrate with legacy software?",
      a: "Yes, our neural hubs support API bridging for most modern legacy systems via REST and GraphQL protocols."
    },
    {
      q: "Is my data stored locally or in the cloud?",
      a: "We offer both hybrid and full-cloud deployments. Most clients prefer our secure AWS/Google Cloud clusters for resilience."
    },
    {
      q: "Do you offer offline capabilities for remote regions?",
      a: "Absolutely. Our mobile ecosystems feature proprietary sync logic designed for low-bandwidth environments."
    }
  ];

  return (
    <div className="pt-32 pb-20">
      <SEO 
        title="Knowledge Base"
        description="Find answers to common questions about Lexon's enterprise technology and AI implementations."
      />
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-24">
          <h1 className="text-5xl font-display font-bold mb-6 italic">Knowledge <span className="gradient-text">Hub.</span></h1>
          <p className="text-slate-400">Everything you need to know about scaling with Lexon Tech Solutions.</p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className="glass-card"
            >
              <h3 className="text-xl font-bold flex items-center gap-4 mb-4">
                 <HelpCircle className="text-brand-cyan shrink-0" size={24} />
                 {faq.q}
              </h3>
              <p className="text-slate-400 pl-10 leading-relaxed border-l border-white/5 ml-3">
                 {faq.a}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 glass-card bg-brand-cyan/5 border-brand-cyan/20 text-center">
           <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
           <p className="text-slate-400 mb-8">Our architects are available for a deep-dive technical briefing.</p>
           <button className="btn-primary">
              Contact Support <ChevronRight size={18} />
           </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
