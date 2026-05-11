import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';

const InstallPWA: React.FC = () => {
  const { t } = useTranslation();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if it's iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIOSDevice);

    // Listen for the install prompt
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Show prompt after a delay if not installed
      setTimeout(() => setIsVisible(true), 3000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // If it's iOS and not in standalone mode, show manual instructions
    if (isIOSDevice && !(navigator as any).standalone) {
      setTimeout(() => setIsVisible(true), 5000);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
      setDeferredPrompt(null);
      setIsVisible(false);
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        className="fixed bottom-24 left-6 right-6 md:left-auto md:right-8 md:w-96 z-[100]"
      >
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden relative">
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-4 right-4 p-1 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-200">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <div className="pt-1">
                <h3 className="text-lg font-black text-slate-900 leading-tight">
                  {isIOS ? "تثبيت تطبيق ايليجا" : "حوّل الموقع إلى تطبيق!"}
                </h3>
                <p className="text-sm text-slate-500 font-bold mt-1">
                  {isIOS 
                    ? "اضغط على أيقونة المشاركة ثم 'إضافة إلى الشاشة الرئيسية'" 
                    : "استمتع بتجربة أسرع وسهولة في الوصول من شاشة موبايلك."}
                </p>
              </div>
            </div>

            {!isIOS && (
              <button
                onClick={handleInstallClick}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-black py-3.5 rounded-2xl transition-all shadow-lg hover:shadow-blue-200 flex items-center justify-center gap-2 group"
              >
                <Download className="w-5 h-5 group-hover:bounce" />
                تثبيت الآن مجاناً
              </button>
            )}

            <div className="mt-4 flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-widest pt-4 border-t border-slate-50">
               <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> يعمل بدون متجر</span>
               <span>v1.0 - PWA</span>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InstallPWA;
