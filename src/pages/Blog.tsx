import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogService, BlogPost } from '../services/blogService';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';
import SEO from '../components/layout/SEO';
import { useLanguage } from '../context/LanguageContext';

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();
  const isSw = language === 'sw';

  useEffect(() => {
    const fetchPosts = async () => {
      await blogService.seedInitialPosts();
      const data = await blogService.getAllPosts();
      setPosts(Array.isArray(data) ? data : []);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const formatDate = (dateStr: any) => {
    try {
      if (!dateStr) return '';
      const d = new Date(dateStr);
      return isNaN(d.getTime()) ? '' : d.toLocaleDateString(isSw ? 'sw-TZ' : 'en-US');
    } catch {
      return '';
    }
  };

  const safePosts = Array.isArray(posts) ? posts : [];

  return (
    <div className="pt-32 pb-24 bg-white text-slate-700">
      <SEO 
        title={isSw ? "Makala na Habari za Teknolojia | Lexon Insights" : "Lexon Insights | Technology & Automation Blog"}
        description={isSw 
          ? "Soma tafiti na makala za hivi punde kuhusu usimamizi wa shule, makanisa, na mifumo ya biashara (ERP) nchini Tanzania." 
          : "Read the latest articles on church management, business automation trends, and digital transformation in East Africa."}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl lg:text-7xl font-display font-black tracking-tight text-slate-900 mb-6 font-display"
          >
            {isSw ? "Tafiti na " : "Insights & "}<span className="gradient-text">{isSw ? "Ubunifu" : "Innovations"}</span>
          </motion.h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg font-medium">
            {isSw 
              ? "Uchambuzi wa kina kuhusu mifumo ya kisasa ya kidijitali, kurahisisha kazi, na maendeleo ya kiteknolojia nchini Tanzania." 
              : "Deep dives into automation, cloud technology, and the future of digital organization trends in Tanzania."}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-brand-green border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {safePosts.map((post, idx) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-slate-50 border border-slate-200/50 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                <Link to={`/blog/${post.slug}`} className="block relative aspect-video overflow-hidden">
                  <img 
                    src={post.coverImage || `https://picsum.photos/seed/${post.id}/800/450`} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#1e3a8a] text-white text-[10px] font-bold uppercase tracking-widest rounded-md shadow-sm">
                    {isSw ? "MAKALA" : "INSIGHT"}
                  </div>
                </Link>
                
                <div className="p-7 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold mb-4 font-mono">
                    <Calendar size={13} /> {formatDate(post.date)}
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-4 hover:text-[#1e3a8a] transition-colors leading-snug">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-slate-600 text-xs leading-relaxed mb-6 flex-grow">
                    {post.excerpt || post.content.substring(0, 110) + '...'}
                  </p>
                  <Link 
                    to={`/blog/${post.slug}`}
                    className="flex items-center gap-2 text-[#1e3a8a] hover:text-[#1d4ed8] text-xs font-bold uppercase tracking-widest transition-colors mt-auto"
                  >
                    {isSw ? "Soma Makala Kamili" : "Read Full Story"} <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {!loading && safePosts.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border border-slate-200/50">
            <BookOpen size={48} className="mx-auto text-slate-400 mb-4" />
            <p className="text-slate-500 font-semibold">{isSw ? "Hakuna makala yoyote iliyopatikana kwa sasa. Tafadhali rudi baadaye." : "No articles found. Stay tuned for updates."}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
