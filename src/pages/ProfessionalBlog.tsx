import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  BookOpen,
  Calendar,
  Clock,
  User,
  Heart,
  Share2,
  MessageSquare,
  ArrowLeft,
  ArrowRight,
  Tag,
  Grid,
  Filter,
  Check,
  Copy,
  Send,
  Trash2,
  Sparkles,
  Plus,
  Compass,
  AlertCircle,
  ThumbsUp,
  Award
} from 'lucide-react';
import { cn } from '../lib/utils';
import AdsRenderer from '../components/AdsRenderer';

// Types for Blog
interface Author {
  nameAr: string;
  nameEn: string;
  avatar: string;
  roleAr: string;
  roleEn: string;
  bioAr: string;
  bioEn: string;
}

interface BlogComment {
  id: string;
  authorName: string;
  avatarId: number;
  content: string;
  timestamp: string;
}

interface Article {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  excerptAr: string;
  excerptEn: string;
  contentAr: string[]; // split by paragraphs
  contentEn: string[];
  author: Author;
  date: string;
  category: 'vba' | 'ifrs' | 'tax' | 'analysis';
  tags: string[];
  imageUrl: string;
  likesCount: number;
}

const AUTHORS: { [key: string]: Author } = {
  robert: {
    nameAr: "أ. روبير رأفت",
    nameEn: "Robert Raafat",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    roleAr: "مستشار مالي خبير ومطور أنظمة محاسبية ذكية",
    roleEn: "Expert Financial Advisor & Smart Systems Developer",
    bioAr: "مؤسس أكاديمية التدريب ومصمم الحلول البرمجية المتكاملة باستخدام VBA و Power BI لمجموعة من كبريات الشركات العربية.",
    bioEn: "Founder of the training academy and architect of full-scale VBA and Power BI corporate workflow automations."
  },
  ahmed: {
    nameAr: "د. أحمد حسن",
    nameEn: "Dr. Ahmed Hassan",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    roleAr: "أستاذ معايير التقارير المالية الدولية والمحاسبة الضريبية",
    roleEn: "Professor of IFRS and International Taxation",
    bioAr: "باحث ومؤلف للعديد من الأوراق العلمية والكتب المهنية المتخصصة في القوائم المالية والتخطيط الضريبي الاستراتيجي.",
    bioEn: "Author of advanced publications on cross-border tax alignment and strategic accounting principles."
  }
};

const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-vba-1',
    slug: 'excel-vba-journal-automation',
    titleAr: "أتمتة القيود اليومية في إكسل باستخدام برمجة ميكرو VBA",
    titleEn: "Automating Journal Entries in Excel with VBA Macros",
    excerptAr: "دليلك الشامل لبرمجة ماكرو متكامل يرحل القيود المحاسبية اليومية إلى الأستاذ العام بضغطة زر واحدة لتجنب الأخطاء البشرية القاتلة.",
    excerptEn: "Your comprehensive guide to writing a safe journal-posting routine that migrates ledger entries instantly without human margins of error.",
    contentAr: [
      "تعتبر دفاتر القيود المحاسبية اليومية النواة الأساسية لكافة التقارير المالية اللاحقة. ومع كثرة العمليات اليومية في الشركات المتوسطة والصغيرة، يصبح إدخال وترحيل هذه البيانات يدوياً مصدراً أساسياً للأخطاء وتضييع الوقت الثمين.",
      "هنا يأتي دور برمجة تطبيقات الماكرو VBA في برنامج مايكروسوفت إكسل ليمثل قفزة نوعية للمحاسب الذكي. من خلال كود برمجي بسيط ومنظم، يمكنك قراءة المدخلات من نافذة تسجيل مخصصة ثم ترحيلها إلى ورقة العمل الأساسية للقيود ومن ثم تصنيفها فوراً في ميزان المراجعة.",
      "يبدأ الكود بتعريف المتغيرات الأساسية مثل صف الترحيل التالي الفارغ، والتحقق التام من توازن القيد (المدين يساوي الدائن). إذا توازى القيد، يتم نقله تلقائياً بضغطة زر مع الحفاظ على تسلسل الأرقام وتاريخ العملية وتأكيد العملية برسالة تظهر للمستخدم.",
      "في هذا المقال، سنستعرض النماذج البرمجية الجاهزة وأكواد الفحص للبدء فوراً في تحسين بيئة عملك والانتقال من محاسب تقليدي إلى مبرمج ومطور حلول تقنية استثنائية."
    ],
    contentEn: [
      "Journal entries represent the structural foundation of all financial records. In small to medium enterprise frameworks, registering scores of transactions manually daily results in costly errors and time losses.",
      "Visual Basic for Applications (VBA) inside Excel serves as an unmatched tool to completely solve this productivity bottleneck. By designing a custom UserForm and back-end logical routing, you can read records securely and transfer them to the ledger system instantly.",
      "The automation starts by analyzing the next available row on the target ledger sheet, confirming that total debits strictly equal credits, and auto-incrementing the transaction sequence index. Successful operations are greeted with a soft modal confirmation prompt.",
      "In this feature article, we present complete structural VBA scripts that you can copy, tailor, and deploy inside your accounting systems to boost accuracy by 100%."
    ],
    author: AUTHORS.robert,
    date: "2026-07-10",
    category: "vba",
    tags: ["VBA", "Excel", "Automation", "Efficiency"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    likesCount: 38
  },
  {
    id: 'art-ifrs-1',
    slug: 'ifrs15-revenue-contract-guide',
    titleAr: "تطبيق معيار التقارير المالية الدولي IFRS 15 خطوة بخطوة",
    titleEn: "Step-by-Step Implementation of IFRS 15 for Contract Revenue",
    excerptAr: "استكشف النموذج الخماسي للاعتراف بالإيراد من عقود العملاء وحل المعضلات المحاسبية في شركات المقاولات والاشتراكات البرمجية.",
    excerptEn: "Explore the 5-step revenue recognition model under the IFRS 15 framework and resolve practical issues for multi-period projects.",
    contentAr: [
      "يعد معيار التقارير المالية الدولي IFRS 15 أحد أهم وأحدث المعايير المنظمة للاعتراف بالإيرادات الناتجة عن العقود المبرمة مع العملاء. ويهدف المعيار إلى توحيد طريقة التقاط الإيراد عبر كافة القطاعات والصناعات.",
      "يرتكز هذا المعيار الهام على نموذج يتألف من خمس خطوات محددة: تحديد العقد مع العميل، تحديد التزامات الأداء المنفصلة، تحديد سعر المعاملة، توزيع سعر المعاملة على التزامات الأداء، وأخيراً الاعتراف بالإيراد عند الوفاء بكل التزام.",
      "تطبيق هذا النموذج يتطلب دقة شديدة وخصوصاً في العقود الممتدة على فترات زمنية طويلة مثل شركات الإنشاء والمقاولات، أو شركات تقديم الخدمات البرمجية السحابية القائمة على نماذج الاشتراكات الشهرية والسنوية.",
      "من خلال هذا المقال نوضح كيف يسهم تطبيق المعيار بحيادية في رفع شفافية التقارير السنوية وتجنيب الشركات غرامات التلاعب الضريبي أو تضخيم الأرباح بشكل غير مشروع."
    ],
    contentEn: [
      "IFRS 15 establishes a comprehensive framework for determining when and how much revenue should be recognized. The standard replaces older guidance and unifies concepts across all industries globally.",
      "The heart of IFRS 15 lies in the rigorous 5-step model: Identify the contract with the customer, identify distinct performance obligations, determine the transaction price, allocate the transaction price, and recognize revenue when performance obligations are met.",
      "Implementing this model requires careful professional judgment, particularly for long-term construction projects or multi-element software service subscriptions with deferred setup operations.",
      "In this analysis, we provide complete comparative tables showcasing the difference between traditional recognition and the standardized IFRS 15 workflow to assist in flawless compliance."
    ],
    author: AUTHORS.robert,
    date: "2026-07-08",
    category: "ifrs",
    tags: ["IFRS", "Standards", "Revenue", "Compliance"],
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    likesCount: 52
  },
  {
    id: 'art-analysis-1',
    slug: 'financial-analysis-strategic-decisions',
    titleAr: "التحليل المالي كأداة لقيادة القرارات الإستراتيجية في الشركات",
    titleEn: "Financial Analysis as a Tool for Strategic Corporate Decisions",
    excerptAr: "كيف يمكن لتحليل نسب السيولة والربحية والملاءة المالية أن يغير مسار إدارة المنشأة ويفتح آفاقاً جديدة للنمو والاستثمار الذكي.",
    excerptEn: "How utilizing liquidity, profitability, and solvency ratio matrices can guide board decisions and open up massive venture opportunities.",
    contentAr: [
      "لا تقتصر أهمية البيانات المحاسبية على مجرد تسجيل المعاملات وضبط الصادر والوارد؛ بل تكمن القيمة الحقيقية في تحويل تلك الأرقام الصامتة إلى لوحات معلومات ناطقة تدعم متخذ القرار.",
      "من خلال التحليل المالي للأوراق والقوائم المالية (الميزانية، قائمة الدخل، وقائمة التدفقات النقدية)، يستطيع المحللون الماليون تشخيص الحالة الصحية للشركة بدقة، وتحديد مواطن القوة والضعف في الأداء التشغيلي والائتماني.",
      "النسب المالية مثل نسبة السيولة السريعة، العائد على الاستثمار (ROI)، ونسبة مديونية الأصول تكشف بوضوح مدى مرونة الشركة وقدرتها على سداد التزاماتها والتوسع الذاتي دون التعرض لمخاطر الإفلاس المفاجئ.",
      "سنتناول في هذه الأطروحة طرق قراءة المؤشرات المالية وتقديمها لمجلس الإدارة في قوالب بصرية تفاعلية تفضي إلى اتخاذ قرارات مصيرية لزيادة قيمة أسهم الشركة وتأمين استقراراها المستقبلي."
    ],
    contentEn: [
      "Financial registers are not just passive tables showing historical ledger activities; their true capacity is unlocked when raw accounts are synthesized into strategic foresight indicators.",
      "Through methodical financial analysis of the balance sheet, income statement, and cash flow reports, analysts can perform comprehensive audits of a firm's operational and solvency status.",
      "Measures like the Quick Ratio, Return on Equity (ROE), and Debt-to-Equity parameters paint a vivid picture of a company's ability to finance new developments without over-leveraging.",
      "This publication reviews best practices for presenting complex financial metrics in high-level executive summaries that lead to sound fiscal and investment management choices."
    ],
    author: AUTHORS.ahmed,
    date: "2026-07-05",
    category: "analysis",
    tags: ["Analysis", "Strategy", "Finance", "Growth"],
    imageUrl: "https://images.unsplash.com/photo-1543286386-7a393473c6a4?auto=format&fit=crop&w=800&q=80",
    likesCount: 29
  },
  {
    id: 'art-tax-1',
    slug: 'tax-amendments-2026-small-business',
    titleAr: "أحدث التعديلات الضريبية وتأثيرها على المشاريع الناشئة",
    titleEn: "Latest Tax Amendments and Their Impact on Startups",
    excerptAr: "مراجعة عملية لأهم القوانين والتعليمات التنفيذية الضريبية الجديدة، وكيفية إعداد الإقرارات لتفادي الغرامات المالية الباهظة.",
    excerptEn: "A practical guide to the newest domestic tax filing regulations and how to optimize your declarations safely.",
    contentAr: [
      "تشهد البيئة التشريعية الضريبية في المنطقة العربية تحولات وتحديثات متسارعة لدعم الاقتصاد الوطني وتعزيز مستويات الحوكمة المالية. ويمثل فهم هذه القواعد خط الأمان الأول لأي مشروع ناشئ.",
      "شملت التعديلات الأخيرة إعادة هيكلة الشرائح الضريبية للشركات الصغيرة، ووضع حوافز تشجيعية للمشروعات الرقمية والتكنولوجية، بالإضافة إلى تدابير صارمة لمكافحة التهرب الضريبي وضبط تقديم الإقرارات الربع سنوية والسنوية.",
      "عدم الإلمام الكافي بمواعيد تقديم الإقرارات وخصم ضريبة القيمة المضافة قد يكلف الشركات الصغيرة مبالغ طائلة ناتجة عن الغرامات التأخيرية والنزاعات القانونية العقيمة مع المصالح الحكومية الضريبية.",
      "نقدم في هذا المقال خريطة طريق واضحة وجدولاً زمنياً لمواعيد الالتزامات والمدفوعات، مع نصائح ذهبية لخصم النفقات التشغيلية بشكل قانوني وسليم لتقليل العبء الضريبي الإجمالي للشركات."
    ],
    contentEn: [
      "The regulatory tax domain is undergoing rapid modernization to align corporate operations with regional transparency directives. Staying compliant represents a critical safety buffer for small businesses.",
      "The latest legal updates introduce redesigned brackets for small corporate entities, special exemptions for digital services, and tighter schedules for quarterly VAT filing declarations.",
      "Missing critical tax settlement deadlines or failing to appropriately claim valid deductibles can severely drain capital reserves and expose startups to painful penalty reviews.",
      "This writeup outlines a reliable compliance schedule and covers strategies to legally claim operational deductions in full accordance with the tax code guidelines."
    ],
    author: AUTHORS.ahmed,
    date: "2026-07-02",
    category: "tax",
    tags: ["Tax", "Law", "Corporate", "Compliance"],
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    likesCount: 45
  }
];

export default function ProfessionalBlog() {
  const { i18n, t } = useTranslation();
  const isRtl = i18n.language === 'ar';
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  // Scroll to top on active slug change
  const topRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [slug]);

  // 1. Core State
  const [articles, setArticles] = useState<Article[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('professional_blog_articles');
      return saved ? JSON.parse(saved) : INITIAL_ARTICLES;
    }
    return INITIAL_ARTICLES;
  });

  const [likesState, setLikesState] = useState<{ [key: string]: boolean }>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('professional_blog_likes');
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  const [commentsState, setCommentsState] = useState<{ [key: string]: BlogComment[] }>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('professional_blog_comments');
      if (saved) return JSON.parse(saved);
    }
    // Pre-populate some starter comments
    return {
      'excel-vba-journal-automation': [
        {
          id: 'c1',
          authorName: isRtl ? "م. خالد عبدالله" : "Khaled Abdullah",
          avatarId: 1,
          content: isRtl 
            ? "شرح رائع كالعادة أستاذ روبير. الكود يعمل بشكل ممتاز ووفر علي ساعات من ترحيل قيود المبيعات يدويًا." 
            : "Exceptional explanation! The VBA code is clean and saves me countless hours of posting sales vouchers daily.",
          timestamp: "2026-07-12"
        },
        {
          id: 'c2',
          authorName: isRtl ? "أماني السيد" : "Amani El-Sayed",
          avatarId: 3,
          content: isRtl 
            ? "هل يمكن تطبيق هذا الماكرو للربط المباشر مع قاعدة بيانات SQL؟ وشكراً جزيلاً." 
            : "Can this macro be adapted to connect directly to an external database? Thank you!",
          timestamp: "2026-07-13"
        }
      ],
      'ifrs15-revenue-contract-guide': [
        {
          id: 'c3',
          authorName: isRtl ? "يوسف الهاشمي" : "Yousef Al-Hashemi",
          avatarId: 2,
          content: isRtl 
            ? "أوضح مقال قرأته عن المعيار 15. الخطوة الرابعة (توزيع السعر) دائمًا ما تسبب لبسًا لمتدربينا." 
            : "The absolute best summary of IFRS 15. Step 4 (allocation) is usually very challenging, but you made it crystal clear.",
          timestamp: "2026-07-11"
        }
      ]
    };
  });

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  // Interactive share toast
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  // New comment draft state
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentContent, setNewCommentContent] = useState('');
  const [newCommentAvatar, setNewCommentAvatar] = useState<number>(1);

  // New article author write state (Admin simulation)
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [newArtTitleAr, setNewArtTitleAr] = useState('');
  const [newArtTitleEn, setNewArtTitleEn] = useState('');
  const [newArtExcerptAr, setNewArtExcerptAr] = useState('');
  const [newArtExcerptEn, setNewArtExcerptEn] = useState('');
  const [newArtContentAr, setNewArtContentAr] = useState('');
  const [newArtContentEn, setNewArtContentEn] = useState('');
  const [newArtCategory, setNewArtCategory] = useState<'vba' | 'ifrs' | 'tax' | 'analysis'>('vba');
  const [newArtTags, setNewArtTags] = useState('Excel, Accounting');
  const [newArtImageUrl, setNewArtImageUrl] = useState('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80');

  // Active Reading Progress Bar calculation
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!slug) return;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const scrolled = (window.scrollY / docHeight) * 100;
        setScrollPercentage(scrolled);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('professional_blog_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('professional_blog_likes', JSON.stringify(likesState));
  }, [likesState]);

  useEffect(() => {
    localStorage.setItem('professional_blog_comments', JSON.stringify(commentsState));
  }, [commentsState]);

  // Find active article based on slug parameter
  const activeArticle = useMemo(() => {
    if (!slug) return null;
    return articles.find(art => art.slug === slug) || null;
  }, [slug, articles]);

  // Dynamic Word Count & Reading Time Calculation
  const calculateReadingTime = (article: Article) => {
    const content = isRtl ? article.contentAr.join(' ') : article.contentEn.join(' ');
    const wordCount = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / 180); // Average 180 words per min
    return minutes;
  };

  // List of all unique tags in existing articles
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    articles.forEach(art => art.tags.forEach(t => tagsSet.add(t)));
    return Array.from(tagsSet);
  }, [articles]);

  // Filtered Articles list
  const filteredArticles = useMemo(() => {
    return articles.filter(art => {
      const title = isRtl ? art.titleAr : art.titleEn;
      const excerpt = isRtl ? art.excerptAr : art.excerptEn;
      const content = isRtl ? art.contentAr.join(' ') : art.contentEn.join(' ');
      const searchLower = searchQuery.toLowerCase();

      const matchesSearch = title.toLowerCase().includes(searchLower) ||
                            excerpt.toLowerCase().includes(searchLower) ||
                            content.toLowerCase().includes(searchLower);

      const matchesCategory = selectedCategory === 'all' || art.category === selectedCategory;
      const matchesTag = selectedTag === 'all' || art.tags.includes(selectedTag);

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [articles, searchQuery, selectedCategory, selectedTag, isRtl]);

  // Related Articles matching (exclude active article, match category or tags)
  const relatedArticles = useMemo(() => {
    if (!activeArticle) return [];
    return articles
      .filter(art => art.id !== activeArticle.id)
      .filter(art => art.category === activeArticle.category || art.tags.some(t => activeArticle.tags.includes(t)))
      .slice(0, 3);
  }, [activeArticle, articles]);

  // Actions
  const handleLikeToggle = (articleId: string) => {
    const isAlreadyLiked = likesState[articleId];
    setLikesState(prev => ({
      ...prev,
      [articleId]: !isAlreadyLiked
    }));

    setArticles(prev => prev.map(art => {
      if (art.id === articleId) {
        return {
          ...art,
          likesCount: isAlreadyLiked ? art.likesCount - 1 : art.likesCount + 1
        };
      }
      return art;
    }));
  };

  // Add Comment Action
  const handleAddComment = (e: React.FormEvent, articleSlug: string) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentContent.trim()) return;

    const newComment: BlogComment = {
      id: `comm-${Date.now()}`,
      authorName: newCommentName,
      avatarId: newCommentAvatar,
      content: newCommentContent,
      timestamp: new Date().toISOString().split('T')[0]
    };

    setCommentsState(prev => {
      const currentComments = prev[articleSlug] || [];
      return {
        ...prev,
        [articleSlug]: [newComment, ...currentComments]
      };
    });

    // Reset inputs
    setNewCommentName('');
    setNewCommentContent('');
    setNewCommentAvatar(Math.floor(Math.random() * 4) + 1);
  };

  const handleDeleteComment = (articleSlug: string, commentId: string) => {
    setCommentsState(prev => {
      const currentComments = prev[articleSlug] || [];
      return {
        ...prev,
        [articleSlug]: currentComments.filter(c => c.id !== commentId)
      };
    });
  };

  // Share Actions
  const handleCopyLink = (slugString: string) => {
    const fullUrl = `${window.location.origin}/blog/${slugString}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopiedSlug(slugString);
      setTimeout(() => setCopiedSlug(null), 3000);
    });
  };

  // Add Dynamic Article (Admin Mode Simulation)
  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArtTitleAr || !newArtTitleEn || !newArtContentAr || !newArtContentEn) {
      alert(isRtl ? 'يرجى كتابة العنوان والمحتوى باللغتين أولاً' : 'Please complete Titles and Contents in both languages.');
      return;
    }

    // Generate SEO friendly URL slug
    const cleanSlug = newArtTitleEn
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const tagsArr = newArtTags.split(',').map(t => t.trim()).filter(Boolean);

    const newArtObj: Article = {
      id: `art-custom-${Date.now()}`,
      slug: cleanSlug || `article-${Date.now()}`,
      titleAr: newArtTitleAr,
      titleEn: newArtTitleEn,
      excerptAr: newArtExcerptAr || newArtContentAr.substring(0, 100) + '...',
      excerptEn: newArtExcerptEn || newArtContentEn.substring(0, 100) + '...',
      contentAr: newArtContentAr.split('\n').filter(Boolean),
      contentEn: newArtContentEn.split('\n').filter(Boolean),
      author: AUTHORS.robert,
      date: new Date().toISOString().split('T')[0],
      category: newArtCategory,
      tags: tagsArr.length > 0 ? tagsArr : ["Professional"],
      imageUrl: newArtImageUrl || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
      likesCount: 5
    };

    setArticles(prev => [newArtObj, ...prev]);

    // Reset
    setNewArtTitleAr('');
    setNewArtTitleEn('');
    setNewArtExcerptAr('');
    setNewArtExcerptEn('');
    setNewArtContentAr('');
    setNewArtContentEn('');
    setNewArtTags('Excel, Accounting');
    setShowAdminForm(false);
  };

  const handleDeleteArticle = (articleId: string) => {
    if (confirm(isRtl ? "هل أنت متأكد من حذف هذه المقالة؟" : "Are you sure you want to delete this article?")) {
      setArticles(prev => prev.filter(art => art.id !== articleId));
      if (slug && activeArticle?.id === articleId) {
        navigate('/blog');
      }
    }
  };

  // Avatar lookup
  const AVATARS = [
    { id: 1, url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" },
    { id: 2, url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" },
    { id: 3, url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" },
    { id: 4, url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" },
  ];

  return (
    <div ref={topRef} className="relative min-h-screen">
      
      {/* Scroll indicator for reading active article */}
      {slug && activeArticle && (
        <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-slate-100 dark:bg-slate-800">
          <div 
            className="h-full bg-linear-to-r from-amber-500 to-orange-600 transition-all duration-75"
            style={{ width: `${scrollPercentage}%` }}
          />
        </div>
      )}

      {/* Hero Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 rounded-full text-xs font-black border border-amber-100 dark:border-amber-900/40 shadow-xs"
          >
            <Compass className="w-4 h-4 text-amber-500 animate-spin-slow" />
            <span>{isRtl ? "المستودع العلمي والمهني المتكامل" : "Enterprise Accounting & Tech Hub"}</span>
          </motion.div>

          <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight">
            {isRtl ? (
              <>المدونة <span className="gradient-text">المحاسبية والتقنية</span> المهنية</>
            ) : (
              <>Professional <span className="gradient-text">Finance & Code</span> Blog</>
            )}
          </h1>

          <p className="text-[15px] md:text-[17px] leading-[1.7] text-slate-500 dark:text-neutral-400 font-medium">
            {isRtl ? (
              "شروحات متقدمة، مراجعات معايير التقارير IFRS، أكواد ماكرو VBA عملية، وتحليلات مالية دقيقة تقدم من كبار المستشارين."
            ) : (
              "Deep technical walkthroughs, IFRS auditing insights, Excel VBA code blueprints, and tax compliance advice built by real financial consultants."
            )}
          </p>
        </div>

        {/* Categories Tab selector - visible when looking at lists */}
        {!slug && (
          <div className="flex flex-wrap justify-center gap-2 mb-10 pb-2 border-b border-slate-100 dark:border-slate-800">
            <button
              onClick={() => { setSelectedCategory('all'); setSelectedTag('all'); }}
              className={cn(
                "px-5 py-2.5 rounded-full text-xs font-black transition-all cursor-pointer border",
                selectedCategory === 'all' && selectedTag === 'all'
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 border-slate-900 dark:border-white shadow-md"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-neutral-400 border-slate-200 dark:border-slate-800 hover:bg-slate-50"
              )}
            >
              {isRtl ? "الكل" : "Show All"}
            </button>
            
            {(['vba', 'ifrs', 'analysis', 'tax'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setSelectedTag('all'); }}
                className={cn(
                  "px-5 py-2.5 rounded-full text-xs font-black transition-all cursor-pointer border",
                  selectedCategory === cat
                    ? "bg-amber-600 border-amber-600 text-white shadow-md"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-neutral-400 border-slate-200 dark:border-slate-800 hover:bg-slate-50"
                )}
              >
                {cat === 'vba' && (isRtl ? "برمجة إكسل VBA" : "VBA Macros")}
                {cat === 'ifrs' && (isRtl ? "المعايير الدولية (IFRS)" : "IFRS Standards")}
                {cat === 'analysis' && (isRtl ? "التحليل المالي" : "Financial Analysis")}
                {cat === 'tax' && (isRtl ? "المحاسبة الضريبية" : "Tax Consulting")}
              </button>
            ))}

            {/* Quick Toggle Creator Mode */}
            <button
              onClick={() => setShowAdminForm(!showAdminForm)}
              className="px-5 py-2.5 rounded-full text-xs font-black transition-all cursor-pointer border border-dashed border-amber-500/60 text-amber-600 dark:text-amber-400 hover:bg-amber-50/50 flex items-center gap-2 ml-auto"
            >
              <Plus className="w-4 h-4" />
              <span>{isRtl ? "كتابة مقال جديد" : "Write Article"}</span>
            </button>
          </div>
        )}

        {/* Admin Article Creation Modal/Section */}
        <AnimatePresence>
          {showAdminForm && !slug && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 mb-10 overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <h3 className="font-black text-sm text-slate-900 dark:text-white">
                    {isRtl ? "إضافة مقالة مهنية جديدة للنظام" : "Create New Professional Article"}
                  </h3>
                </div>
                <button 
                  onClick={() => setShowAdminForm(false)} 
                  className="text-xs font-black text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {isRtl ? "إلغاء" : "Cancel"}
                </button>
              </div>

              <form onSubmit={handleCreateArticle} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-black text-slate-400 mb-1">{isRtl ? "العنوان بالعربية" : "Title (Arabic)"} *</label>
                    <input 
                      type="text" 
                      required
                      placeholder={isRtl ? "مثال: مهارات إكسل للمدراء الماليين" : "Arabic title..."}
                      value={newArtTitleAr}
                      onChange={(e) => setNewArtTitleAr(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-400 mb-1">{isRtl ? "المقتطف بالعربية" : "Excerpt (Arabic)"}</label>
                    <textarea 
                      rows={2}
                      placeholder={isRtl ? "نبذة سريعة تظهر في الواجهة..." : "Arabic excerpt..."}
                      value={newArtExcerptAr}
                      onChange={(e) => setNewArtExcerptAr(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-400 mb-1">{isRtl ? "المحتوى بالعربية (فقرات مفصلة)" : "Content (Arabic - multi line)"} *</label>
                    <textarea 
                      rows={6}
                      required
                      placeholder={isRtl ? "اكتب تفاصيل الشرح هنا..." : "Arabic content paragraphs..."}
                      value={newArtContentAr}
                      onChange={(e) => setNewArtContentAr(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-black text-slate-400 mb-1">{isRtl ? "العنوان بالإنجليزية" : "Title (English)"} *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Excel VBA Solvency Models"
                      value={newArtTitleEn}
                      onChange={(e) => setNewArtTitleEn(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-400 mb-1">{isRtl ? "المقتطف بالإنجليزية" : "Excerpt (English)"}</label>
                    <textarea 
                      rows={2}
                      placeholder="Brief excerpt for card listing..."
                      value={newArtExcerptEn}
                      onChange={(e) => setNewArtExcerptEn(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-400 mb-1">{isRtl ? "المحتوى بالإنجليزية (فقرات مفصلة)" : "Content (English - multi line)"} *</label>
                    <textarea 
                      rows={6}
                      required
                      placeholder="Write technical steps here..."
                      value={newArtContentEn}
                      onChange={(e) => setNewArtContentEn(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-medium"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-black text-slate-400 mb-1">{isRtl ? "القسم" : "Category"}</label>
                    <select 
                      value={newArtCategory}
                      onChange={(e: any) => setNewArtCategory(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold"
                    >
                      <option value="vba">{isRtl ? "برمجة إكسل VBA" : "VBA Macros"}</option>
                      <option value="ifrs">{isRtl ? "المعايير الدولية" : "IFRS Standards"}</option>
                      <option value="analysis">{isRtl ? "التحليل المالي" : "Financial Analysis"}</option>
                      <option value="tax">{isRtl ? "المحاسبة الضريبية" : "Tax Consulting"}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-400 mb-1">{isRtl ? "الوسوم (مفصولة بفاصلة)" : "Tags (comma separated)"}</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Budget, Forecasting, Code"
                      value={newArtTags}
                      onChange={(e) => setNewArtTags(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-black text-slate-400 mb-1">{isRtl ? "رابط الصورة التوضيحية" : "Cover Image URL"}</label>
                    <input 
                      type="text" 
                      placeholder="https://images.unsplash.com/..."
                      value={newArtImageUrl}
                      onChange={(e) => setNewArtImageUrl(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-bold"
                    />
                  </div>
                </div>

                <div className="md:col-span-2 flex justify-end gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-xl text-xs font-black bg-amber-600 hover:bg-amber-700 text-white cursor-pointer border-none shadow-md"
                  >
                    {isRtl ? "نشر المقالة فوراً" : "Publish Article Now"}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* -------------------- 
            A: DETAILED ARTICLE VIEW
            -------------------- */}
        {slug && activeArticle ? (
          <motion.div
            key="article-detail"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Left Column: Core Article Body & Comments (8 cols) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Back Navigation Bar */}
              <button
                onClick={() => navigate('/blog')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl text-xs font-bold text-slate-600 dark:text-neutral-300 transition-all cursor-pointer"
              >
                {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                <span>{isRtl ? "العودة لقائمة المقالات" : "Back to Articles"}</span>
              </button>

              {/* Core Post Cover Card */}
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-[2rem] overflow-hidden shadow-xl">
                {/* Image aspect-video */}
                <div className="relative h-[250px] md:h-[400px]">
                  <img 
                    src={activeArticle.imageUrl} 
                    alt={isRtl ? activeArticle.titleAr : activeArticle.titleEn} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Floating category badge */}
                  <div className="absolute top-6 left-6 bg-amber-600/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black text-white uppercase tracking-wider shadow-md">
                    {activeArticle.category === 'vba' && (isRtl ? "برمجة إكسل VBA" : "VBA Macros")}
                    {activeArticle.category === 'ifrs' && (isRtl ? "المعايير الدولية (IFRS)" : "IFRS")}
                    {activeArticle.category === 'analysis' && (isRtl ? "التحليل المالي" : "Financial")}
                    {activeArticle.category === 'tax' && (isRtl ? "الضرائب" : "Taxation")}
                  </div>

                  {/* Title & Stats absolute bottom */}
                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                    <h2 className="text-xl md:text-3xl font-black leading-tight drop-shadow-md">
                      {isRtl ? activeArticle.titleAr : activeArticle.titleEn}
                    </h2>

                    {/* Metadata indicators */}
                    <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-300 drop-shadow-sm">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        <span>{activeArticle.date}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>{calculateReadingTime(activeArticle)} {isRtl ? "دقائق قراءة" : "min read"}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                        <span>{activeArticle.likesCount} {isRtl ? "إعجاب" : "likes"}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Article Content Container */}
                <div className="p-6 md:p-10 space-y-6">
                  {/* Render Paragraphs */}
                  <div className="space-y-6 text-[15px] md:text-[17px] leading-[1.8] text-slate-600 dark:text-neutral-300 font-medium">
                    {(isRtl ? activeArticle.contentAr : activeArticle.contentEn).map((paragraph, index) => (
                      <p key={index} className="indent-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Tags Listing */}
                  <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-black text-slate-400 flex items-center gap-1.5 mr-2">
                      <Tag className="w-3.5 h-3.5" />
                      <span>{isRtl ? "الوسوم:" : "Tags:"}</span>
                    </span>
                    {activeArticle.tags.map(tag => (
                      <span 
                        key={tag}
                        onClick={() => { setSelectedTag(tag); navigate('/blog'); }}
                        className="px-3 py-1 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 border border-slate-150 dark:border-slate-800 text-xs font-bold text-slate-500 dark:text-neutral-400 rounded-lg cursor-pointer transition-all"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer interaction bar: Likes, Share, Bookmark */}
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 -mx-6 md:-mx-10 -mb-6 md:-mb-10 p-6">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleLikeToggle(activeArticle.id)}
                        className={cn(
                          "px-4 py-2.5 rounded-xl text-xs font-black border transition-all cursor-pointer flex items-center gap-2",
                          likesState[activeArticle.id]
                            ? "bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950/40 dark:border-rose-900/65 dark:text-rose-400"
                            : "bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-neutral-300"
                        )}
                      >
                        <Heart className={cn("w-4 h-4", likesState[activeArticle.id] ? "fill-rose-500 text-rose-500" : "text-slate-400")} />
                        <span>
                          {likesState[activeArticle.id] ? (isRtl ? "أعجبك المقال" : "Liked") : (isRtl ? "أعجبني" : "Like")}
                        </span>
                      </button>

                      {/* Copied visual notification */}
                      <button
                        onClick={() => handleCopyLink(activeArticle.slug)}
                        className="bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 px-4 py-2.5 rounded-xl text-xs font-black text-slate-600 dark:text-neutral-300 transition-all cursor-pointer flex items-center gap-2"
                      >
                        {copiedSlug === activeArticle.slug ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-500" />
                            <span className="text-emerald-600 dark:text-emerald-400">{isRtl ? "تم نسخ الرابط!" : "Copied Link!"}</span>
                          </>
                        ) : (
                          <>
                            <Share2 className="w-4 h-4 text-amber-500" />
                            <span>{isRtl ? "مشاركة الرابط" : "Share URL"}</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Social Media fast sharing buttons */}
                    <div className="flex items-center gap-2">
                      <a 
                        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`${isRtl ? activeArticle.titleAr : activeArticle.titleEn} - ${window.location.origin}/blog/${activeArticle.slug}`)}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 dark:bg-emerald-950/30 rounded-xl transition-all"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.858.002-2.634-1.013-5.11-2.861-6.961-1.848-1.85-4.316-2.869-6.961-2.87-5.438 0-9.864 4.422-9.868 9.861-.001 1.742.49 3.442 1.423 4.914l-.992 3.626 3.71-.973zm13.102-7.493c-.3-.15-1.772-.875-2.046-.975-.276-.1-.476-.15-.676.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.265-.467-2.41-1.485-.89-.793-1.49-1.773-1.665-2.073-.175-.3-.019-.463.13-.612.135-.133.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.676-1.625-.925-2.225-.244-.582-.49-.5-.675-.51-.174-.01-.374-.012-.574-.012s-.525.075-.8.375c-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.11 3.22 5.11 4.52.714.31 1.27.496 1.703.635.716.227 1.368.195 1.883.118.574-.085 1.772-.725 2.022-1.425.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35z"/></svg>
                      </a>
                      <a 
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${window.location.origin}/blog/${activeArticle.slug}`)}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-600 dark:bg-blue-950/30 rounded-xl transition-all"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Author Bio Section */}
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 md:p-8 rounded-[2rem] shadow-md flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <img 
                  src={activeArticle.author.avatar} 
                  alt="" 
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-500 shadow-md"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-2 text-center sm:text-right md:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="font-black text-lg text-slate-950 dark:text-white">
                      {isRtl ? activeArticle.author.nameAr : activeArticle.author.nameEn}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-950/40 text-[10px] font-black text-amber-600 dark:text-amber-400 rounded-full border border-amber-100/60 dark:border-amber-900/40">
                      <Award className="w-3.5 h-3.5" />
                      <span>{isRtl ? "مستشار مرخص" : "Certified Consultant"}</span>
                    </span>
                  </div>
                  <h4 className="text-xs font-black text-slate-400">
                    {isRtl ? activeArticle.author.roleAr : activeArticle.author.roleEn}
                  </h4>
                  <p className="text-xs leading-relaxed text-slate-500 dark:text-neutral-400 font-semibold">
                    {isRtl ? activeArticle.author.bioAr : activeArticle.author.bioEn}
                  </p>
                </div>
              </div>

              {/* Comments Section */}
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 p-6 md:p-10 rounded-[2rem] shadow-lg space-y-8">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <MessageSquare className="w-6 h-6 text-amber-500" />
                  <h3 className="font-black text-md text-slate-950 dark:text-white">
                    {isRtl ? "التعليقات والمناقشات المهنية" : "Professional Comments & Discussions"}
                  </h3>
                  <span className="px-2.5 py-1 bg-slate-50 dark:bg-slate-950 rounded-full text-xs font-black text-slate-500">
                    {(commentsState[activeArticle.slug] || []).length}
                  </span>
                </div>

                {/* New Comment Draft Form */}
                <form onSubmit={(e) => handleAddComment(e, activeArticle.slug)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-black text-slate-400 mb-1">{isRtl ? "اسمك الكريم" : "Your Name"} *</label>
                      <input 
                        type="text" 
                        required
                        placeholder={isRtl ? "مثال: أ. محمد الحربي" : "Your name..."}
                        value={newCommentName}
                        onChange={(e) => setNewCommentName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 font-bold"
                      />
                    </div>

                    {/* Avatar selection */}
                    <div>
                      <label className="block text-xs font-black text-slate-400 mb-1">{isRtl ? "اختر أيقونة شخصية" : "Select Profile Avatar"}</label>
                      <div className="flex gap-2">
                        {AVATARS.map(av => (
                          <button
                            key={av.id}
                            type="button"
                            onClick={() => setNewCommentAvatar(av.id)}
                            className={cn(
                              "w-10 h-10 rounded-xl overflow-hidden border-2 cursor-pointer transition-all",
                              newCommentAvatar === av.id ? "border-amber-500 scale-105" : "border-transparent opacity-60 hover:opacity-100"
                            )}
                          >
                            <img src={av.url} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-slate-400 mb-1">{isRtl ? "التعليق أو الاستفسار" : "Comment or Question"} *</label>
                    <textarea 
                      rows={3}
                      required
                      placeholder={isRtl ? "اكتب تعليقك هنا لتبادل الخبرات والآراء..." : "Write your expert opinion or questions..."}
                      value={newCommentContent}
                      onChange={(e) => setNewCommentContent(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl text-xs bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 font-semibold"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl text-xs font-black bg-slate-950 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-150 text-white dark:text-slate-950 transition-all cursor-pointer border-none flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isRtl ? "نشر التعليق" : "Post Comment"}</span>
                    </button>
                  </div>
                </form>

                {/* Comments List */}
                <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  {(commentsState[activeArticle.slug] || []).length > 0 ? (
                    (commentsState[activeArticle.slug] || []).map(comment => {
                      const avUrl = AVATARS.find(av => av.id === comment.avatarId)?.url || AVATARS[0].url;
                      return (
                        <div key={comment.id} className="p-4 bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100/80 dark:border-slate-850/60 rounded-2xl flex items-start gap-4">
                          <img src={avUrl} alt="" className="w-10 h-10 rounded-xl object-cover shadow-xs" referrerPolicy="no-referrer" />
                          <div className="space-y-1.5 flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-xs font-black text-slate-900 dark:text-white">{comment.authorName}</h4>
                              <div className="flex items-center gap-3">
                                <span className="text-[10px] text-slate-400 font-bold">{comment.timestamp}</span>
                                <button
                                  onClick={() => handleDeleteComment(activeArticle.slug, comment.id)}
                                  className="text-slate-400 hover:text-rose-600 transition-all cursor-pointer p-1"
                                  title={isRtl ? "حذف التعليق" : "Delete Comment"}
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-neutral-300 font-medium leading-relaxed">
                              {comment.content}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-6 text-xs font-semibold text-slate-400">
                      {isRtl ? "لا توجد تعليقات بعد. شارك برأيك وكن أول المعلقين!" : "No comments yet. Share your experience and start the conversation!"}
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Right Column: Active Article Sidebar (Related Articles, Categories) */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Related Articles list */}
              {relatedArticles.length > 0 && (
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-[2rem] shadow-md space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                    <span>{isRtl ? "مقالات ذات صلة" : "Related Articles"}</span>
                  </h3>
                  
                  <div className="space-y-4">
                    {relatedArticles.map(art => (
                      <Link
                        key={art.id}
                        to={`/blog/${art.slug}`}
                        className="group flex gap-3 items-start p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-950/60 transition-all text-slate-800 dark:text-neutral-100"
                      >
                        <img 
                          src={art.imageUrl} 
                          alt="" 
                          className="w-16 h-16 rounded-xl object-cover shadow-inner group-hover:scale-105 transition-all"
                          referrerPolicy="no-referrer"
                        />
                        <div className="space-y-1 flex-1">
                          <h4 className="text-xs font-black leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-all line-clamp-2">
                            {isRtl ? art.titleAr : art.titleEn}
                          </h4>
                          <span className="text-[10px] text-slate-400 font-bold block">{art.date}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Consultation Ad Callout */}
              <div className="bg-linear-to-br from-slate-900 to-slate-950 border border-slate-800 p-6 rounded-[2rem] text-center text-white space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
                <BookOpen className="w-8 h-8 text-amber-500 mx-auto animate-bounce" />
                
                <h3 className="font-black text-md leading-snug">
                  {isRtl ? "هل تبحث عن خدمات استشارية خاصة؟" : "Seeking Custom Enterprise Systems?"}
                </h3>
                <p className="text-[11px] text-slate-400 font-medium">
                  {isRtl 
                    ? "يقدم مستشارونا خدمات تصميم أنظمة مالية برمجية مخصصة للشركات، لوحات Power BI ومراجعات القيود وتطوير الماكرو."
                    : "Our professional advisors design custom automated work environments and custom VBA engines for major corporations."}
                </p>
                <Link
                  to="/contact"
                  className="inline-block w-full bg-amber-600 hover:bg-amber-700 text-white font-black py-2.5 rounded-xl text-xs transition-all border-none"
                >
                  {isRtl ? "تواصل معنا للاستفسار" : "Contact Advisors Now"}
                </Link>
              </div>

            </div>
          </motion.div>
        ) : (
          /* -------------------- 
              B: ARTICLES LIST VIEW
              -------------------- */
          <div className="space-y-10">
            {/* Custom Banner Advertisement at top of feed */}
            <AdsRenderer type="banner" isRtl={isRtl} className="shadow-md" />
            
            {/* Search and Filters container */}
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 shadow-xs flex flex-col md:flex-row items-center gap-4">
              <div className="relative w-full md:flex-1">
                <Search className="absolute right-4 top-3.5 w-4 h-4 text-slate-400" />
                <input 
                  type="text"
                  placeholder={isRtl ? "ابحث عن مقالة بالكلمات الدليلة، التقنية، أو الكاتب..." : "Search articles by title, keywords, or content..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-neutral-100"
                />
              </div>

              {/* Tag Selection filter reset indicator */}
              {selectedTag !== 'all' && (
                <div className="px-4 py-2 bg-amber-50 dark:bg-amber-950/40 text-xs font-bold text-amber-600 rounded-full border border-amber-200 flex items-center gap-2">
                  <span>{isRtl ? `الوسم: #${selectedTag}` : `Tag: #${selectedTag}`}</span>
                  <button onClick={() => setSelectedTag('all')} className="font-black text-rose-500 cursor-pointer">✕</button>
                </div>
              )}
            </div>

            {/* Articles Grid */}
            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((art, index) => (
                  <React.Fragment key={art.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-[2rem] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                    >
                      {/* Cover image area */}
                      <div className="relative h-[200px] overflow-hidden">
                        <img 
                          src={art.imageUrl} 
                          alt="" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 to-transparent" />
                        
                        {/* Admin delete custom article option */}
                        {art.id.startsWith('art-custom-') && (
                          <button
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDeleteArticle(art.id); }}
                            className="absolute top-4 right-4 p-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl transition-all shadow-md z-10 cursor-pointer"
                            title={isRtl ? "حذف المقال" : "Delete Article"}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}

                        {/* Floating Category Tag */}
                        <span className="absolute bottom-4 left-4 bg-amber-600 text-white text-[9px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                          {art.category === 'vba' && (isRtl ? "برمجة VBA" : "VBA Macros")}
                          {art.category === 'ifrs' && (isRtl ? "معايير IFRS" : "IFRS Standards")}
                          {art.category === 'analysis' && (isRtl ? "التحليل المالي" : "Financial")}
                          {art.category === 'tax' && (isRtl ? "الضرائب" : "Tax Consulting")}
                        </span>
                      </div>

                      {/* Card Content */}
                      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                        <div className="space-y-2">
                          {/* Date and Reading Time row */}
                          <div className="flex items-center gap-3 text-[10px] font-black text-slate-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{art.date}</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{calculateReadingTime(art)} {isRtl ? "دقائق" : "mins"}</span>
                            </span>
                          </div>

                          {/* Title click route */}
                          <Link to={`/blog/${art.slug}`}>
                            <h3 className="text-md font-black text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-all leading-snug line-clamp-2">
                              {isRtl ? art.titleAr : art.titleEn}
                            </h3>
                          </Link>

                          {/* Brief Excerpt */}
                          <p className="text-xs text-slate-500 dark:text-neutral-400 leading-relaxed font-semibold line-clamp-3">
                            {isRtl ? art.excerptAr : art.excerptEn}
                          </p>
                        </div>

                        {/* Author row & View action */}
                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between gap-2 mt-4">
                          <div className="flex items-center gap-2">
                            <img src={art.author.avatar} alt="" className="w-8 h-8 rounded-full object-cover border border-amber-500/40" referrerPolicy="no-referrer" />
                            <div>
                              <span className="text-[11px] font-black text-slate-800 dark:text-neutral-200 block">{isRtl ? art.author.nameAr : art.author.nameEn}</span>
                              <span className="text-[9px] font-black text-slate-400 block line-clamp-1 max-w-[120px]">{isRtl ? "مستشار مالي" : "Consultant"}</span>
                            </div>
                          </div>

                          {/* Read Link */}
                          <Link
                            to={`/blog/${art.slug}`}
                            className="px-4 py-2 bg-slate-50 group-hover:bg-amber-600 group-hover:text-white dark:bg-slate-950 border border-slate-150 dark:border-slate-800/80 rounded-xl text-[10px] font-black text-slate-600 dark:text-neutral-300 transition-all cursor-pointer flex items-center gap-1"
                          >
                            <span>{isRtl ? "اقرأ المزيد" : "Read Article"}</span>
                            {isRtl ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                          </Link>
                        </div>
                      </div>
                    </motion.div>

                    {/* Inject responsive inline Native Ad after the first article */}
                    {index === 0 && (
                      <div className="col-span-1 md:col-span-2 lg:col-span-3">
                        <AdsRenderer type="native" isRtl={isRtl} className="shadow-xs my-2" />
                      </div>
                    )}

                    {/* Inject responsive Google Adsense slot after the third article */}
                    {index === 2 && (
                      <div className="col-span-1 md:col-span-2 lg:col-span-3">
                        <AdsRenderer type="google_ads" isRtl={isRtl} className="shadow-xs my-2" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-[2rem] p-12 text-center shadow-xs space-y-4">
                <AlertCircle className="w-16 h-16 text-slate-300 mx-auto" />
                <h3 className="text-lg font-black text-slate-800 dark:text-neutral-200">
                  {isRtl ? "لم يتم العثور على أي نتائج مطابقة" : "No Matching Articles Found"}
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto font-medium">
                  {isRtl 
                    ? "يرجى تعديل كلمات البحث، أو تحديد قسم آخر أو الغاء تصفية الوسوم للوصول للمقالات المطلوبة."
                    : "Try adjusting your search terms or choosing another category block to explore active discussions."}
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedTag('all'); }}
                  className="px-5 py-2.5 bg-slate-900 text-white dark:bg-white dark:text-slate-950 font-black rounded-xl text-xs cursor-pointer border-none"
                >
                  {isRtl ? "إعادة تعيين الفلاتر" : "Reset Filters"}
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
