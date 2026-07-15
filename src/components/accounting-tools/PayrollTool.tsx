import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Coins, ArrowLeft, ArrowRight } from 'lucide-react';

export default function PayrollTool() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  // --- Payroll Calculator State & Logic ---
  const [basicSalary, setBasicSalary] = useState<number>(8000);
  const [allowances, setAllowances] = useState<number>(2000);
  const [taxDeduction, setTaxDeduction] = useState<number>(10); // tax %
  const [insuranceDeduction, setInsuranceDeduction] = useState<number>(11); // insurance %
  const [otherDeductions, setOtherDeductions] = useState<number>(200);

  const calculatePayroll = () => {
    const gross = basicSalary + allowances;
    const taxVal = gross * (taxDeduction / 100);
    const insuranceVal = basicSalary * (insuranceDeduction / 100); // Usually on basic
    const totalDeductions = taxVal + insuranceVal + otherDeductions;
    const net = gross - totalDeductions;

    return {
      gross: parseFloat(gross.toFixed(2)),
      tax: parseFloat(taxVal.toFixed(2)),
      insurance: parseFloat(insuranceVal.toFixed(2)),
      deductions: parseFloat(totalDeductions.toFixed(2)),
      net: parseFloat(net.toFixed(2))
    };
  };

  const payrollResult = calculatePayroll();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
      <div className="lg:col-span-7 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 text-amber-600 rounded-2xl">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-neutral-100">
              {isRtl ? "حاسبة مسير الرواتب والأجور" : "Payroll System Calculator"}
            </h2>
            <p className="text-xs text-slate-400 dark:text-neutral-500 font-bold">
              {isRtl ? "تخمين الراتب الإجمالي ومجموع الاستقطاعات وصافي الراتب المستحق" : "Estimate gross wages, statutory deductions, and final net earnings"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          {/* Basic Salary */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-600 dark:text-neutral-300">
              {isRtl ? "الراتب الأساسي *" : "Basic Salary *"}
            </label>
            <input
              type="number"
              value={basicSalary}
              onChange={(e) => setBasicSalary(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 text-slate-900 dark:text-neutral-100 transition-colors"
            />
          </div>

          {/* Allowances */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-600 dark:text-neutral-300">
              {isRtl ? "البدلات والإضافات" : "Allowances & Bonus"}
            </label>
            <input
              type="number"
              value={allowances}
              onChange={(e) => setAllowances(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 text-slate-900 dark:text-neutral-100 transition-colors"
            />
          </div>

          {/* Tax Deduction Rate */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-600 dark:text-neutral-300">
              {isRtl ? "معدل كسب العمل / ضريبة الدخل (%)" : "Income Tax Rate (%)"}
            </label>
            <input
              type="number"
              value={taxDeduction}
              onChange={(e) => setTaxDeduction(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 text-slate-900 dark:text-neutral-100 transition-colors"
            />
          </div>

          {/* Social Insurance Deduction Rate */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-600 dark:text-neutral-300">
              {isRtl ? "حصة الموظف بالتأمينات الاجتماعية (%)" : "Social Insurance Share (%)"}
            </label>
            <input
              type="number"
              value={insuranceDeduction}
              onChange={(e) => setInsuranceDeduction(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 text-slate-900 dark:text-neutral-100 transition-colors"
            />
          </div>

          {/* Other Deductions */}
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-black text-slate-600 dark:text-neutral-300">
              {isRtl ? "استقطاعات وغرامات أخرى" : "Other Deductions & Penalties"}
            </label>
            <input
              type="number"
              value={otherDeductions}
              onChange={(e) => setOtherDeductions(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 text-slate-900 dark:text-neutral-100 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Payroll Output Results */}
      <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6">
        <h3 className="text-lg font-black text-slate-800 dark:text-neutral-200">
          {isRtl ? "ملخص الرواتب" : "Payroll Calculation Summary"}
        </h3>

        <div className="space-y-4 flex-1 justify-center flex flex-col">
          <div className="flex justify-between items-center py-2.5 border-b border-slate-200/50 dark:border-slate-800/40">
            <span className="text-xs font-bold text-slate-500">{isRtl ? "الراتب الإجمالي قبل الخصم" : "Gross Salary"}</span>
            <span className="text-base font-black text-slate-800 dark:text-white">{payrollResult.gross}</span>
          </div>

          <div className="flex justify-between items-center py-2.5 border-b border-slate-200/50 dark:border-slate-800/40">
            <span className="text-xs font-bold text-slate-500">{isRtl ? "ضريبة كسب العمل المستقطعة" : "Withheld Income Tax"}</span>
            <span className="text-sm font-bold text-rose-500">-{payrollResult.tax}</span>
          </div>

          <div className="flex justify-between items-center py-2.5 border-b border-slate-200/50 dark:border-slate-800/40">
            <span className="text-xs font-bold text-slate-500">{isRtl ? "التأمينات الاجتماعية" : "Social Insurance Cost"}</span>
            <span className="text-sm font-bold text-rose-500">-{payrollResult.insurance}</span>
          </div>

          <div className="flex justify-between items-center py-2.5 border-b border-slate-200/50 dark:border-slate-800/40">
            <span className="text-xs font-bold text-slate-500">{isRtl ? "إجمالي الاستقطاعات" : "Total Deductions"}</span>
            <span className="text-sm font-black text-rose-600">-{payrollResult.deductions}</span>
          </div>

          <div className="flex justify-between items-center py-4">
            <span className="text-sm font-black text-slate-800 dark:text-white">{isRtl ? "صافي الراتب المستحق" : "Net Take-Home Salary"}</span>
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{payrollResult.net}</span>
          </div>
        </div>

        <a
          href={`https://wa.me/201208538580?text=${encodeURIComponent(
            isRtl 
              ? `مرحباً، أود الحصول على استشارة مهنية أو عرض سعر لخدمة إعداد الرواتب والملف التأميني لشركتي.`
              : `Hi, I would like to get a proposal or consulting session on employee payroll and social security system setup.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-black py-3.5 px-5 rounded-2xl text-[13px] transition-all duration-200 text-center flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-500/10"
        >
          <span>{isRtl ? "طلب إدارة كشوف الرواتب" : "Outsource Payroll Management"}</span>
          {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </a>
      </div>
    </div>
  );
}
