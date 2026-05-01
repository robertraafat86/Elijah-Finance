import React from 'react';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import ContactForm from '../components/ContactForm';

export default function Contact() {
  const phoneNumber = '201208538580';
  const message = encodeURIComponent('مرحباً إيليجا، أرغب في الاستفسار عن خدماتكم.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-white border-b border-slate-100 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900">تواصل معنا</h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              يسعدنا دائماً تواصلكم معنا. سواء كنت بحاجة لاستشارة مالية أو لديك استفسار حول خدماتنا التعليمية، فريقنا جاهز للرد عليكم.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">معلومات الاتصال المباشر</h2>
                <p className="text-slate-500">نلتزم بالرد على كافة الاستفسارات خلال 24 ساعة عمل كحد أقصى.</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="clean-card bg-white flex items-center gap-6 group hover:border-blue-600 transition-colors">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">رقم الهاتف عبر واتساب</h4>
                    <a href="https://wa.me/201208538580" target="_blank" rel="noopener noreferrer" className="text-slate-500 text-sm hover:text-blue-600 transition-colors">+20 120 853 8580</a>
                  </div>
                </div>

                <div className="clean-card bg-white flex items-center gap-6 group hover:border-blue-600 transition-colors">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">البريد الإلكتروني</h4>
                    <a href="mailto:robert.raafat.86@gmail.com" className="text-slate-500 text-sm hover:text-blue-600 transition-colors">robert.raafat.86@gmail.com</a>
                  </div>
                </div>

                <div className="clean-card bg-white flex items-center gap-6 group hover:border-blue-600 transition-colors">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">المقر الرئيسي</h4>
                    <p className="text-slate-500 text-sm">القاهرة، جمهورية مصر العربية</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <div className="p-8 bg-slate-900 rounded-[2rem] text-white space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
                  <h3 className="text-xl font-bold relative z-10">هل ترغب في محادثة سريعة؟</h3>
                  <p className="text-slate-400 text-sm leading-relaxed relative z-10">ابدأ محادثة مباشرة معنا الآن عبر تطبيق واتساب للحصول على رد فوري.</p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 relative z-10"
                  >
                    <MessageCircle className="w-6 h-6" />
                    تحدث معنا الآن
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="clean-card bg-white p-8 md:p-12">
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">أرسل لنا رسالة</h3>
                <p className="text-sm text-slate-500">فضلاً قم بتعبئة البيانات أدناه وسيتواصل معك أحد مستشارينا.</p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-96 bg-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold">
          [خريطة توضيحية لموقع الشركة]
        </div>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110502.60385045057!2d31.18842328671875!3d30.05948380000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb29651159395!2sCairo%2C%20Cairo%20Governorate!5e0!3m2!1sen!2seg!4v1711654321000!5m2!1sen!2seg" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale opacity-50"
        ></iframe>
      </section>
    </div>
  );
}
