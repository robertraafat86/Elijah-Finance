import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { 
  MessageSquare, 
  Search, 
  Filter, 
  Check, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  ThumbsUp, 
  ThumbsDown, 
  Flag, 
  ShieldAlert, 
  ShieldCheck, 
  Plus, 
  Send, 
  Eye, 
  Trash2, 
  Edit3, 
  Lock, 
  Unlock, 
  Tag, 
  Sparkles, 
  Clock, 
  User, 
  Award, 
  BookOpen, 
  AlertCircle, 
  Info,
  ExternalLink,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { cn } from '../lib/utils';

// Core interfaces
interface Answer {
  id: string;
  questionId: string;
  authorName: string;
  authorRole: string;
  content: string;
  votes: number;
  userVote?: 'up' | 'down';
  createdAt: string;
  isReported: boolean;
  reportReason?: string;
}

interface Question {
  id: string;
  title: string;
  content: string;
  category: string; // e.g., 'tax', 'audit', 'ifrs', 'costing', 'general'
  authorName: string;
  authorRole: string;
  votes: number;
  userVote?: 'up' | 'down';
  answersCount: number;
  createdAt: string;
  isReported: boolean;
  reportReason?: string;
  tags: string[];
}

const CATEGORIES_DATA = [
  { id: 'all', labelEn: 'All Topics', labelAr: 'جميع المواضيع', color: 'bg-slate-100 text-slate-800' },
  { id: 'tax', labelEn: 'Tax & Compliance', labelAr: 'الضرائب والمطابقة', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'audit', labelEn: 'Audit & Assurance', labelAr: 'المراجعة والتدقيق', color: 'bg-sky-50 text-sky-700 border-sky-200' },
  { id: 'ifrs', labelEn: 'IFRS & Standards', labelAr: 'المعايير والتقارير الدولية', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { id: 'costing', labelEn: 'Cost & Budgeting', labelAr: 'التكاليف والموازنات', color: 'bg-violet-50 text-violet-700 border-violet-200' },
  { id: 'general', labelEn: 'General Accounting', labelAr: 'المحاسبة العامة والاستشارات', color: 'bg-rose-50 text-rose-700 border-rose-200' }
];

const INITIAL_QUESTIONS: Question[] = [
  {
    id: 'q-1',
    title: 'How to calculate deferred tax assets/liabilities under IAS 12?',
    content: 'I am struggling to determine the exact tax base of an asset when it has accelerated tax depreciation compared to straight-line accounting depreciation. For instance, carrying value is $100,000 but the tax tax written-down value is $60,000. Is this a taxable or deductible temporary difference, and how should I record the journal entry assuming a 22.5% tax rate?',
    category: 'ifrs',
    authorName: 'Elijah Michael',
    authorRole: 'IFRS Director',
    votes: 24,
    userVote: 'up',
    answersCount: 2,
    createdAt: '2026-07-12T10:30:00Z',
    isReported: false,
    tags: ['IAS-12', 'Deferred-Tax', 'Depreciation']
  },
  {
    id: 'q-2',
    title: 'ما هي المعاملة الضريبية لفروق تقييم العملة الأجنبية غير المحققة بمصر؟',
    content: 'طبقاً للتعديلات الأخيرة في معايير المحاسبة المصرية وقانون الضرائب لعام 2026، هل يتم إدراج فروق تقييم العملة غير المحققة (الناتجة عن إعادة ترجمة الأرصدة النقدية في تاريخ الميزانية) ضمن الوعاء الخاضع للضريبة أم يتم استبعادها في الإقرار الضريبي وتعتبر فروقاً مؤقتة فقط لحين تحقيقها؟',
    category: 'tax',
    authorName: 'أحمد رأفت',
    authorRole: 'مستشار ضريبي معتمد',
    votes: 38,
    answersCount: 1,
    createdAt: '2026-07-13T14:15:00Z',
    isReported: false,
    tags: ['الضرائب-المصرية', 'فروق-العملة', 'المعايير-المصرية']
  },
  {
    id: 'q-3',
    title: 'Key differences in reporting lines for Internal Audit vs External Audit?',
    content: 'We are restructuring our corporate governance policies. Should the Internal Audit team report directly to the Chief Financial Officer (CFO) or the Audit Committee of the Board of Directors? Also, how does this reporting line influence our coordination with the External Auditors during the annual financial statement auditing?',
    category: 'audit',
    authorName: 'Sarah Jenkins',
    authorRole: 'Audit Committee Chair',
    votes: 19,
    answersCount: 1,
    createdAt: '2026-07-11T08:45:00Z',
    isReported: false,
    tags: ['Governance', 'Internal-Audit', 'Controls']
  }
];

const INITIAL_ANSWERS: Answer[] = [
  {
    id: 'a-1-1',
    questionId: 'q-1',
    authorName: 'Robert Raafat',
    authorRole: 'Senior Chartered Accountant',
    content: `When the carrying value of an asset ($100,000) is greater than its tax base ($60,000), this creates a Taxable Temporary Difference of $40,000. 

Under IAS 12, this temporary difference will result in future taxable amounts when the carrying amount of the asset is recovered. Therefore, you must recognize a Deferred Tax Liability (DTL).

Calculation:
Taxable Temporary Difference = $100,000 - $60,000 = $40,000
Deferred Tax Liability = $40,000 * 22.5% = $9,000

Journal Entry to record:
Debit: Tax Expense (P&L) - $9,000
Credit: Deferred Tax Liability (Balance Sheet) - $9,000`,
    votes: 15,
    userVote: 'up',
    createdAt: '2026-07-12T11:45:00Z',
    isReported: false
  },
  {
    id: 'a-1-2',
    questionId: 'q-1',
    authorName: 'Marina George',
    authorRole: 'Tax Consultant',
    content: `Exactly as Robert explained. Just to add a practical checkpoint: always verify whether there are any tax exemptions or tax holidays applicable to the asset recovery pipeline, as this might alter the tax rate applied to the deferred calculations under IAS 12.51.`,
    votes: 5,
    createdAt: '2026-07-12T13:20:00Z',
    isReported: false
  },
  {
    id: 'a-2-1',
    questionId: 'q-2',
    authorName: 'محاسب قانوني مصري',
    authorRole: 'عضو جمعية المحاسبين والمراجعين',
    content: `أهلاً بك زميلنا الفاضل. طبقاً للائحة التنفيذية لقانون الضريبة على الدخل المصري رقم 91 لسنة 2005 وتعديلاته، فإن الأرباح أو الخسائر الناتجة عن فروق تقييم العملة الأجنبية "غير المحققة" لا تؤثر على الوعاء الخاضع للضريبة في تاريخ الميزانية. 

المعاملة كالتالي:
1. يتم استبعاد فروق التقييم غير المحققة (الربح يستبعد بالخصم، والخسارة تستبعد بالإضافة) في الإقرار الضريبي السنوي (جدول التسويات).
2. عند تحقيق هذه الفروق فعلياً خلال العام المالي التالي (عند البيع، التحصيل، أو السداد الفعلي)، يتم الاعتراف بها ضريبياً وتخضع للضريبة أو تخصم طبقاً لواقعة التحقق الفعلي.

لذلك، تعتبر هذه الفروق "فروقاً مؤقتة" تستوجب الاعتراف بأصل أو التزام ضريبي مؤجل في القوائم المالية طبقا لمعيار المحاسبة المصري رقم (24) المقابل لمعيار IAS 12.`,
    votes: 22,
    userVote: 'up',
    createdAt: '2026-07-13T16:00:00Z',
    isReported: false
  },
  {
    id: 'a-3-1',
    questionId: 'q-3',
    authorName: 'David Vance',
    authorRole: 'Corporate Governance Auditor',
    content: `To ensure absolute objectivity and compliance with IIA (Institute of Internal Auditors) standards, the Internal Audit department must have a dual reporting line:
1. Functional Reporting: Directly to the Audit Committee of the Board of Directors. This guarantees independence from executive management (including the CFO).
2. Administrative Reporting: To the CEO or CFO, solely for day-to-day administrative matters (like payroll or office space).

If Internal Audit reports functionally to the CFO, their independence is severely compromised since they would be auditing the financial controls designed and supervised by the very person they report to!`,
    votes: 12,
    createdAt: '2026-07-11T10:10:00Z',
    isReported: false
  }
];

export default function Forum() {
  const { i18n, t } = useTranslation();
  const isRtl = i18n.language === 'ar';

  // State Management
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  
  // Search & Filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Selected detail question view (null means list view)
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);

  // New Question Form state
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('tax');
  const [newAuthor, setNewAuthor] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newTagsString, setNewTagsString] = useState('');

  // New Answer Composer state
  const [answerAuthor, setAnswerAuthor] = useState('');
  const [answerRole, setAnswerRole] = useState('');
  const [answerContent, setAnswerContent] = useState('');

  // Reporting/Moderation Dialog
  const [reportingTarget, setReportingTarget] = useState<{ type: 'question' | 'answer'; id: string } | null>(null);
  const [reportReason, setReportReason] = useState('');

  // Moderator Console state
  const [isModeratorMode, setIsModeratorMode] = useState(false);
  const [moderatorCode, setModeratorCode] = useState('');
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [showCodeInput, setShowCodeInput] = useState(false);

  // Editing state for moderators
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [editingAnswer, setEditingAnswer] = useState<Answer | null>(null);

  // Load from LocalStorage or seed defaults
  useEffect(() => {
    const savedQ = localStorage.getItem('elijah_forum_questions');
    const savedA = localStorage.getItem('elijah_forum_answers');

    if (savedQ) {
      setQuestions(JSON.parse(savedQ));
    } else {
      setQuestions(INITIAL_QUESTIONS);
      localStorage.setItem('elijah_forum_questions', JSON.stringify(INITIAL_QUESTIONS));
    }

    if (savedA) {
      setAnswers(JSON.parse(savedA));
    } else {
      setAnswers(INITIAL_ANSWERS);
      localStorage.setItem('elijah_forum_answers', JSON.stringify(INITIAL_ANSWERS));
    }
  }, []);

  // Helper to save state changes to LocalStorage
  const persistState = (updatedQuestions: Question[], updatedAnswers: Answer[]) => {
    setQuestions(updatedQuestions);
    setAnswers(updatedAnswers);
    localStorage.setItem('elijah_forum_questions', JSON.stringify(updatedQuestions));
    localStorage.setItem('elijah_forum_answers', JSON.stringify(updatedAnswers));
  };

  // Derived Statistics
  const stats = useMemo(() => {
    const reportedQCount = questions.filter(q => q.isReported).length;
    const reportedACount = answers.filter(a => a.isReported).length;
    return {
      totalQ: questions.length,
      totalA: answers.length,
      totalReported: reportedQCount + reportedACount
    };
  }, [questions, answers]);

  // Handle Search & Category Filtering
  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const matchesCategory = activeCategory === 'all' || q.category === activeCategory;
      const searchStr = `${q.title} ${q.content} ${q.tags.join(' ')} ${q.authorName}`.toLowerCase();
      const matchesSearch = searchStr.includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [questions, activeCategory, searchQuery]);

  const selectedQuestion = useMemo(() => {
    return questions.find(q => q.id === selectedQuestionId) || null;
  }, [questions, selectedQuestionId]);

  const selectedAnswers = useMemo(() => {
    if (!selectedQuestionId) return [];
    return answers
      .filter(a => a.questionId === selectedQuestionId)
      .sort((a, b) => b.votes - a.votes);
  }, [answers, selectedQuestionId]);

  // Voting mechanics
  const handleVote = (id: string, type: 'question' | 'answer', voteType: 'up' | 'down') => {
    if (type === 'question') {
      const updated = questions.map(q => {
        if (q.id === id) {
          let change = 0;
          let nextVote: 'up' | 'down' | undefined = voteType;

          if (q.userVote === voteType) {
            // Undo vote
            change = voteType === 'up' ? -1 : 1;
            nextVote = undefined;
          } else if (q.userVote) {
            // Change vote (up -> down or down -> up)
            change = voteType === 'up' ? 2 : -2;
          } else {
            // First time vote
            change = voteType === 'up' ? 1 : -1;
          }

          return { ...q, votes: q.votes + change, userVote: nextVote };
        }
        return q;
      });
      persistState(updated, answers);
    } else {
      const updated = answers.map(a => {
        if (a.id === id) {
          let change = 0;
          let nextVote: 'up' | 'down' | undefined = voteType;

          if (a.userVote === voteType) {
            change = voteType === 'up' ? -1 : 1;
            nextVote = undefined;
          } else if (a.userVote) {
            change = voteType === 'up' ? 2 : -2;
          } else {
            change = voteType === 'up' ? 1 : -1;
          }

          return { ...a, votes: a.votes + change, userVote: nextVote };
        }
        return a;
      });
      persistState(questions, updated);
    }
  };

  // Add Question Submission
  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim() || !newAuthor.trim()) return;

    const parsedTags = newTagsString
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const newQ: Question = {
      id: `q-${Date.now()}`,
      title: newTitle,
      content: newContent,
      category: newCategory,
      authorName: newAuthor,
      authorRole: newRole.trim() || (isRtl ? "محاسب مشارك" : "Associate Accountant"),
      votes: 1,
      userVote: 'up',
      answersCount: 0,
      createdAt: new Date().toISOString(),
      isReported: false,
      tags: parsedTags.length > 0 ? parsedTags : ['General']
    };

    const updatedQuestions = [newQ, ...questions];
    persistState(updatedQuestions, answers);

    // Reset Form
    setNewTitle('');
    setNewContent('');
    setNewAuthor('');
    setNewRole('');
    setNewTagsString('');
    setIsAddingQuestion(false);
  };

  // Add Answer Submission
  const handleCreateAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuestionId || !answerContent.trim() || !answerAuthor.trim()) return;

    const newAns: Answer = {
      id: `a-${Date.now()}`,
      questionId: selectedQuestionId,
      authorName: answerAuthor,
      authorRole: answerRole.trim() || (isRtl ? "عضو مجتمع إيليجا" : "Elijah Forum Member"),
      content: answerContent,
      votes: 1,
      userVote: 'up',
      createdAt: new Date().toISOString(),
      isReported: false
    };

    const updatedAnswers = [...answers, newAns];
    const updatedQuestions = questions.map(q => {
      if (q.id === selectedQuestionId) {
        return { ...q, answersCount: q.answersCount + 1 };
      }
      return q;
    });

    persistState(updatedQuestions, updatedAnswers);

    // Reset composer
    setAnswerAuthor('');
    setAnswerRole('');
    setAnswerContent('');
  };

  // Report submission
  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportingTarget || !reportReason.trim()) return;

    const { type, id } = reportingTarget;

    if (type === 'question') {
      const updated = questions.map(q => {
        if (q.id === id) {
          return { ...q, isReported: true, reportReason };
        }
        return q;
      });
      persistState(updated, answers);
    } else {
      const updated = answers.map(a => {
        if (a.id === id) {
          return { ...a, isReported: true, reportReason };
        }
        return a;
      });
      persistState(questions, updated);
    }

    setReportingTarget(null);
    setReportReason('');
  };

  // Moderator actions
  const handleVerifyModeratorCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (moderatorCode === '123' || moderatorCode === 'elijah-admin') {
      setIsCodeVerified(true);
      setIsModeratorMode(true);
      setShowCodeInput(false);
    } else {
      alert(isRtl ? 'الكود غير صحيح! جرب الكود الاحتياطي: 123' : 'Incorrect Code! Try the mock code: 123');
    }
  };

  const handleToggleModeratorConsole = () => {
    if (isModeratorMode) {
      setIsModeratorMode(false);
      setIsCodeVerified(false);
      setModeratorCode('');
    } else {
      setShowCodeInput(true);
    }
  };

  const handleDismissReport = (id: string, type: 'question' | 'answer') => {
    if (type === 'question') {
      const updated = questions.map(q => {
        if (q.id === id) {
          return { ...q, isReported: false, reportReason: undefined };
        }
        return q;
      });
      persistState(updated, answers);
    } else {
      const updated = answers.map(a => {
        if (a.id === id) {
          return { ...a, isReported: false, reportReason: undefined };
        }
        return a;
      });
      persistState(questions, updated);
    }
  };

  const handleDeleteContent = (id: string, type: 'question' | 'answer') => {
    if (confirm(isRtl ? 'هل أنت متأكد من حذف هذا المحتوى نهائياً؟' : 'Are you sure you want to permanently delete this content?')) {
      if (type === 'question') {
        const updatedQ = questions.filter(q => q.id !== id);
        const updatedA = answers.filter(a => a.questionId !== id);
        persistState(updatedQ, updatedA);
        if (selectedQuestionId === id) {
          setSelectedQuestionId(null);
        }
      } else {
        const answerToDelete = answers.find(a => a.id === id);
        const updatedA = answers.filter(a => a.id !== id);
        const updatedQ = questions.map(q => {
          if (q.id === answerToDelete?.questionId) {
            return { ...q, answersCount: Math.max(0, q.answersCount - 1) };
          }
          return q;
        });
        persistState(updatedQ, updatedA);
      }
    }
  };

  const handleUpdateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingQuestion) return;

    const updated = questions.map(q => {
      if (q.id === editingQuestion.id) {
        return editingQuestion;
      }
      return q;
    });

    persistState(updated, answers);
    setEditingQuestion(null);
  };

  const handleUpdateAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAnswer) return;

    const updated = answers.map(a => {
      if (a.id === editingAnswer.id) {
        return editingAnswer;
      }
      return a;
    });

    persistState(questions, updated);
    setEditingAnswer(null);
  };

  return (
    <div className="relative min-h-screen py-8" id="forum-root-view">
      
      {/* 1. Header Splash Block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8">
        <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl border border-slate-800">
          
          {/* Ambient blur effects */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-950/60 text-indigo-400 rounded-full text-xs font-black border border-indigo-900/40">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>{isRtl ? "منصة الاستفسارات المحاسبية التفاعلية" : "Interactive Accounting & Advisory Hub"}</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                {isRtl ? (
                  <>منتدى <span className="text-indigo-400">إيليجا المحاسبي</span> والمهني</>
                ) : (
                  <>Elijah Professional <span className="text-indigo-400">Accounting Forum</span></>
                )}
              </h1>

              <p className="text-sm md:text-base text-slate-400 leading-relaxed font-medium">
                {isRtl ? (
                  "تواصل مع نخبة من مراجعي الحسابات والخبراء الماليين في مصر والشرق الأوسط. اطرح أسئلتك حول الضرائب، المعايير الدولية IFRS، محاسبة التكاليف، واستقبل إجابات معتمدة ومدققة فنيًا."
                ) : (
                  "Collaborate with senior auditors, IFRS controllers, and certified tax specialists. Search and ask professional inquiries, receive authoritative references, and audit tax files collaboratively."
                )}
              </p>

              {/* Stats badges */}
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="px-4 py-2 bg-slate-800/80 rounded-2xl border border-slate-700/60">
                  <p className="text-[10px] uppercase font-black text-slate-400">{isRtl ? "إجمالي الأسئلة" : "Total Questions"}</p>
                  <p className="text-xl font-black text-white">{stats.totalQ}</p>
                </div>
                <div className="px-4 py-2 bg-slate-800/80 rounded-2xl border border-slate-700/60">
                  <p className="text-[10px] uppercase font-black text-slate-400">{isRtl ? "الإجابات والحلول" : "Verified Answers"}</p>
                  <p className="text-xl font-black text-white">{stats.totalA}</p>
                </div>
                <div className="px-4 py-2 bg-slate-800/80 rounded-2xl border border-slate-700/60">
                  <p className="text-[10px] uppercase font-black text-slate-400">{isRtl ? "نشط حالياً" : "Active Experts"}</p>
                  <p className="text-xl font-black text-emerald-400 flex items-center gap-1.5">
                    <span>14 +</span>
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                  </p>
                </div>
              </div>
            </div>

            {/* Moderation console switch */}
            <div className="lg:self-center flex flex-col items-center sm:items-end gap-3">
              <button
                onClick={handleToggleModeratorConsole}
                className={cn(
                  "px-6 py-3.5 rounded-2xl text-xs font-black flex items-center gap-2 cursor-pointer transition-all border-none shadow-md",
                  isModeratorMode 
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                    : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                )}
                id="moderator-console-trigger"
              >
                {isModeratorMode ? <Unlock className="w-4 h-4 text-emerald-300 animate-pulse" /> : <Lock className="w-4 h-4 text-slate-400" />}
                <span>
                  {isModeratorMode 
                    ? (isRtl ? "وضع المشرف: نشط" : "Moderator Console: ON") 
                    : (isRtl ? "الدخول كـ مشرف المنتدى" : "Access Moderator Console")}
                </span>
                {stats.totalReported > 0 && !isModeratorMode && (
                  <span className="px-1.5 py-0.5 bg-rose-500 text-white rounded-full text-[9px] font-bold animate-bounce">
                    {stats.totalReported}
                  </span>
                )}
              </button>
              <p className="text-[10px] text-slate-500 font-bold max-w-xs text-center sm:text-right">
                {isRtl 
                  ? "كود المشرف التجريبي لمحاكاة لوحة المراقبة: 123" 
                  : "Use the mock admin key to test validation: 123"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN LAYOUT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Moderator Code Verification Form overlay */}
        <AnimatePresence>
          {showCodeInput && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-[2rem] shadow-xl mb-6 max-w-md mx-auto"
            >
              <form onSubmit={handleVerifyModeratorCode} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                    <ShieldAlert className="w-5 h-5 text-indigo-500" />
                    <h3 className="font-black text-sm">{isRtl ? "التحقق من كود المشرف" : "Enter Admin Password"}</h3>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setShowCodeInput(false)} 
                    className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer border-none bg-transparent"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-slate-500 dark:text-neutral-400 font-semibold">
                  {isRtl 
                    ? "أدخل كود المشرف للتحقق من صلاحيات إدارة المنشورات وحذفها وإلغاء البلاغات (كود تجريبي: 123)." 
                    : "Enter the moderation credentials key to unlock administrative reports panel (demo code: 123)."}
                </p>
                <div className="flex gap-2">
                  <input
                    type="password"
                    placeholder="123"
                    value={moderatorCode}
                    onChange={(e) => setModeratorCode(e.target.value)}
                    required
                    className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-100"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black cursor-pointer border-none"
                  >
                    {isRtl ? "دخول" : "Verify"}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MODERATOR CENTER OVERVIEW (When console is ON) */}
        <AnimatePresence>
          {isModeratorMode && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-rose-50/40 dark:bg-rose-950/10 border border-rose-150 dark:border-rose-900/40 p-6 rounded-3xl mb-8 space-y-4"
              id="moderator-admin-panel"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rose-200/50 dark:border-rose-900/20 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-rose-500 text-white rounded-xl">
                    <ShieldAlert className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm text-slate-900 dark:text-white">
                      {isRtl ? "لوحة مراجعة البلاغات والإشراف الإداري" : "Moderator Admin & Queue Console"}
                    </h3>
                    <p className="text-[10px] text-rose-600 dark:text-rose-400 font-bold mt-0.5">
                      {isRtl 
                        ? `لقد قمت بتفعيل وضع المشرف. يوجد حالياً ${stats.totalReported} محتوى تم الإبلاغ عنه من قِبل الأعضاء.` 
                        : `Admin controls active. There are ${stats.totalReported} items flagged for evaluation in the community pipeline.`}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsModeratorMode(false)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-black cursor-pointer border-none"
                >
                  {isRtl ? "الخروج من وضع الإشراف" : "Exit Admin Mode"}
                </button>
              </div>

              {/* Reported Content Queue split */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* 2.1 Reported Questions List */}
                <div className="space-y-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-rose-200/50 dark:border-rose-900/20">
                  <h4 className="text-xs font-black text-slate-800 dark:text-white flex items-center gap-1.5 uppercase">
                    <HelpCircle className="w-4 h-4 text-rose-500" />
                    <span>{isRtl ? "أسئلة تم الإبلاغ عنها" : "Flagged Questions"}</span>
                    <span className="ml-auto px-2 py-0.5 bg-rose-100 text-rose-700 rounded-md text-[9px] font-black">
                      {questions.filter(q => q.isReported).length}
                    </span>
                  </h4>

                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {questions.filter(q => q.isReported).length > 0 ? (
                      questions.filter(q => q.isReported).map(q => (
                        <div key={q.id} className="p-3 bg-rose-50/20 dark:bg-rose-950/5 border border-rose-100 dark:border-rose-900/20 rounded-xl space-y-2 text-xs">
                          <div className="flex justify-between items-start gap-2">
                            <span className="font-black text-slate-900 dark:text-white line-clamp-1">{q.title}</span>
                            <span className="text-[10px] text-rose-600 dark:text-rose-400 font-bold whitespace-nowrap bg-rose-100/50 dark:bg-rose-950/40 px-2 py-0.5 rounded-md">
                              {q.reportReason || (isRtl ? "غير محدد" : "Flagged")}
                            </span>
                          </div>
                          <p className="text-slate-500 dark:text-neutral-400 line-clamp-2 leading-relaxed text-[11px]">{q.content}</p>
                          
                          <div className="flex items-center gap-2 pt-1 border-t border-rose-100/30">
                            <button
                              onClick={() => setSelectedQuestionId(q.id)}
                              className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-[10px] font-bold hover:bg-slate-200 cursor-pointer border-none"
                            >
                              {isRtl ? "عرض بالكامل" : "View Full"}
                            </button>
                            <button
                              onClick={() => setEditingQuestion(q)}
                              className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-lg text-[10px] font-bold hover:bg-indigo-100/60 cursor-pointer border-none"
                            >
                              {isRtl ? "تعديل المنشور" : "Edit"}
                            </button>
                            <button
                              onClick={() => handleDismissReport(q.id, 'question')}
                              className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-lg text-[10px] font-bold hover:bg-emerald-100/60 cursor-pointer border-none flex items-center gap-1"
                            >
                              <ShieldCheck className="w-3.5 h-3.5" />
                              <span>{isRtl ? "تجاهل البلاغ" : "Approve/Dismiss"}</span>
                            </button>
                            <button
                              onClick={() => handleDeleteContent(q.id, 'question')}
                              className="px-2.5 py-1 bg-rose-100/80 hover:bg-rose-200 text-rose-700 rounded-lg text-[10px] font-bold cursor-pointer border-none ml-auto"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-[11px] text-slate-400 font-bold text-center py-6">{isRtl ? "لا توجد أسئلة مبلغ عنها حالياً." : "No flagged questions in queue."}</p>
                    )}
                  </div>
                </div>

                {/* 2.2 Reported Answers List */}
                <div className="space-y-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-rose-200/50 dark:border-rose-900/20">
                  <h4 className="text-xs font-black text-slate-800 dark:text-white flex items-center gap-1.5 uppercase">
                    <MessageSquare className="w-4 h-4 text-rose-500" />
                    <span>{isRtl ? "إجابات تم الإبلاغ عنها" : "Flagged Answers"}</span>
                    <span className="ml-auto px-2 py-0.5 bg-rose-100 text-rose-700 rounded-md text-[9px] font-black">
                      {answers.filter(a => a.isReported).length}
                    </span>
                  </h4>

                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {answers.filter(a => a.isReported).length > 0 ? (
                      answers.filter(a => a.isReported).map(a => (
                        <div key={a.id} className="p-3 bg-rose-50/20 dark:bg-rose-950/5 border border-rose-100 dark:border-rose-900/20 rounded-xl space-y-2 text-xs">
                          <div className="flex justify-between items-start gap-2">
                            <span className="font-bold text-slate-500 dark:text-neutral-400">{isRtl ? "بواسطة:" : "By:"} {a.authorName}</span>
                            <span className="text-[10px] text-rose-600 dark:text-rose-400 font-bold whitespace-nowrap bg-rose-100/50 dark:bg-rose-950/40 px-2 py-0.5 rounded-md">
                              {a.reportReason || (isRtl ? "بلاغ إساءة" : "Flagged")}
                            </span>
                          </div>
                          <p className="text-slate-500 dark:text-neutral-400 line-clamp-2 leading-relaxed text-[11px]">{a.content}</p>
                          
                          <div className="flex items-center gap-2 pt-1 border-t border-rose-100/30">
                            <button
                              onClick={() => {
                                setSelectedQuestionId(a.questionId);
                                setTimeout(() => {
                                  const el = document.getElementById(a.id);
                                  el?.scrollIntoView({ behavior: 'smooth' });
                                }, 100);
                              }}
                              className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-[10px] font-bold hover:bg-slate-200 cursor-pointer border-none"
                            >
                              {isRtl ? "عرض السؤال" : "View Context"}
                            </button>
                            <button
                              onClick={() => setEditingAnswer(a)}
                              className="px-2.5 py-1 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-lg text-[10px] font-bold hover:bg-indigo-100/60 cursor-pointer border-none"
                            >
                              {isRtl ? "تعديل الإجابة" : "Edit"}
                            </button>
                            <button
                              onClick={() => handleDismissReport(a.id, 'answer')}
                              className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-lg text-[10px] font-bold hover:bg-emerald-100/60 cursor-pointer border-none flex items-center gap-1"
                            >
                              <ShieldCheck className="w-3.5 h-3.5" />
                              <span>{isRtl ? "تجاهل" : "Dismiss"}</span>
                            </button>
                            <button
                              onClick={() => handleDeleteContent(a.id, 'answer')}
                              className="px-2.5 py-1 bg-rose-100/80 hover:bg-rose-200 text-rose-700 rounded-lg text-[10px] font-bold cursor-pointer border-none ml-auto"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-[11px] text-slate-400 font-bold text-center py-6">{isRtl ? "لا توجد إجابات مبلغ عنها حالياً." : "No flagged answers in queue."}</p>
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MODERATOR EDIT QUESTION COMPONENT */}
        <AnimatePresence>
          {editingQuestion && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }}
              className="bg-white dark:bg-slate-900 border-2 border-indigo-500 p-6 rounded-[2rem] shadow-xl mb-6 space-y-4 max-w-2xl mx-auto"
            >
              <h3 className="font-black text-sm text-indigo-600 flex items-center gap-2">
                <Edit3 className="w-5 h-5 animate-pulse" />
                <span>{isRtl ? "تعديل السؤال إدارياً (وضع المشرف)" : "Moderator Edit: Question"}</span>
              </h3>
              <form onSubmit={handleUpdateQuestion} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black text-slate-500">{isRtl ? "العنوان" : "Title"}</label>
                  <input
                    type="text"
                    value={editingQuestion.title}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, title: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black text-slate-500">{isRtl ? "المحتوى" : "Content"}</label>
                  <textarea
                    rows={4}
                    value={editingQuestion.content}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, content: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingQuestion(null)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold border-none cursor-pointer"
                  >
                    {isRtl ? "إلغاء" : "Cancel"}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black cursor-pointer border-none"
                  >
                    {isRtl ? "حفظ التعديلات" : "Apply Changes"}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MODERATOR EDIT ANSWER COMPONENT */}
        <AnimatePresence>
          {editingAnswer && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }}
              className="bg-white dark:bg-slate-900 border-2 border-indigo-500 p-6 rounded-[2rem] shadow-xl mb-6 max-w-2xl mx-auto space-y-4"
            >
              <h3 className="font-black text-sm text-indigo-600 flex items-center gap-2">
                <Edit3 className="w-5 h-5 animate-pulse" />
                <span>{isRtl ? "تعديل الإجابة إدارياً (وضع المشرف)" : "Moderator Edit: Answer"}</span>
              </h3>
              <form onSubmit={handleUpdateAnswer} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black text-slate-500">{isRtl ? "محتوى الإجابة" : "Answer Content"}</label>
                  <textarea
                    rows={4}
                    value={editingAnswer.content}
                    onChange={(e) => setEditingAnswer({ ...editingAnswer, content: e.target.value })}
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingAnswer(null)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold border-none cursor-pointer"
                  >
                    {isRtl ? "إلغاء" : "Cancel"}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-black cursor-pointer border-none"
                  >
                    {isRtl ? "حفظ التعديلات" : "Apply Changes"}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2.3 RESPONSIVE MAIN COLUMNS split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* SIDEBAR COL: SEARCH, CATEGORIES, EXPERTS (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Ask Question trigger button */}
            <button
              onClick={() => {
                setIsAddingQuestion(true);
                setSelectedQuestionId(null);
                setTimeout(() => {
                  document.getElementById('ask-question-form-container')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-black shadow-lg cursor-pointer flex items-center justify-center gap-2 transition-all border-none"
            >
              <Plus className="w-5 h-5" />
              <span>{isRtl ? "اطرح سؤالاً محاسبياً الآن" : "Ask a New Question"}</span>
            </button>

            {/* Live Search Form card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 p-5 rounded-3xl shadow-xs space-y-4">
              <h3 className="font-black text-xs text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Search className="w-4 h-4 text-indigo-500" />
                <span>{isRtl ? "البحث المتقدم" : "Search & Filters"}</span>
              </h3>

              <div className="relative">
                <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder={isRtl ? "ابحث عن سؤال، موضوع، أو وسم..." : "Search key concepts, tags..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-100 placeholder-slate-400 focus:outline-hidden"
                />
                {searchQuery && (
                  <button 
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 border-none bg-transparent cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Categories filter layout */}
            <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 p-5 rounded-3xl shadow-xs space-y-4">
              <h3 className="font-black text-xs text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-indigo-500" />
                <span>{isRtl ? "التصنيفات المهنية" : "Auditing & Tax Spheres"}</span>
              </h3>

              <div className="flex flex-col gap-2">
                {CATEGORIES_DATA.map(cat => {
                  const isActive = activeCategory === cat.id;
                  const count = cat.id === 'all' 
                    ? questions.length 
                    : questions.filter(q => q.category === cat.id).length;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setActiveCategory(cat.id);
                        setSelectedQuestionId(null);
                      }}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl text-xs font-black flex items-center justify-between border transition-all cursor-pointer",
                        isActive 
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-md" 
                          : "bg-slate-50/50 hover:bg-slate-100/70 dark:bg-slate-950/20 dark:hover:bg-slate-950/40 text-slate-700 dark:text-neutral-300 border-slate-150 dark:border-slate-850"
                      )}
                    >
                      <span className="truncate">{isRtl ? cat.labelAr : cat.labelEn}</span>
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-[9px] font-bold",
                        isActive 
                          ? "bg-indigo-500 text-white" 
                          : "bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-neutral-400"
                      )}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Community Guild of Experts Info Box */}
            <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 p-5 rounded-3xl shadow-xs space-y-4">
              <h3 className="font-black text-xs text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-indigo-500 animate-pulse" />
                <span>{isRtl ? "أبرز الخبراء المعتمدين" : "Certified Board Panelists"}</span>
              </h3>

              <div className="space-y-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-indigo-500 font-bold text-xs border border-indigo-100 dark:border-indigo-900/40">
                    RR
                  </div>
                  <div className="text-xs">
                    <p className="font-black text-slate-900 dark:text-white">Robert Raafat</p>
                    <p className="text-[10px] text-slate-400 font-semibold">{isRtl ? "مؤسس / محاسب مالي معتمد" : "Founder / Senior Chartered Accountant"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-indigo-500 font-bold text-xs border border-indigo-100 dark:border-indigo-900/40">
                    EM
                  </div>
                  <div className="text-xs">
                    <p className="font-black text-slate-900 dark:text-white">Elijah Michael</p>
                    <p className="text-[10px] text-slate-400 font-semibold">{isRtl ? "مدير التدقيق والمعايير الدولية" : "IFRS Assurance Director"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-indigo-500 font-bold text-xs border border-indigo-100 dark:border-indigo-900/40">
                    MG
                  </div>
                  <div className="text-xs">
                    <p className="font-black text-slate-900 dark:text-white">Marina George</p>
                    <p className="text-[10px] text-slate-400 font-semibold">{isRtl ? "شريك الضرائب الإقليمي" : "Lead Regional Tax Partner"}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* QUESTIONS LIST / CHAT DETAILS (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 3.1 NEW QUESTION COMPOSER CONTAINER */}
            <AnimatePresence>
              {isAddingQuestion && (
                <motion.div
                  id="ask-question-form-container"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-950 p-6 rounded-[2rem] shadow-xl space-y-5"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-850">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-indigo-500 animate-bounce" />
                      <h2 className="font-black text-sm md:text-base text-slate-900 dark:text-white">
                        {isRtl ? "طرح استفسار أو قضية محاسبية جديدة" : "Compile a Professional Inquiry"}
                      </h2>
                    </div>
                    <button
                      onClick={() => setIsAddingQuestion(false)}
                      className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-850 rounded-full cursor-pointer text-slate-400 border border-slate-150 dark:border-slate-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleCreateQuestion} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Name input */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-black text-slate-500 tracking-wider block">
                          {isRtl ? "الاسم المهني الكافي *" : "Author Professional Name *"}
                        </label>
                        <input
                          type="text"
                          required
                          placeholder={isRtl ? "مثال: مراجع مالي شادي..." : "e.g. Accountant Sarah..."}
                          value={newAuthor}
                          onChange={(e) => setNewAuthor(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-100 placeholder-slate-400 focus:outline-hidden"
                        />
                      </div>

                      {/* Role input */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-black text-slate-500 tracking-wider block">
                          {isRtl ? "المسمى الوظيفي أو التخصص" : "Your Professional Role"}
                        </label>
                        <input
                          type="text"
                          placeholder={isRtl ? "مثال: محاسب تكاليف صناعية..." : "e.g. Audit Senior / Tax Analyst..."}
                          value={newRole}
                          onChange={(e) => setNewRole(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-100 placeholder-slate-400 focus:outline-hidden"
                        />
                      </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Category Selector */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-black text-slate-500 tracking-wider block">
                          {isRtl ? "القسم المهني للفكرة *" : "Inquiry Core Domain *"}
                        </label>
                        <select
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-neutral-300 focus:outline-hidden"
                        >
                          {CATEGORIES_DATA.filter(c => c.id !== 'all').map(cat => (
                            <option key={cat.id} value={cat.id}>
                              {isRtl ? cat.labelAr : cat.labelEn}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Tags comma separated */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-black text-slate-500 tracking-wider block">
                          {isRtl ? "وسوم للموضوع (مفصولة بفاصلة ,)" : "Inquiry Tags (comma separated)"}
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. IAS-12, Tax, Egyptian-Portal"
                          value={newTagsString}
                          onChange={(e) => setNewTagsString(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-100 placeholder-slate-400 focus:outline-hidden"
                        />
                      </div>

                    </div>

                    {/* Title input */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-black text-slate-500 tracking-wider block">
                        {isRtl ? "عنوان السؤال بإيجاز *" : "Title of Your Inquiry *"}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={isRtl ? "اكتب عنواناً معبراً ودقيقاً..." : "Enter summary title..."}
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-100 placeholder-slate-400 focus:outline-hidden"
                      />
                    </div>

                    {/* Question Content */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-black text-slate-500 tracking-wider block">
                        {isRtl ? "تفاصيل القضية الحسابية والقيود المقترحة *" : "Detailed Context & Technical Dilemma *"}
                      </label>
                      <textarea
                        required
                        rows={5}
                        placeholder={isRtl ? "اشرح بالتفصيل الدفاتر المالية المتأثرة أو الأرقام لحسابها بدقة..." : "Describe the ledger columns, tax rates, or technical details..."}
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-100 placeholder-slate-400 focus:outline-hidden"
                      />
                    </div>

                    {/* Actions bar */}
                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingQuestion(false)}
                        className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold cursor-pointer border-none"
                      >
                        {isRtl ? "إلغاء الأمر" : "Dismiss"}
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black shadow-md cursor-pointer border-none"
                      >
                        {isRtl ? "نشر السؤال الآن" : "Publish Inquiry"}
                      </button>
                    </div>

                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 3.2 DETAILED VIEW OF SELECTED QUESTION */}
            {selectedQuestionId && selectedQuestion ? (
              <div className="space-y-6">
                
                {/* Back Link */}
                <button
                  onClick={() => setSelectedQuestionId(null)}
                  className="inline-flex items-center gap-1 text-xs font-black text-indigo-600 dark:text-indigo-400 cursor-pointer border-none bg-transparent"
                >
                  <ChevronLeft className={cn("w-4.5 h-4.5", isRtl ? "rotate-180" : "")} />
                  <span>{isRtl ? "العودة لجميع الأسئلة المطروحة" : "Back to All Questions"}</span>
                </button>

                {/* Primary Question Detailed Box */}
                <div className={cn(
                  "bg-white dark:bg-slate-900 border rounded-[2rem] p-6 shadow-md space-y-6",
                  selectedQuestion.isReported 
                    ? "border-rose-400 bg-rose-50/5 dark:bg-rose-950/5" 
                    : "border-slate-150 dark:border-slate-850"
                )}>
                  
                  {/* Category, tags, date and admin reported flag */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-850">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400 rounded-md text-[10px] font-black uppercase tracking-wider">
                        {isRtl 
                          ? CATEGORIES_DATA.find(c => c.id === selectedQuestion.category)?.labelAr 
                          : CATEGORIES_DATA.find(c => c.id === selectedQuestion.category)?.labelEn}
                      </span>
                      {selectedQuestion.isReported && (
                        <span className="px-2.5 py-0.5 bg-rose-100 text-rose-700 rounded-md text-[10px] font-black flex items-center gap-1">
                          <ShieldAlert className="w-3.5 h-3.5" />
                          <span>{isRtl ? "تم الإبلاغ" : "Reported"}</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{new Date(selectedQuestion.createdAt).toLocaleDateString(i18n.language, { dateStyle: 'medium' })}</span>
                    </div>
                  </div>

                  {/* Header info */}
                  <div className="space-y-3">
                    <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white leading-snug">
                      {selectedQuestion.title}
                    </h2>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-indigo-500 font-bold border border-indigo-100 dark:border-indigo-900/40">
                        {selectedQuestion.authorName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-800 dark:text-neutral-100">{selectedQuestion.authorName}</p>
                        <p className="text-[10px] text-slate-400 font-bold">{selectedQuestion.authorRole}</p>
                      </div>
                    </div>
                  </div>

                  {/* Question body text content */}
                  <div className="text-slate-600 dark:text-neutral-300 text-xs md:text-sm leading-relaxed whitespace-pre-wrap select-text bg-slate-50/50 dark:bg-slate-950/30 p-5 rounded-2xl border border-slate-100 dark:border-slate-850">
                    {selectedQuestion.content}
                  </div>

                  {/* Tags row */}
                  <div className="flex flex-wrap gap-1.5">
                    {selectedQuestion.tags.map(tag => (
                      <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 dark:bg-slate-850 text-slate-600 dark:text-neutral-400 rounded-md text-[9px] font-black">
                        <Tag className="w-3 h-3 text-slate-400" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>

                  {/* Voting and Reporting action row */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-850">
                    <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950/50 p-1 rounded-xl border border-slate-150 dark:border-slate-800">
                      
                      {/* Upvote */}
                      <button
                        onClick={() => handleVote(selectedQuestion.id, 'question', 'up')}
                        className={cn(
                          "p-2 rounded-lg cursor-pointer transition-colors border-none",
                          selectedQuestion.userVote === 'up'
                            ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50"
                            : "text-slate-400 hover:text-slate-600"
                        )}
                        title="Upvote Question"
                      >
                        <ThumbsUp className="w-4 h-4" />
                      </button>

                      <span className="text-xs font-black text-slate-800 dark:text-neutral-200 px-1">
                        {selectedQuestion.votes}
                      </span>

                      {/* Downvote */}
                      <button
                        onClick={() => handleVote(selectedQuestion.id, 'question', 'down')}
                        className={cn(
                          "p-2 rounded-lg cursor-pointer transition-colors border-none",
                          selectedQuestion.userVote === 'down'
                            ? "bg-rose-50 text-rose-600 dark:bg-rose-950/50"
                            : "text-slate-400 hover:text-rose-600"
                        )}
                        title="Downvote Question"
                      >
                        <ThumbsDown className="w-4 h-4" />
                      </button>

                    </div>

                    {/* Report Trigger */}
                    {!selectedQuestion.isReported && (
                      <button
                        onClick={() => setReportingTarget({ type: 'question', id: selectedQuestion.id })}
                        className="text-slate-400 hover:text-rose-600 text-[10px] font-black uppercase tracking-wider flex items-center gap-1 cursor-pointer border-none bg-transparent"
                      >
                        <Flag className="w-3.5 h-3.5" />
                        <span>{isRtl ? "إبلاغ عن محتوى غير لائق" : "Flag / Report"}</span>
                      </button>
                    )}
                  </div>

                </div>

                {/* Verification Checkpoints list */}
                <div className="bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex gap-3 text-xs text-amber-800 dark:text-amber-400">
                  <Info className="w-5 h-5 flex-shrink-0 animate-bounce" />
                  <div>
                    <h4 className="font-black text-[11px] uppercase tracking-wider">{isRtl ? "ملاحظة من مراجعي إيليجا" : "Disclaimer & Professional Checklist"}</h4>
                    <p className="font-medium mt-1 leading-relaxed">
                      {isRtl 
                        ? "جميع الاستشارات والإجابات المنشورة بالأسفل تمثل آراء فنية وقانونية لزملائنا المعتمدين وتخضع للائحة معايير المحاسبة المصرية والدولية IFRS. ينصح بالرجوع للائحة الرسمية في حالات التدقيق القانوني السيادي." 
                        : "The solutions compiled below represent technical guidance based on current tax regulations. Verify internal controls prior to committing general booking entries."}
                    </p>
                  </div>
                </div>

                {/* 3.2.1 LIST OF ANSWERS */}
                <div className="space-y-4">
                  <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-indigo-500" />
                    <span>{isRtl ? `الردود الفنية والحلول المقترحة (${selectedAnswers.length})` : `Advisory Responses (${selectedAnswers.length})`}</span>
                  </h3>

                  {selectedAnswers.length > 0 ? (
                    <div className="space-y-4">
                      {selectedAnswers.map(ans => (
                        <div
                          key={ans.id}
                          id={ans.id}
                          className={cn(
                            "bg-white dark:bg-slate-900 border rounded-[2rem] p-5 shadow-xs space-y-4 transition-all",
                            ans.isReported 
                              ? "border-rose-400 bg-rose-50/5 dark:bg-rose-950/5" 
                              : "border-slate-150 dark:border-slate-850 hover:border-slate-350"
                          )}
                        >
                          {/* Author line and admin flags */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-indigo-500 font-bold border border-indigo-100 dark:border-indigo-900/40">
                                {ans.authorName.charAt(0)}
                              </div>
                              <div>
                                <p className="text-xs font-black text-slate-800 dark:text-neutral-100 flex items-center gap-1.5">
                                  <span>{ans.authorName}</span>
                                  {ans.authorRole.includes('Senior') || ans.authorRole.includes('Director') || ans.authorRole.includes('معتمد') ? (
                                    <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 rounded-md text-[8px] font-black uppercase">
                                      {isRtl ? "خبير معتمد" : "Verified Expert"}
                                    </span>
                                  ) : null}
                                </p>
                                <p className="text-[10px] text-slate-400 font-semibold">{ans.authorRole}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 text-[10px] text-slate-400">
                              <span>{new Date(ans.createdAt).toLocaleDateString(i18n.language, { dateStyle: 'medium' })}</span>
                              {ans.isReported && (
                                <span className="px-2 py-0.5 bg-rose-100 text-rose-700 rounded-md text-[9px] font-black flex items-center gap-0.5">
                                  <ShieldAlert className="w-3 h-3" />
                                  <span>{isRtl ? "مبلغ" : "Reported"}</span>
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Answer Content */}
                          <div className="text-slate-600 dark:text-neutral-300 text-xs leading-relaxed whitespace-pre-wrap select-text bg-slate-50/30 dark:bg-slate-950/20 p-4 rounded-xl border border-slate-100/50 dark:border-slate-850">
                            {ans.content}
                          </div>

                          {/* Answer Voting and Actions row */}
                          <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-850">
                            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950/50 p-1 rounded-xl border border-slate-150 dark:border-slate-800">
                              
                              {/* Upvote Answer */}
                              <button
                                onClick={() => handleVote(ans.id, 'answer', 'up')}
                                className={cn(
                                  "p-1.5 rounded-lg cursor-pointer transition-colors border-none",
                                  ans.userVote === 'up'
                                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50"
                                    : "text-slate-400 hover:text-slate-600"
                                )}
                                title="Upvote Answer"
                              >
                                <ThumbsUp className="w-3.5 h-3.5" />
                              </button>

                              <span className="text-[11px] font-black text-slate-800 dark:text-neutral-200 px-1">
                                {ans.votes}
                              </span>

                              {/* Downvote Answer */}
                              <button
                                onClick={() => handleVote(ans.id, 'answer', 'down')}
                                className={cn(
                                  "p-1.5 rounded-lg cursor-pointer transition-colors border-none",
                                  ans.userVote === 'down'
                                    ? "bg-rose-50 text-rose-600 dark:bg-rose-950/50"
                                    : "text-slate-400 hover:text-rose-600"
                                )}
                                title="Downvote Answer"
                              >
                                <ThumbsDown className="w-3.5 h-3.5" />
                              </button>

                            </div>

                            {/* Report Answer */}
                            {!ans.isReported && (
                              <button
                                onClick={() => setReportingTarget({ type: 'answer', id: ans.id })}
                                className="text-slate-400 hover:text-rose-600 text-[9px] font-black uppercase tracking-wider flex items-center gap-1 cursor-pointer border-none bg-transparent"
                              >
                                <Flag className="w-3 h-3" />
                                <span>{isRtl ? "إبلاغ" : "Report"}</span>
                              </button>
                            )}
                          </div>

                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-850 rounded-[2rem]">
                      <MessageSquare className="w-10 h-10 text-slate-300 mx-auto mb-3 animate-pulse" />
                      <p className="text-xs font-black text-slate-800 dark:text-neutral-300">{isRtl ? "لا توجد ردود فنية بعد على هذا السؤال." : "No responses compiled yet for this question."}</p>
                      <p className="text-[10px] text-slate-400 font-semibold mt-1">{isRtl ? "كن أول من يكتب رداً مهنياً للمساعدة!" : "Submit the first professional answer below!"}</p>
                    </div>
                  )}
                </div>

                {/* 3.2.2 ANSWER COMPOSER */}
                <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-[2.5rem] shadow-sm space-y-4">
                  <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Plus className="w-5 h-5 text-indigo-500 animate-bounce" />
                    <span>{isRtl ? "إضافة رد مهني أو مقترح قيد" : "Add Your Professional Answer"}</span>
                  </h3>

                  <form onSubmit={handleCreateAnswer} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Name input */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-black text-slate-500 tracking-wider block">
                          {isRtl ? "الاسم الكامل *" : "Your Name *"}
                        </label>
                        <input
                          type="text"
                          required
                          placeholder={isRtl ? "مثال: مراجع مالي..." : "e.g. Audit Senior..."}
                          value={answerAuthor}
                          onChange={(e) => setAnswerAuthor(e.target.value)}
                          className="w-full px-4 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-100 placeholder-slate-400 focus:outline-hidden"
                        />
                      </div>

                      {/* Role input */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-black text-slate-500 tracking-wider block">
                          {isRtl ? "المسمى الوظيفي والشركة" : "Professional Role & Firm"}
                        </label>
                        <input
                          type="text"
                          placeholder={isRtl ? "مثال: محاسب قانوني معتمد..." : "e.g. CPA Candidate..."}
                          value={answerRole}
                          onChange={(e) => setAnswerRole(e.target.value)}
                          className="w-full px-4 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-100 placeholder-slate-400 focus:outline-hidden"
                        />
                      </div>

                    </div>

                    {/* Answer content box */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase font-black text-slate-500 tracking-wider block">
                        {isRtl ? "محتوى الرد الفني والقيود المقترحة بالتفصيل *" : "Advisory Solution / Entry Steps *"}
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder={isRtl ? "اكتب الحل المحاسبي أو الضريبي المقترح والمستندات الداعمة..." : "Write detailed computational advice, relevant standards, and rules..."}
                        value={answerContent}
                        onChange={(e) => setAnswerContent(e.target.value)}
                        className="w-full px-4 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-100 placeholder-slate-400 focus:outline-hidden"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black shadow-md cursor-pointer border-none flex items-center justify-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isRtl ? "إرسال الرد الفني" : "Submit Answer"}</span>
                    </button>
                  </form>
                </div>

              </div>
            ) : (
              
              // 3.3 LIST VIEW OF ALL QUESTIONS
              <div className="space-y-4">
                
                {/* Header title & search status bar */}
                <div className="flex items-center justify-between pb-2">
                  <h3 className="font-black text-base text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <MessageSquare className="w-5 h-5 text-indigo-500" />
                    <span>
                      {activeCategory === 'all' 
                        ? (isRtl ? "جميع المناقشات المطروحة" : "All Discussions") 
                        : (isRtl ? `مناقشات: ${CATEGORIES_DATA.find(c => c.id === activeCategory)?.labelAr}` : `Inquiries in ${CATEGORIES_DATA.find(c => c.id === activeCategory)?.labelEn}`)}
                    </span>
                  </h3>

                  <p className="text-[11px] font-bold text-slate-400">
                    {isRtl ? `تم العثور على ${filteredQuestions.length} سؤال` : `Found ${filteredQuestions.length} questions`}
                  </p>
                </div>

                {/* Question Cards representation */}
                <AnimatePresence mode="popLayout">
                  {filteredQuestions.length > 0 ? (
                    <div className="space-y-4">
                      {filteredQuestions.map(q => {
                        const hasBestAnswer = answers.some(a => a.questionId === q.id && a.votes >= 10);
                        return (
                          <motion.div
                            layout
                            key={q.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className={cn(
                              "bg-white dark:bg-slate-900 border rounded-[2rem] p-5 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row gap-5 items-start justify-between",
                              q.isReported 
                                ? "border-rose-400 bg-rose-50/5 dark:bg-rose-950/5" 
                                : "border-slate-150 dark:border-slate-850 hover:border-indigo-200 dark:hover:border-indigo-900/40"
                            )}
                          >
                            
                            {/* Left Side: Score display + quick categories/tags (vertical/mobile responsive layout) */}
                            <div className="flex items-center md:flex-col justify-between w-full md:w-auto gap-4 md:border-r dark:md:border-r-slate-800 md:pr-4">
                              
                              {/* Voting stats bubble */}
                              <div className="flex items-center md:flex-col gap-1 md:gap-0 text-center">
                                <ThumbsUp className="w-4 h-4 text-indigo-500 md:mb-1" />
                                <span className="text-sm font-black text-slate-800 dark:text-neutral-200">{q.votes}</span>
                                <span className="text-[9px] uppercase font-bold text-slate-400 hidden md:block">{isRtl ? "صوت" : "Votes"}</span>
                              </div>

                              {/* Answers count bubble */}
                              <div className={cn(
                                "flex items-center md:flex-col gap-1 md:gap-0 text-center px-2.5 py-1 rounded-xl",
                                hasBestAnswer 
                                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400" 
                                  : "bg-slate-50 text-slate-600 dark:bg-slate-950/50 dark:text-neutral-400"
                              )}>
                                <MessageSquare className="w-4 h-4 md:mb-1 flex-shrink-0" />
                                <span className="text-xs font-black">{q.answersCount}</span>
                                <span className="text-[8px] uppercase font-bold hidden md:block">{isRtl ? "رد" : "Answers"}</span>
                              </div>

                            </div>

                            {/* Middle Side: Core Content */}
                            <div className="flex-1 space-y-3.5 w-full">
                              
                              {/* Category & Reported flags */}
                              <div className="flex items-center justify-between">
                                <span className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-neutral-400 rounded-md text-[9px] font-black uppercase tracking-wider">
                                  {isRtl 
                                    ? CATEGORIES_DATA.find(c => c.id === q.category)?.labelAr 
                                    : CATEGORIES_DATA.find(c => c.id === q.category)?.labelEn}
                                </span>

                                <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400">
                                  <Clock className="w-3.5 h-3.5" />
                                  <span>{new Date(q.createdAt).toLocaleDateString(i18n.language, { dateStyle: 'medium' })}</span>
                                </div>
                              </div>

                              {/* Title with link */}
                              <div className="space-y-1">
                                <h4 
                                  onClick={() => setSelectedQuestionId(q.id)}
                                  className="font-black text-sm md:text-base text-slate-900 dark:text-white leading-snug cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                >
                                  {q.title}
                                </h4>
                                <p className="text-[11px] md:text-xs text-slate-500 dark:text-neutral-400 leading-relaxed line-clamp-2 select-text">
                                  {q.content}
                                </p>
                              </div>

                              {/* Tags list */}
                              <div className="flex flex-wrap gap-1">
                                {q.tags.map(tag => (
                                  <span key={tag} className="inline-flex items-center gap-0.5 px-2 py-0.5 bg-slate-50 dark:bg-slate-950/40 text-slate-500 dark:text-neutral-400 rounded-md text-[8px] font-bold">
                                    <Tag className="w-2.5 h-2.5 text-slate-400" />
                                    <span>{tag}</span>
                                  </span>
                                ))}
                              </div>

                              {/* Author meta lines */}
                              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-850/50 text-[10px] text-slate-400 font-semibold">
                                <div className="flex items-center gap-1.5">
                                  <User className="w-3.5 h-3.5 text-slate-300" />
                                  <span className="text-slate-600 dark:text-neutral-300 font-bold">{q.authorName}</span>
                                  <span className="text-slate-350">•</span>
                                  <span className="truncate max-w-[120px] md:max-w-none">{q.authorRole}</span>
                                </div>

                                <button
                                  onClick={() => setSelectedQuestionId(q.id)}
                                  className="text-indigo-600 dark:text-indigo-400 font-black flex items-center gap-0.5 cursor-pointer border-none bg-transparent"
                                >
                                  <span>{isRtl ? "قراءة الردود" : "View Answers"}</span>
                                  <ChevronRight className={cn("w-3.5 h-3.5", isRtl ? "rotate-180" : "")} />
                                </button>
                              </div>

                            </div>

                          </motion.div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-20 bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded-[2.5rem]">
                      <AlertCircle className="w-12 h-12 text-slate-300 dark:text-neutral-600 mx-auto mb-4 animate-pulse" />
                      <p className="text-sm font-black text-slate-800 dark:text-neutral-300">
                        {isRtl ? "عذراً، لم نعثر على أي أسئلة تطابق معايير البحث والفلترة." : "No inquiries matching selected filters found."}
                      </p>
                      <button
                        onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                        className="mt-4 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black border-none cursor-pointer"
                      >
                        {isRtl ? "إعادة ضبط البحث" : "Reset Forum Search"}
                      </button>
                    </div>
                  )}
                </AnimatePresence>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* 4. MODAL overlay: SUBMIT REPORT DIALOG */}
      <AnimatePresence>
        {reportingTarget && (
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] w-full max-w-md p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-850">
                <div className="flex items-center gap-2 text-rose-600">
                  <Flag className="w-5 h-5 animate-pulse" />
                  <h3 className="font-black text-sm">{isRtl ? "تقديم بلاغ عن محتوى غير لائق" : "Flag Inappropriate Content"}</h3>
                </div>
                <button
                  onClick={() => setReportingTarget(null)}
                  className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full cursor-pointer text-slate-400 border border-slate-150 dark:border-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmitReport} className="space-y-4">
                <p className="text-[11px] leading-relaxed text-slate-500 dark:text-neutral-400 font-semibold">
                  {isRtl 
                    ? "يرجى تحديد سبب الإبلاغ بوضوح. سيقوم مشرف المنتدى بمراجعة المحتوى واتخاذ الإجراءات الإدارية اللازمة طبقاً للائحة الحوار المهني." 
                    : "Please describe why this content violates community guidelines. The board of moderators will evaluate or delete flagged segments."}
                </p>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-black text-slate-500 tracking-wider block">
                    {isRtl ? "سبب البلاغ أو نوع الإساءة *" : "Select Reason / Context *"}
                  </label>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-neutral-300 focus:outline-hidden"
                  >
                    <option value="">{isRtl ? "اختر سبب الإبلاغ..." : "Select a reason..."}</option>
                    <option value="Spam / إعلانات">{isRtl ? "محتوى دعائي غير مرغوب فيه (Spam)" : "Unsolicited Spam / Advertisements"}</option>
                    <option value="Incorrect calculations / محاسبة خاطئة">{isRtl ? "أرقام أو قيود محاسبية مضللة أو خاطئة تماماً" : "Severely Incorrect Accounting Entries"}</option>
                    <option value="Off-topic / خارج السياق">{isRtl ? "منشور خارج سياق المحاسبة والمالية والضرائب" : "Off-topic / Non-Accounting discussion"}</option>
                    <option value="Abuse / إساءة">{isRtl ? "ألفاظ غير لائقة أو إساءة موجهة للأعضاء" : "Abusive Language or Behavior"}</option>
                  </select>
                </div>

                <div className="flex justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setReportingTarget(null)}
                    className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold cursor-pointer border-none"
                  >
                    {isRtl ? "إلغاء" : "Cancel"}
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-black shadow-md cursor-pointer border-none"
                  >
                    {isRtl ? "إرسال البلاغ للمشرفين" : "Transmit Flag"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
