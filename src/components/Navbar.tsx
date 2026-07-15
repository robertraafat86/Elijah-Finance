import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  Search, 
  Moon, 
  Sun, 
  User, 
  Calendar,
  Sparkles,
  SearchCheck,
  Bell,
  Scale
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';
import LanguageSwitcher from './LanguageSwitcher';
import { LOGO_URL } from '../constants';

interface NavbarProps {
  isDarkMode?: boolean;
  toggleDarkMode?: () => void;
  isCollapsed: boolean;
  toggleCollapse: () => void;
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
  fontSizeScale: number;
  setFontSizeScale: React.Dispatch<React.SetStateAction<number>>;
}

export default function Navbar({
  isDarkMode,
  toggleDarkMode,
  isCollapsed,
  toggleCollapse,
  isOpenMobile,
  setIsOpenMobile,
  fontSizeScale,
  setFontSizeScale
}: NavbarProps) {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isRtl = i18n.language === 'ar';
  
  // Local real-time clock for Accountant Workspace header
  const [currentDateString, setCurrentDateString] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const today = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      setCurrentDateString(today.toLocaleDateString(isRtl ? 'ar-EG' : 'en-US', options));
    };
    updateDateTime();
    // Refresh at midnights
    const interval = setInterval(updateDateTime, 60000);
    return () => clearInterval(interval);
  }, [isRtl]);

  // Translate page URL into clear dynamic titles without exposing translation keys
  const getPageTitle = () => {
    const p = location.pathname;
    if (p === '/') return t('nav.home', 'الرئيسية');
    if (p.startsWith('/about')) return t('nav.about', 'من نحن');
    if (p.startsWith('/professional-services')) return t('nav.professional_services', 'الخدمات المحاسبية المهنية');
    if (p.startsWith('/accounting-tools')) return t('nav.accounting_tools', 'الأدوات والآلات الحاسبة');
    if (p.startsWith('/digital-store')) return t('nav.digital_store', 'متجر القوالب الرقمي');
    if (p.startsWith('/templates-library') || p.startsWith('/templates')) return t('nav.accounting_templates', 'مكتبة القوالب المحاسبية');
    if (p.startsWith('/careers') || p.startsWith('/jobs')) return t('nav.careers', 'الوظائف والفرص التدريبية');
    if (p.startsWith('/forum') || p.startsWith('/community-forum')) return t('nav.community_forum', 'المنتدى المحاسبي والمهني');
    if (p.startsWith('/membership') || p.startsWith('/plans')) return t('nav.membership', 'العضوية والباقات');
    if (p.startsWith('/admin')) return t('nav.admin_dashboard', 'لوحة تحكم المشرف');
    if (p.startsWith('/academy')) return t('nav.elijah_academy', 'أكاديمية إيليجا التعليمية');
    if (p.startsWith('/blog')) return t('nav.professional_blog', 'المدونة المحاسبية المهنية');
    if (p.startsWith('/contact')) return t('nav.contact', 'اتصل بنا');
    if (p.startsWith('/saved-content')) return 'المحتوى المحفوظ';
    if (p.startsWith('/accounting-cycle')) return t('nav.accounting_cycle', 'الدورة المحاسبية');
    if (p.startsWith('/financial-statements')) return t('nav.financial_statements', 'القوائم المالية');
    if (p.startsWith('/accounting-standards')) return t('nav.international_standards', 'المعايير الدولية');
    if (p.startsWith('/egyptian-standards')) return t('nav.egyptian_standards', 'المعايير المصرية');
    if (p.startsWith('/financial-regulations')) return t('nav.financial_regulations', 'اللائحة المالية');
    if (p.startsWith('/inventory')) return t('nav.inventory', 'طرق حساب المخزون');
    if (p.startsWith('/bank-reconciliation')) return t('nav.bank_reconciliation', 'مذكرة تسوية البنك');
    if (p.startsWith('/internal-audit')) return t('nav.internal_audit', 'المراجعة الداخلية');
    if (p.startsWith('/accounting-portal')) return t('nav.portal', 'بوابة المحاسبة');
    if (p.startsWith('/tax-accounting')) return t('nav.tax_accounting', 'المحاسبة الضريبية');
    if (p.startsWith('/customs-duties')) return t('nav.customs_duties', 'الضريبة الجمركية');
    if (p.startsWith('/construction-accounting')) return t('nav.construction_accounting', 'محاسبة المقاولات');
    if (p.startsWith('/hospital-accounting')) return t('nav.hospital_accounting', 'محاسبة المستشفيات');
    if (p.startsWith('/cost-accounting')) return t('nav.cost_accounting', 'محاسبة التكاليف');
    if (p.startsWith('/financial-analysis')) return t('nav.financial_analysis', 'التحليل المالي');
    if (p.startsWith('/depreciation-methods')) return 'طرق الإهلاك';
    if (p.startsWith('/fixed-assets-management')) return 'إدارة الأصول الثابتة';
    if (p.startsWith('/scrap')) return 'الحسابات المتخصصة - الخردة';
    if (p.startsWith('/bad-debts')) return 'الحسابات المتخصصة - الديون المعدومة';
    
    // Dynamic accounting subsection titles
    if (p.startsWith('/accounting/')) {
      const parts = p.split('/');
      const section = parts[parts.length - 1];
      if (section === 'customers') return 'إدارة ومحاسبة العملاء';
      if (section === 'suppliers') return 'إدارة ومحاسبة الموردين';
      if (section === 'treasury') return 'إدارة الخزينة والسيولة النقدية';
      if (section === 'settlements') return 'إدارة القيود والتسويات الجارية';
      if (section === 'inventory_jard') return 'جرد المخزون والرقابة المخزنية';
      if (section === 'cogs') return 'تكلفة البضاعة المباعة (COGS)';
      if (section === 'cost_of_sales') return 'تكلفة المبيعات التشغيلية';
      if (section === 'cost_of_purchases') return 'تكلفة المشتريات والاعتمادات';
      if (section === 'depreciation') return 'طرق إهلاك الأصول الثابتة';
      if (section === 'inventory_valuation') return 'قييم وتسعير المخزون بضاعة آخر المدة';
      if (section === 'bad_debts') return 'معالجة الديون المعدومة والمخصصات';
      if (section === 'scrap') return 'محاسبة بيع ومعالجة تالف الخردة';
      if (section === 'bank_reconciliation') return 'إعداد مطابقة كشف تسوية البنك';
      if (section === 'bank_accounting') return 'العمليات والدفاتر البنكية والاعتمادات مستندية';
      if (section === 'financial_analysis') return 'مؤشرات وتقارير التحليل المالي العمودي والأفقي';
      if (section === 'international_standards') return 'تطبيق معايير التقارير المالية الدولية IFRS';
      if (section === 'invoices_settlements') return 'سجل مطابقة الفواتير والتسويات التجارية';
    }
    
    return t('nav.portal', 'بوابة المحاسبة المهنية');
  };

  return (
    <>
      {/* 1. Desktop Sleek Content Header Bar */}
      <header
        className={cn(
          "hidden lg:flex fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/60 z-35 transition-all duration-300 select-none",
          isRtl 
            ? (isCollapsed ? "mr-20" : "mr-80") 
            : (isCollapsed ? "ml-20" : "ml-80")
        )}
      >
        <div className="w-full h-full px-8 flex items-center justify-between">
          {/* Welcome Info & Current Page State Banner */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col text-right">
              <h2 className="text-slate-900 dark:text-neutral-100 font-extrabold text-sm tracking-tight leading-none mb-1">
                {getPageTitle()}
              </h2>
              <p className="text-[10px] text-slate-400 font-bold flex items-center gap-1.5 leading-none">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>{currentDateString}</span>
              </p>
            </div>
          </div>

          {/* Quick Header Accessories */}
          <div className="flex items-center gap-4">
            {/* Real-time Indicator Tag */}
            <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30 rounded-full text-[10px] font-black leading-none">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span>روبير رأفت الحساب نشط</span>
            </div>

            <div className="h-5 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1" />

            {/* Language Selection inside Header bar as backup */}
            <div className="relative max-h-[32px] overflow-hidden">
              <LanguageSwitcher />
            </div>

            {/* Accessibility & Font zoom group */}
            <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-850 border border-slate-150 dark:border-slate-700/50 rounded-xl p-1 shadow-sm select-none">
              <button
                onClick={() => setFontSizeScale(prev => Math.max(115, prev - 5))}
                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-500 hover:text-slate-800 dark:text-neutral-400 dark:hover:text-neutral-100 transition-all font-black text-[11px] cursor-pointer"
                title={isRtl ? "تصغير الخط (A-)" : "Decrease font size (A-)"}
              >
                A-
              </button>
              <button
                onClick={() => setFontSizeScale(140)}
                className="px-2 h-7 flex items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-700 dark:text-neutral-200 font-extrabold text-[11px] transition-all cursor-pointer bg-white dark:bg-slate-900 shadow-xs border border-slate-100 dark:border-slate-800/40"
                title={isRtl ? "إعادة الحجم الافتراضي" : "Reset font size"}
              >
                {fontSizeScale}%
              </button>
              <button
                onClick={() => setFontSizeScale(prev => Math.min(175, prev + 5))}
                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-500 hover:text-slate-800 dark:text-neutral-400 dark:hover:text-neutral-100 transition-all font-black text-[11px] cursor-pointer"
                title={isRtl ? "تكبير الخط (A+)" : "Increase font size (A+)"}
              >
                A+
              </button>
            </div>

            {/* AI Advisor Quick Shortcut */}
            <Link
              to="/ai-assistant"
              className="px-3.5 h-9 flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-750 text-white font-extrabold text-[11px] transition-all cursor-pointer shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-95 duration-100"
              title={isRtl ? "المستشار المالي الذكي (CPA)" : "Elijah AI CPA Advisor"}
              aria-label={isRtl ? "المستشار المالي الذكي (CPA)" : "Elijah AI CPA Advisor"}
            >
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>{isRtl ? 'المستشار الذكي' : 'AI Advisor'}</span>
            </Link>

            {/* Dark Mode Switcher */}
            <button
              onClick={toggleDarkMode}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:text-neutral-400 dark:hover:text-neutral-100 border border-slate-150 dark:border-slate-700/50 transition-all cursor-pointer shadow-sm"
              title={isRtl ? "تغيير مظهر المنظومة" : "Toggle theme mode"}
              aria-label={isRtl ? "تغيير مظهر المنظومة" : "Toggle theme mode"}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-500 animate-spin-slow" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Custom User Info block acts as button to open Profile card */}
            <div 
              className="flex items-center gap-2.5 pl-1.5 pr-1.5 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-150 dark:border-slate-700/60 rounded-xl cursor-default transition-all group"
            >
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-black text-slate-900 dark:text-neutral-100 leading-tight">روبير رأفت</span>
                <span className="text-[8px] text-blue-600 dark:text-blue-400 font-extrabold tracking-widest uppercase">محاسب أول</span>
              </div>
              <div className="w-7 h-7 bg-blue-600 rounded-lg text-white font-black text-xs flex items-center justify-center shadow-sm select-none">
                ر
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Mobile Compact Logo & Menu Bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800 z-45 px-5 flex items-center justify-between shadow-sm select-none">
        <Link to="/" className="flex items-center gap-2">
          <img src={LOGO_URL} alt="Logo" className="w-7 h-7 rounded-lg" />
          <div className="flex flex-col">
            <span className="font-extrabold text-xs text-slate-900 dark:text-neutral-100 leading-tight">مركز ايليجا المالي</span>
            <span className="text-[8px] text-slate-400 font-bold uppercase leading-none">للخدمات المالية والمحاسبية</span>
          </div>
        </Link>

        {/* Action Widgets on Mobile header */}
        <div className="flex items-center gap-2">
          {/* AI Advisor Quick link on Mobile */}
          <Link
            to="/ai-assistant"
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 cursor-pointer"
            title={isRtl ? "المستشار المالي الذكي" : "AI Advisor"}
            aria-label={isRtl ? "المستشار المالي الذكي" : "AI Advisor"}
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          </Link>

          {/* Quick dark toggle */}
          <button
            onClick={toggleDarkMode}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-neutral-400 cursor-pointer"
            aria-label={isRtl ? "تغيير مظهر المنظومة" : "Toggle theme mode"}
          >
            {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-500" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          {/* Hamburger menu trigger */}
          <button
            onClick={() => setIsOpenMobile(true)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/10 cursor-pointer"
            aria-label={isRtl ? "افتح القائمة الرئيسية" : "Open main menu"}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>
    </>
  );
}
