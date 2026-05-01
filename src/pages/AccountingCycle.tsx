import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ACCOUNTING_STEPS } from '../constants';
import { ArrowLeft, BookOpen, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

export default function AccountingCycle() {
  return (
    <div className="pt-24">
      {/* Header */}
      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold">الدورة المحاسبية</h1>
            <p className="text-xl text-gray-300">
              الدورة المحاسبية هي مجموعة من الخطوات المنظمة التي يتم من خلالها تسجيل وتحليل العمليات المالية وصولاً إلى إعداد القوائم المالية. تساعد هذه الدورة على ضمان دقة البيانات واتخاذ قرارات مالية سليمة.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="space-y-24">
            {ACCOUNTING_STEPS.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={cn(
                  "flex flex-col lg:items-center gap-12",
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                )}
              >
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="bg-accent text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                      {index + 1}
                    </span>
                    <h2 className="text-3xl font-bold text-primary">{step.title}</h2>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                  
                  <div className="bg-secondary p-6 rounded-2xl border-r-4 border-accent">
                    <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      مثال عملي:
                    </h4>
                    <p className="text-gray-700 italic">{step.example}</p>
                  </div>

                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-900 transition-colors"
                  >
                    اطلب تنفيذ هذه الخدمة
                    <ArrowLeft className="w-4 h-4" />
                  </Link>
                </div>

                <div className="flex-1">
                  <img 
                    src={`https://picsum.photos/seed/accounting-step-${index}/600/400`} 
                    alt={step.title} 
                    className="rounded-3xl shadow-xl w-full"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Summary CTA */}
      <section className="section-padding bg-secondary">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl font-bold text-primary">هل ترغب في تعلم المزيد أو تطبيق هذا في شركتك؟</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">نحن هنا لمساعدتك في بناء نظام محاسبي قوي ودقيق يتبع أفضل الممارسات العالمية.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-accent text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition-all">
              تواصل مع خبير محاسبي
            </Link>
            <Link to="/services" className="bg-white text-primary border border-primary px-8 py-4 rounded-full font-bold hover:bg-gray-50 transition-all">
              اكتشف خدماتنا
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// End of file
