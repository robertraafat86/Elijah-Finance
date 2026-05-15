import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe, BookOpen, Bookmark, Search, Moon, Sun, Smartphone, Download, Phone, MessageCircle, Instagram, Twitter, Facebook, Layers, Home as HomeIcon, ArrowRight, FileText } from 'lucide-react';
import { LOGO_URL, NAV_ITEMS, SITEMAP_URL } from '../constants';
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
      className="relative group h-full flex items-center"
      onMouseEnter={() => item.children && setActiveDropdown(item.title)}
      onMouseLeave={() => setActiveDropdown(null)}
    >
      {item.children ? (
        <button
          className={cn(
            'px-4 py-2 text-[13px] font-black transition-all rounded-xl flex items-center gap-1.5 h-full relative group',
            activeDropdown === item.title ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'
          )}
        >
          {t(item.title)}
          <ChevronDown className={cn('w-3 h-3 transition-transform duration-300', activeDropdown === item.title && 'rotate-180')} />
          {activeDropdown === item.title && (
            <motion.div layoutId="navRowActive" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
          )}
        </button>
      ) : (
        <Link
          to={item.path}
          className={cn(
            'px-4 py-2 text-[13px] font-black transition-all rounded-xl relative group flex items-center h-full whitespace-nowrap',
            isActive(item.path)
              ? 'text-blue-600'
              : 'text-slate-600 hover:text-blue-600'
          )}
        >
          {t(item.title)}
          {isActive(item.path) && (
            <motion.div 
              layoutId="navRowActive"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full"
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
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="fixed left-6 right-6 top-[110px] bg-white rounded-[2.5rem] shadow-[0_30px_90px_rgba(0,0,0,0.12)] border border-slate-100 overflow-hidden z-[60] p-12"
              >
                <div className="grid grid-cols-12 gap-16 max-h-[75vh] overflow-y-auto custom-scrollbar">
                  <div className="col-span-4 border-r border-slate-100 pr-12">
                    <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 mb-8">
                      <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-200 mb-6">
                        <BookOpen className="w-7 h-7" />
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 mb-4">{t(item.title)}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed font-bold">
                        {t('misc.knowledge_base_desc', 'موسوعة متكاملة من الدروس والتقارير والملفات المحاسبية والمالية التي تهم كل محاسب مالي وإداري.')}
                      </p>
                    </div>
                    
                    <div className="relative group">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                      <input 
                        type="text"
                        placeholder={t('misc.search_placeholder', 'ابحث عن درس أو موضوع...')}
                        className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>

                  <div className="col-span-8">
                     <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                        {item.children.filter(child => 
                          t(child.title).toLowerCase().includes(searchQuery.toLowerCase())
                        ).map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className={cn(
                              'flex items-center gap-4 p-4 rounded-2xl transition-all group/item border border-transparent',
                              isActive(child.path) 
                                ? 'bg-blue-50 border-blue-100 text-blue-700' 
                                : 'hover:bg-slate-50 hover:border-slate-100 text-slate-700 hover:text-blue-600'
                            )}
                          >
                            <div className={cn(
                              "w-10 h-10 flex items-center justify-center rounded-xl transition-all shrink-0 shadow-sm",
                              isActive(child.path) ? 'bg-blue-100 text-blue-600' : 'bg-white text-slate-400 group-hover/item:bg-blue-600 group-hover/item:text-white group-hover/item:shadow-blue-200'
                            )}>
                              {child.icon ? React.cloneElement(child.icon as React.ReactElement<{ className?: string }>, { className: 'w-5 h-5' }) : <FileText className="w-5 h-5" />}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-[13px] font-black leading-tight mb-1">{t(child.title)}</span>
                              <span className="text-[10px] text-slate-400 font-bold opacity-0 group-hover/item:opacity-100 transition-opacity">استعراض المحتوى →</span>
                            </div>
                          </Link>
                        ))}
                     </div>
                     
                     {item.children.filter(child => 
                        t(child.title).toLowerCase().includes(searchQuery.toLowerCase())
                      ).length === 0 && (
                        <div className="py-24 text-center">
                          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                             <Search className="w-8 h-8" />
                          </div>
                          <p className="text-slate-400 font-black">{t('misc.no_results', 'لا توجد نتائج مطابقة لبحثك')}</p>
                        </div>
                      )}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden py-3 z-[60]"
              >
                {item.children.map((child) => (
                  <Link
                    key={child.path}
                    to={child.path}
                    className={cn(
                      'block px-6 py-3 text-[13px] font-black transition-all relative group/sub',
                      isActive(child.path) ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      {t(child.title)}
                      <ArrowRight className={cn("w-3 h-3 opacity-0 group-hover/sub:opacity-100 transition-all", isRtl ? "rotate-180" : "")} />
                    </div>
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
          ? 'bg-white/95 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] border-b border-slate-200/50' 
          : 'bg-white/80 backdrop-blur-lg border-b border-slate-100/50'
      )}
    >
      {/* Row 1: Brand & Utilities */}
      <div className="border-b border-slate-100 hidden md:block">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="h-10 w-auto transition-transform duration-500 group-hover:scale-105">
                 <img 
                  src={LOGO_URL} 
                  alt={t('common.brand_logo')} 
                  className="h-full w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-slate-900 text-sm leading-tight">مركز ايليجا</span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">للخدمات المالية والمحاسبية</span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-4 text-slate-400">
              <div className="h-8 w-[1px] bg-slate-200 mx-2" />
              <div className="flex items-center gap-3">
                <a href="#" className="hover:text-blue-600 transition-colors"><Facebook className="w-4 h-4" /></a>
                <a href="#" className="hover:text-sky-400 transition-colors"><Twitter className="w-4 h-4" /></a>
                <a href="#" className="hover:text-rose-500 transition-colors"><Instagram className="w-4 h-4" /></a>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden xl:flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-bold">اتصل بنا</span>
                  <span className="text-[11px] font-black text-slate-700 font-mono">01208538580</span>
                </div>
              </div>
            </div>

            <div className="h-6 w-[1px] bg-slate-200" />
            
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <button
                onClick={toggleDarkMode}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100/50 text-slate-600 border border-slate-200/50 hover:bg-slate-200/50 transition-all shadow-sm group"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>

            {(isInstallable && !isInstalled) && (
              <button
                onClick={() => install()}
                className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-black text-[11px] hover:bg-black transition-all shadow-lg shadow-slate-200 active:scale-95 flex items-center gap-2 group"
              >
                <Smartphone className="w-3.5 h-3.5 text-blue-400 group-hover:rotate-12 transition-transform" />
                تثبيت التطبيق
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Row 2: Navigation & Search */}
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-14">
          {/* Logo for mobile only */}
          <Link to="/" className="md:hidden flex items-center gap-2">
            <img src={LOGO_URL} alt="Logo" className="w-8 h-8" />
            <span className="font-black text-slate-900 text-sm">ايليجا</span>
          </Link>

          {/* Desktop Nav - Right Aligned (RTL) */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-start flex-wrap">
            {NAV_ITEMS.map(renderNavItem)}
          </div>

          <div className="flex items-center gap-4">
            {/* Search Button/Box Overlay */}
            <div className="hidden lg:flex items-center gap-2 bg-slate-100/80 px-4 py-1.5 rounded-xl border border-slate-200/50 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:bg-white transition-all w-48">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <input 
                type="text" 
                placeholder={t('misc.search_placeholder')}
                className="bg-transparent border-none outline-none text-[11px] w-full font-bold text-slate-700 placeholder:text-slate-400"
              />
            </div>

            <Link
              to="/accounting-portal"
              className="hidden sm:inline-flex bg-blue-600 text-white px-5 py-2 rounded-xl font-bold text-xs hover:bg-blue-700 transition-all shadow-lg shadow-blue-200/50 active:scale-95 whitespace-nowrap"
            >
              البوابة المالية
            </Link>

            <button
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-slate-900 text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: isRtl ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRtl ? '100%' : '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className={cn(
                "fixed top-0 bottom-0 w-[320px] bg-white z-50 shadow-2xl overflow-y-auto flex flex-col",
                isRtl ? "right-0" : "left-0"
              )}
            >
              {/* Mobile Menu Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
                <div className="flex items-center gap-3">
                  <img src={LOGO_URL} alt="Logo" className="w-8 h-8 rounded-lg" />
                  <div className="flex flex-col">
                    <span className="font-black text-slate-900 text-xs">ايليجا للمحاسبة</span>
                    <span className="text-[10px] text-blue-600 font-bold uppercase tracking-tight">التميز المالي</span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="p-2.5 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Menu Content */}
              <div className="p-6 flex-1 h-full overflow-y-auto custom-scrollbar">
                <div className="space-y-6">
                  {/* Action Section */}
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={toggleDarkMode} className="flex flex-col items-center justify-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 transition-all hover:bg-slate-100">
                      <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-600">
                        {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                      </div>
                      <span className="text-[11px] font-black text-slate-700">{isDarkMode ? 'الوضع المضيء' : 'الوضع الليلي'}</span>
                    </button>
                    <div className="relative">
                       <LanguageSwitcher />
                    </div>
                  </div>

                  {/* Nav links */}
                  <div className="space-y-1">
                    {NAV_ITEMS.map((item) => (
                      <div key={item.title} className="mb-1">
                        {item.children ? (
                          <div className="mb-2">
                            <button
                              onClick={() => setActiveDropdown(activeDropdown === item.title ? null : item.title)}
                              className={cn(
                                'w-full flex items-center justify-between p-4 rounded-2xl font-black transition-all border border-transparent',
                                activeDropdown === item.title ? 'bg-blue-50 text-blue-600 border-blue-100' : 'text-slate-700 hover:bg-slate-50'
                              )}
                            >
                              <div className="flex items-center gap-3">
                                <div className={cn(
                                  "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                                  activeDropdown === item.title ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"
                                )}>
                                  {item.isMega ? <BookOpen className="w-4 h-4" /> : <Layers className="w-4 h-4" />}
                                </div>
                                <span className="text-sm">{t(item.title)}</span>
                              </div>
                              <ChevronDown className={cn('w-4 h-4 transition-transform duration-300', activeDropdown === item.title && 'rotate-180')} />
                            </button>
                            <AnimatePresence>
                              {activeDropdown === item.title && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden bg-slate-50/50 rounded-2xl mt-1 mx-2 p-2 space-y-1"
                                >
                                  {item.children.map((child) => (
                                    <Link
                                      key={child.path}
                                      to={child.path}
                                      className={cn(
                                        'flex items-center gap-3 p-3 text-[13px] font-bold rounded-xl transition-all',
                                        isActive(child.path) ? 'text-blue-600 bg-blue-100/50' : 'text-slate-600 hover:bg-white'
                                      )}
                                    >
                                      <div className={cn(
                                        "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-sm",
                                        isActive(child.path) ? "bg-blue-600 text-white" : "bg-white text-slate-400"
                                      )}>
                                        {child.icon ? React.cloneElement(child.icon as React.ReactElement<{ className?: string }>, { className: 'w-4 h-4' }) : <FileText className="w-4 h-4" />}
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
                              'flex items-center gap-3 p-4 rounded-2xl font-black transition-all border border-transparent',
                              isActive(item.path) 
                                ? 'bg-blue-50 text-blue-600 border-blue-100' 
                                : 'text-slate-700 hover:bg-slate-50'
                            )}
                          >
                             <div className={cn(
                                "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                                isActive(item.path) ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"
                              )}>
                                <HomeIcon className="w-4 h-4" />
                              </div>
                            <span className="text-sm">{t(item.title)}</span>
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Contact in Menu */}
                  <div className="bg-slate-900 rounded-3xl p-6 text-white space-y-4">
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">تواصل معنا</p>
                     <div className="space-y-3">
                        <a href="tel:01208538580" className="flex items-center gap-3 text-sm font-black">
                           <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center"><Phone className="w-4 h-4" /></div>
                           01208538580
                        </a>
                        <div className="flex gap-4 pt-2">
                           <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors"><Facebook className="w-5 h-5" /></a>
                           <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-sky-400 transition-colors"><Twitter className="w-5 h-5" /></a>
                           <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-rose-500 transition-colors"><Instagram className="w-5 h-5" /></a>
                        </div>
                     </div>
                  </div>
                </div>
              </div>

              {/* Mobile Menu Footer */}
              <div className="p-6 border-t border-slate-100 space-y-3">
                {(isInstallable && !isInstalled) && (
                  <button
                    onClick={() => install()}
                    className="w-full flex items-center justify-center gap-3 bg-slate-100 text-slate-900 p-4 rounded-2xl font-black transition-all hover:bg-slate-200"
                  >
                    <Smartphone className="w-5 h-5 text-blue-600" />
                    <span>تثبيت التطبيق</span>
                  </button>
                )}
                
                <Link
                  to="/accounting-portal"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center bg-blue-600 text-white p-4 rounded-2xl font-black transition-all shadow-lg shadow-blue-200"
                >
                  البوابة المالية
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </nav>
  );
}
