
import React from 'react';
import { Language } from '../types';
import { ArrowUpRight, BookOpen } from 'lucide-react';

interface NewsProps {
  lang: Language;
  onNavigate: (path: string) => void;
}

const News: React.FC<NewsProps> = ({ lang, onNavigate }) => {
  const articles = [
    {
      title: lang === 'EN' ? "Business Automation in Tanzania: The 2025 Guide" : "Business Automation Tanzania: Mwongozo wa 2025",
      slug: "business-automation-tanzania",
      description: lang === 'EN' ? "How Tanzanian SMEs are using AI to double their efficiency." : "Jinsi biashara ndogo na za kati Tanzania zinavyotumia AI kuongeza ufanisi.",
      date: "Jan 24, 2025",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
      tag: "Automation"
    },
    {
      title: lang === 'EN' ? "Inventory System vs Manual: Why Notebooks are Killing Profit" : "Inventory System vs Manual: Kwanini Daftari Inaua Faida",
      slug: "inventory-system-vs-manual",
      description: lang === 'EN' ? "The hidden costs of using paper records in modern retail." : "Gharama zilizofichika za kutumia makaratasi kwenye biashara za kisasa.",
      date: "Feb 02, 2025",
      image: "https://images.unsplash.com/photo-1586769852044-692d6e692453?q=80&w=2070&auto=format&fit=crop",
      tag: "Operations"
    },
    {
      title: lang === 'EN' ? "Why Excel is Dangerous for Your Growing Business" : "Kwanini Excel ni Hatari kwa Biashara Inayokua",
      slug: "why-excel-is-dangerous-for-business",
      description: lang === 'EN' ? "Excel is a tool, not a database. Learn why systems beat spreadsheets." : "Excel ni kifaa, sio kanzidata. Jifunze kwanini mifumo ni bora kuliko Excel.",
      date: "Feb 05, 2025",
      image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=2070&auto=format&fit=crop",
      tag: "Tech Debt"
    }
  ];

  return (
    <section id="news" className="py-20 md:py-32 bg-[#0B1120]">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-electric-cyan font-bold uppercase tracking-widest text-[10px] mb-4">
              <BookOpen size={14} /> Knowledge Hub
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              {lang === 'EN' ? 'Latest from Lexon Blog' : 'Makala Mpya kutoka Lexon'}
            </h2>
          </div>
          <button className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors group">
            {lang === 'EN' ? 'Explore all articles' : 'Soma makala zote'} 
            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {articles.map((art, i) => (
            <div 
              key={i} 
              className="group cursor-pointer flex flex-col h-full bg-white/5 rounded-[2rem] overflow-hidden border border-white/5 hover:border-electric-cyan/30 transition-all duration-500 shadow-2xl"
              onClick={() => onNavigate(`blog/${art.slug}`)}
            >
              <div className="overflow-hidden aspect-[16/10] relative">
                <img 
                  src={art.image} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  alt={art.title} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-950 bg-electric-cyan px-3 py-1 rounded-full">
                    {art.tag}
                  </span>
                </div>
              </div>
              
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-3">
                  {art.date}
                </span>
                <h4 className="text-lg md:text-xl font-bold text-white group-hover:text-electric-cyan transition-colors leading-snug mb-4">
                  {art.title}
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-2">
                  {art.description}
                </p>
                <div className="pt-4 border-t border-white/5 text-[9px] text-slate-600 font-bold uppercase tracking-widest flex items-center justify-between">
                  <span>lexontech.co.tz/blog/{art.slug}</span>
                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 md:hidden">
          <button onClick={() => onNavigate('news')} className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold text-sm">
             {lang === 'EN' ? 'Read All Blogs' : 'Soma Blogu Zote'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default News;
