import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Package, 
  ArrowLeft, 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  Calculator, 
  BarChart3,
  CheckCircle
} from 'lucide-react';

export default function Inventory() {
  return (
    <div className="pt-24">
      {/* Header */}
      <section className="bg-primary py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Package className="w-96 h-96 absolute -bottom-20 -left-20 text-white" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold">طرق حساب وتقييم المخزون</h1>
            <p className="text-xl text-gray-300">
              دليلك الشامل لفهم كيفية إدارة المخزون السلعي وأثره على تكلفة البضاعة المباعة وصافي الربح.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="bg-secondary p-8 rounded-3xl space-y-4">
              <div className="bg-primary w-12 h-12 rounded-xl flex items-center justify-center text-white mx-auto mb-4">
                <Package className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-primary">ما هو المخزون؟</h2>
              <p className="text-gray-600 leading-relaxed">
                المخزون هو مجموعة السلع والبضائع التي تمتلكها المنشأة بغرض إعادة بيعها أو استخدامها في الإنتاج. يعتبر المخزون من أهم الأصول المتداولة، وتؤثر طريقة تقييمه بشكل مباشر على تكلفة البضاعة المباعة وبالتالي على صافي الربح.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Inventory Methods Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold text-primary">طرق حساب وتقييم المخزون</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">تختلف الطرق المحاسبية لتقييم المخزون بناءً على تدفق البضائع والسياسة المالية للشركة.</p>
          </div>

          <div className="space-y-12">
            {/* FIFO */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
            >
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/3 space-y-4">
                  <div className="bg-blue-100 text-blue-600 p-3 rounded-xl w-fit">
                    <ArrowDownToLine className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary">1. الوارد أولاً يصرف أولاً (FIFO)</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    تفترض هذه الطريقة أن البضائع التي تم شراؤها أولاً هي التي يتم بيعها أولاً. وبالتالي، فإن مخزون آخر المدة يتم تقييمه بأحدث الأسعار.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-xl border-r-4 border-blue-500">
                    <p className="text-xs font-bold text-blue-500 mb-1">نصيحة عملية:</p>
                    <p className="text-sm text-primary">تعتبر هذه الطريقة مثالية في حالات التضخم لأنها تظهر أرباحاً أعلى وقيمة مخزون قريبة من سعر السوق.</p>
                  </div>
                </div>
                <div className="lg:w-2/3 overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-gray-100 text-primary">
                        <th className="p-3 text-right border">التاريخ</th>
                        <th className="p-3 text-right border">البيان</th>
                        <th className="p-3 text-right border">الكمية</th>
                        <th className="p-3 text-right border">السعر</th>
                        <th className="p-3 text-right border">الإجمالي</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border">1/1</td>
                        <td className="p-3 border">مخزون أول المدة</td>
                        <td className="p-3 border">100 وحدة</td>
                        <td className="p-3 border">10 ج.م</td>
                        <td className="p-3 border">1,000 ج.م</td>
                      </tr>
                      <tr>
                        <td className="p-3 border">15/1</td>
                        <td className="p-3 border">مشتريات</td>
                        <td className="p-3 border">200 وحدة</td>
                        <td className="p-3 border">12 ج.م</td>
                        <td className="p-3 border">2,400 ج.م</td>
                      </tr>
                      <tr className="bg-blue-50 font-bold">
                        <td className="p-3 border" colSpan={2}>المباع (150 وحدة)</td>
                        <td className="p-3 border" colSpan={3}>يتم صرف الـ 100 القديمة أولاً ثم 50 من الجديدة</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>

            {/* LIFO */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
            >
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/3 space-y-4">
                  <div className="bg-orange-100 text-orange-600 p-3 rounded-xl w-fit">
                    <ArrowUpFromLine className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary">2. الوارد أخيراً يصرف أولاً (LIFO)</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    تفترض أن أحدث البضائع المشتراة هي التي تباع أولاً. مخزون آخر المدة يقيم بأقدم الأسعار. (ملاحظة: هذه الطريقة غير مسموح بها في المعايير الدولية IFRS).
                  </p>
                  <div className="bg-orange-50 p-4 rounded-xl border-r-4 border-orange-500">
                    <p className="text-xs font-bold text-orange-500 mb-1">ملاحظة مهمة:</p>
                    <p className="text-sm text-primary">تستخدم غالباً لتقليل الضرائب في حالات ارتفاع الأسعار لأنها تزيد من تكلفة البضاعة المباعة.</p>
                  </div>
                </div>
                <div className="lg:w-2/3 overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-gray-100 text-primary">
                        <th className="p-3 text-right border">التاريخ</th>
                        <th className="p-3 text-right border">البيان</th>
                        <th className="p-3 text-right border">الكمية</th>
                        <th className="p-3 text-right border">السعر</th>
                        <th className="p-3 text-right border">الإجمالي</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border">1/1</td>
                        <td className="p-3 border">مخزون أول المدة</td>
                        <td className="p-3 border">100 وحدة</td>
                        <td className="p-3 border">10 ج.م</td>
                        <td className="p-3 border">1,000 ج.م</td>
                      </tr>
                      <tr>
                        <td className="p-3 border">15/1</td>
                        <td className="p-3 border">مشتريات</td>
                        <td className="p-3 border">200 وحدة</td>
                        <td className="p-3 border">12 ج.م</td>
                        <td className="p-3 border">2,400 ج.م</td>
                      </tr>
                      <tr className="bg-orange-50 font-bold">
                        <td className="p-3 border" colSpan={2}>المباع (150 وحدة)</td>
                        <td className="p-3 border" colSpan={3}>يتم صرف 150 وحدة من مشتريات 15/1 مباشرة</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>

            {/* Weighted Average */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
            >
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/3 space-y-4">
                  <div className="bg-green-100 text-green-600 p-3 rounded-xl w-fit">
                    <Calculator className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary">3. المتوسط المرجح (Weighted Average)</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    يتم حساب متوسط تكلفة الوحدة بقسمة إجمالي تكلفة البضاعة المتاحة للبيع على إجمالي عدد الوحدات.
                  </p>
                  <div className="bg-green-50 p-4 rounded-xl border-r-4 border-green-500">
                    <p className="text-xs font-bold text-green-500 mb-1">المعادلة:</p>
                    <p className="text-sm text-primary">متوسط التكلفة = إجمالي التكلفة / إجمالي الكمية</p>
                  </div>
                </div>
                <div className="lg:w-2/3 overflow-x-auto">
                  <div className="bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-300">
                    <h4 className="font-bold text-primary mb-4">مثال حسابي:</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• إجمالي الكمية المتاحة: 100 + 200 = 300 وحدة</li>
                      <li>• إجمالي التكلفة المتاحة: 1,000 + 2,400 = 3,400 ج.م</li>
                      <li className="text-lg font-bold text-primary mt-4">• متوسط تكلفة الوحدة = 3,400 / 300 = 11.33 ج.م</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Specific Identification */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100"
            >
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/3 space-y-4">
                  <div className="bg-purple-100 text-purple-600 p-3 rounded-xl w-fit">
                    <BarChart3 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary">4. التكلفة المحددة (Specific Identification)</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    تستخدم للسلع الفريدة والمميزة التي يمكن تتبع تكلفتها الفعلية بدقة (مثل السيارات، المجوهرات، أو العقارات).
                  </p>
                  <div className="bg-purple-50 p-4 rounded-xl border-r-4 border-purple-500">
                    <p className="text-xs font-bold text-purple-500 mb-1">متى تستخدم؟</p>
                    <p className="text-sm text-primary">عندما يكون لكل وحدة رقم تسلسلي (Serial Number) خاص بها.</p>
                  </div>
                </div>
                <div className="lg:w-2/3 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <CheckCircle className="w-16 h-16 text-purple-500 mx-auto" />
                    <p className="text-gray-500 italic">"أدق طريقة لربط التكلفة بالإيراد الفعلي لكل وحدة على حدة"</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent overflow-hidden relative">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8">هل ترغب في إعداد المخزون لشركتك بدقة؟</h2>
          <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto">فريقنا جاهز لتقديم خدمات محاسبية احترافية لدعم عملك وضمان دقة بياناتك المالية.</p>
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
