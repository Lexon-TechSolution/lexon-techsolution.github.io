import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogService, BlogPost as PostType } from '../services/blogService';
import { Calendar, ArrowLeft, Share2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const parseInlineMarkdown = (text: string): React.ReactNode[] => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-extrabold text-slate-950">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
};

const SafeMarkdown: React.FC<{ content: string }> = ({ content }) => {
  if (!content) return null;
  const blocks = content.split('\n');
  return (
    <div className="space-y-6 text-slate-700 leading-relaxed text-sm md:text-base">
      {blocks.map((block, idx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        if (trimmed.startsWith('###')) {
          const text = trimmed.replace(/^###\s*/, '');
          return (
            <h3 key={idx} className="text-xl md:text-2xl font-bold text-slate-900 mt-8 mb-4">
              {parseInlineMarkdown(text)}
            </h3>
          );
        }

        if (trimmed.startsWith('##')) {
          const text = trimmed.replace(/^##\s*/, '');
          return (
            <h2 key={idx} className="text-2xl md:text-3xl font-bold text-slate-900 mt-10 mb-6">
              {parseInlineMarkdown(text)}
            </h2>
          );
        }

        if (trimmed.startsWith('#')) {
          const text = trimmed.replace(/^#\s*/, '');
          return (
            <h1 key={idx} className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-12 mb-8">
              {parseInlineMarkdown(text)}
            </h1>
          );
        }

        if (trimmed.startsWith('*') || trimmed.startsWith('-')) {
          const text = trimmed.replace(/^[*+-]\s*/, '');
          return (
            <div key={idx} className="flex gap-3 pl-4 my-2">
              <span className="text-blue-600 font-bold shrink-0">•</span>
              <span className="text-slate-700">{parseInlineMarkdown(text)}</span>
            </div>
          );
        }

        return (
          <p key={idx} className="leading-relaxed">
            {parseInlineMarkdown(trimmed)}
          </p>
        );
      })}
    </div>
  );
};

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<PostType | null>(null);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();
  const isSw = language === 'sw';

  useEffect(() => {
    const fetchPost = async () => {
      if (slug) {
        const data = await blogService.getPostBySlug(slug);
        setPost(data);
      }
      setLoading(false);
    };
    fetchPost();
    window.scrollTo(0, 0);
  }, [slug]);

  const formatDate = (dateStr: any) => {
    try {
      if (!dateStr) return '';
      const d = new Date(dateStr);
      return isNaN(d.getTime()) ? '' : d.toLocaleDateString(isSw ? 'sw-TZ' : 'en-US');
    } catch {
      return '';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-slate-700">
        <div className="w-10 h-10 border-4 border-brand-green border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-40 px-4 text-center bg-white text-slate-700">
        <h1 className="text-4xl font-display font-black text-slate-900 mb-8">{isSw ? "Makala Haikupatikana" : "Article Not Found"}</h1>
        <Link to="/blog" className="btn-outline">{isSw ? "Rudi kwenye Makala" : "Return to Blog"}</Link>
      </div>
    );
  }

  return (
    <article className="pt-32 pb-24 overflow-hidden bg-white text-slate-700">
      <div className="max-w-4xl mx-auto px-4">
        {/* Navigation */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <Link to="/blog" className="flex items-center gap-2 text-slate-500 hover:text-[#1e3a8a] transition-colors text-sm font-semibold">
            <ArrowLeft size={16} /> {isSw ? "Rudi kwenye Tafiti" : "Back to Insights"}
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-14"
        >
          <div className="flex items-center gap-2 text-[#1e3a8a] text-xs font-bold uppercase tracking-wider mb-6">
            <Calendar size={13} /> {formatDate(post.date)}
          </div>
          <h1 className="text-4xl lg:text-5xl font-display font-black text-slate-900 mb-8 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500/5 text-[#1e3a8a] border border-blue-500/10 flex items-center justify-center font-bold text-xs">
              LX
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">{isSw ? "Timu ya Uhariri" : "Editorial Team"}</div>
              <div className="text-xs text-slate-400">Lexon Tech Solutions</div>
            </div>
          </div>
        </motion.header>

        {/* Cover Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative aspect-video rounded-3xl overflow-hidden mb-14 border border-slate-200/60 shadow-md"
        >
          <img 
            src={post.coverImage || `https://picsum.photos/seed/${post.id}/1200/675`} 
            alt={post.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Content */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="markdown-body bg-slate-50 p-8 lg:p-12 rounded-[32px] border border-slate-200/50"
        >
          <SafeMarkdown content={post.content} />
        </motion.div>

        {/* Share / Footer */}
        <div className="mt-14 pt-8 border-t border-slate-200/80 flex justify-between items-center">
          <p className="text-slate-400 text-xs italic">{isSw ? "Asante kwa kusoma uchambuzi huu wa Lexon Tech." : "Thanks for reading this Lexon Tech insight."}</p>
          <div className="flex gap-4">
            <button className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#1e3a8a] hover:bg-white transition-all shadow-sm cursor-pointer">
              <Share2 size={15} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
