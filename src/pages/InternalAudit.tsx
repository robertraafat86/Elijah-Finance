import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ShieldCheck, 
  Search, 
  Settings, 
  Gavel, 
  Monitor, 
  ClipboardCheck, 
  FileSearch, 
  BarChart, 
  FileText, 
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Target,
  Zap
} from 'lucide-react';
import { cn } from '../lib/utils';
import DynamicGallery from '../components/DynamicGallery';

export default function InternalAudit() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const objectivesIcons = [
    <CheckCircle className="w-8 h-8" />,
    <AlertTriangle className="w-8 h-8" />,
    <Zap className="w-8 h-8" />,
    <Gavel className="w-8 h-8" />,
    <Target className="w-8 h-8" />
  ];

  const types = [
    { key: 'financial', icon: <BarChart className="w-10 h-10" /> },
    { key: 'operational', icon: <Settings className="w-10 h-10" /> },
    { key: 'compliance', icon: <ShieldCheck className="w-10 h-10" /> },
    { key: 'systems', icon: <Monitor className="w-10 h-10" /> }
  ];

  const stepsIcons: React.ReactElement<{ className?: string }>[] = [
    <ClipboardCheck />,
    <FileSearch />,
    <BarChart />,
    <FileText />,
    <RefreshCw />
  ];

  const servicesIcons: React.ReactElement<{ className?: string }>[] = [
    <FileSearch />,
    <ShieldCheck />,
    <FileText />,
    <AlertTriangle />,
    <Settings />,
    <Briefcase />
  ];

  return (
    <div className="pt-24">
      {/* Header Section */}
      <section className="bg-primary py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <ShieldCheck className={cn("w-96 h-96 absolute -bottom-20 text-white", isRtl ? "-left-20" : "-right-20")} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className={cn("max-w-3xl space-y-6", isRtl ? "text-right" : "text-left")}>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-extrabold"
            >
              {t('audit_page.title')}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-300"
            >
              {t('audit_page.subtitle')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex p-4 bg-secondary rounded-2xl text-primary mb-4">
              <Search className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-bold text-primary">{t('audit_page.what_is.title')}</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t('audit_page.what_is.desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="section-padding bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary">{t('audit_page.objectives.title')}</h2>
            <p className="text-gray-600 mt-4">{t('audit_page.objectives.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(t('audit_page.objectives.items', { returnObjects: true }) as any[]).map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={cn("bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100", isRtl ? "text-right" : "text-left")}
              >
                <div className="text-accent mb-4">{objectivesIcons[i]}</div>
                <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Types of Internal Audit Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary">{t('audit_page.types.title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {types.map((type, i) => (
              <div key={i} className={cn("flex gap-6 p-8 bg-secondary rounded-3xl border border-gray-100", isRtl ? "flex-row text-right" : "flex-row-reverse text-left")}>
                <div className={cn("space-y-3 flex-grow")}>
                  <h3 className="text-xl font-bold text-primary">{t(`audit_page.types.${type.key}.title`)}</h3>
                  <p className="text-gray-600 text-sm">{t(`audit_page.types.${type.key}.desc`)}</p>
                  <div className={cn("bg-white/50 p-3 rounded-lg border-accent", isRtl ? "border-r-2" : "border-l-2")}>
                    <p className="text-xs font-bold text-accent mb-1">{t('audit_page.types.practical_example')}</p>
                    <p className="text-xs text-primary italic">{t(`audit_page.types.${type.key}.example`)}</p>
                  </div>
                </div>
                <div className="text-primary shrink-0">{type.icon}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="section-padding bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">{t('audit_page.steps.title')}</h2>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
              {(t('audit_page.steps.items', { returnObjects: true }) as any[]).map((item, i) => (
                <div key={i} className="text-center space-y-4 relative z-10">
                  <div className="bg-accent w-12 h-12 rounded-full flex items-center justify-center mx-auto text-white font-bold text-xl shadow-lg">
                    {i + 1}
                  </div>
                  <h4 className="font-bold text-lg">{item.title}</h4>
                  <p className="text-xs text-gray-400 leading-relaxed px-2">{item.desc}</p>
                  <div className="pt-2 text-accent/40 hidden md:block">
                    {React.cloneElement(stepsIcons[i], { className: "w-6 h-6 mx-auto" })}
                  </div>
                </div>
              ))}
              {/* Connector Line (Desktop) */}
              <div className="hidden md:block absolute top-6 left-0 right-0 h-0.5 bg-white/10 -z-0" />
            </div>
          </div>
        </div>
      </section>

      {/* Tools & Importance Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className={cn("space-y-8", isRtl ? "text-right" : "text-left")}>
              <h2 className="text-3xl font-bold text-primary">{t('audit_page.tools.title')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(t('audit_page.tools.items', { returnObjects: true }) as string[]).map((tool, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-secondary rounded-xl">
                    <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                    <span className="text-sm font-medium text-primary">{tool}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={cn("space-y-8", isRtl ? "text-right" : "text-left")}>
              <h2 className="text-3xl font-bold text-primary">{t('audit_page.importance.title')}</h2>
              <ul className="space-y-4">
                {(t('audit_page.importance.items', { returnObjects: true }) as string[]).map((text, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <div className="bg-accent/10 p-1 rounded text-accent mt-1 shrink-0">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <p className="text-gray-600 leading-relaxed">{text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="section-padding bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary">{t('audit_page.comparison.title')}</h2>
            </div>
            <div className="overflow-x-auto rounded-3xl shadow-xl border border-gray-100">
              <table className="w-full border-collapse bg-white">
                <thead>
                  <tr className="bg-primary text-white">
                    <th className={cn("p-6 font-bold", isRtl ? "text-right" : "text-left")}>{t('audit_page.comparison.header.item')}</th>
                    <th className={cn("p-6 font-bold", isRtl ? "text-right" : "text-left")}>{t('audit_page.comparison.header.internal')}</th>
                    <th className={cn("p-6 font-bold", isRtl ? "text-right" : "text-left")}>{t('audit_page.comparison.header.external')}</th>
                  </tr>
                </thead>
                <tbody className="text-sm md:text-base">
                  {(t('audit_page.comparison.rows', { returnObjects: true }) as any[]).map((row, i) => (
                    <tr key={i} className={cn("border-b border-gray-100", i % 2 !== 0 ? "bg-gray-50" : "")}>
                      <td className={cn("p-6 font-bold text-primary", isRtl ? "text-right" : "text-left")}>{row.item}</td>
                      <td className={cn("p-6 text-gray-600", isRtl ? "text-right" : "text-left")}>{row.internal}</td>
                      <td className={cn("p-6 text-gray-600", isRtl ? "text-right" : "text-left")}>{row.external}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 px-4">
            <h2 className="text-3xl font-black text-slate-900 mb-8">{isRtl ? 'رسوم توضيحية للمراجعة الداخلية' : 'Audit Process Illustrations'}</h2>
            <DynamicGallery tag="internal-audit" />
          </div>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary">{t('audit_page.our_services.title')}</h2>
            <p className="text-gray-600 mt-4">{t('audit_page.our_services.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(t('audit_page.our_services.items', { returnObjects: true }) as string[]).map((service, i) => (
              <div key={i} className={cn("p-6 bg-secondary rounded-2xl flex items-center gap-4 hover:bg-primary hover:text-white transition-all group", isRtl ? "flex-row" : "flex-row-reverse")}>
                <div className="text-accent group-hover:text-white">{servicesIcons[i]}</div>
                <h4 className="font-bold">{service}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent overflow-hidden relative">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8">{t('audit_page.cta.title')}</h2>
          <p className="text-white/80 text-lg mb-12 max-w-2xl mx-auto">{t('audit_page.cta.desc')}</p>
          <Link
            to="/contact"
            className="bg-white text-accent px-12 py-5 rounded-full font-bold text-xl hover:bg-gray-100 transition-all shadow-xl inline-flex items-center gap-2"
          >
            {t('audit_page.cta.button')}
            {isRtl ? <ArrowLeft className="w-6 h-6" /> : <ArrowRight className="w-6 h-6" />}
          </Link>
        </div>
      </section>
    </div>
  );
}
