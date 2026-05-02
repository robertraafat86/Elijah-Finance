import React from 'react';
import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ACCOUNTING_PRINCIPLES, 
  ACCOUNTING_STANDARDS_IAS, 
  ACCOUNTING_STANDARDS_IFRS,
  ACCOUNTING_STANDARDS_EAS,
  NAV_ITEMS
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
  Building2,
  ChevronLeft
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function AccountingStandards() {
  const location = useLocation();
  
  // Find related standards items from NAV_ITEMS
  const standardsCategory = NAV_ITEMS.find(item => item.title === 'معايير ولوائح محاسبية');
  const relatedLinks = standardsCategory?.children || [];

  return (
    <div className="pb-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-40 space-y-6">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-4 pb-4 border-b border-slate-200">الأقسام الفرعية</h3>
                <nav className="flex flex-col gap-2">
                  {relatedLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={cn(
                        'flex items-center justify-between p-3 rounded-xl text-sm font-bold transition-all',
                        location.pathname === link.path 
                          ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                          : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-100'
                      )}
                    >
                      <span>{link.title}</span>
                      <ChevronLeft className="w-4 h-4 opacity-50" />
                    </Link>
                  ))}
                </nav>
              </div>
              
              <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-xl shadow-blue-100">
                <h4 className="font-bold mb-2">تحتاج مساعدة؟</h4>
                <p className="text-xs text-blue-100 mb-4 leading-relaxed">فريقنا جاهز للإجابة على استفساراتك حول المعايير المحاسبية.</p>
                <Link to="/contact" className="block text-center py-2 bg-white text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-50 transition-colors">
                  تواصل معنا
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-grow">
            {/* Header */}
            <section className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden mb-12 shadow-2xl">
              <div className="absolute inset-0 opacity-10">
                <Globe className="w-96 h-96 absolute -bottom-20 -left-20 text-white" />
              </div>
              <div className="relative z-10 max-w-3xl space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-blue-400 rounded-full text-xs font-bold backdrop-blur-sm">
                  <Award className="w-4 h-4" />
                  <span>المعايير الدولية الحديثة</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black leading-tight">المبادئ والمعايير المحاسبية والمالية الدولية</h1>
                <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
                  نلتزم بتطبيق أحدث المعايير الدولية لضمان دقة وشفافية تقاريرك المالية وتوحيدها مع الممارسات العالمية.
                </p>
              </div>
            </section>

            {/* Content Sections */}
            <div className="space-y-24">
              {/* Introduction */}
              <section className="space-y-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900">ما هي المبادئ والمعايير الدولية؟</h2>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed">
                  هي مجموعة من القواعد والإجراءات الموحدة التي تهدف إلى تنظيم العمل المحاسبي وتوحيد طريقة عرض التقارير المالية للشركات حول العالم. تساهم هذه المعايير في جعل القوائم المالية مفهومة وقابلة للمقارنة عبر الحدود، مما يسهل حركة الاستثمار العالمي.
                </p>
              </section>

              {/* Principles Section */}
              <section className="space-y-12">
                <div className="text-center md:text-right space-y-4">
                  <h2 className="text-3xl font-bold text-slate-900">المبادئ المحاسبية الحديثة</h2>
                  <p className="text-slate-500">الركائز الأساسية التي يقوم عليها النظام المحاسبي السليم.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {ACCOUNTING_PRINCIPLES.map((principle, index) => (
                    <motion.div
                      key={principle.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
                    >
                      <div className="bg-slate-50 p-4 rounded-xl w-fit text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        {principle.icon}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-4">{principle.title}</h3>
                      <p className="text-slate-600 text-sm mb-6 leading-relaxed">{principle.description}</p>
                      <div className="bg-slate-50 p-4 rounded-xl border-r-4 border-blue-600">
                        <p className="text-[10px] font-black text-slate-400 mb-1 uppercase tracking-wider">مثال عملي</p>
                        <p className="text-sm text-slate-900 font-bold italic">"{principle.example}"</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>

              {/* Comparison Section */}
              <section className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-100 shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-8">
                    <h2 className="text-3xl font-bold text-slate-900">المعايير الدولية المحاسبية</h2>
                    <p className="text-lg text-slate-600 leading-relaxed">
                      يتم التمييز غالباً بين نوعين من المعايير الدولية، وهما IAS و IFRS. كلاهما يهدف لنفس الغاية ولكن يختلفان في تاريخ الإصدار والجهة المصدرة.
                    </p>
                    
                    <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-lg">
                      <table className="w-full border-collapse bg-white">
                        <thead>
                          <tr className="bg-slate-900 text-white">
                            <th className="p-4 text-right text-xs font-bold uppercase tracking-wider">وجه المقارنة</th>
                            <th className="p-4 text-right text-xs font-bold uppercase tracking-wider">IAS</th>
                            <th className="p-4 text-right text-xs font-bold uppercase tracking-wider">IFRS</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm">
                          <tr className="border-b border-slate-100">
                            <td className="p-4 font-bold text-slate-900 bg-slate-50/50">الاسم الكامل</td>
                            <td className="p-4 text-slate-600">معايير المحاسبة الدولية</td>
                            <td className="p-4 text-slate-600">المعايير الدولية للإعداد</td>
                          </tr>
                          <tr className="border-b border-slate-100">
                            <td className="p-4 font-bold text-slate-900 bg-slate-50/50">تاريخ الإصدار</td>
                            <td className="p-4 text-slate-600">قبل عام 2001</td>
                            <td className="p-4 text-slate-600">بعد عام 2001</td>
                          </tr>
                          <tr>
                            <td className="p-4 font-bold text-slate-900 bg-slate-50/50">الجهة المصدرة</td>
                            <td className="p-4 text-slate-600">IASC</td>
                            <td className="p-4 text-slate-600">IASB</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl flex items-center justify-center min-h-[300px]">
                    <div className="text-center space-y-4">
                       <Award className="w-20 h-20 text-blue-600 mx-auto opacity-10" />
                       <p className="text-slate-400 font-bold uppercase text-xs tracking-widest leading-loose">
                         معايير دولية معتمدة <br />
                         <span className="text-slate-900 text-lg">نحو لغة مالية عالمية موحدة</span>
                       </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Important Standards */}
              <section className="space-y-12">
                <div className="text-center mb-16 underline decoration-blue-600 decoration-4 underline-offset-8">
                  <h2 className="text-3xl font-bold text-slate-900 uppercase">أهم المعايير الدولية</h2>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                  {/* IAS Group */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-blue-600 flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
                      <FileText className="w-5 h-5" />
                      معايير IAS
                    </h3>
                    <div className="space-y-4">
                      {ACCOUNTING_STANDARDS_IAS.map((std) => (
                        <div key={std.code} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-slate-900">{std.code} - {std.title}</h4>
                          </div>
                          <p className="text-xs text-slate-500 mb-4">{std.description}</p>
                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                             <p className="text-[10px] font-bold text-blue-600 uppercase mb-1">الاستخدام</p>
                             <p className="text-xs text-slate-900 font-bold">{std.usage}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* IFRS Group */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-blue-600 flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
                      <Globe className="w-5 h-5" />
                      معايير IFRS
                    </h3>
                    <div className="space-y-4">
                      {ACCOUNTING_STANDARDS_IFRS.map((std) => (
                        <div key={std.code} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-slate-900">{std.code} - {std.title}</h4>
                          </div>
                          <p className="text-xs text-slate-500 mb-4">{std.description}</p>
                          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                             <p className="text-[10px] font-bold text-blue-600 uppercase mb-1">الاستخدام</p>
                             <p className="text-xs text-slate-900 font-bold">{std.usage}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* EAS Group */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-blue-600 flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-xl border border-blue-100">
                      <Building2 className="w-5 h-5" />
                      معايير EAS (المصرية)
                    </h3>
                    <div className="space-y-4">
                      {ACCOUNTING_STANDARDS_EAS.slice(0, 3).map((std) => (
                        <div key={std.code} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-200 transition-colors">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-slate-900">{std.code} - {std.title}</h4>
                          </div>
                          <p className="text-xs text-slate-500 mb-4">{std.description}</p>
                          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 mb-2">
                             <p className="text-[10px] font-bold text-blue-600 uppercase mb-1">الاستخدام</p>
                             <p className="text-xs text-slate-900 font-bold">{std.usage}</p>
                          </div>
                          <p className="text-[10px] text-slate-400 italic">
                            <span className="font-bold text-slate-600 not-italic uppercase">مثال:</span> {std.example}
                          </p>
                        </div>
                      ))}
                      <Link to="/egyptian-standards" className="block text-center p-4 border-2 border-dashed border-slate-200 rounded-2xl text-blue-600 font-bold hover:bg-blue-50 hover:border-blue-600 transition-all">
                        عرض كافة المعايير المصرية
                      </Link>
                    </div>
                  </div>
                </div>
              </section>

              {/* How we apply */}
              <section className="bg-slate-900 text-white rounded-[32px] p-8 md:p-16 relative overflow-hidden shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                  <div className="space-y-8">
                    <h2 className="text-3xl font-black border-b border-white/10 pb-6 leading-tight">كيف نطبق هذه المعايير <br /> <span className="text-blue-500">في إيليجا؟</span></h2>
                    <div className="space-y-6">
                      {[
                        { title: 'أحدث المعايير الدولية', desc: 'نتابع باستمرار تحديثات مجلس معايير المحاسبة الدولية (IASB).', icon: <RefreshCcw className="w-5 h-5" /> },
                        { title: 'دقة التقارير', desc: 'نضمن خلو القوائم المالية من الأخطاء الجوهرية والالتزام الكامل بالمتطلبات.', icon: <Shield className="w-5 h-5" /> },
                        { title: 'حلول احترافية', desc: 'نقدم استشارات متخصصة حول كيفية تكييف أنظمتك مع المعايير الدولية.', icon: <Briefcase className="w-5 h-5" /> },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-5 group">
                          <div className="bg-white/10 p-4 rounded-2xl h-fit text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                            {item.icon}
                          </div>
                          <div>
                            <h4 className="text-xl font-bold mb-2 transition-colors group-hover:text-blue-400">{item.title}</h4>
                            <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white/5 p-12 rounded-[2rem] border border-white/10 backdrop-blur-sm shadow-inner">
                    <Award className="w-16 h-16 text-blue-500 mb-8" />
                    <h3 className="text-2xl font-black mb-4">التزامنا بالجودة</h3>
                    <p className="text-slate-300 leading-relaxed text-lg font-light">
                      في إيليجا، لا نعتبر المعايير الدولية مجرد قواعد، بل هي ثقافة عمل نتبناها لضمان تقديم أفضل قيمة لعملائنا وحماية مصالحهم المالية في سوق عالمي متنافس.
                    </p>
                  </div>
                </div>
              </section>

              {/* CTA Section */}
              <section className="bg-blue-600 rounded-[2.5rem] py-20 px-8 text-center shadow-2xl shadow-blue-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                  <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">هل تريد تطبيق المعايير الدولية في شركتك؟</h2>
                  <p className="text-blue-50 text-xl font-medium">فريقنا جاهز لمساعدتك في إعداد قوائم مالية احترافية وفق أحدث المعايير العالمية.</p>
                  <Link
                    to="/contact"
                    className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-black text-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-3"
                  >
                    اطلب الخدمة الآن
                    <ArrowLeft className="w-6 h-6" />
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
