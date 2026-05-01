import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { SERVICES } from '../constants';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', phone: '', service: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      {status === 'success' ? (
        <div className="text-center py-12 space-y-4">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
          <h3 className="text-2xl font-bold text-gray-900">شكراً لتواصلك معنا!</h3>
          <p className="text-gray-600">لقد تم استلام طلبك بنجاح، وسيقوم فريقنا بالتواصل معك في أقرب وقت ممكن.</p>
          <button 
            onClick={() => setStatus('idle')}
            className="text-accent font-bold hover:underline"
          >
            إرسال طلب آخر
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-bold text-gray-700">الاسم بالكامل</label>
            <input
              type="text"
              id="name"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
              placeholder="أدخل اسمك"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-bold text-gray-700">رقم الهاتف</label>
            <input
              type="tel"
              id="phone"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
              placeholder="01xxxxxxxxx"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="service" className="text-sm font-bold text-gray-700">الخدمة المطلوبة</label>
            <select
              id="service"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all bg-white"
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            >
              <option value="">اختر الخدمة</option>
              {SERVICES.map((s) => (
                <option key={s.id} value={s.title}>{s.title}</option>
              ))}
              <option value="other">أخرى</option>
            </select>
          </div>

          {status === 'error' && (
            <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-lg">
              <AlertCircle className="w-4 h-4" />
              <span>حدث خطأ أثناء الإرسال، يرجى المحاولة مرة أخرى.</span>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-900 transition-colors disabled:opacity-70"
          >
            {status === 'loading' ? 'جاري الإرسال...' : (
              <>
                إرسال الطلب
                <Send className="w-4 h-4 rotate-180" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
