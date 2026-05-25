import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

export default function WhatsAppButton() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  
  const phoneNumber = '201208538580'; // Consistent Egyptian standard number
  const appLogo = 'https://lh3.googleusercontent.com/d/1WlIcRYhnRU8PeT4VN615H0ZOBEMdOKcs'; // Real Google Drive hosted app icon
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ais-pre-ah2i5eyc7kw6ilruxwp6dd-51421988619.europe-west2.run.app';

  // Custom premium formatted WhatsApp message showing logo, site URL, and name
  const getArabicMessage = () => {
    return `مرحباً بك في منظومة "إيليجا للخدمات المالية والمحاسبية" 📊\n\nأريد الاستفسار عن كفاءة الخدمات والحلول المحاسبية المتاحة.\n\n🔗 رابط المنظومة: ${siteUrl}\n🖼️ شعار المنظومة: ${appLogo}\n\n✨ نسعى دوماً لتقديم أفضل مستويات الدقة والشفافية المحاسبية الذكية!`;
  };

  const getEnglishMessage = () => {
    return `Hello "Elijah Financial & Accounting Services" 📊\n\nI would like to inquire about your professional financial and accounting services.\n\n🔗 System Link: ${siteUrl}\n🖼️ App Logo: ${appLogo}\n\n✨ Always dedicated to delivering the highest level of precision and smart accounting transparency!`;
  };

  const messageText = isRtl ? getArabicMessage() : getEnglishMessage();
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageText)}`;

  const [hovered, setHovered] = useState(false);

  return (
    <div 
      className={cn(
        "fixed bottom-6 z-[999] flex items-center gap-3 transition-all duration-300",
        isRtl ? "left-6" : "right-6"
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tooltip badge text */}
      <div
        className={cn(
          "bg-white dark:bg-slate-900 text-slate-850 dark:text-neutral-100 px-4 py-2.5 rounded-2xl border border-slate-150 dark:border-slate-800 text-xs font-black shadow-xl transition-all duration-300 scale-90 opacity-0 pointer-events-none flex items-center gap-2",
          hovered && "scale-100 opacity-100 pointer-events-auto",
          isRtl ? "order-2" : "order-1"
        )}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        {isRtl ? "تواصل معنا مباشرة عبر واتساب" : "Chat with us live via WhatsApp"}
      </div>

      {/* Floating Interactive Trigger */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={isRtl ? "تواصل معنا عبر واتساب" : "Contact us on WhatsApp"}
        className={cn(
          "w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-350 hover:scale-110 active:scale-95 group relative ring-4 ring-emerald-500/20 hover:ring-emerald-500/40 cursor-pointer",
          isRtl ? "order-1" : "order-2"
        )}
      >
        {/* Radar concentric pulses */}
        <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-25 group-hover:opacity-40 pointer-events-none" />
        
        {/* Animated Icon */}
        <MessageCircle className="w-6 h-6 transition-transform duration-350 group-hover:rotate-[15deg]" />
        
        {/* Mini online indication dot */}
        <span className="absolute top-1.5 right-1.5 w-3 h-3 bg-red-500 rounded-full border-2 border-[#25D366] animate-bounce" />
      </a>
    </div>
  );
}

