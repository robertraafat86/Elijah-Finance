import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ACCOUNTING_STEPS } from '../constants';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

export default function AccountingCycle() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  return (
    <div className={cn("pt-24", isRtl ? "text-right" : "text-left")}>
      {/* Header */}
      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4">
          <div className={cn("max-w-3xl space-y-6", !isRtl && "ml-0")}>
            <h1 className="text-4xl md:text-5xl font-extrabold">{t('accounting_cycle.title')}</h1>
            <p className="text-xl text-gray-300">
              {t('accounting_cycle.subtitle')}
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
                    <h2 className="text-3xl font-bold text-primary">{t(`accounting_cycle.steps.${step.id}`)}</h2>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {t(`accounting_cycle.steps.${step.id}_desc`)}
                  </p>
                  
                  <div className={cn("bg-secondary p-6 rounded-2xl border-accent", isRtl ? "border-r-4" : "border-l-4")}>
                    <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      {t('accounting_cycle.practical_example')}
                    </h4>
                    <p className="text-gray-700 italic">{t(`accounting_cycle.steps.${step.id}_example`)}</p>
                  </div>

                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-900 transition-colors group"
                  >
                    {t('accounting_cycle.order_service')}
                    {isRtl ? <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> : <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
                  </Link>
                </div>

                <div className="flex-1">
                  <div className="aspect-[3/2] bg-secondary rounded-3xl border border-gray-100 flex items-center justify-center p-12">
                    <div className="text-center space-y-4">
                       <CheckCircle2 className="w-16 h-16 text-primary mx-auto opacity-20" />
                       <p className="text-primary/40 font-bold">{t('accounting_cycle.stage')} {index + 1}: {t(`accounting_cycle.steps.${step.id}`)}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Summary CTA */}
      <section className="section-padding bg-secondary">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl font-bold text-primary">{t('accounting_cycle.learn_more_prompt')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t('accounting_cycle.learn_more_desc')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-accent text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition-all">
              {t('common.contact_expert')}
            </Link>
            <Link to="/services" className="bg-white text-primary border border-primary px-8 py-4 rounded-full font-bold hover:bg-gray-50 transition-all">
              {t('common.discover_services')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// End of file
