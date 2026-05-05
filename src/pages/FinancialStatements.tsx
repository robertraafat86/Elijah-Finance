import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FINANCIAL_STATEMENTS } from '../constants';
import { ArrowLeft, ArrowRight, FileText, PieChart } from 'lucide-react';
import { cn } from '../lib/utils';

export default function FinancialStatements() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  return (
    <div className="pt-24">
      {/* Header */}
      <section className="bg-primary py-20 text-white">
        <div className="container mx-auto px-4">
          <div className={cn("max-w-3xl space-y-6", isRtl ? "text-right" : "text-left")}>
            <h1 className="text-4xl md:text-5xl font-extrabold">{t('statements.page_title')}</h1>
            <p className="text-xl text-gray-300">
              {t('statements.page_subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12">
            {FINANCIAL_STATEMENTS.map((statement, index) => (
              <motion.div
                key={statement.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100 flex flex-col lg:flex-row gap-12",
                  isRtl ? "text-right" : "text-left"
                )}
              >
                <div className="lg:w-1/2 space-y-6">
                  <div className={cn("bg-secondary p-4 rounded-2xl w-fit text-accent mb-6", isRtl ? "mr-0" : "ml-0")}>
                    <FileText className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-bold text-primary mb-4">{t(statement.title)}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {t(statement.description)}
                  </p>
                  
                  <div className="bg-gray-50 p-6 rounded-2xl border-dashed border-2 border-gray-200">
                    <h4 className="font-bold text-sm text-gray-400 uppercase tracking-wider mb-3">{t('statements.simple_example')}</h4>
                    <p className="text-primary font-medium">{t(statement.example)}</p>
                  </div>

                  <Link
                    to="/contact"
                    className="inline-flex bg-primary text-white text-center py-4 px-8 rounded-xl font-bold hover:bg-blue-900 transition-colors items-center gap-2"
                  >
                    {t('statements.order_btn')}
                    {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </Link>
                </div>

                <div className="lg:w-1/2">
                  <div className="bg-primary text-white p-6 md:p-8 rounded-3xl font-mono text-sm overflow-x-auto shadow-inner">
                    <h4 className="text-accent font-bold mb-6 border-b border-white/10 pb-4">{t('statements.template_title')}</h4>
                    <pre className={cn("whitespace-pre leading-relaxed", isRtl ? "text-right" : "text-left")}>
                      {t(statement.template)}
                    </pre>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Importance Section */}
      <section className="section-padding bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={cn("space-y-8", isRtl ? "text-right" : "text-left")}>
              <h2 className="text-3xl font-bold text-primary">{t('statements.importance_title')}</h2>
              <ul className="space-y-4">
                {(t('statements.importance_items', { returnObjects: true }) as string[]).map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 bg-accent rounded-full shrink-0"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-xl">
              <PieChart className="w-full h-64 text-accent/20" />
              <p className="text-center text-gray-400 text-sm mt-4">{t('statements.chart_desc')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
