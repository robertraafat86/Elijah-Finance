import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';
import {
  FileText,
  Users,
  ShoppingBag,
  CreditCard,
  BookOpen,
  FileSpreadsheet,
  MessageSquare,
  Search,
  Settings,
  Activity,
  TrendingUp,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Globe,
  Sliders,
  Calendar,
  DollarSign,
  Filter,
  Lock,
  Unlock,
  ArrowUpRight,
  CheckCircle,
  AlertTriangle,
  Menu,
  Grid,
  ChevronRight,
  Eye,
  RefreshCcw,
  UserPlus,
  ShieldAlert,
  Database,
  BarChart3,
  ThumbsUp,
  Award,
  Megaphone,
  MousePointerClick,
  ExternalLink,
  Layers,
  Tv,
  LayoutGrid,
  Radio,
  Code,
  Image
} from 'lucide-react';
import { cn } from '../lib/utils';
import AdsRenderer, { getStoredCampaigns, saveStoredCampaigns, AdCampaign } from '../components/AdsRenderer';
import AnalyticsDashboard from '../components/AnalyticsDashboard';

// --- Interfaces for Management Systems ---
interface Article {
  id: string;
  title: string;
  author: string;
  category: string;
  status: 'Published' | 'Draft';
  views: number;
  date: string;
}

interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: 'Administrator' | 'Accountant' | 'Student' | 'Auditor';
  status: 'Active' | 'Banned';
  joinedDate: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  sales: number;
  category: string;
}

interface Order {
  id: string;
  customer: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Cancelled';
  date: string;
  item: string;
}

interface Course {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  enrolled: number;
  rating: number;
}

interface TemplateItem {
  id: string;
  title: string;
  downloads: number;
  fileSize: string;
  format: 'Excel' | 'Word' | 'PDF';
  category: string;
}

interface CommentItem {
  id: string;
  author: string;
  content: string;
  source: string; // Blog, Forum, or Academy
  status: 'Approved' | 'Pending';
  date: string;
}

interface SEOConfig {
  pagePath: string;
  titleTag: string;
  descriptionTag: string;
  keywords: string;
  indexable: boolean;
}

export default function AdminDashboard() {
  const { i18n, t } = useTranslation();
  const isRtl = i18n.language === 'ar';

  // --- Theme Syncing ---
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  // --- Active Tab State ---
  // Requested: Articles, Users, Products, Orders, Courses, Templates, Comments, SEO, Analytics, Settings
  type AdminTab = 
    | 'overview' 
    | 'articles' 
    | 'users' 
    | 'products' 
    | 'orders' 
    | 'courses' 
    | 'templates' 
    | 'comments' 
    | 'seo' 
    | 'analytics' 
    | 'settings'
    | 'ads';
    
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- Shared Toast Notification ---
  const [toast, setToast] = useState<{ messageAr: string; messageEn: string; type: 'success' | 'info' | 'error' } | null>(null);
  const showToast = (messageAr: string, messageEn: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ messageAr, messageEn, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ==========================================
  // --- SEED / PERSISTENT MOCK STATE STORAGE ---
  // ==========================================

  // 1. Articles
  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('admin_articles');
    return saved ? JSON.parse(saved) : [
      { id: 'art-1', title: 'دليل شامل لمعيار المحاسبة المصري رقم 10 الأصول الثابتة', author: 'أ. رأفت عبد العزيز', category: 'معايير مصرية', status: 'Published', views: 1240, date: '2026-07-01' },
      { id: 'art-2', title: 'تأثير التحول الرقمي على مهنة المراجعة والتدقيق القانوني', author: 'د. ليلى الشافعي', category: 'تكنولوجيا مالية', status: 'Published', views: 890, date: '2026-07-05' },
      { id: 'art-3', title: 'المعالجة الضريبية للخسائر المرحلة طبقاً للقانون المصري', author: 'أ. محمد سليمان', category: 'محاسبة ضريبية', status: 'Draft', views: 0, date: '2026-07-12' },
      { id: 'art-4', title: 'قائمة التدفقات النقدية: طرق الإعداد المباشرة وغير المباشرة', author: 'أ. رأفت عبد العزيز', category: 'قوائم مالية', status: 'Published', views: 2450, date: '2026-06-25' }
    ];
  });

  // 2. Users
  const [users, setUsers] = useState<SystemUser[]>(() => {
    const saved = localStorage.getItem('admin_users');
    return saved ? JSON.parse(saved) : [
      { id: 'usr-1', name: 'رأفت عبد العزيز', email: 'robert.raafat.86@gmail.com', role: 'Administrator', status: 'Active', joinedDate: '2026-01-15' },
      { id: 'usr-2', name: 'أحمد محمود القاضي', email: 'ahmed.kadi@audit-eg.com', role: 'Auditor', status: 'Active', joinedDate: '2026-03-22' },
      { id: 'usr-3', name: 'سارة عبد الرحمن', email: 'sara.student@elijah.com', role: 'Student', status: 'Active', joinedDate: '2026-06-10' },
      { id: 'usr-4', name: 'هاني أبو المجد', email: 'hany.majd@company.com', role: 'Accountant', status: 'Banned', joinedDate: '2026-05-02' }
    ];
  });

  // 3. Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('admin_products');
    return saved ? JSON.parse(saved) : [
      { id: 'prd-1', name: 'كتاب المعايير المحاسبية المصرية والشرح المبسط', price: 45, stock: 120, sales: 84, category: 'كتب مطبوعة' },
      { id: 'prd-2', name: 'حزمة إكسل المتكاملة للحسابات اليومية والميزانية العمومية', price: 29, stock: 999, sales: 312, category: 'قوالب رقمية' },
      { id: 'prd-3', name: 'برنامج التحليل المالي السريع للميزانيات المقارنة', price: 89, stock: 150, sales: 45, category: 'برامج وتطبيقات' },
      { id: 'prd-4', name: 'استمارة تقييم وإهلاك الأصول الثابتة السنوية العبقرية', price: 15, stock: 500, sales: 189, category: 'قوالب رقمية' }
    ];
  });

  // 4. Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('admin_orders');
    return saved ? JSON.parse(saved) : [
      { id: 'ord-1001', customer: 'أحمد محمود القاضي', amount: 45, status: 'Completed', date: '2026-07-13', item: 'كتاب المعايير المصرية' },
      { id: 'ord-1002', customer: 'سارة عبد الرحمن', amount: 29, status: 'Completed', date: '2026-07-14', item: 'حزمة إكسل المتكاملة' },
      { id: 'ord-1003', customer: 'خالد مصطفى المري', amount: 89, status: 'Pending', date: '2026-07-14', item: 'برنامج التحليل المالي' },
      { id: 'ord-1004', customer: 'مريم حسن عبد العال', amount: 15, status: 'Cancelled', date: '2026-07-10', item: 'استمارة إهلاك الأصول' }
    ];
  });

  // 5. Courses
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('admin_courses');
    return saved ? JSON.parse(saved) : [
      { id: 'crs-1', title: 'البرنامج الشامل لإعداد المحاسب القانوني المعتمد ESA', instructor: 'د. ليلى الشافعي', duration: '36 ساعة', enrolled: 184, rating: 4.9 },
      { id: 'crs-2', title: 'محاسبة المقاولات والتكاليف الضريبية المتقدمة', instructor: 'أ. رأفت عبد العزيز', duration: '20 ساعة', enrolled: 142, rating: 4.8 },
      { id: 'crs-3', title: 'تطبيقات المراجعة والتدقيق المالي باستخدام برنامج إكسل', instructor: 'أ. محمد سليمان', duration: '15 ساعة', enrolled: 95, rating: 4.7 }
    ];
  });

  // 6. Templates
  const [templates, setTemplates] = useState<TemplateItem[]>(() => {
    const saved = localStorage.getItem('admin_templates');
    return saved ? JSON.parse(saved) : [
      { id: 'tmp-1', title: 'نموذج دفتر اليومية الأمريكية بـ 24 عمود رئيسي', downloads: 1420, fileSize: '2.4 MB', format: 'Excel', category: 'دفاتر محاسبية' },
      { id: 'tmp-2', title: 'قالب ورقة العمل لتسوية فروق جرد بضاعة آخر المدة', downloads: 840, fileSize: '1.1 MB', format: 'Excel', category: 'تسويات جردية' },
      { id: 'tmp-3', title: 'نموذج تقرير المراجع الخارجي المستقل عن الميزانية', downloads: 930, fileSize: '420 KB', format: 'Word', category: 'تقارير مراجعة' },
      { id: 'tmp-4', title: 'نموذج إقرار ضريبة القيمة المضافة الشهري الاسترشادي', downloads: 2150, fileSize: '1.8 MB', format: 'PDF', category: 'نماذج ضريبية' }
    ];
  });

  // 7. Comments
  const [comments, setComments] = useState<CommentItem[]>(() => {
    const saved = localStorage.getItem('admin_comments');
    return saved ? JSON.parse(saved) : [
      { id: 'cmt-1', author: 'م. عمر ياسر', content: 'شرح رائع جداً لمعالجة مجمع الإهلاك في معيار الأصول الثابتة. شكراً لكم.', source: 'المدونة المحاسبية', status: 'Approved', date: '2026-07-11' },
      { id: 'cmt-2', author: 'أ. هناء السعيد', content: 'هل يمكن تحديث معادلات نموذج دفتر اليومية ليعمل مع الأرقام الإنجليزية والفرنسية؟', source: 'المنتدى المهني', status: 'Pending', date: '2026-07-13' },
      { id: 'cmt-3', author: 'حازم الدمرداش', content: 'كيف يتم ربط كورس المقاولات مع بوابة الأصول الثابتة؟ لم أجد الخيار.', source: 'أكاديمية إيليجا', status: 'Pending', date: '2026-07-14' }
    ];
  });

  // 8. SEO Configs
  const [seoConfigs, setSeoConfigs] = useState<SEOConfig[]>(() => {
    const saved = localStorage.getItem('admin_seo');
    return saved ? JSON.parse(saved) : [
      { pagePath: '/', titleTag: 'بوابة إيليجا المحاسبية | الشريك المهني للمحاسب العربي', descriptionTag: 'المنصة المتكاملة للمحاسبة الضريبية، معايير المحاسبة المصرية والدولية، تدريبات المحاسبين القانونيين وقوالب إكسل الجاهزة.', keywords: 'محاسبة, معايير محاسبة, مراجعة مالية, إكسل محاسبي', indexable: true },
      { pagePath: '/accounting-tools', titleTag: 'آلات حاسبة ومحاكيات محاسبية احترافية مجانية', descriptionTag: 'احسب إهلاك الأصول الثابتة، والديون المعدومة، ومذكرات تسوية البنوك والضرائب بنقرة واحدة.', keywords: 'حساب الإهلاك, تسوية البنك, حساب ضرائب, آلة حاسبة', indexable: true },
      { pagePath: '/templates-library', titleTag: 'مكتبة تحميل قوالب إكسل ونماذج محاسبية احترافية جاهزة', descriptionTag: 'قم بتحميل أكثر من 100 نموذج إكسل محاسبي مجاني للمؤسسات، والمخازن، والمقاولات واليومية العامة.', keywords: 'تحميل قوالب إكسل, نموذج دفتر يومية, محاسبة جاهزة', indexable: true }
    ];
  });

  // 9. Site Settings
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('admin_settings');
    return saved ? JSON.parse(saved) : {
      siteNameAr: 'منظومة إيليجا المحاسبية والمهنية',
      siteNameEn: 'Elijah Accounting & Professional Suite',
      contactEmail: 'robert.raafat.86@gmail.com',
      whatsappContact: '+201234567890',
      maintenanceMode: false,
      enableAIAssist: true,
      defaultCurrency: 'USD',
      backupInterval: 'weekly'
    };
  });

  // --- Sync back to LocalStorage on state modifications ---
  useEffect(() => { localStorage.setItem('admin_articles', JSON.stringify(articles)); }, [articles]);
  useEffect(() => { localStorage.setItem('admin_users', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('admin_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('admin_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('admin_courses', JSON.stringify(courses)); }, [courses]);
  useEffect(() => { localStorage.setItem('admin_templates', JSON.stringify(templates)); }, [templates]);
  useEffect(() => { localStorage.setItem('admin_comments', JSON.stringify(comments)); }, [comments]);
  useEffect(() => { localStorage.setItem('admin_seo', JSON.stringify(seoConfigs)); }, [seoConfigs]);
  useEffect(() => { localStorage.setItem('admin_settings', JSON.stringify(settings)); }, [settings]);

  // --- Advertisement Campaigns persistent state ---
  const [adCampaigns, setAdCampaigns] = useState<AdCampaign[]>(() => {
    return getStoredCampaigns();
  });

  useEffect(() => {
    saveStoredCampaigns(adCampaigns);
  }, [adCampaigns]);

  // --- Ad Form States ---
  const [newAdName, setNewAdName] = useState('');
  const [newAdType, setNewAdType] = useState<'google_ads' | 'banner' | 'sidebar' | 'native'>('banner');
  const [newAdPlacement, setNewAdPlacement] = useState('blog_top');
  const [newAdTargetUrl, setNewAdTargetUrl] = useState('');
  const [newAdImageUrl, setNewAdImageUrl] = useState('');
  const [newAdSponsorName, setNewAdSponsorName] = useState('');
  const [newAdSponsorDescription, setNewAdSponsorDescription] = useState('');
  const [newAdGoogleClient, setNewAdGoogleClient] = useState('ca-pub-8612345678908686');
  const [newAdGoogleSlot, setNewAdGoogleSlot] = useState('');
  const [newAdCpc, setNewAdCpc] = useState(0.40);
  const [newAdCpm, setNewAdCpm] = useState(2.50);
  const [newAdStartDate, setNewAdStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [newAdEndDate, setNewAdEndDate] = useState(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);

  // Preview target selection
  const [previewCampaignId, setPreviewCampaignId] = useState<string>('ad-b1');

  // Ad Handlers
  const handleAddAdCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdName.trim()) return;

    const item: AdCampaign = {
      id: `ad-${Date.now()}`,
      name: newAdName,
      type: newAdType,
      placement: newAdPlacement,
      status: 'Active',
      impressions: 0,
      clicks: 0,
      ctr: 0,
      earnings: 0,
      cpc: Number(newAdCpc) || 0.40,
      cpm: Number(newAdCpm) || 2.50,
      targetUrl: newAdTargetUrl || '#',
      imageUrl: newAdImageUrl || undefined,
      sponsorName: newAdSponsorName || undefined,
      sponsorDescription: newAdSponsorDescription || undefined,
      googleAdClient: newAdType === 'google_ads' ? newAdGoogleClient : undefined,
      googleAdSlot: newAdType === 'google_ads' ? newAdGoogleSlot : undefined,
      startDate: newAdStartDate,
      endDate: newAdEndDate
    };

    setAdCampaigns([item, ...adCampaigns]);
    
    // Reset form states
    setNewAdName('');
    setNewAdTargetUrl('');
    setNewAdImageUrl('');
    setNewAdSponsorName('');
    setNewAdSponsorDescription('');
    setNewAdGoogleSlot('');
    
    showToast("تم إنشاء الحملة الإعلانية بنجاح وتفعيلها", "Ad Campaign successfully launched and activated!");
  };

  const handleToggleAdStatus = (id: string) => {
    setAdCampaigns(adCampaigns.map(c => {
      if (c.id === id) {
        const nextStatus = c.status === 'Active' ? 'Paused' : 'Active';
        return { ...c, status: nextStatus };
      }
      return c;
    }));
    showToast("تم تحديث حالة الحملة الإعلانية", "Ad campaign status updated successfully!");
  };

  const handleResetAdAnalytics = (id: string) => {
    setAdCampaigns(adCampaigns.map(c => {
      if (c.id === id) {
        return { ...c, impressions: 0, clicks: 0, ctr: 0, earnings: 0 };
      }
      return c;
    }));
    showToast("تم تصفير إحصائيات الإعلان بنجاح", "Ad performance metrics successfully reset!");
  };

  const handleDeleteAdCampaign = (id: string) => {
    if (confirm(isRtl ? "هل أنت متأكد من حذف هذه الحملة الإعلانية؟" : "Are you sure you want to delete this ad campaign?")) {
      setAdCampaigns(adCampaigns.filter(c => c.id !== id));
      showToast("تم حذف الحملة الإعلانية بنجاح", "Ad campaign deleted successfully!");
    }
  };

  const handleSimulateTraffic = () => {
    setAdCampaigns(adCampaigns.map(c => {
      if (c.status === 'Active') {
        const addedImpressions = Math.floor(Math.random() * 450) + 150;
        const ctrSim = (Math.random() * 4 + 1) / 100;
        const addedClicks = Math.floor(addedImpressions * ctrSim);
        const nextImpressions = c.impressions + addedImpressions;
        const nextClicks = c.clicks + addedClicks;
        const nextCtr = nextImpressions > 0 ? Number(((nextClicks / nextImpressions) * 100).toFixed(2)) : 0;
        
        let nextEarnings = c.earnings;
        nextEarnings += (addedClicks * c.cpc) + (addedImpressions * c.cpm / 1000);

        return {
          ...c,
          impressions: nextImpressions,
          clicks: nextClicks,
          ctr: nextCtr,
          earnings: Number(nextEarnings.toFixed(2))
        };
      }
      return c;
    }));
    showToast("تم محاكاة زيارات المرور بنجاح للمنشورات النشطة", "Dynamic traffic simulation complete for all active campaigns!");
  };


  // ==========================================
  // --- INLINE CRUD / INTERACTION HANDLERS ---
  // ==========================================

  // --- Search / Filter States ---
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Articles Actions
  const [newArtTitle, setNewArtTitle] = useState('');
  const [newArtAuthor, setNewArtAuthor] = useState('');
  const [newArtCategory, setNewArtCategory] = useState('معايير مصرية');
  
  const handleAddArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArtTitle.trim()) return;
    const item: Article = {
      id: `art-${Date.now()}`,
      title: newArtTitle,
      author: newArtAuthor || 'أ. رأفت عبد العزيز',
      category: newArtCategory,
      status: 'Draft',
      views: 0,
      date: new Date().toISOString().split('T')[0]
    };
    setArticles([item, ...articles]);
    setNewArtTitle('');
    showToast("تمت إضافة المقال كمسودة بنجاح", "Article successfully added as Draft!");
  };

  const toggleArticleStatus = (id: string) => {
    setArticles(articles.map(art => {
      if (art.id === id) {
        const nextStatus = art.status === 'Published' ? 'Draft' : 'Published';
        return { ...art, status: nextStatus };
      }
      return art;
    }));
    showToast("تم تحديث حالة المقال", "Article status successfully modified!");
  };

  const handleDeleteArticle = (id: string) => {
    if (confirm(isRtl ? "هل أنت متأكد من حذف هذا المقال؟" : "Are you sure you want to delete this article?")) {
      setArticles(articles.filter(art => art.id !== id));
      showToast("تم حذف المقال بنجاح", "Article successfully deleted!");
    }
  };

  // 2. Users Actions
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<'Administrator' | 'Accountant' | 'Student' | 'Auditor'>('Accountant');

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) return;
    const item: SystemUser = {
      id: `usr-${Date.now()}`,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      status: 'Active',
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setUsers([item, ...users]);
    setNewUserName('');
    setNewUserEmail('');
    showToast("تم تسجيل العضو المحاسب الجديد بنجاح", "New system user successfully registered!");
  };

  const toggleUserStatus = (id: string) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === 'Active' ? 'Banned' : 'Active';
        return { ...u, status: nextStatus };
      }
      return u;
    }));
    showToast("تم تعديل صلاحية دخول المستخدم", "User security restrictions updated!");
  };

  const handleDeleteUser = (id: string) => {
    if (confirm(isRtl ? "هل أنت متأكد من مسح حساب هذا المستخدم نهائياً؟" : "Are you sure you want to permanently delete this user?")) {
      setUsers(users.filter(u => u.id !== id));
      showToast("تم حذف المستخدم من النظام", "User deleted from system databases!");
    }
  };

  // 3. Products Actions
  const [newProdName, setNewProdName] = useState('');
  const [newProdPrice, setNewProdPrice] = useState(0);
  const [newProdStock, setNewProdStock] = useState(10);
  const [newProdCategory, setNewProdCategory] = useState('قوالب رقمية');

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName.trim()) return;
    const item: Product = {
      id: `prd-${Date.now()}`,
      name: newProdName,
      price: Number(newProdPrice),
      stock: Number(newProdStock),
      sales: 0,
      category: newProdCategory
    };
    setProducts([item, ...products]);
    setNewProdName('');
    setNewProdPrice(0);
    showToast("تمت إضافة المنتج الرقمي للمتجر المالي", "Product successfully added to the financial store!");
  };

  const handleUpdateProductStock = (id: string, amount: number) => {
    setProducts(products.map(p => {
      if (p.id === id) {
        return { ...p, stock: Math.max(0, p.stock + amount) };
      }
      return p;
    }));
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm(isRtl ? "هل ترغب في سحب هذا المنتج من الرفوف الرقمية للمتجر؟" : "Remove this product from the digital store?")) {
      setProducts(products.filter(p => p.id !== id));
      showToast("تمت إزالة المنتج", "Product removed!");
    }
  };

  // 4. Orders Actions
  const changeOrderStatus = (id: string, nextStatus: 'Completed' | 'Pending' | 'Cancelled') => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: nextStatus } : o));
    showToast("تم تحديث حالة الطلب والفوترة", "Order status updated!");
  };

  const handleDeleteOrder = (id: string) => {
    if (confirm(isRtl ? "هل أنت متأكد من حذف سجل هذا الطلب؟" : "Delete this order record?")) {
      setOrders(orders.filter(o => o.id !== id));
      showToast("تم حذف سجل الفاتورة والطلب", "Invoice order deleted!");
    }
  };

  // 5. Courses Actions
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseHours, setNewCourseHours] = useState('');
  const [newCourseInstructor, setNewCourseInstructor] = useState('');

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseTitle.trim()) return;
    const item: Course = {
      id: `crs-${Date.now()}`,
      title: newCourseTitle,
      instructor: newCourseInstructor || 'أ. رأفت عبد العزيز',
      duration: `${newCourseHours || '10'} ساعة`,
      enrolled: 0,
      rating: 5.0
    };
    setCourses([...courses, item]);
    setNewCourseTitle('');
    setNewCourseHours('');
    showToast("تم إدراج الدورة التعليمية الجديدة بالأكاديمية", "Course successfully added to Academy!");
  };

  const handleDeleteCourse = (id: string) => {
    if (confirm(isRtl ? "مسح الدورة التعليمية؟" : "Delete this course?")) {
      setCourses(courses.filter(c => c.id !== id));
      showToast("تم إزالة الكورس", "Course deleted!");
    }
  };

  // 6. Templates Actions
  const [newTemplateTitle, setNewTemplateTitle] = useState('');
  const [newTemplateCategory, setNewTemplateCategory] = useState('دفاتر محاسبية');
  const [newTemplateFormat, setNewTemplateFormat] = useState<'Excel' | 'Word' | 'PDF'>('Excel');

  const handleAddTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTemplateTitle.trim()) return;
    const item: TemplateItem = {
      id: `tmp-${Date.now()}`,
      title: newTemplateTitle,
      downloads: 0,
      fileSize: '1.5 MB',
      format: newTemplateFormat,
      category: newTemplateCategory
    };
    setTemplates([item, ...templates]);
    setNewTemplateTitle('');
    showToast("تم إدراج القالب المحاسبي المطور بنجاح", "Accounting template added to public repository!");
  };

  const handleDeleteTemplate = (id: string) => {
    if (confirm(isRtl ? "مسح هذا الملف؟" : "Delete this template?")) {
      setTemplates(templates.filter(t => t.id !== id));
      showToast("تم سحب الملف المحاسبي", "File deleted!");
    }
  };

  // 7. Comments Actions
  const approveComment = (id: string) => {
    setComments(comments.map(c => c.id === id ? { ...c, status: 'Approved' } : c));
    showToast("تم نشر وتأكيد التعليق", "Comment approved and published!");
  };

  const deleteComment = (id: string) => {
    setComments(comments.filter(c => c.id !== id));
    showToast("تمت إزالة التعليق من المنتدى", "Comment removed!");
  };

  // 8. SEO Config Actions
  const [seoTargetPage, setSeoTargetPage] = useState('/');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDesc, setSeoDesc] = useState('');
  const [seoKeywords, setSeoKeywords] = useState('');

  const handleUpdateSEO = (e: React.FormEvent) => {
    e.preventDefault();
    const exists = seoConfigs.some(cfg => cfg.pagePath === seoTargetPage);
    if (exists) {
      setSeoConfigs(seoConfigs.map(cfg => {
        if (cfg.pagePath === seoTargetPage) {
          return { ...cfg, titleTag: seoTitle, descriptionTag: seoDesc, keywords: seoKeywords };
        }
        return cfg;
      }));
    } else {
      setSeoConfigs([...seoConfigs, {
        pagePath: seoTargetPage,
        titleTag: seoTitle,
        descriptionTag: seoDesc,
        keywords: seoKeywords,
        indexable: true
      }]);
    }
    showToast("تم تحديث بطاقات الميتا ومحركات البحث", "SEO Meta Tags successfully deployed!");
  };

  // Load SEO when target route changes
  useEffect(() => {
    const activeSEO = seoConfigs.find(cfg => cfg.pagePath === seoTargetPage);
    if (activeSEO) {
      setSeoTitle(activeSEO.titleTag);
      setSeoDesc(activeSEO.descriptionTag);
      setSeoKeywords(activeSEO.keywords);
    } else {
      setSeoTitle('');
      setSeoDesc('');
      setSeoKeywords('');
    }
  }, [seoTargetPage, seoConfigs]);


  // ==========================================
  // --- CALCULATING METRICS & DATA ANALYTICS ---
  // ==========================================
  
  const metrics = useMemo(() => {
    const totalRevenue = orders
      .filter(o => o.status === 'Completed')
      .reduce((sum, current) => sum + current.amount, 0);

    const totalActiveUsers = users.filter(u => u.status === 'Active').length;
    const totalDownloads = templates.reduce((sum, t) => sum + t.downloads, 0);
    const totalViews = articles.reduce((sum, a) => sum + a.views, 0);
    
    return {
      revenue: totalRevenue,
      users: totalActiveUsers,
      downloads: totalDownloads,
      views: totalViews,
      pendingOrders: orders.filter(o => o.status === 'Pending').length,
      pendingComments: comments.filter(c => c.status === 'Pending').length
    };
  }, [orders, users, templates, articles, comments]);


  // ==========================================
  // --- COMPONENT RENDER BLOCK ---
  // ==========================================

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6" id="pro-admin-workspace">
      
      {/* 1. Header Hero Banner for Admin */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-[2rem] p-8 relative overflow-hidden shadow-2xl mb-8 border border-slate-800">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/80 text-cyan-400 rounded-full text-xs font-black border border-cyan-900/40">
              <Database className="w-3.5 h-3.5 animate-pulse" />
              <span>{isRtl ? "بوابة الإدارة الشاملة للمنظومة" : "Core Systems & Portal Control Engine"}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-none">
              {isRtl ? "لوحة التحكم للمشرف والمطوّر" : "Professional Admin Dashboard"}
            </h1>
            <p className="text-sm text-slate-400 max-w-2xl font-medium">
              {isRtl 
                ? "إدارة المقالات المحاسبية، وتراخيص المستخدمين، ومنتجات المتجر الرقمي، والطلبيات، والأكاديمية، والتعليقات والـ SEO من واجهة استجابة واحدة متكاملة."
                : "Manage professional articles, user licenses, digital products, orders, courses, template libraries, SEO, comments, and analytics securely."}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-800/40 p-3 rounded-2xl border border-slate-700/50 backdrop-blur-md">
            <div className="p-2 bg-cyan-500 text-slate-900 rounded-xl">
              <Sliders className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-black">{isRtl ? "حالة الخادم وقاعدة البيانات" : "Database Connection"}</p>
              <p className="text-xs font-black text-white flex items-center gap-1">
                <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                <span>{isRtl ? "مؤمّن ومتصل" : "Secured & Connected (Sync)"}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. DYNAMIC SYSTEM TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={cn(
              "fixed top-4 right-4 z-50 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 border text-xs font-black text-white",
              toast.type === 'success' ? "bg-slate-900 border-cyan-500" : "bg-rose-950 border-rose-500"
            )}
          >
            <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{isRtl ? toast.messageAr : toast.messageEn}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ==========================================
            --- RESPONSIVE DASHBOARD SIDE NAVIGATION (3 cols) ---
            ========================================== */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Mobile Tab Trigger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-full flex items-center justify-between px-5 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-black text-xs text-slate-800 dark:text-white cursor-pointer border-none"
          >
            <span className="flex items-center gap-2">
              <Menu className="w-4 h-4" />
              <span>{isRtl ? "قائمة الأنظمة والمشرف" : "Switch Management System"}</span>
            </span>
            <ChevronRight className={cn("w-4 h-4 transition-transform", mobileMenuOpen && "rotate-90")} />
          </button>

          <div className={cn(
            "lg:block space-y-1.5 bg-white dark:bg-slate-900 p-3 rounded-3xl border border-slate-200 dark:border-slate-800",
            mobileMenuOpen ? "block" : "hidden lg:block"
          )}>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-black px-3 py-1 tracking-wider">
              {isRtl ? "مؤشرات وتدفقات الأنظمة" : "Portals & Indicators"}
            </p>
            
            {[
              { id: 'overview', labelAr: 'مؤشرات الأداء العامة', labelEn: 'Overview & Metrics', icon: <Activity className="w-4 h-4" />, color: 'text-indigo-500' },
              { id: 'articles', labelAr: 'إدارة المقالات والمدونة', labelEn: 'Articles & Blog', icon: <FileText className="w-4 h-4" />, color: 'text-amber-500' },
              { id: 'users', labelAr: 'إدارة وتراخيص المستخدمين', labelEn: 'Users & Roles', icon: <Users className="w-4 h-4" />, color: 'text-cyan-500' },
              { id: 'products', labelAr: 'إدارة منتجات المتجر المالي', labelEn: 'Products & Store', icon: <ShoppingBag className="w-4 h-4" />, color: 'text-emerald-500' },
              { id: 'orders', labelAr: 'إدارة وتتبع الطلبيات والبيع', labelEn: 'Orders & Sales', icon: <CreditCard className="w-4 h-4" />, color: 'text-purple-500' },
              { id: 'courses', labelAr: 'كورسات أكاديمية إيليجا', labelEn: 'Academy Courses', icon: <BookOpen className="w-4 h-4" />, color: 'text-pink-500' },
              { id: 'templates', labelAr: 'قوالب ونماذج إكسل ووررد', labelEn: 'Excel Templates', icon: <FileSpreadsheet className="w-4 h-4" />, color: 'text-teal-500' },
              { id: 'comments', labelAr: 'إدارة المراجعات والتعليقات', labelEn: 'Comments Moderation', icon: <MessageSquare className="w-4 h-4" />, color: 'text-blue-500' },
              { id: 'seo', labelAr: 'محركات البحث وبطاقات الميتا', labelEn: 'SEO Meta Manager', icon: <Globe className="w-4 h-4" />, color: 'text-rose-500' },
              { id: 'analytics', labelAr: 'الرسوم البيانية المتقدمة', labelEn: 'Rich Analytics', icon: <BarChart3 className="w-4 h-4" />, color: 'text-emerald-400' },
              { id: 'ads', labelAr: 'إدارة وتتبع الإعلانات', labelEn: 'Advertisement Manager', icon: <Megaphone className="w-4 h-4" />, color: 'text-indigo-400' },
              { id: 'settings', labelAr: 'إعدادات المنظومة العامة', labelEn: 'General Settings', icon: <Settings className="w-4 h-4 animate-spin-slow" />, color: 'text-slate-500' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as AdminTab);
                  setMobileMenuOpen(false);
                }}
                className={cn(
                  "w-full text-start px-4 py-3 rounded-2xl text-xs font-black flex items-center gap-2.5 transition-all cursor-pointer border-none focus:outline-hidden",
                  activeTab === tab.id
                    ? "bg-slate-900 text-white dark:bg-slate-800"
                    : "bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/40"
                )}
              >
                <span className={tab.color}>{tab.icon}</span>
                <span>{isRtl ? tab.labelAr : tab.labelEn}</span>
                {tab.id === 'comments' && metrics.pendingComments > 0 && (
                  <span className="ms-auto bg-amber-500 text-slate-950 font-black px-1.5 py-0.5 rounded-full text-[9px]">
                    {metrics.pendingComments}
                  </span>
                )}
                {tab.id === 'orders' && metrics.pendingOrders > 0 && (
                  <span className="ms-auto bg-indigo-600 text-white font-black px-1.5 py-0.5 rounded-full text-[9px] animate-pulse">
                    {metrics.pendingOrders}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>


        {/* ==========================================
            --- DYNAMIC WORKSPACE PANEL (9 cols) ---
            ========================================== */}
        <div className="lg:col-span-9 space-y-8">
          
          {/* TAB 0: METRICS OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Stats Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Metric 1 */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl shadow-sm flex items-center justify-between">
                  <div className="space-y-1.5">
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-wider">
                      {isRtl ? "صافي أرباح المبيعات الرقمية" : "Total Net Sales Revenue"}
                    </p>
                    <p className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                      ${metrics.revenue}
                    </p>
                    <p className="text-[9px] text-emerald-500 font-bold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>+14.3% {isRtl ? "مقارنة بالشهر الماضي" : "vs last month"}</span>
                    </p>
                  </div>
                  <div className="p-3 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 rounded-2xl">
                    <DollarSign className="w-6 h-6" />
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl shadow-sm flex items-center justify-between">
                  <div className="space-y-1.5">
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-wider">
                      {isRtl ? "المحاسبين المسجلين" : "Active Registered Users"}
                    </p>
                    <p className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                      {metrics.users}
                    </p>
                    <p className="text-[9px] text-cyan-500 font-bold flex items-center gap-1">
                      <UserPlus className="w-3 h-3" />
                      <span>+4 {isRtl ? "أعضاء جدد هذا الأسبوع" : "new users this week"}</span>
                    </p>
                  </div>
                  <div className="p-3 bg-cyan-100 dark:bg-cyan-950/40 text-cyan-600 rounded-2xl">
                    <Users className="w-6 h-6" />
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl shadow-sm flex items-center justify-between">
                  <div className="space-y-1.5">
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-wider">
                      {isRtl ? "مرات تحميل القوالب" : "Total Template Downloads"}
                    </p>
                    <p className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                      {metrics.downloads}
                    </p>
                    <p className="text-[9px] text-teal-500 font-bold flex items-center gap-1">
                      <RefreshCcw className="w-3 h-3 animate-spin-slow" />
                      <span>{isRtl ? "تزامن حي ومباشر" : "Real-time sync"}</span>
                    </p>
                  </div>
                  <div className="p-3 bg-teal-100 dark:bg-teal-950/40 text-teal-600 rounded-2xl">
                    <FileSpreadsheet className="w-6 h-6" />
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl shadow-sm flex items-center justify-between">
                  <div className="space-y-1.5">
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-wider">
                      {isRtl ? "مشاهدات المقالات والمدونة" : "Total Article Views"}
                    </p>
                    <p className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                      {metrics.views}
                    </p>
                    <p className="text-[9px] text-amber-500 font-bold flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3" />
                      <span>{isRtl ? "معدل تفاعل مرتفع" : "Excellent engagement"}</span>
                    </p>
                  </div>
                  <div className="p-3 bg-amber-100 dark:bg-amber-950/40 text-amber-600 rounded-2xl">
                    <FileText className="w-6 h-6" />
                  </div>
                </div>

              </div>

              {/* Core Notifications Panel */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm">
                <h3 className="font-black text-sm text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-indigo-500" />
                  <span>{isRtl ? "العمليات والأحداث المعلقة وتأكيد الفوترة" : "Pending Actions & Verification Queue"}</span>
                </h3>

                <div className="space-y-3">
                  {orders.filter(o => o.status === 'Pending').map(ord => (
                    <div key={ord.id} className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-semibold">
                      <div className="flex items-center gap-3">
                        <span className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-ping shrink-0" />
                        <div>
                          <p className="text-slate-900 dark:text-white font-black">{isRtl ? "طلب شراء معلق الدفع" : "Pending order verification"}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{ord.customer} - {ord.item} - ${ord.amount}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => changeOrderStatus(ord.id, 'Completed')}
                          className="px-3 py-1.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 rounded-lg cursor-pointer border-none"
                        >
                          {isRtl ? "قبول الدفع وتأكيد" : "Approve Order"}
                        </button>
                        <button
                          onClick={() => changeOrderStatus(ord.id, 'Cancelled')}
                          className="px-3 py-1.5 bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400 rounded-lg cursor-pointer border-none"
                        >
                          {isRtl ? "إلغاء الطلب" : "Cancel"}
                        </button>
                      </div>
                    </div>
                  ))}

                  {comments.filter(c => c.status === 'Pending').map(cmt => (
                    <div key={cmt.id} className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-semibold">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="w-5 h-5 text-blue-500 shrink-0" />
                        <div>
                          <p className="text-slate-900 dark:text-white font-black">{isRtl ? "تعليق بانتظار المراجعة والنشر" : "Pending blog comment moderation"}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{cmt.author}: "{cmt.content.slice(0, 50)}..."</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => approveComment(cmt.id)}
                          className="px-3 py-1.5 bg-cyan-100 text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-400 rounded-lg cursor-pointer border-none"
                        >
                          {isRtl ? "موافقة ونشر" : "Approve Comment"}
                        </button>
                        <button
                          onClick={() => deleteComment(cmt.id)}
                          className="px-3 py-1.5 bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400 rounded-lg cursor-pointer border-none"
                        >
                          {isRtl ? "مسح" : "Trash"}
                        </button>
                      </div>
                    </div>
                  ))}

                  {orders.filter(o => o.status === 'Pending').length === 0 && comments.filter(c => c.status === 'Pending').length === 0 && (
                    <div className="p-6 text-center text-slate-400 font-bold bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800">
                      {isRtl ? "✓ لا توجد مدفوعات أو مراجعات معلقة في طابور العمليات" : "✓ Verification and moderation queue is currently empty"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: ARTICLES MANAGEMENT */}
          {activeTab === 'articles' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Form to Add Article */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm">
                <h3 className="font-black text-sm text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-amber-500" />
                  <span>{isRtl ? "كتابة ونشر مقال محاسبي جديد" : "Write New Professional Accounting Post"}</span>
                </h3>

                <form onSubmit={handleAddArticle} className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  <div className="sm:col-span-6 space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase">{isRtl ? "عنوان المقال المحاسبي" : "Article Headline"}</label>
                    <input
                      type="text"
                      placeholder={isRtl ? "مثال: المعالجة الضريبية للأرباح الرأسمالية..." : "e.g., Tax Treatment of Capital Gains..."}
                      value={newArtTitle}
                      onChange={(e) => setNewArtTitle(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-200"
                    />
                  </div>

                  <div className="sm:col-span-3 space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase">{isRtl ? "الكاتب / الخبير" : "Author Name"}</label>
                    <input
                      type="text"
                      placeholder="أ. رأفت عبد العزيز"
                      value={newArtAuthor}
                      onChange={(e) => setNewArtAuthor(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-200"
                    />
                  </div>

                  <div className="sm:col-span-3 space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase">{isRtl ? "التصنيف والتبويب" : "Category Selector"}</label>
                    <select
                      value={newArtCategory}
                      onChange={(e) => setNewArtCategory(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-200 focus:outline-hidden"
                    >
                      <option value="معايير مصرية">{isRtl ? "معايير محاسبية مصرية" : "Egyptian Standards"}</option>
                      <option value="معايير دولية">{isRtl ? "معايير محاسبية دولية IFRS" : "IFRS International"}</option>
                      <option value="محاسبة ضريبية">{isRtl ? "محاسبة ضريبية وقوانين" : "Tax Accounting"}</option>
                      <option value="تكنولوجيا مالية">{isRtl ? "ميكنة وتكنولوجيا مالية" : "Financial Technology"}</option>
                    </select>
                  </div>

                  <div className="sm:col-span-12 pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 rounded-xl text-xs font-black cursor-pointer border-none flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{isRtl ? "إدراج المقال كمسودة" : "Add Article to Database"}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Articles List / Table */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
                <div className="p-5 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="font-black text-sm text-slate-900 dark:text-white">
                    {isRtl ? "المستندات والمقالات المنشورة بالمدونة" : "Blog Article Registry"}
                  </h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-start border-collapse">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-950 text-slate-400 text-[10px] uppercase font-black tracking-wider text-start border-b border-slate-150 dark:border-slate-800">
                        <th className="p-4 text-start">{isRtl ? "المقال" : "Article Title"}</th>
                        <th className="p-4 text-start">{isRtl ? "الكاتب" : "Author"}</th>
                        <th className="p-4 text-start">{isRtl ? "التصنيف" : "Category"}</th>
                        <th className="p-4 text-start">{isRtl ? "المشاهدات" : "Views"}</th>
                        <th className="p-4 text-start">{isRtl ? "الحالة" : "Status"}</th>
                        <th className="p-4 text-end">{isRtl ? "إجراءات" : "Actions"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {articles.map(art => (
                        <tr key={art.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20">
                          <td className="p-4 font-black text-slate-900 dark:text-white max-w-xs truncate">{art.title}</td>
                          <td className="p-4">{art.author}</td>
                          <td className="p-4">
                            <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md text-[10px]">
                              {art.category}
                            </span>
                          </td>
                          <td className="p-4 font-mono font-bold">{art.views}</td>
                          <td className="p-4">
                            <button
                              onClick={() => toggleArticleStatus(art.id)}
                              className={cn(
                                "px-2.5 py-0.5 rounded-full text-[9px] font-black cursor-pointer border-none",
                                art.status === 'Published' 
                                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
                                  : "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300"
                              )}
                            >
                              {art.status === 'Published' ? (isRtl ? "منشور" : "Published") : (isRtl ? "مسودة" : "Draft")}
                            </button>
                          </td>
                          <td className="p-4 text-end">
                            <button
                              onClick={() => handleDeleteArticle(art.id)}
                              className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-600 rounded-lg cursor-pointer border-none"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: USERS MANAGEMENT */}
          {activeTab === 'users' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Form to Register User */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm">
                <h3 className="font-black text-sm text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-cyan-500" />
                  <span>{isRtl ? "تسجيل ترخيص محاسب أو مشرف جديد" : "Grant New Accountant License"}</span>
                </h3>

                <form onSubmit={handleAddUser} className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  <div className="sm:col-span-4 space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase">{isRtl ? "الاسم بالكامل" : "Member Name"}</label>
                    <input
                      type="text"
                      placeholder={isRtl ? "مثال: هاني جلال..." : "e.g., Hany Galal..."}
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-200"
                    />
                  </div>

                  <div className="sm:col-span-5 space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase">{isRtl ? "البريد الإلكتروني للترخيص" : "Email Address"}</label>
                    <input
                      type="email"
                      placeholder="name@company.com"
                      value={newUserEmail}
                      onChange={(e) => setNewUserEmail(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-200"
                    />
                  </div>

                  <div className="sm:col-span-3 space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase">{isRtl ? "صلاحيات الحساب" : "System Role"}</label>
                    <select
                      value={newUserRole}
                      onChange={(e: any) => setNewUserRole(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-200 focus:outline-hidden"
                    >
                      <option value="Administrator">{isRtl ? "مدير مشرف Admin" : "Administrator"}</option>
                      <option value="Auditor">{isRtl ? "مراجع قانوني Auditor" : "Legal Auditor"}</option>
                      <option value="Accountant">{isRtl ? "محاسب ممارس" : "Practitioner"}</option>
                      <option value="Student">{isRtl ? "محاسب متدرب" : "Student"}</option>
                    </select>
                  </div>

                  <div className="sm:col-span-12 pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 rounded-xl text-xs font-black cursor-pointer border-none flex items-center gap-1.5"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>{isRtl ? "توليد الحساب وبدء الترخيص" : "Generate User Workspace License"}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Users List / Table */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
                <div className="p-5 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="font-black text-sm text-slate-900 dark:text-white">
                    {isRtl ? "تراخيص ودفاتر المحاسبين المعتمدين" : "Registered Accountant Licenses"}
                  </h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-start border-collapse">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-950 text-slate-400 text-[10px] uppercase font-black tracking-wider text-start border-b border-slate-150 dark:border-slate-800">
                        <th className="p-4 text-start">{isRtl ? "الاسم" : "User Name"}</th>
                        <th className="p-4 text-start">{isRtl ? "البريد الإلكتروني" : "Email"}</th>
                        <th className="p-4 text-start">{isRtl ? "صلاحيات الحساب" : "System Role"}</th>
                        <th className="p-4 text-start">{isRtl ? "حالة الدخول" : "Account Status"}</th>
                        <th className="p-4 text-start">{isRtl ? "تاريخ التسجيل" : "Joined Date"}</th>
                        <th className="p-4 text-end">{isRtl ? "إجراءات" : "Actions"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {users.map(u => (
                        <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20">
                          <td className="p-4 font-black text-slate-900 dark:text-white">{u.name}</td>
                          <td className="p-4 font-mono">{u.email}</td>
                          <td className="p-4">
                            <span className={cn(
                              "px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider",
                              u.role === 'Administrator' ? "bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-300" :
                              u.role === 'Auditor' ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-300" :
                              u.role === 'Accountant' ? "bg-cyan-100 text-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-300" :
                              "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300"
                            )}>
                              {u.role}
                            </span>
                          </td>
                          <td className="p-4">
                            <button
                              onClick={() => toggleUserStatus(u.id)}
                              className={cn(
                                "px-2.5 py-0.5 rounded-full text-[9px] font-black cursor-pointer border-none flex items-center gap-1",
                                u.status === 'Active' 
                                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
                                  : "bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300"
                              )}
                            >
                              {u.status === 'Active' ? <Unlock className="w-2.5 h-2.5" /> : <Lock className="w-2.5 h-2.5" />}
                              <span>{u.status === 'Active' ? (isRtl ? "نشط ومسموح" : "Active") : (isRtl ? "محظور مؤقتاً" : "Locked")}</span>
                            </button>
                          </td>
                          <td className="p-4 font-mono font-bold text-slate-400">{u.joinedDate}</td>
                          <td className="p-4 text-end">
                            {u.id !== 'usr-1' && (
                              <button
                                onClick={() => handleDeleteUser(u.id)}
                                className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-600 rounded-lg cursor-pointer border-none"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PRODUCTS MANAGEMENT */}
          {activeTab === 'products' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Form to Add Product */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm">
                <h3 className="font-black text-sm text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-emerald-500" />
                  <span>{isRtl ? "إضافة منتج مالي / كتب / برمجيات" : "List New Digital / Print Store Product"}</span>
                </h3>

                <form onSubmit={handleAddProduct} className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  <div className="sm:col-span-5 space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase">{isRtl ? "اسم المنتج التجاري" : "Product Name"}</label>
                    <input
                      type="text"
                      placeholder={isRtl ? "مثال: كتاب المعالجة المحاسبية للضرائب..." : "e.g., Advanced Accounting Book..."}
                      value={newProdName}
                      onChange={(e) => setNewProdName(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-200"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase">{isRtl ? "سعر البيع ($)" : "Sales Price"}</label>
                    <input
                      type="number"
                      value={newProdPrice}
                      onChange={(e) => setNewProdPrice(Number(e.target.value))}
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-200 font-mono"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase">{isRtl ? "المخزون المتاح" : "Initial Stock"}</label>
                    <input
                      type="number"
                      value={newProdStock}
                      onChange={(e) => setNewProdStock(Number(e.target.value))}
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-200 font-mono"
                    />
                  </div>

                  <div className="sm:col-span-3 space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase">{isRtl ? "الفئة والتبويب" : "Product Class"}</label>
                    <select
                      value={newProdCategory}
                      onChange={(e) => setNewProdCategory(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-200 focus:outline-hidden"
                    >
                      <option value="قوالب رقمية">{isRtl ? "قوالب ونماذج إكسل رقمية" : "Digital Templates"}</option>
                      <option value="كتب مطبوعة">{isRtl ? "كتب علمية ومراجع مطبوعة" : "Printed References"}</option>
                      <option value="برامج وتطبيقات">{isRtl ? "برمجيات وأدوات محاسبية" : "Applications & software"}</option>
                    </select>
                  </div>

                  <div className="sm:col-span-12 pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 rounded-xl text-xs font-black cursor-pointer border-none flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{isRtl ? "طرح وتخزين المنتج بالمتجر" : "Add Product to Store Shelf"}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Products Grid */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm p-6">
                <h3 className="font-black text-sm text-slate-900 dark:text-white mb-6">
                  {isRtl ? "المخزون والمنتجات المتاحة بمتجر إيليجا المالي" : "Store Inventory & Shelf Stocks"}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {products.map(p => (
                    <div key={p.id} className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs font-semibold">
                      <div className="space-y-1">
                        <p className="font-black text-slate-900 dark:text-white">{p.name}</p>
                        <p className="text-[10px] text-slate-400 font-black">{p.category} - <span className="font-mono text-cyan-500">${p.price}</span></p>
                        <p className="text-[10px] text-slate-400">{isRtl ? `المبيعات الفعلية: ${p.sales} وحدة` : `Actual Sales: ${p.sales} units`}</p>
                      </div>

                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 rounded-lg">
                          <button
                            onClick={() => handleUpdateProductStock(p.id, -1)}
                            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 rounded-md cursor-pointer border-none"
                          >
                            -
                          </button>
                          <span className="font-mono px-2">{p.stock}</span>
                          <button
                            onClick={() => handleUpdateProductStock(p.id, 5)}
                            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 rounded-md cursor-pointer border-none"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => handleDeleteProduct(p.id)}
                          className="text-rose-500 text-[10px] font-bold hover:underline bg-transparent border-none cursor-pointer"
                        >
                          {isRtl ? "إزالة المنتج" : "Delete product"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Orders Table */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
                <div className="p-5 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="font-black text-sm text-slate-900 dark:text-white">
                    {isRtl ? "مراقبة وتدفق عمليات الدفع وفواتير المبيعات" : "Customer Orders & Billing Audit"}
                  </h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-start border-collapse">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-950 text-slate-400 text-[10px] uppercase font-black tracking-wider text-start border-b border-slate-150 dark:border-slate-800">
                        <th className="p-4 text-start">{isRtl ? "رقم الفاتورة" : "Order ID"}</th>
                        <th className="p-4 text-start">{isRtl ? "العميل" : "Buyer Name"}</th>
                        <th className="p-4 text-start">{isRtl ? "المنتج المباع" : "Item"}</th>
                        <th className="p-4 text-start">{isRtl ? "قيمة المبيعات" : "Amount"}</th>
                        <th className="p-4 text-start">{isRtl ? "حالة الفاتورة" : "Payment Status"}</th>
                        <th className="p-4 text-start">{isRtl ? "التاريخ" : "Purchase Date"}</th>
                        <th className="p-4 text-end">{isRtl ? "إجراءات" : "Actions"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {orders.map(o => (
                        <tr key={o.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20">
                          <td className="p-4 font-mono font-black text-slate-900 dark:text-white">#{o.id}</td>
                          <td className="p-4">{o.customer}</td>
                          <td className="p-4 font-black">{o.item}</td>
                          <td className="p-4 font-mono font-bold text-cyan-500">${o.amount}</td>
                          <td className="p-4">
                            <span className={cn(
                              "px-2.5 py-0.5 rounded-full text-[9px] font-black",
                              o.status === 'Completed' ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300" :
                              o.status === 'Pending' ? "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 animate-pulse" :
                              "bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300"
                            )}>
                              {o.status === 'Completed' ? (isRtl ? "تمت بنجاح" : "Completed") : o.status === 'Pending' ? (isRtl ? "انتظار التحقق" : "Pending") : (isRtl ? "ملغاة" : "Cancelled")}
                            </span>
                          </td>
                          <td className="p-4 font-mono font-bold text-slate-400">{o.date}</td>
                          <td className="p-4 text-end space-x-1 flex justify-end">
                            {o.status === 'Pending' && (
                              <button
                                onClick={() => changeOrderStatus(o.id, 'Completed')}
                                className="p-1.5 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-emerald-600 rounded-lg cursor-pointer border-none"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteOrder(o.id)}
                              className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-600 rounded-lg cursor-pointer border-none"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: COURSES MANAGEMENT */}
          {activeTab === 'courses' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Form to Add Course */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm">
                <h3 className="font-black text-sm text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-pink-500" />
                  <span>{isRtl ? "إدراج دورة تدريبية جديدة بأكاديمية إيليجا" : "Add New Academy Accounting Lecture"}</span>
                </h3>

                <form onSubmit={handleAddCourse} className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  <div className="sm:col-span-6 space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase">{isRtl ? "عنوان الدورة" : "Course Title"}</label>
                    <input
                      type="text"
                      placeholder={isRtl ? "مثال: مهارات التدقيق المالي المتقدم..." : "e.g., Advanced Audit Training..."}
                      value={newCourseTitle}
                      onChange={(e) => setNewCourseTitle(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-200"
                    />
                  </div>

                  <div className="sm:col-span-3 space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase">{isRtl ? "عدد الساعات" : "Course Hours"}</label>
                    <input
                      type="number"
                      placeholder="20"
                      value={newCourseHours}
                      onChange={(e) => setNewCourseHours(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-200 font-mono"
                    />
                  </div>

                  <div className="sm:col-span-3 space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase">{isRtl ? "المحاضر المعتمد" : "Lead Instructor"}</label>
                    <input
                      type="text"
                      placeholder="أ. رأفت عبد العزيز"
                      value={newCourseInstructor}
                      onChange={(e) => setNewCourseInstructor(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-200"
                    />
                  </div>

                  <div className="sm:col-span-12 pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 rounded-xl text-xs font-black cursor-pointer border-none flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{isRtl ? "حفظ الدورة التدريبية" : "Deploy Course to Public"}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Courses Grid */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm p-6 space-y-4">
                <h3 className="font-black text-sm text-slate-900 dark:text-white">
                  {isRtl ? "الأكاديمية والبرامج التعليمية النشطة" : "Active Academy Programs"}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {courses.map(c => (
                    <div key={c.id} className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs font-semibold">
                      <div className="space-y-1">
                        <p className="font-black text-slate-900 dark:text-white">{c.title}</p>
                        <p className="text-[10px] text-slate-400">{isRtl ? "المحاضر:" : "Instructor:"} {c.instructor} - {c.duration}</p>
                        <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">{c.enrolled} {isRtl ? "محاسب مسجل" : "students enrolled"}</p>
                      </div>

                      <button
                        onClick={() => handleDeleteCourse(c.id)}
                        className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-600 rounded-lg cursor-pointer border-none"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: TEMPLATES MANAGEMENT */}
          {activeTab === 'templates' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Form to Add Template */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm">
                <h3 className="font-black text-sm text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-teal-500" />
                  <span>{isRtl ? "إضافة قالب مالي أو ورقة عمل إكسل جديدة" : "Add New Accounting Spreadsheet Template"}</span>
                </h3>

                <form onSubmit={handleAddTemplate} className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  <div className="sm:col-span-6 space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase">{isRtl ? "اسم الملف / النموذج" : "Spreadsheet/Template Title"}</label>
                    <input
                      type="text"
                      placeholder={isRtl ? "مثال: نموذج قائمة التدفقات النقدية..." : "e.g., Statement of Cash Flows Spreadsheet..."}
                      value={newTemplateTitle}
                      onChange={(e) => setNewTemplateTitle(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-200"
                    />
                  </div>

                  <div className="sm:col-span-3 space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase">{isRtl ? "صيغة الملف" : "File Format"}</label>
                    <select
                      value={newTemplateFormat}
                      onChange={(e: any) => setNewTemplateFormat(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-200 focus:outline-hidden"
                    >
                      <option value="Excel">Microsoft Excel (.xlsx)</option>
                      <option value="Word">Microsoft Word (.docx)</option>
                      <option value="PDF">Adobe PDF (.pdf)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-3 space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase">{isRtl ? "التصنيف" : "Class Category"}</label>
                    <select
                      value={newTemplateCategory}
                      onChange={(e) => setNewTemplateCategory(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-200 focus:outline-hidden"
                    >
                      <option value="دفاتر محاسبية">{isRtl ? "دفاتر ميزانية ويومية" : "Accounting Journals"}</option>
                      <option value="تسويات جردية">{isRtl ? "تسويات وإقرارات جردية" : "Inventory Adjustments"}</option>
                      <option value="تقارير مراجعة">{isRtl ? "تقارير مراجعة وتدقيق" : "Independent Audit Forms"}</option>
                      <option value="نماذج ضريبية">{isRtl ? "إقرارات محاسبة ضريبية" : "Tax Declarations"}</option>
                    </select>
                  </div>

                  <div className="sm:col-span-12 pt-2">
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 rounded-xl text-xs font-black cursor-pointer border-none flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{isRtl ? "تنزيل ونشر القالب للجمهور" : "Publish Template File"}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Templates Table */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
                <div className="p-5 border-b border-slate-100 dark:border-slate-800">
                  <h3 className="font-black text-sm text-slate-900 dark:text-white">
                    {isRtl ? "قائمة المستندات والتحميل المتاحة بالمستودع" : "Downloadable Templates Repository"}
                  </h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-start border-collapse">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-950 text-slate-400 text-[10px] uppercase font-black tracking-wider text-start border-b border-slate-150 dark:border-slate-800">
                        <th className="p-4 text-start">{isRtl ? "القالب والملف" : "Template Title"}</th>
                        <th className="p-4 text-start">{isRtl ? "التبويب" : "Category"}</th>
                        <th className="p-4 text-start">{isRtl ? "تنسيق الملف" : "Format"}</th>
                        <th className="p-4 text-start">{isRtl ? "حجم الملف" : "Size"}</th>
                        <th className="p-4 text-start">{isRtl ? "التحميلات" : "Downloads"}</th>
                        <th className="p-4 text-end">{isRtl ? "إجراءات" : "Actions"}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {templates.map(t => (
                        <tr key={t.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20">
                          <td className="p-4 font-black text-slate-900 dark:text-white">{t.title}</td>
                          <td className="p-4">{t.category}</td>
                          <td className="p-4">
                            <span className={cn(
                              "px-2 py-0.5 rounded-md text-[10px] font-bold uppercase",
                              t.format === 'Excel' ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300" :
                              t.format === 'Word' ? "bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300" :
                              "bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-300"
                            )}>
                              {t.format}
                            </span>
                          </td>
                          <td className="p-4 font-mono font-bold text-slate-400">{t.fileSize}</td>
                          <td className="p-4 font-mono font-bold text-slate-900 dark:text-white">{t.downloads}</td>
                          <td className="p-4 text-end">
                            <button
                              onClick={() => handleDeleteTemplate(t.id)}
                              className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-rose-600 rounded-lg cursor-pointer border-none"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: COMMENTS MODERATION */}
          {activeTab === 'comments' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
                <h3 className="font-black text-sm text-slate-900 dark:text-white">
                  {isRtl ? "مراقبة وإشراف المنتدى والتعليقات بالمنظومة" : "Forum & Blog Comments Moderation Center"}
                </h3>

                <div className="space-y-4">
                  {comments.map(c => (
                    <div 
                      key={c.id} 
                      className={cn(
                        "p-4 rounded-2xl border flex flex-col sm:flex-row justify-between items-start gap-4 text-xs font-semibold",
                        c.status === 'Pending' 
                          ? "bg-amber-50/50 dark:bg-amber-950/10 border-amber-200 dark:border-amber-900/40" 
                          : "bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                      )}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-slate-950 dark:text-white">{c.author}</span>
                          <span className="text-[10px] text-slate-400">{c.date}</span>
                          <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-[9px] font-black rounded-sm">
                            {c.source}
                          </span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 italic">"{c.content}"</p>
                      </div>

                      <div className="flex gap-2 shrink-0 self-end sm:self-center">
                        {c.status === 'Pending' && (
                          <button
                            onClick={() => approveComment(c.id)}
                            className="px-3 py-1.5 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl text-[11px] font-black cursor-pointer border-none"
                          >
                            {isRtl ? "موافقة ونشر" : "Approve"}
                          </button>
                        )}
                        <button
                          onClick={() => deleteComment(c.id)}
                          className="px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/20 dark:text-rose-400 rounded-xl text-[11px] font-bold cursor-pointer border-none"
                        >
                          {isRtl ? "حذف نهائي" : "Trash"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: SEO METADATA MANAGER */}
          {activeTab === 'seo' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm">
                <h3 className="font-black text-sm text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-rose-500 animate-pulse" />
                  <span>{isRtl ? "مراقبة بطاقات الميتا والـ SEO لمحركات البحث" : "SEO Meta Tag Control Center"}</span>
                </h3>

                <form onSubmit={handleUpdateSEO} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase">{isRtl ? "المسار والصفحة المستهدفة" : "Target Route"}</label>
                      <select
                        value={seoTargetPage}
                        onChange={(e) => setSeoTargetPage(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-200 focus:outline-hidden"
                      >
                        <option value="/">الرئيسية (/) - Home</option>
                        <option value="/accounting-tools">الأدوات الحاسبة (/accounting-tools)</option>
                        <option value="/templates-library">مكتبة القوالب (/templates-library)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase">{isRtl ? "العلامة الترويجية الفوقية (Title Tag)" : "SEO Title Tag"}</label>
                      <input
                        type="text"
                        placeholder="Page Title"
                        value={seoTitle}
                        onChange={(e) => setSeoTitle(e.target.value)}
                        required
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-200"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase">{isRtl ? "الوصف التعريفي (Meta Description)" : "Meta Description Tag"}</label>
                    <textarea
                      rows={3}
                      placeholder="Enter description tag for crawlers..."
                      value={seoDesc}
                      onChange={(e) => setSeoDesc(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-200"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase">{isRtl ? "الكلمات الدلالية لمحركات البحث (Keywords)" : "Focus Keywords"}</label>
                    <input
                      type="text"
                      placeholder="comma-separated words..."
                      value={seoKeywords}
                      onChange={(e) => setSeoKeywords(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-200 font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl text-xs font-black cursor-pointer border-none"
                  >
                    {isRtl ? "تحديث بطاقات الميتا فوراً" : "Deploy SEO Configuration"}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 9: ADVANCED DATA ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="space-y-6 animate-fadeIn">
              <AnalyticsDashboard isRtl={isRtl} />
            </div>
          )}

          {/* TAB 11: ADVERTISEMENT MANAGEMENT */}
          {activeTab === 'ads' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Ad Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Impressions Card */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-xs flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 uppercase font-black">{isRtl ? "إجمالي ظهور الإعلانات" : "Total Ad Impressions"}</p>
                    <p className="text-2xl font-black text-slate-900 dark:text-white">
                      {adCampaigns.reduce((sum, c) => sum + c.impressions, 0).toLocaleString()}
                    </p>
                    <p className="text-[9px] text-emerald-500 font-bold">↑ {isRtl ? "ظهور حقيقي متكامل" : "Dynamic real-time views"}</p>
                  </div>
                  <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 rounded-xl">
                    <Eye className="w-6 h-6" />
                  </div>
                </div>

                {/* Clicks Card */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-xs flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 uppercase font-black">{isRtl ? "إجمالي النقرات المستلمة" : "Total Clicks Received"}</p>
                    <p className="text-2xl font-black text-slate-900 dark:text-white">
                      {adCampaigns.reduce((sum, c) => sum + c.clicks, 0).toLocaleString()}
                    </p>
                    <p className="text-[9px] text-cyan-500 font-bold">↑ {isRtl ? "معدل تحويل متميز" : "Excellent user conversion"}</p>
                  </div>
                  <div className="p-3 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-500 rounded-xl">
                    <MousePointerClick className="w-6 h-6" />
                  </div>
                </div>

                {/* Average CTR Card */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-xs flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 uppercase font-black">{isRtl ? "متوسط نسبة النقر (CTR)" : "Average CTR"}</p>
                    <p className="text-2xl font-black text-slate-900 dark:text-white">
                      {(() => {
                        const totalImps = adCampaigns.reduce((sum, c) => sum + c.impressions, 0);
                        const totalClicks = adCampaigns.reduce((sum, c) => sum + c.clicks, 0);
                        return totalImps > 0 ? ((totalClicks / totalImps) * 100).toFixed(2) : '0.00';
                      })()}%
                    </p>
                    <p className="text-[9px] text-amber-500 font-bold">★ {isRtl ? "متوسط أداء المنظومة" : "Global campaign rating"}</p>
                  </div>
                  <div className="p-3 bg-amber-50 dark:bg-amber-950/40 text-amber-500 rounded-xl">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                </div>

                {/* Revenue Card */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-xs flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-[10px] text-slate-400 uppercase font-black">{isRtl ? "العائدات المقدرة للإعلانات" : "Estimated Earnings"}</p>
                    <p className="text-2xl font-black text-slate-900 dark:text-white">
                      ${adCampaigns.reduce((sum, c) => sum + c.earnings, 0).toFixed(2)}
                    </p>
                    <p className="text-[9px] text-emerald-500 font-bold">↑ {isRtl ? "أرباح مستقرة ومحدثة" : "Dynamic stable revenue"}</p>
                  </div>
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 rounded-xl">
                    <DollarSign className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Simulation Banner & Title Row */}
              <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-6 rounded-3xl border border-slate-850 shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                  <h3 className="font-black text-sm text-cyan-400 flex items-center gap-2">
                    <Layers className="w-5 h-5 animate-pulse" />
                    <span>{isRtl ? "محاكي وتتبع حملات الإعلان والزيارات" : "Traffic Simulator & Real-time Ad Tracker"}</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-semibold">
                    {isRtl 
                      ? "اضغط على زر محاكاة الزيارات لتوليد حركات مرور وهمية تفاعلية لاختبار تتبع الأداء، أو انقر على الإعلانات في المدونة لزيادة النقرات والأرباح فوراً."
                      : "Trigger simulated user traffic on active placements to verify impressions, click-through rates, and earnings immediately."}
                  </p>
                </div>

                <button
                  onClick={handleSimulateTraffic}
                  className="px-5 py-3 bg-cyan-500 hover:bg-cyan-600 text-slate-900 rounded-xl text-xs font-black cursor-pointer border-none flex items-center gap-2 shadow-md transition-all shrink-0 font-sans"
                >
                  <RefreshCcw className="w-4 h-4 animate-spin-slow" />
                  <span>{isRtl ? "محاكاة زيارات المرور تفاعلياً" : "Simulate User Traffic"}</span>
                </button>
              </div>

              {/* Main Workspace: Ad campaigns table & create form */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* Table Section (8 cols) */}
                <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
                    <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
                      <Tv className="w-5 h-5 text-indigo-500" />
                      <span>{isRtl ? "قائمة وإحصائيات الحملات الإعلانية" : "Active & Paused Ad Campaigns"}</span>
                    </h3>
                    <span className="text-[10px] bg-slate-100 dark:bg-slate-950 px-2.5 py-1 rounded-full font-black text-slate-500">
                      {adCampaigns.length} {isRtl ? "حملات مجهَّزة" : "Campaigns"}
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-start text-xs font-semibold border-collapse">
                      <thead>
                        <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 text-[10px] uppercase text-start">
                          <th className="py-3 text-start">{isRtl ? "الحملة والنوع" : "Campaign & Type"}</th>
                          <th className="py-3 text-start">{isRtl ? "الظهور" : "Impressions"}</th>
                          <th className="py-3 text-start">{isRtl ? "النقرات" : "Clicks"}</th>
                          <th className="py-3 text-start">CTR</th>
                          <th className="py-3 text-start">{isRtl ? "الأرباح" : "Earnings"}</th>
                          <th className="py-3 text-start">{isRtl ? "الحالة" : "Status"}</th>
                          <th className="py-3 text-end">{isRtl ? "إجراءات" : "Actions"}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {adCampaigns.map(c => (
                          <tr 
                            key={c.id} 
                            onClick={() => setPreviewCampaignId(c.id)}
                            className={cn(
                              "hover:bg-slate-50/50 dark:hover:bg-slate-950/45 cursor-pointer transition-colors",
                              previewCampaignId === c.id && "bg-slate-100/50 dark:bg-slate-950/70 border-l-2 border-indigo-500"
                            )}
                          >
                            <td className="py-4 space-y-1">
                              <p className="font-black text-slate-900 dark:text-white line-clamp-1">{c.name}</p>
                              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold">
                                {c.type === 'google_ads' && <span className="text-yellow-500 flex items-center gap-0.5"><Code className="w-3 h-3" /> AdSense</span>}
                                {c.type === 'banner' && <span className="text-amber-500 flex items-center gap-0.5"><Image className="w-3 h-3" /> Banner</span>}
                                {c.type === 'sidebar' && <span className="text-indigo-500 flex items-center gap-0.5"><LayoutGrid className="w-3 h-3" /> Sidebar</span>}
                                {c.type === 'native' && <span className="text-cyan-500 flex items-center gap-0.5"><Radio className="w-3 h-3" /> Native</span>}
                                <span>•</span>
                                <span className="font-mono">{c.placement}</span>
                              </div>
                            </td>
                            <td className="py-4 font-mono font-bold text-slate-700 dark:text-neutral-300">
                              {c.impressions.toLocaleString()}
                            </td>
                            <td className="py-4 font-mono font-bold text-slate-700 dark:text-neutral-300">
                              {c.clicks.toLocaleString()}
                            </td>
                            <td className="py-4 font-mono text-indigo-600 dark:text-indigo-400 font-black">
                              {c.ctr}%
                            </td>
                            <td className="py-4 font-mono text-emerald-600 dark:text-emerald-400 font-black">
                              ${Number(c.earnings).toFixed(2)}
                            </td>
                            <td className="py-4">
                              <span className={cn(
                                "px-2 py-0.5 rounded-full text-[9px] font-black",
                                c.status === 'Active' ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400" :
                                c.status === 'Paused' ? "bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400" :
                                "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-neutral-400"
                              )}>
                                {c.status === 'Active' ? (isRtl ? "نشط" : "Active") : (isRtl ? "موقف" : "Paused")}
                              </span>
                            </td>
                            <td className="py-4 text-end space-x-1.5" onClick={(e) => e.stopPropagation()}>
                              <button
                                onClick={() => handleToggleAdStatus(c.id)}
                                className="p-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-lg hover:text-indigo-500 cursor-pointer border-none"
                                title={c.status === 'Active' ? (isRtl ? "إيقاف مؤقت" : "Pause") : (isRtl ? "تشغيل" : "Resume")}
                              >
                                {c.status === 'Active' ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                              </button>
                              <button
                                onClick={() => handleResetAdAnalytics(c.id)}
                                className="p-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-lg hover:text-cyan-500 cursor-pointer border-none"
                                title={isRtl ? "تصفير الأرقام" : "Reset Analytics"}
                              >
                                <RefreshCcw className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteAdCampaign(c.id)}
                                className="p-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-lg hover:text-rose-500 cursor-pointer border-none"
                                title={isRtl ? "حذف" : "Delete"}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Visual Layout Previewer block inside the campaign manager */}
                  {(() => {
                    const activePreview = adCampaigns.find(c => c.id === previewCampaignId);
                    if (!activePreview) return null;

                    return (
                      <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-black text-xs text-slate-800 dark:text-white flex items-center gap-1.5">
                            <LayoutGrid className="w-4 h-4 text-indigo-500" />
                            <span>{isRtl ? "معاينة الاستجابة الحية للإعلان المختار" : "Responsive Screen Preview (Live Rendering)"}</span>
                          </h4>
                          <span className="text-[10px] text-slate-400 font-bold uppercase">{activePreview.name}</span>
                        </div>

                        {/* Interactive device switcher indicators */}
                        <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-3xl border border-slate-150 dark:border-slate-800 flex flex-col items-center justify-center space-y-4">
                          <p className="text-[10px] text-slate-400 font-bold">
                            {isRtl 
                              ? "يتم عرض هذا النموذج تلقائياً في قنوات المنظومة بنفس التنسيق التفاعلي."
                              : "This active placement is seamlessly delivered to corresponding blog layouts dynamically."}
                          </p>

                          {/* Render the ad frame directly! */}
                          <div className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-xs">
                            <AdsRenderer type={activePreview.type} placement={activePreview.placement} isRtl={isRtl} />
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Form Section (4 cols) */}
                <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
                  <h3 className="font-black text-sm text-slate-900 dark:text-white pb-4 border-b border-slate-100 dark:border-slate-800 mb-6 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-indigo-500" />
                    <span>{isRtl ? "حملة إعلانية جديدة" : "Launch New Campaign"}</span>
                  </h3>

                  <form onSubmit={handleAddAdCampaign} className="space-y-4 text-xs font-semibold">
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 uppercase font-black">{isRtl ? "اسم الحملة الإعلانية" : "Campaign Name"} *</label>
                      <input
                        type="text"
                        required
                        placeholder={isRtl ? "مثال: عرض نهاية العام المميز" : "e.g. Autumn Premium Discount"}
                        value={newAdName}
                        onChange={(e) => setNewAdName(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl font-bold"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 uppercase font-black">{isRtl ? "نوع الإعلان" : "Ad Type"}</label>
                        <select
                          value={newAdType}
                          onChange={(e: any) => {
                            const val = e.target.value;
                            setNewAdType(val);
                            if (val === 'google_ads') setNewAdPlacement('blog_top');
                            else if (val === 'sidebar') setNewAdPlacement('sidebar_widget');
                            else if (val === 'native') setNewAdPlacement('inline_feed');
                            else setNewAdPlacement('blog_top');
                          }}
                          className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl font-black"
                        >
                          <option value="banner">{isRtl ? "إعلان بانر عريض" : "Banner Ad"}</option>
                          <option value="sidebar">{isRtl ? "إعلان عمود جانبي" : "Sidebar Ad"}</option>
                          <option value="native">{isRtl ? "إعلان مدمج (Native)" : "Native Ad"}</option>
                          <option value="google_ads">{isRtl ? "إعلان Google Ads" : "Google AdSense"}</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 uppercase font-black">{isRtl ? "مكان الظهور" : "Placement"}</label>
                        <select
                          value={newAdPlacement}
                          onChange={(e) => setNewAdPlacement(e.target.value)}
                          className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl font-black"
                        >
                          <option value="blog_top">{isRtl ? "أعلى المدونة" : "Blog Top Header"}</option>
                          <option value="sidebar_widget">{isRtl ? "القائمة الجانبية" : "Sidebar Widget"}</option>
                          <option value="inline_feed">{isRtl ? "بين المقالات (مدمج)" : "Inline Feed"}</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400 uppercase font-black">{isRtl ? "رابط التوجيه (URL)" : "Target URL Link"} *</label>
                      <input
                        type="text"
                        required
                        placeholder="https://example.com/promo"
                        value={newAdTargetUrl}
                        onChange={(e) => setNewAdTargetUrl(e.target.value)}
                        className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl font-bold font-mono"
                      />
                    </div>

                    {/* Conditional Fields based on Type selected */}
                    {newAdType === 'google_ads' ? (
                      <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-150 dark:border-slate-800">
                        <div className="space-y-1">
                          <label className="text-[9px] text-slate-400 uppercase font-black">Google Client ID</label>
                          <input
                            type="text"
                            required
                            placeholder="ca-pub-1234"
                            value={newAdGoogleClient}
                            onChange={(e) => setNewAdGoogleClient(e.target.value)}
                            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-lg font-bold font-mono text-[11px]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[9px] text-slate-400 uppercase font-black">Ad Slot ID</label>
                          <input
                            type="text"
                            required
                            placeholder="9876543"
                            value={newAdGoogleSlot}
                            onChange={(e) => setNewAdGoogleSlot(e.target.value)}
                            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-lg font-bold font-mono text-[11px]"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3 p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-150 dark:border-slate-800">
                        <div className="space-y-1">
                          <label className="text-[10px] text-slate-400 uppercase font-black">{isRtl ? "رابط صورة الإعلان" : "Ad Image URL"} *</label>
                          <input
                            type="text"
                            required
                            placeholder="https://images.unsplash.com/..."
                            value={newAdImageUrl}
                            onChange={(e) => setNewAdImageUrl(e.target.value)}
                            className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-lg font-bold font-mono text-[11px]"
                          />
                        </div>

                        {newAdType === 'native' && (
                          <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                            <div className="space-y-1">
                              <label className="text-[10px] text-slate-400 uppercase font-black">{isRtl ? "اسم الجهة المعلنة" : "Sponsor Name"}</label>
                              <input
                                type="text"
                                placeholder={isRtl ? "مثال: البنك الأهلي المصري" : "Sponsor Company Name"}
                                value={newAdSponsorName}
                                onChange={(e) => setNewAdSponsorName(e.target.value)}
                                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-lg font-bold"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] text-slate-400 uppercase font-black">{isRtl ? "وصف الإعلان المدمج" : "Sponsor Description"}</label>
                              <textarea
                                rows={2}
                                placeholder={isRtl ? "اكتب نبذة ترويجية قصيرة تظهر مدمجة في التغذية..." : "Short promotion text..."}
                                value={newAdSponsorDescription}
                                onChange={(e) => setNewAdSponsorDescription(e.target.value)}
                                className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-lg font-semibold text-[11px]"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Cost Configs for tracking */}
                    <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-150 dark:border-slate-850">
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 uppercase font-black">{isRtl ? "سعر النقرة (CPC)" : "CPC Bid ($)"}</label>
                        <input
                          type="number"
                          step="0.05"
                          value={newAdCpc}
                          onChange={(e) => setNewAdCpc(Number(e.target.value))}
                          className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-lg font-bold font-mono"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 uppercase font-black">{isRtl ? "سعر الظهور (CPM)" : "CPM Bid ($)"}</label>
                        <input
                          type="number"
                          step="0.10"
                          value={newAdCpm}
                          onChange={(e) => setNewAdCpm(Number(e.target.value))}
                          className="w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-lg font-bold font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 uppercase font-black">{isRtl ? "تاريخ البدء" : "Start Date"}</label>
                        <input
                          type="date"
                          value={newAdStartDate}
                          onChange={(e) => setNewAdStartDate(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-lg font-bold text-[11px]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-400 uppercase font-black">{isRtl ? "تاريخ الانتهاء" : "End Date"}</label>
                        <input
                          type="date"
                          value={newAdEndDate}
                          onChange={(e) => setNewAdEndDate(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-lg font-bold text-[11px]"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black cursor-pointer border-none shadow-md transition-colors mt-2"
                    >
                      {isRtl ? "تثبيت ونشر الحملة الإعلانية" : "Deploy Ad Campaign Now"}
                    </button>
                  </form>
                </div>

              </div>
            </div>
          )}

          {/* TAB 10: PORTAL SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm">
                <h3 className="font-black text-sm text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-slate-500 animate-spin-slow" />
                  <span>{isRtl ? "تهيئة وتخصيص معايير المنظومة" : "Portal Configuration & System State"}</span>
                </h3>

                <form onSubmit={(e) => { e.preventDefault(); showToast("تم حفظ الإعدادات بنجاح في السيرفر", "Settings successfully committed!"); }} className="space-y-6 text-xs font-semibold">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase">{isRtl ? "اسم الموقع باللغة العربية" : "Site Title (Arabic)"}</label>
                      <input
                        type="text"
                        value={settings.siteNameAr}
                        onChange={(e) => setSettings({ ...settings, siteNameAr: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-200"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase">{isRtl ? "اسم الموقع باللغة الإنجليزية" : "Site Title (English)"}</label>
                      <input
                        type="text"
                        value={settings.siteNameEn}
                        onChange={(e) => setSettings({ ...settings, siteNameEn: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase">{isRtl ? "البريد الإلكتروني للاتصال الإداري" : "Contact Administrative Email"}</label>
                      <input
                        type="email"
                        value={settings.contactEmail}
                        onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-200"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase">{isRtl ? "رابط الواتساب للمساعدة والمراجعة" : "WhatsApp Helpline Link"}</label>
                      <input
                        type="text"
                        value={settings.whatsappContact}
                        onChange={(e) => setSettings({ ...settings, whatsappContact: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-800 dark:text-neutral-200 font-mono"
                      />
                    </div>
                  </div>

                  {/* Toggle controls */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-black text-slate-800 dark:text-white">{isRtl ? "وضع الصيانة المؤقت" : "Site Maintenance Mode"}</p>
                        <p className="text-[10px] text-slate-400">{isRtl ? "تعطيل تصفح الأكاديمية والمدونة للزوار مؤقتاً لأعمال التطوير" : "Suspend visitors access temporarily for scheduled database backup"}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
                        className={cn(
                          "w-12 h-6 rounded-full transition-colors relative cursor-pointer border-none",
                          settings.maintenanceMode ? "bg-rose-500" : "bg-slate-300 dark:bg-slate-800"
                        )}
                      >
                        <span className={cn(
                          "absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all shadow-xs",
                          isRtl 
                            ? (settings.maintenanceMode ? "right-6.5" : "right-0.5") 
                            : (settings.maintenanceMode ? "left-6.5" : "left-0.5")
                        )} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-black text-slate-800 dark:text-white">{isRtl ? "تمكين المستشار الضريبي بالذكاء الاصطناعي" : "Enable AI Advisory Experts"}</p>
                        <p className="text-[10px] text-slate-400">{isRtl ? "تشغيل محاكي المحاسب بالذكاء الاصطناعي ومراقبة الحصص للباقات" : "Allow Premium and Enterprise users to question the server-side LLM"}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSettings({ ...settings, enableAIAssist: !settings.enableAIAssist })}
                        className={cn(
                          "w-12 h-6 rounded-full transition-colors relative cursor-pointer border-none",
                          settings.enableAIAssist ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-800"
                        )}
                      >
                        <span className={cn(
                          "absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all shadow-xs",
                          isRtl 
                            ? (settings.enableAIAssist ? "right-6.5" : "right-0.5") 
                            : (settings.enableAIAssist ? "left-6.5" : "left-0.5")
                        )} />
                      </button>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-2xl text-xs font-black cursor-pointer border-none shadow-md"
                    >
                      {isRtl ? "حفظ وتثبيت الإعدادات العامة" : "Save General System Configs"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
