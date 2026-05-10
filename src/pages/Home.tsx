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
                <p className="text-xl text-slate-600 max-w-xl leading-relaxed font-medium">
                  {t('home.hero_subtitle')}
                </p>
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

      {/* Sitemap Section - Interactive & Informative */}
      <section className="py-24 bg-slate-50 border-t border-slate-100 overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16 space-y-4"
          >
            <div className="w-16 h-1.5 bg-blue-600 rounded-full mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
              {t('common.sitemap_title')}
            </h2>
            <p className="text-slate-500 font-medium leading-relaxed">
              {t('common.sitemap_subtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-slate-100">
              {/* Sitemap UI - Replicating the infographic style in code */}
              <div className="space-y-12">
                <div className="text-center space-y-6">
                  <div className="inline-flex items-center gap-4 bg-slate-900 text-white px-10 py-6 rounded-3xl shadow-xl">
                    <Layout className="w-10 h-10 text-blue-400" />
                    <div>
                      <h3 className="text-2xl font-black">{t('common.sitemap_title')}</h3>
                      <p className="text-xs text-slate-400 opacity-80">تصفح شامل لجميع محتويات الموقع</p>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Link to="/" className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-black text-sm hover:bg-blue-700 transition-colors shadow-lg">
                      <HomeIcon className="w-4 h-4" />
                      الصفحة الرئيسية
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Category: Tools */}
                  <div className="space-y-4">
                    <div className="bg-blue-600 text-white p-4 rounded-2xl flex items-center gap-3 shadow-lg">
                      <Settings className="w-6 h-6" />
                      <span className="font-black">أدوات وموارد</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {['الآلات الحاسبة', 'النماذج المحاسبية', 'القوائم والتقارير', 'تحويل العملات', 'التقويم المحاسبي', 'مصطلحات محاسبية'].map((item, i) => (
                        <div key={i} className="bg-slate-50 p-4 rounded-xl text-slate-700 font-bold text-sm border border-slate-100 flex items-center justify-between hover:bg-blue-50 hover:border-blue-100 transition-all cursor-pointer group">
                          {item}
                          <ChevronLeft className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Category: Education */}
                  <div className="space-y-4">
                    <div className="bg-emerald-600 text-white p-4 rounded-2xl flex items-center gap-3 shadow-lg">
                      <GraduationCap className="w-6 h-6" />
                      <span className="font-black">الدورات التعليمية</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                       {['دورات محاسبية', 'مسارات تعليمية', 'شهادات معتمدة', 'محتوى مجاني', 'باقات الدورات', 'الأمثلة الشائعة'].map((item, i) => (
                        <div key={i} className="bg-slate-50 p-4 rounded-xl text-slate-700 font-bold text-sm border border-slate-100 flex items-center justify-between hover:bg-emerald-50 hover:border-emerald-100 transition-all cursor-pointer group">
                          {item}
                          <ChevronLeft className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Category: Knowledge Bank */}
                  <div className="space-y-4">
                    <div className="bg-amber-600 text-white p-4 rounded-2xl flex items-center gap-3 shadow-lg">
                      <BookOpen className="w-6 h-6" />
                      <span className="font-black">بنك المعلومات المحاسبي</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                       {['محاسبة العملاء', 'مواضيع الإهلاك', 'محاسبة الموردين', 'تقييم المخزون', 'الخزينة', 'الديون المعدومة', 'التسويات', 'الخردة', 'جرد المخزن', 'تسوية البنك'].map((item, i) => (
                        <div key={i} className="bg-slate-50 p-3 rounded-xl text-slate-700 font-bold text-[11px] border border-slate-100 flex items-center justify-between hover:bg-amber-50 hover:border-amber-100 transition-all cursor-pointer group">
                          <span className="truncate">{item}</span>
                          <ChevronLeft className="w-3 h-3 text-slate-300 group-hover:text-amber-500 transition-colors" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Category: Articles */}
                  <div className="space-y-4">
                    <div className="bg-purple-600 text-white p-4 rounded-2xl flex items-center gap-3 shadow-lg">
                      <FileText className="w-6 h-6" />
                      <span className="font-black">المقالات والأخبار</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                       {['أحدث المقالات', 'الأخبار المحاسبية', 'تحليلات وتقارير', 'أدلة إرشادية'].map((item, i) => (
                        <div key={i} className="bg-slate-50 p-4 rounded-xl text-slate-700 font-bold text-sm border border-slate-100 flex items-center justify-between hover:bg-purple-50 hover:border-purple-100 transition-all cursor-pointer group">
                          {item}
                          <ChevronLeft className="w-4 h-4 text-slate-300 group-hover:text-purple-500 transition-colors" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Category: AI */}
                  <div className="space-y-4">
                    <div className="bg-cyan-600 text-white p-4 rounded-2xl flex items-center gap-3 shadow-lg">
                      <Bot className="w-6 h-6" />
                      <span className="font-black">الذكاء الاصطناعي</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                       {['المساعد المحاسبي', 'تحليل البيانات', 'تفسير المعايير', 'حل المشكلات', 'الأسئلة والأجوبة'].map((item, i) => (
                        <div key={i} className="bg-slate-50 p-4 rounded-xl text-slate-700 font-bold text-sm border border-slate-100 flex items-center justify-between hover:bg-cyan-50 hover:border-cyan-100 transition-all cursor-pointer group">
                          {item}
                          <ChevronLeft className="w-4 h-4 text-slate-300 group-hover:text-cyan-500 transition-colors" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Category: Account */}
                  <div className="space-y-4">
                    <div className="bg-slate-800 text-white p-4 rounded-2xl flex items-center gap-3 shadow-lg">
                      <User className="w-6 h-6" />
                      <span className="font-black">الحساب الشخصي</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                       {['لوحة التحكم', 'ملفي الشخصي', 'المحتوى المحفوظ', 'إعدادات الحساب'].map((item, i) => (
                        <div key={i} className="bg-slate-50 p-4 rounded-xl text-slate-700 font-bold text-sm border border-slate-100 flex items-center justify-between hover:bg-slate-100 hover:border-slate-200 transition-all cursor-pointer group">
                          {item}
                          <ChevronLeft className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Panel */}
                <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-200/60 shadow-inner">
                  <div className="flex flex-wrap justify-center gap-4">
                    {['من نحن', 'اتصل بنا', 'شروط الاستخدام', 'سياسة الخصوصية', 'خريطة الموقع', 'الدعم والمساعدة'].map((item, i) => (
                      <div key={i} className="px-6 py-2 bg-white rounded-full text-slate-500 font-bold text-xs border border-slate-100 hover:text-blue-600 hover:border-blue-200 transition-all cursor-pointer">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <button 
                onClick={() => setIsSitemapOpen(true)}
                className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-[2rem] font-black transition-all shadow-xl shadow-blue-600/20 active:scale-95 group"
              >
                <span>{t('common.open_sitemap')}</span>
                <Maximize2 className="w-5 h-5 transition-transform group-hover:scale-110" />
              </button>
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
