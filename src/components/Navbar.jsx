import { useState, useEffect } from 'react';
import { getCurrentUser } from '../data/db';
import AuthModal from './AuthModal';

const Navbar = ({ isInnerPage = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleAccountClick = () => {
    if (user) {
      window.location.href = '/profile';
    } else {
      setAuthModalOpen(true);
    }
  };

  return (
    <>
      <nav className="fixed top-6 left-0 right-0 z-[1000] px-4 w-full">
        <div 
          className="max-w-4xl border rounded-full mr-auto ml-auto pt-3 pr-6 pb-3 pl-6 border-white/10 animate-fade-in"
          style={{
            background: 'linear-gradient(180deg, rgba(14,16,26,0.55), rgba(14,16,26,0.35)) padding-box, linear-gradient(120deg, rgba(255,255,255,0.35), rgba(255,255,255,0.08)) border-box',
            border: '1px solid transparent',
            backdropFilter: 'blur(16px) saturate(120%)',
            WebkitBackdropFilter: 'blur(16px) saturate(120%)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.04)'
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <a href="/" className="text-lg font-semibold tracking-tight text-white/90">
                Aurelian Reserve
              </a>
            </div>
            
            <ul className="hidden md:flex items-center gap-1 text-sm font-medium text-white/60">
              <li>
                <a href="/" className="transition-colors duration-300 rounded-full pt-2 pr-4 pb-2 pl-4 hover:text-white hover:bg-white/5">
                  Home
                </a>
              </li>
              <li>
                <a href="/#about" className="transition-colors duration-300 rounded-full pt-2 pr-4 pb-2 pl-4 hover:text-white hover:bg-white/5">
                  About
                </a>
              </li>
              <li>
                <a href="/#services" className="transition-colors duration-300 hover:text-white hover:bg-white/5 rounded-full pt-2 pr-4 pb-2 pl-4">
                  Services
                </a>
              </li>
              <li>
                <a href="/rooms" className="transition-colors duration-300 rounded-full pt-2 pr-4 pb-2 pl-4 hover:text-white hover:bg-white/5">
                  Rooms
                </a>
              </li>
              <li>
                <a href="/#gallery" className="transition-colors duration-300 rounded-full pt-2 pr-4 pb-2 pl-4 hover:text-white hover:bg-white/5">
                  Gallery
                </a>
              </li>
                <li>
                <a href="/#rooms" className="transition-colors duration-300 rounded-full pt-2 pr-4 pb-2 pl-4 hover:text-white hover:bg-white/5">
                  Spaces
                </a>
              </li>

              <li>
                <a href="/#contact" className="transition-colors duration-300 rounded-full pt-2 pr-4 pb-2 pl-4 hover:text-white hover:bg-white/5">
                  Contact
                </a>
              </li>
            </ul>

            <div className="flex items-center gap-1.5 md:gap-2">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex md:hidden p-2 rounded-full transition-all duration-300 border hover:bg-white/5 border-white/5 cursor-pointer" 
                style={{ background: 'rgba(255, 255, 255, 0.02)' }}
                aria-label="Menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 stroke-[1.5] text-white/70">
                  {mobileMenuOpen ? (
                    <>
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </>
                  ) : (
                    <>
                      <line x1="4" y1="6" x2="20" y2="6"></line>
                      <line x1="4" y1="12" x2="20" y2="12"></line>
                      <line x1="4" y1="18" x2="20" y2="18"></line>
                    </>
                  )}
                </svg>
              </button>

              <button 
                onClick={handleAccountClick}
                className="hidden md:inline-flex p-2 rounded-full transition-all duration-300 border hover:bg-white/5 border-white/5 cursor-pointer" 
                style={{ background: 'rgba(255, 255, 255, 0.02)' }} 
                aria-label="Account"
                title={user ? `Profile (${user.name})` : 'Login / Register'}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 stroke-[1.5] text-white/60">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" className=""></path>
                  <circle cx="12" cy="7" r="4" className=""></circle>
                </svg>
              </button>
            </div>
          </div>
        </div>

{/* ph */}
        {mobileMenuOpen && (
          <div 
            className="max-w-4xl mx-auto mt-2 p-3 rounded-3xl border border-white/10 backdrop-blur-lg flex flex-col gap-1.5 md:hidden"
            style={{
              background: 'linear-gradient(180deg, rgba(14,16,26,0.85), rgba(14,16,26,0.75)) padding-box, linear-gradient(120deg, rgba(255,255,255,0.25), rgba(255,255,255,0.05)) border-box',
              border: '1px solid transparent',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            }}
          >
            <ul className="flex flex-col gap-0.5 text-sm font-medium text-white/70">
              <li>
                <a href="/" className="block transition-colors duration-300 rounded-2xl py-2.5 px-4 hover:text-white hover:bg-white/5" onClick={() => setMobileMenuOpen(false)}>
                  Home
                </a>
              </li>
              <li>
                <a href="/#services" className="block transition-colors duration-300 hover:text-white hover:bg-white/5 rounded-2xl py-2.5 px-4" onClick={() => setMobileMenuOpen(false)}>
                  Services
                </a>
              </li>
              <li>
                <a href="/rooms" className="block transition-colors duration-300 rounded-2xl py-2.5 px-4 hover:text-white hover:bg-white/5" onClick={() => setMobileMenuOpen(false)}>
                  Rooms
                </a>
              </li>
              <li>
                <a href="/#gallery" className="block transition-colors duration-300 rounded-2xl py-2.5 px-4 hover:text-white hover:bg-white/5" onClick={() => setMobileMenuOpen(false)}>
                  Works
                </a>
              </li>
              <li>
                <a href="/#contact" className="block transition-colors duration-300 rounded-2xl py-2.5 px-4 hover:text-white hover:bg-white/5" onClick={() => setMobileMenuOpen(false)}>
                  Contact
                </a>
              </li>
            </ul>
            
            <div className="border-t border-white/10 pt-2 mt-1 flex flex-col gap-1.5">
              {user ? (
                <a 
                  href="/profile" 
                  className="flex items-center justify-between transition-colors duration-300 rounded-2xl py-2.5 px-4 text-white/70 hover:text-white hover:bg-white/5" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-sm font-medium">Profile ({user.name.split(' ')[0]})</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white/60">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </a>
              ) : (
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthModalOpen(true);
                  }} 
                  className="flex items-center justify-between transition-colors duration-300 rounded-2xl py-2.5 px-4 text-left text-white/70 hover:text-white hover:bg-white/5 w-full cursor-pointer"
                >
                  <span className="text-sm font-medium">Login / Register</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white/60">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
      
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} onSuccess={(u) => setUser(u)} />
    </>
  );
};

export default Navbar;