import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
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
  Info,
  Calculator,
  Recycle,
  ShieldAlert,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { ACCOUNTING_MISC_DATA } from '../../data/accountingMisc';
import { AccountingMiscCategory } from '../../types';
import { Link } from 'react-router-dom';

export default function AccountingMisc() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<AccountingMiscCategory | 'all'>('all');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set());

  const featuredModules = [
    {
      id: 'depreciation',
      title: t('depreciation_page.title'),
      desc: t('depreciation_page.subtitle'),
      icon: <Calculator className="w-8 h-8" />,
      path: '/depreciation-methods',
      color: 'blue'
    },
    {
      id: 'scrap',
      title: t('scrap_page.title'),
      desc: t('scrap_page.subtitle'),
      icon: <Recycle className="w-8 h-8" />,
      path: '/scrap',
      color: 'emerald'
    },
    {
      id: 'bad-debts',
      title: t('bad_debts_page.title'),
      desc: t('bad_debts_page.subtitle'),
      icon: <ShieldAlert className="w-8 h-8" />,
      path: '/bad-debts',
      color: 'red'
    }
  ];

  const categoryMap: { id: AccountingMiscCategory; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'basic-concepts', label: t('misc.categories.basic-concepts'), icon: <BookOpen className="w-4 h-4" />, color: 'blue' },
    { id: 'terminology', label: t('misc.categories.terminology'), icon: <Info className="w-4 h-4" />, color: 'emerald' },
    { id: 'tips', label: t('misc.categories.tips'), icon: <Lightbulb className="w-4 h-4" />, color: 'amber' },
    { id: 'common-errors', label: t('misc.categories.common-errors'), icon: <AlertTriangle className="w-4 h-4" />, color: 'rose' },
    { id: 'quick-q', label: t('misc.categories.quick-q'), icon: <Zap className="w-4 h-4" />, color: 'purple' },
    { id: 'general-info', label: t('misc.categories.general-info'), icon: <HelpCircle className="w-4 h-4" />, color: 'indigo' },
  ];

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
  };

  const quickQuestions = ACCOUNTING_MISC_DATA.filter(item => item.isQuick);

  return (
    <div className="pb-24 text-right">
      {/* Hero Section */}
      <section className="relative py-20 bg-slate-900 overflow-hidden text-center">
        <div className="absolute inset-0 bg-blue-600/5 -z-10" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-3xl rounded-full -z-10" />
        
        <div className="container mx-auto px-6 space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 font-black text-[10px] uppercase tracking-widest"
          >
            <HelpCircle className="w-4 h-4" />
            {t('misc.title')}
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-white leading-tight"
          >
            {t('misc.title')} <br />
            <span className="text-blue-400 font-black">{t('misc.subtitle')}</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl font-medium"
          >
            {t('misc.description')}
          </motion.p>
        </div>
      </section>

      {/* Quick Access Band */}
      <section className="bg-slate-50 border-y border-slate-200 py-6 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className={cn("flex items-center gap-4", !isRtl && "flex-row-reverse")}>
            <div className="shrink-0 flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-600 rounded-xl font-black text-xs uppercase tracking-widest whitespace-nowrap">
              <Zap className="w-4 h-4" />
              {t('misc.quick_questions')}
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

      {/* Featured Learning Modules */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t('depreciation_page.featured_title')}</h2>
            <p className="text-slate-500 font-medium">{t('depreciation_page.featured_desc')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredModules.map((module) => (
              <Link 
                key={module.id}
                to={module.path}
                className="group relative bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 hover:border-blue-500 hover:bg-white transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200 overflow-hidden"
              >
                <div className={cn(
                  "absolute top-0 right-0 w-32 h-32 opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700",
                  `bg-${module.color}-600`
                )} />
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500",
                  `bg-${module.color}-100 text-${module.color}-600`
                )}>
                  {module.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">{module.title}</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8">{module.desc}</p>
                <div className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest">
                  {t('depreciation_page.start_learning')}
                  {isRtl ? <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> : <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Sidebar Filters */}
          <aside className={cn("lg:col-span-1 space-y-8", !isRtl && "lg:order-2")}>
            <div className="sticky top-24 space-y-8">
              {/* Search */}
              <div className="space-y-4">
                <h3 className={cn("text-sm font-black text-slate-900 flex items-center gap-2", !isRtl && "flex-row-reverse")}>
                  <Search className="w-4 h-4 text-blue-500" />
                  {t('misc.search_label')}
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('misc.search_placeholder')}
                    className={cn(
                      "w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-bold text-sm shadow-sm transition-all",
                      !isRtl && "text-left"
                    )}
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-4">
                <h3 className={cn("text-sm font-black text-slate-900 flex items-center gap-2", !isRtl && "flex-row-reverse")}>
                  <Filter className="w-4 h-4 text-emerald-500" />
                  {t('misc.categories_label')}
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setActiveCategory('all')}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all",
                      activeCategory === 'all' 
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-200" 
                        : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200",
                      !isRtl && "flex-row-reverse"
                    )}
                  >
                    <span>{t('misc.categories.all')}</span>
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
                          : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200",
                        !isRtl && "flex-row-reverse"
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
              <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-6 text-white overflow-hidden relative group text-center">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-center gap-2">
                    <BookmarkCheck className="w-5 h-5 text-blue-300" />
                    <span className="text-xs font-black uppercase tracking-widest">{t('misc.saved_items')}</span>
                  </div>
                  <div className="text-3xl font-black">{savedItems.size}</div>
                  <p className="text-xs text-blue-100/70 font-medium">{t('misc.saved_desc')}</p>
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
                          isExpanded ? "border-blue-500 shadow-xl shadow-blue-100" : "border-slate-100 shadow-lg shadow-slate-200/50 hover:border-slate-300",
                          !isRtl && "text-left"
                        )}>
                          {/* Card Header */}
                          <div className="p-6 md:p-8 space-y-4 flex-grow">
                            <div className={cn("flex items-center justify-between", !isRtl && "flex-row-reverse")}>
                              <span className={cn(
                                "text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full",
                                catInfo ? `bg-${catInfo.color}-50 text-${catInfo.color}-600` : ""
                              )}>
                                {catInfo?.label}
                              </span>
                              <div className="flex items-center gap-1">
                                <button 
                                  onClick={() => copyToClipboard(item.answer)}
                                  className="p-2 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                  title={t('common.copy')}
                                >
                                  <Copy className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => toggleSave(item.id)}
                                  className={cn(
                                    "p-2 transition-colors rounded-lg",
                                    isSaved ? "text-amber-500 bg-amber-50" : "text-slate-400 hover:text-amber-500 hover:bg-amber-50"
                                  )}
                                  title={t('common.save')}
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
                                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">{t('misc.details_label')}</h4>
                                      <p className="text-sm text-slate-600 font-medium leading-loose">{item.details}</p>
                                    </div>
                                  )}
                                  {item.example && (
                                    <div className={cn(
                                      "p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start gap-3",
                                      !isRtl && "flex-row-reverse"
                                    )}>
                                      <Lightbulb className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                                      <div className={cn("space-y-1", !isRtl && "text-right")}>
                                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{t('misc.example_label')}</span>
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
                                  {t('misc.hide_details')}
                                  <ChevronUp className="w-4 h-4" />
                                </>
                              ) : (
                                <>
                                  {t('misc.show_details')}
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
                  <h3 className="text-xl font-bold text-slate-900">{t('misc.no_results')}</h3>
                  <p className="text-slate-500 font-medium">{t('misc.no_results_desc')}</p>
                </div>
                <button 
                  onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                  className="px-6 py-2 text-blue-600 font-black"
                >
                  {t('misc.show_all')}
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
              <h3 className={cn("text-3xl font-black flex items-center gap-3", !isRtl && "flex-row-reverse")}>
                <Lightbulb className="w-8 h-8 text-emerald-400" />
                {t('misc.professional_tips')}
              </h3>
              <div className="space-y-4">
                {(isRtl ? [
                  "دقق القيود فور إدخالها لتجنب تراكم الأخطاء.",
                  "افهم طبيعة الحساب (مدين/دائن) قبل تسجيل المعاملة.",
                  "التزم بالمعايير المحاسبية المتبعة في شركتك.",
                  "طور مهاراتك في Excel فهي العمود الفقري للمحاسبة."
                ] : [
                  "Check entries immediately upon entry to avoid accumulation of errors.",
                  "Understand the nature of the account (Debit/Credit) before recording the transaction.",
                  "Adhere to the accounting standards followed in your company.",
                  "Develop your Excel skills; it's the backbone of accounting."
                ]).map((tip, i) => (
                  <div key={i} className={cn("flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/10", !isRtl && "flex-row-reverse")}>
                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] font-black shrink-0">
                      {i + 1}
                    </div>
                    <p className={cn("text-emerald-50 font-medium text-sm leading-relaxed", !isRtl && "text-left")}>{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-rose-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden group">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2 group-hover:scale-150 transition-transform duration-700" />
            <div className="relative z-10 space-y-6">
              <h3 className={cn("text-3xl font-black flex items-center gap-3", !isRtl && "flex-row-reverse")}>
                <AlertTriangle className="w-8 h-8 text-rose-400" />
                {t('misc.common_errors')}
              </h3>
              <div className="space-y-4">
                {(isRtl ? [
                  "تجاوز ميزان المراجعة قبل إغلاق الفترة.",
                  "نسيان إثبات قيود التسوية في نهاية الشهر.",
                  "الخلط بين الأموال الشخصية وأموال المؤسسة.",
                  "عدم الاحتفاظ بالمستندات المؤيدة لكل قيد."
                ] : [
                  "Bypassing the trial balance before closing the period.",
                  "Forgetting to prove reconciliation entries at the end of the month.",
                  "Mixing personal funds with organizational funds.",
                  "Failing to keep supporting documents for each entry."
                ]).map((err, i) => (
                  <div key={i} className={cn("flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/10", !isRtl && "flex-row-reverse")}>
                    <div className="w-2 h-2 rounded-full bg-rose-500 shrink-0 mt-2.5" />
                    <p className={cn("text-rose-50 font-medium text-sm leading-relaxed", !isRtl && "text-left")}>{err}</p>
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
