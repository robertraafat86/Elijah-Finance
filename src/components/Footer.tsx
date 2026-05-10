import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { LOGO_URL } from '../constants';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-900 text-slate-400 py-24 mt-auto no-print relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-600/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6">
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
               <p className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> {t('footer.whatsapp')}</p>
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
