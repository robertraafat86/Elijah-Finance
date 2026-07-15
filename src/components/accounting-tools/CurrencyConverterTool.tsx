import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { RefreshCw, ArrowLeftRight, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Currency {
  code: string;
  nameAr: string;
  nameEn: string;
  symbol: string;
}

const CURRENCIES: Currency[] = [
  { code: 'USD', nameAr: 'دولار أمريكي', nameEn: 'US Dollar', symbol: '$' },
  { code: 'EGP', nameAr: 'جنيه مصري', nameEn: 'Egyptian Pound', symbol: 'ج.م' },
  { code: 'EUR', nameAr: 'يورو', nameEn: 'Euro', symbol: '€' },
  { code: 'GBP', nameAr: 'جنيه إسترليني', nameEn: 'British Pound', symbol: '£' },
  { code: 'SAR', nameAr: 'ريال سعودي', nameEn: 'Saudi Riyal', symbol: 'ر.س' },
  { code: 'AED', nameAr: 'درهم إماراتي', nameEn: 'UAE Dirham', symbol: 'د.إ' },
  { code: 'KWD', nameAr: 'دينار كويتي', nameEn: 'Kuwaiti Dinar', symbol: 'د.ك' },
  { code: 'QAR', nameAr: 'ريال قطري', nameEn: 'Qatari Riyal', symbol: 'ر.ق' },
];

// Reliable fallback exchange rates relative to USD (approximate current rates)
const FALLBACK_RATES: Record<string, number> = {
  USD: 1,
  EGP: 48.25,
  EUR: 0.92,
  GBP: 0.78,
  SAR: 3.75,
  AED: 3.67,
  KWD: 0.31,
  QAR: 3.64,
};

export default function CurrencyConverterTool() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EGP');
  const [rates, setRates] = useState<Record<string, number>>(FALLBACK_RATES);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // Fetch exchange rates from free open API
  const fetchRates = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      if (res.ok) {
        const data = await res.json();
        if (data && data.rates) {
          // Keep only the currencies we support
          const updatedRates: Record<string, number> = {};
          CURRENCIES.forEach(c => {
            if (data.rates[c.code]) {
              updatedRates[c.code] = data.rates[c.code];
            } else {
              updatedRates[c.code] = FALLBACK_RATES[c.code];
            }
          });
          setRates(updatedRates);
          
          const date = new Date(data.time_last_update_utc);
          setLastUpdated(date.toLocaleTimeString(isRtl ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' }));
        }
      }
    } catch (error) {
      console.warn("Failed to fetch live exchange rates, using local fallback.", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const getConversion = () => {
    // Convert to USD first (base of rates), then to Target currency
    const rateFrom = rates[fromCurrency] || FALLBACK_RATES[fromCurrency];
    const rateTo = rates[toCurrency] || FALLBACK_RATES[toCurrency];
    
    const amountInUSD = amount / rateFrom;
    const finalAmount = amountInUSD * rateTo;
    const singleUnitRate = (1 / rateFrom) * rateTo;

    return {
      result: parseFloat(finalAmount.toFixed(4)),
      rate: parseFloat(singleUnitRate.toFixed(4)),
    };
  };

  const conversionResult = getConversion();
  const fromCurrencyObj = CURRENCIES.find(c => c.code === fromCurrency);
  const toCurrencyObj = CURRENCIES.find(c => c.code === toCurrency);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
      <div className="lg:col-span-7 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-violet-50 dark:bg-violet-950/40 text-violet-600 rounded-2xl">
              <ArrowLeftRight className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-neutral-100">
                {isRtl ? "محول العملات المالي" : "Financial Currency Converter"}
              </h2>
              <p className="text-xs text-slate-400 dark:text-neutral-500 font-bold">
                {isRtl ? "تحويل فوري بأسعار حية ومحدثة للعملات الرئيسية" : "Instant conversion with live rates for major global currencies"}
              </p>
            </div>
          </div>

          <button
            onClick={fetchRates}
            disabled={loading}
            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 rounded-xl transition-all cursor-pointer border-none bg-transparent"
            title={isRtl ? "تحديث الأسعار" : "Refresh Rates"}
          >
            <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
          </button>
        </div>

        <div className="space-y-4 pt-4">
          {/* Amount */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-600 dark:text-neutral-300">
              {isRtl ? "المبلغ المراد تحويله *" : "Amount to Convert *"}
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500 text-slate-900 dark:text-neutral-100 transition-colors"
            />
          </div>

          {/* Currencies selectors with Swap Button */}
          <div className="grid grid-cols-1 sm:grid-cols-9 gap-3 items-center">
            {/* From */}
            <div className="sm:col-span-4 space-y-1.5">
              <label className="text-xs font-black text-slate-600 dark:text-neutral-300">
                {isRtl ? "من عملة" : "From Currency"}
              </label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500 text-slate-900 dark:text-neutral-100 transition-colors"
              >
                {CURRENCIES.map(c => (
                  <option key={c.code} value={c.code}>
                    {c.code} - {isRtl ? c.nameAr : c.nameEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Swap button wrapper */}
            <div className="sm:col-span-1 flex justify-center pt-5">
              <button
                type="button"
                onClick={handleSwap}
                className="p-3 bg-violet-50 hover:bg-violet-100 dark:bg-violet-950/40 dark:hover:bg-violet-900/60 rounded-xl text-violet-600 transition-all cursor-pointer border border-violet-100/40"
              >
                <ArrowLeftRight className="w-4 h-4 rotate-90 sm:rotate-0" />
              </button>
            </div>

            {/* To */}
            <div className="sm:col-span-4 space-y-1.5">
              <label className="text-xs font-black text-slate-600 dark:text-neutral-300">
                {isRtl ? "إلى عملة" : "To Currency"}
              </label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500 text-slate-900 dark:text-neutral-100 transition-colors"
              >
                {CURRENCIES.map(c => (
                  <option key={c.code} value={c.code}>
                    {c.code} - {isRtl ? c.nameAr : c.nameEn}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6">
        <div>
          <h3 className="text-lg font-black text-slate-800 dark:text-neutral-200 mb-1">
            {isRtl ? "النتيجة التقريبية للتحويل" : "Estimated Conversion Result"}
          </h3>
          <p className="text-[10px] text-slate-400 font-bold">
            {lastUpdated 
              ? (isRtl ? `آخر تحديث لأسعار الصرف: اليوم الساعة ${lastUpdated}` : `Rates last updated: Today at ${lastUpdated} UTC`)
              : (isRtl ? "يتم استخدام أسعار الصرف التقريبية الحالية" : "Utilizing real-time approximation indices")}
          </p>
        </div>

        <div className="space-y-4 flex-1 justify-center flex flex-col">
          <div className="text-center py-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800/80 shadow-xs">
            <span className="block text-xs font-bold text-slate-400 mb-1">
              {amount} {isRtl ? fromCurrencyObj?.nameAr : fromCurrencyObj?.nameEn} =
            </span>
            <span className="text-3xl md:text-4xl font-black text-violet-600 dark:text-violet-400 block tracking-tight">
              {conversionResult.result.toLocaleString(isRtl ? 'ar-EG' : 'en-US')} {toCurrencyObj?.symbol}
            </span>
          </div>

          <div className="flex justify-between items-center py-2 px-1 border-b border-slate-200/50 dark:border-slate-800/40">
            <span className="text-xs font-bold text-slate-500">{isRtl ? "سعر الصرف المباشر" : "Direct Rate"}</span>
            <span className="text-xs font-mono font-black text-slate-800 dark:text-white">
              1 {fromCurrency} = {conversionResult.rate} {toCurrency}
            </span>
          </div>
        </div>

        <a
          href={`https://wa.me/201208538580?text=${encodeURIComponent(
            isRtl 
              ? `مرحباً، قمت باستخدام حاسبة محول العملات: تحويل ${amount} ${fromCurrency} إلى ${toCurrency}. النتيجة: ${conversionResult.result} ${toCurrency}. أود الاستفسار عن كفاءة الخدمات المالية الدولية والتحوط.`
              : `Hi, I used the Currency Converter. Converting ${amount} ${fromCurrency} to ${toCurrency}. Result: ${conversionResult.result}. I'd like to ask about international financial consulting services.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-black py-3.5 px-5 rounded-2xl text-[13px] transition-all duration-200 text-center flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-500/10 no-underline"
        >
          <span>{isRtl ? "استشر مستشاراً مالياً" : "Consult a Financial Advisor"}</span>
        </a>
      </div>
    </div>
  );
}
