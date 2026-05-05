import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  HardHat, 
  Calculator, 
  FileText, 
  TrendingUp, 
  ShieldCheck, 
  Layers, 
  Clock, 
  Truck, 
  Users, 
  Hammer, 
  Coins, 
  Gavel, 
  BarChart3, 
  CheckCircle2, 
  AlertCircle,
  ArrowLeft,
  Briefcase,
  PieChart,
  ClipboardList,
  Printer,
  Download,
  Search,
  Calendar,
  FileSpreadsheet,
  ArrowLeftRight,
  ChevronLeft,
  ChevronRight,
  Filter,
  Plus,
  Trash2
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useEffect } from 'react';

export default function ConstructionAccounting() {
  const [activeTab, setActiveTab] = useState('intro');
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ from: '2026-03-01', to: '2026-04-06' });
  const [filterType, setFilterType] = useState('all');
  const [reportRows, setReportRows] = useState<any[]>([]);

  // Initialize report rows when a report is selected
  useEffect(() => {
    if (selectedReport) {
      const defaultData: Record<string, any[]> = {
        'project-cost': [
          { id: 1, label: 'بند الخرسانات', detail: 'مشروع برج النيل', value: 450000, status: 'تحت التنفيذ' },
          { id: 2, label: 'بند الحفر', detail: 'مشروع فيلا التجمع', value: 85000, status: 'مكتمل' },
        ],
        'project-p-and-l': [
          { id: 1, label: 'مشروع العاصمة الإدارية', detail: 'إيراد: 2M | مصروف: 1.5M', value: 500000, status: 'ربح' },
        ],
        'completion-rates': [
          { id: 1, label: 'مشروع العلمين', detail: 'المرحلة الأولى', value: '75%', status: 'جيد' },
        ],
        'extracts-aging': [
          { id: 1, label: 'مستخلص رقم 5', detail: 'شركة المقاولون العرب', value: 125000, status: 'متأخر' },
        ],
        'subcontractors': [
          { id: 1, label: 'مقاول السباكة', detail: 'مشروع الشيخ زايد', value: 45000, status: 'قيد الصرف' },
        ],
        'balance-sheet': [
          { id: 1, label: 'الأصول الثابتة', detail: 'معدات ثقيلة', value: 1500000, status: 'نشط' },
        ],
      };
      setReportRows(defaultData[selectedReport] || []);
    }
  }, [selectedReport]);

  const addRow = () => {
    const newId = reportRows.length > 0 ? Math.max(...reportRows.map(r => r.id as number)) + 1 : 1;
    const newRow = { id: newId, label: '', detail: '', value: 0, status: '' };
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
    return reportRows.reduce((sum, r) => {
      const val = typeof r.value === 'string' ? parseFloat(r.value.replace(/[^0-9.]/g, '')) : Number(r.value);
      return sum + (val || 0);
    }, 0);
  };

  // Calculators State
  const [completion, setCompletion] = useState({ costToDate: 0, totalEstimatedCost: 0, contractValue: 0 });
  const [extract, setExtract] = useState({ totalValue: 0, advanceDeduction: 0, retention: 5, tax: 5 });
  const [taxCalc, setTaxCalc] = useState({ amount: 0, rate: 14 });
  const [insuranceCalc, setInsuranceCalc] = useState({ wages: 0, rate: 12 });
  const [profitCalc, setProfitCalc] = useState({ contractValue: 0, estimatedCost: 0 });

  const goldColor = "#D4AF37";

  return (
    <div className="pt-24 min-h-screen bg-white" dir="rtl">
      {/* SEO Meta Tags (Handled by framework usually, but adding for context) */}
      <title>محاسبة المقاولات | إيليجا للخدمات المالية والمحاسبية</title>
      <meta name="description" content="تعرف على محاسبة المقاولات، نسب الإنجاز، المستخلصات، الضرائب، والتكاليف الخاصة بالمشروعات بطريقة احترافية." />

      {/* Hero Section */}
      <section className="bg-primary py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Building2 className="w-96 h-96 absolute -bottom-20 -left-20 text-white" />
          <HardHat className="w-64 h-64 absolute top-10 right-10 text-white" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium" style={{ color: goldColor }}>
              <HardHat className="w-4 h-4" />
              <span>دليل المحاسب في شركات المقاولات</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              محاسبة المقاولات <span style={{ color: goldColor }}>والتطوير العقاري</span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              شرح شامل واحترافي للدورة المحاسبية في شركات المقاولات، من فتح حساب المشروع وحتى الإقفال الختامي، مع أدوات وحاسبات تفاعلية.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="sticky top-20 z-40 bg-white border-b border-gray-100 shadow-sm overflow-x-auto">
        <div className="container mx-auto px-4">
          <div className="flex gap-8 py-4 whitespace-nowrap">
            {[
              { id: 'intro', label: 'المقدمة والخصائص', icon: <Building2 className="w-4 h-4" /> },
              { id: 'cycle', label: 'الدورة المحاسبية', icon: <RefreshCw className="w-4 h-4" /> },
              { id: 'costs', label: 'التكاليف والقيود', icon: <Coins className="w-4 h-4" /> },
              { id: 'completion', label: 'نسب الإنجاز', icon: <TrendingUp className="w-4 h-4" /> },
              { id: 'extracts', label: 'المستخلصات', icon: <FileText className="w-4 h-4" /> },
              { id: 'taxes', label: 'الضرائب والتأمينات', icon: <Gavel className="w-4 h-4" /> },
              { id: 'tools', label: 'أدوات وحاسبات', icon: <Calculator className="w-4 h-4" /> },
              { id: 'examples', label: 'أمثلة عملية', icon: <ClipboardList className="w-4 h-4" /> },
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
        {/* 1 & 2. Introduction & Characteristics */}
        {activeTab === 'intro' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-primary border-r-4 border-accent pr-4">مقدمة عن محاسبة المقاولات</h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    <strong className="text-primary">تعريف محاسبة المقاولات:</strong> هي فرع متخصص من المحاسبة المالية يهدف إلى تتبع التكاليف والإيرادات الخاصة بكل مشروع إنشائي على حدة، نظراً لطبيعة النشاط التي تعتمد على "نظام الأوامر الإنتاجية" أو "المشروعات".
                  </p>
                  <p>
                    <strong className="text-primary">الفرق بين المحاسبة التجارية والمقاولات:</strong> في المحاسبة التجارية، يتم بيع سلع جاهزة بدورة نقدية سريعة، بينما في المقاولات، يتم "تصنيع" المنتج (المبنى) في موقع العميل ولفترات زمنية طويلة قد تتجاوز السنة المالية.
                  </p>
                  <p>
                    <strong className="text-primary">الأهمية:</strong> تكمن أهميتها في الرقابة الصارمة على التكاليف (مواد، أجور، باطن) لضمان عدم تجاوز الموازنة التقديرية وتحقيق الربح المستهدف.
                  </p>
                </div>
              </div>
              <div className="bg-secondary p-8 rounded-3xl border border-gray-200">
                <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                  <Layers className="w-6 h-6 text-accent" />
                  خصائص محاسبة المقاولات
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: 'تعدد المشروعات', desc: 'إدارة عدة مواقع في أماكن جغرافية مختلفة.' },
                    { title: 'طول مدة التنفيذ', desc: 'المشروعات قد تستغرق سنوات للانتهاء.' },
                    { title: 'مراحل الإنجاز', desc: 'تقسيم العمل إلى مراحل (حفر، خرسانات، تشطيب).' },
                    { title: 'المستخلصات', desc: 'نظام الفوترة الدوري بناءً على ما تم تنفيذه.' },
                    { title: 'الدفعات المقدمة', desc: 'تمويل المشروع من قبل العميل في البداية.' },
                    { title: 'تنوع التكاليف', desc: 'تداخل تكاليف المواد والعمالة ومقاولي الباطن.' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                      <h4 className="font-bold text-primary text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 3. Accounting Cycle */}
        {activeTab === 'cycle' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="text-3xl font-bold text-primary">الدورة المحاسبية للمشروعات</h2>
              <p className="text-gray-500">خطوات متسلسلة تضمن الرقابة المالية الكاملة على كل مشروع.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { step: '1', title: 'فتح حساب المشروع', desc: 'تخصيص كود محاسبي مستقل لكل مشروع في شجرة الحسابات.', icon: <Briefcase /> },
                { step: '2', title: 'تسجيل المصروفات', desc: 'إثبات تكاليف المواد والعمالة والمعدات الموجهة للمشروع.', icon: <Coins /> },
                { step: '3', title: 'متابعة الإنجاز', desc: 'التنسيق مع المكتب الفني لتحديد نسبة الإنجاز الفعلية.', icon: <TrendingUp /> },
                { step: '4', title: 'إعداد المستخلصات', desc: 'إصدار فواتير دورية (مستخلصات) للعميل بناءً على الإنجاز.', icon: <FileText /> },
                { step: '5', title: 'القيود المحاسبية', desc: 'تسجيل قيود الاستحقاق والتحصيل وحجز الضمانات.', icon: <Calculator /> },
                { step: '6', title: 'إقفال المشروع', desc: 'مقارنة التكلفة الفعلية بالتقديرية وتحديد الربح النهائي.', icon: <CheckCircle2 /> },
              ].map((item, i) => (
                <div key={i} className="relative p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl border-4 border-white">
                    {item.step}
                  </div>
                  <div className="text-accent mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 4 & 5. Costs & Entries */}
        {activeTab === 'costs' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-primary">أنواع التكاليف في المقاولات</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: 'تكلفة المواد', icon: <Truck />, items: ['أسمنت', 'حديد', 'رمل', 'طوب'] },
                    { title: 'تكلفة العمالة', icon: <Users />, items: ['مهندسين', 'فنيين', 'عمالة يومية'] },
                    { title: 'تكلفة المعدات', icon: <Hammer />, items: ['أوناش', 'خلاطات', 'حفارات'] },
                    { title: 'مقاولي الباطن', icon: <Layers />, items: ['سباكة', 'كهرباء', 'دهانات'] },
                    { title: 'مصروفات غير مباشرة', icon: <BarChart3 />, items: ['إيجار موقع', 'كهرباء موقع', 'تأمينات'] },
                    { title: 'مصروفات إدارية', icon: <ShieldCheck />, items: ['رواتب الإدارة', 'إيجار المكتب الرئيسي'] },
                  ].map((cost, i) => (
                    <div key={i} className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="flex items-center gap-3 mb-4 text-primary">
                        {cost.icon}
                        <h4 className="font-bold">{cost.title}</h4>
                      </div>
                      <ul className="space-y-1">
                        {cost.items.map((item, j) => (
                          <li key={j} className="text-xs text-gray-500 flex items-center gap-2">
                            <span className="w-1 h-1 bg-accent rounded-full"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <h2 className="text-3xl font-bold text-primary">قيود محاسبية شائعة</h2>
                <div className="space-y-4">
                  {[
                    { title: 'شراء مواد للمشروع', debit: 'حـ/ تكاليف العمليات (مواد - مشروع X)', credit: 'حـ/ الموردين / النقدية' },
                    { title: 'صرف أجور العمال', debit: 'حـ/ تكاليف العمليات (أجور - مشروع X)', credit: 'حـ/ النقدية / البنك' },
                    { title: 'إثبات مستخلص عميل', debit: 'حـ/ العملاء (مشروع X)', credit: 'حـ/ إيرادات العمليات' },
                    { title: 'استلام دفعة مقدمة', debit: 'حـ/ البنك', credit: 'حـ/ دفعات مقدمة من العملاء' },
                    { title: 'حجز ضمان أعمال', debit: 'حـ/ حسابات مدينة (تأمينات لدى الغير)', credit: 'حـ/ العملاء (خصم من المستخلص)' },
                  ].map((entry, i) => (
                    <div key={i} className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                      <h4 className="font-bold text-accent text-sm mb-2">{entry.title}</h4>
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div className="p-2 bg-green-50 rounded border border-green-100">
                          <span className="font-bold text-green-700 block mb-1">من حـ/ (مدين)</span>
                          {entry.debit}
                        </div>
                        <div className="p-2 bg-red-50 rounded border border-red-100">
                          <span className="font-bold text-red-700 block mb-1">إلى حـ/ (دائن)</span>
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

        {/* 6. Percentage of Completion */}
        {activeTab === 'completion' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
            <div className="bg-primary text-white p-12 rounded-[3rem] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold">طريقة نسبة الإنجاز (POC)</h2>
                  <p className="text-gray-300 leading-relaxed">
                    هي الطريقة المعتمدة للاعتراف بالإيراد في العقود طويلة الأجل، حيث يتم الاعتراف بجزء من الإيراد والربح بناءً على ما تم صرفه فعلياً مقارنة بإجمالي التكلفة المقدرة.
                  </p>
                  <div className="bg-white/10 p-6 rounded-2xl border border-white/20">
                    <h4 className="font-bold mb-2">المعادلة الأساسية:</h4>
                    <p className="text-xl font-mono text-accent">نسبة الإنجاز = (التكلفة الفعلية حتى تاريخه ÷ إجمالي التكلفة المقدرة) × 100</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="bg-white/10 p-6 rounded-2xl border border-white/20">
                    <h4 className="font-bold mb-2">الإيراد المعترف به:</h4>
                    <p className="text-lg">إجمالي قيمة العقد × نسبة الإنجاز</p>
                  </div>
                  <div className="bg-white/10 p-6 rounded-2xl border border-white/20">
                    <h4 className="font-bold mb-2">الربح المعترف به:</h4>
                    <p className="text-lg">(إجمالي الربح المتوقع × نسبة الإنجاز) - الأرباح المعترف بها سابقاً</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-secondary rounded-3xl">
                <h3 className="text-xl font-bold text-primary mb-4">مثال عملي:</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>• قيمة العقد: 1,000,000 ج.م</li>
                  <li>• إجمالي التكلفة المقدرة: 800,000 ج.م</li>
                  <li>• التكلفة الفعلية المصروفة: 200,000 ج.م</li>
                  <li className="pt-4 border-t border-gray-300">
                    <strong className="text-primary">الحل:</strong>
                    <br />
                    1. نسبة الإنجاز = 200,000 / 800,000 = 25%
                    <br />
                    2. الإيراد المعترف به = 1,000,000 × 25% = 250,000 ج.م
                    <br />
                    3. الربح المعترف به = (1,000,000 - 800,000) × 25% = 50,000 ج.م
                  </li>
                </ul>
              </div>
              <div className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm">
                <h3 className="text-xl font-bold text-primary mb-4">لماذا نستخدم هذه الطريقة؟</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    <p className="text-sm text-gray-600">تحقيق مبدأ مقابلة الإيرادات بالمصروفات (Matching Principle).</p>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    <p className="text-sm text-gray-600">إظهار المركز المالي العادل للشركة خلال سنوات التنفيذ.</p>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    <p className="text-sm text-gray-600">تجنب تذبذب الأرباح بشكل كبير عند انتهاء المشروعات فقط.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 7. Extracts */}
        {activeTab === 'extracts' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-primary">المستخلصات (Payment Certificates)</h2>
                <p className="text-gray-600 leading-relaxed">
                  المستخلص هو الوثيقة الرسمية التي يطالب بها المقاول العميل بصرف مبالغ مالية مقابل الأعمال التي تم تنفيذها بالفعل في الموقع خلال فترة محددة.
                </p>
                <div className="space-y-4">
                  {[
                    { title: 'المستخلص الابتدائي', desc: 'يصدر في بداية المشروع لصرف الدفعة المقدمة.' },
                    { title: 'المستخلص الجاري', desc: 'يصدر دورياً (شهرياً غالباً) لمتابعة سير الأعمال.' },
                    { title: 'المستخلص الختامي', desc: 'يصدر عند انتهاء المشروع وتسليمه ابتدائياً.' },
                  ].map((type, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="bg-primary text-white p-2 rounded-lg h-fit">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-primary">{type.title}</h4>
                        <p className="text-sm text-gray-500">{type.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-primary p-8 rounded-[2rem] text-white space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Calculator className="w-6 h-6 text-accent" />
                  كيفية حساب قيمة المستخلص الصافي
                </h3>
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex justify-between p-2 bg-white/5 rounded">
                    <span>إجمالي الأعمال المنفذة (تراكمي)</span>
                    <span className="text-accent">100,000</span>
                  </div>
                  <div className="flex justify-between p-2 bg-white/5 rounded">
                    <span>(-) أعمال تم صرفها سابقاً</span>
                    <span className="text-red-400">(60,000)</span>
                  </div>
                  <div className="flex justify-between p-2 border-t border-white/20 pt-4">
                    <span>قيمة الأعمال الحالية</span>
                    <span className="font-bold">40,000</span>
                  </div>
                  <div className="flex justify-between p-2 text-red-300">
                    <span>(-) خصم نسبة الدفعة المقدمة (10%)</span>
                    <span>(4,000)</span>
                  </div>
                  <div className="flex justify-between p-2 text-red-300">
                    <span>(-) خصم تأمين ضمان أعمال (5%)</span>
                    <span>(2,000)</span>
                  </div>
                  <div className="flex justify-between p-2 text-red-300">
                    <span>(-) ضرائب وتأمينات</span>
                    <span>(1,500)</span>
                  </div>
                  <div className="flex justify-between p-4 bg-accent rounded-xl text-white font-bold text-lg mt-4">
                    <span>صافي المبلغ المستحق للصرف</span>
                    <span>32,500</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 8. Taxes & Insurance */}
        {activeTab === 'taxes' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="text-3xl font-bold text-primary">الضرائب والتأمينات في المقاولات</h2>
              <p className="text-gray-500">الالتزامات القانونية والسيادية الخاصة بنشاط التشييد والبناء.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'ضريبة القيمة المضافة', desc: 'تخضع المقاولات لضريبة الجدول (5%) أو السعر العام (14%) حسب طبيعة العقد (توريد وتركيب أم تشغيل فقط).', icon: <Calculator /> },
                { title: 'ضريبة الخصم والإضافة', desc: 'يتم خصم نسبة (1% أو 3% أو 5%) من مستحقات المقاول وتوريدها لمصلحة الضرائب تحت حساب الضريبة.', icon: <Coins /> },
                { title: 'التأمينات الاجتماعية', desc: 'يتم سداد تأمينات عن العمالة المؤقتة في المشروع بناءً على نسب محددة من قيمة المستخلص (تأمينات نمطية).', icon: <ShieldCheck /> },
                { title: 'ضريبة الأرباح', desc: 'الضريبة السنوية على صافي أرباح الشركة بعد خصم كافة التكاليف والمصروفات.', icon: <TrendingUp /> },
                { title: 'تأمينات مقاولي الباطن', desc: 'مسؤولية المقاول الرئيسي التأكد من سداد مقاولي الباطن لتأمينات عمالهم أو خصمها منهم.', icon: <Users /> },
                { title: 'دمغات هندسية', desc: 'رسوم تفرض على العقود والمستخلصات لصالح نقابة المهندسين.', icon: <Gavel /> },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-4">
                  <div className="text-accent">{item.icon}</div>
                  <h3 className="text-lg font-bold text-primary">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 10. Tools & Calculators */}
        {activeTab === 'tools' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* POC Calculator */}
              <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-lg space-y-6">
                <div className="flex items-center gap-3 text-primary">
                  <TrendingUp className="w-6 h-6" />
                  <h3 className="font-bold">حاسبة نسبة الإنجاز والإيراد</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">إجمالي قيمة العقد</label>
                    <input 
                      type="number" 
                      className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none"
                      onChange={(e) => setCompletion({ ...completion, contractValue: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">التكلفة الفعلية حتى الآن</label>
                    <input 
                      type="number" 
                      className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none"
                      onChange={(e) => setCompletion({ ...completion, costToDate: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">إجمالي التكلفة المقدرة</label>
                    <input 
                      type="number" 
                      className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none"
                      onChange={(e) => setCompletion({ ...completion, totalEstimatedCost: Number(e.target.value) })}
                    />
                  </div>
                  
                  <div className="space-y-3 pt-2">
                    <div className="p-4 bg-primary text-white rounded-2xl text-center">
                      <p className="text-xs opacity-80 mb-1">نسبة الإنجاز الفعلية</p>
                      <p className="text-2xl font-bold">
                        {completion.totalEstimatedCost > 0 
                          ? ((completion.costToDate / completion.totalEstimatedCost) * 100).toFixed(2) 
                          : 0}%
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-green-50 border border-green-100 rounded-xl text-center">
                        <p className="text-[10px] text-green-600 mb-1 font-bold">الإيراد المعترف به</p>
                        <p className="text-sm font-bold text-green-700">
                          {completion.totalEstimatedCost > 0 
                            ? (((completion.costToDate / completion.totalEstimatedCost)) * completion.contractValue).toLocaleString()
                            : 0} ج.م
                        </p>
                      </div>
                      <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-center">
                        <p className="text-[10px] text-blue-600 mb-1 font-bold">الربح المعترف به</p>
                        <p className="text-sm font-bold text-blue-700">
                          {completion.totalEstimatedCost > 0 
                            ? (((completion.costToDate / completion.totalEstimatedCost)) * (completion.contractValue - completion.totalEstimatedCost)).toLocaleString()
                            : 0} ج.م
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Extract Calculator */}
              <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-lg space-y-6">
                <div className="flex items-center gap-3 text-primary">
                  <FileText className="w-6 h-6" />
                  <h3 className="font-bold">حاسبة صافي المستخلص</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">إجمالي قيمة الأعمال المعتمدة</label>
                    <input 
                      type="number" 
                      className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none"
                      placeholder="أدخل القيمة الإجمالية"
                      onChange={(e) => setExtract({ ...extract, totalValue: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">خصم الدفعة المقدمة (قيمة)</label>
                    <input 
                      type="number" 
                      className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none"
                      placeholder="أدخل قيمة الخصم"
                      onChange={(e) => setExtract({ ...extract, advanceDeduction: Number(e.target.value) })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">تأمين ضمان (%)</label>
                      <input 
                        type="number" 
                        className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none"
                        value={extract.retention}
                        onChange={(e) => setExtract({ ...extract, retention: Number(e.target.value) })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">ضرائب (%)</label>
                      <input 
                        type="number" 
                        className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary outline-none"
                        value={extract.tax}
                        onChange={(e) => setExtract({ ...extract, tax: Number(e.target.value) })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="p-4 bg-accent text-white rounded-2xl text-center shadow-lg shadow-accent/20">
                      <p className="text-xs opacity-80 mb-1">صافي المبلغ المستحق للصرف</p>
                      <p className="text-2xl font-bold">
                        {(extract.totalValue - extract.advanceDeduction - (extract.totalValue * (extract.retention / 100)) - (extract.totalValue * (extract.tax / 100))).toLocaleString()} ج.م
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-500 px-2">
                      <div className="flex justify-between">
                        <span>إجمالي الاستقطاعات:</span>
                        <span className="font-bold text-red-500">
                          {(extract.advanceDeduction + (extract.totalValue * (extract.retention / 100)) + (extract.totalValue * (extract.tax / 100))).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>نسبة الصافي:</span>
                        <span className="font-bold text-primary">
                          {extract.totalValue > 0 ? (((extract.totalValue - extract.advanceDeduction - (extract.totalValue * (extract.retention / 100)) - (extract.totalValue * (extract.tax / 100))) / extract.totalValue) * 100).toFixed(1) : 0}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profit Calculator */}
              <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-lg space-y-6">
                <div className="flex items-center gap-3 text-primary">
                  <PieChart className="w-6 h-6" />
                  <h3 className="font-bold">حاسبة الربح المتوقع</h3>
                </div>
                <div className="space-y-4">
                  <input 
                    type="number" placeholder="إجمالي قيمة العقد"
                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200"
                    onChange={(e) => setProfitCalc({ ...profitCalc, contractValue: Number(e.target.value) })}
                  />
                  <input 
                    type="number" placeholder="إجمالي التكلفة التقديرية"
                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200"
                    onChange={(e) => setProfitCalc({ ...profitCalc, estimatedCost: Number(e.target.value) })}
                  />
                  <div className="p-4 bg-green-600 text-white rounded-2xl text-center">
                    <p className="text-xs opacity-80 mb-1">مجمل الربح المتوقع</p>
                    <p className="text-2xl font-bold">
                      {(profitCalc.contractValue - profitCalc.estimatedCost).toLocaleString()} ج.م
                    </p>
                    <p className="text-[10px] mt-1">
                      نسبة الربح: {profitCalc.contractValue > 0 ? (((profitCalc.contractValue - profitCalc.estimatedCost) / profitCalc.contractValue) * 100).toFixed(1) : 0}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 11. Practical Examples */}
        {activeTab === 'examples' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: 'مشروع إنشاء مبنى سكني', icon: <Building2 />, desc: 'يركز على مراحل الحفر، الخرسانة المسلحة، والمباني، مع تكاليف مواد ضخمة.' },
                { title: 'مشروع تشطيبات داخلية', icon: <Hammer />, desc: 'يعتمد بشكل كبير على مقاولي الباطن (كهرباء، سباكة، نجارة) وتكاليف عمالة عالية.' },
                { title: 'مشروع رصف طرق', icon: <Truck />, desc: 'يعتمد على تكلفة المعدات الثقيلة (هراسات، خلاطات أسفلت) واستهلاك الوقود.' },
                { title: 'مشروع توريد وتركيب تكييف', icon: <Layers />, desc: 'يجمع بين النشاط التجاري (توريد أجهزة) والنشاط الخدمي (تركيب وصيانة).' },
              ].map((ex, i) => (
                <div key={i} className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:border-accent transition-colors">
                  <div className="text-accent mb-4">{ex.icon}</div>
                  <h3 className="text-xl font-bold text-primary mb-2">{ex.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{ex.desc}</p>
                  <button className="text-accent text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all">
                    عرض الدورة المحاسبية الكاملة لهذا المشروع
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Reports Section */}
      <section className="section-padding bg-secondary py-20">
        <div className="container mx-auto px-4">
          {!selectedReport ? (
            <div className="space-y-12">
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <h2 className="text-3xl font-bold text-primary">التقارير والقوائم المالية للمشروعات</h2>
                <p className="text-gray-600">الأدوات التي تساعد الإدارة في اتخاذ القرارات بناءً على أرقام دقيقة مع دعم كامل للطباعة والتصدير.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { id: 'project-cost', title: 'قائمة تكلفة المشروع (فعلي vs تقديري)', icon: <BarChart3 />, color: 'bg-blue-50 text-blue-600', desc: 'مقارنة التكاليف الفعلية بالموازنة التقديرية لكل بند.' },
                  { id: 'project-p-and-l', title: 'قائمة الأرباح والخسائر لكل مشروع', icon: <PieChart />, color: 'bg-emerald-50 text-emerald-600', desc: 'تحليل ربحية كل مشروع على حدة بعد خصم كافة التكاليف.' },
                  { id: 'completion-rates', title: 'تقرير نسب الإنجاز الفنية والمالية', icon: <TrendingUp />, color: 'bg-purple-50 text-purple-600', desc: 'متابعة تقدم العمل الميداني وربطه بالاعتراف بالإيراد.' },
                  { id: 'extracts-aging', title: 'تقرير أعمار ديون العملاء (المستخلصات)', icon: <Clock />, color: 'bg-orange-50 text-orange-600', desc: 'متابعة تحصيل المستخلصات المتأخرة والتدفقات النقدية.' },
                  { id: 'subcontractors', title: 'تقرير مستحقات مقاولي الباطن', icon: <Users />, color: 'bg-indigo-50 text-indigo-600', desc: 'متابعة دفعات مقاولي الباطن والاستقطاعات الفنية.' },
                  { id: 'balance-sheet', title: 'قائمة المركز المالي للشركة ككل', icon: <Building2 />, color: 'bg-slate-50 text-slate-600', desc: 'عرض الأصول والالتزامات وحقوق الملكية للشركة.' },
                ].map((report) => (
                  <motion.button
                    key={report.id}
                    whileHover={{ y: -5 }}
                    onClick={() => setSelectedReport(report.id)}
                    className="flex flex-col items-start p-6 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-accent transition-all text-right group"
                  >
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", report.color)}>
                      {report.icon}
                    </div>
                    <h3 className="font-bold text-primary mb-2">{report.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{report.desc}</p>
                    <div className="mt-4 flex items-center gap-2 text-accent text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
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
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setSelectedReport(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  <div>
                    <h2 className="text-xl font-bold text-primary">
                      {selectedReport === 'project-cost' && 'قائمة تكلفة المشروع'}
                      {selectedReport === 'project-p-and-l' && 'قائمة الأرباح والخسائر للمشروع'}
                      {selectedReport === 'completion-rates' && 'تقرير نسب الإنجاز'}
                      {selectedReport === 'extracts-aging' && 'تقرير أعمار ديون المستخلصات'}
                      {selectedReport === 'subcontractors' && 'تقرير مستحقات مقاولي الباطن'}
                      {selectedReport === 'balance-sheet' && 'قائمة المركز المالي'}
                    </h2>
                    <p className="text-xs text-gray-500">تاريخ التقرير: {new Date().toLocaleDateString('ar-EG')}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-xl border border-gray-200">
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
                      className="pr-9 pl-4 py-2 bg-gray-50 rounded-xl border border-gray-200 text-xs outline-none focus:ring-2 focus:ring-accent transition-all"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={addRow}
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-blue-900 transition-all text-xs font-bold print:hidden"
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
                      className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-accent hover:text-white transition-all print:hidden" 
                      title="طباعة"
                    >
                      <Printer className="w-4 h-4" />
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
                      <p className="text-xs text-gray-500">قسم محاسبة المقاولات والمشروعات</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-primary">تقرير رسمي</h3>
                    <p className="text-xs text-gray-500">محاسب / روبير رافت</p>
                    <p className="text-xs text-gray-500">تاريخ الطباعة: {new Date().toLocaleString('ar-EG')}</p>
                  </div>
                </div>

                {/* Report Table */}
                <div className="p-8 overflow-x-auto">
                  <table className="w-full text-right border-collapse">
                    <thead className="sticky top-0 z-10">
                      <tr className="bg-primary text-white">
                        <th className="p-4 rounded-tr-xl font-bold text-sm">#</th>
                        <th className="p-4 font-bold text-sm">البيان / المشروع</th>
                        <th className="p-4 font-bold text-sm">التفاصيل / المرحلة</th>
                        <th className="p-4 font-bold text-sm">القيمة / النسبة</th>
                        <th className="p-4 font-bold text-sm">الحالة</th>
                        <th className="p-4 rounded-tl-xl font-bold text-sm print:hidden">إجراء</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {reportRows.map((row, index) => (
                        <tr key={row.id} className="hover:bg-gray-50 transition-colors group">
                          <td className="p-4 text-sm text-gray-500">{index + 1}</td>
                          <td className="p-2">
                            <input 
                              type="text" value={row.label} 
                              onChange={(e) => updateRow(index, 'label', e.target.value)}
                              className="w-full p-2 bg-transparent border-b border-transparent focus:border-accent outline-none text-sm font-bold text-primary"
                            />
                          </td>
                          <td className="p-2">
                            <input 
                              type="text" value={row.detail} 
                              onChange={(e) => updateRow(index, 'detail', e.target.value)}
                              className="w-full p-2 bg-transparent border-b border-transparent focus:border-accent outline-none text-sm text-gray-600"
                            />
                          </td>
                          <td className="p-2">
                            <input 
                              type="text" value={row.value} 
                              onChange={(e) => updateRow(index, 'value', e.target.value)}
                              className="w-full p-2 bg-transparent border-b border-transparent focus:border-accent outline-none text-sm font-bold text-accent"
                            />
                          </td>
                          <td className="p-2">
                            <input 
                              type="text" value={row.status} 
                              onChange={(e) => updateRow(index, 'status', e.target.value)}
                              className="w-full p-2 bg-transparent border-b border-transparent focus:border-accent outline-none text-xs text-blue-600"
                            />
                          </td>
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
                    <tfoot>
                      <tr className="bg-gray-50 font-bold">
                        <td colSpan={3} className="p-4 text-left text-primary">الإجمالي:</td>
                        <td className="p-4 text-accent text-lg">{calculateTotal().toLocaleString()}</td>
                        <td></td>
                        <td className="print:hidden"></td>
                      </tr>
                    </tfoot>
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
                      <p className="text-xs text-gray-500 mb-4">ختم الشركة</p>
                      <div className="w-32 h-px bg-gray-300"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              هل تدير شركة مقاولات وتريد <span style={{ color: goldColor }}>تنظيم حساباتك؟</span>
            </h2>
            <p className="text-white/80 text-xl">
              نحن متخصصون في تصميم النظم المحاسبية لشركات المقاولات وإدارة المستخلصات والضرائب باحترافية تضمن لك الرقابة الكاملة.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-accent text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-blue-700 transition-all shadow-2xl">
                اطلب استشارة مجانية
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

// Missing icon in the map
const RefreshCw = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M3 21v-5h5" />
  </svg>
);
