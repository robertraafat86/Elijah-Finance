import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Building2, 
  ArrowLeft, 
  ArrowRight,
  Printer,
  Download,
  AlertCircle,
  Calculator,
  RefreshCw,
  Clock,
  ExternalLink,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function BankReconciliation() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={cn("min-h-screen bg-slate-50 pb-20", isRtl ? "font-arabic" : "font-sans")}>
      {/* Educational Header */}
      <section className="bg-white border-b border-slate-200 pt-12 pb-16 no-print">
        <div className="container mx-auto px-6">
          <div className={cn("flex flex-col md:flex-row justify-between items-start gap-8", isRtl ? "md:flex-row-reverse" : "")}>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold mb-6">
                <RefreshCw className="w-4 h-4" />
                {t('knowledge_bank.title')}
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                {t('reconciliation_page.title')}
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                {t('reconciliation_page.subtitle')}
              </p>
            </div>
            
            <div className="flex gap-3 shrink-0">
              <button 
                onClick={handlePrint}
                className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
              >
                <Printer className="w-5 h-5" />
                {t('common.print_btn')}
              </button>
              <button 
                onClick={handlePrint}
                className="inline-flex items-center gap-2 bg-white text-slate-900 border border-slate-200 px-6 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all"
              >
                <Download className="w-5 h-5" />
                {t('common.download_pdf')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Main Article */}
          <div className="lg:col-span-3 space-y-12">
            
            {/* Intro Section */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100"
            >
              <div className="max-w-3xl">
                <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
                  <div className="lg:w-1/2 space-y-6">
                    <h2 className="text-2xl font-black text-slate-900">
                      {t('reconciliation_page.intro.definition_title')}
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      {t('reconciliation_page.intro.definition_desc')}
                    </p>
                  </div>
                  <div className="lg:w-1/2 bg-blue-50 p-8 rounded-3xl border border-blue-100">
                    <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                       <Calculator className="w-5 h-5" />
                       {t('reconciliation_page.intro.goal_title')}
                    </h2>
                    <p className="text-blue-800 font-medium">
                      {t('reconciliation_page.intro.goal_desc')}
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Reasons Section */}
            <section className="space-y-8">
               <h2 className="text-3xl font-black text-slate-900 px-4">
                 {t('reconciliation_page.components.title')}
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {t('reconciliation_page.components.items', { returnObjects: true }) instanceof Array && 
                   (t('reconciliation_page.components.items', { returnObjects: true }) as string[]).map((item, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                       <p className="text-slate-700 font-medium leading-relaxed">{item}</p>
                    </div>
                 ))}
               </div>
            </section>

            {/* Steps & Table Section */}
            <section className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white overflow-hidden relative">
               <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
               
               <div className="relative z-10">
                  <h2 className="text-3xl font-black mb-8 flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-blue-400">
                      <Clock className="w-7 h-7" />
                    </div>
                    {t('reconciliation_page.steps.title')}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                     <div className="space-y-6">
                        {t('reconciliation_page.steps.items', { returnObjects: true }) instanceof Array && 
                          (t('reconciliation_page.steps.items', { returnObjects: true }) as string[]).map((step, i) => (
                          <div key={i} className="flex gap-4 items-start bg-white/5 p-4 rounded-xl border border-white/10 group hover:bg-white/10 transition-all">
                             <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-sm shrink-0">
                               {i + 1}
                             </span>
                             <p className="text-slate-300 leading-relaxed font-medium">
                               {step}
                             </p>
                          </div>
                        ))}
                     </div>

                     <div className="bg-white rounded-3xl p-6 md:p-10 text-slate-900 shadow-2xl">
                        <h4 className="text-xl font-black mb-6">{t('reconciliation_page.table.title')}</h4>
                        <div className="space-y-4">
                           {t('reconciliation_page.table.rows', { returnObjects: true }) instanceof Array && 
                             (t('reconciliation_page.table.rows', { returnObjects: true }) as any[]).map((row, i) => (
                             <div key={i} className={cn(
                               "flex justify-between items-center py-3 border-b border-slate-100 last:border-0",
                               i === 4 ? "bg-emerald-50 px-4 rounded-xl -mx-4 mt-4" : ""
                             )}>
                                <div>
                                   <p className={cn("font-bold text-sm", i === 4 ? "text-emerald-700" : "text-slate-700")}>{row.details}</p>
                                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{row.notes}</p>
                                </div>
                                <span className={cn("font-black", i === 4 ? "text-emerald-600 text-lg" : "text-slate-900")}>
                                   {row.amount}
                                </span>
                             </div>
                           ))}
                        </div>
                     </div>
                  </div>

                  <div className="bg-blue-600/20 p-8 rounded-[2rem] border border-blue-500/30">
                     <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div>
                           <h4 className="text-xl font-black mb-2">{t('reconciliation_page.example.title')}</h4>
                           <p className="text-blue-100 italic">{t('reconciliation_page.example.desc')}</p>
                        </div>
                        <div className="bg-white/10 px-8 py-4 rounded-2xl border border-white/20 backdrop-blur-sm">
                           <p className="text-2xl font-black text-blue-400">{t('reconciliation_page.example.result')}</p>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8 no-print">
            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
              <h4 className="text-xl font-bold text-slate-900 mb-6">{t('inventory_page.featured_title')}</h4>
              <nav className="space-y-2">
                {[
                  { title: t('nav.inventory_valuation'), path: '/inventory' },
                  { title: t('nav.bad_debts'), path: '/bad-debts' },
                  { title: t('nav.depreciation_methods'), path: '/depreciation-methods' },
                ].map((item, i) => (
                  <Link 
                    key={i} 
                    to={item.path}
                    className="flex justify-between items-center p-4 bg-slate-50 rounded-xl hover:bg-blue-600 hover:text-white transition-all group font-bold text-sm"
                  >
                    {item.title}
                    {isRtl ? <ChevronLeft className="w-4 h-4 text-slate-300 group-hover:text-white" /> : <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-white" />}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="bg-emerald-600 rounded-[2rem] p-8 text-white relative overflow-hidden group">
               <div className="relative z-10">
                  <h4 className="text-xl font-bold mb-4">Accounting Services</h4>
                  <p className="text-emerald-100 text-sm mb-6 leading-relaxed">Professional support for bookkeeping and bank audits.</p>
                  <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-emerald-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all">
                    Contact Us
                    <ExternalLink className="w-4 h-4" />
                  </Link>
               </div>
               <Building2 className="absolute -bottom-8 -right-8 w-32 h-32 text-white/10 group-hover:scale-110 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
