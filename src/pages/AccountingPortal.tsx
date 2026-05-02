import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Calculator, 
  PieChart, 
  RefreshCw, 
  ShieldCheck, 
  TrendingUp, 
  ArrowLeft, 
  CheckCircle, 
  DollarSign, 
  Briefcase,
  FileText,
  Gavel,
  Target,
  Zap,
  Building2,
  Hospital,
  Factory,
  Truck
} from 'lucide-react';

export default function AccountingPortal() {
  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <section className="bg-white border-b border-slate-100 py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
              بوابة المحاسبة والمالية <br />
              <span className="text-blue-600">من التأسيس إلى الاحتراف</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
              منصة تعليمية متكاملة تهدف إلى تبسيط المفاهيم المحاسبية المعقدة وتقديمها في قالب عملي يناسب احتياجات السوق الحالي.
            </p>
          </div>
        </div>
      </section>

      {/* Overview Cards */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <div className="space-y-8">
              <div className="inline-flex p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-200">
                <Calculator className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">ما هي المحاسبة؟</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                المحاسبة ليست مجرد تسجيل أرقام، بل هي نظام متكامل لجمع وتحليل وتصنيف البيانات المالية، وتحويلها إلى معلومات قيمة تدعم عملية اتخاذ القرار الاستراتيجي في المؤسسات.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="clean-card bg-white">
                  <TrendingUp className="w-6 h-6 text-blue-600 mb-4" />
                  <h4 className="font-bold text-slate-900 mb-2">قياس الأداء</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">تساعد في معرفة مدى كفاءة الشركة في استغلال مواردها المتاحة.</p>
                </div>
                <div className="clean-card bg-white">
                  <Briefcase className="w-6 h-6 text-blue-600 mb-4" />
                  <h4 className="font-bold text-slate-900 mb-2">الامتثال والرقابة</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">تضمن الالتزام بالمعايير المهنية والقوانين الضريبية السائدة.</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="clean-card p-4 relative z-10 border border-slate-100 bg-white">
                <div className="w-full h-[400px] bg-slate-50 rounded-xl flex items-center justify-center p-12">
                   <div className="text-center space-y-6">
                      <div className="w-24 h-24 bg-blue-600/10 rounded-3xl flex items-center justify-center mx-auto text-blue-600">
                         <Calculator className="w-12 h-12" />
                      </div>
                      <p className="text-slate-400 font-bold">النظام والتحليل المالي</p>
                   </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-600/5 rounded-full blur-2xl"></div>
            </div>
          </div>

          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">الركائز الأساسية للمحاسبة المالية</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">فهم هذه العناصر هو الخطوة الأولى لأي محاسب ناجح يسعى للتميز المهني.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'الأصول (Assets)', desc: 'كل ما تمتلكه المنشأة وله قيمة اقتصادية مستقبلية.', example: 'مثل: النقدية، الآلات، والعقارات.', icon: <DollarSign /> },
              { title: 'الخصوم (Liabilities)', desc: 'الالتزامات والديون المستحقة على المنشأة تجاه الأطراف الخارجية.', example: 'مثل: القروض البنكية، والموردين.', icon: <Gavel /> },
              { title: 'حقوق الملكية (Equity)', desc: 'تمثل حصة الملاك في صافي قيمة المنشأة بعد خصم الالتزامات.', example: 'مثل: رأس المال، والأرباح المحتجزة.', icon: <ShieldCheck /> },
              { title: 'الإيرادات (Revenue)', desc: 'الزيادة في الأصول نتيجة بيع السلع أو تقديم الخدمات للعملاء.', example: 'مثل: مبيعات البضائع والخدمات.', icon: <TrendingUp /> },
              { title: 'المصروفات (Expenses)', desc: 'التكاليف التي تتحملها المنشأة في سبيل تحقيق الإيرادات.', example: 'مثل: الرواتب، الإيجارات، والإهلاك.', icon: <Zap /> },
            ].map((item, i) => (
              <div key={i} className="clean-card bg-white flex flex-col group h-full">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed flex-grow">{item.desc}</p>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 group-hover:border-blue-100 transition-colors">
                  <p className="text-xs text-blue-600 font-bold italic">{item.example}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accounting Cycle Promo Card */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-slate-900 rounded-[2.5rem] p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                  المسار التعليمي الأول
                </div>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight">فهم الدورة المحاسبية الكاملة</h2>
                <p className="text-slate-400 text-lg leading-relaxed">
                  تتبع خطوات العمليات المالية من لحظة حدوثها كتحليل أولي، صعوداً إلى قيود اليومية ووصولاً إلى تتويجها في القوائم المالية الختامية.
                </p>
                <Link 
                  to="/accounting-cycle" 
                  className="inline-flex items-center gap-3 bg-blue-600 text-white px-10 py-4 rounded-full font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/20"
                >
                  تصفح المسار التعليمي
                  <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { title: 'تحليل العمليات', icon: <Target /> },
                  { title: 'القيود اليومية', icon: <FileText /> },
                  { title: 'دفتر الأستاذ', icon: <BookOpen /> },
                  { title: 'ميزان المراجعة', icon: <Calculator /> },
                ].map((step, i) => (
                  <div key={i} className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm flex flex-col items-center gap-4 hover:bg-white/10 transition-all cursor-default">
                    <div className="text-blue-400">{step.icon}</div>
                    <p className="text-sm font-bold tracking-tight">{step.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Topics Links */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">مواضيع متقدمة في المحاسبة والمراجعة</h2>
            <p className="text-slate-600">انتقل بمستواك المهني إلى آفاق جديدة من خلال دراسة التخصصات المحاسبية الدقيقة.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'المحاسبة الضريبية', path: '/tax-accounting', icon: <Calculator className="w-5 h-5" /> },
              { title: 'محاسبة المقاولات', path: '/construction-accounting', icon: <Building2 className="w-5 h-5" /> },
              { title: 'محاسبة المستشفيات', path: '/hospital-accounting', icon: <Hospital className="w-5 h-5" /> },
              { title: 'محاسبة التكاليف', path: '/cost-accounting', icon: <Factory className="w-5 h-5" /> },
              { title: 'الضريبة الجمركية', path: '/customs-duties', icon: <Truck className="w-5 h-5" /> },
              { title: 'المراجعة الداخلية', path: '/internal-audit', icon: <ShieldCheck className="w-5 h-5" /> },
            ].map((link, i) => (
              <Link 
                key={i}
                to={link.path}
                className="clean-card bg-white flex items-center justify-between group py-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-50 flex items-center justify-center rounded-xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {link.icon}
                  </div>
                  <span className="font-bold text-slate-800">{link.title}</span>
                </div>
                <ArrowLeft className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-all group-hover:-translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
