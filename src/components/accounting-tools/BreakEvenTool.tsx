import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Scale, ArrowLeft, ArrowRight } from 'lucide-react';

export default function BreakEvenTool() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  // --- Break-even Calculator State & Logic ---
  const [fixedCosts, setFixedCosts] = useState<number>(30000);
  const [sellingPrice, setSellingPrice] = useState<number>(150); // per unit
  const [variableCost, setVariableCost] = useState<number>(90); // per unit

  const calculateBreakEven = () => {
    const contributionMargin = sellingPrice - variableCost;
    const units = contributionMargin > 0 ? fixedCosts / contributionMargin : 0;
    const salesValue = units * sellingPrice;

    return {
      margin: parseFloat(contributionMargin.toFixed(2)),
      units: parseFloat(Math.ceil(units).toFixed(2)),
      salesValue: parseFloat(salesValue.toFixed(2))
    };
  };

  const breakevenResult = calculateBreakEven();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
      <div className="lg:col-span-7 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 rounded-2xl">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-neutral-100">
              {isRtl ? "حاسبة وتحليل نقطة التعادل" : "Break-even Analysis Tool"}
            </h2>
            <p className="text-xs text-slate-400 dark:text-neutral-500 font-bold">
              {isRtl ? "معرفة حجم المبيعات المطلوب لتغطية التكاليف الثابتة والمتغيرة" : "Determine the sales volume needed to completely cover fixed and variable expenses"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          {/* Fixed Costs */}
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-black text-slate-600 dark:text-neutral-300">
              {isRtl ? "التكاليف الثابتة الإجمالية (إيجار، أجور ثابتة، إلخ) *" : "Total Fixed Expenses (rent, fixed wages, etc) *"}
            </label>
            <input
              type="number"
              value={fixedCosts}
              onChange={(e) => setFixedCosts(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-neutral-100 transition-colors"
            />
          </div>

          {/* Selling Price per unit */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-600 dark:text-neutral-300">
              {isRtl ? "سعر بيع الوحدة الواحدة *" : "Selling Price Per Unit *"}
            </label>
            <input
              type="number"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-neutral-100 transition-colors"
            />
          </div>

          {/* Variable Cost per unit */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-600 dark:text-neutral-300">
              {isRtl ? "التكلفة المتغيرة للوحدة الواحدة *" : "Variable Cost Per Unit *"}
            </label>
            <input
              type="number"
              value={variableCost}
              onChange={(e) => setVariableCost(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-neutral-100 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Break-even Outputs */}
      <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6">
        <h3 className="text-lg font-black text-slate-800 dark:text-neutral-200">
          {isRtl ? "تحليل التعادل" : "Break-even Summary"}
        </h3>

        <div className="space-y-4 flex-1 justify-center flex flex-col">
          <div className="flex justify-between items-center py-2.5 border-b border-slate-200/50 dark:border-slate-800/40">
            <span className="text-xs font-bold text-slate-500">{isRtl ? "هامش المساهمة للوحدة" : "Unit Contribution Margin"}</span>
            <span className="text-base font-black text-indigo-600 dark:text-indigo-400">{breakevenResult.margin}</span>
          </div>

          <div className="flex justify-between items-center py-2.5 border-b border-slate-200/50 dark:border-slate-800/40">
            <span className="text-xs font-bold text-slate-500">{isRtl ? "كمية التعادل (بالوحدات)" : "Break-even Sales Units"}</span>
            <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">{breakevenResult.units} {isRtl ? "وحدة" : "Units"}</span>
          </div>

          <div className="flex justify-between items-center py-4">
            <span className="text-sm font-black text-slate-800 dark:text-white">{isRtl ? "قيمة مبيعات التعادل" : "Break-even Revenue Value"}</span>
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{breakevenResult.salesValue}</span>
          </div>
        </div>

        <a
          href={`https://wa.me/201208538580?text=${encodeURIComponent(
            isRtl 
              ? `مرحباً، أود الحصول على استشارة مالية بخصوص دراسات الجدوى، هيكلة التكاليف ونقطة التعادل لمشروعي الجديد.`
              : `Hi, I used the Break-even analysis tool. I'm interested in professional cost management & feasibility consulting services for my startup.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-black py-3.5 px-5 rounded-2xl text-[13px] transition-all duration-200 text-center flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-500/10"
        >
          <span>{isRtl ? "طلب استشارة تخطيط وتكاليف" : "Outsource Cost Accounting Setup"}</span>
          {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </a>
      </div>
    </div>
  );
}
