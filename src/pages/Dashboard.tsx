
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Activity, 
  Calendar, 
  MessageSquare, 
  Bell, 
  Settings,
  Search,
  PieChart,
  Target,
  Zap,
  Cpu
} from 'lucide-react';
import SEO from '../components/layout/SEO';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  const stats = [
    { label: 'Total Members', value: '1,280', growth: '+12%', icon: <Users className="text-cyan-400" /> },
    { label: 'Monthly Tithes', value: '$12,450', growth: '+8.5%', icon: <DollarSign className="text-green-400" /> },
    { label: 'Engagement Rate', value: '78%', growth: '+2.1%', icon: <Activity className="text-indigo-400" /> },
    { label: 'Projected ROI', value: '24%', growth: '+5%', icon: <TrendingUp className="text-brand-magenta" /> },
  ];

  const recentActivity = [
    { type: 'Payment', user: 'John Doe', amount: '$150', time: '2 mins ago' },
    { type: 'Member Join', user: 'Alex Systems', amount: null, time: '15 mins ago' },
    { type: 'Service Check-in', user: 'Elite Group', amount: null, time: '45 mins ago' },
    { type: 'Automated Insight', user: 'AI Engine', amount: null, time: '1 hour ago' },
  ];

  return (
    <div className="min-h-screen bg-brand-dark pt-20">
      <SEO title="Ecosystem Portal" description="Access your Lexon autonomous systems and enterprise dashboards." />
      
      {/* Dashboard Nav */}
      <div className="border-b border-white/5 bg-white/[0.02] backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
             <div className="text-brand-cyan font-bold italic tracking-tighter">LEXON_GRACE_V2</div>
             <nav className="flex gap-6">
                {['Overview', 'Members', 'Finance', 'Analytics', 'Settings'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === tab ? 'text-brand-cyan' : 'text-slate-500 hover:text-white'}`}
                  >
                    {tab}
                  </button>
                ))}
             </nav>
          </div>
          <div className="flex items-center gap-4">
             <button className="p-2 text-slate-500 hover:text-white transition-colors relative">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-magenta rounded-full" />
             </button>
             <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10" />
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-12">
         {/* Welcome Header */}
         <div className="mb-12 flex justify-between items-end">
            <div>
               <div className="text-brand-cyan font-mono text-[10px] uppercase tracking-widest mb-1">Authenticated: Church Administrator</div>
               <h1 className="text-4xl font-display font-bold italic">Welcome back, <span className="gradient-text">Frontier.</span></h1>
            </div>
            <div className="flex gap-4">
               <div className="glass px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold border-brand-cyan/20">
                  <div className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
                  System Latency: 0.8ms
               </div>
            </div>
         </div>

         {/* Stats Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 border-white/5"
              >
                <div className="flex justify-between items-start mb-4">
                   <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                      {stat.icon}
                   </div>
                   <div className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-lg">
                      {stat.growth}
                   </div>
                </div>
                <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</div>
                <div className="text-3xl font-display font-bold text-white italic">{stat.value}</div>
              </motion.div>
            ))}
         </div>

         <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Interactive Analytics */}
            <div className="lg:col-span-2 glass-card p-8">
               <div className="flex items-center justify-between mb-10">
                  <h3 className="text-xl font-bold italic flex items-center gap-2">
                     <PieChart size={20} className="text-brand-cyan" /> 
                     Engagement Spectrum
                  </h3>
                  <select className="bg-brand-dark border border-white/10 rounded-lg px-3 py-1 text-xs font-bold text-slate-400">
                     <option>Last 30 Days</option>
                     <option>Last Quarter</option>
                  </select>
               </div>
               
               {/* Fancy bar chart placeholder */}
               <div className="h-64 flex items-end justify-between gap-4">
                  {[40, 70, 45, 90, 65, 80, 55, 95, 70, 85].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: i * 0.05 + 0.5, duration: 0.8 }}
                      className="flex-1 bg-gradient-to-t from-brand-cyan/20 to-brand-cyan/60 rounded-t-lg group relative"
                    >
                       <div className="hidden group-hover:block absolute -top-10 left-1/2 -translate-x-1/2 glass px-2 py-1 text-[10px] whitespace-nowrap">
                          Metric: {h}%
                       </div>
                    </motion.div>
                  ))}
               </div>
               <div className="flex justify-between mt-6 text-[10px] font-mono text-slate-700 uppercase tracking-widest">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                  <span>Aug</span>
                  <span>Sep</span>
                  <span>Oct</span>
               </div>
            </div>

            {/* Side Panel: Recent Activity */}
            <div className="glass-card p-8 flex flex-col">
               <h3 className="text-xl font-bold italic mb-8 flex items-center gap-2">
                  <Activity size={20} className="text-brand-magenta" />
                  Neural Updates
               </h3>
               <div className="space-y-6 flex-1">
                  {recentActivity.map((activity, i) => (
                    <div key={i} className="flex gap-4 group">
                       <div className="w-1 h-12 bg-white/5 rounded-full relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-full bg-brand-cyan h-0 group-hover:h-full transition-all duration-500" />
                       </div>
                       <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                             <div className="text-sm font-bold text-white uppercase tracking-tight">{activity.user}</div>
                             <div className="text-[9px] text-slate-500 font-mono italic">{activity.time}</div>
                          </div>
                          <div className="text-xs text-slate-500">
                             Action: <span className={activity.amount ? 'text-green-500' : 'text-slate-400'}>{activity.type}</span> 
                             {activity.amount && ` [${activity.amount}]`}
                          </div>
                       </div>
                    </div>
                  ))}
               </div>
               <button className="mt-8 text-xs font-bold text-brand-cyan hover:underline uppercase tracking-[0.2em] flex items-center gap-2">
                  View Full Audit Log <Zap size={12} />
               </button>
            </div>
         </div>

         {/* AI Advisory Section */}
         <div className="mt-12 glass p-10 rounded-[40px] border-brand-cyan/20 bg-gradient-to-r from-brand-cyan/[0.03] to-transparent">
            <div className="flex items-center gap-6">
               <div className="w-16 h-16 rounded-full bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
                  <Cpu size={32} />
               </div>
               <div>
                  <h3 className="text-2xl font-bold mb-1 italic">Lexon AI Advisory</h3>
                  <p className="text-slate-400">Based on recent data trends, increasing automated SMS follow-ups for new members could increase retention by <span className="text-brand-cyan font-bold">14.2%</span>.</p>
               </div>
               <button className="ml-auto btn-primary py-3 px-8 text-xs">Execute Suggestion</button>
            </div>
         </div>
      </main>
    </div>
  );
};

export default Dashboard;
