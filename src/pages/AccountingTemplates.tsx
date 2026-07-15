import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { 
  FileSpreadsheet, 
  FileText, 
  Presentation, 
  FileCode, 
  Search, 
  Heart, 
  Download, 
  Eye, 
  X, 
  Check, 
  Filter, 
  Sparkles, 
  Star, 
  Share2, 
  Printer, 
  ChevronLeft, 
  ChevronRight, 
  Info,
  Layers,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Settings,
  HelpCircle
} from 'lucide-react';
import { cn } from '../lib/utils';

// Interfaces
interface Template {
  id: string;
  category: 'excel' | 'word' | 'powerpoint' | 'pdf';
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  fileSize: string;
  downloadsCount: number;
  tags: string[];
  
  // Specific previews
  excelPreview?: {
    headers: string[];
    rows: (string | number)[][];
    formulas: { [key: string]: string }; // e.g., "5,4": "=SUM(C5:E5)"
  };
  wordPreview?: {
    sections: { headingAr: string; headingEn: string; textAr: string; textEn: string }[];
  };
  pptPreview?: {
    slides: { titleAr: string; titleEn: string; pointsAr: string[]; pointsEn: string[]; bgClass: string }[];
  };
  pdfPreview?: {
    checklist: { id: string; labelAr: string; labelEn: string; checked: boolean }[];
  };
}

const TEMPLATES_DATA: Template[] = [
  {
    id: 'tpl-fin-statements',
    category: 'excel',
    titleAr: "قالب القوائم المالية الآلية الشاملة",
    titleEn: "Automated Financial Statements Worksheet",
    descAr: "قالب إكسل مبرمج لحساب الميزانية العمومية، وقائمة الدخل، والتدفقات النقدية تلقائياً من ميزان المراجعة.",
    descEn: "An Excel model to compute Balance Sheet, Income Statement, and Cash Flows automatically from trial balance inputs.",
    difficulty: 'advanced',
    fileSize: "1.4 MB",
    downloadsCount: 3840,
    tags: ["Financial Statements", "IFRS", "EAS"],
    excelPreview: {
      headers: ["Item / الحساب", "2025 (EGP)", "2026 (EGP)", "Variance / الانحراف", "Notes / ملاحظات"],
      rows: [
        ["Revenues / الإيرادات التشغيلية", 850000, 1200000, 350000, "Sales expansion / نمو مبيعات"],
        ["Cost of Goods Sold / تكلفة المبيعات", -500000, -680000, -180000, "Material cost / تكلفة الخامات"],
        ["Gross Profit / مجمل الربح", 350000, 520000, 170000, "Formula / معادلة تلقائية"],
        ["Operating Expenses / المصروفات الإدارية", -120000, -150000, -30000, "Marketing & Rent / تسويق وإيجار"],
        ["Operating Profit / الربح التشغيلي", 230000, 370000, 140000, "Formula / معادلة تلقائية"],
        ["Tax Expenses (22.5%) / ضريبة الدخل", -51750, -83250, -31500, "Standard rate / النسبة القانونية"],
        ["Net Income / صافي الربح بعد الضريبة", 178250, 286750, 108500, "Final Profit / صافي الربح النهائي"]
      ],
      formulas: {
        "2,1": "=B1-C1",
        "2,3": "Calculated dynamically: C3-B3 / مجمل الربح التلقائي",
        "4,3": "Calculated dynamically: C5-B5 / الربح التشغيلي",
        "6,3": "Calculated dynamically: C7-B7 / صافي الربح النهائي"
      }
    }
  },
  {
    id: 'tpl-audit-engagement',
    category: 'word',
    titleAr: "نموذج خطاب ارتباط المراجعة القانونية",
    titleEn: "Standard Audit Engagement Letter Agreement",
    descAr: "خطاب ارتباط رسمي يحدد نطاق التدقيق ومسؤوليات المحاسب القانوني والإدارة وفقاً لمعايير المراجعة الدولية.",
    descEn: "A formal engagement contract defining audit scope, auditor roles, and management liabilities based on ISA guidelines.",
    difficulty: 'beginner',
    fileSize: "280 KB",
    downloadsCount: 1950,
    tags: ["Auditing", "Legal", "Contracts"],
    wordPreview: {
      sections: [
        {
          headingAr: "1. نطاق وأهداف عملية التدقيق",
          headingEn: "1. Objective & Scope of the Audit",
          textAr: "يتمثل هدفنا في إبداء رأي فني مستقل حول مدى عدالة القوائم المالية المرفقة ومطابقتها لمعايير التقارير المالية الدولية (IFRS). وسوف نقوم بإجراء المراجعة وفقاً لمعايير التدقيق الدولية (ISA).",
          textEn: "Our objective is to express an independent professional opinion on whether the financial statements present fairly, in all material respects, the financial position of the Company in accordance with IFRS."
        },
        {
          headingAr: "2. مسؤولية إدارة المنشأة",
          headingEn: "2. Management Responsibilities",
          textAr: "تتحمل إدارة الشركة المسؤولية الكاملة عن إعداد وعرض هذه القوائم المالية بصدق ومسؤوليتها عن تصميم وتطبيق نظام رقابة داخلي فعال يمنع الأخطاء الجوهرية الناتجة عن الغش والتدليس.",
          textEn: "Management is responsible for the preparation and fair presentation of the financial statements and for maintaining effective internal controls necessary to enable preparation free from material misstatement."
        },
        {
          headingAr: "3. أتعاب التدقيق والجدول الزمني",
          headingEn: "3. Audit Fees and Scheduling",
          textAr: "تُحتسب أتعابنا المهنية بناءً على الوقت والخبرة المطلوبة لإتمام العمل الميداني والتقارير النهائية، وتُسدد على دفعات متفق عليها مسبقاً طوال دورة المراجعة المالية.",
          textEn: "Our professional fees are estimated based on the actual time required by specialists assigned to this engagement and will be billed according to the agreed payment milestone schedule."
        }
      ]
    }
  },
  {
    id: 'tpl-board-finance-deck',
    category: 'powerpoint',
    titleAr: "حقيبة العرض المالي السنوي لمجلس الإدارة",
    titleEn: "Annual Financial Board Presentation Template",
    descAr: "قالب عروض تقديمية أنيق مسبق الصنع لمناقشة أداء الربع الأخير والخطط الاستراتيجية وتوقعات السيولة أمام المستثمرين.",
    descEn: "A premium slide-deck template to showcase annual cash runways, revenue metrics, and strategic budget estimates for board meetings.",
    difficulty: 'intermediate',
    fileSize: "4.2 MB",
    downloadsCount: 2890,
    tags: ["Board Meeting", "Reporting", "Strategy"],
    pptPreview: {
      slides: [
        {
          titleAr: "التقرير المالي السنوي ومؤشرات النمو",
          titleEn: "Annual Financial Performance & Growth Targets",
          pointsAr: [
            "زيادة هامش الربح الإجمالي بنسبة 15% مقارنة بالعام الماضي",
            "تحسين معدل دوران المخزون بفضل أنظمة الأتمتة الجديدة",
            "التوسع الإقليمي واستهداف أسواق بديلة لتقليل المخاطر السيادية"
          ],
          pointsEn: [
            "Aggregated Gross Profit margins rose by 15% year-on-year",
            "Inventory turnover ratio optimized via smart pipeline analytics",
            "Sovereign risk minimized through active regional diversification"
          ],
          bgClass: "from-slate-900 to-indigo-950 text-white"
        },
        {
          titleAr: "هيكل السيولة وقائمة التدفقات النقدية",
          titleEn: "Liquidity Blueprint & Cash Flow Position",
          pointsAr: [
            "تدفق نقدي تشغيلي قوي يغطي خطط التوسع الرأسمالي بالكامل",
            "الاحتفاظ باحتياطيات نقدية كافية لمواجهة تقلبات أسعار العملات",
            "نسبة سيولة سريعة مستقرة عند 1.85 متفوقة على متوسط السوق"
          ],
          pointsEn: [
            "Healthy operating cash flows covering major CapEx plans in full",
            "Robust liquidity reserves mitigating currency volatility risks",
            "Stable Quick Ratio standing at 1.85, outperforming the local sector"
          ],
          bgClass: "from-slate-900 to-emerald-950 text-white"
        },
        {
          titleAr: "الموازنة التقديرية المقترحة لعام 2027",
          titleEn: "Proposed Corporate Budget Matrix - 2027",
          pointsAr: [
            "تخصيص 40% من رأس المال للاستثمار التكنولوجي وتطوير الحلول",
            "تقليل تكلفة التشغيل بنسبة 8% عن طريق دمج المعاملات والعمليات",
            "المحافظة على معدل نمو سنوي مستهدف لا يقل عن 22% في الإيرادات"
          ],
          pointsEn: [
            "Allocated 40% of overall corporate funds to tech automations",
            "Trimmed administrative cost footprints by 8% with lean processes",
            "Targeting a baseline organic revenue growth of 22% for next cycle"
          ],
          bgClass: "from-slate-900 to-amber-950 text-white"
        }
      ]
    }
  },
  {
    id: 'tpl-ifrs-checklist',
    category: 'pdf',
    titleAr: "قائمة تدقيق الالتزام بمعايير التقارير المالية الدولية",
    titleEn: "IFRS Standards Compliance & Audit Checklist",
    descAr: "دليل تدقيق شامل لضمان الالتزام بكافة الإفصاحات المطلوبة في المعايير مثل IFRS 9 و IFRS 15 و IFRS 16.",
    descEn: "A thorough printable checklist to assure compliance across critical disclosure frameworks like IFRS 9, 15, and 16.",
    difficulty: 'advanced',
    fileSize: "950 KB",
    downloadsCount: 5120,
    tags: ["Checklist", "Compliance", "PDF"],
    pdfPreview: {
      checklist: [
        { id: 'chk-1', labelAr: "الإفصاح عن شروط الاعتراف بالإيراد وفق النموذج الخماسي (IFRS 15)", labelEn: "Disclosing terms of revenue recognition using the 5-step model (IFRS 15)", checked: true },
        { id: 'chk-2', labelAr: "تحديد القيمة العادلة للأصول المالية واعتراف خسائر الائتمان المتوقعة (IFRS 9)", labelEn: "Determining fair value of financial assets & expected credit loss adjustments (IFRS 9)", checked: true },
        { id: 'chk-3', labelAr: "إثبات أصول حق الاستخدام والتزامات عقود الإيجار في الميزانية (IFRS 16)", labelEn: "Recording right-of-use (ROU) assets and corresponding lease liabilities (IFRS 16)", checked: false },
        { id: 'chk-4', labelAr: "تصنيف ومطابقة الضرائب المؤجلة بالربط الفعلي مع الأرباح والخسائر (IAS 12)", labelEn: "Evaluating and reconciling deferred tax balances and profit adjustments (IAS 12)", checked: false },
        { id: 'chk-5', labelAr: "تقييم أصول ومخزون آخر المدة بالتكلفة أو صافي القيمة القابلة للتحقق أيهما أقل (IAS 2)", labelEn: "Valuing year-end inventories at lower of cost or net realizable value (IAS 2)", checked: true }
      ]
    }
  },
  {
    id: 'tpl-depreciation-schedule',
    category: 'excel',
    titleAr: "جدول احتساب إهلاك الأصول الثابتة بمختلف الطرق",
    titleEn: "Fixed Assets Multi-Method Depreciation Schedule",
    descAr: "جدول إكسل ديناميكي يدعم حساب الإهلاك بطرق القسط الثابت، القسط المتناقص، ومجموع أرقام السنين.",
    descEn: "A flexible Excel sheet calculating multi-year depreciation rates using Straight-Line, Declining-Balance, and SYD formulas.",
    difficulty: 'intermediate',
    fileSize: "1.1 MB",
    downloadsCount: 2430,
    tags: ["Fixed Assets", "Depreciation", "Tax Code"],
    excelPreview: {
      headers: ["Asset Name / الأصل", "Purchase Cost / التكلفة", "Salvage Value / الخردة", "Life / العمر", "Method / طريقة الحساب", "Depr. EGP / الإهلاك السنوي"],
      rows: [
        ["Server Hardware / أجهزة خوادم شبكات", 80000, 5000, 5, "Double Declining / متناقص مضاعف", 32000, "First year rate / معدل السنة الأولى"],
        ["Office Furniture / أثاث مكاتب إدارية", 45000, 3000, 7, "Straight Line / قسط ثابت", 6000, "85% safe utilization / معامل حماية"],
        ["Delivery Vehicles / سيارات شحن ونقل", 150000, 20000, 5, "Straight Line / قسط ثابت", 26000, "Regular schedule / إهلاك اعتيادي"],
        ["Machinery / آلات ومعدات مصانع", 320000, 40000, 10, "SYD / مجموع السنين", 50909, "Accelerated / حساب معجل"]
      ],
      formulas: {
        "1,5": "Formula: =DDB(B2, C2, D2, 1, 2) / إهلاك متناقص تلقائي",
        "2,5": "Formula: =SLN(B3, C3, D3) / إهلاك ثابت تلقائي"
      }
    }
  },
  {
    id: 'tpl-internal-control-policy',
    category: 'word',
    titleAr: "سياسة الرقابة والتحكم الداخلي لإدارة النقدية",
    titleEn: "Internal Control Policy for Corporate Treasury",
    descAr: "مستند تنظيم داخلي يوضح الفصل بين الصلاحيات، وإجراءات جرد الخزائن والودائع، والمطابقة البنكية.",
    descEn: "An administrative policy template explaining Segregation of Duties (SoD), safe audits, bank matchings, and petty cash systems.",
    difficulty: 'intermediate',
    fileSize: "410 KB",
    downloadsCount: 1540,
    tags: ["Internal Control", "Governance", "Treasury"],
    wordPreview: {
      sections: [
        {
          headingAr: "1. مبدأ الفصل بين الواجبات والمهام",
          headingEn: "1. Segregation of Duties (SoD)",
          textAr: "يمنع منعاً باتاً قيام الموظف الذي يسجل المقبوضات النقدية في الدفاتر المحاسبية بالإشراف الفعلي على استلام المبالغ النقدية أو حيازة مفاتيح الخزينة الأساسية للمؤسسة تجنباً للتواطؤ.",
          textEn: "No single employee shall maintain sole control over all phases of a cash transaction. The individual recording ledger receipts must remain distinct from the custodian managing physical safe deposits."
        },
        {
          headingAr: "2. الرقابة وجرد الصندوق اليومي المفاجئ",
          headingEn: "2. Safe House Custody & Surprise Audits",
          textAr: "يخضع أمين الصندوق لجرد مفاجئ لعهدة الخزنة المودعة من قبل الإدارة المالية والمراجع الداخلي في أوقات غير محددة، ويتم مطابقة الرصيد الفعلي مع الدفاتر وتحرير محضر جرد موقع.",
          textEn: "Treasury deposits are audited on an unscheduled surprise basis by internal audit executives. All physical balances must be reconciled against the live ledger system immediately."
        }
      ]
    }
  },
  {
    id: 'tpl-pitch-investor',
    category: 'powerpoint',
    titleAr: "عرض مالي لجذب المستثمرين والتمويل البنكي",
    titleEn: "Financial Pitch Deck for Investors & Venture Funding",
    descAr: "شريحة عروض ممتازة لشرح نموذج الإيرادات المستدام، وتوقعات العائد الاستثماري وحرق النقدية للمشاريع الناشئة.",
    descEn: "An outstanding slides deck describing corporate pricing strategy, unit economics, cash burn rate, and investment proposals.",
    difficulty: 'advanced',
    fileSize: "5.1 MB",
    downloadsCount: 3200,
    tags: ["Pitch Deck", "Investment", "SMEs"],
    pptPreview: {
      slides: [
        {
          titleAr: "الفرصة الاستثمارية ونموذج الإيرادات",
          titleEn: "Market Opportunity & Scalable Revenue Model",
          pointsAr: [
            "نموذج اشتراكات شهرية متكررة (SaaS) يضمن استقرار التدفقات",
            "تكلفة الاستحواذ على العميل (CAC) منخفضة مقارنة بالقيمة الإجمالية",
            "حجم السوق المستهدف المتوقع يتجاوز الـ 500 مليون جنيه محلياً"
          ],
          pointsEn: [
            "Predictable recurring SaaS monthly plans ensuring stable cash streams",
            "Extremely lean Customer Acquisition Costs (CAC) relative to high LTV",
            "Expected addressable domestic market scope exceeding 500 million EGP"
          ],
          bgClass: "from-slate-900 to-amber-950 text-white"
        },
        {
          titleAr: "خطة استخدام التمويل والتوسع",
          titleEn: "Capital Allocation & Growth Roadmap",
          pointsAr: [
            "توجيه 50% من رأس المال لزيادة القدرات الإنتاجية وتحسين الكود",
            "تخصيص 30% للتسويق المباشر واجتذاب شرائح مستهلكين جديدة",
            "الوصول لنقطة التعادل المالي (Break-even) خلال 14 شهراً فقط"
          ],
          pointsEn: [
            "50% of capital utilized for pipeline scaling and core optimizations",
            "30% dedicated to customer acquisition campaigns & media outreach",
            "Reaching corporate Break-even milestone within just 14 months"
          ],
          bgClass: "from-slate-900 to-indigo-950 text-white"
        }
      ]
    }
  },
  {
    id: 'tpl-chart-accounts',
    category: 'pdf',
    titleAr: "دليل ودليل ترميز شجرة الحسابات الموحد",
    titleEn: "Standardized Unified Chart of Accounts Guide",
    descAr: "دليل ترقيمي تفصيلي لشجرة الحسابات المناسبة لشركات المقاولات، الخدمات، والتصنيع لسهولة ربط قواعد البيانات.",
    descEn: "A comprehensive numeric Chart of Accounts (COA) blueprint fitting construction, retail, and manufacturing industries.",
    difficulty: 'intermediate',
    fileSize: "1.2 MB",
    downloadsCount: 4320,
    tags: ["Chart of Accounts", "Systems", "Database"],
    pdfPreview: {
      checklist: [
        { id: 'coa-1', labelAr: "الحسابات الرئيسية المستوى الأول: 1 - الأصول، 2 - الالتزامات، 3 - حقوق الملكية", labelEn: "Level 1 Accounts: 1 - Assets, 2 - Liabilities, 3 - Owner's Equity", checked: true },
        { id: 'coa-2', labelAr: "مستوى الأصول المتداولة (11) والأصول غير المتداولة (12) لسهولة المطابقة", labelEn: "Level 2 classification: Current Assets (11), Non-Current Assets (12)", checked: true },
        { id: 'coa-3', labelAr: "ربط العملاء بنظام ترميز فرعي يبدأ بالرمز (1102) لتجنب عشوائية الأسماء", labelEn: "Customer sub-ledger coding sequence beginning strictly with index (1102)", checked: true },
        { id: 'coa-4', labelAr: "تصنيف تكلفة البضاعة المباعة ضمن حساب النفقات والنشاط التشغيلي الرئيسي (4)", labelEn: "Allocating cost of goods sold under operational expenses classification (4)", checked: true }
      ]
    }
  }
];

export default function AccountingTemplates() {
  const { i18n, t } = useTranslation();
  const isRtl = i18n.language === 'ar';

  // 1. Core Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  
  // Favorites persistence
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('elijah_templates_favorites');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Active previewed template modal
  const [activeTemplate, setActiveTemplate] = useState<Template | null>(null);
  
  // PowerPoint Slide active indexes
  const [activeSlideIndex, setActiveSlideIndex] = useState<{ [key: string]: number }>({});

  // Active Download Progress Animation state
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);

  // Shared Link copy indicators
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sync favorites
  const toggleFavorite = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setFavorites(prev => {
      const updated = prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id];
      localStorage.setItem('elijah_templates_favorites', JSON.stringify(updated));
      return updated;
    });
  };

  // Filter logic
  const filteredTemplates = useMemo(() => {
    return TEMPLATES_DATA.filter(tpl => {
      const title = isRtl ? tpl.titleAr : tpl.titleEn;
      const desc = isRtl ? tpl.descAr : tpl.descEn;
      const tags = tpl.tags.join(' ');
      const searchStr = `${title} ${desc} ${tags}`.toLowerCase();
      
      const matchesSearch = searchStr.includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || tpl.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'all' || tpl.difficulty === selectedDifficulty;
      const matchesFavorite = !showFavoritesOnly || favorites.includes(tpl.id);

      return matchesSearch && matchesCategory && matchesDifficulty && matchesFavorite;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty, showFavoritesOnly, favorites, isRtl]);

  // Handle Download trigger
  const handleDownload = (tpl: Template, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setDownloadingId(tpl.id);

    // Simulate structured progress trigger
    setTimeout(() => {
      // Create real downloadable sample contents based on category
      let fileContent = "";
      let mimeType = "text/plain";
      let fileExtension = "txt";

      if (tpl.category === 'excel') {
        // Generate a structured real CSV
        const headers = tpl.excelPreview?.headers || ["Item", "Year 1", "Year 2"];
        const rows = tpl.excelPreview?.rows || [];
        fileContent = "\uFEFF"; // Byte Order Mark for Excel Arabic compatibility
        fileContent += headers.join(",") + "\n";
        rows.forEach(r => {
          fileContent += r.map(cell => {
            // escape commas
            const text = String(cell);
            if (text.includes(",") || text.includes("\n")) {
              return `"${text.replace(/"/g, '""')}"`;
            }
            return text;
          }).join(",") + "\n";
        });
        mimeType = "text/csv;charset=utf-8;";
        fileExtension = "csv";
      } else if (tpl.category === 'word') {
        // Generate a clean Markdown / Policy documentation
        fileContent = `# ${isRtl ? tpl.titleAr : tpl.titleEn}\n\n`;
        fileContent += `## ${isRtl ? "نبذة عن المستند" : "Document Brief"}\n`;
        fileContent += `${isRtl ? tpl.descAr : tpl.descEn}\n\n`;
        tpl.wordPreview?.sections.forEach(sec => {
          fileContent += `### ${isRtl ? sec.headingAr : sec.headingEn}\n`;
          fileContent += `${isRtl ? sec.textAr : sec.textEn}\n\n`;
        });
        fileContent += `\n* ${isRtl ? "تم تحميله من منصة إيليجا المحاسبية" : "Downloaded from Elijah Professional Accounting Platform"} *`;
        mimeType = "text/markdown;charset=utf-8;";
        fileExtension = "md";
      } else if (tpl.category === 'powerpoint') {
        // Generate presentation narrative outline
        fileContent = `=== PRESENTATION OUTLINE: ${isRtl ? tpl.titleAr : tpl.titleEn} ===\n\n`;
        tpl.pptPreview?.slides.forEach((sl, idx) => {
          fileContent += `--- SLIDE ${idx + 1}: ${isRtl ? sl.titleAr : sl.titleEn} ---\n`;
          const pts = isRtl ? sl.pointsAr : sl.pointsEn;
          pts.forEach(pt => {
            fileContent += ` * ${pt}\n`;
          });
          fileContent += `\n`;
        });
        mimeType = "text/plain;charset=utf-8;";
        fileExtension = "txt";
      } else {
        // Generate standard clean checklist text printable layout
        fileContent = `===============================================\n`;
        fileContent += `   ${isRtl ? tpl.titleAr : tpl.titleEn}\n`;
        fileContent += `   ${isRtl ? "مستودع إيليجا المالي والتدقيق المهني" : "Elijah Compliance Checklist"}\n`;
        fileContent += `===============================================\n\n`;
        tpl.pdfPreview?.checklist.forEach(chk => {
          fileContent += `[${chk.checked ? "X" : " "}] ${isRtl ? chk.labelAr : chk.labelEn}\n\n`;
        });
        mimeType = "text/plain;charset=utf-8;";
        fileExtension = "txt";
      }

      // Trigger browser native download
      const blob = new Blob([fileContent], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `${tpl.id}-${tpl.category}.${fileExtension}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadingId(null);
      setDownloadSuccessId(tpl.id);
      
      // Clear success notification
      setTimeout(() => setDownloadSuccessId(null), 3000);
    }, 1200);
  };

  const copyShareLink = (tplId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/templates-library?id=${tplId}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedId(tplId);
      setTimeout(() => setCopiedId(null), 2500);
    });
  };

  return (
    <div className="relative min-h-screen py-8">
      
      {/* 1. Page Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 rounded-full text-xs font-black border border-indigo-100 dark:border-indigo-900/40 shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
            <span>{isRtl ? "مستندات مالية وجداول مهنية معتمدة" : "Standardized Accounting Assets Hub"}</span>
          </motion.div>

          <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
            {isRtl ? (
              <>مكتبة <span className="gradient-text">القوالب والنماذج</span> المحاسبية</>
            ) : (
              <>Accounting <span className="gradient-text">Templates & Sheets</span> Library</>
            )}
          </h1>

          <p className="text-[15px] md:text-[17px] leading-[1.7] text-slate-500 dark:text-neutral-400 font-medium">
            {isRtl ? (
              "حمل مجاناً نماذج ومستندات محاسبية منسقة ومهيأة بالكامل للعمل الفوري في الإكسل، الوورد، العروض التقديمية، وملفات الـ PDF."
            ) : (
              "Download structured Excel dashboards, Word audit letters, PowerPoint pitch decks, and regulatory PDF checklists. Fully prepared by certified financial authorities."
            )}
          </p>
        </div>
      </div>

      {/* 2. Interactive Search, Filters & Controls Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-10">
        <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-5 rounded-3xl shadow-xl space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder={isRtl ? "ابحث عن قالب مالي أو وسوم..." : "Search financial templates, tags..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-11 pl-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30 transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Select Filters */}
            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-neutral-300 focus:outline-hidden"
              >
                <option value="all">{isRtl ? "جميع التصنيفات (إكسل، وورد، باوربوينت)" : "All Asset Formats"}</option>
                <option value="excel">{isRtl ? "جداول إكسل (Excel Sheets)" : "Excel Workbooks"}</option>
                <option value="word">{isRtl ? "مستندات وورد (Word Documents)" : "Word Documents"}</option>
                <option value="powerpoint">{isRtl ? "عروض تقديمية (PowerPoint)" : "PowerPoint Slides"}</option>
                <option value="pdf">{isRtl ? "ملفات ومستندات PDF" : "PDF Checklists"}</option>
              </select>
            </div>

            {/* Difficulty Filter */}
            <div className="md:col-span-2">
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-neutral-300 focus:outline-hidden"
              >
                <option value="all">{isRtl ? "جميع المستويات" : "All Difficulties"}</option>
                <option value="beginner">{isRtl ? "مبتدئ / تأسيسي" : "Beginner / Basic"}</option>
                <option value="intermediate">{isRtl ? "متوسط / احترافي" : "Intermediate"}</option>
                <option value="advanced">{isRtl ? "متقدم / خبراء" : "Advanced / Experts"}</option>
              </select>
            </div>

            {/* Favorite Filter Toggle */}
            <div className="md:col-span-2 flex justify-end">
              <button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={cn(
                  "w-full py-3 px-4 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 border cursor-pointer",
                  showFavoritesOnly 
                    ? "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/40 text-rose-600 dark:text-rose-400"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-neutral-300 hover:bg-slate-50"
                )}
              >
                <Heart className={cn("w-4 h-4", showFavoritesOnly ? "fill-rose-500 text-rose-500" : "text-slate-400")} />
                <span>{isRtl ? `المفضلة (${favorites.length})` : `Favorites (${favorites.length})`}</span>
              </button>
            </div>
          </div>

          {/* Quick Informational note */}
          <div className="flex items-center gap-2 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/20 px-4 py-2.5 rounded-xl">
            <Info className="w-3.5 h-3.5 flex-shrink-0" />
            <span>
              {isRtl 
                ? "تتضمن قوالب الإكسل تفعيلاً للمكعب التفاعلي والتحقق من العمليات الحيوية، بينما تشتمل العروض على هيكل موازنة 2027 المحدث." 
                : "Excel formats support live formulas and active cell checks; Word/PPT formats provide compliant templates and strategic plans."}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Grid of Templates */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AnimatePresence mode="popLayout">
          {filteredTemplates.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredTemplates.map((tpl) => (
                <motion.div
                  layout
                  key={tpl.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group relative bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-900/60 transition-all flex flex-col"
                >
                  
                  {/* Category Banner Visual Header */}
                  <div className={cn(
                    "p-4 h-24 flex items-center justify-between relative",
                    tpl.category === 'excel' && "bg-linear-to-br from-emerald-500/10 to-teal-600/5 dark:from-emerald-950/20",
                    tpl.category === 'word' && "bg-linear-to-br from-sky-500/10 to-blue-600/5 dark:from-sky-950/20",
                    tpl.category === 'powerpoint' && "bg-linear-to-br from-amber-500/10 to-orange-600/5 dark:from-amber-950/20",
                    tpl.category === 'pdf' && "bg-linear-to-br from-rose-500/10 to-red-600/5 dark:from-rose-950/20"
                  )}>
                    {/* Floating Icon */}
                    <div className={cn(
                      "p-3 rounded-2xl",
                      tpl.category === 'excel' && "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-400",
                      tpl.category === 'word' && "bg-sky-100 text-sky-700 dark:bg-sky-950/80 dark:text-sky-400",
                      tpl.category === 'powerpoint' && "bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-400",
                      tpl.category === 'pdf' && "bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-400"
                    )}>
                      {tpl.category === 'excel' && <FileSpreadsheet className="w-6 h-6" />}
                      {tpl.category === 'word' && <FileText className="w-6 h-6" />}
                      {tpl.category === 'powerpoint' && <Presentation className="w-6 h-6" />}
                      {tpl.category === 'pdf' && <FileCode className="w-6 h-6" />}
                    </div>

                    {/* Metadata size & difficulty badge */}
                    <div className="flex flex-col items-end gap-1.5 text-right">
                      <span className="text-[10px] font-black tracking-wider uppercase bg-white/80 dark:bg-slate-950/60 px-2 py-0.5 rounded-full text-slate-500 dark:text-neutral-400">
                        {tpl.fileSize}
                      </span>
                      <span className={cn(
                        "text-[9px] font-black tracking-wide uppercase px-2.5 py-0.5 rounded-full",
                        tpl.difficulty === 'beginner' && "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
                        tpl.difficulty === 'intermediate' && "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
                        tpl.difficulty === 'advanced' && "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400"
                      )}>
                        {tpl.difficulty === 'beginner' && (isRtl ? "مبتدئ" : "Beginner")}
                        {tpl.difficulty === 'intermediate' && (isRtl ? "متوسط" : "Intermediate")}
                        {tpl.difficulty === 'advanced' && (isRtl ? "متقدم" : "Advanced")}
                      </span>
                    </div>
                  </div>

                  {/* Body details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <h3 className="font-black text-sm text-slate-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {isRtl ? tpl.titleAr : tpl.titleEn}
                      </h3>
                      <p className="text-[11px] leading-[1.6] text-slate-500 dark:text-neutral-400 font-medium line-clamp-3">
                        {isRtl ? tpl.descAr : tpl.descEn}
                      </p>
                    </div>

                    {/* Tags List */}
                    <div className="flex flex-wrap gap-1.5 pt-3">
                      {tpl.tags.map(t => (
                        <span key={t} className="text-[9px] font-bold px-2 py-0.5 bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-neutral-400 rounded-md">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom functional actions row */}
                  <div className="px-5 py-4 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between gap-2">
                    
                    {/* Share & Heart shortcuts */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => toggleFavorite(tpl.id, e)}
                        className="p-2 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-xl transition-colors cursor-pointer"
                      >
                        <Heart className={cn("w-4 h-4", favorites.includes(tpl.id) ? "fill-rose-500 text-rose-500" : "text-slate-400")} />
                      </button>

                      <button
                        onClick={(e) => copyShareLink(tpl.id, e)}
                        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors relative cursor-pointer"
                        title={isRtl ? "نسخ رابط المشاركة" : "Share template link"}
                      >
                        {copiedId === tpl.id ? (
                          <Check className="w-4 h-4 text-emerald-500 animate-pulse" />
                        ) : (
                          <Share2 className="w-4 h-4 text-slate-400 hover:text-slate-600" />
                        )}
                      </button>
                    </div>

                    {/* Preview / Download triggers */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setActiveSlideIndex({});
                          setActiveTemplate(tpl);
                        }}
                        className="px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl text-[10px] font-black text-slate-700 dark:text-neutral-300 transition-colors cursor-pointer flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{isRtl ? "معاينة" : "Preview"}</span>
                      </button>

                      <button
                        onClick={(e) => handleDownload(tpl, e)}
                        disabled={downloadingId === tpl.id}
                        className={cn(
                          "px-3 py-1.5 rounded-xl text-[10px] font-black text-white cursor-pointer transition-all flex items-center gap-1 shadow-xs border-none",
                          downloadSuccessId === tpl.id 
                            ? "bg-emerald-600 hover:bg-emerald-700"
                            : "bg-indigo-600 hover:bg-indigo-700"
                        )}
                      >
                        {downloadingId === tpl.id ? (
                          <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : downloadSuccessId === tpl.id ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          <Download className="w-3.5 h-3.5" />
                        )}
                        <span>
                          {downloadSuccessId === tpl.id 
                            ? (isRtl ? "تم تحميله" : "Success") 
                            : (isRtl ? "تحميل" : "Download")}
                        </span>
                      </button>
                    </div>
                  </div>

                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl"
            >
              <Info className="w-12 h-12 text-slate-300 dark:text-neutral-600 mx-auto mb-4" />
              <p className="text-sm font-black text-slate-800 dark:text-neutral-300">
                {isRtl ? "لا توجد قوالب محاسبية تطابق الفلاتر المحددة" : "No templates match your active filters"}
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedDifficulty('all'); setShowFavoritesOnly(false); }}
                className="mt-4 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black border-none cursor-pointer"
              >
                {isRtl ? "إعادة ضبط الفلاتر" : "Reset Filters"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. MODAL: IMMERSIVE INTERACTIVE PREVIEW */}
      <AnimatePresence>
        {activeTemplate && (
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
            >
              
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 dark:border-slate-850 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/20">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2.5 rounded-xl",
                    activeTemplate.category === 'excel' && "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50",
                    activeTemplate.category === 'word' && "bg-sky-50 text-sky-600 dark:bg-sky-950/50",
                    activeTemplate.category === 'powerpoint' && "bg-amber-50 text-amber-600 dark:bg-amber-950/50",
                    activeTemplate.category === 'pdf' && "bg-rose-50 text-rose-600 dark:bg-rose-950/50"
                  )}>
                    {activeTemplate.category === 'excel' && <FileSpreadsheet className="w-5 h-5" />}
                    {activeTemplate.category === 'word' && <FileText className="w-5 h-5" />}
                    {activeTemplate.category === 'powerpoint' && <Presentation className="w-5 h-5" />}
                    {activeTemplate.category === 'pdf' && <FileCode className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="font-black text-sm md:text-base text-slate-900 dark:text-white leading-tight">
                      {isRtl ? activeTemplate.titleAr : activeTemplate.titleEn}
                    </h3>
                    <p className="text-[10px] text-slate-500 dark:text-neutral-400 font-bold">
                      {isRtl ? "معاينة بصرية للمستند" : "Live Document Interactive Preview"} • {activeTemplate.fileSize}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTemplate(null)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer border border-slate-200 dark:border-slate-850"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              {/* Modal Body (Scrollable document container) */}
              <div className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
                
                {/* A: EXCEL INTERACTIVE GRID PREVIEW */}
                {activeTemplate.category === 'excel' && activeTemplate.excelPreview && (
                  <div className="space-y-4">
                    {/* Simulated Formula Bar */}
                    <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 flex items-center gap-2">
                      <div className="font-mono text-[10px] font-black text-slate-400 border-r border-slate-200 dark:border-slate-800 px-2 select-none">
                        fx
                      </div>
                      <div className="font-mono text-xs text-indigo-600 dark:text-indigo-400 font-semibold select-all truncate">
                        {isRtl 
                          ? "انقر على أي خلية مبرمجة لعرض معادلتها الرياضية التلقائية في شريط الصيغ" 
                          : "Formula Bar: Click/hover on a formula item to inspect its Excel rule below"}
                      </div>
                    </div>

                    {/* Grid */}
                    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                      <table className="w-full text-left border-collapse font-sans">
                        <thead>
                          <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
                            {activeTemplate.excelPreview.headers.map((h, i) => (
                              <th 
                                key={i} 
                                className={cn(
                                  "p-3 text-[11px] font-black text-slate-700 dark:text-neutral-300 uppercase",
                                  i === 0 ? "text-right" : "text-center"
                                )}
                              >
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {activeTemplate.excelPreview.rows.map((row, rIdx) => {
                            const isFormulaRow = String(row[0]).includes("Profit") || String(row[0]).includes("Income") || String(row[0]).includes("الربح");
                            return (
                              <tr 
                                key={rIdx} 
                                className={cn(
                                  "border-b border-slate-100 dark:border-slate-850 hover:bg-slate-50/50 dark:hover:bg-slate-950/20 transition-all",
                                  isFormulaRow ? "bg-indigo-50/20 dark:bg-indigo-950/10 font-bold" : "font-medium"
                                )}
                              >
                                {row.map((cell, cIdx) => {
                                  // Check if this cell is calculated by formula
                                  const formulaKey = `${rIdx},${cIdx}`;
                                  const hasFormula = activeTemplate.excelPreview?.formulas[formulaKey];
                                  
                                  return (
                                    <td 
                                      key={cIdx} 
                                      title={hasFormula ? `${isRtl ? "صيغة:" : "Formula:"} ${hasFormula}` : undefined}
                                      className={cn(
                                        "p-3 text-[11px] text-slate-600 dark:text-neutral-400",
                                        cIdx === 0 ? "text-right font-black" : "text-center font-mono",
                                        hasFormula && "text-indigo-600 dark:text-indigo-400 underline decoration-dotted cursor-help",
                                        isFormulaRow && "text-slate-900 dark:text-white"
                                      )}
                                    >
                                      {typeof cell === 'number' 
                                        ? (cell < 0 ? `(${Math.abs(cell).toLocaleString()})` : cell.toLocaleString())
                                        : cell}
                                    </td>
                                  );
                                })}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* B: WORD CORPORATE CONTRACT PREVIEW */}
                {activeTemplate.category === 'word' && activeTemplate.wordPreview && (
                  <div className="bg-slate-50 dark:bg-slate-950 p-6 md:p-8 rounded-3xl border border-slate-150 dark:border-slate-850 shadow-inner max-w-2xl mx-auto space-y-6 text-slate-800 dark:text-neutral-200">
                    {/* Standard Audit firm letterhead mockup */}
                    <div className="pb-6 border-b border-dashed border-slate-200 dark:border-slate-800 flex justify-between items-center text-[10px] font-bold text-slate-400">
                      <div>
                        <p>{isRtl ? "مجموعة إيليجا للخدمات المهنية" : "Elijah Consulting Group"}</p>
                        <p>{isRtl ? "شارع الطيران، مدينة نصر، القاهرة" : "Tayaran St, Nasr City, Cairo"}</p>
                      </div>
                      <div className="text-left">
                        <p>{isRtl ? "التاريخ: 14 يوليو 2026" : "Date: July 14, 2026"}</p>
                        <p>{isRtl ? "الرقم المرجعي: EL-2026/AUD" : "Ref: EL-2026/AUD"}</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <h4 className="text-center font-black text-sm text-slate-900 dark:text-white underline decoration-amber-500 underline-offset-4">
                        {isRtl ? activeTemplate.titleAr : activeTemplate.titleEn}
                      </h4>

                      {activeTemplate.wordPreview.sections.map((sec, idx) => (
                        <div key={idx} className="space-y-2">
                          <h5 className="font-black text-xs text-indigo-600 dark:text-indigo-400">
                            {isRtl ? sec.headingAr : sec.headingEn}
                          </h5>
                          <p className="text-[11px] leading-[1.7] text-slate-600 dark:text-neutral-300 text-justify font-medium">
                            {isRtl ? sec.textAr : sec.textEn}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Signature Line */}
                    <div className="pt-8 border-t border-dashed border-slate-200 dark:border-slate-800 flex justify-between items-center text-[10px] font-bold text-slate-400">
                      <div>
                        <p>{isRtl ? "توقيع الشريك المسؤول:" : "Auditor Partner Sign:"}</p>
                        <p className="font-serif italic text-slate-500 pt-1">Elijah Certified Partners</p>
                      </div>
                      <div className="text-left">
                        <p>{isRtl ? "اعتماد رئيس مجلس الإدارة:" : "Client Board Acceptance:"}</p>
                        <p className="pt-2">______________________</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* C: POWERPOINT PRESENTATION SLIDES PREVIEW */}
                {activeTemplate.category === 'powerpoint' && activeTemplate.pptPreview && (
                  <div className="space-y-4 max-w-2xl mx-auto">
                    {/* Slides Stage */}
                    {(() => {
                      const slideIndex = activeSlideIndex[activeTemplate.id] || 0;
                      const slide = activeTemplate.pptPreview.slides[slideIndex];
                      return (
                        <motion.div 
                          key={slideIndex}
                          initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={cn(
                            "bg-linear-to-br rounded-2xl p-8 shadow-xl relative aspect-video flex flex-col justify-between overflow-hidden",
                            slide.bgClass
                          )}
                        >
                          <div className="space-y-4">
                            {/* Slide Number Header */}
                            <div className="flex items-center justify-between text-[10px] font-black opacity-60">
                              <span>{isRtl ? "عرض موازنة الإدارة" : "Elijah Financial Deck"}</span>
                              <span>Slide {slideIndex + 1} / {activeTemplate.pptPreview.slides.length}</span>
                            </div>

                            {/* Slide Title */}
                            <h4 className="text-base md:text-lg font-black tracking-tight leading-tight">
                              {isRtl ? slide.titleAr : slide.titleEn}
                            </h4>

                            {/* Points list */}
                            <ul className="space-y-2">
                              {(isRtl ? slide.pointsAr : slide.pointsEn).map((pt, i) => (
                                <li key={i} className="text-xs font-semibold flex items-start gap-2 opacity-90">
                                  <span className="text-amber-400 pt-1">•</span>
                                  <span>{pt}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Slide Footer */}
                          <div className="text-[9px] opacity-45 font-mono text-left pt-2 border-t border-white/10">
                            Elijah Systems & Consulting 2026
                          </div>
                        </motion.div>
                      );
                    })()}

                    {/* Slides Navigation */}
                    <div className="flex items-center justify-between gap-4">
                      <button
                        onClick={() => {
                          const curr = activeSlideIndex[activeTemplate.id] || 0;
                          if (curr > 0) {
                            setActiveSlideIndex({ ...activeSlideIndex, [activeTemplate.id]: curr - 1 });
                          }
                        }}
                        disabled={(activeSlideIndex[activeTemplate.id] || 0) === 0}
                        className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 rounded-xl text-xs font-bold text-slate-500 dark:text-neutral-400 flex items-center gap-1.5 cursor-pointer border border-slate-200 dark:border-slate-850"
                      >
                        <ChevronRight className="w-4 h-4" />
                        <span>{isRtl ? "الشريحة السابقة" : "Previous Slide"}</span>
                      </button>

                      <div className="flex gap-1">
                        {activeTemplate.pptPreview.slides.map((_, idx) => (
                          <span 
                            key={idx} 
                            className={cn(
                              "w-2 h-2 rounded-full",
                              (activeSlideIndex[activeTemplate.id] || 0) === idx ? "bg-amber-500" : "bg-slate-200 dark:bg-slate-800"
                            )}
                          />
                        ))}
                      </div>

                      <button
                        onClick={() => {
                          const curr = activeSlideIndex[activeTemplate.id] || 0;
                          if (curr < (activeTemplate.pptPreview?.slides.length || 1) - 1) {
                            setActiveSlideIndex({ ...activeSlideIndex, [activeTemplate.id]: curr + 1 });
                          }
                        }}
                        disabled={(activeSlideIndex[activeTemplate.id] || 0) === (activeTemplate.pptPreview.slides.length - 1)}
                        className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 rounded-xl text-xs font-bold text-slate-500 dark:text-neutral-400 flex items-center gap-1.5 cursor-pointer border border-slate-200 dark:border-slate-850"
                      >
                        <span>{isRtl ? "الشريحة التالية" : "Next Slide"}</span>
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* D: PDF REGULATORY AUDIT CHECKLIST PREVIEW */}
                {activeTemplate.category === 'pdf' && activeTemplate.pdfPreview && (
                  <div className="bg-slate-50 dark:bg-slate-950 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-2xl mx-auto space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 text-[10px] font-black text-slate-400">
                      <span>{isRtl ? "قائمة مطابقة ومراجعة قانونية" : "Regulatory Auditor Sheet"}</span>
                      <span>{isRtl ? "صيغة طباعة PDF معتمدة" : "Standard IFRS Form"}</span>
                    </div>

                    <div className="space-y-3">
                      {activeTemplate.pdfPreview.checklist.map((item) => (
                        <div 
                          key={item.id} 
                          className="flex items-start gap-3 p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-xl hover:bg-slate-50 transition-colors"
                        >
                          <div className={cn(
                            "w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 mt-0.5",
                            item.checked 
                              ? "bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950/40 dark:border-rose-900/60 dark:text-rose-400" 
                              : "border-slate-300 dark:border-slate-700 text-transparent"
                          )}>
                            {item.checked && <Check className="w-3.5 h-3.5 stroke-[3px]" />}
                          </div>
                          <div>
                            <p className="text-[11px] font-bold text-slate-700 dark:text-neutral-300 leading-normal">
                              {isRtl ? item.labelAr : item.labelEn}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 text-[10px] text-slate-400 font-bold text-center">
                      {isRtl 
                        ? "ملاحظة: يمكنك طباعة هذه الصفحة مباشرة أو تحميلها كملف مهيأ بصيغة PDF." 
                        : "Note: This checklist features fully trace-tested items compliant with IAS and IFRS updates."}
                    </div>
                  </div>
                )}

              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/20">
                <button
                  onClick={() => toggleFavorite(activeTemplate.id)}
                  className={cn(
                    "px-4 py-2.5 rounded-2xl text-xs font-black border transition-all cursor-pointer flex items-center gap-2",
                    favorites.includes(activeTemplate.id)
                      ? "bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950/40 dark:border-rose-900/60 dark:text-rose-400"
                      : "bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-850 text-slate-600 dark:text-neutral-300"
                  )}
                >
                  <Heart className={cn("w-4 h-4", favorites.includes(activeTemplate.id) ? "fill-rose-500 text-rose-500" : "text-slate-400")} />
                  <span>
                    {favorites.includes(activeTemplate.id) ? (isRtl ? "في المفضلة" : "Favorited") : (isRtl ? "أضف للمفضلة" : "Add to Favorites")}
                  </span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setActiveTemplate(null);
                      window.print();
                    }}
                    className="px-4 py-2.5 bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-850 text-xs font-black text-slate-600 dark:text-neutral-300 rounded-2xl cursor-pointer transition-colors flex items-center gap-1.5"
                  >
                    <Printer className="w-4 h-4" />
                    <span>{isRtl ? "طباعة" : "Print"}</span>
                  </button>

                  <button
                    onClick={() => handleDownload(activeTemplate)}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-black border-none cursor-pointer flex items-center gap-1.5 shadow-md"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isRtl ? "تحميل الملف" : "Download Asset"}</span>
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
