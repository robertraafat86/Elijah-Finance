import React from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { 
  TrendingUp, 
  Droplets, 
  Zap, 
  BarChart, 
  Layers, 
  ArrowRightLeft, 
  Layout,
  ChevronLeft,
  Info,
  Calendar,
  Building2,
  FileDown,
  FileSpreadsheet
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { FINANCIAL_ANALYSIS_DATA } from '../../data/financialAnalysis';
import DynamicGallery from '../../components/DynamicGallery';
import { getDirectDriveUrl } from '../../services/driveService';

const iconMap: { [key: string]: React.ReactNode } = {
  liquidity: <Droplets className="w-8 h-8" />,
  profitability: <Zap className="w-8 h-8" />,
  activity: <TrendingUp className="w-8 h-8" />,
  leverage: <Layers className="w-8 h-8" />,
  horizontal: <ArrowRightLeft className="w-8 h-8" />,
  vertical: <Layout className="w-8 h-8" />,
};

const colorMap: { [key: string]: string } = {
  liquidity: 'blue',
  profitability: 'emerald',
  activity: 'amber',
  leverage: 'purple',
  horizontal: 'rose',
  vertical: 'indigo',
};

export default function FinancialAnalysis() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  return (
    <div className="pb-24">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-slate-50 -z-10" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 blur-3xl -z-10" />
        
        <div className="container mx-auto px-6 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-blue-50 rounded-full text-blue-600 font-black text-xs uppercase tracking-widest shadow-sm"
          >
            <BarChart className="w-4 h-4" />
            أدوات ذكاء الأعمال
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-slate-900 leading-tight"
          >
            التحليل المالي <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">من الأرقام إلى القرارات</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 max-w-3xl mx-auto text-lg md:text-xl font-medium leading-relaxed"
          >
            استكشف مجموعتنا من أدوات التحليل المالي التعليمية والعملية. تعلم كيفية قراءة وفهم القوائم المالية باستخدام أدق المعايير والمؤشرات العالمية.
          </motion.p>
        </div>
      </section>

      {/* Visual Framework Section */}
      <section className="container mx-auto px-6 -mt-12 mb-20 pointer-events-none relative z-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-[3rem] p-4 md:p-8 border border-white shadow-2xl shadow-blue-900/10 max-w-5xl mx-auto overflow-hidden pointer-events-auto"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />
            <img 
              src="https://drive.google.com/uc?export=download&id=1M1WxYIFZjGFhu0ompvAKNe2os4L5NlCj" 
              alt="Financial Analysis Concept Map" 
              className="w-full h-auto rounded-[2rem] shadow-sm transform group-hover:scale-[1.01] transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="mt-8 text-center">
            <h2 className="text-xl font-black text-slate-900 flex items-center justify-center gap-2">
              <div className="w-8 h-1 bg-blue-600 rounded-full" />
              {isRtl ? 'خارطة طريق التحليل المالي الشامل' : 'Comprehensive Financial Analysis Roadmap'}
              <div className="w-8 h-1 bg-blue-600 rounded-full" />
            </h2>
            <p className="text-slate-500 text-sm font-bold mt-2">
              {isRtl ? 'نظرة بصرية شاملة تربط بين النسب المالية والقرارات الإدارية' : 'A holistic visual guide connecting financial ratios to management decisions'}
            </p>
          </div>
        </motion.div>
      </section>

      {/* Analysis Grid */}
      <section className="container mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FINANCIAL_ANALYSIS_DATA.map((analysis, index) => {
            const color = colorMap[analysis.id] || 'blue';
            return (
              <motion.div
                key={analysis.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  to={`/financial-analysis/${analysis.id}`}
                  className="group block h-full bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-200/50 hover:-translate-y-2 transition-all duration-500"
                >
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500",
                    `bg-${color}-50 text-${color}-600`
                  )}>
                    {iconMap[analysis.id]}
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                      {analysis.title}
                    </h3>
                    <p className="text-slate-500 font-medium leading-relaxed line-clamp-3">
                      {analysis.definition}
                    </p>
                    
                    <div className="pt-6 flex items-center justify-between">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        {analysis.ratios.length} مؤشرات رئيسية
                      </span>
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <ChevronLeft className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Global Controls Filter Mockup */}
      <section className="container mx-auto px-6 mt-24">
        <div className="bg-slate-900 rounded-[3rem] p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-1 space-y-6">
              <h2 className="text-3xl font-black">تحكم ذكي في البيانات</h2>
              <p className="text-slate-400 font-medium">
                تم دمج جميع أدوات التحليل مع بياناتك المالية الحالية. اختر الفترة والشركة لعرض النتائج لحظياً.
              </p>
            </div>
            
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl space-y-4">
                <div className="flex items-center justify-between">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">التدقيق الفتري</span>
                </div>
                <div className="flex gap-2">
                  <div className="flex-grow bg-white/10 rounded-xl px-4 py-2 text-sm text-slate-300">من: 01/01/2025</div>
                  <div className="flex-grow bg-white/10 rounded-xl px-4 py-2 text-sm text-slate-300">إلى: 31/03/2025</div>
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl space-y-4">
                <div className="flex items-center justify-between">
                  <Building2 className="w-5 h-5 text-indigo-400" />
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">الكيان الاقتصادي</span>
                </div>
                <div className="bg-white/10 rounded-xl px-4 py-3 text-sm text-slate-300 flex items-center justify-between">
                  <span>المجموعة الدولية القابضة</span>
                  <ChevronLeft className="w-4 h-4 -rotate-90" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Educational Footer */}
      <section className="container mx-auto px-6 mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-blue-50/50 p-8 rounded-[2rem] border border-blue-100/50 flex flex-col items-center text-center space-y-4">
            <div className="p-4 bg-white rounded-2xl shadow-sm">
              <Info className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-bold text-slate-900">تعلم المفاهيم</h4>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">كل صفحة تحليل تحتوي على شرح أكاديمي مفصل لكل مؤشر مالي وكيفية حسابه.</p>
          </div>
          
          <div className="bg-emerald-50/50 p-8 rounded-[2rem] border border-emerald-100/50 flex flex-col items-center text-center space-y-4">
            <div className="p-4 bg-white rounded-2xl shadow-sm">
              <Zap className="w-6 h-6 text-emerald-600" />
            </div>
            <h4 className="font-bold text-slate-900">تطبيق عملي</h4>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">استخدم الآلات الحاسبة المدمجة لإدخال أرقام مخصصتك وحساب النسب فوراً.</p>
          </div>
          
          <div className="bg-purple-50/50 p-8 rounded-[2rem] border border-purple-100/50 flex flex-col items-center text-center space-y-4">
            <div className="p-4 bg-white rounded-2xl shadow-sm">
              <FileDown className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-bold text-slate-900">تقارير جاهزة</h4>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">قم بتحميل ملخص التحليل المالي الخاص بك بصيغة PDF أو Excel بضغطة زر.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
