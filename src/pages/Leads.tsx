
import React, { useEffect, useState } from 'react';
import { auth } from '../lib/firebase';
import { motion } from 'framer-motion';
import { 
  Mail, 
  User, 
  Calendar, 
  MessageSquare, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Target, 
  ChevronRight,
  TrendingUp,
  LayoutDashboard,
  Filter,
  BookOpen,
  Plus,
  FileText,
  Image as ImageIcon,
  Send,
  Sparkles,
  Check
} from 'lucide-react';
import SEO from '../components/layout/SEO';

interface Lead {
  id: string;
  name: string;
  email: string;
  company?: string;
  service?: string;
  message: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
  createdAt?: any;
}

const Leads: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [forbidden, setForbidden] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [activeSection, setActiveSection] = useState<'leads' | 'blogs'>('leads');
  
  // Blog publishing states
  const [blogTitle, setBlogTitle] = useState('');
  const [blogSlug, setBlogSlug] = useState('');
  const [blogCover, setBlogCover] = useState('');
  const [blogExcerpt, setBlogExcerpt] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [blogSuccess, setBlogSuccess] = useState('');
  const [blogError, setBlogError] = useState('');

  const handleTitleChange = (val: string) => {
    setBlogTitle(val);
    const generatedSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
    setBlogSlug(generatedSlug);
  };

  const publishBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle.trim() || !blogSlug.trim() || !blogContent.trim()) {
      setBlogError('Tafadhali jaza Kichwa cha habari, Slug na Maudhui ya blog.');
      return;
    }

    setIsPublishing(true);
    setBlogError('');
    setBlogSuccess('');

    try {
      const user = auth.currentUser;
      if (!user) {
        setBlogError('Hujajisajili au hauna ruhusa ya kufanya hivi.');
        setIsPublishing(false);
        return;
      }

      const token = await user.getIdToken();
      const response = await fetch('/api/blog_posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: blogTitle,
          slug: blogSlug,
          content: blogContent,
          coverImage: blogCover,
          excerpt: blogExcerpt,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Imeshindwa kuchapisha blog.');
      }

      setBlogSuccess('Hongera! Blog yako imechapishwa kikamilifu kwenye tovuti!');
      setBlogTitle('');
      setBlogSlug('');
      setBlogCover('');
      setBlogExcerpt('');
      setBlogContent('');
    } catch (error: any) {
      console.error('Failed to publish blog:', error);
      setBlogError(error.message || 'Hitilafu imetokea wakati wa kuchapisha.');
    } finally {
      setIsPublishing(false);
    }
  };

  const fetchLeads = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        setForbidden(true);
        setLoading(false);
        return;
      }

      const token = await user.getIdToken();
      const response = await fetch('/api/leads', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          setForbidden(true);
          return;
        }
        throw new Error(`Failed to fetch leads: ${response.statusText}`);
      }

      const data = await response.json();
      setLeads(data as Lead[]);
    } catch (error: any) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchLeads();
      } else {
        setLoading(false);
        setForbidden(true);
      }
    });

    return () => unsubscribe();
  }, []);

  const updateStatus = async (id: string, newStatus: Lead['status']) => {
    setUpdatingId(id);
    try {
      const user = auth.currentUser;
      if (!user) {
        setForbidden(true);
        return;
      }

      const token = await user.getIdToken();
      const response = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update lead status: ${response.statusText}`);
      }

      setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
    } catch (error) {
      console.error("Error updating lead status:", error);
      alert('Failed to update status.');
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark">
      <div className="w-12 h-12 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (forbidden) return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4 bg-brand-dark">
      <div className="glass p-12 rounded-[40px] max-w-md w-full text-center border-red-500/20">
        <AlertCircle className="text-red-500 mx-auto mb-6" size={64} />
        <h2 className="text-4xl font-display font-bold text-white mb-4 italic">Security Lock</h2>
        <p className="text-slate-400 mb-10 leading-relaxed text-lg">Your identity does not possess the clearance levels required to access the Frontier Command Hub.</p>
        <a href="/login" className="btn-primary w-full justify-center">Authenticate</a>
      </div>
    </div>
  );

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <SEO title="Admin Hub | Command" description="Enterprise lead management and system orchestration." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Admin Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div>
            <div className="text-brand-cyan font-mono text-[10px] uppercase tracking-widest mb-1">/ ADMIN_ACCESS: GRANTED</div>
            <h1 className="text-5xl lg:text-7xl font-display font-bold italic">Command <span className="gradient-text">Centre.</span></h1>
            <p className="text-slate-500 mt-4 font-bold flex items-center gap-2">
               <TrendingUp size={16} className="text-green-500" />
               Total Captured Intelligence: {leads.length}
            </p>
          </div>
          <div className="flex gap-4">
             {activeSection === 'leads' && (
               <button className="glass px-6 py-3 rounded-xl flex items-center gap-2 text-sm font-bold border-white/5 hover:bg-white/5 transition-all">
                  <Filter size={18} /> Filter Status
               </button>
             )}
             <button onClick={fetchLeads} className="btn-outline py-3 px-6 text-sm">Refresh Hub</button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-6 border-b border-white/10 mb-10 pb-1">
          <button 
            onClick={() => setActiveSection('leads')}
            className={`pb-4 px-2 text-sm font-bold uppercase tracking-wider transition-all relative ${activeSection === 'leads' ? 'text-brand-cyan' : 'text-slate-500 hover:text-white'}`}
          >
            Mawasiliano / Leads
            {activeSection === 'leads' && (
              <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-cyan" />
            )}
          </button>
          <button 
            onClick={() => setActiveSection('blogs')}
            className={`pb-4 px-2 text-sm font-bold uppercase tracking-wider transition-all relative ${activeSection === 'blogs' ? 'text-brand-cyan' : 'text-slate-500 hover:text-white'}`}
          >
            Andika Blog / Write Blog
            {activeSection === 'blogs' && (
              <motion.div layoutId="activeTabUnderline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-cyan" />
            )}
          </button>
        </div>

        {activeSection === 'leads' && (
          <div className="grid gap-8">
            {leads.map((lead, idx) => (
              <motion.div
                key={lead.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="glass p-10 rounded-[40px] border border-white/5 hover:border-brand-cyan/20 transition-all group relative overflow-hidden"
              >
                {updatingId === lead.id && (
                  <div className="absolute inset-0 bg-brand-dark/50 backdrop-blur-sm z-50 flex items-center justify-center">
                     <div className="w-8 h-8 border-2 border-brand-cyan border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}

                <div className="grid lg:grid-cols-12 gap-10">
                  {/* Identity */}
                  <div className="lg:col-span-4 border-r border-white/5 pr-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan shadow-inner">
                        <User size={28} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white leading-tight italic">{lead.name}</h3>
                        <p className="text-xs text-slate-500 font-mono tracking-tighter truncate">{lead.email}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                           <Calendar size={14} className="text-brand-cyan" /> {lead.createdAt?.toDate?.() ? lead.createdAt.toDate().toLocaleString() : 'Recent Submission'}
                        </div>
                        {lead.company && (
                          <div className="flex items-center gap-3 text-xs font-bold text-white bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 uppercase tracking-widest">
                             <Target size={14} className="text-brand-magenta" /> {lead.company}
                          </div>
                        )}
                    </div>
                  </div>

                  {/* Intel & Status */}
                  <div className="lg:col-span-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 bg-brand-cyan/10 text-brand-cyan text-[10px] font-black uppercase tracking-widest rounded-lg border border-brand-cyan/20">
                           {lead.service || 'Legacy Inlet'}
                        </span>
                        <div className="flex gap-2">
                           {['new', 'contacted', 'qualified', 'closed'].map((status) => (
                             <button
                               key={status}
                               onClick={() => updateStatus(lead.id, status as Lead['status'])}
                               className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-md border transition-all ${
                                 lead.status === status 
                                 ? 'bg-white text-brand-dark border-white' 
                                 : 'bg-transparent text-slate-600 border-white/5 hover:border-white/20'
                               }`}
                             >
                                {status}
                             </button>
                           ))}
                        </div>
                      </div>
                      <div className="text-slate-300 text-lg leading-relaxed italic relative">
                         <MessageSquare className="absolute -left-10 top-0 opacity-10" size={40} />
                         "{lead.message}"
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                       <div className="text-[10px] font-mono text-slate-700 tracking-[0.3em] uppercase">Status Check: {lead.status === 'new' ? 'Awaiting Protocol' : 'Active Engagement'}</div>
                       <button className="text-brand-cyan font-bold text-sm flex items-center gap-2 group italic">
                          Engage via Mail <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
                       </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {leads.length === 0 && (
              <div className="text-center py-40 glass rounded-[60px] border border-white/5">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-700">
                   <LayoutDashboard size={40} />
                </div>
                <h3 className="text-2xl font-bold text-slate-600 italic">No intelligence captured yet.</h3>
                <p className="text-slate-700 mt-2 font-mono text-[10px] uppercase tracking-widest">Active monitoring of contact endpoints...</p>
              </div>
            )}
          </div>
        )}

        {activeSection === 'blogs' && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-8 md:p-12 rounded-[40px] border border-white/5"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
                <BookOpen size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-white italic">Andika Makala Mpya (Publish Blog)</h2>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">Andika na uchapishe makala moja kwa moja kwenye sehemu ya Blogu ya Lexon Digest.</p>
              </div>
            </div>

            <form onSubmit={publishBlog} className="space-y-6 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Kichwa cha Habari (Title)</label>
                  <input 
                    type="text"
                    required
                    value={blogTitle}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Mfano: Mapinduzi ya Mifumo ya Dijitali..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-cyan outline-none transition-all placeholder:text-slate-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Slug (URL-Friendly Name)</label>
                  <input 
                    type="text"
                    required
                    value={blogSlug}
                    onChange={(e) => setBlogSlug(e.target.value)}
                    placeholder="mapinduzi-ya-mifumo-ya-dijitali"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-cyan outline-none transition-all placeholder:text-slate-600 font-mono text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Link ya Picha ya Jalada (Cover Image URL - Optional)</label>
                <input 
                  type="text"
                  value={blogCover}
                  onChange={(e) => setBlogCover(e.target.value)}
                  placeholder="Weka link ya picha au chagua presets hapa chini..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-cyan outline-none transition-all placeholder:text-slate-600"
                />
                
                {/* Image Presets */}
                <div className="flex flex-wrap gap-2 mt-2.5">
                  <span className="text-[10px] text-slate-500 font-bold self-center mr-1">PRESETS:</span>
                  {[
                    { label: 'Technology', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80' },
                    { label: 'School / Portal', url: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80' },
                    { label: 'Church / Diocese', url: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&q=80' },
                    { label: 'Business ERP', url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80' }
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setBlogCover(preset.url)}
                      className={`text-[9.5px] px-2.5 py-1 rounded-md border font-bold transition-all ${
                        blogCover === preset.url 
                        ? 'bg-brand-cyan text-brand-dark border-brand-cyan' 
                        : 'bg-white/5 text-slate-400 border-white/5 hover:border-white/20'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Maelezo Mafupi (Excerpt / Highlight - Optional)</label>
                <textarea 
                  rows={2}
                  value={blogExcerpt}
                  onChange={(e) => setBlogExcerpt(e.target.value)}
                  placeholder="Andika muhtasari mfupi kuhusu makala haya..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-cyan outline-none transition-all placeholder:text-slate-600"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">Maudhui ya Makala (Content - Markdown Inaruhusiwa)</label>
                  <span className="text-[10px] text-brand-cyan font-mono">Inasapoti Markdown (*italic*, **bold**, ### headers)</span>
                </div>
                <textarea 
                  required
                  rows={8}
                  value={blogContent}
                  onChange={(e) => setBlogContent(e.target.value)}
                  placeholder="### Kichwa cha Mada&#10;Hapa unaanza kuandika habari yako yote kwa undani zaidi..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-cyan outline-none transition-all placeholder:text-slate-600 font-sans"
                />
              </div>

              {blogError && (
                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-xl text-sm font-bold flex items-center gap-2">
                  <AlertCircle size={18} className="shrink-0" />
                  <span>{blogError}</span>
                </div>
              )}

              {blogSuccess && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-sm font-bold flex items-center gap-2">
                  <Check size={18} className="shrink-0" />
                  <span>{blogSuccess}</span>
                </div>
              )}

              <div className="flex justify-end pt-4">
                <button 
                  type="submit"
                  disabled={isPublishing}
                  className="btn-primary py-3.5 px-8 font-black text-sm uppercase tracking-wider flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
                >
                  {isPublishing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-brand-dark border-t-transparent rounded-full animate-spin"></div>
                      Inachapisha...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Chapisha Sasa / Publish Post
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Leads;
