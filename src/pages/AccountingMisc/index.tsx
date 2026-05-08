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
  BookMarked
} from 'lucide-react';
import { cn } from '../../lib/utils';

// Types
type Section = 'customers' | 'suppliers' | 'treasury' | 'settlements' | 'invoices_settlements';
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
  
  const [activeSection, setActiveSection] = useState<Section>('customers');
  const [viewMode, setViewMode] = useState<ViewMode>('learning');
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
    }
  };

  // Calculations
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
      setCustomers([...customers, { ...formData, id, date, debit: Number(formData.debit || 0), credit: Number(formData.credit || 0) }]);
    } else if (activeSection === 'suppliers') {
      setSuppliers([...suppliers, { ...formData, id, date, debit: Number(formData.debit || 0), credit: Number(formData.credit || 0) }]);
    } else if (activeSection === 'treasury') {
      setTreasury([...treasury, { ...formData, id, date, amount: Number(formData.amount || 0) }]);
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
              { id: 'customers', label: 'العملاء', icon: <Users className="w-5 h-5" /> },
              { id: 'suppliers', label: 'الموردين', icon: <Truck className="w-5 h-5" /> },
              { id: 'treasury', label: 'الخزينة', icon: <Wallet className="w-5 h-5" /> },
              { id: 'settlements', label: 'التسويات', icon: <RotateCcw className="w-5 h-5" /> },
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
            {/* Stats */}
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
              {activeSection !== 'invoices_settlements' && (
                <button onClick={() => setShowModal(true)} className="flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition-all shadow-lg">
                  <Plus className="w-5 h-5" />
                  {activeSection === 'customers' ? 'إضافة حركة عميل' : activeSection === 'suppliers' ? 'إضافة حركة مورد' : activeSection === 'settlements' ? 'إضافة تسوية' : 'إضافة عملية خزينة'}
                </button>
              )}
            </div>

            {/* Table */}
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

                {/* Technical Treatments */}
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
                    </p>
                  </div>
                </div>
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
                {activeSection === 'customers' || activeSection === 'suppliers' ? (
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
                       <select className="bg-slate-50 border-none rounded-2xl px-4 font-bold" onChange={e => setFormData({...formData, type: e.target.value})}>
                         <option value="income">إيراد</option>
                         <option value="expense">مصروف</option>
                         <option value="adjustment">تسوية</option>
                       </select>
                       <input type="number" placeholder="المبلغ" className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-black" onChange={e => setFormData({...formData, amount: e.target.value})} />
                    </div>
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
