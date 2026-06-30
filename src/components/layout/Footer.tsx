import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-slate-950 text-white pt-20 pb-16 overflow-hidden border-t-2 border-[#facc15]">
      {/* Subtle diamond background patterns mapped as vector overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%), 
            linear-gradient(-45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%), 
            linear-gradient(45deg, transparent 75%, rgba(255, 255, 255, 0.15) 75%), 
            linear-gradient(-45deg, transparent 75%, rgba(255, 255, 255, 0.15) 75%)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-14 mb-16">
          
          {/* Brand & Mission column (4 Cols) */}
          <div className="lg:col-span-4 text-left">
            <h3 className="font-display text-xl font-bold uppercase tracking-tight text-white mb-6">
              © 2026 LEXON TECH SOLUTIONS
            </h3>
            
            <p className="text-white/80 text-[14px] leading-relaxed max-w-sm mb-6 font-medium">
              Lexon is a premier developer of enterprise software database files, school administration portals, and the customized eMinistry Church system in Tanzania.
            </p>
            
            <div className="space-y-2 text-[14px] text-white/90 font-medium">
              <p className="flex items-start gap-2.5">
                <MapPin size={16} className="shrink-0 mt-1 text-[#facc15]" />
                <span>
                  8th Floor, Uhuru Heights,<br />
                  Bibi Titi Mohamed Street,<br />
                  <strong>Dar es Salaam, Tanzania</strong>
                </span>
              </p>
            </div>
          </div>

          {/* Company column (2 Cols) */}
          <div className="lg:col-span-2 text-left">
            <h4 className="font-display font-black text-base text-white mb-5 uppercase tracking-wider text-[#facc15]">
              Company
            </h4>
            <ul className="space-y-2.5 text-[14px] text-white/80 font-medium">
              <li><Link to="/about" className="hover:text-white hover:underline transition-colors">About us</Link></li>
              <li><Link to="/products" className="hover:text-white hover:underline transition-colors">Software Catalog</Link></li>
              <li><Link to="/contact" className="hover:text-white hover:underline transition-colors">Client Onboarding</Link></li>
              <li><Link to="/blog" className="hover:text-white hover:underline transition-colors">Lexon Digest</Link></li>
              <li><Link to="/faq" className="hover:text-white hover:underline transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Solutions column (2 Cols) */}
          <div className="lg:col-span-2 text-left">
            <h4 className="font-display font-black text-base text-white mb-5 uppercase tracking-wider text-[#facc15]">
              Solutions
            </h4>
            <ul className="space-y-2.5 text-[14px] text-white/80 font-medium">
              <li><Link to="/products" className="hover:text-white hover:underline transition-colors">School Portal</Link></li>
              <li><a href="https://lexonchurch.com" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline transition-colors">lexonchurch.com</a></li>
              <li><Link to="/products" className="hover:text-white hover:underline transition-colors">eMinistry App</Link></li>
              <li><Link to="/products" className="hover:text-white hover:underline transition-colors">Retail ERP SaaS</Link></li>
              <li><Link to="/services" className="hover:text-white hover:underline transition-colors">Database Registers</Link></li>
              <li><Link to="/services" className="hover:text-white hover:underline transition-colors">Custom Coding</Link></li>
            </ul>
          </div>

          {/* Support column (2 Cols) */}
          <div className="lg:col-span-2 text-left">
            <h4 className="font-display font-black text-base text-white mb-5 uppercase tracking-wider text-[#facc15]">
              Support
            </h4>
            <ul className="space-y-2.5 text-[14px] text-white/80 font-medium">
              <li><Link to="/faq" className="hover:text-white hover:underline transition-colors">Video Tutorials</Link></li>
              <li><Link to="/contact" className="hover:text-white hover:underline transition-colors">API Systems</Link></li>
              <li><Link to="/contact" className="hover:text-white hover:underline transition-colors">Privacy Policy</Link></li>
              <li><Link to="/contact" className="hover:text-white hover:underline transition-colors">Terms of Use</Link></li>
            </ul>
          </div>

          {/* Contact Details (2 Cols) */}
          <div className="lg:col-span-2 text-left">
            <h4 className="font-display font-black text-base text-white mb-5 uppercase tracking-wider text-[#facc15]">
              Contact
            </h4>
            <ul className="space-y-2.5 text-[13px] text-white/80 font-medium">
              <li>
                <span className="block text-[11px] uppercase tracking-widest text-[#facc15]">Experience Center</span>
                <span className="text-white">Dar es Salaam Main (XC)</span>
              </li>
              <li>
                <span className="block text-[11px] uppercase tracking-widest text-[#facc15]">Call Center</span>
                <span className="text-white font-mono">+255 621 887 100</span>
              </li>
              <li>
                <span className="block text-[11px] uppercase tracking-widest text-[#facc15]">WhatsApp Line</span>
                <span className="text-white font-mono">+255 621 887 100</span>
              </li>
              <li>
                <span className="block text-[11px] uppercase tracking-widest text-[#facc15]">Email Support</span>
                <span className="text-white font-mono break-all text-[12px]">lexonsupport@gmail.com</span>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex gap-2.5 mt-5">
              {[
                { icon: <Instagram size={14} />, href: '#' },
                { icon: <Facebook size={14} />, href: '#' },
                { icon: <Twitter size={14} />, href: '#' },
                { icon: <Linkedin size={14} />, href: '#' }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all shadow-sm"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/50 text-xs font-mono uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Lexon Tech Solutions Co. Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/contact" className="hover:text-white transition-colors">System License Agreement</Link>
            <span className="text-white/20">|</span>
            <Link to="/contact" className="hover:text-[#facc15] transition-colors">Tanzania Standard</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
