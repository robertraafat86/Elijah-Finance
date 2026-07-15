import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import {
  BookOpen,
  GraduationCap,
  Play,
  CheckCircle,
  Award,
  Trophy,
  Clock,
  User,
  Plus,
  Search,
  Video,
  Bookmark,
  ClipboardCheck,
  Users,
  TrendingUp,
  BarChart,
  Percent,
  ChevronRight,
  Download,
  ChevronLeft,
  HelpCircle,
  Briefcase,
  Volume2,
  Trash2,
  FileSpreadsheet,
  X
} from 'lucide-react';
import { cn } from '../lib/utils';

// Types for the Academy
interface Lesson {
  id: string;
  titleAr: string;
  titleEn: string;
  durationAr: string;
  durationEn: string;
  videoUrl: string; // Sample video URL or embed
  descriptionAr: string;
  descriptionEn: string;
}

interface QuizQuestion {
  id: string;
  questionAr: string;
  questionEn: string;
  optionsAr: string[];
  optionsEn: string[];
  correctIndex: number;
  explanationAr: string;
  explanationEn: string;
}

interface Course {
  id: string;
  category: 'standards' | 'taxes' | 'vba' | 'powerbi' | 'basics';
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  instructorAr: string;
  instructorEn: string;
  hours: number;
  levelAr: string;
  levelEn: string;
  lessons: Lesson[];
  quiz: QuizQuestion[];
  imageUrl: string;
}

// Initial robust courses data
const INITIAL_COURSES: Course[] = [
  {
    id: 'course-ifrs',
    category: 'standards',
    titleAr: "إتقان المعايير المحاسبية الدولية IFRS",
    titleEn: "Mastering International Standards (IFRS)",
    descAr: "شرح تطبيقي معزز بأمثلة عملية من واقع بيئة الأعمال العربية والدولية لكبرى معايير التقارير المالية.",
    descEn: "Comprehensive video-led masterclass covering the essential international financial reporting standards with real case analyses.",
    instructorAr: "أ. روبير رأفت",
    instructorEn: "Robert Raafat",
    hours: 15,
    levelAr: "متقدم",
    levelEn: "Advanced",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
    lessons: [
      {
        id: 'ifrs-l1',
        titleAr: "مقدمة في إطار معايير التقارير المالية الدولية",
        titleEn: "Introduction to the IFRS Framework",
        durationAr: "15 دقيقة",
        durationEn: "15 mins",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        descriptionAr: "شرح الهيكل العام للمنظومة وأهمية الفهم المفاهيمي للمصطلحات والمحاور المحاسبية.",
        descriptionEn: "Exploring the overarching standard bodies and the key qualitative characteristics of financial reporting."
      },
      {
        id: 'ifrs-l2',
        titleAr: "معيار المحاسبة الدولي IAS 16: الأصول الثابتة",
        titleEn: "IAS 16: Property, Plant & Equipment",
        durationAr: "25 دقيقة",
        durationEn: "25 mins",
        videoUrl: "https://www.w3schools.com/html/movie.mp4",
        descriptionAr: "الاعتراف بالأصل الرأسمالي، طريقة قياس القيمة التاريخية وإهلاك الأصول ونماذج إعادة التقييم.",
        descriptionEn: "Initial and subsequent recognition of long-term assets, depreciation formulations, and asset revaluation structures."
      },
      {
        id: 'ifrs-l3',
        titleAr: "معيار التقارير المالي الدولي IFRS 15: إيرادات العقود",
        titleEn: "IFRS 15: Revenue from Contracts with Customers",
        durationAr: "30 دقيقة",
        durationEn: "30 mins",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        descriptionAr: "الخطوات الخمس للاعتراف بالإيراد، مع دراسة حالات عملية للمقاولات والتجارة الإلكترونية.",
        descriptionEn: "The 5-step model for revenue recognition under multiple transaction pricing models."
      }
    ],
    quiz: [
      {
        id: 'q-ifrs-1',
        questionAr: "أي معيار يختص بالاعتراف بالأصول الثابتة وإهلاكها؟",
        questionEn: "Which standard governs the recognition and depreciation of Property, Plant, and Equipment?",
        optionsAr: ["IAS 2", "IAS 16", "IFRS 15", "IAS 38"],
        optionsEn: ["IAS 2", "IAS 16", "IFRS 15", "IAS 38"],
        correctIndex: 1,
        explanationAr: "معيار IAS 16 هو المعيار المعني بالاعتراف وقياس الأصول الثابتة وإهلاكاتها.",
        explanationEn: "IAS 16 deals with the rules regarding property, plant, and equipment assets."
      },
      {
        id: 'q-ifrs-2',
        questionAr: "كم عدد خطوات نموذج الاعتراف بالإيراد في معيار IFRS 15؟",
        questionEn: "How many steps are defined in the revenue recognition model of IFRS 15?",
        optionsAr: ["3 خطوات", "4 خطوات", "5 خطوات", "6 خطوات"],
        optionsEn: ["3 steps", "4 steps", "5 steps", "6 steps"],
        correctIndex: 2,
        explanationAr: "يحدد معيار IFRS 15 خمس خطوات صارمة للاعتراف بالإيراد من عقود العملاء.",
        explanationEn: "IFRS 15 specifies a 5-step core process for recognizing revenue from contracts."
      }
    ]
  },
  {
    id: 'course-vba',
    category: 'vba',
    titleAr: "برمجة VBA المتقدمة للمحاسبين الماليين",
    titleEn: "Advanced VBA Macro Programming for Accountants",
    descAr: "انتقل من مستوى محاسب تقليدي إلى مبرمج ومطور لحلول إكسل المحاسبية والأوتوماتيكية الفائقة.",
    descEn: "Elevate your productivity to the ultimate standard by developing robust automatic journal-posting macros.",
    instructorAr: "أ. روبير رأفت",
    instructorEn: "Robert Raafat",
    hours: 12,
    levelAr: "متوسط إلى متقدم",
    levelEn: "Intermediate to Advanced",
    imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=600&q=80",
    lessons: [
      {
        id: 'vba-l1',
        titleAr: "تفعيل تبويب المطور وبيئة العمل VBA",
        titleEn: "Enabling Developer Tab & Exploring the VBA Editor",
        durationAr: "12 دقيقة",
        durationEn: "12 mins",
        videoUrl: "https://www.w3schools.com/html/movie.mp4",
        descriptionAr: "كتابة أول كود برمجي بسيط والتعرف على النوافذ والـ Modules في المحرر.",
        descriptionEn: "Opening the VBA environment, configuring safe settings, and creating modular subroutines."
      },
      {
        id: 'vba-l2',
        titleAr: "أتمتة ترحيل القيود باستخدام الحلقات التكرارية Loops",
        titleEn: "Automating Journal Posting using For-Next Loops",
        durationAr: "28 دقيقة",
        durationEn: "28 mins",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        descriptionAr: "كيفية تصفح الخلايا وتحديد الصفوف الفارغة لترحيل البيانات آلياً دون أخطاء يدوية.",
        descriptionEn: "Writing algorithms to search rows and transfer ledger items with dynamic criteria checking."
      }
    ],
    quiz: [
      {
        id: 'q-vba-1',
        questionAr: "ما هو الاختصار الصحيح لفتح محرر أكواد VBA في إكسل؟",
        questionEn: "What is the key shortcut to open the VBA editor in Microsoft Excel?",
        optionsAr: ["Alt + F8", "Alt + F11", "Ctrl + Alt + V", "Ctrl + Shift + E"],
        optionsEn: ["Alt + F8", "Alt + F11", "Ctrl + Alt + V", "Ctrl + Shift + E"],
        correctIndex: 1,
        explanationAr: "الاختصار Alt + F11 يفتح مباشرة محرر الأكواد (VBA Editor) لتعديل الماكرو.",
        explanationEn: "Alt + F11 opens the Visual Basic for Applications window directly."
      }
    ]
  },
  {
    id: 'course-powerbi',
    category: 'powerbi',
    titleAr: "تحليل البيانات المالية وبناء لوحات المراقبة Power BI",
    titleEn: "Financial Data Analysis & Dashboarding with Power BI",
    descAr: "ربط الدفاتر المحاسبية وصياغة مؤشرات أداء ذكية لمديري المبيعات وصناع القرار والمديرين الماليين.",
    descEn: "Connect financial repositories, construct dynamic data models, and deploy dashboard graphics.",
    instructorAr: "أ. روبير رأفت",
    instructorEn: "Robert Raafat",
    hours: 18,
    levelAr: "متقدم",
    levelEn: "Advanced",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    lessons: [
      {
        id: 'pbi-l1',
        titleAr: "إعداد مصادر البيانات وتجهيز الجداول",
        titleEn: "Connecting and Transforming Financial Data Sources",
        durationAr: "18 دقيقة",
        durationEn: "18 mins",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        descriptionAr: "الربط مع ملفات الإكسل ونمذجة الحسابات وتنظيف البيانات باستخدام Power Query.",
        descriptionEn: "Connecting Excel registers to Power BI and restructuring raw account entries via Power Query."
      },
      {
        id: 'pbi-l2',
        titleAr: "كتابة معادلات DAX للسيولة ومعدلات الربح",
        titleEn: "Formulating DAX Measures for Liquidity & Margin Calculations",
        durationAr: "22 دقيقة",
        durationEn: "22 mins",
        videoUrl: "https://www.w3schools.com/html/movie.mp4",
        descriptionAr: "صياغة معايير الأرباح والخسائر ونسب السيولة السريعة للمقارنات السنوية.",
        descriptionEn: "Leveraging DAX functions for Year-over-Year calculations and operating margin indexes."
      }
    ],
    quiz: [
      {
        id: 'q-pbi-1',
        questionAr: "ما هي الأداة المستخدمة لتنظيف وتحويل البيانات قبل نمذجتها في Power BI؟",
        questionEn: "Which component is utilized to clean and transform raw records before modeling in Power BI?",
        optionsAr: ["DAX Engine", "Power Query", "Power Pivot", "Visual Canvas"],
        optionsEn: ["DAX Engine", "Power Query", "Power Pivot", "Visual Canvas"],
        correctIndex: 1,
        explanationAr: "أداة Power Query هي المسؤولة عن تحويل وهيكلة البيانات وتنقيتها.",
        explanationEn: "Power Query is the foundational extraction and transforming tool inside Power BI."
      }
    ]
  }
];

export default function ElijahAcademy() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  // 1. Core State
  const [courses, setCourses] = useState<Course[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('elijah_academy_courses');
      return saved ? JSON.parse(saved) : INITIAL_COURSES;
    }
    return INITIAL_COURSES;
  });

  // Track enrollment: courseId -> { progress: number, completedLessons: string[], completedQuiz: boolean, quizScore?: number }
  const [enrollments, setEnrollments] = useState<{ [key: string]: any }>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('elijah_academy_enrollments');
      if (saved) return JSON.parse(saved);
    }
    // Pre-enroll in Course 1 with 33% progress (one lesson done) to show a rich dashboard immediately!
    return {
      'course-ifrs': {
        progress: 33,
        completedLessons: ['ifrs-l1'],
        completedQuiz: false,
        quizScore: undefined
      }
    };
  });

  const [activeTab, setActiveTab] = useState<'student-dashboard' | 'courses-catalog' | 'instructor-dashboard'>('student-dashboard');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [videoSpeed, setVideoSpeed] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Quiz States
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number>(0);

  // Certificate Viewer Modal state
  const [showCertificateFor, setShowCertificateFor] = useState<Course | null>(null);
  const [certificateStudentName, setCertificateStudentName] = useState('روبير رأفت');

  // Instructor Add Course form state
  const [newCourseTitleAr, setNewCourseTitleAr] = useState('');
  const [newCourseTitleEn, setNewCourseTitleEn] = useState('');
  const [newCourseDescAr, setNewCourseDescAr] = useState('');
  const [newCourseDescEn, setNewCourseDescEn] = useState('');
  const [newCourseCategory, setNewCourseCategory] = useState<'standards' | 'taxes' | 'vba' | 'powerbi' | 'basics'>('standards');
  const [newCourseHours, setNewCourseHours] = useState(10);
  const [newCourseLevelAr, setNewCourseLevelAr] = useState('مبتدئ');
  const [newCourseLevelEn, setNewCourseLevelEn] = useState('Beginner');
  const [newCourseImage, setNewCourseImage] = useState('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80');

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('elijah_academy_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('elijah_academy_enrollments', JSON.stringify(enrollments));
  }, [enrollments]);

  // Calculations for overall student metrics
  const totalEnrolledCount = Object.keys(enrollments).length;
  const completedCoursesCount = Object.values(enrollments).filter(e => e.progress === 100 && e.completedQuiz).length;
  const avgProgress = totalEnrolledCount > 0 
    ? Math.round(Object.values(enrollments).reduce((sum, e) => sum + (e.progress || 0), 0) / totalEnrolledCount)
    : 0;

  // Actions
  const enrollInCourse = (courseId: string) => {
    if (enrollments[courseId]) return; // already enrolled
    setEnrollments(prev => ({
      ...prev,
      [courseId]: {
        progress: 0,
        completedLessons: [],
        completedQuiz: false,
        quizScore: undefined
      }
    }));
    setActiveTab('student-dashboard');
  };

  const handleLessonSelect = (course: Course, lessonIdx: number) => {
    setSelectedCourse(course);
    setActiveLessonIndex(lessonIdx);
    setIsVideoPlaying(false);
    setShowQuiz(false);
    setQuizSubmitted(false);
    setSelectedAnswers({});
  };

  const toggleLessonCompleted = (courseId: string, lessonId: string) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return;

    setEnrollments(prev => {
      const current = prev[courseId] || { progress: 0, completedLessons: [], completedQuiz: false };
      let updatedLessons = [...current.completedLessons];
      
      if (updatedLessons.includes(lessonId)) {
        updatedLessons = updatedLessons.filter(id => id !== lessonId);
      } else {
        updatedLessons.push(lessonId);
      }

      const progress = Math.round((updatedLessons.length / course.lessons.length) * 100);

      return {
        ...prev,
        [courseId]: {
          ...current,
          completedLessons: updatedLessons,
          progress: progress > 100 ? 100 : progress
        }
      };
    });
  };

  // Quiz execution
  const handleAnswerSelect = (questionIdx: number, optionIdx: number) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIdx]: optionIdx
    }));
  };

  const submitQuiz = (course: Course) => {
    let score = 0;
    course.quiz.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        score++;
      }
    });

    const percentScore = Math.round((score / course.quiz.length) * 100);
    setQuizScore(percentScore);
    setQuizSubmitted(true);

    // If passed (>= 80%), mark quiz as completed to unlock the certificate!
    if (percentScore >= 80) {
      setEnrollments(prev => {
        const current = prev[course.id] || { progress: 100, completedLessons: [], completedQuiz: false };
        return {
          ...prev,
          [course.id]: {
            ...current,
            progress: 100, // force complete on quiz pass
            completedQuiz: true,
            quizScore: percentScore
          }
        };
      });
    }
  };

  // Instructor adds custom Course
  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseTitleAr || !newCourseTitleEn) return;

    const newId = `course-custom-${Date.now()}`;
    const newCourseObj: Course = {
      id: newId,
      category: newCourseCategory,
      titleAr: newCourseTitleAr,
      titleEn: newCourseTitleEn,
      descAr: newCourseDescAr || "دورة تعليمية مضافة حديثاً في المنصة",
      descEn: newCourseDescEn || "Newly added training masterclass in the academy.",
      instructorAr: "أ. روبير رأفت (مستشار المنصة)",
      instructorEn: "Robert Raafat (Senior Advisor)",
      hours: Number(newCourseHours),
      levelAr: newCourseLevelAr,
      levelEn: newCourseLevelEn,
      imageUrl: newCourseImage,
      lessons: [
        {
          id: `${newId}-l1`,
          titleAr: "المقدمة والخطوط العريضة للمحاضرات",
          titleEn: "Introduction & Lecture Outlines",
          durationAr: "10 دقائق",
          durationEn: "10 mins",
          videoUrl: "https://www.w3schools.com/html/movie.mp4",
          descriptionAr: "أول محاضرة تعريفية بتبويب الكورس ومقومات النجاح المهني.",
          descriptionEn: "Getting started with core definitions, resources, and materials."
        }
      ],
      quiz: [
        {
          id: `${newId}-q1`,
          questionAr: "السؤال الأول: ما هو الهدف الرئيسي للقوائم المالية المنظمة؟",
          questionEn: "Question 1: What is the main objective of organized financial statements?",
          optionsAr: ["عرض الموقف المالي بدقة وصنع القرار", "التهرب الضريبي", "تسجيل المصروفات النثرية فقط", "لا شيء مما سبق"],
          optionsEn: ["Accurately present financial position for decision making", "Tax evasion", "Record petty cash only", "None of the above"],
          correctIndex: 0,
          explanationAr: "القوائم المحاسبية تعرض المركز المالي بدقة لتلبية احتياجات مستخدمي التقارير وصناع القرار المالي.",
          explanationEn: "Financial lists exist to provide complete representation of equity and liabilities."
        }
      ]
    };

    setCourses(prev => [...prev, newCourseObj]);
    
    // Reset Form
    setNewCourseTitleAr('');
    setNewCourseTitleEn('');
    setNewCourseDescAr('');
    setNewCourseDescEn('');
    setNewCourseHours(10);
    
    // Set notification / tab shift
    setActiveTab('courses-catalog');
  };

  const deleteCustomCourse = (courseId: string) => {
    setCourses(prev => prev.filter(c => c.id !== courseId));
    // Remove enrolment if any
    if (enrollments[courseId]) {
      setEnrollments(prev => {
        const updated = { ...prev };
        delete updated[courseId];
        return updated;
      });
    }
  };

  const categoriesList = [
    { id: 'all', titleAr: 'كل الفروع', titleEn: 'All Subjects' },
    { id: 'standards', titleAr: 'المعايير (IFRS)', titleEn: 'IFRS Standards' },
    { id: 'vba', titleAr: 'برمجة إكسل VBA', titleEn: 'Excel VBA' },
    { id: 'powerbi', titleAr: 'تحليل Power BI', titleEn: 'Power BI Charts' },
  ];

  const filteredCourses = courses.filter(c => {
    const title = isRtl ? c.titleAr : c.titleEn;
    const desc = isRtl ? c.descAr : c.descEn;
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6">
      
      {/* 1. Header Hero Panel */}
      <div className="mb-12 text-center max-w-3xl mx-auto space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400 rounded-full text-xs font-black border border-pink-100 dark:border-pink-900/40 shadow-xs"
        >
          <GraduationCap className="w-4 h-4 text-pink-500 animate-pulse" />
          <span>{isRtl ? "أكاديمية إيليجا للتدريب المالي والمحاسبي" : "Elijah Academy of Finance & Excel"}</span>
        </motion.div>
        
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
          {isRtl ? (
            <>بناء الكفاءات <span className="gradient-text">المهنية والبرمجية</span> الاستثنائية</>
          ) : (
            <>Building Elite <span className="gradient-text">Accounting & Excel</span> Talents</>
          )}
        </h1>
        
        <p className="text-[15px] md:text-[17px] leading-[1.7] text-slate-500 dark:text-neutral-400 font-medium">
          {isRtl ? (
            "منصة متطورة وشاملة لتعلم المحاسبة المتقدمة، معايير التقارير الدولية IFRS، البرمجة بلغة VBA، وتحليل البيانات المالية مع شهادات تخرج معتمدة."
          ) : (
            "An enterprise-grade platform dedicated to mastering modern standards, tax regulations, automation VBA algorithms, and Power BI dashboards."
          )}
        </p>
      </div>

      {/* 2. Primary Tabs Selector */}
      <div className="flex justify-center border-b border-slate-100 dark:border-slate-800/80 mb-10 pb-1">
        <div className="flex space-x-1 md:space-x-4">
          <button
            onClick={() => setActiveTab('student-dashboard')}
            className={cn(
              "px-5 py-3 text-sm font-black transition-all border-b-2 cursor-pointer",
              activeTab === 'student-dashboard'
                ? "border-pink-500 text-pink-600 dark:text-pink-400"
                : "border-transparent text-slate-500 dark:text-neutral-400 hover:text-slate-800"
            )}
          >
            {isRtl ? "لوحة تحكم الطالب" : "Student Dashboard"}
          </button>

          <button
            onClick={() => setActiveTab('courses-catalog')}
            className={cn(
              "px-5 py-3 text-sm font-black transition-all border-b-2 cursor-pointer",
              activeTab === 'courses-catalog'
                ? "border-pink-500 text-pink-600 dark:text-pink-400"
                : "border-transparent text-slate-500 dark:text-neutral-400 hover:text-slate-800"
            )}
          >
            {isRtl ? "المسارات التعليمية المتاحة" : "Explore Courses"}
          </button>

          <button
            onClick={() => setActiveTab('instructor-dashboard')}
            className={cn(
              "px-5 py-3 text-sm font-black transition-all border-b-2 cursor-pointer",
              activeTab === 'instructor-dashboard'
                ? "border-pink-500 text-pink-600 dark:text-pink-400"
                : "border-transparent text-slate-500 dark:text-neutral-400 hover:text-slate-800"
            )}
          >
            {isRtl ? "لوحة المدرب (إدارة المحتوى)" : "Instructor Board"}
          </button>
        </div>
      </div>

      {/* 3. Render Dashboard / Catalog Content */}
      <AnimatePresence mode="wait">
        
        {/* TAB 1: STUDENT DASHBOARD */}
        {activeTab === 'student-dashboard' && (
          <motion.div
            key="student-db"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-10"
          >
            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 flex items-center gap-4 shadow-md">
                <div className="p-3.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-2xl">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 block">{isRtl ? "الدورات المنخرط بها" : "Enrolled Courses"}</span>
                  <span className="text-2xl font-black text-slate-800 dark:text-neutral-100">{totalEnrolledCount}</span>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 flex items-center gap-4 shadow-md">
                <div className="p-3.5 bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400 rounded-2xl">
                  <Award className="w-6 h-6 animate-bounce" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 block">{isRtl ? "الشهادات المحرزة" : "Certificates Earned"}</span>
                  <span className="text-2xl font-black text-slate-800 dark:text-neutral-100">{completedCoursesCount}</span>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 flex items-center gap-4 shadow-md">
                <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-2xl">
                  <Percent className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 block">{isRtl ? "متوسط التقدم الكلي" : "Overall Avg Progress"}</span>
                  <span className="text-2xl font-black text-slate-800 dark:text-neutral-100">{avgProgress}%</span>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 flex items-center gap-4 shadow-md">
                <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 rounded-2xl">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 block">{isRtl ? "ساعات الحضور والتعلم" : "Total Study Hours"}</span>
                  <span className="text-2xl font-black text-slate-800 dark:text-neutral-100">
                    {totalEnrolledCount * 4} {isRtl ? "ساعة" : "hrs"}
                  </span>
                </div>
              </div>
            </div>

            {/* Main Interactive Learning Container */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Video Player & Quiz Frame (8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                {selectedCourse ? (
                  <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden p-6 space-y-6">
                    
                    {/* Header bar of active player */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-slate-100 dark:border-slate-800 gap-3">
                      <div>
                        <span className="text-[10px] font-black text-pink-600 dark:text-pink-400 uppercase tracking-widest block">
                          {isRtl ? "المحاضرة الحالية الناشطة" : "Active Video Lecture"}
                        </span>
                        <h2 className="text-lg md:text-xl font-black text-slate-900 dark:text-white">
                          {isRtl 
                            ? selectedCourse.lessons[activeLessonIndex]?.titleAr 
                            : selectedCourse.lessons[activeLessonIndex]?.titleEn}
                        </h2>
                      </div>
                      <div className="px-3 py-1 bg-slate-50 dark:bg-slate-950 rounded-full text-xs font-bold text-slate-500">
                        {isRtl ? `درس ${activeLessonIndex + 1} من ${selectedCourse.lessons.length}` : `Lesson ${activeLessonIndex + 1} of ${selectedCourse.lessons.length}`}
                      </div>
                    </div>

                    {/* Show Quiz Engine instead of video player if showQuiz is true */}
                    {showQuiz ? (
                      <div className="bg-slate-50 dark:bg-slate-950/40 rounded-[2rem] border border-slate-150 dark:border-slate-800/80 p-6 md:p-8 space-y-6">
                        <div className="text-center space-y-2">
                          <ClipboardCheck className="w-10 h-10 text-pink-500 mx-auto" />
                          <h3 className="text-lg font-black text-slate-900 dark:text-white">
                            {isRtl ? `الاختبار الشامل: ${selectedCourse.titleAr}` : `Comprehensive Quiz: ${selectedCourse.titleEn}`}
                          </h3>
                          <p className="text-xs text-slate-400 font-medium max-w-md mx-auto">
                            {isRtl 
                              ? "أجب عن الأسئلة بدقة لتجاوز الكورس بنسبة 80% وأكثر وإصدار شهادتك المهنية المعتمدة فوراً."
                              : "Submit matching answers with 80% accuracy or higher to unlock and verify your graduation certificate."}
                          </p>
                        </div>

                        <div className="space-y-8 pt-4">
                          {selectedCourse.quiz.map((q, qIdx) => (
                            <div key={q.id} className="space-y-3 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                              <span className="text-xs font-black text-slate-400">
                                {isRtl ? `السؤال ${qIdx + 1}:` : `Question ${qIdx + 1}:`}
                              </span>
                              <h4 className="text-sm font-black text-slate-800 dark:text-neutral-100">
                                {isRtl ? q.questionAr : q.questionEn}
                              </h4>

                              <div className="grid grid-cols-1 gap-2.5 pt-2">
                                {(isRtl ? q.optionsAr : q.optionsEn).map((opt, optIdx) => {
                                  const isSelected = selectedAnswers[qIdx] === optIdx;
                                  const showCorrect = quizSubmitted && optIdx === q.correctIndex;
                                  const showIncorrect = quizSubmitted && isSelected && optIdx !== q.correctIndex;

                                  return (
                                    <button
                                      key={optIdx}
                                      type="button"
                                      disabled={quizSubmitted}
                                      onClick={() => handleAnswerSelect(qIdx, optIdx)}
                                      className={cn(
                                        "w-full text-right sm:text-left px-5 py-3.5 rounded-xl text-xs font-bold transition-all border cursor-pointer",
                                        isSelected && !quizSubmitted && "bg-pink-50 border-pink-300 text-pink-600 dark:bg-pink-950/40 dark:border-pink-900/60 dark:text-pink-400",
                                        showCorrect && "bg-emerald-50 border-emerald-300 text-emerald-700 dark:bg-emerald-950/40 dark:border-emerald-900/60 dark:text-emerald-400",
                                        showIncorrect && "bg-rose-50 border-rose-300 text-rose-700 dark:bg-rose-950/40 dark:border-rose-900/60 dark:text-rose-400",
                                        !isSelected && !showCorrect && "bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900 border-slate-150 dark:border-slate-800 text-slate-600 dark:text-neutral-300"
                                      )}
                                    >
                                      <div className="flex justify-between items-center w-full">
                                        <span>{opt}</span>
                                        {isSelected && !quizSubmitted && <span className="text-[10px] uppercase font-black tracking-widest text-pink-500">{isRtl ? 'محدد' : 'Selected'}</span>}
                                        {showCorrect && <span className="text-[10px] uppercase font-black tracking-widest text-emerald-500">✓ {isRtl ? 'صحيح' : 'Correct'}</span>}
                                        {showIncorrect && <span className="text-[10px] uppercase font-black tracking-widest text-rose-500">✗ {isRtl ? 'خطأ' : 'Wrong'}</span>}
                                      </div>
                                    </button>
                                  );
                                })}
                              </div>

                              {quizSubmitted && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="p-3 bg-slate-50 dark:bg-slate-950/80 rounded-xl text-xs text-slate-500 dark:text-neutral-400 font-semibold leading-relaxed border-l-2 border-slate-300"
                                >
                                  {isRtl ? q.explanationAr : q.explanationEn}
                                </motion.div>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* Submit Action or Score Feedback */}
                        <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                          {!quizSubmitted ? (
                            <>
                              <div className="text-xs font-bold text-slate-400 text-center sm:text-right">
                                {isRtl ? "* يجب الإجابة عن كافة الأسئلة أولاً." : "* Please provide answers to all quiz queries."}
                              </div>
                              <button
                                type="button"
                                onClick={() => submitQuiz(selectedCourse)}
                                className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700 text-white font-black py-3.5 px-8 rounded-xl text-xs transition-all cursor-pointer border-none shadow-md"
                              >
                                {isRtl ? "إرسال الإجابات والتقييم" : "Submit Answers"}
                              </button>
                            </>
                          ) : (
                            <div className="w-full space-y-4">
                              <div className="flex flex-col sm:flex-row justify-between items-center bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 gap-3">
                                <div>
                                  <span className="text-xs text-slate-400 block font-bold">{isRtl ? "النتيجة النهائية للاختبار:" : "Final Quiz Score:"}</span>
                                  <span className={cn(
                                    "text-2xl font-black",
                                    quizScore >= 80 ? "text-emerald-500" : "text-rose-500"
                                  )}>
                                    {quizScore}%
                                  </span>
                                </div>
                                <p className="text-xs font-black text-slate-500 dark:text-neutral-400 max-w-sm">
                                  {quizScore >= 80 
                                    ? (isRtl ? "تهانينا الحارة! لقد اجتزت الكورس بنجاح فائق وتم تفعيل شهادتك المعتمدة الآن." : "Superb! You have successfully passed the exam and verified your license.")
                                    : (isRtl ? "لم توفق بإحراز 80%. يرجى إعادة مراجعة الفيديوهات والدروس وإعادة المحاولة مجدداً." : "We suggest checking the lesson videos and trying again to reach the 80% mark.")}
                                </p>
                              </div>
                              
                              <div className="flex flex-col sm:flex-row justify-end gap-3">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setQuizSubmitted(false);
                                    setSelectedAnswers({});
                                  }}
                                  className="bg-white hover:bg-slate-100 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 font-bold py-3 px-6 rounded-xl text-xs transition-all cursor-pointer"
                                >
                                  {isRtl ? "إعادة الاختبار" : "Reset & Retry"}
                                </button>
                                {quizScore >= 80 && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setCertificateStudentName(isRtl ? "روبير رأفت" : "Robert Raafat");
                                      setShowCertificateFor(selectedCourse);
                                    }}
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 px-6 rounded-xl text-xs transition-all cursor-pointer border-none flex items-center justify-center gap-2"
                                  >
                                    <Award className="w-4 h-4" />
                                    <span>{isRtl ? "مشاهدة وتحميل الشهادة" : "Show Certificate"}</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <>
                        {/* Video Player Box */}
                        <div className="relative aspect-video rounded-[1.5rem] overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center shadow-inner group">
                          {isVideoPlaying ? (
                            <video
                              src={selectedCourse.lessons[activeLessonIndex]?.videoUrl}
                              className="w-full h-full object-cover"
                              controls
                              autoPlay
                              ref={(el) => { if (el) { el.playbackRate = videoSpeed; } }}
                            />
                          ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 space-y-4">
                              <img 
                                src={selectedCourse.imageUrl} 
                                alt="" 
                                className="absolute inset-0 w-full h-full object-cover opacity-30 select-none blur-xs"
                                referrerPolicy="no-referrer"
                              />
                              <div className="absolute inset-0 bg-slate-950/60 z-10" />
                              
                              <button
                                onClick={() => setIsVideoPlaying(true)}
                                className="z-20 p-5 rounded-full bg-pink-600 text-white hover:bg-pink-500 transition-all hover:scale-110 cursor-pointer border-none shadow-xl shadow-pink-600/30 flex items-center justify-center"
                              >
                                <Play className="w-8 h-8 fill-white translate-x-0.5" />
                              </button>
                              
                              <div className="z-20 space-y-1">
                                <h4 className="text-white text-md font-black">
                                  {isRtl ? "ابدأ تشغيل المحاضرة المصورة" : "Start Watching Lecture Video"}
                                </h4>
                                <p className="text-slate-400 text-xs font-semibold">
                                  {isRtl ? "اضغط على زر التشغيل للبدء فوراً بدقة عالية" : "Press the button to play the masterclass video."}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Float speed indicator top corner if playing */}
                          {isVideoPlaying && (
                            <div className="absolute top-4 right-4 z-20 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-black text-white border border-white/10 flex items-center gap-1.5">
                              <Volume2 className="w-3 h-3 text-pink-500" />
                              <span>{videoSpeed}x</span>
                            </div>
                          )}
                        </div>

                        {/* Speed controller and quick details row */}
                        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-100/60 dark:border-slate-800/80">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-400">{isRtl ? "سرعة الفيديو:" : "Playback Speed:"}</span>
                            <div className="flex bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-lg p-0.5">
                              {[1, 1.25, 1.5, 2].map(speed => (
                                <button
                                  key={speed}
                                  onClick={() => setVideoSpeed(speed)}
                                  className={cn(
                                    "px-2 py-1 rounded text-[10px] font-bold transition-all cursor-pointer border-none",
                                    videoSpeed === speed 
                                      ? "bg-pink-600 text-white" 
                                      : "bg-transparent text-slate-500 hover:text-slate-800"
                                  )}
                                >
                                  {speed}x
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            {/* Checkmark Lesson as completed */}
                            <button
                              onClick={() => toggleLessonCompleted(selectedCourse.id, selectedCourse.lessons[activeLessonIndex].id)}
                              className={cn(
                                "px-4.5 py-2 rounded-xl text-xs font-black border transition-all cursor-pointer flex items-center gap-1.5",
                                enrollments[selectedCourse.id]?.completedLessons.includes(selectedCourse.lessons[activeLessonIndex].id)
                                  ? "bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-950/40 dark:border-emerald-900/60 dark:text-emerald-400"
                                  : "bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-neutral-300"
                              )}
                            >
                              <CheckCircle className="w-4 h-4" />
                              <span>
                                {enrollments[selectedCourse.id]?.completedLessons.includes(selectedCourse.lessons[activeLessonIndex].id)
                                  ? (isRtl ? "مكتمل ✓" : "Completed ✓")
                                  : (isRtl ? "تحديد كمكتمل" : "Mark Completed")}
                              </span>
                            </button>

                            {/* Show Quiz trigger */}
                            <button
                              onClick={() => setShowQuiz(true)}
                              className="bg-pink-600 hover:bg-pink-700 text-white font-black py-2 px-4.5 rounded-xl text-xs transition-all cursor-pointer border-none flex items-center gap-1.5"
                            >
                              <ClipboardCheck className="w-4 h-4" />
                              <span>{isRtl ? "بدء الاختبار الكورس" : "Take Course Quiz"}</span>
                            </button>
                          </div>
                        </div>

                        {/* Lesson Description text */}
                        <div className="space-y-2">
                          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">{isRtl ? "تفاصيل هذه المحاضرة الشاملة:" : "About this lecture:"}</h4>
                          <p className="text-sm leading-relaxed text-slate-600 dark:text-neutral-300 font-medium bg-slate-50/50 dark:bg-slate-950/20 p-4 rounded-xl border border-slate-100/60 dark:border-slate-850/40">
                            {isRtl 
                              ? selectedCourse.lessons[activeLessonIndex]?.descriptionAr 
                              : selectedCourse.lessons[activeLessonIndex]?.descriptionEn}
                          </p>
                        </div>
                      </>
                    )}

                  </div>
                ) : (
                  <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-[2rem] p-12 text-center shadow-xl space-y-4">
                    <Video className="w-16 h-16 text-slate-300 dark:text-slate-700 mx-auto" />
                    <h3 className="text-lg font-black text-slate-800 dark:text-neutral-100">
                      {isRtl ? "اختر أحد كورس للبدء بالدراسة الفورية" : "Select an Enrolled Course to Study"}
                    </h3>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto font-medium">
                      {isRtl 
                        ? "من أجل بدء تشغيل الفيديوهات التفاعلية والإجابة على الأسئلة وإصدار شهادتك المهنية، اضغط على زر 'ابدأ الدراسة' أسفل الكورسات المسجل بها."
                        : "Click 'Start Learning' on any of your enrolled courses from the list to start watching lectures and trigger interactive tests."}
                    </p>
                  </div>
                )}
              </div>

              {/* Right Column: Enrolled Courses & Progress List (4 cols) */}
              <div className="lg:col-span-4 space-y-6">
                
                {/* Section title */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                    {isRtl ? "الكورسات المسجلة الحالية:" : "My Active Courses:"}
                  </span>
                  <span className="px-2.5 py-1 bg-pink-50 dark:bg-pink-950 text-pink-600 dark:text-pink-400 rounded-lg text-[10px] font-black">
                    {totalEnrolledCount} {isRtl ? "مسارات" : "Active"}
                  </span>
                </div>

                <div className="space-y-4">
                  {courses.map(course => {
                    const enrollment = enrollments[course.id];
                    if (!enrollment) return null; // Only show enrolled courses in Student Dashboard

                    const title = isRtl ? course.titleAr : course.titleEn;
                    const level = isRtl ? course.levelAr : course.levelEn;
                    const isActive = selectedCourse?.id === course.id;

                    return (
                      <div
                        key={course.id}
                        className={cn(
                          "bg-white dark:bg-slate-900 border rounded-3xl p-5 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden",
                          isActive ? "border-pink-500/40 shadow-pink-500/5 ring-1 ring-pink-500/10" : "border-slate-100 dark:border-slate-800/80"
                        )}
                      >
                        {/* Selected overlay border highlight */}
                        {isActive && <div className="absolute top-0 right-0 left-0 h-1 bg-pink-500" />}

                        <div className="space-y-4">
                          <div className="flex gap-3">
                            <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                              <img src={course.imageUrl} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-sm font-black text-slate-800 dark:text-neutral-100 truncate">
                                {title}
                              </h4>
                              <span className="text-[10px] font-semibold text-slate-400 block mt-0.5">
                                {level} • {course.lessons.length} {isRtl ? "محاضرات" : "Lessons"}
                              </span>
                            </div>
                          </div>

                          {/* Progress bar visual */}
                          <div className="space-y-1">
                            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                              <span>{isRtl ? "معدل التقدم بالدراسة" : "Syllabus Progress"}</span>
                              <span className="text-pink-600 font-black">{enrollment.progress}%</span>
                            </div>
                            <div className="w-full h-2 bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-pink-500 rounded-full transition-all duration-500"
                                style={{ width: `${enrollment.progress}%` }}
                              />
                            </div>
                          </div>

                          {/* Actions: Start/Resume study and show certificate button if quiz is passed */}
                          <div className="flex gap-2 pt-2">
                            <button
                              onClick={() => handleLessonSelect(course, 0)}
                              className={cn(
                                "flex-1 font-black py-2.5 px-3 rounded-xl text-[10px] transition-all cursor-pointer border flex items-center justify-center gap-1.5",
                                isActive 
                                  ? "bg-pink-600 text-white border-pink-600 shadow-md shadow-pink-500/10"
                                  : "bg-slate-50 hover:bg-slate-100 text-slate-700 dark:bg-slate-950 dark:hover:bg-slate-800 border-slate-150 dark:border-slate-800 text-slate-500"
                              )}
                            >
                              <Play className="w-3 h-3 fill-current" />
                              <span>{isRtl ? "ابدأ / واصل الدراسة" : "Study Course"}</span>
                            </button>

                            {enrollment.completedQuiz && (
                              <button
                                onClick={() => {
                                  setCertificateStudentName(isRtl ? "روبير رأفت" : "Robert Raafat");
                                  setShowCertificateFor(course);
                                }}
                                className="px-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900 border border-emerald-100 dark:border-emerald-900/60 rounded-xl transition-all flex items-center justify-center cursor-pointer"
                                title={isRtl ? "تحميل شهادة التخرج" : "View Graduation Certificate"}
                              >
                                <Award className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {totalEnrolledCount === 0 && (
                    <div className="text-center py-10 bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-dashed border-slate-200 text-slate-400 text-xs">
                      {isRtl ? "لم تسجل بأي مسارات بعد. تفضل بزيارة تبويب المسارات للبدء." : "No enrolled paths yet. Go to 'Explore Courses' to sign up."}
                    </div>
                  )}
                </div>

                {/* Course Curriculum list nested if course selected */}
                {selectedCourse && (
                  <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 shadow-md space-y-4">
                    <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 block">
                      {isRtl ? "منهج المسار والدروس:" : "Syllabus Curriculum:"}
                    </span>

                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                      {selectedCourse.lessons.map((les, idx) => {
                        const isCompleted = enrollments[selectedCourse.id]?.completedLessons.includes(les.id);
                        const isLesActive = activeLessonIndex === idx;

                        return (
                          <button
                            key={les.id}
                            onClick={() => {
                              setActiveLessonIndex(idx);
                              setIsVideoPlaying(false);
                              setShowQuiz(false);
                            }}
                            className={cn(
                              "w-full text-right sm:text-left p-3 rounded-xl text-xs font-semibold border transition-all flex items-start gap-2 cursor-pointer",
                              isLesActive 
                                ? "bg-pink-50 border-pink-200 text-pink-600 dark:bg-pink-950/40 dark:border-pink-900/40 dark:text-pink-400" 
                                : "bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-900 border-slate-150 dark:border-slate-800 text-slate-600 dark:text-neutral-300"
                            )}
                          >
                            <span className="mt-0.5 shrink-0">
                              {isCompleted ? (
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                              ) : (
                                <Play className="w-4 h-4 text-slate-400" />
                              )}
                            </span>
                            <div className="min-w-0">
                              <span className="block font-black text-[11px] line-clamp-1">{isRtl ? les.titleAr : les.titleEn}</span>
                              <span className="text-[9px] text-slate-400 font-bold block mt-0.5">
                                {isRtl ? les.durationAr : les.durationEn}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>

            </div>
          </motion.div>
        )}

        {/* TAB 2: EXPLORE COURSE CATALOG */}
        {activeTab === 'courses-catalog' && (
          <motion.div
            key="courses-cat"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Filter control bar */}
            <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800/80 p-5 rounded-[2rem] shadow-md flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="relative w-full md:w-96">
                <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder={isRtl ? "البحث عن مسار دراسي..." : "Search courses..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-10 pl-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl text-xs font-semibold focus:outline-none focus:border-pink-500"
                />
              </div>

              <div className="flex flex-wrap gap-2 w-full md:w-auto">
                {categoriesList.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={cn(
                      "px-4 py-2 rounded-full text-xs font-black border transition-all cursor-pointer",
                      selectedCategory === cat.id
                        ? "bg-pink-600 border-pink-600 text-white shadow-md shadow-pink-500/10"
                        : "bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 border-slate-150 dark:border-slate-800 text-slate-600 dark:text-neutral-300"
                    )}
                  >
                    {isRtl ? cat.titleAr : cat.titleEn}
                  </button>
                ))}
              </div>
            </div>

            {/* Courses grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {filteredCourses.map(course => {
                const isEnrolled = !!enrollments[course.id];
                const title = isRtl ? course.titleAr : course.titleEn;
                const desc = isRtl ? course.descAr : course.descEn;
                const level = isRtl ? course.levelAr : course.levelEn;

                return (
                  <div
                    key={course.id}
                    className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative group"
                  >
                    {/* Category floating badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 bg-slate-950/80 backdrop-blur-md text-white rounded-lg text-[9px] font-black uppercase tracking-widest border border-white/10">
                        {course.category}
                      </span>
                    </div>

                    {/* Image frame */}
                    <div className="h-44 w-full relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent z-10" />
                      <img 
                        src={course.imageUrl} 
                        alt="" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Content body */}
                    <div className="p-6 flex-grow flex flex-col justify-between space-y-6">
                      <div className="space-y-2">
                        <span className="text-[10px] font-black tracking-widest text-pink-600 dark:text-pink-400 uppercase">
                          {level} • {course.hours} {isRtl ? "ساعة أكاديمية" : "Hours"}
                        </span>
                        <h3 className="text-md md:text-lg font-black text-slate-800 dark:text-neutral-100 line-clamp-1 group-hover:text-pink-600 transition-colors">
                          {title}
                        </h3>
                        <p className="text-xs text-slate-400 leading-relaxed font-medium line-clamp-3">
                          {desc}
                        </p>
                      </div>

                      {/* Instructor block & actions */}
                      <div className="pt-4 border-t border-slate-50 dark:border-slate-800/60 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-black text-pink-500 border border-slate-200">
                            R
                          </div>
                          <span className="text-[11px] font-bold text-slate-500">
                            {isRtl ? course.instructorAr : course.instructorEn}
                          </span>
                        </div>

                        {/* Button action */}
                        {isEnrolled ? (
                          <button
                            onClick={() => {
                              setSelectedCourse(course);
                              setActiveLessonIndex(0);
                              setActiveTab('student-dashboard');
                            }}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-black py-2 px-4 rounded-xl text-[10px] transition-all cursor-pointer border-none flex items-center gap-1.5 shadow-md shadow-emerald-500/10"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>{isRtl ? "مسجل (ادرس)" : "Enrolled"}</span>
                          </button>
                        ) : (
                          <div className="flex gap-1.5">
                            {/* Allow deleting custom courses by the instructor */}
                            {course.id.startsWith('course-custom-') && (
                              <button
                                onClick={() => deleteCustomCourse(course.id)}
                                className="p-2 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-600 border border-rose-100 dark:border-rose-900/60 rounded-xl transition-all cursor-pointer"
                                title={isRtl ? "حذف الكورس التجريبي" : "Delete custom course"}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                            <button
                              onClick={() => enrollInCourse(course.id)}
                              className="bg-pink-600 hover:bg-pink-700 text-white font-black py-2 px-4 rounded-xl text-[10px] transition-all cursor-pointer border-none shadow-md shadow-pink-500/10 flex items-center gap-1"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>{isRtl ? "تسجيل فوري" : "Enroll"}</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* TAB 3: INSTRUCTOR BOARD */}
        {activeTab === 'instructor-dashboard' && (
          <motion.div
            key="instructor-db"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-10"
          >
            {/* Admin Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 flex items-center gap-4 shadow-md">
                <div className="p-3.5 bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400 rounded-2xl">
                  <Users className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 block">{isRtl ? "إجمالي الطلاب بالمنصة" : "Total Platform Students"}</span>
                  <span className="text-2xl font-black text-slate-800 dark:text-neutral-100">4,850 +</span>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 flex items-center gap-4 shadow-md">
                <div className="p-3.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-2xl">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 block">{isRtl ? "المسارات التعليمية" : "Active Courses"}</span>
                  <span className="text-2xl font-black text-slate-800 dark:text-neutral-100">{courses.length}</span>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 flex items-center gap-4 shadow-md">
                <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-2xl">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 block">{isRtl ? "معدل اجتياز الاختبارات" : "Quiz Pass Rate"}</span>
                  <span className="text-2xl font-black text-slate-800 dark:text-neutral-100">88.4%</span>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 flex items-center gap-4 shadow-md">
                <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 rounded-2xl">
                  <BarChart className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 block">{isRtl ? "رصيد اشتراكات المنصة" : "Estimated Revenue"}</span>
                  <span className="text-2xl font-black text-slate-800 dark:text-neutral-100">$24,150</span>
                </div>
              </div>
            </div>

            {/* Split panels: Course creation & Student Submissions review */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Form to insert new interactive Course (7 cols) */}
              <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800/80 rounded-[2.5rem] p-6 md:p-8 shadow-xl space-y-6">
                <div>
                  <span className="text-[10px] font-black tracking-widest text-pink-600 dark:text-pink-400 uppercase">
                    {isRtl ? "شغل لوحة المعلم والتحكم" : "Platform Content Creation Console"}
                  </span>
                  <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-white">
                    {isRtl ? "إضافة مسار تعليمي تفاعلي جديد" : "Deploy New Interactive Course"}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-semibold mt-1">
                    {isRtl 
                      ? "بإمكانك إضافة كورسات مخصصة ومواد تعليمية، وسنقوم بتوليد الدروس، الفيديو، والاختبارات التفاعلية المصاحبة لها فوراً."
                      : "Add custom accounting training tracks here. The platform will dynamically compile them to the live syllabus."}
                  </p>
                </div>

                <form onSubmit={handleAddCourse} className="space-y-4">
                  
                  {/* Row 1: Title Ar & En */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-600 dark:text-neutral-300">{isRtl ? "العنوان بالعربية *" : "Course Title (Arabic) *"}</label>
                      <input
                        type="text"
                        required
                        value={newCourseTitleAr}
                        onChange={(e) => setNewCourseTitleAr(e.target.value)}
                        placeholder="مثال: أساسيات ضريبة كسب العمل"
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-900 dark:text-neutral-100"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-600 dark:text-neutral-300">{isRtl ? "العنوان بالإنجليزية *" : "Course Title (English) *"}</label>
                      <input
                        type="text"
                        required
                        value={newCourseTitleEn}
                        onChange={(e) => setNewCourseTitleEn(e.target.value)}
                        placeholder="e.g., Payroll Tax Fundamentals"
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-900 dark:text-neutral-100"
                      />
                    </div>
                  </div>

                  {/* Row 2: Category, level & hours */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-600 dark:text-neutral-300">{isRtl ? "التصنيف الفني *" : "Category Subject *"}</label>
                      <select
                        value={newCourseCategory}
                        onChange={(e: any) => setNewCourseCategory(e.target.value)}
                        className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl text-xs font-black text-slate-700 dark:text-neutral-200"
                      >
                        <option value="standards">{isRtl ? "المعايير الدولية" : "IFRS Standards"}</option>
                        <option value="vba">{isRtl ? "أكواد وماكرو VBA" : "Excel VBA"}</option>
                        <option value="powerbi">{isRtl ? "تحليلات Power BI" : "Power BI Charts"}</option>
                        <option value="basics">{isRtl ? "مبادئ عامة" : "General Basics"}</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-600 dark:text-neutral-300">{isRtl ? "عدد الساعات *" : "Syllabus Hours *"}</label>
                      <input
                        type="number"
                        min="1"
                        required
                        value={newCourseHours}
                        onChange={(e) => setNewCourseHours(Number(e.target.value))}
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-900 dark:text-neutral-100"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-600 dark:text-neutral-300">{isRtl ? "مستوى الدورة *" : "Target Level *"}</label>
                      <input
                        type="text"
                        required
                        value={isRtl ? newCourseLevelAr : newCourseLevelEn}
                        onChange={(e) => {
                          if (isRtl) {
                            setNewCourseLevelAr(e.target.value);
                            setNewCourseLevelEn('All Levels');
                          } else {
                            setNewCourseLevelEn(e.target.value);
                            setNewCourseLevelAr('كافة المستويات');
                          }
                        }}
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-900 dark:text-neutral-100"
                      />
                    </div>
                  </div>

                  {/* Desc Arabic */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-600 dark:text-neutral-300">{isRtl ? "الشرح والوصف للمسار (بالعربية) *" : "Course Description (Arabic) *"}</label>
                    <textarea
                      rows={2}
                      value={newCourseDescAr}
                      onChange={(e) => setNewCourseDescAr(e.target.value)}
                      placeholder="وصف تفصيلي للأهداف والمميزات والدروس..."
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-900 dark:text-neutral-100"
                    />
                  </div>

                  {/* Desc English */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-600 dark:text-neutral-300">{isRtl ? "الشرح والوصف للمسار (بالإنجليزية) *" : "Course Description (English) *"}</label>
                    <textarea
                      rows={2}
                      value={newCourseDescEn}
                      onChange={(e) => setNewCourseDescEn(e.target.value)}
                      placeholder="Detailed target objectives, files included, and benefits..."
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-900 dark:text-neutral-100"
                    />
                  </div>

                  {/* Cover Image */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-600 dark:text-neutral-300">{isRtl ? "رابط الصورة التعبيرية للكورس" : "Course Cover Image URL"}</label>
                    <input
                      type="text"
                      value={newCourseImage}
                      onChange={(e) => setNewCourseImage(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-400"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white font-black py-3 px-6 rounded-xl text-xs transition-all cursor-pointer border-none shadow-md"
                  >
                    {isRtl ? "نشر وتجهيز الكورس على المنصة" : "Publish & Host Course"}
                  </button>

                </form>
              </div>

              {/* Student grading review list (5 cols) */}
              <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800/80 rounded-[2.5rem] p-6 md:p-8 shadow-xl space-y-6">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    {isRtl ? "مراقبة سير الامتحانات والتقييمات" : "Exam Submissions Watchdog"}
                  </span>
                  <h3 className="text-md md:text-lg font-black text-slate-800 dark:text-neutral-100 mt-1">
                    {isRtl ? "الطلبات الأخيرة للتقييم والتصحيح" : "Recent Student Exam Records"}
                  </h3>
                </div>

                <div className="space-y-3.5">
                  {[
                    { name: "أحمد دياب", courseAr: "معايير IFRS الدولية", courseEn: "IFRS Standards", status: "passed", score: 100, date: "قبل 15 دقيقة" },
                    { name: "مي السعدني", courseAr: "برمجة ماكرو VBA", courseEn: "Excel VBA macros", status: "passed", score: 85, date: "قبل ساعتين" },
                    { name: "شريف ممدوح", courseAr: "معايير IFRS الدولية", courseEn: "IFRS Standards", status: "failed", score: 60, date: "قبل 4 ساعات" },
                    { name: "كريم يحيى", courseAr: "تحليلات Power BI", courseEn: "Power BI Charts", status: "passed", score: 90, date: "بالأمس" }
                  ].map((sub, sIdx) => (
                    <div key={sIdx} className="p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/80 rounded-2xl flex items-center justify-between gap-3 text-xs">
                      <div className="min-w-0">
                        <span className="font-black text-slate-800 dark:text-neutral-200 block">{sub.name}</span>
                        <span className="text-[10px] font-bold text-slate-400 block mt-0.5">
                          {isRtl ? sub.courseAr : sub.courseEn} • {sub.date}
                        </span>
                      </div>
                      
                      <div className="text-left">
                        <span className={cn(
                          "px-2 py-0.5 rounded-md font-black text-[10px] block text-center",
                          sub.status === 'passed' ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400" : "bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400"
                        )}>
                          {sub.score}%
                        </span>
                        <span className="text-[9px] text-slate-400 font-semibold block mt-0.5">
                          {sub.status === 'passed' ? (isRtl ? "ناجح" : "Passed") : (isRtl ? "راسب" : "Failed")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* 4. GRADUATION CERTIFICATE VIEW MODAL */}
      <AnimatePresence>
        {showCertificateFor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCertificateFor(null)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-4xl bg-stone-50 dark:bg-stone-900 rounded-[3rem] border-8 border-amber-600 p-8 md:p-12 shadow-2xl overflow-y-auto max-h-[90vh] z-10 text-stone-900 dark:text-stone-100"
            >
              {/* Outer certificate borders and framing */}
              <div className="absolute inset-4 border-2 border-stone-300 dark:border-stone-800 pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setShowCertificateFor(null)}
                className="absolute top-6 left-6 md:left-auto md:right-6 p-2 rounded-xl text-stone-400 hover:text-stone-600 hover:bg-stone-200/50 transition-all cursor-pointer border-none bg-transparent"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-8 text-center pt-6 max-w-2xl mx-auto relative">
                
                {/* Logo and Crest */}
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-16 h-16 bg-amber-600/10 text-amber-600 rounded-full flex items-center justify-center border-2 border-amber-600 text-3xl font-serif">
                    E
                  </div>
                  <span className="font-serif tracking-widest text-xs uppercase font-black text-amber-700">
                    ELIJAH ACADEMY OF FINANCIAL EXCELLENCE
                  </span>
                </div>

                {/* Main Heading Certificate */}
                <div className="space-y-2">
                  <h2 className="text-3xl md:text-5xl font-serif font-black text-amber-800 dark:text-amber-500">
                    {isRtl ? "شهادة تخرج واجتياز" : "Certificate of Excellence"}
                  </h2>
                  <span className="text-xs uppercase font-black text-stone-400 tracking-wider block">
                    {isRtl ? "تمنح هذه الشهادة رسمياً إلى:" : "THIS IS PROUDLY PRESENTED TO:"}
                  </span>
                </div>

                {/* Student Name Input for interactivity */}
                <div className="py-2 max-w-md mx-auto space-y-1.5">
                  <input
                    type="text"
                    value={certificateStudentName}
                    onChange={(e) => setCertificateStudentName(e.target.value)}
                    className="w-full text-center py-2 bg-transparent border-b-2 border-stone-300 dark:border-stone-700 text-2xl md:text-3xl font-serif font-black text-stone-800 dark:text-stone-100 focus:outline-none focus:border-amber-600"
                    placeholder={isRtl ? "اكتب اسمك هنا للشهادة" : "Type your name here"}
                  />
                  <span className="text-[10px] text-stone-400 block font-bold">
                    {isRtl ? "(يمكنك تعديل الاسم أعلاه مباشرة لتخصيص الشهادة)" : "(You can edit the name above directly to customize the license)"}
                  </span>
                </div>

                {/* Sub text */}
                <p className="text-xs md:text-sm leading-relaxed font-semibold text-stone-500 dark:text-stone-400">
                  {isRtl ? (
                    <>بموجب هذه الشهادة، يُقر المستشار المالي <strong>أ. روبير رأفت</strong> بأن الطالب قد أتم بنجاح كافة المحاضرات الأكاديمية واجتاز الاختبار الشامل لـ <strong>{showCertificateFor.titleAr}</strong> بمعدل <strong>{enrollments[showCertificateFor.id]?.quizScore || 100}%</strong>.</>
                  ) : (
                    <>For outstanding completion of all video syllabus files and passing the final interactive test criteria for <strong>{showCertificateFor.titleEn}</strong> with an aggregate score of <strong>{enrollments[showCertificateFor.id]?.quizScore || 100}%</strong>.</>
                  )}
                </p>

                {/* Signature Block Row */}
                <div className="pt-8 grid grid-cols-2 gap-8 items-end max-w-xl mx-auto border-t border-stone-200 dark:border-stone-800">
                  <div className="space-y-1 text-center">
                    <span className="font-serif italic text-amber-700 text-sm block">Robert Raafat</span>
                    <span className="text-[10px] font-black text-stone-400 block uppercase tracking-wider">
                      {isRtl ? "مستشار ومدرب المنصة" : "Senior Platform Advisor"}
                    </span>
                  </div>

                  <div className="space-y-1 text-center flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-amber-600/10 border border-amber-600/40 text-amber-600 font-serif flex items-center justify-center text-xs">
                      SEAL
                    </div>
                    <span className="text-[10px] font-black text-stone-400 block uppercase tracking-wider">
                      {isRtl ? "الختم الأكاديمي المعتمد" : "OFFICIAL ACADEMY SEAL"}
                    </span>
                  </div>
                </div>

                {/* Print button row */}
                <div className="pt-8 flex justify-center gap-3">
                  <button
                    onClick={() => window.print()}
                    className="bg-amber-700 hover:bg-amber-800 text-white font-black py-2.5 px-6 rounded-xl text-xs transition-all cursor-pointer border-none flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>{isRtl ? "طباعة / حفظ كـ PDF" : "Print / Save PDF"}</span>
                  </button>

                  <button
                    onClick={() => setShowCertificateFor(null)}
                    className="bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 text-stone-700 dark:text-stone-300 font-black py-2.5 px-6 rounded-xl text-xs transition-all cursor-pointer border-none"
                  >
                    {isRtl ? "إغلاق المعاينة" : "Close Preview"}
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
