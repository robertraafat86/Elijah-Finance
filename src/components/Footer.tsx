import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12 mt-auto">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col items-center space-y-3">
            <div className="text-center group">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">
                {t('footer.designed_by')}
              </p>
              <p className="text-slate-600 text-sm font-medium">
                {t('footer.all_rights_reserved')}
              </p>
            </div>
            
            <div className="flex flex-col items-center py-4">
              <div className="w-8 h-px bg-slate-300 mb-4" />
              <p className="text-xl font-black text-slate-900 tracking-tight">
                {t('footer.author')}
              </p>
              <div className="w-8 h-px bg-slate-300 mt-4" />
            </div>

            <p className="text-slate-400 text-sm font-bold">
              {t('footer.address')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
