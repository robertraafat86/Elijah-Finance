import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ACCOUNTING_PRINCIPLES, 
  ACCOUNTING_STANDARDS_IAS, 
  ACCOUNTING_STANDARDS_IFRS,
  ACCOUNTING_STANDARDS_EAS
} from '../constants';
import { 
  Globe, 
  ArrowLeft, 
  CheckCircle, 
  TrendingUp, 
  Shield, 
  FileText,
  Briefcase,
  Award,
  Eye,
  RefreshCcw,
  Building2
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function AccountingStandards() {
  return (
    <div className="pt-24">
      {/* Header */}
      <section className="bg-primary py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Globe className="w-96 h-96 absolute -bottom-20 -left-20 text-white" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold">المبادئ والمعايير المحاسبية والمالية الدولية الحديثة</h1>
            <p className="text-xl text-gray-300">
              نلتزم بتطبيق أحدث المعايير الدولية لضمان دقة وشفافية تقاريرك المالية وتوحيدها مع الممارسات العالمية.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold text-primary">ما هي المبادئ والمعايير المحاسبية الدولية؟</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              هي مجموعة من القواعد والإجراءات الموحدة التي تهدف إلى تنظيم العمل المحاسبي وتوحيد طريقة عرض التقارير المالية للشركات حول العالم. تساهم هذه المعايير في جعل القوائم المالية مفهومة وقابلة للمقارنة عبر الحدود، مما يسهل حركة الاستثمار العالمي.
            </p>
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="section-padding bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold text-primary">المبادئ المحاسبية الحديثة</h2>
            <p className="text-gray-600">الركائز الأساسية التي يقوم عليها النظام المحاسبي السليم.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ACCOUNTING_PRINCIPLES.map((principle, index) => (
              <motion.div
                key={principle.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all"
              >
                <div className="bg-secondary p-4 rounded-xl w-fit text-primary mb-6">
                  {principle.icon}
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">{principle.title}</h3>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">{principle.description}</p>
                <div className="bg-gray-50 p-4 rounded-xl border-r-4 border-accent">
                  <p className="text-xs font-bold text-gray-400 mb-1">مثال عملي:</p>
                  <p className="text-sm text-primary italic">{principle.example}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-primary">المعايير الدولية المحاسبية</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                يتم التمييز غالباً بين نوعين من المعايير الدولية، وهما IAS و IFRS. كلاهما يهدف لنفس الغاية ولكن يختلفان في تاريخ الإصدار والجهة المصدرة.
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-2xl overflow-hidden shadow-sm">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th className="p-4 text-right">وجه المقارنة</th>
                      <th className="p-4 text-right">IAS</th>
                      <th className="p-4 text-right">IFRS</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    <tr className="border-b border-gray-100">
                      <td className="p-4 font-bold text-primary">الاسم الكامل</td>
                      <td className="p-4 text-gray-600">معايير المحاسبة الدولية</td>
                      <td className="p-4 text-gray-600">المعايير الدولية لإعداد التقارير المالية</td>
                    </tr>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <td className="p-4 font-bold text-primary">تاريخ الإصدار</td>
                      <td className="p-4 text-gray-600">قبل عام 2001</td>
                      <td className="p-4 text-gray-600">بعد عام 2001</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-primary">الجهة المصدرة</td>
                      <td className="p-4 text-gray-600">لجنة معايير المحاسبة الدولية (IASC)</td>
                      <td className="p-4 text-gray-600">مجلس معايير المحاسبة الدولية (IASB)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="bg-secondary p-8 rounded-3xl">
              <img 
                src="https://picsum.photos/seed/accounting-standards/600/400" 
                alt="Accounting Standards" 
                className="rounded-2xl shadow-lg"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Important Standards */}
      <section className="section-padding bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary">أهم المعايير الدولية</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* IAS Group */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-accent flex items-center gap-2">
                <FileText className="w-6 h-6" />
                معايير IAS
              </h3>
              <div className="space-y-4">
                {ACCOUNTING_STANDARDS_IAS.map((std) => (
                  <div key={std.code} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-primary">{std.code} - {std.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{std.description}</p>
                    <p className="text-xs text-accent font-medium bg-accent/5 p-2 rounded-lg">
                      <span className="font-bold">الاستخدام:</span> {std.usage}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* IFRS Group */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-accent flex items-center gap-2">
                <Globe className="w-6 h-6" />
                معايير IFRS
              </h3>
              <div className="space-y-4">
                {ACCOUNTING_STANDARDS_IFRS.map((std) => (
                  <div key={std.code} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-primary">{std.code} - {std.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{std.description}</p>
                    <p className="text-xs text-accent font-medium bg-accent/5 p-2 rounded-lg">
                      <span className="font-bold">الاستخدام:</span> {std.usage}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* EAS Group */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-accent flex items-center gap-2">
                <Building2 className="w-6 h-6" />
                معايير EAS (المصرية)
              </h3>
              <div className="space-y-4">
                {ACCOUNTING_STANDARDS_EAS.slice(0, 3).map((std) => (
                  <div key={std.code} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-primary">{std.code} - {std.title}</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{std.description}</p>
                    <p className="text-xs text-accent font-medium bg-accent/5 p-2 rounded-lg mb-2">
                      <span className="font-bold">الاستخدام:</span> {std.usage}
                    </p>
                    <p className="text-xs text-gray-500 italic">
                      <span className="font-bold not-italic">مثال مصري:</span> {std.example}
                    </p>
                  </div>
                ))}
                <Link to="/egyptian-standards" className="block text-center p-4 border-2 border-dashed border-gray-200 rounded-2xl text-accent font-bold hover:border-accent transition-all">
                  عرض كافة المعايير المصرية
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Importance Section */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary">أهمية تطبيق المعايير الدولية</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'زيادة الشفافية', desc: 'توفير معلومات مالية واضحة ومفهومة للجميع.', icon: <Eye className="w-10 h-10 text-accent" /> },
              { title: 'جذب المستثمرين', desc: 'تسهيل مقارنة الأداء المالي للشركات عالمياً.', icon: <TrendingUp className="w-10 h-10 text-accent" /> },
              { title: 'تحسين القرارات', desc: 'الاعتماد على بيانات دقيقة وموثوقة في التخطيط.', icon: <CheckCircle className="w-10 h-10 text-accent" /> },
              { title: 'توحيد التقارير', desc: 'إزالة العوائق المحاسبية بين الدول المختلفة.', icon: <Globe className="w-10 h-10 text-accent" /> },
            ].map((item, i) => (
              <div key={i} className="text-center space-y-4">
                <div className="bg-secondary p-6 rounded-full w-fit mx-auto text-accent">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold text-primary">{item.title}</h4>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How we apply */}
      <section className="section-padding bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold">كيف نطبق هذه المعايير في شركتنا؟</h2>
              <div className="space-y-6">
                {[
                  { title: 'أحدث المعايير الدولية', desc: 'نتابع باستمرار تحديثات مجلس معايير المحاسبة الدولية (IASB).', icon: <RefreshCcw className="w-6 h-6" /> },
                  { title: 'دقة التقارير', desc: 'نضمن خلو القوائم المالية من الأخطاء الجوهرية والالتزام الكامل بالمتطلبات.', icon: <Shield className="w-6 h-6" /> },
                  { title: 'حلول احترافية', desc: 'نقدم استشارات متخصصة حول كيفية تكييف أنظمتك مع المعايير الدولية.', icon: <Briefcase className="w-6 h-6" /> },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="bg-accent/20 p-3 rounded-lg h-fit text-accent">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
              <Award className="w-24 h-24 text-accent mb-8" />
              <h3 className="text-2xl font-bold mb-4">التزامنا بالجودة</h3>
              <p className="text-gray-300 leading-relaxed">
                في إيليجا، لا نعتبر المعايير الدولية مجرد قواعد، بل هي ثقافة عمل نتبناها لضمان تقديم أفضل قيمة لعملائنا وحماية مصالحهم المالية في سوق عالمي متنافس.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent overflow-hidden relative">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8">هل تريد تطبيق المعايير الدولية في شركتك؟</h2>
          <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto">فريقنا جاهز لمساعدتك في إعداد قوائم مالية احترافية وفق أحدث المعايير العالمية.</p>
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
