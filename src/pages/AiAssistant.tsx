import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { 
  Sparkles, 
  Send, 
  Calculator, 
  FileSpreadsheet, 
  Terminal, 
  ShieldCheck, 
  Scale, 
  Briefcase, 
  Languages, 
  Trash2, 
  Copy, 
  Check, 
  HelpCircle,
  FileText,
  AlertCircle
} from 'lucide-react';
import { cn } from '../lib/utils';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  time: string;
}

export default function AiAssistant() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('elijah_ai_history_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback to default
      }
    }
    return [
      {
        role: 'model',
        text: isRtl 
          ? "مرحباً بك في مستشارك المالي الذكي من إيليجا! 🌟\nأنا هنا لمساعدتك في كل ما يتعلق بالخدمات المحاسبية، المعايير الدولية (IFRS)، الضرائب، التدقيق والمراجعة، أتمتة إكسل وVBA، والرواتب والأجور باللغتين العربية والإنجليزية.\n\nتفضل باختيار أحد الموضوعات المقترحة بالأسفل أو اطرح سؤالك مباشرة!"
          : "Welcome to your Elijah AI Financial Advisor! 🌟\nI am here to assist you with accounting principles, International Financial Reporting Standards (IFRS), taxation, auditing & internal control, Excel formulas & VBA automation, and payroll processing in both Arabic and English.\n\nSelect a popular topic below or type your question directly!",
        time: new Date().toLocaleTimeString(isRtl ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });
  
  const [isTyping, setIsTyping] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isDemoMode, setIsDemoMode] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Save chat history to localStorage
  useEffect(() => {
    localStorage.setItem('elijah_ai_history_v1', JSON.stringify(chatHistory));
  }, [chatHistory]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isTyping]);

  // Handle category preset click
  const handlePresetSelect = (prompt: string) => {
    setUserInput(prompt);
  };

  const parseInlineStyles = (text: string): React.ReactNode => {
    if (!text) return '';
    const regex = /(`[^`]+`|\*\*[^*]+\*\*)/g;
    const parts = text.split(regex);
    
    return parts.map((part, index) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        const code = part.slice(1, -1);
        return (
          <code key={index} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[11px] md:text-xs text-blue-600 dark:text-blue-400 font-bold select-text">
            {code}
          </code>
        );
      }
      if (part.startsWith('**') && part.endsWith('**')) {
        const boldText = part.slice(2, -2);
        return (
          <strong key={index} className="font-black text-slate-900 dark:text-white">
            {boldText}
          </strong>
        );
      }
      return part;
    });
  };

  // Format code blocks and bold text in message rendering
  const renderMessageContent = (text: string) => {
    const lines = text.split('\n');
    let inCodeBlock = false;
    let codeContent: string[] = [];
    const formattedElements: React.ReactNode[] = [];

    for (let idx = 0; idx < lines.length; idx++) {
      const line = lines[idx];

      // Check for code block start/end
      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          inCodeBlock = false;
          const fullCode = codeContent.join('\n');
          codeContent = [];
          const currentIndex = idx;
          formattedElements.push(
            <div key={`code-${idx}`} className="relative my-3 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 font-mono text-xs text-left bg-slate-900 text-neutral-200 p-4">
              <div className="absolute right-3 top-3 flex items-center gap-1.5">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(fullCode);
                    setCopiedIndex(currentIndex);
                    setTimeout(() => setCopiedIndex(null), 2000);
                  }}
                  className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Copy code"
                  aria-label="Copy code snippet"
                >
                  {copiedIndex === currentIndex ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <pre className="overflow-x-auto select-text pt-4">{fullCode}</pre>
            </div>
          );
        } else {
          inCodeBlock = true;
        }
        continue;
      }

      if (inCodeBlock) {
        codeContent.push(line);
        continue;
      }

      const trimmed = line.trim();

      // Check for headings
      if (trimmed.startsWith('### ')) {
        const titleText = trimmed.replace('### ', '');
        formattedElements.push(
          <h4 key={idx} className="text-sm font-black text-slate-900 dark:text-white mt-4 mb-2 border-b border-slate-150 dark:border-slate-800 pb-1">
            {parseInlineStyles(titleText)}
          </h4>
        );
        continue;
      } else if (trimmed.startsWith('## ')) {
        const titleText = trimmed.replace('## ', '');
        formattedElements.push(
          <h3 key={idx} className="text-base font-black text-slate-900 dark:text-white mt-5 mb-2.5">
            {parseInlineStyles(titleText)}
          </h3>
        );
        continue;
      } else if (trimmed.startsWith('# ')) {
        const titleText = trimmed.replace('# ', '');
        formattedElements.push(
          <h2 key={idx} className="text-lg font-black text-slate-900 dark:text-white mt-6 mb-3">
            {parseInlineStyles(titleText)}
          </h2>
        );
        continue;
      }

      // Check for bullet lists
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
        const bulletText = trimmed.substring(2);
        formattedElements.push(
          <div key={idx} className={cn("flex items-start gap-2 mb-1.5", isRtl ? "pr-3" : "pl-3")}>
            <span className="text-blue-500 font-extrabold select-none">•</span>
            <div className="text-xs md:text-sm leading-relaxed text-slate-700 dark:text-neutral-300">
              {parseInlineStyles(bulletText)}
            </div>
          </div>
        );
        continue;
      }

      // Check for numbered lists
      const numberMatch = trimmed.match(/^(\d+)\.\s(.*)/);
      if (numberMatch) {
        const num = numberMatch[1];
        const content = numberMatch[2];
        formattedElements.push(
          <div key={idx} className={cn("flex items-start gap-2 mb-1.5", isRtl ? "pr-3" : "pl-3")}>
            <span className="text-blue-500 font-bold text-[11px] select-none">{num}.</span>
            <div className="text-xs md:text-sm leading-relaxed text-slate-700 dark:text-neutral-300">
              {parseInlineStyles(content)}
            </div>
          </div>
        );
        continue;
      }

      // Check for horizontal rule
      if (trimmed === '---' || trimmed === '***') {
        formattedElements.push(
          <hr key={idx} className="my-4 border-slate-150 dark:border-slate-800" />
        );
        continue;
      }

      // Standard paragraph
      if (trimmed === '') {
        formattedElements.push(<div key={idx} className="h-2" />);
      } else {
        formattedElements.push(
          <p key={idx} className="text-xs md:text-sm leading-relaxed mb-1.5 text-slate-700 dark:text-neutral-300">
            {parseInlineStyles(line)}
          </p>
        );
      }
    }

    return formattedElements;
  };

  // Submit User Message
  const handleSendMessage = async () => {
    const trimmedInput = userInput.trim();
    if (!trimmedInput) return;

    const userTime = new Date().toLocaleTimeString(isRtl ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' });
    const newUserMessage: ChatMessage = {
      role: 'user',
      text: trimmedInput,
      time: userTime
    };

    setChatHistory(prev => [...prev, newUserMessage]);
    setUserInput('');
    setIsTyping(true);

    try {
      // Map frontend format to API standard format
      const historyPayload = chatHistory.map(msg => ({
        role: msg.role,
        text: msg.text
      }));

      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmedInput,
          history: historyPayload
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned error ${response.status}`);
      }

      const data = await response.json();
      
      if (data.isDemo) {
        setIsDemoMode(true);
      } else {
        setIsDemoMode(false);
      }

      const aiTime = new Date().toLocaleTimeString(isRtl ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' });
      setChatHistory(prev => [...prev, {
        role: 'model',
        text: data.text || "عذراً، لم أتمكن من معالجة الطلب.",
        time: aiTime
      }]);

    } catch (error) {
      console.error("Failed to chat with Gemini Advisor:", error);
      const aiTime = new Date().toLocaleTimeString(isRtl ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' });
      setChatHistory(prev => [...prev, {
        role: 'model',
        text: isRtl 
          ? "⚠️ عذراً، لم نتمكن من الحصول على رد من المساعد الذكي حالياً. يرجى التحقق من اتصال الشبكة وتفعيل مفتاح GEMINI_API_KEY." 
          : "⚠️ Sorry, could not get a response from the AI assistant. Please check your network connection and ensure your GEMINI_API_KEY is configured.",
        time: aiTime
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearHistory = () => {
    if (window.confirm(isRtl ? "هل أنت متأكد من تصفير محادثة المستشار بالكامل؟" : "Are you sure you want to clear your chat advisor history?")) {
      setChatHistory([
        {
          role: 'model',
          text: isRtl 
            ? "تم تصفير المحادثة بنجاح. أنا جاهز لإرشادك في أي استفسار مالي أو محاسبي جديد!" 
            : "Chat cleared successfully. I am ready to guide you through any new financial or accounting inquiry!",
          time: new Date().toLocaleTimeString(isRtl ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  };

  // Specialized topics categories structure
  const categories = [
    { id: 'all', labelAr: 'الكل', labelEn: 'All', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'accounting', labelAr: 'المحاسبة والقيود', labelEn: 'Accounting & Ledger', icon: <Calculator className="w-4 h-4" /> },
    { id: 'ifrs', labelAr: 'معايير التقارير IFRS', labelEn: 'IFRS Standards', icon: <FileText className="w-4 h-4" /> },
    { id: 'tax', labelAr: 'الضرائب والجمارك', labelEn: 'Tax & Customs', icon: <Scale className="w-4 h-4" /> },
    { id: 'audit', labelAr: 'التدقيق والرقابة', labelEn: 'Audit & Control', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'excel', labelAr: 'إكسل وVBA', labelEn: 'Excel & VBA', icon: <Terminal className="w-4 h-4" /> },
    { id: 'payroll', labelAr: 'الرواتب والتأمينات', labelEn: 'Payroll & Social Insurance', icon: <Briefcase className="w-4 h-4" /> },
  ];

  // Topic specific presets for quick click responses
  const presets = [
    {
      id: 'acc-1',
      category: 'accounting',
      titleAr: 'قيد إهلاك أصل ثابت',
      titleEn: 'Asset Depreciation Entry',
      promptAr: 'اكتب قيد اليومية النموذجي لتسجيل إهلاك الأصول الثابتة السنوي مع توضيح أثر ذلك على ميزان المراجعة وقائمة المركز المالي.',
      promptEn: 'Write the typical journal entry to record annual depreciation of fixed assets, explaining its effect on the trial balance and balance sheet.'
    },
    {
      id: 'acc-2',
      category: 'accounting',
      titleAr: 'قيود فروق العملات',
      titleEn: 'Foreign Exchange Entries',
      promptAr: 'كيف أسجل قيود اليومية الناتجة عن فروق العملات (تقييم أرصدة البنوك الأجنبية في نهاية السنة المالية)؟',
      promptEn: 'How do I record journal entries for foreign exchange differences when revaluing foreign currency bank balances at year-end?'
    },
    {
      id: 'ifrs-1',
      category: 'ifrs',
      titleAr: 'مقارنة IAS 2 و IFRS 9',
      titleEn: 'IAS 2 vs IFRS 9',
      promptAr: 'وضح الفروقات الجوهرية وطرق التقييم للمخزون طبقاً لـ IAS 2 مقارنة بالأصول المالية بموجب معيار IFRS 9.',
      promptEn: 'Explain the core valuation differences between inventory under IAS 2 versus financial assets under IFRS 9.'
    },
    {
      id: 'ifrs-2',
      category: 'ifrs',
      titleAr: 'معيار الإيراد IFRS 15',
      titleEn: 'IFRS 15 Revenue Recognition',
      promptAr: 'اشرح الخطوات الخمس الشهيرة للاعتراف بالإيراد وفقاً للمعيار الدولي للتقارير المالية IFRS 15 مع مثال تطبيقي بشركة عقارات.',
      promptEn: 'Explain the 5-step model for revenue recognition under IFRS 15 with a practical real-estate company scenario.'
    },
    {
      id: 'tax-1',
      category: 'tax',
      titleAr: 'تسوية ضريبة كسب العمل',
      titleEn: 'Salary Tax Settlement',
      promptAr: 'اشرح كيفية إعداد تسوية ضريبة كسب العمل (الرواتب) السنوية بمصر مع تطبيق الإعفاءات الشخصية والشرائح لعام 2026.',
      promptEn: 'Explain how to prepare the annual salary tax (payroll tax) settlement in Egypt, applying the personal exemptions and brackets for 2026.'
    },
    {
      id: 'tax-2',
      category: 'tax',
      titleAr: 'معاملة ضريبة القيمة المضافة',
      titleEn: 'VAT Compliance treatment',
      promptAr: 'ما هي المعاملة الضريبية لضريبة القيمة المضافة (VAT) عند بيع السلع والخدمات المعفاة وتأثيرها على خصم مدخلات الضريبة؟',
      promptEn: 'What is the VAT tax treatment for selling exempt goods/services, and how does it affect input VAT deduction credit?'
    },
    {
      id: 'audit-1',
      category: 'audit',
      titleAr: 'أدلة إثبات التدقيق الخارجي',
      titleEn: 'External Audit Evidence',
      promptAr: 'ما هي أهم أدلة الإثبات (Audit Evidence) التي يعتمد عليها المراجع الخارجي للتحقق من وجود ودقة بند النقدية بالبنوك؟',
      promptEn: 'What are the main audit evidences relied upon by external auditors to verify the existence and accuracy of bank cash balances?'
    },
    {
      id: 'audit-2',
      category: 'audit',
      titleAr: 'تقييم نظام الرقابة الداخلية',
      titleEn: 'Internal Control Assessment',
      promptAr: 'كيف يقيم المراجع الداخلي فاعلية نظام الرقابة الداخلية على إدارة المشتريات والمدفوعات لتجنب الاختلاس والتلاعب؟',
      promptEn: 'How does an internal auditor evaluate the effectiveness of internal control over purchasing and cash disbursements to mitigate fraud?'
    },
    {
      id: 'excel-1',
      category: 'excel',
      titleAr: 'كود VBA لتصدير القيود لـ PDF',
      titleEn: 'VBA Macro to export PDF',
      promptAr: 'اكتب كود VBA مخصص يقوم بنسخ قيود اليومية من شيت الإدخال إلى صفحة طباعة وتصديرها مباشرة بصيغة PDF باسم قيد اليومية.',
      promptEn: 'Write a custom VBA macro that copies journal entries from an input sheet to a print sheet and exports it directly as a PDF named with the entry ID.'
    },
    {
      id: 'excel-2',
      category: 'excel',
      titleAr: 'معادلة XLOOKUP متقدمة',
      titleEn: 'Advanced XLOOKUP Formula',
      promptAr: 'كيف أستخدم معادلة XLOOKUP للبحث المتطابق مع شروط متعددة (البحث عن تكلفة منتج بناءً على اسم المورد وكود الصنف معاً)؟',
      promptEn: 'How do I use XLOOKUP to perform a multi-criteria lookup (searching for product cost based on supplier name and item code together)?'
    },
    {
      id: 'payroll-1',
      category: 'payroll',
      titleAr: 'حساب حصة التأمينات الاجتماعية',
      titleEn: 'Social Insurance calculation',
      promptAr: 'كيف يتم حساب حصة العامل وحصة الشركة في التأمينات الاجتماعية في مصر طبقاً للحد الأقصى والحد الأدنى لأجر الاشتراك لعام 2026؟',
      promptEn: 'How are the employee and employer shares of social insurance calculated in Egypt based on the contribution salary limit for 2026?'
    },
    {
      id: 'payroll-2',
      category: 'payroll',
      titleAr: 'حساب مخصص مكافأة نهاية الخدمة',
      titleEn: 'End of Service Benefit provision',
      promptAr: 'اشرح طريقة احتساب مخصص مكافأة نهاية الخدمة للموظفين (EOSB) بموجب قوانين العمل بدول الخليج العربي ومعالجة القيد المحاسبي.',
      promptEn: 'Explain how to calculate the End of Service Benefits (EOSB) provision for employees under Gulf labor laws and map the accounting journal entry.'
    },
  ];

  // Filter presets based on category selection
  const filteredPresets = activeCategory === 'all' 
    ? presets 
    : presets.filter(p => p.category === activeCategory);

  return (
    <div className="flex flex-col min-h-[calc(100vh-180px)] bg-slate-50/20 dark:bg-slate-950/20 rounded-[2.5rem] border border-slate-200/50 dark:border-slate-800/60 overflow-hidden shadow-glass select-none">
      
      {/* 1. Header Area */}
      <div className="p-6 md:p-8 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-right">
          <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center text-white shadow-lg shadow-blue-500/10">
            <Sparkles className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-neutral-100 flex items-center gap-2">
              {isRtl ? 'المستشار المحاسبي والمالي بالذكاء الاصطناعي' : 'Elijah AI Accounting & Financial Advisor'}
              <span className="text-xs bg-purple-500/10 text-purple-600 dark:text-purple-400 font-extrabold px-2.5 py-1 rounded-full border border-purple-500/20">
                Gemini 3.5
              </span>
            </h1>
            <p className="text-xs text-slate-400 dark:text-neutral-500 font-bold mt-1">
              {isRtl 
                ? 'مساعدك الذكي المعتمد للإجابة عن المعايير، الأجور، الضرائب، التدقيق، معادلات إكسل وVBA' 
                : 'Your certified advisor for IFRS, payroll, taxation, external audit, Excel formulas and VBA codes'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end md:self-center">
          <button
            onClick={handleClearHistory}
            className="flex items-center gap-2 p-2.5 px-4 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 dark:bg-slate-800 dark:hover:bg-rose-950/40 text-slate-500 rounded-xl transition-all font-bold text-xs cursor-pointer"
            title={isRtl ? "تصفير المحادثة" : "Clear Chat"}
          >
            <Trash2 className="w-4 h-4" />
            <span>{isRtl ? 'تصفير' : 'Clear'}</span>
          </button>
        </div>
      </div>

      {/* 2. Main Workspace (Grid layout) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-white/40 dark:bg-slate-900/10">
        
        {/* LEFT COLUMN: Categories & Presets Selector (Responsive desktop left, mobile scrollable top) */}
        <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-l border-slate-100 dark:border-slate-800/80 flex flex-col overflow-y-auto max-h-[300px] lg:max-h-[calc(100vh-280px)] p-6 bg-slate-50/50 dark:bg-slate-900/20">
          <h2 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4 text-right">
            {isRtl ? 'محاور الاستشارة المتخصصة' : 'Specialized Inquiry Modules'}
          </h2>

          {/* Categories Grid */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 lg:mb-6 custom-scrollbar shrink-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-xs font-bold rounded-2xl transition-all cursor-pointer border shrink-0 text-right w-auto lg:w-full",
                  activeCategory === cat.id
                    ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/10 font-extrabold"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-neutral-400 border-slate-150 dark:border-slate-800 hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
                )}
              >
                <div className={cn(
                  "w-6 h-6 rounded-lg flex items-center justify-center shrink-0",
                  activeCategory === cat.id ? "bg-white/10 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                )}>
                  {cat.icon}
                </div>
                <span>{isRtl ? cat.labelAr : cat.labelEn}</span>
              </button>
            ))}
          </div>

          {/* Presets List */}
          <div className="hidden lg:flex flex-col gap-3 flex-grow">
            <h3 className="text-xs font-extrabold text-slate-400 dark:text-neutral-500 text-right">
              {isRtl ? 'استفسارات جاهزة للمطابقة والتدريب:' : 'Ready-to-use Training Inquiries:'}
            </h3>
            <div className="space-y-2.5 overflow-y-auto max-h-[300px] pr-1">
              {filteredPresets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handlePresetSelect(isRtl ? preset.promptAr : preset.promptEn)}
                  className="w-full text-right p-3 bg-white dark:bg-slate-900/60 rounded-xl border border-slate-150 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-colors group cursor-pointer"
                >
                  <p className="text-xs font-black text-slate-700 dark:text-neutral-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {isRtl ? preset.titleAr : preset.titleEn}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                    {isRtl ? preset.promptAr : preset.promptEn}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Chat Area */}
        <div className="lg:col-span-8 flex flex-col h-[500px] lg:h-[calc(100vh-280px)] overflow-hidden bg-white dark:bg-slate-900/20">
          
          {/* Demo Mode Notice Banner */}
          {isDemoMode && (
            <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border-b border-amber-100 dark:border-amber-900/30 flex items-center gap-2 px-6">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <p className="text-[10px] md:text-xs text-amber-700 dark:text-amber-400 font-extrabold text-right w-full leading-relaxed">
                {isRtl 
                  ? "تنبيه: مفتاح GEMINI_API_KEY غير مفعّل. النظام يعمل بوضع المحاكاة المالي الإرشادي التفاعلي لمساعدتك على التجربة." 
                  : "Note: GEMINI_API_KEY is not configured. Elijah AI is running in interactive financial simulation mode."}
              </p>
            </div>
          )}

          {/* Chat Ballons Scroll Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/20 dark:bg-slate-950/5 custom-scrollbar">
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col max-w-[85%] rounded-3xl p-5 shadow-sm transition-all",
                  msg.role === 'model'
                    ? "bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 self-start text-right text-slate-800 dark:text-neutral-200"
                    : "bg-gradient-to-br from-blue-600 to-indigo-600 text-white self-end text-right"
                )}
              >
                <div className="select-text whitespace-pre-line text-sm leading-relaxed">
                  {msg.role === 'model' ? renderMessageContent(msg.text) : msg.text}
                </div>
                <span className={cn(
                  "text-[9px] mt-2 font-bold block",
                  msg.role === 'model' ? "text-slate-400" : "text-blue-200"
                )}>
                  {msg.time}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-5 self-start shadow-sm flex items-center gap-3">
                <span className="text-xs text-purple-600 font-black animate-pulse">
                  {isRtl ? 'يقوم المستشار المالي بالتحليل والصياغة' : 'Elijah AI Advisor is analyzing'}
                </span>
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-bounce delay-75" />
                  <span className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-bounce delay-150" />
                  <span className="w-1.5 h-1.5 bg-purple-600 rounded-full animate-bounce delay-300" />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Mobile presets list trigger scroll */}
          <div className="flex lg:hidden p-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-150 dark:border-slate-800 overflow-x-auto gap-2">
            {filteredPresets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handlePresetSelect(isRtl ? preset.promptAr : preset.promptEn)}
                className="text-[10px] font-bold bg-white dark:bg-slate-800 border border-slate-250 dark:border-slate-700 px-3 py-1.5 rounded-full shrink-0 text-slate-600 dark:text-neutral-300 cursor-pointer hover:bg-slate-50"
              >
                {isRtl ? preset.titleAr : preset.titleEn}
              </button>
            ))}
          </div>

          {/* Form input bar */}
          <div className="p-4 md:p-6 bg-white dark:bg-slate-900 border-t border-slate-150 dark:border-slate-800">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder={isRtl ? "اطرح تحدياً محاسبياً، استفسار ضريبي، أو اطلب ماكرو VBA..." : "Ask an accounting challenge, tax inquiry, or VBA macro..."}
                aria-label={isRtl ? "سؤال المساعد المالي والضريبي الذكي" : "Ask the AI financial and tax advisor"}
                className="w-full pr-5 pl-14 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-750 rounded-2xl text-xs md:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:bg-white text-right text-slate-800 dark:text-neutral-100"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!userInput.trim() || isTyping}
                aria-label={isRtl ? "إرسال الاستفسار" : "Send inquiry"}
                className="absolute left-3 p-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl shadow-lg shadow-blue-500/10 cursor-pointer transition-transform duration-100 active:scale-95"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex items-center justify-between mt-3 text-[10px] text-slate-400 font-bold px-1 select-none">
              <span className="flex items-center gap-1">
                <Languages className="w-3.5 h-3.5 text-blue-500" />
                <span>العربية والإنجليزية مدعومتان بالكامل</span>
              </span>
              <span>مركز إيليجا للخدمات المالية</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
