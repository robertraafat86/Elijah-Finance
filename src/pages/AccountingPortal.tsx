import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  BookOpen, 
  Calculator, 
  PieChart, 
  RefreshCw, 
  ShieldCheck, 
  TrendingUp, 
  ArrowLeft, 
  ArrowRight,
  CheckCircle, 
  DollarSign, 
  Briefcase,
  FileText,
  Gavel,
  Target,
  Zap,
  Building2,
  Hospital,
  Factory,
  Truck,
  Trash2,
  Building
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function AccountingPortal() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  return (
    <div className={cn("flex flex-col", isRtl ? "text-right" : "text-left")}>
      {/* Header Section */}
      <section className="bg-white border-b border-slate-100 py-16">
        <div className="container mx-auto px-6">
          <div className={cn("max-w-4xl", !isRtl && "ml-0")}>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
              {t('portal.title')} <br />
              <span className="text-blue-600">{t('portal.subtitle')}</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
              {t('portal.desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Overview Cards */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <div className="space-y-8">
              <div className="inline-flex p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-200">
                <Calculator className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{t('portal.what_is_accounting')}</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {t('portal.accounting_definition')}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="clean-card bg-white">
                  <TrendingUp className="w-6 h-6 text-blue-600 mb-4" />
                  <h4 className="font-bold text-slate-900 mb-2">{t('portal.performance_measurement')}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{t('portal.performance_desc')}</p>
                </div>
                <div className="clean-card bg-white">
                  <Briefcase className="w-6 h-6 text-blue-600 mb-4" />
                  <h4 className="font-bold text-slate-900 mb-2">{t('portal.compliance_control')}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{t('portal.compliance_desc')}</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="clean-card p-4 relative z-10 border border-slate-100 bg-white">
                <div className="w-full h-[400px] bg-slate-50 rounded-xl flex items-center justify-center p-12">
                   <div className="text-center space-y-6">
                      <div className="w-24 h-24 bg-blue-600/10 rounded-3xl flex items-center justify-center mx-auto text-blue-600">
                         <Calculator className="w-12 h-12" />
                      </div>
                      <p className="text-slate-400 font-bold">{t('portal.financial_system_analysis')}</p>
                   </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-600/5 rounded-full blur-2xl"></div>
            </div>
          </div>

          <div className={cn("text-center mb-16 space-y-4", !isRtl && "mx-auto")}>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{t('portal.core_pillars')}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">{t('portal.core_pillars_desc')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: t('portal.assets'), desc: t('portal.assets_desc'), example: t('portal.assets_example'), icon: <DollarSign /> },
              { title: t('portal.liabilities'), desc: t('portal.liabilities_desc'), example: t('portal.liabilities_example'), icon: <Gavel /> },
              { title: t('portal.equity'), desc: t('portal.equity_desc'), example: t('portal.equity_example'), icon: <ShieldCheck /> },
              { title: t('portal.revenue'), desc: t('portal.revenue_desc'), example: t('portal.revenue_example'), icon: <TrendingUp /> },
              { title: t('portal.expenses'), desc: t('portal.expenses_desc'), example: t('portal.expenses_example'), icon: <Zap /> },
            ].map((item, i) => (
              <div key={i} className="clean-card bg-white flex flex-col group h-full">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed flex-grow">{item.desc}</p>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 group-hover:border-blue-100 transition-colors">
                  <p className="text-xs text-blue-600 font-bold italic">{item.example}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Knowledge Bank (Educational Hub) */}
      <section id="knowledge-bank" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50" />
        <div className="container mx-auto px-6 relative z-10">
          <div className={cn("flex flex-col lg:flex-row gap-16 items-start mb-20", isRtl ? "lg:flex-row-reverse" : "")}>
            <div className="lg:w-1/3 sticky top-24">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-bold mb-8">
                <BookOpen className="w-4 h-4" />
                {t('knowledge_bank.title')}
              </div>
              <h2 className="text-4xl font-black text-slate-900 leading-tight mb-6">
                {t('knowledge_bank.featured_title')}
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed">
                {t('knowledge_bank.subtitle')}
              </p>
              
              <div className="mt-10 p-8 bg-slate-900 rounded-[2rem] text-white hidden lg:block shadow-2xl">
                 <Zap className="w-10 h-10 text-amber-400 mb-6" />
                 <h4 className="text-xl font-bold mb-4">Continuous Learning</h4>
                 <p className="text-slate-400 text-sm leading-relaxed mb-6">Our bank is regularly updated with new professional standards and practical case studies.</p>
                 <div className="flex -space-x-3 overflow-hidden">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-900 bg-slate-700 flex items-center justify-center text-[10px] font-bold">
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                    <div className="flex items-center justify-center h-8 w-8 rounded-full ring-2 ring-slate-900 bg-blue-600 text-[10px] font-bold">+50</div>
                 </div>
              </div>
            </div>

            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { 
                  id: 'inventory',
                  title: t('nav.inventory_valuation'), 
                  path: '/inventory', 
                  icon: <Calculator className="w-6 h-6" />,
                  desc: t('knowledge_bank.inventory_desc'),
                  color: 'blue'
                },
                { 
                  id: 'reconciliation',
                  title: t('nav.bank_reconciliation'), 
                  path: '/bank-reconciliation', 
                  icon: <RefreshCw className="w-6 h-6" />,
                  desc: t('knowledge_bank.reconciliation_desc'),
                  color: 'indigo'
                },
                { 
                  id: 'bad_debts',
                  title: t('nav.bad_debts'), 
                  path: '/bad-debts', 
                  icon: <Briefcase className="w-6 h-6" />,
                  desc: t('knowledge_bank.bad_debts_desc'),
                  color: 'red'
                },
                { 
                  id: 'scrap',
                  title: t('nav.scrap'), 
                  path: '/scrap', 
                  icon: <Trash2 className="w-6 h-6" />,
                  desc: t('knowledge_bank.scrap_desc'),
                  color: 'emerald'
                },
                { 
                  id: 'depreciation',
                  title: t('nav.depreciation_methods'), 
                  path: '/depreciation-methods', 
                  icon: <TrendingUp className="w-6 h-6" />,
                  desc: t('depreciation_page.subtitle'),
                  color: 'amber'
                },
                { 
                  id: 'fixed_assets_management',
                  title: isRtl ? 'إدارة الأصول الثابتة' : 'Fixed Assets Management', 
                  path: '/fixed-assets-management', 
                  icon: <Building className="w-6 h-6" />,
                  desc: isRtl ? 'مرجع متكامل لشرح الأصول، طرق الإهلاك، وسجل تتبع المعاملات والقيود.' : 'In-depth educational guide alongside dynamic tracking registers, equations, and journals.',
                  color: 'indigo'
                },
              ].map((item, i) => (
                <Link 
                  key={i} 
                  to={item.path}
                  className="group relative bg-white p-8 rounded-[2rem] border border-slate-100 hover:border-slate-300 transition-all shadow-sm hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    <div className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110",
                      `bg-${item.color}-50 text-${item.color}-600`
                    )}>
                      {item.icon}
                    </div>
                    <h4 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors mb-3">
                      {item.title}
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed mb-8">
                      {item.desc}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
                     <span className="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-blue-600 transition-colors">
                        {t('knowledge_bank.view_details')}
                     </span>
                     <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                        {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                     </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Accounting Cycle Promo Card */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-slate-900 rounded-[2.5rem] p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                  {t('portal.first_path')}
                </div>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight">{t('portal.full_cycle_title')}</h2>
                <p className="text-slate-400 text-lg leading-relaxed">
                  {t('portal.full_cycle_desc')}
                </p>
                <Link 
                  to="/accounting-cycle" 
                  className="inline-flex items-center gap-3 bg-blue-600 text-white px-10 py-4 rounded-full font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/20 group"
                >
                  {t('portal.browse_path')}
                  {isRtl ? <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" /> : <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />}
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { title: t('portal.analysis_ops'), icon: <Target /> },
                  { title: t('portal.journal_entries'), icon: <FileText /> },
                  { title: t('portal.general_ledger'), icon: <BookOpen /> },
                  { title: t('portal.trial_balance'), icon: <Calculator /> },
                ].map((step, i) => (
                  <div key={i} className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm flex flex-col items-center gap-4 hover:bg-white/10 transition-all cursor-default text-center">
                    <div className="text-blue-400">{step.icon}</div>
                    <p className="text-sm font-bold tracking-tight">{step.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Topics Links */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{t('portal.advanced_topics_title')}</h2>
            <p className="text-slate-600">{t('portal.advanced_topics_desc')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: t('nav.tax_accounting'), path: '/tax-accounting', icon: <Calculator className="w-5 h-5" /> },
              { title: t('nav.construction_accounting'), path: '/construction-accounting', icon: <Building2 className="w-5 h-5" /> },
              { title: t('nav.hospital_accounting'), path: '/hospital-accounting', icon: <Hospital className="w-5 h-5" /> },
              { title: t('nav.cost_accounting'), path: '/cost-accounting', icon: <Factory className="w-5 h-5" /> },
              { title: t('nav.customs_duties'), path: '/customs-duties', icon: <Truck className="w-5 h-5" /> },
              { title: t('nav.internal_audit'), path: '/internal-audit', icon: <ShieldCheck className="w-5 h-5" /> },
            ].map((link, i) => (
              <Link 
                key={i}
                to={link.path}
                className="clean-card bg-white flex items-center justify-between group py-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-50 flex items-center justify-center rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {link.icon}
                  </div>
                  <span className="font-bold text-slate-800">{link.title}</span>
                </div>
                {isRtl ? <ArrowLeft className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-all group-hover:-translate-x-1" /> : <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-all group-hover:translate-x-1" />}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
