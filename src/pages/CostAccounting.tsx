import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Calculator, 
  PieChart, 
  TrendingUp, 
  Factory, 
  Target, 
  BarChart3, 
  Layers, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  ArrowRight,
  Settings,
  Users,
  Box,
  ClipboardList
} from 'lucide-react';
import { cn } from '../lib/utils';

const CostAccounting = () => {
  const [unitCost, setUnitCost] = useState({
    materials: 0,
    labor: 0,
    overhead: 0,
    units: 1
  });

  const [breakEven, setBreakEven] = useState({
    fixedCosts: 0,
    sellingPrice: 0,
    variableCostPerUnit: 0
  });

  const calculateUnitCost = () => {
    const total = (Number(unitCost.materials) + Number(unitCost.labor) + Number(unitCost.overhead)) / (Number(unitCost.units) || 1);
    return total.toFixed(2);
  };

  const calculateBreakEven = () => {
    const denominator = Number(breakEven.sellingPrice) - Number(breakEven.variableCostPerUnit);
    if (denominator <= 0) return 0;
    return Math.ceil(Number(breakEven.fixedCosts) / denominator);
  };

  return (
    <div className="min-h-screen bg-white pt-20" dir="rtl">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent mb-6">
              <Factory className="w-5 h-5" />
              <span className="font-bold">محاسبة التكاليف</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              دليلك الشامل في <span className="text-accent">محاسبة التكاليف</span> والرقابة الصناعية
            </h1>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              تعلم كيف تحسب تكلفة منتجاتك بدقة، وتحلل عناصر التكلفة، وتدعم اتخاذ القرار لزيادة ربحية شركتك.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-primary mb-6">ما هي محاسبة التكاليف؟</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                محاسبة التكاليف هي فرع من فروع المحاسبة يهتم بتجميع وتسجيل وتحليل بيانات التكاليف المتعلقة بالأنشطة والعمليات المختلفة داخل المنشأة، بهدف تحديد تكلفة المنتج أو الخدمة، والرقابة على التكاليف، ومساعدة الإدارة في اتخاذ القرارات.
              </p>
              <div className="space-y-4">
                {[
                  { title: "الفرق عن المحاسبة المالية", desc: "المحاسبة المالية تخدم الأطراف الخارجية، بينما محاسبة التكاليف تخدم الإدارة الداخلية." },
                  { title: "الأهمية في التسعير", desc: "تحديد السعر العادل للمنتج بناءً على تكلفته الفعلية وهامش الربح المطلوب." },
                  { title: "الرقابة والتقييم", desc: "مقارنة التكاليف الفعلية بالمعيارية لتحديد الانحرافات ومعالجتها." }
                ].map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 rounded-xl bg-gray-50 border-r-4 border-accent">
                    <div>
                      <h4 className="font-bold text-primary mb-1">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] bg-primary/5 rounded-2xl border border-gray-100 flex items-center justify-center p-12">
                 <div className="text-center space-y-4">
                    <Factory className="w-16 h-16 text-primary mx-auto opacity-20" />
                    <p className="text-primary/40 font-bold">دقة في تحليل البيانات</p>
                 </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-accent p-8 rounded-2xl shadow-xl hidden md:block">
                <div className="text-primary font-bold text-4xl mb-1">100%</div>
                <div className="text-primary/80 text-sm">دقة في تحليل البيانات</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cost Elements Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">عناصر التكاليف الأساسية</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              تتكون تكلفة أي منتج من ثلاثة عناصر رئيسية يجب تتبعها بدقة لضمان حساب التكلفة الإجمالية الصحيحة.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Box,
                title: "المواد المباشرة",
                desc: "هي المواد الخام التي تدخل مباشرة في تصنيع المنتج ويمكن تتبعها بسهولة.",
                examples: "الخشب في الأثاث، القماش في الملابس."
              },
              {
                icon: Users,
                title: "الأجور المباشرة",
                desc: "هي أجور العمال الذين يعملون مباشرة على تحويل المواد الخام إلى منتج نهائي.",
                examples: "أجور عمال الإنتاج، الفنيين المتخصصين."
              },
              {
                icon: Settings,
                title: "المصروفات الصناعية غير المباشرة",
                desc: "هي التكاليف التي لا يمكن تتبعها مباشرة لمنتج معين ولكنها ضرورية للإنتاج.",
                examples: "إيجار المصنع، الكهرباء، إهلاك الآلات."
              }
            ].map((element, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-accent transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors">
                  <element.icon className="w-8 h-8 text-primary group-hover:text-accent" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{element.title}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{element.desc}</p>
                <div className="pt-4 border-t border-gray-100">
                  <span className="text-xs font-bold text-accent uppercase tracking-wider">أمثلة:</span>
                  <p className="text-gray-500 text-sm mt-1">{element.examples}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Systems Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 lg:p-20">
                <h2 className="text-3xl font-bold text-white mb-8">أنظمة محاسبة التكاليف</h2>
                <div className="space-y-8">
                  {[
                    { title: "نظام تكاليف الأوامر الإنتاجية", desc: "يستخدم عندما يتم الإنتاج بناءً على طلبات خاصة ومحددة لكل عميل." },
                    { title: "نظام تكاليف المراحل الإنتاجية", desc: "يستخدم في الصناعات ذات الإنتاج المستمر والنمطي مثل البترول والأسمنت." },
                    { title: "نظام التكاليف المعيارية", desc: "تحديد تكاليف مقدرة مسبقاً ومقارنتها بالتكاليف الفعلية لتحليل الانحرافات." },
                    { title: "نظام التكاليف على أساس النشاط (ABC)", desc: "توزيع التكاليف غير المباشرة بناءً على الأنشطة التي تستهلك الموارد." }
                  ].map((system, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="text-white font-bold mb-1">{system.title}</h4>
                        <p className="text-white/60 text-sm">{system.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-full min-h-[400px] flex items-center justify-center bg-primary/10">
                <div className="text-center space-y-4 p-12">
                    <Settings className="w-24 h-24 text-white/20 mx-auto" />
                    <p className="text-white/40 font-bold">إدارة العمليات الإنتاجية</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculators Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">أدوات وحاسبات التكاليف</h2>
            <p className="text-gray-600">استخدم هذه الأدوات لتبسيط حساباتك اليومية في إدارة التكاليف.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Unit Cost Calculator */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-primary/5">
                  <Calculator className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-primary">حاسبة تكلفة الوحدة</h3>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">تكلفة المواد</label>
                    <input 
                      type="number"
                      value={unitCost.materials}
                      onChange={(e) => setUnitCost({...unitCost, materials: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">تكلفة الأجور</label>
                    <input 
                      type="number"
                      value={unitCost.labor}
                      onChange={(e) => setUnitCost({...unitCost, labor: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">المصروفات غير المباشرة</label>
                  <input 
                    type="number"
                    value={unitCost.overhead}
                    onChange={(e) => setUnitCost({...unitCost, overhead: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">عدد الوحدات المنتجة</label>
                  <input 
                    type="number"
                    value={unitCost.units}
                    onChange={(e) => setUnitCost({...unitCost, units: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent outline-none transition-all"
                  />
                </div>

                <div className="p-6 rounded-2xl bg-primary text-white text-center">
                  <div className="text-sm text-white/70 mb-1">تكلفة الوحدة الواحدة</div>
                  <div className="text-3xl font-bold text-accent">{calculateUnitCost()} ج.م</div>
                </div>
              </div>
            </div>

            {/* Break-Even Calculator */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-accent/10">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-primary">حاسبة نقطة التعادل</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">إجمالي التكاليف الثابتة</label>
                  <input 
                    type="number"
                    value={breakEven.fixedCosts}
                    onChange={(e) => setBreakEven({...breakEven, fixedCosts: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent outline-none transition-all"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">سعر بيع الوحدة</label>
                    <input 
                      type="number"
                      value={breakEven.sellingPrice}
                      onChange={(e) => setBreakEven({...breakEven, sellingPrice: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">التكلفة المتغيرة للوحدة</label>
                    <input 
                      type="number"
                      value={breakEven.variableCostPerUnit}
                      onChange={(e) => setBreakEven({...breakEven, variableCostPerUnit: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-gray-50 border-2 border-dashed border-accent/30 text-center">
                  <div className="text-sm text-gray-500 mb-1">كمية التعادل (بالوحدات)</div>
                  <div className="text-3xl font-bold text-primary">{calculateBreakEven()} وحدة</div>
                  <p className="text-xs text-gray-400 mt-2">هي الكمية التي لا تحقق عندها الشركة ربحاً ولا خسارة.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reports and Analysis */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-12 text-center">التقارير والتحليلات الأساسية</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "قائمة التكاليف الصناعية",
                  desc: "تقرير يوضح تكلفة المواد والأجور والمصروفات خلال فترة معينة.",
                  icon: ClipboardList
                },
                {
                  title: "تقرير تحليل الانحرافات",
                  desc: "مقارنة الأداء الفعلي بالمعايير المحددة مسبقاً لتحديد نقاط الضعف.",
                  icon: AlertCircle
                },
                {
                  title: "تحليل هامش المساهمة",
                  desc: "دراسة مدى مساهمة كل منتج في تغطية التكاليف الثابتة وتحقيق الربح.",
                  icon: PieChart
                },
                {
                  title: "تقارير مراكز التكلفة",
                  desc: "توزيع التكاليف على الأقسام المختلفة لتقييم كفاءة كل قسم.",
                  icon: Target
                }
              ].map((report, index) => (
                <div key={index} className="flex gap-4 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <report.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-2">{report.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{report.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary mb-6">هل تحتاج إلى استشارة في بناء نظام تكاليف لشركتك؟</h2>
          <p className="text-primary/80 mb-10 max-w-2xl mx-auto text-lg">
            نحن نساعدك في تصميم وتطبيق أنظمة التكاليف التي تناسب طبيعة نشاطك وتدعم نمو أعمالك.
          </p>
          <button className="bg-primary text-white px-10 py-4 rounded-full font-bold hover:bg-primary/90 transition-all shadow-xl">
            تواصل معنا الآن
          </button>
        </div>
      </section>
    </div>
  );
};

export default CostAccounting;
