
import React from 'react';

const TrustAuthority: React.FC = () => {
  return (
    <section className="py-12 bg-[#020617] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-wrap justify-center items-center gap-12 md:gap-20 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all">
        {/* Placeholder for Client/Tech partner logos */}
        <div className="text-2xl font-black text-slate-500 tracking-tighter">FINTECH</div>
        <div className="text-2xl font-black text-slate-500 tracking-tighter">CLOUD.NATIVE</div>
        <div className="text-2xl font-black text-slate-500 tracking-tighter">DATACORE</div>
        <div className="text-2xl font-black text-slate-500 tracking-tighter">SECURE+</div>
        <div className="text-2xl font-black text-slate-500 tracking-tighter">VANTAGE</div>
      </div>
    </section>
  );
};

export default TrustAuthority;
