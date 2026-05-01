import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  ArrowLeft, 
  History,
  AlertCircle,
  CheckSquare,
  CreditCard
} from 'lucide-react';

export default function BankReconciliation() {
  return (
    <div className="pt-24">
      {/* Header */}
      <section className="bg-primary py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <CreditCard className="w-96 h-96 absolute -bottom-20 -left-20 text-white" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold">مذكرة تسوية البنك</h1>
            <p className="text-xl text-gray-300">
              تعلم كيفية مطابقة الرصيد الوارد في كشف حساب البنك مع الرصيد المسجل في دفاتر الشركة لضمان دقة النقدية.
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
                <Building2 className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-primary">ما هي مذكرة تسوية البنك؟</h2>
              <p className="text-gray-600 leading-relaxed">
                هي كشف تحليلي يتم إعداده دورياً لمطابقة الرصيد الوارد في كشف حساب البنك مع الرصيد المسجل في دفاتر الشركة. تهدف المذكرة إلى اكتشاف أي فروقات ناتجة عن عمليات لم تسجل بعد أو أخطاء محاسبية لضمان دقة النقدية.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bank Reconciliation Section */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-primary">أسباب الاختلاف وخطوات التسوية</h2>
              <p className="text-gray-600">لماذا يختلف رصيد البنك في دفاترك عن كشف الحساب الفعلي؟</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-accent" />
                  أسباب الاختلاف الشائعة
                </h3>
                <ul className="space-y-4 text-gray-600 text-sm">
                  <li className="flex gap-3">
                    <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">1</span>
                    إيداعات في الطريق (Deposits in Transit): مبالغ أودعتها الشركة ولم تظهر بعد في كشف البنك.
                  </li>
                  <li className="flex gap-3">
                    <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">2</span>
                    شيكات لم تقدم للصرف (Outstanding Checks): شيكات أصدرتها الشركة ولم يقم أصحابها بصرفها بعد.
                  </li>
                  <li className="flex gap-3">
                    <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">3</span>
                    مصاريف بنكية: رسوم خصمها البنك ولم تسجلها الشركة بعد.
                  </li>
                  <li className="flex gap-3">
                    <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs">4</span>
                    شيكات مرفوضة (NSF): شيكات أودعتها الشركة ورفضها البنك لعدم كفاية الرصيد.
                  </li>
                </ul>
              </div>

              <div className="bg-primary text-white p-8 rounded-3xl">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <History className="w-6 h-6 text-accent" />
                  خطوات إعداد المذكرة
                </h3>
                <ol className="space-y-4 text-gray-300 text-sm list-decimal list-inside">
                  <li>ابدأ بالرصيد الوارد في كشف حساب البنك.</li>
                  <li>أضف الإيداعات في الطريق واطرح الشيكات التي لم تصرف.</li>
                  <li>انتقل لرصيد البنك في دفاتر الشركة.</li>
                  <li>أضف أي فوائد دائنة واطرح المصاريف البنكية والشيكات المرفوضة.</li>
                  <li>تأكد من تساوي "الرصيد المعدل" في الطرفين.</li>
                </ol>
              </div>
            </div>

            {/* Reconciliation Table */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-primary text-center">نموذج جدول تسوية البنك</h3>
              <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-lg">
                <table className="w-full border-collapse bg-white text-sm">
                  <thead>
                    <tr className="bg-primary text-white">
                      <th className="p-4 text-right border">البيان</th>
                      <th className="p-4 text-right border">المبلغ (ج.م)</th>
                      <th className="p-4 text-right border">ملاحظات</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-gray-50 font-bold">
                      <td className="p-4 border">رصيد البنك في دفاتر الشركة</td>
                      <td className="p-4 border">50,000</td>
                      <td className="p-4 border">الرصيد قبل التعديل</td>
                    </tr>
                    <tr>
                      <td className="p-4 border text-green-600 font-bold">(+) فوائد بنكية دائنة</td>
                      <td className="p-4 border text-green-600">500</td>
                      <td className="p-4 border">أضافها البنك ولم تسجلها الشركة</td>
                    </tr>
                    <tr>
                      <td className="p-4 border text-red-600 font-bold">(-) مصاريف وعمولات بنكية</td>
                      <td className="p-4 border text-red-600">(200)</td>
                      <td className="p-4 border">خصمها البنك ولم تسجلها الشركة</td>
                    </tr>
                    <tr>
                      <td className="p-4 border text-red-600 font-bold">(-) شيكات مرفوضة (NSF)</td>
                      <td className="p-4 border text-red-600">(1,300)</td>
                      <td className="p-4 border">شيك عميل تم رفضه</td>
                    </tr>
                    <tr className="bg-accent text-white font-bold">
                      <td className="p-4 border">الرصيد المعدل (النهائي)</td>
                      <td className="p-4 border">49,000</td>
                      <td className="p-4 border">يجب أن يطابق رصيد كشف البنك المعدل</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Practical Tips */}
            <div className="bg-secondary p-8 rounded-3xl border-r-8 border-accent">
              <h3 className="text-xl font-bold text-primary mb-4">نصائح عملية للتطبيق الشهري:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'قم بإعداد التسوية فور استلام كشف الحساب البنكي.',
                  'احتفظ بنسخ من جميع الإيداعات والشيكات المصدرة.',
                  'تحقق من تسلسل أرقام الشيكات لاكتشاف أي شيك مفقود.',
                  'قم بإجراء قيود التسوية اللازمة في الدفاتر فور الانتهاء من المذكرة.',
                ].map((tip, i) => (
                  <div key={i} className="flex gap-2 items-center text-sm text-gray-700">
                    <CheckSquare className="w-5 h-5 text-accent shrink-0" />
                    {tip}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent overflow-hidden relative">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8">هل ترغب في إعداد تسوية البنك لشركتك بدقة؟</h2>
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
