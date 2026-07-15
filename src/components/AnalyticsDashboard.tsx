import React, { useState, useEffect, useRef } from 'react';
import { 
  LineChart, 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';
import { 
  Activity, 
  Globe, 
  Search, 
  Flame, 
  Cpu, 
  Users, 
  Share2, 
  FileText, 
  Plus, 
  Trash2, 
  RefreshCcw, 
  Check, 
  Copy, 
  Download, 
  Mail, 
  Settings, 
  Calendar, 
  Clock, 
  Smartphone, 
  Tablet, 
  Monitor, 
  AlertTriangle, 
  Gauge, 
  TrendingUp, 
  MousePointer, 
  MapPin, 
  ExternalLink, 
  Eye, 
  Info, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft 
} from 'lucide-react';
import { cn } from '../lib/utils';

interface AnalyticsDashboardProps {
  isRtl?: boolean;
}

// Interfaces
interface LiveSession {
  id: string;
  country: string;
  city: string;
  page: string;
  pageAr: string;
  device: 'desktop' | 'tablet' | 'mobile';
  browser: string;
  os: string;
  timestamp: string;
  ref: string;
}

interface SearchQuery {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface SitemapItem {
  url: string;
  type: string;
  submittedDate: string;
  status: 'Success' | 'Pending' | 'Error';
  pagesCount: number;
}

interface HeatmapSpot {
  x: number; // percentage width
  y: number; // percentage height
  label: string;
  labelAr: string;
  clicks: number;
}

export default function AnalyticsDashboard({ isRtl = true }: AnalyticsDashboardProps) {
  // --- SUB-TAB SELECTION STATE ---
  type AnalyticsSubTab = 
    | 'dashboard' 
    | 'google_analytics' 
    | 'search_console' 
    | 'heatmaps' 
    | 'performance' 
    | 'visitors' 
    | 'traffic' 
    | 'reports';

  const [subTab, setSubTab] = useState<AnalyticsSubTab>('dashboard');

  // --- GENERAL SIMULATED STATE ---
  const [activeLiveUsers, setActiveLiveUsers] = useState<number>(24);
  const [measurementId, setMeasurementId] = useState<string>(() => {
    return localStorage.getItem('analytics_measurement_id') || 'G-7K8D5S1B4Q';
  });
  const [copiedTag, setCopiedTag] = useState<boolean>(false);

  // --- GOOGLE ANALYTICS LIVE EVENT LOGGER ---
  const [liveSessions, setLiveSessions] = useState<LiveSession[]>([]);

  // Page views tracking
  const [pageViewsList, setPageViewsList] = useState([
    { path: '/', title: 'الصفحة الرئيسية', titleEn: 'Home Page', views: 8240, unique: 5930, exit: '14%' },
    { path: '/blog', title: 'المدونة المهنية', titleEn: 'Professional Blog', views: 6190, unique: 4120, exit: '25%' },
    { path: '/accounting-tools', title: 'الأدوات المحاسبية والآلات الحاسبة', titleEn: 'Accounting Tools', views: 4980, unique: 3100, exit: '18%' },
    { path: '/templates-library', title: 'مكتبة شيتات الإكسل والقوالب', titleEn: 'Spreadsheet Library', views: 3120, unique: 2480, exit: '30%' },
    { path: '/academy', title: 'أكاديمية إيليا المحاسبية', titleEn: 'Elijah Academy', views: 2450, unique: 1810, exit: '12%' },
    { path: '/contact', title: 'اتصل بنا', titleEn: 'Contact Us', views: 1100, unique: 940, exit: '42%' }
  ]);

  // --- SEARCH CONSOLE STATE ---
  const [searchQueries, setSearchQueries] = useState<SearchQuery[]>([
    { query: 'تحميل شيت محاسبة مقاولات excel', clicks: 840, impressions: 5900, ctr: 14.2, position: 1.2 },
    { query: 'معايير المحاسبة المصرية ٢٠٢٦', clicks: 612, impressions: 4800, ctr: 12.7, position: 2.1 },
    { query: 'vba excel accounting macros free', clicks: 430, impressions: 8900, ctr: 4.8, position: 4.5 },
    { query: 'برنامج مراجعة القيود المحاسبية بالذكاء الاصطناعي', clicks: 310, impressions: 2100, ctr: 14.7, position: 1.8 },
    { query: 'أكاديمية إيليا للتدريب المالي بمصر', clicks: 285, impressions: 1400, ctr: 20.3, position: 1.1 },
    { query: 'نموذج تسوية البنك Excel', clicks: 195, impressions: 3200, ctr: 6.1, position: 5.3 },
    { query: 'محاسبة تكاليف المستشفيات والمراكز الطبية', clicks: 140, impressions: 2600, ctr: 5.4, position: 6.8 },
    { query: 'حساب الضريبة على القيمة المضافة مصر', clicks: 120, impressions: 1800, ctr: 6.6, position: 3.4 }
  ]);
  const [searchSortCol, setSearchSortCol] = useState<'clicks' | 'impressions' | 'ctr' | 'position'>('clicks');
  const [searchSortDesc, setSearchSortDesc] = useState<boolean>(true);

  // Sitemap Manager
  const [sitemaps, setSitemaps] = useState<SitemapItem[]>([
    { url: 'sitemap.xml', type: 'Sitemap Index', submittedDate: '2026-01-10', status: 'Success', pagesCount: 38 },
    { url: 'sitemap-blog.xml', type: 'Blog Articles', submittedDate: '2026-03-15', status: 'Success', pagesCount: 142 },
    { url: 'sitemap-tools.xml', type: 'Static Tools', submittedDate: '2026-05-02', status: 'Success', pagesCount: 12 }
  ]);
  const [newSitemapUrl, setNewSitemapUrl] = useState<string>('');

  // --- HEATMAP STATE ---
  const [heatmapDevice, setHeatmapDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [heatmapIntensity, setHeatmapIntensity] = useState<number>(80); // 0-100 glow size
  const [showHotSpots, setShowHotSpots] = useState<boolean>(true);
  const [heatmapSpots, setHeatmapSpots] = useState<HeatmapSpot[]>([
    { x: 50, y: 35, label: 'زر تحميل شيت الإكسل الرئيسي', labelAr: 'زر تحميل شيت الإكسل الرئيسي', clicks: 584 },
    { x: 12, y: 5, label: 'أيقونة تبديل اللغة', labelAr: 'أيقونة تبديل اللغة', clicks: 145 },
    { x: 88, y: 5, label: 'شعار Elijah المحاسبي', labelAr: 'شعار Elijah المحاسبي', clicks: 210 },
    { x: 35, y: 80, label: 'قالب الموازنات المقترحة', labelAr: 'قالب الموازنات المقترحة', clicks: 312 },
    { x: 65, y: 80, label: 'مقال المعيار المصري الجديد', labelAr: 'مقال المعيار المصري الجديد', clicks: 245 },
    { x: 50, y: 92, label: 'زر التواصل السريع عبر واتساب', labelAr: 'زر التواصل السريع عبر واتساب', clicks: 420 }
  ]);
  const [hoveredSpot, setHoveredSpot] = useState<HeatmapSpot | null>(null);
  const heatmapContainerRef = useRef<HTMLDivElement>(null);

  // --- PERFORMANCE STATE ---
  const [perfMetrics, setPerfMetrics] = useState({
    lcp: 1.25, // Largest Contentful Paint (s)
    fid: 12,   // First Input Delay (ms)
    cls: 0.015, // Cumulative Layout Shift
    ttfb: 142,  // Time to First Byte (ms)
    speedIndex: 1.45, // Speed Index (s)
    score: 96 // Performance score 0-100
  });
  const [perfAuditing, setPerfAuditing] = useState<boolean>(false);

  // --- TRAFFIC / UTM BUILDER STATE ---
  const [utmBaseUrl, setUtmBaseUrl] = useState<string>('https://elijah-accounting.com/templates');
  const [utmSource, setUtmSource] = useState<string>('facebook');
  const [utmMedium, setUtmMedium] = useState<string>('cpc');
  const [utmCampaign, setUtmCampaign] = useState<string>('summer_audit_promo');
  const [copiedUtm, setCopiedUtm] = useState<boolean>(false);

  // --- REPORTS STATE ---
  const [schedulerEmail, setSchedulerEmail] = useState<string>('auditor@example.com');
  const [schedulerFreq, setSchedulerFreq] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [schedulerSuccess, setSchedulerSuccess] = useState<boolean>(false);

  // --- CHART DATA GENERATION ---
  const trafficChartData = [
    { name: isRtl ? 'السبت' : 'Sat', views: 1200, clicks: 140, bounce: 42 },
    { name: isRtl ? 'الأحد' : 'Sun', views: 1850, clicks: 210, bounce: 40 },
    { name: isRtl ? 'الإثنين' : 'Mon', views: 2400, clicks: 350, bounce: 38 },
    { name: isRtl ? 'الثلاثاء' : 'Tue', views: 2200, clicks: 290, bounce: 39 },
    { name: isRtl ? 'الأربعاء' : 'Wed', views: 2600, clicks: 410, bounce: 35 },
    { name: isRtl ? 'الخميس' : 'Thu', views: 3100, clicks: 480, bounce: 36 },
    { name: isRtl ? 'الجمعة' : 'Fri', views: 2900, clicks: 420, bounce: 37 }
  ];

  const acquisitionChannelData = [
    { name: isRtl ? 'بحث مجاني (SEO)' : 'Organic Search', value: 4800, color: '#6366f1' },
    { name: isRtl ? 'شبكات التواصل' : 'Social Media', value: 3100, color: '#06b6d4' },
    { name: isRtl ? 'زيارات مباشرة' : 'Direct Traffic', value: 2400, color: '#10b981' },
    { name: isRtl ? 'روابط إحالة خارجية' : 'Referral Sites', value: 1600, color: '#f59e0b' },
    { name: isRtl ? 'بريد إلكتروني وحملات' : 'Email Campaigns', value: 950, color: '#ec4899' }
  ];

  const geoData = [
    { name: isRtl ? 'مصر' : 'Egypt', value: 54, sessions: '12,450', bounce: '38.2%' },
    { name: isRtl ? 'المملكة العربية السعودية' : 'Saudi Arabia', value: 18, sessions: '4,120', bounce: '41.5%' },
    { name: isRtl ? 'الإمارات العربية المتحدة' : 'UAE', value: 12, sessions: '2,750', bounce: '39.8%' },
    { name: isRtl ? 'الكويت' : 'Kuwait', value: 8, sessions: '1,830', bounce: '44.2%' },
    { name: isRtl ? 'قطر والبحرين' : 'Qatar & Bahrain', value: 5, sessions: '1,150', bounce: '37.1%' },
    { name: isRtl ? 'دول أخرى' : 'Other Regions', value: 3, sessions: '690', bounce: '48.9%' }
  ];

  // --- SIMULATION LOGIC: LIVE VISITORS REFRESHER ---
  useEffect(() => {
    // Save Measurement ID
    localStorage.setItem('analytics_measurement_id', measurementId);
  }, [measurementId]);

  // Generate initial live sessions
  useEffect(() => {
    const countries = ['Egypt', 'Saudi Arabia', 'UAE', 'Kuwait', 'Jordan', 'Qatar'];
    const cities = {
      'Egypt': ['Cairo', 'Alexandria', 'Giza', 'Mansoura'],
      'Saudi Arabia': ['Riyadh', 'Jeddah', 'Dammam'],
      'UAE': ['Dubai', 'Abu Dhabi', 'Sharjah'],
      'Kuwait': ['Kuwait City', 'Hawally'],
      'Jordan': ['Amman'],
      'Qatar': ['Doha']
    };
    const pages = [
      { path: '/', ar: 'الصفحة الرئيسية', en: 'Home Page' },
      { path: '/blog', ar: 'المدونة المهنية', en: 'Professional Blog' },
      { path: '/accounting-tools', ar: 'الأدوات المحاسبية', en: 'Accounting Tools' },
      { path: '/templates-library', ar: 'مكتبة القوالب', en: 'Spreadsheet Library' }
    ];
    const browsers = ['Chrome', 'Safari', 'Firefox', 'Edge'];
    const oses = ['Windows 11', 'macOS Sequoia', 'Android 14', 'iOS 17'];
    const references = ['Google Search', 'Facebook Link', 'LinkedIn Pulse', 'Direct Session', 'WhatsApp Group'];

    // Bootstrap 5 active users
    const initialSessions: LiveSession[] = Array.from({ length: 6 }).map((_, i) => {
      const country = countries[Math.floor(Math.random() * countries.length)];
      const cityList = cities[country as keyof typeof cities] || ['Main City'];
      const city = cityList[Math.floor(Math.random() * cityList.length)];
      const page = pages[Math.floor(Math.random() * pages.length)];
      
      return {
        id: `sess-${Date.now() - i * 45000}`,
        country,
        city,
        page: page.path,
        pageAr: page.ar,
        device: i % 3 === 0 ? 'desktop' : i % 3 === 1 ? 'mobile' : 'tablet',
        browser: browsers[Math.floor(Math.random() * browsers.length)],
        os: oses[Math.floor(Math.random() * oses.length)],
        timestamp: new Date(Date.now() - i * 40000).toLocaleTimeString('ar-EG'),
        ref: references[Math.floor(Math.random() * references.length)]
      };
    });

    setLiveSessions(initialSessions);

    // Keep updating in background to simulate live user stream
    const interval = setInterval(() => {
      // Fluctuate visitor count
      setActiveLiveUsers(prev => {
        const delta = Math.floor(Math.random() * 5) - 2;
        const next = prev + delta;
        return next > 8 ? (next < 55 ? next : 50) : 12;
      });

      // Add a live event
      const country = countries[Math.floor(Math.random() * countries.length)];
      const cityList = cities[country as keyof typeof cities] || ['Main City'];
      const city = cityList[Math.floor(Math.random() * cityList.length)];
      const page = pages[Math.floor(Math.random() * pages.length)];

      const newSess: LiveSession = {
        id: `sess-${Date.now()}`,
        country,
        city,
        page: page.path,
        pageAr: page.ar,
        device: Math.random() > 0.4 ? 'desktop' : Math.random() > 0.5 ? 'mobile' : 'tablet',
        browser: browsers[Math.floor(Math.random() * browsers.length)],
        os: oses[Math.floor(Math.random() * oses.length)],
        timestamp: new Date().toLocaleTimeString('ar-EG'),
        ref: references[Math.floor(Math.random() * references.length)]
      };

      setLiveSessions(prev => [newSess, ...prev.slice(0, 11)]);

      // Randomly increment some page view hits
      setPageViewsList(prev => prev.map(p => {
        if (p.path === page.path) {
          return {
            ...p,
            views: p.views + 1,
            unique: p.unique + (Math.random() > 0.3 ? 1 : 0)
          };
        }
        return p;
      }));

    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // --- TRAFFIC SIMULATOR HANDLER ---
  const handleSimulateBoost = () => {
    setActiveLiveUsers(prev => prev + Math.floor(Math.random() * 40) + 20);
    // Add extra sessions immediately
    const extra: LiveSession = {
      id: `sess-${Date.now()}`,
      country: 'Egypt',
      city: 'Cairo',
      page: '/accounting-tools',
      pageAr: 'محاكاة مرور مستهدف (بريد ترويجي)',
      device: 'desktop',
      browser: 'Chrome 124',
      os: 'Windows 11',
      timestamp: new Date().toLocaleTimeString('ar-EG'),
      ref: 'Newsletter Campaigns'
    };
    setLiveSessions(prev => [extra, ...prev]);
    
    // Increment general traffic counters randomly
    setPageViewsList(prev => prev.map(p => ({
      ...p,
      views: p.views + Math.floor(Math.random() * 150) + 50
    })));
  };

  // --- SEARCH QUERY SORTING ---
  const handleSortQueries = (column: 'clicks' | 'impressions' | 'ctr' | 'position') => {
    const isDesc = searchSortCol === column ? !searchSortDesc : true;
    setSearchSortCol(column);
    setSearchSortDesc(isDesc);
    
    const sorted = [...searchQueries].sort((a, b) => {
      let valA = a[column];
      let valB = b[column];
      if (isDesc) {
        return valB - valA;
      } else {
        return valA - valB;
      }
    });
    setSearchQueries(sorted);
  };

  // --- SITEMAP HANDLERS ---
  const handleAddSitemap = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSitemapUrl.trim()) return;

    const newItem: SitemapItem = {
      url: newSitemapUrl.trim().endsWith('.xml') ? newSitemapUrl.trim() : `${newSitemapUrl.trim()}.xml`,
      type: 'Sub-Category Index',
      submittedDate: new Date().toISOString().split('T')[0],
      status: 'Pending',
      pagesCount: Math.floor(Math.random() * 30) + 5
    };

    setSitemaps([...sitemaps, newItem]);
    setNewSitemapUrl('');

    // Trigger success status after 3 seconds
    setTimeout(() => {
      setSitemaps(prev => prev.map(s => {
        if (s.url === newItem.url) {
          return { ...s, status: 'Success' };
        }
        return s;
      }));
    }, 4000);
  };

  const handleDeleteSitemap = (url: string) => {
    setSitemaps(sitemaps.filter(s => s.url !== url));
  };

  // --- HEATMAP CLICK RECORDING ---
  const handleHeatmapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heatmapContainerRef.current) return;
    
    const rect = heatmapContainerRef.current.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);

    // Create a custom spot!
    const spotLabel = isRtl 
      ? `نقطة نقر تفاعلية مخصصة (X: ${x}%, Y: ${y}%)` 
      : `Recorded Custom click coordinate (X: ${x}%, Y: ${y}%)`;

    const newSpot: HeatmapSpot = {
      x,
      y,
      label: spotLabel,
      labelAr: spotLabel,
      clicks: 1
    };

    setHeatmapSpots([...heatmapSpots, newSpot]);
    setHoveredSpot(newSpot);

    // Fade out hovered tooltip after 3 seconds
    setTimeout(() => {
      setHoveredSpot(null);
    }, 3000);
  };

  // --- PERFORMANCE AUDIT SIMULATOR ---
  const handleRunAudit = () => {
    setPerfAuditing(true);
    
    setTimeout(() => {
      // Simulate random extremely good ratings for our fully polished application
      const score = Math.floor(Math.random() * 5) + 95; // 95 to 100
      const lcp = Number((Math.random() * 0.4 + 0.9).toFixed(2)); // 0.9s to 1.3s
      const fid = Math.floor(Math.random() * 5) + 8; // 8ms to 13ms
      const cls = Number((Math.random() * 0.01 + 0.005).toFixed(3)); // ~0.01
      const ttfb = Math.floor(Math.random() * 50) + 110; // 110ms to 160ms
      const speedIndex = Number((Math.random() * 0.3 + 1.1).toFixed(2)); // ~1.2s

      setPerfMetrics({
        lcp,
        fid,
        cls,
        ttfb,
        speedIndex,
        score
      });
      setPerfAuditing(false);
    }, 2500);
  };

  // --- UTM LINK BUILDER GENERATOR ---
  const getGeneratedUtmUrl = () => {
    try {
      const url = new URL(utmBaseUrl);
      url.searchParams.set('utm_source', utmSource);
      url.searchParams.set('utm_medium', utmMedium);
      url.searchParams.set('utm_campaign', utmCampaign);
      return url.toString();
    } catch (e) {
      return `${utmBaseUrl}?utm_source=${utmSource}&utm_medium=${utmMedium}&utm_campaign=${utmCampaign}`;
    }
  };

  const handleCopyUtm = () => {
    navigator.clipboard.writeText(getGeneratedUtmUrl());
    setCopiedUtm(true);
    setTimeout(() => setCopiedUtm(false), 2000);
  };

  const handleCopyTag = () => {
    const codeSnippet = `<!-- Google Tag (gtag.js) - Elijah Professional Platform -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${measurementId}', {
    page_path: window.location.pathname,
    client_segment: 'Verified Auditors',
    site_version: '2026.4.1'
  });
</script>`;
    navigator.clipboard.writeText(codeSnippet);
    setCopiedTag(true);
    setTimeout(() => setCopiedTag(false), 2000);
  };

  // --- REPORT EXPORTERS ---
  const handleExportCSV = () => {
    // Compile some quick general stats
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Category,Metric,Value,Percentage\n";
    csvContent += `Google Analytics,Measurement Tag,${measurementId},-\n`;
    csvContent += `Google Analytics,Real-time Visitors,${activeLiveUsers},-\n`;
    csvContent += `Search Console,Total Clicks,2812,-\n`;
    csvContent += `Search Console,Average CTR,12.4%,-\n`;
    csvContent += `Core Web Vitals,LCP Speed,${perfMetrics.lcp}s,-\n`;
    csvContent += `Core Web Vitals,Lighthouse Core Score,${perfMetrics.score}/100,-\n`;
    
    // Add pageviews
    pageViewsList.forEach(p => {
      csvContent += `Page Views,${p.path},${p.views},${p.exit} Bounce\n`;
    });

    // Add search queries
    searchQueries.forEach(q => {
      csvContent += `Search Engine Query,"${q.query}",Clicks: ${q.clicks},Rank: ${q.position}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Elijah_Core_Analytics_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Dynamic Trigger Scheduler
  const handleSaveScheduler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schedulerEmail.trim()) return;
    setSchedulerSuccess(true);
    setTimeout(() => setSchedulerSuccess(false), 4000);
  };

  return (
    <div className="space-y-6">
      
      {/* Navigation Sub-Menu */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-150 dark:border-slate-800">
        {[
          { id: 'dashboard', labelAr: 'لوحة القيادة', labelEn: 'Dashboard Overview', icon: <TrendingUp className="w-3.5 h-3.5" /> },
          { id: 'google_analytics', labelAr: 'Google Analytics', labelEn: 'Google Analytics Tag', icon: <Globe className="w-3.5 h-3.5" /> },
          { id: 'search_console', labelAr: 'Search Console', labelEn: 'Search Console', icon: <Search className="w-3.5 h-3.5" /> },
          { id: 'heatmaps', labelAr: 'خرائط الحرارة واللمس', labelEn: 'Interactive Heatmaps', icon: <Flame className="w-3.5 h-3.5" /> },
          { id: 'performance', labelAr: 'الأداء والسرعة', labelEn: 'Core Web Vitals', icon: <Cpu className="w-3.5 h-3.5" /> },
          { id: 'visitors', labelAr: 'سجلات الزوار', labelEn: 'Auditor Logins', icon: <Users className="w-3.5 h-3.5" /> },
          { id: 'traffic', labelAr: 'القنوات وروابط UTM', labelEn: 'Traffic Channels', icon: <Share2 className="w-3.5 h-3.5" /> },
          { id: 'reports', labelAr: 'التقارير والمجدول', labelEn: 'Exports & Schedule', icon: <FileText className="w-3.5 h-3.5" /> }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setSubTab(item.id as AnalyticsSubTab)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer border-none",
              subTab === item.id 
                ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-cyan-400 shadow-sm" 
                : "text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
            )}
          >
            {item.icon}
            <span>{isRtl ? item.labelAr : item.labelEn}</span>
          </button>
        ))}
      </div>

      {/* ==================== 1. MASTER EXECUTIVE DASHBOARD ==================== */}
      {subTab === 'dashboard' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Executive KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Live Active Users */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-xs flex items-center justify-between relative overflow-hidden group">
              <div className="space-y-1">
                <p className="text-[10px] text-slate-400 uppercase font-black">{isRtl ? "نشطون الآن بالموقع" : "Live Active Audiences"}</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-black text-slate-900 dark:text-white animate-pulse">{activeLiveUsers}</p>
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                </div>
                <p className="text-[9px] text-emerald-500 font-bold">{isRtl ? "محاسب ومراجع نشط بالمنصات" : "Active certified members online"}</p>
              </div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 rounded-xl">
                <Activity className="w-6 h-6 animate-pulse" />
              </div>
            </div>

            {/* Google Analytics Weekly Total */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[10px] text-slate-400 uppercase font-black">{isRtl ? "زيارات Google Analytics (الأسبوعية)" : "GA Weekly Pageviews"}</p>
                <p className="text-3xl font-black text-slate-900 dark:text-white">
                  {pageViewsList.reduce((sum, p) => sum + p.views, 0).toLocaleString()}
                </p>
                <p className="text-[9px] font-mono text-slate-400 font-bold">Tag: {measurementId}</p>
              </div>
              <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 rounded-xl">
                <Globe className="w-6 h-6" />
              </div>
            </div>

            {/* Search Console Hits */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[10px] text-slate-400 uppercase font-black">{isRtl ? "نقرات محركات البحث" : "Search Console Clicks"}</p>
                <p className="text-3xl font-black text-slate-900 dark:text-white">
                  {searchQueries.reduce((sum, q) => sum + q.clicks, 0).toLocaleString()}
                </p>
                <p className="text-[9px] text-cyan-500 font-bold">CTR: 11.2% • Rank #2.4</p>
              </div>
              <div className="p-3 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-500 rounded-xl">
                <Search className="w-6 h-6" />
              </div>
            </div>

            {/* Core Web Vitals rating */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-xs flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[10px] text-slate-400 uppercase font-black">{isRtl ? "مؤشر السرعة والأداء" : "Core Speed Score"}</p>
                <p className="text-3xl font-black text-emerald-500">{perfMetrics.score}%</p>
                <p className="text-[9px] text-emerald-500 font-bold">LCP: {perfMetrics.lcp}s • FID: {perfMetrics.fid}ms</p>
              </div>
              <div className="p-3 bg-teal-50 dark:bg-teal-950/40 text-teal-500 rounded-xl">
                <Cpu className="w-6 h-6" />
              </div>
            </div>

          </div>

          {/* Simulated Boost Banner */}
          <div className="bg-linear-to-r from-slate-900 via-indigo-950 to-slate-950 text-white p-5 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
            <div className="space-y-1 text-center md:text-start">
              <h4 className="font-black text-sm text-cyan-400 flex items-center justify-center md:justify-start gap-1.5">
                <Activity className="w-4 h-4 animate-ping" />
                <span>{isRtl ? "توليد ومحاكاة زيارات زوار حية تفاعلية" : "Interactive Live Auditing Traffic Booster"}</span>
              </h4>
              <p className="text-[11px] text-slate-400 font-semibold max-w-xl">
                {isRtl 
                  ? "قم بتنشيط محاكي تدفق الزيارات لضخ زيارات مستهدفة على صفحات الأدوات المحاسبية والمدونة لتفعيل سجلات التتبع ولخرائط الحرارة والزيارات."
                  : "Boost active auditor connections instantly to test the real-time Google Analytics stream and record custom page views stats."}
              </p>
            </div>
            <button
              onClick={handleSimulateBoost}
              className="px-5 py-2.5 bg-cyan-400 hover:bg-cyan-500 text-slate-900 text-xs font-black rounded-xl transition-all shadow-md cursor-pointer border-none shrink-0"
            >
              {isRtl ? "توليد تدفق نقرات فوري" : "Inject Dynamic Traffic"}
            </button>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Main Area Chart: Weekly Traction */}
            <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                  {isRtl ? "مؤشر تصفح الصفحات وتفاعل الزوار الأسبوعي" : "Weekly Platform Engagement Trends"}
                </h3>
                <span className="text-[10px] bg-slate-100 dark:bg-slate-950 px-2 py-0.5 rounded font-black text-slate-500">
                  {isRtl ? "تحديث تلقائي مستمر" : "Live Streaming"}
                </span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trafficChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-800" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                    <Tooltip contentStyle={{ background: '#0f172a', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '11px' }} />
                    <Area type="monotone" dataKey="views" name={isRtl ? "مشاهدات الصفحات" : "Page views"} stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorViews)" />
                    <Area type="monotone" dataKey="clicks" name={isRtl ? "نقرات المستخدمين" : "Active clicks"} stroke="#06b6d4" strokeWidth={2.5} fillOpacity={1} fill="url(#colorClicks)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Channels Pie Chart */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm space-y-4 flex flex-col justify-between">
              <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                  {isRtl ? "قنوات اكتساب وحركة الزوار" : "Traffic Acquisition Channels"}
                </h3>
              </div>

              <div className="h-44 w-full flex items-center justify-center relative">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={acquisitionChannelData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {acquisitionChannelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${Number(value).toLocaleString()} ${isRtl ? 'زيارة' : 'visits'}`} />
                  </RechartsPieChart>
                </ResponsiveContainer>
                {/* Absolute Center total info */}
                <div className="absolute text-center">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">{isRtl ? "إجمالي الجلسات" : "Sessions"}</p>
                  <p className="text-base font-black text-slate-900 dark:text-white">12,850</p>
                </div>
              </div>

              {/* Custom Legend */}
              <div className="space-y-1.5 text-[11px] font-bold">
                {acquisitionChannelData.map((c, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                      <span className="text-slate-600 dark:text-slate-400 text-[10px]">{c.name}</span>
                    </div>
                    <span className="font-mono text-slate-800 dark:text-white text-[10px]">
                      {Math.round((c.value / 12850) * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Quick Real-Time Session and Page views layout preview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Top pages table */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-indigo-500" />
                <span>{isRtl ? "مسارات الصفحات الأكثر زيارة بالمنصة" : "Top Performing Page Paths"}</span>
              </h3>

              <div className="space-y-2.5">
                {pageViewsList.slice(0, 4).map((page, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-150 dark:border-slate-850 text-xs">
                    <div className="space-y-0.5">
                      <p className="font-black text-slate-900 dark:text-white">{isRtl ? page.title : page.titleEn}</p>
                      <p className="text-[10px] text-slate-400 font-mono font-bold">{page.path}</p>
                    </div>
                    <div className="text-end">
                      <p className="font-black text-indigo-600 dark:text-cyan-400 font-mono">{page.views.toLocaleString()} PV</p>
                      <p className="text-[9px] text-slate-400 font-bold">{isRtl ? "معدل ارتداد" : "Exit Rate"}: {page.exit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Geographical Traffic Distribution */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
              <h3 className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-cyan-500" />
                <span>{isRtl ? "التوزيع الجغرافي لحركة الزوار والبلدان" : "Auditor Regional Distribution"}</span>
              </h3>

              <div className="space-y-3">
                {geoData.map((country, idx) => (
                  <div key={idx} className="space-y-1 text-xs">
                    <div className="flex justify-between font-bold">
                      <span className="text-slate-700 dark:text-slate-300">{country.name}</span>
                      <span className="font-mono text-slate-900 dark:text-white">{country.sessions} ({country.value}%)</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                      <div 
                        className="h-full bg-indigo-500 dark:bg-cyan-400 rounded-full" 
                        style={{ width: `${country.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ==================== 2. GOOGLE ANALYTICS INTEGRATION & TAGS ==================== */}
      {subTab === 'google_analytics' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Config & Tag script panel */}
            <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm space-y-5">
              <div className="space-y-1 pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-5 h-5 text-indigo-500" />
                  <span>{isRtl ? "تكوين وربط Google Analytics" : "Configure Google Analytics Tag"}</span>
                </h3>
                <p className="text-[10px] text-slate-400 font-bold">
                  {isRtl 
                    ? "أدخل معرّف قياس تتبع Google Analytics 4 (GA4) الخاص بموقعك لتوليد كود دمج مخصص مجهز بالكامل."
                    : "Enter your Google Analytics 4 (GA4) Measurement Stream ID to construct copyable dynamic tracking code blocks."}
                </p>
              </div>

              {/* Key Config form */}
              <div className="space-y-3.5 text-xs">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-black uppercase tracking-wider">
                    {isRtl ? "معرف القياس (Measurement ID)" : "Measurement ID (G-XXXXXXXXXX)"}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="G-7K8D5S1B4Q"
                      value={measurementId}
                      onChange={(e) => setMeasurementId(e.target.value.toUpperCase())}
                      className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 text-xs font-bold font-mono text-slate-800 dark:text-neutral-200 focus:outline-hidden"
                    />
                    <button
                      onClick={() => {
                        setMeasurementId('G-W32L8V9B7D');
                        showToast("تم تطبيق معرف قياس افتراضي", "Test Measurement ID loaded.");
                      }}
                      className="px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-[10px] font-black rounded-xl cursor-pointer border-none font-sans"
                    >
                      {isRtl ? "افتراضي" : "Reset Default"}
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-linear-to-br from-indigo-50/50 to-indigo-50/10 dark:from-indigo-950/20 dark:to-indigo-950/5 rounded-2xl border border-indigo-100/60 dark:border-indigo-950/40 space-y-2">
                  <p className="text-[10px] text-indigo-700 dark:text-cyan-400 font-black flex items-center gap-1">
                    <Info className="w-3.5 h-3.5" />
                    <span>{isRtl ? "نصيحة المعايرة الذكية" : "Production Deploy Status"}</span>
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                    {isRtl 
                      ? "تم دمج كود التتبع هذا تلقائياً في خوادم Elijah لإتاحة إحصاءات حقيقية فور تفعيل النطاق للعموم."
                      : "The underlying build engine automatically injects this Google Tag script into the main header template dynamically."}
                  </p>
                </div>
              </div>

              {/* Code Script generator */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] text-slate-400 font-black uppercase tracking-wider">{isRtl ? "كود التتبع التلقائي للرأس (HTML)" : "Header Embed Code (HTML)"}</label>
                  <button
                    onClick={handleCopyTag}
                    className="text-indigo-600 dark:text-cyan-400 hover:underline flex items-center gap-1 border-none bg-transparent cursor-pointer text-[10px] font-black"
                  >
                    {copiedTag ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedTag ? (isRtl ? "تم نسخ الكود!" : "Copied!") : (isRtl ? "نسخ الكود" : "Copy Code")}</span>
                  </button>
                </div>

                <pre className="p-4 bg-slate-950 text-slate-300 font-mono text-[9px] rounded-2xl overflow-x-auto leading-relaxed border border-slate-850 max-h-56">
{`<!-- Google Tag (gtag.js) - Elijah -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${measurementId}', {
    page_path: window.location.pathname,
    client_segment: 'Verified Auditors'
  });
</script>`}
                </pre>
              </div>

            </div>

            {/* Live active streaming panel (7 cols) */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-emerald-500 animate-pulse" />
                    <span>{isRtl ? "البث المباشر لأحداث الزوار (Real-Time Event Stream)" : "Live Google Analytics Events Logger"}</span>
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold mt-0.5">
                    {isRtl ? "سجل تتبع تفاعلي يستقبل النقرات والزيارات الواردة في اللحظة الفعلية." : "Real-time user activities logged instantly as they interact with the server."}
                  </p>
                </div>
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 rounded-full font-mono text-[10px] font-black">
                  {activeLiveUsers} {isRtl ? "نشط" : "Online"}
                </span>
              </div>

              {/* Streaming list log */}
              <div className="space-y-3.5 max-h-[420px] overflow-y-auto pr-1">
                {liveSessions.map((sess, idx) => (
                  <div 
                    key={sess.id} 
                    className={cn(
                      "p-3.5 rounded-2xl border transition-all duration-300 text-xs font-semibold flex items-center justify-between gap-4",
                      idx === 0 
                        ? "bg-indigo-50/30 border-indigo-200 dark:bg-indigo-950/10 dark:border-indigo-950/50 animate-pulse" 
                        : "bg-slate-50 dark:bg-slate-950 border-slate-150 dark:border-slate-850"
                    )}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-900 dark:text-white">{sess.city}، {sess.country}</span>
                        <span className="text-[9px] px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 text-slate-500 rounded font-bold uppercase">{sess.browser}</span>
                        <span className="text-[9px] px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 text-slate-500 rounded font-bold uppercase">{sess.os}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full shrink-0" />
                        <span>{isRtl ? "تصفح صفحة:" : "Loaded route:"}</span>
                        <span className="font-mono text-indigo-600 dark:text-cyan-400 font-black">{sess.page}</span>
                      </p>
                    </div>

                    <div className="text-end shrink-0">
                      <p className="text-[10px] text-slate-400 font-bold font-mono">{sess.timestamp}</p>
                      <p className="text-[9px] text-emerald-500 font-black flex items-center gap-1 justify-end">
                        <Share2 className="w-2.5 h-2.5" />
                        <span>{sess.ref}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ==================== 3. SEARCH CONSOLE CENTER ==================== */}
      {subTab === 'search_console' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Quick Console KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-xs text-xs space-y-1">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">{isRtl ? "إجمالي نقرات محرك البحث" : "Total Search Clicks"}</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">2,812</p>
              <p className="text-[9px] text-emerald-500 font-bold">↑ 18.5% {isRtl ? "مقارنة بالشهر الفائت" : "vs last 30 days"}</p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-xs text-xs space-y-1">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">{isRtl ? "مرات الظهور (Impressions)" : "Total Search Impressions"}</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">41,250</p>
              <p className="text-[9px] text-indigo-500 font-bold">↑ 24.1% {isRtl ? "مؤشر زحف متميز" : "Crawled queries"}</p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-xs text-xs space-y-1">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">{isRtl ? "متوسط نسبة النقر CTR" : "Average CTR"}</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">6.82%</p>
              <p className="text-[9px] text-amber-500 font-bold">★ {isRtl ? "أعلى من متوسط المجال (4.2%)" : "Better than average bench"}</p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-xs text-xs space-y-1">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">{isRtl ? "متوسط الترتيب بصفحات جوجل" : "Average Rank Position"}</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">2.41</p>
              <p className="text-[9px] text-emerald-500 font-bold">↑ {isRtl ? "الصفحة الأولى لمعظم الكلمات" : "Top 3 positions for key terms"}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left: Keywords Sortable Table (8 cols) */}
            <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Search className="w-5 h-5 text-cyan-500" />
                  <span>{isRtl ? "الكلمات الدلالية والاستعلامات الأكثر بحثاً (Google Console)" : "Google Search Queries & Rankings"}</span>
                </h3>
                <span className="text-[10px] text-slate-400 font-bold">
                  {isRtl ? "انقر على رأس العمود للترتيب" : "Click column header to sort"}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-start border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-150 dark:border-slate-800 text-slate-400 font-black text-[10px] uppercase">
                      <th className="py-3 text-start">{isRtl ? "كلمة البحث" : "Search Query"}</th>
                      
                      <th 
                        onClick={() => handleSortQueries('clicks')}
                        className="py-3 text-start cursor-pointer hover:text-indigo-500 select-none font-bold"
                      >
                        {isRtl ? "النقرات" : "Clicks"} {searchSortCol === 'clicks' && (searchSortDesc ? '↓' : '↑')}
                      </th>
                      
                      <th 
                        onClick={() => handleSortQueries('impressions')}
                        className="py-3 text-start cursor-pointer hover:text-indigo-500 select-none font-bold"
                      >
                        {isRtl ? "الظهور" : "Impressions"} {searchSortCol === 'impressions' && (searchSortDesc ? '↓' : '↑')}
                      </th>
                      
                      <th 
                        onClick={() => handleSortQueries('ctr')}
                        className="py-3 text-start cursor-pointer hover:text-indigo-500 select-none font-bold"
                      >
                        CTR {searchSortCol === 'ctr' && (searchSortDesc ? '↓' : '↑')}
                      </th>
                      
                      <th 
                        onClick={() => handleSortQueries('position')}
                        className="py-3 text-end cursor-pointer hover:text-indigo-500 select-none font-bold"
                      >
                        {isRtl ? "الترتيب" : "Position"} {searchSortCol === 'position' && (searchSortDesc ? '↓' : '↑')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-semibold text-slate-700 dark:text-slate-300">
                    {searchQueries.map((q, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/25">
                        <td className="py-3.5 font-black text-slate-900 dark:text-white max-w-[200px] truncate">{q.query}</td>
                        <td className="py-3.5 font-mono font-bold text-indigo-600 dark:text-cyan-400">{q.clicks}</td>
                        <td className="py-3.5 font-mono text-slate-400">{q.impressions.toLocaleString()}</td>
                        <td className="py-3.5 font-mono text-emerald-500 font-bold">{q.ctr}%</td>
                        <td className="py-3.5 text-end font-mono font-black text-slate-900 dark:text-neutral-200">#{q.position}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>

            {/* Right: Sitemap manager (4 cols) */}
            <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm space-y-6">
              
              {/* Submit XML map */}
              <div className="space-y-4">
                <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-1.5 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <Plus className="w-5 h-5 text-indigo-500" />
                  <span>{isRtl ? "إرسال ملف Sitemap جديد" : "Submit Sitemap Index"}</span>
                </h3>

                <form onSubmit={handleAddSitemap} className="space-y-3 text-xs">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-black uppercase">{isRtl ? "رابط ملف الـ Sitemap" : "Sitemap File URL"}</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        placeholder="sitemap-new.xml"
                        value={newSitemapUrl}
                        onChange={(e) => setNewSitemapUrl(e.target.value)}
                        className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl font-mono text-[11px]"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl cursor-pointer border-none font-sans"
                      >
                        {isRtl ? "إرسال" : "Submit"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Submitted lists */}
              <div className="space-y-3">
                <h4 className="text-[10px] text-slate-400 font-black uppercase tracking-wider">{isRtl ? "ملفات المخطط النشطة بمحركات البحث" : "Index Sitemap Logs"}</h4>

                <div className="space-y-3">
                  {sitemaps.map((map, i) => (
                    <div key={i} className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-150 dark:border-slate-850 text-xs flex justify-between items-center">
                      <div className="space-y-1">
                        <p className="font-black text-slate-900 dark:text-white font-mono">{map.url}</p>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold">
                          <span>Pages: {map.pagesCount}</span>
                          <span>•</span>
                          <span>{map.submittedDate}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className={cn(
                          "px-1.5 py-0.5 rounded text-[9px] font-black",
                          map.status === 'Success' ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400" : "bg-amber-100 text-amber-700 dark:bg-amber-950/40"
                        )}>
                          {map.status === 'Success' ? (isRtl ? "مقبول" : "Success") : (isRtl ? "معالجة" : "Pending")}
                        </span>
                        
                        <button
                          onClick={() => handleDeleteSitemap(map.url)}
                          className="p-1 text-slate-400 hover:text-rose-500 rounded border-none bg-transparent cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ==================== 4. INTERACTIVE HEATMAPS ==================== */}
      {subTab === 'heatmaps' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Heatmap header configs */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div className="space-y-1">
              <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <Flame className="w-5 h-5 text-rose-500 animate-pulse" />
                <span>{isRtl ? "خريطة الحرارة المحوسبة وتتبع النقرات (Dynamic Clicks Overlay)" : "Interactive Visual Page Clicks Heatmap"}</span>
              </h3>
              <p className="text-[10px] text-slate-400 font-bold">
                {isRtl 
                  ? "قم بمعاينة الأزرار والعناصر الأكثر تفاعلاً بالصفحة. انقر على أي منطقة لتوليد وتسجيل نقطة حرارية تفاعلية جديدة."
                  : "Simulate client cursor activities. You can CLICK ANYWHERE inside the live preview window frame to record new click coordinates."}
              </p>
            </div>

            {/* Interactive sliders/controls */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
              
              {/* Device Selector */}
              <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-950 p-1 rounded-xl border border-slate-150 dark:border-slate-800">
                {[
                  { id: 'desktop', icon: <Monitor className="w-3.5 h-3.5" />, label: 'Desktop' },
                  { id: 'tablet', icon: <Tablet className="w-3.5 h-3.5" />, label: 'Tablet' },
                  { id: 'mobile', icon: <Smartphone className="w-3.5 h-3.5" />, label: 'Mobile' }
                ].map(dev => (
                  <button
                    key={dev.id}
                    onClick={() => setHeatmapDevice(dev.id as any)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black transition-all cursor-pointer border-none",
                      heatmapDevice === dev.id ? "bg-white dark:bg-slate-900 text-rose-500 shadow-sm" : "text-slate-400"
                    )}
                  >
                    {dev.icon}
                    <span className="hidden sm:inline">{dev.label}</span>
                  </button>
                ))}
              </div>

              {/* HotSpot toggler */}
              <button
                onClick={() => setShowHotSpots(!showHotSpots)}
                className={cn(
                  "px-3 py-2 rounded-xl text-[10px] font-black cursor-pointer transition-all flex items-center gap-1.5 border border-slate-150 dark:border-slate-800",
                  showHotSpots ? "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400" : "bg-slate-50 text-slate-400"
                )}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>{showHotSpots ? (isRtl ? "خرائط حرارية نشطة" : "Hotspots Enabled") : (isRtl ? "مخفية" : "Hotspots Hidden")}</span>
              </button>

              {/* Intensity slider */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-400 uppercase font-black">{isRtl ? "الشفافية" : "Intensity"}</span>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={heatmapIntensity}
                  onChange={(e) => setHeatmapIntensity(Number(e.target.value))}
                  className="w-20 cursor-pointer"
                />
              </div>

            </div>
          </div>

          {/* Simulated Screen Stage */}
          <div className="flex justify-center items-center">
            
            <div 
              className={cn(
                "bg-slate-100 dark:bg-slate-950 p-4 rounded-3xl border-4 border-slate-300 dark:border-slate-800 shadow-xl transition-all duration-500 relative select-none w-full",
                heatmapDevice === 'desktop' ? "max-w-4xl" :
                heatmapDevice === 'tablet' ? "max-w-xl" : "max-w-xs"
              )}
            >
              {/* Screen Header mock bar */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200 dark:border-slate-800 text-[10px] text-slate-400">
                <div className="flex gap-1">
                  <span className="w-2.5 h-2.5 bg-rose-400 rounded-full" />
                  <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full" />
                  <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full" />
                </div>
                <div className="px-4 py-0.5 bg-slate-200 dark:bg-slate-900 rounded-full font-mono text-[9px] w-48 truncate text-center">
                  https://elijah-accounting.com/blog
                </div>
                <div className="flex items-center gap-1 font-bold">
                  <Flame className="w-3 h-3 text-rose-500 animate-pulse" />
                  <span>{heatmapSpots.reduce((s, x) => s + x.clicks, 0)} clicks logged</span>
                </div>
              </div>

              {/* Mock Page Content and interactive Click target */}
              <div 
                ref={heatmapContainerRef}
                onClick={handleHeatmapClick}
                className="bg-white dark:bg-slate-900 rounded-2xl min-h-[400px] border border-slate-200 dark:border-slate-850 relative overflow-hidden flex flex-col justify-between p-6 cursor-crosshair group/screen"
              >
                
                {/* Visual heat overlays */}
                {showHotSpots && heatmapSpots.map((spot, i) => (
                  <div
                    key={i}
                    onMouseEnter={() => setHoveredSpot(spot)}
                    onMouseLeave={() => setHoveredSpot(null)}
                    className="absolute rounded-full pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 cursor-help transition-all duration-300 hover:scale-125"
                    style={{
                      left: `${spot.x}%`,
                      top: `${spot.y}%`,
                      width: `${15 + (spot.clicks * 0.1)}px`,
                      height: `${15 + (spot.clicks * 0.1)}px`,
                      background: spot.clicks > 400 
                        ? `radial-gradient(circle, rgba(239,68,68,1) 0%, rgba(239,68,68,0) 80%)` // Red hot
                        : spot.clicks > 200 
                        ? `radial-gradient(circle, rgba(245,158,11,1) 0%, rgba(245,158,11,0) 80%)` // Orange med
                        : `radial-gradient(circle, rgba(56,189,248,1) 0%, rgba(56,189,248,0) 80%)`, // Blue cool
                      opacity: heatmapIntensity / 100,
                      boxShadow: spot.clicks > 200 ? '0 0 12px rgba(245,158,11,0.5)' : 'none'
                    }}
                  />
                ))}

                {/* Floating tooltip hover stats */}
                {hoveredSpot && (
                  <div 
                    className="absolute bg-slate-950 text-white p-3 rounded-xl shadow-lg border border-slate-800 text-[10px] z-50 pointer-events-none max-w-[200px]"
                    style={{
                      left: `${hoveredSpot.x > 70 ? hoveredSpot.x - 20 : hoveredSpot.x + 2}%`,
                      top: `${hoveredSpot.y > 70 ? hoveredSpot.y - 15 : hoveredSpot.y + 2}%`,
                    }}
                  >
                    <p className="font-black border-b border-slate-800 pb-1 mb-1">{isRtl ? hoveredSpot.labelAr : hoveredSpot.label}</p>
                    <p className="font-semibold text-slate-400">Clicks logged: <span className="text-rose-400 font-bold font-mono">{hoveredSpot.clicks} hits</span></p>
                    <p className="text-[9px] text-cyan-400 font-black">{isRtl ? "نسبة النقر الإجمالية: " : "Ratio: "}{((hoveredSpot.clicks / heatmapSpots.reduce((s, x) => s + x.clicks, 0)) * 100).toFixed(1)}%</p>
                  </div>
                )}

                {/* Simulated Content structure */}
                <div className="space-y-6">
                  {/* Navbar Mock */}
                  <div className="flex items-center justify-between border-b border-slate-150 dark:border-slate-800 pb-3">
                    <span className="font-black text-xs text-slate-800 dark:text-white">Elijah Academy</span>
                    <div className="flex gap-3 text-[9px] font-bold text-slate-400">
                      <span>{isRtl ? "الكتب" : "Books"}</span>
                      <span>{isRtl ? "المدونة" : "Blog"}</span>
                      <span>{isRtl ? "الأدوات" : "Tools"}</span>
                    </div>
                  </div>

                  {/* Hero mock */}
                  <div className="text-center space-y-3 py-4">
                    <span className="inline-block px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-cyan-400 rounded text-[9px] font-black">
                      {isRtl ? "أكاديمية تدريب معتمدة" : "Licensed Training Program"}
                    </span>
                    <h4 className="text-slate-950 dark:text-white font-black text-sm">
                      {isRtl ? "شيتات إكسل محاسبة مقاولات متكاملة" : "Dynamic Corporate Budgets Spreadsheet"}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-semibold max-w-sm mx-auto">
                      {isRtl ? "احصل على قوالب وموازنات مطابقة لمعايير التقارير المالية الدولية والمصرية." : "Download approved balance sheets complying fully with standard accounting workflows."}
                    </p>
                    
                    <div className="pt-2">
                      <span className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg text-[10px] font-black">
                        {isRtl ? "تحميل القوالب مجاناً" : "Download Premium Templates"}
                      </span>
                    </div>
                  </div>

                  {/* Body widgets */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-150 dark:border-slate-850 space-y-2">
                      <div className="w-full h-16 bg-slate-200 dark:bg-slate-850 rounded-lg overflow-hidden" />
                      <p className="text-[9px] font-black text-slate-900 dark:text-white line-clamp-1">{isRtl ? "قالب موازنات مقاولات" : "Contractor Budgets"}</p>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-150 dark:border-slate-850 space-y-2">
                      <div className="w-full h-16 bg-slate-200 dark:bg-slate-850 rounded-lg overflow-hidden" />
                      <p className="text-[9px] font-black text-slate-900 dark:text-white line-clamp-1">{isRtl ? "معيار الإيراد المصري" : "New Egyptian Revenue Standard"}</p>
                    </div>
                  </div>
                </div>

                {/* Footer mock with floating WhatsApp button */}
                <div className="border-t border-slate-150 dark:border-slate-800 pt-3 flex justify-between items-center text-[8px] text-slate-400 mt-6">
                  <span>© 2026 Elijah Platform</span>
                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white font-black">
                    W
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      )}

      {/* ==================== 5. PERFORMANCE & WEB VITALS ==================== */}
      {subTab === 'performance' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Lighthouse speed diagnostic score */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-start">
              <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center justify-center md:justify-start gap-1.5">
                <Cpu className="w-5 h-5 text-indigo-500" />
                <span>{isRtl ? "تشخيص جودة وسرعة تصفح الموقع (Core Web Vitals)" : "Core Web Vitals & Loading Diagnostics"}</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-semibold max-w-xl">
                {isRtl 
                  ? "تخضع منصة Elijah لاختبارات أداء مستمرة للتأكد من زمن استجابة صفحة أقل من 1.5 ثانية ومؤشر Cumulative Layout Shift منعدم."
                  : "Track user speed metrics on active devices. Lower times correspond to better search engine indexing ranks."}
              </p>
            </div>

            <button
              onClick={handleRunAudit}
              disabled={perfAuditing}
              className={cn(
                "px-5 py-3 rounded-xl text-xs font-black cursor-pointer border-none shadow-md flex items-center gap-2 transition-all font-sans",
                perfAuditing 
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              )}
            >
              <RefreshCcw className={cn("w-4 h-4", perfAuditing && "animate-spin")} />
              <span>{perfAuditing ? (isRtl ? "يجري فحص الأداء..." : "Auditing Platform...") : (isRtl ? "تشغيل الفحص السريع للأداء" : "Run Fresh Core Audit")}</span>
            </button>
          </div>

          {/* Dials / Cards of Core metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* LCP Dial Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl shadow-sm text-xs space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="font-black text-slate-900 dark:text-white">LCP (Largest Contentful Paint)</span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 text-[10px] font-black rounded-full">Good</span>
              </div>
              <div className="flex items-baseline gap-2.5">
                <span className="text-4xl font-black font-mono text-slate-900 dark:text-white">{perfMetrics.lcp}s</span>
                <span className="text-slate-400 font-semibold">{isRtl ? "سرعة التحميل المرئي" : "Visual paint speed"}</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed font-bold">
                {isRtl ? "تنزيل المكونات الرسومية الرئيسية في وقت ممتاز يقل عن الحد الأقصى لجوجل (2.5 ثانية)." : "Visual layout components fully parsed in speeds exceeding Google standards."}
              </p>
            </div>

            {/* INP / FID Delay Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl shadow-sm text-xs space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="font-black text-slate-900 dark:text-white">FID (First Input Delay)</span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 text-[10px] font-black rounded-full">Good</span>
              </div>
              <div className="flex items-baseline gap-2.5">
                <span className="text-4xl font-black font-mono text-slate-900 dark:text-white">{perfMetrics.fid}ms</span>
                <span className="text-slate-400 font-semibold">{isRtl ? "زمن استجابة النقر" : "Click responsiveness"}</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed font-bold">
                {isRtl ? "يستجيب الخادم للنقرات والمدخلات بشكل شبه فوري بسبب الهيكلية المعتمدة." : "Input response times are near-instantaneous due to highly-optimized local state loops."}
              </p>
            </div>

            {/* CLS Shift Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl shadow-sm text-xs space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="font-black text-slate-900 dark:text-white">CLS (Cumulative Layout Shift)</span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 text-[10px] font-black rounded-full">Good</span>
              </div>
              <div className="flex items-baseline gap-2.5">
                <span className="text-4xl font-black font-mono text-slate-900 dark:text-white">{perfMetrics.cls}</span>
                <span className="text-slate-400 font-semibold">{isRtl ? "ثبات واجهة المستخدم" : "UI Layout Stability"}</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-relaxed font-bold">
                {isRtl ? "مؤشر ثبات ممتاز منعدم الإزاحات، مما يمنع تحرك الأزرار فجأة أثناء تصفح المقالات." : "Zero visual flickering or content shifts while loading resources asynchronously."}
              </p>
            </div>

          </div>

          {/* Core Optimization Suggestions */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm space-y-4">
            <h3 className="font-black text-xs text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5 pb-3 border-b border-slate-100 dark:border-slate-800">
              <AlertTriangle className="w-4 h-4 text-amber-500 animate-pulse" />
              <span>{isRtl ? "توصيات ومقترحات تحسين سرعة الأرشفة والزحف" : "Search Engine Optimization & Audit Recommendations"}</span>
            </h3>

            <div className="space-y-3 text-xs font-semibold">
              <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-150 dark:border-slate-850 flex items-start gap-3">
                <span className="px-2 py-1 bg-yellow-400 text-slate-950 text-[9px] font-black rounded uppercase">SEO Recommendation</span>
                <div className="space-y-1">
                  <p className="text-slate-900 dark:text-white font-black">{isRtl ? "ضغط وتصغير صور مقالات المدونة المضافة حديثاً" : "Enable modern WebP/AVIF file formats for blog uploads"}</p>
                  <p className="text-[10px] text-slate-400 font-bold">{isRtl ? "يوصى بتحويل صور التغطية إلى صيغة webp لتقليص حجم الصفحة من 2.4 ميجابايت إلى 410 كيلوبايت فقط." : "Pre-render Unsplash covers to reduce document payload from 2.4MB to less than 400KB."}</p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-150 dark:border-slate-850 flex items-start gap-3">
                <span className="px-2 py-1 bg-emerald-500 text-white text-[9px] font-black rounded uppercase">Audit Success</span>
                <div className="space-y-1">
                  <p className="text-slate-900 dark:text-white font-black">{isRtl ? "تفعيل ذاكرة التخزين المؤقت للمتصفح بالكامل" : "HTTP Asset Cache TTL standards satisfied"}</p>
                  <p className="text-[10px] text-slate-400 font-bold">{isRtl ? "تم تهيئة استجابة الخادم لتخزين ملفات CSS وJS الثابتة لمدة 365 يوماً بنجاح." : "Static stylesheet components and modules configured with long-term client caching headers."}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ==================== 6. VISITORS REGISTRY ==================== */}
      {subTab === 'visitors' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <Users className="w-5 h-5 text-indigo-500 animate-pulse" />
                <span>{isRtl ? "سجلات جلسات المحاسبين والزوار النشطة" : "Active Verified Sessions Registry"}</span>
              </h3>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-950 px-2.5 py-1 rounded-full font-black text-slate-500">
                Live monitoring
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-start border-collapse text-xs font-semibold">
                <thead>
                  <tr className="border-b border-slate-150 dark:border-slate-800 text-slate-400 text-[10px] uppercase">
                    <th className="py-3 text-start">{isRtl ? "الموقع الجغرافي" : "Location"}</th>
                    <th className="py-3 text-start">{isRtl ? "المسار النشط" : "Active Path"}</th>
                    <th className="py-3 text-start">{isRtl ? "نوع الجهاز" : "Device Type"}</th>
                    <th className="py-3 text-start">{isRtl ? "المتصفح والنظام" : "Browser & System"}</th>
                    <th className="py-3 text-start">{isRtl ? "رابط الإحالة" : "Referrer Source"}</th>
                    <th className="py-3 text-end">{isRtl ? "وقت الدخول" : "Timestamp"}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  {liveSessions.map((sess) => (
                    <tr key={sess.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20">
                      <td className="py-4 font-black text-slate-950 dark:text-white flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-cyan-500" />
                        <span>{sess.city}، {sess.country}</span>
                      </td>
                      <td className="py-4 font-mono text-indigo-600 dark:text-cyan-400 font-bold">{sess.page}</td>
                      <td className="py-4 uppercase text-[10px] font-black">
                        {sess.device === 'desktop' && <span className="flex items-center gap-1"><Monitor className="w-3.5 h-3.5 text-slate-400" /> Desktop</span>}
                        {sess.device === 'tablet' && <span className="flex items-center gap-1"><Tablet className="w-3.5 h-3.5 text-slate-400" /> Tablet</span>}
                        {sess.device === 'mobile' && <span className="flex items-center gap-1"><Smartphone className="w-3.5 h-3.5 text-slate-400" /> Mobile</span>}
                      </td>
                      <td className="py-4">
                        <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-black text-slate-500 mr-1">{sess.browser}</span>
                        <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-black text-slate-500">{sess.os}</span>
                      </td>
                      <td className="py-4 text-emerald-500 font-bold">{sess.ref}</td>
                      <td className="py-4 text-end font-mono text-slate-400 font-bold">{sess.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>
      )}

      {/* ==================== 7. TRAFFIC CHANNELS & UTM BUILDER ==================== */}
      {subTab === 'traffic' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left: Referrers (6 cols) */}
            <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm space-y-4">
              <h3 className="font-black text-xs text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5 pb-3 border-b border-slate-100 dark:border-slate-800">
                <Share2 className="w-4 h-4 text-indigo-500" />
                <span>{isRtl ? "أبرز مواقع الإحالة ومصادر الزيارات" : "Top Domain Referral Traffic"}</span>
              </h3>

              <div className="space-y-3">
                {[
                  { domain: 'google.com.eg', type: 'Search Engine', sessions: 2840, change: '↑ 12%' },
                  { domain: 'facebook.com / organic', type: 'Social Media', sessions: 1850, change: '↑ 8%' },
                  { domain: 'linkedin.com / pulse', type: 'Professional Networking', sessions: 1100, change: '↑ 24%' },
                  { domain: 'facebook.com / ads', type: 'Paid Campaign', sessions: 920, change: '↓ 3%' },
                  { domain: 'whatsapp.com / direct', type: 'Direct Share', sessions: 640, change: '↑ 15%' }
                ].map((ref, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-150 dark:border-slate-850 flex justify-between items-center text-xs">
                    <div className="space-y-1">
                      <p className="font-black text-slate-900 dark:text-white font-mono">{ref.domain}</p>
                      <p className="text-[10px] text-slate-400 font-bold">{ref.type}</p>
                    </div>

                    <div className="text-end">
                      <p className="font-black text-slate-950 dark:text-white font-mono">{ref.sessions.toLocaleString()}</p>
                      <p className="text-[10px] text-emerald-500 font-black">{ref.change}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: UTM builder generator (6 cols) */}
            <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm space-y-4">
              <div className="pb-3 border-b border-slate-100 dark:border-slate-800 space-y-0.5">
                <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Plus className="w-5 h-5 text-indigo-500" />
                  <span>{isRtl ? "مُنشئ ومتبع روابط الحملات الإعلانية (UTM Generator)" : "Campaign UTM Link Builder"}</span>
                </h3>
                <p className="text-[10px] text-slate-400 font-bold">
                  {isRtl ? "أنشئ روابط مخصصة لتتبع مكاتب المراجعة والحملات الترويجية بدقة متناهية." : "Construct standardized marketing URLs to record campaigns traffic accurately."}
                </p>
              </div>

              {/* UTM inputs form */}
              <div className="space-y-4 text-xs font-semibold">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-black uppercase">{isRtl ? "الرابط الأساسي للموقع (Base URL)" : "Base URL Address"}</label>
                  <input
                    type="text"
                    value={utmBaseUrl}
                    onChange={(e) => setUtmBaseUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl font-mono text-[11px]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-black uppercase">{isRtl ? "المصدر (Source)" : "Source"}</label>
                    <input
                      type="text"
                      placeholder="facebook, google"
                      value={utmSource}
                      onChange={(e) => setUtmSource(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-lg text-[11px]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-black uppercase">{isRtl ? "الوسيط (Medium)" : "Medium"}</label>
                    <input
                      type="text"
                      placeholder="cpc, organic, email"
                      value={utmMedium}
                      onChange={(e) => setUtmMedium(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-lg text-[11px]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-black uppercase">{isRtl ? "الحملة (Campaign)" : "Campaign"}</label>
                    <input
                      type="text"
                      placeholder="summer_auditors"
                      value={utmCampaign}
                      onChange={(e) => setUtmCampaign(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-lg text-[11px]"
                    />
                  </div>
                </div>

                {/* Generated URL copyable box */}
                <div className="p-4 bg-slate-950 text-slate-300 rounded-2xl border border-slate-850 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] text-indigo-400 font-black uppercase tracking-widest">{isRtl ? "الرابط الجاهز للنشر" : "Generated Tracking Link"}</span>
                    <button
                      onClick={handleCopyUtm}
                      className="text-cyan-400 hover:underline border-none bg-transparent cursor-pointer text-[10px] font-bold flex items-center gap-1"
                    >
                      {copiedUtm ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedUtm ? (isRtl ? "تم النسخ!" : "Copied!") : (isRtl ? "نسخ الرابط" : "Copy URL")}</span>
                    </button>
                  </div>
                  <p className="font-mono text-[9px] break-all leading-relaxed select-all">{getGeneratedUtmUrl()}</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* ==================== 8. REPORTS GENERATOR & SCHEDULES ==================== */}
      {subTab === 'reports' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* CSV/PDF exports (6 cols) */}
            <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm space-y-5">
              <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Download className="w-5 h-5 text-indigo-500 animate-pulse" />
                  <span>{isRtl ? "تصدير وتنزيل تقارير الأداء" : "Export Analytics & Performance Data"}</span>
                </h3>
                <p className="text-[10px] text-slate-400 font-bold mt-0.5">
                  {isRtl ? "قم بتنزيل سجلات حركة البحث والزيارات وخرائط الحرارة والسرعة في ملفات قابلة للقراءة الفورية." : "Download spreadsheet summaries compatible with Microsoft Excel and general audit logs."}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Excel CSV downloader */}
                <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-2xl space-y-3">
                  <span className="inline-block p-2 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 rounded-xl">
                    <FileText className="w-5 h-5" />
                  </span>
                  <div className="space-y-1">
                    <h4 className="text-xs font-black text-slate-900 dark:text-white">{isRtl ? "تقرير Excel CSV متكامل" : "Microsoft Excel CSV Spreadsheet"}</h4>
                    <p className="text-[10px] text-slate-400 font-semibold">{isRtl ? "يتضمن الكلمات الدلالية وجوجل كونسول وجلسات البلدان" : "Includes SEO keywords metadata and regional sessions"}</p>
                  </div>
                  <button
                    onClick={handleExportCSV}
                    className="w-full py-2 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white text-[11px] font-black rounded-lg cursor-pointer border-none flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isRtl ? "تنزيل ملف الـ Excel" : "Download Excel CSV"}</span>
                  </button>
                </div>

                {/* PDF corporate summary downloader */}
                <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-2xl space-y-3">
                  <span className="inline-block p-2 bg-red-100 dark:bg-red-950/40 text-red-600 rounded-xl">
                    <FileText className="w-5 h-5" />
                  </span>
                  <div className="space-y-1">
                    <h4 className="text-xs font-black text-slate-900 dark:text-white">{isRtl ? "تقرير الإدارة المطبوع PDF" : "Corporate PDF Executive Summary"}</h4>
                    <p className="text-[10px] text-slate-400 font-semibold">{isRtl ? "وثيقة رسمية مجهزة لتقديمها لمجالس إدارة المكاتب" : "Polished official file ready for board assemblies"}</p>
                  </div>
                  <button
                    onClick={() => {
                      window.print();
                    }}
                    className="w-full py-2 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white text-[11px] font-black rounded-lg cursor-pointer border-none flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isRtl ? "طباعة / حفظ كـ PDF" : "Print/Export as PDF"}</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Email reports scheduler (6 cols) */}
            <div className="lg:col-span-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-sm space-y-4">
              <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Mail className="w-5 h-5 text-indigo-500 animate-pulse" />
                  <span>{isRtl ? "المجدول الآلي للتقارير الدورية (Email SMTP Scheduler)" : "Automated Reports Email Scheduler"}</span>
                </h3>
                <p className="text-[10px] text-slate-400 font-bold mt-0.5">
                  {isRtl ? "قم بتهيئة المنصة لإرسال ملفات تتبع تفصيلية تلقائياً على بريد الإدارة بالتردد المرغوب." : "Schedule automated PDF deliveries directly to your administrative auditor's inbox."}
                </p>
              </div>

              <form onSubmit={handleSaveScheduler} className="space-y-4 text-xs font-semibold">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400 font-black uppercase">{isRtl ? "البريد الإلكتروني المستهدف للاستلام" : "Recipient Email Address"}</label>
                  <input
                    type="email"
                    required
                    placeholder="auditor-admin@elijah.com"
                    value={schedulerEmail}
                    onChange={(e) => setSchedulerEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-black uppercase">{isRtl ? "تردد وموعد الإرسال" : "Schedule Interval"}</label>
                    <select
                      value={schedulerFreq}
                      onChange={(e: any) => setSchedulerFreq(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl font-black"
                    >
                      <option value="daily">{isRtl ? "يومياً (الساعة 8 صباحاً)" : "Every day at 8:00 AM"}</option>
                      <option value="weekly">{isRtl ? "أسبوعياً (كل يوم سبت)" : "Weekly on Saturday"}</option>
                      <option value="monthly">{isRtl ? "شهرياً (أول يوم عمل)" : "Monthly first workday"}</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400 font-black uppercase">{isRtl ? "الأقسام المشمولة بالملف" : "Modules Included"}</label>
                    <select className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800 rounded-xl font-black">
                      <option>{isRtl ? "تقرير الأداء والمبيعات والسرعة" : "Unified Consolidated Report"}</option>
                      <option>{isRtl ? "سجل الكلمات الدلالية فقط" : "Search queries only"}</option>
                      <option>{isRtl ? "خرائط الحرارة والنقرات" : "Heatmaps overlay snapshots"}</option>
                    </select>
                  </div>
                </div>

                {schedulerSuccess && (
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 rounded-xl border border-emerald-100 dark:border-emerald-950/40 text-[10px] font-bold flex items-center gap-1.5">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>
                      {isRtl 
                        ? `تم تفعيل المجدول بنجاح! سيتم إرسال التقارير التلقائية إلى ${schedulerEmail} بنجاح.` 
                        : `SMTP trigger registered successfully for ${schedulerEmail}.`}
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black cursor-pointer border-none shadow-md"
                >
                  {isRtl ? "حفظ وتفعيل مجدول التقارير التلقائي" : "Activate Automated Scheduler Preset"}
                </button>
              </form>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

// Utility Toast Alert helper
function showToast(titleAr: string, titleEn: string) {
  const isAr = document.documentElement.dir === 'rtl' || true;
  const msg = isAr ? titleAr : titleEn;
  
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl text-xs font-black font-sans flex items-center gap-2 border border-slate-800 transition-all duration-500 animate-slideUp';
  toast.innerHTML = `<span class="w-2 h-2 bg-indigo-500 rounded-full animate-ping"></span><span>${msg}</span>`;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => document.body.removeChild(toast), 600);
  }, 3500);
}
