import React from 'react';
import { motion } from 'framer-motion';
import { auth } from '../lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { LogIn, ShieldCheck } from 'lucide-react';
import SEO from '../components/layout/SEO';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/leads');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <SEO title="Admin Login" description="Internal admin login for Lexon Tech Solutions." />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-12 rounded-[40px] max-w-md w-full text-center"
      >
        <div className="w-20 h-20 rounded-3xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mx-auto mb-8 border border-cyan-500/20">
          <ShieldCheck size={40} />
        </div>
        <h1 className="text-3xl font-display font-bold text-white mb-4">Admin Access</h1>
        <p className="text-slate-400 mb-10">
          Welcome back. Please sign in with your corporate account to access the leads dashboard.
        </p>
        
        <button 
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white text-slate-900 font-bold py-4 rounded-xl hover:bg-slate-100 transition-all"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/bx_loader.gif" className="hidden" alt="" />
          <LogIn size={20} /> Sign in with Google
        </button>
        
        <div className="mt-8 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-600">
          Authorized Personnel Only
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
