import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Calculator, 
  Info, 
  HelpCircle, 
  CheckCircle, 
  AlertTriangle, 
  BookOpen, 
  FileDown, 
  FileSpreadsheet,
  BarChart,
  PieChart as PieChartIcon,
  TrendingUp,
  Table as TableIcon
} from 'lucide-react';
import { 
  BarChart as ReBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart as RePieChart,
  Pie,
  Legend
} from 'recharts';
import { cn } from '../../lib/utils';
import { FINANCIAL_ANALYSIS_DATA } from '../../data/financialAnalysis';
import DynamicGallery from '../../components/DynamicGallery';

export default function AnalysisDetail() {
  const { id } = useParams();
  
  const analysis = useMemo(() => {
    return FINANCIAL_ANALYSIS_DATA.find(a => a.id === id);
  }, [id]);

  if (!analysis) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center space-y-6">
        <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center">
          <AlertTriangle className="w-10 h-10 text-rose-400" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-900">التحليل غير موجود</h3>
          <Link to="/financial-analysis" className="text-blue-600 font-bold hover:underline">العودة للرئيسية</Link>
        </div>
      </div>
    );
  }

  const [editableData, setEditableData] = React.useState(analysis.practicalExample.data);

  const calculatedRatiosOutput = useMemo(() => {
    // Basic logic to show auto-calculation simulation
    if (id === 'liquidity') {
      const assets = Number(editableData.find(d => d.label.includes('أصول'))?.value || 0);
      const liabilities = Number(editableData.find(d => d.label.includes('التزامات'))?.value || 0);
      const inventory = Number(editableData.find(d => d.label.includes('مخزون'))?.value || 0);
      
      const current = liabilities > 0 ? (assets / liabilities).toFixed(2) : '0';
      const quick = liabilities > 0 ? ((assets - inventory) / liabilities).toFixed(2) : '0';
      
      return `نسبة التداول الحالية: ${current} | نسبة السيولة السريعة: ${quick}`;
    }
    return analysis.practicalExample.result;
  }, [editableData, id, analysis.practicalExample.result]);

  const updateDataValue = (index: number, newValue: string) => {
    const newData = [...editableData];
    newData[index] = { ...newData[index], value: Number(newValue) || 0 };
    setEditableData(newData);
  };

  return (
    <div className="pb-24">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <header className="mb-12 space-y-6">
          <Link to="/financial-analysis" className="inline-flex items-center gap-2 text-slate-500 font-bold hover:text-blue-600 transition-colors">
            <ArrowRight className="w-4 h-4" />
            العودة لكل أنواع التحليل
          </Link>
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-white p-8 md:p-12 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest">تحليل معمق</span>
                <span className="text-slate-400 font-bold text-sm">/ {analysis.title}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-slate-900">{analysis.title}</h1>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">{analysis.definition}</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
                <FileDown className="w-4 h-4 text-blue-600" />
                تحميل PDF
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                تصدير Excel
              </button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Objective & Definition */}
            <section className="bg-blue-50/50 p-8 md:p-12 rounded-[3rem] border border-blue-100/50 space-y-6">
              <h3 className="text-2xl font-black text-blue-600 flex items-center gap-3">
                <Info className="w-6 h-6" />
                الهدف من هذا التحليل
              </h3>
              <p className="text-lg text-slate-700 leading-loose font-medium">
                {analysis.objective}
              </p>
            </section>

            {/* Visual Guide for this specific analysis */}
            <section className="bg-white rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-sm">
              <h3 className="text-2xl font-black text-slate-900 mb-8">رسوم توضيحية لـ {analysis.title}</h3>
              <DynamicGallery tag={`financial-analysis-${analysis.id}`} />
              <p className="text-xs text-slate-400 mt-4 italic text-center">* يتم عرض الرسومات التي تحمل الوسم المخصص لهذا التحليل أو الوسم العام للتحليل المالي.</p>
            </section>

            {/* Calculations & Ratios */}
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-1 bg-indigo-600 rounded-full" />
                <h2 className="text-2xl md:text-3xl font-black text-slate-900">المعادلات والمؤشرات</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {analysis.ratios.map((ratio, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -5 }}
                    className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-lg shadow-slate-200/50 space-y-6 flex flex-col"
                  >
                    <div className="space-y-2">
                      <h4 className="text-xl font-black text-slate-900">{ratio.name}</h4>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">{ratio.description}</p>
                    </div>
                    
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">المعادلة المحاسبية</div>
                      <div className="text-blue-600 font-black text-lg dir-ltr">{ratio.formula}</div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-slate-50 space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">تفسير النتيجة</span>
                        <HelpCircle className="w-4 h-4 text-blue-400" />
                      </div>
                      <p className="text-sm text-slate-600 font-bold leading-relaxed">{ratio.interpretation}</p>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-full">
                        <CheckCircle className="w-3 h-3" />
                        النطاق الآمن: {ratio.goodRange}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Dynamic Examples & Charts */}
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-1 bg-emerald-600 rounded-full" />
                <h2 className="text-2xl md:text-3xl font-black text-slate-900">مثال عملي ورسوم بيانية</h2>
              </div>

              <div className="bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl">
                <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-8 text-white">
                    <div className="space-y-4">
                      <h4 className="text-2xl font-black flex items-center gap-3">
                        <Calculator className="w-6 h-6 text-emerald-400" />
                        مدخلات الحالة التطبيقية
                      </h4>
                      <div className="space-y-3">
                        {editableData.map((item, i) => (
                          <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 group focus-within:border-emerald-500/50 transition-all">
                            <span className="font-bold text-slate-300">{item.label}</span>
                            <div className="flex items-center gap-2">
                              <input 
                                type="number"
                                value={item.value}
                                onChange={(e) => updateDataValue(i, e.target.value)}
                                className="bg-transparent text-left font-mono text-emerald-400 font-black focus:outline-none w-32 border-b border-transparent focus:border-emerald-500/30"
                              />
                              <span className="text-slate-500 text-xs">ر.س</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-[10px] text-slate-500 italic mt-2">* قم بتعديل الأرقام أعلاه لتحديث النتائج والرسوم البيانية تلقائياً.</p>
                    </div>

                    <div className="space-y-4">
                      <h5 className="font-black text-slate-400 text-xs uppercase tracking-widest">خطوات الحساب:</h5>
                      <ul className="space-y-2">
                        {analysis.practicalExample.steps.map((step, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm font-medium text-slate-300">
                            <div className="w-5 h-5 rounded-full bg-blue-600/30 flex items-center justify-center text-[10px] text-blue-400 shrink-0">{i + 1}</div>
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/10 h-[400px] overflow-y-auto">
                    <div className="flex items-center justify-between mb-8">
                      <h5 className="text-white font-black">تصور البيانات</h5>
                      <TrendingUp className="w-5 h-5 text-emerald-400" />
                    </div>
                    
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 gap-6">
                        <div className="h-[250px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <ReBarChart data={editableData}>
                              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                              <XAxis dataKey="label" stroke="rgba(255,255,255,0.5)" fontSize={10} />
                              <YAxis stroke="rgba(255,255,255,0.5)" fontSize={10} />
                              <Tooltip 
                                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                labelStyle={{ color: '#94a3b8' }}
                                itemStyle={{ color: '#10b981' }}
                              />
                              <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                                {editableData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#3b82f6' : '#10b981'} />
                                ))}
                              </Bar>
                            </ReBarChart>
                          </ResponsiveContainer>
                        </div>

                        <div className="overflow-hidden rounded-2xl border border-white/10">
                          <table className="w-full text-sm text-right text-slate-300">
                            <thead className="text-xs uppercase bg-white/10 text-slate-400 font-black">
                              <tr>
                                <th className="px-6 py-3">البند المالي</th>
                                <th className="px-6 py-3">القيمة (ر.س)</th>
                                <th className="px-6 py-3">الحالة</th>
                              </tr>
                            </thead>
                            <tbody>
                              {editableData.map((item, i) => (
                                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                  <td className="px-6 py-4 font-bold">{item.label}</td>
                                  <td className="px-6 py-4 font-mono text-emerald-400">{(Number(item.value)).toLocaleString()}</td>
                                  <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-black rounded-full uppercase tracking-widest">نشط</span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-600 p-8 md:p-12 text-white">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-4">
                      <h4 className="text-xl font-black flex items-center gap-3">
                        <CheckCircle className="w-6 h-6" />
                        النتيجة والتفسير التلقائي
                      </h4>
                      <div className="text-emerald-100 font-black text-2xl">{calculatedRatiosOutput}</div>
                      <p className="text-emerald-50 text-lg font-medium leading-relaxed max-w-2xl">{analysis.practicalExample.interpretation}</p>
                    </div>
                    <div className="shrink-0 w-32 h-32 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                      <TrendingUp className="w-12 h-12 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            <aside className="sticky top-32 space-y-8">
              
              {/* Common Errors */}
              <div className="bg-rose-50/50 p-8 rounded-[2.5rem] border border-rose-100 space-y-6">
                <h3 className="text-xl font-black text-rose-600 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6" />
                  أخطاء شائعة
                </h3>
                <ul className="space-y-4">
                  {analysis.commonErrors.map((error, i) => (
                    <li key={i} className="flex items-start gap-4 p-4 bg-white rounded-2xl shadow-sm border border-rose-100/50">
                      <div className="w-2 h-2 rounded-full bg-rose-500 mt-2 shrink-0" />
                      <span className="text-sm font-bold text-slate-700 leading-relaxed">{error}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Summary */}
              <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 space-y-6">
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                  ملخص سريع
                </h3>
                <div className="space-y-4">
                  {analysis.summary.map((point, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-200/50">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs shrink-0">{i + 1}</div>
                      <p className="text-xs font-bold text-slate-600 leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Training CTA */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                <div className="relative z-10 space-y-6">
                  <h4 className="text-xl font-black">تحتاج استشارة مخصصة؟</h4>
                  <p className="text-sm text-blue-100 leading-relaxed font-medium">نساعدك في ربط هذه المؤشرات ببيانات شركتك الحقيقية للحصول على رؤى أعمق.</p>
                  <button className="w-full py-4 bg-white text-blue-600 rounded-2xl font-black text-sm hover:bg-blue-50 transition-all active:scale-95 shadow-xl">
                    احجز جلسة استشارية
                  </button>
                </div>
              </div>

            </aside>
          </div>

        </div>
      </div>
    </div>
  );
}
