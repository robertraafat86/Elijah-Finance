import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Ship, 
  Calculator, 
  FileText, 
  ShieldCheck, 
  ArrowLeft, 
  CheckCircle, 
  Info,
  DollarSign,
  Percent,
  Truck,
  Search,
  Gavel,
  ClipboardCheck,
  PackageCheck,
  Globe
} from 'lucide-react';

export default function CustomsDuties() {
  const [cifValue, setCifValue] = useState<string>('');
  const [customsRate, setCustomsRate] = useState<string>('');
  const [vatRate, setVatRate] = useState<string>('14');
  const [results, setResults] = useState<{
    customsAmount: number;
    vatAmount: number;
    totalCost: number;
  } | null>(null);

  const calculateCustoms = () => {
    const cif = parseFloat(cifValue);
    const cRate = parseFloat(customsRate);
    const vRate = parseFloat(vatRate);

    if (isNaN(cif) || isNaN(cRate) || isNaN(vRate)) return;

    const customsAmount = cif * (cRate / 100);
    const vatAmount = (cif + customsAmount) * (vRate / 100);
    const totalCost = cif + customsAmount + vatAmount;

    setResults({
      customsAmount,
      vatAmount,
      totalCost
    });
  };

  const reset = () => {
    setCifValue('');
    setCustomsRate('');
    setVatRate('14');
    setResults(null);
  };

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="bg-primary py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Ship className="w-96 h-96 absolute -bottom-20 -left-20 text-white" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              الضريبة الجمركية في مصر
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              دليلك الشامل لفهم الرسوم الجمركية، التعريفة الموحدة، وكيفية تقدير تكاليف الاستيراد بدقة لتجنب أي مفاجآت مالية.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-primary">ما هي الضريبة الجمركية؟</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                هي ضريبة تفرضها الدولة على السلع المستوردة من الخارج عند دخولها الحدود الجمركية. تهدف هذه الضريبة إلى حماية الصناعة الوطنية، تنظيم التجارة الخارجية، وتوفير مورد مالي للدولة.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'حماية المنتج المحلي', icon: <ShieldCheck className="text-accent" /> },
                  { title: 'تنظيم حركة التجارة', icon: <Truck className="text-primary" /> },
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-secondary rounded-2xl flex items-center gap-3 border border-gray-100">
                    <div className="bg-white p-2 rounded-lg shadow-sm">{item.icon}</div>
                    <p className="font-bold text-primary text-sm">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://picsum.photos/seed/accounting-customs/600/400" 
                alt="Customs Duties Egypt" 
                className="rounded-3xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Types of Fees Grid */}
      <section className="section-padding bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold text-primary">أنواع الرسوم الجمركية والضرائب على الواردات</h2>
            <p className="text-gray-600">تتكون التكلفة الجمركية من عدة عناصر يجب أخذها في الاعتبار.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'الرسوم الجمركية الأساسية', desc: 'تحدد بناءً على نوع السلعة والتعريفة الجمركية السارية.', icon: <Calculator /> },
              { title: 'ضريبة القيمة المضافة', desc: 'تفرض بنسبة 14% على إجمالي قيمة البضاعة مضافاً إليها الرسوم.', icon: <Percent /> },
              { title: 'رسوم الخدمات', desc: 'رسوم تفرض مقابل خدمات الموانئ، الفحص، والتخزين.', icon: <Truck /> },
              { title: 'رسوم إضافية', desc: 'قد تفرض رسوم إغراق أو رسوم تنمية حسب نوع السلعة ومنشئها.', icon: <DollarSign /> },
            ].map((fee, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all text-center space-y-4 group">
                <div className="bg-secondary p-4 rounded-2xl w-fit mx-auto text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  {fee.icon}
                </div>
                <h3 className="text-xl font-bold text-primary">{fee.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{fee.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customs Tariff Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-primary">التعريفة الجمركية و HS Code</h2>
              <p className="text-gray-600">كيف يتم تحديد النسبة التي ستدفعها على بضاعتك؟</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10 space-y-4">
                <h4 className="text-xl font-bold text-primary flex items-center gap-2">
                  <Search className="w-6 h-6 text-accent" />
                  ما هو HS Code؟
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  هو نظام دولي موحد لتصنيف السلع (Harmonized System). كل سلعة لها كود رقمي محدد، وبناءً على هذا الكود يتم تحديد نسبة الرسوم الجمركية وأي قيود استيرادية أخرى.
                </p>
              </div>
              <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10 space-y-4">
                <h4 className="text-xl font-bold text-primary flex items-center gap-2">
                  <Gavel className="w-6 h-6 text-accent" />
                  التعريفة الجمركية الموحدة
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  تصدر مصر تعريفة جمركية موحدة تحدد النسب المئوية للرسوم على كافة السلع. قد تتغير هذه النسب بقرارات جمهورية لتشجيع صناعات معينة أو الحد من استيراد سلع ترفيهية.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculation Steps & Example */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-primary">كيفية حساب الرسوم الجمركية</h2>
              <div className="space-y-6">
                {[
                  { step: '1', title: 'تحديد قيمة CIF', desc: 'قيمة البضاعة + تكلفة التأمين + تكلفة الشحن.' },
                  { step: '2', title: 'تحديد نسبة الجمارك', desc: 'البحث عن نسبة السلعة في التعريفة الجمركية (HS Code).' },
                  { step: '3', title: 'حساب الرسوم الأساسية', desc: 'قيمة CIF × نسبة الجمارك.' },
                  { step: '4', title: 'حساب ضريبة القيمة المضافة', desc: '(قيمة CIF + الرسوم الجمركية) × 14%.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <span className="bg-accent text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">{item.step}</span>
                    <div>
                      <h5 className="font-bold text-primary">{item.title}</h5>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              <div className="bg-primary p-6 text-white">
                <h4 className="text-xl font-bold">مثال عملي توضيحي</h4>
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-600">قيمة البضاعة (CIF)</span>
                    <span className="font-bold text-primary">100,000 ج.م</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-600">نسبة الجمارك (10%)</span>
                    <span className="font-bold text-accent">+ 10,000 ج.م</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-600">ضريبة القيمة المضافة (14% من 110,000)</span>
                    <span className="font-bold text-accent">+ 15,400 ج.م</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 bg-secondary p-4 rounded-xl">
                    <span className="font-bold text-primary text-lg">إجمالي التكلفة الجمركية</span>
                    <span className="text-2xl font-black text-primary">125,400 ج.م</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Calculator Section */}
      <section className="section-padding bg-white" id="customs-calculator">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">حاسبة الرسوم الجمركية التفاعلية</h2>
              <p className="text-gray-600">أدخل البيانات الأساسية لتقدير التكاليف الجمركية لبضاعتك فوراً.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Form */}
              <div className="bg-secondary p-8 rounded-[2.5rem] space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary block">قيمة البضاعة (CIF) - بالجنيه</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        value={cifValue}
                        onChange={(e) => setCifValue(e.target.value)}
                        placeholder="أدخل قيمة البضاعة والشحن والتأمين..."
                        className="w-full p-4 pr-12 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-accent outline-none"
                      />
                      <DollarSign className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary block">نسبة الجمارك (%)</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        value={customsRate}
                        onChange={(e) => setCustomsRate(e.target.value)}
                        placeholder="مثال: 10"
                        className="w-full p-4 pr-12 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-accent outline-none"
                      />
                      <Percent className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary block">نسبة ضريبة القيمة المضافة (%)</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        value={vatRate}
                        onChange={(e) => setVatRate(e.target.value)}
                        className="w-full p-4 pr-12 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-accent outline-none"
                      />
                      <Percent className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                    <p className="text-[10px] text-gray-400">النسبة الافتراضية في مصر هي 14%</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={calculateCustoms}
                    className="flex-grow bg-primary text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Calculator className="w-5 h-5" />
                    احسب الرسوم
                  </button>
                  <button 
                    onClick={reset}
                    className="p-4 bg-white text-gray-400 rounded-2xl hover:text-red-500 transition-all border border-gray-100"
                  >
                    <RefreshCcw className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-6">
                {results ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-accent text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <h3 className="text-xl font-bold mb-8 relative z-10">نتائج التقدير الجمركي:</h3>
                    
                    <div className="space-y-6 relative z-10">
                      <div className="flex justify-between items-center border-b border-white/20 pb-4">
                        <span className="text-blue-100">قيمة الرسوم الجمركية:</span>
                        <span className="text-2xl font-bold">{results.customsAmount.toLocaleString('ar-EG', { minimumFractionDigits: 2 })} ج.م</span>
                      </div>
                      <div className="flex justify-between items-center border-b border-white/20 pb-4">
                        <span className="text-blue-100">قيمة ضريبة القيمة المضافة:</span>
                        <span className="text-2xl font-bold">{results.vatAmount.toLocaleString('ar-EG', { minimumFractionDigits: 2 })} ج.م</span>
                      </div>
                      <div className="flex justify-between items-center pt-4">
                        <span className="text-white font-bold">إجمالي التكلفة (بما فيها البضاعة):</span>
                        <span className="text-3xl font-black">{results.totalCost.toLocaleString('ar-EG', { minimumFractionDigits: 2 })} ج.م</span>
                      </div>
                    </div>

                    <div className="mt-8 flex items-start gap-2 text-[10px] text-blue-100 bg-white/10 p-4 rounded-2xl">
                      <Info className="w-4 h-4 shrink-0" />
                      <p>هذه النتائج تقديرية بناءً على النسب المدخلة. قد تفرض رسوم إضافية أو غرامات في الواقع العملي. يرجى مراجعة مستشار جمركي متخصص.</p>
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-full min-h-[350px] bg-gray-50 border-2 border-dashed border-gray-200 rounded-[2.5rem] flex flex-col items-center justify-center text-center p-8 text-gray-400">
                    <Calculator className="w-20 h-20 mb-4 opacity-10" />
                    <p className="font-bold text-lg">أدخل البيانات واضغط على "احسب الرسوم" لرؤية النتائج</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Required Documents Section */}
      <section className="section-padding bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-primary">المستندات المطلوبة للتخليص الجمركي</h2>
              <p className="text-gray-600">تأكد من جاهزية هذه المستندات قبل وصول الشحنة لتجنب التأخير.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: 'الفاتورة التجارية (Invoice)', desc: 'توضح وصف البضاعة، الكمية، والسعر.', icon: <FileText /> },
                { title: 'بوليصة الشحن (Bill of Lading)', desc: 'مستند ملكية البضاعة وعقد الشحن.', icon: <Ship /> },
                { title: 'شهادة المنشأ (Certificate of Origin)', desc: 'تثبت بلد إنتاج البضاعة لتحديد الاتفاقيات.', icon: <Globe /> },
                { title: 'قائمة التعبئة (Packing List)', desc: 'تفصيل لمحتويات كل طرد ووزنه.', icon: <ClipboardCheck /> },
              ].map((doc, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl flex gap-4 items-start border border-gray-100 shadow-sm">
                  <div className="text-accent shrink-0">{doc.icon}</div>
                  <div>
                    <h5 className="font-bold text-primary">{doc.title}</h5>
                    <p className="text-sm text-gray-500">{doc.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Customs Procedures */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold text-primary">الإجراءات الجمركية خطوة بخطوة</h2>
            <p className="text-gray-600">رحلة بضاعتك من الميناء حتى مخزنك.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'التسجيل', desc: 'تسجيل الشحنة على منظومة "نافذة" والحصول على رقم ACID.', icon: <FileText /> },
              { step: '02', title: 'الفحص', desc: 'معاينة البضاعة من قبل لجان الفحص الجمركي.', icon: <Search /> },
              { step: '03', title: 'السداد', desc: 'دفع الرسوم والضرائب المقررة بنكياً.', icon: <DollarSign /> },
              { step: '04', title: 'الإفراج', desc: 'الحصول على إذن الإفراج النهائي وخروج البضاعة.', icon: <PackageCheck /> },
            ].map((proc, i) => (
              <div key={i} className="relative p-8 bg-secondary rounded-3xl text-center space-y-4">
                <span className="absolute top-4 left-4 text-4xl font-black text-primary/5">{proc.step}</span>
                <div className="text-accent mx-auto w-fit">{proc.icon}</div>
                <h4 className="font-bold text-primary">{proc.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{proc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold text-primary">كيف نساعدك في "إيليجا"؟</h2>
            <p className="text-gray-600">خبرتنا في القوانين الجمركية توفر عليك الوقت والمال.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'حساب الجمارك بدقة', desc: 'تقدير دقيق لكافة الرسوم قبل الاستيراد.', icon: <Calculator className="w-10 h-10" /> },
              { title: 'مراجعة المستندات', desc: 'التأكد من صحة الفواتير وشهادات المنشأ لتجنب الرفض.', icon: <ClipboardCheck className="w-10 h-10" /> },
              { title: 'استشارات استيراد', desc: 'توجيهك لأفضل الطرق والاتفاقيات التجارية الموفرة.', icon: <TrendingUp className="w-10 h-10" /> },
            ].map((service, i) => (
              <div key={i} className="p-10 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 text-center space-y-6 hover:shadow-xl transition-all group">
                <div className="bg-secondary p-5 rounded-3xl w-fit mx-auto text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold text-primary">{service.title}</h4>
                <p className="text-gray-500 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              هل تريد حساب تكلفة الاستيراد بدقة قبل الشحن؟
            </h2>
            <p className="text-gray-400 text-xl">
              فريقنا يساعدك في حساب جميع الرسوم وتجنب المفاجآت، لنضمن لك عملية استيراد سلسة ومربحة.
            </p>
            <Link
              to="/contact"
              className="inline-flex bg-accent text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-blue-700 transition-all shadow-2xl items-center gap-3"
            >
              اطلب استشارة الآن
              <ArrowLeft className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function RefreshCcw(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 16h5v5" />
    </svg>
  );
}

function TrendingUp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}
