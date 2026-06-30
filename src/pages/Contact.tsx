import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2, MessageSquare } from 'lucide-react';
import SEO from '../components/layout/SEO';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'General Software Query',
    message: ''
  });
  const [submittedData, setSubmittedData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const getWhatsAppLink = (data: any) => {
    if (!data) return '#';
    const whatsappPhone = "255621887100";
    const whatsappText = encodeURIComponent(
      `Habari Lexon Tech Support,\n\n` +
      `Nimetuma ujumbe kutoka Contact Form ya tovuti:\n` +
      `👤 Jina: ${data.name}\n` +
      `📞 Simu: ${data.phone}\n` +
      `✉️ Email: ${data.email}\n` +
      `🏢 Taasisi: ${data.company}\n` +
      `💻 Mfumo: ${data.service}\n` +
      `💬 Ujumbe: ${data.message}`
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
          source: 'contact_page',
          status: 'new',
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to submit lead: ${response.statusText}`);
      }

      setSubmittedData({ ...formData });
      setIsSuccess(true);
      
      // Auto open WhatsApp with prefilled message
      const link = getWhatsAppLink(formData);
      window.open(link, '_blank');

      setFormData({ 
        name: '', 
        email: '', 
        phone: '',
        company: '', 
        service: 'General Software Query', 
        message: '' 
      });
    } catch (error) {
      console.error("Failed to submit lead:", error);
      alert('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-20 bg-white text-slate-800">
      <SEO 
        title="Contact Us | Lexon Tech Solutions Support"
        description="Reach out to Lexon Tech Solutions support. We are available to answer your school management, eMinistry, and custom digital infrastructure inquiries."
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Narrative Block (5 Columns) */}
          <div className="lg:col-span-5">
            <span className="block text-xs font-black tracking-widest text-[#10b981] uppercase mb-4">
              Get in Touch
            </span>
            <h1 className="text-5xl font-display font-black text-[#1e3a8a] tracking-tight leading-none mb-6">
              Contact Us
            </h1>
            <p className="text-base text-slate-600 leading-relaxed font-semibold mb-8 max-w-md">
              At Lexon, our clients are our key priority. That is why we are committed to being available each time you seek our support. Got any inquiries about our school management systems, church administration databases, or custom software projects? Reach out to us now.
            </p>

            {/* Direct Communication Channels */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#1e3a8a]/5 border-2 border-[#1e3a8a]/10 flex items-center justify-center shrink-0 text-[#1e3a8a]">
                  <Phone size={16} />
                </div>
                <div>
                  <h4 className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-bold">Call Center Support</h4>
                  <p className="text-base font-black text-slate-900 mt-0.5">+255 621 887 100</p>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5">WhatsApp Support: +255 621 887 100</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#1e3a8a]/5 border-2 border-[#1e3a8a]/10 flex items-center justify-center shrink-0 text-[#1e3a8a]">
                  <Mail size={16} />
                </div>
                <div>
                  <h4 className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-bold">Help Desk Email</h4>
                  <p className="text-base font-black text-slate-900 mt-0.5">lexonsupport@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#1e3a8a]/5 border-2 border-[#1e3a8a]/10 flex items-center justify-center shrink-0 text-[#1e3a8a]">
                  <MapPin size={16} />
                </div>
                <div>
                  <h4 className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-bold">Physical Address Office</h4>
                  <p className="text-base font-black text-slate-900 mt-0.5">8th Floor, Uhuru Heights</p>
                  <p className="text-xs text-slate-500 font-semibold mt-0.5">Bibi Titi Mohamed Street, Dar es Salaam</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Interactive Form Block (7 Columns) */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-[32px] p-8 lg:p-12 relative shadow-sm">
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-[#10b981]/10 border-2 border-[#10b981]/25 text-[#10b981] rounded-full flex items-center justify-center mb-6">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">Message Dispatched</h3>
                <p className="text-slate-600 text-sm max-w-sm mb-6 leading-relaxed font-semibold">
                  Mshauri wako wa huduma za mifumo atawasiliana nawe kiganjani hivi punde. Sasa unaweza pia kutuma ujumbe huu moja kwa moja kwenye WhatsApp yetu kwa mbofyo mmoja hapa chini.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={getWhatsAppLink(submittedData)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#20ba56] text-slate-950 font-black text-xs py-3 px-6 rounded-full flex items-center justify-center gap-2 shadow-md hover:scale-105 transition-transform"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.711-1.465L0 24zm12.011-2.103c1.802 0 3.56-.484 5.093-1.4l.366-.217 3.785.993-.101-3.693.24-.382c.983-1.564 1.502-3.376 1.501-5.234.003-5.492-4.449-9.941-9.942-9.941-5.488 0-9.94 4.449-9.94 9.942-.001 1.854.516 3.66 1.498 5.219l.254.403-1.127 4.12 4.221-1.107.382.226c1.505.892 3.238 1.363 5.014 1.364h.001z"/>
                    </svg>
                    Tuma via WhatsApp (Wasub)
                  </a>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="bg-[#1e3a8a] hover:bg-[#1d4ed8] text-white font-bold py-3 px-6 rounded-full text-xs transition-colors cursor-pointer"
                  >
                    Write Another Message
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h3 className="text-2xl font-black text-slate-900">Send an Inquiry</h3>
                  <p className="text-xs text-slate-500 mt-1 font-semibold">Complete the secure data fields below; our operations center is live.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-1.5 font-mono">Your Full Name</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-white border border-slate-250 rounded-xl px-4 py-3 text-slate-900 focus:border-[#1e3a8a] outline-none transition-all placeholder:text-slate-300 font-medium text-sm"
                        placeholder="John Joseph"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-1.5 font-mono">Email Address</label>
                      <input 
                        required
                        type="email" 
                        value={formData.email}
                        onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-white border border-slate-250 rounded-xl px-4 py-3 text-slate-900 focus:border-[#1e3a8a] outline-none transition-all placeholder:text-slate-300 font-medium text-sm"
                        placeholder="john@lexon.co.tz"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-1.5 font-mono">Contact Mobile Number</label>
                      <input 
                        required
                        type="tel" 
                        value={formData.phone}
                        onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full bg-white border border-slate-250 rounded-xl px-4 py-3 text-slate-900 focus:border-[#1e3a8a] outline-none transition-all placeholder:text-slate-300 font-medium text-sm"
                        placeholder="+255 621 887 100"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-1.5 font-mono">Organization / Institution</label>
                      <input 
                        required
                        type="text" 
                        value={formData.company}
                        onChange={e => setFormData(prev => ({ ...prev, company: e.target.value }))}
                        className="w-full bg-white border border-slate-250 rounded-xl px-4 py-3 text-slate-900 focus:border-[#1e3a8a] outline-none transition-all placeholder:text-slate-300 font-medium text-sm"
                        placeholder="e.g. Dar High School / Diocese"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-1.5 font-mono">Desired Solution Integration</label>
                    <select 
                      value={formData.service}
                      onChange={e => setFormData(prev => ({ ...prev, service: e.target.value }))}
                      className="w-full bg-white border border-slate-250 rounded-xl px-4 py-3 text-slate-900 focus:border-[#1e3a8a] outline-none transition-all font-medium text-sm cursor-pointer"
                    >
                      <option>School Management System Portal</option>
                      <option>eMinistry Church Database (lexonchurch.com)</option>
                      <option>Retail ERP SaaS & Billing Suite</option>
                      <option>Custom Enterprise Database Configuration</option>
                      <option>General Software Query</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-1.5 font-mono">Message / System Requirements</label>
                    <textarea 
                      required
                      value={formData.message}
                      onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      rows={4}
                      className="w-full bg-white border border-slate-250 rounded-xl px-4 py-3 text-slate-900 focus:border-[#1e3a8a] outline-none transition-all resize-none placeholder:text-slate-300 font-medium text-sm"
                      placeholder="Specify your institution's registration volume, user count, or specific database constraints..."
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#1e3a8a] hover:bg-[#1d4ed8] text-white font-black text-[15px] tracking-wide py-4 px-8 rounded-full transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={18} /> Sending Message...
                      </>
                    ) : (
                      <>
                        Send Message <Send size={15} />
                      </>
                    )}
                  </button>

                </form>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
