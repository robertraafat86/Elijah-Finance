import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Ship, 
  Calculator, 
  FileText, 
  ShieldCheck, 
  ArrowLeft, 
  ArrowRight,
  CheckCircle, 
  Info,
  DollarSign,
  Percent,
  Truck,
  Search,
  Gavel,
  ClipboardCheck,
  PackageCheck,
  Globe
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function CustomsDuties() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const [cifValue, setCifValue] = useState<string>('');
  const [customsRate, setCustomsRate] = useState<string>('');
  const [vatRate, setVatRate] = useState<string>('14');
  const [results, setResults] = useState<{
    customsAmount: number;
    vatAmount: number;
    totalCost: number;
  } | null>(null);

  const calculateCustoms = () => {
    const cif = parseFloat(cifValue);
    const cRate = parseFloat(customsRate);
    const vRate = parseFloat(vatRate);

    if (isNaN(cif) || isNaN(cRate) || isNaN(vRate)) return;

    const customsAmount = cif * (cRate / 100);
    const vatAmount = (cif + customsAmount) * (vRate / 100);
    const totalCost = cif + customsAmount + vatAmount;

    setResults({
      customsAmount,
      vatAmount,
      totalCost
    });
  };

  const reset = () => {
    setCifValue('');
    setCustomsRate('');
    setVatRate('14');
    setResults(null);
  };

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="bg-primary py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Ship className={cn("w-96 h-96 absolute -bottom-20 text-white", isRtl ? "-left-20" : "-right-20")} />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              {t('customs_page.title')}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {t('customs_page.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={cn("space-y-6", isRtl ? "text-right" : "text-left")}>
              <h2 className="text-3xl font-bold text-primary">{t('customs_page.what_is.title')}</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {t('customs_page.what_is.desc')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: t('customs_page.what_is.protection'), icon: <ShieldCheck className="text-accent" /> },
                  { title: t('customs_page.what_is.regulation'), icon: <Truck className="text-primary" /> },
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-secondary rounded-2xl flex items-center gap-3 border border-gray-100">
                    <div className="bg-white p-2 rounded-lg shadow-sm">{item.icon}</div>
                    <p className="font-bold text-primary text-sm">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[3/2] bg-secondary rounded-3xl border border-gray-100 flex items-center justify-center p-12">
                 <div className="text-center space-y-4">
                    <Ship className="w-16 h-16 text-primary mx-auto opacity-20" />
                    <p className="text-primary/40 font-bold">{t('customs_page.what_is.accuracy')}</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Types of Fees Grid */}
      <section className="section-padding bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold text-primary">{t('customs_page.fees_types.title')}</h2>
            <p className="text-gray-600">{t('customs_page.fees_types.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(t('customs_page.fees_types.items', { returnObjects: true }) as any[]).map((fee, i) => {
              const icons = [<Calculator />, <Percent />, <Truck />, <DollarSign />];
              return (
                <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all text-center space-y-4 group">
                  <div className="bg-secondary p-4 rounded-2xl w-fit mx-auto text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    {icons[i]}
                  </div>
                  <h3 className="text-xl font-bold text-primary">{fee.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{fee.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Customs Tariff Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-primary">{t('customs_page.tariff.title')}</h2>
              <p className="text-gray-600">{t('customs_page.tariff.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className={cn("bg-primary/5 p-8 rounded-3xl border border-primary/10 space-y-4", isRtl ? "text-right" : "text-left")}>
                <h4 className={cn("text-xl font-bold text-primary flex items-center gap-2", isRtl ? "flex-row" : "flex-row-reverse")}>
                  <Search className="w-6 h-6 text-accent shrink-0" />
                  {t('customs_page.tariff.hs_code.title')}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {t('customs_page.tariff.hs_code.desc')}
                </p>
              </div>
              <div className={cn("bg-primary/5 p-8 rounded-3xl border border-primary/10 space-y-4", isRtl ? "text-right" : "text-left")}>
                <h4 className={cn("text-xl font-bold text-primary flex items-center gap-2", isRtl ? "flex-row" : "flex-row-reverse")}>
                  <Gavel className="w-6 h-6 text-accent shrink-0" />
                  {t('customs_page.tariff.unified_tariff.title')}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {t('customs_page.tariff.unified_tariff.desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculation Steps & Example */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={cn("space-y-8", isRtl ? "text-right" : "text-left")}>
              <h2 className="text-3xl font-bold text-primary">{t('customs_page.calculation.title')}</h2>
              <div className="space-y-6">
                {(t('customs_page.calculation.steps', { returnObjects: true }) as any[]).map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <span className="bg-accent text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">{i + 1}</span>
                    <div>
                      <h5 className="font-bold text-primary">{item.title}</h5>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              <div className="bg-primary p-6 text-white text-center">
                <h4 className="text-xl font-bold">{t('customs_page.example.title')}</h4>
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-600">{t('customs_page.example.cif')}</span>
                    <span className="font-bold text-primary">100,000 {isRtl ? 'ج.م' : 'EGP'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-600">{t('customs_page.example.customs_fee')}</span>
                    <span className="font-bold text-accent">+ 10,000 {isRtl ? 'ج.م' : 'EGP'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-600">{t('customs_page.example.vat_fee')}</span>
                    <span className="font-bold text-accent">+ 15,400 {isRtl ? 'ج.م' : 'EGP'}</span>
                  </div>
                  <div className={cn("flex justify-between items-center pt-4 bg-secondary p-4 rounded-xl", isRtl ? "flex-row-reverse" : "")}>
                    <span className="font-bold text-primary text-lg">{t('customs_page.example.total')}</span>
                    <span className="text-2xl font-black text-primary">125,400 {isRtl ? 'ج.م' : 'EGP'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Calculator Section */}
      <section className="section-padding bg-white" id="customs-calculator">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">{t('customs_page.calculator.title')}</h2>
              <p className="text-gray-600">{t('customs_page.calculator.subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Form */}
              <div className={cn("bg-secondary p-8 rounded-[2.5rem] space-y-6", isRtl ? "text-right" : "text-left")}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary block">{t('customs_page.calculator.label_cif')}</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        value={cifValue}
                        onChange={(e) => setCifValue(e.target.value)}
                        placeholder={t('customs_page.calculator.placeholder_cif')}
                        className={cn("w-full p-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-accent outline-none", isRtl ? "pr-12" : "pl-12")}
                      />
                      <DollarSign className={cn("absolute top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5", isRtl ? "right-4" : "left-4")} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary block">{t('customs_page.calculator.label_customs')}</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        value={customsRate}
                        onChange={(e) => setCustomsRate(e.target.value)}
                        placeholder={t('customs_page.calculator.placeholder_customs')}
                        className={cn("w-full p-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-accent outline-none", isRtl ? "pr-12" : "pl-12")}
                      />
                      <Percent className={cn("absolute top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5", isRtl ? "right-4" : "left-4")} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary block">{t('customs_page.calculator.label_vat')}</label>
                    <div className="relative">
                      <input 
                        type="number" 
                        value={vatRate}
                        onChange={(e) => setVatRate(e.target.value)}
                        className={cn("w-full p-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-accent outline-none", isRtl ? "pr-12" : "pl-12")}
                      />
                      <Percent className={cn("absolute top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5", isRtl ? "right-4" : "left-4")} />
                    </div>
                    <p className="text-[10px] text-gray-400">{t('customs_page.calculator.vat_note')}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={calculateCustoms}
                    className="flex-grow bg-primary text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Calculator className="w-5 h-5" />
                    {t('customs_page.calculator.button_calc')}
                  </button>
                  <button 
                    onClick={reset}
                    className="p-4 bg-white text-gray-400 rounded-2xl hover:text-red-500 transition-all border border-gray-100"
                  >
                    <RefreshCcw className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-6">
                {results ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-accent text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <h3 className={cn("text-xl font-bold mb-8 relative z-10", isRtl ? "text-right" : "text-left")}>{t('customs_page.calculator.results_title')}</h3>
                    
                    <div className={cn("space-y-6 relative z-10", isRtl ? "text-right" : "text-left")}>
                      <div className={cn("flex justify-between items-center border-b border-white/20 pb-4", isRtl ? "flex-row-reverse" : "")}>
                        <span className="text-blue-100">{t('customs_page.calculator.res_customs')}</span>
                        <span className="text-2xl font-bold">{results.customsAmount.toLocaleString(isRtl ? 'ar-EG' : 'en-US', { minimumFractionDigits: 2 })} {isRtl ? 'ج.م' : 'EGP'}</span>
                      </div>
                      <div className={cn("flex justify-between items-center border-b border-white/20 pb-4", isRtl ? "flex-row-reverse" : "")}>
                        <span className="text-blue-100">{t('customs_page.calculator.res_vat')}</span>
                        <span className="text-2xl font-bold">{results.vatAmount.toLocaleString(isRtl ? 'ar-EG' : 'en-US', { minimumFractionDigits: 2 })} {isRtl ? 'ج.م' : 'EGP'}</span>
                      </div>
                      <div className={cn("flex justify-between items-center pt-4", isRtl ? "flex-row-reverse" : "")}>
                        <span className="text-white font-bold">{t('customs_page.calculator.res_total')}</span>
                        <span className="text-3xl font-black">{results.totalCost.toLocaleString(isRtl ? 'ar-EG' : 'en-US', { minimumFractionDigits: 2 })} {isRtl ? 'ج.م' : 'EGP'}</span>
                      </div>
                    </div>

                    <div className={cn("mt-8 flex items-start gap-2 text-[10px] text-blue-100 bg-white/10 p-4 rounded-2xl", isRtl ? "text-right" : "text-left")}>
                      <Info className="w-4 h-4 shrink-0" />
                      <p>{t('customs_page.calculator.disclaimer')}</p>
                    </div>
                  </motion.div>
                ) : (
                  <div className="h-full min-h-[350px] bg-gray-50 border-2 border-dashed border-gray-200 rounded-[2.5rem] flex flex-col items-center justify-center text-center p-8 text-gray-400">
                    <Calculator className="w-20 h-20 mb-4 opacity-10" />
                    <p className="font-bold text-lg">{t('customs_page.calculator.placeholder_empty')}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Required Documents Section */}
      <section className="section-padding bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-primary">{t('customs_page.documents.title')}</h2>
              <p className="text-gray-600">{t('customs_page.documents.subtitle')}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {(t('customs_page.documents.items', { returnObjects: true }) as any[]).map((doc, i) => {
                const icons = [<FileText />, <Ship />, <Globe />, <ClipboardCheck />];
                return (
                  <div key={i} className={cn("bg-white p-6 rounded-2xl flex gap-4 items-start border border-gray-100 shadow-sm", isRtl ? "text-right" : "text-left")}>
                    <div className="text-accent shrink-0">{icons[i]}</div>
                    <div>
                      <h5 className="font-bold text-primary">{doc.title}</h5>
                      <p className="text-sm text-gray-500">{doc.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Customs Procedures */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold text-primary">{t('customs_page.procedures.title')}</h2>
            <p className="text-gray-600">{t('customs_page.procedures.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(t('customs_page.procedures.items', { returnObjects: true }) as any[]).map((proc, i) => {
              const icons = [<FileText />, <Search />, <DollarSign />, <PackageCheck />];
              return (
                <div key={i} className="relative p-8 bg-secondary rounded-3xl text-center space-y-4">
                  <span className={cn("absolute top-4 text-4xl font-black text-primary/5", isRtl ? "right-4" : "left-4")}>{proc.step}</span>
                  <div className="text-accent mx-auto w-fit">{icons[i]}</div>
                  <h4 className="font-bold text-primary">{proc.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{proc.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold text-primary">{t('customs_page.our_help.title')}</h2>
            <p className="text-gray-600">{t('customs_page.our_help.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(t('customs_page.our_help.items', { returnObjects: true }) as any[]).map((service, i) => {
              const icons = [<Calculator className="w-10 h-10" />, <ClipboardCheck className="w-10 h-10" />, <TrendingUp className="w-10 h-10" />];
              return (
                <div key={i} className="p-10 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 text-center space-y-6 hover:shadow-xl transition-all group">
                  <div className="bg-secondary p-5 rounded-3xl w-fit mx-auto text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    {icons[i]}
                  </div>
                  <h4 className="text-xl font-bold text-primary">{service.title}</h4>
                  <p className="text-gray-500 leading-relaxed">{service.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              {t('customs_page.cta.title')}
            </h2>
            <p className="text-gray-400 text-xl">
              {t('customs_page.cta.desc')}
            </p>
            <Link
              to="/contact"
              className="inline-flex bg-accent text-white px-12 py-5 rounded-full font-bold text-xl hover:bg-blue-700 transition-all shadow-2xl items-center gap-3"
            >
              {t('customs_page.cta.button')}
              {isRtl ? <ArrowLeft className="w-6 h-6" /> : <ArrowRight className="w-6 h-6" />}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function RefreshCcw(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 16h5v5" />
    </svg>
  );
}

function TrendingUp(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}
