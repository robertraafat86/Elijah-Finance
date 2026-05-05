import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Recycle, 
  Trash2, 
  Coins, 
  Printer, 
  Download,
  AlertTriangle,
  Lightbulb,
  ArrowRightLeft,
  RefreshCw,
  PackageCheck,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function Scrap() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={cn("min-h-screen bg-slate-50 pb-20 font-sans", isRtl ? "font-arabic" : "")}>
      {/* Educational Header */}
      <section className="bg-white border-b border-slate-200 pt-12 pb-16 no-print">
        <div className="container mx-auto px-6">
          <div className={cn("flex flex-col md:flex-row justify-between items-start gap-8", isRtl ? "md:flex-row-reverse" : "")}>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold mb-6">
                <Recycle className="w-4 h-4" />
                {t('knowledge_bank.title')}
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                {t('scrap_page.title')}
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                {t('scrap_page.subtitle')}
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
            
            {/* Definition Section */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mb-8">
                  <Trash2 className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-6">{t('scrap_page.intro.definition_title')}</h2>
                <p className="text-xl text-slate-600 leading-relaxed font-medium max-w-3xl">
                  {t('scrap_page.intro.definition_desc')}
                </p>
              </div>
            </motion.section>

            {/* Types and Treatments */}
            <section className="space-y-8">
              <h3 className="text-3xl font-black text-slate-900 px-4">{t('scrap_page.types.title')}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Production Scrap */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex flex-col"
                >
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                    <PackageCheck className="w-7 h-7" />
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 mb-4">{t('scrap_page.types.production.title')}</h4>
                  <p className="text-slate-600 leading-relaxed mb-8 flex-grow">{t('scrap_page.types.production.desc')}</p>
                  
                  <div className="p-6 bg-slate-900 rounded-2xl text-blue-400 font-mono text-sm leading-relaxed overflow-x-auto">
                    <p className="text-[10px] text-white/50 mb-2 font-bold uppercase tracking-widest">Entry: Sale Case</p>
                    {t('scrap_page.treatment.sale.entry')}
                  </div>
                </motion.div>

                {/* Capital Scrap */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex flex-col"
                >
                  <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
                    <Coins className="w-7 h-7" />
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 mb-4">{t('scrap_page.types.assets.title')}</h4>
                  <p className="text-slate-600 leading-relaxed mb-8 flex-grow">{t('scrap_page.types.assets.desc')}</p>
                  
                  <div className="p-6 bg-slate-900 rounded-2xl text-amber-400 font-mono text-sm leading-relaxed overflow-x-auto">
                    <p className="text-[10px] text-white/50 mb-2 font-bold uppercase tracking-widest">Entry: Re-use Case</p>
                    {t('scrap_page.treatment.reuse.entry')}
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Treatment Summary Section */}
            <section className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden">
               <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
               <div className="relative z-10">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
                     <h3 className="text-3xl font-black">{t('scrap_page.treatment.title')}</h3>
                     <div className="p-4 bg-white/10 rounded-2xl border border-white/20">
                        <AlertTriangle className="w-8 h-8 text-amber-400" />
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                     <div className="space-y-4">
                        <p className="text-lg font-bold text-blue-400">{t('scrap_page.treatment.sale.title')}</p>
                        <p className="text-slate-400 leading-relaxed">{t('scrap_page.treatment.sale.desc')}</p>
                     </div>
                     <div className="space-y-4">
                        <p className="text-lg font-bold text-emerald-400">{t('scrap_page.treatment.reuse.title')}</p>
                        <p className="text-slate-400 leading-relaxed">{t('scrap_page.treatment.reuse.desc')}</p>
                     </div>
                  </div>
               </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8 no-print text-right">
            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden group">
               <Lightbulb className="w-12 h-12 text-amber-500 mb-6 mx-auto md:mr-0 group-hover:scale-110 transition-transform" />
               <h4 className="text-xl font-bold text-slate-900 mb-4">{t('scrap_page.example.title')}</h4>
               <p className="text-slate-600 text-sm italic mb-8 leading-relaxed">"{t('scrap_page.example.desc')}"</p>
               <div className="p-4 bg-slate-50 rounded-xl text-xs font-mono font-bold text-blue-600 border border-blue-50">
                 {t('scrap_page.example.entry')}
               </div>
            </div>

            <div className="bg-emerald-600 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl">
               <div className="relative z-10">
                  <h4 className="text-xl font-black mb-4">Value Recovery</h4>
                  <p className="text-emerald-100 text-sm mb-8 leading-relaxed">Don't ignore the hidden value in production waste. Implement scrap controls today.</p>
                  <nav className="space-y-2">
                    {[
                      { title: t('nav.inventory_valuation'), path: '/inventory' },
                      { title: t('nav.bad_debts'), path: '/bad-debts' },
                    ].map((item, i) => (
                      <Link 
                        key={i} 
                        to={item.path}
                        className="flex justify-between items-center p-3 bg-white/10 rounded-xl hover:bg-white text-emerald-100 hover:text-emerald-600 transition-all font-bold text-xs"
                      >
                        {item.title}
                        {isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </Link>
                    ))}
                  </nav>
               </div>
               <RefreshCw className="absolute -bottom-10 -right-10 w-40 h-40 text-white/5 opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
