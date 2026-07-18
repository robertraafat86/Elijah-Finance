import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const METADATA_MAP: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'إيليجا للخدمات المالية والمحاسبية | استشارات ودعم مالي متكامل',
    description: 'مركز ايليجا للخدمات المالية والمحاسبية - الموقع الاحترافي الأول لخدمات المحاسبة، المراجعة، الاستشارات الضريبية، دراسات الجدوى، وشرح المعايير المصرية والدورة المحاسبية.',
  },
  '/accounting-cycle': {
    title: 'شرح الدورة المحاسبية بالتفصيل والخطوات العملية | إيليجا',
    description: 'تعرف على الدورة المحاسبية الشاملة من تسجيل العمليات في دفتر اليومية، الترحيل لدفتر الأستاذ، إعداد ميزان المراجعة وحتى تصوير القوائم المالية والاقفالات.',
  },
  '/financial-statements': {
    title: 'شرح القوائم المالية وإعدادها وفق المعايير | إيليجا',
    description: 'دليل كامل لفهم وإعداد القوائم المالية الأربعة الرئيسية: قائمة الدخل، الميزانية العمومية، قائمة التدفقات النقدية، وقائمة التغير في حقوق الملكية.',
  },
  '/accounting-standards': {
    title: 'شرح معايير المحاسبة الدولية والمهنية | إيليجا',
    description: 'استكشف معايير التقارير المالية الدولية (IFRS) وكيفية تطبيقها في التقارير والقوائم المالية للشركات والمؤسسات بأسلوب عملي مبسط.',
  },
  '/egyptian-standards': {
    title: 'معايير المحاسبة المصرية وتحديثاتها الأخيرة | إيليجا',
    description: 'شرح تفصيلي لمعايير المحاسبة المصرية وتعديلاتها، وقوانين الضرائب والاستثمار ذات الصلة ببيئة الأعمال والمحاسبة في مصر.',
  },
  '/financial-regulations': {
    title: 'اللوائح المالية والسياسات الرقابية للشركات | إيليجا',
    description: 'كيفية صياغة وتطبيق اللائحة المالية الداخلية للشركات والمؤسسات لضمان حوكمة وضبط العمليات المالية والإدارية بدقة وتجنب المخاطر.',
  },
  '/inventory': {
    title: 'جرد المخزون وطرق تقييم وتكلفة البضاعة | إيليجا',
    description: 'شرح جرد المخزون المستمر والدوري، وطرق تقييم المخازن (FIFO, LIFO, متوسط التكلفة المرجح) والمعالجات القيودية المرتبطة بها.',
  },
  '/bank-reconciliation': {
    title: 'إعداد مذكرة تسوية البنك ومعالجة الفروقات | إيليجا',
    description: 'تعلم كيفية إعداد مذكرة تسوية حساب البنك خطوة بخطوة لمطابقة رصيد الدفاتر مع كشف حساب البنك وإجراء القيود التصحيحية اللازمة.',
  },
  '/internal-audit': {
    title: 'المراجعة والرقابة الداخلية وتأمين العمليات | إيليجا',
    description: 'الرقابة الداخلية وأنظمة الضبط الداخلي، ومهام المراجع الداخلي في كشف الأخطاء ومنع الاحتيال المالي والإداري داخل المنشأة.',
  },
  '/accounting-portal': {
    title: 'البوابة المحاسبية الشاملة والموارد المهنية | إيليجا',
    description: 'بوابتك التعليمية الشاملة للوصول إلى أدوات المحاسبة، الكتب، المقالات، وتطبيقات عملية على قضايا وموضوعات المحاسبة والمالية المعاصرة.',
  },
  '/tax-accounting': {
    title: 'المحاسبة الضريبية وإعداد الإقرارات في مصر | إيليجا',
    description: 'شرح الضرائب المصرية من ضريبة الدخل، ضريبة القيمة المضافة، ضريبة كسب العمل، وضريبة الخصم والتحصيل تحت حساب الضريبة.',
  },
  '/customs-duties': {
    title: 'الجمارك والتعرفة والقيود الجمركية | إيليجا',
    description: 'كل ما تود معرفته عن المعالجة المحاسبية للجمارك، التعرفة الجمركية، الفحص الجمركي، وحساب التكاليف الاستيرادية للبضائع والسلع.',
  },
  '/construction-accounting': {
    title: 'محاسبة المقاولات ومستخلصات التنفيذ | إيليجا',
    description: 'شرح شامل لنظام محاسبة المقاولات، قيود اليومية، معالجة مستخلصات العملاء ومقاولي الباطن، والاعتراف بالإيرادات لنسبة الإنجاز.',
  },
  '/hospital-accounting': {
    title: 'محاسبة المستشفيات والوحدات الصحية والمراكز | إيليجا',
    description: 'الخصائص المميزة لنظام محاسبة المستشفيات، توجيه إيرادات وتكاليف الأقسام الطبية، والتقارير المالية للأنشطة غير الهادفة للربح.',
  },
  '/cost-accounting': {
    title: 'محاسبة التكاليف الصناعية وأنظمة التكاليف | إيليجا',
    description: 'دليل شامل لأنظمة محاسبة التكاليف (تكاليف المراحل، تكاليف الأوامر الإنتاجية)، وتوزيع التكاليف الصناعية غير المباشرة بالتفصيل.',
  },
  '/financial-analysis': {
    title: 'التحليل المالي والنسب المالية لتقييم الأداء | إيليجا',
    description: 'تعلم أدوات التحليل المالي الأفقي والرأسي، وحساب النسب المالية (السيولة، الربحية، النشاط، والرافعة المالية) لدعم اتخاذ القرار.',
  },
  '/accounting-tools': {
    title: 'أدوات محاسبية وآلات حاسبة ذكية تفاعلية | إيليجا',
    description: 'آلات حاسبة تفاعلية مجانية لحساب ضريبة القيمة المضافة، ضريبة كسب العمل، استهلاك الأصول الثابتة، والنسب المالية الحيوية بشكل فوري.',
  },
  '/services': {
    title: 'خدماتنا الاستشارية والمحاسبية المتكاملة | إيليجا',
    description: 'تصفح باقة خدماتنا التي تشمل تصميم الدورة المستندية، تأسيس الشركات، إعداد القوائم المالية، المراجعة والتدقيق، والاستشارات الضريبية.',
  },
  '/about': {
    title: 'من نحن - مركز إيليجا للخدمات المالية والاستشارات | إيليجا',
    description: 'تعرف على رؤيتنا ورسالتنا وفريق العمل المتخصص في تقديم الحلول والاستشارات المحاسبية والمالية والضريبية المتميزة لرواد الأعمال والشركات.',
  },
  '/contact': {
    title: 'اتصل بنا وتواصل مع مستشاري إيليجا الماليين | إيليجا',
    description: 'يسعدنا تواصلكم معنا للحصول على استشارات مالية وضريبية احترافية. تواصل معنا عبر البريد، الهاتف، أو تطبيق واتساب مباشرة.',
  },
  '/ai-assistant': {
    title: 'المستشار المحاسبي والمالي الذكي بالذكاء الاصطناعي | إيليجا',
    description: 'استشر مساعدنا المالي الذكي المدعوم بـ Gemini للإجابة الفورية عن معايير المحاسبة الدولية والمصرية، الضرائب، الرواتب والأجور، وأكواد ماكرو VBA وإكسل المتقدمة.',
  },
};

export default function SEOManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const metadata = METADATA_MAP[pathname] || METADATA_MAP['/'];
    
    // Update Title
    document.title = metadata.title;

    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', metadata.description);

    // Update Canonical URL
    const baseUrl = typeof window !== 'undefined' && window.location && window.location.origin 
      ? window.location.origin 
      : 'https://ais-pre-ah2i5eyc7kw6ilruxwp6dd-51421988619.europe-west2.run.app';
    const canonicalUrl = `${baseUrl}${pathname === '/' ? '' : pathname}`;
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

    // Update Open Graph
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', metadata.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', metadata.description);

    // Update Twitter Cards
    const twitterUrl = document.querySelector('meta[property="twitter:url"]');
    if (twitterUrl) twitterUrl.setAttribute('content', canonicalUrl);

    const twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute('content', metadata.title);

    const twitterDesc = document.querySelector('meta[property="twitter:description"]');
    if (twitterDesc) twitterDesc.setAttribute('content', metadata.description);

  }, [pathname]);

  return null;
}
