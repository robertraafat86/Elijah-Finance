import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  FileText, 
  Calculator, 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  ArrowLeft, 
  ArrowRight,
  CheckCircle, 
  DollarSign, 
  Briefcase,
  Gavel,
  PieChart,
  TrendingUp,
  Users,
  Building2,
  Globe
} from 'lucide-react';
import { cn } from '../lib/utils';
import VATCalculator from '../components/VATCalculator';

export default function TaxAccounting() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const taxTypes = [
    { 
      title: t('tax.corporate_tax'), 
      desc: t('tax.corporate_tax_desc'), 
      icon: <Building2 className="w-8 h-8" /> 
    },
    { 
      title: t('tax.vat'), 
      desc: t('tax.vat_desc'), 
      icon: <PieChart className="w-8 h-8" /> 
    },
    { 
      title: t('tax.salary_tax'), 
      desc: t('tax.salary_tax_desc'), 
      icon: <Users className="w-8 h-8" /> 
    },
    { 
      title: t('tax.withholding_tax'), 
      desc: t('tax.withholding_tax_desc'), 
      icon: <Calculator className="w-8 h-8" /> 
    },
  ];

  return (
    <div className={cn("pt-24", isRtl ? "text-right" : "text-left")}>
      {/* Hero Section */}
      <section className="bg-primary py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Gavel className={cn("w-96 h-96 absolute -bottom-20 text-white", isRtl ? "-left-20" : "-right-20")} />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              {t('tax.hero_title')}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {t('tax.hero_subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-primary">{t('tax.what_is_tax')}</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {t('tax.tax_desc')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: t('tax.compliance'), icon: <ShieldCheck className="text-accent" /> },
                  { title: t('tax.avoid_fines'), icon: <AlertTriangle className="text-red-500" /> },
                  { title: t('tax.org_accounts'), icon: <CheckCircle className="text-green-500" /> },
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-secondary rounded-2xl text-center space-y-2 border border-gray-100">
                    <div className="flex justify-center">{item.icon}</div>
                    <p className="font-bold text-primary text-sm">{item.title}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[3/2] bg-secondary rounded-3xl border border-gray-100 flex items-center justify-center p-12">
                 <div className="text-center space-y-4">
                    <FileText className="w-16 h-16 text-primary mx-auto opacity-20" />
                    <p className="text-primary/40 font-bold">{t('tax.tax_transparency')}</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tax Types Grid */}
      <section className="section-padding bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold text-primary">{t('tax.primary_types')}</h2>
            <p className="text-gray-600">{t('tax.types_subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {taxTypes.map((tax, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-all text-center space-y-4 group">
                <div className="bg-secondary p-4 rounded-2xl w-fit mx-auto text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  {tax.icon}
                </div>
                <h3 className="text-xl font-bold text-primary">{tax.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{tax.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Income Tax Details */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-primary">{t('tax.corporate_detail')}</h2>
              <p className="text-gray-600">{t('tax.corporate_detail_subtitle')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10 space-y-4">
                <h4 className="text-xl font-bold text-primary flex items-center gap-2">
                  <Users className="w-6 h-6 text-accent" />
                  {t('tax.who_is_subject')}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {t('tax.subject_desc')}
                </p>
              </div>
              <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10 space-y-4">
                <h4 className="text-xl font-bold text-primary flex items-center gap-2">
                  <Calculator className="w-6 h-6 text-accent" />
                  {t('tax.tax_base')}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {t('tax.base_desc')}
                </p>
              </div>
            </div>

            <div className="bg-secondary rounded-3xl p-8 space-y-6">
              <h4 className="text-xl font-bold text-primary text-center">{t('tax.major_adjustments')}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h5 className="font-bold text-red-600 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 rotate-180" />
                    {t('tax.additions')}
                  </h5>
                  <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
                    <li>{t('tax.provisions')}</li>
                    <li>{t('tax.income_taxes_paid')}</li>
                    <li>{t('tax.fines_penalties')}</li>
                    <li>{t('tax.unsupported_exp')}</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h5 className="font-bold text-green-600 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    {t('tax.deductions')}
                  </h5>
                  <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
                    <li>{t('tax.tax_depreciation')}</li>
                    <li>{t('tax.gov_donations')}</li>
                    <li>{t('tax.ngo_donations')}</li>
                    <li>{t('tax.carry_forward')}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculation Example */}
      <section className="section-padding bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-primary">{t('tax.calc_example')}</h2>
              <p className="text-gray-600">{t('tax.calc_subtitle')}</p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              <div className="bg-primary p-6 text-white text-center">
                <h4 className="text-xl font-bold">{t('tax.elijah_example')}</h4>
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-600">{t('tax.accounting_profit')}</span>
                    <span className="font-bold text-primary">500,000 {isRtl ? 'ج.م' : 'EGP'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2 text-red-600">
                    <span>{t('tax.unrecognized_exp')}</span>
                    <span className="font-bold">+ 50,000 {isRtl ? 'ج.م' : 'EGP'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2 text-green-600">
                    <span>{t('tax.deductible_exp')}</span>
                    <span className="font-bold">- 30,000 {isRtl ? 'ج.م' : 'EGP'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2 bg-secondary p-2 rounded-lg">
                    <span className="font-bold text-primary">{t('tax.net_tax_profit')}</span>
                    <span className="font-bold text-primary">520,000 {isRtl ? 'ج.م' : 'EGP'}</span>
                  </div>
                  <div className="flex justify-between items-center pt-4">
                    <span className="text-gray-600">{t('tax.tax_due')}</span>
                    <span className="text-2xl font-extrabold text-accent">117,000 {isRtl ? 'ج.م' : 'EGP'}</span>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-xl text-sm text-blue-800 italic">
                  {t('tax.rate_note')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VAT Calculator Section */}
      <VATCalculator />

      {/* Tax Return Section */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-primary">{t('tax.tax_return_title')}</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {t('tax.tax_return_desc')}
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="font-bold text-primary">{t('tax.return_contents')}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    t('tax.basic_info'),
                    t('tax.income_statement'),
                    t('tax.balance_sheet'),
                    t('tax.dep_schedule'),
                    t('tax.dealings_stmt'),
                    t('tax.final_calc')
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-gray-600 text-sm">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-secondary p-8 rounded-[3rem] space-y-8">
              <h4 className="text-2xl font-bold text-primary text-center">{t('tax.submission_steps')}</h4>
              <div className="space-y-6">
                {[
                  { step: '01', title: t('tax.prep_statements'), desc: t('tax.prep_statements_desc') },
                  { step: '02', title: t('tax.calc_adjustments'), desc: t('tax.calc_adjustments_desc') },
                  { step: '03', title: t('tax.elec_submission'), desc: t('tax.elec_submission_desc') },
                  { step: '04', title: t('tax.tax_payment'), desc: t('tax.tax_payment_desc') },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <span className="text-3xl font-black text-accent/20">{item.step}</span>
                    <div className={cn(isRtl ? "text-right" : "text-left")}>
                      <h5 className="font-bold text-primary">{item.title}</h5>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deadlines and Penalties */}
      <section className="section-padding bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">{t('tax.deadlines_fines')}</h2>
              <p className="text-gray-400 leading-relaxed">
                {t('tax.deadlines_desc')}
              </p>
              <div className="space-y-4">
                <div className={cn("flex gap-4 p-6 bg-white/5 rounded-2xl border border-white/10", isRtl ? "text-right" : "text-left")}>
                  <Clock className="w-8 h-8 text-accent shrink-0" />
                  <div>
                    <h4 className="font-bold text-white">{t('tax.corp_deadline_title')}</h4>
                    <p className="text-sm text-gray-400">{t('tax.corp_deadline_desc')}</p>
                  </div>
                </div>
                <div className={cn("flex gap-4 p-6 bg-white/5 rounded-2xl border border-white/10", isRtl ? "text-right" : "text-left")}>
                  <AlertTriangle className="w-8 h-8 text-red-400 shrink-0" />
                  <div>
                    <h4 className="font-bold text-white">{t('tax.delay_fines_title')}</h4>
                    <p className="text-sm text-gray-400">{t('tax.delay_fines_desc')}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-3xl p-8 text-primary space-y-6">
              <h4 className="text-xl font-bold text-center">{t('tax.common_errors')}</h4>
              <div className="space-y-4">
                {[
                  { title: t('tax.error_expenses'), desc: t('tax.error_expenses_desc') },
                  { title: t('tax.error_calc'), desc: t('tax.error_calc_desc') },
                  { title: t('tax.error_docs'), desc: t('tax.error_docs_desc') },
                  { title: t('tax.error_delay'), desc: t('tax.error_delay_desc') },
                ].map((error, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="bg-red-100 p-1 rounded-full mt-1">
                      <AlertTriangle className="w-3 h-3 text-red-600" />
                    </div>
                    <div>
                      <h5 className="font-bold text-sm">{error.title}</h5>
                      <p className="text-xs text-gray-500">{error.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold text-primary">{t('tax.how_we_help')}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t('tax.help_subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: t('tax.returns_prep'), desc: t('tax.returns_prep_desc'), icon: <FileText /> },
              { title: t('tax.accurate_calc'), desc: t('tax.accurate_calc_desc'), icon: <Calculator /> },
              { title: t('tax.tax_rep'), desc: t('tax.tax_rep_desc'), icon: <Gavel /> },
              { title: t('tax.risk_reduction'), desc: t('tax.risk_reduction_desc'), icon: <ShieldCheck /> },
            ].map((help, i) => (
              <div key={i} className="p-8 bg-secondary rounded-3xl text-center space-y-4 hover:bg-primary hover:text-white transition-all group">
                <div className="text-accent group-hover:text-white transition-colors mx-auto">{help.icon}</div>
                <h4 className="font-bold text-sm lg:text-base">{help.title}</h4>
                <p className="text-xs text-gray-500 group-hover:text-gray-300 transition-colors">{help.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-accent relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto space-y-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              {t('tax.cta_tax_title')}
            </h2>
            <p className="text-white/90 text-xl">
              {t('tax.cta_tax_desc')}
            </p>
            <Link
              to="/contact"
              className="inline-flex bg-white text-accent px-12 py-5 rounded-full font-bold text-xl hover:bg-gray-100 transition-all shadow-2xl items-center gap-3"
            >
              {t('tax.order_now')}
              {isRtl ? <ArrowLeft className="w-6 h-6" /> : <ArrowRight className="w-6 h-6" />}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
