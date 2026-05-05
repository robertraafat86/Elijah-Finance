import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Calculator, 
  RefreshCcw, 
  ArrowLeft, 
  Info,
  DollarSign,
  Percent,
  ArrowRight
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function VATCalculator() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  
  const [amount, setAmount] = useState<string>('');
  const [isInclusive, setIsInclusive] = useState<boolean>(false);
  const [rate, setRate] = useState<string>('14');
  const [results, setResults] = useState<{
    vatAmount: number;
    amountBeforeVat: number;
    totalAmount: number;
  } | null>(null);

  const calculateVAT = () => {
    const numAmount = parseFloat(amount);
    const numRate = parseFloat(rate);

    if (isNaN(numAmount) || isNaN(numRate)) return;

    let vatAmount = 0;
    let amountBeforeVat = 0;
    let totalAmount = 0;

    if (!isInclusive) {
      vatAmount = numAmount * (numRate / 100);
      amountBeforeVat = numAmount;
      totalAmount = numAmount + vatAmount;
    } else {
      vatAmount = numAmount * (numRate / (100 + numRate));
      amountBeforeVat = numAmount - vatAmount;
      totalAmount = numAmount;
    }

    setResults({
      vatAmount,
      amountBeforeVat,
      totalAmount
    });
  };

  const reset = () => {
    setAmount('');
    setIsInclusive(false);
    setRate('14');
    setResults(null);
  };

  const formatCurrency = (val: number) => {
    return val.toLocaleString(isRtl ? 'ar-EG' : 'en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    }) + ' ' + t('vat_calculator.currency');
  };

  return (
    <section className="section-padding bg-secondary" id="vat-calculator">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">{t('vat_calculator.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('vat_calculator.desc')}
          </p>
        </div>

        <div className={cn("max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start", isRtl ? "text-right" : "text-left")}>
          {/* Calculator Form */}
          <motion.div 
            initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 space-y-6"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary block">{t('vat_calculator.amount_label')}</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder={t('vat_calculator.amount_placeholder')}
                    className={cn(
                      "w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all outline-none",
                      isRtl ? "pr-4 pl-12" : "pl-4 pr-12"
                    )}
                  />
                  <DollarSign className={cn("absolute top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5", isRtl ? "left-4" : "right-4")} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setIsInclusive(false)}
                  className={`p-4 rounded-2xl font-bold text-sm transition-all border-2 ${!isInclusive ? 'bg-primary text-white border-primary' : 'bg-white text-gray-500 border-gray-100 hover:border-primary/20'}`}
                >
                  {t('vat_calculator.excl_vat')}
                </button>
                <button 
                  onClick={() => setIsInclusive(true)}
                  className={`p-4 rounded-2xl font-bold text-sm transition-all border-2 ${isInclusive ? 'bg-primary text-white border-primary' : 'bg-white text-gray-500 border-gray-100 hover:border-primary/20'}`}
                >
                  {t('vat_calculator.incl_vat')}
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-primary block">{t('vat_calculator.rate_label')}</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    className={cn(
                      "w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all outline-none",
                      isRtl ? "pr-4 pl-12" : "pl-4 pr-12"
                    )}
                  />
                  <Percent className={cn("absolute top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5", isRtl ? "left-4" : "right-4")} />
                </div>
                <p className="text-[10px] text-gray-400">{t('vat_calculator.default_rate')}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={calculateVAT}
                className="flex-grow bg-accent text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                {t('vat_calculator.calculate')}
              </button>
              <button 
                onClick={reset}
                className="p-4 bg-gray-100 text-gray-500 rounded-2xl hover:bg-gray-200 transition-all"
                title={t('vat_calculator.reset')}
              >
                <RefreshCcw className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          {/* Results Display */}
          <div className="space-y-6">
            {results ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-primary text-white p-8 rounded-[2rem] shadow-2xl relative overflow-hidden"
              >
                <div className={cn("absolute top-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2", isRtl ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2")}></div>
                <h3 className="text-xl font-bold mb-8 relative z-10">{t('vat_calculator.results_title')}</h3>
                
                <div className="space-y-6 relative z-10">
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-gray-400">{t('vat_calculator.vat_amount')}</span>
                    <span className="text-2xl font-bold text-accent">{formatCurrency(results.vatAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                    <span className="text-gray-400">{t('vat_calculator.before_vat')}</span>
                    <span className="text-xl font-bold">{formatCurrency(results.amountBeforeVat)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-gray-400">{t('vat_calculator.total_amount')}</span>
                    <span className="text-3xl font-black">{formatCurrency(results.totalAmount)}</span>
                  </div>
                </div>

                <div className="mt-8 flex items-start gap-2 text-[10px] text-gray-400 bg-black/20 p-3 rounded-xl">
                  <Info className="w-4 h-4 shrink-0" />
                  <p>{t('vat_calculator.disclaimer')}</p>
                </div>
              </motion.div>
            ) : (
              <div className="h-full min-h-[300px] bg-white/50 border-2 border-dashed border-gray-200 rounded-[2rem] flex flex-col items-center justify-center text-center p-8 text-gray-400">
                <Calculator className="w-16 h-16 mb-4 opacity-20" />
                <p className="font-bold">{t('vat_calculator.empty_state')}</p>
              </div>
            )}

            {/* CTA Card */}
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
              <h4 className="text-lg font-bold text-primary">{t('vat_calculator.cta_title')}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">
                {t('vat_calculator.cta_desc')}
              </p>
              <Link 
                to="/contact"
                className="flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all"
              >
                {t('vat_calculator.cta_button')}
                {isRtl ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
