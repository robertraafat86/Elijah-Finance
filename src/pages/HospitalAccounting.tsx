import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Hospital, 
  Stethoscope, 
  Activity, 
  Pill, 
  Users, 
  ClipboardList, 
  ShieldCheck, 
  Calculator, 
  FileText, 
  TrendingUp, 
  HeartPulse, 
  Microscope, 
  Bed, 
  Syringe, 
  DollarSign, 
  BarChart3, 
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Clock,
  Briefcase,
  Printer,
  Download,
  Search,
  Calendar,
  FileSpreadsheet,
  ArrowLeftRight,
  PieChart,
  ChevronLeft,
  ChevronRight,
  Filter,
  Plus,
  Trash2,
  Scale
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useEffect } from 'react';

export default function HospitalAccounting() {
  const [activeTab, setActiveTab] = useState('intro');
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ from: '2026-03-01', to: '2026-04-06' });
  const [filterType, setFilterType] = useState('all'); // for P&L report
  const [reportRows, setReportRows] = useState<any[]>([]);

  // Initialize report rows when a report is selected
  useEffect(() => {
    if (selectedReport) {
      const defaultData: Record<string, any[]> = {
        'daily-revenue': [
          { id: 1, label: 'إيرادات الكشف', detail: 'العيادات الخارجية', value: 15400, status: 'محصل' },
          { id: 2, label: 'إيرادات العمليات', detail: 'قسم الجراحة العامة', value: 45000, status: 'محصل' },
        ],
        'daily-expenses': [
          { id: 1, label: 'رواتب وأجور', detail: 'طاقم التمريض والإدارة', value: 25000, status: 'مدفوع' },
        ],
        'dept-profit': [
          { id: 1, label: 'قسم الطوارئ', detail: 'إيراد: 50k | مصروف: 30k', value: 20000, status: 'ربح' },
        ],
        'daily-patients': [
          { id: 1, label: 'إجمالي الزيارات', detail: 'العيادات الخارجية', value: '145 حالة', status: 'مكتمل' },
        ],
        'bed-occupancy': [
          { id: 1, label: 'العناية المركزة', detail: 'إشغال 8 من 10', value: '80%', status: 'مرتفع' },
        ],
        'insurance-claims': [
          { id: 1, label: 'شركة بوبا', detail: 'مطالبات شهر مارس', value: 85000, status: 'قيد المراجعة' },
        ],
        'medical-inventory': [
          { id: 1, name: 'شاش معقم', currentQty: 500, minLevel: 100, expiryDate: '2027-12-01', expiredItems: 0, itemsToBuy: 0, purchasePrice: 5.5 },
          { id: 2, name: 'قفازات طبية', currentQty: 200, minLevel: 50, expiryDate: '2026-08-15', expiredItems: 0, itemsToBuy: 0, purchasePrice: 12.0 },
        ],
        'medications': [
          { id: 1, label: 'أوجمنتين 1 جم', detail: 'مضاد حيوي', value: '85 علبة', status: 'نشط' },
        ],
        'doctors-perf': [
          { id: 1, label: 'د. أحمد علي', detail: 'استشاري جراحة', value: '12 عملية', status: 'ممتاز' },
        ],
        'payroll': [
          { id: 1, label: 'طاقم التمريض', detail: 'عدد 25 ممرض/ة', value: 125000, status: 'معتمد' },
        ],
        'cash-flow': [
          { id: 1, label: 'رصيد أول المدة', detail: 'نقدية وبنوك', value: 450000, status: 'مستقر' },
        ],
        'p-and-l': [
          { id: 1, date: '2026-03-01', type: 'إيراد', category: 'عيادات خارجية', amount: 150000, status: 'مكتمل' },
          { id: 2, date: '2026-03-05', type: 'مصروف', category: 'رواتب أطباء', amount: 80000, status: 'مدفوع' },
        ],
        'trial-balance': [
          { id: 1, account: 'الصندوق', debit: 50000, credit: 0 },
          { id: 2, account: 'البنك', debit: 120000, credit: 0 },
          { id: 3, account: 'الموردين', debit: 0, credit: 45000 },
          { id: 4, account: 'إيرادات العمليات', debit: 0, credit: 125000 },
        ],
      };
      setReportRows(defaultData[selectedReport] || []);
    }
  }, [selectedReport]);

  const addRow = () => {
    const newId = reportRows.length > 0 ? Math.max(...reportRows.map(r => r.id as number)) + 1 : 1;
    let newRow = {};
    if (selectedReport === 'medical-inventory') {
      newRow = { id: newId, name: '', currentQty: 0, minLevel: 0, expiryDate: '', expiredItems: 0, itemsToBuy: 0, purchasePrice: 0 };
    } else if (selectedReport === 'p-and-l') {
      newRow = { id: newId, date: '', type: 'إيراد', category: '', amount: 0, status: 'مكتمل' };
    } else if (selectedReport === 'trial-balance') {
      newRow = { id: newId, account: '', debit: 0, credit: 0 };
    } else {
      newRow = { id: newId, label: '', detail: '', value: 0, status: '' };
    }
    setReportRows([...reportRows, newRow]);
  };

  const updateRow = (index: number, field: string, value: any) => {
    const updatedRows = [...reportRows];
    updatedRows[index] = { ...updatedRows[index], [field]: value };
    setReportRows(updatedRows);
  };

  const deleteRow = (index: number) => {
    setReportRows(reportRows.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    if (selectedReport === 'p-and-l') {
      const income = reportRows.filter(r => r.type === 'إيراد').reduce((sum, r) => sum + (Number(r.amount) || 0), 0);
      const expenses = reportRows.filter(r => r.type === 'مصروف').reduce((sum, r) => sum + (Number(r.amount) || 0), 0);
      return { income, expenses, net: income - expenses };
    }
    if (selectedReport === 'medical-inventory') {
      return reportRows.reduce((sum, r) => sum + ((Number(r.currentQty) || 0) * (Number(r.purchasePrice) || 0)), 0);
    }
    if (selectedReport === 'trial-balance') {
      const debit = reportRows.reduce((sum, r) => sum + (Number(r.debit) || 0), 0);
      const credit = reportRows.reduce((sum, r) => sum + (Number(r.credit) || 0), 0);
      return { debit, credit };
    }
    return reportRows.reduce((sum, r) => {
      const val = typeof r.value === 'string' ? parseFloat(r.value.replace(/[^0-9.]/g, '')) : Number(r.value);
      return sum + (val || 0);
    }, 0);
  };

  // Calculators State
  const [patientCost, setPatientCost] = useState({ services: 0, medicine: 0, room: 0 });
  const [surgeryCost, setSurgeryCost] = useState({ doctor: 0, anesthesia: 0, supplies: 0, room: 0 });
  const [occupancy, setOccupancy] = useState({ occupied: 0, total: 100 });
  const [inventory, setInventory] = useState({ opening: 0, purchases: 0, closing: 0 });

  const calmGreen = "#10b981"; // Emerald 500

  return (
    <div className="pt-24 min-h-screen bg-white" dir="rtl">
      {/* SEO Meta Tags */}
      <title>محاسبة المستشفيات | إيليجا للخدمات المالية والمحاسبية</title>
      <meta name="description" content="تعرف على محاسبة المستشفيات، الإيرادات الطبية، المصروفات، شركات التأمين، المخزون الطبي، والتقارير المالية للمراكز الطبية." />

      {/* Hero Section */}
      <section className="bg-primary py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Hospital className="w-96 h-96 absolute -bottom-20 -left-20 text-white" />
          <Stethoscope className="w-64 h-64 absolute top-10 right-10 text-white" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium" style={{ color: calmGreen }}>
              <Activity className="w-4 h-4" />
              <span>دليل المحاسبة في القطاع الطبي</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              محاسبة المستشفيات <span style={{ color: calmGreen }}>والمراكز الطبية</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              شرح شامل واحترافي لإدارة الإيرادات والمصروفات الطبية، والتعامل مع شركات التأمين، وإدارة المخزون الطبي بدقة عالية.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="sticky top-20 z-40 bg-white border-b border-gray-100 shadow-sm overflow-x-auto">
        <div className="container mx-auto px-4">
          <div className="flex gap-8 py-4 whitespace-nowrap">
            {[
              { id: 'intro', label: 'المقدمة والخصائص', icon: <Hospital className="w-4 h-4" /> },
              { id: 'revenue-expense', label: 'الإيرادات والمصروفات', icon: <DollarSign className="w-4 h-4" /> },
              { id: 'cycle', label: 'الدورة المحاسبية', icon: <ClipboardList className="w-4 h-4" /> },
              { id: 'inventory', label: 'المخزون الطبي', icon: <Pill className="w-4 h-4" /> },
              { id: 'insurance', label: 'شركات التأمين', icon: <ShieldCheck className="w-4 h-4" /> },
              { id: 'kpis', label: 'مؤشرات الأداء', icon: <BarChart3 className="w-4 h-4" /> },
              { id: 'reports', label: 'التقارير الجاهزة', icon: <Printer className="w-4 h-4" /> },
              { id: 'tools', label: 'أدوات وحاسبات', icon: <Calculator className="w-4 h-4" /> },
              { id: 'examples', label: 'أمثلة عملية', icon: <Briefcase className="w-4 h-4" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 pb-4 border-b-2 transition-all font-bold text-sm ${
                  activeTab === tab.id 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* 1. Introduction */}
        {activeTab === 'intro' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-primary border-r-4 border-emerald-500 pr-4">مقدمة عن محاسبة المستشفيات</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    <strong className="text-primary">تعريف محاسبة المستشفيات:</strong> هي نظام محاسبي متخصص يهدف إلى تسجيل وتبويب وتحليل العمليات المالية في المنشآت الطبية، مع التركيز على دقة حساب تكلفة الخدمة الطبية وتعدد مصادر الإيراد.
                  </p>
                  <p>
                    <strong className="text-primary">الأهمية:</strong> تكمن أهميتها في الرقابة الصارمة على المخزون الطبي (الأدوية والمستلزمات) وإدارة العلاقة المعقدة مع شركات التأمين الطبي، وضمان استدامة تقديم الخدمة الطبية بجودة عالية.
                  </p>
                  <p>
                    <strong className="text-primary">الفرق عن المحاسبة التجارية:</strong> تتميز بوجود "إيرادات مؤجلة" من شركات التأمين، وتنوع كبير في مراكز التكلفة (أقسام طبية مختلفة)، وضرورة الرقابة على تواريخ صلاحية المخزون الحرج.
                  </p>
                </div>
              </div>
              <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100">
                <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-emerald-600" />
                  أهمية الرقابة المالية الطبية
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: 'الرقابة على الإيرادات', desc: 'ضمان تحصيل رسوم الكشوفات والعمليات بدقة.' },
                    { title: 'إدارة المخزون', desc: 'منع الهدر في الأدوية والمستلزمات الطبية.' },
                    { title: 'مطالبات التأمين', desc: 'تقليل المبالغ المرفوضة من شركات التأمين.' },
                    { title: 'تكلفة الخدمة', desc: 'تحديد السعر العادل للخدمات الطبية.' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-emerald-50">
                      <h4 className="font-bold text-primary text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 2 & 3. Revenue & Expenses */}
        {activeTab === 'revenue-expense' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-primary">أنواع الإيرادات الطبية</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: 'الكشف الطبي', icon: <Stethoscope />, items: ['عيادات خارجية', 'استشارات'] },
                    { title: 'العمليات الجراحية', icon: <Syringe />, items: ['عمليات كبرى', 'عمليات صغرى'] },
                    { title: 'الإقامة الداخلية', icon: <Bed />, items: ['غرف عادية', 'أجنحة', 'عناية'] },
                    { title: 'الأشعة والتحاليل', icon: <Microscope />, items: ['مختبرات', 'أشعة مقطعية'] },
                    { title: 'الصيدلية', icon: <Pill />, items: ['أدوية خارجية', 'مستلزمات'] },
                    { title: 'شركات التأمين', icon: <ShieldCheck />, items: ['مطالبات آجلة', 'نسبة التحمل'] },
                  ].map((rev, i) => (
                    <div key={i} className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                      <div className="flex items-center gap-3 mb-4 text-primary">
                        {rev.icon}
                        <h4 className="font-bold">{rev.title}</h4>
                      </div>
                      <ul className="space-y-1">
                        {rev.items.map((item, j) => (
                          <li key={j} className="text-xs text-gray-500 flex items-center gap-2">
                            <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-primary">أنواع المصروفات الطبية</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: 'الرواتب والأجور', icon: <Users />, items: ['أطباء', 'تمريض', 'إداريين'] },
                    { title: 'المستلزمات الطبية', icon: <Pill />, items: ['أدوية', 'شاش', 'محاليل'] },
                    { title: 'صيانة الأجهزة', icon: <Activity />, items: ['عقود صيانة', 'قطع غيار'] },
                    { title: 'التغذية والنظافة', icon: <ClipboardList />, items: ['وجبات مرضى', 'تعقيم'] },
                    { title: 'المرافق العامة', icon: <TrendingUp />, items: ['كهرباء', 'مياه', 'إيجارات'] },
                    { title: 'مصروفات إدارية', icon: <Briefcase />, items: ['قرطاسية', 'برامج طبية'] },
                  ].map((exp, i) => (
                    <div key={i} className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                      <div className="flex items-center gap-3 mb-4 text-emerald-700">
                        {exp.icon}
                        <h4 className="font-bold">{exp.title}</h4>
                      </div>
                      <ul className="space-y-1">
                        {exp.items.map((item, j) => (
                          <li key={j} className="text-xs text-gray-500 flex items-center gap-2">
                            <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 4 & 5. Cycle & Entries */}
        {activeTab === 'cycle' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-primary">الدورة المحاسبية للمستشفى</h2>
                <div className="space-y-4">
                  {[
                    { step: '1', title: 'تسجيل الإيرادات اليومية', desc: 'إثبات جميع الكشوفات والخدمات المقدمة نقداً أو تأمين.' },
                    { step: '2', title: 'إدارة فواتير المرضى', desc: 'تجميع كافة الخدمات المقدمة للمريض المقيم في فاتورة واحدة.' },
                    { step: '3', title: 'مطالبات التأمين', desc: 'إرسال المطالبات لشركات التأمين ومتابعة الموافقة عليها.' },
                    { step: '4', title: 'تسجيل المصروفات', desc: 'إثبات رواتب الأطباء وتكلفة الأدوية المنصرفة.' },
                    { step: '5', title: 'التقارير المالية', desc: 'إعداد قائمة الدخل لكل قسم طبي على حدة.' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                      <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-bold text-primary">{item.title}</h4>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-primary">قيود محاسبية شائعة</h2>
                <div className="space-y-4">
                  {[
                    { title: 'تحصيل رسوم كشف نقداً', debit: 'حـ/ الصندوق / البنك', credit: 'حـ/ إيرادات العيادات الخارجية' },
                    { title: 'إثبات مستحقات شركة تأمين', debit: 'حـ/ مدينو شركات التأمين', credit: 'حـ/ إيرادات الخدمات الطبية' },
                    { title: 'شراء أدوية للمخزن', debit: 'حـ/ مخزن الأدوية', credit: 'حـ/ الموردين' },
                    { title: 'صرف رواتب الأطباء', debit: 'حـ/ مصروفات الرواتب (أطباء)', credit: 'حـ/ البنك / النقدية' },
                    { title: 'إيرادات الصيدلية الداخلية', debit: 'حـ/ الصندوق / ذمم المرضى', credit: 'حـ/ إيرادات الصيدلية' },
                  ].map((entry, i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <h4 className="font-bold text-emerald-600 text-sm mb-2">{entry.title}</h4>
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div className="p-2 bg-white rounded border border-gray-200">
                          <span className="font-bold text-primary block mb-1">من حـ/ (مدين)</span>
                          {entry.debit}
                        </div>
                        <div className="p-2 bg-white rounded border border-gray-200">
                          <span className="font-bold text-primary block mb-1">إلى حـ/ (دائن)</span>
                          {entry.credit}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 6. Inventory Management */}
        {activeTab === 'inventory' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
            <div className="bg-emerald-600 text-white p-12 rounded-[3rem] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold">إدارة المخزون الطبي</h2>
                  <p className="text-emerald-50 leading-relaxed">
                    المخزون في المستشفيات ليس مجرد أرقام، بل هو حياة مرضى. الرقابة على الأدوية والمستلزمات تتطلب دقة متناهية في متابعة تواريخ الصلاحية والكميات الحرجة.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
                      <h4 className="font-bold mb-1">الجرد الدوري</h4>
                      <p className="text-xs opacity-80">يتم في نهاية كل فترة مالية.</p>
                    </div>
                    <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
                      <h4 className="font-bold mb-1">الجرد المستمر</h4>
                      <p className="text-xs opacity-80">تحديث فوري مع كل حركة صرف.</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: 'متابعة الصلاحية', icon: <Clock /> },
                    { title: 'الأصناف التالفة', icon: <AlertCircle /> },
                    { title: 'تقارير الاستهلاك', icon: <BarChart3 /> },
                    { title: 'الحد الأدنى للطلب', icon: <TrendingUp /> },
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl text-primary text-center space-y-2">
                      <div className="text-emerald-600 mx-auto">{item.icon}</div>
                      <h4 className="font-bold text-sm">{item.title}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 7. Insurance Companies */}
        {activeTab === 'insurance' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-primary">إدارة حسابات شركات التأمين</h2>
                <p className="text-gray-600 leading-relaxed">
                  تعتبر شركات التأمين المصدر الأكبر للإيرادات في المستشفيات الحديثة، ولكنها تتطلب إدارة دقيقة للمطالبات لتجنب الرفض المالي.
                </p>
                <div className="space-y-4">
                  {[
                    { title: 'متابعة المطالبات', desc: 'التأكد من إرسال جميع الفواتير المعتمدة طبياً.' },
                    { title: 'معالجة المرفوضات', desc: 'تحليل أسباب رفض المطالبات وإعادة تقديمها.' },
                    { title: 'نسبة التحمل', desc: 'تحصيل الجزء النقدي من المريض فوراً.' },
                    { title: 'تسوية الفروقات', desc: 'مطابقة المبالغ المحصلة مع المطالبات المرسلة.' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                      <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0" />
                      <div>
                        <h4 className="font-bold text-primary">{item.title}</h4>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[3/2] bg-emerald-50 rounded-3xl border border-emerald-100 flex items-center justify-center p-12">
                   <div className="text-center space-y-4">
                      <ShieldCheck className="w-16 h-16 text-emerald-600 mx-auto opacity-20" />
                      <p className="text-emerald-800/40 font-bold">إدارة التأمين الطبي الذكية</p>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 10. KPIs */}
        {activeTab === 'kpis' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="text-3xl font-bold text-primary">مؤشرات الأداء المالي الطبي (KPIs)</h2>
              <p className="text-gray-500">مقاييس حيوية لتقييم كفاءة إدارة المستشفى مالياً وتشغيلياً.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'معدل إشغال الأسرة', value: '85%', desc: 'نسبة الأسرة المشغولة إلى الإجمالي.' },
                { title: 'متوسط تكلفة المريض', value: '1,200 ج.م', desc: 'إجمالي التكاليف ÷ عدد المرضى.' },
                { title: 'نسبة التحصيل', value: '92%', desc: 'المبالغ المحصلة فعلياً من المطالبات.' },
                { title: 'دوران المخزون الطبي', value: '12 مرة', desc: 'سرعة استهلاك الأدوية والمستلزمات.' },
                { title: 'هامش الربح لكل قسم', value: '25%', desc: 'ربحية كل تخصص طبي على حدة.' },
                { title: 'متوسط الإيراد لكل مريض', value: '2,500 ج.م', desc: 'إجمالي الإيرادات ÷ عدد المرضى.' },
              ].map((kpi, i) => (
                <div key={i} className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm text-center space-y-2">
                  <h4 className="text-sm text-gray-500">{kpi.title}</h4>
                  <p className="text-3xl font-bold text-emerald-600">{kpi.value}</p>
                  <p className="text-xs text-gray-400">{kpi.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 11. Tools & Calculators */}
        {activeTab === 'tools' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Patient Cost Calculator */}
              <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-lg space-y-6">
                <div className="flex items-center gap-3 text-primary">
                  <Calculator className="w-6 h-6" />
                  <h3 className="font-bold">حاسبة تكلفة المريض</h3>
                </div>
                <div className="space-y-4">
                  <input 
                    type="number" placeholder="تكلفة الخدمات الطبية"
                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200"
                    onChange={(e) => setPatientCost({ ...patientCost, services: Number(e.target.value) })}
                  />
                  <input 
                    type="number" placeholder="تكلفة الأدوية"
                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200"
                    onChange={(e) => setPatientCost({ ...patientCost, medicine: Number(e.target.value) })}
                  />
                  <input 
                    type="number" placeholder="تكلفة الإقامة"
                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200"
                    onChange={(e) => setPatientCost({ ...patientCost, room: Number(e.target.value) })}
                  />
                  <div className="p-4 bg-primary text-white rounded-2xl text-center">
                    <p className="text-xs opacity-80 mb-1">إجمالي تكلفة المريض</p>
                    <p className="text-2xl font-bold">
                      {(patientCost.services + patientCost.medicine + patientCost.room).toLocaleString()} ج.م
                    </p>
                  </div>
                </div>
              </div>

              {/* Occupancy Calculator */}
              <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-lg space-y-6">
                <div className="flex items-center gap-3 text-emerald-600">
                  <Bed className="w-6 h-6" />
                  <h3 className="font-bold">حاسبة نسبة إشغال الأسرة</h3>
                </div>
                <div className="space-y-4">
                  <input 
                    type="number" placeholder="عدد الأسرة المشغولة"
                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200"
                    onChange={(e) => setOccupancy({ ...occupancy, occupied: Number(e.target.value) })}
                  />
                  <input 
                    type="number" placeholder="إجمالي عدد الأسرة"
                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200"
                    onChange={(e) => setOccupancy({ ...occupancy, total: Number(e.target.value) })}
                  />
                  <div className="p-4 bg-emerald-600 text-white rounded-2xl text-center">
                    <p className="text-xs opacity-80 mb-1">نسبة الإشغال الحالية</p>
                    <p className="text-2xl font-bold">
                      {occupancy.total > 0 ? ((occupancy.occupied / occupancy.total) * 100).toFixed(1) : 0}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Inventory Calculator */}
              <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-lg space-y-6">
                <div className="flex items-center gap-3 text-blue-600">
                  <Pill className="w-6 h-6" />
                  <h3 className="font-bold">حاسبة تكلفة المخزون المنصرف</h3>
                </div>
                <div className="space-y-4">
                  <input 
                    type="number" placeholder="مخزون أول المدة"
                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200"
                    onChange={(e) => setInventory({ ...inventory, opening: Number(e.target.value) })}
                  />
                  <input 
                    type="number" placeholder="المشتريات خلال الفترة"
                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200"
                    onChange={(e) => setInventory({ ...inventory, purchases: Number(e.target.value) })}
                  />
                  <input 
                    type="number" placeholder="مخزون آخر المدة"
                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200"
                    onChange={(e) => setInventory({ ...inventory, closing: Number(e.target.value) })}
                  />
                  <div className="p-4 bg-blue-600 text-white rounded-2xl text-center">
                    <p className="text-xs opacity-80 mb-1">تكلفة البضاعة المنصرفة</p>
                    <p className="text-2xl font-bold">
                      {(inventory.opening + inventory.purchases - inventory.closing).toLocaleString()} ج.م
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 12. Practical Examples */}
        {activeTab === 'examples' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: 'مستشفى عام كبير', icon: <Hospital />, desc: 'إدارة معقدة لآلاف المرضى، مئات الأطباء، وعشرات شركات التأمين.' },
                { title: 'مركز أشعة وتحاليل', icon: <Microscope />, desc: 'التركيز على تكلفة تشغيل الأجهزة والمواد الكيميائية وإيرادات التعاقدات.' },
                { title: 'عيادة خاصة تخصصية', icon: <Stethoscope />, desc: 'دورة محاسبية بسيطة تركز على إيرادات الكشوفات ومصروفات التشغيل المباشرة.' },
                { title: 'صيدلية مستشفى داخلية', icon: <Pill />, desc: 'إدارة مخزون دقيقة وربط مباشر مع فواتير المرضى المقيمين.' },
              ].map((ex, i) => (
                <div key={i} className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:border-emerald-500 transition-colors">
                  <div className="text-emerald-600 mb-4">{ex.icon}</div>
                  <h3 className="text-xl font-bold text-primary mb-2">{ex.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{ex.desc}</p>
                  <button className="text-emerald-600 text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all">
                    عرض نموذج الدورة المحاسبية
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 13. Reports Section */}
        {activeTab === 'reports' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
            {!selectedReport ? (
              <div className="space-y-12">
                <div className="text-center max-w-3xl mx-auto space-y-4">
                  <h2 className="text-3xl font-bold text-primary">التقارير المحاسبية والطبية الجاهزة للطباعة</h2>
                  <p className="text-gray-600">
                    مجموعة متكاملة من التقارير المصممة خصيصاً لمساعدة الإدارة المالية والطبية على متابعة الأداء بدقة عالية مع دعم كامل للطباعة والتصدير.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {[
                    { id: 'daily-revenue', title: 'تقرير الإيرادات اليومية', icon: <DollarSign />, color: 'bg-blue-50 text-blue-600', desc: 'تفصيل إيرادات الكشف، العمليات، الأشعة، والصيدلية.' },
                    { id: 'daily-expenses', title: 'تقرير المصروفات اليومية', icon: <Calculator />, color: 'bg-red-50 text-red-600', desc: 'متابعة الرواتب، الأدوية، المستلزمات، والمرافق.' },
                    { id: 'dept-profit', title: 'تقرير أرباح الأقسام', icon: <BarChart3 />, color: 'bg-emerald-50 text-emerald-600', desc: 'مقارنة الإيرادات بالمصروفات لكل قسم طبي.' },
                    { id: 'daily-patients', title: 'تقرير المرضى اليومي', icon: <Users />, color: 'bg-purple-50 text-purple-600', desc: 'إحصائيات الدخول، الخروج، العمليات، والزيارات.' },
                    { id: 'bed-occupancy', title: 'تقرير إشغال الأسرة', icon: <Bed />, color: 'bg-orange-50 text-orange-600', desc: 'نسبة الإشغال الحالية وتوافر الأسرة.' },
                    { id: 'insurance-claims', title: 'تقرير شركات التأمين', icon: <ShieldCheck />, color: 'bg-indigo-50 text-indigo-600', desc: 'متابعة المطالبات، المبالغ المسددة، والمرفوضة.' },
                    { id: 'medical-inventory', title: 'تقرير المخزون الطبي', icon: <ClipboardList />, color: 'bg-teal-50 text-teal-600', desc: 'الكميات الحالية، الحد الأدنى، وتواريخ الصلاحية.' },
                    { id: 'medications', title: 'تقرير الأدوية', icon: <Pill />, color: 'bg-pink-50 text-pink-600', desc: 'الأدوية الأكثر استخداماً وتكلفة الأدوية الشهرية.' },
                    { id: 'doctors-perf', title: 'تقرير الأطباء', icon: <Stethoscope />, color: 'bg-cyan-50 text-cyan-600', desc: 'عدد الحالات، العمليات، وإجمالي مستحقات الطبيب.' },
                    { id: 'payroll', title: 'تقرير الرواتب', icon: <Briefcase />, color: 'bg-slate-50 text-slate-600', desc: 'صافي الرواتب، الحوافز، والخصومات لكل موظف.' },
                    { id: 'cash-flow', title: 'تقرير التدفقات النقدية', icon: <ArrowLeftRight />, color: 'bg-lime-50 text-lime-600', desc: 'المقبوضات والمدفوعات والرصيد اليومي والشهري.' },
                    { id: 'p-and-l', title: 'تقرير الأرباح والخسائر', icon: <PieChart />, color: 'bg-rose-50 text-rose-600', desc: 'صافي الربح النهائي ومقارنة بالأشهر السابقة.' },
                    { id: 'trial-balance', title: 'ميزان المراجعة', icon: <Scale />, color: 'bg-amber-50 text-amber-600', desc: 'عرض الأرصدة المدينة والدائنة لكل حساب محاسبي.' },
                  ].map((report) => (
                    <motion.button
                      key={report.id}
                      whileHover={{ y: -5 }}
                      onClick={() => setSelectedReport(report.id)}
                      className="flex flex-col items-start p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all text-right group"
                    >
                      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", report.color)}>
                        {report.icon}
                      </div>
                      <h3 className="font-bold text-primary mb-2">{report.title}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">{report.desc}</p>
                      <div className="mt-4 flex items-center gap-2 text-emerald-600 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>عرض التقرير</span>
                        <ArrowLeft className="w-3 h-3" />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Report Header Controls */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50 p-6 rounded-3xl border border-gray-100">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setSelectedReport(null)}
                      className="p-2 hover:bg-white rounded-full transition-colors text-gray-500"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                    <div>
                      <h2 className="text-xl font-bold text-primary">
                        {selectedReport === 'daily-revenue' && 'تقرير الإيرادات اليومية'}
                        {selectedReport === 'daily-expenses' && 'تقرير المصروفات اليومية'}
                        {selectedReport === 'dept-profit' && 'تقرير أرباح الأقسام'}
                        {selectedReport === 'daily-patients' && 'تقرير المرضى اليومي'}
                        {selectedReport === 'bed-occupancy' && 'تقرير إشغال الأسرة'}
                        {selectedReport === 'insurance-claims' && 'تقرير شركات التأمين'}
                        {selectedReport === 'medical-inventory' && 'تقرير المخزون الطبي'}
                        {selectedReport === 'medications' && 'تقرير الأدوية'}
                        {selectedReport === 'doctors-perf' && 'تقرير الأطباء'}
                        {selectedReport === 'payroll' && 'تقرير الرواتب'}
                        {selectedReport === 'cash-flow' && 'تقرير التدفقات النقدية'}
                        {selectedReport === 'p-and-l' && 'تقرير الأرباح والخسائر'}
                        {selectedReport === 'trial-balance' && 'ميزان المراجعة'}
                      </h2>
                      <p className="text-xs text-gray-500">تاريخ التقرير: {new Date().toLocaleDateString('ar-EG')}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    {selectedReport === 'p-and-l' && (
                      <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-gray-200">
                        <Filter className="w-4 h-4 text-gray-400" />
                        <select 
                          value={filterType}
                          onChange={(e) => setFilterType(e.target.value)}
                          className="text-xs outline-none bg-transparent font-bold text-primary"
                        >
                          <option value="all">الكل</option>
                          <option value="إيراد">الإيرادات</option>
                          <option value="مصروف">المصروفات</option>
                        </select>
                      </div>
                    )}
                    <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-gray-200">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <input 
                        type="date" 
                        value={dateRange.from}
                        onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
                        className="text-xs outline-none bg-transparent"
                      />
                      <span className="text-gray-300">|</span>
                      <input 
                        type="date" 
                        value={dateRange.to}
                        onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
                        className="text-xs outline-none bg-transparent"
                      />
                    </div>
                    <div className="relative">
                      <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="بحث..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pr-9 pl-4 py-2 bg-white rounded-xl border border-gray-200 text-xs outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                      />
                    </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={addRow}
                          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all text-xs font-bold print:hidden"
                        >
                          <Plus className="w-4 h-4" />
                          إضافة سطر
                        </button>
                        <button 
                          onClick={() => setReportRows([])}
                          className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-100 rounded-xl hover:bg-red-100 transition-all text-xs font-bold print:hidden"
                          title="مسح كافة البيانات"
                        >
                          <Trash2 className="w-4 h-4" />
                          مسح البيانات
                        </button>
                        <button 
                          onClick={() => window.print()}
                          className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 transition-all print:hidden" 
                          title="طباعة"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                      <button 
                        onClick={() => alert('جاري تجهيز ملف PDF للتحميل...')}
                        className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all print:hidden" 
                        title="تصدير PDF"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {
                          const csvContent = "data:text/csv;charset=utf-8," + "ID,Category,Detail,Value,Status\n" + 
                            "1,Revenue,Clinics,15000,Success\n2,Expense,Salaries,8000,Paid";
                          const encodedUri = encodeURI(csvContent);
                          const link = document.createElement("a");
                          link.setAttribute("href", encodedUri);
                          link.setAttribute("download", "report.csv");
                          document.body.appendChild(link);
                          link.click();
                        }}
                        className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-green-50 hover:text-green-600 transition-all print:hidden" 
                        title="تصدير Excel"
                      >
                        <FileSpreadsheet className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Printable Report Content */}
                <div className="bg-white border border-gray-200 rounded-[2rem] shadow-sm overflow-hidden print:border-none print:shadow-none">
                  {/* Report Header for Print */}
                  <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white font-bold text-2xl">E</div>
                      <div>
                        <h1 className="text-2xl font-bold text-primary">إيليجا للخدمات المالية</h1>
                        <p className="text-xs text-gray-500">قسم المحاسبة الطبية والمستشفيات</p>
                      </div>
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-primary">تقرير رسمي</h3>
                      <p className="text-xs text-gray-500">المستخدم: روبرت رأفت</p>
                      <p className="text-xs text-gray-500">تاريخ الطباعة: {new Date().toLocaleString('ar-EG')}</p>
                    </div>
                  </div>

                  {/* Report Table */}
                  <div className="p-8 overflow-x-auto">
                    {selectedReport === 'p-and-l' && (() => {
                      const totals = calculateTotal() as { income: number, expenses: number, net: number };
                      return (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 print:mb-4">
                          <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-center">
                            <div className="flex items-center justify-center gap-2 text-emerald-600 mb-1">
                              <TrendingUp className="w-4 h-4" />
                              <span className="text-xs font-bold">إجمالي الإيرادات</span>
                            </div>
                            <p className="text-xl font-bold text-emerald-700">{totals.income.toLocaleString()} ج.م</p>
                          </div>
                          <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-center">
                            <div className="flex items-center justify-center gap-2 text-red-600 mb-1">
                              <TrendingUp className="w-4 h-4 rotate-180" />
                              <span className="text-xs font-bold">إجمالي المصروفات</span>
                            </div>
                            <p className="text-xl font-bold text-red-700">{totals.expenses.toLocaleString()} ج.م</p>
                          </div>
                          <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl text-center">
                            <div className="flex items-center justify-center gap-2 text-blue-600 mb-1">
                              <DollarSign className="w-4 h-4" />
                              <span className="text-xs font-bold">صافي الربح</span>
                            </div>
                            <p className="text-xl font-bold text-blue-700">{totals.net.toLocaleString()} ج.م</p>
                          </div>
                          <div className="p-4 bg-purple-50 border border-purple-100 rounded-2xl text-center">
                            <div className="flex items-center justify-center gap-2 text-purple-600 mb-1">
                              <PieChart className="w-4 h-4" />
                              <span className="text-xs font-bold">هامش الربح</span>
                            </div>
                            <p className="text-xl font-bold text-purple-700">
                              {totals.income > 0 ? ((totals.net / totals.income) * 100).toFixed(1) : 0}%
                            </p>
                          </div>
                        </div>
                      );
                    })()}
                    <table className="w-full text-right border-collapse">
                      <thead className="sticky top-0 z-10">
                        <tr className="bg-primary text-white">
                          {selectedReport === 'medical-inventory' ? (
                            <>
                              <th className="p-4 rounded-tr-xl font-bold text-sm">#</th>
                              <th className="p-4 font-bold text-sm">اسم الصنف</th>
                              <th className="p-4 font-bold text-sm">الكمية الحالية</th>
                              <th className="p-4 font-bold text-sm">سعر الشراء</th>
                              <th className="p-4 font-bold text-sm">القيمة النهائية</th>
                              <th className="p-4 font-bold text-sm">الحد الأدنى</th>
                              <th className="p-4 font-bold text-sm">تاريخ الصلاحية</th>
                              <th className="p-4 font-bold text-sm">الأصناف المنتهية</th>
                              <th className="p-4 font-bold text-sm">المطلوب شراؤه</th>
                              <th className="p-4 rounded-tl-xl font-bold text-sm print:hidden">إجراء</th>
                            </>
                          ) : selectedReport === 'p-and-l' ? (
                            <>
                              <th className="p-4 rounded-tr-xl font-bold text-sm">#</th>
                              <th className="p-4 font-bold text-sm">التاريخ</th>
                              <th className="p-4 font-bold text-sm">النوع</th>
                              <th className="p-4 font-bold text-sm">الفئة / القسم</th>
                              <th className="p-4 font-bold text-sm">المبلغ</th>
                              <th className="p-4 font-bold text-sm">الحالة</th>
                              <th className="p-4 rounded-tl-xl font-bold text-sm print:hidden">إجراء</th>
                            </>
                          ) : selectedReport === 'trial-balance' ? (
                            <>
                              <th className="p-4 rounded-tr-xl font-bold text-sm">#</th>
                              <th className="p-4 font-bold text-sm">الحساب</th>
                              <th className="p-4 font-bold text-sm text-emerald-600">مدين</th>
                              <th className="p-4 font-bold text-sm text-red-600">دائن</th>
                              <th className="p-4 rounded-tl-xl font-bold text-sm print:hidden">إجراء</th>
                            </>
                          ) : (
                            <>
                              <th className="p-4 rounded-tr-xl font-bold text-sm">#</th>
                              <th className="p-4 font-bold text-sm">البيان / القسم</th>
                              <th className="p-4 font-bold text-sm">التفاصيل</th>
                              <th className="p-4 font-bold text-sm">القيمة / العدد</th>
                              <th className="p-4 font-bold text-sm">الحالة</th>
                              <th className="p-4 rounded-tl-xl font-bold text-sm print:hidden">إجراء</th>
                            </>
                          )}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {reportRows.map((row, index) => (
                          <tr key={row.id} className="hover:bg-gray-50 transition-colors group">
                            {selectedReport === 'medical-inventory' ? (
                              <>
                                <td className="p-4 text-sm text-gray-500">{index + 1}</td>
                                <td className="p-2">
                                  <input 
                                    type="text" value={row.name} 
                                    onChange={(e) => updateRow(index, 'name', e.target.value)}
                                    className="w-full p-2 bg-transparent border-b border-transparent focus:border-emerald-500 outline-none text-sm font-bold text-primary"
                                  />
                                </td>
                                <td className="p-2">
                                  <input 
                                    type="number" value={row.currentQty} 
                                    onChange={(e) => updateRow(index, 'currentQty', e.target.value)}
                                    className="w-full p-2 bg-transparent border-b border-transparent focus:border-emerald-500 outline-none text-sm"
                                  />
                                </td>
                                <td className="p-2">
                                  <input 
                                    type="number" value={row.purchasePrice} 
                                    onChange={(e) => updateRow(index, 'purchasePrice', e.target.value)}
                                    className="w-full p-2 bg-transparent border-b border-transparent focus:border-emerald-500 outline-none text-sm font-bold text-blue-600"
                                  />
                                </td>
                                <td className="p-2">
                                  <div className="w-full p-2 text-sm font-bold text-emerald-600">
                                    {((Number(row.currentQty) || 0) * (Number(row.purchasePrice) || 0)).toLocaleString()} ج.م
                                  </div>
                                </td>
                                <td className="p-2">
                                  <input 
                                    type="number" value={row.minLevel} 
                                    onChange={(e) => updateRow(index, 'minLevel', e.target.value)}
                                    className="w-full p-2 bg-transparent border-b border-transparent focus:border-emerald-500 outline-none text-sm"
                                  />
                                </td>
                                <td className="p-2">
                                  <input 
                                    type="date" value={row.expiryDate} 
                                    onChange={(e) => updateRow(index, 'expiryDate', e.target.value)}
                                    className="w-full p-2 bg-transparent border-b border-transparent focus:border-emerald-500 outline-none text-sm"
                                  />
                                </td>
                                <td className="p-2">
                                  <input 
                                    type="number" value={row.expiredItems} 
                                    onChange={(e) => updateRow(index, 'expiredItems', e.target.value)}
                                    className="w-full p-2 bg-transparent border-b border-transparent focus:border-emerald-500 outline-none text-sm text-red-600 font-bold"
                                  />
                                </td>
                                <td className="p-2">
                                  <input 
                                    type="number" value={row.itemsToBuy} 
                                    onChange={(e) => updateRow(index, 'itemsToBuy', e.target.value)}
                                    className="w-full p-2 bg-transparent border-b border-transparent focus:border-emerald-500 outline-none text-sm text-blue-600 font-bold"
                                  />
                                </td>
                              </>
                            ) : selectedReport === 'p-and-l' ? (
                              <>
                                <td className="p-4 text-sm text-gray-500">{index + 1}</td>
                                <td className="p-2">
                                  <input 
                                    type="date" value={row.date} 
                                    onChange={(e) => updateRow(index, 'date', e.target.value)}
                                    className="w-full p-2 bg-transparent border-b border-transparent focus:border-emerald-500 outline-none text-sm"
                                  />
                                </td>
                                <td className="p-2">
                                  <select 
                                    value={row.type} 
                                    onChange={(e) => updateRow(index, 'type', e.target.value)}
                                    className={cn(
                                      "w-full p-2 rounded-lg font-bold text-xs outline-none",
                                      row.type === 'إيراد' ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                                    )}
                                  >
                                    <option value="إيراد">إيراد</option>
                                    <option value="مصروف">مصروف</option>
                                  </select>
                                </td>
                                <td className="p-2">
                                  <input 
                                    type="text" value={row.category} 
                                    onChange={(e) => updateRow(index, 'category', e.target.value)}
                                    className="w-full p-2 bg-transparent border-b border-transparent focus:border-emerald-500 outline-none text-sm font-bold text-primary"
                                  />
                                </td>
                                <td className="p-2">
                                  <input 
                                    type="number" value={row.amount} 
                                    onChange={(e) => updateRow(index, 'amount', e.target.value)}
                                    className={cn(
                                      "w-full p-2 bg-transparent border-b border-transparent focus:border-emerald-500 outline-none text-sm font-bold",
                                      row.type === 'إيراد' ? "text-emerald-600" : "text-red-600"
                                    )}
                                  />
                                </td>
                                <td className="p-2">
                                  <input 
                                    type="text" value={row.status} 
                                    onChange={(e) => updateRow(index, 'status', e.target.value)}
                                    className="w-full p-2 bg-transparent border-b border-transparent focus:border-emerald-500 outline-none text-xs text-blue-600"
                                  />
                                </td>
                              </>
                            ) : selectedReport === 'trial-balance' ? (
                              <>
                                <td className="p-4 text-sm text-gray-500">{index + 1}</td>
                                <td className="p-2">
                                  <input 
                                    type="text" value={row.account} 
                                    onChange={(e) => updateRow(index, 'account', e.target.value)}
                                    className="w-full p-2 bg-transparent border-b border-transparent focus:border-emerald-500 outline-none text-sm font-bold text-primary"
                                  />
                                </td>
                                <td className="p-2">
                                  <input 
                                    type="number" value={row.debit} 
                                    onChange={(e) => updateRow(index, 'debit', e.target.value)}
                                    className="w-full p-2 bg-transparent border-b border-transparent focus:border-emerald-500 outline-none text-sm font-bold text-emerald-600"
                                  />
                                </td>
                                <td className="p-2">
                                  <input 
                                    type="number" value={row.credit} 
                                    onChange={(e) => updateRow(index, 'credit', e.target.value)}
                                    className="w-full p-2 bg-transparent border-b border-transparent focus:border-emerald-500 outline-none text-sm font-bold text-red-600"
                                  />
                                </td>
                              </>
                            ) : (
                              <>
                                <td className="p-4 text-sm text-gray-500">{index + 1}</td>
                                <td className="p-2">
                                  <input 
                                    type="text" value={row.label} 
                                    onChange={(e) => updateRow(index, 'label', e.target.value)}
                                    className="w-full p-2 bg-transparent border-b border-transparent focus:border-emerald-500 outline-none text-sm font-bold text-primary"
                                  />
                                </td>
                                <td className="p-2">
                                  <input 
                                    type="text" value={row.detail} 
                                    onChange={(e) => updateRow(index, 'detail', e.target.value)}
                                    className="w-full p-2 bg-transparent border-b border-transparent focus:border-emerald-500 outline-none text-sm text-gray-600"
                                  />
                                </td>
                                <td className="p-2">
                                  <input 
                                    type="text" value={row.value} 
                                    onChange={(e) => updateRow(index, 'value', e.target.value)}
                                    className="w-full p-2 bg-transparent border-b border-transparent focus:border-emerald-500 outline-none text-sm font-bold text-emerald-600"
                                  />
                                </td>
                                <td className="p-2">
                                  <input 
                                    type="text" value={row.status} 
                                    onChange={(e) => updateRow(index, 'status', e.target.value)}
                                    className="w-full p-2 bg-transparent border-b border-transparent focus:border-emerald-500 outline-none text-xs text-blue-600"
                                  />
                                </td>
                              </>
                            )}
                            <td className="p-2 text-center print:hidden">
                              <button 
                                onClick={() => deleteRow(index)}
                                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      {selectedReport === 'medical-inventory' && (
                        <tfoot>
                          <tr className="bg-gray-50 font-bold">
                            <td colSpan={4} className="p-4 text-left text-primary">إجمالي قيمة المخزون:</td>
                            <td className="p-4 text-emerald-600 text-lg">{(calculateTotal() as number).toLocaleString()} ج.م</td>
                            <td colSpan={4}></td>
                            <td className="print:hidden"></td>
                          </tr>
                        </tfoot>
                      )}
                      {selectedReport === 'daily-revenue' && (
                        <tfoot>
                          <tr className="bg-gray-50 font-bold">
                            <td colSpan={3} className="p-4 text-left text-primary">إجمالي الإيرادات اليومية:</td>
                            <td className="p-4 text-emerald-600 text-lg">{(calculateTotal() as number).toLocaleString()} ج.م</td>
                            <td></td>
                            <td className="print:hidden"></td>
                          </tr>
                        </tfoot>
                      )}
                      {selectedReport === 'p-and-l' && (
                        <tfoot>
                          <tr className="bg-gray-50 font-bold">
                            <td colSpan={4} className="p-4 text-left text-primary">صافي الربح النهائي:</td>
                            <td className="p-4 text-emerald-600 text-lg">{(calculateTotal() as {net: number}).net.toLocaleString()} ج.م</td>
                            <td></td>
                            <td className="print:hidden"></td>
                          </tr>
                        </tfoot>
                      )}
                      {selectedReport === 'trial-balance' && (
                        <tfoot>
                          <tr className={cn(
                            "bg-gray-50 font-bold",
                            (calculateTotal() as {debit: number, credit: number}).debit === (calculateTotal() as {debit: number, credit: number}).credit 
                              ? "text-emerald-600" 
                              : "text-red-600"
                          )}>
                            <td colSpan={2} className="p-4 text-left text-primary">إجمالي الأرصدة:</td>
                            <td className="p-4 text-lg">{(calculateTotal() as {debit: number, credit: number}).debit.toLocaleString()} ج.م</td>
                            <td className="p-4 text-lg">{(calculateTotal() as {debit: number, credit: number}).credit.toLocaleString()} ج.م</td>
                            <td className="print:hidden"></td>
                          </tr>
                        </tfoot>
                      )}
                      {!['medical-inventory', 'daily-revenue', 'p-and-l', 'trial-balance'].includes(selectedReport || '') && (
                        <tfoot>
                          <tr className="bg-gray-50 font-bold">
                            <td colSpan={3} className="p-4 text-left text-primary">الإجمالي:</td>
                            <td className="p-4 text-emerald-600 text-lg">{(calculateTotal() as number).toLocaleString()}</td>
                            <td></td>
                            <td className="print:hidden"></td>
                          </tr>
                        </tfoot>
                      )}
                    </table>
                  </div>

                  {/* Report Footer */}
                  <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                    <p className="text-xs text-gray-400">جميع الحقوق محفوظة © إيليجا للخدمات المالية {new Date().getFullYear()}</p>
                    <div className="flex gap-8">
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-4">توقيع المدير المالي</p>
                        <div className="w-32 h-px bg-gray-300"></div>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500 mb-4">ختم المستشفى</p>
                        <div className="w-32 h-px bg-gray-300"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              هل تدير منشأة طبية وتريد <span style={{ color: calmGreen }}>نظاماً محاسبياً دقيقاً؟</span>
            </h2>
            <p className="text-white/80 text-xl">
              نحن نساعدك في بناء نظام مالي متكامل يغطي الإيرادات، المصروفات، المخزون، وشركات التأمين باحترافية تامة.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-emerald-600 text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-emerald-700 transition-all shadow-2xl">
                اطلب استشارة مالية طبية
              </button>
              <button className="bg-white/10 text-white border border-white/20 px-12 py-5 rounded-full font-bold text-xl hover:bg-white/20 transition-all">
                تواصل معنا واتساب
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
