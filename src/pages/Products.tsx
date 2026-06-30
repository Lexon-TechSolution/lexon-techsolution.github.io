import React, { useState, useEffect } from 'react';
import { PRODUCTS } from '../constants';
import { ArrowRight, CheckCircle, Camera, Upload, Trash2, AlertCircle, Check, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/layout/SEO';
import { useLanguage } from '../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { auth } from '../lib/firebase';

const Products: React.FC = () => {
  const { language } = useLanguage();
  const isSw = language === 'sw';

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAdmin(!!user);
    });
    return () => unsubscribe();
  }, []);

  const [customImages, setCustomImages] = useState<Record<string, string>>({
    'eministry-grace': localStorage.getItem('custom_product_image_eministry-grace') || '',
    'mssis-school': localStorage.getItem('custom_product_image_mssis-school') || '',
    'accounting-software': localStorage.getItem('custom_product_image_accounting-software') || '',
  });

  const [activeEditor, setActiveEditor] = useState<string | null>(null);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleFileChange = (productId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 3.5 * 1024 * 1024) { // 3.5MB limit
      setErrorMsg(isSw ? 'Picha ni kubwa mno! Tafadhali weka picha isiyozidi 3.5MB.' : 'Image too large! Please upload a file under 3.5MB.');
      setSuccessMsg('');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      try {
        localStorage.setItem(`custom_product_image_${productId}`, base64String);
        setCustomImages(prev => ({ ...prev, [productId]: base64String }));
        setSuccessMsg(isSw ? 'Hongera! Poster yako maalum imewekwa kikamilifu!' : 'Success! Your custom poster has been set!');
        setErrorMsg('');
        
        // Notify other pages to update as well
        window.dispatchEvent(new Event('product-image-updated'));
      } catch (err) {
        setErrorMsg(isSw ? 'Hifadhi ya kivinjari imejaa! Tafadhali tumia link ya picha (Image URL) badala yake.' : 'Browser storage full! Please use a direct image URL instead.');
        setSuccessMsg('');
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUrlSubmit = (productId: string) => {
    if (!imageUrlInput.trim()) {
      setErrorMsg(isSw ? 'Tafadhali ingiza link halali ya picha.' : 'Please enter a valid image URL.');
      setSuccessMsg('');
      return;
    }

    if (!imageUrlInput.startsWith('http://') && !imageUrlInput.startsWith('https://') && !imageUrlInput.startsWith('data:')) {
      setErrorMsg(isSw ? 'Link lazima ianze na http:// au https://' : 'URL must start with http:// or https://');
      setSuccessMsg('');
      return;
    }

    try {
      localStorage.setItem(`custom_product_image_${productId}`, imageUrlInput.trim());
      setCustomImages(prev => ({ ...prev, [productId]: imageUrlInput.trim() }));
      setSuccessMsg(isSw ? 'Hongera! Poster yako imewekwa kikamilifu kutumia link!' : 'Success! Your custom poster has been set from the URL!');
      setImageUrlInput('');
      setErrorMsg('');
      
      // Notify other pages to update as well
      window.dispatchEvent(new Event('product-image-updated'));
    } catch (err) {
      setErrorMsg(isSw ? 'Imeshindwa kuhifadhi! Tafadhali jaribu tena.' : 'Failed to save! Please try again.');
      setSuccessMsg('');
    }
  };

  const handleReset = (productId: string) => {
    localStorage.removeItem(`custom_product_image_${productId}`);
    setCustomImages(prev => ({ ...prev, [productId]: '' }));
    setSuccessMsg(isSw ? 'Poster imerudishwa kwenye default ya mfumo.' : 'Poster reset to system default.');
    setImageUrlInput('');
    setErrorMsg('');
    
    // Notify other pages to update as well
    window.dispatchEvent(new Event('product-image-updated'));
  };

  return (
    <div className="pt-28 pb-20 bg-white text-slate-800 font-sans">
      <SEO 
        title="Products & Systems | Lexon Tech Solutions"
        description="Explore the Lexon high-performance catalog, containing custom school management systems, eMinistry church databases at lexonchurch.com, and retail enterprise ERP."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-left">
        
        {/* Title Introduction header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="inline-block text-xs font-black tracking-widest text-[#10b981] bg-[#10b981]/5 px-3 py-1 rounded mb-4 uppercase">
            {isSw ? 'MIFUMO YA LEXON TECH' : 'LEXON SYSTEM CATALOG'}
          </span>
          <h1 className="text-4xl sm:text-5xl font-display font-black text-slate-900 leading-none mb-4">
            {isSw ? 'Mifumo Yetu na Programu Salama' : 'Unified Software & Core Systems'}
          </h1>
          <p className="text-slate-600 font-medium text-base">
            {isSw 
              ? 'Mifumo madhubuti ya kiutawala na database iliyotengenezwa mahususi kurahisisha kazi katika taasisi mbalimbali kwa usahihi wa hali ya juu.'
              : 'Engineered administrative and database software packages designed specifically to coordinate African institutions with ultimate accuracy.'}
          </p>
        </div>

        {/* Dynamic Products Grid of cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {PRODUCTS.map((product) => {
            const productImage = customImages[product.id] || product.image;

            return (
              <motion.div 
                key={product.id}
                whileHover={{
                  scale: 1.02,
                  y: -5,
                  rotate: [0, -0.8, 0.8, -0.5, 0.5, 0],
                  transition: { duration: 0.4 }
                }}
                className="bg-slate-50 border-2 border-[#1e3a8a]/10 rounded-3xl p-6 sm:p-8 hover:bg-white hover:border-[#facc15] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Product Meta Header */}
                  <div className="flex justify-between items-center mb-6 pb-2 border-b border-slate-200">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 font-black">
                      Catalog ID /{product.id}
                    </span>
                    <span className="text-[9.5px] font-mono tracking-wider text-[#10b981] bg-[#10b981]/5 px-2.5 py-1 rounded-md font-black">
                      {product.type}
                    </span>
                  </div>

                  {/* VISUAL PREVIEW OF SYSTEM INTERFACE OR PHOTO */}
                  {productImage && (
                    <div className="aspect-[16/10] bg-slate-900 rounded-2xl overflow-hidden mb-4 border-2 border-[#1e3a8a]/10 hover:border-[#facc15]/40 shadow-md relative group/image flex items-center justify-center p-1.5">
                      <img 
                        src={productImage} 
                        alt={`${product.name} Preview`} 
                        className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover/image:scale-[1.02]"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Dark overlay with change button */}
                      {isAdmin && (
                        <div className="absolute inset-0 bg-slate-950/45 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
                          <button
                            onClick={() => {
                              setActiveEditor(activeEditor === product.id ? null : product.id);
                              setErrorMsg('');
                              setSuccessMsg('');
                            }}
                            className="bg-[#facc15] hover:bg-[#e2b80f] text-slate-950 font-black text-xs py-2 px-4 rounded-full flex items-center gap-1.5 shadow-lg transition-transform hover:scale-105 cursor-pointer animate-none"
                          >
                            <Camera size={14} />
                            {isSw ? 'Badili Poster' : 'Change Poster'}
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tagline & Upload Button Link */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-xs font-semibold text-[#1e3a8a] tracking-wider uppercase">
                      {product.tagline}
                    </div>
                    {isAdmin && (
                      <button
                        onClick={() => {
                          setActiveEditor(activeEditor === product.id ? null : product.id);
                          setErrorMsg('');
                          setSuccessMsg('');
                        }}
                        className="text-xs font-bold text-[#1e3a8a] hover:text-[#1d4ed8] flex items-center gap-1 border border-slate-200 hover:border-slate-300 bg-white px-3 py-1.5 rounded-full transition-all cursor-pointer"
                      >
                        <Camera size={12} className="text-[#facc15]" />
                        {isSw ? 'Weka Poster Yako' : 'Upload Poster'}
                      </button>
                    )}
                  </div>

                  {/* Inline Poster Editor Panel */}
                  <AnimatePresence>
                    {activeEditor === product.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden mb-6 bg-slate-100 border border-slate-200/80 rounded-2xl p-4 sm:p-5 text-slate-800 text-left"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-xs font-black tracking-wider uppercase text-slate-800 flex items-center gap-1.5">
                            <Sparkles size={12} className="text-[#facc15]" />
                            {isSw ? 'Weka Poster Maalum' : 'Customize System Poster'}
                          </h4>
                          <button
                            onClick={() => setActiveEditor(null)}
                            className="text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer"
                          >
                            {isSw ? 'Funga' : 'Close'}
                          </button>
                        </div>

                        <p className="text-[11px] text-slate-500 font-semibold mb-4 leading-relaxed">
                          {isSw 
                            ? 'Pakia picha kutoka kwenye simu/kompyuta yako au weka link ya picha unayotaka kuiona hapa kama poster ya mfumo huu.'
                            : 'Upload a local image from your device or paste any web image URL to customize the look of this solution.'}
                        </p>

                        {/* URL Input */}
                        <div className="space-y-4">
                          <div>
                            <label className="block text-[9px] uppercase tracking-wider font-bold text-slate-500 mb-1.5 font-mono">
                              {isSw ? '1. Weka Link ya Picha (Image URL)' : '1. Paste Web Image URL'}
                            </label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={imageUrlInput}
                                onChange={(e) => setImageUrlInput(e.target.value)}
                                placeholder="https://example.com/my-poster.jpg"
                                className="flex-1 bg-white border border-slate-250 rounded-xl px-3.5 py-2 text-slate-900 focus:border-[#1e3a8a] outline-none transition-all placeholder:text-slate-300 text-xs font-medium"
                              />
                              <button
                                onClick={() => handleUrlSubmit(product.id)}
                                className="bg-[#1e3a8a] hover:bg-[#1d4ed8] text-white px-4 py-2 rounded-xl text-xs font-black tracking-wide transition-colors cursor-pointer shrink-0"
                              >
                                {isSw ? 'Tumia' : 'Apply'}
                              </button>
                            </div>
                          </div>

                          {/* File Upload Button */}
                          <div>
                            <label className="block text-[9px] uppercase tracking-wider font-bold text-slate-500 mb-1.5 font-mono">
                              {isSw ? '2. Au Pakia Picha ya Ndani (Upload Local File)' : '2. Or Upload Local File'}
                            </label>
                            <div className="flex flex-wrap items-center gap-2">
                              <label className="flex items-center gap-2 bg-white border border-slate-250 hover:bg-slate-50 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors cursor-pointer border-dashed">
                                <Upload size={14} className="text-emerald-500" />
                                <span>{isSw ? 'Chagua Picha' : 'Choose Local File'}</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => handleFileChange(product.id, e)}
                                  className="hidden"
                                />
                              </label>

                              {customImages[product.id] && (
                                <button
                                  onClick={() => handleReset(product.id)}
                                  className="flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors cursor-pointer border border-rose-200/50"
                                >
                                  <Trash2 size={13} />
                                  {isSw ? 'Rudisha Default' : 'Reset Default'}
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Notifications of Success/Error */}
                          {errorMsg && (
                            <div className="bg-rose-50 border border-rose-100 text-rose-600 rounded-xl p-3 text-xs font-bold flex items-center gap-2">
                              <AlertCircle size={14} className="shrink-0" />
                              <span>{errorMsg}</span>
                            </div>
                          )}

                          {successMsg && (
                            <div className="bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl p-3 text-xs font-bold flex items-center gap-2">
                              <Check size={14} className="shrink-0" />
                              <span>{successMsg}</span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Product Name */}
                  <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mb-4 leading-none">
                    {product.name}
                  </h2>

                  {/* Product Description */}
                  <p className="text-sm text-slate-600 leading-relaxed font-semibold mb-6">
                    {product.description}
                  </p>

                  {/* Product Features listed cleanly */}
                  <div className="space-y-2.5 mb-8">
                    {product.features.map((feature, idx) => (
                       <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 font-bold">
                         <CheckCircle size={14} className="text-[#10b981] shrink-0" />
                         <span>{feature}</span>
                       </div>
                    ))}
                  </div>
                </div>

                {/* Price and Action Section */}
                <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="block text-[9.5px] font-mono tracking-widest text-slate-400 uppercase font-black">
                      ESTIMATED CONTRACT
                    </span>
                    <span className="text-sm font-black font-mono text-slate-900 leading-none">
                      {product.price}
                    </span>
                  </div>
                  {product.link ? (
                    <a 
                      href={product.link}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-[#1e3a8a] hover:bg-[#1d4ed8] text-white font-bold py-2.5 px-6 rounded-full text-xs inline-flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer shrink-0"
                    >
                      Open lexonchurch.com <ArrowRight size={14} />
                    </a>
                  ) : (
                    <Link 
                      to="/contact" 
                      className="bg-[#1e3a8a] hover:bg-[#1d4ed8] text-white font-bold py-2.5 px-6 rounded-full text-xs inline-flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer shrink-0"
                    >
                      Order Solution <ArrowRight size={14} />
                    </Link>
                  )}
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Custom request block */}
        <section className="mt-20 p-8 md:p-12 rounded-[32px] bg-slate-50 border border-slate-200 text-center">
          <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mb-3">
            Seeking Individualized Enterprise Architectures?
          </h2>
          <p className="text-slate-600 font-semibold max-w-xl mx-auto mb-6 text-sm">
            Should our standardized catalog software not meet your specific database registers or administrative constraints, our lead engineering division can code custom systems to fulfill your exact requirements.
          </p>
          <Link 
            to="/contact" 
            className="border-2 border-slate-350 hover:border-[#10b981]/50 text-slate-700 bg-white hover:text-[#1e3a8a] font-bold text-xs py-3 px-8 rounded-full transition-all inline-block shadow-sm"
          >
            Request custom software consultation
          </Link>
        </section>

      </div>
    </div>
  );
};

export default Products;
