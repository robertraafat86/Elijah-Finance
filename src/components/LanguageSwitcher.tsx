import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { cn } from '../lib/utils';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] font-bold transition-all",
        "bg-slate-50 border border-slate-100 text-slate-700 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-100 shadow-sm active:scale-95",
        i18n.language === 'en' ? "flex-row-reverse" : "flex-row"
      )}
      title={i18n.language === 'ar' ? 'English' : 'العربية'}
      aria-label={i18n.language === 'ar' ? 'English' : 'العربية'}
    >
      <Globe className="w-4 h-4 text-blue-500" />
      <span className="uppercase tracking-tight">
        {i18n.language === 'ar' ? 'EN' : 'AR'}
      </span>
    </button>
  );
}
