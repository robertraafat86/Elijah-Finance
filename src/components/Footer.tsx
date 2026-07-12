import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { LOGO_URL } from '../constants';

export default function Footer() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  return (
    <footer className="bg-slate-900 text-slate-400 py-24 mt-auto no-print relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-600/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6">
        {/* WhatsApp Consultation Call-To-Action Banner */}
        <div className="mb-16 bg-gradient-to-br from-slate-800/80 to-slate-900/95 border border-slate-700/40 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#25D366]/5 rounded-full blur-3xl -z-10" />
          
          <div className="flex-1 space-y-4 text-center lg:text-right">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-xl text-xs font-black border border-emerald-500/20 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              <span>{isRtl ? "طلب الاستشارات المحاسبية والمالية" : "Accounting & Financial Consultations"}</span>
            </div>
            <p className="text-[16px] md:text-[18px] leading-relaxed text-slate-200 font-bold max-w-3xl">
              {isRtl ? (
                "لطلب الاستشارات المحاسبية والمالية، تواصل معنا عبر واتساب، ويسعدنا تقديم الدعم والحلول المهنية التي تناسب احتياجات أعمالكم."
              ) : (
                "To request accounting and financial consultations, contact us via WhatsApp, and we are pleased to provide professional support and solutions tailored to your business needs."
              )}
            </p>
          </div>

          <a
            href={`https://wa.me/201208538580?text=${encodeURIComponent(isRtl ? "مرحباً بك في منظومة \"إيليجا للخدمات المالية والمحاسبية\" 📊\n\nأريد الاستفسار عن كفاءة الخدمات والحلول المحاسبية المتاحة." : "Hello \"Elijah Financial & Accounting Services\" 📊\n\nI would like to inquire about your professional financial and accounting services.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-[#25D366] hover:bg-[#20ba59] hover:shadow-xl hover:shadow-emerald-950/20 text-white px-8 py-4 rounded-2xl font-black transition-all active:scale-95 flex items-center justify-center gap-2.5 shadow-lg group text-center w-full sm:w-auto"
          >
            <span className="text-[15px]">{isRtl ? "تواصل الآن عبر واتساب" : "Contact us on WhatsApp"}</span>
            {isRtl ? (
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform shrink-0" />
            ) : (
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform shrink-0" />
            )}
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-2 space-y-8">
            <div className="h-12 w-auto grayscale brightness-200 opacity-80">
               <img src={LOGO_URL} alt="Logo" className="h-full w-auto object-contain" />
            </div>
            <p className="text-lg leading-relaxed max-w-md font-medium">
              {t('home.hero_subtitle')}
            </p>
            <div className="flex gap-4">
               {/* Placeholders for social media if needed, otherwise just professional spacing */}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-black text-lg">{t('common.contact_info', 'معلومات التواصل')}</h4>
            <div className="space-y-4 text-sm font-medium">
               <p className="flex flex-col gap-1">
                 <span className="text-white font-black text-xs">محاسب / روبير رأفت</span>
                 <span className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> {t('footer.whatsapp')}</span>
               </p>
               <p className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> {t('footer.email')}</p>
               <p className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> {t('footer.address')}</p>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-black text-lg">{t('common.quick_links', 'روابط سريعة')}</h4>
            <div className="grid grid-cols-1 gap-3 text-sm font-medium">
               <Link to="/" className="hover:text-white transition-colors">{t('nav.home')}</Link>
               <Link to="/about" className="hover:text-white transition-colors">{t('nav.about')}</Link>
               <Link to="/accounting-portal" className="hover:text-white transition-colors">{t('nav.portal')}</Link>
               <Link to="/contact" className="hover:text-white transition-colors">{t('nav.contact')}</Link>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-right">
            <p className="text-slate-500 text-xs font-bold mb-1">{t('footer.designed_by')}</p>
            <p className="text-white font-black text-base">{t('footer.author')}</p>
          </div>
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest">
            {t('footer.all_rights_reserved')} © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
