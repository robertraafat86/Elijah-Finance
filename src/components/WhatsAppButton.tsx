import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const phoneNumber = '201208538580'; // Replace with actual number
  const message = encodeURIComponent('مرحباً إيليجا، أرغب في الاستفسار عن خدماتكم.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
      aria-label="تواصل معنا عبر واتساب"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}
