import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Coins, ArrowLeft, ArrowRight } from 'lucide-react';

export default function LoanTool() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  // --- Loan Calculator State & Logic ---
  const [loanPrincipal, setLoanPrincipal] = useState<number>(100000);
  const [loanRate, setLoanRate] = useState<number>(10); // annual rate %
  const [loanTerm, setLoanTerm] = useState<number>(24); // months

  const calculateLoan = () => {
    const monthlyRate = (loanRate / 100) / 12;
    let monthlyPayment = 0;
    
    if (monthlyRate === 0) {
      monthlyPayment = loanTerm > 0 ? loanPrincipal / loanTerm : 0;
    } else {
      monthlyPayment = loanTerm > 0 
        ? (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / (Math.pow(1 + monthlyRate, loanTerm) - 1)
        : 0;
    }

    const totalPaid = monthlyPayment * loanTerm;
    const totalInterest = totalPaid - loanPrincipal;

    return {
      installment: parseFloat(monthlyPayment.toFixed(2)),
      totalInterest: parseFloat(Math.max(0, totalInterest).toFixed(2)),
      totalPaid: parseFloat(Math.max(loanPrincipal, totalPaid).toFixed(2))
    };
  };

  const loanResult = calculateLoan();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
      <div className="lg:col-span-7 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-teal-50 dark:bg-teal-950/40 text-teal-600 rounded-2xl">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-neutral-100">
              {isRtl ? "حاسبة تمويل وقروض المشروعات" : "Business Loan & Debt Calculator"}
            </h2>
            <p className="text-xs text-slate-400 dark:text-neutral-500 font-bold">
              {isRtl ? "حساب الأقساط الشهرية والفوائد المتراكمة على التسهيلات البنكية" : "Calculate monthly amortized payments and total interest payload"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          {/* Loan Principal */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-600 dark:text-neutral-300">
              {isRtl ? "مبلغ التمويل / أصل القرض *" : "Loan Principal Amount *"}
            </label>
            <input
              type="number"
              value={loanPrincipal}
              onChange={(e) => setLoanPrincipal(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 text-slate-900 dark:text-neutral-100 transition-colors"
            />
          </div>

          {/* Annual Interest Rate */}
          <div className="space-y-1.5">
            <label className="text-xs font-black text-slate-600 dark:text-neutral-300">
              {isRtl ? "معدل الفائدة السنوي (%) *" : "Annual Interest Rate (%) *"}
            </label>
            <input
              type="number"
              value={loanRate}
              onChange={(e) => setLoanRate(Math.max(0, parseFloat(e.target.value) || 0))}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 text-slate-900 dark:text-neutral-100 transition-colors"
            />
          </div>

          {/* Loan Term (months) */}
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-black text-slate-600 dark:text-neutral-300">
              {isRtl ? "مدة السداد (بالأشهر) *" : "Repayment Period (Months) *"}
            </label>
            <input
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal-500 text-slate-900 dark:text-neutral-100 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Loan Outputs */}
      <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6">
        <h3 className="text-lg font-black text-slate-800 dark:text-neutral-200">
          {isRtl ? "تحليل أقساط القرض" : "Loan Payment Breakdown"}
        </h3>

        <div className="space-y-4 flex-1 justify-center flex flex-col">
          <div className="flex justify-between items-center py-2.5 border-b border-slate-200/50 dark:border-slate-800/40">
            <span className="text-xs font-bold text-slate-500">{isRtl ? "أصل القرض الممول" : "Principal Financed"}</span>
            <span className="text-base font-black text-slate-800 dark:text-white">{loanPrincipal}</span>
          </div>

          <div className="flex justify-between items-center py-2.5 border-b border-slate-200/50 dark:border-slate-800/40">
            <span className="text-xs font-bold text-slate-500">{isRtl ? "إجمالي الفوائد المتراكمة" : "Total Interest Payable"}</span>
            <span className="text-sm font-bold text-rose-500">+{loanResult.totalInterest}</span>
          </div>

          <div className="flex justify-between items-center py-2.5 border-b border-slate-200/50 dark:border-slate-800/40">
            <span className="text-xs font-bold text-slate-500">{isRtl ? "إجمالي مبلغ السداد" : "Total Debt Amortization"}</span>
            <span className="text-base font-black text-slate-800 dark:text-white">{loanResult.totalPaid}</span>
          </div>

          <div className="flex justify-between items-center py-4">
            <span className="text-sm font-black text-slate-800 dark:text-white">{isRtl ? "القسط الشهري المستحق" : "Monthly Installment"}</span>
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{loanResult.installment}</span>
          </div>
        </div>

        <a
          href={`https://wa.me/201208538580?text=${encodeURIComponent(
            isRtl 
              ? `مرحباً، قمت باستخدام حاسبة القروض والفوائد، مبلغ التمويل: ${loanPrincipal} لفترة ${loanTerm} شهر وفائدة ${loanRate}%. أود الحصول على استشارة بخصوص الجدوى المالية لمشروعي.`
              : `Hi, I used the loan interest calculator for ${loanPrincipal} over ${loanTerm} months at ${loanRate}%. I would like to consult on the financial feasibility of my project.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-black py-3.5 px-5 rounded-2xl text-[13px] transition-all duration-200 text-center flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-500/10"
        >
          <span>{isRtl ? "استشارة دراسة الجدوى" : "Request Feasibility Study Support"}</span>
          {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </a>
      </div>
    </div>
  );
}
