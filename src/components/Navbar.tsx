import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { LOGO_URL, NAV_ITEMS } from '../constants';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const isRtl = i18n.language === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const isActive = (path: string) => location.pathname === path;

  const midPoint = Math.ceil(NAV_ITEMS.length / 2);
  const firstRow = NAV_ITEMS.slice(0, midPoint);
  const secondRow = NAV_ITEMS.slice(midPoint);

  const renderNavItem = (item: typeof NAV_ITEMS[0]) => (
    <div 
      key={item.title} 
      className="relative group"
      onMouseEnter={() => item.children && setActiveDropdown(item.title)}
      onMouseLeave={() => setActiveDropdown(null)}
    >
      {item.children ? (
        <button
          className={cn(
            'px-3 py-1.5 text-[12px] font-bold transition-all rounded-lg flex items-center gap-1',
            activeDropdown === item.title ? 'text-blue-600 bg-slate-50' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
          )}
        >
          {t(item.title)}
          <ChevronDown className={cn('w-4 h-4 transition-transform', activeDropdown === item.title && 'rotate-180')} />
        </button>
      ) : (
        <Link
          to={item.path}
          className={cn(
            'px-3 py-1.5 text-[12px] font-bold transition-all rounded-lg relative group block whitespace-nowrap',
            isActive(item.path)
              ? 'text-blue-600'
              : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
          )}
        >
          {t(item.title)}
          {isActive(item.path) && (
            <motion.div 
              layoutId="activeNav"
              className="absolute bottom-0 left-2 right-2 h-0.5 bg-blue-600 rounded-full"
            />
          )}
        </Link>
      )}

      {/* Dropdown Menu */}
      {item.children && (
        <AnimatePresence>
          {activeDropdown === item.title && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden py-2 z-[60]"
            >
              {item.children.map((child) => (
                <Link
                  key={child.path}
                  to={child.path}
                  className={cn(
                    'block px-4 py-2 text-sm font-bold transition-all',
                    isActive(child.path) ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                  )}
                >
                  {t(child.title)}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b',
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-slate-100 py-2' 
          : 'bg-white border-transparent py-5'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center group shrink-0">
          <div className="logo-container h-12 md:h-16 w-auto flex items-center">
             <img 
              src={LOGO_URL} 
              alt={t('common.brand_logo')} 
              className="h-full w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
        </Link>

        {/* Desktop Menu - Two Rows Centered */}
        <div className="hidden xl:flex flex-col items-center absolute left-1/2 -translate-x-1/2">
          <div className="flex items-center justify-center gap-1">
            {firstRow.map(renderNavItem)}
          </div>
          <div className="flex items-center justify-center gap-1">
            {secondRow.map(renderNavItem)}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center">
            <LanguageSwitcher />
          </div>
          
          <Link
            to="/accounting-portal"
            className="hidden lg:inline-flex bg-blue-600 text-white px-5 py-2 rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-md shadow-blue-200 hover:shadow-lg active:scale-95 whitespace-nowrap"
          >
            {t('common.start_learning')}
          </Link>

          {/* Mobile Toggle */}
          <div className="xl:hidden flex items-center gap-2">
            <div className="sm:hidden flex items-center">
              <LanguageSwitcher />
            </div>
            <button
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-900 border border-slate-100"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: isRtl ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRtl ? '-100%' : '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={cn(
                "fixed top-0 bottom-0 w-[280px] bg-white z-50 shadow-2xl overflow-y-auto",
                isRtl ? "left-0" : "right-0"
              )}
            >
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <div className="h-8 w-auto">
                    <img src={LOGO_URL} alt="Logo" className="h-full w-auto" />
                  </div>
                  <button onClick={() => setIsOpen(false)} className="p-2 bg-slate-50 rounded-lg">
                    <X className="w-5 h-5 text-slate-600" />
                  </button>
                </div>

                <div className="flex flex-col gap-1">
                  {NAV_ITEMS.map((item) => (
                    <div key={item.title}>
                      {item.children ? (
                        <div className="mb-2">
                          <button
                            onClick={() => setActiveDropdown(activeDropdown === item.title ? null : item.title)}
                            className={cn(
                              'w-full flex items-center justify-between p-3 rounded-xl font-bold transition-all',
                              activeDropdown === item.title ? 'bg-blue-50 text-blue-600' : 'text-slate-700'
                            )}
                          >
                            {t(item.title)}
                            <ChevronDown className={cn('w-4 h-4 transition-transform', activeDropdown === item.title && 'rotate-180')} />
                          </button>
                          <AnimatePresence>
                            {activeDropdown === item.title && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden bg-slate-50/50 rounded-xl mt-1 mx-2"
                              >
                                {item.children.map((child) => (
                                  <Link
                                    key={child.path}
                                    to={child.path}
                                    className={cn(
                                      'block p-3 text-sm font-bold border-l-2 ml-4',
                                      isActive(child.path) ? 'text-blue-600 border-blue-600' : 'text-slate-600 border-transparent'
                                    )}
                                  >
                                    {t(child.title)}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          to={item.path}
                          className={cn(
                            'block p-3 rounded-xl font-bold transition-all',
                            isActive(item.path) 
                              ? 'bg-blue-50 text-blue-600' 
                              : 'text-slate-700 hover:bg-slate-50'
                          )}
                        >
                          {t(item.title)}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-6 border-t border-slate-50">
                  <Link
                    to="/accounting-portal"
                    className="w-full flex items-center justify-center bg-blue-600 text-white p-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-200"
                  >
                    {t('common.start_learning')}
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
