import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Calculator, 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  ArrowLeft, 
  CheckCircle, 
  DollarSign, 
  Briefcase,
  Gavel,
  PieChart,
  TrendingUp,
  Users,
  Building2,
  Globe
} from 'lucide-react';

import VATCalculator from '../components/VATCalculator';

export default function TaxAccounting() {
  const taxTypes = [
    { 
      title: 'ضريبة الدخل على الشركات', 
      desc: 'تفرض على صافي أرباح الأشخاص الاعتبارية (الشركات).', 
      icon: <Building2 className="w-8 h-8" /> 
    },
    { 
      title: 'ضريبة القيمة المضافة (VAT)', 
      desc: 'ضريبة غير مباشرة تفرض على معظم السلع والخدمات.', 
      icon: <PieChart className="w-8 h-8" /> 
    },
    { 
      title: 'ضريبة كسب العمل (المرتبات)', 
      desc: 'تستقطع من رواتب الموظفين وتورد لمصلحة الضرائب.', 
      icon: <Users className="w-8 h-8" /> 
    },
    { 
      title: 'ضريبة الخصم والإضافة', 
      desc: 'مبالغ تستقطع تحت حساب الضريبة عند التعامل مع الموردين.', 
      icon: <Calculator className="w-8 h-8" /> 
    },
  ];

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="bg-primary py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Gavel className="w-96 h-96 absolute -bottom-20 -left-20 text-white" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              المحاسبة الضريبية والإقرار الضريبي في مصر
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              دليلك الشامل لفهم القوانين الضريبية المصرية، وكيفية إعداد الإقرارات بدقة لتجنب الغرامات وضمان نمو شركتك.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-primary">ما هي المحاسبة الضريبية؟</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                هي فرع متخصص من المحاسبة يركز على حساب الضرائب المستحقة على المنشأة وفقاً للقوانين والتشريعات الضريبية المعمول بها في مصر. تهدف إلى تحديد الوعاء الضريبي بدقة وتقديم الإقرارات في مواعيدها القانونية.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: 'الالتزام بالقانون', icon: <ShieldCheck className="text-accent" /> },
                  { title: 'تجنب الغرامات', icon: <AlertTriangle className="text-red-500" /> },
                  { title: 'تنظيم الحسابات', icon: <CheckCircle className="text-green-500" /> },
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-secondary rounded-2xl text-center space-y-2 border border-gray-100">
                    <div className="flex justify-center">{item.icon}</div>
                    <p className="font-bold text-primary text-sm">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://picsum.photos/seed/accounting-tax-intro/600/400" 
                alt="Tax Accounting Intro" 
                className="rounded-3xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tax Types Grid */}
      <section className="section-padding bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold text-primary">أنواع الضرائب الرئيسية في مصر</h2>
            <p className="text-gray-600">نظرة سريعة على الالتزامات الضريبية التي تواجه الشركات المصرية.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {taxTypes.map((tax, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all text-center space-y-4 group">
                <div className="bg-secondary p-4 rounded-2xl w-fit mx-auto text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  {tax.icon}
                </div>
                <h3 className="text-xl font-bold text-primary">{tax.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{tax.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Income Tax Details */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-primary">ضريبة الدخل على الشركات (بالتفصيل)</h2>
              <p className="text-gray-600">تعتبر ضريبة الدخل هي الضريبة الأساسية على أرباح الشركات في مصر.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10 space-y-4">
                <h4 className="text-xl font-bold text-primary flex items-center gap-2">
                  <Users className="w-6 h-6 text-accent" />
                  من يخضع للضريبة؟
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  تخضع كافة الشركات والمؤسسات (الأشخاص الاعتبارية) المقيمة في مصر عن كافة أرباحها، سواء المحققة في مصر أو الخارج، والشركات غير المقيمة عن أرباحها المحققة في مصر فقط.
                </p>
              </div>
              <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10 space-y-4">
                <h4 className="text-xl font-bold text-primary flex items-center gap-2">
                  <Calculator className="w-6 h-6 text-accent" />
                  الوعاء الضريبي
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  هو صافي الربح المحاسبي بعد إجراء التعديلات الضريبية اللازمة (الإضافات والخصومات) للوصول إلى الربح الخاضع للضريبة فعلياً.
                </p>
              </div>
            </div>

            <div className="bg-secondary rounded-3xl p-8 space-y-6">
              <h4 className="text-xl font-bold text-primary text-center">أهم التعديلات الضريبية</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h5 className="font-bold text-red-600 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 rotate-180" />
                    إضافات (مصروفات غير معترف بها)
                  </h5>
                  <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
                    <li>المخصصات والاحتياطيات بكافة أنواعها.</li>
                    <li>الضرائب على الدخل المسددة.</li>
                    <li>الغرامات والجزاءات المالية الناتجة عن مخالفات.</li>
                    <li>المصروفات غير المؤيدة بمستندات (تتجاوز 7%).</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h5 className="font-bold text-green-600 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    خصومات (مصروفات مقبولة ضريبياً)
                  </h5>
                  <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
                    <li>الإهلاك الضريبي (وفقاً لنسب القانون).</li>
                    <li>التبرعات لجهات حكومية (بالكامل).</li>
                    <li>التبرعات للجمعيات المشهرة (في حدود 10/110).</li>
                    <li>الخسائر المرحلة من سنوات سابقة (بحد أقصى 5 سنوات).</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculation Example */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-primary">كيفية حساب ضريبة الدخل (مثال رقمي)</h2>
              <p className="text-gray-600">لنلقِ نظرة على مثال عملي لتبسيط عملية الحساب.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              <div className="bg-primary p-6 text-white">
                <h4 className="text-xl font-bold">مثال توضيحي لشركة "إيليجا"</h4>
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-600">1. صافي الربح المحاسبي (من قائمة الدخل)</span>
                    <span className="font-bold text-primary">500,000 ج.م</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2 text-red-600">
                    <span>2. (+) مصروفات غير معترف بها (مخصصات، غرامات)</span>
                    <span className="font-bold">+ 50,000 ج.م</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2 text-green-600">
                    <span>3. (-) مصروفات مخصومة (فرق إهلاك ضريبي)</span>
                    <span className="font-bold">- 30,000 ج.م</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2 bg-secondary p-2 rounded-lg">
                    <span className="font-bold text-primary">4. صافي الربح الضريبي (الوعاء)</span>
                    <span className="font-bold text-primary">520,000 ج.م</span>
                  </div>
                  <div className="flex justify-between items-center pt-4">
                    <span className="text-gray-600">5. الضريبة المستحقة (بافتراض سعر 22.5%)</span>
                    <span className="text-2xl font-extrabold text-accent">117,000 ج.م</span>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl text-sm text-blue-800 italic">
                  * ملاحظة: سعر الضريبة قد يختلف بناءً على طبيعة النشاط والقوانين السارية وقت تقديم الإقرار.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VAT Calculator Section */}
      <VATCalculator />

      {/* Tax Return Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-primary">الإقرار الضريبي: شهادة ميلادك الضريبية</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  الإقرار الضريبي هو نموذج رسمي يقدمه الممول لمصلحة الضرائب، يقر فيه بإيراداته ومصروفاته وصافي أرباحه خلال السنة المالية. هو الأداة القانونية التي تحدد التزامك المالي تجاه الدولة.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-primary">محتويات الإقرار الضريبي:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    'بيانات الشركة الأساسية',
                    'قائمة الدخل التفصيلية',
                    'الميزانية العمومية',
                    'جدول الإهلاكات الضريبية',
                    'بيان بالتعاملات مع الغير',
                    'حساب الضريبة النهائية'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-gray-600 text-sm">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-secondary p-8 rounded-[3rem] space-y-8">
              <h4 className="text-2xl font-bold text-primary text-center">خطوات تقديم الإقرار</h4>
              <div className="space-y-6">
                {[
                  { step: '01', title: 'تجهيز القوائم المالية', desc: 'إعداد الميزانية وقائمة الدخل بدقة.' },
                  { step: '02', title: 'حساب التعديلات', desc: 'تحديد الإضافات والخصومات الضريبية.' },
                  { step: '03', title: 'التقديم الإلكتروني', desc: 'رفع البيانات عبر منظومة الضرائب المصرية.' },
                  { step: '04', title: 'سداد الضريبة', desc: 'دفع المبالغ المستحقة عبر القنوات البنكية.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <span className="text-3xl font-black text-accent/20">{item.step}</span>
                    <div>
                      <h5 className="font-bold text-primary">{item.title}</h5>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deadlines and Penalties */}
      <section className="section-padding bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">المواعيد الضريبية والغرامات</h2>
              <p className="text-gray-400 leading-relaxed">
                الالتزام بالمواعيد هو مفتاح الأمان لشركتك. التأخير قد يعرضك لغرامات باهظة ومشاكل قانونية أنت في غنى عنها.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4 p-6 bg-white/5 rounded-2xl border border-white/10">
                  <Clock className="w-8 h-8 text-accent shrink-0" />
                  <div>
                    <h4 className="font-bold text-white">موعد تقديم الإقرار (للشركات)</h4>
                    <p className="text-sm text-gray-400">يجب تقديم الإقرار خلال 4 أشهر من تاريخ انتهاء السنة المالية (غالباً قبل 30 أبريل).</p>
                  </div>
                </div>
                <div className="flex gap-4 p-6 bg-white/5 rounded-2xl border border-white/10">
                  <AlertTriangle className="w-8 h-8 text-red-400 shrink-0" />
                  <div>
                    <h4 className="font-bold text-white">غرامات التأخير</h4>
                    <p className="text-sm text-gray-400">تطبق غرامات عن التأخير في التقديم، بالإضافة إلى فوائد تأخير على مبالغ الضريبة غير المسددة.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-3xl p-8 text-primary space-y-6">
              <h4 className="text-xl font-bold text-center">أخطاء شائعة تجنبها</h4>
              <div className="space-y-4">
                {[
                  { title: 'إغفال بعض المصروفات', desc: 'يؤدي لزيادة الوعاء الضريبي ودفع ضريبة أكثر من اللازم.' },
                  { title: 'أخطاء حسابية', desc: 'تؤدي لرفض الإقرار أو فرض غرامات فروق فحص.' },
                  { title: 'فقدان المستندات', desc: 'المستند هو الدليل الوحيد المقبول عند الفحص الضريبي.' },
                  { title: 'التأخير في التقديم', desc: 'يفقدك ميزة الخصم الضريبي ويعرضك للغرامات الفورية.' },
                ].map((error, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="bg-red-100 p-1 rounded-full mt-1">
                      <AlertTriangle className="w-3 h-3 text-red-600" />
                    </div>
                    <div>
                      <h5 className="font-bold text-sm">{error.title}</h5>
                      <p className="text-xs text-gray-500">{error.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold text-primary">كيف تساعدك "إيليجا" في إدارة ضرائبك؟</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">نحن لسنا مجرد محاسبين، نحن شركاؤك في النجاح والالتزام القانوني.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'إعداد الإقرارات', desc: 'إعداد ورفع كافة أنواع الإقرارات الضريبية إلكترونياً.', icon: <FileText /> },
              { title: 'حساب دقيق', desc: 'ضمان حساب الضريبة بأقل وعاء قانوني ممكن.', icon: <Calculator /> },
              { title: 'التمثيل الضريبي', desc: 'حضور الفحص الضريبي والدفاع عن حقوق شركتك.', icon: <Gavel /> },
              { title: 'تقليل المخاطر', desc: 'تنبيهك المبكر لأي فجوات ضريبية قد تسبب مشاكل.', icon: <ShieldCheck /> },
            ].map((help, i) => (
              <div key={i} className="p-8 bg-secondary rounded-3xl text-center space-y-4 hover:bg-primary hover:text-white transition-all group">
                <div className="text-accent group-hover:text-white transition-colors mx-auto">{help.icon}</div>
                <h4 className="font-bold">{help.title}</h4>
                <p className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">{help.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-accent relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              هل تريد إعداد إقرارك الضريبي بدقة وتجنب الغرامات؟
            </h2>
            <p className="text-white/90 text-xl">
              فريقنا جاهز لمساعدتك في حساب وتقديم الضرائب بكل احترافية، لنحمل عنك عبء التفكير في الضرائب ونترك لك مساحة للنمو.
            </p>
            <Link
              to="/contact"
              className="inline-flex bg-white text-accent px-12 py-5 rounded-full font-bold text-xl hover:bg-gray-100 transition-all shadow-2xl items-center gap-3"
            >
              اطلب الخدمة الآن
              <ArrowLeft className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
