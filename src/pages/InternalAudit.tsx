import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Search, 
  Settings, 
  Gavel, 
  Monitor, 
  ClipboardCheck, 
  FileSearch, 
  BarChart, 
  FileText, 
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
  Users,
  Briefcase,
  Target,
  Zap
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function InternalAudit() {
  return (
    <div className="pt-24">
      {/* Header Section */}
      <section className="bg-primary py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <ShieldCheck className="w-96 h-96 absolute -bottom-20 -left-20 text-white" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold">المراجعة الداخلية وإدارة الرقابة المالية</h1>
            <p className="text-xl text-gray-300">
              نضمن لك الدقة والشفافية من خلال تقييم وفحص الأنظمة المالية والرقابية لحماية أصول شركتك وتحسين أدائها المالي.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex p-4 bg-secondary rounded-2xl text-primary mb-4">
              <Search className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-bold text-primary">ما هي المراجعة الداخلية؟</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              المراجعة الداخلية هي عملية تقييم وفحص مستقلة وموضوعية للأنظمة المالية والرقابية داخل الشركة. تهدف إلى ضمان دقة البيانات المالية، والشفافية في العمليات، ومنع الأخطاء أو التلاعب، مما يساهم في حماية أصول الشركة وتحسين كفاءتها التشغيلية.
            </p>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="section-padding bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary">أهداف المراجعة الداخلية</h2>
            <p className="text-gray-600 mt-4">لماذا تحتاج شركتك إلى نظام مراجعة داخلية قوي؟</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'دقة البيانات المالية', desc: 'التأكد من أن جميع السجلات والتقارير المالية تعكس الواقع الفعلي بدقة.', icon: <CheckCircle className="w-8 h-8" /> },
              { title: 'اكتشاف الأخطاء والتلاعب', desc: 'تحديد أي انحرافات أو محاولات احتيال ومعالجتها فوراً.', icon: <AlertTriangle className="w-8 h-8" /> },
              { title: 'تحسين كفاءة العمليات', desc: 'تقييم الإجراءات الحالية واقتراح طرق لزيادة الإنتاجية وتقليل الهدر.', icon: <Zap className="w-8 h-8" /> },
              { title: 'ضمان الالتزام', desc: 'التأكد من توافق جميع العمليات مع القوانين واللوائح المحلية والدولية.', icon: <Gavel className="w-8 h-8" /> },
              { title: 'دعم اتخاذ القرار', desc: 'توفير معلومات موثوقة للإدارة تساعدها في التخطيط الاستراتيجي.', icon: <Target className="w-8 h-8" /> },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100"
              >
                <div className="text-accent mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Types of Internal Audit Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary">أنواع المراجعة الداخلية</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { 
                title: 'المراجعة المالية', 
                desc: 'فحص السجلات والقيود المحاسبية للتأكد من صحتها واكتمالها.', 
                example: 'مطابقة أرصدة البنك مع الدفاتر والتأكد من صحة قيود المشتريات والمبيعات.', 
                icon: <BarChart className="w-10 h-10" /> 
              },
              { 
                title: 'المراجعة التشغيلية', 
                desc: 'تقييم كفاءة وفعالية العمليات داخل مختلف أقسام الشركة.', 
                example: 'مراجعة دورة المشتريات للتأكد من الحصول على أفضل الأسعار والجودة.', 
                icon: <Settings className="w-10 h-10" /> 
              },
              { 
                title: 'مراجعة الالتزام', 
                desc: 'التأكد من التزام الشركة بالقوانين واللوائح والسياسات الداخلية.', 
                example: 'التأكد من تطبيق قوانين العمل والضرائب واللوائح المالية المعتمدة.', 
                icon: <ShieldCheck className="w-10 h-10" /> 
              },
              { 
                title: 'مراجعة نظم المعلومات', 
                desc: 'مراجعة الأنظمة المحاسبية والبرامج لضمان أمن البيانات ودقة المعالجة.', 
                example: 'فحص صلاحيات المستخدمين على النظام المحاسبي والتأكد من وجود نسخ احتياطية.', 
                icon: <Monitor className="w-10 h-10" /> 
              },
            ].map((type, i) => (
              <div key={i} className="flex gap-6 p-8 bg-secondary rounded-3xl border border-gray-100">
                <div className="text-primary shrink-0">{type.icon}</div>
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-primary">{type.title}</h3>
                  <p className="text-gray-600 text-sm">{type.desc}</p>
                  <div className="bg-white/50 p-3 rounded-lg border-r-2 border-accent">
                    <p className="text-xs font-bold text-accent mb-1">مثال عملي:</p>
                    <p className="text-xs text-primary italic">{type.example}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="section-padding bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">خطوات عملية المراجعة الداخلية</h2>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
              {[
                { step: '1', title: 'التخطيط', desc: 'تحديد نطاق وأهداف المراجعة.', icon: <ClipboardCheck /> },
                { step: '2', title: 'جمع البيانات', desc: 'فحص المستندات والسجلات.', icon: <FileSearch /> },
                { step: '3', title: 'التحليل', desc: 'اكتشاف الأخطاء والانحرافات.', icon: <BarChart /> },
                { step: '4', title: 'إعداد التقرير', desc: 'كتابة الملاحظات والتوصيات.', icon: <FileText /> },
                { step: '5', title: 'المتابعة', desc: 'التأكد من تنفيذ التوصيات.', icon: <RefreshCw /> },
              ].map((item, i) => (
                <div key={i} className="text-center space-y-4 relative z-10">
                  <div className="bg-accent w-12 h-12 rounded-full flex items-center justify-center mx-auto text-white font-bold text-xl shadow-lg">
                    {item.step}
                  </div>
                  <h4 className="font-bold text-lg">{item.title}</h4>
                  <p className="text-xs text-gray-400">{item.desc}</p>
                </div>
              ))}
              {/* Connector Line (Desktop) */}
              <div className="hidden md:block absolute top-6 left-0 right-0 h-0.5 bg-white/10 -z-0" />
            </div>
          </div>
        </div>
      </section>

      {/* Tools & Importance Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-primary">أدوات وتقنيات المراجعة</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  'الفحص المستندي الدقيق',
                  'الجرد الفعلي للأصول والمخزون',
                  'التحليل المالي والنسب المحاسبية',
                  'المقارنات بين الفترات المالية',
                  'استخدام أحدث البرامج المحاسبية',
                  'المقابلات والاستفسارات الميدانية'
                ].map((tool, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-secondary rounded-xl">
                    <CheckCircle className="w-5 h-5 text-accent" />
                    <span className="text-sm font-medium text-primary">{tool}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-primary">أهمية المراجعة للشركات</h2>
              <ul className="space-y-4">
                {[
                  'تقليل المخاطر المالية والتشغيلية بشكل استباقي.',
                  'تحسين نظم الرقابة الداخلية لضمان سلامة الأصول.',
                  'زيادة الكفاءة التشغيلية وتقليل التكاليف غير الضرورية.',
                  'منع وردع الاحتيال والتلاعب المالي.',
                  'توفير رؤية واضحة للإدارة لدعم اتخاذ القرارات المصيرية.'
                ].map((text, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <div className="bg-accent/10 p-1 rounded text-accent mt-1">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <p className="text-gray-600 leading-relaxed">{text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="section-padding bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary">الفرق بين المراجعة الداخلية والخارجية</h2>
            </div>
            <div className="overflow-x-auto rounded-3xl shadow-xl border border-gray-100">
              <table className="w-full border-collapse bg-white">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="p-6 text-right font-bold">العنصر</th>
                    <th className="p-6 text-right font-bold">المراجعة الداخلية</th>
                    <th className="p-6 text-right font-bold">المراجعة الخارجية</th>
                  </tr>
                </thead>
                <tbody className="text-sm md:text-base">
                  <tr className="border-b border-gray-100">
                    <td className="p-6 font-bold text-primary">الهدف</td>
                    <td className="p-6 text-gray-600">تحسين العمليات والرقابة الداخلية</td>
                    <td className="p-6 text-gray-600">إبداء رأي مستقل حول عدالة القوائم</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <td className="p-6 font-bold text-primary">التبعية</td>
                    <td className="p-6 text-gray-600">تتبع إدارة الشركة (لجنة المراجعة)</td>
                    <td className="p-6 text-gray-600">جهة مستقلة تماماً عن الشركة</td>
                  </tr>
                  <tr>
                    <td className="p-6 font-bold text-primary">التكرار</td>
                    <td className="p-6 text-gray-600">عملية مستمرة طوال العام</td>
                    <td className="p-6 text-gray-600">عملية دورية (سنوية أو ربع سنوية)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary">خدماتنا في المراجعة الداخلية</h2>
            <p className="text-gray-600 mt-4">نقدم حلولاً متكاملة لحماية استثماراتك وضمان استقرارك المالي.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'فحص الحسابات والقيود', icon: <FileSearch /> },
              { title: 'تقييم نظم الرقابة الداخلية', icon: <ShieldCheck /> },
              { title: 'إعداد تقارير مراجعة احترافية', icon: <FileText /> },
              { title: 'اكتشاف الأخطاء المالية', icon: <AlertTriangle /> },
              { title: 'تحسين الإجراءات المالية', icon: <Settings /> },
              { title: 'استشارات إدارة المخاطر', icon: <Briefcase /> },
            ].map((service, i) => (
              <div key={i} className="p-6 bg-secondary rounded-2xl flex items-center gap-4 hover:bg-primary hover:text-white transition-all group">
                <div className="text-accent group-hover:text-white">{service.icon}</div>
                <h4 className="font-bold">{service.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent overflow-hidden relative">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8">هل ترغب في حماية شركتك من الأخطاء المالية وتحسين الأداء؟</h2>
          <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto">فريقنا يقدم خدمات مراجعة داخلية احترافية تضمن لك الدقة والشفافية وحماية أصولك.</p>
          <Link
            to="/contact"
            className="bg-white text-accent px-12 py-5 rounded-full font-bold text-xl hover:bg-gray-100 transition-all shadow-xl inline-flex items-center gap-2"
          >
            اطلب خدمة المراجعة الآن
            <ArrowLeft className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  );
}
