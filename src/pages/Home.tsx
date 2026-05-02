import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle, 
  TrendingUp, 
  Shield, 
  Zap, 
  BookOpen, 
  BarChart3, 
  Globe, 
  Flag, 
  FileText, 
  Package, 
  Building2, 
  Search, 
  Briefcase,
  Clock,
  Headphones,
  FileSearch,
  Calculator,
  PieChart,
  Ship,
  Users
} from 'lucide-react';
import { cn } from '../lib/utils';
import { LOGO_URL } from '../constants';

export default function Home() {
  const mainSections = [
    { 
      title: 'الدورة المحاسبية', 
      desc: 'شرح شامل لكل مراحل المحاسبة من البداية للنهاية، يتضمن تحليل العمليات المالية والقيود اليومية والترحيل لدفتر الأستاذ.', 
      icon: <BookOpen className="w-8 h-8" />, 
      path: '/accounting-cycle' 
    },
    { 
      title: 'القوائم المالية', 
      desc: 'إعداد وتحليل القوائم المالية باحتراف بما في ذلك قائمة الدخل، المركز المالي، والتدفقات النقدية وفق المعايير.', 
      icon: <BarChart3 className="w-8 h-8" />, 
      path: '/financial-statements' 
    },
    { 
      title: 'المعايير الدولية', 
      desc: 'شرح تفصيلي لمعايير التقارير المالية الدولية IFRS ومعايير المحاسبة الدولية IAS وتطبيقاتها العملية.', 
      icon: <Globe className="w-8 h-8" />, 
      path: '/accounting-standards' 
    },
    { 
      title: 'المحاسبة الضريبية', 
      desc: 'دليل شامل لضريبة الدخل والقيمة المضافة وكيفية إعداد الإقرارات الضريبية والتعامل مع مصلحة الضرائب.', 
      icon: <Calculator className="w-8 h-8" />, 
      path: '/tax-accounting' 
    },
    { 
      title: 'اللائحة المالية', 
      desc: 'دراسة اللوائح المالية والموازنات التقديرية وكيفية صياغة القواعد المنظمة للعمليات المالية داخل المؤسسات.', 
      icon: <FileText className="w-8 h-8" />, 
      path: '/financial-regulations' 
    },
    { 
      title: 'طرق حساب المخزون', 
      desc: 'مقارنة بين طرق تقييم المخزون المختلفة مثل FIFO و LIFO والمتوسط المرجح وتأثير كل منها على القوائم.', 
      icon: <Package className="w-8 h-8" />, 
      path: '/inventory' 
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Banner Section */}
      <section className="relative h-[400px] md:h-[600px] w-full overflow-hidden">
        <img 
          src="https://lh3.googleusercontent.com/d/1WlIcRYhnRU8PeT4VN615H0ZOBEMdOKcs" 
          alt="مركز إيليجا للتدريب" 
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.src = "https://images.unsplash.com/photo-1454165833772-d99628a5ffa6?auto=format&fit=crop&q=80&w=1200";
          }}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"></div>
        
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl text-white space-y-6"
            >
              <h1 className="text-4xl md:text-6xl font-black leading-tight drop-shadow-lg">
                مركز إيليجا للتميز <br />
                <span className="text-blue-400">المحاسبي والمالي</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-100 font-medium max-w-xl leading-relaxed drop-shadow-md">
                نحول الأرقام إلى حقائق، والمعرفة إلى مهارة احترافية تفتح لك آفاق النجاح في سوق العمل.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hero Section - Clean & Educational */}
      <section className="relative py-20 lg:py-32 bg-white border-b border-slate-100 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-bold">
                <Shield className="w-4 h-4" />
                <span>مركز إيليجا للتدريب والاستشارات المالية</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.2]">
                دليلك المهني لاحتراف <br />
                <span className="text-blue-600">علوم المحاسبة والخدمات المالية</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
                نقدم بيئة تعليمية متكاملة تهدف إلى رفع كفاءة المحاسبين والمديرين الماليين من خلال محتوى علمي رصين وخدمات استشارية مبنية على أسس متينة.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="clean-card p-4 relative z-10 bg-slate-50/50">
                <img 
                  src="https://picsum.photos/seed/accounting-main/1200/800" 
                  alt="Accounting Education" 
                  className="rounded-xl shadow-sm w-full h-[400px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-600/5 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-slate-900/5 rounded-full blur-3xl"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats/Features Banner */}
      <section className="py-12 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'سنة من الخبرة', val: '15+', icon: <Clock /> },
              { label: 'برنامج تعليمي', val: '50+', icon: <BookOpen /> },
              { label: 'عميل مستفيد', val: '200+', icon: <Users /> },
              { label: 'شهادة معتمدة', val: '10+', icon: <Shield /> },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="text-blue-600 mb-1">{stat.icon}</div>
                <div className="text-3xl font-black text-slate-900">{stat.val}</div>
                <div className="text-sm font-medium text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Educational Sections */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-4">
              <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">استكشف المحتوى التعليمي</h2>
              <p className="text-slate-500 max-w-2xl">اختر القسم الذي ترغب في تعميق معرفتك به من خلال شروحاتنا المبسطة والمهنية.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainSections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  to={section.path}
                  className="clean-card group flex flex-col h-full hover:-translate-y-1"
                >
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    {section.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed flex-grow">
                    {section.desc}
                  </p>
                  <div className="mt-8 flex items-center gap-2 text-sm font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
                    <span>اقرأ المزيد</span>
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="inline-flex p-3 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
              {LOGO_URL && (
                 <img src={LOGO_URL} className="w-12 h-12 grayscale brightness-200" alt="Logo" referrerPolicy="no-referrer" />
              )}
            </div>
            <h2 className="text-3xl md:text-5xl font-black leading-tight">رؤيتنا في إرساء دعائم المعرفة المحاسبية</h2>
            <p className="text-xl text-slate-400 leading-[1.8] font-light">
              "نؤمن بأن المحاسبة هي لغة الأعمال التي يجب أن تُفهم بدقة من قبل الجميع. نهدف في إيليجا إلى تبسيط هذه اللغة المعقدة وتحويلها إلى أدوات عملية تدفع عجلة النجاح في المؤسسات."
            </p>
            <div className="pt-8 border-t border-white/10 flex flex-wrap justify-center gap-12">
              <div className="text-center">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">القيم الجوهرية</p>
                <div className="flex gap-4 font-bold text-sm">
                  <span>الدقة</span>
                  <span className="text-blue-500">•</span>
                  <span>الشفافية</span>
                  <span className="text-blue-500">•</span>
                  <span>الاحترافية</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Contextual Card */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-slate-900 border-r-4 border-blue-600 pr-6">التزامنا تجاه الجودة والمهنية</h2>
              <p className="text-slate-600 leading-relaxed">
                في إيليجا، لا نكتفي بتقديم المعلومات فحسب، بل نسعى لبناء شراكة معرفية مع عملائنا وطلابنا تضمن التطبيق الصحيح والفعال للمبادئ المحاسبية.
              </p>
              <div className="space-y-4">
                {[
                  'تحديث مستمر للمحتوى وفق آخر التعديلات في المعايير.',
                  'تركيز على الجانب العملي والتطبيقي للأرقام.',
                  'دعم فني واستشاري متواصل لكافة المستفيدين.'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-700 font-medium text-sm">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="clean-card bg-white space-y-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
                <h4 className="font-bold">استشارات نمو</h4>
                <p className="text-xs text-slate-500">مساعدة المؤسسات في تحديد مسارات النمو المالي الآمن.</p>
              </div>
              <div className="clean-card bg-white mt-8 space-y-4">
                <Shield className="w-8 h-8 text-blue-600" />
                <h4 className="font-bold">رقابة داخلية</h4>
                <p className="text-xs text-slate-500">تصميم وتدقيق أنظمة الرقابة لضمان نزاهة العمليات.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
