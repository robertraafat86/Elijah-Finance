import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Package, 
  ArrowLeft, 
  ArrowRight,
  TrendingUp,
  Printer,
  Download,
  CheckCircle2,
  AlertCircle,
  Calculator,
  ArrowDownToLine,
  ArrowUpFromLine,
  Layers
} from 'lucide-react';
import { cn } from '../lib/utils';
import DynamicGallery from '../components/DynamicGallery';

export default function Inventory() {
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
                <Package className="w-4 h-4" />
                {t('knowledge_bank.title')}
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                {t('inventory_page.title')}
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                {t('inventory_page.subtitle')}
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
                <h2 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white">
                    <AlertCircle className="w-7 h-7" />
                  </div>
                  {t('inventory_page.intro.title')}
                </h2>
                <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                  <p className="font-bold text-slate-800 bg-blue-50/50 p-6 rounded-2xl border-r-4 border-blue-600">
                    {t('inventory_page.intro.definition')}
                  </p>
                  <p>{t('inventory_page.intro.desc')}</p>
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {t('inventory_page.importance.items', { returnObjects: true }) instanceof Array && 
                    (t('inventory_page.importance.items', { returnObjects: true }) as string[]).map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                      <span className="text-slate-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Evaluation Methods */}
            <section className="space-y-8">
              <h2 className="text-3xl font-black text-slate-900 px-4">
                {t('inventory_page.methods.title')}
              </h2>

              <div className="grid grid-cols-1 gap-8">
                {/* FIFO */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 group"
                >
                  <div className="p-8 md:p-12">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
                      <div className="space-y-4">
                        <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                          <ArrowDownToLine className="w-8 h-8" />
                        </div>
                        <h3 className="text-3xl font-black text-slate-900">{t('inventory_page.methods.fifo.title')}</h3>
                        <p className="text-lg text-slate-600 max-w-xl">{t('inventory_page.methods.fifo.desc')}</p>
                      </div>
                      <div className="px-6 py-3 bg-emerald-600 text-white rounded-full font-bold text-sm">
                        FIFO
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 mb-8">
                      <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Calculator className="w-5 h-5 text-blue-600" />
                        {t('inventory_page.methods.fifo.example_title')}
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="text-slate-400 border-b border-slate-200">
                              <th className="pb-4 text-right">{t('inventory_page.table.date')}</th>
                              <th className="pb-4 text-right">{t('inventory_page.table.desc')}</th>
                              <th className="pb-4 text-right">{t('inventory_page.table.qty')}</th>
                              <th className="pb-4 text-right">{t('inventory_page.table.price')}</th>
                              <th className="pb-4 text-right">{t('inventory_page.table.total')}</th>
                            </tr>
                          </thead>
                          <tbody className="text-slate-700">
                            <tr className="border-b border-slate-100">
                              <td className="py-4 font-medium">01/01</td>
                              <td className="py-4">Beginning Inventory</td>
                              <td className="py-4">100</td>
                              <td className="py-4">$10</td>
                              <td className="py-4 font-bold">$1,000</td>
                            </tr>
                            <tr className="border-b border-slate-100">
                              <td className="py-4 font-medium">10/01</td>
                              <td className="py-4">Purchases</td>
                              <td className="py-4">200</td>
                              <td className="py-4">$12</td>
                              <td className="py-4 font-bold">$2,400</td>
                            </tr>
                            <tr className="bg-emerald-50/50">
                              <td className="py-4 font-medium italic" colSpan={2}>Goods Sold (150 units)</td>
                              <td className="py-4" colSpan={3}>
                                <span className="font-bold text-emerald-700">100 × $10 + 50 × $12 = $1,600</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-6 bg-slate-900 text-white rounded-2xl">
                      <TrendingUp className="w-6 h-6 text-emerald-400 shrink-0" />
                      <div>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{t('inventory_page.methods.fifo.impact_title')}</p>
                        <p className="font-medium">{t('inventory_page.methods.fifo.impact_desc')}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* LIFO */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100"
                >
                  <div className="p-8 md:p-12">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
                      <div className="space-y-4">
                        <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600">
                          <ArrowUpFromLine className="w-8 h-8" />
                        </div>
                        <h3 className="text-3xl font-black text-slate-900">{t('inventory_page.methods.lifo.title')}</h3>
                        <p className="text-lg text-slate-600 max-w-xl">{t('inventory_page.methods.lifo.desc')}</p>
                      </div>
                      <div className="px-6 py-3 bg-orange-600 text-white rounded-full font-bold text-sm">
                        LIFO
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 p-6 bg-orange-50 text-orange-800 rounded-2xl border border-orange-100">
                      <AlertCircle className="w-6 h-6 shrink-0" />
                      <p className="font-medium text-sm">{t('inventory_page.methods.lifo.impact_desc')}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Weighted Average */}
                <motion.div 
                   whileHover={{ y: -5 }}
                   className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100"
                >
                  <div className="p-8 md:p-12">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
                      <div className="space-y-4">
                        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                          <Layers className="w-8 h-8" />
                        </div>
                        <h3 className="text-3xl font-black text-slate-900">{t('inventory_page.methods.average.title')}</h3>
                        <p className="text-lg text-slate-600 max-w-xl">{t('inventory_page.methods.average.desc')}</p>
                      </div>
                      <div className="px-6 py-3 bg-blue-600 text-white rounded-full font-bold text-sm">
                        WAC
                      </div>
                    </div>

                    <div className="p-8 bg-slate-50 rounded-[2rem] border border-blue-100 text-center">
                      <p className="text-sm text-blue-600 font-bold mb-4 uppercase tracking-widest">Formula</p>
                      <div className="inline-block p-6 bg-white rounded-2xl shadow-sm border border-slate-100 text-xl md:text-2xl font-black text-slate-900">
                        {t('inventory_page.methods.average.formula')}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Visual Guide Section */}
            <section className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100">
              <h2 className="text-3xl font-black text-slate-900 mb-8">{isRtl ? 'دليل مصور للمخزون' : 'Visual Inventory Guide'}</h2>
              <DynamicGallery tag="inventory" />
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8 no-print">
            <div className="bg-slate-900 rounded-[2rem] p-8 text-white">
              <h4 className="text-xl font-bold mb-6">{t('inventory_page.featured_title')}</h4>
              <div className="space-y-4">
                {[
                  { title: t('nav.bank_reconciliation'), path: '/bank-reconciliation' },
                  { title: t('nav.bad_debts'), path: '/bad-debts' },
                  { title: t('nav.depreciation_methods'), path: '/depreciation-methods' },
                ].map((item, i) => (
                  <Link 
                    key={i} 
                    to={item.path}
                    className="block p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all text-sm font-medium"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-blue-600 rounded-[2rem] p-8 text-white relative overflow-hidden">
               <div className="relative z-10">
                  <h4 className="text-xl font-bold mb-4">{t('inventory_page.cta_learn.title')}</h4>
                  <p className="text-blue-100 text-sm mb-6">{t('inventory_page.cta_learn.desc')}</p>
                  <Link to="/accounting-portal" className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-50 transition-all">
                    {t('inventory_page.cta_learn.hub')}
                    {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </Link>
               </div>
               <Calculator className="absolute -bottom-8 -right-8 w-32 h-32 text-white/10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
