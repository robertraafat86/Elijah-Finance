import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { SERVICES } from '../constants';

export default function ContactForm() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError(null);

    // Validate phone number: 10 to 15 digits, allowing leading +
    const cleanPhone = formData.phone.replace(/[\s()\-]/g, '');
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    
    if (!phoneRegex.test(cleanPhone)) {
      setPhoneError(
        isRtl 
          ? 'يرجى إدخال رقم هاتف صحيح (من 10 إلى 15 رقماً بدون رموز أو مسافات)' 
          : 'Please enter a valid phone number (10 to 15 digits without spaces or symbols)'
      );
      return;
    }

    setStatus('loading');

    try {
      // Simulate backend processing for a static build
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('success');
      setFormData({ name: '', phone: '', service: '' });
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="w-full">
      {status === 'success' ? (
        <div className="text-center py-12 space-y-4" aria-live="polite">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto animate-bounce" />
          <h3 className="text-2xl font-bold text-gray-900">{t('contact_form.success_title')}</h3>
          <p className="text-gray-600">{t('contact_form.success_desc')}</p>
          <button 
            onClick={() => setStatus('idle')}
            className="text-blue-600 font-bold hover:underline transition-all"
          >
            {t('contact_form.send_another')}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-bold text-gray-700">{t('contact_form.fullname')}</label>
            <input
              type="text"
              id="name"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all dark:bg-slate-900 dark:border-slate-800 dark:text-white"
              placeholder={t('contact_form.name_placeholder')}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-bold text-gray-700">{t('contact_form.phone')}</label>
            <input
              type="tel"
              id="phone"
              required
              aria-invalid={!!phoneError}
              aria-describedby={phoneError ? "phone-error" : undefined}
              className={`w-full px-4 py-3 rounded-xl border ${phoneError ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-600'} focus:ring-2 focus:border-transparent outline-none transition-all dark:bg-slate-900 dark:border-slate-800 dark:text-white`}
              placeholder={t('contact_form.phone_placeholder')}
              value={formData.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value });
                if (phoneError) setPhoneError(null);
              }}
            />
            {phoneError && (
              <p id="phone-error" className="text-xs text-red-500 font-bold flex items-center gap-1.5 mt-1 animate-pulse" role="alert">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{phoneError}</span>
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="service" className="text-sm font-bold text-gray-700">{t('contact_form.required_service')}</label>
            <select
              id="service"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all bg-white dark:bg-slate-900 dark:border-slate-800 dark:text-white"
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            >
              <option value="">{t('contact_form.select_service')}</option>
              {SERVICES.map((s) => (
                <option key={s.id} value={s.title}>{t(s.title)}</option>
              ))}
              <option value="other">{t('contact_form.other')}</option>
            </select>
          </div>

          {status === 'error' && (
            <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-lg dark:bg-red-950/20" role="alert" aria-live="assertive">
              <AlertCircle className="w-4 h-4" />
              <span>{t('contact_form.error_msg')}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors disabled:opacity-70 cursor-pointer shadow-md shadow-blue-500/10"
          >
            {status === 'loading' ? t('contact_form.sending') : (
              <>
                {t('contact_form.submit')}
                <Send className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
