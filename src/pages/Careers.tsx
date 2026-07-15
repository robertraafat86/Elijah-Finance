import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { 
  Briefcase, 
  GraduationCap, 
  Search, 
  Filter, 
  UploadCloud, 
  X, 
  Check, 
  MapPin, 
  Calendar, 
  Clock, 
  DollarSign, 
  ChevronRight, 
  FileText, 
  AlertCircle,
  Building,
  User,
  Mail,
  Phone,
  Send,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { cn } from '../lib/utils';

// Interfaces
interface JobOpening {
  id: string;
  type: 'job' | 'internship';
  titleAr: string;
  titleEn: string;
  departmentAr: string;
  departmentEn: string;
  locationAr: string;
  locationEn: string;
  workModeAr: string;
  workModeEn: string;
  durationAr?: string; // e.g. "3 months" for internships
  durationEn?: string;
  experienceAr: string;
  experienceEn: string;
  salaryAr: string;
  salaryEn: string;
  descAr: string;
  descEn: string;
  requirementsAr: string[];
  requirementsEn: string[];
}

const CAREERS_DATA: JobOpening[] = [
  {
    id: 'job-sr-tax',
    type: 'job',
    titleAr: "أخصائي ضرائب أول",
    titleEn: "Senior Tax Associate",
    departmentAr: "إدارة الضرائب والمطابقة",
    departmentEn: "Taxation & Compliance Dept",
    locationAr: "القاهرة، مصر",
    locationEn: "Cairo, Egypt",
    workModeAr: "دوام كامل (هجين)",
    workModeEn: "Full-Time (Hybrid)",
    experienceAr: "4 - 6 سنوات خبرة",
    experienceEn: "4 - 6 years experience",
    salaryAr: "مجزية طبقاً للخبرة",
    salaryEn: "Competitive, based on experience",
    descAr: "نبحث عن محاسب ضرائب أول محترف للإشراف على إعداد الإقرارات الضريبية، ضريبة القيمة المضافة، وتقديم الاستشارات لشركائنا.",
    descEn: "We are seeking a senior tax accountant to supervise corporate tax files, VAT filings, and provide professional advisory to clients.",
    requirementsAr: [
      "بكالوريوس محاسبة أو تجارة (يفضل ماجستير أو زمالة مصرية للضرائب ESA)",
      "خبرة عميقة بقوانين الضرائب المصرية والمعايير الدولية (IFRS)",
      "مهارات تحليلية ممتازة والقدرة على التعامل مع الفحص الضريبي"
    ],
    requirementsEn: [
      "Bachelor's in Accounting or Finance (ESA or Tax Fellowship is a strong plus)",
      "Deep understanding of Egyptian Tax Laws and general IFRS frameworks",
      "Excellent analytical skills with proven experience handling tax audits"
    ]
  },
  {
    id: 'intern-audit',
    type: 'internship',
    titleAr: "تدريب مراجع حسابات مبتدئ (صيفي)",
    titleEn: "Junior Auditor Internship (Summer 2026)",
    departmentAr: "إدارة المراجعة والتدقيق القانوني",
    departmentEn: "External Audit & Assurance",
    locationAr: "القاهرة، مصر (ميداني)",
    locationEn: "Cairo, Egypt (On-site)",
    workModeAr: "تدريب كامل",
    workModeEn: "Full Internship",
    durationAr: "3 أشهر (براتب شهري)",
    durationEn: "3 Months (Paid)",
    experienceAr: "حديث تخرج أو طالب بالعام الأخير",
    experienceEn: "Fresh Graduate / Final Year Student",
    salaryAr: "مكافأة تدريبية ممتازة",
    salaryEn: "Paid stipend + Certificate",
    descAr: "فرصة تدريبية متميزة للانضمام لفرق المراجعة الميدانية للشركة، واكتساب مهارات تدقيق القوائم المالية والتحقق من الضوابط الداخلية.",
    descEn: "An immersive summer internship opportunity to work alongside core audit teams, verifying ledger entries and testing internal control policies.",
    requirementsAr: [
      "طالب في السنة الأخيرة أو خريج محاسبة بتقدير لا يقل عن جيد جداً",
      "معرفة ممتازة بمبادئ المحاسبة الأساسية والدورة الدفترية",
      "إجادة تامة للغة الإنجليزية وبرامج مايكروسوفت إكسل"
    ],
    requirementsEn: [
      "Undergraduate in final year or fresh accounting graduate with min. GPA 3.4/4.0",
      "Strong foundational grasp of general accounting entries and financial sheets",
      "Excellent command of English and practical Microsoft Excel formulas"
    ]
  },
  {
    id: 'job-cost-accountant',
    type: 'job',
    titleAr: "محاسب تكاليف وموازنات تقديرية",
    titleEn: "Cost & Budgeting Accountant",
    departmentAr: "المحاسبة الإدارية والتكاليف",
    departmentEn: "Management Accounting & Costing",
    locationAr: "الجيزة، مصر",
    locationEn: "Giza, Egypt",
    workModeAr: "دوام كامل",
    workModeEn: "Full-Time",
    experienceAr: "2 - 4 سنوات خبرة",
    experienceEn: "2 - 4 years experience",
    salaryAr: "رواتب ومميزات تنافسية",
    salaryEn: "Highly competitive package",
    descAr: "مسؤول عن تتبع تدفق تكاليف الإنتاج، حساب الانحرافات، وإعداد الموازنات التقديرية ومقارنتها بالأداء الفعلي للمصانع والعمليات.",
    descEn: "Responsible for tracking production pipeline costs, variance analysis, and compiling budgetary forecasts to benchmark actual operations.",
    requirementsAr: [
      "شهادة جامعية في المحاسبة (يفضل الحاصلين على شهادة CMA أو الساعين لها)",
      "خبرة سابقة في أنظمة التكاليف الصناعية أو محاسبة المقاولات",
      "قدرة عالية على إعداد تقارير الانحرافات والربحية التفصيلية"
    ],
    requirementsEn: [
      "University degree in Accounting (CMA candidate or holder is highly preferred)",
      "Prior exposure to industrial costing systems or construction project accounting",
      "Strong capabilities in variance reporting and project profit analysis"
    ]
  },
  {
    id: 'intern-financial-analyst',
    type: 'internship',
    titleAr: "تدريب التحليل المالي والاستشارات",
    titleEn: "Financial Advisory & Analyst Intern",
    departmentAr: "الاستشارات المالية ودراسات الجدوى",
    departmentEn: "Financial Advisory & Valuation",
    locationAr: "القاهرة، مصر",
    locationEn: "Cairo, Egypt",
    workModeAr: "تدريب (هجين)",
    workModeEn: "Internship (Hybrid)",
    durationAr: "6 أشهر (قابل للتعيين)",
    durationEn: "6 Months (Hire-track)",
    experienceAr: "حديث تخرج",
    experienceEn: "Recent Graduate",
    salaryAr: "مكافأة شهرية + بدل انتقال",
    salaryEn: "Stipend + Transportation allowance",
    descAr: "تدريب عملي على بناء النماذج المالية للتقييم، وإعداد دراسات الجدوى الاقتصادية للمشاريع، ومراجعة التدفقات النقدية الاستثمارية.",
    descEn: "Practical training in building valuation models, preparing economic feasibility studies, and auditing corporate investment runway forecasts.",
    requirementsAr: [
      "تخصص تمويل أو محاسبة من جامعة معتمدة بتقدير ممتاز",
      "شغف حقيقي بالتحليل المالي والاطلاع على أسواق المال والأسهم",
      "إتقان إكسل والقدرة على صياغة العروض التقديمية باحترافية"
    ],
    requirementsEn: [
      "Major in Finance or Accounting with outstanding academic records",
      "Demonstrated interest in corporate valuation, stock markets, and macro-economics",
      "Proficient with spreadsheet modeling and drafting investment slide decks"
    ]
  },
  {
    id: 'job-ifrs-specialist',
    type: 'job',
    titleAr: "أخصائي معايير التقارير المالية الدولية (IFRS)",
    titleEn: "IFRS Reporting Specialist",
    departmentAr: "التقارير المالية والالتزام",
    departmentEn: "Financial Reporting & Standards",
    locationAr: "القاهرة، مصر (هجين)",
    locationEn: "Cairo, Egypt (Hybrid)",
    workModeAr: "دوام كامل",
    workModeEn: "Full-Time (Hybrid)",
    experienceAr: "3 - 5 سنوات خبرة",
    experienceEn: "3 - 5 years experience",
    salaryAr: "مجزية ومميزات تأمين شامل",
    salaryEn: "Competitive with comprehensive insurance",
    descAr: "المساهمة في ملاءمة القوائم المالية لتتوافق مع معايير IFRS الحديثة وتعديلاتها، وتقديم الدعم الفني لشركائنا متعددي الجنسيات.",
    descEn: "Facilitating financial alignment under evolving IFRS regulations, drafting technical advisory briefs, and assisting multinational partners.",
    requirementsAr: [
      "الحصول على شهادة CertIFRS أو DipIFRS من جمعية ACCA البريطانية",
      "خبرة قوية في معايير العقارات وعقود الإيجار والأدوات المالية (IFRS 9, 15, 16)",
      "مهارات صياغة تقارير ممتازة باللغتين العربية والإنجليزية"
    ],
    requirementsEn: [
      "ACCA CertIFRS or DipIFRS qualification is mandatory",
      "Sound experience with modern lease, revenue, and asset standards (IFRS 9, 15, 16)",
      "Excellent bilingual report writing skills in English and Arabic"
    ]
  },
  {
    id: 'intern-tax-compliance',
    type: 'internship',
    titleAr: "تدريب محاسب ضرائب مبتدئ",
    titleEn: "Tax Compliance Intern",
    departmentAr: "إدارة الضرائب والمطابقة",
    departmentEn: "Taxation & Compliance Dept",
    locationAr: "الإسكندرية، مصر",
    locationEn: "Alexandria, Egypt",
    workModeAr: "دوام كامل (مكتبي)",
    workModeEn: "Full-time (On-site)",
    durationAr: "3 أشهر",
    durationEn: "3 Months",
    experienceAr: "طالب بالعام الأخير أو حديث تخرج",
    experienceEn: "Final Year Student / Fresh Graduate",
    salaryAr: "مكافأة شهرية مجزية",
    salaryEn: "Paid training stipend",
    descAr: "تعلم أسس تقديم الإقرارات الضريبية على المنظومة الإلكترونية المصرية للضرائب، والتحقق من الفواتير والخصم والإضافة.",
    descEn: "Learn the fundamentals of filing digital tax returns via Egypt's online unified tax portal, verifying corporate invoices and source deductions.",
    requirementsAr: [
      "طالب أو خريج كلية التجارة شعبة محاسبة",
      "رغبة قوية بالتخصص في مجال المحاسبة الضريبية ومتابعة القوانين المستجدة",
      "الدقة المتناهية والاهتمام بالتفاصيل الرقمية الصغيرة"
    ],
    requirementsEn: [
      "Undergraduate or graduate from Faculty of Commerce, Accounting major",
      "Eager to specialize in corporate taxation and track regulatory revisions",
      "High level of precision and extreme attention to computational details"
    ]
  }
];

export default function Careers() {
  const { i18n, t } = useTranslation();
  const isRtl = i18n.language === 'ar';

  // State Management
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'job' | 'internship'>('all');
  const [selectedDept, setSelectedDept] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  
  // Apply Modal state
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  
  // Application Form submission state
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantExperience, setApplicantExperience] = useState('0');
  const [coverLetter, setCoverLetter] = useState('');
  
  // File upload drag & drop states
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Spontaneous Application Form State
  const [isSpontaneousOpen, setIsSpontaneousOpen] = useState(false);
  const [spontaneousType, setSpontaneousType] = useState<'job' | 'internship'>('job');

  // Filter lists derived from data
  const departments = useMemo(() => {
    const set = new Set<string>();
    CAREERS_DATA.forEach(j => set.add(isRtl ? j.departmentAr : j.departmentEn));
    return Array.from(set);
  }, [isRtl]);

  const locations = useMemo(() => {
    const set = new Set<string>();
    CAREERS_DATA.forEach(j => set.add(isRtl ? j.locationAr : j.locationEn));
    return Array.from(set);
  }, [isRtl]);

  // Main filter function
  const filteredOpenings = useMemo(() => {
    return CAREERS_DATA.filter(j => {
      const title = isRtl ? j.titleAr : j.titleEn;
      const desc = isRtl ? j.descAr : j.descEn;
      const dept = isRtl ? j.departmentAr : j.departmentEn;
      const loc = isRtl ? j.locationAr : j.locationEn;
      const searchStr = `${title} ${desc} ${dept} ${loc}`.toLowerCase();

      const matchesSearch = searchStr.includes(searchQuery.toLowerCase());
      const matchesType = selectedType === 'all' || j.type === selectedType;
      const matchesDept = selectedDept === 'all' || dept === selectedDept;
      const matchesLocation = selectedLocation === 'all' || loc === selectedLocation;

      return matchesSearch && matchesType && matchesDept && matchesLocation;
    });
  }, [searchQuery, selectedType, selectedDept, selectedLocation, isRtl]);

  // File Upload Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setErrorMessage('');
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      validateAndSetFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      validateAndSetFile(file);
    }
  };

  const validateAndSetFile = (file: File) => {
    // Check file type: pdf, doc, docx
    const allowedExtensions = ['pdf', 'doc', 'docx'];
    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    if (!allowedExtensions.includes(extension)) {
      setErrorMessage(isRtl 
        ? "الملفات المسموح بها فقط هي: PDF, DOC, DOCX" 
        : "Only PDF, DOC, or DOCX documents are supported."
      );
      return;
    }

    // Check size limit (e.g. 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage(isRtl 
        ? "حجم الملف يتعدى الحد الأقصى المسموح (10 ميجابايت)" 
        : "File size exceeds the 10MB threshold."
      );
      return;
    }

    setCvFile(file);
  };

  const removeFile = () => {
    setCvFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Form Submission
  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!applicantName.trim()) {
      setErrorMessage(isRtl ? "يرجى إدخال الاسم بالكامل" : "Please enter your full name");
      return;
    }
    if (!applicantEmail.trim() || !applicantEmail.includes('@')) {
      setErrorMessage(isRtl ? "يرجى إدخال بريد إلكتروني صحيح" : "Please enter a valid email address");
      return;
    }
    if (!applicantPhone.trim()) {
      setErrorMessage(isRtl ? "يرجى إدخال رقم الهاتف" : "Please enter your phone number");
      return;
    }
    if (!cvFile) {
      setErrorMessage(isRtl ? "يرجى رفع ملف السيرة الذاتية (CV)" : "Please upload your resume (CV)");
      return;
    }

    setIsSubmitting(true);

    // Simulate Server-side storage/database upload
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Clear form states
      setApplicantName('');
      setApplicantEmail('');
      setApplicantPhone('');
      setApplicantExperience('0');
      setCoverLetter('');
      setCvFile(null);
    }, 1800);
  };

  const openApplyModal = (job: JobOpening) => {
    setSelectedJob(job);
    setIsSpontaneousOpen(false);
    setIsSuccess(false);
    setErrorMessage('');
  };

  const openSpontaneousModal = () => {
    setSelectedJob(null);
    setIsSpontaneousOpen(true);
    setIsSuccess(false);
    setErrorMessage('');
  };

  return (
    <div className="relative min-h-screen py-8">
      
      {/* 1. Header Splash Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 rounded-full text-xs font-black border border-indigo-100 dark:border-indigo-900/40 shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
            <span>{isRtl ? "انضم إلى نخبة خبراء المحاسبة" : "Shape the Future of Professional Finance"}</span>
          </motion.div>

          <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
            {isRtl ? (
              <>الفرص <span className="gradient-text">المهنية والتدريبية</span> المتاحة</>
            ) : (
              <>Build Your <span className="gradient-text">Accounting & Audit</span> Career</>
            )}
          </h1>

          <p className="text-[15px] md:text-[17px] leading-[1.7] text-slate-500 dark:text-neutral-400 font-medium">
            {isRtl ? (
              "انضم لمنظومة إيليجا المحاسبية والتعليمية. نقدم بيئة عمل هجينة مرنة، برامج تدريب صيفية متميزة، ومساراً مهنياً واضحاً ممهداً للتميز المحاسبي والمالي الدولي."
            ) : (
              "Discover fulfilling jobs and paid internships with Elijah Academy and advisory system. We cultivate dynamic working setups, regular technical training, and explicit routes toward international accreditation."
            )}
          </p>
        </div>
      </div>

      {/* 2. Interactive Search & Advanced Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-10">
        <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 p-5 rounded-3xl shadow-xl space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            
            {/* Search Input */}
            <div className="lg:col-span-4 relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
              <input 
                type="text" 
                placeholder={isRtl ? "ابحث عن وظائف، أقسام، أو مهارات مطلوبة..." : "Search positions, departments, skills..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-11 pl-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/30 transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Job vs Internship Type Tabs */}
            <div className="lg:col-span-3 flex bg-slate-50 dark:bg-slate-950 p-1 rounded-2xl border border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setSelectedType('all')}
                className={cn(
                  "flex-1 py-2 text-[11px] font-black rounded-xl transition-all cursor-pointer",
                  selectedType === 'all' 
                    ? "bg-white dark:bg-slate-850 text-indigo-600 dark:text-indigo-400 shadow-xs" 
                    : "text-slate-500 dark:text-neutral-400 hover:text-slate-700"
                )}
              >
                {isRtl ? "الكل" : "All Offers"}
              </button>
              <button
                onClick={() => setSelectedType('job')}
                className={cn(
                  "flex-1 py-2 text-[11px] font-black rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1",
                  selectedType === 'job' 
                    ? "bg-white dark:bg-slate-850 text-indigo-600 dark:text-indigo-400 shadow-xs" 
                    : "text-slate-500 dark:text-neutral-400 hover:text-slate-700"
                )}
              >
                <Briefcase className="w-3 h-3" />
                <span>{isRtl ? "الوظائف" : "Jobs"}</span>
              </button>
              <button
                onClick={() => setSelectedType('internship')}
                className={cn(
                  "flex-1 py-2 text-[11px] font-black rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1",
                  selectedType === 'internship' 
                    ? "bg-white dark:bg-slate-850 text-indigo-600 dark:text-indigo-400 shadow-xs" 
                    : "text-slate-500 dark:text-neutral-400 hover:text-slate-700"
                )}
              >
                <GraduationCap className="w-3 h-3" />
                <span>{isRtl ? "التدريب" : "Internships"}</span>
              </button>
            </div>

            {/* Department Filter */}
            <div className="lg:col-span-2.5">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-neutral-300 focus:outline-hidden"
              >
                <option value="all">{isRtl ? "جميع التخصصات والأقسام" : "All Departments"}</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div className="lg:col-span-2.5">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-neutral-300 focus:outline-hidden"
              >
                <option value="all">{isRtl ? "جميع مواقع العمل" : "All Locations"}</option>
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Spontaneous spontaneous CV uploader quick bar banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-linear-to-r from-indigo-500/10 to-indigo-600/5 dark:from-indigo-950/20 p-4 rounded-2xl border border-indigo-100/60 dark:border-indigo-950/60">
            <div className="flex items-start gap-2 text-xs font-bold text-slate-700 dark:text-neutral-300">
              <UploadCloud className="w-5 h-5 text-indigo-500 flex-shrink-0 animate-bounce" />
              <div>
                <p className="font-black text-slate-900 dark:text-white">
                  {isRtl ? "هل تبحث عن فرصة مخصصة أو غير مدرجة بالجدول؟" : "Don't see an exact matching position?"}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-neutral-400 font-semibold mt-0.5">
                  {isRtl 
                    ? "أرسل سيرتك الذاتية وتخصصك المفضل وسنقوم بالتواصل معك فور فتح باب التقدم المناسب." 
                    : "Submit your spontaneous application in our general database for future consideration."}
                </p>
              </div>
            </div>
            <button
              onClick={openSpontaneousModal}
              className="sm:self-center px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black shadow-xs cursor-pointer flex items-center justify-center gap-1.5 transition-all border-none"
            >
              <span>{isRtl ? "إرسال عام للسيرة الذاتية" : "Submit Spontaneous CV"}</span>
              <ArrowRight className={cn("w-3.5 h-3.5", isRtl ? "rotate-180" : "")} />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Grid representation of jobs & internships */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AnimatePresence mode="popLayout">
          {filteredOpenings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOpenings.map(j => (
                <motion.div
                  layout
                  key={j.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 rounded-3xl overflow-hidden shadow-xs hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-900/60 transition-all flex flex-col justify-between"
                >
                  
                  {/* Decorative card indicator */}
                  <div className={cn(
                    "h-1.5 w-full",
                    j.type === 'job' ? "bg-indigo-600" : "bg-emerald-500"
                  )} />

                  <div className="p-6 flex-1 space-y-4">
                    {/* Tags row */}
                    <div className="flex items-center justify-between">
                      <span className={cn(
                        "text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md",
                        j.type === 'job' 
                          ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400" 
                          : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                      )}>
                        {j.type === 'job' 
                          ? (isRtl ? "وظيفة مهنية" : "Career Job") 
                          : (isRtl ? "برنامج تدريبي" : "Internship")}
                      </span>

                      <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 dark:text-neutral-400">
                        <Building className="w-3.5 h-3.5 text-slate-400" />
                        <span>{isRtl ? j.departmentAr : j.departmentEn}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <div className="space-y-1.5">
                      <h3 className="font-black text-base text-slate-900 dark:text-white leading-tight">
                        {isRtl ? j.titleAr : j.titleEn}
                      </h3>
                      <p className="text-[11px] leading-[1.6] text-slate-500 dark:text-neutral-400 font-medium">
                        {isRtl ? j.descAr : j.descEn}
                      </p>
                    </div>

                    {/* Core details list */}
                    <div className="grid grid-cols-2 gap-3 pt-2 text-[10px] font-bold text-slate-600 dark:text-neutral-300">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span>{isRtl ? j.locationAr : j.locationEn}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span>{isRtl ? j.workModeAr : j.workModeEn}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span>{isRtl ? (j.durationAr || j.experienceAr) : (j.durationEn || j.experienceEn)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        <span className="text-emerald-600 dark:text-emerald-400">{isRtl ? j.salaryAr : j.salaryEn}</span>
                      </div>
                    </div>

                    {/* Quick highlights requirements summary */}
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-850 space-y-1.5">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">
                        {isRtl ? "أبرز المتطلبات والمؤهلات:" : "Core Qualifications Required:"}
                      </p>
                      <ul className="space-y-1 text-[10px] font-semibold text-slate-600 dark:text-neutral-400 list-inside list-disc">
                        {(isRtl ? j.requirementsAr : j.requirementsEn).slice(0, 2).map((req, idx) => (
                          <li key={idx} className="truncate">{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Apply actions bar */}
                  <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-950/20 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                      <span>{isRtl ? "فرصة نشطة حالياً" : "Actively Hiring"}</span>
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                    </span>

                    <button
                      onClick={() => openApplyModal(j)}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black shadow-xs cursor-pointer flex items-center gap-1 transition-colors border-none"
                    >
                      <span>{isRtl ? "قدم الآن" : "Apply Now"}</span>
                      <ChevronRight className={cn("w-4 h-4", isRtl ? "rotate-180" : "")} />
                    </button>
                  </div>

                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl"
            >
              <AlertCircle className="w-12 h-12 text-slate-300 dark:text-neutral-600 mx-auto mb-4 animate-pulse" />
              <p className="text-sm font-black text-slate-800 dark:text-neutral-300">
                {isRtl ? "عذراً، لم نعثر على نتائج موازية لمعايير البحث الحالية." : "Apologies, no careers match the active criteria."}
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedType('all'); setSelectedDept('all'); setSelectedLocation('all'); }}
                className="mt-4 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black border-none cursor-pointer"
              >
                {isRtl ? "إعادة ضبط البحث" : "Reset Job Search"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. MODAL: CV UPLOADER AND JOB APPLICATION FORM */}
      <AnimatePresence>
        {(selectedJob || isSpontaneousOpen) && (
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] w-full max-w-2xl max-h-[92vh] overflow-hidden shadow-2xl flex flex-col"
            >
              
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-100 dark:border-slate-850 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/20">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-xl">
                    <FileText className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm md:text-base text-slate-900 dark:text-white leading-tight">
                      {isSpontaneousOpen ? (
                        isRtl ? "طلب تقديم عام ومفتوح" : "General Spontaneous Application"
                      ) : (
                        isRtl ? `طلب تقدم لـ: ${selectedJob?.titleAr}` : `Application for: ${selectedJob?.titleEn}`
                      )}
                    </h3>
                    <p className="text-[10px] text-slate-500 dark:text-neutral-400 font-bold">
                      {isSpontaneousOpen ? (
                        isRtl ? "أرسل ملف السيرة الذاتية لنوظفه في المشاريع القادمة" : "Upload credentials to our potential hires bank"
                      ) : (
                        isRtl ? `${selectedJob?.departmentAr} • ${selectedJob?.locationAr}` : `${selectedJob?.departmentEn} • ${selectedJob?.locationEn}`
                      )}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => { setSelectedJob(null); setIsSpontaneousOpen(false); }}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer border border-slate-200 dark:border-slate-850"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              {/* Modal Content Scrollable Form */}
              <div className="flex-1 p-6 md:p-8 overflow-y-auto">
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-10 space-y-4"
                    >
                      <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-150 dark:border-emerald-900/40 rounded-full flex items-center justify-center mx-auto text-emerald-500">
                        <Check className="w-8 h-8" />
                      </div>
                      <h4 className="text-lg font-black text-slate-900 dark:text-white">
                        {isRtl ? "تم إرسال طلبك بنجاح!" : "Application Submitted Successfully!"}
                      </h4>
                      <p className="text-xs leading-[1.6] text-slate-500 dark:text-neutral-400 font-medium max-w-md mx-auto">
                        {isRtl 
                          ? "شكراً لاهتمامك بالانضمام لمنظومة إيليجا. قام خبراؤنا بالقسم المالي والمراجعة بجدولة طلبك لمراجعته الفنية، وسنتواصل معك قريباً عبر البريد الإلكتروني." 
                          : "Thank you for showing interest in Elijah Accounting Hub. Our recruitment panel will verify your experience against our IFRS/Audit checklist and contact you shortly."}
                      </p>
                      
                      <button
                        onClick={() => { setSelectedJob(null); setIsSpontaneousOpen(false); }}
                        className="mt-6 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black cursor-pointer border-none"
                      >
                        {isRtl ? "إغلاق النافذة" : "Close Window"}
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmitApplication}
                      className="space-y-5"
                    >
                      {/* Name Input */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-black text-slate-700 dark:text-neutral-300 uppercase tracking-wider block">
                          {isRtl ? "الاسم الكامل باللغة العربية أو الإنجليزية *" : "Full Name *"}
                        </label>
                        <div className="relative">
                          <User className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input 
                            type="text"
                            required
                            placeholder={isRtl ? "اكتب اسمك الثلاثي..." : "Enter your full name..."}
                            value={applicantName}
                            onChange={(e) => setApplicantName(e.target.value)}
                            className="w-full pr-11 pl-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-100 placeholder-slate-400 focus:outline-hidden"
                          />
                        </div>
                      </div>

                      {/* Email & Phone side-by-side */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-black text-slate-700 dark:text-neutral-300 uppercase tracking-wider block">
                            {isRtl ? "البريد الإلكتروني المهني *" : "Professional Email *"}
                          </label>
                          <div className="relative">
                            <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input 
                              type="email"
                              required
                              placeholder="name@example.com"
                              value={applicantEmail}
                              onChange={(e) => setApplicantEmail(e.target.value)}
                              className="w-full pr-11 pl-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-100 placeholder-slate-400 focus:outline-hidden"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[11px] font-black text-slate-700 dark:text-neutral-300 uppercase tracking-wider block">
                            {isRtl ? "رقم الهاتف المحمول (واتساب) *" : "Phone Number (WhatsApp) *"}
                          </label>
                          <div className="relative">
                            <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input 
                              type="tel"
                              required
                              placeholder="+20 100 000 0000"
                              value={applicantPhone}
                              onChange={(e) => setApplicantPhone(e.target.value)}
                              className="w-full pr-11 pl-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-100 placeholder-slate-400 focus:outline-hidden"
                            />
                          </div>
                        </div>
                      </div>

                      {/* If Spontaneous: Choice of interest type */}
                      {isSpontaneousOpen && (
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-black text-slate-700 dark:text-neutral-300 uppercase tracking-wider block">
                            {isRtl ? "ما هو نوع الفرصة المفضلة لديك؟ *" : "What is your preferred track? *"}
                          </label>
                          <div className="flex bg-slate-50 dark:bg-slate-950 p-1 rounded-2xl border border-slate-200 dark:border-slate-800">
                            <button
                              type="button"
                              onClick={() => setSpontaneousType('job')}
                              className={cn(
                                "flex-1 py-2 text-[11px] font-black rounded-xl transition-all cursor-pointer",
                                spontaneousType === 'job' 
                                  ? "bg-white dark:bg-slate-850 text-indigo-600 dark:text-indigo-400 shadow-xs" 
                                  : "text-slate-500 dark:text-neutral-400 hover:text-slate-700"
                              )}
                            >
                              {isRtl ? "وظيفة بدوام كامل" : "Full-Time Career"}
                            </button>
                            <button
                              type="button"
                              onClick={() => setSpontaneousType('internship')}
                              className={cn(
                                "flex-1 py-2 text-[11px] font-black rounded-xl transition-all cursor-pointer",
                                spontaneousType === 'internship' 
                                  ? "bg-white dark:bg-slate-850 text-indigo-600 dark:text-indigo-400 shadow-xs" 
                                  : "text-slate-500 dark:text-neutral-400 hover:text-slate-700"
                              )}
                            >
                              {isRtl ? "تدريب صيفي أو مهني" : "Paid Internship / Summer Program"}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Experience and Accreditation details */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-black text-slate-700 dark:text-neutral-300 uppercase tracking-wider block">
                          {isRtl ? "عدد سنوات الخبرة العملية في المحاسبة *" : "Years of Accounting/Finance Experience *"}
                        </label>
                        <select
                          value={applicantExperience}
                          onChange={(e) => setApplicantExperience(e.target.value)}
                          className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-neutral-300 focus:outline-hidden"
                        >
                          <option value="0">{isRtl ? "طالب أو حديث تخرج بدون خبرة" : "Undergraduate or Fresh Graduate"}</option>
                          <option value="1">{isRtl ? "سنة واحدة" : "1 Year"}</option>
                          <option value="2">{isRtl ? "سنتان" : "2 Years"}</option>
                          <option value="3-5">{isRtl ? "3 - 5 سنوات" : "3 - 5 Years"}</option>
                          <option value="6+">{isRtl ? "أكثر من 5 سنوات" : "More than 5 Years"}</option>
                        </select>
                      </div>

                      {/* DRAG AND DROP CV UPLOAD BOX */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-black text-slate-700 dark:text-neutral-300 uppercase tracking-wider block">
                          {isRtl ? "السيرة الذاتية المعتمدة (CV) *" : "Certified Resume / CV *"}
                        </label>
                        
                        <div
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          onClick={() => fileInputRef.current?.click()}
                          className={cn(
                            "border-2 border-dashed rounded-3xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-2",
                            isDragging 
                              ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20" 
                              : cvFile 
                                ? "border-emerald-500 bg-emerald-50/10 dark:bg-emerald-950/10" 
                                : "border-slate-200 dark:border-slate-800 hover:border-indigo-400 bg-slate-50/50 dark:bg-slate-950/20"
                          )}
                        >
                          <input 
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                          />

                          {cvFile ? (
                            <>
                              <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 rounded-2xl flex items-center justify-center">
                                <Check className="w-6 h-6 animate-pulse" />
                              </div>
                              <p className="text-xs font-black text-slate-950 dark:text-white select-all">
                                {cvFile.name}
                              </p>
                              <p className="text-[10px] text-slate-400 dark:text-neutral-500 font-bold">
                                {(cvFile.size / (1024 * 1024)).toFixed(2)} MB • {isRtl ? "جاهز للإرسال" : "Ready for transmission"}
                              </p>
                              <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); removeFile(); }}
                                className="px-3 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-[9px] font-black border-none cursor-pointer mt-2"
                              >
                                {isRtl ? "حذف الملف" : "Remove File"}
                              </button>
                            </>
                          ) : (
                            <>
                              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 rounded-2xl flex items-center justify-center">
                                <UploadCloud className="w-6 h-6" />
                              </div>
                              <p className="text-xs font-black text-slate-800 dark:text-neutral-200">
                                {isRtl ? "اسحب وأفلت السيرة الذاتية هنا" : "Drag and drop your CV file here"}
                              </p>
                              <p className="text-[10px] text-slate-400 dark:text-neutral-500 font-bold">
                                {isRtl ? "أو انقر لتصفح الملفات من جهازك (PDF, DOC, DOCX • بحد أقصى 10 ميجا)" : "Or click to upload from computer (PDF, DOC, DOCX up to 10MB)"}
                              </p>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Cover letter / Pitch */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-black text-slate-700 dark:text-neutral-300 uppercase tracking-wider block">
                          {isRtl ? "لماذا ترغب بالانضمام لإيليجا؟ (اختياري)" : "Why do you want to join Elijah? (Optional)"}
                        </label>
                        <textarea
                          rows={3}
                          placeholder={isRtl ? "اكتب نبذة مختصرة عن شغفك، مؤهلاتك، أو تطلعاتك التدريبية..." : "Briefly express your passion, unique technical skills, or career aspirations..."}
                          value={coverLetter}
                          onChange={(e) => setCoverLetter(e.target.value)}
                          className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-100 placeholder-slate-400 focus:outline-hidden"
                        />
                      </div>

                      {/* Error Banner */}
                      {errorMessage && (
                        <div className="p-3 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/40 rounded-xl flex items-center gap-2 text-[11px] font-bold">
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          <span>{errorMessage}</span>
                        </div>
                      )}

                      {/* Submit action */}
                      <div className="pt-4 flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => { setSelectedJob(null); setIsSpontaneousOpen(false); }}
                          className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-neutral-300 hover:bg-slate-200 rounded-xl text-xs font-black cursor-pointer border-none"
                        >
                          {isRtl ? "إلغاء" : "Cancel"}
                        </button>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black cursor-pointer shadow-xs border-none flex items-center gap-1.5"
                        >
                          {isSubmitting ? (
                            <>
                              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>{isRtl ? "جاري الإرسال..." : "Submitting..."}</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5" />
                              <span>{isRtl ? "إرسال طلب التقدم" : "Submit Application"}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
