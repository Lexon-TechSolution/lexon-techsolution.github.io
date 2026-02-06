
import React, { useState, useEffect } from 'react';
import { X, Send, Phone, MessageCircle, CheckCircle2, Loader2, Bell } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'EN' | 'SW';
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, lang }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [showOwnerAlert, setShowOwnerAlert] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    
    setStatus('submitting');
    
    // Simulisha kutuma data kwa CEO
    setTimeout(() => {
      setStatus('success');
      setShowOwnerAlert(true);
      setTimeout(() => setShowOwnerAlert(false), 7000);
      console.log("Lead Captured for CEO Mohamedi:", formData);
    }, 1500);
  };

  return (
    <>
      {/* Real-time Lead Notification for the owner to see */}
      {showOwnerAlert && (
        <div className="fixed top-6 right-6 z-[200] bg-slate-900 p-5 rounded-2xl shadow-2xl border-l-4 border-green-500 animate-in slide-in-from-top-full duration-500 max-w-sm">
          <div className="flex items-center gap-3 mb-2">
            <Bell className="text-green-500 animate-bounce" size={20} />
            <span className="text-xs font-black uppercase text-white">Lead Mpya Imepatikana!</span>
          </div>
          <div className="space-y-1">
            <p className="text-slate-300 text-[11px]"><span className="text-white font-bold">Jina:</span> {formData.name}</p>
            <p className="text-slate-300 text-[11px]"><span className="text-white font-bold">Ujumbe:</span> {formData.message}</p>
          </div>
          <p className="mt-3 text-[10px] text-slate-500 italic">Hii ni taarifa ya siri kwako tu CEO Mohamedi.</p>
        </div>
      )}

      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8">
        <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" onClick={onClose}></div>
        
        <div className="relative w-full max-w-lg glass rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl animate-in zoom-in-95 duration-300">
          <div className="bg-electric-cyan p-6 flex justify-between items-center">
            <div>
              <h3 className="text-slate-950 font-black text-xl md:text-2xl uppercase tracking-tight">
                {lang === 'EN' ? 'Contact Lexon' : 'Wasiliana na Lexon'}
              </h3>
              <p className="text-slate-900 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Direct to CEO Mohamedi M. Saidi</p>
            </div>
            <button onClick={onClose} className="bg-slate-950/20 p-2 rounded-full hover:bg-slate-950/40 transition-colors">
              <X size={24} className="text-slate-950" />
            </button>
          </div>

          <div className="p-8">
            {status === 'success' ? (
              <div className="py-12 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={48} className="text-green-500" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4">
                  {lang === 'EN' ? 'Lead Captured Successfully!' : 'Taarifa Zimepokelewa!'}
                </h4>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  {lang === 'EN' 
                    ? "CEO Mohamedi M. Saidi has received your request. Our technical team will review it and contact you shortly."
                    : "CEO Mohamedi M. Saidi amepokea ombi lako. Timu yetu ya ufundi itayapitia na kukutafuta hivi punde."}
                </p>
                <button 
                  onClick={onClose}
                  className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-bold hover:bg-white/10 transition-all"
                >
                  {lang === 'EN' ? 'Close Window' : 'Funga Dirisha'}
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-4">
                  <a href="tel:+255621887100" className="flex flex-col items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-electric-cyan transition-all group">
                    <div className="w-10 h-10 rounded-full bg-electric-cyan/10 flex items-center justify-center text-electric-cyan group-hover:scale-110 transition-transform"><Phone size={20} /></div>
                    <span className="text-white font-bold text-xs">Piga Simu</span>
                  </a>
                  <a href="https://wa.me/255621887100" className="flex flex-col items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-green-500/50 transition-all group">
                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform"><MessageCircle size={20} /></div>
                    <span className="text-white font-bold text-xs">WhatsApp CEO</span>
                  </a>
                </div>

                <div className="relative"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div><div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest"><span className="bg-[#0f172a] px-4 text-slate-500">Au Tuma Ujumbe</span></div></div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest ml-1">Full Name</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Jina Lako Kamili" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm focus:border-electric-cyan outline-none text-white" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] uppercase font-black text-slate-500 tracking-widest ml-1">Requirements</label>
                    <textarea required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder="Elezea unachohitaji..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm focus:border-electric-cyan outline-none h-32 resize-none text-white" />
                  </div>
                  <button type="submit" disabled={status === 'submitting'} className="w-full py-5 bg-electric-cyan text-slate-950 font-black text-sm uppercase tracking-widest rounded-2xl hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all flex items-center justify-center gap-3 disabled:opacity-50">
                    {status === 'submitting' ? <Loader2 size={18} className="animate-spin" /> : <><Send size={18} /> Tuma Maombi</>}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactModal;
