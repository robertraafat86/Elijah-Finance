import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe, BookOpen, Bookmark, Search, Moon, Sun, Smartphone, Download } from 'lucide-react';
import { LOGO_URL, NAV_ITEMS } from '../constants';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { usePWA } from '../hooks/usePWA';

interface NavbarProps {
  isDarkMode?: boolean;
  toggleDarkMode?: () => void;
}

export default function Navbar({ isDarkMode, toggleDarkMode }: NavbarProps) {
  const { t, i18n } = useTranslation();
  const { isInstallable, isInstalled, install } = usePWA();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
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

      {/* Mega Menu or Dropdown */}
      {item.children && (
        <AnimatePresence>
          {activeDropdown === item.title && (
            item.isMega ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="fixed left-6 right-6 top-[110px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden z-[60] p-10"
              >
                <div className="grid grid-cols-12 gap-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
                  <div className="col-span-3 border-r border-slate-100 pr-10">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{t(item.title)}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-8">
                      {t('misc.knowledge_base_desc', 'اكتشف مكتبة شاملة من الموارد التعليمية المحاسبية المصممة لتطوير مهاراتك ومعرفتك المهنية.')}
                    </p>
                    
                    <div className="relative mb-6">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="text"
                        placeholder={t('misc.search_placeholder', 'ابحث هنا...')}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>

                    <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                      <p className="text-xs font-bold text-blue-700 leading-relaxed">
                        {t('misc.new_content', 'يتم تحديث المحتوى دورياً لإضافة أحدث المعايير والممارسات.')}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-9 grid grid-cols-3 gap-3">
                    {item.children.filter(child => 
                      t(child.title).toLowerCase().includes(searchQuery.toLowerCase())
                    ).map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className={cn(
                          'flex items-center gap-4 p-3 rounded-2xl transition-all group/item border border-transparent',
                          isActive(child.path) 
                            ? 'bg-blue-50 border-blue-100 text-blue-700' 
                            : 'hover:bg-slate-50 hover:border-slate-100 text-slate-600 hover:text-blue-600'
                        )}
                      >
                        <div className={cn(
                          "w-10 h-10 flex items-center justify-center rounded-xl transition-all shrink-0",
                          isActive(child.path) ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500 group-hover/item:bg-blue-100 group-hover/item:text-blue-600'
                        )}>
                          {child.icon || <BookOpen className="w-5 h-5" />}
                        </div>
                        <span className="text-[13px] font-bold leading-tight">{t(child.title)}</span>
                      </Link>
                    ))}
                    {item.children.filter(child => 
                      t(child.title).toLowerCase().includes(searchQuery.toLowerCase())
                    ).length === 0 && (
                      <div className="col-span-3 py-20 text-center">
                        <p className="text-slate-400 font-medium">{t('misc.no_results', 'لا توجد نتائج مطابقة لبحثك')}</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
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
            )
          )}
        </AnimatePresence>
      )}
    </div>
  );

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled 
          ? 'bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-b border-slate-200/50 py-3' 
          : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center group shrink-0 relative z-10">
          <div className="h-10 md:h-12 w-auto transition-transform duration-500 group-hover:scale-105">
             <img 
              src={LOGO_URL} 
              alt={t('common.brand_logo')} 
              className="h-full w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
        </Link>

        {/* Desktop Menu - Refined Center Layout */}
        <div className="hidden xl:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 px-2 py-1.5 bg-slate-100/50 backdrop-blur-md rounded-2xl border border-slate-200/50 shadow-sm">
          {NAV_ITEMS.map(renderNavItem)}
        </div>

        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all shadow-sm group"
            title={isDarkMode ? 'الوضع المضيء' : 'الوضع الليلي'}
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 group-hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-5 h-5 group-hover:-rotate-12 transition-transform" />
            )}
          </button>

          <Link
            to="/saved-content"
            className="hidden sm:flex w-10 h-10 items-center justify-center rounded-xl bg-slate-50 text-slate-600 border border-slate-100 hover:bg-blue-50 hover:text-blue-600 transition-all shadow-sm"
            title={t('common.saved_content')}
          >
            <Bookmark className="w-5 h-5" />
          </Link>

          {(isInstallable && !isInstalled) && (
            <button
              onClick={() => install()}
              className="hidden lg:flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-xl font-bold text-xs hover:bg-blue-100 transition-all border border-blue-100 group"
              title="تثبيت التطبيق"
            >
              <Download className="w-4 h-4 group-hover:bounce" />
              تثبيت التطبيق
            </button>
          )}

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
            <Link
              to="/saved-content"
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-600 border border-slate-100 shadow-sm"
            >
              <Bookmark className="w-5 h-5" />
            </Link>
            <div className="sm:hidden flex items-center">
              <LanguageSwitcher />
            </div>
            <button
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-900 text-white border border-slate-800"
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
                                      'flex items-center gap-3 p-3 text-sm font-bold border-l-2 ml-4',
                                      isActive(child.path) ? 'text-blue-600 border-blue-600 bg-blue-50/50' : 'text-slate-600 border-transparent hover:bg-slate-100/50'
                                    )}
                                  >
                                    <div className="w-6 h-6 flex items-center justify-center shrink-0">
                                      {child.icon ? React.cloneElement(child.icon as React.ReactElement<{ className?: string }>, { className: 'w-3.5 h-3.5' }) : <BookOpen className="w-3.5 h-3.5" />}
                                    </div>
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

                <div className="mt-auto pt-6 border-t border-slate-50 space-y-3">
                  {(isInstallable && !isInstalled) && (
                    <button
                      onClick={() => install()}
                      className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white p-4 rounded-xl font-bold transition-all shadow-lg overflow-hidden group relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-700" />
                      <Download className="w-5 h-5 group-hover:bounce relative z-10" />
                      <span className="relative z-10">تثبيت التطبيق</span>
                    </button>
                  )}
                  
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
