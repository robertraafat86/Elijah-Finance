import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingDown } from 'lucide-react';

export default function DepreciationTool() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  // --- Depreciation Calculator State & Logic ---
  const [assetCost, setAssetCost] = useState<number>(50000);
  const [salvageValue, setSalvageValue] = useState<number>(5000);
  const [usefulLife, setUsefulLife] = useState<number>(5); // years
  const [deprMethod, setDeprMethod] = useState<'straight' | 'double_declining'>('straight');

  const calculateDepreciation = () => {
    const depreciableCost = assetCost - salvageValue;
    const schedule: Array<{ year: number; expense: number; accumDepr: number; bookValue: number }> = [];

    if (deprMethod === 'straight') {
      const annualExpense = usefulLife > 0 ? depreciableCost / usefulLife : 0;
      let accum = 0;
      for (let i = 1; i <= usefulLife; i++) {
        accum += annualExpense;
        schedule.push({
          year: i,
          expense: parseFloat(annualExpense.toFixed(2)),
          accumDepr: parseFloat(accum.toFixed(2)),
          bookValue: parseFloat(Math.max(salvageValue, assetCost - accum).toFixed(2))
        });
      }
    } else {
      // Double Declining Balance
      const straightLineRate = usefulLife > 0 ? 1 / usefulLife : 0;
      const doubleRate = straightLineRate * 2;
      let currentBookValue = assetCost;
      let accum = 0;

      for (let i = 1; i <= usefulLife; i++) {
        let expense = currentBookValue * doubleRate;
        // Make sure we don't depreciate below salvage value
        if (currentBookValue - expense < salvageValue) {
          expense = currentBookValue - salvageValue;
        }
        if (expense < 0) expense = 0;
        
        accum += expense;
        currentBookValue -= expense;

        schedule.push({
          year: i,
          expense: parseFloat(expense.toFixed(2)),
          accumDepr: parseFloat(accum.toFixed(2)),
          bookValue: parseFloat(currentBookValue.toFixed(2))
        });
      }
    }

    return {
      annual: schedule[0]?.expense || 0,
      monthly: parseFloat(((schedule[0]?.expense || 0) / 12).toFixed(2)),
      schedule
    };
  };

  const deprResult = calculateDepreciation();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
      <div className="lg:col-span-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-violet-50 dark:bg-violet-950/40 text-violet-600 rounded-2xl">
            <TrendingDown className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-neutral-100">
              {isRtl ? "حاسبة الإهلاك المحاسبي للأصول" : "Asset Depreciation Calculator"}
            </h2>
            <p className="text-xs text-slate-400 dark:text-neutral-500 font-bold">
              {isRtl ? "حساب توزيع تكلفة الأصول الثابتة على مدار عمرها الإنتاجي" : "Calculate the systematic allocation of asset costs over its useful life"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          {/* Asset Cost */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-600 dark:text-neutral-300">
              {isRtl ? "تكلفة الأصل الإجمالية *" : "Asset Original Cost *"}
            </label>
            <input
              type="number"
              value={assetCost}
              onChange={(e) => setAssetCost(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500 text-slate-900 dark:text-neutral-100 transition-colors"
            />
          </div>

          {/* Salvage Value */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-600 dark:text-neutral-300">
              {isRtl ? "القيمة التخريدية (الخردة)" : "Salvage / Scrap Value"}
            </label>
            <input
              type="number"
              value={salvageValue}
              onChange={(e) => setSalvageValue(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500 text-slate-900 dark:text-neutral-100 transition-colors"
            />
          </div>

          {/* Useful Life */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-600 dark:text-neutral-300">
              {isRtl ? "العمر الإنتاجي (بالسنوات) *" : "Useful Life (Years) *"}
            </label>
            <input
              type="number"
              value={usefulLife}
              onChange={(e) => setUsefulLife(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500 text-slate-900 dark:text-neutral-100 transition-colors"
            />
          </div>

          {/* Method Choice */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-600 dark:text-neutral-300">
              {isRtl ? "طريقة الإهلاك المحتسبة" : "Depreciation Method"}
            </label>
            <select
              value={deprMethod}
              onChange={(e: any) => setDeprMethod(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500 text-slate-900 dark:text-neutral-100 transition-colors"
            >
              <option value="straight">{isRtl ? "القسط الثابت (Straight Line)" : "Straight Line Method"}</option>
              <option value="double_declining">{isRtl ? "القسط المتناقص المضاعف (DDB)" : "Double Declining Balance"}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Depreciation Outputs */}
      <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6">
        <div>
          <h3 className="text-lg font-black text-slate-800 dark:text-neutral-200 mb-4">
            {isRtl ? "جدول الإهلاك المتوقع" : "Depreciation Projection Schedule"}
          </h3>

          <div className="max-h-[180px] overflow-y-auto border border-slate-200/50 dark:border-slate-800/40 rounded-2xl bg-white dark:bg-slate-900">
            <table className="w-full text-xs text-left rtl:text-right">
              <thead className="bg-slate-50 dark:bg-slate-950 font-black text-slate-700 dark:text-neutral-300 border-b border-slate-150 dark:border-slate-800">
                <tr>
                  <th className="px-4 py-2 text-center">{isRtl ? "السنة" : "Yr"}</th>
                  <th className="px-4 py-2">{isRtl ? "القسط السنوي" : "Expense"}</th>
                  <th className="px-4 py-2">{isRtl ? "مجمع الإهلاك" : "Accum. Depr"}</th>
                  <th className="px-4 py-2">{isRtl ? "القيمة الدفترية" : "Book Value"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium text-slate-600 dark:text-neutral-400">
                {deprResult.schedule.map((row) => (
                  <tr key={row.year} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/40 transition-colors">
                    <td className="px-4 py-1.5 text-center font-black text-slate-800 dark:text-neutral-300">{row.year}</td>
                    <td className="px-4 py-1.5 text-rose-500 font-bold">{row.expense}</td>
                    <td className="px-4 py-1.5">{row.accumDepr}</td>
                    <td className="px-4 py-1.5 font-bold text-slate-800 dark:text-white">{row.bookValue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-200/50 dark:border-slate-800">
          <div className="flex justify-between items-center text-sm">
            <span className="font-bold text-slate-500">{isRtl ? "قسط السنة الأولى السنوي:" : "First Year Annual Expense:"}</span>
            <span className="text-base font-black text-rose-600">{deprResult.annual}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="font-bold text-slate-500">{isRtl ? "القسط الشهري التقريبي:" : "Approximate Monthly Expense:"}</span>
            <span className="text-base font-black text-rose-500">{deprResult.monthly}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
