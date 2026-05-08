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
  Scale
} from 'lucide-react';
import { cn } from '../lib/utils';
import { LOGO_URL } from '../constants';

export default function Home() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

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
      {/* Hero Section - Clean & Educational */}
      <section className="relative py-20 lg:py-32 bg-slate-900 border-b border-slate-800 overflow-hidden text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-12 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-blue-400 rounded-full text-sm font-bold backdrop-blur-sm">
                <Shield className="w-4 h-4" />
                <span>{t('home.center_name')}</span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight">
                {t('home.hero_title').split(' ').slice(0, 3).join(' ')} <br />
                <span className="text-blue-500">{t('home.hero_title').split(' ').slice(3).join(' ')}</span>
              </h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
                {t('home.hero_subtitle')}
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Link to="/accounting-portal" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20 active:scale-95">
                  {t('home.get_started')}
                </Link>
                <Link to="/about" className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-bold transition-all backdrop-blur-sm border border-white/10 active:scale-95">
                  {t('common.learn_more')}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-100/5 rounded-full blur-[120px]"></div>
      </section>

      {/* Stats/Features Banner */}
      <section className="py-12 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: t('home.years_exp'), val: '15+', icon: <Clock /> },
              { label: t('home.edu_programs'), val: '50+', icon: <BookOpen /> },
              { label: t('home.clients'), val: '200+', icon: <Users /> },
              { label: t('home.certificates'), val: '10+', icon: <Shield /> },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="text-blue-600 mb-1">{stat.icon}</div>
                <div className="text-3xl font-black text-slate-900">{stat.val}</div>
                <div className="text-sm font-medium text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Educational Sections */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className={cn(
            "flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6",
            isRtl ? "text-center md:text-right" : "text-center md:text-left"
          )}>
            <div className={cn("space-y-4 mx-auto", isRtl ? "md:mx-0" : "md:ml-0 md:mr-auto")}>
              <div className={cn("w-12 h-1 bg-blue-600 rounded-full mx-auto", isRtl ? "md:mx-0" : "md:ml-0")}></div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">{t('common.explore_content')}</h2>
              <p className="text-slate-500 max-w-2xl">{t('common.explore_subtitle')}</p>
            </div>
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
                  className="clean-card group flex flex-col h-full hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 border-slate-100"
                >
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    {section.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed flex-grow">
                    {section.desc}
                  </p>
                  <div className="mt-8 flex items-center gap-2 text-sm font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
                    <span>{t('common.start_learning')}</span>
                    {isRtl ? (
                      <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    ) : (
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    )}
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
    </div>
  );
}
