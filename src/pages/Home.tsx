import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeft, 
  ArrowRight,
  CheckCircle, 
  TrendingUp, 
  Shield, 
  Zap, 
  BookOpen, 
  BarChart3, 
  Globe, 
  Flag, 
  FileText, 
  Package, 
  Building2, 
  Search, 
  Briefcase,
  Clock,
  Headphones,
  FileSearch,
  Calculator,
  PieChart,
  Ship,
  Users,
  Percent,
  Activity,
  Scale,
  Maximize2,
  Coins,
  X,
  Layout,
  Home as HomeIcon,
  Settings,
  GraduationCap,
  ChevronLeft,
  Bot,
  User
} from 'lucide-react';
import { cn } from '../lib/utils';
import { LOGO_URL, SITEMAP_URL } from '../constants';
import DynamicGallery from '../components/DynamicGallery';
import { AnimatePresence } from 'motion/react';

export default function Home() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const [isSitemapOpen, setIsSitemapOpen] = React.useState(false);

  const homeSections = [
    { 
      title: t('nav.portal'), 
      desc: t('home.portal_desc'), 
      icon: <Calculator className="w-8 h-8" />, 
      path: '/accounting-portal' 
    },
    { 
      title: t('nav.accounting_cycle'), 
      desc: t('home.cycle_desc'), 
      icon: <BookOpen className="w-8 h-8" />, 
      path: '/accounting-cycle' 
    },
    { 
      title: t('nav.cost_accounting'), 
      desc: t('home.cost_desc'), 
      icon: <BarChart3 className="w-8 h-8" />, 
      path: '/cost-accounting' 
    },
    { 
      title: t('nav.tax_accounting'), 
      desc: t('home.tax_desc'), 
      icon: <Percent className="w-8 h-8" />, 
      path: '/tax-accounting' 
    },
    { 
      title: t('nav.construction_accounting'), 
      desc: t('home.construction_desc'), 
      icon: <Building2 className="w-8 h-8" />, 
      path: '/construction-accounting' 
    },
    { 
      title: t('nav.hospital_accounting'), 
      desc: t('home.hospital_desc'), 
      icon: <Activity className="w-8 h-8" />, 
      path: '/hospital-accounting' 
    },
    { 
      title: t('nav.customs_duties'), 
      desc: t('home.customs_desc'), 
      icon: <Ship className="w-8 h-8" />, 
      path: '/customs-duties' 
    },
    { 
      title: t('nav.internal_audit'), 
      desc: t('home.audit_desc'), 
      icon: <Search className="w-8 h-8" />, 
      path: '/internal-audit' 
    },
    { 
      title: t('nav.international_standards'), 
      desc: t('home.standards_desc'), 
      icon: <Scale className="w-8 h-8" />, 
      path: '/accounting-standards' 
    },
    { 
      title: t('nav.accounting_misc'), 
      desc: t('home.misc_desc'), 
      icon: <Package className="w-8 h-8" />, 
      path: '/accounting-misc' 
    },
    { 
      title: t('nav.fixed_assets_management'), 
      desc: t('home.fixed_assets_section_desc'), 
      icon: <Building2 className="w-8 h-8" />, 
      path: '/fixed-assets-management' 
    },
    { 
      title: t('nav.financial_regulations'), 
      desc: t('home.financial_regulations_section_desc'), 
      icon: <Scale className="w-8 h-8" />, 
      path: '/financial-regulations' 
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section - Modern & Impactful */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-full h-[600px] bg-gradient-to-br from-blue-50/50 via-white to-transparent -z-10" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] -z-10" />
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-600/5 rounded-full blur-[100px] -z-10" />

        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-10"
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-50 text-blue-700 rounded-2xl text-sm font-black border border-blue-100 shadow-sm">
                <div className="p-1.5 bg-blue-600 rounded-lg">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span>{t('home.center_name')}</span>
              </div>
              
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight text-slate-900">
                  <span className="gradient-text">{t('home.hero_title').split(' ').slice(0, 3).join(' ')}</span> <br />
                  <span className="text-blue-600 italic font-serif tracking-normal">{t('home.hero_title').split(' ').slice(3).join(' ')}</span>
                </h1>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/accounting-portal" className="bg-slate-900 hover:bg-black text-white px-10 py-5 rounded-[2rem] font-black transition-all shadow-xl shadow-slate-900/10 active:scale-95 flex items-center gap-3">
                  {t('home.get_started')}
                  {isRtl ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                </Link>
                <Link to="/about" className="bg-white hover:bg-slate-50 text-slate-900 px-10 py-5 rounded-[2rem] font-black transition-all border border-slate-200 shadow-sm active:scale-95">
                  {t('common.learn_more')}
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-100">
                {[
                  { val: '15+', label: t('home.years_exp') },
                  { val: '200+', label: t('home.clients') },
                  { val: '50+', label: t('home.edu_programs') },
                ].map((s, i) => (
                  <div key={i}>
                    <div className="text-2xl font-black text-slate-900">{s.val}</div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative lg:block hidden"
            >
              <div className="relative z-10 premium-card p-4 overflow-hidden border-slate-200/50">
                <div className="bg-slate-50 rounded-[2rem] overflow-hidden aspect-[4/3] flex items-center justify-center relative">
                   {/* Abstract Financial UI mockup or high-end image could go here */}
                   <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-indigo-600/10" />
                   <Calculator className="w-32 h-32 text-blue-600/20" />
                   
                   {/* Floating Cards */}
                   <div className="absolute top-10 right-10 p-6 glass rounded-3xl shadow-xl border border-white/50 animate-bounce transition-all duration-[3000ms]">
                      <BarChart3 className="w-8 h-8 text-blue-600 mb-2" />
                      <div className="w-20 h-2 bg-blue-200 rounded-full mb-1" />
                      <div className="w-12 h-2 bg-slate-200 rounded-full" />
                   </div>
                   <div className="absolute bottom-10 left-10 p-6 glass rounded-3xl shadow-xl border border-white/50 animate-pulse transition-all duration-[4000ms]">
                      <Shield className="w-8 h-8 text-emerald-600 mb-2" />
                      <div className="w-16 h-2 bg-emerald-200 rounded-full mb-1" />
                      <div className="w-24 h-2 bg-slate-200 rounded-full" />
                   </div>
                </div>
              </div>
              {/* Decorative spheres */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Educational Sections - Refined Grids */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-20 space-y-4">
             <div className="w-16 h-1.5 bg-blue-600 rounded-full" />
             <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">{t('common.explore_content')}</h2>
             <p className="text-lg text-slate-500 font-medium">{t('common.explore_subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {homeSections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link 
                  to={section.path}
                  className="premium-card group flex flex-col h-full bg-white"
                >
                  <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
                    {section.icon}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed flex-grow font-medium">
                    {section.desc}
                  </p>
                  <div className="mt-10 pt-6 border-t border-slate-100 flex items-center gap-3 text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                    <span>{t('common.start_learning')}</span>
                    <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                      {isRtl ? (
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                      ) : (
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="inline-flex py-4 px-8 bg-white/5 rounded-3xl backdrop-blur-sm border border-white/10 items-center justify-center">
              {LOGO_URL && (
                 <div className="w-48 h-32 flex items-center justify-center">
                   <img src={LOGO_URL} className="w-full h-full object-contain brightness-200" alt="Logo" referrerPolicy="no-referrer" />
                 </div>
              )}
            </div>
            <h2 className="text-3xl md:text-5xl font-black leading-tight">{t('common.vision_title')}</h2>
            <p className="text-xl text-slate-400 leading-[1.8] font-light">
              {t('common.vision_text')}
            </p>
            <div className="pt-8 border-t border-white/10 flex flex-wrap justify-center gap-12">
              <div className="text-center">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">{t('common.core_values')}</p>
                <div className="flex gap-4 font-bold text-sm">
                  <span>{t('common.accuracy')}</span>
                  <span className="text-blue-500">•</span>
                  <span>{t('common.transparency')}</span>
                  <span className="text-blue-500">•</span>
                  <span>{t('common.professionalism')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Contextual Card */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={cn("space-y-8", isRtl ? "text-right" : "text-left")}>
              <h2 className={cn("text-3xl font-bold text-slate-900 border-blue-600", isRtl ? "border-r-4 pr-6" : "border-l-4 pl-6")}>
                {t('common.quality_commitment')}
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {t('common.quality_text')}
              </p>
              <div className="space-y-4">
                {t('home.quality_points', { returnObjects: true }) instanceof Array && 
                  (t('home.quality_points', { returnObjects: true }) as string[]).map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-700 font-medium text-sm">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="clean-card bg-white space-y-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
                <h4 className="font-bold">{t('home.growth_consulting')}</h4>
                <p className="text-xs text-slate-500">{t('home.growth_desc')}</p>
              </div>
              <div className="clean-card bg-white mt-8 space-y-4">
                <Shield className="w-8 h-8 text-blue-600" />
                <h4 className="font-bold">{t('home.internal_control')}</h4>
                <p className="text-xs text-slate-500">{t('home.internal_control_desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sitemap Section - Visual & Interactive */}
      <section className="py-24 bg-white border-t border-slate-100 overflow-hidden" id="sitemap">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16 space-y-4"
          >
            <div className="w-20 h-2 bg-blue-600 rounded-full mx-auto mb-8" />
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
              {t('common.sitemap_title')}
            </h2>
            <p className="text-lg text-slate-500 font-bold leading-relaxed">
              {t('common.sitemap_subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="relative group">
              {/* Main Card */}
              <div 
                className="bg-slate-50 rounded-[3rem] p-4 md:p-8 shadow-2xl border border-slate-200/50 overflow-hidden cursor-pointer group-hover:shadow-blue-500/10 transition-all duration-700"
                onClick={() => setIsSitemapOpen(true)}
              >
                <div className="relative aspect-video rounded-[2rem] overflow-hidden bg-white shadow-inner border border-slate-100">
                  <img 
                    src={SITEMAP_URL} 
                    alt={t('common.sitemap_title')}
                    loading="lazy"
                    className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-all duration-500 flex items-center justify-center backdrop-blur-[0px] group-hover:backdrop-blur-sm">
                    <div className="bg-white/90 text-slate-900 px-8 py-4 rounded-full font-black flex items-center gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
                      <Maximize2 className="w-5 h-5 text-blue-600" />
                      <span>{t('common.open_sitemap')}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6 px-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                      <Layout className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-slate-900">هيكل الموقع المتكامل</h4>
                      <p className="text-sm text-slate-500 font-bold">وصول سريع لجميع الخدمات والدروس التعليمية</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsSitemapOpen(true);
                    }}
                    className="bg-slate-900 hover:bg-black text-white px-10 py-5 rounded-[2rem] font-black transition-all shadow-xl shadow-slate-200 active:scale-95 flex items-center gap-3 group/btn"
                  >
                    <span>{t('common.open_sitemap')}</span>
                    <Maximize2 className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10 group-hover:opacity-100 transition-opacity" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-indigo-100 rounded-full blur-3xl opacity-50 -z-10 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox / Modal for Sitemap Image */}
      <AnimatePresence>
        {isSitemapOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-slate-900/95 backdrop-blur-xl"
            onClick={() => setIsSitemapOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-w-7xl w-full max-h-full overflow-auto rounded-3xl bg-white shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setIsSitemapOpen(false)}
                className="absolute top-6 right-6 z-10 p-4 bg-slate-900/10 hover:bg-rose-500 hover:text-white text-slate-900 rounded-full transition-all backdrop-blur-md border border-white/20"
              >
                <X className="w-6 h-6" />
              </button>
              {/* Fallback to image if available, else show message */}
              <div className="p-8">
                <img 
                  src={SITEMAP_URL} 
                  alt="Full Sitemap" 
                  className="w-full h-auto rounded-xl"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const msg = document.createElement('div');
                      msg.className = "p-20 text-center space-y-4";
                      msg.innerHTML = `
                        <div class="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
                          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </div>
                        <h3 class="text-2xl font-black text-slate-900">عذراً، الصورة غير متوفرة</h3>
                        <p class="text-slate-500 font-bold italic">يرجى التأكد من رفع ملف sitemap.png إلى مجلد public أو تحديث الرابط في الإعدادات.</p>
                      `;
                      parent.appendChild(msg);
                    }
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Consultations & Specialized Financial Services Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-100 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 md:p-12 shadow-xl border border-slate-100 dark:border-slate-800/60 flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden">
              {/* Decorative side accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/30 rounded-full blur-3xl -z-10" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-100/30 rounded-full blur-3xl -z-10" />
              
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-2xl text-xs font-black border border-emerald-100/60 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{isRtl ? "خدمات الاستشارات المهنية" : "Professional Consulting Services"}</span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white leading-tight">
                  {isRtl ? "مرحباً بكم في منصتنا المحاسبية" : "Welcome to Our Accounting Platform"}
                </h3>
                
                <p className="text-[16px] md:text-[18px] leading-[1.8] font-bold text-slate-600 dark:text-neutral-300">
                  {isRtl ? (
                    "وجهتكم الموثوقة للمعرفة والخدمات المالية المتخصصة. نسعى إلى تزويدكم بمحتوى عملي وأدوات حديثة تدعم نجاح أعمالكم واتخاذ قراراتكم بثقة."
                  ) : (
                    "Your trusted destination for specialized financial knowledge and services. We strive to provide you with practical content and modern tools that support your business success and help you make decisions with confidence."
                  )}
                </p>
                
                <p className="text-[15px] leading-relaxed text-slate-500 dark:text-neutral-400 font-medium">
                  {isRtl ? (
                    "لطلب الاستشارات المحاسبية والمالية، تواصل معنا عبر واتساب، ويسعدنا تقديم الدعم والحلول المهنية التي تناسب احتياجات أعمالكم."
                  ) : (
                    "To request accounting and financial consultations, contact us via WhatsApp, and we are pleased to provide professional support and solutions tailored to your business needs."
                  )}
                </p>
              </div>

              <div className="w-full lg:w-auto shrink-0 flex flex-col items-center justify-center p-8 bg-emerald-50/50 dark:bg-slate-800/30 border border-emerald-100/50 rounded-[2.5rem] space-y-6 text-center max-w-sm mx-auto">
                <div className="w-16 h-16 rounded-3xl bg-[#25D366] flex items-center justify-center text-white shadow-lg shadow-emerald-200/50 animate-bounce">
                  <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.381 9.805-9.778.002-2.614-1.012-5.074-2.859-6.918C16.38 2.065 13.931 1.05 11.332 1.05c-5.407 0-9.81 4.384-9.813 9.78-.001 1.954.512 3.86 1.482 5.561l-.979 3.573 3.664-.961zm11.362-5.648c-.318-.159-1.879-.926-2.168-1.031-.289-.105-.499-.159-.709.159-.21.318-.813 1.031-.996 1.242-.183.21-.367.236-.685.078-.318-.159-1.341-.494-2.55-1.571-.94-.839-1.575-1.875-1.759-2.193-.184-.318-.02-.489.139-.648.143-.143.318-.367.478-.551.159-.184.21-.318.318-.53.105-.21.053-.394-.026-.551-.08-.159-.709-1.708-.971-2.336-.255-.612-.513-.529-.709-.539-.183-.01-.394-.01-.604-.01-.21 0-.551.08-.84.394-.289.318-1.103 1.077-1.103 2.625 0 1.549 1.129 3.043 1.286 3.254.159.21 2.221 3.391 5.38 4.757.751.325 1.338.52 1.796.666.755.239 1.443.205 1.986.124.605-.09 1.879-.767 2.141-1.47.263-.703.263-1.306.184-1.433-.08-.124-.289-.21-.605-.369z"/>
                  </svg>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-lg font-black text-slate-900 dark:text-white">{isRtl ? "طلب استشارة فورية" : "Request Instant Consultation"}</h4>
                  <p className="text-xs text-slate-500 font-bold">{isRtl ? "استجابة سريعة من الخبراء" : "Fast expert response"}</p>
                </div>

                <a
                  href={`https://wa.me/201208538580?text=${encodeURIComponent(isRtl ? "مرحباً بك في منظومة \"إيليجا للخدمات المالية والمحاسبية\" 📊\n\nأريد الاستفسار عن كفاءة الخدمات والحلول المحاسبية المتاحة." : "Hello \"Elijah Financial & Accounting Services\" 📊\n\nI would like to inquire about your professional financial and accounting services.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white px-8 py-4 rounded-[1.8rem] font-black transition-all shadow-xl shadow-emerald-200 active:scale-95 flex items-center justify-center gap-2.5"
                >
                  <span>{isRtl ? "تواصل الآن عبر واتساب" : "Contact on WhatsApp"}</span>
                  {isRtl ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* General Educational Gallery */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
              {isRtl ? 'المكتبة التعليمية المصورة' : 'Visual Educational Library'}
            </h2>
            <p className="text-slate-500 font-medium leading-relaxed">
              {isRtl 
                ? 'استكشف مجموعتنا المتزايدة من الرسوم التوضيحية والخرائط الذهنية للمفاهيم المحاسبية والمالية.' 
                : 'Explore our growing collection of illustrations and mind maps for accounting and financial concepts.'}
            </p>
          </div>
          <DynamicGallery tag="general" />
        </div>
      </section>
    </div>
  );
}
