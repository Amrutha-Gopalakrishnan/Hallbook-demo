import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { loginUser, registerUser } from '../data/db';

const AuthModal = ({ isOpen, onClose, onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      const user = loginUser(formData.email, formData.password);
      if (user) {
        onSuccess(user);
        onClose();
      } else {
        setError('Invalid email or password');
      }
    } else {
      if (!formData.name) {
        setError('Name is required');
        return;
      }
      const user = registerUser(formData.name, formData.email, formData.password);
      if (user) {
        onSuccess(user);
        onClose();
      } else {
        setError('Email already exists');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-3xl shadow-[0_20px_60px_rgb(0,0,0,0.1)] w-full max-w-md relative overflow-hidden flex flex-col"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900 transition-colors z-10"
        >
          <Icon icon="solar:close-circle-linear" className="text-xl" />
        </button>

        <div className="p-8 pb-0">
          <h2 className="text-2xl font-serif text-zinc-900 mb-2">
            {isLogin ? 'Welcome Back' : 'Create an Account'}
          </h2>
          <p className="text-zinc-500 text-sm mb-8">
            {isLogin ? 'Please log in to proceed with your booking.' : 'Sign up to manage your bookings and profile.'}
          </p>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm mb-6 flex items-center gap-2">
              <Icon icon="solar:danger-circle-bold" className="text-lg" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence>
              {!isLogin && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-1"
                >
                  <label className="text-xs font-semibold tracking-widest uppercase text-zinc-400">Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full border border-zinc-200 rounded-xl py-3 px-4 bg-zinc-50 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all text-zinc-900"
                    placeholder="John Doe"
                    required={!isLogin}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-1">
              <label className="text-xs font-semibold tracking-widest uppercase text-zinc-400">Email Address</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full border border-zinc-200 rounded-xl py-3 px-4 bg-zinc-50 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all text-zinc-900"
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold tracking-widest uppercase text-zinc-400">Password</label>
              <input 
                type="password" 
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                className="w-full border border-zinc-200 rounded-xl py-3 px-4 bg-zinc-50 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all text-zinc-900"
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" className="w-full py-4 mt-4 rounded-xl uppercase tracking-widest text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 bg-zinc-900 text-white hover:bg-amber-500 hover:text-zinc-900 hover:shadow-[0_8px_30px_rgb(245,158,11,0.25)] active:scale-[0.98]">
              {isLogin ? 'Log In' : 'Sign Up'}
            </button>
          </form>
        </div>

        <div className="mt-8 p-6 bg-zinc-50 border-t border-zinc-100 text-center">
          <p className="text-sm text-zinc-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              onClick={() => { setIsLogin(!isLogin); setError(''); }} 
              className="ml-2 font-semibold text-amber-600 hover:text-amber-700 transition-colors"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthModal;
