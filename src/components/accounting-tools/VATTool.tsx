import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Percent, ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function VATTool() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  // --- VAT Calculator State & Logic ---
  const [vatAmount, setVatAmount] = useState<number>(1000);
  const [vatRate, setVatRate] = useState<number>(14); // 14% is standard in Egypt
  const [isInclusive, setIsInclusive] = useState<boolean>(false);

  const calculateVat = () => {
    const rate = vatRate / 100;
    let net = 0;
    let vat = 0;
    let gross = 0;

    if (isInclusive) {
      gross = vatAmount;
      net = gross / (1 + rate);
      vat = gross - net;
    } else {
      net = vatAmount;
      vat = net * rate;
      gross = net + vat;
    }

    return {
      net: parseFloat(net.toFixed(2)),
      vat: parseFloat(vat.toFixed(2)),
      gross: parseFloat(gross.toFixed(2))
    };
  };

  const vatResult = calculateVat();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
      <div className="lg:col-span-7 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 rounded-2xl">
            <Percent className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-neutral-100">
              {isRtl ? "حاسبة ضريبة القيمة المضافة (VAT)" : "Value Added Tax (VAT) Calculator"}
            </h2>
            <p className="text-xs text-slate-400 dark:text-neutral-500 font-bold">
              {isRtl ? "حساب الضريبة المضافة أو فصلها عن القيمة الكلية" : "Calculate added tax or extract it from gross totals"}
            </p>
          </div>
        </div>

        <div className="space-y-4 pt-4">
          {/* Amount Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-600 dark:text-neutral-300">
              {isRtl ? "المبلغ الأساسي (الصافي أو الإجمالي) *" : "Base Amount (Net or Gross) *"}
            </label>
            <input
              type="number"
              value={vatAmount}
              onChange={(e) => setVatAmount(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-neutral-100 transition-colors"
            />
          </div>

          {/* Tax Rate Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-600 dark:text-neutral-300">
              {isRtl ? "معدل ضريبة القيمة المضافة (%) *" : "VAT Rate (%) *"}
            </label>
            <input
              type="number"
              value={vatRate}
              onChange={(e) => setVatRate(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 text-slate-900 dark:text-neutral-100 transition-colors"
            />
          </div>

          {/* Toggle Inclusive vs Exclusive */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => setIsInclusive(false)}
              className={cn(
                "flex-1 py-2.5 px-4 rounded-xl text-xs font-black transition-all cursor-pointer border text-center",
                !isInclusive
                  ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 border-indigo-200"
                  : "bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-neutral-400 border-transparent hover:bg-slate-100"
              )}
            >
              {isRtl ? "المبلغ غير شامل الضريبة (Exclusive)" : "Amount is VAT Exclusive"}
            </button>
            <button
              onClick={() => setIsInclusive(true)}
              className={cn(
                "flex-1 py-2.5 px-4 rounded-xl text-xs font-black transition-all cursor-pointer border text-center",
                isInclusive
                  ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 border-indigo-200"
                  : "bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-neutral-400 border-transparent hover:bg-slate-100"
              )}
            >
              {isRtl ? "المبلغ شامل الضريبة (Inclusive)" : "Amount is VAT Inclusive"}
            </button>
          </div>
        </div>
      </div>

      {/* VAT Output Results */}
      <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6">
        <h3 className="text-lg font-black text-slate-800 dark:text-neutral-200">
          {isRtl ? "تفاصيل احتساب الضريبة" : "VAT Breakdown Details"}
        </h3>

        <div className="space-y-4 flex-1 justify-center flex flex-col">
          <div className="flex justify-between items-center py-2.5 border-b border-slate-200/50 dark:border-slate-800/40">
            <span className="text-xs font-bold text-slate-500">{isRtl ? "المبلغ الصافي (قبل الضريبة)" : "Net Amount (Pre-Tax)"}</span>
            <span className="text-base font-black text-slate-800 dark:text-white">{vatResult.net}</span>
          </div>

          <div className="flex justify-between items-center py-2.5 border-b border-slate-200/50 dark:border-slate-800/40">
            <span className="text-xs font-bold text-slate-500">{isRtl ? "قيمة الضريبة" : "VAT Amount"} ({vatRate}%)</span>
            <span className="text-base font-black text-indigo-600 dark:text-indigo-400">+{vatResult.vat}</span>
          </div>

          <div className="flex justify-between items-center py-4">
            <span className="text-sm font-black text-slate-800 dark:text-white">{isRtl ? "المبلغ الإجمالي (شامل الضريبة)" : "Gross Amount (With VAT)"}</span>
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{vatResult.gross}</span>
          </div>
        </div>

        <a
          href={`https://wa.me/201208538580?text=${encodeURIComponent(
            isRtl 
              ? `مرحباً، قمت باستخدام حاسبة القيمة المضافة: المبلغ الأساسي: ${vatAmount} بمعدل ${vatRate}%. الصافي: ${vatResult.net}، قيمة الضريبة: ${vatResult.vat}، الإجمالي: ${vatResult.gross}. أود الاستفسار عن كفاءة الخدمات الضريبية.`
              : `Hi, I used the VAT calculator. Base: ${vatAmount} at ${vatRate}%. Net: ${vatResult.net}, Tax: ${vatResult.vat}, Total: ${vatResult.gross}. I want to inquire about tax compliance services.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-black py-3.5 px-5 rounded-2xl text-[13px] transition-all duration-200 text-center flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-500/10"
        >
          <span>{isRtl ? "استشر خبيراً بخصوص الضرائب" : "Consult a Tax Expert"}</span>
          {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </a>
      </div>
    </div>
  );
}
