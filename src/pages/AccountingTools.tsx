import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import {
  Calculator,
  Percent,
  Coins,
  Scale,
  TrendingDown,
  DollarSign,
  ArrowLeftRight,
  ChevronDown
} from 'lucide-react';
import { cn } from '../lib/utils';

// Import modular sub-components for the calculators
import VATTool from '../components/accounting-tools/VATTool';
import PayrollTool from '../components/accounting-tools/PayrollTool';
import DepreciationTool from '../components/accounting-tools/DepreciationTool';
import LoanTool from '../components/accounting-tools/LoanTool';
import BreakEvenTool from '../components/accounting-tools/BreakEvenTool';
import CurrencyConverterTool from '../components/accounting-tools/CurrencyConverterTool';

interface ToolItem {
  id: string;
  icon: React.ReactNode;
  bgGrad: string;
  iconColor: string;
  borderColor: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  component: React.ReactNode;
}

export default function AccountingTools() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  // Create refs to easily scroll to any specific tool card from the top menu
  const vatRef = useRef<HTMLDivElement>(null);
  const payrollRef = useRef<HTMLDivElement>(null);
  const depreciationRef = useRef<HTMLDivElement>(null);
  const loanRef = useRef<HTMLDivElement>(null);
  const breakevenRef = useRef<HTMLDivElement>(null);
  const currencyRef = useRef<HTMLDivElement>(null);

  const getRef = (id: string) => {
    switch (id) {
      case 'vat': return vatRef;
      case 'payroll': return payrollRef;
      case 'depreciation': return depreciationRef;
      case 'loan': return loanRef;
      case 'breakeven': return breakevenRef;
      case 'currency': return currencyRef;
      default: return null;
    }
  };

  const scrollToRef = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const toolsData: ToolItem[] = [
    {
      id: 'vat',
      icon: <Percent className="w-5 h-5" />,
      bgGrad: "from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20",
      iconColor: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40",
      borderColor: "border-blue-100 dark:border-blue-900/40",
      titleAr: "حاسبة ضريبة القيمة المضافة",
      titleEn: "VAT Calculator",
      descAr: "حساب ضريبة القيمة المضافة أو فصلها عن القيمة الكلية بدقة للمبيعات والمشتريات.",
      descEn: "Easily calculate added tax or extract it from gross totals for sales and purchases.",
      component: <VATTool />
    },
    {
      id: 'payroll',
      icon: <Coins className="w-5 h-5" />,
      bgGrad: "from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20",
      iconColor: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40",
      borderColor: "border-amber-100 dark:border-amber-900/40",
      titleAr: "حاسبة الرواتب والأجور",
      titleEn: "Payroll Calculator",
      descAr: "تخمين الراتب الإجمالي ومجموع الاستقطاعات التأمينية والضريبية وصافي الراتب المستحق.",
      descEn: "Estimate gross wages, statutory insurance/tax deductions, and final net take-home salary.",
      component: <PayrollTool />
    },
    {
      id: 'loan',
      icon: <DollarSign className="w-5 h-5" />,
      bgGrad: "from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20",
      iconColor: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40",
      borderColor: "border-emerald-100 dark:border-emerald-900/40",
      titleAr: "حاسبة التمويل والقروض",
      titleEn: "Loan Calculator",
      descAr: "احتساب الأقساط الشهرية وجدول الاستهلاك للتمويل والفوائد الثابتة أو المتناقصة.",
      descEn: "Calculate monthly installments, interest payments, and total cost of finance.",
      component: <LoanTool />
    },
    {
      id: 'depreciation',
      icon: <TrendingDown className="w-5 h-5" />,
      bgGrad: "from-rose-500/10 to-red-500/10 dark:from-rose-500/20 dark:to-red-500/20",
      iconColor: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40",
      borderColor: "border-rose-100 dark:border-rose-900/40",
      titleAr: "حاسبة إهلاك الأصول الثابتة",
      titleEn: "Depreciation Calculator",
      descAr: "حساب مصروف الإهلاك السنوي للأصول الثابتة بطرق القسط الثابت أو المتناقص.",
      descEn: "Calculate annual depreciation expense using Straight-Line or Declining Balance methods.",
      component: <DepreciationTool />
    },
    {
      id: 'breakeven',
      icon: <Scale className="w-5 h-5" />,
      bgGrad: "from-cyan-500/10 to-sky-500/10 dark:from-cyan-500/20 dark:to-sky-500/20",
      iconColor: "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/40",
      borderColor: "border-cyan-100 dark:border-cyan-900/40",
      titleAr: "حاسبة نقطة التعادل",
      titleEn: "Break-even Calculator",
      descAr: "تحديد عدد الوحدات وقيمة المبيعات اللازمة لتغطية التكاليف الكلية الثابتة والمتغيرة.",
      descEn: "Determine the units and sales volume required to cover fixed and variable business costs.",
      component: <BreakEvenTool />
    },
    {
      id: 'currency',
      icon: <ArrowLeftRight className="w-5 h-5" />,
      bgGrad: "from-violet-500/10 to-purple-500/10 dark:from-violet-500/20 dark:to-purple-500/20",
      iconColor: "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40",
      borderColor: "border-violet-100 dark:border-violet-900/40",
      titleAr: "محول العملات المالي",
      titleEn: "Currency Converter",
      descAr: "تحويل المبالغ المالية فوراً بين العملات العالمية والعربية الرئيسية بأسعار حية ومحدثة.",
      descEn: "Convert monetary amounts instantly among major global and Arab currencies with live rates.",
      component: <CurrencyConverterTool />
    }
  ];

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6">
      
      {/* Header section */}
      <div className="mb-12 text-center max-w-3xl mx-auto space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-black border border-indigo-100 dark:border-indigo-900/40 shadow-xs"
        >
          <Calculator className="w-4 h-4 text-indigo-500" />
          <span>{isRtl ? "حزم حاسبية متكاملة وتفاعلية" : "Interactive Calculative Suites"}</span>
        </motion.div>
        
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
          {isRtl ? (
            <>الأدوات والآلات <span className="gradient-text">الحسابية والمالية</span></>
          ) : (
            <>Accounting & <span className="gradient-text">Financial Tools</span></>
          )}
        </h1>
        
        <p className="text-[15px] md:text-[17px] leading-[1.7] text-slate-500 dark:text-neutral-400 font-medium">
          {isRtl ? (
            "وفر وقتك مع هذه الحزم الحاسبية المصممة خصيصاً لمساعدتك في احتساب الضرائب، القروض، الرواتب، الإهلاكات ونقاط التعادل."
          ) : (
            "Save time and enhance accuracy with our comprehensive digital calculators designed for professional accounting, tax, loans, depreciation, and break-even estimations."
          )}
        </p>
      </div>

      {/* Quick Access Bento Navigation Grid */}
      <div className="mb-16">
        <div className="text-center mb-6">
          <span className="text-xs font-black tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
            {isRtl ? "الوصول السريع للأدوات" : "Quick Access Menu"}
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {toolsData.map((tool) => (
            <button
              key={tool.id}
              onClick={() => scrollToRef(getRef(tool.id))}
              className={cn(
                "flex flex-col items-center justify-center p-5 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center cursor-pointer group relative"
              )}
            >
              <div className={cn("p-3 rounded-2xl mb-3 group-hover:scale-110 transition-transform duration-300", tool.iconColor)}>
                {tool.icon}
              </div>
              <span className="text-xs font-black text-slate-800 dark:text-neutral-200">
                {isRtl ? tool.titleAr : tool.titleEn}
              </span>
              <span className="absolute bottom-2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-indigo-500 font-bold flex items-center gap-0.5">
                {isRtl ? "انتقل للآلة" : "Go to calc"} <ChevronDown className="w-3 h-3" />
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Detailed Cards Section */}
      <div className="space-y-16 max-w-5xl mx-auto">
        {toolsData.map((tool) => {
          const title = isRtl ? tool.titleAr : tool.titleEn;
          const desc = isRtl ? tool.descAr : tool.descEn;
          const ref = getRef(tool.id);

          return (
            <div
              key={tool.id}
              ref={ref}
              className="scroll-mt-28"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className={cn(
                  "bg-white dark:bg-slate-900 rounded-[2.5rem] border shadow-2xl p-6 md:p-10 relative overflow-hidden group",
                  tool.borderColor
                )}
              >
                {/* Visual Top Highlight Ribbon */}
                <div className={cn("absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r", tool.bgGrad.includes('blue') ? 'from-blue-600 to-indigo-600' : tool.bgGrad.includes('amber') ? 'from-amber-500 to-orange-500' : tool.bgGrad.includes('emerald') ? 'from-emerald-500 to-teal-500' : tool.bgGrad.includes('rose') ? 'from-rose-500 to-red-500' : tool.bgGrad.includes('cyan') ? 'from-cyan-500 to-sky-500' : 'from-violet-500 to-purple-500')} />

                {/* Card Header (Embedded within the component but structured as card wrapper here for clear layout representation) */}
                <div className="mb-8 pb-6 border-b border-slate-100 dark:border-slate-800/60">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={cn("p-3 rounded-2xl", tool.iconColor)}>
                        {tool.icon}
                      </div>
                      <div>
                        <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-neutral-100">
                          {title}
                        </h2>
                        <p className="text-xs md:text-sm text-slate-400 dark:text-neutral-500 font-semibold mt-0.5">
                          {desc}
                        </p>
                      </div>
                    </div>
                    
                    {/* Badge */}
                    <div className="self-start sm:self-auto px-4 py-1.5 bg-slate-50 dark:bg-slate-950/60 text-slate-500 dark:text-neutral-400 rounded-full text-[11px] font-black border border-slate-100 dark:border-slate-800/60 uppercase tracking-wider">
                      {isRtl ? "أداة تفاعلية حية" : "Live Interactive Tool"}
                    </div>
                  </div>
                </div>

                {/* Calculator body */}
                <div className="relative">
                  {tool.component}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
