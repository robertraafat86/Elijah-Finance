import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12 mt-auto no-print">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="w-24 h-1 bg-slate-200 mx-auto mb-8 rounded-full" />
          
          <div className="space-y-2">
            <p className="text-slate-500 font-medium text-base leading-relaxed">
              {t('footer.designed_by')}
            </p>
            <p className="text-slate-900 font-black text-lg md:text-xl tracking-tight py-1">
              {t('footer.author')}
            </p>
            <p className="text-slate-500 font-medium text-base leading-relaxed">
              {t('footer.whatsapp')}
            </p>
            <p className="text-slate-500 font-medium text-base leading-relaxed">
              {t('footer.email')}
            </p>
            <p className="text-slate-500 font-medium text-base leading-relaxed">
              {t('footer.address')}
            </p>
            <p className="text-slate-400 text-sm font-bold pt-4">
              {t('footer.all_rights_reserved')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
