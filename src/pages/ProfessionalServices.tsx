import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { 
  FileSpreadsheet, 
  ShieldCheck, 
  Receipt, 
  Users, 
  Settings, 
  HelpCircle,
  CheckCircle,
  MessageSquare,
  X,
  Send,
  Phone,
  Check
} from 'lucide-react';
import { cn } from '../lib/utils';

interface ServiceItem {
  id: string;
  icon: React.ReactNode;
  bgGrad: string;
  iconColor: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  benefitsAr: string[];
  benefitsEn: string[];
  imageUrl: string;
  waTextAr: string;
  waTextEn: string;
}

export default function ProfessionalServices() {
  const { i18n, t } = useTranslation();
  const isRtl = i18n.language === 'ar';
  
  // State for request service modal
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientNotes, setClientNotes] = useState('');

  const servicesData: ServiceItem[] = [
    {
      id: 'financial_statements',
      icon: <FileSpreadsheet className="w-6 h-6" />,
      bgGrad: "from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20",
      iconColor: "text-blue-600 dark:text-blue-400",
      titleAr: "إعداد القوائم المالية",
      titleEn: "Financial Statements",
      descAr: "إعداد وتجهيز الميزانيات العمومية، قوائم الدخل، التدفقات النقدية، والتغير في حقوق الملكية بدقة عالية وفقاً لمعايير المحاسبة.",
      descEn: "Preparing balance sheets, income statements, cash flows, and changes in equity with precision according to standards.",
      benefitsAr: [
        "دقة متناهية متوافقة تماماً مع معايير المحاسبة المعتمدة",
        "وضوح كامل للرؤية والمركز المالي الفعلي للشركة",
        "تسهيل الحصول على تمويلات بنكية أو جذب مستثمرين جدد"
      ],
      benefitsEn: [
        "Absolute accuracy fully compliant with accounting standards",
        "Complete clarity of the company's real financial status",
        "Facilitating bank funding acquisition and attracting investors"
      ],
      imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
      waTextAr: "مرحباً، أود الاستفسار عن خدمة إعداد القوائم المالية لشركتي.",
      waTextEn: "Hello, I would like to inquire about your Financial Statements service for my company."
    },
    {
      id: 'internal_audit',
      icon: <ShieldCheck className="w-6 h-6" />,
      bgGrad: "from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      titleAr: "المراجعة الداخلية",
      titleEn: "Internal Audit",
      descAr: "تقييم أنظمة الرقابة الداخلية وإدارة المخاطر للتأكد من كفاءة العمليات وحماية الأصول من التلاعب والأخطاء.",
      descEn: "Evaluating internal control systems and risk management to ensure operational efficiency and safeguard company assets.",
      benefitsAr: [
        "كشف نقاط الضعف التشغيلية في هيكل الرقابة ومعالجتها",
        "الحد بشكل جذري من مخاطر التلاعب والأخطاء البشرية",
        "تحسين بيئة الرقابة ونظم الضبط والربط الداخلي للمؤسسة"
      ],
      benefitsEn: [
        "Detecting and remediating operational weaknesses in control systems",
        "Drastically reducing risks of fraud and human errors",
        "Improving control environment and internal check systems"
      ],
      imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80",
      waTextAr: "مرحباً، أود طلب استشارة بخصوص خدمات المراجعة والتدقيق الداخلي.",
      waTextEn: "Hello, I would like to request an Internal Audit consultation."
    },
    {
      id: 'tax_services',
      icon: <Receipt className="w-6 h-6" />,
      bgGrad: "from-rose-500/10 to-red-500/10 dark:from-rose-500/20 dark:to-red-500/20",
      iconColor: "text-rose-600 dark:text-rose-400",
      titleAr: "الخدمات الضريبية",
      titleEn: "Tax Services",
      descAr: "تقديم وتجهيز كافة الإقرارات الضريبية، ضريبة كسب العمل والقيمة المضافة، وضمان الامتثال التام مع تجنب الغرامات.",
      descEn: "Preparing and filing all tax returns, payroll taxes, VAT, and ensuring total compliance while avoiding penalties.",
      benefitsAr: [
        "الامتثال الضريبي القانوني الكامل وتفادي الغرامات المالية",
        "تخطيط ضريبي ذكي وقانوني لتحسين التكاليف التشغيلية",
        "تمثيل مهني وحماية متكاملة أمام اللجان ومصلحة الضرائب"
      ],
      benefitsEn: [
        "Full legal tax compliance and penalty avoidance",
        "Smart legal tax planning to optimize operational costs",
        "Professional representation and protection before tax authorities"
      ],
      imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80",
      waTextAr: "مرحباً، أود المساعدة في الخدمات الضريبية وإعداد الإقرارات لشركتنا.",
      waTextEn: "Hello, I would like help with Tax Services and preparing our returns."
    },
    {
      id: 'payroll',
      icon: <Users className="w-6 h-6" />,
      bgGrad: "from-violet-500/10 to-purple-500/10 dark:from-violet-500/20 dark:to-purple-500/20",
      iconColor: "text-violet-600 dark:text-violet-400",
      titleAr: "إعداد الرواتب",
      titleEn: "Payroll",
      descAr: "احتساب الأجور والرواتب الشهرية، الاستقطاعات، التأمينات الاجتماعية والضرائب المستقطعة بدقة وسرعة متناهية.",
      descEn: "Precise calculation of monthly wages, payroll taxes, social insurance, and deductions with absolute accuracy and speed.",
      benefitsAr: [
        "احتساب دقيق للأجور الأساسية والإضافية والتأمينات",
        "توفير الوقت والجهد الإداري والحد من أخطاء الاحتساب",
        "ضمان السرية والخصوصية التامة لبيانات وجداول رواتب الموظفين"
      ],
      benefitsEn: [
        "Precise calculation of basic and overtime wages and insurance",
        "Saving administrative time and effort while eliminating calculation errors",
        "Ensuring complete confidentiality and privacy of employee payroll data"
      ],
      imageUrl: "https://images.unsplash.com/photo-1508385082359-f38ae991e8f2?auto=format&fit=crop&w=600&q=80",
      waTextAr: "مرحباً، أود الاستفسار عن تفاصيل خدمة إعداد وإدارة الرواتب للموظفين.",
      waTextEn: "Hello, I would like to inquire about employee Payroll services."
    },
    {
      id: 'accounting_systems',
      icon: <Settings className="w-6 h-6" />,
      bgGrad: "from-cyan-500/10 to-sky-500/10 dark:from-cyan-500/20 dark:to-sky-500/20",
      iconColor: "text-cyan-600 dark:text-cyan-400",
      titleAr: "الأنظمة المحاسبية",
      titleEn: "Accounting Systems",
      descAr: "تأسيس وهيكلة دليل الحسابات والدورة المستندية الرقمية لتناسب طبيعة وحجم نشاط شركتك لضمان تدفق البيانات بسلاسة.",
      descEn: "Structuring the chart of accounts and digital document workflows tailored to your business scale for seamless data flow.",
      benefitsAr: [
        "تأسيس دورة مستندية ورقمية محكمة ومنظمة بالكامل",
        "بناء دليل حسابات مرن وقابل للتطوير مع نمو النشاط",
        "توفير تقارير وتحليلات فورية ودقيقة لمتخذي القرار"
      ],
      benefitsEn: [
        "Establishing a tight, organized manual and digital document cycle",
        "Structuring a flexible chart of accounts scalable with business growth",
        "Providing instant, accurate reports and analytics for decision makers"
      ],
      imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=600&q=80",
      waTextAr: "مرحباً، أود الاستعانة بخبرتكم في تصميم وتأسيس نظام محاسبي لشركتنا.",
      waTextEn: "Hello, I am interested in designing and establishing an Accounting System for our firm."
    },
    {
      id: 'financial_consulting',
      icon: <HelpCircle className="w-6 h-6" />,
      bgGrad: "from-fuchsia-500/10 to-pink-500/10 dark:from-fuchsia-500/20 dark:to-pink-500/20",
      iconColor: "text-fuchsia-600 dark:text-fuchsia-400",
      titleAr: "الاستشارات المالية",
      titleEn: "Financial Consulting",
      descAr: "تقديم تحليلات مالية متطورة، دراسات جدوى، ودعم اتخاذ القرارات الاستراتيجية لتعزيز ربحية أعمالكم واستقرارها.",
      descEn: "Providing advanced financial analysis, feasibility studies, and strategic decision support to boost profitability and business stability.",
      benefitsAr: [
        "دراسات جدوى اقتصادية تفصيلية وموثوقة للمشاريع الجديدة",
        "تحليل دقيق للانحرافات والتكاليف لتعظيم الهوامش الربحية",
        "استشارات استراتيجية مدروسة للتوسع والنمو المستمر في السوق"
      ],
      benefitsEn: [
        "Detailed and reliable economic feasibility studies for new projects",
        "In-depth cost and variance analysis to maximize profit margins",
        "Well-thought-out strategic consulting for expansion and market growth"
      ],
      imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=600&q=80",
      waTextAr: "مرحباً، أريد حجز موعد لاستشارة مالية متخصصة لتحسين ربحية وكفاءة مشروعي.",
      waTextEn: "Hello, I would like to book a professional Financial Consulting session to optimize my project."
    }
  ];

  const handleRequestServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) return;

    // Simulate request recording
    setFormSubmitted(true);
    setTimeout(() => {
      // Auto close modal
      setSelectedService(null);
      setFormSubmitted(false);
      setClientName('');
      setClientPhone('');
      setClientNotes('');
    }, 3000);
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6">
      
      {/* Header section with dynamic breadcrumb badge */}
      <div className="mb-12 text-center max-w-3xl mx-auto space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-full text-xs font-black border border-blue-100 dark:border-blue-900/40 shadow-xs"
        >
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <span>{isRtl ? "خدماتنا المهنية المعتمدة" : "Our Certified Professional Services"}</span>
        </motion.div>
        
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
          {isRtl ? (
            <>الخدمات المحاسبية <span className="gradient-text">المهنية المتخصصة</span></>
          ) : (
            <>Professional <span className="gradient-text">Accounting Services</span></>
          )}
        </h1>
        
        <p className="text-[15px] md:text-[17px] leading-[1.7] text-slate-500 dark:text-neutral-400 font-medium">
          {isRtl ? (
            "نقدم باقة من الخدمات المالية والمحاسبية المتكاملة المصممة خصيصاً لتلبية احتياجات أعمالكم ومطابقتها للمعايير والأنظمة."
          ) : (
            "We offer a complete suite of professional financial and accounting services tailored specifically to empower your business compliance and growth."
          )}
        </p>
      </div>

      {/* Grid of the 6 Professional Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesData.map((service, index) => {
          const serviceTitle = isRtl ? service.titleAr : service.titleEn;
          const serviceDesc = isRtl ? service.descAr : service.descEn;
          const serviceBenefits = isRtl ? service.benefitsAr : service.benefitsEn;
          const waMessage = isRtl ? service.waTextAr : service.waTextEn;

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800/80 shadow-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden relative group"
            >
              {/* Card Image */}
              <div className="h-52 w-full overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent z-10" />
                <img 
                  src={service.imageUrl} 
                  alt={serviceTitle}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                
                {/* Float Icon Badge */}
                <div className="absolute bottom-4 right-4 z-20 flex items-center gap-3">
                  <div className={cn("p-3 rounded-xl shrink-0 bg-white/95 dark:bg-slate-900/95 shadow-md", service.iconColor)}>
                    {service.icon}
                  </div>
                </div>
              </div>
              
              {/* Service content */}
              <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-black text-slate-800 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {serviceTitle}
                  </h3>
                  <p className="text-[14px] md:text-[15px] leading-[1.6] text-slate-500 dark:text-neutral-400 font-medium">
                    {serviceDesc}
                  </p>

                  {/* Benefits bullet list */}
                  <div className="pt-2 space-y-2.5">
                    <p className="text-xs font-black text-slate-400 dark:text-neutral-500 uppercase tracking-wider">
                      {isRtl ? "المزايا والفوائد الرئيسية:" : "Key Benefits & Features:"}
                    </p>
                    <ul className="space-y-2">
                      {serviceBenefits.map((benefit, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2 text-xs md:text-sm text-slate-600 dark:text-neutral-300 font-semibold leading-relaxed">
                          <span className="p-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="px-8 pb-8 pt-4 flex flex-col gap-3 shrink-0 border-t border-slate-50 dark:border-slate-800/40 bg-slate-50/30 dark:bg-slate-900/10">
                {/* 1. Request Service Modal trigger */}
                <button
                  onClick={() => setSelectedService(service)}
                  className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-black py-3.5 px-5 rounded-2xl text-[14px] transition-all duration-200 active:scale-95 shadow-lg shadow-blue-500/10 flex items-center justify-center gap-2 cursor-pointer border-none"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>{isRtl ? "اطلب الخدمة الآن" : "Request Service"}</span>
                </button>

                {/* 2. Direct WhatsApp query */}
                <a
                  href={`https://wa.me/201208538580?text=${encodeURIComponent(waMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-black py-3.5 px-5 rounded-2xl text-[14px] transition-all duration-200 active:scale-95 shadow-md shadow-emerald-500/10 flex items-center justify-center gap-2 cursor-pointer no-underline"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{isRtl ? "تواصل عبر واتساب" : "Contact on WhatsApp"}</span>
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Interactive Service Request Drawer / Modal Overlay */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop filter blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />

            {/* Modal Body Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl p-8 overflow-hidden z-10"
            >
              {/* Top Accent line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-600" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-6 left-6 md:left-auto md:right-6 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer border-none bg-transparent"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-black tracking-widest text-blue-600 dark:text-blue-400 uppercase">
                    {isRtl ? "طلب حجز الخدمة" : "Service Booking Request"}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                    {isRtl ? selectedService.titleAr : selectedService.titleEn}
                  </h3>
                </div>

                {formSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-12 text-center space-y-4"
                  >
                    <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto text-2xl font-black shadow-inner">
                      ✓
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                        {isRtl ? "تم إرسال طلبكم بنجاح!" : "Request Sent Successfully!"}
                      </h4>
                      <p className="text-sm text-slate-500 dark:text-neutral-400 font-medium">
                        {isRtl 
                          ? "شكراً لاهتمامكم. سنقوم بالرد والتواصل معكم في أقرب وقت لتنسيق تفاصيل الخدمة." 
                          : "Thank you for your interest. We will review your request and get back to you shortly."}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleRequestServiceSubmit} className="space-y-4">
                    {/* Client Name Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-600 dark:text-neutral-300">
                        {isRtl ? "الاسم الكامل *" : "Full Name *"}
                      </label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder={isRtl ? "مثال: أستاذ روبير رأفت" : "e.g., Robert Raafat"}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 text-slate-900 dark:text-neutral-100 transition-colors"
                      />
                    </div>

                    {/* Client Phone Number Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-600 dark:text-neutral-300">
                        {isRtl ? "رقم الهاتف / الواتساب *" : "Phone / WhatsApp Number *"}
                      </label>
                      <input
                        type="tel"
                        required
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder={isRtl ? "مثال: 01208538580" : "e.g., +20 1208538580"}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 text-slate-900 dark:text-neutral-100 transition-colors"
                      />
                    </div>

                    {/* Client Notes / Requirements Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-600 dark:text-neutral-300">
                        {isRtl ? "ملاحظات أو تفاصيل إضافية" : "Additional details / Notes"}
                      </label>
                      <textarea
                        rows={3}
                        value={clientNotes}
                        onChange={(e) => setClientNotes(e.target.value)}
                        placeholder={isRtl ? "اكتب هنا أي تفاصيل أو متطلبات خاصة بشركتك..." : "Write any details or custom requirements here..."}
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 text-slate-900 dark:text-neutral-100 transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      {/* Submit request button */}
                      <button
                        type="submit"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-black py-3.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer border-none"
                      >
                        <Send className="w-4 h-4" />
                        <span>{isRtl ? "إرسال طلب الحجز" : "Send Request"}</span>
                      </button>

                      {/* Instant WhatsApp fallback */}
                      <a
                        href={`https://wa.me/201208538580?text=${encodeURIComponent(
                          isRtl 
                            ? `مرحباً، أود حجز خدمة "${selectedService.titleAr}" باسم: ${clientName || 'غير محدد'} وهاتف: ${clientPhone || 'غير محدد'}. ${clientNotes ? `ملاحظات: ${clientNotes}` : ''}`
                            : `Hello, I would like to book "${selectedService.titleEn}" service for: ${clientName || 'N/A'} and phone: ${clientPhone || 'N/A'}. ${clientNotes ? `Details: ${clientNotes}` : ''}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3.5 px-6 rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer no-underline"
                      >
                        <Phone className="w-4 h-4" />
                        <span>{isRtl ? "واتساب مباشر" : "Direct WhatsApp"}</span>
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
