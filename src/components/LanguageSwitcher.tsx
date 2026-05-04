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
        "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black transition-all",
        "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm",
        i18n.language === 'en' ? "flex-row-reverse" : "flex-row"
      )}
    >
      <Globe className="w-3.5 h-3.5 text-blue-500" />
      <span className="uppercase tracking-wider">
        {i18n.language === 'ar' ? 'EN' : 'AR'}
      </span>
    </button>
  );
}
