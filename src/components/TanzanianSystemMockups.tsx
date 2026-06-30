import React from "react";
import { 
  BarChart, Users, BookOpen, GraduationCap, Users2, ShieldAlert, 
  HelpCircle, Sparkles, LogOut, CheckCircle, Home, Calendar, 
  Layers, Database, Landmark, Heart, ShieldAlert as FlameIcon,
  Crown, Smartphone, MessageSquare, Flame
} from "lucide-react";

export const MssisMockup: React.FC = () => {
  return (
    <div className="w-full bg-slate-900 border border-slate-700/60 rounded-3xl overflow-hidden shadow-2xl font-sans text-slate-800">
      {/* Browser Window Header */}
      <div className="bg-slate-800 px-4 py-3 flex items-center justify-between border-b border-slate-700/50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500" />
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-[10px] text-slate-400 font-mono tracking-wider ml-2">mssis.eministry.co.tz/panel</span>
        </div>
        <div className="px-3 py-0.5 rounded bg-slate-700/50 text-[9px] text-[#22D3EE] font-mono border border-cyan-500/20">
          SECURE NECTA AUTO-CALC ENGINES
        </div>
      </div>

      {/* Main Container */}
      <div className="flex h-[380px] bg-slate-100 overflow-hidden text-[11px]">
        {/* Sidebar on Left (Blue background from screenshot) */}
        <div className="w-40 sm:w-48 bg-[#0066D6] text-white flex flex-col justify-between p-4 flex-shrink-0 select-none">
          <div className="space-y-6">
            {/* Header Badge */}
            <div className="flex items-center gap-2 pb-3 border-b border-white/20">
              <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-blue-600">
                <GraduationCap size={16} />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold font-display leading-tight text-white tracking-wider">MSSIS</span>
                <span className="text-[8px] text-blue-100 uppercase tracking-widest font-mono">SCHOOL PLATFORM</span>
              </div>
            </div>

            {/* Menu Items */}
            <div className="space-y-1">
              {[
                { label: "Dashboard", active: false, icon: <Home size={13} /> },
                { label: "Academics", active: true, icon: <BookOpen size={13} /> },
                { label: "Teaching", active: false, icon: <Layers size={13} /> },
                { label: "Students", active: false, icon: <Users size={13} /> },
                { label: "Staff", active: false, icon: <Users2 size={13} /> },
                { label: "Administration", active: false, icon: <Landmark size={13} /> },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                    item.active
                      ? "bg-white/20 text-white font-bold shadow-inner"
                      : "text-blue-100 hover:bg-white/10"
                  }`}
                >
                  <span className={item.active ? "text-white" : "text-blue-200"}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Logout at bottom */}
          <div className="flex items-center gap-2 px-3 py-2 text-blue-200 hover:text-white cursor-pointer transition-colors border-t border-white/10 pt-3">
            <LogOut size={13} />
            <span>Logout</span>
          </div>
        </div>

        {/* Workspace Panel on Right (Swahili Results Form) */}
        <div className="flex-1 bg-white p-4 overflow-y-auto relative scrollbar-none">
          {/* Header */}
          <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-4">
            <div className="flex flex-col">
              <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold font-mono">Tanzania Education Standards</span>
              <h4 className="text-sm font-black text-slate-800">Mid Term Examination Reports</h4>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>GPA Auto-calc: On</span>
            </div>
          </div>

          <div className="space-y-4">
            {/* Table 1: Division Performance Summary */}
            <div>
              <div className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400 mb-1.5">
                DIVISION PERFORMANCE SUMMARY
              </div>
              <table className="w-full border-collapse text-left text-[9px] border border-amber-200 bg-amber-50/20">
                <thead>
                  <tr className="bg-amber-100/60 border-b border-amber-250 text-amber-900">
                    <th className="px-2.5 py-1.5 font-bold border-r border-amber-250">SEX</th>
                    <th className="px-2.5 py-1.5 font-bold border-r border-amber-250">I</th>
                    <th className="px-2.5 py-1.5 font-bold border-r border-amber-250">II</th>
                    <th className="px-2.5 py-1.5 font-bold border-r border-amber-250">III</th>
                    <th className="px-2.5 py-1.5 font-bold border-r border-amber-250">IV</th>
                    <th className="px-2.5 py-1.5 font-bold">0</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-200">
                  {[
                    { sex: "F", i: 12, ii: 8, iii: 4, iv: 2, z: 0 },
                    { sex: "M", i: 10, ii: 9, iii: 6, iv: 1, z: 0 },
                    { sex: "T", i: 22, ii: 17, iii: 10, iv: 3, z: 0 },
                  ].map((row, rIdx) => (
                    <tr key={rIdx} className={row.sex === "T" ? "font-bold bg-amber-500/10" : ""}>
                      <td className="px-2.5 py-1 border-r border-amber-200 text-slate-700">{row.sex}</td>
                      <td className="px-2.5 py-1 border-r border-amber-200 text-slate-600">{row.i}</td>
                      <td className="px-2.5 py-1 border-r border-amber-200 text-slate-600">{row.ii}</td>
                      <td className="px-2.5 py-1 border-r border-amber-200 text-slate-600">{row.iii}</td>
                      <td className="px-2.5 py-1 border-r border-amber-200 text-slate-600">{row.iv}</td>
                      <td className="px-2.5 py-1 text-slate-600">{row.z}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table 2: Subject Performance Summary */}
            <div>
              <div className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400 mb-1.5">
                SUBJECT PERFORMANCE SUMMARY (NECTA RANKS)
              </div>
              <table className="w-full border-collapse text-left text-[9px] border border-slate-200">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                    <th className="px-2 py-1.5 border-r border-slate-200">S/N</th>
                    <th className="px-2 py-1.5 border-r border-slate-200">SUBJECTS</th>
                    <th className="px-2 py-1.5 border-r border-slate-200">A</th>
                    <th className="px-2 py-1.5 border-r border-slate-200">B</th>
                    <th className="px-2 py-1.5 border-r border-slate-200">C</th>
                    <th className="px-2 py-1.5 border-r border-slate-200">D</th>
                    <th className="px-2 py-1.5">F</th>
                  </tr>
                </thead>
                <tbody className="divide-Y divide-slate-200">
                  {[
                    { sn: 1, s: "CIVICS", a: 5, b: 12, c: 15, d: 3, f: 0 },
                    { sn: 2, s: "HISTORY", a: 4, b: 10, c: 18, d: 3, f: 0 },
                    { sn: 3, s: "GEOGRAPHY", a: 6, b: 14, c: 12, d: 3, f: 0 },
                    { sn: 4, s: "KISWAHILI", a: 15, b: 15, c: 5, d: 0, f: 0 },
                    { sn: 5, s: "ENGLISH LANGUAGE", a: 8, b: 18, c: 9, d: 0, f: 0 },
                    { sn: 6, s: "PHYSICS", a: 3, b: 8, c: 17, d: 6, f: 1 },
                    { sn: 7, s: "CHEMISTRY", a: 4, b: 9, c: 19, d: 3, f: 0 },
                  ].map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-50/50">
                      <td className="px-2 py-1 border-r border-slate-200 text-slate-500 font-mono text-[8px]">{row.sn}</td>
                      <td className="px-2 py-1 border-r border-slate-200 font-semibold text-slate-800">{row.s}</td>
                      <td className="px-2 py-1 border-r border-slate-200 text-[#0066D6] font-mono font-bold">{row.a}</td>
                      <td className="px-2 py-1 border-r border-slate-200 text-slate-600 font-mono">{row.b}</td>
                      <td className="px-2 py-1 border-r border-slate-200 text-slate-600 font-mono">{row.c}</td>
                      <td className="px-2 py-1 border-r border-slate-200 text-slate-500 font-mono">{row.d}</td>
                      <td className="px-2 py-1 text-rose-500 font-mono font-bold">{row.f}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EministryChurchMockup: React.FC = () => {
  return (
    <div className="w-full bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl font-sans text-slate-200">
      {/* Browser Header */}
      <div className="bg-[#110D2C] px-4 py-3 flex items-center justify-between border-b border-indigo-950/70">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500" />
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-[10px] text-slate-400 font-mono tracking-wider ml-2">portal.eministry.tz/oversight</span>
        </div>
        <div className="px-3 py-0.5 rounded bg-amber-500/10 text-amber-400 font-mono text-[9px] border border-amber-500/25">
          ENTERPRISE SERVER • TZ
        </div>
      </div>

      {/* Grid Layout of Church Platform */}
      <div className="flex h-[420px] bg-[#0E0B20] text-[11px] overflow-hidden">
        {/* Left deep indigo sidebar from screenshot */}
        <div className="w-36 sm:w-44 bg-[#14113A] border-r border-indigo-950 flex flex-col justify-between p-3.5 flex-shrink-0 select-none">
          <div className="space-y-4">
            {/* User Profile Info section */}
            <div className="p-2.5 rounded-xl bg-indigo-950/50 border border-indigo-900 flex flex-col gap-1">
              <span className="text-[8px] text-slate-400 font-mono font-bold truncate">UPOLE@GMAIL.COM</span>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[8px] text-indigo-300 font-mono uppercase tracking-[0.1em] font-black">LEX-4580</span>
              </div>
            </div>

            {/* Menu options mapped exactly */}
            <div className="space-y-0.5">
              {[
                { label: "MEMBERS", active: false },
                { label: "FINANCE", active: false },
                { label: "EVENTS & CALENDAR", active: false },
                { label: "ATTENDANCE", active: false },
                { label: "PRAISE OFFICE", active: false },
                { label: "STREAMING", active: false },
                { label: "SMS ENGINE", active: false }
              ].map((menu, mIdx) => (
                <div 
                  key={mIdx}
                  className={`px-3 py-1.5 rounded-lg text-[9px] font-bold tracking-wider hover:bg-indigo-950/30 cursor-pointer text-indigo-200 flex items-center gap-2`}
                >
                  <span className="w-1 h-1 bg-[#ff5c00] rounded-full opacity-60" />
                  <span>{menu.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom account logout */}
          <div className="pt-2.5 border-t border-indigo-950/60 text-[9px] text-purple-300 flex items-center gap-1.5 hover:text-white cursor-pointer font-bold">
            <LogOut size={11} />
            <span>Logout Account</span>
          </div>
        </div>

        {/* Main Dashboard panel */}
        <div className="flex-1 bg-white text-slate-800 p-4 overflow-y-auto relative scrollbar-none">
          
          {/* Top Banner alert block representing "Payment Pending" exactly from screenshot */}
          <div className="bg-gradient-to-r from-[#EA580C] to-[#F97316] rounded-2xl p-3.5 flex items-center justify-between gap-3 text-white shadow-md relative overflow-hidden mb-5">
            <div className="absolute top-[-30px] right-[-30px] w-24 h-24 bg-white/5 rounded-full" />
            <div className="flex items-center gap-2.5 relative z-10">
              <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center border border-white/20 shrink-0">
                <FlameIcon size={14} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-wider">PAYMENT PENDING</span>
                <span className="text-[8px] text-orange-100 font-semibold">Complete subscription payment for full access.</span>
              </div>
            </div>
            <button className="bg-white text-orange-600 font-black px-4 py-1.5 rounded-xl text-[9px] shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap shrink-0">
              Complete Payment
            </button>
          </div>

          {/* Huge Spiritual oversight title */}
          <div className="mb-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-none">
              SPIRITUAL <span className="text-[#3F37C9] italic font-serif">OVERSIGHT</span>
            </h1>
            <p className="text-[10px] text-slate-500 font-semibold mt-2.5 leading-relaxed max-w-lg">
              Habari Mchungaji upole, karibu kwenye Ofisi yako ya Kiroho. Hapa ndipo maisha ya waumini yanapotazamwa kwa jicho la kiroho na maombi.
            </p>
          </div>

          {/* Grid section with cards representing metrics exactly from screenshot */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { 
                lbl: "UKUAJI WA IMANI", 
                qty: "184", 
                col: "text-amber-500", 
                bg: "bg-amber-500/10", 
                ico: <Flame size={14} className="text-white" />
              },
              { 
                lbl: "WALIOBATIZWA", 
                qty: "420", 
                col: "text-blue-500", 
                bg: "bg-blue-500/10", 
                ico: <CheckCircle size={14} className="text-white" /> 
              },
              { 
                lbl: "WATUMISHI (MINISTERS)", 
                qty: "35", 
                col: "text-purple-500", 
                bg: "bg-purple-500/10", 
                ico: <Crown size={14} className="text-white" /> 
              },
              { 
                lbl: "MAOMBI YA HARAKA", 
                qty: "8", 
                col: "text-rose-500", 
                bg: "bg-rose-500/10", 
                ico: <Heart size={14} className="text-white" /> 
              }
            ].map((card, cIdx) => (
              <div 
                key={cIdx} 
                className="bg-white border border-slate-100 hover:border-indigo-100 p-3 rounded-2xl flex flex-col justify-between hover:shadow-sm transition-all"
              >
                {/* Circle Icon Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-8 h-8 rounded-full ${card.bg.replace('/10', '')} bg-gradient-to-tr from-[#FF5C00] to-[#E84A5F] flex items-center justify-center shadow-md`}>
                    {card.ico}
                  </div>
                  <span className="text-[7px] text-slate-350 font-bold tracking-widest uppercase">ACTIVE</span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xl font-black text-slate-800">{card.qty}</span>
                  <span className="text-[7px] text-slate-500 font-extrabold tracking-tight uppercase leading-tight">{card.lbl}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom quick view info */}
          <div className="mt-4 p-3 rounded-xl bg-indigo-50/40 border border-indigo-105 flex items-center justify-between text-[10px]">
            <span className="text-slate-500 font-medium font-mono">Tanzanite Security Infrastructure v4.2</span>
            <span className="text-indigo-600 font-bold hover:underline cursor-pointer">View spiritual registers →</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export const ImsMockup: React.FC = () => {
  return (
    <div className="w-full bg-slate-900 border border-slate-700/60 rounded-3xl overflow-hidden shadow-2xl font-sans text-slate-800">
      {/* Browser Window Header */}
      <div className="bg-slate-800 px-4 py-3 flex items-center justify-between border-b border-slate-700/50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500" />
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-[10px] text-slate-400 font-mono tracking-wider ml-2">ims.lexontec.co.tz/academy</span>
        </div>
        <div className="px-3 py-0.5 rounded bg-slate-700/50 text-[9px] text-[#ff5c00] font-mono border border-[#ff5c00]/20 font-bold">
          SELCOM INSTANT INVOICE LOOP
        </div>
      </div>

      {/* Main Container */}
      <div className="flex h-[380px] bg-slate-100 overflow-hidden text-[11px]">
        {/* Sidebar on Left (Deep Navy / Gold theme) */}
        <div className="w-40 sm:w-48 bg-[#1e293b] text-white flex flex-col justify-between p-4 flex-shrink-0 select-none">
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-white/15">
              <div className="w-7 h-7 rounded-lg bg-[#ff5c00] flex items-center justify-center text-white font-bold">
                IMS
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold font-display leading-tight text-white tracking-wider">LEXON CAMPS</span>
                <span className="text-[8px] text-[#ff5c00] uppercase tracking-widest font-mono">CAMPUS SUITE</span>
              </div>
            </div>

            <div className="space-y-1">
              {[
                { label: "Campus Ledger", active: true, icon: <Home size={13} /> },
                { label: "Student Registers", active: false, icon: <Users size={13} /> },
                { label: "Grade Registers", active: false, icon: <BookOpen size={13} /> },
                { label: "Lecturer Portals", active: false, icon: <Layers size={13} /> },
                { label: "Hostel Alloc", active: false, icon: <Calendar size={13} /> },
                { label: "Invoices & Payment", active: false, icon: <Database size={13} /> },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                    item.active
                      ? "bg-[#ff5c00]/10 text-[#ff5c00] font-bold border border-[#ff5c00]/20"
                      : "text-slate-300 hover:bg-white/5"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white cursor-pointer transition-colors border-t border-slate-800 pt-3 text-[10px]">
            <LogOut size={12} />
            <span>Campus Exit</span>
          </div>
        </div>

        {/* Workspace Panel on Right */}
        <div className="flex-1 bg-white p-4 overflow-y-auto relative scrollbar-none">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-4">
            <div className="flex flex-col">
              <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold font-mono">Technical University of Tanzania</span>
              <h4 className="text-sm font-black text-slate-800">Student Continuous Assessment Ledger</h4>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-orange-50 text-orange-600 border border-orange-100 text-[9px] font-bold">
              Batch: OCT-2026-INTAKE
            </span>
          </div>

          <div className="space-y-4">
            {/* Admissions & Payments Bar */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#fffcf9] border border-orange-100 p-3 rounded-2xl">
                <span className="text-[8px] font-bold text-slate-400 uppercase">ACTIVE ADMISSIONS</span>
                <div className="text-base font-black text-slate-800 mt-0.5 font-mono">1,420 Students</div>
              </div>
              <div className="bg-[#f0fdf4] border border-emerald-100 p-3 rounded-2xl">
                <span className="text-[8px] font-bold text-slate-400 uppercase">SELCOM REFERENCE FLOWS</span>
                <div className="text-base font-black text-emerald-600 mt-0.5 font-mono">Tsh 45,210,000</div>
              </div>
            </div>

            {/* CA Table */}
            <div>
              <div className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400 mb-1.5 flex justify-between">
                <span>RECENT MARKSHEET BATCH</span>
                <span className="text-[#ff5c00]">TRA Verified System</span>
              </div>
              <table className="w-full border-collapse text-left text-[9px] border border-slate-200">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                    <th className="px-2 py-1.5 border-r border-slate-200">REGISTRATION NO</th>
                    <th className="px-2 py-1.5 border-r border-slate-200">STUDENT NAME</th>
                    <th className="px-2 py-1.5 border-r border-slate-200">CA-1</th>
                    <th className="px-2 py-1.5 border-r border-slate-200">CA-2</th>
                    <th className="px-2 py-1.5">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {[
                    { reg: "TUT/2026/0410", name: "Mwenda Salama", ca1: "28/30", ca2: "35/40", status: "PASSED" },
                    { reg: "TUT/2026/0891", name: "Juma Omari", ca1: "24/30", ca2: "31/40", status: "PASSED" },
                    { reg: "TUT/2026/1202", name: "Neema Masawe", ca1: "29/30", ca2: "38/40", status: "EXCELLENT" },
                    { reg: "TUT/2026/0014", name: "Baraka Kagashe", ca1: "15/30", ca2: "22/40", status: "RE-CHECK" },
                  ].map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-50/50">
                      <td className="px-2 py-1.5 border-r border-slate-200 text-slate-500 font-mono text-[8px]">{row.reg}</td>
                      <td className="px-2 py-1.5 border-r border-slate-200 font-bold text-slate-800">{row.name}</td>
                      <td className="px-2 py-1.5 border-r border-slate-200 font-mono text-slate-600">{row.ca1}</td>
                      <td className="px-2 py-1.5 border-r border-slate-200 font-mono text-slate-600">{row.ca2}</td>
                      <td className="px-2 py-1.5 text-slate-600">
                        <span className={`px-1.5 py-0.5 rounded-full text-[8px] font-black ${
                          row.status === "EXCELLENT" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                          row.status === "PASSED" ? "bg-blue-50 text-blue-600 border border-blue-100" :
                          "bg-amber-50 text-amber-600 border border-amber-100"
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AccountingMockup: React.FC = () => {
  return (
    <div className="w-full bg-slate-900 border border-slate-700/60 rounded-3xl overflow-hidden shadow-2xl font-sans text-slate-800">
      {/* Browser Window Header */}
      <div className="bg-slate-800 px-4 py-3 flex items-center justify-between border-b border-slate-700/50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500" />
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-[10px] text-slate-400 font-mono tracking-wider ml-2">ledger.lexontec.co.tz/billing</span>
        </div>
        <div className="px-3 py-0.5 rounded bg-emerald-500/10 text-[#22C55E] font-mono text-[9px] border border-emerald-500/20 font-bold flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          TRA EFD PROTOCOL ONLINE
        </div>
      </div>

      {/* Main Container */}
      <div className="flex h-[380px] bg-slate-100 overflow-hidden text-[11px]">
        {/* Sidebar on Left (Emerald/Slate Theme) */}
        <div className="w-40 sm:w-48 bg-[#0f172a] text-white flex flex-col justify-between p-4 flex-shrink-0 select-none">
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10">
              <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-900 font-bold">
                $
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold font-display leading-tight text-white tracking-wider">LEXON ACC</span>
                <span className="text-[8px] text-emerald-400 uppercase tracking-widest font-mono">ACCOUNTING</span>
              </div>
            </div>

            <div className="space-y-1">
              {[
                { label: "Sales & Invoices", active: true, icon: <Home size={13} /> },
                { label: "Live Stock Registry", active: false, icon: <Layers size={13} /> },
                { label: "Expenses Ledger", active: false, icon: <Database size={13} /> },
                { label: "Branch Performance", active: false, icon: <BarChart size={13} /> },
                { label: "TRA EFD Registers", active: false, icon: <CheckCircle size={13} /> },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                    item.active
                      ? "bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20"
                      : "text-slate-300 hover:bg-white/5"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white cursor-pointer transition-colors border-t border-slate-800 pt-3 text-[10px]">
            <LogOut size={12} />
            <span>Exit Registry</span>
          </div>
        </div>

        {/* Workspace Panel on Right */}
        <div className="flex-1 bg-white p-4 overflow-y-auto relative scrollbar-none">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-4 font-sans">
            <div className="flex flex-col">
              <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold font-mono">Tanzanian Merchant Financials</span>
              <h4 className="text-sm font-black text-slate-800">Business Sales & TRA Billing Logs</h4>
            </div>
          </div>

          <div className="space-y-4">
            {/* Financial Overview Cards */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-[#f0fdf4] border border-emerald-500/10 p-2 rounded-xl">
                <span className="text-[7.5px] font-bold text-slate-400 block uppercase">TODAY'S REVENUE</span>
                <div className="text-xs font-black text-emerald-600 font-mono mt-0.5">Tsh 1,450,000</div>
              </div>
              <div className="bg-[#fef2f2] border border-rose-500/10 p-2 rounded-xl">
                <span className="text-[7.5px] font-bold text-slate-400 block uppercase">LOW STOCK RANGE</span>
                <div className="text-xs font-black text-rose-600 font-mono mt-0.5">3 ITEMS ALERT</div>
              </div>
              <div className="bg-[#f0f9ff] border border-blue-500/10 p-2 rounded-xl">
                <span className="text-[7.5px] font-bold text-slate-400 block uppercase">TAX VALUE (VAT)</span>
                <div className="text-xs font-black text-blue-600 font-mono mt-0.5">18% Auto-calc</div>
              </div>
            </div>

            {/* List of Sales */}
            <div>
              <div className="text-[8.5px] uppercase tracking-wider font-extrabold text-slate-400 mb-1 flex justify-between">
                <span>RECENT REAL-TIME RECEIPTS DETECTED</span>
                <span className="text-emerald-600">Sync status: Live</span>
              </div>
              <div className="space-y-1.5">
                {[
                  { id: "TX-45129", items: "12x Blue Cement Bags, Hardware Division", amount: "Tsh 216,000", time: "10 seconds ago", state: "TRA SENT" },
                  { id: "TX-45128", items: "2x Iron Galvanized Pipes, Retail Desk", amount: "Tsh 90,000", time: "3 mins ago", state: "TRA SENT" },
                  { id: "TX-45127", items: "1x Electrical Wiring Shield Case", amount: "Tsh 45,000", time: "12 mins ago", state: "TRA SENT" },
                  { id: "TX-45126", items: "15x Box Concrete Wire, Wholesales Unit", amount: "Tsh 675,000", time: "1 hour ago", state: "TRA SENT" },
                ].map((sale, sIdx) => (
                  <div key={sIdx} className="p-2.5 bg-slate-50 hover:bg-slate-100/70 border border-slate-200/50 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-800 text-[10px]">{sale.items}</div>
                      <div className="text-[8px] text-slate-400 font-mono mt-0.5">{sale.id} • {sale.time}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-slate-900 font-mono text-[10px]">{sale.amount}</div>
                      <span className="text-[7px] text-[#22C55E] bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-md font-bold mt-1 inline-block font-mono">
                        {sale.state}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MiningHubMockup: React.FC = () => {
  return (
    <div className="w-full bg-slate-900 border border-slate-700/60 rounded-3xl overflow-hidden shadow-2xl font-sans text-slate-800">
      {/* Browser Window Header */}
      <div className="bg-slate-800 px-4 py-3 flex items-center justify-between border-b border-slate-700/50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500" />
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-[10px] text-slate-400 font-mono tracking-wider ml-2">diocesesync.eministry.tz/panel</span>
        </div>
        <div className="px-3 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[9px] border border-emerald-500/25 font-bold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          CHURCH AUDITS SECURED
        </div>
      </div>

      {/* Main Container */}
      <div className="flex h-[360px] bg-slate-950 text-white overflow-hidden text-[11px]">
        {/* Sidebar Left (Tanzania National color bar accents) */}
        <div className="w-40 sm:w-44 bg-[#0a0f1d] border-r border-slate-800 flex flex-col justify-between p-4 flex-shrink-0 select-none">
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10 relative">
              <div className="absolute top-0 left-0 right-0 h-[2px] flex">
                <span className="w-1/3 bg-[#16a34a] h-full" />
                <span className="w-1/6 bg-[#f59e0b] h-full" />
                <span className="w-1/6 bg-black h-full" />
                <span className="w-1/3 bg-[#2563eb] h-full" />
              </div>
              <div className="w-7 h-7 rounded bg-gradient-to-r from-emerald-600 to-emerald-800 flex items-center justify-center font-bold text-xs mt-1">
                TEC
              </div>
              <div className="flex flex-col mt-1">
                <span className="font-extrabold text-[10px] leading-tight text-white uppercase font-display">EPISCOPAL PORTAL</span>
                <span className="text-[7.5px] text-emerald-400 uppercase tracking-widest font-mono">PARISH OPERATIONS</span>
              </div>
            </div>

            <div className="space-y-0.5">
              {[
                { label: "Diocese Overseers", active: true },
                { label: "Parish Accounts", active: false },
                { label: "Offering Registers", active: false },
                { label: "Monthly Sadaka", active: false },
                { label: "Selcom Sync Status", active: false }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`px-2.5 py-1.5 rounded-lg text-[9px] font-bold tracking-wider hover:bg-slate-800/50 cursor-pointer ${
                    item.active
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-500 font-bold">
            System v3.36-Secure
          </div>
        </div>

        {/* Workspace Panel Right */}
        <div className="flex-1 bg-slate-900 text-slate-100 p-4 overflow-y-auto scrollbar-none">
          <div className="flex justify-between items-center pb-3 border-b border-slate-800 mb-4">
            <div>
              <span className="text-[8px] uppercase tracking-wider text-slate-400 font-black font-mono">TEC Church Synod Ledger</span>
              <h4 className="text-xs font-black text-white">Parish Tithe Collections & Sadaka Logs</h4>
            </div>
          </div>

          <div className="space-y-4">
            {/* National Totals */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-[8px] font-bold text-slate-400 uppercase block">CONFIRMED SUNDAY OFFERINGS</span>
                <div className="text-sm font-black text-[#f59e0b] mt-0.5 font-mono">Tsh 148,250,000</div>
              </div>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                <span className="text-[8px] font-bold text-slate-400 uppercase block">DIOCESE PORTION RECONCILED</span>
                <div className="text-sm font-black text-emerald-400 mt-0.5 font-mono">Tsh 14,825,000</div>
              </div>
            </div>

            {/* Gate Table */}
            <div>
              <div className="text-[8.5px] uppercase tracking-wider font-extrabold text-slate-400 mb-1.5">
                REAL-TIME SADAKA & OFFERING ACTION
              </div>
              <div className="space-y-1.5">
                {[
                  { truck: "KKKT Azania Front Parish", load: "Sunday Mass Collection • Dar es Salaam", permit: "SELCOM-OFFERING-8910", weight: "Tsh 1,425,000", gate: "VERIFIED" },
                  { truck: "St. Joseph Cathedral", load: "Cathedral Tithe Offering • Dar es Salaam", permit: "SELCOM-OFFERING-1209", weight: "Tsh 3,820,000", gate: "VERIFIED" },
                  { truck: "TAG Mwenge Church", load: "Harvest Celebration Giving • Dar es Salaam", permit: "SELCOM-OFFERING-0045", weight: "Tsh 2,100,000", gate: "VERIFIED" }
                ].map((row, rIdx) => (
                  <div key={rIdx} className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center hover:border-emerald-500/30 transition-all">
                    <div>
                      <div className="font-bold text-white text-[10px]">{row.truck}</div>
                      <p className="text-[8px] text-slate-400 leading-tight mt-0.5">{row.load} • Ref ID: {row.permit}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-200 text-[10px] font-mono">{row.weight}</div>
                      <span className="text-[7px] text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/20 px-1.5 py-0.5 rounded font-mono mt-0.5 inline-block">
                        {row.gate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LogisticsMockup: React.FC = () => {
  return (
    <div className="w-full bg-slate-900 border border-slate-700/60 rounded-3xl overflow-hidden shadow-2xl font-sans text-slate-800">
      {/* Browser Window Header */}
      <div className="bg-slate-800 px-4 py-3 flex items-center justify-between border-b border-slate-700/50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500" />
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-[10px] text-slate-400 font-mono tracking-wider ml-2">dispatch.trans-east.com/fleet</span>
        </div>
        <div className="px-3 py-0.5 rounded bg-emerald-500/10 text-[#0EA5E9] font-mono text-[9px] border border-[#0EA5E9]/20 font-bold">
          LIVE CONTAINER DISPATCH
        </div>
      </div>

      {/* Main Container */}
      <div className="flex h-[360px] bg-slate-100 overflow-hidden text-[11px]">
        {/* Sidebar Left */}
        <div className="w-36 bg-[#0f172a] text-white flex flex-col justify-between p-3.5 flex-shrink-0 select-none">
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-white/10">
              <div className="w-6 h-6 rounded bg-[#0ea5e9] flex items-center justify-center font-bold text-xs">
                L
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-[10px] leading-tight text-white tracking-tight uppercase">TRANS-EAST</span>
                <span className="text-[7.5px] text-slate-400 uppercase tracking-widest font-mono">DISPATCH ERP</span>
              </div>
            </div>

            <div className="space-y-0.5">
              {[
                { label: "Active Fleet", active: true },
                { label: "Dispatch Board", active: false },
                { label: "Fuel Ledgers", active: false },
                { label: "Cargo Permits", active: false }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`px-2 py-1.5 rounded-lg text-[9px] font-bold hover:bg-slate-800 cursor-pointer ${
                    item.active ? "text-[#0ea5e9] bg-[#0ea5e9]/10" : "text-slate-400"
                  }`}
                >
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[8px] text-slate-500 font-mono">
            SECURE PORTSYNC
          </div>
        </div>

        {/* Workspace Panel Right */}
        <div className="flex-1 bg-white p-4 overflow-y-auto scrollbar-none font-sans">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100 mb-4">
            <div className="flex flex-col">
              <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold font-mono">Dar es Salaam Multi-Corridor Logistics</span>
              <h4 className="text-xs font-black text-slate-800">SADC & East African Transit Pipelines</h4>
            </div>
          </div>

          <div className="space-y-4">
            {/* Active Metrics */}
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 bg-[#f0f9ff] border border-blue-100 rounded-xl">
                <span className="text-[7.5px] font-bold text-slate-400 block uppercase">EN-ROUTE CARGO TRUCKS</span>
                <div className="text-xs font-black text-blue-600 font-mono mt-0.5">154 Active Containers</div>
              </div>
              <div className="p-2.5 bg-[#f0fdf4] border border-emerald-100 rounded-xl">
                <span className="text-[7.5px] font-bold text-slate-400 block uppercase">DISPATCH SLA RATE</span>
                <div className="text-xs font-black text-emerald-600 font-mono mt-0.5">98.5% Accuracy</div>
              </div>
            </div>

            {/* List of Deliveries */}
            <div>
              <div className="text-[8.5px] uppercase tracking-wider font-extrabold text-slate-400 mb-1 flex justify-between">
                <span>RECENT MULTI-BORDER GATEWAY TRANSITS</span>
                <span className="text-slate-400">GPS Loop Checked</span>
              </div>
              <div className="space-y-1.5">
                {[
                  { route: "Dar Port → Tunduma Border (Zambia Cor.)", info: "Truck T 895 DFX • Cargo: Copper Alloys", state: "EN-ROUTE" },
                  { route: "Dar Port → Rusumo Gate (Rwanda Hub)", info: "Truck T 650 DSZ • Cargo: Electronic Modules", state: "VERIFIED" },
                  { route: "Dar Port → Mutukula Gate (Uganda Cor.)", info: "Truck T 410 DJV • Cargo: Telecom Gear", state: "DELIVERED" }
                ].map((row, rIdx) => (
                  <div key={rIdx} className="p-2 bg-slate-50 border border-slate-200/50 rounded-lg flex justify-between items-center">
                    <div>
                      <div className="font-bold text-slate-800 text-[9px] truncate max-w-[140px] sm:max-w-none">{row.route}</div>
                      <div className="text-[8px] text-slate-400 font-mono mt-0.5">{row.info}</div>
                    </div>
                    <span className={`text-[7px] font-bold px-1.5 py-0.5 rounded font-mono shrink-0 whitespace-nowrap lg:inline-block ${
                      row.state === "DELIVERED" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" :
                      row.state === "VERIFIED" ? "bg-blue-50 text-blue-600 border border-blue-100" :
                      "bg-amber-50 text-amber-600 border border-amber-100"
                    }`}>
                      {row.state}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LexonEngineeringMockup: React.FC = () => {
  return (
    <div className="w-full bg-[#0a0f1d] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl font-sans text-slate-200">
      {/* Browser Window Header */}
      <div className="bg-[#111625] px-4 py-3 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500" />
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-[10px] text-slate-400 font-mono tracking-wider ml-2">lab.lexon.co.tz/compiler</span>
        </div>
        <div className="px-3 py-0.5 rounded bg-[#16a34a]/10 text-[#22c55e] font-mono text-[9px] border border-[#16a34a]/20 font-bold flex items-center gap-1.5 animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
          ENGINE ACTIVE • TZ
        </div>
      </div>

      <div className="p-5 space-y-4">
        {/* Tanzanian Flag Decorative Header Bar */}
        <div className="h-[4px] w-full flex rounded-full overflow-hidden">
          <span className="w-1/3 bg-[#16a34a] h-full" />
          <span className="w-1/6 bg-[#f59e0b] h-full" />
          <span className="w-1/6 bg-black h-full" />
          <span className="w-1/3 bg-[#2563eb] h-full" />
        </div>

        {/* Real-time metrics */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-center">
            <span className="text-[7.5px] font-bold text-slate-400 block uppercase">COMPILE SLA</span>
            <div className="text-[11px] font-black text-emerald-400 font-mono mt-0.5">100% SUCCESS</div>
          </div>
          <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-center">
            <span className="text-[7.5px] font-bold text-slate-400 block uppercase">LATENCY</span>
            <div className="text-[11px] font-black text-blue-400 font-mono mt-0.5">0.024s (EDGE)</div>
          </div>
          <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-center">
            <span className="text-[7.5px] font-bold text-slate-400 block uppercase">COUNTRY REGION</span>
            <div className="text-[11px] font-black text-[#f59e0b] font-mono mt-0.5">Tanzania (DAR)</div>
          </div>
        </div>

        {/* Node diagrams */}
        <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl relative overflow-hidden space-y-3">
          <span className="text-[8px] uppercase tracking-wider font-extrabold text-slate-450 font-mono">LEXON SYSTEM NODE TOPOLOGY</span>
          
          <div className="space-y-2.5 text-[9px] font-mono">
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#16a34a] animate-pulse" />
                <span className="text-white font-bold">TEC Central Synod Registry</span>
              </div>
              <span className="text-[8px] text-slate-400 uppercase">STANDARDIZED</span>
            </div>
            
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2563eb] animate-pulse" />
                <span className="text-white font-bold">Selcom Core Integration</span>
              </div>
              <span className="text-[8px] text-slate-450 uppercase">CONNECTED</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
              <div className="flex items-center gap-2">
                <div className="flex gap-[1.5px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]" />
                </div>
                <span className="text-white font-bold">Next SMS Operator Trunk</span>
              </div>
              <span className="text-[8px] text-[#22c55e] font-bold uppercase">DISPATCHING</span>
            </div>
          </div>
        </div>

        {/* Compiler shell simulation */}
        <div className="p-2.5 bg-[#04060f] border border-slate-800/80 rounded-xl font-mono text-[7.5px] text-slate-400 space-y-0.5">
          <div className="text-slate-500">~/lexon-engine $ npm run compile-prod</div>
          <div className="text-emerald-400 font-bold">&gt; Compiling Tanzanian ERP Systems... Success</div>
          <div className="text-blue-400">&gt; Packing assets for Cloud Run Deployment.</div>
          <div className="text-white">&gt; Done in 2.14s. Ready on 0.0.0.0:3000 (DAR_ES_SALAAM)</div>
        </div>
      </div>
    </div>
  );
};


