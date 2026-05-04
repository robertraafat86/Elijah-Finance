import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  Download, 
  Table as TableIcon,
  BookOpen,
  Info,
  Layers,
  HelpCircle,
  FileSpreadsheet,
  FileDown,
  ArrowRight,
  ArrowLeft,
  SearchX,
  Sparkles
} from 'lucide-react';
import { cn } from '../lib/utils';
import { DETAILED_STANDARDS } from '../data/standardsDetailed';

type TabType = 'overview' | 'examples' | 'journal' | 'summary';

export default function AccountingStandards() {
  const [selectedCode, setSelectedCode] = useState(DETAILED_STANDARDS[0].code);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const filteredStandards = useMemo(() => {
    return DETAILED_STANDARDS.filter(s => 
      s.code.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const selectedStandard = useMemo(() => {
    return DETAILED_STANDARDS.find(s => s.code === selectedCode) || DETAILED_STANDARDS[0];
  }, [selectedCode]);

  const currentIndex = DETAILED_STANDARDS.findIndex(s => s.code === selectedCode);
  
  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedCode(DETAILED_STANDARDS[currentIndex - 1].code);
      setActiveTab('overview');
    }
  };

  const handleNext = () => {
    if (currentIndex < DETAILED_STANDARDS.length - 1) {
      setSelectedCode(DETAILED_STANDARDS[currentIndex + 1].code);
      setActiveTab('overview');
    }
  };

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'نظرة عامة', icon: <Info className="w-4 h-4" /> },
    { id: 'examples', label: 'أمثلة عملية', icon: <Layers className="w-4 h-4" /> },
    { id: 'journal', label: 'القيود اليومية', icon: <TableIcon className="w-4 h-4" /> },
    { id: 'summary', label: 'الملخص والأخطاء', icon: <BookOpen className="w-4 h-4" /> },
  ];

  return (
    <div className="pb-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-8 min-h-[800px]">
          
          {/* Sidebar */}
          <aside className="lg:w-80 shrink-0">
            <div className="sticky top-32 space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-200/50">
                <div className="relative mb-6">
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="بحث برقم أو اسم المعيار..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pr-10 pl-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>

                <div className="space-y-8 max-h-[600px] overflow-y-auto no-scrollbar pr-1">
                  {['IAS', 'IFRS'].map(cat => {
                    const items = filteredStandards.filter(s => s.category === cat);
                    if (items.length === 0) return null;
                    return (
                      <div key={cat} className="space-y-3">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">{cat} Standards</h3>
                        <div className="space-y-1">
                          {items.map((s) => (
                            <button
                              key={s.code}
                              onClick={() => {
                                setSelectedCode(s.code);
                                setActiveTab('overview');
                                if (window.innerWidth < 1024) {
                                  window.scrollTo({ top: 400, behavior: 'smooth' });
                                }
                              }}
                              className={cn(
                                'w-full flex items-center justify-between p-3 rounded-xl text-right transition-all group',
                                selectedCode === s.code 
                                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
                                  : 'text-slate-600 hover:bg-slate-50'
                              )}
                            >
                              <div className="flex flex-col text-right">
                                <span className={cn("text-xs font-black mb-0.5", selectedCode === s.code ? "text-blue-100" : "text-blue-600")}>{s.code}</span>
                                <span className="text-sm font-bold truncate max-w-[180px]">{s.title}</span>
                              </div>
                              <ChevronLeft className={cn("w-4 h-4 opacity-0 transition-all group-hover:opacity-100", selectedCode === s.code && "opacity-100")} />
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                  {filteredStandards.length === 0 && (
                    <div className="text-center py-12 space-y-4">
                      <SearchX className="w-12 h-12 text-slate-200 mx-auto" />
                      <p className="text-slate-400 text-sm font-bold">لا توجد نتائج للبحث</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Call to Action Sidebar Box */}
              <div className="bg-slate-900 rounded-3xl p-6 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative z-10 space-y-4">
                  <h4 className="font-black text-lg">تحتاج لشرح مخصص؟</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">يمكن لخبراء إيليجا تقديم دورات تدريبية متخصصة لفريق عملك في المعايير الدولية.</p>
                  <button className="w-full py-3 bg-blue-600 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all active:scale-95">تواصل معنا الآن</button>
                </div>
              </div>
            </div>
          </aside>

          {/* Content Area */}
          <main className="flex-grow">
            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-2xl shadow-slate-200/40 overflow-hidden flex flex-col h-full">
              
              {/* Content Header */}
              <div className="bg-slate-50 p-8 md:p-12 border-b border-slate-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest">{selectedStandard.category}</span>
                      <span className="text-slate-400 font-bold text-sm">/ {selectedStandard.code}</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900">{selectedStandard.title}</h1>
                    <p className="text-slate-500 max-w-2xl font-medium leading-relaxed">{selectedStandard.description}</p>
                    <Link 
                      to={`/${selectedStandard.category.toLowerCase()}/${selectedStandard.code.split(' ')[1]}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-black hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 group"
                    >
                      <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
                      شرح معزز بالذكاء الاصطناعي
                    </Link>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
                      <FileDown className="w-4 h-4 text-blue-600" />
                      PDF
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
                      <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                      Excel
                    </button>
                  </div>
                </div>
              </div>

              {/* Tabs Navigation */}
              <div className="flex items-center gap-1 p-2 bg-slate-50/50 border-b border-slate-100 overflow-x-auto no-scrollbar">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap",
                      activeTab === tab.id 
                        ? "bg-white text-blue-600 shadow-md shadow-slate-200/50" 
                        : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
                    )}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content Area */}
              <div className="flex-grow p-8 md:p-12 overflow-y-auto no-scrollbar">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${selectedCode}-${activeTab}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-12"
                  >
                    {!selectedStandard.details ? (
                      <div className="flex flex-col items-center justify-center py-24 text-center space-y-6">
                        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
                          <HelpCircle className="w-10 h-10 text-blue-400" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-slate-900">المحتوى قيد التجهيز</h3>
                          <p className="text-slate-500 max-w-sm">نعمل حالياً على إضافة الشرح التفصيلي لهذا المعيار. يرجى مراجعة المعايير المكتملة مثل IAS 1 أو IAS 2.</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Overview Tab Content */}
                        {activeTab === 'overview' && (
                          <div className="space-y-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <div className="bg-blue-50/50 p-8 rounded-[2rem] border border-blue-100/50 space-y-4">
                                <h3 className="text-lg font-black text-blue-600 flex items-center gap-2">
                                  <Info className="w-5 h-5" />
                                  التعريف والهدف
                                </h3>
                                <div className="space-y-6">
                                  <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">التعريف</p>
                                    <p className="text-slate-700 leading-relaxed font-bold">{selectedStandard.details.definition}</p>
                                  </div>
                                  <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">الهدف</p>
                                    <p className="text-slate-700 leading-relaxed">{selectedStandard.details.objective}</p>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-slate-50/50 p-8 rounded-[2rem] border border-slate-100 space-y-4">
                                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                                  <Layers className="w-5 h-5" />
                                  نطاق التطبيق
                                </h3>
                                <div className="space-y-6">
                                  <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">يتضمن</p>
                                    <ul className="space-y-2">
                                      {selectedStandard.details.scope.includes.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                                          {item}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">يستثني</p>
                                    <ul className="space-y-2">
                                      {selectedStandard.details.scope.excludes.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                          <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                                          {item}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-6">
                              <h3 className="text-xl font-bold text-slate-900 border-r-4 border-blue-600 pr-4">المفاهيم الأساسية</h3>
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {selectedStandard.details.keyConcepts.map((concept, i) => (
                                  <div key={i} className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all text-center">
                                    <span className="text-sm font-bold text-slate-700">{concept}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-6">
                              <h3 className="text-xl font-bold text-slate-900 border-r-4 border-blue-600 pr-4">المعالجة المحاسبية</h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                  { title: 'الاعتراف', content: selectedStandard.details.accountingTreatment.recognition, icon: <CheckCircle className="w-5 h-5 text-emerald-500" /> },
                                  { title: 'القياس', content: selectedStandard.details.accountingTreatment.measurement, icon: <Calculator className="w-5 h-5 text-blue-500" /> },
                                  { title: 'العرض', content: selectedStandard.details.accountingTreatment.presentation, icon: <TableIcon className="w-5 h-5 text-purple-500" /> },
                                  { title: 'الإفصاح', content: selectedStandard.details.accountingTreatment.disclosure, icon: <Info className="w-5 h-5 text-amber-500" /> },
                                ].map((step, i) => (
                                  <div key={i} className="flex gap-6 p-6 bg-white border border-slate-100 rounded-2xl shadow-sm group hover:border-blue-200 transition-all">
                                    <div className="bg-slate-50 p-4 rounded-xl h-fit group-hover:bg-blue-50 group-hover:text-blue-600 transition-all text-slate-400">
                                      {step.icon}
                                    </div>
                                    <div className="space-y-2">
                                      <h4 className="font-black text-slate-900">{step.title}</h4>
                                      <p className="text-sm text-slate-500 leading-relaxed">{step.content}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Examples Tab Content */}
                        {activeTab === 'examples' && (
                          <div className="space-y-8">
                            <div className="flex items-center gap-4 mb-4">
                              <div className="w-12 h-1 bg-emerald-600 rounded-full"></div>
                              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">حالات تطبيقية وأمثلة</h2>
                            </div>
                            <div className="space-y-6">
                              {selectedStandard.details.practicalExamples.map((ex, i) => (
                                <div key={i} className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-100">
                                  <div className="p-6 md:p-8 bg-slate-900 text-white">
                                    <h4 className="font-bold flex items-center gap-2">
                                      <HelpCircle className="w-5 h-5 text-blue-400" />
                                      الحالة العملية #{i + 1}
                                    </h4>
                                    <p className="mt-4 text-slate-300 leading-relaxed font-medium">{ex.case}</p>
                                  </div>
                                  <div className="p-6 md:p-8 space-y-4">
                                    <h5 className="font-black text-emerald-600 flex items-center gap-2">
                                      <CheckCircle className="w-5 h-5" />
                                      الحل والتفسير:
                                    </h5>
                                    <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                      <p className="text-slate-700 leading-loose">{ex.solution}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Journal Entries Tab Content */}
                        {activeTab === 'journal' && (
                          <div className="space-y-12">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-1 bg-purple-600 rounded-full"></div>
                              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">القيود المحاسبية</h2>
                            </div>
                            <div className="space-y-8">
                              {selectedStandard.details.journalEntries.map((je, i) => (
                                <div key={i} className="space-y-6">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-black text-sm">{i + 1}</div>
                                    <h4 className="font-bold text-slate-800">{je.description}</h4>
                                  </div>
                                  <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-xl">
                                    <table className="w-full text-right bg-white">
                                      <thead>
                                        <tr className="bg-slate-900 text-white text-xs uppercase tracking-widest">
                                          <th className="p-4 border-l border-white/10">البيان (الحساب)</th>
                                          <th className="p-4 border-l border-white/10 w-32">مدين</th>
                                          <th className="p-4 w-32">دائن</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {je.entries.map((entry, ei) => (
                                          <tr key={ei} className={cn("border-b border-slate-100 transition-colors hover:bg-slate-50", ei === je.entries.length - 1 && "border-0")}>
                                            <td className={cn("p-4 font-bold text-slate-700", entry.credit && "pr-12")}>
                                              {entry.credit && 'إلى '}
                                              {entry.debit && 'من '}
                                              {entry.account}
                                            </td>
                                            <td className="p-4 text-center font-mono text-emerald-600 font-bold bg-emerald-50/20">{entry.debit || '-'}</td>
                                            <td className="p-4 text-center font-mono text-rose-600 font-bold bg-rose-50/20">{entry.credit || '-'}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Summary Tab Content */}
                        {activeTab === 'summary' && (
                          <div className="space-y-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <div className="bg-emerald-50/50 p-8 rounded-[2rem] border border-emerald-100 space-y-6">
                                <h3 className="text-xl font-black text-emerald-600 flex items-center gap-2">
                                  <BookOpen className="w-6 h-6" />
                                  خلاصة المعيار
                                </h3>
                                <ul className="space-y-4">
                                  {selectedStandard.details.summary.map((point, i) => (
                                    <li key={i} className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm border border-emerald-100/50">
                                      <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                      <span className="text-sm font-bold text-slate-700 leading-relaxed">{point}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <div className="bg-rose-50/50 p-8 rounded-[2rem] border border-rose-100 space-y-6">
                                <h3 className="text-xl font-black text-rose-600 flex items-center gap-2">
                                  <AlertTriangle className="w-6 h-6" />
                                  أخطاء شائعة
                                </h3>
                                <ul className="space-y-4">
                                  {selectedStandard.details.commonErrors.map((error, i) => (
                                    <li key={i} className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm border border-rose-100/50">
                                      <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                                      <span className="text-sm font-bold text-slate-700 leading-relaxed">{error}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {selectedStandard.details.comparisons && (
                              <div className="bg-slate-900 rounded-[2rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
                                <div className="absolute top-0 left-0 w-32 h-32 bg-blue-600/30 rounded-full blur-3xl"></div>
                                <div className="relative z-10 space-y-6">
                                  <h3 className="text-2xl font-black flex items-center gap-3">
                                    <ArrowLeftRight className="w-6 h-6 text-blue-400" />
                                    مقارنة المعايير
                                  </h3>
                                  <p className="text-slate-400 text-lg leading-relaxed font-medium italic">
                                    "{selectedStandard.details.comparisons}"
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Footer */}
              <div className="bg-slate-50 p-6 border-t border-slate-100 flex items-center justify-between">
                <button 
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-white hover:shadow-md disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  <ArrowRight className="w-4 h-4" />
                  المعيار السابق
                </button>
                <div className="hidden md:flex flex-col items-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">تصفح الموسوعة</span>
                  <div className="flex gap-1">
                    {DETAILED_STANDARDS.map((s, idx) => (
                      <div 
                        key={s.code} 
                        className={cn(
                          "w-1.5 h-1.5 rounded-full transition-all",
                          idx === currentIndex ? "w-6 bg-blue-600" : "bg-slate-200"
                        )}
                      />
                    ))}
                  </div>
                </div>
                <button 
                  onClick={handleNext}
                  disabled={currentIndex === DETAILED_STANDARDS.length - 1}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-white hover:shadow-md disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  المعيار التالي
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}

function Calculator(props: any) { return <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="16" height="20" x="4" y="2" rx="2" /><line x1="8" x2="16" y1="6" y2="6" /><line x1="16" x2="16" y1="14" y2="18" /><path d="M16 10h.01" /><path d="M12 10h.01" /><path d="M8 10h.01" /><path d="M12 14h.01" /><path d="M8 14h.01" /><path d="M12 18h.01" /><path d="M8 18h.01" /></svg>; }
function AlertTriangle(props: any) { return <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><line x1="12" x2="12" y1="9" y2="13" /><line x1="12" x2="12.01" y1="17" y2="17" /></svg>; }
function XCircle(props: any) { return <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>; }
function ArrowLeftRight(props: any) { return <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 3 4 7l4 4" /><path d="M4 7h16" /><path d="m16 21 4-4-4-4" /><path d="M20 17H4" /></svg>; }
function CheckCircle(props: any) { return <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>; }
