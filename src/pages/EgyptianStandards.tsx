import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ACCOUNTING_STANDARDS_EAS } from '../constants';
import { 
  ArrowLeft, 
  ArrowRight,
  CheckCircle, 
  ShieldCheck, 
  FileText,
  Briefcase,
  Scale,
  Building2,
  Gavel,
  LayoutDashboard
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function EgyptianStandards() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const COMPARISON_DATA = [
    { item: t('egyptian_standards_page.comparison.table.rows.0.item'), eas: "EAS 1", ifrs: "IAS 1" },
    { item: t('egyptian_standards_page.comparison.table.rows.1.item'), eas: "EAS 17", ifrs: "IFRS 15" },
    { item: t('egyptian_standards_page.comparison.table.rows.2.item'), eas: "EAS 7", ifrs: "IAS 7" },
    { item: t('egyptian_standards_page.comparison.table.rows.3.item'), eas: "EAS 16", ifrs: "IAS 16" }
  ];

  return (
    <div className={cn("pt-24", isRtl ? "font-sans-arabic" : "font-sans")}>
      {/* Header */}
      <section className="bg-primary py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Building2 className={cn("w-96 h-96 absolute -bottom-20 text-white", isRtl ? "-left-20" : "-right-20")} />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center md:text-right">
          <div className={cn("max-w-3xl space-y-6", isRtl ? "md:mr-0 md:ml-auto" : "md:ml-0 md:mr-auto md:text-left")}>
            <h1 className="text-4xl md:text-5xl font-extrabold">{t('egyptian_standards_page.title')}</h1>
            <p className="text-xl text-gray-300">
              {t('egyptian_standards_page.subtitle')}
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
            <h2 className="text-3xl font-bold text-primary">{t('egyptian_standards_page.what_is.title')}</h2>
            <p className={cn("text-lg text-gray-600 leading-relaxed", isRtl ? "text-right" : "text-left")}>
              {t('egyptian_standards_page.what_is.desc')}
            </p>
            <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-6", isRtl ? "text-right" : "text-left")}>
              <div className="bg-secondary p-6 rounded-2xl border-r-4 border-accent">
                <h4 className="font-bold text-primary mb-2">{t('egyptian_standards_page.what_is.goal_title')}</h4>
                <p className="text-sm text-gray-600">{t('egyptian_standards_page.what_is.goal_desc')}</p>
              </div>
              <div className="bg-secondary p-6 rounded-2xl border-r-4 border-accent">
                <h4 className="font-bold text-primary mb-2">{t('egyptian_standards_page.what_is.authority_title')}</h4>
                <p className="text-sm text-gray-600">{t('egyptian_standards_page.what_is.authority_desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EAS Standards Section */}
      <section className="section-padding bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold text-primary">{t('egyptian_standards_page.eas_section.title')}</h2>
            <p className="text-gray-600">{t('egyptian_standards_page.eas_section.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ACCOUNTING_STANDARDS_EAS.map((std, index) => (
              <motion.div
                key={std.code}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group",
                  isRtl ? "text-right" : "text-left"
                )}
              >
                <div className={cn(
                  "bg-secondary p-4 rounded-xl w-fit text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors",
                  isRtl ? "mr-0 ml-auto" : "ml-0 mr-auto"
                )}>
                  {std.icon}
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">{std.code}</h3>
                <h4 className="text-lg font-bold text-accent mb-4">{t(std.title)}</h4>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">{t(std.description)}</p>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs font-bold text-gray-400 mb-1">{t('egyptian_standards_page.eas_section.usage_label')}</p>
                    <p className="text-xs text-primary">{t(std.usage)}</p>
                  </div>
                  <div className={cn("p-3 rounded-lg border-accent", isRtl ? "bg-accent/5 border-r-2" : "bg-accent/5 border-l-2")}>
                    <p className="text-xs font-bold text-accent mb-1">{t('egyptian_standards_page.eas_section.example_label')}</p>
                    <p className="text-xs text-primary italic">{t(std.example)}</p>
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
              <h2 className="text-3xl font-bold text-primary">{t('egyptian_standards_page.comparison.title')}</h2>
              <p className="text-gray-600 mt-4">{t('egyptian_standards_page.comparison.subtitle')}</p>
            </div>
            
            <div className="overflow-x-auto rounded-3xl shadow-xl border border-gray-100">
              <table className="w-full border-collapse bg-white">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className={cn("p-6 font-bold", isRtl ? "text-right" : "text-left")}>{t('egyptian_standards_page.comparison.table.header_item')}</th>
                    <th className={cn("p-6 font-bold", isRtl ? "text-right" : "text-left")}>{t('egyptian_standards_page.comparison.table.header_eas')}</th>
                    <th className={cn("p-6 font-bold", isRtl ? "text-right" : "text-left")}>{t('egyptian_standards_page.comparison.table.header_ifrs')}</th>
                  </tr>
                </thead>
                <tbody className="text-sm md:text-base">
                  {COMPARISON_DATA.map((row, idx) => (
                    <tr key={idx} className={cn("border-b border-gray-100 transition-colors hover:bg-gray-50", idx % 2 !== 0 && "bg-gray-50")}>
                      <td className={cn("p-6 font-bold text-primary", isRtl ? "text-right" : "text-left")}>{row.item}</td>
                      <td className={cn("p-6 text-gray-600", isRtl ? "text-right" : "text-left")}>{row.eas}</td>
                      <td className={cn("p-6 text-gray-600", isRtl ? "text-right" : "text-left")}>{row.ifrs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={cn("mt-12 bg-secondary p-8 rounded-3xl border-primary", isRtl ? "border-r-8 text-right" : "border-l-8 text-left")}>
              <h4 className="text-xl font-bold text-primary mb-4">{t('egyptian_standards_page.comparison.differences_title')}</h4>
              <p className="text-gray-600 leading-relaxed">
                {t('egyptian_standards_page.comparison.differences_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Importance Section */}
      <section className="section-padding bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">{t('egyptian_standards_page.importance.title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: t('egyptian_standards_page.importance.items.0.title'), desc: t('egyptian_standards_page.importance.items.0.desc'), icon: <ShieldCheck className="w-12 h-12 text-accent" /> },
              { title: t('egyptian_standards_page.importance.items.1.title'), desc: t('egyptian_standards_page.importance.items.1.desc'), icon: <FileText className="w-12 h-12 text-accent" /> },
              { title: t('egyptian_standards_page.importance.items.2.title'), desc: t('egyptian_standards_page.importance.items.2.desc'), icon: <Scale className="w-12 h-12 text-accent" /> },
              { title: t('egyptian_standards_page.importance.items.3.title'), desc: t('egyptian_standards_page.importance.items.3.desc'), icon: <LayoutDashboard className="w-12 h-12 text-accent" /> },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "bg-white/5 p-8 rounded-3xl border border-white/10 text-center hover:bg-white/10 transition-all",
                  isRtl ? "text-right" : "text-left"
                )}
              >
                <div className={cn("mb-6 flex italic", isRtl ? "justify-end" : "justify-start")}>
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
            <h2 className="text-3xl font-bold text-primary text-center mb-12">{t('egyptian_standards_page.how_we_apply.title')}</h2>
            <div className="space-y-8">
              {[
                { title: t('egyptian_standards_page.how_we_apply.items.0.title'), desc: t('egyptian_standards_page.how_we_apply.items.0.desc'), icon: <FileText className="w-8 h-8" /> },
                { title: t('egyptian_standards_page.how_we_apply.items.1.title'), desc: t('egyptian_standards_page.how_we_apply.items.1.desc'), icon: <Gavel className="w-8 h-8" /> },
                { title: t('egyptian_standards_page.how_we_apply.items.2.title'), desc: t('egyptian_standards_page.how_we_apply.items.2.desc'), icon: <Briefcase className="w-8 h-8" /> },
              ].map((item, i) => (
                <div key={i} className={cn("flex gap-6 items-start p-6 bg-secondary rounded-2xl border border-gray-100", isRtl ? "flex-row" : "flex-row")}>
                  <div className="bg-primary text-white p-3 rounded-xl shrink-0">
                    {item.icon}
                  </div>
                  <div className={isRtl ? "text-right" : "text-left"}>
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
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8">{t('egyptian_standards_page.cta.title')}</h2>
          <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto">{t('egyptian_standards_page.cta.desc')}</p>
          <Link
            to="/contact"
            className={cn(
              "bg-white text-accent px-12 py-5 rounded-full font-bold text-xl hover:bg-gray-100 transition-all shadow-xl inline-flex items-center gap-2",
              isRtl ? "flex-row-reverse" : "flex-row"
            )}
          >
            {t('egyptian_standards_page.cta.button')}
            {isRtl ? <ArrowRight className="w-6 h-6" /> : <ArrowLeft className="w-6 h-6" />}
          </Link>
        </div>
      </section>
    </div>
  );
}
