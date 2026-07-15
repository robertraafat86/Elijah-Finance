import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { 
  ShoppingBag, 
  Heart, 
  Eye, 
  Download, 
  Search, 
  Check, 
  X, 
  FileSpreadsheet, 
  Code, 
  FileText, 
  BarChart3, 
  Layout, 
  MessageSquare, 
  CreditCard, 
  CheckCircle, 
  Filter,
  ArrowRight,
  ChevronRight,
  Info
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Product {
  id: string;
  category: 'excel' | 'vba' | 'pdf' | 'powerbi' | 'templates';
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  priceEgp: number;
  priceUsd: number;
  imageUrl: string;
  previewUrl?: string; // e.g. placeholder preview or sheet screenshot
  isFree?: boolean;
  featuresAr: string[];
  featuresEn: string[];
  detailsAr: string;
  detailsEn: string;
  fileSize?: string;
  downloadsCount: number;
}

const PRODUCTS_DATA: Product[] = [
  {
    id: 'prod-financial-ledger',
    category: 'excel',
    titleAr: "حقيبة القوائم المالية الذكية لعام 2026",
    titleEn: "Smart Corporate Financial Statements Ledger 2026",
    descAr: "قالب إكسل احترافي كامل ومبرمج لإعداد الميزانية العمومية، قائمة الدخل، التدفقات النقدية، ومقارنة الفترات المالية تلقائياً.",
    descEn: "Advanced Excel ledger with automated general journals, balance sheets, income statements, cash flows, and quarterly dashboards.",
    priceEgp: 450,
    priceUsd: 15,
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80",
    featuresAr: [
      "ترحيل آلي من اليومية الأمريكية إلى ميزان المراجعة والقوائم",
      "لوحة مؤشرات أداء (Dashboard) تفاعلية مع رسوم بيانية ملونة",
      "متوافق تماماً مع المعايير المصرية والدولية EAS/IFRS"
    ],
    featuresEn: [
      "Automatic ledger posting to trial balance and financial lists",
      "Interactive executive KPI dashboard with sleek visual charts",
      "100% compliant with international EAS & IFRS guidelines"
    ],
    detailsAr: "يحتوي هذا الملف المالي الذكي على صفحات مخصصة للقيود اليومية العامة، وميزان المراجعة بالرصيد والمجاميع، وقائمة المركز المالي التفصيلية، وقائمة الأرباح والخسائر، وجدول التدفق النقدي الشامل (الطريقة غير المباشرة). تم تجهيزه بحماية الخلايا الحيوية لمنع مسح المعادلات الحسابية الدقيقة عن طريق الخطأ.",
    detailsEn: "This model includes journal entry forms, aggregate & balanced trial sheets, classified balance sheets, multi-step income statements, and indirect statement of cash flows. Embedded checks minimize ledger discrepancies, while core formula cells are protected to avoid accidental overwrites.",
    fileSize: "2.4 MB (Excel File)",
    downloadsCount: 1420
  },
  {
    id: 'prod-vba-posting',
    category: 'vba',
    titleAr: "أداة الترحيل السريعة بأكواد VBA",
    titleEn: "Excel VBA High-Speed Posting Engine",
    descAr: "ملف إكسل تفاعلي مدعوم بأكواد الماكرو (Macro-Enabled) لترحيل آلاف السجلات بنقرة واحدة مع التحقق من توازن القيود.",
    descEn: "A high-fidelity macro sheet capable of verifying, checking, and posting thousands of records to sub-ledgers in milliseconds.",
    priceEgp: 350,
    priceUsd: 12,
    imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=600&q=80",
    featuresAr: [
      "ترحيل بضغطة زر واحدة مع أداء سريع جداً وخالٍ من التعليق",
      "أكواد VBA نظيفة ومفتوحة المصدر بالكامل للتخصيص والتطوير",
      "رسائل تنبيه وتدقيق مدمجة في حال عدم توازن قيود الدائن والمدين"
    ],
    featuresEn: [
      "One-click database migration with lag-free VBA scripts",
      "Fully open-source and customizable code blocks",
      "Real-time validation alerts for unbalanced debit/credit journals"
    ],
    detailsAr: "تمت برمجة هذا المحرك خصيصاً للمحاسبين الذين يتعاملون مع كمية بيانات ضخمة يومياً. يمكنك ترحيل القيود من نموذج الإدخال السريع مباشرة إلى دفتر الأستاذ العام ودفاتر المساعدين بنقرة واحدة، مما يوفر أكثر من 90% من الوقت المستغرق في الإدخال اليدوي.",
    detailsEn: "Engineered specifically for financial experts dealing with massive record sets. Import and post raw batches to separate journals, control indices, and sub-ledgers with zero lag. Saves more than 90% of tedious administrative manual tasks.",
    fileSize: "1.1 MB (.xlsm)",
    downloadsCount: 840
  },
  {
    id: 'prod-tax-pdf',
    category: 'pdf',
    titleAr: "كتاب الدليل الضريبي المتكامل - أبريل 2026",
    titleEn: "Ultimate Tax Compliance Guidebook - April 2026",
    descAr: "دليل قانوني وعملي تفصيلي بصيغة PDF يشرح منظومة الفاتورة الإلكترونية، ضريبة كسب العمل، والقيمة المضافة خطوة بخطوة.",
    descEn: "An exhaustive interactive PDF guide outlining e-invoicing compliance, payroll taxes, VAT declarations, and regulatory audits.",
    priceEgp: 180,
    priceUsd: 6,
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80",
    featuresAr: [
      "شرح وافٍ لمنظومة الإيصال والفاتورة الإلكترونية المعتمدة حديثاً",
      "حالات عملية ونماذج تفصيلية لإعداد وتقديم الإقرارات الضريبية",
      "دليل شامل لتفادي الغرامات المالية والفروق الضريبية في الفحص"
    ],
    featuresEn: [
      "Step-by-step breakdown of modern e-invoicing and digital billing",
      "Real-world case studies and mock tax filing portals",
      "Comprehensive compliance frameworks to avoid audit fines"
    ],
    detailsAr: "كتاب إلكتروني شامل ومحدث بالكامل تزامناً مع أحدث التعديلات والتعليمات التنفيذية لمصلحة الضرائب. يحتوي على جداول تلخيصية للشرائح الضريبية لكسب العمل، ومواعيد تقديم الإقرارات، ونسب خصم منبع الضرائب، ونماذج الطعن الضريبي القانونية.",
    detailsEn: "A high-quality interactive ebook completely aligned with the newest ministerial tax decrees. Features quick-reference summary tables for payroll tax brackets, legal filing deadlines, withholding taxes, and custom appeal formats.",
    fileSize: "8.5 MB (PDF Document)",
    downloadsCount: 2210
  },
  {
    id: 'prod-pbi-dashboard',
    category: 'powerbi',
    titleAr: "لوحة مؤشرات الأداء المالي التفاعلية Power BI",
    titleEn: "Interactive Corporate Financial KPI Dashboard",
    descAr: "قالب Power BI (.pbix) احترافي مسبق الإعداد للربط بقواعد بياناتك أو ملفات الإكسل لعرض الرؤى المالية الفورية للإدارة.",
    descEn: "A premium pre-built Power BI layout ready to connect with your databases to display instant financial insights to executives.",
    priceEgp: 650,
    priceUsd: 22,
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    featuresAr: [
      "تحليل هيكل التكاليف وهوامش الربح والسيولة ديناميكياً",
      "لوحات تحكم مقسمة للمبيعات، المصروفات والتدفقات النقدية",
      "تصميم عصري متناسق يدعم المظهرين الفاتح والداكن بامتياز"
    ],
    featuresEn: [
      "Dynamic cost breakdowns, profit margins, and liquidity ratios",
      "Segregated views for Sales, Operating Expenses, and Cash flows",
      "Modern dashboard skin optimized for light and dark environments"
    ],
    detailsAr: "لوحة تفاعلية جاهزة للاستخدام من أجل إبهار فريق الإدارة والمستثمرين. تشتمل على قياس العائد على الاستثمار (ROI)، وتدفقات السيولة السريعة، وتوزيع الإيرادات جغرافياً أو حسب خطوط الإنتاج والخدمات. يتضمن الملف دليل فيديو قصير يوضح كيفية ربط مصادر البيانات الخاصة بك بدقائق.",
    detailsEn: "A polished desktop template ready to captivate senior executives and board members. Analyzes Return on Investment (ROI), quick cash assets, and sales distribution across products or locations. Includes a quick guide on connecting spreadsheets in minutes.",
    fileSize: "4.7 MB (.pbix File)",
    downloadsCount: 650
  },
  {
    id: 'prod-const-template',
    category: 'templates',
    titleAr: "قالب محاسبة المقاولات ومستخلصات المشاريع",
    titleEn: "Smart Construction & Project Cost Ledger",
    descAr: "قالب متكامل يجمع بين تتبع مستخلصات العملاء والمقاولين الباطن، ومراقبة فروق الأسعار والمخزون الميداني للمواقع.",
    descEn: "Comprehensive workbook tracking project estimations, client certificates of work, subcontractors, and construction site inventories.",
    priceEgp: 400,
    priceUsd: 14,
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
    featuresAr: [
      "جدولة مستخلصات الأعمال وإقرار فروق أسعار الخامات قانونياً",
      "مراقبة نسب الإنجاز الفعلية مقارنة بالمخطط لها في الميزانية",
      "حساب نسب حجز الضمان وتأمينات العمال وخصومات الدفعة المقدمة"
    ],
    featuresEn: [
      "Automated progress billings and material price fluctuation clauses",
      "Comparing actual site completion vs budget plans in real-time",
      "Automated retention calculations, tax withholding, and advances"
    ],
    detailsAr: "تم تصميم وهيكلة هذا النموذج ليتناسب مع الطبيعة المعقدة لشركات المقاولات والاستثمار العقاري. يسهل تتبع تكلفة كل مشروع بشكل منفصل (تكلفة المواد، تكلفة الأجور والمعدات، ومقاولي الباطن) لتحديد ربحية كل موقع على حدة بدقة متناهية ودون تداخل القيود.",
    detailsEn: "Designed specifically to demystify complex construction and real estate accounting structures. Tracks job-specific cost centers (materials, workforce, machinery, and subcontractors) to calculate the precise net margins of individual sites without overlap.",
    fileSize: "3.1 MB (Excel File)",
    downloadsCount: 970
  },
  {
    id: 'prod-hospital-template',
    category: 'templates',
    titleAr: "حقيبة حسابات العيادات والمراكز الطبية",
    titleEn: "Smart Clinic & Medical Center Accounting Book",
    descAr: "مجموعة نماذج لتسجيل إيرادات تذاكر الكشف، مستحقات الأطباء والاستشاريين، وحساب تكاليف المستلزمات والصيدلية.",
    descEn: "Complete template set tracking medical consultation revenues, visiting doctor shares, medical supplies, and pharmacy inventory.",
    priceEgp: 380,
    priceUsd: 13,
    imageUrl: "https://images.unsplash.com/photo-1516841273335-e39b37888115?auto=format&fit=crop&w=600&q=80",
    featuresAr: [
      "حساب نسب الأطباء الأخصائيين والاستشاريين بدقة وتلقائية",
      "مراقبة استهلاك المستلزمات الطبية والحد من الهدر المالي",
      "فصل مبيعات الصيدلية الداخلية عن مبيعات الخدمات الطبية"
    ],
    featuresEn: [
      "Instant computation of resident and visiting doctor financial cuts",
      "Tracking inventory of surgical items to prevent asset loss",
      "Segregating internal pharmacy revenues from clinical consulting"
    ],
    detailsAr: "حل مالي مبسط ومبتكر مصمم للعيادات الكبيرة والمستشفيات الصغيرة التي لا ترغب في تعقيدات البرامج الضخمة. يتميز بواجهة سهلة للغاية تمكن موظف الاستقبال أو المساعد الإداري من تسجيل الحالات اليومية والتحصيل بكفاءة وأمان تام.",
    detailsEn: "An innovative, streamlined tool tailored for private clinics and medical centers seeking a robust option over heavy enterprise systems. Simplified user flows allow desk receptionists to log diagnostic bills, collections, and shares seamlessly.",
    fileSize: "2.8 MB (Excel File)",
    downloadsCount: 710
  },
  {
    id: 'prod-budget-excel',
    category: 'excel',
    titleAr: "قالب موازنة تقديرية وتحليل الانحرافات",
    titleEn: "Annual Corporate Budget Planner & Variance Sheet",
    descAr: "قالب متقدم للتخطيط المالي وتوقع مبيعات وتكاليف العام بأكمله، ومقارنتها دورياً مع الأداء الفعلي وكشف الانحرافات.",
    descEn: "Advanced budgeting sheet for planning annual costs and sales, with automatic quarterly variance indicators and corrective cues.",
    priceEgp: 300,
    priceUsd: 10,
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
    featuresAr: [
      "مقارنة تفاعلية ومؤشرات لونية (أحمر/أخضر) للإنحرافات المالية",
      "توزيع تقديري ذكي للمصروفات الثابتة والمتغيرة على أشهر السنة",
      "تنبيهات فورية عند تجاوز بنود الميزانية للحدود المقررة للقسم"
    ],
    featuresEn: [
      "Dynamic color-coded variance cues highlighting cost overruns",
      "Intelligent scheduling of fixed and variable expenses monthly",
      "Automated department alerts when budget ceilings are violated"
    ],
    detailsAr: "تمت صياغة هذا النموذج المالي ليتيح للمؤسسات المتوسطة والصغيرة مراقبة موازنتها التقديرية بدقة. يمنحك لوحة مقارنة سهلة تظهر الفرق الفعلي بين النفقات والمخطط بالكامل، مما يساعدك على ترشيد الإنفاق ومعالجة الانحرافات قبل تراكمها.",
    detailsEn: "Structured to empower managers to gain total fiscal control. It matches physical expenditures with monthly projections, illustrating variance margins clearly to allow strategic corrections before cost spikes accumulate.",
    fileSize: "1.9 MB (Excel File)",
    downloadsCount: 1120
  },
  {
    id: 'prod-sample-charts',
    category: 'excel',
    titleAr: "التقرير المالي التجريبي المجاني (عينة)",
    titleEn: "Free Sample Financial Report & Charts Layout",
    descAr: "نسخة تفاعلية مجانية تحتوي على لوحة تحكم مصغرة ورسوم بيانية جاهزة للاستخدام لتجميل تقاريرك وعروضك التقديمية.",
    descEn: "A free interactive sample sheet packed with micro-dashboards, visual graphs, and charts to instantly upgrade your reports.",
    priceEgp: 0,
    priceUsd: 0,
    imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80",
    isFree: true,
    featuresAr: [
      "تحميل فوري ومجاني بالكامل دون الحاجة لأي بيانات دفع",
      "رسوم بيانية مبتكرة وسهلة التعديل والنسخ لملفاتك الخاصة",
      "تصميم راقٍ ونظيف يعتمد على مبادئ التصميم الحديثة"
    ],
    featuresEn: [
      "Instant download without any billing or checkout details",
      "Highly adaptable charts easy to duplicate to your custom sheets",
      "Elegant modern design patterns for supreme data density"
    ],
    detailsAr: "نشارككم هذه العينة المجانية لتقديم فكرة عن دقة وجودة المنتجات الرقمية لمركز إيليجا للخدمات المالية والمحاسبية. تشتمل على رسوم بيانية ممتازة ومعدلات مالية مرنة يمكنك تكييفها وتجربتها فوراً.",
    detailsEn: "We share this complimentary sample to demonstrate the exquisite quality and rigor behind Elijah Financial Services' digital assets. Experience modular charts and metrics that you can copy to your personal work immediately.",
    fileSize: "850 KB (Excel File)",
    downloadsCount: 3500
  }
];

export default function DigitalStore() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  // Local state for product search & category filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [wishlist, setWishlist] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('elijah_store_wishlist');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // State to filter exclusively by Wishlist
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);

  // Modal active states
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [buyProduct, setBuyProduct] = useState<Product | null>(null);
  
  // Checkout Form States
  const [checkoutName, setCheckoutName] = useState('');
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [checkoutPhone, setCheckoutPhone] = useState('');
  const [checkoutSubmitted, setCheckoutSubmitted] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // Sync Wishlist to local storage
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const updated = prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId];
      localStorage.setItem('elijah_store_wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  // Filter Categories
  const categoriesList = [
    { id: 'all', titleAr: 'الكل', titleEn: 'All' },
    { id: 'excel', titleAr: 'إكسل (Excel)', titleEn: 'Excel' },
    { id: 'vba', titleAr: 'أكواد VBA', titleEn: 'VBA' },
    { id: 'pdf', titleAr: 'كتب PDF', titleEn: 'PDF' },
    { id: 'powerbi', titleAr: 'باور بي آي', titleEn: 'Power BI' },
    { id: 'templates', titleAr: 'نماذج جاهزة', titleEn: 'Templates' },
  ];

  // Filter products based on search, category, and wishlist filter
  const filteredProducts = PRODUCTS_DATA.filter(product => {
    const title = isRtl ? product.titleAr : product.titleEn;
    const desc = isRtl ? product.descAr : product.descEn;
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          desc.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesWishlist = !showWishlistOnly || wishlist.includes(product.id);

    return matchesSearch && matchesCategory && matchesWishlist;
  });

  // Simulate Instant PDF/Excel file download
  const triggerDownloadSim = (product: Product) => {
    setDownloadSuccess(product.id);
    
    // Simulate downloading by generating a dummy anchor with a text blob
    try {
      const dummyContent = `Elijah Financial Services - Digital Asset: ${product.titleEn}\nCategory: ${product.category}\nThis is a premium simulation package for educational purposes. For genuine file deployments, please contact our advisors.\nThank you!`;
      const blob = new Blob([dummyContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${product.id}_sample_by_elijah.txt`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Simulation download failed", err);
    }

    setTimeout(() => {
      setDownloadSuccess(null);
    }, 4000);
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutName || !checkoutPhone || !checkoutEmail) return;

    setCheckoutSubmitted(true);
    setTimeout(() => {
      // Auto close and reset
      setBuyProduct(null);
      setCheckoutSubmitted(false);
      setCheckoutName('');
      setCheckoutPhone('');
      setCheckoutEmail('');
    }, 3500);
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6">
      
      {/* Header section */}
      <div className="mb-12 text-center max-w-3xl mx-auto space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400 rounded-full text-xs font-black border border-violet-100 dark:border-violet-900/40 shadow-xs"
        >
          <ShoppingBag className="w-4 h-4 text-violet-500 animate-bounce" />
          <span>{isRtl ? "متجر إيليجا الرقمي للحلول المحاسبية" : "Elijah Digital Solution Store"}</span>
        </motion.div>
        
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
          {isRtl ? (
            <>المكتبة الرقمية <span className="gradient-text">للقوالب والملفات</span> المهنية</>
          ) : (
            <>Digital Library for <span className="gradient-text">Professional Assets</span></>
          )}
        </h1>
        
        <p className="text-[15px] md:text-[17px] leading-[1.7] text-slate-500 dark:text-neutral-400 font-medium">
          {isRtl ? (
            "اختر من بين تشكيلة النماذج البرمجية، كتب المراجعة والضرائب، وملفات الإكسل مسبقة الصنع لتسريع دورتك المحاسبية وزيادة كفاءتك."
          ) : (
            "Explore our high-fidelity Excel tools, VBA macro engines, tax guides, and Power BI report templates tailored to optimize your firm's visual reporting."
          )}
        </p>
      </div>

      {/* Store Controls Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800/80 p-6 md:p-8 shadow-xl mb-12 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Search bar */}
          <div className="md:col-span-7 relative">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={isRtl ? "ابحث عن اسم الملف، القالب أو الوصف..." : "Search for templates, guides, macros..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-11 pl-4 py-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 text-sm font-semibold rounded-2xl focus:outline-none focus:border-violet-500 text-slate-900 dark:text-neutral-100 transition-all placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-1 bg-slate-200 dark:bg-slate-800 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all border-none cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Toggle buttons for Wishlist Filter and Items info */}
          <div className="md:col-span-5 flex flex-wrap justify-start md:justify-end gap-3">
            <button
              onClick={() => {
                setShowWishlistOnly(!showWishlistOnly);
                setSelectedCategory('all');
              }}
              className={cn(
                "flex items-center gap-2 px-5 py-3.5 rounded-2xl text-sm font-black border transition-all cursor-pointer",
                showWishlistOnly 
                  ? "bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950/40 dark:border-rose-900/60 dark:text-rose-400 shadow-md"
                  : "bg-slate-50 dark:bg-slate-950 border-slate-150 dark:border-slate-800 text-slate-600 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-slate-900/60"
              )}
            >
              <Heart className={cn("w-4 h-4", showWishlistOnly ? "fill-rose-500 text-rose-500" : "text-slate-400")} />
              <span>{isRtl ? `المحفوظات (${wishlist.length})` : `My Wishlist (${wishlist.length})`}</span>
            </button>

            <div className="px-5 py-3.5 bg-slate-50/50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/80 rounded-2xl text-xs font-black text-slate-400 flex items-center justify-center">
              {isRtl ? `عرض ${filteredProducts.length} عنصر` : `Showing ${filteredProducts.length} items`}
            </div>
          </div>
        </div>

        {/* Category Tabs list */}
        <div className="border-t border-slate-100/80 dark:border-slate-800/60 pt-6">
          <div className="flex items-center gap-2 text-xs font-black text-slate-400 dark:text-neutral-500 mb-3 uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5 text-violet-500" />
            <span>{isRtl ? "فرز حسب التصنيفات الفنية:" : "Filter by category:"}</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categoriesList.map(cat => {
              const active = selectedCategory === cat.id && !showWishlistOnly;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setShowWishlistOnly(false);
                  }}
                  className={cn(
                    "px-4.5 py-2.5 rounded-full text-xs font-black border transition-all cursor-pointer",
                    active
                      ? "bg-violet-600 border-violet-600 text-white shadow-lg shadow-violet-500/20"
                      : "bg-slate-50 dark:bg-slate-950 border-slate-150 dark:border-slate-800 text-slate-600 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-slate-900/40"
                  )}
                >
                  {isRtl ? cat.titleAr : cat.titleEn}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grid of Products */}
      <AnimatePresence mode="popLayout">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const isSaved = wishlist.includes(product.id);
              const title = isRtl ? product.titleAr : product.titleEn;
              const desc = isRtl ? product.descAr : product.descEn;
              const features = isRtl ? product.featuresAr : product.featuresEn;
              const priceLabel = product.isFree 
                ? (isRtl ? 'مجانى' : 'Free') 
                : isRtl 
                  ? `${product.priceEgp} ج.م` 
                  : `$${product.priceUsd}`;

              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800/80 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden relative group"
                >
                  {/* Category Indicator Badge floating */}
                  <div className="absolute top-4 left-4 md:left-auto md:right-4 z-20">
                    <span className="px-3.5 py-1.5 bg-slate-950/85 backdrop-blur-md text-white rounded-full text-[10px] font-black tracking-widest uppercase shadow-md border border-white/10">
                      {product.category}
                    </span>
                  </div>

                  {/* Product Image and Wishlist Toggle */}
                  <div className="h-56 w-full overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent z-10" />
                    <img 
                      src={product.imageUrl} 
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />

                    {/* Heart wishlist Toggle floating */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-4 right-4 md:right-auto md:left-4 z-20 p-2.5 rounded-full bg-white/90 hover:bg-white dark:bg-slate-900/90 dark:hover:bg-slate-800 shadow-md text-slate-500 hover:text-rose-600 transition-all cursor-pointer border-none"
                      title={isRtl ? "حفظ للمفضلة" : "Save to Wishlist"}
                    >
                      <Heart className={cn("w-4.5 h-4.5 transition-all", isSaved ? "fill-rose-600 text-rose-600 scale-110" : "text-slate-400")} />
                    </button>

                    {/* Price Badge floating at the bottom card corner */}
                    <div className="absolute bottom-4 right-4 z-20 bg-violet-600 text-white font-black px-4.5 py-2 rounded-2xl text-[14px] shadow-lg tracking-wide border border-violet-500/30">
                      {priceLabel}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-8 flex-grow flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg md:text-xl font-black text-slate-800 dark:text-neutral-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-1">
                        {title}
                      </h3>
                      <p className="text-[13px] md:text-[14px] leading-[1.65] text-slate-500 dark:text-neutral-400 font-medium line-clamp-2">
                        {desc}
                      </p>

                      {/* Micro benefits bullet list */}
                      <ul className="space-y-1.5 pt-2">
                        {features.slice(0, 2).map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-neutral-300 font-semibold leading-relaxed">
                            <span className="p-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </span>
                            <span className="truncate">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="px-8 pb-8 pt-4 border-t border-slate-50 dark:border-slate-800/40 bg-slate-50/20 dark:bg-slate-900/10 shrink-0 space-y-3">
                    
                    {/* Primary Button: Buy Now or Instant Download if Free */}
                    {product.isFree ? (
                      <button
                        onClick={() => triggerDownloadSim(product)}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 px-4 rounded-2xl text-xs transition-all active:scale-95 shadow-md shadow-emerald-500/10 flex items-center justify-center gap-2 cursor-pointer border-none"
                      >
                        <Download className={cn("w-4 h-4", downloadSuccess === product.id && "animate-bounce")} />
                        <span>
                          {downloadSuccess === product.id 
                            ? (isRtl ? "جاري التحميل..." : "Downloading Asset...") 
                            : (isRtl ? "تحميل فوري مجاني" : "Instant Free Download")}
                        </span>
                      </button>
                    ) : (
                      <button
                        onClick={() => setBuyProduct(product)}
                        className="w-full bg-violet-600 hover:bg-violet-700 text-white font-black py-3 px-4 rounded-2xl text-xs transition-all active:scale-95 shadow-lg shadow-violet-500/10 flex items-center justify-center gap-2 cursor-pointer border-none"
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>{isRtl ? "شراء الآن" : "Buy Now"}</span>
                      </button>
                    )}

                    {/* Secondary Row: Preview and Download Sample */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className="bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-neutral-200 border border-slate-200 dark:border-slate-700 font-bold py-2.5 px-3 rounded-xl text-[11px] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-400" />
                        <span>{isRtl ? "تفاصيل ومعاينة" : "Preview Details"}</span>
                      </button>

                      <button
                        onClick={() => triggerDownloadSim(product)}
                        className="bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 text-slate-500 dark:text-neutral-400 border border-slate-150 dark:border-slate-800 font-bold py-2.5 px-3 rounded-xl text-[11px] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 text-slate-400" />
                        <span>{isRtl ? "تحميل عينة" : "Sample File"}</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="py-24 text-center select-none bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-8">
            <ShoppingBag className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800 dark:text-neutral-200">
              {isRtl ? "لم نعثر على أي ملفات رقمية!" : "No digital assets found!"}
            </h3>
            <p className="text-xs text-slate-400 dark:text-neutral-500 max-w-md mx-auto mt-2">
              {isRtl 
                ? "حاول استخدام كلمات مفتاحية أخرى، أو قم بإلغاء فلتر المفضلة والبحث العام لتصفح باقي التصنيفات الفنية."
                : "Try adjusting your search terms or turning off the saved items filter to see all our professional financial matrices."}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setShowWishlistOnly(false);
              }}
              className="mt-6 px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-black text-xs rounded-xl transition-all cursor-pointer border-none"
            >
              {isRtl ? "إعادة ضبط الفلاتر" : "Reset Filters"}
            </button>
          </div>
        )}
      </AnimatePresence>

      {/* 1. PRODUCT PREVIEW & SPECIFICATIONS MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl p-6 md:p-8 overflow-y-auto max-h-[90vh] z-10"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-violet-600" />

              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 left-6 md:left-auto md:right-6 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer border-none bg-transparent"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6 pt-4">
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Aspect ratio crop of image */}
                  <div className="w-full sm:w-1/3 h-32 rounded-2xl overflow-hidden shadow-md">
                    <img src={selectedProduct.imageUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <span className="text-[10px] font-black tracking-widest text-violet-600 dark:text-violet-400 uppercase">
                      {selectedProduct.category}
                    </span>
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
                      {isRtl ? selectedProduct.titleAr : selectedProduct.titleEn}
                    </h3>
                    <p className="text-xs text-slate-400 font-bold">
                      {isRtl ? `حجم الملف: ${selectedProduct.fileSize || 'غير محدد'}` : `File Size: ${selectedProduct.fileSize || 'N/A'}`}
                      {` • ${selectedProduct.downloadsCount}+ `}
                      {isRtl ? "تحميل ومستفيد" : "downloads"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">
                      {isRtl ? "نظرة عامة وشرح تفصيلي للمحتوى:" : "In-depth Technical Description:"}
                    </h4>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-neutral-300 font-medium bg-slate-50 dark:bg-slate-950/60 p-4.5 rounded-2xl border border-slate-100/60 dark:border-slate-800/60">
                      {isRtl ? selectedProduct.detailsAr : selectedProduct.detailsEn}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">
                      {isRtl ? "الخصائص والميزات الفنية المدمجة:" : "Embedded Features & Highlights:"}
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(isRtl ? selectedProduct.featuresAr : selectedProduct.featuresEn).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-neutral-300 font-bold">
                          <span className="p-0.5 rounded-full bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400 shrink-0 mt-0.5">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Pricing & Checkout trigger row */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/60">
                  <div className="text-center sm:text-right">
                    <span className="text-[10px] font-bold text-slate-400 block mb-0.5">
                      {isRtl ? "سعر التمليك والترخيص الفردي" : "Single User Lifetime License"}
                    </span>
                    <span className="text-2xl font-black text-violet-600 dark:text-violet-400">
                      {selectedProduct.isFree 
                        ? (isRtl ? 'مجانى' : 'Free') 
                        : isRtl 
                          ? `${selectedProduct.priceEgp} ج.م` 
                          : `$${selectedProduct.priceUsd}`}
                    </span>
                  </div>

                  <div className="flex gap-2 w-full sm:w-auto">
                    {selectedProduct.isFree ? (
                      <button
                        onClick={() => {
                          triggerDownloadSim(selectedProduct);
                          setSelectedProduct(null);
                        }}
                        className="flex-1 sm:flex-initial bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 px-6 rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer border-none"
                      >
                        <Download className="w-4 h-4" />
                        <span>{isRtl ? "تحميل فوري" : "Download Now"}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setBuyProduct(selectedProduct);
                          setSelectedProduct(null);
                        }}
                        className="flex-1 sm:flex-initial bg-violet-600 hover:bg-violet-700 text-white font-black py-3 px-6 rounded-xl text-xs transition-all flex items-center justify-center gap-2 cursor-pointer border-none"
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>{isRtl ? "اقتناء وتفعيل الملف" : "Purchase License"}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. CHECKOUT & SECURE BILLING GATEWAY MODAL */}
      <AnimatePresence>
        {buyProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setBuyProduct(null)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl p-8 overflow-hidden z-10"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-violet-600" />

              <button
                onClick={() => setBuyProduct(null)}
                className="absolute top-6 left-6 md:left-auto md:right-6 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer border-none bg-transparent"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-black tracking-widest text-violet-600 dark:text-violet-400 uppercase">
                    {isRtl ? "بوابة الدفع الآمن والتسليم الفوري" : "Secure Digital Delivery Gateway"}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                    {isRtl ? buyProduct.titleAr : buyProduct.titleEn}
                  </h3>
                  <div className="mt-2 text-xs font-semibold text-slate-400">
                    {isRtl ? "سعر الملف: " : "Item Total: "}
                    <span className="text-violet-600 font-black text-sm">
                      {isRtl ? `${buyProduct.priceEgp} ج.م` : `$${buyProduct.priceUsd}`}
                    </span>
                  </div>
                </div>

                {checkoutSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-12 text-center space-y-4"
                  >
                    <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto text-2xl font-black shadow-inner">
                      ✓
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                        {isRtl ? "تمت عملية الشراء بنجاح!" : "Purchase Successfully Processed!"}
                      </h4>
                      <p className="text-sm text-slate-500 dark:text-neutral-400 font-medium">
                        {isRtl 
                          ? "تم توليد رابط تحميل نسختك الرقمية وإرسالها لبريدك الإلكتروني، بالإضافة لإخطار المحاسب روبير رأفت لتوفير كود التفعيل ومساعدتك." 
                          : "Your download link has been generated and sent to your email, and Elijah's team has been notified for key activation support."}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                    
                    {/* User Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-600 dark:text-neutral-300">
                        {isRtl ? "اسم المشتري *" : "Customer Name *"}
                      </label>
                      <input
                        type="text"
                        required
                        value={checkoutName}
                        onChange={(e) => setCheckoutName(e.target.value)}
                        placeholder={isRtl ? "مثال: أستاذ روبير رأفت" : "e.g., Robert Raafat"}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500 text-slate-900 dark:text-neutral-100 transition-colors"
                      />
                    </div>

                    {/* User Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-600 dark:text-neutral-300">
                        {isRtl ? "البريد الإلكتروني لارسال الملف *" : "Delivery Email Address *"}
                      </label>
                      <input
                        type="email"
                        required
                        value={checkoutEmail}
                        onChange={(e) => setCheckoutEmail(e.target.value)}
                        placeholder="e.g., robert.raafat.86@gmail.com"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500 text-slate-900 dark:text-neutral-100 transition-colors"
                      />
                    </div>

                    {/* User Phone */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-600 dark:text-neutral-300">
                        {isRtl ? "رقم الهاتف / الواتساب للتفعيل *" : "Phone / WhatsApp for Activation *"}
                      </label>
                      <input
                        type="tel"
                        required
                        value={checkoutPhone}
                        onChange={(e) => setCheckoutPhone(e.target.value)}
                        placeholder={isRtl ? "مثال: 01208538580" : "e.g., +20 1208538580"}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500 text-slate-900 dark:text-neutral-100 transition-colors"
                      />
                    </div>

                    {/* Disclaimer block */}
                    <div className="p-3 bg-violet-50/50 dark:bg-violet-950/25 border border-violet-100/40 rounded-xl text-[10px] text-slate-500 dark:text-neutral-400 font-bold flex items-start gap-2 leading-relaxed">
                      <Info className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
                      <span>
                        {isRtl 
                          ? "بالشراء، ستحصل على نسخة مبرمجة أصلية ومفتوحة المصدر بالكامل مع كفالة دعم وتحديثات ماليّة وتقنيّة مجانية لمدة سنة كاملة." 
                          : "Includes lifetime product updates, personal customization support, and direct financial advisory assistance for 1 full year."}
                      </span>
                    </div>

                    {/* Checkout Buttons */}
                    <div className="flex flex-col gap-2 pt-4">
                      
                      {/* Secure Checkout Button */}
                      <button
                        type="submit"
                        className="w-full bg-violet-600 hover:bg-violet-700 text-white font-black py-3.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer border-none shadow-md shadow-violet-500/10"
                      >
                        <CreditCard className="w-4 h-4" />
                        <span>{isRtl ? "إتمام الشراء الآمن" : "Proceed Secure Checkout"}</span>
                      </button>

                      {/* Direct Buy WhatsApp query */}
                      <a
                        href={`https://wa.me/201208538580?text=${encodeURIComponent(
                          isRtl 
                            ? `مرحباً، أود اقتناء المنتج الرقمي المبرمج "${buyProduct.titleAr}" باسم: ${checkoutName || 'روبير رأفت'} وهاتف: ${checkoutPhone || '01208538580'} وبريد: ${checkoutEmail || 'robert.raafat.86@gmail.com'}. أرجو تزويدي بتفاصيل التفعيل والتحويل.`
                            : `Hello, I want to buy your digital product "${buyProduct.titleEn}" for: ${checkoutName || 'Robert Raafat'}, phone: ${checkoutPhone || '01208538580'}, and email: ${checkoutEmail || 'robert.raafat.86@gmail.com'}. Please let me know how to proceed.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-black py-3.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer no-underline text-center"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>{isRtl ? "شراء وتفعيل فوري عبر واتساب" : "Buy instantly on WhatsApp"}</span>
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
