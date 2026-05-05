import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

export default function WhatsAppButton() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  
  const phoneNumber = '201202275323';
  const message = encodeURIComponent(isRtl ? 'مرحباً، أود الاستفسار عن خدماتكم المحاسبية.' : 'Hello, I would like to inquire about your accounting services.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center",
        isRtl ? "left-6" : "right-6"
      )}
      aria-label={isRtl ? "تواصل معنا عبر واتساب" : "Contact us on WhatsApp"}
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}
