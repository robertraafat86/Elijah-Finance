import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ACCOUNTING_STANDARDS_EAS } from '../constants';
import { 
  ArrowLeft, 
  CheckCircle, 
  ShieldCheck, 
  FileText,
  Briefcase,
  Scale,
  Building2,
  Gavel,
  LayoutDashboard
} from 'lucide-react';

export default function EgyptianStandards() {
  return (
    <div className="pt-24">
      {/* Header */}
      <section className="bg-primary py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Building2 className="w-96 h-96 absolute -bottom-20 -left-20 text-white" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold">المعايير المحاسبية المصرية (EAS)</h1>
            <p className="text-xl text-gray-300">
              نضمن توافق أعمالك المالية مع القوانين واللوائح المصرية من خلال تطبيق دقيق للمعايير المحاسبية المحلية.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex p-4 bg-secondary rounded-2xl text-primary mb-4">
              <Gavel className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-bold text-primary">ما هي المعايير المحاسبية المصرية؟</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              المعايير المحاسبية المصرية هي مجموعة من القواعد الفنية التي تنظم كيفية إعداد وعرض القوائم المالية للشركات العاملة في جمهورية مصر العربية. تهدف هذه المعايير إلى توحيد السياسات المحاسبية لضمان دقة وشفافية البيانات المالية، وتصدر بقرار من وزير الاستثمار بالتنسيق مع الهيئة العامة للرقابة المالية.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right">
              <div className="bg-secondary p-6 rounded-2xl border-r-4 border-accent">
                <h4 className="font-bold text-primary mb-2">الهدف الأساسي</h4>
                <p className="text-sm text-gray-600">توحيد القواعد المالية وتوفير لغة مشتركة للمحاسبين والمستثمرين داخل السوق المصري.</p>
              </div>
              <div className="bg-secondary p-6 rounded-2xl border-r-4 border-accent">
                <h4 className="font-bold text-primary mb-2">الجهة الرقابية</h4>
                <p className="text-sm text-gray-600">تخضع هذه المعايير لإشراف الهيئة المصرية للرقابة على المحاسبة والمراجعة لضمان الالتزام المهني.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EAS Standards Section */}
      <section className="section-padding bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold text-primary">أهم المعايير المحاسبية المصرية (EAS)</h2>
            <p className="text-gray-600">نظرة سريعة على المعايير الأكثر تأثيراً في النشاط التجاري المحلي.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ACCOUNTING_STANDARDS_EAS.map((std, index) => (
              <motion.div
                key={std.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="bg-secondary p-4 rounded-xl w-fit text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  {std.icon}
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">{std.code}</h3>
                <h4 className="text-lg font-bold text-accent mb-4">{std.title}</h4>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">{std.description}</p>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs font-bold text-gray-400 mb-1">الاستخدام:</p>
                    <p className="text-xs text-primary">{std.usage}</p>
                  </div>
                  <div className="bg-accent/5 p-3 rounded-lg border-r-2 border-accent">
                    <p className="text-xs font-bold text-accent mb-1">مثال عملي:</p>
                    <p className="text-xs text-primary italic">{std.example}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary">مقارنة بين المعايير المصرية والدولية</h2>
              <p className="text-gray-600 mt-4">تتوافق المعايير المصرية بشكل كبير مع المعايير الدولية مع وجود بعض التعديلات لتناسب البيئة القانونية المصرية.</p>
            </div>
            
            <div className="overflow-x-auto rounded-3xl shadow-xl border border-gray-100">
              <table className="w-full border-collapse bg-white">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="p-6 text-right font-bold">البند</th>
                    <th className="p-6 text-right font-bold">المعايير المصرية EAS</th>
                    <th className="p-6 text-right font-bold">المعايير الدولية IFRS/IAS</th>
                  </tr>
                </thead>
                <tbody className="text-sm md:text-base">
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-6 font-bold text-primary">عرض القوائم المالية</td>
                    <td className="p-6 text-gray-600">EAS 1</td>
                    <td className="p-6 text-gray-600">IAS 1</td>
                  </tr>
                  <tr className="border-b border-gray-100 bg-gray-50 hover:bg-gray-100 transition-colors">
                    <td className="p-6 font-bold text-primary">الإيرادات</td>
                    <td className="p-6 text-gray-600">EAS 17</td>
                    <td className="p-6 text-gray-600">IFRS 15</td>
                  </tr>
                  <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-6 font-bold text-primary">التدفقات النقدية</td>
                    <td className="p-6 text-gray-600">EAS 7</td>
                    <td className="p-6 text-gray-600">IAS 7</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="p-6 font-bold text-primary">الأصول الثابتة</td>
                    <td className="p-6 text-gray-600">EAS 16</td>
                    <td className="p-6 text-gray-600">IAS 16</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-12 bg-secondary p-8 rounded-3xl border-r-8 border-primary">
              <h4 className="text-xl font-bold text-primary mb-4">الفروق الأساسية باختصار:</h4>
              <p className="text-gray-600 leading-relaxed">
                تعتمد المعايير المصرية في جوهرها على المعايير الدولية، ولكنها قد تختلف في بعض التفاصيل المتعلقة بمتطلبات الإفصاح المحلية، أو المعالجات المحاسبية لبعض البنود التي تتأثر بالقوانين الضريبية المصرية وقانون الشركات. نحن نضمن لك الموازنة بين الدقة الفنية والالتزام القانوني المحلي.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Importance Section */}
      <section className="section-padding bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">أهمية تطبيق المعايير المصرية</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'الالتزام القانوني', desc: 'تجنب الغرامات والمشاكل القانونية مع الجهات الرقابية في مصر.', icon: <ShieldCheck className="w-12 h-12 text-accent" /> },
              { title: 'دقة البيانات', desc: 'ضمان صدق وعدالة القوائم المالية وتعبيراً عن الواقع المالي.', icon: <FileText className="w-12 h-12 text-accent" /> },
              { title: 'تسهيل المراجعة', desc: 'جعل عملية المراجعة الخارجية والداخلية أكثر سلاسة ووضوحاً.', icon: <Scale className="w-12 h-12 text-accent" /> },
              { title: 'دعم القرار', desc: 'توفير قاعدة بيانات مالية صلبة لاتخاذ قرارات توسعية مدروسة.', icon: <LayoutDashboard className="w-12 h-12 text-accent" /> },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 p-8 rounded-3xl border border-white/10 text-center hover:bg-white/10 transition-all"
              >
                <div className="mb-6 flex justify-center italic">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold mb-4">{item.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How we apply */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-primary text-center mb-12">كيف نطبق المعايير المصرية في شركتنا؟</h2>
            <div className="space-y-8">
              {[
                { title: 'إعداد القوائم وفق EAS', desc: 'نقوم ببناء شجرة الحسابات والقوائم المالية من الصفر لتتوافق مع متطلبات المعايير المصرية.', icon: <FileText className="w-8 h-8" /> },
                { title: 'التوافق القانوني', desc: 'نضمن أن تقاريرك المالية مقبولة لدى مصلحة الضرائب والهيئة العامة للاستثمار.', icon: <Gavel className="w-8 h-8" /> },
                { title: 'حلول محلية احترافية', desc: 'نقدم خبراتنا العميقة في السوق المصري لمساعدتك في مواجهة التحديات المحاسبية المحلية.', icon: <Briefcase className="w-8 h-8" /> },
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start p-6 bg-secondary rounded-2xl border border-gray-100">
                  <div className="bg-primary text-white p-3 rounded-xl">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-primary mb-2">{item.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent overflow-hidden relative">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8">هل تريد تطبيق المعايير المصرية بدقة في شركتك؟</h2>
          <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto">فريقنا جاهز لإعداد قوائم مالية دقيقة وفق أحدث المعايير المصرية وضمان التزامك الكامل.</p>
          <Link
            to="/contact"
            className="bg-white text-accent px-12 py-5 rounded-full font-bold text-xl hover:bg-gray-100 transition-all shadow-xl inline-flex items-center gap-2"
          >
            اطلب الخدمة الآن
            <ArrowLeft className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  );
}
