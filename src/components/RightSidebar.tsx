import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Home, 
  Users, 
  Phone, 
  Globe, 
  BookOpen, 
  Briefcase, 
  Calculator, 
  ArrowLeftRight, 
  CheckCircle, 
  TrendingUp, 
  PieChart, 
  FileText, 
  Clock, 
  BarChart3, 
  AlertTriangle, 
  RefreshCcw, 
  Scale, 
  ShieldCheck, 
  Layers, 
  Search, 
  ChevronDown, 
  ChevronRight, 
  ChevronLeft,
  Sparkles, 
  User, 
  Bookmark,
  Building, 
  Settings, 
  X, 
  Send, 
  Sun, 
  Moon, 
  Menu,
  Activity,
  FileSpreadsheet,
  Award,
  ShoppingBag,
  Lock,
  Download,
  Terminal,
  MessageSquare,
  CreditCard
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import LanguageSwitcher from './LanguageSwitcher';
import { LOGO_URL, SITEMAP_URL } from '../constants';
import AdsRenderer from './AdsRenderer';

interface RightSidebarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isCollapsed: boolean;
  toggleCollapse: () => void;
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
  fontSizeScale: number;
  setFontSizeScale: React.Dispatch<React.SetStateAction<number>>;
}

// Navigation Tree Types
interface SidebarItem {
  id: string;
  titleNative: string;
  titleKey?: string;
  path: string;
  icon: React.ReactNode;
}

interface SidebarGroup {
  id: string;
  titleNative: string;
  titleKey?: string;
  icon: React.ReactNode;
  items: SidebarItem[];
}

export default function RightSidebar({
  isDarkMode,
  toggleDarkMode,
  isCollapsed,
  toggleCollapse,
  isOpenMobile,
  setIsOpenMobile,
  fontSizeScale,
  setFontSizeScale
}: RightSidebarProps) {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const isRtl = i18n.language === 'ar';

  const [searchQuery, setSearchQuery] = useState('');
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    main: true,
    portals: false,
    sectors: false,
    taxes_regulations: false,
    standards_statements: false,
    knowledge: false,
    practical: false,
    reports: false,
    ai: false,
    profile: false
  });

  // Extra Drawer States (AI Assistant, Profile Card, Settings Control)
  const [activeDrawer, setActiveDrawer] = useState<'ai' | 'profile' | 'settings' | null>(null);
  const [aiPresetContext, setAiPresetContext] = useState<'general' | 'analysis' | 'standards'>('general');

  // AI Chat States
  const [userInput, setUserInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string; time: string }>>([
    { 
      sender: 'ai', 
      text: 'أهلاً بك يا أستاذ روبير! كيف يمكنني مساعدتك في شئونك المالية والتحليل المحاسبي اليوم؟ يمكنك سؤالي عن المعايير المالية أو تحليل الحسابات.',
      time: '12:00 م' 
    }
  ]);
  const [isAiTyping, setIsAiTyping] = useState(false);

  // Companion Financial Calculator States
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [calcFormula, setCalcFormula] = useState('');
  const [calcPrevVal, setCalcPrevVal] = useState<number | null>(null);
  const [calcOp, setCalcOp] = useState<string | null>(null);
  const [calcResetOnNext, setCalcResetOnNext] = useState(false);

  // Helper functions for formatting and calculations
  const evaluateCalc = (op1: number, op2: number, operator: string): number => {
    switch (operator) {
      case '+': return op1 + op2;
      case '-': return op1 - op2;
      case '×': return op1 * op2;
      case '÷': return op2 === 0 ? 0 : op1 / op2;
      default: return op2;
    }
  };

  const formatCalcNumber = (num: number): string => {
    if (isNaN(num) || !isFinite(num)) return '0';
    const rounded = Math.round(num * 100000000) / 100000000;
    const parts = rounded.toString().split('.');
    parts[0] = Number(parts[0]).toLocaleString('en-US');
    return parts.join('.');
  };

  const formatCalcString = (val: string): string => {
    if (val === '-') return '-';
    if (val === '') return '0';
    const parts = val.replace(/,/g, '').split('.');
    const integerPart = Number(parts[0]);
    if (isNaN(integerPart)) return val;
    
    let formatted = integerPart.toLocaleString('en-US');
    if (parts.length > 1) {
      formatted += '.' + parts[1];
    } else if (val.endsWith('.')) {
      formatted += '.';
    }
    return formatted;
  };

  const handleCalcKey = (key: string) => {
    if (key >= '0' && key <= '9') {
      if (calcDisplay === '0' || calcResetOnNext) {
        setCalcDisplay(key);
        setCalcResetOnNext(false);
      } else {
        if (calcDisplay.replace(/,/g, '').length < 12) {
          setCalcDisplay(calcDisplay + key);
        }
      }
    } else if (key === '.') {
      if (calcResetOnNext) {
        setCalcDisplay('0.');
        setCalcResetOnNext(false);
      } else if (!calcDisplay.includes('.')) {
        setCalcDisplay(calcDisplay + '.');
      }
    } else if (key === 'C') {
      setCalcDisplay('0');
      setCalcFormula('');
      setCalcPrevVal(null);
      setCalcOp(null);
      setCalcResetOnNext(false);
    } else if (key === '⌫') {
      if (calcResetOnNext) {
        setCalcDisplay('0');
        setCalcResetOnNext(false);
      } else {
        const next = calcDisplay.slice(0, -1);
        setCalcDisplay(next === '' || next === '-' ? '0' : next);
      }
    } else if (key === '+/-') {
      if (calcDisplay !== '0') {
        if (calcDisplay.startsWith('-')) {
          setCalcDisplay(calcDisplay.slice(1));
        } else {
          setCalcDisplay('-' + calcDisplay);
        }
      }
    } else if (['+', '-', '×', '÷'].includes(key)) {
      const currentVal = parseFloat(calcDisplay.replace(/,/g, ''));
      if (calcPrevVal !== null && calcOp && !calcResetOnNext) {
        const result = evaluateCalc(calcPrevVal, currentVal, calcOp);
        setCalcPrevVal(result);
        setCalcDisplay(formatCalcNumber(result));
        setCalcFormula(`${formatCalcNumber(result)} ${key}`);
      } else {
        setCalcPrevVal(currentVal);
        setCalcFormula(`${formatCalcString(calcDisplay)} ${key}`);
      }
      setCalcOp(key);
      setCalcResetOnNext(true);
    } else if (key === '%') {
      const currentVal = parseFloat(calcDisplay.replace(/,/g, ''));
      const parsed = currentVal / 100;
      setCalcDisplay(formatCalcNumber(parsed));
      setCalcResetOnNext(true);
    } else if (key === '=') {
      if (calcPrevVal !== null && calcOp) {
        const currentVal = parseFloat(calcDisplay.replace(/,/g, ''));
        const result = evaluateCalc(calcPrevVal, currentVal, calcOp);
        setCalcFormula(`${calcFormula} ${formatCalcString(calcDisplay)} =`);
        setCalcDisplay(formatCalcNumber(result));
        setCalcPrevVal(null);
        setCalcOp(null);
        setCalcResetOnNext(true);
      }
    } else if (key === '+VAT') {
      const currentVal = parseFloat(calcDisplay.replace(/,/g, ''));
      const withVat = currentVal * 1.14;
      setCalcFormula(`${formatCalcString(calcDisplay)} + 14% VAT =`);
      setCalcDisplay(formatCalcNumber(withVat));
      setCalcResetOnNext(true);
    } else if (key === '-VAT') {
      const currentVal = parseFloat(calcDisplay.replace(/,/g, ''));
      const withoutVat = currentVal / 1.14;
      setCalcFormula(`${formatCalcString(calcDisplay)} - 14% VAT =`);
      setCalcDisplay(formatCalcNumber(withoutVat));
      setCalcResetOnNext(true);
    }
  };

  // Keep keyboard listener for continuous accounting session speed
  useEffect(() => {
    if (!isCalcOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing inside standard inputs to allow normal database/chat interaction
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }
      if (e.key >= '0' && e.key <= '9') {
        handleCalcKey(e.key);
      } else if (e.key === '.') {
        handleCalcKey('.');
      } else if (e.key === '+' || e.key === '-') {
        handleCalcKey(e.key);
      } else if (e.key === '*' || e.key === 'x' || e.key === 'X') {
        handleCalcKey('×');
      } else if (e.key === '/') {
        e.preventDefault();
        handleCalcKey('÷');
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        handleCalcKey('=');
      } else if (e.key === 'Backspace') {
        handleCalcKey('⌫');
      } else if (e.key === 'Escape') {
        handleCalcKey('C');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCalcOpen, calcDisplay, calcFormula, calcPrevVal, calcOp, calcResetOnNext]);

  // Close Mobile Drawer on Route change
  useEffect(() => {
    setIsOpenMobile(false);
  }, [location.pathname, location.search, setIsOpenMobile]);

  // Expand accordion groups dynamically when searching
  useEffect(() => {
    if (searchQuery.trim() !== '') {
      setOpenGroups({
        main: true,
        portals: true,
        sectors: true,
        taxes_regulations: true,
        standards_statements: true,
        knowledge: true,
        practical: true,
        reports: true,
        ai: true,
        profile: true
      });
    }
  }, [searchQuery]);

  // Check if link matches active path and active query param
  const isItemActive = (path: string) => {
    // Normalise pathname match
    const pathNoSearch = path.split('?')[0];
    const locNoSearch = location.pathname;
    
    if (pathNoSearch === '/' && locNoSearch !== '/') return false;
    
    const isPathMatched = locNoSearch === pathNoSearch || (pathNoSearch !== '/' && locNoSearch.startsWith(pathNoSearch));
    
    // Check specific query matches (like ?mode=dashboard)
    if (path.includes('?')) {
      const pathParams = new URL(path, window.location.origin).searchParams;
      const locParams = new URLSearchParams(location.search);
      let queryMatched = true;
      pathParams.forEach((val, key) => {
        if (locParams.get(key) !== val) queryMatched = false;
      });
      return isPathMatched && queryMatched;
    } else {
      // If menu item has no mode=dashboard, but URL has mock relative dashboard state, restrict match to prevent highlighting both
      if (location.search.includes('mode=dashboard')) {
        return false;
      }
    }
    
    return isPathMatched;
  };

  // Define sidebar navigation items grouped precisely as requested
  const sidebarNavStructure: SidebarGroup[] = useMemo(() => [
    {
      id: 'main',
      titleNative: 'الرئيسية والخدمات',
      titleKey: 'nav.general_group',
      icon: <Home className="w-5 h-5 text-blue-500" />,
      items: [
        { id: 'home', titleNative: 'الصفحة الرئيسية', titleKey: 'nav.home', path: '/', icon: <Home className="w-4 h-4" /> },
        { id: 'professional-services', titleNative: 'الخدمات المحاسبية المهنية', titleKey: 'nav.professional_services', path: '/professional-services', icon: <Award className="w-4 h-4 text-emerald-500 animate-pulse" /> },
        { id: 'accounting-tools', titleNative: 'الأدوات والآلات الحاسبة', titleKey: 'nav.accounting_tools', path: '/accounting-tools', icon: <Calculator className="w-4 h-4 text-indigo-500" /> },
        { id: 'digital-store', titleNative: 'متجر القوالب الرقمي', titleKey: 'nav.digital_store', path: '/digital-store', icon: <ShoppingBag className="w-4 h-4 text-violet-500 animate-pulse" /> },
        { id: 'accounting-templates', titleNative: 'مكتبة القوالب المحاسبية', titleKey: 'nav.accounting_templates', path: '/templates-library', icon: <FileSpreadsheet className="w-4 h-4 text-emerald-500 animate-pulse" /> },
        { id: 'careers', titleNative: 'الوظائف والفرص التدريبية', titleKey: 'nav.careers', path: '/careers', icon: <Users className="w-4 h-4 text-teal-500 animate-pulse" /> },
        { id: 'forum', titleNative: 'المنتدى المحاسبي والمهني', titleKey: 'nav.community_forum', path: '/forum', icon: <MessageSquare className="w-4 h-4 text-indigo-500 animate-pulse" /> },
        { id: 'membership', titleNative: 'العضوية والباقات', titleKey: 'nav.membership', path: '/membership', icon: <CreditCard className="w-4 h-4 text-rose-500 animate-pulse" /> },
        { id: 'admin-dashboard', titleNative: 'لوحة تحكم المشرف', titleKey: 'nav.admin_dashboard', path: '/admin', icon: <Settings className="w-4 h-4 text-cyan-500 animate-spin-slow" /> },
        { id: 'elijah-academy', titleNative: 'أكاديمية إيليجا التعليمية', titleKey: 'nav.elijah_academy', path: '/academy', icon: <BookOpen className="w-4 h-4 text-pink-500 animate-pulse" /> },
        { id: 'professional-blog', titleNative: 'المدونة المحاسبية المهنية', titleKey: 'nav.professional_blog', path: '/blog', icon: <FileText className="w-4 h-4 text-amber-500 animate-pulse" /> },
        { id: 'services', titleNative: 'خدمات المنظومة', titleKey: 'nav.services', path: '/services', icon: <Briefcase className="w-4 h-4" /> },
        { id: 'about', titleNative: 'من نحن', titleKey: 'nav.about', path: '/about', icon: <Users className="w-4 h-4" /> },
        { id: 'contact', titleNative: 'تواصل معنا', titleKey: 'nav.contact', path: '/contact', icon: <Phone className="w-4 h-4" /> },
        { id: 'sitemap', titleNative: 'خريطة الموقع', path: '#sitemap', icon: <Globe className="w-4 h-4" /> },
      ]
    },
    {
      id: 'portals',
      titleNative: 'بوابات المنظومة والحلول',
      icon: <Building className="w-5 h-5 text-sky-500" />,
      items: [
        { id: 'p_portal', titleNative: 'البوابة المحاسبية الذكية', path: '/accounting-portal', icon: <Building className="w-4 h-4 text-sky-500" /> },
        { id: 'p_cycle', titleNative: 'الدورة المحاسبية المتكاملة', path: '/accounting-cycle', icon: <RefreshCcw className="w-4 h-4 text-indigo-500" /> },
        { id: 'p_analysis', titleNative: 'التحليل المالي والتدقيق', path: '/financial-analysis', icon: <BarChart3 className="w-4 h-4 text-emerald-500" /> },
        { id: 'p_fixed_assets', titleNative: 'إدارة الأصول الثابتة', path: '/fixed-assets-management', icon: <Briefcase className="w-4 h-4 text-amber-500" /> },
      ]
    },
    {
      id: 'sectors',
      titleNative: 'محاسبة القطاعات والتكاليف',
      icon: <Briefcase className="w-5 h-5 text-indigo-500" />,
      items: [
        { id: 'sec_costs', titleNative: 'محاسبة التكاليف', path: '/cost-accounting', icon: <Calculator className="w-4 h-4 text-red-500" /> },
        { id: 'sec_construction', titleNative: 'محاسبة المقاولات والعقود', path: '/construction-accounting', icon: <Building className="w-4 h-4 text-amber-600" /> },
        { id: 'sec_hospital', titleNative: 'محاسبة المستشفيات والمراكز', path: '/hospital-accounting', icon: <Activity className="w-4 h-4 text-rose-500" /> },
        { id: 'sec_audit', titleNative: 'المراجعة والتدقيق الداخلي', path: '/internal-audit', icon: <ShieldCheck className="w-4 h-4 text-emerald-600" /> },
      ]
    },
    {
      id: 'taxes_regulations',
      titleNative: 'الضرائب والجمارك والتشريعات',
      icon: <Scale className="w-5 h-5 text-red-500" />,
      items: [
        { id: 'tax_income', titleNative: 'المحاسبة الضريبية', path: '/tax-accounting', icon: <Scale className="w-4 h-4 text-red-500" /> },
        { id: 'tax_customs', titleNative: 'الضريبة والتعريفة الجمركية', path: '/customs-duties', icon: <FileText className="w-4 h-4 text-amber-500" /> },
        { id: 'tax_regulations', titleNative: 'اللائحة والقرارات المالية', path: '/financial-regulations', icon: <ShieldCheck className="w-4 h-4 text-blue-500" /> },
      ]
    },
    {
      id: 'standards_statements',
      titleNative: 'المعايير والقوائم المالية',
      icon: <FileSpreadsheet className="w-5 h-5 text-amber-500" />,
      items: [
        { id: 'std_intl', titleNative: 'المعايير الدولية IFRS', path: '/accounting-standards', icon: <Globe className="w-4 h-4 text-blue-500" /> },
        { id: 'std_egypt', titleNative: 'المعايير المصرية EAS', path: '/egyptian-standards', icon: <Scale className="w-4 h-4 text-amber-600" /> },
        { id: 'std_statements', titleNative: 'التقارير والقوائم المالية', path: '/financial-statements', icon: <FileSpreadsheet className="w-4 h-4 text-emerald-500" /> },
      ]
    },
    {
      id: 'knowledge',
      titleNative: 'بنك المعلومات المحاسبي',
      titleKey: 'nav.accounting_knowledge_base',
      icon: <BookOpen className="w-5 h-5 text-violet-500" />,
      items: [
        { id: 'k_cust', titleNative: 'محاسبة العملاء', titleKey: 'accounting.customers', path: '/accounting/customers', icon: <Users className="w-4 h-4" /> },
        { id: 'k_supp', titleNative: 'محاسبة الموردين', titleKey: 'accounting.suppliers', path: '/accounting/suppliers', icon: <Briefcase className="w-4 h-4" /> },
        { id: 'k_treas', titleNative: 'الخزينة والنقدية', titleKey: 'accounting.treasury', path: '/accounting/treasury', icon: <Calculator className="w-4 h-4" /> },
        { id: 'k_sett', titleNative: 'التسويات المحاسبية', titleKey: 'accounting.settlements', path: '/accounting/settlements', icon: <ArrowLeftRight className="w-4 h-4" /> },
        { id: 'k_jard', titleNative: 'جرد وتقييم المخزن', titleKey: 'accounting.inventory_jard', path: '/accounting/inventory_jard', icon: <CheckCircle className="w-4 h-4" /> },
        { id: 'k_cogs', titleNative: 'تكلفة البضاعة المباعة COGS', titleKey: 'accounting.cogs', path: '/accounting/cogs', icon: <TrendingUp className="w-4 h-4" /> },
        { id: 'k_sales', titleNative: 'تكلفة المبيعات المباشرة', titleKey: 'accounting.cost_of_sales', path: '/accounting/cost_of_sales', icon: <PieChart className="w-4 h-4" /> },
        { id: 'k_purch', titleNative: 'تكلفة المشتريات والاعتمادات', titleKey: 'accounting.cost_of_purchases', path: '/accounting/cost_of_purchases', icon: <FileText className="w-4 h-4" /> },
        { id: 'k_depr', titleNative: 'طرق الإهلاك وعمر الأصل', titleKey: 'accounting.depreciation', path: '/depreciation-methods', icon: <Clock className="w-4 h-4" /> },
        { id: 'k_val', titleNative: 'طرق تقييم المخزون المالي', titleKey: 'accounting.inventory_valuation', path: '/accounting/inventory_valuation', icon: <BarChart3 className="w-4 h-4" /> },
        { id: 'k_bad', titleNative: 'الديون المعدومة والمخصصات', titleKey: 'accounting.bad_debts', path: '/bad-debts', icon: <AlertTriangle className="w-4 h-4" /> },
        { id: 'k_scrap', titleNative: 'الخردة والمخلفات والكهنة', titleKey: 'accounting.scrap', path: '/scrap', icon: <RefreshCcw className="w-4 h-4" /> },
        { id: 'k_recon', titleNative: 'مذكرة تسوية البنك', titleKey: 'accounting.bank_reconciliation', path: '/bank-reconciliation', icon: <Scale className="w-4 h-4" /> },
        { id: 'k_bank', titleNative: 'محاسبة البنوك والاعتمادات', titleKey: 'accounting.bank_accounting', path: '/accounting/bank_accounting', icon: <ShieldCheck className="w-4 h-4" /> },
        { id: 'k_invoices', titleNative: 'فواتير وتسويات متنوعة', path: '/accounting/invoices_settlements', icon: <Layers className="w-4 h-4" /> },
        { id: 'k_inventory_mgmt', titleNative: 'إدارة المخازن والمخزون', path: '/inventory', icon: <Layers className="w-4 h-4" /> },
        { id: 'k_misc', titleNative: 'متنوعات وبحوث محاسبية', path: '/accounting-misc', icon: <Layers className="w-4 h-4" /> },
      ]
    },
    {
      id: 'practical',
      titleNative: 'اللوحة العملية',
      icon: <Layers className="w-5 h-5 text-emerald-500" />,
      items: [
        { id: 'p_cust', titleNative: 'إدارة العملاء', path: '/accounting/customers?mode=dashboard', icon: <Users className="w-4 h-4" /> },
        { id: 'p_supp', titleNative: 'إدارة الموردين', path: '/accounting/suppliers?mode=dashboard', icon: <Briefcase className="w-4 h-4" /> },
        { id: 'p_treas', titleNative: 'إدارة الخزينة', path: '/accounting/treasury?mode=dashboard', icon: <Calculator className="w-4 h-4" /> },
        { id: 'p_inv', titleNative: 'إدارة المخزون', path: '/accounting/inventory_jard?mode=dashboard', icon: <CheckCircle className="w-4 h-4" /> },
        { id: 'p_sett', titleNative: 'إدارة التسويات', path: '/accounting/settlements?mode=dashboard', icon: <ArrowLeftRight className="w-4 h-4" /> },
        { id: 'p_fixed_assets_mgmt', titleNative: 'إدارة الأصول والاهلاكات', path: '/fixed-assets-management', icon: <Building className="w-4 h-4" /> },
      ]
    },
    {
      id: 'reports',
      titleNative: 'التقارير المحاسبية',
      icon: <FileSpreadsheet className="w-5 h-5 text-amber-500" />,
      items: [
        { id: 'r_cust', titleNative: 'تقارير العملاء', path: '/accounting/customers?mode=dashboard', icon: <Users className="w-4 h-4" /> },
        { id: 'r_supp', titleNative: 'تقارير الموردين', path: '/accounting/suppliers?mode=dashboard', icon: <Briefcase className="w-4 h-4" /> },
        { id: 'r_treas', titleNative: 'تقارير الخزينة', path: '/accounting/treasury?mode=dashboard', icon: <Calculator className="w-4 h-4" /> },
        { id: 'r_inv', titleNative: 'تقارير المخزون', path: '/accounting/inventory_jard?mode=dashboard', icon: <CheckCircle className="w-4 h-4" /> },
        { id: 'r_fin', titleNative: 'التقارير المالية والموازنات', path: '/financial-statements', icon: <BarChart3 className="w-4 h-4" /> },
      ]
    },
    {
      id: 'ai',
      titleNative: 'الذكاء الاصطناعي',
      icon: <Sparkles className="w-5 h-5 text-purple-500" />,
      items: [
        { id: 'ai_assistant', titleNative: 'المساعد المحاسبي', path: '/ai-assistant', icon: <Sparkles className="w-4 h-4 text-purple-500" /> },
        { id: 'ai_analysis', titleNative: 'تحليل البيانات المتقدم', path: '/ai-assistant', icon: <BarChart3 className="w-4 h-4 text-purple-500" /> },
        { id: 'ai_standards', titleNative: 'شرح المعايير بالذكاء', path: '/ai-assistant', icon: <BookOpen className="w-4 h-4 text-purple-500" /> },
      ]
    },
    {
      id: 'profile',
      titleNative: 'الحساب الشخصي',
      icon: <User className="w-5 h-5 text-rose-500" />,
      items: [
        { id: 'user_profile', titleNative: 'الملف الشخصي', path: '#profile', icon: <User className="w-4 h-4" /> },
        { id: 'user_saved', titleNative: 'المحتوى المحفوظ', path: '/saved-content', icon: <Bookmark className="w-4 h-4" /> },
        { id: 'user_settings', titleNative: 'الإعدادات التشغيلية', path: '#settings', icon: <Settings className="w-4 h-4" /> },
      ]
    }
  ], [t]);

  // Compute filtered items for live search support inside navigation
  const filteredNavStructure = useMemo(() => {
    if (!searchQuery.trim()) return sidebarNavStructure;

    const query = searchQuery.toLowerCase();
    return sidebarNavStructure.map(group => {
      const matchedItems = group.items.filter(item => {
        const title = item.titleKey ? t(item.titleKey) : item.titleNative;
        return title.toLowerCase().includes(query);
      });
      return {
        ...group,
        items: matchedItems
      };
    }).filter(group => group.items.length > 0);
  }, [searchQuery, sidebarNavStructure, t]);

  // Toggle dynamic collapsible groupings
  const toggleGroup = (groupId: string) => {
    setOpenGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  // Helper to handle custom actions like AI, Profile, Settings panels or external files
  const handleItemClick = (item: SidebarItem, e: React.MouseEvent) => {
    if (item.path === '#sitemap') {
      e.preventDefault();
      window.open(SITEMAP_URL, '_blank');
      return;
    }

    if (item.path.startsWith('#ai-')) {
      e.preventDefault();
      if (item.path === '#ai-assistant') setAiPresetContext('general');
      if (item.path === '#ai-analysis') setAiPresetContext('analysis');
      if (item.path === '#ai-standards') setAiPresetContext('standards');
      setActiveDrawer('ai');
      return;
    }

    if (item.path === '#profile') {
      e.preventDefault();
      setActiveDrawer('profile');
      return;
    }

    if (item.path === '#settings') {
      e.preventDefault();
      setActiveDrawer('settings');
      return;
    }
  };

  // Live API-driven responses for the AI Chat Assistant
  const handleSendAiMessage = async () => {
    const trimmedInput = userInput.trim();
    if (!trimmedInput) return;

    const userTime = new Date().toLocaleTimeString(isRtl ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' });
    const userMsg = { sender: 'user' as const, text: trimmedInput, time: userTime };
    
    setChatMessages(prev => [...prev, userMsg]);
    setUserInput('');
    setIsAiTyping(true);

    try {
      // Map frontend chat state to API structure
      const historyPayload = chatMessages.map(msg => ({
        role: msg.sender === 'ai' ? ('model' as const) : ('user' as const),
        text: msg.text
      }));

      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmedInput,
          history: historyPayload
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const aiTime = new Date().toLocaleTimeString(isRtl ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' });
      
      const aiMsg = { 
        sender: 'ai' as const, 
        text: data.text || "عذراً، حدث خطأ أثناء الاتصال بالخادم. يرجى المحاولة لاحقاً.", 
        time: aiTime 
      };
      
      setChatMessages(prev => [...prev, aiMsg]);
    } catch (err: any) {
      console.error("Failed to fetch from Gemini:", err);
      const aiTime = new Date().toLocaleTimeString(isRtl ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' });
      const errorMsg = { 
        sender: 'ai' as const, 
        text: isRtl 
          ? "⚠️ عذراً، لم نتمكن من الحصول على رد من المساعد الذكي حالياً. يرجى التحقق من اتصال الشبكة وتفعيل مفتاح GEMINI_API_KEY." 
          : "⚠️ Sorry, could not get a response from the AI assistant. Please check your network connection and ensure your GEMINI_API_KEY is configured.", 
        time: aiTime 
      };
      setChatMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsAiTyping(false);
    }
  };

  const handleClearChat = () => {
    setChatMessages([
      { 
        sender: 'ai', 
        text: 'تمت إرجاع المحادثة للوضع الافتراضي. كيف أساعد أستاذ روبير في مهامه المالية الآن؟', 
        time: new Date().toLocaleTimeString(isRtl ? 'ar-EG' : 'en-US', {hour: '2-digit', minute: '2-digit'}) 
      }
    ]);
  };

  const renderSidebarContent = () => (
    <div className="flex flex-col h-full bg-slate-50/50 dark:bg-slate-950/40 backdrop-blur-xl border-l border-slate-200/50 dark:border-slate-800/60 shadow-glass">
      {/* Brand Header */}
      <div className={cn(
        "p-5 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40",
        isCollapsed ? "justify-center" : "justify-between"
      )}>
        <Link to="/" className="flex items-center gap-2.5 group overflow-hidden">
          <div className="h-9 w-9 shrink-0 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-600 shadow-sm transition-transform duration-300 group-hover:scale-110">
            <img src={LOGO_URL} alt="Logo" className="w-6 h-6 object-contain" referrerPolicy="no-referrer" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-extrabold text-slate-900 dark:text-neutral-100 text-[13px] leading-tight select-none">مركز ايليجا المالي</span>
              <span className="text-[9px] text-slate-400 dark:text-neutral-500 font-bold select-none uppercase tracking-tight">للخدمات المالية والمحاسبية</span>
            </div>
          )}
        </Link>
        
        {/* Expand/Collapse Toggle on Desktop */}
        {!isCollapsed && (
          <button 
            onClick={toggleCollapse}
            className="hidden lg:flex p-1.5 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 rounded-lg transition-colors border border-slate-200/50 dark:border-slate-700/50 cursor-pointer"
          >
            {isRtl ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Instant Search Bar inside Sidebar Navigation */}
      {!isCollapsed && (
        <div className="px-4 pt-4 pb-2 print:hidden select-none">
          <div className="relative group/search">
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within/search:text-blue-500 transition-colors" />
            <input 
              type="text"
              placeholder="البحث في القائمة..."
              className="w-full pr-10 pl-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-xs font-bold rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500/80 transition-all placeholder:text-slate-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-0.5 bg-slate-100 dark:bg-slate-800 rounded-md hover:bg-slate-200 text-slate-400"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Navigation Groups List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3 custom-scrollbar">
        {filteredNavStructure.map((group) => {
          const isGroupOpen = openGroups[group.id];
          
          if (isCollapsed) {
            // Render only Group Icons with simple Tooltips or Hover effect when collapsed
            return (
              <div key={group.id} className="flex flex-col items-center gap-2 select-none">
                <div 
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center cursor-pointer transition-all",
                    isGroupOpen ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : "bg-white dark:bg-slate-900 text-slate-500 border border-slate-100 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"
                  )}
                  onClick={() => toggleGroup(group.id)}
                  title={group.titleNative}
                >
                  {group.icon}
                </div>
                {isGroupOpen && (
                  <div className="bg-white dark:bg-slate-900 rounded-xl p-1 border border-slate-200/50 dark:border-slate-800 shadow-md flex flex-col gap-1 w-12 items-center">
                    {group.items.map(item => {
                      const active = isItemActive(item.path);
                      return (
                        <Link
                          key={item.id}
                          to={item.path}
                          className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                            active 
                              ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" 
                              : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                          )}
                          title={item.titleKey ? t(item.titleKey) : item.titleNative}
                          onClick={(e) => handleItemClick(item, e)}
                        >
                          {item.icon}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          return (
            <div key={group.id} className="bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-100 dark:border-slate-800/60 shadow-[0_2px_12px_rgba(0,0,0,0.01)] overflow-hidden transition-all duration-300">
              {/* Accordion Group Trigger Button */}
              <button
                onClick={() => toggleGroup(group.id)}
                className={cn(
                  "w-full flex items-center justify-between p-4 font-bold transition-all text-right cursor-pointer select-none",
                  isGroupOpen ? "bg-slate-50/60 dark:bg-slate-800/30 text-blue-600 dark:text-blue-400" : "text-slate-700 dark:text-neutral-300 hover:bg-slate-50/40 dark:hover:bg-slate-800/10"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center transition-all shadow-sm shrink-0",
                    isGroupOpen ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                  )}>
                    {group.icon}
                  </div>
                  <span className="text-[26px] font-black tracking-tight">{group.titleKey ? t(group.titleKey) : group.titleNative}</span>
                </div>
                <ChevronDown className={cn('w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0', isGroupOpen && 'rotate-180')} />
              </button>

              {/* Accordion List Items */}
              <AnimatePresence initial={false}>
                {isGroupOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="overflow-hidden bg-slate-50/20 dark:bg-transparent border-t border-slate-100/40 dark:border-slate-800/40 px-2.5 py-2 space-y-1"
                  >
                    {group.items.map((item) => {
                       const active = isItemActive(item.path);
                       return (
                         <Link
                           key={item.id}
                           to={item.path}
                           onClick={(e) => handleItemClick(item, e)}
                           className={cn(
                             'flex items-center gap-3.5 px-3 py-2.5 text-[26px] font-bold rounded-xl transition-all relative group/navlink select-none border border-transparent',
                             active 
                               ? 'text-blue-600 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/40 border-blue-100/40 dark:border-blue-900/30 font-black shadow-sm' 
                               : 'text-slate-600 dark:text-neutral-300 hover:bg-slate-100/50 dark:hover:bg-slate-800/30 hover:text-blue-600 dark:hover:text-blue-400'
                           )}
                         >
                          <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-colors",
                            active 
                              ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400" 
                              : "bg-white dark:bg-slate-900 text-slate-400 group-hover/navlink:text-blue-500"
                          )}>
                            {item.icon}
                          </div>
                          <span className="truncate leading-tight">{item.titleKey ? t(item.titleKey) : item.titleNative}</span>
                          
                          {/* Indicator pulse for active link */}
                          {active && (
                            <span className="absolute left-3 w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
                          )}
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        {filteredNavStructure.length === 0 && (
          <div className="py-12 text-center select-none">
            <Search className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
            <p className="text-xs font-bold text-slate-400 dark:text-slate-500">{t('misc.no_results', 'لا توجد نتائج مطابقة لبحثك')}</p>
          </div>
        )}
      </div>

      {/* Footer controls inside Sidebar */}
      {!isCollapsed ? (
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 select-none bg-white/50 dark:bg-slate-950/20">
          {/* Quick Access Utility Actions */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <button 
              onClick={toggleDarkMode} 
              className="flex items-center justify-center gap-2 p-2 px-3 bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-all shadow-sm group font-bold text-[11px] text-slate-600 dark:text-neutral-300 cursor-pointer"
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-500" /> : <Moon className="w-3.5 h-3.5 text-slate-400 dark:text-neutral-400" />}
              <span>{isDarkMode ? 'الوضع المضيء' : 'الوضع الليلي'}</span>
            </button>
            <div className="relative flex justify-center bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded-xl max-h-[34px] overflow-hidden">
              <LanguageSwitcher />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-2">
            <button
              onClick={() => setIsCalcOpen(!isCalcOpen)}
              className={cn(
                "col-span-4 flex flex-col items-center justify-center gap-1 p-2 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-xl transition-all hover:shadow-lg hover:shadow-blue-500/10 active:scale-95 cursor-pointer shadow-sm relative overflow-hidden group border border-transparent"
              )}
              title="الحاسبة المالية"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
              <Calculator className="w-4 h-4" />
              <span className="text-[9px] font-black">الحاسبة</span>
            </button>
            
            <div className="col-span-8 bg-slate-900 duration-300 p-2 text-center shadow-md rounded-xl flex flex-col justify-center select-none">
              <p className="text-[9px] text-slate-400 font-bold mb-0.5">المحاسب المسؤول</p>
              <p className="text-[11px] font-black text-white">روبير رأفت</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 text-center flex flex-col gap-3 select-none">
          <button 
            onClick={() => setIsCalcOpen(!isCalcOpen)}
            className={cn(
              "p-2 rounded-xl cursor-pointer inline-flex items-center justify-center transition-all border shadow-sm",
              isCalcOpen 
                ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20" 
                : "bg-white dark:bg-slate-900 border-slate-200/50 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
            )}
            title="الحاسبة المالية"
          >
            <Calculator className="w-4 h-4 animate-pulse" />
          </button>
          
          <button 
            onClick={toggleCollapse}
            className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 rounded-xl cursor-pointer inline-flex items-center justify-center border border-transparent"
          >
            {isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* 1. Desktop Persistent Right Sidebar */}
      <aside 
        className={cn(
          "hidden lg:block fixed top-0 bottom-0 z-40 transition-all duration-300 border-l border-slate-200 dark:border-slate-800 shadow-glass",
          isRtl ? "right-0" : "left-0",
          isCollapsed ? "w-20" : "w-80"
        )}
      >
        {renderSidebarContent()}
      </aside>

      {/* 2. Mobile Responsive Slide-over Sidebar Drawer */}
      <AnimatePresence>
        {isOpenMobile && (
          <>
            {/* Backdrop shroud */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpenMobile(false)}
              className="fixed inset-0 bg-slate-950 z-50 lg:hidden cursor-pointer"
            />
            {/* Sliding navigation drawer */}
            <motion.div
              initial={{ x: isRtl ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRtl ? '100%' : '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className={cn(
                "fixed top-0 bottom-0 w-[300px] z-[51] lg:hidden shadow-2xl overflow-hidden flex flex-col",
                isRtl ? "right-0" : "left-0"
              )}
            >
              {/* Header inside drawer */}
              <div className="p-4 border-b border-slate-150 bg-white dark:bg-slate-900 flex justify-between items-center select-none">
                <div className="flex items-center gap-2">
                  <img src={LOGO_URL} alt="Logo" className="w-6 h-6 rounded-lg" />
                  <span className="font-extrabold text-xs text-slate-900 dark:text-neutral-100">بوابة ايليجا للمحاسبة</span>
                </div>
                <button 
                  onClick={() => setIsOpenMobile(false)}
                  className="p-1.5 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-rose-50 hover:text-rose-600 rounded-lg cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 overflow-hidden">
                {renderSidebarContent()}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 3. Interactive Drawers (AI, Profile, Settings) sliding from opposite end (Left) */}
      <AnimatePresence>
        {activeDrawer && (
          <>
            {/* Drawer Backdrop Shroud */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveDrawer(null)}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-[60] cursor-pointer"
            />

            {/* Sliding Panel */}
            <motion.div
              initial={{ x: isRtl ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRtl ? '-100%' : '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 225 }}
              className={cn(
                "fixed top-0 bottom-0 w-full sm:w-[420px] bg-white dark:bg-slate-900 border-slate-200/60 dark:border-slate-800 z-[61] shadow-2xl flex flex-col",
                isRtl ? "left-0 border-r" : "right-0 border-l"
              )}
            >
              {/* AI CHAT ASSISTANT WORKSPACE */}
              {activeDrawer === 'ai' && (
                <div className="flex flex-col h-full">
                  <div className="p-5 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900 flex items-center justify-between select-none">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-purple-500/20 animate-pulse">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col text-right">
                        <span className="font-extrabold text-sm text-slate-900 dark:text-neutral-100">المساعد المحاسبي الذكي</span>
                        <span className="text-[10px] text-amber-600 font-bold">بوابة التحليل بالذكاء الاصطناعي</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={handleClearChat}
                        className="p-1 px-2.5 bg-slate-200/60 hover:bg-slate-200 dark:bg-slate-800 dark:text-neutral-300 text-[10px] font-bold rounded-lg cursor-pointer"
                        title="إعادة التصفير"
                      >
                        تصفير
                      </button>
                      <button 
                        onClick={() => setActiveDrawer(null)}
                        className="p-1.5 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 dark:bg-slate-800 dark:hover:bg-rose-900/30 rounded-lg transition-colors cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Chat Message Scroll */}
                  <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/20 dark:bg-slate-950/10 custom-scrollbar">
                    {chatMessages.map((msg, i) => (
                      <div 
                        key={i} 
                        className={cn(
                          "flex flex-col max-w-[85%] rounded-2xl p-4 shadow-sm",
                          msg.sender === 'ai' 
                            ? "bg-white dark:bg-slate-800 self-start border border-slate-100 dark:border-slate-700/60 text-right text-slate-800 dark:text-neutral-200" 
                            : "bg-blue-600 text-white self-end text-right"
                        )}
                      >
                        <p className="text-xs font-medium leading-relaxed whitespace-pre-line">{msg.text}</p>
                        <span className={cn(
                          "text-[9px] mt-1.5 font-bold block",
                          msg.sender === 'ai' ? "text-slate-400" : "text-blue-200"
                        )}>{msg.time}</span>
                      </div>
                    ))}
                    
                    {isAiTyping && (
                      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 self-start border border-slate-100 dark:border-slate-700/60 shadow-sm flex items-center gap-2">
                        <span className="text-xs text-purple-600 font-bold">المساعد يقوم بالتحليل الآن</span>
                        <div className="flex gap-1">
                          <span className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-bounce delay-75" />
                          <span className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-bounce delay-150" />
                          <span className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-bounce delay-300" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Preset Options to assist user click actions */}
                  <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800/60 bg-white dark:bg-slate-900 select-none">
                    <p className="text-[10px] text-slate-400 font-bold mb-2 text-right">نقاط بحث شائعة للتدقيق والمطابقة:</p>
                    <div className="flex flex-wrap gap-2 justify-end">
                      <button 
                        onClick={() => setUserInput('ما هي معايير المخزون الدولي IAS 2 في التقييم؟')}
                        className="text-[10px] font-semibold bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-neutral-300 text-slate-600 p-2.5 rounded-lg border border-slate-150 dark:border-slate-800 cursor-pointer"
                      >
                        معايير المخزون IAS 2
                      </button>
                      <button 
                        onClick={() => setUserInput('عندي رصيد عملاء بقيمة 10,000 ج كيف أحلله وأحسب الديون المشكوك فيها؟')}
                        className="text-[10px] font-semibold bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-neutral-300 text-slate-600 p-2.5 rounded-lg border border-slate-150 dark:border-slate-800 cursor-pointer"
                      >
                        تحليل العملاء والديون
                      </button>
                      <button 
                        onClick={() => setUserInput('قارن جرد المستمر والجرد الدوري للمخازن')}
                        className="text-[10px] font-semibold bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-neutral-300 text-slate-600 p-2.5 rounded-lg border border-slate-150 dark:border-slate-800 cursor-pointer"
                      >
                        الجرد المستمر والدوري
                      </button>
                    </div>
                  </div>

                  {/* Message Input container */}
                  <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <div className="relative flex items-center">
                      <input 
                        type="text"
                        placeholder="اطرح تحدياً محاسبياً أو اطلب شرح معيار..."
                        className="w-full pr-4 pl-12 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-2xl text-xs font-black focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:bg-white text-right"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={(e) => { if(e.key === 'Enter') handleSendAiMessage(); }}
                      />
                      <button 
                        onClick={handleSendAiMessage}
                        className="absolute left-2.5 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/10 cursor-pointer active:scale-95 transition-transform"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* USER PROFESSIONAL PROFILE VIEW */}
              {activeDrawer === 'profile' && (
                <div className="flex flex-col h-full bg-slate-50/30 dark:bg-slate-900">
                  {/* Title Header */}
                  <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 select-none flex justify-between items-center">
                    <span className="font-extrabold text-sm text-slate-900 dark:text-neutral-100">تحليل الحساب والملف المحاسبي</span>
                    <button 
                      onClick={() => setActiveDrawer(null)}
                      className="p-1.5 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 dark:bg-slate-800 dark:hover:bg-rose-900/30 rounded-lg cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Profile Layout scrolls */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-6 text-right">
                    {/* User Profile Emblem */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-150 dark:border-slate-700/60 shadow-sm text-center flex flex-col items-center select-none">
                      <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-blue-500/20 mb-4 font-sans select-none border-4 border-white dark:border-slate-700">
                        ر
                      </div>
                      <h4 className="text-lg font-black text-slate-900 dark:text-neutral-100">روبير رأفت</h4>
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-bold mt-1">مدير حسابات واستشاري مالي محترف</p>
                      <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-150 dark:border-emerald-900/50 rounded-full text-[10px] font-bold">
                        رئيس قسم الحسابات مالي أول
                      </div>
                    </div>

                    {/* Operational Statistics */}
                    <div className="space-y-3">
                      <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2 pr-1 select-none">إحصائيات الأداء والمراجعة الحالية:</h5>
                      <div className="grid grid-cols-2 gap-3 pb-2 select-none">
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50 shadow-sm text-center">
                          <p className="text-[10px] font-black text-slate-400 mb-1">الخبرة المهنية</p>
                          <p className="text-base font-black text-slate-900 dark:text-neutral-100">15+ سنة</p>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50 shadow-sm text-center">
                          <p className="text-[10px] font-black text-slate-400 mb-1">العمليات المدققة</p>
                          <p className="text-base font-black text-emerald-600">منجزة بالكامل</p>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50 shadow-sm text-center">
                          <p className="text-[10px] font-black text-slate-400 mb-1">تطابق الحسابات</p>
                          <p className="text-base font-black text-blue-600">100%</p>
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50 shadow-sm text-center">
                          <p className="text-[10px] font-black text-slate-400 mb-1">أبحاث محفوظة</p>
                          <p className="text-base font-black text-purple-600">نشط</p>
                        </div>
                      </div>
                    </div>

                    {/* Account Contact details */}
                    <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-150 dark:border-slate-700/50 space-y-3.5 select-none text-[12px] text-slate-600 dark:text-neutral-300">
                      <div className="flex justify-between border-b border-slate-100 dark:border-slate-700/60 pb-2">
                        <span className="font-bold">robert.raafat.86@gmail.com</span>
                        <span className="font-black text-slate-400">البريد الإلكتروني</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-100 dark:border-slate-700/60 pb-2">
                        <span className="font-bold">01208538580</span>
                        <span className="font-black text-slate-400">المحمول (واتس آب)</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-100 dark:border-slate-700/60 pb-2">
                        <span className="font-bold">الإسكندرية، مصر</span>
                        <span className="font-black text-slate-400">العنوان التشغيلي</span>
                      </div>
                      <div className="flex justify-between pt-1">
                        <span className="font-bold">العربية (الأم) / الإنجليزية</span>
                        <span className="font-black text-slate-400">لغات التخاطب</span>
                      </div>
                    </div>

                    <div className="bg-blue-600/5 dark:bg-blue-950/25 p-4 rounded-2xl border border-blue-500/10 text-center select-none">
                      <p className="text-[11px] font-black leading-relaxed text-blue-800 dark:text-blue-400">
                        "الالتزام الكامل بالدقة لضمان دقة وسلامة ومقابلة البيانات والمستندات المحاسبية والقانونية."
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ERP APP OPERATIONS & SETTINGS DRAWER */}
              {activeDrawer === 'settings' && (
                <div className="flex flex-col h-full bg-slate-50/30 dark:bg-slate-900">
                  {/* Title Header */}
                  <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 select-none flex justify-between items-center">
                    <span className="font-extrabold text-sm text-slate-900 dark:text-neutral-100">لوحة الإعدادات والتحكم بالنظام</span>
                    <button 
                      onClick={() => setActiveDrawer(null)}
                      className="p-1.5 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 dark:bg-slate-800 dark:hover:bg-rose-900/30 rounded-lg cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-6 space-y-6 text-right select-none">
                    {/* Visual Mode Selector */}
                    <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-150 dark:border-slate-700/60 space-y-4 shadow-sm">
                      <h5 className="font-black text-xs text-slate-800 dark:text-neutral-100">مظهر النظام المالي:</h5>
                      <div className="grid grid-cols-2 gap-3 text-center">
                        <button 
                          onClick={() => { if(isDarkMode) toggleDarkMode(); }}
                          className={cn(
                            "p-3.5 rounded-xl border font-bold text-xs flex flex-col items-center gap-1.5 transition-all cursor-pointer",
                            !isDarkMode ? "bg-blue-50/70 border-blue-200 text-blue-600" : "bg-slate-50 border-slate-150 text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:border-slate-800 dark:text-neutral-300"
                          )}
                        >
                          <Sun className="w-4 h-4" />
                          <span>الوضع النهاري</span>
                        </button>
                        <button 
                          onClick={() => { if(!isDarkMode) toggleDarkMode(); }}
                          className={cn(
                            "p-3.5 rounded-xl border font-bold text-xs flex flex-col items-center gap-1.5 transition-all cursor-pointer",
                            isDarkMode ? "bg-blue-950/40 border-blue-900 text-blue-400" : "bg-slate-50 border-slate-150 text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:border-slate-800 dark:text-neutral-300"
                          )}
                        >
                          <Moon className="w-4 h-4" />
                          <span>الوضع الليلي</span>
                        </button>
                      </div>
                    </div>

                    {/* Font Size Modifier Card */}
                    <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-150 dark:border-slate-700/60 space-y-4 shadow-sm">
                      <div className="flex justify-between items-center select-none">
                        <span className="text-[10px] bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-extrabold px-2 py-1 rounded-lg">إمكانية الوصول</span>
                        <h5 className="font-black text-xs text-slate-800 dark:text-neutral-100">مقياس حجم خطوط المنظومة:</h5>
                      </div>
                      <p className="text-[11px] leading-relaxed text-slate-450 dark:text-neutral-400 font-bold">
                        {isRtl 
                          ? "يمكنك تعديل حجم وقراءة نصوص المنظومة، الجداول والتقارير المالية لتسريع وسهولة المراجعة والتدقيق."
                          : "Modify system fonts, tables, and reporting scales seamlessly for rapid and easy auditing."}
                      </p>
                      
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={() => setFontSizeScale(prev => Math.max(115, prev - 5))}
                          className="p-3 bg-slate-50 border border-slate-150 hover:bg-slate-100 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-xl font-black text-xs text-slate-700 dark:text-neutral-100 transition-all cursor-pointer text-center"
                          title="تصغير الخط"
                        >
                          A -
                        </button>
                        <button
                          onClick={() => setFontSizeScale(140)}
                          className="p-3 bg-blue-50 border border-blue-200 hover:bg-blue-100 dark:bg-blue-950/40 dark:border-blue-900 dark:hover:bg-blue-900/60 rounded-xl font-extrabold text-xs text-blue-600 dark:text-blue-400 transition-all cursor-pointer text-center"
                          title="إعادة ضبط الحجم"
                        >
                          {fontSizeScale}%
                        </button>
                        <button
                          onClick={() => setFontSizeScale(prev => Math.min(175, prev + 5))}
                          className="p-3 bg-slate-50 border border-slate-150 hover:bg-slate-100 dark:bg-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 rounded-xl font-black text-xs text-slate-700 dark:text-neutral-100 transition-all cursor-pointer text-center"
                          title="تكبير الخط"
                        >
                          A +
                        </button>
                      </div>

                      {/* Visual gauge bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[9px] text-slate-400 font-bold px-1 select-none">
                          <span>115%</span>
                          <span>140% ({isRtl ? 'الافتراضي' : 'Default'})</span>
                          <span>175%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden relative">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-350"
                            style={{ width: `${((fontSizeScale - 115) / 60) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Language and i18n controls */}
                    <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-150 dark:border-slate-700/60 space-y-4 shadow-sm">
                      <h5 className="font-black text-xs text-slate-800 dark:text-neutral-100">لغة الواجهة وتوجيهات النصوص:</h5>
                      <div className="flex items-center justify-between border-t border-slate-100/60 pt-3">
                        <div className="relative border border-slate-200/60 dark:border-slate-700 rounded-xl overflow-hidden min-h-[38px] max-w-[140px]">
                          <LanguageSwitcher />
                        </div>
                        <span className="text-xs font-black text-slate-600 dark:text-neutral-300">اللغة الحالية للمنظومة</span>
                      </div>
                    </div>

                    {/* Cache Data Operations for practicers */}
                    <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-150 dark:border-slate-700/60 space-y-4 shadow-sm">
                      <h5 className="font-black text-xs text-rose-600">إدارة الذاكرة المؤقتة لممارسة الحسابات:</h5>
                      <p className="text-[11px] leading-relaxed text-slate-400 font-medium">إذا كنت بحاجة إلى حذف جميع قيود الخزينة، الفواتير، بيانات العملاء والموردين لممارسة العمليات المحاسبية من البداية، يمكنك تصفير البيانات فوراً.</p>
                      <button 
                        onClick={() => {
                          if (window.confirm('هل أنت متأكد من حذف وإعادة تصفير جميع أرصدة الخزينة والحركات المالية للعملاء الموردين؟')) {
                            localStorage.removeItem('erp_customers');
                            localStorage.removeItem('erp_suppliers');
                            localStorage.removeItem('erp_treasury');
                            localStorage.removeItem('erp_inventory');
                            localStorage.removeItem('erp_inventory_movements');
                            localStorage.removeItem('erp_settlements');
                            localStorage.removeItem('erp_inventory_jard');
                            window.location.reload();
                          }
                        }}
                        className="w-full bg-rose-50 border border-rose-150 hover:bg-rose-100 text-rose-600 text-xs font-bold py-3 px-4 rounded-xl transition-all cursor-pointer text-center"
                      >
                        تحذير: تصفير أرصدة الذاكرة المؤقتة (Reset ERP)
                      </button>
                    </div>

                    {/* Custom Sidebar Advertisement Slot */}
                    <AdsRenderer type="sidebar" isRtl={isRtl} className="mb-4" />

                    {/* Operational Support card */}
                    <div className="p-4 bg-slate-100 dark:bg-slate-800/60 rounded-xl border border-slate-200/50 dark:border-slate-800 text-center text-xs">
                      <p className="font-bold text-slate-400 uppercase tracking-widest mb-1">نسخة النظام الحالي</p>
                      <p className="font-semibold text-slate-700 dark:text-neutral-200">v4.0.0 (النسخة المهنية المستقرة)</p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 4. Beautiful Portable/Floating Financial Pocket Calculator */}
      <AnimatePresence>
        {isCalcOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className={cn(
              "fixed z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800 shadow-2xl rounded-3xl w-72 p-4 flex flex-col select-none",
              isRtl 
                ? cn(
                    "bottom-28",
                    isCollapsed ? "right-24" : "right-[336px]"
                  ) 
                : cn(
                    "bottom-28",
                    isCollapsed ? "left-24" : "left-[336px]"
                  ),
              "max-lg:bottom-20 max-lg:right-4 max-lg:left-auto max-lg:w-80 max-sm:right-4 max-sm:left-4 max-sm:w-auto"
            )}
            style={{ direction: isRtl ? 'rtl' : 'ltr' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-blue-100 dark:bg-blue-900/40 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Calculator className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-[11px] font-black text-slate-800 dark:text-neutral-100">الحاسبة المالية</span>
                  <span className="text-[8px] text-emerald-600 font-bold dark:text-emerald-400">شاملة ضريبة القيمة المضافة ١٤٪</span>
                </div>
              </div>
              <button 
                onClick={() => setIsCalcOpen(false)}
                className="p-1 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-md transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Display screen */}
            <div className="my-4 bg-slate-50 dark:bg-slate-950/80 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-905/30 flex flex-col items-end gap-1 text-right min-h-[76px] justify-between relative overflow-hidden shadow-inner font-sans">
              {/* Formula Tape */}
              <span className="text-[10px] text-slate-400 dark:text-neutral-500 font-mono font-medium truncate w-full block min-h-[14px]">
                {calcFormula}
              </span>
              {/* Active Value */}
              <span className="text-xl font-bold font-mono tracking-tight text-slate-800 dark:text-neutral-100 truncate w-full block">
                {formatCalcString(calcDisplay)}
              </span>
              {/* Pending Operation indicator in display */}
              {calcOp && (
                <span className="absolute bottom-1 left-3 text-[9px] font-mono p-0.5 px-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md">
                  {calcOp}
                </span>
              )}
            </div>

            {/* Keypad Grid */}
            <div className="grid grid-cols-4 gap-2">
              {/* Row 1 */}
              <button 
                onClick={() => handleCalcKey('C')} 
                className="py-2.5 text-xs font-bold rounded-xl bg-rose-50/60 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/30 hover:bg-rose-100/60 dark:hover:bg-rose-900/20 active:scale-95 transition-all cursor-pointer"
              >
                C
              </button>
              <button 
                onClick={() => handleCalcKey('⌫')} 
                className="py-2.5 text-xs font-bold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition-all cursor-pointer flex items-center justify-center font-sans"
              >
                ⌫
              </button>
              <button 
                onClick={() => handleCalcKey('+/-')} 
                className="py-2.5 text-xs font-bold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition-all cursor-pointer"
              >
                +/-
              </button>
              <button 
                onClick={() => handleCalcKey('÷')} 
                className="py-2.5 text-sm font-black rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100/40 dark:border-blue-900/30 hover:bg-blue-105 dark:hover:bg-blue-900/55 active:scale-95 transition-all cursor-pointer"
              >
                ÷
              </button>

              {/* Row 2 */}
              <button 
                onClick={() => handleCalcKey('7')} 
                className="py-2.5 text-xs font-bold rounded-xl bg-slate-100/50 dark:bg-slate-800/50 text-slate-700 dark:text-neutral-200 hover:bg-slate-200/50 dark:hover:bg-slate-800 active:scale-95 transition-all cursor-pointer font-sans"
              >
                7
              </button>
              <button 
                onClick={() => handleCalcKey('8')} 
                className="py-2.5 text-xs font-bold rounded-xl bg-slate-100/50 dark:bg-slate-800/50 text-slate-700 dark:text-neutral-200 hover:bg-slate-200/50 dark:hover:bg-slate-800 active:scale-95 transition-all cursor-pointer font-sans"
              >
                8
              </button>
              <button 
                onClick={() => handleCalcKey('9')} 
                className="py-2.5 text-xs font-bold rounded-xl bg-slate-100/50 dark:bg-slate-800/50 text-slate-700 dark:text-neutral-200 hover:bg-slate-200/50 dark:hover:bg-slate-800 active:scale-95 transition-all cursor-pointer font-sans"
              >
                9
              </button>
              <button 
                onClick={() => handleCalcKey('×')} 
                className="py-2.5 text-sm font-black rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100/40 dark:border-blue-900/30 hover:bg-blue-105 dark:hover:bg-blue-900/55 active:scale-95 transition-all cursor-pointer"
              >
                ×
              </button>

              {/* Row 3 */}
              <button 
                onClick={() => handleCalcKey('4')} 
                className="py-2.5 text-xs font-bold rounded-xl bg-slate-100/50 dark:bg-slate-800/50 text-slate-700 dark:text-neutral-200 hover:bg-slate-200/50 dark:hover:bg-slate-800 active:scale-95 transition-all cursor-pointer font-sans"
              >
                4
              </button>
              <button 
                onClick={() => handleCalcKey('5')} 
                className="py-2.5 text-xs font-bold rounded-xl bg-slate-100/50 dark:bg-slate-800/50 text-slate-700 dark:text-neutral-200 hover:bg-slate-200/50 dark:hover:bg-slate-800 active:scale-95 transition-all cursor-pointer font-sans"
              >
                5
              </button>
              <button 
                onClick={() => handleCalcKey('6')} 
                className="py-2.5 text-xs font-bold rounded-xl bg-slate-100/50 dark:bg-slate-800/50 text-slate-700 dark:text-neutral-200 hover:bg-slate-200/50 dark:hover:bg-slate-800 active:scale-95 transition-all cursor-pointer font-sans"
              >
                6
              </button>
              <button 
                onClick={() => handleCalcKey('-')} 
                className="py-2.5 text-sm font-black rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100/40 dark:border-blue-900/30 hover:bg-blue-105 dark:hover:bg-blue-900/55 active:scale-95 transition-all cursor-pointer font-sans"
              >
                -
              </button>

              {/* Row 4 */}
              <button 
                onClick={() => handleCalcKey('1')} 
                className="py-2.5 text-xs font-bold rounded-xl bg-slate-100/50 dark:bg-slate-800/50 text-slate-700 dark:text-neutral-200 hover:bg-slate-200/50 dark:hover:bg-slate-800 active:scale-95 transition-all cursor-pointer font-sans"
              >
                1
              </button>
              <button 
                onClick={() => handleCalcKey('2')} 
                className="py-2.5 text-xs font-bold rounded-xl bg-slate-100/50 dark:bg-slate-800/50 text-slate-700 dark:text-neutral-200 hover:bg-slate-200/50 dark:hover:bg-slate-800 active:scale-95 transition-all cursor-pointer font-sans"
              >
                2
              </button>
              <button 
                onClick={() => handleCalcKey('3')} 
                className="py-2.5 text-xs font-bold rounded-xl bg-slate-100/50 dark:bg-slate-800/50 text-slate-700 dark:text-neutral-200 hover:bg-slate-200/50 dark:hover:bg-slate-800 active:scale-95 transition-all cursor-pointer font-sans"
              >
                3
              </button>
              <button 
                onClick={() => handleCalcKey('+')} 
                className="py-2.5 text-sm font-black rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100/40 dark:border-blue-900/30 hover:bg-blue-105 dark:hover:bg-blue-900/55 active:scale-95 transition-all cursor-pointer font-sans"
              >
                +
              </button>

              {/* Row 5 */}
              <button 
                onClick={() => handleCalcKey('%')} 
                className="py-2.5 text-xs font-bold rounded-xl bg-slate-100/50 dark:bg-slate-800/50 text-slate-700 dark:text-neutral-200 hover:bg-slate-200/50 dark:hover:bg-slate-800 active:scale-95 transition-all cursor-pointer font-sans"
              >
                %
              </button>
              <button 
                onClick={() => handleCalcKey('0')} 
                className="py-2.5 text-xs font-bold rounded-xl bg-slate-100/50 dark:bg-slate-800/50 text-slate-700 dark:text-neutral-200 hover:bg-slate-200/50 dark:hover:bg-slate-800 active:scale-95 transition-all cursor-pointer font-sans"
              >
                0
              </button>
              <button 
                onClick={() => handleCalcKey('.')} 
                className="py-2.5 text-xs font-bold rounded-xl bg-slate-100/50 dark:bg-slate-800/50 text-slate-700 dark:text-neutral-200 hover:bg-slate-200/50 dark:hover:bg-slate-800 active:scale-95 transition-all cursor-pointer font-sans"
              >
                .
              </button>
              <button 
                onClick={() => handleCalcKey('=')} 
                className="py-2.5 text-base font-black rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/10 active:scale-95 transition-all cursor-pointer"
              >
                =
              </button>
            </div>

            {/* Special VAT actions */}
            <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button 
                onClick={() => handleCalcKey('+VAT')} 
                className="py-2 text-[10px] font-black rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/25 dark:hover:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border border-emerald-150 dark:border-emerald-900/40 active:scale-95 transition-all cursor-pointer text-center"
                title="إضافة ضريبة القيمة المضافة ١٤٪ بضرب القيمة في ١.١٤"
              >
                إضافة ضريبة +١٤٪
              </button>
              <button 
                onClick={() => handleCalcKey('-VAT')} 
                className="py-2 text-[10px] font-black rounded-lg bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/25 dark:hover:bg-amber-900/30 text-amber-600 dark:text-amber-400 border border-amber-150 dark:border-amber-900/40 active:scale-95 transition-all cursor-pointer text-center"
                title="استبعاد ضريبة القيمة المضافة ١٤٪ بقسمة القيمة على ١.١٤"
              >
                استبعاد ضريبة -١٤٪
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
