import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
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
  Briefcase
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
  | 'settlements' 
  | 'cogs' 
  | 'cost_of_sales' 
  | 'cost_of_purchases' 
  | 'invoices_settlements';
type ViewMode = 'dashboard' | 'learning';

interface CustomerTransaction {
  id: string;
  name: string;
  invoiceNumber: string;
  debit: number;
  credit: number;
  date: string;
}

interface SupplierTransaction {
  id: string;
  name: string;
  invoiceNumber: string;
  debit: number;
  credit: number;
  date: string;
}

interface TreasuryTransaction {
  id: string;
  type: 'income' | 'expense' | 'adjustment';
  description: string;
  amount: number;
  date: string;
}

export default function AccountingMisc() {
  const { t } = useTranslation();
  
  const [activeSection, setActiveSection] = useState<Section>('erp_overview');
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  /**
   * 🟦 القسم الأول: محاسبة العملاء
   */
  const [customers, setCustomers] = useState<CustomerTransaction[]>([
    { id: '1', name: 'شركة النور للتجارة', invoiceNumber: 'INV-001', debit: 5000, credit: 0, date: '2024-03-01' },
    { id: '2', name: 'مؤسسة الرياض الصناعية', invoiceNumber: 'INV-002', debit: 0, credit: 7500, date: '2024-03-05' },
  ]);

  /**
   * 🟨 القسم الثاني: محاسبة الموردين
   */
  const [suppliers, setSuppliers] = useState<SupplierTransaction[]>([
    { id: '1', name: 'شركة التوريدات العالمية', invoiceNumber: 'SUP-001', debit: 2000, credit: 10000, date: '2024-03-02' },
    { id: '2', name: 'مصنع الشرق للأثاث', invoiceNumber: 'SUP-002', debit: 5000, credit: 5000, date: '2024-03-06' },
  ]);

  /**
   * 🟩 القسم الثالث: الخزينة والتسويات
   */
  const [treasury, setTreasury] = useState<TreasuryTransaction[]>([
    { id: '1', type: 'income', description: 'مبيعات نقدية - فرع جدة', amount: 3500, date: '2024-03-10' },
    { id: '2', type: 'expense', description: 'مصاريف صيانة كهرباء', amount: 450, date: '2024-03-11' },
    { id: '3', type: 'adjustment', description: 'تسوية رصيد عجز خزينة', amount: -50, date: '2024-03-12' },
  ]);

  const [settlements, setSettlements] = useState<TreasuryTransaction[]>([
    { id: '1', type: 'adjustment', description: 'تسوية مصروف مسبق - إيجار يناير', amount: -2000, date: '2024-01-31' },
    { id: '2', type: 'adjustment', description: 'إثبات فوائد بنكية دائنة', amount: 150, date: '2024-02-28' },
  ]);

  const [inventory, setInventory] = useState<any[]>([
    { id: '1', name: 'لابتوب ديل G15', sku: 'LAP-001', category: 'إلكترونيات', quantity: 15, cost: 3500, price: 4200 },
    { id: '2', name: 'شاشة سامسونج 27', sku: 'MON-001', category: 'إلكترونيات', quantity: 24, cost: 800, price: 1100 },
    { id: '3', name: 'طابعة اتش بي', sku: 'PRN-001', category: 'مكتبية', quantity: 8, cost: 1200, price: 1600 },
  ]);

  const [sales, setSales] = useState<any[]>([
    { id: '1', customerName: 'شركة النور', amount: 8400, items: 2, date: '2024-03-01', type: 'credit' },
    { id: '2', customerName: 'عميل نقدي', amount: 1100, items: 1, date: '2024-03-05', type: 'cash' },
  ]);

  const [purchases, setPurchases] = useState<any[]>([
    { id: '1', supplierName: 'المورد العالمي', amount: 12000, items: 10, date: '2024-03-02', type: 'credit' },
  ]);

  const [inventoryJard, setInventoryJard] = useState<any[]>([
    { id: '1', itemId: '1', itemName: 'لابتوب ديل', bookQty: 15, physicalQty: 14, diff: -1, note: 'جهاز تالف بالعرض', date: '2024-03-31' },
  ]);

  const [inventoryEntries, setInventoryEntries] = useState<any[]>([
    { id: '1', type: 'cogs', description: 'تسوية مخزون آخر المدة', amount: 45000, date: '2024-12-31' },
    { id: '2', type: 'purchases', description: 'مصاريف جمارك شحنة مارس', amount: 12000, date: '2024-03-15' },
  ]);

  // Form State
  const [formData, setFormData] = useState<any>({});

  // Export & Print Handlers
  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = () => {
    window.print();
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
    }
  };

  // Calculations
  const erpStats = useMemo(() => {
    const totalSales = sales.reduce((acc, curr) => acc + curr.amount, 0);
    const totalPurchases = purchases.reduce((acc, curr) => acc + curr.amount, 0);
    
    // COGS = Opening Inventory + Purchases - Closing Inventory
    // Simplified for demo: Sum of costs of sold items
    const estimatedCogs = sales.reduce((acc, curr) => acc + (curr.amount * 0.75), 0);
    
    const customerReceivables = customers.reduce((acc, curr) => acc + (curr.credit - curr.debit), 0);
    const supplierPayables = suppliers.reduce((acc, curr) => acc + (curr.credit - curr.debit), 0);
    
    const treasuryBalance = treasury.reduce((acc, curr) => {
      if (curr.type === 'income') return acc + curr.amount;
      if (curr.type === 'expense') return acc - curr.amount;
      return acc + curr.amount;
    }, 0);

    const inventoryValue = inventory.reduce((acc, curr) => acc + (curr.quantity * curr.cost), 0);
    const grossProfit = totalSales - estimatedCogs;
    
    return {
      totalSales,
      totalPurchases,
      estimatedCogs,
      customerReceivables,
      supplierPayables,
      treasuryBalance,
      inventoryValue,
      grossProfit
    };
  }, [sales, purchases, customers, suppliers, treasury, inventory]);

  const customerStats = useMemo(() => {
    const totalBalance = customers.reduce((acc, curr) => acc + (curr.credit - curr.debit), 0);
    return { totalBalance };
  }, [customers]);

  const supplierStats = useMemo(() => {
    const totalBalance = suppliers.reduce((acc, curr) => acc + (curr.credit - curr.debit), 0);
    return { totalBalance };
  }, [suppliers]);

  const treasuryStats = useMemo(() => {
    const income = treasury.filter(t => t.type === 'income' || (t.type === 'adjustment' && t.amount > 0))
                          .reduce((acc, curr) => acc + Math.abs(curr.amount), 0);
    const expense = treasury.filter(t => t.type === 'expense' || (t.type === 'adjustment' && t.amount < 0))
                          .reduce((acc, curr) => acc + Math.abs(curr.amount), 0);
    return { income, expense, balance: income - expense };
  }, [treasury]);

  // Filters
  const filteredCustomers = customers.filter(c => c.name.includes(searchTerm));
  const filteredSuppliers = suppliers.filter(s => s.name.includes(searchTerm));
  const filteredTreasury = treasury.filter(t => {
    const matchesSearch = t.description.includes(searchTerm);
    const matchesDate = (!startDate || t.date >= startDate) && (!endDate || t.date <= endDate);
    return matchesSearch && matchesDate;
  });
  const filteredSettlements = settlements.filter(t => {
    const matchesSearch = t.description.includes(searchTerm);
    const matchesDate = (!startDate || t.date >= startDate) && (!endDate || t.date <= endDate);
    return matchesSearch && matchesDate;
  });

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Math.random().toString(36).substr(2, 9);
    const date = new Date().toISOString().split('T')[0];

    if (activeSection === 'customers') {
      const debit = Number(formData.debit || 0);
      const credit = Number(formData.credit || 0);
      setCustomers([...customers, { ...formData, id, date, debit, credit }]);
      
      // If sell on credit, we should also track it in sales
      if (credit > 0) {
        setSales([...sales, { id: 's-' + id, customerName: formData.name, amount: credit, items: 1, date, type: 'credit' }]);
      }
    } else if (activeSection === 'suppliers') {
      const debit = Number(formData.debit || 0);
      const credit = Number(formData.credit || 0);
      setSuppliers([...suppliers, { ...formData, id, date, debit, credit }]);
      
      // If purchase on credit
      if (credit > 0) {
        setPurchases([...purchases, { id: 'p-' + id, supplierName: formData.name, amount: credit, items: 1, date, type: 'credit' }]);
      }
    } else if (activeSection === 'treasury') {
      const amount = Number(formData.amount || 0);
      setTreasury([...treasury, { ...formData, id, date, amount }]);
      
      // If it's a customer payment (income), decrease customer balance
      if (formData.type === 'income' && formData.customerId) {
        const customer = customers.find(c => c.id === formData.customerId);
        if (customer) {
          setCustomers(customers.map(c => c.id === customer.id ? { ...c, debit: c.debit + amount } : c));
        }
      }
    } else if (activeSection === 'inventory_jard') {
      const diff = Number(formData.physicalQty) - Number(formData.bookQty);
      setInventoryJard([...inventoryJard, { 
        id, 
        itemId: formData.itemId, 
        itemName: inventory.find(i => i.id === formData.itemId)?.name,
        bookQty: Number(formData.bookQty),
        physicalQty: Number(formData.physicalQty),
        diff,
        note: formData.note,
        date
      }]);
      
      // Update real inventory quantity
      setInventory(inventory.map(i => i.id === formData.itemId ? { ...i, quantity: Number(formData.physicalQty) } : i));
      
      // Create adjustment in treasury/settlements if there's a diff
      if (diff !== 0) {
        setSettlements([...settlements, { 
          id: 'adj-' + id, 
          type: 'adjustment', 
          description: `تسوية جرد بضاعة: ${inventory.find(i => i.id === formData.itemId)?.name}`,
          amount: diff * (inventory.find(i => i.id === formData.itemId)?.cost || 0),
          date
        }]);
      }
    } else if (activeSection === 'settlements') {
      setSettlements([...settlements, { ...formData, id, date, amount: Number(formData.amount || 0) }]);
    }

    setShowModal(false);
    setFormData({});
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24" dir="rtl">
      {/* Header Section */}
      <section className="bg-slate-900 pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5 -z-0" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-500/10 blur-3xl rounded-full" />
        
        <div className="container mx-auto px-6 relative z-10 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 font-black text-[10px] uppercase tracking-widest"
          >
            <TrendingUp className="w-4 h-4" />
            النظام المحاسبي المتكامل
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
            بنك <span className="text-blue-400">المعلومات المحاسبي</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg font-medium">
            نظام متكامل لإدارة العمليات المالية والتقارير المحاسبية بدقة احترافية.
          </p>
        </div>
      </section>

      {/* Main Dashboard */}
      <div className="container mx-auto px-6 -mt-10 relative z-20">
        {/* Navigation Tabs & Mode Toggle */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-8">
          <div className="bg-white rounded-[2rem] p-2 shadow-xl border border-slate-100 flex flex-wrap gap-2 transition-all duration-500">
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
              { id: 'invoices_settlements', label: 'نظرة شمولية', icon: <History className="w-5 h-5" /> },
            ].map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id as Section)}
                className={cn(
                  "flex items-center gap-3 px-6 py-4 rounded-2xl font-black transition-all text-sm",
                  activeSection === section.id 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105" 
                    : "text-slate-500 hover:bg-slate-50"
                )}
              >
                {section.icon}
                {section.label}
              </button>
            ))}
          </div>

          <div className="flex items-center bg-white p-2 rounded-[2rem] shadow-xl border border-slate-100 gap-2 print:hidden">
            <button
              onClick={() => setViewMode('learning')}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm transition-all",
                viewMode === 'learning' ? "bg-amber-100 text-amber-700 shadow-sm" : "text-slate-400 hover:bg-slate-50"
              )}
            >
              <BookOpen className="w-4 h-4" />
              المرجع التعليمي
            </button>
            <button
              onClick={() => setViewMode('dashboard')}
              className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm transition-all",
                viewMode === 'dashboard' ? "bg-indigo-100 text-indigo-700 shadow-sm" : "text-slate-400 hover:bg-slate-50"
              )}
            >
              <Microscope className="w-4 h-4" />
              اللوحة العملية
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 mb-6 print:hidden">
          <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-all text-xs">
            <Printer className="w-4 h-4" />
            طباعة المرجع
          </button>
          <button onClick={handleExportPDF} className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all text-xs">
            <FileDown className="w-4 h-4" />
            تحميل PDF
          </button>
        </div>

        {/* Dashboard View */}
        {viewMode === 'dashboard' && (
          <div className="space-y-8">
            {activeSection === 'erp_overview' && (
              <div className="space-y-8">
                {/* ERP KPI Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'إجمالي المبيعات', value: erpStats.totalSales, icon: <TrendingUp />, color: 'blue' },
                    { label: 'تكلفة المبيعات', value: erpStats.estimatedCogs, icon: <AlertCircle />, color: 'rose' },
                    { label: 'مجمل الربح', value: erpStats.grossProfit, icon: <BarChart3 />, color: 'emerald' },
                    { label: 'رصيد الخزينة', value: erpStats.treasuryBalance, icon: <Wallet />, color: 'amber' },
                  ].map((kpi, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between gap-3"
                    >
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", 
                        kpi.color === 'blue' ? "bg-blue-50 text-blue-600" :
                        kpi.color === 'rose' ? "bg-rose-50 text-rose-600" :
                        kpi.color === 'emerald' ? "bg-emerald-50 text-emerald-600" :
                        "bg-amber-50 text-amber-600"
                      )}>
                        {kpi.icon}
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{kpi.label}</p>
                        <h4 className="text-xl font-black text-slate-900">{kpi.value.toLocaleString()} <span className="text-[10px]">جم</span></h4>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-lg h-[400px] flex flex-col">
                    <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                       <BarChart3 className="w-5 h-5 text-blue-600" />
                       مقارنة المبيعات والتكاليف
                    </h3>
                    <div className="flex-grow">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                          { name: 'العمليات', sales: erpStats.totalSales, costs: erpStats.estimatedCogs, profit: erpStats.grossProfit }
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="name" hide />
                          <YAxis />
                          <Tooltip 
                            contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                            cursor={{ fill: '#f8fafc' }}
                          />
                          <Bar dataKey="sales" name="المبيعات" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={60} />
                          <Bar dataKey="costs" name="التكاليف" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={60} />
                          <Bar dataKey="profit" name="الربح" fill="#10b981" radius={[4, 4, 0, 0]} barSize={60} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-lg h-[400px] flex flex-col">
                    <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                       <PieChartIcon className="w-5 h-5 text-rose-600" />
                       توزيع المركز المالي
                    </h3>
                    <div className="flex-grow">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'أرصدة العملاء', value: erpStats.customerReceivables, color: '#3b82f6' },
                              { name: 'قيمة المخزون', value: erpStats.inventoryValue, color: '#8b5cf6' },
                              { name: 'رصيد المشتريات', value: erpStats.totalPurchases, color: '#10b981' },
                              { name: 'إجمالي المطلوبات', value: erpStats.supplierPayables, color: '#f43f5e' },
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                            nameKey="name"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {[1, 2, 3, 4].map((_, index) => (
                              <Cell key={`cell-${index}`} fill={['#3b82f6', '#8b5cf6', '#10b981', '#f43f5e'][index]} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Recent Activities Summary */}
                <div className="bg-slate-900 rounded-[3rem] p-10 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full" />
                  <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                      <h4 className="text-white font-black flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-blue-400" />
                        آخر المبيعات
                      </h4>
                      <div className="space-y-2">
                        {sales.slice(-2).map((s, i) => (
                          <div key={i} className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                            <span className="text-slate-300 text-xs font-bold">{s.customerName}</span>
                            <span className="text-blue-400 font-black text-sm">{s.amount.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-white font-black flex items-center gap-2">
                        <Users className="w-5 h-5 text-emerald-400" />
                        التحصيل والمدفوعات
                      </h4>
                      <div className="space-y-2">
                        {treasury.slice(-2).map((t, i) => (
                          <div key={i} className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                            <span className="text-slate-300 text-xs font-bold">{t.description}</span>
                            <span className={cn("font-black text-sm", t.type === 'income' ? 'text-emerald-400' : 'text-rose-400')}>{t.amount.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-white font-black flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-amber-400" />
                        أرصدة حرجة
                      </h4>
                      <div className="space-y-2">
                        {inventory.filter(i => i.quantity < 10).map((item, i) => (
                          <div key={i} className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                            <span className="text-slate-300 text-xs font-bold">{item.name}</span>
                            <span className="text-amber-400 font-black text-xs">نقص: {item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Existing Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {activeSection === 'customers' && (
                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 font-bold text-sm mb-1">إجمالي أرصدة العملاء</p>
                    <h3 className="text-3xl font-black text-slate-900">{customerStats.totalBalance.toLocaleString()} <span className="text-sm font-medium text-slate-400">جم</span></h3>
                  </div>
                  <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                    <Users className="w-7 h-7" />
                  </div>
                </div>
              )}
              {activeSection === 'suppliers' && (
                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 font-bold text-sm mb-1">إجمالي مستحقات الموردين</p>
                    <h3 className="text-3xl font-black text-slate-900">{supplierStats.totalBalance.toLocaleString()} <span className="text-sm font-medium text-slate-400">جم</span></h3>
                  </div>
                  <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                    <Truck className="w-7 h-7" />
                  </div>
                </div>
              )}
              {activeSection === 'treasury' && (
                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 font-bold text-sm mb-1">رصيد الخزينة الحالي</p>
                    <h3 className="text-3xl font-black text-slate-900">{treasuryStats.balance.toLocaleString()} <span className="text-sm font-medium text-slate-400">جم</span></h3>
                  </div>
                  <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                    <Wallet className="w-7 h-7" />
                  </div>
                </div>
              )}
              {activeSection === 'invoices_settlements' && (
                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 font-bold text-sm mb-1">إجمالي العمليات المسجلة</p>
                    <h3 className="text-3xl font-black text-slate-900">{(customers.length + suppliers.length + treasury.length + settlements.length).toLocaleString()} <span className="text-sm font-medium text-slate-400">عملية</span></h3>
                  </div>
                  <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                    <History className="w-7 h-7" />
                  </div>
                </div>
              )}
              {['cogs', 'cost_of_sales', 'cost_of_purchases'].includes(activeSection) && (
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
            </div>

            {/* Action Bar */}
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="relative flex-grow md:w-80">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="بحث في السجلات..."
                  className="w-full bg-slate-50 border-none rounded-2xl pr-12 pl-4 py-4 focus:ring-2 focus:ring-blue-500/20 font-bold text-sm"
                />
              </div>
              {activeSection !== 'invoices_settlements' && activeSection !== 'erp_overview' && (
                <button onClick={() => setShowModal(true)} className="flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition-all shadow-lg">
                  <Plus className="w-5 h-5" />
                  {activeSection === 'customers' ? 'إضافة حركة عميل' : 
                   activeSection === 'suppliers' ? 'إضافة حركة مورد' : 
                   activeSection === 'settlements' ? 'إضافة تسوية' : 
                   activeSection === 'inventory_jard' ? 'إضافة عملية جرد' :
                   'إضافة عملية خزينة'}
                </button>
              )}
            </div>

            {/* Table */}
            {activeSection === 'inventory_jard' && (
              <div className="space-y-6">
                {/* Inventory Balances */}
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
                  <div className="p-8 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                    <h3 className="text-xl font-black text-slate-900">رصيد المخزن الحالي</h3>
                    <div className="text-xs font-bold text-slate-500 bg-white px-4 py-2 rounded-xl shadow-sm">
                      إجمالي قيمة المخزون: <span className="text-blue-600">{erpStats.inventoryValue.toLocaleString()}</span> جم
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-right">
                      <thead className="bg-slate-50 border-b border-slate-100 text-[10px] uppercase font-black text-slate-400">
                        <tr>
                          <th className="px-8 py-4">الصنف</th>
                          <th className="px-8 py-4">الفئة</th>
                          <th className="px-8 py-4 text-center">الكمية</th>
                          <th className="px-8 py-4 text-center">التكلفة</th>
                          <th className="px-8 py-4 text-center">سعر البيع</th>
                          <th className="px-8 py-4 text-center">القيمة الإجمالية</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {inventory.map(item => (
                          <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-8 py-4">
                              <div className="flex flex-col">
                                <span className="font-bold text-slate-900">{item.name}</span>
                                <span className="text-[10px] text-slate-400">SKU: {item.sku}</span>
                              </div>
                            </td>
                            <td className="px-8 py-4"><span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold">{item.category}</span></td>
                            <td className="px-8 py-4 text-center font-black">{item.quantity}</td>
                            <td className="px-8 py-4 text-center">{item.cost.toLocaleString()}</td>
                            <td className="px-8 py-4 text-center">{item.price.toLocaleString()}</td>
                            <td className="px-8 py-4 text-center font-black text-blue-600">{(item.quantity * item.cost).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Jard Records */}
                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
                  <div className="p-8 border-b border-slate-100 bg-slate-50">
                    <h3 className="text-xl font-black text-slate-900">سجل عمليات الجرد</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-right">
                      <thead className="bg-slate-50 border-b border-slate-100 text-[10px] uppercase font-black text-slate-400">
                        <tr>
                          <th className="px-8 py-4">التاريخ</th>
                          <th className="px-8 py-4">الصنف</th>
                          <th className="px-8 py-4 text-center">الرصيد الدفتري</th>
                          <th className="px-8 py-4 text-center">الجرد الفعلي</th>
                          <th className="px-8 py-4 text-center">الفرق</th>
                          <th className="px-8 py-4">ملاحظات</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {inventoryJard.map(record => (
                          <tr key={record.id} className="hover:bg-amber-50/10">
                            <td className="px-8 py-4 text-slate-500 font-medium text-xs">{record.date}</td>
                            <td className="px-8 py-4 font-bold text-slate-900">{record.itemName}</td>
                            <td className="px-8 py-4 text-center font-bold">{record.bookQty}</td>
                            <td className="px-8 py-4 text-center font-bold text-blue-600">{record.physicalQty}</td>
                            <td className="px-8 py-4 text-center">
                              <span className={cn("px-2 py-1 rounded font-black text-xs", 
                                record.diff === 0 ? "bg-slate-100 text-slate-500" :
                                record.diff > 0 ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
                              )}>
                                {record.diff > 0 ? `+${record.diff}` : record.diff}
                              </span>
                            </td>
                            <td className="px-8 py-4 text-slate-400 text-xs italic">{record.note}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {!['erp_overview', 'inventory_jard', 'cogs', 'cost_of_sales', 'cost_of_purchases'].includes(activeSection) && (
              <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-right">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        {activeSection === 'treasury' || activeSection === 'settlements' ? (
                          <>
                            <th className="px-8 py-6 font-black text-slate-900 text-sm">نوع العملية</th>
                            <th className="px-8 py-6 font-black text-slate-900 text-sm">الوصف</th>
                            <th className="px-8 py-6 font-black text-slate-900 text-sm text-center">المبلغ</th>
                            <th className="px-8 py-6 font-black text-slate-900 text-sm text-center">التاريخ</th>
                          </>
                        ) : (
                          <>
                            <th className="px-8 py-6 font-black text-slate-900 text-sm">{activeSection === 'customers' ? 'اسم العميل' : 'اسم المورد'}</th>
                            <th className="px-8 py-6 font-black text-slate-900 text-sm">رقم الفاتورة</th>
                            <th className="px-8 py-6 font-black text-slate-900 text-sm text-center text-rose-600">مدين / سداد</th>
                            <th className="px-8 py-6 font-black text-slate-900 text-sm text-center text-emerald-600">دائن / فاتورة</th>
                            <th className="px-8 py-6 font-black text-slate-900 text-sm text-center">الرصيد</th>
                          </>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {activeSection === 'customers' && filteredCustomers.map(item => (
                        <tr key={item.id} className="hover:bg-blue-50/10">
                          <td className="px-8 py-6 font-bold text-slate-900">{item.name}</td>
                          <td className="px-8 py-6 font-medium text-slate-500">{item.invoiceNumber}</td>
                          <td className="px-8 py-6 text-center text-rose-600 font-black">{item.debit.toLocaleString()}</td>
                          <td className="px-8 py-6 text-center text-emerald-600 font-black">{item.credit.toLocaleString()}</td>
                          <td className="px-8 py-6 text-center">
                            <span className={cn("px-4 py-1.5 rounded-full font-black text-xs", (item.credit - item.debit) >= 0 ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700")}>
                              {(item.credit - item.debit).toLocaleString()}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {activeSection === 'suppliers' && filteredSuppliers.map(item => (
                        <tr key={item.id} className="hover:bg-emerald-50/10">
                          <td className="px-8 py-6 font-bold text-slate-900">{item.name}</td>
                          <td className="px-8 py-6 font-medium text-slate-500">{item.invoiceNumber}</td>
                          <td className="px-8 py-6 text-center text-rose-600 font-black">{item.debit.toLocaleString()}</td>
                          <td className="px-8 py-6 text-center text-emerald-600 font-black">{item.credit.toLocaleString()}</td>
                          <td className="px-8 py-6 text-center">
                            <span className={cn("px-4 py-1.5 rounded-full font-black text-xs", (item.credit - item.debit) >= 0 ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700")}>
                              {(item.credit - item.debit).toLocaleString()}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {(activeSection === 'treasury' || activeSection === 'settlements') && (activeSection === 'treasury' ? filteredTreasury : filteredSettlements).map(item => (
                        <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-8 py-6 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className={cn("p-2 rounded-lg", item.type === 'income' ? "bg-emerald-100 text-emerald-600" : item.type === 'expense' ? "bg-rose-100 text-rose-600" : "bg-amber-100 text-amber-600")}>
                                {item.type === 'income' ? <ArrowUpRight className="w-4 h-4" /> : item.type === 'expense' ? <ArrowDownLeft className="w-4 h-4" /> : <RotateCcw className="w-4 h-4" />}
                              </div>
                              <span className="font-bold text-slate-900">{item.type === 'income' ? 'إيراد' : item.type === 'expense' ? 'مصروف' : 'تسوية'}</span>
                            </div>
                          </td>
                          <td className="px-8 py-6 font-medium text-slate-600">{item.description}</td>
                          <td className={cn("px-8 py-6 text-center font-black", item.amount > 0 ? "text-emerald-600" : "text-rose-600")}>{item.amount.toLocaleString()}</td>
                          <td className="px-8 py-6 text-center font-medium text-slate-400">{item.date}</td>
                        </tr>
                      ))}
                      {activeSection === 'invoices_settlements' && (
                        <>
                          {[
                            { title: 'ملخص فواتير العملاء', data: filteredCustomers, type: 'customers' },
                            { title: 'ملخص فواتير الموردين', data: filteredSuppliers, type: 'suppliers' },
                            { title: 'ملخص حركة الخزينة', data: filteredTreasury, type: 'treasury' },
                            { title: 'ملخص التسويات', data: filteredSettlements, type: 'settlements' }
                          ].map((group, idx) => (
                            <React.Fragment key={idx}>
                              <tr className="bg-slate-100/50">
                                <td colSpan={5} className="px-8 py-4 font-black text-blue-600 text-sm border-y border-slate-200">{group.title}</td>
                              </tr>
                              {group.data.length > 0 ? group.data.map((item: any) => (
                                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                  <td className="px-8 py-4 font-bold text-slate-900">
                                    {['treasury', 'settlements'].includes(group.type) ? (
                                      <div className="flex items-center gap-2">
                                        <div className={cn("p-1.5 rounded-lg", item.type === 'income' ? "bg-emerald-100 text-emerald-600" : item.type === 'expense' ? "bg-rose-100 text-rose-600" : "bg-amber-100 text-amber-600")}>
                                          {item.type === 'income' ? <ArrowUpRight className="w-3 h-3" /> : item.type === 'expense' ? <ArrowDownLeft className="w-3 h-3" /> : <RotateCcw className="w-3 h-3" />}
                                        </div>
                                        {item.type === 'income' ? 'إيراد' : item.type === 'expense' ? 'مصروف' : 'تسوية'}
                                      </div>
                                    ) : item.name}
                                  </td>
                                  <td className="px-8 py-4 font-medium text-slate-500">{['treasury', 'settlements'].includes(group.type) ? item.description : item.invoiceNumber}</td>
                                  <td className="px-8 py-4 text-center text-rose-600 font-bold">{['treasury', 'settlements'].includes(group.type) ? (item.amount < 0 ? Math.abs(item.amount).toLocaleString() : '-') : item.debit.toLocaleString()}</td>
                                  <td className="px-8 py-4 text-center text-emerald-600 font-bold">{['treasury', 'settlements'].includes(group.type) ? (item.amount > 0 ? item.amount.toLocaleString() : '-') : item.credit.toLocaleString()}</td>
                                  <td className="px-8 py-4 text-center">
                                    <span className={cn("px-3 py-1 rounded-full font-black text-[10px]", ['treasury', 'settlements'].includes(group.type) ? "bg-blue-100 text-blue-700" : (item.credit - item.debit >= 0 ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"))}>
                                      {['treasury', 'settlements'].includes(group.type) ? item.date : (item.credit - item.debit).toLocaleString()}
                                    </span>
                                  </td>
                                </tr>
                              )) : (
                                <tr><td colSpan={5} className="px-8 py-4 text-center text-slate-400 text-xs italic">لا توجد بيانات مسجلة في هذا القسم</td></tr>
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

        {/* Learning Mode View */}
        {viewMode === 'learning' && activeSection !== 'invoices_settlements' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
            {/* Main Info Card */}
            <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-3xl -z-0" />
              <div className="relative z-10 space-y-10">
                <div className="flex flex-col md:flex-row items-start justify-between gap-6">
                  <div className="space-y-2">
                    <h2 className="text-4xl font-black text-slate-900">{(learningContent as any)[activeSection]?.title}</h2>
                    <p className="text-slate-500 text-lg font-medium">{(learningContent as any)[activeSection]?.definition}</p>
                  </div>
                  <div className="p-4 bg-blue-50 text-blue-600 rounded-3xl"><BookMarked className="w-10 h-10" /></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {/* Processing Cycle */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-xs">01</div>
                      دورة العمل (Cycle)
                    </h3>
                    <div className="space-y-4 pr-4 border-r-2 border-slate-50">
                      {(learningContent as any)[activeSection]?.cycle?.map((step: string, i: number) => (
                        <div key={i} className="flex gap-4 group">
                          <div className="w-2.5 h-2.5 bg-blue-500 rounded-full mt-2 ring-4 ring-blue-50" />
                          <p className="font-bold text-slate-600 group-hover:text-blue-600 transition-colors">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Journal Entries */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-xs">02</div>
                      القيود المحاسبية
                    </h3>
                    <div className="space-y-4">
                      {(learningContent as any)[activeSection]?.entries?.map((entry: any, i: number) => (
                        <div key={i} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-blue-200 transition-all">
                          <p className="font-black text-slate-900 mb-4 text-sm">{entry.desc}</p>
                          <div className="grid grid-cols-2 gap-4 text-xs">
                            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                               <span className="text-[10px] font-black text-emerald-600 block mb-1">مدين (Dr)</span>
                               <p className="font-black text-emerald-800">{entry.debit}</p>
                            </div>
                            <div className="p-3 bg-rose-50 rounded-xl border border-rose-100">
                               <span className="text-[10px] font-black text-rose-600 block mb-1">دائن (Cr)</span>
                               <p className="font-black text-rose-800">{entry.credit}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Special cases Section */}
                <div className="pt-10 border-t border-slate-100">
                  <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-500" />
                    معالجات فنية هامة
                  </h3>
                  <div className="bg-slate-900 text-slate-300 p-8 rounded-[2.5rem]">
                    <p className="leading-relaxed font-bold">
                       {activeSection === 'customers' && learningContent.customers.badDebts}
                       {activeSection === 'suppliers' && learningContent.suppliers.aging}
                       {activeSection === 'treasury' && learningContent.treasury.pettyCash}
                       {activeSection === 'settlements' && learningContent.settlements.bankRec}
                       {activeSection === 'cogs' && learningContent.cogs.badDebts}
                       {activeSection === 'cost_of_sales' && learningContent.cost_of_sales.aging}
                       {activeSection === 'cost_of_purchases' && learningContent.cost_of_purchases.pettyCash}
                    </p>
                  </div>
                </div>

                {activeSection === 'cogs' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10">
                    <div className="p-8 bg-blue-50 border border-blue-100 rounded-[2rem]">
                      <h4 className="font-black text-blue-900 mb-4">طرق تقييم المخزون</h4>
                      <ul className="space-y-3 font-bold text-blue-800 text-sm">
                        <li className="flex justify-between"><span>وارد أولاً صادر أولاً (FIFO)</span> <span className="text-xs bg-blue-200 px-2 py-1 rounded">الأكثر شيوعاً</span></li>
                        <li className="flex justify-between"><span>وارد أخيراً صادر أولاً (LIFO)</span> <span className="text-xs bg-slate-200 px-2 py-1 rounded">غير معترف بها دولياً غالباً</span></li>
                        <li className="flex justify-between"><span>المتوسط المرجح (W. Average)</span> <span className="text-xs bg-blue-200 px-2 py-1 rounded">توازن التذبذب</span></li>
                      </ul>
                    </div>
                    <div className="p-8 bg-indigo-50 border border-indigo-100 rounded-[2rem]">
                      <h4 className="font-black text-indigo-900 mb-4">التأثير على القوائم</h4>
                      <div className="space-y-2 text-sm font-bold text-indigo-800">
                        <p>زيادة COGS = انخفاض مجمل الربح.</p>
                        <p>زيادة مخزون آخر المدة = انخفاض COGS وزيادة الأرباح.</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeSection === 'cost_of_sales' && (
                  <div className="pt-10 space-y-6">
                    <h4 className="text-xl font-black text-slate-900">مقارنة تكلفة المبيعات حسب نوع النشاط</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        { title: 'النشاط التجاري', desc: 'تكلفة البضاعة المشتراة + مصاريف الشراء والنقل للمخازن.' },
                        { title: 'النشاط الصناعي', desc: 'مواد خام + عمالة مباشرة + تكاليف صناعية غير مباشرة.' },
                        { title: 'النشاط الخدمي', desc: 'أجور المهنيين + المواد المستهلكة في تقديم الخدمة.' }
                      ].map((item, i) => (
                        <div key={i} className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
                          <h5 className="font-black text-sm text-blue-600 mb-3">{item.title}</h5>
                          <p className="text-xs font-bold text-slate-500 leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeSection === 'cost_of_purchases' && (
                  <div className="pt-10">
                    <h4 className="text-xl font-black text-slate-900 mb-6 font-black">مكونات تكلفة المشتريات (Total Landed Cost)</h4>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {['قيمة الفاتورة', 'النقل والشحن', 'التأمين', 'الرسوم الجمركية', 'العمولات المباشرة'].map((comp, i) => (
                        <div key={i} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-center">
                          <div className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-[10px] mx-auto mb-2 font-black">{i + 1}</div>
                          <span className="text-[10px] font-black text-slate-600">{comp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Case Study Card */}
            <div className="bg-emerald-600 rounded-[3rem] p-10 text-white shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-white/20 rounded-2xl"><Plus className="w-8 h-8" /></div>
                <h3 className="text-3xl font-black">دراسة حالة عملية</h3>
              </div>
              <p className="text-xl font-medium leading-relaxed bg-white/10 p-8 rounded-3xl border border-white/10">
                {(learningContent as any)[activeSection]?.case}
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Entry Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden">
              <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-2xl font-black text-slate-900">إضافة حركة جديدة</h3>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X className="w-6 h-6 text-slate-400" /></button>
              </div>
              <form onSubmit={handleAddEntry} className="p-8 space-y-6 text-right">
                {activeSection === 'inventory_jard' ? (
                  <>
                    <div className="space-y-2">
                       <label className="text-sm font-black text-slate-900">اختر الصنف</label>
                       <select required className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold" 
                         onChange={e => {
                           const item = inventory.find(i => i.id === e.target.value);
                           setFormData({...formData, itemId: e.target.value, bookQty: item?.quantity || 0});
                         }}>
                         <option value="">اختر صنف...</option>
                         {inventory.map(i => <option key={i.id} value={i.id}>{i.name} (الدفتري: {i.quantity})</option>)}
                       </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                        <label className="text-sm font-black text-slate-900">الرصيد الدفتري</label>
                        <input readOnly value={formData.bookQty || 0} className="w-full bg-slate-100 border-none rounded-2xl px-6 py-4 font-black text-slate-500" />
                       </div>
                       <div className="space-y-2">
                        <label className="text-sm font-black text-slate-900">الجرد الفعلي</label>
                        <input type="number" required placeholder="الكمية الحقيقية" className="w-full bg-blue-50 border-none rounded-2xl px-6 py-4 font-black" onChange={e => setFormData({...formData, physicalQty: e.target.value})} />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-black text-slate-900">ملاحظات</label>
                       <textarea className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold" rows={3} onChange={e => setFormData({...formData, note: e.target.value})} />
                    </div>
                  </>
                ) : activeSection === 'customers' || activeSection === 'suppliers' ? (
                  <>
                    <div className="space-y-2">
                       <label className="text-sm font-black text-slate-900">{activeSection === 'customers' ? 'اسم العميل' : 'اسم المورد'}</label>
                       <input required className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold" onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-black text-slate-900">رقم الفاتورة</label>
                       <input required className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold" onChange={e => setFormData({...formData, invoiceNumber: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <input type="number" placeholder="مدين / سداد" className="w-full bg-rose-50 border-none rounded-2xl px-6 py-4 font-black" onChange={e => setFormData({...formData, debit: e.target.value})} />
                       <input type="number" placeholder="دائن / فاتورة" className="w-full bg-emerald-50 border-none rounded-2xl px-6 py-4 font-black" onChange={e => setFormData({...formData, credit: e.target.value})} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                       <label className="text-sm font-black text-slate-900">الوصف</label>
                       <input required className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold" onChange={e => setFormData({...formData, description: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                       <select required className="bg-slate-50 border-none rounded-2xl px-4 font-bold" onChange={e => setFormData({...formData, type: e.target.value})}>
                         <option value="">النوع...</option>
                         <option value="income">إيراد (قبض)</option>
                         <option value="expense">مصروف (صرف)</option>
                         <option value="adjustment">تسوية</option>
                       </select>
                       <input type="number" required placeholder="المبلغ" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-black" onChange={e => setFormData({...formData, amount: e.target.value})} />
                    </div>
                    {formData.type === 'income' && activeSection === 'treasury' && (
                      <div className="space-y-2">
                        <label className="text-sm font-black text-slate-900">ربط بتحصيل عميل (اختياري)</label>
                        <select className="w-full bg-blue-50 border-none rounded-2xl px-6 py-4 font-bold" onChange={e => setFormData({...formData, customerId: e.target.value})}>
                          <option value="">اختر عميل لاستنزال مديونيته...</option>
                          {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                      </div>
                    )}
                  </>
                )}
                <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-200">حفظ الحركة</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
