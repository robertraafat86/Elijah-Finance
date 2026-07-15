import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import {
  CreditCard,
  ShieldCheck,
  Award,
  Lock,
  Unlock,
  Check,
  X,
  ChevronRight,
  Plus,
  Send,
  Eye,
  Sparkles,
  Clock,
  User,
  AlertCircle,
  Info,
  ExternalLink,
  CheckCircle,
  HelpCircle,
  TrendingUp,
  PieChart,
  FileText,
  Download,
  Layers,
  RefreshCcw,
  BadgeAlert,
  Coins,
  Receipt,
  Calendar,
  ArrowUpRight,
  CheckSquare,
  Building,
  Settings,
  ArrowLeft
} from 'lucide-react';
import { cn } from '../lib/utils';

// Types and Interfaces
interface Invoice {
  id: string;
  date: string;
  amount: number;
  plan: 'free' | 'premium' | 'enterprise';
  status: 'paid' | 'pending' | 'failed';
  paymentMethod: string;
}

interface UserProfile {
  name: string;
  email: string;
  company: string;
  role: string;
  joinedDate: string;
}

interface MembershipState {
  currentPlan: 'free' | 'premium' | 'enterprise';
  billingCycle: 'monthly' | 'yearly';
  startDate: string;
  nextRenewalDate: string;
  isAutoRenew: boolean;
  paymentMethod: {
    brand: string;
    last4: string;
    expiry: string;
  } | null;
  usageStats: {
    aiPrompts: number;
    aiPromptsMax: number;
    templateDownloads: number;
    templateDownloadsMax: number;
    consultingMinutes: number;
    consultingMinutesMax: number;
  };
}

const DEFAULT_PROFILE: UserProfile = {
  name: "رأفت عبد العزيز",
  email: "robert.raafat.86@gmail.com",
  company: "المتحدة للمحاسبة والمراجعة",
  role: "شريك محاسب قانوني",
  joinedDate: "2026-01-15"
};

const DEFAULT_MEMBERSHIP: MembershipState = {
  currentPlan: 'free',
  billingCycle: 'monthly',
  startDate: "2026-07-01",
  nextRenewalDate: "2026-08-01",
  isAutoRenew: true,
  paymentMethod: null,
  usageStats: {
    aiPrompts: 3,
    aiPromptsMax: 5,
    templateDownloads: 1,
    templateDownloadsMax: 2,
    consultingMinutes: 0,
    consultingMinutesMax: 0
  }
};

const INITIAL_INVOICES: Invoice[] = [
  {
    id: "INV-2026-001",
    date: "2026-07-01",
    amount: 0,
    plan: 'free',
    status: 'paid',
    paymentMethod: "N/A"
  }
];

export default function Membership() {
  const { i18n, t } = useTranslation();
  const isRtl = i18n.language === 'ar';

  // Active Tab: 'dashboard' | 'plans' | 'permissions' | 'billing'
  const [activeTab, setActiveTab] = useState<'dashboard' | 'plans' | 'permissions' | 'billing'>('dashboard');

  // Persistence States
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [membership, setMembership] = useState<MembershipState>(DEFAULT_MEMBERSHIP);
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);

  // Toggle state for plan checkout billing interval
  const [pricingCycle, setPricingCycle] = useState<'monthly' | 'yearly'>('monthly');

  // Interaction State
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<'free' | 'premium' | 'enterprise' | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'details' | 'card' | 'success'>('details');
  const [checkoutCard, setCheckoutCard] = useState({ number: '', name: '', expiry: '', cvc: '' });

  // Invoice view state
  const [activeInvoiceDetails, setActiveInvoiceDetails] = useState<Invoice | null>(null);

  // Permission Simulator Interactive State
  const [selectedAction, setSelectedAction] = useState<string>('ai_advisor');
  const [simulationResult, setSimulationResult] = useState<{
    status: 'success' | 'restricted';
    messageAr: string;
    messageEn: string;
    requiredPlan: 'free' | 'premium' | 'enterprise';
  } | null>(null);

  // Load from local storage
  useEffect(() => {
    const savedProfile = localStorage.getItem('elijah_membership_profile');
    const savedMembership = localStorage.getItem('elijah_membership_data');
    const savedInvoices = localStorage.getItem('elijah_membership_invoices');

    if (savedProfile) setProfile(JSON.parse(savedProfile));
    if (savedMembership) setMembership(JSON.parse(savedMembership));
    if (savedInvoices) setInvoices(JSON.parse(savedInvoices));
  }, []);

  // Sync back to local storage helper
  const saveState = (newProfile: UserProfile, newMembership: MembershipState, newInvoices: Invoice[]) => {
    setProfile(newProfile);
    setMembership(newMembership);
    setInvoices(newInvoices);
    localStorage.setItem('elijah_membership_profile', JSON.stringify(newProfile));
    localStorage.setItem('elijah_membership_data', JSON.stringify(newMembership));
    localStorage.setItem('elijah_membership_invoices', JSON.stringify(newInvoices));
  };

  // Pricing Data
  const PRICING_PLANS = {
    free: {
      nameAr: "الباقة المجانية (الأساسية)",
      nameEn: "Free Standard Plan",
      priceMonthly: 0,
      priceYearly: 0,
      color: "from-slate-700 to-slate-900",
      accent: "slate"
    },
    premium: {
      nameAr: "الباقة الاحترافية (Premium)",
      nameEn: "Premium Accountant",
      priceMonthly: 49,
      priceYearly: 470, // ~20% off
      color: "from-indigo-600 to-indigo-800",
      accent: "indigo"
    },
    enterprise: {
      nameAr: "باقة مكاتب المراجعة والشركات",
      nameEn: "Enterprise Auditing Suite",
      priceMonthly: 149,
      priceYearly: 1430, // ~20% off
      color: "from-violet-600 to-fuchsia-800",
      accent: "violet"
    }
  };

  // Permission actions list
  const INTERACTIVE_ACTIONS = [
    {
      id: 'basic_tools',
      labelAr: "استخدام الحاسبات والآلات الضريبية الأساسية",
      labelEn: "Use basic tax and depreciation calculators",
      requiredPlan: 'free'
    },
    {
      id: 'ai_advisor',
      labelAr: "طرح سؤال فني على المستشار الضريبي بالذكاء الاصطناعي",
      labelEn: "Ask a tax/IFRS query to the server-side AI Advisor",
      requiredPlan: 'premium'
    },
    {
      id: 'templates_download',
      labelAr: "تحميل نماذج دفاتر اليومية وقوائم مالية إكسل احترافية",
      labelEn: "Download advanced accounting journal & ledger Excel templates",
      requiredPlan: 'premium'
    },
    {
      id: 'consulting_minutes',
      labelAr: "حجز جلسة زووم 1-على-1 لمراجعة ميزانية مع خبير قانوني",
      labelEn: "Schedule a 1-on-1 Zoom audit consultation with a legal expert",
      requiredPlan: 'enterprise'
    },
    {
      id: 'advanced_api',
      labelAr: "ربط برامج الفوترة والضرائب عبر API منظومة إيليجا الموحدة",
      labelEn: "Integrate ERP systems with Elijah Unified Tax APIs",
      requiredPlan: 'enterprise'
    }
  ];

  // Feature limits helper
  const getLimitsForPlan = (plan: 'free' | 'premium' | 'enterprise') => {
    switch (plan) {
      case 'enterprise':
        return { aiPromptsMax: 9999, templateDownloadsMax: 9999, consultingMinutesMax: 60 };
      case 'premium':
        return { aiPromptsMax: 100, templateDownloadsMax: 50, consultingMinutesMax: 0 };
      default:
        return { aiPromptsMax: 5, templateDownloadsMax: 2, consultingMinutesMax: 0 };
    }
  };

  // Test Action simulation logic
  const handleTestPermission = (actionId: string) => {
    const action = INTERACTIVE_ACTIONS.find(a => a.id === actionId);
    if (!action) return;

    const userPlan = membership.currentPlan;
    const requiredPlan = action.requiredPlan;

    // Check hierarchy: enterprise > premium > free
    const planHierarchy = { free: 1, premium: 2, enterprise: 3 };
    const userRank = planHierarchy[userPlan];
    const requiredRank = planHierarchy[requiredPlan];

    if (userRank >= requiredRank) {
      setSimulationResult({
        status: 'success',
        messageAr: `✓ تم منح الإذن! حسابك النشط (${userPlan === 'enterprise' ? 'باقة الشركات' : userPlan === 'premium' ? 'الباقة الاحترافية' : 'الباقة المجانية'}) يمنحك الصلاحية الفورية لهذه العملية.`,
        messageEn: `✓ Access Granted! Your active ${userPlan.toUpperCase()} subscription provides immediate permission to execute this operation.`,
        requiredPlan: requiredPlan as any
      });
    } else {
      setSimulationResult({
        status: 'restricted',
        messageAr: `✕ تم رفض الصلاحية! يتطلب هذا الإجراء ترقية اشتراكك إلى (${requiredPlan === 'enterprise' ? 'باقة الشركات' : 'الباقة الاحترافية'}).`,
        messageEn: `✕ Access Denied! This feature requires upgrading your current workspace subscription to the ${requiredPlan.toUpperCase()} plan.`,
        requiredPlan: requiredPlan as any
      });
    }
  };

  // Trigger test immediately when action selection changes
  useEffect(() => {
    handleTestPermission(selectedAction);
  }, [selectedAction, membership.currentPlan]);

  // Upgrade / Downgrade Plan execution
  const executeSubscriptionChange = (plan: 'free' | 'premium' | 'enterprise') => {
    setIsProcessingPayment(true);
    
    setTimeout(() => {
      const cycle = pricingCycle;
      const amountToPay = cycle === 'monthly' ? PRICING_PLANS[plan].priceMonthly : PRICING_PLANS[plan].priceYearly;
      const planLimits = getLimitsForPlan(plan);
      
      const newMembership: MembershipState = {
        currentPlan: plan,
        billingCycle: cycle,
        startDate: new Date().toISOString().split('T')[0],
        nextRenewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        isAutoRenew: true,
        paymentMethod: plan === 'free' ? null : {
          brand: "Visa",
          last4: checkoutCard.number ? checkoutCard.number.slice(-4) : "4242",
          expiry: checkoutCard.expiry || "12/28"
        },
        usageStats: {
          aiPrompts: 0,
          aiPromptsMax: planLimits.aiPromptsMax,
          templateDownloads: 0,
          templateDownloadsMax: planLimits.templateDownloadsMax,
          consultingMinutes: 0,
          consultingMinutesMax: planLimits.consultingMinutesMax
        }
      };

      const newInvoice: Invoice = {
        id: `INV-2026-${String(invoices.length + 1).padStart(3, '0')}`,
        date: new Date().toISOString().split('T')[0],
        amount: amountToPay,
        plan: plan,
        status: plan === 'free' ? 'paid' : 'paid',
        paymentMethod: plan === 'free' ? 'N/A' : `Visa (••• ${newMembership.paymentMethod?.last4})`
      };

      const updatedInvoices = [newInvoice, ...invoices];

      saveState(profile, newMembership, updatedInvoices);
      setIsProcessingPayment(false);
      setCheckoutStep('success');
    }, 2000);
  };

  // Toggle auto renew
  const handleToggleAutoRenew = () => {
    const updated = {
      ...membership,
      isAutoRenew: !membership.isAutoRenew
    };
    saveState(profile, updated, invoices);
  };

  // Cancel subscription (downgrade to free instantly for demo simplicity)
  const handleCancelSubscription = () => {
    if (confirm(isRtl ? "هل أنت متأكد من إلغاء تجديد اشتراكك والعودة للباقة المجانية؟" : "Are you sure you want to cancel auto-renewal and return to the Free plan?")) {
      const planLimits = getLimitsForPlan('free');
      const updated: MembershipState = {
        ...membership,
        currentPlan: 'free',
        isAutoRenew: false,
        paymentMethod: null,
        usageStats: {
          aiPrompts: 0,
          aiPromptsMax: planLimits.aiPromptsMax,
          templateDownloads: 0,
          templateDownloadsMax: planLimits.templateDownloadsMax,
          consultingMinutes: 0,
          consultingMinutesMax: planLimits.consultingMinutesMax
        }
      };
      saveState(profile, updated, invoices);
    }
  };

  // Save profile changes
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    saveState(profile, membership, invoices);
    alert(isRtl ? "تم حفظ بيانات الملف الشخصي بنجاح!" : "Workspace profile saved successfully!");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6" id="membership-system-view">
      
      {/* 1. Header Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-[2rem] p-8 md:p-12 relative overflow-hidden shadow-2xl mb-8 border border-slate-800">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-950/80 text-indigo-400 rounded-full text-xs font-black border border-indigo-900/40">
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-indigo-400" />
              <span>{isRtl ? "منظومة إدارة العضويات والاشتراكات" : "Elijah Subscription Control Engine"}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
              {isRtl ? "مركز إدارة العضويات والخدمات المتميزة" : "Elijah Membership & Billing Workspace"}
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl font-medium">
              {isRtl 
                ? "تحكم في باقة اشتراكك، وتابع فواتيرك، وخصص أذونات حسابك للوصول غير المحدود إلى مكتبة النماذج والملفات الضريبية وأداة المستشار الذكي المتكاملة."
                : "Manage your premium plan allowances, audit log receipts, configure billing profiles, and test dynamic service capabilities from one unified dashboard."}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50 backdrop-blur-md">
            <div className="p-3 bg-indigo-500 text-white rounded-xl">
              <Award className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{isRtl ? "الباقة النشطة حالياً" : "Current Workspace Tier"}</p>
              <p className="text-lg font-black text-white uppercase tracking-tight">
                {membership.currentPlan === 'enterprise' 
                  ? (isRtl ? "باقة الشركات والشركاء" : "Enterprise Suite")
                  : membership.currentPlan === 'premium'
                  ? (isRtl ? "الباقة الاحترافية" : "Premium Tier")
                  : (isRtl ? "الباقة المجانية الأساسية" : "Free Tier")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Responsive Multi-tab Selector */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 mb-8">
        {[
          { id: 'dashboard', labelAr: "لوحة التحكم للمشترك", labelEn: "Member Dashboard", icon: <Layers className="w-4 h-4" /> },
          { id: 'plans', labelAr: "خطط الأسعار والترقية", labelEn: "Pricing & Upgrade", icon: <CreditCard className="w-4 h-4" /> },
          { id: 'permissions', labelAr: "أذونات وصلاحيات الباقات", labelEn: "Permissions Simulator", icon: <ShieldCheck className="w-4 h-4" /> },
          { id: 'billing', labelAr: "الفواتير وبيانات الدفع", labelEn: "Billing & Invoices", icon: <Receipt className="w-4 h-4" /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={cn(
              "px-5 py-3 rounded-xl text-xs font-black flex items-center gap-2 cursor-pointer transition-all border-none focus:outline-hidden",
              activeTab === tab.id
                ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-md"
                : "bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/60"
            )}
          >
            {tab.icon}
            <span>{isRtl ? tab.labelAr : tab.labelEn}</span>
          </button>
        ))}
      </div>

      {/* 3. DYNAMIC VIEWS CONTAINER */}
      <div>
        
        {/* VIEW A: MEMBERSHIP DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-fadeIn" id="dashboard-tab-panel">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Member profile widget (4 cols) */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm space-y-6">
                  <div className="flex flex-col items-center text-center space-y-3 pb-6 border-b border-slate-100 dark:border-slate-800">
                    <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center font-black text-2xl border-4 border-indigo-50 dark:border-indigo-900">
                      {profile.name[0]}
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900 dark:text-white text-base">{profile.name}</h3>
                      <p className="text-xs text-slate-400 font-bold mt-0.5">{profile.role}</p>
                    </div>
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                      membership.currentPlan === 'enterprise'
                        ? "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300"
                        : membership.currentPlan === 'premium'
                        ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                        : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400"
                    )}>
                      {membership.currentPlan === 'enterprise' ? (isRtl ? "باقة المؤسسات والشركات" : "Enterprise Suite") : membership.currentPlan === 'premium' ? (isRtl ? "العضوية الممتازة" : "Premium Member") : (isRtl ? "عضو مجاني" : "Free Member")}
                    </span>
                  </div>

                  {/* Profile Edit Fields */}
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <h4 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider">
                      {isRtl ? "بيانات الحساب والمنشأة" : "Company & Account Details"}
                    </h4>
                    
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase">{isRtl ? "الاسم بالكامل" : "Full Name"}</label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-200"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase">{isRtl ? "اسم الشركة / مكتب المراجعة" : "Company / Firm Name"}</label>
                      <input
                        type="text"
                        value={profile.company}
                        onChange={(e) => setProfile({...profile, company: e.target.value})}
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-200"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase">{isRtl ? "المسمى الوظيفي" : "Corporate Role"}</label>
                      <input
                        type="text"
                        value={profile.role}
                        onChange={(e) => setProfile({...profile, role: e.target.value})}
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-200"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl text-xs font-black cursor-pointer border-none"
                    >
                      {isRtl ? "حفظ التعديلات" : "Save Workspace Profile"}
                    </button>
                  </form>
                </div>
              </div>

              {/* Usage Quotas and Stats (8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* Active Sub Plan overview Card */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
                    <div>
                      <h3 className="font-black text-sm text-slate-900 dark:text-white">
                        {isRtl ? "تفاصيل الاشتراك النشط" : "Subscription Coverage Details"}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {isRtl ? "الجدول الزمني لتجديد الاشتراك والاستحقاق السنوي" : "Cycle overview and active renewal parameters"}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                      <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                        {isRtl ? "نشط ومؤمن" : "Active & Secured"}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase font-black">{isRtl ? "دورة الفوترة" : "Billing Cycle"}</span>
                      <p className="text-sm font-black text-slate-800 dark:text-slate-100 mt-1 capitalize">
                        {membership.currentPlan === 'free' 
                          ? (isRtl ? "لا ينطبق" : "N/A") 
                          : membership.billingCycle === 'monthly' 
                          ? (isRtl ? "شهري" : "Monthly Interval") 
                          : (isRtl ? "سنوي" : "Annual Interval")}
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase font-black">{isRtl ? "تاريخ التجديد القادم" : "Next Renewal Date"}</span>
                      <p className="text-sm font-black text-slate-800 dark:text-slate-100 mt-1">
                        {membership.currentPlan === 'free' ? (isRtl ? "لا ينطبق" : "No Renewal") : membership.nextRenewalDate}
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 uppercase font-black">{isRtl ? "طريقة الدفع الحالية" : "Primary Card"}</span>
                      <p className="text-sm font-black text-slate-800 dark:text-slate-100 mt-1 flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4 text-slate-400" />
                        <span>
                          {membership.paymentMethod 
                            ? `${membership.paymentMethod.brand} •••• ${membership.paymentMethod.last4}` 
                            : (isRtl ? "غير مسجل" : "No Card Added")}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Auto renew toggle & actions if non-free */}
                  {membership.currentPlan !== 'free' && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={handleToggleAutoRenew}
                          className={cn(
                            "w-12 h-6 rounded-full transition-colors relative cursor-pointer border-none",
                            membership.isAutoRenew ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-800"
                          )}
                        >
                          <span className={cn(
                            "absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all shadow-xs",
                            isRtl 
                              ? (membership.isAutoRenew ? "right-6.5" : "right-0.5") 
                              : (membership.isAutoRenew ? "left-6.5" : "left-0.5")
                          )} />
                        </button>
                        <div>
                          <p className="text-xs font-black text-slate-800 dark:text-white">{isRtl ? "تجديد تلقائي نشط" : "Automatic Auto-Renewal"}</p>
                          <p className="text-[10px] text-slate-400">{isRtl ? "سيتم التجديد تلقائياً باستخدام البطاقة المسجلة" : "Your card will be charged automatically at the next cycle"}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setActiveTab('plans')}
                          className="px-4 py-2 text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-black cursor-pointer border-none"
                        >
                          {isRtl ? "تعديل خطة الاشتراك" : "Change Sub Tier"}
                        </button>
                        <button
                          onClick={handleCancelSubscription}
                          className="px-4 py-2 text-xs bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/20 dark:text-rose-400 rounded-xl font-bold cursor-pointer border-none"
                        >
                          {isRtl ? "إلغاء الاشتراك" : "Cancel Plan"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quota Indicators */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm space-y-6">
                  <div>
                    <h3 className="font-black text-sm text-slate-900 dark:text-white">
                      {isRtl ? "مؤشرات الموارد والحدود التراكمية" : "Workspace Plan Consumption & Allowances"}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {isRtl ? "تابع استهلاكك الفعلي للخدمات المدعومة في دورتك الحالية" : "Usage indicators representing resources allocated in this cycle"}
                    </p>
                  </div>

                  <div className="space-y-5">
                    {/* Quota 1: AI Advisor Prompts */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-black text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-indigo-500" />
                          <span>{isRtl ? "استشارات المستشار المحاسبي الذكي" : "AI Advisory Expert Tokens"}</span>
                        </span>
                        <span className="font-mono text-slate-500 font-bold">
                          {membership.currentPlan === 'enterprise' 
                            ? '∞' 
                            : `${membership.usageStats.aiPrompts} / ${membership.usageStats.aiPromptsMax}`}
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-500 transition-all duration-500"
                          style={{ 
                            width: `${membership.currentPlan === 'enterprise' ? 100 : (membership.usageStats.aiPrompts / membership.usageStats.aiPromptsMax) * 100}%` 
                          }}
                        />
                      </div>
                    </div>

                    {/* Quota 2: Excel Template Downloads */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-black text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                          <FileText className="w-4 h-4 text-emerald-500" />
                          <span>{isRtl ? "تحميل النماذج والقوالب المحاسبية الممتازة" : "Advanced Template Downloads"}</span>
                        </span>
                        <span className="font-mono text-slate-500 font-bold">
                          {membership.currentPlan === 'enterprise' 
                            ? '∞' 
                            : `${membership.usageStats.templateDownloads} / ${membership.usageStats.templateDownloadsMax}`}
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 transition-all duration-500"
                          style={{ 
                            width: `${membership.currentPlan === 'enterprise' ? 100 : (membership.usageStats.templateDownloads / membership.usageStats.templateDownloadsMax) * 100}%` 
                          }}
                        />
                      </div>
                    </div>

                    {/* Quota 3: Zoom Legal Consulting Minutes */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-black text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                          <User className="w-4 h-4 text-violet-500" />
                          <span>{isRtl ? "استشارات فيديو حية 1-على-1" : "Live 1-on-1 Consulting Allotment"}</span>
                        </span>
                        <span className="font-mono text-slate-500 font-bold">
                          {membership.currentPlan === 'enterprise' 
                            ? `${membership.usageStats.consultingMinutes} / ${membership.usageStats.consultingMinutesMax} دقيقة` 
                            : `${isRtl ? "0 (مغلق)" : "0 minutes (Locked)"}`}
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-violet-500 transition-all duration-500"
                          style={{ 
                            width: `${membership.currentPlan === 'enterprise' ? (membership.usageStats.consultingMinutes / membership.usageStats.consultingMinutesMax) * 100 : 0}%` 
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Warning prompt if free */}
                  {membership.currentPlan === 'free' && (
                    <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 p-4 rounded-2xl flex items-start gap-3 mt-4">
                      <BadgeAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-black text-slate-900 dark:text-slate-100">{isRtl ? "لقد اقتربت من استهلاك الحد المسموح" : "Workspace Limits Active"}</p>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                          {isRtl 
                            ? "أنت تعمل حالياً على الحساب المجاني. قم بالترقية إلى الباقة الاحترافية أو الشركات لفتح تنزيل غير محدود للنماذج الفنية وبوابة المستشار القانوني."
                            : "Unlock authoritative templates, daily AI tokens, and professional features with a Premium license today."}
                        </p>
                        <button
                          onClick={() => setActiveTab('plans')}
                          className="mt-3 text-xs font-black text-indigo-600 dark:text-indigo-400 flex items-center gap-1 bg-transparent border-none cursor-pointer"
                        >
                          <span>{isRtl ? "استكشف الباقات المتاحة" : "View pricing plans"}</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>
        )}

        {/* VIEW B: PLANS AND PRICING */}
        {activeTab === 'plans' && (
          <div className="space-y-8 animate-fadeIn" id="pricing-tab-panel">
            
            {/* Monthly / Yearly cycle selector */}
            <div className="flex flex-col items-center space-y-4 mb-4">
              <div className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1.5 rounded-2xl border border-slate-200/50 dark:border-slate-800">
                <button
                  onClick={() => setPricingCycle('monthly')}
                  className={cn(
                    "px-6 py-2.5 rounded-xl text-xs font-black cursor-pointer transition-all border-none focus:outline-hidden",
                    pricingCycle === 'monthly'
                      ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-sm"
                      : "bg-transparent text-slate-500"
                  )}
                >
                  {isRtl ? "الدفع الشهري" : "Monthly billing"}
                </button>
                <button
                  onClick={() => setPricingCycle('yearly')}
                  className={cn(
                    "px-6 py-2.5 rounded-xl text-xs font-black cursor-pointer transition-all border-none focus:outline-hidden flex items-center gap-2",
                    pricingCycle === 'yearly'
                      ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-sm"
                      : "bg-transparent text-slate-500"
                  )}
                >
                  <span>{isRtl ? "الدفع السنوي" : "Annual billing"}</span>
                  <span className="px-1.5 py-0.5 bg-emerald-500 text-white rounded-md text-[9px] font-black uppercase">
                    {isRtl ? "توفير 20%" : "Save 20%"}
                  </span>
                </button>
              </div>
              <p className="text-xs text-slate-400 font-bold text-center">
                {isRtl 
                  ? "جميع المبالغ بالدولار الأمريكي وتخضع لنظام فواتير آمن بالكامل." 
                  : "All subscription pricing details are in USD. Secure checkout guaranteed."}
              </p>
            </div>

            {/* THREE PLAN CARDS Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              
              {/* PLAN 1: FREE PLAN */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col justify-between relative shadow-xs">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full text-[10px] font-black uppercase tracking-wider">
                      {isRtl ? "البداية المجانية" : "Free Starter"}
                    </span>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">
                      {isRtl ? "باقة المحاسب الفردية" : "Standard Accountant"}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      {isRtl ? "للطلاب والمبتدئين الذين يبحثون عن مراجعة سريعة وحاسبات ميزانية بسيطة" : "Great for single auditors and students running simple calculations."}
                    </p>
                  </div>

                  <div className="py-4 border-y border-slate-100 dark:border-slate-800 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-slate-900 dark:text-white">$0</span>
                    <span className="text-xs text-slate-400">/ {isRtl ? "دائماً" : "forever"}</span>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider">{isRtl ? "تشمل الباقة:" : "What's included:"}</h4>
                    <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-400 font-semibold">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{isRtl ? "5 استشارات بالذكاء الاصطناعي شهرياً" : "5 AI prompts per month"}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{isRtl ? "تحميل 2 من قوالب الإكسل واليومية" : "2 Basic template downloads"}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{isRtl ? "تصفح معايير المحاسبة المصرية" : "Read Egyptian Standards repository"}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <X className="w-4 h-4 text-rose-500 shrink-0" />
                        <span className="line-through text-slate-400">{isRtl ? "المستشار القانوني والضريبي الكامل" : "Comprehensive Tax Advisor Client"}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <X className="w-4 h-4 text-rose-500 shrink-0" />
                        <span className="line-through text-slate-400">{isRtl ? "جلسات مراجعة مخصصة ومباشرة" : "1-on-1 Expert Consulting"}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-8">
                  {membership.currentPlan === 'free' ? (
                    <div className="w-full py-3.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-2xl text-xs font-black text-center border-none">
                      {isRtl ? "باقاتك الحالية نشطة" : "Your Current Plan"}
                    </div>
                  ) : (
                    <button
                      onClick={() => executeSubscriptionChange('free')}
                      className="w-full py-3.5 bg-slate-150 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-white rounded-2xl text-xs font-black cursor-pointer border-none"
                    >
                      {isRtl ? "الرجوع للباقة المجانية" : "Downgrade to Free"}
                    </button>
                  )}
                </div>
              </div>

              {/* PLAN 2: PREMIUM PLAN */}
              <div className="bg-white dark:bg-slate-900 border-2 border-indigo-600 rounded-3xl p-8 flex flex-col justify-between relative shadow-lg">
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-xs">
                  {isRtl ? "الأكثر طلباً واشتراكاً" : "Most Popular Choice"}
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-wider">
                      {isRtl ? "محاسب محترف" : "Premium Tier"}
                    </span>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>{isRtl ? "باقة المراجع المحترف (Premium)" : "Professional Accountant"}</span>
                      <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      {isRtl ? "الأداة المثلى للمستشارين المستقلين والمكاتب الصغيرة للحصول على دعم متكامل فوري" : "Unlock endless tools, templates, and full client-side API simulations."}
                    </p>
                  </div>

                  <div className="py-4 border-y border-slate-100 dark:border-slate-800 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-slate-900 dark:text-white">
                      ${pricingCycle === 'monthly' ? PRICING_PLANS.premium.priceMonthly : PRICING_PLANS.premium.priceYearly}
                    </span>
                    <span className="text-xs text-slate-400">/ {pricingCycle === 'monthly' ? (isRtl ? "شهرياً" : "month") : (isRtl ? "سنوياً" : "year")}</span>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider">{isRtl ? "تشمل الباقة:" : "What's included:"}</h4>
                    <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-400 font-semibold">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="font-bold text-slate-800 dark:text-neutral-200">{isRtl ? "100 استشارة بالذكاء الاصطناعي شهرياً" : "100 AI prompts per month"}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{isRtl ? "تنزيل 50 من القوالب والنماذج الفنية" : "50 Advanced template downloads"}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{isRtl ? "الوصول الكامل للمعايير الدولية والمصرية" : "Complete IFRS & ESA repository"}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{isRtl ? "دعم المستشار الفني السريع بالمنتدى" : "Fast-track community audit replies"}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <X className="w-4 h-4 text-rose-500 shrink-0" />
                        <span className="line-through text-slate-400">{isRtl ? "جلسات مراجعة مخصصة ومباشرة" : "1-on-1 Expert Consulting"}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-8">
                  {membership.currentPlan === 'premium' ? (
                    <div className="w-full py-3.5 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 rounded-2xl text-xs font-black text-center border-none">
                      {isRtl ? "باقاتك الحالية نشطة" : "Your Current Plan"}
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedPlanForCheckout('premium');
                        setCheckoutStep('details');
                      }}
                      className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-black cursor-pointer border-none shadow-md"
                    >
                      {isRtl ? "اشترك في الباقة الاحترافية" : "Upgrade to Premium"}
                    </button>
                  )}
                </div>
              </div>

              {/* PLAN 3: ENTERPRISE PLAN */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 flex flex-col justify-between relative shadow-xs">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <span className="px-3 py-1 bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-400 rounded-full text-[10px] font-black uppercase tracking-wider">
                      {isRtl ? "المؤسسات الكبرى" : "Corporate Core"}
                    </span>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>{isRtl ? "باقة المؤسسات والشركات" : "Enterprise Suite"}</span>
                      <Building className="w-4 h-4 text-violet-500" />
                    </h3>
                    <p className="text-xs text-slate-400 font-medium">
                      {isRtl ? "لمكاتب الاستشارات والمراجعة الكبرى والشركات لربط الأنظمة والدعم المخصص" : "For accounting networks requiring deep custom-made integration."}
                    </p>
                  </div>

                  <div className="py-4 border-y border-slate-100 dark:border-slate-800 flex items-baseline gap-1">
                    <span className="text-4xl font-black text-slate-900 dark:text-white">
                      ${pricingCycle === 'monthly' ? PRICING_PLANS.enterprise.priceMonthly : PRICING_PLANS.enterprise.priceYearly}
                    </span>
                    <span className="text-xs text-slate-400">/ {pricingCycle === 'monthly' ? (isRtl ? "شهرياً" : "month") : (isRtl ? "سنوياً" : "year")}</span>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider">{isRtl ? "تشمل الباقة:" : "What's included:"}</h4>
                    <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-400 font-semibold">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="font-bold text-slate-800 dark:text-neutral-200">{isRtl ? "استشارات بالذكاء الاصطناعي بلا حدود" : "Unlimited AI advisory prompts"}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="font-bold text-slate-800 dark:text-neutral-200">{isRtl ? "تنزيل غير محدود لجميع القوالب الفنية" : "Unlimited template downloads"}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{isRtl ? "60 دقيقة استشارات حية مباشرة مع خبراء" : "60 minutes Zoom Consulting call"}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{isRtl ? "ربط برامج الفوترة والضرائب عبر API" : "Custom ERP Unified API Access"}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{isRtl ? "لوحة تحكم لإدارة الفريق والتقارير" : "Multi-seat management control"}</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-8">
                  {membership.currentPlan === 'enterprise' ? (
                    <div className="w-full py-3.5 bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-400 rounded-2xl text-xs font-black text-center border-none">
                      {isRtl ? "باقاتك الحالية نشطة" : "Your Current Plan"}
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setSelectedPlanForCheckout('enterprise');
                        setCheckoutStep('details');
                      }}
                      className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 text-white rounded-2xl text-xs font-black cursor-pointer border-none shadow-md"
                    >
                      {isRtl ? "اشترك في باقة الشركات" : "Upgrade to Enterprise"}
                    </button>
                  )}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* VIEW C: PERMISSIONS SIMULATOR */}
        {activeTab === 'permissions' && (
          <div className="space-y-8 animate-fadeIn" id="permissions-tab-panel">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Interactive simulator controls (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-indigo-500" />
                      <span>{isRtl ? "محاكي أذونات النظام التفاعلي" : "Interactive Permission Checker"}</span>
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                      {isRtl 
                        ? "اختر إجراءً تقنياً من القائمة لاختبار قدرة حسابك الحالي على التنفيذ الفعلي في بيئة العمل الفني الموحدة."
                        : "Select any system resource to test how credentials resolve access rights in real-time."}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase">{isRtl ? "تعديل خطة العضوية المؤقتة للاختبار" : "Simulated Active Subscription Tier"}</label>
                      <div className="grid grid-cols-3 gap-2">
                        {['free', 'premium', 'enterprise'].map((plan: any) => (
                          <button
                            key={plan}
                            onClick={() => {
                              const limits = getLimitsForPlan(plan);
                              setMembership({
                                ...membership,
                                currentPlan: plan,
                                usageStats: {
                                  aiPrompts: 0,
                                  aiPromptsMax: limits.aiPromptsMax,
                                  templateDownloads: 0,
                                  templateDownloadsMax: limits.templateDownloadsMax,
                                  consultingMinutes: 0,
                                  consultingMinutesMax: limits.consultingMinutesMax
                                }
                              });
                            }}
                            className={cn(
                              "py-2 px-3 rounded-xl text-[10px] font-black uppercase cursor-pointer border transition-all",
                              membership.currentPlan === plan
                                ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                                : "bg-slate-50 dark:bg-slate-950 text-slate-500 border-slate-200 dark:border-slate-800 hover:bg-slate-100"
                            )}
                          >
                            {plan}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-slate-400 uppercase">{isRtl ? "الإجراء التقني المراد اختباره" : "Select Client Resource to Invoke"}</label>
                      <div className="flex flex-col gap-2">
                        {INTERACTIVE_ACTIONS.map(action => (
                          <button
                            key={action.id}
                            onClick={() => setSelectedAction(action.id)}
                            className={cn(
                              "w-full px-4 py-3 rounded-xl text-xs font-black text-right md:text-right border transition-all cursor-pointer",
                              selectedAction === action.id
                                ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-slate-900"
                                : "bg-slate-50/50 hover:bg-slate-100/70 dark:bg-slate-950/20 dark:hover:bg-slate-950/40 text-slate-700 dark:text-neutral-300 border-slate-150 dark:border-slate-850"
                            )}
                            style={{ textAlign: isRtl ? 'right' : 'left' }}
                          >
                            {isRtl ? action.labelAr : action.labelEn}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Simulation Response Area (7 cols) */}
              <div className="lg:col-span-7">
                <AnimatePresence mode="wait">
                  {simulationResult && (
                    <motion.div
                      key={simulationResult.status + selectedAction}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      className={cn(
                        "p-8 rounded-[2.5rem] border shadow-md space-y-6 flex flex-col justify-between min-h-[350px]",
                        simulationResult.status === 'success'
                          ? "bg-emerald-50/40 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-900/40"
                          : "bg-rose-50/40 dark:bg-rose-950/10 border-rose-200 dark:border-rose-900/40"
                      )}
                    >
                      <div className="space-y-6">
                        <div className="flex items-center gap-3">
                          {simulationResult.status === 'success' ? (
                            <div className="p-3 bg-emerald-500 text-white rounded-2xl shadow-xs">
                              <ShieldCheck className="w-6 h-6 animate-pulse" />
                            </div>
                          ) : (
                            <div className="p-3 bg-rose-500 text-white rounded-2xl shadow-xs">
                              <Lock className="w-6 h-6" />
                            </div>
                          )}
                          <div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{isRtl ? "استجابة خادم الأذونات" : "Server Access Token Response"}</p>
                            <h4 className="text-sm font-black text-slate-900 dark:text-white">
                              {simulationResult.status === 'success' ? (isRtl ? "مسموح بالعملية" : "Access Granted") : (isRtl ? "مرفوض - صلاحية مقيدة" : "Access Denied / Action Restricted")}
                            </h4>
                          </div>
                        </div>

                        <p className="text-xs font-black text-slate-700 dark:text-neutral-200 leading-relaxed bg-white dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                          {isRtl ? simulationResult.messageAr : simulationResult.messageEn}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-500">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            <span>UTC 2026-07-14</span>
                          </span>
                          <span className="flex items-center gap-1.5">
                            <User className="w-4 h-4" />
                            <span>ID: RA-86</span>
                          </span>
                        </div>
                      </div>

                      {simulationResult.status === 'restricted' && (
                        <div className="pt-6 border-t border-rose-200/50 dark:border-rose-900/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                          <div>
                            <p className="text-xs font-black text-slate-800 dark:text-white">
                              {isRtl ? "هل تحتاج لفتح هذا الملف الآن؟" : "Need to execute this immediately?"}
                            </p>
                            <p className="text-[10px] text-slate-400">
                              {isRtl 
                                ? `يتطلب ترقية بسيطة إلى باقة (${simulationResult.requiredPlan.toUpperCase()})` 
                                : `Upgrade your workspace to standard ${simulationResult.requiredPlan.toUpperCase()}`}
                            </p>
                          </div>
                          <button
                            onClick={() => {
                              setSelectedPlanForCheckout(simulationResult.requiredPlan);
                              setActiveTab('plans');
                              setCheckoutStep('details');
                            }}
                            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black cursor-pointer border-none shadow-xs flex items-center gap-1"
                          >
                            <span>{isRtl ? "ترقية الباقة وتجاوز القيود" : "Upgrade & Unlock"}</span>
                            <ArrowUpRight className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>

            {/* Matrix comparison Table for Plans */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
              <h3 className="font-black text-sm text-slate-900 dark:text-white mb-6">
                {isRtl ? "جدول مقارنة مميزات ومطابقة الباقات" : "Granular Subscription Features & Capabilities Matrix"}
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-right md:text-right border-collapse">
                  <thead>
                    <tr className="border-b border-slate-150 dark:border-slate-800 text-[10px] uppercase font-black text-slate-400">
                      <th className="py-4 px-3 text-right">{isRtl ? "الميزة والمورد" : "Resource Feature"}</th>
                      <th className="py-4 px-3 text-center">{isRtl ? "المجانية" : "Free Starter"}</th>
                      <th className="py-4 px-3 text-center text-indigo-600 dark:text-indigo-400">{isRtl ? "الاحترافية" : "Premium"}</th>
                      <th className="py-4 px-3 text-center text-violet-600 dark:text-violet-400">{isRtl ? "الشركات" : "Enterprise"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-semibold text-slate-700 dark:text-neutral-300">
                    <tr>
                      <td className="py-4 px-3 text-right">{isRtl ? "الدورة المحاسبية وحاسبات الإهلاك" : "Standard accounting calculators"}</td>
                      <td className="py-4 px-3 text-center"><Check className="w-4 h-4 text-emerald-500 mx-auto" /></td>
                      <td className="py-4 px-3 text-center"><Check className="w-4 h-4 text-emerald-500 mx-auto" /></td>
                      <td className="py-4 px-3 text-center"><Check className="w-4 h-4 text-emerald-500 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="py-4 px-3 text-right">{isRtl ? "مستشار ضريبي بالذكاء الاصطناعي (Gemini SDK)" : "Gemini AI-powered Tax Advisor"}</td>
                      <td className="py-4 px-3 text-center text-slate-400">5 / {isRtl ? "شهرياً" : "mo"}</td>
                      <td className="py-4 px-3 text-center text-indigo-600 dark:text-indigo-400">100 / {isRtl ? "شهرياً" : "mo"}</td>
                      <td className="py-4 px-3 text-center text-violet-600 dark:text-violet-400">{isRtl ? "بلا حدود" : "Unlimited"}</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-3 text-right">{isRtl ? "نماذج اليومية العامة وموازين المراجعة" : "Advanced template library"}</td>
                      <td className="py-4 px-3 text-center text-slate-400">2 / {isRtl ? "شهرياً" : "mo"}</td>
                      <td className="py-4 px-3 text-center text-indigo-600 dark:text-indigo-400">50 / {isRtl ? "شهرياً" : "mo"}</td>
                      <td className="py-4 px-3 text-center text-violet-600 dark:text-violet-400">{isRtl ? "بلا حدود" : "Unlimited"}</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-3 text-right">{isRtl ? "دعم المنتدى والمشاركات الفنية" : "Fast-track auditing support replies"}</td>
                      <td className="py-4 px-3 text-center text-slate-400">{isRtl ? "دعم أساسي" : "Basic Support"}</td>
                      <td className="py-4 px-3 text-center text-indigo-600 dark:text-indigo-400">{isRtl ? "أولوية مسبقة" : "Priority Support"}</td>
                      <td className="py-4 px-3 text-center text-violet-600 dark:text-violet-400">{isRtl ? "دعم مباشر مخصص" : "Dedicated Support SLA"}</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-3 text-right">{isRtl ? "جلسات فيديو 1-على-1 واستشارات مخصصة" : "1-on-1 legal Zoom Consulting hours"}</td>
                      <td className="py-4 px-3 text-center text-slate-400"><X className="w-4 h-4 text-rose-500 mx-auto" /></td>
                      <td className="py-4 px-3 text-center text-slate-400"><X className="w-4 h-4 text-rose-500 mx-auto" /></td>
                      <td className="py-4 px-3 text-center text-violet-600 dark:text-violet-400">{isRtl ? "60 دقيقة شهرياً" : "60 minutes / mo"}</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-3 text-right">{isRtl ? "API موحد للمنظومة والربط السحابي" : "Unified Enterprise Cloud API integration"}</td>
                      <td className="py-4 px-3 text-center text-slate-400"><X className="w-4 h-4 text-rose-500 mx-auto" /></td>
                      <td className="py-4 px-3 text-center text-slate-400"><X className="w-4 h-4 text-rose-500 mx-auto" /></td>
                      <td className="py-4 px-3 text-center text-violet-600 dark:text-violet-400"><Check className="w-4 h-4 text-emerald-500 mx-auto" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* VIEW D: BILLING HISTORY & INVOICES */}
        {activeTab === 'billing' && (
          <div className="space-y-8 animate-fadeIn" id="billing-tab-panel">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Card Update Billing & Payment Method (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm space-y-6">
                  <div className="space-y-1">
                    <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-indigo-500" />
                      <span>{isRtl ? "تحديث بطاقة الدفع المرجعية" : "Payment Method Details"}</span>
                    </h3>
                    <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                      {isRtl 
                        ? "أدخل بيانات بطاقتك الجديدة لتحديث الفوترة وتجنب تعليق خدمات الدعم الذكي."
                        : "Update billing tokens to secure auto-renewal and avoid service suspension."}
                    </p>
                  </div>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      const updated: MembershipState = {
                        ...membership,
                        paymentMethod: {
                          brand: "Visa",
                          last4: checkoutCard.number ? checkoutCard.number.slice(-4) : "5399",
                          expiry: checkoutCard.expiry || "09/30"
                        }
                      };
                      saveState(profile, updated, invoices);
                      alert(isRtl ? "تم تحديث بطاقة الدفع بنجاح!" : "Payment card tokens updated successfully!");
                      setCheckoutCard({ number: '', name: '', expiry: '', cvc: '' });
                    }} 
                    className="space-y-4"
                  >
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase">{isRtl ? "رقم بطاقة الائتمان" : "Card Number"}</label>
                      <input
                        type="text"
                        placeholder="4242 4242 4242 4242"
                        value={checkoutCard.number}
                        onChange={(e) => setCheckoutCard({...checkoutCard, number: e.target.value})}
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold text-slate-800 dark:text-neutral-200"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase">{isRtl ? "تاريخ الانتهاء" : "Expiry"}</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={checkoutCard.expiry}
                          onChange={(e) => setCheckoutCard({...checkoutCard, expiry: e.target.value})}
                          required
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold text-slate-800 dark:text-neutral-200"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase">CVC</label>
                        <input
                          type="text"
                          placeholder="321"
                          value={checkoutCard.cvc}
                          onChange={(e) => setCheckoutCard({...checkoutCard, cvc: e.target.value})}
                          required
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold text-slate-800 dark:text-neutral-200"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase">{isRtl ? "الاسم على البطاقة" : "Cardholder Name"}</label>
                      <input
                        type="text"
                        placeholder="Raafat Abdel Aziz"
                        value={checkoutCard.name}
                        onChange={(e) => setCheckoutCard({...checkoutCard, name: e.target.value})}
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-200"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white rounded-xl text-xs font-black cursor-pointer border-none"
                    >
                      {isRtl ? "تحديث بطاقة الدفع" : "Save Card & Secure Token"}
                    </button>
                  </form>
                </div>
              </div>

              {/* Invoices List Panel (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="font-black text-sm text-slate-900 dark:text-white">
                        {isRtl ? "تاريخ الفواتير والمدفوعات" : "Workspace Invoice & Receipt Ledger"}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {isRtl ? "عرض فواتير اشتراكك السابقة والتحميل الفوري للوصولات" : "Inspect historic invoices and retrieve official PDF receipts"}
                      </p>
                    </div>

                    <div className="p-2 bg-slate-100 dark:bg-slate-950 rounded-xl text-slate-500">
                      <Receipt className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-right md:text-right">
                      <thead>
                        <tr className="border-b border-slate-150 dark:border-slate-800 text-[10px] uppercase font-black text-slate-400">
                          <th className="py-3 px-2 text-right">{isRtl ? "الفاتورة" : "ID"}</th>
                          <th className="py-3 px-2 text-center">{isRtl ? "التاريخ" : "Date"}</th>
                          <th className="py-3 px-2 text-center">{isRtl ? "الباقة" : "Plan"}</th>
                          <th className="py-3 px-2 text-center">{isRtl ? "المبلغ" : "Total"}</th>
                          <th className="py-3 px-2 text-center">{isRtl ? "الحالة" : "Status"}</th>
                          <th className="py-3 px-2 text-center">{isRtl ? "تحميل" : "Action"}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-semibold text-slate-700 dark:text-neutral-300">
                        {invoices.map(invoice => (
                          <tr key={invoice.id}>
                            <td className="py-3.5 px-2 text-right text-slate-900 dark:text-white font-black">{invoice.id}</td>
                            <td className="py-3.5 px-2 text-center text-slate-400">{invoice.date}</td>
                            <td className="py-3.5 px-2 text-center uppercase text-[10px] font-black">{invoice.plan}</td>
                            <td className="py-3.5 px-2 text-center text-slate-900 dark:text-white font-black">${invoice.amount}</td>
                            <td className="py-3.5 px-2 text-center">
                              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 rounded-md text-[9px] font-black uppercase">
                                {isRtl ? "تم الدفع" : "Paid"}
                              </span>
                            </td>
                            <td className="py-3.5 px-2 text-center">
                              <button
                                onClick={() => setActiveInvoiceDetails(invoice)}
                                className="p-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-850 text-slate-600 dark:text-slate-400 rounded-lg border-none cursor-pointer"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* CHECKOUT & PAYMENT MODAL / OVERLAY */}
      <AnimatePresence>
        {selectedPlanForCheckout && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 max-w-lg w-full overflow-hidden shadow-2xl p-6 md:p-8 space-y-6"
            >
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-850 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-indigo-600 text-white rounded-xl">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase font-black text-slate-400 tracking-wider">{isRtl ? "معاملة سحابية مؤمنة" : "Secured Cloud Transaction"}</p>
                    <h3 className="font-black text-sm text-slate-900 dark:text-white">
                      {isRtl ? `شراء وتفعيل الاشتراك: ${PRICING_PLANS[selectedPlanForCheckout].nameAr}` : `Confirm subscription checkout`}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedPlanForCheckout(null)}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer border-none bg-transparent"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Steps views */}
              {checkoutStep === 'details' && (
                <div className="space-y-6">
                  <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-850 space-y-3 text-xs">
                    <div className="flex justify-between font-black text-slate-900 dark:text-white">
                      <span>{isRtl ? "الباقة المختارة" : "Selected Tier"}</span>
                      <span className="uppercase">{selectedPlanForCheckout}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>{isRtl ? "دورة الفوترة" : "Selected Interval"}</span>
                      <span>{pricingCycle === 'monthly' ? (isRtl ? "دفع شهري" : "Monthly Billing") : (isRtl ? "دفع سنوي" : "Annual Billing")}</span>
                    </div>
                    <div className="flex justify-between font-black text-indigo-600 dark:text-indigo-400 text-sm border-t border-slate-150 dark:border-slate-800/60 pt-3">
                      <span>{isRtl ? "الإجمالي المستحق اليوم" : "Total Due Today"}</span>
                      <span>${pricingCycle === 'monthly' ? PRICING_PLANS[selectedPlanForCheckout].priceMonthly : PRICING_PLANS[selectedPlanForCheckout].priceYearly}</span>
                    </div>
                  </div>

                  <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 p-4 rounded-2xl flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5 animate-pulse" />
                    <div>
                      <p className="text-xs font-black text-slate-900 dark:text-slate-100">{isRtl ? "معاملة تجريبية بالكامل" : "Interactive Sandbox Mode"}</p>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                        {isRtl 
                          ? "هذا مجرد محاكاة فنية لنظام الدفع والمطابقة بالمنظومة. لن يتم سحب أي أموال حقيقية من حسابك." 
                          : "This sandbox checkout is fully interactive and stores variables to localStorage without initiating any live charge."}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setCheckoutStep('card')}
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-black cursor-pointer border-none shadow-md"
                  >
                    {isRtl ? "المتابعة لإدخال بطاقة الدفع" : "Proceed to payment details"}
                  </button>
                </div>
              )}

              {checkoutStep === 'card' && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase">{isRtl ? "رقم بطاقة الدفع" : "Credit Card Number"}</label>
                      <input
                        type="text"
                        placeholder="4242 4242 4242 4242"
                        value={checkoutCard.number}
                        onChange={(e) => setCheckoutCard({...checkoutCard, number: e.target.value})}
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold text-slate-800 dark:text-neutral-200"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase">{isRtl ? "انتهاء الصلاحية" : "Expiry"}</label>
                        <input
                          type="text"
                          placeholder="12/28"
                          value={checkoutCard.expiry}
                          onChange={(e) => setCheckoutCard({...checkoutCard, expiry: e.target.value})}
                          required
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold text-slate-800 dark:text-neutral-200"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black text-slate-400 uppercase">CVC</label>
                        <input
                          type="text"
                          placeholder="456"
                          value={checkoutCard.cvc}
                          onChange={(e) => setCheckoutCard({...checkoutCard, cvc: e.target.value})}
                          required
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold text-slate-800 dark:text-neutral-200"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase">{isRtl ? "الاسم على البطاقة" : "Cardholder Name"}</label>
                      <input
                        type="text"
                        placeholder="Raafat Abdel Aziz"
                        value={checkoutCard.name}
                        onChange={(e) => setCheckoutCard({...checkoutCard, name: e.target.value})}
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-200"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => setCheckoutStep('details')}
                      className="px-5 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-white rounded-xl text-xs font-bold border-none cursor-pointer"
                    >
                      {isRtl ? "السابق" : "Back"}
                    </button>
                    <button
                      onClick={() => executeSubscriptionChange(selectedPlanForCheckout)}
                      disabled={isProcessingPayment}
                      className="flex-1 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black cursor-pointer border-none shadow-md flex items-center justify-center gap-2"
                    >
                      {isProcessingPayment ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>{isRtl ? "جاري معالجة المعاملة البنكية..." : "Authorizing Transaction..."}</span>
                        </>
                      ) : (
                        <span>
                          {isRtl 
                            ? `دفع وتفعيل الاشتراك (${pricingCycle === 'monthly' ? PRICING_PLANS[selectedPlanForCheckout].priceMonthly : PRICING_PLANS[selectedPlanForCheckout].priceYearly}$)`
                            : `Charge & Secure (${pricingCycle === 'monthly' ? PRICING_PLANS[selectedPlanForCheckout].priceMonthly : PRICING_PLANS[selectedPlanForCheckout].priceYearly}$)`}
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {checkoutStep === 'success' && (
                <div className="text-center py-8 space-y-6">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-500 rounded-full flex items-center justify-center mx-auto text-3xl shadow-xs border-4 border-emerald-50">
                    ✓
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-base font-black text-slate-900 dark:text-white">
                      {isRtl ? "مبروك! تم ترقية اشتراكك وتنشيط حسابك بنجاح" : "Checkout Authorization Succeeded!"}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-semibold">
                      {isRtl 
                        ? "أصبح بإمكانك الآن الاستمتاع بكامل الموارد وتحميل الملفات الفنية واستخدام بوابة المستشار بالذكاء الاصطناعي بلا قيود."
                        : "Your plan variables have been synchronized. Access rights across the workspace are unlocked."}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedPlanForCheckout(null);
                      setActiveTab('dashboard');
                    }}
                    className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 text-white rounded-2xl text-xs font-black cursor-pointer border-none"
                  >
                    {isRtl ? "المتابعة إلى لوحة التحكم للمشترك" : "Go to my dashboard"}
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DETAILED INVOICE DIALOG OVERLAY */}
      <AnimatePresence>
        {activeInvoiceDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 max-w-lg w-full overflow-hidden shadow-2xl p-6 md:p-8 space-y-6"
            >
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-850 pb-4">
                <div className="flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-indigo-500" />
                  <h3 className="font-black text-sm text-slate-900 dark:text-white">
                    {isRtl ? "تفاصيل الفاتورة الرسمية" : "Official Receipt Summary"}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveInvoiceDetails(null)}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer border-none bg-transparent"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Printable Invoice Layout */}
              <div className="p-6 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded-2xl space-y-6 text-xs text-slate-600 dark:text-slate-400 font-semibold" id="printable-invoice">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-black text-slate-900 dark:text-white">{isRtl ? "منظومة إيليجا للخدمات المحاسبية" : "Elijah Audit Ecosystem"}</h4>
                    <p className="text-[10px] text-slate-400">{isRtl ? "الرقم الضريبي الموحد: 489-320-109" : "Tax Registration: EG-489-320-109"}</p>
                    <p className="text-[10px] text-slate-400">القاهرة، جمهورية مصر العربية</p>
                  </div>
                  <div className="text-left font-mono">
                    <p className="font-black text-slate-900 dark:text-white">{activeInvoiceDetails.id}</p>
                    <p className="text-[10px] text-slate-400">{activeInvoiceDetails.date}</p>
                  </div>
                </div>

                <div className="border-t border-slate-150 dark:border-slate-800/60 pt-4 space-y-1">
                  <p className="text-[10px] text-slate-400 uppercase font-black">{isRtl ? "مفوتر إلى" : "Billed To"}</p>
                  <p className="font-black text-slate-950 dark:text-white">{profile.name}</p>
                  <p className="text-[10px] text-slate-500">{profile.company}</p>
                  <p className="text-[10px] text-slate-400">{profile.email}</p>
                </div>

                <div className="border-t border-slate-150 dark:border-slate-800/60 pt-4">
                  <table className="w-full">
                    <thead>
                      <tr className="text-[10px] uppercase text-slate-400">
                        <th className="pb-2 text-right">{isRtl ? "الوصف" : "Item"}</th>
                        <th className="pb-2 text-center">{isRtl ? "المبلغ" : "Total"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-slate-100 dark:border-slate-900 pt-2 text-slate-900 dark:text-white font-black">
                        <td className="py-2 text-right">
                          {isRtl ? `تنشيط باقة إيليجا (${activeInvoiceDetails.plan.toUpperCase()})` : `Elijah Premium Plan allowance (${activeInvoiceDetails.plan.toUpperCase()})`}
                        </td>
                        <td className="py-2 text-center">${activeInvoiceDetails.amount}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="border-t border-slate-150 dark:border-slate-800/60 pt-4 flex justify-between items-center text-xs">
                  <div>
                    <p className="text-[10px] text-slate-400">{isRtl ? "طريقة الدفع" : "Payment Instrument"}</p>
                    <p className="font-black text-slate-900 dark:text-white">{activeInvoiceDetails.paymentMethod}</p>
                  </div>

                  <div className="text-left font-black text-slate-900 dark:text-white text-sm">
                    <span>{isRtl ? "الإجمالي الكلي" : "Grand Total"}: </span>
                    <span>${activeInvoiceDetails.amount}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    alert(isRtl ? "جاري تحويل الفاتورة لـ PDF وتحميلها..." : "Generating Receipt PDF stream...");
                  }}
                  className="flex-1 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black cursor-pointer border-none flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>{isRtl ? "تحميل نسخة PDF" : "Download PDF Receipt"}</span>
                </button>
                <button
                  onClick={() => setActiveInvoiceDetails(null)}
                  className="px-5 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-white rounded-xl text-xs font-bold border-none cursor-pointer"
                >
                  {isRtl ? "إغلاق" : "Close"}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
