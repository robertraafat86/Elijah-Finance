import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../constants';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Services() {
  return (
    <div className="pt-24">
      {/* Header */}
      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold">خدماتنا المحاسبية</h1>
            <p className="text-xl text-gray-300">
              نقدم مجموعة متكاملة من الخدمات المحاسبية تشمل مسك الدفاتر، إعداد القوائم المالية، المراجعة الداخلية، والخدمات الضريبية، لمساعدتك في إدارة أعمالك بكفاءة.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={cn(
                  "flex flex-col lg:flex-row gap-12 p-8 md:p-12 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all",
                  index % 2 !== 0 && "lg:flex-row-reverse"
                )}
              >
                <div className="lg:w-1/3 flex flex-col items-center lg:items-start text-center lg:text-right">
                  <div className="bg-secondary p-6 rounded-2xl text-primary mb-6">
                    {service.icon}
                  </div>
                  <h2 className="text-3xl font-bold text-primary mb-4">{service.title}</h2>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>

                <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-primary">ماذا تشمل الخدمة؟</h3>
                    <ul className="space-y-4">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-gray-700">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-secondary p-8 rounded-2xl flex flex-col justify-center items-center text-center space-y-6">
                    <h4 className="text-lg font-bold text-primary">هل هذه الخدمة مناسبة لك؟</h4>
                    <p className="text-sm text-gray-500">تواصل معنا الآن للحصول على استشارة مجانية وعرض سعر مخصص.</p>
                    <Link
                      to="/contact"
                      className="bg-accent text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-all flex items-center gap-2"
                    >
                      اطلب عرض سعر
                      <ArrowLeft className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// End of file
