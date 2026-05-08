import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { 
  AlertCircle, 
  UserMinus, 
  ShieldAlert, 
  Scale, 
  Printer, 
  Download,
  CheckCircle2,
  Calculator,
  RefreshCw,
  Clock,
  ArrowDownCircle,
  HelpCircle
} from 'lucide-react';
import { cn } from '../lib/utils';
import DynamicGallery from '../components/DynamicGallery';

export default function BadDebts() {
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
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-bold mb-6">
                <AlertCircle className="w-4 h-4" />
                {t('knowledge_bank.title')}
              </div>
              <h1 className={cn("text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight", isRtl ? "text-right" : "text-left")}>
                {t('bad_debts_page.title')}
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                {t('bad_debts_page.subtitle')}
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
            
            {/* Split Comparison Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <motion.div 
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-sm"
               >
                  <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-8">
                    <UserMinus className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 mb-6">{t('bad_debts_page.intro.definition_title')}</h2>
                  <p className="text-lg text-slate-600 leading-relaxed">{t('bad_debts_page.intro.definition_desc')}</p>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="bg-amber-50 rounded-[2.5rem] p-8 md:p-10 border border-amber-100 shadow-sm"
               >
                  <div className="w-14 h-14 bg-white text-amber-600 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                    <Scale className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-black text-amber-900 mb-6">{t('bad_debts_page.intro.diff_title')}</h2>
                  <p className="text-lg text-amber-800 leading-relaxed font-medium">{t('bad_debts_page.intro.diff_desc')}</p>
               </motion.div>
            </div>

            {/* Methods Section */}
            <section className="space-y-8">
              <h3 className="text-3xl font-black text-slate-900 px-4">{t('bad_debts_page.methods.title')}</h3>
              
              <div className="space-y-8">
                {/* Direct Method */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-sm group"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                     <div className="lg:w-1/2 space-y-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-900 font-black">1</div>
                        <h4 className="text-2xl font-black text-slate-900">{t('bad_debts_page.methods.direct.title')}</h4>
                        <p className="text-slate-600 leading-relaxed">{t('bad_debts_page.methods.direct.desc')}</p>
                     </div>
                     <div className="lg:w-1/2 w-full bg-slate-900 text-white p-8 rounded-3xl font-mono relative overflow-hidden group">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-4">Accounting Entry</p>
                        <code className="text-base md:text-lg block break-words leading-relaxed whitespace-pre-wrap">
                          {t('bad_debts_page.methods.direct.entry')}
                        </code>
                        <RefreshCw className="absolute -bottom-4 -right-4 w-24 h-24 text-white/5 group-hover:rotate-180 transition-transform duration-700" />
                     </div>
                  </div>
                </motion.div>

                {/* Allowance Method */}
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="bg-slate-900 rounded-[2.5rem] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl" />
                  
                  <div className="relative z-10 space-y-10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                       <div className="space-y-2">
                          <h4 className="text-3xl font-black">{t('bad_debts_page.methods.allowance.title')}</h4>
                          <p className="text-slate-400">{t('bad_debts_page.methods.allowance.desc')}</p>
                       </div>
                       <div className="px-6 py-2 bg-red-600 rounded-full font-bold text-sm shrink-0">Professional Choice</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="bg-white/5 p-8 rounded-2xl border border-white/10 space-y-4">
                          <p className="text-red-400 font-bold text-xs uppercase tracking-widest">Entry 01: Initial Setup</p>
                          <code className="block text-sm leading-relaxed text-slate-200">{t('bad_debts_page.methods.allowance.entry_forming')}</code>
                       </div>
                       <div className="bg-white/5 p-8 rounded-2xl border border-white/10 space-y-4">
                          <p className="text-emerald-400 font-bold text-xs uppercase tracking-widest">Entry 02: Actual Write-off</p>
                          <code className="block text-sm leading-relaxed text-slate-200">{t('bad_debts_page.methods.allowance.entry_writing_off')}</code>
                       </div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Recovery Section */}
                <motion.div 
                   whileHover={{ y: -5 }}
                   className="bg-emerald-50 rounded-[2.5rem] p-8 md:p-10 border border-emerald-100 shadow-sm"
                >
                   <div className="flex flex-col md:flex-row gap-8 items-center text-right">
                      <div className="w-20 h-20 bg-emerald-600 rounded-[2rem] flex items-center justify-center text-white shrink-0">
                         <ArrowDownCircle className="w-10 h-10" />
                      </div>
                      <div className="space-y-2 text-right">
                         <h4 className="text-2xl font-black text-emerald-900">{t('bad_debts_page.recovery.title')}</h4>
                         <p className="text-emerald-800 font-medium leading-relaxed">{t('bad_debts_page.recovery.desc')}</p>
                      </div>
                   </div>
                </motion.div>
              </div>
            </section>

            {/* Visual Guide */}
            <section className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100">
               <h3 className="text-3xl font-black text-slate-900 mb-8">{isRtl ? 'دليل مصور للديون المعدومة' : 'Bad Debts Visual Guide'}</h3>
               <DynamicGallery tag="bad-debts" />
            </section>
          </div>

          {/* Sidebar */}
          <div className={cn("space-y-8 no-print", isRtl ? "text-right" : "text-left")}>
            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
               <Clock className={cn("w-10 h-10 text-blue-600 mb-6 mx-auto", isRtl ? "md:ml-0" : "md:mr-0")} />
               <h4 className="text-xl font-bold text-slate-900 mb-4">{t('bad_debts_page.example.title')}</h4>
               <p className="text-slate-600 text-sm italic mb-6 leading-relaxed">"{t('bad_debts_page.example.desc')}"</p>
               <div className="space-y-3">
                  <div className="p-4 bg-slate-50 rounded-xl text-xs font-mono font-bold text-slate-500">{t('bad_debts_page.example.direct_entry')}</div>
                  <div className="p-4 bg-red-50 rounded-xl text-xs font-mono font-bold text-red-500">{t('bad_debts_page.example.allowance_entry')}</div>
               </div>
            </div>

            <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden group shadow-2xl">
               <div className={cn("relative z-10", isRtl ? "text-right" : "text-left")}>
                  <ShieldAlert className="w-10 h-10 text-red-500 mb-4" />
                  <h4 className="text-xl font-black mb-4">{t('bad_debts_page.risk_mgmt')}</h4>
                  <p className="text-slate-400 text-sm mb-8 leading-relaxed">{t('bad_debts_page.risk_mgmt_desc')}</p>
                  <button className="w-full bg-white text-slate-900 py-4 rounded-xl font-black text-sm hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                    {t('bad_debts_page.consult_expert')}
                    <HelpCircle className="w-4 h-4" />
                  </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
