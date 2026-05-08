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
  History
} from 'lucide-react';
import { cn } from '../../lib/utils';

// Types
type Section = 'customers' | 'suppliers' | 'treasury' | 'invoices_settlements';

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
  const { t, i18n } = useTranslation();
  
  const [activeSection, setActiveSection] = useState<Section>('customers');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  /**
   * 🟦 القسم الأول: محاسبة العملاء (Accounts Receivable)
   * --------------------------------------------------
   * فكرة القسم:
   * إدارة المبالغ المستحقة للمنشأة طرف الغير (العملاء) نتيجة تقديم خدمات أو بيع بضائع بالآجل.
   * 
   * المبادئ المحاسبية:
   * - مدين (Debit): يمثل المبالغ التي قام العميل بسدادها للمنشأة (تقلل رصيده المستحق عليه).
   * - دائن (Credit): يمثل قيمة الفواتير الصادرة للعميل (تزيد رصيده المستحق عليه كالتزام تجاه المنشأة).
   * 
   * معادلة الرصيد:
   * الرصيد = إجمالي الفواتير (دائن) - إجمالي السداد (مدين)
   */
  const [customers, setCustomers] = useState<CustomerTransaction[]>([
    { id: '1', name: 'شركة النور للتجارة', invoiceNumber: 'INV-001', debit: 5000, credit: 0, date: '2024-03-01' },
    { id: '2', name: 'مؤسسة الرياض الصناعية', invoiceNumber: 'INV-002', debit: 0, credit: 7500, date: '2024-03-05' },
  ]);

  /**
   * 🟨 القسم الثاني: محاسبة الموردين (Accounts Payable)
   * --------------------------------------------------
   * فكرة القسم:
   * إدارة الالتزامات المالية على المنشأة تجاه الغير (الموردين) نتيجة الحصول على بضائع أو خدمات بالآجل.
   * 
   * المبادئ المحاسبية:
   * - الفرق بين العميل والمورد: العميل "مدين لنا بالمال"، بينما المورد "نحن دائنون له بالمال".
   * - تسجيل الفواتير: يتم تسجيل فاتورة المورد في الجانب الدائن لزيادة الالتزام، والسداد له في الجانب المدين لتقليل الالتزام.
   */
  const [suppliers, setSuppliers] = useState<SupplierTransaction[]>([
    { id: '1', name: 'شركة التوريدات العالمية', invoiceNumber: 'SUP-001', debit: 2000, credit: 10000, date: '2024-03-02' },
    { id: '2', name: 'مصنع الشرق للأثاث', invoiceNumber: 'SUP-002', debit: 5000, credit: 5000, date: '2024-03-06' },
  ]);

  /**
   * 🟩 القسم الثالث: الخزينة والتسويات (Cash & Settlements)
   * ----------------------------------------------------
   * فكرة القسم:
   * مراقبة التدفقات النقدية الداخلة والخارجة من صندوق المنشأة أو حساباتها البنكية.
   * 
   * المفاهيم المالية:
   * - الإيرادات: أي تدفق نقدي وارد يزيد من سيولة الخزينة.
   * - المصروفات: أي تدفق نقدي صادر يقلل من سيولة الخزينة.
   * - التسويات: عمليات تصحيحية لجعل الرصيد الدفتري مطابقاً للرصيد الفعلي (عجز أو زيادة).
   */
  const [treasury, setTreasury] = useState<TreasuryTransaction[]>([
    { id: '1', type: 'income', description: 'مبيعات نقدية - فرع جدة', amount: 3500, date: '2024-03-10' },
    { id: '2', type: 'expense', description: 'مصاريف صيانة كهرباء', amount: 450, date: '2024-03-11' },
    { id: '3', type: 'adjustment', description: 'تسوية رصيد عجز خزينة', amount: -50, date: '2024-03-12' },
  ]);

  // Form State
  const [formData, setFormData] = useState<any>({});

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

  const handleAddEntry = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Math.random().toString(36).substr(2, 9);
    const date = new Date().toISOString().split('T')[0];

    if (activeSection === 'customers') {
      setCustomers([...customers, { ...formData, id, date, debit: Number(formData.debit || 0), credit: Number(formData.credit || 0) }]);
    } else if (activeSection === 'suppliers') {
      setSuppliers([...suppliers, { ...formData, id, date, debit: Number(formData.debit || 0), credit: Number(formData.credit || 0) }]);
    } else {
      setTreasury([...treasury, { ...formData, id, date, amount: Number(formData.amount || 0) }]);
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
        {/* Navigation Tabs */}
        <div className="bg-white rounded-[2rem] p-2 shadow-xl border border-slate-100 flex flex-wrap gap-2 mb-8 max-w-fit mx-auto lg:mx-0">
          {[
            { id: 'customers', label: 'محاسبة العملاء', icon: <Users className="w-5 h-5" /> },
            { id: 'suppliers', label: 'محاسبة الموردين', icon: <Truck className="w-5 h-5" /> },
            { id: 'treasury', label: 'الخزينة والتسويات', icon: <Wallet className="w-5 h-5" /> },
            { id: 'invoices_settlements', label: 'فواتير وتسويات', icon: <History className="w-5 h-5" /> },
          ].map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id as Section)}
              className={cn(
                "flex items-center gap-3 px-8 py-4 rounded-2xl font-black transition-all text-sm",
                activeSection === section.id 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                  : "text-slate-500 hover:bg-slate-50"
              )}
            >
              {section.icon}
              {section.label}
            </button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {activeSection === 'customers' && (
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/50 flex items-center justify-between group">
              <div>
                <p className="text-slate-400 font-bold text-sm mb-1">إجمالي أرصدة العملاء</p>
                <h3 className="text-3xl font-black text-slate-900">{customerStats.totalBalance.toLocaleString()} <span className="text-sm font-medium text-slate-400">جم</span></h3>
              </div>
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7" />
              </div>
            </div>
          )}
          {activeSection === 'suppliers' && (
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/50 flex items-center justify-between group">
              <div>
                <p className="text-slate-400 font-bold text-sm mb-1">إجمالي مستحقات الموردين</p>
                <h3 className="text-3xl font-black text-slate-900">{supplierStats.totalBalance.toLocaleString()} <span className="text-sm font-medium text-slate-400">جم</span></h3>
              </div>
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                <Truck className="w-7 h-7" />
              </div>
            </div>
          )}
          {activeSection === 'invoices_settlements' && (
            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/50 flex items-center justify-between group">
              <div>
                <p className="text-slate-400 font-bold text-sm mb-1">إجمالي العمليات المسجلة</p>
                <h3 className="text-3xl font-black text-slate-900">{(customers.length + suppliers.length + treasury.length).toLocaleString()} <span className="text-sm font-medium text-slate-400">عملية</span></h3>
              </div>
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                <History className="w-7 h-7" />
              </div>
            </div>
          )}
        </div>

        {/* Action Bar */}
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4 w-full md:w-auto">
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
            {activeSection === 'treasury' || activeSection === 'invoices_settlements' ? (
              <div className="hidden lg:flex items-center gap-2">
                <div className="flex items-center gap-2 bg-slate-50 rounded-2xl px-4 py-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="bg-transparent border-none focus:ring-0 text-sm font-bold" />
                </div>
                <span className="text-slate-300">إلى</span>
                <div className="flex items-center gap-2 bg-slate-50 rounded-2xl px-4 py-2">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="bg-transparent border-none focus:ring-0 text-sm font-bold" />
                </div>
              </div>
            ) : null}
          </div>
          
          {activeSection !== 'invoices_settlements' && (
            <button 
              onClick={() => setShowModal(true)}
              className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition-all shadow-lg"
            >
              <Plus className="w-5 h-5" />
              {activeSection === 'customers' ? 'إضافة حركة عميل' : activeSection === 'suppliers' ? 'إضافة حركة مورد' : 'إضافة عملية خزينة'}
            </button>
          )}
        </div>

        {/* content Table */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  {activeSection === 'treasury' ? (
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
                  <tr key={item.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-8 py-6 font-bold text-slate-900">{item.name}</td>
                    <td className="px-8 py-6 font-medium text-slate-500">{item.invoiceNumber}</td>
                    <td className="px-8 py-6 text-center text-rose-600 font-black">{item.debit.toLocaleString()}</td>
                    <td className="px-8 py-6 text-center text-emerald-600 font-black">{item.credit.toLocaleString()}</td>
                    <td className="px-8 py-6 text-center">
                      <span className={cn(
                        "px-4 py-1.5 rounded-full font-black text-xs",
                        (item.credit - item.debit) >= 0 ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                      )}>
                        {(item.credit - item.debit).toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))}
                {activeSection === 'suppliers' && filteredSuppliers.map(item => (
                  <tr key={item.id} className="hover:bg-emerald-50/30 transition-colors">
                    <td className="px-8 py-6 font-bold text-slate-900">{item.name}</td>
                    <td className="px-8 py-6 font-medium text-slate-500">{item.invoiceNumber}</td>
                    <td className="px-8 py-6 text-center text-rose-600 font-black">{item.debit.toLocaleString()}</td>
                    <td className="px-8 py-6 text-center text-emerald-600 font-black">{item.credit.toLocaleString()}</td>
                    <td className="px-8 py-6 text-center">
                      <span className={cn(
                        "px-4 py-1.5 rounded-full font-black text-xs",
                        (item.credit - item.debit) >= 0 ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                      )}>
                        {(item.credit - item.debit).toLocaleString()}
                      </span>
                    </td>
                  </tr>
                ))}
                {activeSection === 'treasury' && filteredTreasury.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "p-2 rounded-lg",
                          item.type === 'income' ? "bg-emerald-100 text-emerald-600" : item.type === 'expense' ? "bg-rose-100 text-rose-600" : "bg-amber-100 text-amber-600"
                        )}>
                          {item.type === 'income' ? <ArrowUpRight className="w-4 h-4" /> : item.type === 'expense' ? <ArrowDownLeft className="w-4 h-4" /> : <History className="w-4 h-4" />}
                        </div>
                        <span className="font-bold text-slate-900">
                          {item.type === 'income' ? 'إيراد' : item.type === 'expense' ? 'مصروف' : 'تسوية'}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 font-medium text-slate-600">{item.description}</td>
                    <td className={cn(
                      "px-8 py-6 text-center font-black",
                      item.amount > 0 ? "text-emerald-600" : "text-rose-600"
                    )}>
                      {item.amount.toLocaleString()}
                    </td>
                    <td className="px-8 py-6 text-center font-medium text-slate-400">{item.date}</td>
                  </tr>
                ))}
                {activeSection === 'invoices_settlements' && (
                  <>
                    {[
                      { title: 'ملخص فواتير العملاء', data: filteredCustomers, type: 'customers' },
                      { title: 'ملخص فواتير الموردين', data: filteredSuppliers, type: 'suppliers' },
                      { title: 'ملخص حركة الخزينة', data: filteredTreasury, type: 'treasury' }
                    ].map((group, idx) => (
                      <React.Fragment key={idx}>
                        <tr className="bg-slate-100/50">
                          <td colSpan={5} className="px-8 py-4 font-black text-blue-600 text-sm border-y border-slate-200">
                            {group.title}
                          </td>
                        </tr>
                        {group.data.length > 0 ? (
                          group.data.map((item: any) => (
                            <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                              <td className="px-8 py-4 font-bold text-slate-900">
                                {group.type === 'treasury' ? (
                                  <div className="flex items-center gap-2">
                                    <div className={cn(
                                      "p-1.5 rounded-lg",
                                      item.type === 'income' ? "bg-emerald-100 text-emerald-600" : item.type === 'expense' ? "bg-rose-100 text-rose-600" : "bg-amber-100 text-amber-600"
                                    )}>
                                      {item.type === 'income' ? <ArrowUpRight className="w-3 h-3" /> : item.type === 'expense' ? <ArrowDownLeft className="w-3 h-3" /> : <History className="w-3 h-3" />}
                                    </div>
                                    {item.type === 'income' ? 'إيراد' : item.type === 'expense' ? 'مصروف' : 'تسوية'}
                                  </div>
                                ) : item.name}
                              </td>
                              <td className="px-8 py-4 font-medium text-slate-500">
                                {group.type === 'treasury' ? item.description : item.invoiceNumber}
                              </td>
                              <td className="px-8 py-4 text-center text-rose-600 font-bold">
                                {group.type === 'treasury' ? (item.amount < 0 ? Math.abs(item.amount).toLocaleString() : '-') : item.debit.toLocaleString()}
                              </td>
                              <td className="px-8 py-4 text-center text-emerald-600 font-bold">
                                {group.type === 'treasury' ? (item.amount > 0 ? item.amount.toLocaleString() : '-') : item.credit.toLocaleString()}
                              </td>
                              <td className="px-8 py-4 text-center">
                                <span className={cn(
                                  "px-3 py-1 rounded-full font-black text-[10px]",
                                  group.type === 'treasury' ? "bg-blue-100 text-blue-700" : (item.credit - item.debit >= 0 ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700")
                                )}>
                                  {group.type === 'treasury' ? item.date : (item.credit - item.debit).toLocaleString()}
                                </span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={5} className="px-8 py-4 text-center text-slate-400 text-xs italic">لا توجد بيانات مسجلة في هذا القسم</td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </>
                )}
                {(activeSection === 'customers' ? filteredCustomers : activeSection === 'suppliers' ? filteredSuppliers : activeSection === 'treasury' ? filteredTreasury : []).length === 0 && activeSection !== 'invoices_settlements' && (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-4 text-slate-400">
                        <AlertCircle className="w-12 h-12" />
                        <p className="font-bold">لا يوجد سجلات مطابقة للبحث</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Entry Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-2xl font-black text-slate-900">
                  {activeSection === 'customers' ? 'إضافة حركة عميل' : activeSection === 'suppliers' ? 'إضافة حركة مورد' : 'إضافة عملية خزينة'}
                </h3>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>
              
              <form onSubmit={handleAddEntry} className="p-8 space-y-6">
                {activeSection !== 'treasury' ? (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-black text-slate-900 mr-2">{activeSection === 'customers' ? 'اسم العميل' : 'اسم المورد'}</label>
                      <input
                        required
                        type="text"
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold focus:ring-2 focus:ring-blue-500/20"
                        placeholder="أدخل الاسم هنا..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-black text-slate-900 mr-2">رقم الفاتورة</label>
                      <input
                        required
                        type="text"
                        onChange={e => setFormData({ ...formData, invoiceNumber: e.target.value })}
                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold focus:ring-2 focus:ring-blue-500/20"
                        placeholder="مثال: INV-100"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-black text-rose-600 mr-2">مدين (سداد)</label>
                        <input
                          type="number"
                          onChange={e => setFormData({ ...formData, debit: e.target.value })}
                          className="w-full bg-rose-50/50 border-none rounded-2xl px-6 py-4 font-black text-rose-600 focus:ring-2 focus:ring-rose-500/20"
                          placeholder="0.00"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-black text-emerald-600 mr-2">دائن (فاتورة)</label>
                        <input
                          type="number"
                          onChange={e => setFormData({ ...formData, credit: e.target.value })}
                          className="w-full bg-emerald-50/50 border-none rounded-2xl px-6 py-4 font-black text-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-black text-slate-900 mr-2">نوع العملية</label>
                      <select
                        onChange={e => setFormData({ ...formData, type: e.target.value })}
                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold focus:ring-2 focus:ring-blue-500/20"
                      >
                        <option value="income">إيراد</option>
                        <option value="expense">مصروف</option>
                        <option value="adjustment">تسوية</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-black text-slate-900 mr-2">الوصف</label>
                      <input
                        required
                        type="text"
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-bold focus:ring-2 focus:ring-blue-500/20"
                        placeholder="أدخل وصف العملية..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-black text-slate-900 mr-2">المبلغ</label>
                      <input
                        required
                        type="number"
                        onChange={e => setFormData({ ...formData, amount: e.target.value })}
                        className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-black text-lg focus:ring-2 focus:ring-blue-500/20"
                        placeholder="0.00"
                      />
                    </div>
                  </>
                )}
                
                <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-3">
                  <Download className="w-6 h-6" />
                  حفظ البيانات
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

