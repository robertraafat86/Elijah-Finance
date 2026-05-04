import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ArrowLeft,
  RefreshCw, 
  Copy, 
  Printer, 
  FileDown, 
  Info, 
  Layers, 
  BookOpen, 
  Table as TableIcon,
  CheckCircle,
  AlertCircle,
  Loader2,
  ChevronRight,
  Sparkles,
  BookMarked
} from 'lucide-react';
import { cn } from '../lib/utils';
import { generateStandardExplanation, StandardContent } from '../services/aiStandardService';
import { ALL_STANDARDS } from '../data/standardsList';

type TabType = 'overview' | 'treatment' | 'examples' | 'journal' | 'summary';

interface StandardDetailAIProps {
  type: 'IAS' | 'IFRS';
}

export default function StandardDetailAI({ type }: StandardDetailAIProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<StandardContent | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [error, setError] = useState<string | null>(null);

  const standardCode = `${type} ${id}`;

  const currentStandardIndex = useMemo(() => {
    return ALL_STANDARDS.findIndex(s => s.type === type && s.id === id);
  }, [type, id]);

  const prevStandard = ALL_STANDARDS[currentStandardIndex - 1];
  const nextStandard = ALL_STANDARDS[currentStandardIndex + 1];

  const fetchContent = async (forceRegenerate = false) => {
    setLoading(true);
    setError(null);
    try {
      const cacheKey = `standard_cache_${type}_${id}`;
      const cached = localStorage.getItem(cacheKey);

      if (cached && !forceRegenerate) {
        setContent(JSON.parse(cached));
      } else {
        const generated = await generateStandardExplanation(standardCode);
        setContent(generated);
        localStorage.setItem(cacheKey, JSON.stringify(generated));
      }
    } catch (err) {
      console.error(err);
      setError('حدث خطأ أثناء توليد الشرح. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
    setActiveTab('overview');
    window.scrollTo(0, 0);
  }, [type, id]);

  const handleCopy = () => {
    if (!content) return;
    const text = `${content.title}\n\n${content.definition}\n\n${content.objective}`;
    navigator.clipboard.writeText(text);
    alert('تم نسخ المحتوى الأساسي للمعيار');
  };

  const handlePrint = () => {
    window.print();
  };

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'نظرة عامة', icon: <Info className="w-4 h-4" /> },
    { id: 'treatment', label: 'المعالجة المحاسبية', icon: <BookMarked className="w-4 h-4" /> },
    { id: 'examples', label: 'أمثلة عملية', icon: <Layers className="w-4 h-4" /> },
    { id: 'journal', label: 'القيود اليومية', icon: <TableIcon className="w-4 h-4" /> },
    { id: 'summary', label: 'الملخص والأخطاء', icon: <BookOpen className="w-4 h-4" /> },
  ];

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center space-y-6">
        <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center">
          <AlertCircle className="w-10 h-10 text-rose-500" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-900">{error}</h3>
          <button 
            onClick={() => fetchContent(true)}
            className="text-blue-600 font-black hover:underline flex items-center gap-2 mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-24">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-50/30 blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-50/20 blur-3xl opacity-50" />
      </div>

      <div className="container mx-auto px-6">
        
        {/* Breadcrumbs & Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 mt-8">
          <nav className="flex items-center gap-2 text-sm font-bold text-slate-400">
            <Link to="/accounting-standards" className="hover:text-blue-600 transition-colors">المعايير</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900">{standardCode}</span>
          </nav>
          
          <div className="flex flex-wrap items-center gap-2">
            <button 
              onClick={() => fetchContent(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
              title="إعادة توليد الشرح"
            >
              <RefreshCw className={cn("w-3 h-3", loading && "animate-spin")} />
              إعادة توليد الشرح
            </button>
            <button onClick={handleCopy} className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 shadow-sm">
              <Copy className="w-4 h-4" />
            </button>
            <button onClick={handlePrint} className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 shadow-sm">
              <Printer className="w-4 h-4" />
            </button>
    <button 
      onClick={() => alert('هذه الميزة ستكون متاحة قريباً في النسخة الاحترافية.')}
      className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-black hover:bg-slate-800 transition-all shadow-lg"
    >
      <FileDown className="w-4 h-4 text-blue-400" />
      تحميل PDF
    </button>
          </div>
        </div>

        {/* Loader State */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="flex flex-col items-center justify-center py-32 space-y-8 bg-white/50 backdrop-blur-md rounded-[3rem] border border-white"
            >
              <div className="relative">
                <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-amber-400 animate-pulse" />
              </div>
              <div className="space-y-3 text-center">
                <h2 className="text-2xl font-black text-slate-900">جاري توليد الشرح الذكي...</h2>
                <p className="text-slate-500 font-medium">يقوم الذكاء الاصطناعي بتحليل معيار {standardCode} وتجهيز الأمثلة والقيود</p>
              </div>
            </motion.div>
          ) : content ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              {/* Header Card */}
              <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
                
                <div className="relative z-10 space-y-6">
                  <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 rounded-full backdrop-blur-md">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">تم توليد الشرح بواسطة AI</span>
                  </div>
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight">
                    {content.title}
                  </h1>
                  <p className="text-slate-400 text-lg md:text-xl font-medium max-w-3xl leading-relaxed">
                    {content.definition}
                  </p>
                </div>
              </div>

              {/* Tabs Section */}
              <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
                <div className="flex items-center gap-1 p-2 bg-slate-50 border-b border-slate-100 overflow-x-auto no-scrollbar">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "flex items-center gap-2 px-6 py-4 rounded-2xl text-sm font-black transition-all whitespace-nowrap",
                        activeTab === tab.id 
                          ? "bg-white text-blue-600 shadow-lg shadow-slate-200" 
                          : "text-slate-500 hover:text-slate-900"
                      )}
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="p-8 md:p-12">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-12"
                    >
                      {/* Overview Tab */}
                      {activeTab === 'overview' && (
                        <div className="space-y-12">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-blue-50/50 p-8 rounded-3xl border border-blue-100/50 space-y-6">
                              <h3 className="text-xl font-black text-blue-600 flex items-center gap-3">
                                <Info className="w-6 h-6" />
                                الهدف من المعيار
                              </h3>
                              <p className="text-slate-700 text-lg leading-loose font-medium">
                                {content.objective}
                              </p>
                            </div>
                            <div className="bg-slate-50/50 p-8 rounded-3xl border border-slate-100 space-y-6">
                              <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                                <Layers className="w-6 h-6" />
                                نطاق التطبيق
                              </h3>
                              <p className="text-slate-600 text-lg leading-loose font-medium">
                                {content.scope}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-6">
                            <h3 className="text-2xl font-black text-slate-900 border-r-8 border-blue-600 pr-4">المفاهيم الأساسية</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {content.keyConcepts.map((concept, i) => (
                                <div key={i} className="flex items-center gap-4 bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:translate-y-1 transition-all">
                                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-black shrink-0">
                                    {i + 1}
                                  </div>
                                  <span className="font-bold text-slate-700 leading-relaxed">{concept}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Treatment Tab */}
                      {activeTab === 'treatment' && (
                        <div className="space-y-12">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                              { title: 'الاعتراف (Recognition)', content: content.accountingTreatment.recognition, color: 'emerald' },
                              { title: 'القياس (Measurement)', content: content.accountingTreatment.measurement, color: 'blue' },
                              { title: 'العرض (Presentation)', content: content.accountingTreatment.presentation, color: 'purple' },
                              { title: 'الإفصاح (Disclosure)', content: content.accountingTreatment.disclosure, color: 'amber' },
                            ].map((item, i) => (
                              <div key={i} className={cn(
                                "p-8 rounded-[2rem] border space-y-4",
                                `bg-${item.color}-50/30 border-${item.color}-100`
                              )}>
                                <h4 className={cn("text-xl font-black", `text-${item.color}-600`)}>{item.title}</h4>
                                <p className="text-slate-700 leading-relaxed font-bold">{item.content}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Examples Tab */}
                      {activeTab === 'examples' && (
                        <div className="space-y-12">
                          {content.practicalExamples.map((ex, i) => (
                            <div key={i} className="bg-slate-50 rounded-[2.5rem] overflow-hidden border border-slate-200 shadow-lg">
                              <div className="p-8 md:p-12 bg-slate-900 text-white">
                                <h5 className="text-blue-400 font-black text-xs uppercase tracking-widest mb-4">مثال تطبيقي #{i + 1}</h5>
                                <h4 className="text-2xl font-black leading-relaxed">{ex.scenario}</h4>
                              </div>
                              <div className="p-8 md:p-12 space-y-6">
                                <div className="flex items-center gap-3 text-emerald-600">
                                  <CheckCircle className="w-6 h-6" />
                                  <span className="text-xl font-black">الحل والمعالجة:</span>
                                </div>
                                <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-inner">
                                  <p className="text-slate-700 text-lg leading-loose font-medium whitespace-pre-wrap">{ex.solution}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Journal Entries Tab */}
                      {activeTab === 'journal' && (
                        <div className="space-y-8">
                          {content.journalEntries.map((je, i) => (
                            <div key={i} className="space-y-6 bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-black">
                                  {i + 1}
                                </div>
                                <h4 className="text-xl font-black text-slate-900">{je.description}</h4>
                              </div>
                              
                              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                                <table className="w-full text-right">
                                  <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-xs font-black uppercase tracking-widest text-slate-500">
                                      <th className="p-4 border-l border-slate-200">البيان / الحساب</th>
                                      <th className="p-4 border-l border-slate-200 text-center w-32">مدين</th>
                                      <th className="p-4 text-center w-32">دائن</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {je.entries.map((entry, ei) => (
                                      <tr key={ei} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                                        <td className={cn("p-4 font-bold text-slate-700", entry.credit > 0 && "pr-12")}>
                                          {entry.debit > 0 ? 'من حـ/ ' : 'إلى حـ/ '}
                                          {entry.account}
                                        </td>
                                        <td className="p-4 text-center font-mono font-black text-blue-600 bg-blue-50/30">
                                          {entry.debit > 0 ? entry.debit.toLocaleString() : '-'}
                                        </td>
                                        <td className="p-4 text-center font-mono font-black text-rose-600 bg-rose-50/30">
                                          {entry.credit > 0 ? entry.credit.toLocaleString() : '-'}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Summary Tab */}
                      {activeTab === 'summary' && (
                        <div className="space-y-12">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-emerald-50/50 p-8 rounded-[2.5rem] border border-emerald-100 space-y-8">
                              <h3 className="text-2xl font-black text-emerald-600 flex items-center gap-3">
                                <CheckCircle className="w-8 h-8" />
                                ملخص المعيار
                              </h3>
                              <ul className="space-y-4">
                                {content.summary.map((point, i) => (
                                  <li key={i} className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm border border-emerald-100/50">
                                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-black shrink-0 mt-1">{i + 1}</div>
                                    <p className="text-slate-700 font-bold leading-relaxed">{point}</p>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="bg-rose-50/50 p-8 rounded-[2.5rem] border border-rose-100 space-y-8">
                              <h3 className="text-2xl font-black text-rose-600 flex items-center gap-3">
                                <AlertCircle className="w-8 h-8" />
                                أخطاء شائعة
                              </h3>
                              <ul className="space-y-4">
                                {content.commonErrors.map((error, i) => (
                                  <li key={i} className="flex items-start gap-4 p-5 bg-white rounded-2xl shadow-sm border border-rose-100/50">
                                    <div className="w-2 h-2 rounded-full bg-rose-500 shrink-0 mt-2.5" />
                                    <p className="text-slate-700 font-bold leading-relaxed">{error}</p>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation Footer */}
                <div className="bg-slate-50 p-8 border-t border-slate-100 flex items-center justify-between">
                  {prevStandard ? (
                    <Link 
                      to={`/${prevStandard.type.toLowerCase()}/${prevStandard.id}`}
                      className="flex items-center gap-3 px-6 py-4 rounded-2xl text-sm font-black text-slate-600 hover:bg-white hover:shadow-md transition-all active:scale-95"
                    >
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                      <div>
                        <div className="text-[10px] text-slate-400 uppercase tracking-widest leading-none mb-1">المعيار السابق</div>
                        <div>{prevStandard.type} {prevStandard.id}</div>
                      </div>
                    </Link>
                  ) : <div />}

                  <div className="hidden lg:flex flex-col items-center">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">تصفح المعايير</span>
                    <div className="flex gap-1.5">
                      {ALL_STANDARDS.map((s, idx) => (
                        <div 
                          key={`${s.type}-${s.id}`} 
                          className={cn(
                            "w-1.5 h-1.5 rounded-full transition-all",
                            idx === currentStandardIndex ? "w-6 bg-blue-600" : "bg-slate-200"
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  {nextStandard ? (
                    <Link 
                      to={`/${nextStandard.type.toLowerCase()}/${nextStandard.id}`}
                      className="flex items-center gap-3 px-6 py-4 rounded-2xl text-sm font-black text-slate-600 hover:bg-white hover:shadow-md transition-all active:scale-95 group"
                    >
                      <div className="text-left">
                        <div className="text-[10px] text-slate-400 uppercase tracking-widest leading-none mb-1 text-right">المعيار التالي</div>
                        <div>{nextStandard.type} {nextStandard.id}</div>
                      </div>
                      <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                    </Link>
                  ) : <div />}
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

      </div>
    </div>
  );
}
