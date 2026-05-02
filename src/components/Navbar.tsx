import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { LOGO_URL } from '../constants';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const mainLinks = [
    { title: 'الرئيسية', path: '/' },
    { title: 'من نحن', path: '/about' },
    { title: 'خدماتنا', path: '/services' },
    { title: 'بوابة التعلم', path: '/accounting-portal' },
    { title: 'اتصل بنا', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b',
        scrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg border-slate-100 py-3' 
          : 'bg-white border-transparent py-5'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 transition-transform group-hover:scale-105 group-hover:rotate-3">
             <img 
              src={LOGO_URL} 
              alt="شعار إيليجا" 
              className="w-7 h-7 object-contain brightness-0 invert"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col -gap-1">
            <span className="text-lg font-black text-slate-900 leading-none">إيليجا</span>
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter">للخدمات المالية</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-1">
          {mainLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'px-4 py-2 text-sm font-bold transition-all rounded-lg relative group',
                isActive(item.path)
                  ? 'text-blue-600'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
              )}
            >
              {item.title}
              {isActive(item.path) && (
                <motion.div 
                  layoutId="activeNav"
                  className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-600 rounded-full"
                />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/accounting-portal"
            className="hidden sm:inline-flex bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-md shadow-blue-200 hover:shadow-lg active:scale-95"
          >
            ابدأ التعلم الآن
          </Link>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-900 border border-slate-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="lg:hidden absolute top-full left-4 right-4 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 p-4"
          >
            <div className="flex flex-col gap-2">
              {mainLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'text-base font-bold p-4 rounded-xl transition-all',
                    isActive(item.path) 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-slate-700 hover:bg-slate-50'
                  )}
                >
                  {item.title}
                </Link>
              ))}
              <div className="mt-4 p-4 border-t border-slate-50">
                <Link
                  to="/accounting-portal"
                  className="w-full flex items-center justify-center bg-blue-600 text-white p-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-200"
                >
                  ابدأ مسارك التعليمي
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
