import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  HelpCircle, 
  BookOpen, 
  Lightbulb, 
  AlertTriangle, 
  Zap, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Bookmark, 
  BookmarkCheck,
  Filter,
  ArrowLeftRight,
  Info
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { ACCOUNTING_MISC_DATA } from '../../data/accountingMisc';
import { AccountingMiscCategory } from '../../types';

const categoryMap: { id: AccountingMiscCategory; label: string; icon: React.ReactNode; color: string }[] = [
  { id: 'basic-concepts', label: 'مفاهيم أساسية', icon: <BookOpen className="w-4 h-4" />, color: 'blue' },
  { id: 'terminology', label: 'مصطلحات', icon: <Info className="w-4 h-4" />, color: 'emerald' },
  { id: 'tips', label: 'نصائح', icon: <Lightbulb className="w-4 h-4" />, color: 'amber' },
  { id: 'common-errors', label: 'أخطاء شائعة', icon: <AlertTriangle className="w-4 h-4" />, color: 'rose' },
  { id: 'quick-q', label: 'أسئلة سريعة', icon: <Zap className="w-4 h-4" />, color: 'purple' },
  { id: 'general-info', label: 'معلومات عامة', icon: <HelpCircle className="w-4 h-4" />, color: 'indigo' },
];

export default function AccountingMisc() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<AccountingMiscCategory | 'all'>('all');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set());

  const filteredItems = useMemo(() => {
    return ACCOUNTING_MISC_DATA.filter(item => {
      const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) newExpanded.delete(id);
    else newExpanded.add(id);
    setExpandedItems(newExpanded);
  };

  const toggleSave = (id: string) => {
    const newSaved = new Set(savedItems);
    if (newSaved.has(id)) newSaved.delete(id);
    else newSaved.add(id);
    setSavedItems(newSaved);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Simple toast or notification could be added here
  };

  const quickQuestions = ACCOUNTING_MISC_DATA.filter(item => item.isQuick);

  return (
    <div className="pb-24">
      {/* Hero Section */}
      <section className="relative py-20 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5 -z-10" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-3xl rounded-full -z-10" />
        
        <div className="container mx-auto px-6 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 font-black text-[10px] uppercase tracking-widest"
          >
            <HelpCircle className="w-4 h-4" />
            بنك المعلومات المحاسبية
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white leading-tight"
          >
            بنك المعلومات <br />
            <span className="text-blue-400 font-black">تعلم بذكاء، وبسرعة</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl font-medium"
          >
            مجموعة من المعلومات والمفاهيم المحاسبية الهامة في شكل أسئلة وأجوبة مباشرة لمساعدتك في المراجعة اليومية.
          </motion.p>
        </div>
      </section>

      {/* Quick Access Band */}
      <section className="bg-slate-50 border-y border-slate-200 py-6 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4">
            <div className="shrink-0 flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-600 rounded-xl font-black text-xs uppercase tracking-widest whitespace-nowrap">
              <Zap className="w-4 h-4" />
              أسئلة سريعة جداً
            </div>
            <div className="flex-grow flex gap-4 overflow-x-auto no-scrollbar py-2">
              {quickQuestions.map((q) => (
                <div key={q.id} className="shrink-0 bg-white px-4 py-3 rounded-2xl border border-slate-200 flex items-center gap-3 shadow-sm hover:border-purple-300 transition-all cursor-default group">
                  <span className="font-bold text-slate-900 group-hover:text-purple-600">{q.question}</span>
                  <div className="w-px h-4 bg-slate-200" />
                  <span className="text-slate-500 text-sm">{q.answer}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1 space-y-8">
            <div className="sticky top-24 space-y-8">
              {/* Search */}
              <div className="space-y-4">
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <Search className="w-4 h-4 text-blue-500" />
                  ابحث عن معلومة
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="ابحث في الأسئلة والأجوبة..."
                    className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-bold text-sm shadow-sm transition-all"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-4">
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-emerald-500" />
                  التصنيفات
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveCategory('all')}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all",
                      activeCategory === 'all' 
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                        : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                    )}
                  >
                    <span>الكل</span>
                    <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">{ACCOUNTING_MISC_DATA.length}</span>
                  </button>
                  {categoryMap.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                        activeCategory === cat.id 
                          ? "bg-slate-900 text-white shadow-lg" 
                          : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                      )}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center",
                        activeCategory === cat.id ? "bg-white/10" : `bg-${cat.color}-50 text-${cat.color}-600`
                      )}>
                        {cat.icon}
                      </div>
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Stats Card */}
              <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-6 text-white overflow-hidden relative group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-2">
                    <BookmarkCheck className="w-5 h-5 text-blue-300" />
                    <span className="text-xs font-black uppercase tracking-widest">المحفوظات</span>
                  </div>
                  <div className="text-3xl font-black">{savedItems.size}</div>
                  <p className="text-xs text-blue-100/70 font-medium">سؤال قمت بحفظه لمراجعته لاحقاً.</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Grid */}
          <main className="lg:col-span-3 space-y-8">
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence>
                  {filteredItems.map((item, index) => {
                    const isExpanded = expandedItems.has(item.id);
                    const isSaved = savedItems.has(item.id);
                    const catInfo = categoryMap.find(c => c.id === item.category);

                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        layout
                      >
                        <div className={cn(
                          "bg-white rounded-[2rem] border transition-all duration-300 group overflow-hidden h-full flex flex-col",
                          isExpanded ? "border-blue-500 shadow-xl shadow-blue-100" : "border-slate-100 shadow-lg shadow-slate-200/50 hover:border-slate-300"
                        )}>
                          {/* Card Header */}
                          <div className="p-6 md:p-8 space-y-4 flex-grow">
                            <div className="flex items-center justify-between">
                              <span className={cn(
                                "text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full",
                                `bg-${catInfo?.color}-50 text-${catInfo?.color}-600`
                              )}>
                                {catInfo?.label}
                              </span>
                              <div className="flex items-center gap-1">
                                <button 
                                  onClick={() => copyToClipboard(item.answer)}
                                  className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                  title="نسخ الإجابة"
                                >
                                  <Copy className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => toggleSave(item.id)}
                                  className={cn(
                                    "p-2 transition-colors rounded-lg",
                                    isSaved ? "text-amber-500 bg-amber-50" : "text-slate-400 hover:text-amber-500 hover:bg-amber-50"
                                  )}
                                  title="حفظ للمراجعة"
                                >
                                  {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                                </button>
                              </div>
                            </div>

                            <div className="space-y-4">
                              <h3 className="text-xl font-black text-slate-900 leading-relaxed min-h-[3.5rem]">
                                {item.question}
                              </h3>
                              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-blue-50/50 group-hover:border-blue-100 transition-colors">
                                <p className="text-slate-700 font-bold leading-relaxed">{item.answer}</p>
                              </div>
                            </div>
                          </div>

                          {/* Expanded Content */}
                          <AnimatePresence>
                            {(isExpanded && (item.details || item.example)) && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="border-t border-slate-100 bg-slate-50/30"
                              >
                                <div className="p-6 md:p-8 space-y-6">
                                  {item.details && (
                                    <div className="space-y-2">
                                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">شرح معمق</h4>
                                      <p className="text-sm text-slate-600 font-medium leading-loose">{item.details}</p>
                                    </div>
                                  )}
                                  {item.example && (
                                    <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start gap-3">
                                      <Lightbulb className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                                      <div className="space-y-1">
                                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">مثال عملي</span>
                                        <p className="text-sm text-emerald-800 font-bold">{item.example}</p>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Footer Action */}
                          {(item.details || item.example) && (
                            <button 
                              onClick={() => toggleExpand(item.id)}
                              className="w-full py-4 text-xs font-black text-slate-400 hover:text-blue-600 border-t border-slate-50 flex items-center justify-center gap-2 group/btn transition-colors"
                            >
                              {isExpanded ? (
                                <>
                                  إخفاء التفاصيل
                                  <ChevronUp className="w-4 h-4" />
                                </>
                              ) : (
                                <>
                                  إظهار المزيد من التفاصيل
                                  <ChevronDown className="w-4 h-4 group-hover/btn:translate-y-0.5 transition-transform" />
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            ) : (
              <div className="bg-white rounded-[2.5rem] p-16 text-center space-y-6 border border-slate-100 shadow-xl">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                  <BookOpen className="w-10 h-10 text-slate-300" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900">لا توجد نتائج لبحثك</h3>
                  <p className="text-slate-500 font-medium">جرب كلمات بحث أخرى أو اختر تصنيفاً مختلفاً.</p>
                </div>
                <button 
                  onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                  className="px-6 py-2 text-blue-600 font-black"
                >
                  عرض جميع الأسئلة
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Advisory Footer Band */}
      <section className="container mx-auto px-6 mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-emerald-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700" />
            <div className="relative z-10 space-y-6">
              <h3 className="text-3xl font-black flex items-center gap-3">
                <Lightbulb className="w-8 h-8 text-emerald-400" />
                نصائح مهنية
              </h3>
              <div className="space-y-4">
                {[
                  "دقق القيود فور إدخالها لتجنب تراكم الأخطاء.",
                  "افهم طبيعة الحساب (مدين/دائن) قبل تسجيل المعاملة.",
                  "التزم بالمعايير المحاسبية المتبعة في شركتك.",
                  "طور مهاراتك في Excel فهي العمود الفقري للمحاسب."
                ].map((tip, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] font-black shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-emerald-50 font-medium text-sm leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-rose-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden group">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2 group-hover:scale-150 transition-transform duration-700" />
            <div className="relative z-10 space-y-6">
              <h3 className="text-3xl font-black flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-rose-400" />
                احذر الأخطاء
              </h3>
              <div className="space-y-4">
                {[
                  "تجاوز ميزان المراجعة قبل إغلاق الفترة.",
                  "نسيان إثبات قيود التسوية في نهاية الشهر.",
                  "الخلط بين الأموال الشخصية وأموال المؤسسة.",
                  "عدم الاحتفاظ بالمستندات المؤيدة لكل قيد."
                ].map((err, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-rose-500 shrink-0 mt-2.5" />
                    <p className="text-rose-50 font-medium text-sm leading-relaxed">{err}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
