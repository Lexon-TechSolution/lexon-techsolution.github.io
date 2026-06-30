import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { AIAssistantWidget } from './components/layout/AIAssistantWidget';
import { LeadCaptureModal } from './components/LeadCaptureModal';
import { Antigravity6GBackground } from './components/layout/Antigravity6GBackground';
import { motion, AnimatePresence } from 'framer-motion';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Products = lazy(() => import('./pages/Products'));
const Projects = lazy(() => import('./pages/Projects'));
const Pricing = lazy(() => import('./pages/Pricing'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const Leads = lazy(() => import('./pages/Leads'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-brand-dark">
    <div className="flex flex-col items-center gap-6">
      <div className="w-16 h-16 relative">
        <div className="absolute inset-0 border-4 border-brand-cyan/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="text-brand-cyan text-xs font-bold uppercase tracking-[0.4em] animate-pulse">Initializing Frontier System</p>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col selection:bg-brand-cyan/30 selection:text-white relative overflow-x-hidden">
        {/* 6G Antigravity Interactive Bio-Chamber Background */}
        <Antigravity6GBackground />
        
        <Header />
        
        {/* Stable layout system without continuous floating jitter */}
        <div className="flex-grow flex flex-col pt-20">
          <main className="flex-grow">
            <Suspense fallback={<Loading />}>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/leads" element={<Leads />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
              </AnimatePresence>
            </Suspense>
          </main>
        </div>

        <Footer />
        <AIAssistantWidget />
        <LeadCaptureModal />
      </div>
    </LanguageProvider>
  );
};

export default App;
