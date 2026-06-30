import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bell, CheckCircle2, ShieldAlert, Sparkles, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const LeadCaptureModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'School Management System Portal',
    getNotifications: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { language } = useLanguage();

  // Show popup automatically on home page after 4 seconds if not shown in current session
  useEffect(() => {
    const isShown = sessionStorage.getItem('lead_capture_shown');
    const isCompleted = localStorage.getItem('lead_capture_completed');
    
    if (!isShown && !isCompleted) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('lead_capture_shown', 'true');
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const getWhatsAppLink = () => {
    const whatsappPhone = "255621887100";
    const whatsappText = encodeURIComponent(
      `Habari Lexon Tech Support,\n\n` +
      `Nimejaza taarifa kwenye Popup Form ya tovuti:\n` +
      `👤 Jina: ${formData.name}\n` +
      `📞 Simu: ${formData.phone}\n` +
      `✉️ Email: ${formData.email}\n` +
      `💻 Mfumo unaovutiwa nao: ${formData.service}\n\n` +
      `Tafadhali naomba muongozo zaidi au msaada wa kuanza kutumia.`
    );
    return `https://wa.me/${whatsappPhone}?text=${whatsappText}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'popup_modal',
          status: 'new',
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit lead: ${response.statusText}`);
      }

      localStorage.setItem('lead_capture_completed', 'true');
      setIsSuccess(true);
      
      // Auto-trigger WhatsApp dispatch in a new tab
      window.open(getWhatsAppLink(), '_blank');

      setTimeout(() => {
        setIsOpen(false);
      }, 15000); // Give user more time to see the option or click if blocked
    } catch (error) {
      console.error("Failed to submit lead:", error);
      alert(language === 'sw' ? 'Imeshindwa kutuma mchango wako. Tafadhali jaribu tena.' : 'Failed to submit inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isSw = language === 'sw';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop with elegant soft blur and dark overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            id="modal-backdrop"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-slate-900 border border-slate-800/80 rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-white z-10"
            id="lead-capture-modal"
          >
            {/* Elegant top color band with yellow accent */}
            <div className="h-[6px] bg-[#facc15] w-full" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer z-20"
              aria-label="Close Modal"
              id="close-modal-btn"
            >
              <X size={16} />
            </button>

            {/* Decorative Ambient Radial Gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="p-8 sm:p-10 relative">
              {isSuccess ? (
                // Success screen
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6"
                  id="success-view"
                >
                  <div className="w-16 h-16 bg-emerald-500/10 border-2 border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                    <CheckCircle2 size={32} />
                  </div>
                  
                  <h3 className="text-2xl font-display font-black tracking-tight text-white mb-3">
                    {isSw ? 'Mwasiliano Yako Yamepokelewa!' : 'Information Submitted Successfully!'}
                  </h3>
                  
                  <p className="text-slate-300 text-sm leading-relaxed font-semibold max-w-sm mx-auto mb-6">
                    {isSw 
                      ? 'Hongera! Taarifa zako zimehifadhiwa kikamilifu. Sasa bofya kitufe hapa chini kutuma ujumbe huu moja kwa moja kwenye WhatsApp yetu ili kuanza mazungumzo sasa hivi.'
                      : 'Excellent! Your info has been saved. Click the button below to send this directly to our WhatsApp support and start the conversation immediately.'}
                  </p>

                  <div className="flex flex-col gap-3 max-w-xs mx-auto">
                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#25D366] hover:bg-[#20ba56] text-slate-950 font-black text-sm py-3.5 px-6 rounded-full transition-all flex items-center justify-center gap-2 hover:scale-102"
                      id="whatsapp-direct-btn"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.711-1.465L0 24zm12.011-2.103c1.802 0 3.56-.484 5.093-1.4l.366-.217 3.785.993-.101-3.693.24-.382c.983-1.564 1.502-3.376 1.501-5.234.003-5.492-4.449-9.941-9.942-9.941-5.488 0-9.94 4.449-9.94 9.942-.001 1.854.516 3.66 1.498 5.219l.254.403-1.127 4.12 4.221-1.107.382.226c1.505.892 3.238 1.363 5.014 1.364h.001z"/>
                      </svg>
                      {isSw ? 'Tuma via WhatsApp (Wasub)' : 'Send to WhatsApp'}
                    </a>

                    <button
                      onClick={handleClose}
                      className="bg-[#1e3a8a] hover:bg-[#1d4ed8] border border-slate-800 text-white font-black text-xs py-3 px-6 rounded-full transition-colors cursor-pointer"
                      id="finish-success-btn"
                    >
                      {isSw ? 'Funga (Close)' : 'Okay, Close'}
                    </button>
                  </div>
                </motion.div>
              ) : (
                // Form screen
                <div id="form-view">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-[#1e3a8a] border border-blue-500/20 text-xs font-black tracking-widest text-blue-300 uppercase px-3 py-1 rounded-full flex items-center gap-1.5 shadow-[0_2px_10px_rgba(30,58,138,0.5)]">
                      <Sparkles size={11} className="text-[#facc15]" />
                      {isSw ? 'MAWASILIANO YA AWALI' : 'EARLY NOTIFICATION'}
                    </span>
                  </div>

                  <h3 className="text-2xl font-display font-black text-white tracking-tight mb-2">
                    {isSw ? 'Pata Taarifa za Mifumo Yetu' : 'Get System Update Alerts'}
                  </h3>
                  
                  <p className="text-xs text-slate-400 font-semibold mb-6 leading-relaxed">
                    {isSw 
                      ? 'Jiunge sasa ili upate taarifa za mifumo mipya na maboresho (notification) moja kwa moja kwenye simu au email yako.'
                      : 'Join now to receive alerts about new features, system solutions, and customized software offers directly via SMS or Email.'}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[9px] uppercase tracking-wider font-bold text-slate-400 mb-1.5 font-mono">
                        {isSw ? 'Jina Kamili' : 'Your Full Name'}
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-[#facc15] focus:ring-1 focus:ring-[#facc15]/20 outline-none transition-all placeholder:text-slate-600 font-medium text-sm"
                        placeholder={isSw ? 'Mfano: Juma Saidi' : 'e.g., John Joseph'}
                        id="modal-name-input"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[9px] uppercase tracking-wider font-bold text-slate-400 mb-1.5 font-mono">
                          {isSw ? 'Namba ya Simu' : 'Mobile Number'}
                        </label>
                        <input
                          required
                          type="tel"
                          value={formData.phone}
                          onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-[#facc15] focus:ring-1 focus:ring-[#facc15]/20 outline-none transition-all placeholder:text-slate-600 font-medium text-sm font-mono"
                          placeholder="+255 621 887 100"
                          id="modal-phone-input"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] uppercase tracking-wider font-bold text-slate-400 mb-1.5 font-mono">
                          {isSw ? 'Barua Pepe (Email)' : 'Email Address'}
                        </label>
                        <input
                          required
                          type="email"
                          value={formData.email}
                          onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-[#facc15] focus:ring-1 focus:ring-[#facc15]/20 outline-none transition-all placeholder:text-slate-600 font-medium text-sm"
                          placeholder="juma@gmail.com"
                          id="modal-email-input"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase tracking-wider font-bold text-slate-400 mb-1.5 font-mono">
                        {isSw ? 'Mfumo Unaovutiwa Nao' : 'Interested Solution'}
                      </label>
                      <select
                        value={formData.service}
                        onChange={e => setFormData(prev => ({ ...prev, service: e.target.value }))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-[#facc15] outline-none transition-all font-medium text-sm cursor-pointer"
                        id="modal-service-select"
                      >
                        <option value="School Management System Portal">
                          {isSw ? 'Mfumo wa Shule (School Portal)' : 'School Management System'}
                        </option>
                        <option value="eMinistry Church Database">
                          {isSw ? 'eMinistry Church Portal (lexonchurch.com)' : 'eMinistry Church Suite'}
                        </option>
                        <option value="Retail ERP SaaS">
                          {isSw ? 'SaaS ya Mauzo & ERP (Retail ERP)' : 'Retail ERP & Billing Suite'}
                        </option>
                        <option value="Custom Enterprise Solution">
                          {isSw ? 'Mfumo Maalum wa Kampuni (Custom Software)' : 'Custom Enterprise Solution'}
                        </option>
                      </select>
                    </div>

                    {/* Checkbox for subscription confirmation */}
                    <div className="flex items-start gap-2.5 pt-1">
                      <input
                        type="checkbox"
                        id="getNotifications"
                        checked={formData.getNotifications}
                        onChange={e => setFormData(prev => ({ ...prev, getNotifications: e.target.checked }))}
                        className="mt-1 w-4 h-4 rounded border-slate-800 text-blue-600 focus:ring-blue-500 bg-slate-950 cursor-pointer"
                      />
                      <label htmlFor="getNotifications" className="text-xs text-slate-400 font-semibold select-none cursor-pointer">
                        {isSw 
                          ? 'Nipokee taarifa fupi za notification (SMS au barua pepe) wakati wa mabadiliko ya mfumo'
                          : 'I agree to receive system notifications, alerts, and feature launch reports.'}
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#facc15] hover:bg-[#e2b80f] text-slate-950 font-black text-sm py-4 px-8 rounded-full transition-all duration-300 flex items-center justify-center gap-2 mt-4 disabled:opacity-50 shadow-[0_4px_20px_rgba(250,204,21,0.25)] hover:shadow-[0_4px_25px_rgba(250,204,21,0.4)] cursor-pointer"
                      id="modal-submit-btn"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin" size={18} /> 
                          {isSw ? 'Inatuma...' : 'Submitting...'}
                        </>
                      ) : (
                        <>
                          <Bell size={16} />
                          {isSw ? 'Kamilisha & Jiunge na Taarifa' : 'Subscribe to Alerts'}
                        </>
                      )}
                    </button>

                    {/* Trust Banner */}
                    <p className="text-[10px] text-slate-500 font-medium text-center flex items-center justify-center gap-1.5 mt-4">
                      <ShieldAlert size={12} className="text-emerald-500" />
                      {isSw 
                        ? 'Data zako zinalindwa chini ya sera ya usalama ya Lexon'
                        : 'Your contact data is securely handled with absolute privacy.'}
                    </p>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
