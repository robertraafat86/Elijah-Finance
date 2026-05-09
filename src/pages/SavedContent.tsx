import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  BookMarked, 
  Trash2, 
  ExternalLink, 
  Search, 
  Clock,
  ChevronLeft,
  BookOpen
} from 'lucide-react';
import { cn } from '../lib/utils';

interface SavedItem {
  id: string;
  title: string;
  timestamp: string;
  path: string;
}

export default function SavedContent() {
  const { t, i18n } = useTranslation();
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const isRtl = i18n.language === 'ar';

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('saved_accounting_content') || '[]');
    setSavedItems(items);
  }, []);

  const handleRemove = (id: string) => {
    const updated = savedItems.filter(item => item.id !== id);
    setSavedItems(updated);
    localStorage.setItem('saved_accounting_content', JSON.stringify(updated));
  };

  const filteredItems = savedItems.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50/50 pb-24 pt-32" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                <BookMarked className="w-8 h-8 text-blue-600" />
                {t('common.saved_content')}
              </h1>
              <p className="text-slate-500 font-bold">{t('saved.desc', 'جميع الصفحات والموضوعات التي قمت بحفظها للرجوع إليها لاحقاً.')}</p>
            </div>
            
            <div className="relative w-full md:w-72">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('common.search', 'بحث...')}
                className="w-full bg-white border border-slate-200 rounded-2xl pr-12 pl-4 py-3 focus:ring-2 focus:ring-blue-500/20 font-bold text-sm shadow-sm"
              />
            </div>
          </div>

          {/* Content List */}
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center justify-between gap-6">
                      <div className="flex items-center gap-4 flex-grow">
                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                          <BookOpen className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-slate-900">{item.title}</h3>
                          <div className="flex items-center gap-2 text-xs text-slate-400 font-bold mt-1">
                            <Clock className="w-3.5 h-3.5" />
                            {new Date(item.timestamp).toLocaleDateString(i18n.language, { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          to={item.path}
                          className="p-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all"
                          title={t('common.view', 'عرض')}
                        >
                          <ExternalLink className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-all"
                          title={t('common.delete', 'حذف')}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-[2.5rem] p-20 text-center border border-slate-100 shadow-sm"
                >
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <BookMarked className="w-10 h-10 text-slate-300" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">{t('saved.empty_title', 'لا توجد محفوظات')}</h3>
                  <p className="text-slate-500 font-bold mb-8">{t('saved.empty_desc', 'لم تقم بحفظ أي موضوعات بعد. يمكنك حفظ أي صفحة تعليمية للرجوع إليها لاحقاً.')}</p>
                  <Link 
                    to="/accounting-portal" 
                    className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl font-black shadow-lg shadow-blue-200"
                  >
                    <ChevronLeft className={cn("w-5 h-5", !isRtl && "rotate-180")} />
                    {t('common.explore_knowledge', 'استكشف بنك المعلومات')}
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
