import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Calculator, 
  TrendingDown, 
  Layers, 
  Activity, 
  Printer, 
  Download, 
  CheckCircle2,
  AlertCircle,
  Table as TableIcon,
  BookOpen,
  RefreshCw,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function DepreciationMethods() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const handlePrint = () => {
    window.print();
  };

  const methods = [
    {
      id: 'sl',
      icon: <Layers className="w-6 h-6" />,
      color: 'blue'
    },
    {
      id: 'db',
      icon: <TrendingDown className="w-6 h-6" />,
      color: 'amber'
    },
    {
      id: 'syd',
      icon: <Calculator className="w-6 h-6" />,
      color: 'emerald'
    },
    {
      id: 'uop',
      icon: <Activity className="w-6 h-6" />,
      color: 'purple'
    }
  ];

  return (
    <div className={cn("min-h-screen bg-slate-50 pb-20 font-sans", isRtl ? "font-arabic" : "")}>
      {/* Educational Header */}
      <section className="bg-white border-b border-slate-200 pt-12 pb-16 no-print">
        <div className="container mx-auto px-6">
          <div className={cn("flex flex-col md:flex-row justify-between items-start gap-8", isRtl ? "md:flex-row-reverse" : "")}>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold mb-6">
                <BookOpen className="w-4 h-4" />
                {t('knowledge_bank.title')}
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                {t('depreciation_page.title')}
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                {t('depreciation_page.subtitle')}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-sm"
               >
                  <h2 className="text-2xl font-black text-slate-900 mb-6">{t('depreciation_page.intro.definition_title')}</h2>
                  <p className="text-lg text-slate-600 leading-relaxed">{t('depreciation_page.intro.definition_desc')}</p>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.1 }}
                 className="bg-indigo-50 rounded-[2.5rem] p-8 md:p-10 border border-indigo-100 shadow-sm"
               >
                  <h2 className="text-2xl font-black text-indigo-900 mb-6">{t('depreciation_page.intro.goal_title')}</h2>
                  <p className="text-lg text-indigo-800 leading-relaxed font-medium">{t('depreciation_page.intro.goal_desc')}</p>
               </motion.div>
            </div>

            {/* Methods Section */}
            <section className="space-y-8">
              <h3 className="text-3xl font-black text-slate-900 px-4">{t('depreciation_page.methods.title')}</h3>
              
              <div className="grid grid-cols-1 gap-8">
                {methods.map((method, i) => (
                  <motion.div
                    key={method.id}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm flex flex-col md:flex-row gap-12"
                  >
                    <div className="md:w-1/3 space-y-4">
                       <div className={cn(
                        "w-16 h-16 rounded-3xl flex items-center justify-center",
                        `bg-${method.color}-100 text-${method.color}-600`
                       )}>
                         {method.icon}
                       </div>
                       <h4 className="text-3xl font-black text-slate-900">{t(`depreciation_page.methods.${method.id}.title`)}</h4>
                       <p className="text-slate-600 font-medium leading-relaxed">{t(`depreciation_page.methods.${method.id}.desc`)}</p>
                    </div>

                    <div className="md:w-2/3 space-y-6">
                       <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">Formula</p>
                          <p className="text-xl font-black text-slate-900">{t(`depreciation_page.methods.${method.id}.formula`)}</p>
                       </div>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                             <p className="text-[10px] text-emerald-600 font-bold uppercase mb-2">Example</p>
                             <p className="text-sm font-medium text-emerald-900 italic">{t(`depreciation_page.methods.${method.id}.example`)}</p>
                          </div>
                          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 overflow-hidden relative">
                             <p className="text-[10px] text-blue-600 font-bold uppercase mb-2">Account Entry</p>
                             <p className="text-sm font-bold text-blue-900">{t(`depreciation_page.methods.${method.id}.entry`)}</p>
                             <RefreshCw className="absolute -bottom-2 -right-2 w-12 h-12 text-blue-600/10" />
                          </div>
                       </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Comparison Table */}
            <section className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white">
               <div className="flex items-center gap-4 mb-10">
                  <TableIcon className="w-8 h-8 text-indigo-400" />
                  <h3 className="text-3xl font-black">{t('depreciation_page.comparison.title')}</h3>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                     <thead>
                        <tr className="text-slate-400 border-b border-white/10">
                           <th className="pb-6 text-right font-black">{t('depreciation_page.comparison.header_method')}</th>
                           <th className="pb-6 text-right font-black">{t('depreciation_page.comparison.header_usage')}</th>
                           <th className="pb-6 text-right font-black">{t('depreciation_page.comparison.header_impact')}</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-white/5">
                        {[0, 1, 2].map((i) => (
                           <tr key={i} className="group transition-colors">
                              <td className="py-6 font-black text-indigo-400">{t(`depreciation_page.comparison.rows.${i}.method`)}</td>
                              <td className="py-6 font-medium text-slate-300">{t(`depreciation_page.comparison.rows.${i}.usage`)}</td>
                              <td className="py-6 font-medium text-slate-500 italic">{t(`depreciation_page.comparison.rows.${i}.impact`)}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8 no-print text-right">
            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden group">
               <AlertCircle className="w-12 h-12 text-indigo-600 mb-6 mx-auto md:mr-0 group-hover:scale-110 transition-transform" />
               <h4 className="text-xl font-bold text-slate-900 mb-4">Professional Tip</h4>
               <p className="text-slate-600 text-sm font-medium leading-relaxed">Choose an allocation method that accurately reflects the consumption pattern of the asset's economic benefits. Reviewed annually under IFRS.</p>
            </div>

            <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl">
               <div className="relative z-10">
                  <h4 className="text-xl font-black mb-4">Master More Topics</h4>
                  <p className="text-slate-400 text-sm mb-8 leading-relaxed">Expand your expertise with specialized accounting modules in the Knowledge Bank.</p>
                  <nav className="space-y-2">
                    {[
                      { title: t('nav.inventory_valuation'), path: '/inventory' },
                      { title: t('nav.bank_reconciliation'), path: '/bank-reconciliation' },
                      { title: t('nav.scrap'), path: '/scrap' },
                    ].map((item, i) => (
                      <Link 
                        key={i} 
                        to={item.path}
                        className="flex justify-between items-center p-3 bg-white/10 rounded-xl hover:bg-indigo-600 text-slate-300 hover:text-white transition-all font-bold text-xs"
                      >
                        {item.title}
                        {isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </Link>
                    ))}
                  </nav>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
