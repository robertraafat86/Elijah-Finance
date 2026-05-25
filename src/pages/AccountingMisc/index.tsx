import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { 
  Search, 
  Plus,
  Users,
  Truck,
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  X,
  Calendar,
  Filter,
  Download,
  AlertCircle,
  TrendingUp,
  History,
  Printer,
  FileDown,
  BookOpen,
  Microscope,
  RotateCcw,
  BookMarked,
  LayoutDashboard,
  Box,
  ClipboardList,
  BarChart3,
  PieChart as PieChartIcon,
  ShoppingBag,
  Briefcase,
  Save,
  Check,
  Globe,
  RefreshCcw,
  Scale,
  Calculator,
  FileSpreadsheet
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
  PieChart, 
  Pie,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { cn } from '../../lib/utils';

// Types
type Section = 
  | 'erp_overview'
  | 'customers' 
  | 'suppliers' 
  | 'treasury' 
  | 'inventory_jard'
  | 'inventory_audit'
  | 'settlements' 
  | 'cogs' 
  | 'cost_of_sales' 
  | 'cost_of_purchases' 
  | 'invoices_settlements'
  | 'depreciation'
  | 'inventory_valuation'
  | 'bad_debts'
  | 'scrap'
  | 'bank_reconciliation'
  | 'bank_accounting'
  | 'financial_analysis'
  | 'international_standards';
type ViewMode = 'dashboard' | 'learning';

interface Transaction {
  id: string;
  date: string;
  type: 'debit' | 'credit';
  amount: number;
  description: string;
  reference?: string;
}

interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
  openingBalance: number;
  notes: string;
  createdAt: string;
  transactions: Transaction[];
}

interface Supplier {
  id: string;
  name: string;
  phone: string;
  address: string;
  openingBalance: number;
  notes: string;
  createdAt: string;
  transactions: Transaction[];
}

interface TreasuryTransaction {
  id: string;
  type: 'income' | 'expense' | 'transfer';
  description: string;
  amount: number;
  date: string;
  linkedId?: string; // Customer or Supplier ID
  linkedType?: 'customer' | 'supplier';
}

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  cost: number;
  price: number;
  minQty: number;
}

interface InventoryMovement {
  id: string;
  itemId: string;
  itemName: string;
  type: 'addition' | 'issue' | 'return';
  quantity: number;
  unitPrice: number;
  date: string;
  note: string;
}

interface Settlement {
  id: string;
  type: 'banking' | 'accrued_expense' | 'accrued_revenue' | 'other';
  amount: number;
  description: string;
  date: string;
}

export default function AccountingMisc() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const formatNumber = (num: number | undefined | null) => (num || 0).toLocaleString(isRtl ? 'ar-EG' : 'en-US');
  const location = useLocation();
  const navigate = useNavigate();
  const { sectionId } = useParams<{ sectionId: string }>();
  const contentRef = useRef<HTMLDivElement>(null);
  
  const [activeSection, setActiveSection] = useState<Section>('erp_overview');
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const params = new URLSearchParams(location.search);
      const mode = params.get('mode');
      const targetMode: ViewMode = mode === 'dashboard' ? 'dashboard' : 'learning';

      if (sectionId) {
        setActiveSection(sectionId as Section);
        setViewMode(targetMode);
      } else {
        const section = params.get('section');
        if (section) {
          setActiveSection(section as Section);
          setViewMode(targetMode);
        } else {
          setActiveSection('erp_overview');
          setViewMode('dashboard');
        }
      }
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [sectionId, location.search]);

  useEffect(() => {
    const title = (learningContent as any)[activeSection]?.title || t('accounting.accounting_knowledge_base');
    document.title = `${title} | ${t('common.brand_name', 'النخبة للمحاسبة')}`;
  }, [activeSection, t]);

  // Persistent State Logic
  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('erp_customers');
    return saved ? JSON.parse(saved) : [
      { 
        id: '1', name: 'شركة النور للتجارة', phone: '0123456789', address: 'القاهرة، مصر', openingBalance: 1000, 
        notes: 'عميل مميز', createdAt: '2024-01-01', transactions: [
          { id: 't1', date: '2024-03-01', type: 'credit', amount: 5000, description: 'فاتورة مبيعات #INV-001' }
        ] 
      },
    ];
  });

  const [suppliers, setSuppliers] = useState<Supplier[]>(() => {
    const saved = localStorage.getItem('erp_suppliers');
    return saved ? JSON.parse(saved) : [
      { 
        id: '1', name: 'شركة التوريدات العالمية', phone: '0987654321', address: 'دبي، الإمارات', openingBalance: 2000, 
        notes: 'مورد رئيسي', createdAt: '2024-01-01', transactions: [
          { id: 's1', date: '2024-03-02', type: 'credit', amount: 10000, description: 'فاتورة مشتريات #SUP-001' }
        ] 
      },
    ];
  });

  const [treasury, setTreasury] = useState<TreasuryTransaction[]>(() => {
    const saved = localStorage.getItem('erp_treasury');
    return saved ? JSON.parse(saved) : [
      { id: '1', type: 'income', description: 'رصيد افتتاحي', amount: 50000, date: '2024-01-01' },
    ];
  });

  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    const saved = localStorage.getItem('erp_inventory');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'لابتوب ديل G15', sku: 'LAP-001', category: 'إلكترونيات', quantity: 15, cost: 3500, price: 4200, minQty: 5 },
    ];
  });

  const [inventoryMovements, setInventoryMovements] = useState<InventoryMovement[]>(() => {
    const saved = localStorage.getItem('erp_inventory_movements');
    return saved ? JSON.parse(saved) : [];
  });

  const [settlements, setSettlements] = useState<Settlement[]>(() => {
    const saved = localStorage.getItem('erp_settlements');
    return saved ? JSON.parse(saved) : [];
  });

  const [inventoryJard, setInventoryJard] = useState<any[]>(() => {
    const saved = localStorage.getItem('erp_inventory_jard');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to LocalStorage on change
  useEffect(() => {
    localStorage.setItem('erp_customers', JSON.stringify(customers));
    localStorage.setItem('erp_suppliers', JSON.stringify(suppliers));
    localStorage.setItem('erp_treasury', JSON.stringify(treasury));
    localStorage.setItem('erp_inventory', JSON.stringify(inventory));
    localStorage.setItem('erp_inventory_movements', JSON.stringify(inventoryMovements));
    localStorage.setItem('erp_settlements', JSON.stringify(settlements));
    localStorage.setItem('erp_inventory_jard', JSON.stringify(inventoryJard));
  }, [customers, suppliers, treasury, inventory, inventoryMovements, settlements, inventoryJard]);

  // View States
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [reportMode, setReportMode] = useState<'individual' | 'summary' | null>(null);

  // Form State
  const [formData, setFormData] = useState<any>({});

  // Export & Print Handlers
  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = async () => {
    if (!contentRef.current) return;
    
    try {
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: window.getComputedStyle(document.body).backgroundColor
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? 'l' : 'p',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`Elijah_Accounting_${activeSection}.pdf`);
    } catch (error) {
      console.error('PDF Generation Error:', error);
    }
  };

  const handleSave = () => {
    const savedItems = JSON.parse(localStorage.getItem('saved_accounting_content') || '[]');
    const currentItem = {
      id: activeSection,
      title: (learningContent as any)[activeSection]?.title || activeSection,
      timestamp: new Date().toISOString(),
      path: location.pathname + location.search
    };
    
    const exists = savedItems.find((item: any) => item.id === activeSection);
    if (!exists) {
      localStorage.setItem('saved_accounting_content', JSON.stringify([...savedItems, currentItem]));
    }
    
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  // Educational Content Data
  const learningContent = {
    customers: {
      title: 'محاسبة العملاء (Accounts Receivable)',
      definition: 'تمثل المبالغ المستحقة للمنشأة طرف الغير (العملاء) نتيجة تقديم خدمات أو بيع بضائع بالآجل.',
      cycle: [
        'إصدار فاتورة المبيعات الآجلة.',
        'تسجيل القيد في يومية المبيعات.',
        'متابعة التحصيل الدوري وأعمار الديون.',
        'التحصيل النقدي أو بشيكات.',
        'إصدار إيصال استلام نقدية للعميل.'
      ],
      entries: [
        { desc: 'إثبات مبيعات آجلة لعميل', debit: 'حـ/ العملاء', credit: 'حـ/ المبيعات', note: 'زيادة أصل العملاء وزيادة إيراد المبيعات' },
        { desc: 'تحصيل مبلغ من عميل نقداً', debit: 'حـ/ الخزينة', credit: 'حـ/ العملاء', note: 'زيادة النقدية ونقص رصيد العميل' },
        { desc: 'إثبات ديون معدومة', debit: 'حـ/ مصروف ديون معدومة', credit: 'حـ/ العملاء', note: 'تحويل الرصيد غير المحصل لمصروف' }
      ],
      badDebts: 'تتم معالجة الديون التي استنفذت كافة وسائل تحصيلها كخسارة على المنشأة، ويتم تحميلها على قائمة الدخل كمصروف.',
      reports: ['كشف حساب عميل', 'تقرير أعمار الديون', 'ملخص مبيعات العملاء'],
      case: 'باعت الشركة بضاعة لعميل بمبلغ 10,000 ريال بالآجل، سدد منها العميل 4,000 ريال نقداً بعد أسبوع. المطلوب إثبات قيد البيع وقيد التحصيل، وتوضيح رصيد هذا العميل في الدفاتر.'
    },
    suppliers: {
      title: 'محاسبة الموردين (Accounts Payable)',
      definition: 'الالتزامات المالية التي نشأت على المنشأة للموردين مقابل بضائع أو خدمات تم شراؤها بالآجل.',
      cycle: [
        'استلام بضاعة وفاتورة المورد.',
        'مراجعة الفاتورة مع أمر الشراء.',
        'تسجيل القيد في يومية المشتريات.',
        'اعتماد الدفع وجدولة السداد.',
        'إصدار سند صرف للمورد.'
      ],
      entries: [
        { desc: 'إثبات مشتريات آجلة من مورد', debit: 'حـ/ المشتريات / المخزون', credit: 'حـ/ الموردين', note: 'زيادة أصل المخزون وزيادة التزام الموردين' },
        { desc: 'سداد دفعة لمورد بشيك', debit: 'حـ/ الموردين', credit: 'حـ/ البنك', note: 'نقص التزام الموردين ونقص رصيد البنك' },
        { desc: 'إرجاع بضاعة لمورد', debit: 'حـ/ الموردين', credit: 'حـ/ مردودات المشتريات', note: 'نقص التزام المورد ونقص للمشتريات' }
      ],
      aging: 'يعد تحليل أعمار الموردين أداة ضرورية لإدارة السيولة وتجنب غرامات التأخير والحفاظ على علاقات طيبة مع الموردين.',
      reports: ['كشف حساب مورد', 'استحقاقات الموردين', 'إجمالي مشتريات الموردين'],
      case: 'اشترت الشركة أثاثاً مكتبياً بموجب فاتورة مورد بمبلغ 25,000 ريال، تم سداد دفعة مقدمة قدرها 5,000 ريال. المطلوب إثبات الفاتورة والسداد وتوضيح الالتزام المتبقي.'
    },
    treasury: {
      title: 'إدارة الخزينة (Cash Management)',
      definition: 'الرقابة والإشراف على كافة الحركات النقدية (قبض وصرف) والتحقق من سلامة الأرصدة النقدية يومياً.',
      cycle: [
        'استلام نقدية وإصدار سند قبض.',
        'صرف مبالغ بموجب سندات صرف معتمدة.',
        'جرد الخزينة اليومي والمطابقة.',
        'توريد الفائض للبنك أو سحب سيولة.',
        'صرف العهد والمصروفات النثرية.'
      ],
      entries: [
        { desc: 'سحب مبلغ من البنك للخزينة', debit: 'حـ/ الخزينة', credit: 'حـ/ البنك', note: 'تحويل من أصل لأصل' },
        { desc: 'سداد مصروفات كهرباء نقداً', debit: 'حـ/ مصروفات عمومية', credit: 'حـ/ الخزينة', note: 'إثبات مصروف ونقص نقدية' },
        { desc: 'صرف عهدة لموظف', debit: 'حـ/ ذمم موظفين (عهدة)', credit: 'حـ/ الخزينة', note: 'إثبات مديونية على الموظف' }
      ],
      pettyCash: 'يتم تخصيص مبلغ ثابت (صندوق نثريات) للمصروفات الصغيرة المتكررة ويتم استعاضته دورياً بموجب مستندات الصرف.',
      reports: ['يومية الخزينة', 'بيان سندات الصرف والقبض', 'تقرير عجز وزيادة الخزينة'],
      case: 'قامت الخزينة بسحب ملبغ 50,000 ريال من البنك لتغذية الصندوق، وفي نهاية اليوم تم جرد الخزينة ووجد مبلغ 49,950 ريال. المطلوب إثبات سحب المبلغ وإثبات تسوية العجز المكتشف.'
    },
    settlements: {
      title: 'التسويات المحاسبية (Accounting Adjustments)',
      definition: 'إجراءات تهدف لإثبات العمليات المالية التي تخص الفترة المحاسبية بما يحقق مبدأ الاستحقاق والمقابلة.',
      types: [
        'المصروفات المستحقة (Accrued Expenses)',
        'المصروفات المقدمة (Prepaid Expenses)',
        'الإيرادات المستحقة (Accrued Incomes)',
        'الإيرادات المقدمة (Unearned Incomes)',
        'التسويات البنكية (Bank Reconciliations)'
      ],
      entries: [
        { desc: 'إثبات رواتب مستحقة بنهاية الشهر', debit: 'حـ/ مصاريف الرواتب', credit: 'حـ/ رواتب مستحقة (التزام)', note: 'تحميل الفترة بمصروفها' },
        { desc: 'استهلاك مصروف مقدم (إيجار)', debit: 'حـ/ مصروف الإيجار', credit: 'حـ/ إيجار مقدم (أصل)', note: 'تخفيض الأصل لصالح المصروف' },
        { desc: 'إثبات إيراد خدمات مستحق', debit: 'حـ/ إيرادات مستحقة', credit: 'حـ/ إيراد الخدمات', note: 'إثبات حق المنشأة رغم عدم القبض' }
      ],
      bankRec: 'يتم إعداد مذكرة تسوية البنك شهرياً لمطابقة رصيد البنك في الدفاتر مع رصيد كشف الحساب البنكي، ومعالجة فروق (شيكات بالطريق / عمولات بنكية).',
      reports: ['مذكرة تسوية البنك', 'قيد التسويات الجردية', 'بيان الأصول المستهلكة'],
      case: 'بلغت رواتب شهر ديسمبر 100,000 ريال سيتم صرفها في 5 يناير القادم. المطلوب إجراء قيد التسوية لإقفال حسابات السنة المالية وتطبيق مبدأ الاستحقاق لضمان دقة الأرباح.'
    },
    cogs: {
      title: 'تكلفة البضاعة المباعة (COGS)',
      definition: 'هي التكاليف المباشرة المرتبطة بإنتاج البضائع التي تبيعها الشركة، وتشمل تكلفة المواد والعمالة المباشرة.',
      cycle: [
        'تحديد مخزون أول الفترة.',
        'إضافة صافي المشتريات خلال الفترة.',
        'إضافة مصروفات الشراء (نقل، جمارك).',
        'طرح مخزون آخر الفترة.',
        'احتساب تكلفة البضاعة المباعة النهائية.'
      ],
      entries: [
        { desc: 'إثبات مشتريات بضاعة', debit: 'حـ/ المشتريات', credit: 'حـ/ الموردين / النقدية', note: 'زيادة تكلفة المشتريات' },
        { desc: 'إقفال مخزون أول المدة', debit: 'حـ/ المتاجرة / ملخص الدخل', credit: 'حـ/ مخزون أول المدة', note: 'ترحيل المخزون لقائمة الدخل' },
        { desc: 'إثبات مخزون آخر المدة', debit: 'حـ/ مخزون آخر المدة', credit: 'حـ/ المتاجرة / ملخص الدخل', note: 'إثبات قيمة البضاعة المتبقية كأصل' }
      ],
      badDebts: 'المعادلة الأساسية: (مخزون أول المدة + صافي المشتريات) - مخزون آخر المدة = تكلفة البضاعة المباعة.',
      reports: ['قائمة تكلفة المبيعات', 'تقرير تقييم المخزون', 'ميزان المراجعة'],
      case: 'بدأت شركة مخزونها بـ 50,000 ريال، واشترت بضاعة بـ 200,000 ريال، وبلغ مخزون آخر المدة 30,000 ريال. احسب تكلفة البضاعة المباعة ووضح تأثيرها على الربح إذا كانت المبيعات 400,000 ريال.'
    },
    cost_of_sales: {
      title: 'تكلفة المبيعات (Cost of Sales)',
      definition: 'مفهوم أشمل من COGS، حيث يضم التكاليف المباشرة للأنشطة الخدمية أو الإنتاجية المتكاملة (عمالة، مواد، طاقة).',
      cycle: [
        'حصر التكاليف الصناعية المباشرة.',
        'تحديد تكاليف العمالة المباشرة.',
        'تحميل التكاليف غير المباشرة المخصصة.',
        'ربط التكاليف بالوحدات المباعة فعلياً.',
        'مقارنة التكلفة بالإيرادات المحققة.'
      ],
      entries: [
        { desc: 'تحميل العمالة المباشرة', debit: 'حـ/ تكلفة المبيعات', credit: 'حـ/ الأجور المستحقة', note: 'إثبات تكلفة العمل المباشر' },
        { desc: 'إغلاق تكلفة المواد المستخدمة', debit: 'حـ/ تكلفة المبيعات', credit: 'حـ/ المخزون / المواد الخام', note: 'نقص المخزون مقابل تكلفة البيع' },
        { desc: 'تحميل مصاريف مباشرة (شحن للعملاء)', debit: 'حـ/ تكلفة المبيعات', credit: 'حـ/ النقدية', note: 'إثبات مصروفات مرتبطة بعملية البيع' }
      ],
      aging: 'في الشركات الخدمية، تكلفة المبيعات هي الأجور والوقت المستغرق لتقديم الخدمة، بينما في التجارية هي قيمة البضاعة المشتراة.',
      reports: ['تحليل هوامش الربح', 'تقرير تكاليف التشغيل', 'قائمة الدخل التفصيلية'],
      case: 'مصنع ينتج وحدات بتكلفة مواد 20 ريال وعمالة 10 ريال وتكاليف عامة 5 ريال. إذا بيعت 1,000 وحدة بسعر 60 ريال للواحدة، احسب تكلفة المبيعات وصافي ربح العملية.'
    },
    cost_of_purchases: {
      title: 'تكلفة المشتريات (Cost of Purchases)',
      definition: 'إجمالي المبالغ والاعباء المالية التي تتحملها المنشأة حتى تصل البضاعة المشتراة إلى مخازنها وتصبح جاهزة للبيع.',
      calculationMethod: 'يتم احتسابها من خلال جمع رصيد مخزون أول المدة مع صافي المشتريات والمصروفات المباشرة، ثم طرح مخزون آخر المدة.',
      equation: 'مخزون أول المدة + صافي المشتريات + المصروفات المباشرة - مخزون آخر المدة = تكلفة المشتريات',
      practicalExample: 'بفرض أن مخزون أول المدة 10,000 ج، المشتريات 50,000 ج، مصروفات النقل 2,000 ج، ومخزون آخر المدة 5,000 ج. فإن تكلفة المشتريات = 10,000 + 50,000 + 2,000 - 5,000 = 57,000 ج.',
      cycle: [
        'قيمة الفاتورة الأساسية للمورد.',
        'إضافة تكاليف الشحن والنقل.',
        'إضافة الرسوم الجمركية والضرائب غير المستردة.',
        'طرح الخصومات المكتسبة والمسموح بها.',
        'طرح مردودات المشتريات.'
      ],
      entries: [
        { desc: 'إثبات مصروف نقل مشتريات', debit: 'حـ/ مصاريف نقل مشتريات', credit: 'حـ/ الخزينة / الدائنون', note: 'زيادة تكلفة الحصول على البضاعة' },
        { desc: 'الحصول على خصم مكتسب', debit: 'حـ/ الموردين', credit: 'حـ/ الخصم المكتسب', note: 'تخفيض الالتزام وتحقيق إيراد عرضي' },
        { desc: 'إثبات سداد رسوم جمركية', debit: 'حـ/ رسوم جمركية / المشتريات', credit: 'حـ/ النقدية', note: 'تحميل البضاعة بتكاليف دخولها' }
      ],
      pettyCash: 'صافي المشتريات = (إجمالي المشتريات + مصاريف الشراء) - (مردودات المشتريات + الخصم المكتسب).',
      reports: ['تتبع تكاليف الاستيراد', 'سجل فواتير المشتريات', 'ملخص الأعباء الجمركية'],
      case: 'استوردت شركة بضاعة بمبلغ 100,000 ريال، ودفعت 5,000 ريال شحن و10,000 ريال جمارك، وحصلت على خصم 2,000 ريال. ما هي التكلفة النهائية للمشتريات التي ستدخل المخزن؟'
    },
    depreciation: {
      title: 'طرق الإهلاك (Depreciation Methods)',
      definition: 'تطبيقات محاسبية لتوزيع تكلفة الأصول الثابتة على مدار عمرها الإنتاجي المتوقع.',
      cycle: ['تحديد تكلفة الأصل', 'تقدير العمر الإنتاجي', 'تحديد قيمة الخردة', 'اختيار طريقة الإهلاك', 'تسجيل قيد الاستهلاك السنوي'],
      entries: [
        { desc: 'إثبات مصروف الإهلاك السنوي', debit: 'حـ/ مصروف الإهلاك', credit: 'حـ/ مجمع الإهلاك', note: 'تحميل الفترة بالمصروف وتخفيض قيمة الأصل دفترياً' }
      ],
      aging: 'القيمة الدفترية = تكلفة الأصل - مجمع الإهلاك.',
      case: 'آلة تكلفتها 100,000 ريال وعمرها 5 سنوات وقيمة الخردة 10,000 ريال. احسب الإهلاك السنوي بطريقة القسط الثابت.'
    },
    inventory_valuation: {
      title: 'طرق تقييم المخزون (Inventory Valuation)',
      definition: 'القواعد المستخدمة لتحديد تكلفة البضاعة المباعة وقيمة المخزون المتبقي بنهاية الفترة.',
      cycle: ['وارد أولاً صادر أولاً (FIFO)', 'المتوسط المرجح (W. Average)', 'التمييز المحدد'],
      entries: [
        { desc: 'إثبات مخزون آخر المدة', debit: 'حـ/ المخزون (أصل)', credit: 'حـ/ ملخص الدخل', note: 'إثبات البضاعة المتبقية بسعر التكلفة أو السوق أيهما أقل' }
      ],
      pettyCash: 'تؤثر طريقة التقييم مباشرة على صافي الربح وقيمة الضرائب.',
      case: 'في ظل ارتفاع الأسعار، أي طريقة تعطي صافي ربح أعلى؟ (FIFO) أم المتوسط المرجح؟ وضح السبب.'
    },
    bad_debts: {
      title: 'الديون المعدومة (Bad Debts)',
      definition: 'الديون التي تأكد عدم إمكانية تحصيلها من العملاء ويتم شطبها من الدفاتر.',
      cycle: ['تقييم أرصدة العملاء', 'تكوين مخصص ديون مشكوك فيها', 'اتخاذ إجراءات قانونية', 'صدور قرار الشطب'],
      entries: [
        { desc: 'إعدام دين لعميل متعثر', debit: 'حـ/ مصروف ديون معدومة', credit: 'حـ/ العملاء', note: 'تحويل الحساب لمصروف نهائي' }
      ],
      aging: 'شطب الدين لا يعني التنازل عنه قانونياً بل معالجته محاسبياً كخسارة.',
      case: 'عميل مديونيته 5,000 ريال أُعلن إفلاسه رسمياً. كيف تعالج هذا الرصيد محاسبياً؟'
    },
    scrap: {
      title: 'المخلفات والخردة (Scrap)',
      definition: 'المواد المتبقية من العملية الإنتاجية أو الأصول المتهالكة التي لها قيمة بيعية ضئيلة.',
      cycle: ['حصر المخلفات', 'تصنيف الخردة', 'عملية البيع', 'تحصيل القيمة'],
      entries: [
        { desc: 'بيع مخلفات إنتاج نقدياً', debit: 'حـ/ الخزينة', credit: 'حـ/ إيرادات أخرى (خردة)', note: 'إثبات دخل إضافي من بيع المخلفات' }
      ],
      pettyCash: 'بيع الخردة يساهم في تقليل تكلفة الإنتاج الكلية.',
      case: 'باعت ورشة نجارة "نشارة خشب" بمبلغ 200 ريال. سجل القيد المحاسبي المناسب.'
    },
    bank_reconciliation: {
      title: 'مذكرة تسوية البنك (Bank Reconciliation)',
      definition: 'بيان يفسر الاختلاف بين رصيد البنك في دفاتر المنشأة والرصيد الوارد في كشف حساب البنك.',
      practicalExample: 'بفرض رصيد الدفاتر 10,000 ج ورصيد كشف الحساب 12,500 ج. هناك شيكات لم تقدم للصرف بـ 3,000 ج وعمولات بنكية بـ 500 ج. الرصيد المعدل = 12,500 - 3,000 = 9,500 ج في الكشف، و 10,000 - 500 = 9,500 ج في الدفاتر.',
      reasonsForDocs: ['شيكات محررة لم تقدم للصرف', 'إيداعات بالطريق لم تظهر بالكشف', 'عمولات ومصاريف بنكية لم تسجل بالدفاتر', 'أخطاء محاسبية في التسجيل'],
      components: ['رصيد البنك بالدفاتر', 'رصيد البنك بكشف الحساب', 'الإضافات والخصومات لكل رصيد', 'الرصيد المطابق النهائي'],
      cycle: ['مطابقة الإيداعات', 'رصد الشيكات التي لم تقدم للصرف', 'تسجيل العمولات البنكية', 'معالجة الأخطاء المحاسبية'],
      entries: [
        { desc: 'إثبات مصاريف بنكية مكتشفة', debit: 'حـ/ مصاريف بنكية', credit: 'حـ/ البنك', note: 'تعديل رصيد الدفاتر' }
      ],
      bankRec: 'يتم تعديل رصيد الدفاتر بالعمليات التي سجلها البنك ولم تسجلها المنشأة فقط.',
      case: 'رصيد الدفاتر 10,000 ورصيد الكشف 12,000 وهناك شيكات لم تقدم بـ 2,000. هل الرصيد متطابق؟ وضح ذلك.'
    },
    bank_accounting: {
      title: 'محاسبة البنوك (Bank Accounting)',
      definition: 'العمليات المحاسبة المتعلقة بالحسابات الجارية، الودائع، القروض، والاعتمادات المستندية.',
      cycle: ['فتح الاعتماد المستندي', 'سداد الهامش النقدي', 'استلام مستندات الشحن', 'تصفية الاعتماد'],
      entries: [
        { desc: 'فتح اعتماد مستندي لاستيراد بضاعة', debit: 'حـ/ اعتمادات مستندية', credit: 'حـ/ البنك', note: 'تجميد مبلغ لصالح المورد الخارجي' }
      ],
      aging: 'الاعتماد المستندي هو الضمان الأساسي في التجارة الدولية.',
      case: 'ما الفرق بين الاعتماد المستندي وخطاب الضمان من وجهة نظر محاسبية؟'
    },
    financial_analysis: {
      title: 'التحليل المالي (Financial Analysis)',
      definition: 'عملية تقييم القوائم المالية باستخدام النسب والمؤشرات لاستنتاج نقاط القوة والضعف والربحية والسيولة.',
      cycle: ['نسب السيولة', 'نسب الربحية', 'نسب كفاءة النشاط', 'نسب المديونية'],
      entries: [
        { desc: 'حساب نسبة التداول', debit: 'إجمالي الأصول المتداولة', credit: 'إجمالي الالتزامات المتداولة', note: 'المؤشر الأساسي لقدرة المنشأة على سداد التزاماتها قصيرة الأجل' }
      ],
      aging: 'نسبة التداول المثالية في معظم الأنشطة هي 2:1.',
      case: 'إذا كانت الأصول المتداولة 500,000 والالتزامات المتداولة 400,000. احسب نسبة التداول وعلق على النتيجة.'
    },
    inventory_jard: {
      title: 'جرد المخزن وتسوية الفروقات (Inventory Audit)',
      definition: 'هي عملية مطابقة كميات البضاعة الموجودة فعلياً في المستودعات مع الكميات المسجلة في الدفاتر، بهدف اكتشاف العجز أو الزيادة.',
      cycle: [
        'تحديد موعد الجرد (دوري أو مفاجئ).',
        'تجميد حركة المخزن (منع الصرف والإضافة).',
        'العد الفعلي للمواد وتسجيلها في قوائم الجرد.',
        'مقارنة الرصيد الفعلي بالرصيد الدفتري.',
        'إثبات فروق الجرد (زيادة أو عجز).'
      ],
      entries: [
        { desc: 'إثبات عجز طبيعي في المخزون', debit: 'حـ/ تكلفة البضاعة المباعة', credit: 'حـ/ المخزون', note: 'تحميل العجز المسموح به للتكلفة' },
        { desc: 'إثبات عجز غير طبيعي (سرقة/إهمال)', debit: 'حـ/ ذمم موظفين (أمين المخزن)', credit: 'حـ/ المخزون', note: 'تحميل المسؤول بقيمة الفقد' },
        { desc: 'إثبات زيادة في الجرد', debit: 'حـ/ المخزون', credit: 'حـ/ أرباح وخسائر (إيرادات متنوعة)', note: 'إثبات الزيادة كدخل عرضي' }
      ],
      pettyCash: 'يعد الجرد المستمر أفضل رقابياً من الجرد الدوري السنوي حيث يسهل تتبع الأخطاء فور وقوعها.',
      reports: ['قائمة فروق الجرد', 'محضر لجنة الجرد', 'تقرير حركة الصنف'],
      case: 'عند جرد مستودع قطع الغيار، وجد أن رصيد الدفاتر لـ "فلاتر زيت" هو 100 قطعة، بينما الرصيد الفعلي 95 قطعة. المطلوب إثبات قيد التسوية إذا كان العجز ضمن الحدود الطبيعية، وإذا كان نتيجة إهمال أمين المستودع.'
    },
    international_standards: {
      title: 'المعايير الدولية (IFRS)',
      definition: 'مجموعة من القواعد المحاسبية الموحدة عالمياً لضمان الشفافية والموثوقية في التقارير المالية.',
      cycle: ['معايير العرض (IAS 1)', 'معايير الأصول (IAS 16)', 'معايير الإيراد (IFRS 15)', 'معايير التأجير (IFRS 16)'],
      entries: [
        { desc: 'تطبيق معيار الإيراد الجديد', debit: 'تحقق السيطرة', credit: 'الوفاء بالالتزام', note: 'الاعتراف بالإيراد عند انتقال السيطرة للعميل' }
      ],
      aging: 'تهدف المعايير الدولية لتسهيل المقارنة بين الشركات في مختلف دول العالم.',
      case: 'لماذا تحولت معظم الدول لاستخدام IFRS بدلاً من المعايير المحلية؟'
    }
  };

  // Calculations
  const erpStats = useMemo(() => {
    let totalSales = 0;
    let customerReceivables = 0;
    customers.forEach(c => {
      totalSales += c.transactions.filter(t => t.type === 'credit').reduce((acc, t) => acc + t.amount, 0);
      const debit = c.transactions.filter(t => t.type === 'debit').reduce((acc, t) => acc + t.amount, 0);
      const credit = c.transactions.filter(t => t.type === 'credit').reduce((acc, t) => acc + t.amount, 0);
      customerReceivables += (c.openingBalance + credit - debit);
    });

    let totalPurchases = 0;
    let supplierPayables = 0;
    suppliers.forEach(s => {
      totalPurchases += s.transactions.filter(t => t.type === 'credit').reduce((acc, t) => acc + t.amount, 0);
      const debit = s.transactions.filter(t => t.type === 'debit').reduce((acc, t) => acc + t.amount, 0);
      const credit = s.transactions.filter(t => t.type === 'credit').reduce((acc, t) => acc + t.amount, 0);
      supplierPayables += (s.openingBalance + credit - debit);
    });

    const treasuryBalance = treasury.reduce((acc, t) => {
      if (t.type === 'income') return acc + t.amount;
      if (t.type === 'expense') return acc - t.amount;
      return acc; // transfer would be handled differently if multi-treasury, but here it's simplified
    }, 0);

    const inventoryValue = inventory.reduce((acc, i) => acc + (i.quantity * i.cost), 0);
    const estimatedCogs = inventoryMovements.filter(m => m.type === 'issue').reduce((acc, m) => acc + (m.quantity * m.unitPrice), 0);
    const grossProfit = totalSales - estimatedCogs;

    return {
      totalSales,
      totalPurchases,
      treasuryBalance,
      customerReceivables,
      supplierPayables,
      inventoryValue,
      grossProfit,
      estimatedCogs
    };
  }, [customers, suppliers, treasury, inventory, inventoryMovements]);

  const customerStats = useMemo(() => {
    const totalBalance = customers.reduce((acc, c) => {
      const debit = c.transactions.filter(t => t.type === 'debit').reduce((total, t) => total + t.amount, 0);
      const credit = c.transactions.filter(t => t.type === 'credit').reduce((total, t) => total + t.amount, 0);
      return acc + (c.openingBalance + credit - debit);
    }, 0);
    return { totalBalance, count: customers.length };
  }, [customers]);

  const supplierStats = useMemo(() => {
    const totalBalance = suppliers.reduce((acc, s) => {
      const debit = s.transactions.filter(t => t.type === 'debit').reduce((total, t) => total + t.amount, 0);
      const credit = s.transactions.filter(t => t.type === 'credit').reduce((total, t) => total + t.amount, 0);
      return acc + (s.openingBalance + credit - debit);
    }, 0);
    return { totalBalance, count: suppliers.length };
  }, [suppliers]);

  const treasuryStats = useMemo(() => {
    const income = treasury.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
    const expense = treasury.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
    return { income, expense, balance: income - expense };
  }, [treasury]);

  // Filters
  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.phone.includes(searchTerm) || 
    c.id.includes(searchTerm)
  );
  const filteredSuppliers = suppliers.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.phone.includes(searchTerm) || 
    s.id.includes(searchTerm)
  );
  const filteredTreasury = treasury.filter(t => {
    const matchesSearch = 
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
      t.id.includes(searchTerm);
    const matchesDate = (!startDate || t.date >= startDate) && (!endDate || t.date <= endDate);
    return matchesSearch && matchesDate;
  });
  const filteredSettlements = settlements.filter(s => {
    const matchesSearch = 
      s.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
      s.id.includes(searchTerm);
    const matchesDate = (!startDate || s.date >= startDate) && (!endDate || s.date <= endDate);
    return matchesSearch && matchesDate;
  });
  const filteredInventory = inventory.filter(i => 
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    i.sku.toLowerCase().includes(searchTerm.toLowerCase()) || 
    i.id.includes(searchTerm)
  );

  // CRUD Handlers
  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Math.random().toString(36).substr(2, 9);
    const date = formData.date || new Date().toISOString().split('T')[0];

    if (activeSection === 'customers') {
      if (editMode && selectedEntityId) {
        setCustomers(customers.map(c => c.id === selectedEntityId ? { ...c, ...formData } : c));
      } else if (formData.isNewEntity) {
        const newCustomer: Customer = {
          id,
          name: formData.name,
          phone: formData.phone || '',
          address: formData.address || '',
          openingBalance: Number(formData.openingBalance || 0),
          notes: formData.notes || '',
          createdAt: date,
          transactions: []
        };
        setCustomers([...customers, newCustomer]);
      } else if (formData.linkedId) {
        // Adding a transaction to existing customer
        setCustomers(customers.map(c => {
          if (c.id === formData.linkedId) {
            return {
              ...c,
              transactions: [...c.transactions, {
                id,
                date,
                type: Number(formData.debit) > 0 ? 'debit' : 'credit',
                amount: Number(formData.debit) > 0 ? Number(formData.debit) : Number(formData.credit),
                description: formData.invoiceNumber || 'حركة يدوية'
              }]
            };
          }
          return c;
        }));

        // Link with Treasury if it's a payment (debit)
        if (Number(formData.debit) > 0) {
          setTreasury([...treasury, {
            id: 'tr-' + id,
            type: 'income',
            description: `تحصيل من عميل: ${customers.find(c=>c.id===formData.linkedId)?.name}`,
            amount: Number(formData.debit),
            date,
            linkedId: formData.linkedId,
            linkedType: 'customer'
          }]);
        }

        // Link with Inventory if it's a sale (credit)
        if (Number(formData.credit) > 0 && formData.itemId) {
          const item = inventory.find(i => i.id === formData.itemId);
          if (item) {
            const qty = Number(formData.inventoryQty || 1);
            setInventory(inventory.map(i => i.id === item.id ? { ...i, quantity: i.quantity - qty } : i));
            setInventoryMovements([...inventoryMovements, {
              id: 'sal-' + id,
              itemId: item.id,
              itemName: item.name,
              type: 'issue',
              quantity: qty,
              unitPrice: item.cost,
              date,
              note: `مبيعات لعميل: ${customers.find(c=>c.id===formData.linkedId)?.name} (${formData.invoiceNumber || ''})`
            }]);
          }
        }
      }
    } else if (activeSection === 'suppliers') {
      if (editMode && selectedEntityId) {
        setSuppliers(suppliers.map(s => s.id === selectedEntityId ? { ...s, ...formData } : s));
      } else if (formData.isNewEntity) {
        const newSupplier: Supplier = {
          id,
          name: formData.name,
          phone: formData.phone || '',
          address: formData.address || '',
          openingBalance: Number(formData.openingBalance || 0),
          notes: formData.notes || '',
          createdAt: date,
          transactions: []
        };
        setSuppliers([...suppliers, newSupplier]);
      } else if (formData.linkedId) {
        // Adding a transaction to existing supplier
        setSuppliers(suppliers.map(s => {
          if (s.id === formData.linkedId) {
            return {
              ...s,
              transactions: [...s.transactions, {
                id,
                date,
                type: Number(formData.debit) > 0 ? 'debit' : 'credit',
                amount: Number(formData.debit) > 0 ? Number(formData.debit) : Number(formData.credit),
                description: formData.invoiceNumber || 'حركة يدوية'
              }]
            };
          }
          return s;
        }));

        // Link with Treasury if it's a payment (debit)
        if (Number(formData.debit) > 0) {
          setTreasury([...treasury, {
            id: 'tr-' + id,
            type: 'expense',
            description: `سداد لمورد: ${suppliers.find(s=>s.id===formData.linkedId)?.name}`,
            amount: Number(formData.debit),
            date,
            linkedId: formData.linkedId,
            linkedType: 'supplier'
          }]);
        }

        // Link with Inventory if it's a purchase (credit)
        if (Number(formData.credit) > 0 && formData.itemId) {
          const item = inventory.find(i => i.id === formData.itemId);
          if (item) {
            const qty = Number(formData.inventoryQty || 1);
            setInventory(inventory.map(i => i.id === item.id ? { ...i, quantity: i.quantity + qty } : i));
            setInventoryMovements([...inventoryMovements, {
              id: 'pur-' + id,
              itemId: item.id,
              itemName: item.name,
              type: 'addition',
              quantity: qty,
              unitPrice: item.cost,
              date,
              note: `مشتريات من مورد: ${suppliers.find(s=>s.id===formData.linkedId)?.name} (${formData.invoiceNumber || ''})`
            }]);
          }
        }
      }
    } else if (activeSection === 'treasury') {
      const amount = Number(formData.amount || 0);
      const newTransaction: TreasuryTransaction = {
        id,
        type: formData.type as any,
        description: formData.description,
        amount,
        date,
        linkedId: formData.linkedId,
        linkedType: formData.linkedType
      };
      setTreasury([...treasury, newTransaction]);

      // Handle Linking
      if (formData.linkedId) {
        if (formData.linkedType === 'customer') {
          setCustomers(customers.map(c => {
            if (c.id === formData.linkedId) {
              return {
                ...c,
                transactions: [...c.transactions, {
                  id: 'link-' + id,
                  date,
                  type: formData.type === 'income' ? 'debit' : 'credit', // Income from customer means they pay us (debit their account)
                  amount,
                  description: `تحصيل نقدية: ${formData.description}`
                }]
              };
            }
            return c;
          }));
        } else if (formData.linkedType === 'supplier') {
          setSuppliers(suppliers.map(s => {
            if (s.id === formData.linkedId) {
              return {
                ...s,
                transactions: [...s.transactions, {
                  id: 'link-' + id,
                  date,
                  type: formData.type === 'expense' ? 'debit' : 'credit', // Paying supplier (debit their account)
                  amount,
                  description: `سداد نقدية: ${formData.description}`
                }]
              };
            }
            return s;
          }));
        }
      }
    } else if (activeSection === 'inventory_jard') {
      if (formData.jardType) {
        // This is a JARD AUDIT record
        const item = inventory.find(i => i.id === formData.itemId);
        if (!item) return;
        const bookQty = item.quantity;
        const physicalQty = Number(formData.physicalQty);
        const diff = physicalQty - bookQty;
        
        const jardRecord = {
          id,
          itemId: item.id,
          itemName: item.name,
          bookQty,
          physicalQty,
          diff,
          date,
          note: formData.note || ''
        };
        setInventoryJard([...inventoryJard, jardRecord]);

        // Auto-correct inventory if requested
        if (formData.autoCorrect) {
          setInventory(inventory.map(i => i.id === item.id ? { ...i, quantity: physicalQty } : i));
          setInventoryMovements([...inventoryMovements, {
            id: 'adj-' + id,
            itemId: item.id,
            itemName: item.name,
            type: diff > 0 ? 'addition' : 'issue',
            quantity: Math.abs(diff),
            unitPrice: item.cost,
            date,
            note: 'تسوية الجرد: ' + (formData.note || '')
          }]);
        }
      } else {
        // This is a REGULAR movement
        const item = inventory.find(i => i.id === formData.itemId);
        if (!item) return;

        const qty = Number(formData.quantity);
        const unitPrice = Number(formData.unitPrice || item.cost);
        
        const movement: InventoryMovement = {
          id,
          itemId: formData.itemId,
          itemName: item.name,
          type: formData.movementType as any,
          quantity: qty,
          unitPrice,
          date,
          note: formData.note || ''
        };
        setInventoryMovements([...inventoryMovements, movement]);

        // Update Inventory Qty
        setInventory(inventory.map(i => {
          if (i.id === formData.itemId) {
            const newQty = formData.movementType === 'addition' ? i.quantity + qty : 
                           formData.movementType === 'issue' ? i.quantity - qty : 
                           i.quantity + qty; // return is addition
            return { ...i, quantity: newQty };
          }
          return i;
        }));
      }
    } else if (activeSection === 'settlements') {
      const settlement: Settlement = {
        id,
        type: formData.settlementType as any,
        amount: Number(formData.amount),
        description: formData.description,
        date
      };
      setSettlements([...settlements, settlement]);
    }

    setShowModal(false);
    setFormData({});
    setEditMode(false);
    setSelectedEntityId(null);
  };

  const handleDelete = (id: string, section: Section) => {
    if (!window.confirm('هل أنت متأكد من حذف هذا السجل؟')) return;

    if (section === 'customers') setCustomers(customers.filter(c => c.id !== id));
    if (section === 'suppliers') setSuppliers(suppliers.filter(s => s.id !== id));
    if (section === 'treasury') setTreasury(treasury.filter(t => t.id !== id));
    if (section === 'inventory_jard') {
      const movement = inventoryMovements.find(m => m.id === id);
      if (movement) {
        setInventory(inventory.map(i => {
          if (i.id === movement.itemId) {
            const adjustment = (movement.type === 'addition' || movement.type === 'return') ? -movement.quantity : movement.quantity;
            return { ...i, quantity: i.quantity + adjustment };
          }
          return i;
        }));
      }
      setInventoryMovements(inventoryMovements.filter(m => m.id !== id));
    }
    if (section === 'inventory_audit') {
      setInventoryJard(inventoryJard.filter(j => j.id !== id));
    }
    if (section === 'settlements') setSettlements(settlements.filter(s => s.id !== id));
  };

  const handleExportCSV = () => {
    let dataToExport: any[] = [];
    let filename = `report_${activeSection}_${new Date().toISOString().split('T')[0]}.csv`;

    if (activeSection === 'customers') dataToExport = customers;
    else if (activeSection === 'suppliers') dataToExport = suppliers;
    else if (activeSection === 'treasury') dataToExport = treasury;
    else if (activeSection === 'inventory_jard') dataToExport = inventory;
    else if (activeSection === 'settlements') dataToExport = settlements;

    if (dataToExport.length === 0) {
      alert('لا توجد بيانات لتصديرها');
      return;
    }

    const headers = Object.keys(dataToExport[0]).filter(k => k !== 'transactions').join(',');
    const rows = dataToExport.map(item => {
      return Object.entries(item)
        .filter(([k]) => k !== 'transactions')
        .map(([, v]) => `"${v}"`)
        .join(',');
    }).join('\n');

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + headers + "\n" + rows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24" dir="rtl">
      {/* Modern Header Section */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-900 selection:bg-blue-500/30">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-indigo-600/10 -z-0" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        
        <div className="container mx-auto px-6 relative z-10 text-center space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 font-black text-[11px] uppercase tracking-widest backdrop-blur-md"
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            {t('common.brand_name')} | {t('accounting.knowledge_base_desc', 'النظام المحاسبي المتكامل')}
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight">
            بنك <span className="text-blue-500 italic font-serif tracking-normal">المعلومات المحاسبي</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
            نظام متكامل لإدارة العمليات المالية والتقارير المحاسبية بدقة احترافية وسهولة فائقة.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-6 -mt-12 relative z-20">
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-6 mb-12">
          {/* Section Navigation Tabs */}
          <div className="flex-grow glass rounded-[2.5rem] p-2.5 shadow-premium border border-slate-200/50 flex flex-wrap gap-1.5 max-h-[400px] overflow-y-auto modern-scrollbar">
            {[
              { id: 'erp_overview', label: 'لوحة القيادة', icon: <LayoutDashboard className="w-5 h-5" /> },
              { id: 'customers', label: 'العملاء', icon: <Users className="w-5 h-5" /> },
              { id: 'suppliers', label: 'الموردين', icon: <Truck className="w-5 h-5" /> },
              { id: 'treasury', label: 'الخزينة', icon: <Wallet className="w-5 h-5" /> },
              { id: 'inventory_jard', label: 'المخزن والجرد', icon: <Box className="w-5 h-5" /> },
              { id: 'settlements', label: 'التسويات', icon: <RotateCcw className="w-5 h-5" /> },
              { id: 'cogs', label: 'تكلفة البضاعة', icon: <TrendingUp className="w-5 h-5" /> },
              { id: 'cost_of_sales', label: 'تكلفة المبيعات', icon: <AlertCircle className="w-5 h-5" /> },
              { id: 'cost_of_purchases', label: 'تكلفة المشتريات', icon: <Plus className="w-5 h-5" /> },
              { id: 'depreciation', label: 'طرق الإهلاك', icon: <TrendingUp className="w-5 h-5" /> },
              { id: 'inventory_valuation', label: 'تقييم المخزون', icon: <BarChart3 className="w-5 h-5" /> },
              { id: 'bad_debts', label: 'الديون المعدومة', icon: <AlertCircle className="w-5 h-5" /> },
              { id: 'scrap', label: 'الخردة والمخلفات', icon: <RefreshCcw className="w-5 h-5" /> },
              { id: 'bank_reconciliation', label: 'تسوية البنك', icon: <Scale className="w-5 h-5" /> },
              { id: 'bank_accounting', label: 'محاسبة البنوك', icon: <Briefcase className="w-5 h-5" /> },
              { id: 'financial_analysis', label: 'التحليل المالي', icon: <BarChart3 className="w-5 h-5" /> },
              { id: 'international_standards', label: 'المعايير الدولية', icon: <Globe className="w-5 h-5" /> },
              { id: 'invoices_settlements', label: 'نظرة شمولية', icon: <History className="w-5 h-5" /> },
            ].map(section => (
              <button
                key={section.id}
                onClick={() => {
                  if (section.id === 'erp_overview') {
                    navigate('/accounting-misc');
                  } else {
                    navigate(`/accounting/${section.id}`);
                  }
                }}
                className={cn(
                  "flex items-center gap-3 px-6 py-4 rounded-[1.5rem] font-black transition-all text-sm",
                  activeSection === section.id 
                    ? "bg-slate-900 text-white shadow-xl shadow-slate-900/10 scale-105" 
                    : "text-slate-500 hover:bg-white hover:text-blue-600 hover:shadow-lg"
                )}
              >
                <div className={cn(
                  "p-2 rounded-xl transition-colors",
                  activeSection === section.id ? "bg-blue-600 text-white" : "bg-slate-100/50 text-slate-400"
                )}>
                  {section.icon}
                </div>
                {section.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            {/* Mode Switcher */}
            <div className="bg-white p-3 rounded-[2.5rem] shadow-premium border border-slate-100/50 flex gap-2 print:hidden backdrop-blur-md">
              <button
                onClick={() => setViewMode('learning')}
                className={cn(
                  "flex items-center gap-3 px-8 py-4 rounded-[1.5rem] font-black text-sm transition-all whitespace-nowrap",
                  viewMode === 'learning' ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" : "text-slate-500 hover:bg-slate-50"
                )}
              >
                <BookOpen className="w-5 h-5" />
                المرجع التعليمي
              </button>
              <button
                onClick={() => setViewMode('dashboard')}
                className={cn(
                  "flex items-center gap-3 px-8 py-4 rounded-[1.5rem] font-black text-sm transition-all whitespace-nowrap",
                  viewMode === 'dashboard' ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20" : "text-slate-500 hover:bg-slate-50"
                )}
              >
                <LayoutDashboard className="w-5 h-5" />
                اللوحة العملية
              </button>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-end gap-3 print:hidden">
              <button 
                onClick={handleSave} 
                className={cn(
                  "flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-black transition-all text-[11px] uppercase tracking-wider",
                  isSaved ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm"
                )}
              >
                {isSaved ? <Check className="w-5 h-5" /> : <Save className="w-5 h-5" />}
                {isSaved ? t('common.content_saved_success') : t('common.save')}
              </button>
              <button onClick={handlePrint} className="flex items-center gap-2.5 px-6 py-3.5 bg-white border border-slate-200 rounded-2xl font-black text-slate-600 hover:bg-slate-50 transition-all text-[11px] uppercase tracking-wider shadow-sm">
                <Printer className="w-5 h-5" />
                طباعة المرجع
              </button>
              <button onClick={handleExportPDF} className="flex items-center gap-2.5 px-6 py-3.5 bg-slate-900 text-white rounded-2xl font-black hover:bg-black transition-all text-[11px] uppercase tracking-wider shadow-xl shadow-slate-900/10">
                <FileDown className="w-5 h-5" />
                تحميل PDF
              </button>
              <button onClick={handleExportCSV} className="flex items-center gap-2.5 px-6 py-3.5 bg-emerald-700 text-white rounded-2xl font-black hover:bg-emerald-800 transition-all text-[11px] uppercase tracking-wider shadow-xl shadow-emerald-900/10">
                <FileSpreadsheet className="w-5 h-5" />
                تصدير Excel
              </button>
            </div>
          </div>
        </div>

        <div ref={contentRef} className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {isLoading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-10 bg-white/60 backdrop-blur-[2px] flex items-center justify-center rounded-3xl"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  <p className="text-blue-600 font-black text-sm">جاري التجهيز...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dashboard View */}
        {viewMode === 'dashboard' && (
          <div className="space-y-8">
            {activeSection === 'erp_overview' && (
              <div className="space-y-8">
                {/* ERP KPI Cards - High End Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'إجمالي المبيعات', value: erpStats.totalSales, icon: <TrendingUp className="w-6 h-6" />, color: 'blue', trend: '+12.5%' },
                    { label: 'رصيد الخزينة', value: erpStats.treasuryBalance, icon: <Wallet className="w-6 h-6" />, color: 'emerald', trend: '+5.1%' },
                    { label: 'أرصدة العملاء', value: erpStats.customerReceivables, icon: <Users className="w-6 h-6" />, color: 'cyan', trend: '+0.8%' },
                    { label: 'مجمل الربح', value: erpStats.grossProfit, icon: <BarChart3 className="w-6 h-6" />, color: 'rose', trend: '+15.2%' },
                  ].map((kpi, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="premium-card p-6 bg-white relative overflow-hidden group"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500",
                          kpi.color === 'blue' ? "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white" :
                          kpi.color === 'emerald' ? "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white" :
                          kpi.color === 'cyan' ? "bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white" :
                          "bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white"
                        )}>
                          {kpi.icon}
                        </div>
                        <div className={cn(
                          "text-[10px] font-black px-2 py-1 rounded-lg",
                          kpi.trend.startsWith('+') ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                        )}>
                          {kpi.trend}
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{kpi.label}</p>
                        <h4 className="text-2xl font-black text-slate-900 tabular-nums">
                          {new Intl.NumberFormat('ar-SA').format(kpi.value)}
                          <span className="text-xs font-medium text-slate-400 mr-1">جم</span>
                        </h4>
                      </div>

                      {/* Decorator */}
                      <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-slate-50 rounded-full group-hover:scale-150 transition-transform duration-700 opacity-50" />
                    </motion.div>
                  ))}
                </div>

                {/* Secondary Stats Strip */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center gap-4">
                    <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">إجمالي المشتريات</p>
                      <p className="text-lg font-black text-slate-900">{formatNumber(erpStats.totalPurchases)}جم</p>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center gap-4">
                    <div className="p-3 bg-rose-50 text-rose-600 rounded-xl">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">مستحقات الموردين</p>
                      <p className="text-lg font-black text-slate-900">{formatNumber(erpStats.supplierPayables)}جم</p>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center gap-4">
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                      <Box className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">قيمة المخزون</p>
                      <p className="text-lg font-black text-slate-900">{formatNumber(erpStats.inventoryValue)}جم</p>
                    </div>
                  </div>
                  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center gap-4">
                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">نسبة هامش الربح</p>
                      <p className="text-lg font-black text-slate-900">{erpStats.totalSales > 0 ? ((erpStats.grossProfit / erpStats.totalSales) * 100).toFixed(1) : 0}%</p>
                    </div>
                  </div>
                </div>

                {/* Charts Section - Professional Appearance */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="premium-card p-8 bg-white h-[450px] flex flex-col">
                    <div className="flex justify-between items-center mb-8">
                      <div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">تحليل الإيرادات والمصاريف</h3>
                        <p className="text-sm text-slate-400 font-medium font-cairo">مقارنة شهرية للأداء المالي</p>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-xl">
                        <BarChart3 className="w-5 h-5 text-slate-400" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={[
                          { name: 'يناير', rev: 4000, exp: 2400 },
                          { name: 'فبراير', rev: 3000, exp: 1398 },
                          { name: 'مارس', rev: 2000, exp: 9800 },
                          { name: 'أبريل', rev: 2780, exp: 3908 },
                          { name: 'مايو', rev: 1890, exp: 4800 },
                          { name: 'يونيو', rev: 2390, exp: 3800 },
                        ]}>
                          <defs>
                            <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} dy={10} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} dx={-10} />
                          <Tooltip 
                            contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: 'var(--shadow-premium)', padding: '1rem' }}
                            itemStyle={{ fontWeight: 800 }}
                          />
                          <Area type="monotone" dataKey="rev" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" name="الإيرادات" />
                          <Area type="monotone" dataKey="exp" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorExp)" name="المصاريف" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="premium-card p-8 bg-white h-[450px] flex flex-col">
                    <div className="flex justify-between items-center mb-8">
                      <div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">توزيع الأرصدة</h3>
                        <p className="text-sm text-slate-400 font-medium">النسب المئوية لأهم مراكز التكلفة</p>
                      </div>
                      <div className="p-2 bg-slate-50 rounded-xl">
                        <PieChartIcon className="w-5 h-5 text-slate-400" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'الخزينة', value: erpStats.treasuryBalance },
                              { name: 'العملاء', value: erpStats.customerReceivables },
                              { name: 'المخزون', value: erpStats.inventoryValue },
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={80}
                            outerRadius={120}
                            paddingAngle={8}
                            dataKey="value"
                            stroke="none"
                          >
                            <Cell fill="#3b82f6" />
                            <Cell fill="#10b981" />
                            <Cell fill="#6366f1" />
                          </Pie>
                          <Tooltip 
                            contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: 'var(--shadow-premium)', padding: '1rem' }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-6 mt-4">
                       {[
                         { label: 'الخزينة', color: 'bg-blue-500' },
                         { label: 'العملاء', color: 'bg-emerald-500' },
                         { label: 'المخزون', color: 'bg-indigo-500' },
                       ].map((item, i) => (
                         <div key={i} className="flex items-center gap-2">
                           <div className={cn("w-3 h-3 rounded-full", item.color)} />
                           <span className="text-xs font-bold text-slate-600">{item.label}</span>
                         </div>
                       ))}
                    </div>
                  </div>
                </div>

                {/* Latest Records Linking Sections */}
                <div className="bg-slate-900 rounded-[3rem] p-12 overflow-hidden relative shadow-2xl transition-all duration-700 hover:shadow-blue-500/10 border border-white/5">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/5 blur-[100px] rounded-full pointer-events-none" />
                  
                  <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/20 rounded-xl">
                          <ShoppingBag className="w-5 h-5 text-blue-400" />
                        </div>
                        <h4 className="text-white font-black">تحصيلات العملاء</h4>
                      </div>
                      <div className="space-y-3">
                        {treasury.filter(t=>t.linkedType === 'customer').slice(-3).map((t, i) => (
                          <div key={i} className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                            <span className="text-slate-400 text-xs font-bold">{t.description}</span>
                            <span className="text-emerald-400 font-bold text-sm tabular-nums">{formatNumber(t.amount)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6">
                       <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-500/20 rounded-xl">
                          <Users className="w-5 h-5 text-emerald-400" />
                        </div>
                        <h4 className="text-white font-black">مدفوعات الموردين</h4>
                      </div>
                      <div className="space-y-3">
                        {treasury.filter(t=>t.linkedType === 'supplier').slice(-3).map((t, i) => (
                          <div key={i} className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                            <span className="text-slate-400 text-xs font-bold">{t.description}</span>
                            <span className="text-rose-400 font-bold text-sm tabular-nums">{formatNumber(t.amount)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6">
                       <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-500/20 rounded-xl">
                          <AlertCircle className="w-5 h-5 text-amber-400" />
                        </div>
                        <h4 className="text-white font-black">تنبيهات المخزون</h4>
                      </div>
                      <div className="space-y-3">
                        {inventory.filter(i => i.quantity <= i.minQty).slice(0, 3).map((item, i) => (
                          <div key={i} className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                            <div className="flex flex-col">
                              <span className="text-white text-xs font-black">{item.name}</span>
                              <span className="text-[10px] text-slate-500">رصيد: {item.quantity}</span>
                            </div>
                            <span className="bg-rose-500/20 text-rose-400 text-[10px] px-2 py-1 rounded-lg font-black uppercase">ناقص</span>
                          </div>
                        ))}
                        {inventory.filter(i => i.quantity <= i.minQty).length === 0 && (
                          <p className="text-slate-500 text-xs font-medium italic">المخزون تحت الرقابة</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'inventory_valuation' && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="premium-card p-12 bg-white flex flex-col md:flex-row justify-between items-center gap-8">
                   <div className="text-right">
                     <h3 className="text-3xl font-black text-slate-900 italic">تقرير تقييم المخزون</h3>
                     <p className="text-slate-400 font-black mt-2 tracking-widest text-[10px] uppercase opacity-60">Inventory Valuation Real-time Analysis</p>
                   </div>
                   <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-white/10 shadow-2xl min-w-[280px]">
                     <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest block mb-2">إجمالي قيمة المخزون الحالية</span>
                     <h4 className="text-4xl font-black text-white tabular-nums">{formatNumber(erpStats.inventoryValue)} <span className="text-sm opacity-40">جم</span></h4>
                   </div>
                </div>
                
                <div className="bg-white rounded-[3rem] border border-slate-100 shadow-premium overflow-hidden">
                   <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                      <h4 className="font-black text-slate-900 tracking-tight">قائمة تحليل الأصول المخزنية</h4>
                      <div className="flex gap-2">
                         <div className="w-3 h-3 rounded-full bg-emerald-500" />
                         <div className="w-3 h-3 rounded-full bg-emerald-300" />
                         <div className="w-3 h-3 rounded-full bg-emerald-100" />
                      </div>
                   </div>
                   <div className="overflow-x-auto">
                      <table className="w-full text-right">
                        <thead>
                          <tr className="bg-slate-50/30">
                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest pr-10">اسم الصنف</th>
                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">الكمية المتوفرة</th>
                            <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">تكلفة الوحدة</th>
                            <th className="px-8 py-5 text-[10px] font-black text-emerald-600 uppercase tracking-widest text-center">قيمة المخزون</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {filteredInventory.map((item, idx) => (
                            <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                              <td className="px-8 py-6">
                                <div className="flex items-center gap-4">
                                   <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-black text-xs text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                      {idx + 1}
                                   </div>
                                   <span className="font-black text-slate-900 group-hover:text-blue-600 transition-colors">{item.name}</span>
                                </div>
                              </td>
                              <td className="px-8 py-6 text-center tabular-nums font-bold text-slate-600">{formatNumber(item.quantity)}</td>
                              <td className="px-8 py-6 text-center tabular-nums font-bold text-slate-600">{formatNumber(item.cost)}</td>
                              <td className="px-8 py-6 text-center font-black text-emerald-600 tabular-nums bg-emerald-50/10">{formatNumber(item.quantity * item.cost)}</td>
                            </tr>
                          ))}
                          {filteredInventory.length === 0 && (
                            <tr><td colSpan={4} className="px-8 py-10 text-center text-slate-400 font-bold italic">لا توجد أصناف تطابق بحثك...</td></tr>
                          )}
                        </tbody>
                      </table>
                   </div>
                </div>
              </div>
            )}

            {reportMode && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-4">
                     <button onClick={() => { setReportMode(null); setSelectedEntityId(null); }} className="p-3 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-900 hover:text-white transition-all">
                       <X className="w-5 h-5" />
                     </button>
                     <div>
                       <h3 className="text-xl font-black text-slate-900">
                         {reportMode === 'individual' ? 'كشف حساب تفصيلي' : 'تقرير إجمالي النشاط'}
                       </h3>
                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">Detailed Financial Status Report</p>
                     </div>
                  </div>
                  <div className="flex gap-3">
                     <button onClick={handlePrint} className="px-6 py-3 bg-slate-50 text-slate-600 rounded-xl font-black text-xs flex items-center gap-2 hover:bg-slate-100 transition-all">
                       <Printer className="w-4 h-4" />
                       طباعة
                     </button>
                     <button onClick={handleExportPDF} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-xs flex items-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">
                       <FileDown className="w-4 h-4" />
                       تصدير PDF
                     </button>
                  </div>
                </div>

                {reportMode === 'individual' && selectedEntityId && (
                  <div className="space-y-8 pb-12">
                     {(() => {
                        const entity = (activeSection === 'customers' ? customers : suppliers).find(e => e.id === selectedEntityId);
                        if (!entity) return null;
                        const debit = entity.transactions.filter(t => t.type === 'debit').reduce((acc, t) => acc + t.amount, 0);
                        const credit = entity.transactions.filter(t => t.type === 'credit').reduce((acc, t) => acc + t.amount, 0);
                        const balance = entity.openingBalance + credit - debit;

                        return (
                          <div className="space-y-8">
                            {/* Header Info */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                               <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col gap-2">
                                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">معلومات الحساب</span>
                                  <h4 className="text-2xl font-black text-slate-900">{entity.name}</h4>
                                  <p className="text-xs text-slate-500 font-bold">{entity.phone} | {entity.address}</p>
                               </div>
                               <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col gap-2 items-center justify-center">
                                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">إجمالي الحركات</span>
                                  <h4 className="text-3xl font-black text-slate-900">{formatNumber(entity.transactions?.length)}</h4>
                               </div>
                               <div className={cn("p-8 rounded-[2.5rem] border shadow-xl flex flex-col gap-2 items-center justify-center", balance > 0 ? "bg-rose-600 border-rose-600 text-white" : "bg-emerald-600 border-emerald-600 text-white")}>
                                  <span className="text-[10px] font-black uppercase tracking-widest opacity-80">الرصيد المتبقي</span>
                                  <h4 className="text-4xl font-black tabular-nums">{formatNumber(balance)}جم</h4>
                               </div>
                            </div>

                            {/* Ledger Table */}
                            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-premium overflow-hidden">
                               <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                                  <h4 className="font-black text-slate-900">حركات كشف الحساب</h4>
                               </div>
                               <div className="overflow-x-auto">
                                  <table className="w-full text-right">
                                     <thead>
                                        <tr className="bg-slate-50/30">
                                           <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">التاريخ</th>
                                           <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">البيان / الملاحظات</th>
                                           <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">مدين (+)</th>
                                           <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">دائن (-)</th>
                                           <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">الرصيد التراكمي</th>
                                        </tr>
                                     </thead>
                                     <tbody className="divide-y divide-slate-50">
                                        <tr className="bg-slate-100/20 italic">
                                           <td className="px-8 py-4 text-xs text-slate-400 font-bold">{entity.createdAt}</td>
                                           <td className="px-8 py-4 text-xs text-slate-600 font-black">رصيد افتتاحي من النظام</td>
                                           <td className="px-8 py-4 text-center">-</td>
                                           <td className="px-8 py-4 text-center">-</td>
                                           <td className="px-8 py-4 text-center font-black tabular-nums text-slate-900">{formatNumber(entity.openingBalance)}</td>
                                        </tr>
                                        {(() => {
                                          let currentBalance = entity.openingBalance || 0;
                                          return (entity.transactions || []).map(t => {
                                             if (t.type === 'credit') currentBalance += (t.amount || 0);
                                             else currentBalance -= (t.amount || 0);
                                             return (
                                                <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                                                   <td className="px-8 py-5 text-xs text-slate-500 font-bold tabular-nums">{t.date}</td>
                                                   <td className="px-8 py-5 font-black text-slate-800 text-sm">{t.description}</td>
                                                   <td className="px-8 py-5 text-center text-rose-600 font-black tabular-nums text-sm">{t.type === 'credit' ? formatNumber(t.amount) : '-'}</td>
                                                   <td className="px-8 py-5 text-center text-emerald-600 font-black tabular-nums text-sm">{t.type === 'debit' ? formatNumber(t.amount) : '-'}</td>
                                                   <td className="px-8 py-5 text-center font-black tabular-nums text-slate-900 text-sm">{formatNumber(currentBalance)}</td>
                                                </tr>
                                             );
                                          });
                                        })()}
                                     </tbody>
                                  </table>
                               </div>
                            </div>
                          </div>
                        );
                     })()}
                  </div>
                )}

                {reportMode === 'summary' && (
                  <div className="space-y-12">
                     {/* Comparison Charts */}
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm h-[400px]">
                           <h4 className="text-xl font-black text-slate-900 mb-8">توزيع المديونيات</h4>
                           <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={(activeSection === 'customers' ? customers : suppliers).slice(0, 5).map(e => {
                                 const debit = e.transactions.filter(t => t.type === 'debit').reduce((acc, t) => acc + t.amount, 0);
                                 const credit = e.transactions.filter(t => t.type === 'credit').reduce((acc, t) => acc + t.amount, 0);
                                 return { name: e.name.substring(0, 8) + '...', balance: e.openingBalance + credit - debit };
                              })}>
                                 <XAxis dataKey="name" tick={{fontSize: 10, fontWeight: 700}} />
                                 <YAxis />
                                 <Tooltip contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' }} />
                                 <Bar dataKey="balance" fill={activeSection === 'customers' ? '#3b82f6' : '#10b981'} radius={[8, 8, 0, 0]} />
                              </BarChart>
                           </ResponsiveContainer>
                        </div>
                        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm h-[400px]">
                            <h4 className="text-xl font-black text-slate-900 mb-8">أعلى 5 {activeSection === 'customers' ? 'عملاء' : 'موردين'} حركة</h4>
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie 
                                  data={(activeSection === 'customers' ? customers : suppliers).slice(0, 5).map(e => ({ name: e.name, value: e.transactions.reduce((acc, t) => acc + t.amount, 0) }))}
                                  dataKey="value"
                                  innerRadius={60}
                                  outerRadius={100}
                                  paddingAngle={5}
                                >
                                  {(activeSection === 'customers' ? customers : suppliers).map((_entry, index) => (
                                    <Cell key={`cell-${index}`} fill={['#3b82f6', '#10b981', '#6366f1', '#f59e0b', '#ec4899'][index % 5]} />
                                  ))}
                                </Pie>
                                <Tooltip />
                              </PieChart>
                           </ResponsiveContainer>
                        </div>
                     </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeSection === 'treasury' && !reportMode && (
              <div className="space-y-8">
                 {/* Treasury Dashboard */}
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-emerald-600 p-8 rounded-[2.5rem] shadow-xl text-white overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full" />
                        <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-2">إجمالي الإيرادات</p>
                        <h3 className="text-3xl font-black tabular-nums">{formatNumber(treasuryStats.income)}جم</h3>
                        <ArrowUpRight className="absolute top-8 left-8 w-12 h-12 text-white/20 group-hover:text-white/40 group-hover:scale-125 transition-all" />
                    </div>
                    <div className="bg-rose-600 p-8 rounded-[2.5rem] shadow-xl text-white overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full" />
                        <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-2">إجمالي المصروفات</p>
                        <h3 className="text-3xl font-black tabular-nums">{formatNumber(treasuryStats.expense)}جم</h3>
                        <ArrowDownLeft className="absolute top-8 left-8 w-12 h-12 text-white/20 group-hover:text-white/40 group-hover:scale-125 transition-all" />
                    </div>
                    <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-xl text-white overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full" />
                        <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-2">الرصيد المتاح</p>
                        <h3 className="text-4xl font-black tabular-nums">{formatNumber(treasuryStats.balance)}جم</h3>
                        <Wallet className="absolute top-8 left-8 w-12 h-12 text-white/20 group-hover:text-white/40 group-hover:scale-125 transition-all" />
                    </div>
                 </div>

                 <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-premium overflow-hidden">
                    <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                       <h3 className="text-xl font-black text-slate-900">سجل حركة النقدية</h3>
                       <button onClick={() => setShowModal(true)} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-xs shadow-lg shadow-blue-50">إضافة حركة جديدة</button>
                    </div>
                    <div className="overflow-x-auto">
                       <table className="w-full text-right">
                          <thead>
                             <tr className="bg-slate-50/50">
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">التاريخ</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">نوع الحركة</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">البيان / الملاحظات</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">المبلغ</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">الإجراءات</th>
                             </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50">
                             {filteredTreasury.map(t => (
                                <tr key={t.id} className="hover:bg-slate-50 transition-colors group">
                                   <td className="px-8 py-6 font-bold text-slate-500 tabular-nums text-xs">{t.date}</td>
                                   <td className="px-8 py-6">
                                      <span className={cn("px-3 py-1 rounded-lg font-black text-[10px] uppercase", 
                                        t.type === 'income' ? "bg-emerald-50 text-emerald-600" :
                                        t.type === 'expense' ? "bg-rose-50 text-rose-600" : "bg-amber-50 text-amber-600")}>
                                        {t.type === 'income' ? 'إيداع' : t.type === 'expense' ? 'صرف' : 'تحويل'}
                                      </span>
                                   </td>
                                   <td className="px-8 py-6">
                                      <div className="flex flex-col">
                                         <span className="font-black text-slate-900 text-sm">{t.description}</span>
                                         {t.linkedId && <span className="text-[10px] text-blue-500 font-bold">مرتبط بـ: {t.linkedType === 'customer' ? customers.find(c=>c.id===t.linkedId)?.name : suppliers.find(s=>s.id===t.linkedId)?.name}</span>}
                                      </div>
                                   </td>
                                   <td className={cn("px-8 py-6 text-center font-black tabular-nums", t.type === 'income' ? "text-emerald-600" : "text-rose-600")}>{formatNumber(t.amount)}</td>
                                   <td className="px-8 py-6 text-center">
                                      <button onClick={() => handleDelete(t.id, 'treasury')} className="p-2 text-rose-300 hover:text-rose-600 transition-colors">
                                         <X className="w-5 h-5" />
                                      </button>
                                   </td>
                                </tr>
                             ))}
                          </tbody>
                       </table>
                    </div>
                 </div>
              </div>
            )}

            {(activeSection === 'customers' || activeSection === 'suppliers') && !selectedEntityId && !reportMode && (
              <div className="space-y-8">
                {/* Stats Summary Panel */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="premium-card p-8 bg-white border border-slate-100 shadow-sm relative overflow-hidden group">
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">إجمالي {activeSection === 'customers' ? 'العملاء' : 'الموردين'}</p>
                    <h3 className="text-3xl font-black text-slate-900 leading-tight">
                      {activeSection === 'customers' ? customerStats.count : supplierStats.count}
                    </h3>
                    <div className="absolute top-4 left-4 p-2 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                      {activeSection === 'customers' ? <Users className="w-5 h-5" /> : <Truck className="w-5 h-5" />}
                    </div>
                  </div>
                  <div className="premium-card p-8 bg-white border border-slate-100 shadow-sm">
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">إجمالي المديونية</p>
                    <h3 className="text-3xl font-black text-slate-900 leading-tight">
                      {formatNumber(activeSection === 'customers' ? customerStats.totalBalance : supplierStats.totalBalance)}
                    </h3>
                  </div>
                   <div className="premium-card p-8 bg-white border border-slate-100 shadow-sm">
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-2">إجمالي التحصيلات</p>
                    <h3 className="text-3xl font-black text-emerald-600 leading-tight">
                      {formatNumber(treasury.filter(t => t.linkedType === (activeSection === 'customers' ? 'customer' : 'supplier')).reduce((acc, t) => acc + t.amount, 0))}
                    </h3>
                  </div>
                  <div className="premium-card p-8 border-none bg-slate-900 text-white shadow-xl flex items-center justify-center">
                    <button onClick={() => setReportMode('summary')} className="flex items-center gap-3 font-black text-sm hover:scale-105 transition-transform">
                      <BarChart3 className="w-5 h-5" />
                      عرض التقرير الإجمالي
                    </button>
                  </div>
                </div>

                {/* Table with Actions */}
                <div className="premium-card bg-white overflow-hidden shadow-2xl transition-all duration-500">
                   <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                     <h3 className="text-xl font-black text-slate-900">سجل {activeSection === 'customers' ? 'العملاء' : 'الموردين'}</h3>
                     <div className="flex gap-3">
                        <button onClick={() => setShowModal(true)} className="px-6 py-3 bg-slate-900 text-white rounded-[1.5rem] font-black text-xs flex items-center gap-2 hover:bg-slate-800 shadow-xl transition-all active:scale-95">
                          <Plus className="w-4 h-4" />
                          إضافة {activeSection === 'customers' ? 'عميل' : 'مورد'} جديد
                        </button>
                     </div>
                   </div>
                   <div className="overflow-x-auto">
                     <table className="w-full text-right">
                       <thead>
                         <tr className="bg-slate-50/50">
                           <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">الاسم والبيانات</th>
                           <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">رقم الهاتف</th>
                           <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">الرصيد الحالي</th>
                           <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">الإجراءات</th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-50">
                         {(activeSection === 'customers' ? filteredCustomers : filteredSuppliers).map(entity => {
                           const debit = entity.transactions.filter(t => t.type === 'debit').reduce((acc, t) => acc + t.amount, 0);
                           const credit = entity.transactions.filter(t => t.type === 'credit').reduce((acc, t) => acc + t.amount, 0);
                           const balance = entity.openingBalance + credit - debit;
                           
                           return (
                             <tr key={entity.id} className="hover:bg-slate-50/50 transition-colors group">
                               <td className="px-8 py-6">
                                 <div className="flex flex-col">
                                   <span className="font-black text-slate-900 group-hover:text-blue-600 transition-colors">{entity.name}</span>
                                   <span className="text-[10px] text-slate-400 font-bold">{entity.address}</span>
                                 </div>
                               </td>
                               <td className="px-8 py-6 font-bold text-slate-500 tabular-nums text-xs">{entity.phone}</td>
                               <td className="px-8 py-6 text-center">
                                 <span className={cn("px-4 py-1.5 rounded-xl font-black text-xs tabular-nums shadow-sm", balance > 0 ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600")}>
                                   {formatNumber(balance)} جم
                                 </span>
                               </td>
                               <td className="px-8 py-6">
                                 <div className="flex items-center justify-center gap-2">
                                   <button 
                                      onClick={() => {
                                        setSelectedEntityId(entity.id);
                                        setReportMode('individual');
                                      }}
                                      className="p-2.5 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                                      title="كشف حساب مطول"
                                   >
                                      <FileDown className="w-4 h-4" />
                                   </button>
                                   <button 
                                      onClick={() => {
                                        setEditMode(true);
                                        setSelectedEntityId(entity.id);
                                        setFormData(entity);
                                        setShowModal(true);
                                      }}
                                      className="p-2.5 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                                      title="تعديل"
                                   >
                                      <RotateCcw className="w-4 h-4" />
                                   </button>
                                   <button 
                                      onClick={() => handleDelete(entity.id, activeSection)}
                                      className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                                      title="حذف"
                                   >
                                      <X className="w-4 h-4" />
                                   </button>
                                 </div>
                               </td>
                             </tr>
                           );
                         })}
                         {(activeSection === 'customers' ? filteredCustomers : filteredSuppliers).length === 0 && (
                            <tr><td colSpan={4} className="px-8 py-12 text-center text-slate-400 text-xs font-black italic">لا توجد بيانات متاحة حالياً... قم بإضافة أول سجل لبدء العمل.</td></tr>
                         )}
                       </tbody>
                     </table>
                   </div>
                </div>
              </div>
            )}
              {activeSection === 'invoices_settlements' && (
                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 font-bold text-sm mb-1">إجمالي العمليات المسجلة</p>
                    <h3 className="text-3xl font-black text-slate-900">{formatNumber(customers.length + suppliers.length + treasury.length + settlements.length)} <span className="text-sm font-medium text-slate-400">عملية</span></h3>
                  </div>
                  <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                    <History className="w-7 h-7" />
                  </div>
                </div>
              )}
              {['cogs', 'cost_of_sales'].includes(activeSection) && !reportMode && (
                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg flex items-center justify-between col-span-full">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center">
                      <BookMarked className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-slate-900">هذا القسم مخصص للجانب التعليمي والمرجعي</h4>
                      <p className="text-slate-500 font-bold">يمكنك الانتقال إلى "المرجع التعليمي" للاطلاع على الشرح والقيود والحالات العملية.</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setViewMode('learning')}
                    className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black shadow-lg shadow-blue-100"
                  >
                    عرض الشرح المحاسبي
                  </button>
                </div>
              )}

            {/* Action Bar - Modern Styling */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 mb-8 mt-12">
              <div className="relative flex-grow md:w-80 group">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="بحث في السجلات..."
                  className="w-full bg-slate-50 border-none rounded-2xl pr-12 pl-4 py-4 focus:ring-4 focus:ring-blue-500/10 font-bold text-sm transition-all"
                />
              </div>
              {activeSection !== 'invoices_settlements' && activeSection !== 'erp_overview' && (
                <button 
                  onClick={() => setShowModal(true)} 
                  className="flex items-center justify-center gap-3 px-10 py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition-all shadow-xl hover:shadow-slate-200 active:scale-95"
                >
                  <div className="p-1.5 bg-white/20 rounded-lg">
                    <Plus className="w-4 h-4" />
                  </div>
                  {activeSection === 'customers' ? 'إضافة حركة عميل' : 
                   activeSection === 'suppliers' ? 'إضافة حركة مورد' : 
                   activeSection === 'settlements' ? 'إضافة تسوية' : 
                   activeSection === 'inventory_jard' ? 'إضافة عملية جرد' :
                   'إضافة حركة خزينة'}
                </button>
              )}
            </div>

            {/* Table - Inventory Jard */}
            {activeSection === 'inventory_jard' && (
              <div className="space-y-12">
                {/* Inventory Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">إجمالي التكلفة</p>
                    <p className="text-xl font-black text-slate-900">{formatNumber(erpStats.inventoryValue)} جم</p>
                  </div>
                  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">عدد الأصناف</p>
                    <p className="text-xl font-black text-slate-900">{inventory.length}</p>
                  </div>
                  <div className="bg-rose-50 p-6 rounded-[2rem] border border-rose-100 shadow-sm">
                    <p className="text-rose-600 text-[10px] font-black uppercase tracking-widest mb-1">أصناف تحت الحد الأدنى</p>
                    <p className="text-xl font-black text-rose-600">{inventory.filter(i => (i.quantity || 0) <= (i.minQty || 0)).length}</p>
                  </div>
                  <div className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100 shadow-sm">
                    <p className="text-emerald-600 text-[10px] font-black uppercase tracking-widest mb-1">إجمالي الكميات</p>
                    <p className="text-xl font-black text-emerald-600">{inventory.reduce((acc, i) => acc + (i.quantity || 0), 0)}</p>
                  </div>
                </div>

                {/* Inventory Balances */}
                <div className="premium-card bg-white overflow-hidden shadow-premium">
                  <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                        <Box className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900">رصيد المخزن الحالي</h3>
                    </div>
                    <div className="text-sm font-black text-blue-600 bg-blue-50 px-6 py-3 rounded-2xl">
                      قيمة المخزون: <span className="tabular-nums">{formatNumber(erpStats.inventoryValue)}</span> جم
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-right">
                      <thead>
                        <tr className="bg-slate-50/50">
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none border-b border-slate-100">الصنف</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none border-b border-slate-100">الفئة</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none text-center border-b border-slate-100">الكمية</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none text-center border-b border-slate-100">التكلفة</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none text-center border-b border-slate-100">سعر البيع</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none text-center border-b border-slate-100">القيمة الإجمالية</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {filteredInventory.map(item => (
                          <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                            <td className="px-8 py-6">
                              <div className="flex flex-col">
                                <span className="font-black text-slate-900 group-hover:text-blue-600 transition-colors">{item.name}</span>
                                <span className="text-[10px] text-slate-400 font-bold">SKU: {item.sku}</span>
                              </div>
                            </td>
                            <td className="px-8 py-6">
                              <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase">{item.category}</span>
                            </td>
                            <td className="px-8 py-6 text-center font-black tabular-nums text-slate-900">{item.quantity}</td>
                            <td className="px-8 py-6 text-center tabular-nums text-slate-500 font-bold">{formatNumber(item.cost)}</td>
                            <td className="px-8 py-6 text-center tabular-nums text-slate-500 font-bold">{formatNumber(item.price)}</td>
                            <td className="px-8 py-6 text-center font-black tabular-nums text-blue-600">{formatNumber((item.quantity || 0) * (item.cost || 0))}</td>
                          </tr>
                        ))}
                        {filteredInventory.length === 0 && (
                          <tr><td colSpan={6} className="px-8 py-10 text-center text-slate-400 font-bold italic">لا توجد أصناف تطابق بحثك...</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Jard Records - Premium Table */}
                <div className="premium-card bg-white overflow-hidden">
                  <div className="p-8 border-b border-slate-50 bg-slate-50/50 flex items-center gap-4">
                    <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                      <ClipboardList className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900">سجل عمليات الجرد</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-right">
                      <thead>
                        <tr>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none border-b border-slate-100">التاريخ</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none border-b border-slate-100">الصنف</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none text-center border-b border-slate-100">الرصيد الدفتري</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none text-center border-b border-slate-100">الجرد الفعلي</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none text-center border-b border-slate-100">الفرق</th>
                          <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none border-b border-slate-100">ملاحظات</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {inventoryJard.filter(record => 
                          record.itemName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          record.id.includes(searchTerm)
                        ).map(record => (
                          <tr key={record.id} className="hover:bg-amber-50/10 transition-colors group">
                            <td className="px-8 py-6 text-slate-500 font-bold text-xs tabular-nums">{record.date}</td>
                            <td className="px-8 py-6 font-black text-slate-900 group-hover:text-amber-600 transition-colors">{record.itemName}</td>
                            <td className="px-8 py-6 text-center font-black tabular-nums text-slate-600">{record.bookQty}</td>
                            <td className="px-8 py-6 text-center font-black tabular-nums text-blue-600">{record.physicalQty}</td>
                            <td className="px-8 py-6 text-center">
                              <span className={cn("px-3 py-1 rounded-lg font-black text-[10px] tabular-nums", 
                                record.diff === 0 ? "bg-slate-100 text-slate-500" :
                                record.diff > 0 ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
                              )}>
                                {record.diff > 0 ? `+${record.diff}` : record.diff}
                              </span>
                            </td>
                            <td className="px-8 py-6 text-slate-400 text-[10px] font-bold italic leading-relaxed">{record.note}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'cost_of_purchases' && (
              <div className="space-y-8">
                <div className="premium-card bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl">
                  <h3 className="text-2xl font-black text-slate-900 mb-8 border-r-4 border-blue-600 pr-4">التحليل العملي لتكلفة المشتريات</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6 text-right">
                      <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                        <h4 className="font-black text-blue-900 mb-2">طريقة حساب تكلفة المشتريات</h4>
                        <p className="text-sm font-bold text-blue-800 leading-relaxed pr-0">
                          {learningContent.cost_of_purchases.calculationMethod}
                        </p>
                      </div>
                      <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                        <h4 className="font-black text-emerald-900 mb-2">معادلة تكلفة المشتريات</h4>
                        <div className="p-4 bg-white/50 rounded-xl font-mono text-center text-[10px] font-black text-emerald-700 leading-relaxed">
                          {learningContent.cost_of_purchases.equation}
                        </div>
                      </div>
                    </div>
                    <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full" />
                      <h4 className="text-xl font-black mb-4 flex items-center gap-2 text-right">
                        <Calculator className="w-5 h-5 text-blue-400" />
                        مثال عملي تطبيقي
                      </h4>
                      <p className="text-slate-300 font-bold leading-relaxed text-right">
                        {learningContent.cost_of_purchases.practicalExample}
                      </p>
                    </div>
                  </div>

                  {/* Practical Organized Table */}
                  <div className="mt-12 bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                    <h4 className="text-lg font-black text-slate-900 mb-6">جدول حساب تكلفة المشتريات (مثال أرقام)</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-right">
                        <thead>
                          <tr className="border-b-2 border-slate-200">
                            <th className="py-4 font-black text-slate-600 pr-4">البيان / البند</th>
                            <th className="py-4 font-black text-slate-600 text-center">المبلغ (جم)</th>
                            <th className="py-4 font-black text-slate-600 text-center">ملاحظات</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          <tr className="hover:bg-white transition-colors"><td className="py-4 font-bold pr-4">مخزون أول المدة</td><td className="py-4 text-center tabular-nums font-black">10,000</td><td className="py-4 text-center text-xs text-slate-400">بضاعة بداية الفترة</td></tr>
                          <tr className="hover:bg-white transition-colors"><td className="py-4 font-bold pr-4">(+) المشتريات خلال الفترة</td><td className="py-4 text-center tabular-nums font-black text-emerald-600">50,000</td><td className="py-4 text-center text-xs text-slate-400">صافي قيمة الفواتير</td></tr>
                          <tr className="hover:bg-white transition-colors"><td className="py-4 font-bold pr-4">(+) المصروفات المباشرة</td><td className="py-4 text-center tabular-nums font-black text-emerald-600">2,000</td><td className="py-4 text-center text-xs text-slate-400">نقل، جمارك، تأمين</td></tr>
                          <tr className="hover:bg-white transition-colors"><td className="py-4 font-bold pr-4">(-) مخزون آخر المدة</td><td className="py-4 text-center tabular-nums font-black text-rose-600">(5,000)</td><td className="py-4 text-center text-xs text-slate-400">بضاعة متبقية بالمخزن</td></tr>
                          <tr className="bg-white"><td className="py-6 font-black text-blue-600 text-lg pr-4">إجمالي تكلفة المشتريات</td><td className="py-6 text-center tabular-nums font-black text-blue-600 text-2xl">57,000</td><td className="py-6 text-center text-xs text-blue-400 font-bold">النتيجة النهائية</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'bank_reconciliation' && (
              <div className="space-y-8">
                <div className="premium-card bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl">
                  <h3 className="text-2xl font-black text-slate-900 mb-8 border-r-4 border-amber-600 pr-4">نموذج مذكرة تسوية البنك</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6 text-right">
                      <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                        <h4 className="font-black text-amber-900 mb-4">أسباب اختلاف الرصيد</h4>
                        <ul className="space-y-3 font-bold text-sm text-amber-800">
                          {learningContent.bank_reconciliation.reasonsForDocs?.map((r, i) => (
                            <li key={i} className="flex gap-2">
                              <span className="w-1.5 h-1.5 bg-amber-600 rounded-full mt-1.5 flex-shrink-0" />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
                        <h4 className="font-black text-indigo-900 mb-4">مكونات المذكرة</h4>
                        <div className="grid grid-cols-1 gap-3">
                          {learningContent.bank_reconciliation.components?.map((c, i) => (
                            <div key={i} className="bg-white/50 p-3 rounded-xl text-[10px] font-black text-indigo-700">
                              {c}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] relative overflow-hidden group h-full">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl rounded-full" />
                      <h4 className="text-xl font-black mb-4 flex items-center gap-2 text-right">
                        <Scale className="w-5 h-5 text-amber-400" />
                        مثال عملي (حالة تسوية)
                      </h4>
                      <p className="text-slate-300 font-bold leading-relaxed italic text-right">
                        {learningContent.bank_reconciliation.practicalExample}
                      </p>
                    </div>
                  </div>

                  {/* Practical Bank Reconciliation Table */}
                  <div className="mt-12 bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
                    <h4 className="text-lg font-black text-slate-900 mb-6 text-right">جدول مذكرة تسوية البنك (Practical Model)</h4>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-right">
                       {/* Part 1 */}
                       <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                          <p className="text-xs font-black text-amber-600 mb-4 uppercase">أولاً: تسوية كشف الحساب</p>
                          <div className="space-y-4 font-bold text-sm">
                             <div className="flex justify-between border-b pb-2"><span>رصيد كشف الحساب</span><span className="font-black">12,500</span></div>
                             <div className="flex justify-between border-b pb-2 text-emerald-600"><span>(+) إيداعات في الطريق</span><span className="font-black">0</span></div>
                             <div className="flex justify-between border-b pb-2 text-rose-500"><span>(-) شيكات معلقة</span><span className="font-black">(3,000)</span></div>
                             <div className="flex justify-between pt-2 text-blue-600 font-black"><span>الرصيد المعدل</span><span>9,500</span></div>
                          </div>
                       </div>
                       {/* Part 2 */}
                       <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                          <p className="text-xs font-black text-indigo-600 mb-4 uppercase">ثانياً: تسوية الدفاتر</p>
                          <div className="space-y-4 font-bold text-sm">
                             <div className="flex justify-between border-b pb-2"><span>رصيد المنشأة (الدفاتر)</span><span className="font-black">10,000</span></div>
                             <div className="flex justify-between border-b pb-2 text-emerald-600"><span>(+) إيرادات محصلة بالبنك</span><span className="font-black">0</span></div>
                             <div className="flex justify-between border-b pb-2 text-rose-500"><span>(-) مصاريف وعمولات</span><span className="font-black">(500)</span></div>
                             <div className="flex justify-between pt-2 text-emerald-600 font-black"><span>الرصيد المعدل</span><span>9,500</span></div>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!['erp_overview', 'inventory_jard', 'cogs', 'cost_of_sales', 'cost_of_purchases', 'bank_reconciliation'].includes(activeSection) && (
              <div className="premium-card bg-white overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-right">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        {activeSection === 'treasury' || activeSection === 'settlements' ? (
                          <>
                            <th className="px-8 py-6 font-black text-slate-400 text-[10px] uppercase tracking-widest leading-none">نوع العملية</th>
                            <th className="px-8 py-6 font-black text-slate-400 text-[10px] uppercase tracking-widest leading-none">الوصف</th>
                            <th className="px-8 py-6 font-black text-slate-400 text-[10px] uppercase tracking-widest leading-none text-center">المبلغ</th>
                            <th className="px-8 py-6 font-black text-slate-400 text-[10px] uppercase tracking-widest leading-none text-center">التاريخ</th>
                          </>
                        ) : (
                          <>
                            <th className="px-8 py-6 font-black text-slate-400 text-[10px] uppercase tracking-widest leading-none">{activeSection === 'customers' ? 'اسم العميل' : 'اسم المورد'}</th>
                            <th className="px-8 py-6 font-black text-slate-400 text-[10px] uppercase tracking-widest leading-none">رقم الفاتورة</th>
                            <th className="px-8 py-6 font-black text-rose-600 text-[10px] uppercase tracking-widest leading-none text-center">مدين / سداد</th>
                            <th className="px-8 py-6 font-black text-emerald-600 text-[10px] uppercase tracking-widest leading-none text-center">دائن / فاتورة</th>
                            <th className="px-8 py-6 font-black text-slate-400 text-[10px] uppercase tracking-widest leading-none text-center">الرصيد النهائي</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {activeSection === 'customers' && filteredCustomers.map(item => {
                        const debit = item.transactions.filter(t => t.type === 'debit').reduce((acc, t) => acc + t.amount, 0);
                        const credit = item.transactions.filter(t => t.type === 'credit').reduce((acc, t) => acc + t.amount, 0);
                        const balance = item.openingBalance + credit - debit;
                        return (
                          <tr key={item.id} className="hover:bg-blue-50/10 transition-colors group">
                            <td className="px-8 py-6 font-black text-slate-900 group-hover:text-blue-600 transition-colors">{item.name}</td>
                            <td className="px-8 py-6 font-bold text-slate-500 tabular-nums">{item.id.slice(-6).toUpperCase()}</td>
                            <td className="px-8 py-6 text-center text-rose-600 font-black tabular-nums">{formatNumber(debit)}</td>
                            <td className="px-8 py-6 text-center text-emerald-600 font-black tabular-nums">{formatNumber(credit)}</td>
                            <td className="px-8 py-6 text-center">
                              <span className={cn("px-4 py-1.5 rounded-full font-black text-xs tabular-nums", balance >= 0 ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700")}>
                                {formatNumber(balance)}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                      {activeSection === 'suppliers' && filteredSuppliers.map(item => {
                        const debit = item.transactions.filter(t => t.type === 'debit').reduce((acc, t) => acc + t.amount, 0);
                        const credit = item.transactions.filter(t => t.type === 'credit').reduce((acc, t) => acc + t.amount, 0);
                        const balance = item.openingBalance + credit - debit;
                        return (
                          <tr key={item.id} className="hover:bg-emerald-50/10 transition-colors group">
                            <td className="px-8 py-6 font-black text-slate-900 group-hover:text-emerald-600 transition-colors">{item.name}</td>
                            <td className="px-8 py-6 font-bold text-slate-500 tabular-nums">{item.id.slice(-6).toUpperCase()}</td>
                            <td className="px-8 py-6 text-center text-rose-600 font-black tabular-nums">{formatNumber(debit)}</td>
                            <td className="px-8 py-6 text-center text-emerald-600 font-black tabular-nums">{formatNumber(credit)}</td>
                            <td className="px-8 py-6 text-center">
                              <span className={cn("px-4 py-1.5 rounded-full font-black text-xs tabular-nums", balance >= 0 ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700")}>
                                {formatNumber(balance)}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                      {(activeSection === 'treasury' || activeSection === 'settlements') && (activeSection === 'treasury' ? filteredTreasury : filteredSettlements).map(item => (
                        <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                          <td className="px-8 py-6 whitespace-nowrap">
                            <div className="flex items-center gap-4">
                              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-all", item.type === 'income' ? "bg-emerald-50 text-emerald-600" : item.type === 'expense' ? "bg-rose-50 text-rose-600" : "bg-amber-50 text-amber-600")}>
                                {item.type === 'income' ? <ArrowUpRight className="w-5 h-5" /> : item.type === 'expense' ? <ArrowDownLeft className="w-5 h-5" /> : <RotateCcw className="w-5 h-5" />}
                              </div>
                              <span className="font-black text-slate-900">{item.type === 'income' ? 'إيراد' : item.type === 'expense' ? 'مصروف' : 'تسوية'}</span>
                            </div>
                          </td>
                          <td className="px-8 py-6 font-bold text-slate-500 leading-relaxed">{item.description}</td>
                          <td className={cn("px-8 py-6 text-center font-black tabular-nums text-lg", (item.amount || 0) > 0 ? "text-emerald-600" : "text-rose-600")}>{formatNumber(item.amount)}</td>
                          <td className="px-8 py-6 text-center font-bold text-slate-400 tabular-nums text-xs">{item.date}</td>
                        </tr>
                      ))}
                      {activeSection === 'invoices_settlements' && (
                        <>
                          {[
                            { title: 'ملخص فواتير العملاء', data: filteredCustomers, type: 'customers', color: 'blue' },
                            { title: 'ملخص فواتير الموردين', data: filteredSuppliers, type: 'suppliers', color: 'emerald' },
                            { title: 'ملخص حركة الخزينة', data: filteredTreasury, type: 'treasury', color: 'amber' },
                            { title: 'ملخص التسويات', data: filteredSettlements, type: 'settlements', color: 'indigo' }
                          ].map((group, idx) => (
                            <React.Fragment key={idx}>
                              <tr className="bg-slate-100/50">
                                <td colSpan={5} className={cn(
                                  "px-8 py-5 font-black text-xs uppercase tracking-widest border-y border-slate-200",
                                  group.color === 'blue' ? "text-blue-600" : 
                                  group.color === 'emerald' ? "text-emerald-600" : 
                                  group.color === 'amber' ? "text-amber-600" : "text-indigo-600"
                                )}>
                                  <div className="flex items-center gap-3">
                                    <div className={cn("w-2 h-2 rounded-full", 
                                      group.color === 'blue' ? "bg-blue-600" : 
                                      group.color === 'emerald' ? "bg-emerald-600" : 
                                      group.color === 'amber' ? "bg-amber-600" : "bg-indigo-600"
                                    )} />
                                    {group.title}
                                  </div>
                                </td>
                              </tr>
                              {group.data.length > 0 ? group.data.map((item: any) => {
                                const isDirect = ['treasury', 'settlements'].includes(group.type);
                                let debit = 0;
                                let credit = 0;
                                let balance = 0;
                                let invoice = '';

                                if (!isDirect) {
                                  debit = item.transactions?.filter((t: any) => t.type === 'debit').reduce((acc: any, t: any) => acc + t.amount, 0) || 0;
                                  credit = item.transactions?.filter((t: any) => t.type === 'credit').reduce((acc: any, t: any) => acc + t.amount, 0) || 0;
                                  balance = (item.openingBalance || 0) + credit - debit;
                                  invoice = item.id?.slice(-6).toUpperCase() || '';
                                }

                                return (
                                  <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-8 py-5 font-black text-slate-900">
                                      {isDirect ? (
                                        <div className="flex items-center gap-3">
                                          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", item.type === 'income' ? "bg-emerald-50 text-emerald-600" : item.type === 'expense' ? "bg-rose-50 text-rose-600" : "bg-amber-50 text-amber-600")}>
                                            {item.type === 'income' ? <ArrowUpRight className="w-3.5 h-3.5" /> : item.type === 'expense' ? <ArrowDownLeft className="w-3.5 h-3.5" /> : <RotateCcw className="w-3.5 h-3.5" />}
                                          </div>
                                          <span className="text-xs">{item.type === 'income' ? 'إيراد' : item.type === 'expense' ? 'مصروف' : 'تسوية'}</span>
                                        </div>
                                      ) : (
                                         <span className="group-hover:text-blue-600 transition-colors">{item.name}</span>
                                      )}
                                    </td>
                                    <td className="px-8 py-5 font-bold text-slate-500 text-xs tabular-nums">{isDirect ? item.description : invoice}</td>
                                    <td className="px-8 py-5 text-center text-rose-600 font-black tabular-nums text-sm">{isDirect ? (item.amount < 0 ? formatNumber(Math.abs(item.amount)) : '-') : formatNumber(debit || 0)}</td>
                                    <td className="px-8 py-5 text-center text-emerald-600 font-black tabular-nums text-sm">{isDirect ? (item.amount > 0 ? formatNumber(item.amount) : '-') : formatNumber(credit || 0)}</td>
                                    <td className="px-8 py-5 text-center">
                                      <span className={cn("px-4 py-1 rounded-full font-black text-[10px] tabular-nums", isDirect ? "bg-slate-100 text-slate-500" : (balance >= 0 ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"))}>
                                        {isDirect ? item.date : formatNumber(balance || 0)}
                                      </span>
                                    </td>
                                  </tr>
                                );
                              }) : (
                                <tr><td colSpan={5} className="px-8 py-6 text-center text-slate-400 text-xs font-bold italic">لا توجد بيانات مسجلة في هذا القسم</td></tr>
                              )}
                            </React.Fragment>
                          ))}
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Learning Mode View - Premium Instructional Design */}
        {viewMode === 'learning' && activeSection !== 'invoices_settlements' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="space-y-16 pb-20"
          >
            {/* Main Info Card - Glassmorphism Aesthetic */}
            <div className="bg-white rounded-[3.5rem] p-12 border border-slate-100 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 blur-[120px] -z-0 group-hover:bg-blue-500/10 transition-colors duration-1000" />
              <div className="relative z-10 space-y-12">
                <div className="flex flex-col md:flex-row items-start justify-between gap-8 pb-12 border-b border-slate-100">
                  <div className="space-y-4 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest">
                      <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                      المرجع التعليمي المتقدم
                    </div>
                    <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">
                      {(learningContent as any)[activeSection]?.title}
                    </h2>
                    <p className="text-slate-500 text-xl font-bold leading-relaxed pr-6 border-r-4 border-blue-500">
                      {(learningContent as any)[activeSection]?.definition}
                    </p>
                  </div>
                  <div className="p-6 bg-slate-900 text-white rounded-[2.5rem] shadow-xl shadow-slate-200 transform hover:rotate-3 transition-transform duration-500">
                    <BookMarked className="w-12 h-12" />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                  {/* Processing Cycle - Visual Flow */}
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black shadow-lg shadow-blue-100">01</div>
                      <h3 className="text-2xl font-black text-slate-900">دورة العمل (Operation Cycle)</h3>
                    </div>
                    <div className="space-y-6 relative pr-8 border-r-2 border-slate-100">
                      {(learningContent as any)[activeSection]?.cycle?.map((step: string, i: number) => (
                        <div key={i} className="flex gap-6 group relative">
                          <div className="absolute right-[-41px] top-2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full z-10 group-hover:bg-blue-500 transition-colors" />
                          <div className="bg-slate-50 p-6 rounded-3xl border border-transparent group-hover:border-blue-100 group-hover:bg-white transition-all duration-300 w-full shadow-sm">
                            <p className="font-black text-slate-700 leading-relaxed group-hover:text-blue-700">{step}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Journal Entries - Ledger Style */}
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-indigo-600 text-white rounded-2xl flex items-center justify-center font-black shadow-lg shadow-indigo-100">02</div>
                      <h3 className="text-2xl font-black text-slate-900">القيود المحاسبية (Journals)</h3>
                    </div>
                    <div className="space-y-6">
                      {(learningContent as any)[activeSection]?.entries?.map((entry: any, i: number) => (
                        <div key={i} className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group overflow-hidden relative">
                          <div className="absolute top-0 right-0 w-2 h-full bg-slate-100 group-hover:bg-indigo-500 transition-colors" />
                          <div className="font-black text-slate-800 mb-6 text-sm flex items-center gap-2">
                             <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                             {entry.desc}
                          </div>
                          <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                               <div className="flex justify-between items-center px-1">
                                 <span className="text-[10px] font-black text-emerald-600 uppercase tracking-tighter">Debit (مدين)</span>
                                 <ArrowDownLeft className="w-3 h-3 text-emerald-400" />
                               </div>
                               <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100/50">
                                 <p className="font-black text-emerald-900 text-sm">{entry.debit}</p>
                               </div>
                            </div>
                            <div className="space-y-2">
                               <div className="flex justify-between items-center px-1">
                                 <span className="text-[10px] font-black text-rose-600 uppercase tracking-tighter">Credit (دائن)</span>
                                 <ArrowUpRight className="w-3 h-3 text-rose-400" />
                               </div>
                               <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100/50">
                                 <p className="font-black text-rose-900 text-sm">{entry.credit}</p>
                               </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Technical Treatments - Dark Mode Aesthetic */}
                <div className="pt-16 border-t border-slate-100">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-slate-900 rounded-[3rem] p-12 overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-full h-full bg-blue-500/5 blur-[80px] -z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <div className="space-y-6 relative z-10 max-w-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-500/20 text-amber-400 rounded-2xl flex items-center justify-center animate-bounce">
                          <AlertCircle className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-black text-white">معالجات فنية وحالات خاصة</h3>
                      </div>
                      <p className="text-slate-400 text-lg font-bold leading-relaxed pr-6 border-r-2 border-white/10">
                         {activeSection === 'customers' && learningContent.customers.badDebts}
                         {activeSection === 'suppliers' && learningContent.suppliers.aging}
                         {activeSection === 'treasury' && learningContent.treasury.pettyCash}
                         {activeSection === 'settlements' && learningContent.settlements.bankRec}
                         {activeSection === 'cogs' && learningContent.cogs.badDebts}
                         {activeSection === 'cost_of_sales' && learningContent.cost_of_sales.aging}
                         {activeSection === 'cost_of_purchases' && learningContent.cost_of_purchases.pettyCash}
                      </p>
                    </div>
                    <div className="hidden md:block relative z-10">
                       <div className="w-64 h-64 bg-white/5 border border-white/5 rounded-full flex items-center justify-center backdrop-blur-sm shadow-inner group-hover:scale-110 transition-transform duration-700">
                          <TrendingUp className="w-32 h-32 text-blue-500/20" />
                       </div>
                    </div>
                  </div>
                </div>

                {/* Additional Technical Insights */}
                {activeSection === 'cogs' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12">
                    <div className="p-10 bg-blue-50 border border-blue-100 rounded-[3rem] group hover:bg-blue-600 transition-all duration-500">
                      <h4 className="font-black text-blue-900 mb-6 group-hover:text-white flex items-center gap-3">
                         <div className="w-2 h-8 bg-blue-600 group-hover:bg-white rounded-full" />
                         طرق تقييم المخزون العالمية
                      </h4>
                      <ul className="space-y-4 font-black">
                        {[
                          { name: 'وارد أولاً صادر أولاً (FIFO)', tag: 'الأكثر شيوعاً', color: 'bg-blue-200' },
                          { name: 'وارد أخيراً صادر أولاً (LIFO)', tag: 'قيود المعايير الدولية', color: 'bg-slate-200' },
                          { name: 'المتوسط المرجح (W. Average)', tag: 'توازن التذبذب', color: 'bg-blue-200' }
                        ].map((li, i) => (
                          <li key={i} className="flex justify-between items-center text-blue-800 group-hover:text-white/90 text-sm">
                            <span>{li.name}</span> 
                            <span className={cn("text-[10px] px-3 py-1 rounded-full group-hover:bg-white/20", li.color)}>{li.tag}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-10 bg-indigo-50 border border-indigo-100 rounded-[3rem] group hover:bg-indigo-600 transition-all duration-500">
                      <h4 className="font-black text-indigo-900 mb-6 group-hover:text-white flex items-center gap-3">
                         <div className="w-2 h-8 bg-indigo-600 group-hover:bg-white rounded-full" />
                         تأثير المخزون على القوائم الملحقة
                      </h4>
                      <div className="space-y-4 text-sm font-black text-indigo-800 group-hover:text-white/90 leading-relaxed">
                        <div className="flex gap-3">
                          <div className="w-5 h-5 bg-indigo-200 group-hover:bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">1</div>
                          <p>زيادة تكلفة البضاعة (COGS) تؤدي مباشرة لانخفاض صافي الربح السنوي.</p>
                        </div>
                        <div className="flex gap-3">
                          <div className="w-5 h-5 bg-indigo-200 group-hover:bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">2</div>
                          <p>المبالغة في تقييم مخزون آخر المدة تضخم الأرباح الحالية وترحل الخسائر للفترة القادمة.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'cost_of_sales' && (
                  <div className="pt-16 space-y-8">
                    <h4 className="text-3xl font-black text-slate-900 flex items-center gap-4">
                       تحليل تكلفة المبيعات حسب القطاع
                       <div className="h-0.5 bg-slate-100 flex-grow" />
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {[
                        { title: 'القطاع التجاري', desc: 'تكلفة البضاعة المشتراة + كافة مصاريف الشحن والتحميل والتأمين حتى وصول المخازن.', icon: <ShoppingBag /> },
                        { title: 'القطاع الصناعي', desc: 'المواد الخام المباشرة + الأجور المباشرة + المصاريف الصناعية غير المباشرة (كهرباء المصنع، إهلاك الآلات).', icon: <Box /> },
                        { title: 'القطاع الخدمي', desc: 'تكلفة الوقت المستغرق في الخدمة + الأدوات المستهلكة + أتعاب الخبراء المشاركين.', icon: <Users /> }
                      ].map((item, i) => (
                        <div key={i} className="premium-card p-8 bg-white border border-slate-100 flex flex-col gap-6 hover:translate-y-[-10px] transition-transform">
                          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-sm">
                            {item.icon}
                          </div>
                          <div className="space-y-3">
                            <h5 className="font-black text-slate-900">{item.title}</h5>
                            <p className="text-xs font-bold text-slate-500 leading-relaxed h-16">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Case Study Card - Highlight Section */}
            <div className="bg-emerald-600 rounded-[3.5rem] p-12 text-white shadow-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-full h-full bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-1000" />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="w-full md:w-1/3 space-y-4">
                   <div className="w-16 h-16 bg-white/20 rounded-[2rem] flex items-center justify-center border border-white/20">
                     <Plus className="w-8 h-8" />
                   </div>
                   <h3 className="text-4xl font-black">دراسة حالة</h3>
                   <h3 className="text-4xl font-black opacity-40">Practical Case</h3>
                   <p className="text-emerald-100 font-bold leading-relaxed pr-6 border-r-2 border-emerald-400 mt-6">
                      تحليل حقيقي لتطبيق المبادئ المحاسبية في سيناريو عملي يواجه المحاسبين في بيئة العمل.
                   </p>
                </div>
                <div className="w-full md:w-2/3 bg-white/10 p-10 rounded-[3rem] border border-white/10 backdrop-blur-md shadow-inner">
                  <p className="text-2xl font-bold leading-relaxed text-emerald-50">
                    {(learningContent as any)[activeSection]?.case}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        </div>
      </div>

      {/* Entry Modal - Premium Glass Design */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-md" 
              onClick={() => setShowModal(false)} 
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }} 
              className="bg-white w-full max-w-2xl rounded-[3rem] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.3)] relative z-10 overflow-hidden"
            >
              <div className="p-10 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-100">
                    <Plus className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 leading-none">إضافة حركة جديدة</h3>
                    <p className="text-slate-400 text-xs font-bold mt-2 uppercase tracking-widest tracking-tighter">New Entry Creation</p>
                  </div>
                </div>
                <button onClick={() => setShowModal(false)} className="p-3 hover:bg-white hover:shadow-lg rounded-2xl transition-all group">
                  <X className="w-6 h-6 text-slate-400 group-hover:text-rose-500 transition-colors" />
                </button>
              </div>

              <form onSubmit={handleAddEntry} className="p-10 space-y-8 text-right bg-white">
                {activeSection === 'inventory_jard' ? (
                  <div className="space-y-8">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex gap-4 mb-6">
                      <button type="button" onClick={() => setFormData({...formData, jardType: false})} className={cn("flex-grow py-3 rounded-xl font-black text-xs transition-all", !formData.jardType ? "bg-white shadow-sm text-blue-600" : "text-slate-400")}>حركة مخزنية</button>
                      <button type="button" onClick={() => setFormData({...formData, jardType: true})} className={cn("flex-grow py-3 rounded-xl font-black text-xs transition-all", formData.jardType ? "bg-white shadow-sm text-amber-600" : "text-slate-400")}>عملية جرد</button>
                    </div>

                    <div className="space-y-3">
                       <label className="text-xs font-black text-slate-500 uppercase tracking-widest block pr-2">اختر الصنف من المخزن</label>
                       <select required className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-5 font-bold transition-all text-slate-900 appearance-none outline-none shadow-sm" 
                         value={formData.itemId || ''}
                         onChange={e => {
                           const item = inventory.find(i => i.id === e.target.value);
                           setFormData({...formData, itemId: e.target.value, bookQty: item?.quantity || 0, unitPrice: item?.cost || 0});
                         }}>
                         <option value="">اختر صنف...</option>
                         {inventory.map(i => <option key={i.id} value={i.id}>{i.name} (الرصيد: {i.quantity})</option>)}
                       </select>
                    </div>
                    
                    {formData.jardType ? (
                       <div className="space-y-8">
                         <div className="grid grid-cols-2 gap-6">
                           <div className="space-y-3">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest block pr-2">الرصيد الدفتري</label>
                            <input readOnly value={formData.bookQty || 0} className="w-full bg-slate-100 border-2 border-transparent rounded-2xl px-6 py-5 font-black text-slate-400 text-center text-lg outline-none cursor-not-allowed" />
                           </div>
                           <div className="space-y-3">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest block pr-2">الجرد الفعلي</label>
                            <input type="number" required placeholder="الكمية الحقيقية" className="w-full bg-blue-50 border-2 border-blue-100 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 rounded-2xl px-6 py-5 font-black text-slate-900 text-center text-lg transition-all outline-none" onChange={e => setFormData({...formData, physicalQty: e.target.value})} />
                           </div>
                         </div>
                         <div className="flex items-center gap-3 bg-amber-50 p-4 rounded-2xl border border-amber-100">
                            <input type="checkbox" id="autoCorrect" className="w-5 h-5 rounded-lg accent-amber-600" onChange={e => setFormData({...formData, autoCorrect: e.target.checked})} />
                            <label htmlFor="autoCorrect" className="text-sm font-black text-amber-900 cursor-pointer">تحديث رصيد المخزن تلقائياً بناءً على الجرد؟</label>
                         </div>
                       </div>
                    ) : (
                      <div className="space-y-8">
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-3">
                             <label className="text-xs font-black text-slate-500 uppercase tracking-widest block pr-2">نوع الحركة</label>
                             <select required className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-5 font-bold transition-all text-slate-900 appearance-none outline-none shadow-sm"
                               onChange={e => setFormData({...formData, movementType: e.target.value})}>
                               <option value="addition">إضافة (+) </option>
                               <option value="issue">صرف (-) </option>
                               <option value="return">مرتجع (+)</option>
                             </select>
                          </div>
                          <div className="space-y-3">
                             <label className="text-xs font-black text-slate-500 uppercase tracking-widest block pr-2">الكمية</label>
                             <input type="number" required placeholder="0" className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-5 font-black text-slate-900 text-center text-lg transition-all outline-none" onChange={e => setFormData({...formData, quantity: e.target.value})} />
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-3">
                       <label className="text-xs font-black text-slate-500 uppercase tracking-widest block pr-2">ملاحظات العملية</label>
                       <textarea className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-5 font-bold transition-all text-slate-900 outline-none shadow-sm" rows={3} placeholder="أي تفاصيل أخرى..." onChange={e => setFormData({...formData, note: e.target.value})} />
                    </div>
                  </div>
                ) : activeSection === 'customers' || activeSection === 'suppliers' ? (
                  <div className="space-y-8">
                    {editMode ? (
                      <div className="space-y-8">
                         <div className="space-y-3">
                            <label className="text-xs font-black text-slate-500 uppercase tracking-widest block pr-2">{activeSection === 'customers' ? 'اسم العميل' : 'اسم المورد'}</label>
                            <input required value={formData.name || ''} className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-5 font-bold transition-all text-slate-900 outline-none shadow-sm" onChange={e => setFormData({...formData, name: e.target.value})} />
                         </div>
                         <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-3">
                               <label className="text-xs font-black text-slate-500 uppercase tracking-widest block pr-2">رقم الهاتف</label>
                               <input value={formData.phone || ''} className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-5 font-bold transition-all text-slate-900 outline-none shadow-sm" onChange={e => setFormData({...formData, phone: e.target.value})} />
                            </div>
                            <div className="space-y-3">
                               <label className="text-xs font-black text-slate-500 uppercase tracking-widest block pr-2">العنوان</label>
                               <input value={formData.address || ''} className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-5 font-bold transition-all text-slate-900 outline-none shadow-sm" onChange={e => setFormData({...formData, address: e.target.value})} />
                            </div>
                         </div>
                      </div>
                    ) : (
                      <div className="space-y-8">
                         <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex gap-4 mb-6">
                            <button type="button" onClick={() => setFormData({...formData, isNewEntity: true})} className={cn("flex-grow py-3 rounded-xl font-black text-xs transition-all", formData.isNewEntity ? "bg-white shadow-sm text-blue-600" : "text-slate-400")}>تسجيل {activeSection === 'customers' ? 'عميل' : 'مورد'} جديد</button>
                            <button type="button" onClick={() => setFormData({...formData, isNewEntity: false})} className={cn("flex-grow py-3 rounded-xl font-black text-xs transition-all", !formData.isNewEntity ? "bg-white shadow-sm text-emerald-600" : "text-slate-400")}>إضافة حركة مالية</button>
                         </div>

                         {formData.isNewEntity ? (
                           <div className="space-y-8">
                              <div className="space-y-3">
                                 <label className="text-xs font-black text-slate-500 uppercase tracking-widest block pr-2">الاسم الكامل</label>
                                 <input required className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-5 font-bold transition-all text-slate-900 outline-none shadow-sm" onChange={e => setFormData({...formData, name: e.target.value, isNewEntity: true})} />
                              </div>
                              <div className="grid grid-cols-2 gap-6">
                                 <div className="space-y-3">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest block pr-2">رقم الهاتف</label>
                                    <input className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-5 font-bold transition-all text-slate-900 outline-none shadow-sm" onChange={e => setFormData({...formData, phone: e.target.value, isNewEntity: true})} />
                                 </div>
                                 <div className="space-y-3">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest block pr-2">الرصيد الافتتاحي</label>
                                    <input type="number" className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-5 font-black text-slate-900 outline-none shadow-sm text-center" placeholder="0" onChange={e => setFormData({...formData, openingBalance: e.target.value, isNewEntity: true})} />
                                 </div>
                              </div>
                           </div>
                         ) : (
                            <div className="space-y-8">
                               <div className="space-y-3">
                                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest block pr-2">اختر {activeSection === 'customers' ? 'العميل' : 'المورد'}</label>
                                  <select required className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-5 font-bold transition-all text-slate-900 appearance-none outline-none shadow-sm" onChange={e => setFormData({...formData, linkedId: e.target.value, identity: activeSection === 'customers' ? 'customer' : 'supplier'})}>
                                     <option value="">اختر...</option>
                                     {(activeSection === 'customers' ? customers : suppliers).map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                                  </select>
                               </div>
                               <div className="grid grid-cols-2 gap-6">
                                 <div className="space-y-3">
                                    <label className="text-xs font-black text-slate-400 uppercase block pr-2">رقم الفاتورة / المرجع</label>
                                    <input required className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-5 font-black text-sm" placeholder="#REF-000" onChange={e => setFormData({...formData, invoiceNumber: e.target.value})} />
                                 </div>
                                 <div className="space-y-3">
                                    <label className="text-xs font-black text-slate-400 uppercase block pr-2">التاريخ</label>
                                    <input type="date" required className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-5 font-black text-sm" defaultValue={new Date().toISOString().split('T')[0]} onChange={e => setFormData({...formData, date: e.target.value})} />
                                 </div>
                               </div>
                               <div className="grid grid-cols-2 gap-6">
                                  <div className="space-y-3">
                                     <label className="text-xs font-black text-rose-500 uppercase block pr-2">مدين / سداد (+)</label>
                                     <input type="number" step="0.01" className="w-full bg-rose-50 border-2 border-rose-100 focus:border-rose-500 focus:bg-white rounded-2xl px-6 py-5 font-black text-lg text-center" placeholder="0.00" onChange={e => setFormData({...formData, debit: e.target.value})} />
                                  </div>
                                  <div className="space-y-3">
                                     <label className="text-xs font-black text-emerald-500 uppercase block pr-2">دائن / فاتورة (-)</label>
                                     <input type="number" step="0.01" className="w-full bg-emerald-50 border-2 border-emerald-100 focus:border-emerald-500 focus:bg-white rounded-2xl px-6 py-5 font-black text-lg text-center" placeholder="0.00" onChange={e => setFormData({...formData, credit: e.target.value})} />
                                  </div>
                               </div>
                               {((activeSection === 'customers' || activeSection === 'suppliers') && Number(formData.credit) > 0) && (
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 mt-4 border-t border-slate-100">
                                   <div className="space-y-3">
                                     <label className="text-xs font-black text-blue-500 uppercase block pr-2 tracking-widest text-right">الصنف من المخزن (اختياري)</label>
                                     <select className="w-full bg-blue-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-5 font-bold appearance-none outline-none shadow-sm text-right"
                                       value={formData.itemId || ''}
                                       onChange={e => setFormData({...formData, itemId: e.target.value})}>
                                       <option value="">لا يوجد ارتباط مخزني...</option>
                                       {inventory.map(i => <option key={i.id} value={i.id}>{i.name} (المتوفر: {i.quantity})</option>)}
                                     </select>
                                   </div>
                                   <div className="space-y-3">
                                     <label className="text-xs font-black text-blue-500 uppercase block pr-2 tracking-widest text-right">الكمية</label>
                                     <input type="number" className="w-full bg-blue-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-5 font-black text-lg text-center transition-all outline-none" placeholder="1" onChange={e => setFormData({...formData, inventoryQty: e.target.value})} />
                                   </div>
                                 </div>
                               )}
                            </div>
                         )}
                      </div>
                    )}
                  </div>
                ) : activeSection === 'treasury' || activeSection === 'settlements' ? (
                  <div className="space-y-8">
                    <div className="space-y-3">
                       <label className="text-xs font-black text-slate-500 uppercase tracking-widest block pr-2">وصف العملية</label>
                       <input required className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-5 font-bold transition-all text-slate-900 outline-none shadow-sm" placeholder="مثلاً: سداد إيجار، تحصيل نقدي، إلخ..." onChange={e => setFormData({...formData, description: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-3">
                          <label className="text-xs font-black text-slate-500 uppercase tracking-widest block pr-2">المبلغ</label>
                          <input type="number" required placeholder="0.00" className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-5 font-black text-lg text-center" onChange={e => setFormData({...formData, amount: e.target.value})} />
                       </div>
                       <div className="space-y-3">
                          <label className="text-xs font-black text-slate-500 uppercase tracking-widest block pr-2">نـوع الحركة</label>
                          <select required className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-5 font-bold" onChange={e => setFormData({...formData, [activeSection === 'treasury' ? 'type' : 'settlementType']: e.target.value})}>
                            {activeSection === 'treasury' ? (
                              <>
                                <option value="income">إيداع (إيراد)</option>
                                <option value="expense">صرف (مصروف)</option>
                                <option value="transfer">تحويل</option>
                              </>
                            ) : (
                              <>
                                <option value="adjustment">تسوية جردية</option>
                                <option value="bank">تسوية بنكية</option>
                                <option value="other">تسويات أخرى</option>
                              </>
                            )}
                          </select>
                       </div>
                    </div>
                    {activeSection === 'treasury' && (
                      <div className="space-y-3">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest block pr-2">ارتباط بـ (اختياري)</label>
                        <select className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-5 font-bold" onChange={e => {
                          const [type, valId] = e.target.value.split(':');
                          setFormData({...formData, linkedType: type, linkedId: valId});
                        }}>
                          <option value="">غير مرتبط...</option>
                          <optgroup label="العملاء">
                            {customers.map(c => <option key={c.id} value={`customer:${c.id}`}>{c.name}</option>)}
                          </optgroup>
                          <optgroup label="الموردين">
                            {suppliers.map(s => <option key={s.id} value={`supplier:${s.id}`}>{s.name}</option>)}
                          </optgroup>
                        </select>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-8">
                     <div className="space-y-3">
                       <label className="text-xs font-black text-slate-500 uppercase tracking-widest block pr-2">نوع الحركة</label>
                       <select required className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl px-6 py-5 font-bold transition-all text-slate-900 appearance-none outline-none shadow-sm" onChange={e => setFormData({...formData, type: e.target.value})}>
                         <option value="">اختر النوع...</option>
                         <option value="income">إيراد / توريد (+)</option>
                         <option value="expense">مصروف / صرف (-)</option>
                         <option value="adjustment">تسوية جردية / تصحيح</option>
                       </select>
                     </div>
                     <div className="space-y-3">
                       <label className="text-xs font-black text-slate-500 uppercase tracking-widest block pr-2">المبلغ الكلي</label>
                       <input type="number" required placeholder="0.00" className="w-full bg-slate-50 border-2 border-transparent focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 rounded-2xl px-6 py-5 font-black text-slate-900 text-center text-lg transition-all outline-none tabular-nums" onChange={e => setFormData({...formData, amount: e.target.value})} />
                     </div>
                  </div>
                )}
                
                <div className="pt-6">
                  <button type="submit" className="w-full py-6 bg-slate-900 hover:bg-slate-800 text-white rounded-[2rem] font-black text-lg transition-all shadow-2xl shadow-slate-200 flex items-center justify-center gap-3 group translate-y-0 active:scale-95">
                    <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                      <Save className="w-5 h-5" />
                    </div>
                    حفظ وتسجيل العملية
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
