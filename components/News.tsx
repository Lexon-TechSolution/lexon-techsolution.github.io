
import React from 'react';
import { Language } from '../types';
import { ArrowUpRight } from 'lucide-react';

const News: React.FC<{ lang: Language }> = ({ lang }) => {
  const articles = [
    {
      title: lang === 'EN' ? "Business Automation in Tanzania: The 2025 Guide" : "Business Automation Tanzania: Mwongozo wa 2025",
      slug: "business-automation-tanzania",
      date: "Jan 2025",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
      tag: "Automation"
    },
    {
      title: lang === 'EN' ? "Inventory System vs Manual: Why Notebooks are Killing Profit" : "Inventory System vs Manual: Kwanini Daftari Inaua Faida",
      slug: "inventory-system-vs-manual",
      date: "Feb 2025",
      image: "https://images.unsplash.com/photo-1586769852044-692d6e692453?q=80&w=2070&auto=format&fit=crop",
      tag: "Inventory"
    },
    {
      title: lang === 'EN' ? "Why Excel is Dangerous for Growing Businesses" : "Kwanini Excel ni Hatari kwa Biashara Inayokua",
      slug: "why-excel-is-dangerous-for-business",
      date: "Feb 2025",
      image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=2070&auto=format&fit=crop",
      tag: "Expert Insight"
    }
  ];

  return (
    <section id="news" className="py-24 bg-[#0B1120]">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
          <div>
            <h3 className="text-electric-cyan font-bold uppercase tracking-[0.2em] text-xs md:text-sm mb-4">
              Lexon Knowledge Base
            </h3>
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              {lang === 'EN' ? 'Latest Insights & Blogs' : 'Habari na Blogu'}
            </h2>
          </div>
          <button className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors group">
            {lang === 'EN' ? 'View All Articles' : 'Soma Makala Zote'} <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {articles.map((art, i) => (
            <div key={i} className="group cursor-pointer flex flex-col h-full">
              <div className="overflow-hidden rounded-3xl mb-6 aspect-[16/10] relative">
                <img 
                  src={art.image} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  alt={art.title} 
                />
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-electric-cyan px-2.5 py-1 rounded-full bg-electric-cyan/10 border border-electric-cyan/20">
                  {art.tag}
                </span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  {art.date}
                </span>
              </div>
              <h4 className="text-lg md:text-xl font-bold text-white group-hover:text-electric-cyan transition-colors leading-snug mb-4 flex-grow">
                {art.title}
              </h4>
              <div className="text-slate-500 text-[10px] uppercase font-bold tracking-widest flex items-center gap-2 overflow-hidden whitespace-nowrap overflow-ellipsis">
                lexontech.co.tz/blog/{art.slug}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;
