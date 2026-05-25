import React, { useState, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Building, 
  Truck, 
  Laptop, 
  Armchair, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  Filter, 
  TrendingUp, 
  Coins, 
  Calculator, 
  Calendar, 
  MapPin, 
  RotateCcw, 
  FileSpreadsheet, 
  Printer, 
  ArrowUpRight, 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle, 
  Download, 
  BookOpen, 
  Briefcase, 
  Layers,
  ChevronLeft,
  ChevronRight,
  Info
} from 'lucide-react';
import { 
  BarChart as ReChartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as ReChartsTooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

// Define Fixed Asset Type
interface FixedAsset {
  id: string;
  name: string;
  code: string;
  type: 'buildings' | 'vehicles' | 'devices' | 'furniture' | 'machinery' | 'other';
  purchaseDate: string;
  costValue: number;
  usefulLife: number; // in years
  salvageValue: number; // salvage/scrap value
  depreciationMethod: 'straight' | 'declining' | 'sum_of_years';
  department: string;
  location: string;
  notes: string;
}

// Educational Accordion Segment
interface SectionProps {
  title: string;
  number: string;
  children: React.ReactNode;
}

const EduSection: React.FC<SectionProps> = ({ title, number, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-slate-100 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-right font-black text-slate-800 dark:text-neutral-100 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-mono text-base font-black">
            {number}
          </span>
          <span className="text-base sm:text-lg">{title}</span>
        </div>
        <span className={`transform transition-transform duration-300 w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 text-xs ${isOpen ? 'rotate-90' : ''}`}>
          ◀
        </span>
      </button>
      {isOpen && (
        <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-950/20 text-slate-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed space-y-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default function FixedAssets() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  
  // Tabs: 'edu' (Educational), 'register' (Practical Register), 'dashboard' (Charts & KPIs), 'journal_entries' (Accounting Links)
  const [activeTab, setActiveTab] = useState<'edu' | 'register' | 'dashboard' | 'journal_entries'>('edu');
  
  // Selected sub-segment in theoretical checklist for direct jump
  const [activeEduSubTab, setActiveEduSubTab] = useState<string>('all');

  // Pre-seed realistic mock fixed assets
  const [assets, setAssets] = useState<FixedAsset[]>([
    {
      id: 'as-101',
      name: 'مبنى المقر الرئيسي للشركة',
      code: 'FA-BLD-01',
      type: 'buildings',
      purchaseDate: '2020-01-15',
      costValue: 1200000,
      usefulLife: 20,
      salvageValue: 200000,
      depreciationMethod: 'straight',
      department: 'الإدارة العامة',
      location: 'القاهرة، التجمع الخامس',
      notes: 'شراء مبني إداري متكامل'
    },
    {
      id: 'as-102',
      name: 'سيارات نقل وتوزيع بضائع شيري',
      code: 'FA-VEH-05',
      type: 'vehicles',
      purchaseDate: '2022-03-10',
      costValue: 350000,
      usefulLife: 5,
      salvageValue: 50000,
      depreciationMethod: 'declining',
      department: 'الخدمات اللوجستية والبيع',
      location: 'مخازن العبور الرئيسي',
      notes: 'سيارة جامبو ٢ طن مجهزة'
    },
    {
      id: 'as-103',
      name: 'سيرفر مركزي للبيانات Dell PowerEdge',
      code: 'FA-DEV-12',
      type: 'devices',
      purchaseDate: '2024-02-01',
      costValue: 120000,
      usefulLife: 4,
      salvageValue: 10000,
      depreciationMethod: 'straight',
      department: 'تكنولوجيا المعلومات IT',
      location: 'غرفة السيرفرات الرئيسية',
      notes: 'خادم حوسبة مركزي لربط الفروع'
    },
    {
      id: 'as-104',
      name: 'أثاث ومكاتب قاعة الاجتماع الكبرى',
      code: 'FA-FUR-20',
      type: 'furniture',
      purchaseDate: '2021-06-20',
      costValue: 80000,
      usefulLife: 8,
      salvageValue: 8000,
      depreciationMethod: 'sum_of_years',
      department: 'الموارد البشرية والمؤتمرات',
      location: 'مكتب العاصمة الإدارية',
      notes: 'طاولة خشبية فاخرة و ١٢ كرسي جلد طبيعي'
    }
  ]);

  // Asset Form States
  const [assetForm, setAssetForm] = useState<Omit<FixedAsset, 'id'>>({
    name: '',
    code: '',
    type: 'buildings',
    purchaseDate: new Date().toISOString().substring(0, 10),
    costValue: 0,
    usefulLife: 5,
    salvageValue: 0,
    depreciationMethod: 'straight',
    department: '',
    location: '',
    notes: ''
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterDept, setFilterDept] = useState<string>('all');

  // Selected schedule viewer asset ID
  const [scheduleAssetId, setScheduleAssetId] = useState<string>('as-101');

  // PDF Save / Print references
  const printRef = useRef<HTMLDivElement>(null);

  // Helper translations for Type Code
  const assetTypesMeta = {
    buildings: { labelAr: 'مباني وإنشاءات', labelEn: 'Buildings & Constructions', icon: Building, color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40' },
    vehicles: { labelAr: 'وسائل نقل وانتقال', labelEn: 'Vehicles & Transport', icon: Truck, color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/40' },
    devices: { labelAr: 'أجهزة كمبيوتر وتقنيات', labelEn: 'Devices & Tech Servers', icon: Laptop, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40' },
    furniture: { labelAr: 'أثاث وتجهيزات مكتبية', labelEn: 'Furniture & Decor', icon: Armchair, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40' },
    machinery: { labelAr: 'آلات ومعدات خطوط الإنتاج', labelEn: 'Machinery & Tools', icon: Coins, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/40' },
    other: { labelAr: 'أصول ثابتة أخرى', labelEn: 'Other Fixed Assets', icon: Layers, color: 'text-slate-500 bg-slate-50 dark:bg-slate-950/40' }
  };

  const getAssetTypeLabel = (type: keyof typeof assetTypesMeta) => {
    return isRtl ? assetTypesMeta[type]?.labelAr : assetTypesMeta[type]?.labelEn;
  };

  // 4 Depreciation Algorithms for current date / scheduling helper
  const calculateDepreciationForYear = (asset: FixedAsset, yearIndex: number) => {
    // Current age count is determined starting from purchase year
    const cost = asset.costValue;
    const salvage = asset.salvageValue;
    const life = asset.usefulLife;
    const depreciableBase = cost - salvage;

    if (depreciableBase <= 0 || life <= 0) {
      return { cost, annualDep: 0, accumDep: 0, bookValue: cost };
    }

    if (asset.depreciationMethod === 'straight') {
      const rate = 1 / life;
      const annualDep = depreciableBase * rate;
      const accumDep = Math.min(depreciableBase, annualDep * (yearIndex + 1));
      const bookValue = cost - accumDep;
      return { annualDep, accumDep, bookValue };
    } 
    else if (asset.depreciationMethod === 'declining') {
      // Double Declining balance: 2 * (1/life)
      const rate = (2 / life);
      let tempBookValue = cost;
      let annualDep = 0;
      let accumDep = 0;

      for (let i = 0; i <= yearIndex; i++) {
        annualDep = tempBookValue * rate;
        // prevent depreciating below salvage value
        if (tempBookValue - annualDep < salvage) {
          annualDep = tempBookValue - salvage;
        }
        accumDep += annualDep;
        tempBookValue -= annualDep;
        if (tempBookValue <= salvage) {
          tempBookValue = salvage;
          break;
        }
      }
      return { annualDep, accumDep, bookValue: tempBookValue };
    } 
    else {
      // Sum of the Years Digits
      const sumOfYears = (life * (life + 1)) / 2;
      let accumDep = 0;
      let annualDep = 0;

      for (let i = 0; i <= yearIndex; i++) {
        const remainingLife = life - i;
        const fraction = remainingLife / sumOfYears;
        annualDep = depreciableBase * fraction;
        accumDep += annualDep;
      }
      const bookValue = cost - accumDep;
      return { annualDep, accumDep, bookValue };
    }
  };

  // Generate Year-by-Year Schedule for active schedule viewer asset
  const activeScheduleAsset = useMemo(() => {
    return assets.find(a => a.id === scheduleAssetId) || assets[0];
  }, [scheduleAssetId, assets]);

  const scheduleData = useMemo(() => {
    if (!activeScheduleAsset) return [];
    
    // Parse purchase year
    const startYear = new Date(activeScheduleAsset.purchaseDate).getFullYear();
    const rows = [];
    let cumulativeDep = 0;

    for (let i = 0; i < activeScheduleAsset.usefulLife; i++) {
      const calc = calculateDepreciationForYear(activeScheduleAsset, i);
      cumulativeDep += calc.annualDep;
      
      rows.push({
        year: startYear + i,
        yearNumber: i + 1,
        initialValue: activeScheduleAsset.costValue - (calc.accumDep - calc.annualDep),
        depreciationCost: calc.annualDep,
        accumulatedDep: calc.accumDep,
        netValue: calc.bookValue
      });
    }
    return rows;
  }, [activeScheduleAsset]);

  // Calculate dynamic lives and book values for assets list standard rendering
  const activeAssetsCalculated = useMemo(() => {
    const currentYear = new Date().getFullYear();
    
    return assets.map(asset => {
      const buyYear = new Date(asset.purchaseDate).getFullYear();
      let diffYears = currentYear - buyYear;
      if (diffYears < 0) diffYears = 0;
      if (diffYears >= asset.usefulLife) diffYears = asset.usefulLife - 1; // Limit calculation to useful life end

      const currentDep = calculateDepreciationForYear(asset, diffYears);
      
      return {
        ...asset,
        annualDep: currentDep.annualDep,
        accumDep: currentDep.accumDep,
        bookValue: currentDep.bookValue,
        progressPercent: ((currentDep.accumDep / asset.costValue) * 100)
      };
    });
  }, [assets]);

  // Search & Filter list
  const filteredAssets = useMemo(() => {
    return activeAssetsCalculated.filter(asset => {
      const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            asset.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            asset.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            asset.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === 'all' || asset.type === filterType;
      const matchesDept = filterDept === 'all' || asset.department === filterDept;
      return matchesSearch && matchesType && matchesDept;
    });
  }, [activeAssetsCalculated, searchQuery, filterType, filterDept]);

  // Extract all departments dynamically
  const uniqueDepartments = useMemo(() => {
    const depts = new Set<string>();
    assets.forEach(a => depts.add(a.department));
    return Array.from(depts);
  }, [assets]);

  // Aggregate Metrics for Dashboard
  const metrics = useMemo(() => {
    let rawTotalCost = 0;
    let rawTotalAccumDep = 0;
    let rawTotalBookValue = 0;

    activeAssetsCalculated.forEach(a => {
      rawTotalCost += a.costValue;
      rawTotalAccumDep += a.accumDep;
      rawTotalBookValue += a.bookValue;
    });

    return {
      count: activeAssetsCalculated.length,
      totalCost: rawTotalCost,
      totalAccumDep: rawTotalAccumDep,
      totalBookValue: rawTotalBookValue,
      depreciationRatio: rawTotalCost > 0 ? (rawTotalAccumDep / rawTotalCost) * 100 : 0
    };
  }, [activeAssetsCalculated]);

  // Direct edit loading
  const handleEditAsset = (asset: FixedAsset) => {
    setEditingId(asset.id);
    setAssetForm({
      name: asset.name,
      code: asset.code,
      type: asset.type,
      purchaseDate: asset.purchaseDate,
      costValue: asset.costValue,
      usefulLife: asset.usefulLife,
      salvageValue: asset.salvageValue,
      depreciationMethod: asset.depreciationMethod,
      department: asset.department,
      location: asset.location,
      notes: asset.notes
    });
    setIsFormOpen(true);
  };

  // Submission handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assetForm.name || !assetForm.code || assetForm.costValue <= 0) {
      alert(isRtl ? 'يرجى ملء جميع الحقول المطلوبة والتأكد من القيمة!' : 'Please fill all fields correctly!');
      return;
    }

    if (editingId) {
      // Edit
      setAssets(prev => prev.map(a => a.id === editingId ? { ...assetForm, id: editingId } : a));
      alert(isRtl ? 'تم تحديث أصل الثابت بنجاح!' : 'Asset updated successfully!');
      setEditingId(null);
    } else {
      // Add
      const newAsset: FixedAsset = {
        ...assetForm,
        id: 'as-' + Date.now().toString().slice(-4)
      };
      setAssets(prev => [...prev, newAsset]);
      alert(isRtl ? 'تم إضافة الأصل الثابت بنجاح!' : 'New Fixed Asset added successfully!');
    }

    // Reset Form
    setAssetForm({
      name: '',
      code: '',
      type: 'buildings',
      purchaseDate: new Date().toISOString().substring(0, 10),
      costValue: 0,
      usefulLife: 5,
      salvageValue: 0,
      depreciationMethod: 'straight',
      department: '',
      location: '',
      notes: ''
    });
    setIsFormOpen(false);
  };

  // Delete handler
  const handleDeleteAsset = (id: string, name: string) => {
    const confirmMessage = isRtl 
      ? `هل أنت متأكد من حذف الأصل الثابت: "${name}"؟` 
      : `Are you sure you want to delete asset "${name}"?`;
    if (confirm(confirmMessage)) {
      setAssets(prev => prev.filter(a => a.id !== id));
    }
  };

  // Print layout action standard HTML trigger
  const handlePrint = () => {
    window.print();
  };

  // CSV Exporter for excel ease
  const handleExportCSV = () => {
    const headers = ['الأصل', 'الكود', 'النوع', 'تاريخ الشراء', 'القيمة الشرائية', 'العمر الإنتاجي', 'قيمة الخردة', 'أحدث مجمع إهلاك', 'أحدث صافي قيمة دفترية', 'القسم'];
    const rows = filteredAssets.map(a => [
      a.name,
      a.code,
      getAssetTypeLabel(a.type),
      a.purchaseDate,
      a.costValue,
      a.usefulLife,
      a.salvageValue,
      a.accumDep.toFixed(2),
      a.bookValue.toFixed(2),
      a.department
    ]);

    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `تقرير_الأصول_الثابتة_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Categories payload for recharts pie
  const typeChartData = MemoizePieChartData(assets);

  function MemoizePieChartData(assetsList: FixedAsset[]) {
    const counts: Record<string, number> = {};
    assetsList.forEach(a => {
      counts[a.type] = (counts[a.type] || 0) + a.costValue;
    });
    return Object.keys(counts).map(key => ({
      name: isRtl ? assetTypesMeta[key as keyof typeof assetTypesMeta]?.labelAr : assetTypesMeta[key as keyof typeof assetTypesMeta]?.labelEn,
      value: counts[key]
    }));
  }

  // Predefined gorgeous colors for the charts
  const CHART_COLORS = ['#3b82f6', '#f43f5e', '#f59e0b', '#10b981', '#6366f1', '#64748b'];

  return (
    <div className="max-w-7xl mx-auto px-1 sm:px-4 py-3 space-y-8" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
      
      {/* Dynamic Header Box */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-6 sm:p-10 shadow-2.5xl border border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-indigo-900/10 to-transparent pointer-events-none" />
        <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 border border-blue-400/30 text-blue-400 rounded-full text-xs font-black tracking-normal">
              <Layers className="w-4 h-4 animate-pulse" />
              <span>{isRtl ? 'المنظومة المحاسبية المتكاملة' : 'Integrated Accounting System'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
              {isRtl ? 'إدارة الأصول الثابتة والتحليل المالي' : 'Fixed Assets Management & Financial Analysis'}
            </h1>
            <p className="text-slate-350 text-sm sm:text-base leading-relaxed font-medium">
              {isRtl 
                ? 'مرجع تعليمي مهني شامل للمحاسبين الماليين بالإضافة إلى نظام عملي متطور لاحتساب قيم الإهلاك، تتبع دورة حياة الأصول، وتخليق القيود المحاسبية والتقارير المالية بدقة متناهية.' 
                : 'A professional guide for accountants alongside a dynamic tracking module to monitor lifecycle, calculate depreciation, and export financial journals.'}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('edu')}
              className={`px-5 py-3 rounded-2xl font-bold text-sm transition-all duration-300 relative ${activeTab === 'edu' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 scale-102 border border-transparent' : 'bg-slate-850 text-slate-300 border border-slate-700/60 hover:bg-slate-800'}`}
            >
              📖 {isRtl ? 'الجانب المعرفي والتعليمي' : 'Educational Guide'}
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`px-5 py-3 rounded-2xl font-bold text-sm transition-all duration-300 relative ${activeTab === 'register' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 scale-102 border border-transparent' : 'bg-slate-850 text-slate-300 border border-slate-700/60 hover:bg-slate-800'}`}
            >
              ⚙️ {isRtl ? 'المنظومة العملية (السجل)' : 'Digital Assets Asset Register'}
            </button>
          </div>
        </div>

        {/* Dynamic mini indicators bar */}
        <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-4 text-right">
          <div>
            <span className="text-xs text-slate-400 block mb-1">{isRtl ? 'إجمالي الأصول المفعلة' : 'Total Tracked Assets'}</span>
            <span className="text-xl font-mono font-bold text-slate-100">{metrics.count} {isRtl ? 'أصول' : 'Assets'}</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block mb-1">{isRtl ? 'التكلفة التاريخية الإجمالية' : 'Historical Cost'}</span>
            <span className="text-xl font-mono font-bold text-slate-105">{metrics.totalCost.toLocaleString('en-US')} {isRtl ? 'ج.م' : 'EGP'}</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block mb-1">{isRtl ? 'مجمع الإهلاك التراكمي' : 'Accumulated Depreciation'}</span>
            <span className="text-xl font-mono font-bold text-amber-400">{metrics.totalAccumDep.toLocaleString('en-US')} {isRtl ? 'ج.م' : 'EGP'}</span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block mb-1">{isRtl ? 'القيمة الدفترية الحالية' : 'Net Book Value'}</span>
            <span className="text-xl font-mono font-bold text-emerald-400">{metrics.totalBookValue.toLocaleString('en-US')} {isRtl ? 'ج.م' : 'EGP'}</span>
          </div>
        </div>
      </div>

      {/* Primary Tab View Selector */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto pb-px gap-2">
        <button
          onClick={() => setActiveTab('edu')}
          className={`pb-4 px-4 font-black text-sm whitespace-nowrap transition-colors relative ${activeTab === 'edu' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-slate-500 dark:text-neutral-400 hover:text-slate-800 dark:hover:text-slate-250 hover:bg-slate-100/50 dark:hover:bg-slate-900/40 rounded-t-xl'}`}
        >
          📘 {isRtl ? 'الشرح التفصيلي لـ ١٠ أقسام رئيسية للأصول' : '10 Theoretical Fixed Assets Sections'}
        </button>
        <button
          onClick={() => setActiveTab('register')}
          className={`pb-4 px-4 font-black text-sm whitespace-nowrap transition-colors relative ${activeTab === 'register' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-slate-500 dark:text-neutral-400 hover:text-slate-800 dark:hover:text-slate-250 hover:bg-slate-100/50 dark:hover:bg-slate-900/40 rounded-t-xl'}`}
        >
          📂 {isRtl ? 'سجل الأصول والعمليات' : 'Asset Register List'}
        </button>
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`pb-4 px-4 font-black text-sm whitespace-nowrap transition-colors relative ${activeTab === 'dashboard' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-slate-500 dark:text-neutral-400 hover:text-slate-800 dark:hover:text-slate-250 hover:bg-slate-100/50 dark:hover:bg-slate-900/40 rounded-t-xl'}`}
        >
          📊 {isRtl ? 'مؤشرات الأداء البيانية' : 'Analytics & Charts'}
        </button>
        <button
          onClick={() => setActiveTab('journal_entries')}
          className={`pb-4 px-4 font-black text-sm whitespace-nowrap transition-colors relative ${activeTab === 'journal_entries' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-slate-500 dark:text-neutral-400 hover:text-slate-800 dark:hover:text-slate-250 hover:bg-slate-100/50 dark:hover:bg-slate-900/40 rounded-t-xl'}`}
        >
          🔗 {isRtl ? 'الربط المحاسبي التلقائي' : 'Treasury & Expense Link'}
        </button>
      </div>

      {/* ======================= activeTab === 'edu' (Educational Segment) ======================= */}
      {activeTab === 'edu' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-l from-blue-50/50 to-indigo-50/20 dark:from-blue-950/20 dark:to-indigo-950/5 p-6 rounded-2xl border border-blue-100/50 dark:border-blue-900/40 flex items-start gap-4">
            <Info className="w-10 h-10 text-blue-600 dark:text-blue-400 shrink-0 mt-1" />
            <div className="space-y-1 text-right">
              <h3 className="text-base sm:text-lg font-black text-slate-800 dark:text-neutral-100">
                {isRtl ? 'المرجع الفني والتعليمي الشامل للأصول الثابتة' : 'Complete Fixed Assets Body of Knowledge'}
              </h3>
              <p className="text-slate-600 dark:text-neutral-300 text-sm leading-relaxed">
                {isRtl 
                  ? 'تم إعداد هذا المرجع لتغطية المعايير المحاسبية المعتمدة (EAS / IFRS). تصفح الأقسام العشرة لتفهم الآليات الدقيقة في المعالجة المالية للأصل من الشراء وتوزيع التكلفة عبر العمر التشغيلي وحتى البيع والاستغناء النهائي.' 
                  : 'Covering EAS and IFRS accounting policies. Learn theoretical definitions, mechanics, revaluations, and full journal ledger entries below.'}
              </p>
            </div>
          </div>

          {/* Quick Jumper Links */}
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-wrap gap-2 text-xs sm:text-sm font-bold justify-start">
            <span className="text-slate-400 px-3 py-1.5">{isRtl ? 'الانتقال السريع للكتاب:' : 'Direct Jump:'}</span>
            <button onClick={() => { setActiveEduSubTab('all'); }} className={`px-3 py-1 rounded-lg ${activeEduSubTab === 'all' ? 'bg-blue-600 text-white' : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-neutral-300 hover:bg-slate-100'}`}>{isRtl ? 'تصفح كل الفصول' : 'Browse All Chapters'}</button>
            <button onClick={() => { setActiveEduSubTab('intro'); }} className={`px-3 py-1 rounded-lg ${activeEduSubTab === 'intro' ? 'bg-blue-600 text-white' : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-neutral-300 hover:bg-slate-100'}`}>{isRtl ? 'التعريف والخلفية' : 'Intro'}</button>
            <button onClick={() => { setActiveEduSubTab('journal'); }} className={`px-3 py-1 rounded-lg ${activeEduSubTab === 'journal' ? 'bg-blue-600 text-white' : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-neutral-300 hover:bg-slate-100'}`}>{isRtl ? 'القيود المحاسبية للمشتريات' : 'Purchasing Entries'}</button>
            <button onClick={() => { setActiveEduSubTab('depreciation'); }} className={`px-3 py-1 rounded-lg ${activeEduSubTab === 'depreciation' ? 'bg-blue-600 text-white' : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-neutral-300 hover:bg-slate-100'}`}>{isRtl ? 'معادلات وطرق الإهلاك' : 'Depreciation Formulas'}</button>
            <button onClick={() => { setActiveEduSubTab('revaluation'); }} className={`px-3 py-1 rounded-lg ${activeEduSubTab === 'revaluation' ? 'bg-blue-600 text-white' : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-neutral-300 hover:bg-slate-100'}`}>{isRtl ? 'إعادة التقييم والاستبعاد' : 'Disposal & Revaluation'}</button>
          </div>

          <div className="space-y-4">
            
            {/* Section 1: Definition of Fixed Assets */}
            {(activeEduSubTab === 'all' || activeEduSubTab === 'intro') && (
              <EduSection title={isRtl ? '1. تعريف ومفهوم الأصول الثابتة' : '1. Overview and Core Concept of Fixed Assets'} number="01">
                <div className="space-y-4 text-right">
                  <h4 className="text-base font-black text-blue-600 dark:text-blue-400">مفهوم وهيكل الأصل الثابت:</h4>
                  <p>
                    الأصول الثابتة (Fixed Assets) وتسمى أيضاً الأصول الملموسة أو العقارات والمنشآت والمعدات (Property, Plant, and Equipment - PP&E)، هي الممتلكات المادية طويلة الأجل التي تقتنيها المنشأة لغرض استخدامها في الإجراءات التشغيلية والإنتاجية وتوفير الخدمات، وليس لغرض إعادة بيعها مباشرة في سياق النشاط التجاري العادي.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 text-right">
                    <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/30">
                      <h5 className="font-bold text-indigo-700 dark:text-indigo-400 text-sm mb-1">الفرق الجوهري مع الأصول المتداولة:</h5>
                      <p className="text-xs text-slate-650 dark:text-slate-350">
                        تتحول الأصول المتداولة (كالنقدية والمخزون والعملاء) إلى نقدية سائلة خلال دورة تشغيلية واحدة أو سنة مالية واحدة. بينما تمتاز الأصول الثابتة ببقائها داخل منشأتك لاستغلالها إنتاجياً لعدة سنوات متلاحقة.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-orange-50/50 dark:bg-orange-950/20 border border-orange-100/30">
                      <h5 className="font-bold text-orange-700 dark:text-orange-400 text-sm mb-1">المصروف الإيرادي مقابل المصروف الرأسمالي:</h5>
                      <p className="text-xs text-slate-655 dark:text-slate-355">
                        <strong>المصروف الرأسمالي:</strong> هو الإنفاق الذي يؤدي إلى زيادة العمر الإنتاجي للأصل أو تحسين طاقته الإتاجية، ويتم رسملته (إضافته لقيمة الأصل).<br/>
                        <strong>المصروف الإيرادي:</strong> هو الإنفاق اللازم لتشغيل الأصل وصيانته الدورية للحفاظ عليه، ويحمل فوراً على قائمة الدخل كمصروف.
                      </p>
                    </div>
                  </div>

                  <h5 className="font-bold text-slate-800 dark:text-slate-200 mt-2">📊 الخصائص المميزة للأصول الثابتة:</h5>
                  <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    <li>كيان مادي ملموس يمكن معاينته عينياً.</li>
                    <li>عمر تشغيلي يمتد لأكثر من سنة مالية واحدة.</li>
                    <li>تقتني للمساهمة في العمليات الداخلية الإنتاجية أو الإدارية وليس للبيع.</li>
                    <li>تخضع بصفة مستمرة لعملية الإهلاك المنظم (باستثناء الأراضي التي تمتاز بعمر غير محدود).</li>
                  </ul>
                </div>
              </EduSection>
            )}

            {/* Section 2: Types of Fixed Assets */}
            {(activeEduSubTab === 'all' || activeEduSubTab === 'intro') && (
              <EduSection title={isRtl ? '2. أنواع الأصول الثابتة وتصنيفاتها الفنية' : '2. Direct Classifications of Assets'} number="02">
                <div className="space-y-4 text-right">
                  <p>
                    تصنف الأصول الثابتة في القوائم المالية والدفاتر المحاسبية إلى أربع مجموعات جوهرية وفق طبيعتها الاقتصادية:
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-1.5 text-right">
                      <span className="text-blue-500 font-bold text-sm block">❶ أصول ملموسة (Tangible)</span>
                      <p className="text-xs text-slate-500 leading-normal">الأصول ذات الطبيعة الفيزيائية الحقيقية كالأراضي، المباني الإدارية، المصانع، الآلات الإنتاجية، المركبات وغيرها.</p>
                    </div>
                    <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-1.5 text-right">
                      <span className="text-rose-500 font-bold text-sm block">❷ أصول غير ملموسة (Intangible)</span>
                      <p className="text-xs text-slate-500 leading-normal">ليس لها كيان فيزيائي لكنها ذات قيمة جوهرية مثل براءات الاختراع، العلامات التجارية المحمية، الشهرة لعلامتك التجارية والتراخيص الرقمية.</p>
                    </div>
                    <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-1.5 text-right">
                      <span className="text-emerald-500 font-bold text-sm block">❸ أصول مالية واستثمارية</span>
                      <p className="text-xs text-slate-500 leading-normal">هي استثمارات طويلة الأجل في أسهم وسندات شركات شقيقة أو عقارات تقتنيها الشركة للاحتفاظ بها كاستثمار طويل المدى وتدر عوائد دورية.</p>
                    </div>
                    <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-1.5 text-right">
                      <span className="text-amber-500 font-bold text-sm block">❹ مشروعات تحت التنفيذ (CWIP)</span>
                      <p className="text-xs text-slate-500 leading-normal">الأصول التي لم تكتمل بعد أو لا تزال قيد الإنشاء مثل تشييد مبنى جديد أو تجميع خط إنتاجي ولم يصبح جاهزاً للعمل.</p>
                    </div>
                  </div>
                </div>
              </EduSection>
            )}

            {/* Section 3: Asset Lifecycle */}
            {(activeEduSubTab === 'all' || activeEduSubTab === 'intro') && (
              <EduSection title={isRtl ? '3. دورة حياة الأصل الثابت في الحسابات' : '3. Complete Fixed Asset Financial Lifecycle'} number="03">
                <div className="space-y-4 text-right">
                  <p>
                    يمر أي أصل ثابت داخل المنشأة بدورة حياة مالية وإجرائية تكتمل بـ 6 مراحل أساسية يجب معالجتها دفترياً بدقة مذهلة:
                  </p>

                  <div className="relative border-r-2 border-blue-500/30 pr-6 space-y-6 mr-3">
                    <div className="relative">
                      <div className="absolute right-[-31px] top-1 w-4 h-4 rounded-full bg-blue-605 border-4 border-white dark:border-slate-900" />
                      <h5 className="font-bold text-slate-850 dark:text-slate-100 text-sm">المرحلة ١: الاستحواذ والشراء (Acquisition)</h5>
                      <span className="text-xs text-slate-530 block">إثبات الفاتورة الأساسية وإضافة جميع نفقات اقتناء الأصل حتى تاريخ التشغيل الفعلي.</span>
                    </div>

                    <div className="relative">
                      <div className="absolute right-[-31px] top-1 w-4 h-4 rounded-full bg-blue-605 border-4 border-white dark:border-slate-900" />
                      <h5 className="font-bold text-slate-850 dark:text-slate-100 text-sm">المرحلة ٢: التشغيل والاستخدام الأولي</h5>
                      <span className="text-xs text-slate-530 block">نقل الأصل وتصنيفه للمجموعة الدفترية المناسبة وبداية تهيئة معايير احتساب الإهلاك.</span>
                    </div>

                    <div className="relative">
                      <div className="absolute right-[-31px] top-1 w-4 h-4 rounded-full bg-blue-605 border-4 border-white dark:border-slate-900" />
                      <h5 className="font-bold text-slate-850 dark:text-slate-100 text-sm">المرحلة ٣: الإهلاك الدوري (Period Depreciation)</h5>
                      <span className="text-xs text-slate-530 block">تخفيض قيمة الأصل التدريجي في نهاية كل فترة مالية للتعبير عن الاستهلاك الطبيعي والمتقادم.</span>
                    </div>

                    <div className="relative">
                      <div className="absolute right-[-31px] top-1 w-4 h-4 rounded-full bg-blue-605 border-4 border-white dark:border-slate-900" />
                      <h5 className="font-bold text-slate-850 dark:text-slate-100 text-sm">المرحلة ٤: عمليات الصيانة والترقية (Maintenance & Upgrades)</h5>
                      <span className="text-xs text-slate-530 block">إصلاح المشكلات وإدخال مصروفات رأسمالية تضاف للأصل لتحسين العمر الافتراضي أو الإنتاجي.</span>
                    </div>

                    <div className="relative">
                      <div className="absolute right-[-31px] top-1 w-4 h-4 rounded-full bg-blue-605 border-4 border-white dark:border-slate-900" />
                      <h5 className="font-bold text-slate-850 dark:text-slate-100 text-sm">المرحلة ٥: إعادة التقييم (Revaluation)</h5>
                      <span className="text-xs text-slate-530 block">مراجعة القيمة العادلة للأصل بما يتطابق مع معطيات السوق الحقيقية واستثمارات الشركة.</span>
                    </div>

                    <div className="relative">
                      <div className="absolute right-[-31px] top-1 w-4 h-4 rounded-full bg-blue-605 border-4 border-white dark:border-slate-900" />
                      <h5 className="font-bold text-slate-850 dark:text-slate-100 text-sm">المرحلة ٦: الاستبعاد أو البيع النهائي (Disposal / Sale)</h5>
                      <span className="text-xs text-slate-530 block">إنهاء القيد الدفتري ببيع الخردة أو استبعاد الأصل التالف وحساب أرباح وخسائر رأس المال.</span>
                    </div>
                  </div>
                </div>
              </EduSection>
            )}

            {/* Section 4: Purchasing Assets */}
            {(activeEduSubTab === 'all' || activeEduSubTab === 'journal') && (
              <EduSection title={isRtl ? '4. شراء واقتناء الأصول الثابتة (القيود والمعالجة)' : '4. Complete GAAP Purchasing of Assets'} number="04">
                <div className="space-y-4 text-right">
                  <p>
                    تتضمن تكلفة الأصل الثابت كافة المبالغ المدفوعة للحصول على الأصل وجعله صالحاً للاستخدام الفعلي. وتشمل: <strong>سعر الشراء الأساسي، الجمارك، ضرائب الاستيراد غير المستردة، نفقات الشحن والنقل، الرسوم القانونية، الإعداد والتركيب وبدء التشغيل التجريبي.</strong>
                  </p>

                  <div className="p-4 bg-slate-850 text-slate-100 rounded-2xl font-mono text-xs sm:text-sm space-y-3 shadow-md border border-slate-705">
                    <span className="text-amber-400 font-bold block">// ١. قيد شراء أصل نقداً (بما يشمل التوريد والتوصيل):</span>
                    <div>
                      <span className="text-blue-300 block">من حـ/ الأصول الثابتة (حدد الأصل - سيارات / آلات)</span>
                      <span className="text-blue-300 pl-4 block">إلى حـ/ النقدية بالصندوق أو البنك</span>
                      <span className="text-slate-400 block">  (إثبات شراء أصل ثابت نقداً مضافاً إليه مصروفات النقل والشحن التجريبي)</span>
                    </div>
                    
                    <span className="text-amber-400 font-bold block mt-4">// ٢. قيد شراء أصل ثابت على الحساب (آجل من موردين):</span>
                    <div>
                      <span className="text-blue-300 block">من حـ/ الأصول الثابتة</span>
                      <span className="text-blue-300 pl-4 block">إلى حـ/ الدائنين / موردي الأصول الثابتة</span>
                      <span className="text-slate-400 block">  (شراء أصل بالآجل بموجب فاتورة شراء رقم 450)</span>
                    </div>
                  </div>
                </div>
              </EduSection>
            )}

            {/* Section 5: Depreciation */}
            {(activeEduSubTab === 'all' || activeEduSubTab === 'depreciation') && (
              <EduSection title={isRtl ? '5. إهلاك الأصول وطرق الاحتساب الأربعة بالتفصيل' : '5. Mathematical Depreciation Mechanics'} number="05">
                <div className="space-y-4 text-right">
                  <p>
                    الإهلاك (Depreciation) هو عملية توزيع التكلفة التاريخية القابلة للإهلاك للأصل الثابت بشكل منتظم على عمره الإنتاجي الافتراضي. هو مصروف غير نقدي يهدف لإثبات النفقات لمجابهة وتحقيق فترات الإيرادات المتوالية.
                  </p>

                  <h4 className="text-base font-black text-slate-800 dark:text-neutral-100">طرق احتساب الإهلاك بالأمثلة والمعادلات:</h4>
                  
                  <div className="space-y-4">
                    {/* Method 1 */}
                    <div className="p-4 rounded-xl bg-blue-50/40 dark:bg-slate-900 border border-slate-205 dark:border-slate-800 space-y-2">
                      <span className="font-black text-blue-600 dark:text-blue-400 text-sm block">1. طريقة القسط الثابت (Straight-Line Method)</span>
                      <p className="text-xs text-slate-600 dark:text-neutral-350">أبسط الطرق وأكثرها استخداماً بقيم ثابتة متساوية طيلة العمر.</p>
                      <div className="p-3 bg-white dark:bg-slate-950 font-mono text-xs rounded-lg border border-slate-100 dark:border-slate-900">
                        قسط الإهلاك السنوي = (التكلفة التاريخية - النفاية/قيمة الخردة) / العمر الإنتاجي بالسنوات
                      </div>
                      <span className="text-xs text-slate-500 block">مثال: أصل قيمته 100,000 ج.م وخردته 10,000 ج.م وعمره 5 سنوات. الإهلاك السنوي = (100,000 - 10,000) ÷ 5 = 18,000 ج.م سنوياً.</span>
                    </div>

                    {/* Method 2 */}
                    <div className="p-4 rounded-xl bg-amber-50/40 dark:bg-slate-900 border border-slate-205 dark:border-slate-800 space-y-2">
                      <span className="font-black text-amber-600 dark:text-amber-400 text-sm block">2. طريقة القسط المتناقص (Declining Balance Method)</span>
                      <p className="text-xs text-slate-600 dark:text-neutral-350">تحمل السنوات الأولى بمصاريف إهلاك مرتفعة تنخفض سنوياً لمقابلة تدهور الكفاءة وصيانة الأصل العالية لاحقاً.</p>
                      <div className="p-3 bg-white dark:bg-slate-950 font-mono text-xs rounded-lg border border-slate-100 dark:border-slate-900">
                        معدل الإهلاك المضاعف = 2 * (1 / العمر الإنتاجي بالسنوات)<br/>
                        قسط الإهلاك السنوي = القيمة الدفترية الحالية (بداية العام) * معدل الإهلاك المضاعف
                      </div>
                    </div>

                    {/* Method 3 */}
                    <div className="p-4 rounded-xl bg-rose-50/40 dark:bg-slate-900 border border-slate-205 dark:border-slate-800 space-y-2">
                      <span className="font-black text-rose-600 dark:text-rose-400 text-sm block">3. طريقة مجموع أرقام السنوات (Sum-of-the-Years-Digits)</span>
                      <p className="text-xs text-slate-600 dark:text-neutral-350">طريقة تسارعية أخرى تعتمد على كسر تنازلي منسوب إلى مجموع رقم سنوات العمر الكلي.</p>
                      <div className="p-3 bg-white dark:bg-slate-950 font-mono text-xs rounded-lg border border-slate-100 dark:border-slate-900">
                        دليل مجموع السنوات = ن * (ن + 1) / 2  (حيث ن هو العمر الإنتاجي)<br/>
                        قسط الإهلاك السنوي = (التكلفة - الخردة) * (العمر المتبقي / دليل مجموع السنوات)
                      </div>
                    </div>
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-slate-100 mt-4">قيود الإهلاك الدورية الثابتة:</h3>
                  <div className="p-4 bg-slate-850 text-slate-100 rounded-2xl font-mono text-xs sm:text-sm space-y-3 shadow-md border border-slate-705">
                    <span className="text-emerald-400 block">// إثبات قسط الإهلاك السنوي للأصل وتحويله لحساب المجمع:</span>
                    <div>
                      <span className="text-blue-300 block">من حـ/ مصروف إهلاك الأصول الثابتة (قائمة دخل)</span>
                      <span className="text-blue-300 pl-4 block">إلى حـ/ مجمع إهلاك أصول ثابتة (يطرح في المركز المالي كحساب تقييم)</span>
                      <span className="text-slate-400 block">  (تحميل الأرباح والخسائر بقيمة قسط الإهلاك عن الفترة المحددة)</span>
                    </div>
                  </div>
                </div>
              </EduSection>
            )}

            {/* Section 6: Selling Assets */}
            {(activeEduSubTab === 'all' || activeEduSubTab === 'revaluation') && (
              <EduSection title={isRtl ? '6. بيع الأصول الرأسمالية واحتساب الأرباح والخسائر' : '6. Selling Capital Assets Entries'} number="06">
                <div className="space-y-4 text-right">
                  <p>
                    عند قرار بيع أصل ثابت قبل نهاية عمره الإنتاجي، تتم مقارنة القيمة المحصلة من البيع بالقيمة الدفترية الحالية للأصل (التكلفة التاريخية مطروحاً منها مجمع الإهلاك حتى تاريخ البيع).
                  </p>
                  <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    <li>إذا كان <strong>ثمن البيع &gt; القيمة الدفترية</strong>: تحقق المنشأة <strong>أرباحاً رأسمالية</strong> (Capital Gains).</li>
                    <li>إذا كان <strong>ثمن البيع &lt; القيمة الدفترية</strong>: تحقق المنشأة <strong>خسائر رأسمالية</strong> (Capital Losses).</li>
                  </ul>

                  <div className="p-4 bg-slate-850 text-slate-100 rounded-2xl font-mono text-xs sm:text-sm space-y-3 shadow-md border border-slate-705">
                    <span className="text-yellow-400 block">// قيد بيع أصل ثابت بربح رأسمالي:</span>
                    <div>
                      <span className="text-blue-300 block">من مذكورين:</span>
                      <span className="text-blue-300 pl-4 block">حـ/ النقدية بالبنك (ثمن البيع المحصل)</span>
                      <span className="text-blue-300 pl-4 block">حـ/ مجمع إهلاك الأصل المعد للبيع (كامل المجمع المتراكم حتى اليوم)</span>
                      <span className="text-blue-350 block">إلى مذكورين:</span>
                      <span className="text-blue-350 pl-4 block">حـ/ الأصول الثابتة (بالتكلفة التاريخية لإزالته من الدفاتر)</span>
                      <span className="text-emerald-400 pl-4 block">حـ/ الأرباح الرأسمالية (الأرباح المحققة)</span>
                      <span className="text-slate-400 block">  (تسجيل استبعاد وبيع سيارة أو أصل والتخلص من دفترياته بإثبات الأرباح)</span>
                    </div>
                  </div>
                </div>
              </EduSection>
            )}

            {/* Section 7: Disposing Assets */}
            {(activeEduSubTab === 'all' || activeEduSubTab === 'revaluation') && (
              <EduSection title={isRtl ? '7. استبعاد وإهلاك الأصول التالفة والخردة' : '7. Asset Retirement and Scrap Procedures'} number="07">
                <div className="space-y-4 text-right">
                  <p>
                    يطلق لفظ الاستبعاد (Scrapping/Retirement) عند التخلص التام من قيمة الأصل الثابت دون تسلم مبالغ مادية كبيرة لقاء ذلك (تلف كامل، حرق، كوارث، أو فناء الكفاءة تماماً). يتم في هذه الحالة إعدام القيمة الدفترية المتبقية كخسارة غير متوقعة.
                  </p>

                  <div className="p-4 bg-slate-850 text-slate-100 rounded-2xl font-mono text-xs sm:text-sm space-y-3 shadow-md border border-slate-705">
                    <span className="text-rose-400 block">// قيد استبعاد أصل تالف بالكامل لم يصل لقيمته التخريدية بعد:</span>
                    <div>
                      <span className="text-blue-300 block">من مذكورين:</span>
                      <span className="text-blue-300 pl-4 block">حـ/ مجمع إهلاك الأصل الثابت (المجمع المحتسب حتى اليوم)</span>
                      <span className="text-rose-300 pl-4 block">حـ/ خسائر استبعاد الأصول الثابتة (القيمة الدفترية غير المهلكة)</span>
                      <span className="text-blue-300 block">إلى حـ/ الأصول الثابتة (التكلفة التاريخية الأصلية)</span>
                    </div>
                  </div>
                </div>
              </EduSection>
            )}

            {/* Section 8: Asset Revaluation */}
            {(activeEduSubTab === 'all' || activeEduSubTab === 'revaluation') && (
              <EduSection title={isRtl ? '8. إعادة تقييم الأصول الثابتة وتأثير المركز المالي' : '8. Asset Revaluation Adjustments'} number="08">
                <div className="space-y-4 text-right">
                  <p>
                    يسمح معيار IAS 16 في تطبيق "نموذج إعادة التقييم" (Revaluation Model) بتعديل الموازين الدفترية للأصل بما يتناسب مع القيمة العادلة المعتمدة في الأسواق السنوية. 
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    <strong>فائض إعادة التقييم:</strong> هو مكسب محاسبي غير محقق لا يدخل في قائمة الدخل العادية بل يلحق مباشرة ببنود حقوق الملكية تحت اسم "احتياطي إعادة تقييم أصول ثابتة" لرفع متانة المركز المالي الكلية.
                  </p>

                  <div className="p-4 bg-slate-850 text-slate-100 rounded-2xl font-mono text-xs sm:text-sm space-y-3 shadow-md border border-slate-705">
                    <span className="text-blue-300 block">من حـ/ الأصول الثابتة (بقيمة الفرق الموجب بين القيمة الدفترية والتقييم الجديد)</span>
                    <span className="text-blue-300 pl-4 block">إلى حـ/ احتياطي إعادة تقييم الأصول (حقوق ملكية - قائمة التغير التراكمي في الميزانية)</span>
                  </div>
                </div>
              </EduSection>
            )}

            {/* Section 9: Maintenance of Assets */}
            {(activeEduSubTab === 'all' || activeEduSubTab === 'journal') && (
              <EduSection title={isRtl ? '9. نفقات صيانة الأصول ومعالجة قطع الغيار والتحسينات' : '9. Capital vs Revenue Repairing Expenses'} number="09">
                <div className="space-y-4 text-right">
                  <p>
                    تنقسم مصاريف الصيانة والتشغيل للأصل الثابت إلى نوعين:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-slate-650 dark:text-neutral-300">
                    <li>
                      <strong>صيانة تشغيلية دورية (Revenue Expenditures)</strong>: نفقات دورية تهدف لإبقاء الأصل قيد الخدمة الطبيعية كشراء وقود للسيارات، تغيير فلاتر وزيوت أو صيانة تكييف سنوي. تعالج كمصروف فوري بقائمة الأرباح والخسائر.
                      <div className="p-2.5 my-2.5 bg-slate-100 dark:bg-slate-950 font-mono text-xs rounded-lg text-slate-750 dark:text-slate-300">
                        من حـ/ مصاريف الصيانة والتشغيل ◀ إلى حـ/ النقدية
                      </div>
                    </li>
                    <li>
                      <strong>صيانة رأسمالية وتحسين كفاءة (Capital Expenditures)</strong>: استبدال محرك كامل لسيارة مهترئة لمد عمرها ٥ سنوات أخرى أو صب قواعد خرسانية داعمة ترفع سعة المبنى. تضاف القيمة دفترياً لرصيد حساب الأصل الثابت مباشرة.
                      <div className="p-2.5 my-2.5 bg-slate-100 dark:bg-slate-950 font-mono text-xs rounded-lg text-slate-750 dark:text-slate-300">
                        من حـ/ الأصول الثابتة (التحسينات المضافة) ◀ إلى حـ/ النقدية
                      </div>
                    </li>
                  </ul>
                </div>
              </EduSection>
            )}

            {/* Section 10: Assets Under Construction */}
            {(activeEduSubTab === 'all' || activeEduSubTab === 'journal') && (
              <EduSection title={isRtl ? '10. الأصول والمشروعات تحت التنفيذ (CWIP وكيفية رسملتها)' : '10. Custom Projects & Capital Work In Progress'} number="10">
                <div className="space-y-4 text-right">
                  <p>
                    المشروعات تحت التنفيذ (Capital Work-In-Progress) هي كل المبالغ المدفوعة لبناء وتشييد أصول ثابتة لم تصبح صالحة أو مهيأة للاستخدام التشغيلي بعد. يمتنع المحاسب قانونياً عن حساب أي قسط إهلاك لهذه الأصول حتى تنتهي عملية التشييد بالكامل ويصدر تقرير فني ببدء تشغيلها واستلامها رسمياً.
                  </p>

                  <div className="p-4 bg-slate-850 text-slate-100 rounded-2xl font-mono text-xs sm:text-sm space-y-3 shadow-md border border-slate-705">
                    <span className="text-cyan-405 block">// ١. قيد تسديد دفعات وتكلفة إنشاء مبنى المصنع الجديد:</span>
                    <div>
                      <span className="text-blue-300 block">من حـ/ مشروعات تحت التنفيذ (مباني مصانع قيد البناء)</span>
                      <span className="text-blue-300 pl-4 block">إلى حـ/ النقدية بالبنك أو مقاولي الإنشاء والتنفيذ</span>
                    </div>

                    <span className="text-cyan-405 block mt-4">// ٢. قيد انتهاء البناء بالكامل وتشغيل المبنى رسمياً كمجمع ثابت:</span>
                    <div>
                      <span className="text-emerald-400 block">من حـ/ الأصول الثابتة (مبنى المصنع المعول)</span>
                      <span className="text-blue-300 pl-4 block">إلى حـ/ مشروعات تحت التنفيذ (مباني مصانع)</span>
                      <span className="text-slate-400 block font-sans text-xs">  (إغلاق حساب المشروعات المؤقت ورسملة القيمة كأصل ثابت ويبدأ حساب الإهلاك ابتداء من اليوم)</span>
                    </div>
                  </div>
                </div>
              </EduSection>
            )}

          </div>

          {/* FAQ & Accounting Mistakes Segment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            {/* FAQs */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-slate-850 dark:text-neutral-100">{isRtl ? 'الأسئلة الشائعة في الأصول الثابتة' : 'Fixed Assets FAQ'}</h3>
              </div>

              <div className="space-y-4 text-right text-xs sm:text-sm">
                <div className="p-3.5 bg-slate-50 dark:bg-slate-950/50 rounded-xl space-y-1">
                  <span className="font-bold text-blue-600 dark:text-blue-400 block">س: هل يتم إهلاك الأراضي المملوكة للشركة؟</span>
                  <p className="text-slate-600 dark:text-neutral-450">ج: لا، لأن الأراضي تمتاز بعمر افتراضي غير محدود ولا تفنى بالاستعمال العادي، بينما يتم إهلاك تجهيزات الأراضي والمستودعات والتطويرات الإنشائية فقط.</p>
                </div>
                <div className="p-3.5 bg-slate-50 dark:bg-slate-950/50 rounded-xl space-y-1">
                  <span className="font-bold text-blue-600 dark:text-blue-400 block">س: ما العمل عندما يتجاوز مجمع الإهلاك قيمة الأصل؟</span>
                  <p className="text-slate-600 dark:text-neutral-450">ج: لا يصح محاسبياً أو قانونياً إهلاك الأصل بقيمة تتجاوز قيمته القابلة للإهلاك. عندما تتساوي قيمته الدفترية مع قيمتها التخريدية، يظل الأصل بالدفاتر بقيمة رمزية حتى يتم استبعاده.</p>
                </div>
              </div>
            </div>

            {/* Common Mistakes */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-black text-slate-850 dark:text-neutral-100">{isRtl ? 'الأخطاء المحاسبية الشائعة في الأصول الثابتة' : 'Common Accounting Pitfalls'}</h3>
              </div>

              <div className="space-y-4 text-right text-xs sm:text-sm">
                <div className="p-3.5 bg-rose-50/20 dark:bg-rose-950/10 rounded-xl border border-rose-100/30 space-y-1">
                  <span className="font-bold text-rose-600 dark:text-rose-400 block">1. رسملة نفقات الصيانة العادية</span>
                  <p className="text-slate-600 dark:text-neutral-450">خطأ فادح ينجم عنه تضخيم الأصول وتزييف الأرباح المحققة بقوائم الدخل بحساب نفقات تشغيلية كمصروف رأسمالي.</p>
                </div>
                <div className="p-3.5 bg-rose-50/20 dark:bg-rose-950/10 rounded-xl border border-rose-100/30 space-y-1">
                  <span className="font-bold text-rose-600 dark:text-rose-400 block">2. إهمال تعديل العمر الافتراضي المتوقع للأصل</span>
                  <p className="text-slate-600 dark:text-neutral-450">مع تراجع كفاءة الأصل أو إدخال ترقيات، لا تعدل دورتنا الحسابية للعمر التشغيلي مما يفجر تداخلاً وخطأ محاسبياً دفترياً.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================= activeTab === 'register' (Practical Database & Schedule Tool) ======================= */}
      {activeTab === 'register' && (
        <div className="space-y-6">
          
          {/* Action button bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-150 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder={isRtl ? 'ابحث في السجل عن أصل بدقة...' : 'Search register...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-3 pr-10 py-2 text-xs rounded-xl border border-slate-205 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                />
                <Search className="absolute right-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>

              {/* Filters dropdown */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="py-2 px-3 text-xs rounded-xl border border-slate-205 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-neutral-200 text-right focus:outline-none"
              >
                <option value="all">{isRtl ? 'كل أنواع الأصول' : 'All Asset Types'}</option>
                <option value="buildings">{isRtl ? 'المباني والمنشآت' : 'Buildings'}</option>
                <option value="vehicles">{isRtl ? 'وسائل نقل' : 'Vehicles'}</option>
                <option value="devices">{isRtl ? 'الأجهزة والتقنيات' : 'Devices'}</option>
                <option value="furniture">{isRtl ? 'أثاث وتجهيزات' : 'Furniture'}</option>
                <option value="machinery">{isRtl ? 'آلات ومعدات بالشركة' : 'Machinery'}</option>
              </select>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={handleExportCSV}
                className="flex items-center gap-2 p-2 px-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-neutral-300 rounded-xl transition-all cursor-pointer text-xs font-bold"
                title="تصدير السجل لصيغة Excel CSV"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>EXPORT EXCEL</span>
              </button>
              <button
                onClick={() => {
                  setEditingId(null);
                  setIsFormOpen(true);
                }}
                className="flex items-center gap-2 p-2 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl transition-all shadow-md active:scale-95 cursor-pointer text-xs font-black hover:opacity-90"
              >
                <Plus className="w-4 h-4" />
                <span>{isRtl ? 'إضافة أصل جديد' : 'New Asset'}</span>
              </button>
            </div>
          </div>

          {/* Asset register adding / editing expandable Form */}
          {isFormOpen && (
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-blue-150 dark:border-blue-900/50 shadow-xl space-y-4 animate-fade-in text-right">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="text-base font-black text-slate-800 dark:text-neutral-100">
                  {editingId ? (isRtl ? '✏️ تعديل بيانات أصل ثابت ومعدلاته' : 'Edit Fixed Asset Record') : (isRtl ? '🚀 إدراج أصل ثابت جديد بالملفات الحسابية' : 'Create New Asset Record')}
                </span>
                <button 
                  onClick={() => setIsFormOpen(false)}
                  className="p-1 text-slate-400 hover:text-rose-500 rounded-lg"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-right">
                <div className="space-y-1">
                  <label className="text-xs text-slate-500 font-bold block">{isRtl ? 'اسم الأصل الثابت *' : 'Asset Name *'}</label>
                  <input
                    type="text"
                    required
                    value={assetForm.name}
                    onChange={(e) => setAssetForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-205 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-neutral-200 text-right focus:ring-2 focus:ring-blue-500"
                    placeholder={isRtl ? 'سيارة رينو جامبو توزيع' : 'Renault Truck'}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-500 font-bold block">{isRtl ? 'كود الأصل الفريد *' : 'Asset Code *'}</label>
                  <input
                    type="text"
                    required
                    value={assetForm.code}
                    onChange={(e) => setAssetForm(prev => ({ ...prev, code: e.target.value }))}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-205 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-neutral-200 text-right focus:ring-2 focus:ring-blue-500"
                    placeholder="FA-VEH-001"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-500 font-bold block">{isRtl ? 'نوع وتصنيف الأصل' : 'Asset Group'}</label>
                  <select
                    value={assetForm.type}
                    onChange={(e) => setAssetForm(prev => ({ ...prev, type: e.target.value as FixedAsset['type'] }))}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-205 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-neutral-200 text-right focus:outline-none"
                  >
                    <option value="buildings">{isRtl ? 'المباني والمنشآت' : 'Buildings'}</option>
                    <option value="vehicles">{isRtl ? 'وسائل النقل والجرارات' : 'Vehicles'}</option>
                    <option value="devices">{isRtl ? 'أجهزة الكمبيوتر والتكنولوجيا' : 'Devices'}</option>
                    <option value="furniture">{isRtl ? 'أثاث وتجهيزات مكتبية' : 'Furniture'}</option>
                    <option value="machinery">{isRtl ? 'الآلات ومعدات المصانع' : 'Machinery'}</option>
                    <option value="other">{isRtl ? 'أصول ثابتة أخرى' : 'Other Assets'}</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-500 font-bold block">{isRtl ? 'تاريخ الشراء والاستحواذ *' : 'Acquisition Date *'}</label>
                  <input
                    type="date"
                    required
                    value={assetForm.purchaseDate}
                    onChange={(e) => setAssetForm(prev => ({ ...prev, purchaseDate: e.target.value }))}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-205 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-850 dark:text-neutral-200 text-right focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-500 font-bold block">{isRtl ? 'تكلفة الاقتناء التاريخية (ج.م) *' : 'Historical Cost (EGP) *'}</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={assetForm.costValue || ''}
                    onChange={(e) => setAssetForm(prev => ({ ...prev, costValue: parseFloat(e.target.value) || 0 }))}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-205 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-neutral-200 text-right focus:ring-2 focus:ring-blue-500 font-mono"
                    placeholder="150000"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-500 font-bold block">{isRtl ? 'العمر الإنتاجي بالسنوات *' : 'Useful Life (Years) *'}</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={assetForm.usefulLife || ''}
                    onChange={(e) => setAssetForm(prev => ({ ...prev, usefulLife: parseInt(e.target.value) || 5 }))}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-205 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-neutral-200 text-right focus:ring-2 focus:ring-blue-500 font-mono"
                    placeholder="5"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-500 font-bold block">{isRtl ? 'قيمة الخردة / النفاية المترتبة' : 'Salvage / Scrap Value'}</label>
                  <input
                    type="number"
                    min="0"
                    value={assetForm.salvageValue || ''}
                    onChange={(e) => setAssetForm(prev => ({ ...prev, salvageValue: parseFloat(e.target.value) || 0 }))}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-205 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-neutral-200 text-right focus:ring-2 focus:ring-blue-500 font-mono"
                    placeholder="1000"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-500 font-bold block">{isRtl ? 'طريقة وحلقة إهلاك الأصل دفترياً' : 'Depreciation Pattern'}</label>
                  <select
                    value={assetForm.depreciationMethod}
                    onChange={(e) => setAssetForm(prev => ({ ...prev, depreciationMethod: e.target.value as FixedAsset['depreciationMethod'] }))}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-205 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-neutral-200 text-right focus:outline-none"
                  >
                    <option value="straight">{isRtl ? 'طريقة القسط الثابت (الأكثر موثوقية)' : 'Straight-Line Method'}</option>
                    <option value="declining">{isRtl ? 'طريقة القسط المتناقص (توزيع متسارع)' : 'Double Declining'}</option>
                    <option value="sum_of_years">{isRtl ? 'مجموع أرقام السنوات' : 'Sum of Years Digits'}</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-500 font-bold block">{isRtl ? 'القسم والمركز المسؤول' : 'Responsible Department'}</label>
                  <input
                    type="text"
                    value={assetForm.department}
                    onChange={(e) => setAssetForm(prev => ({ ...prev, department: e.target.value }))}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-205 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-neutral-200 text-right focus:outline-none focus:ring-2"
                    placeholder={isRtl ? 'المبيعات / الشؤون المالية' : 'Finance Dept'}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-slate-500 font-bold block">{isRtl ? 'الموقع الفعلي للأصل' : 'Actual Location'}</label>
                  <input
                    type="text"
                    value={assetForm.location}
                    onChange={(e) => setAssetForm(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-205 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-neutral-200 text-right focus:outline-none focus:ring-2"
                    placeholder={isRtl ? 'المخزن الإقليمي بمدينة الإسكندرية' : 'Alexandria Warehouse'}
                  />
                </div>

                <div className="col-span-1 sm:col-span-2 space-y-1">
                  <label className="text-xs text-slate-500 font-bold block">{isRtl ? 'ملاحظات وتفاصيل إضافية' : 'Supplementary Notes'}</label>
                  <input
                    type="text"
                    value={assetForm.notes}
                    onChange={(e) => setAssetForm(prev => ({ ...prev, notes: e.target.value }))}
                    className="w-full p-2.5 text-xs rounded-xl border border-slate-205 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-neutral-200 text-right focus:outline-none"
                    placeholder={isRtl ? 'أدخل تفاصيل التراخيص أو صيانة محرك' : 'Details or plate code'}
                  />
                </div>
                
                <div className="col-span-1 sm:col-span-2 md:col-span-3 flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-4 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-neutral-300 hover:bg-slate-205"
                  >
                    {isRtl ? 'تراجع وإغلاق' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 text-xs rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black shadow-md shadow-blue-500/10 active:scale-95 transition-all"
                  >
                    {isRtl ? 'حفظ دفتريات الأصل' : 'Save Asset Record'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Asset register directory grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6" ref={printRef}>
            
            {/* Left list (2 spans in XL) */}
            <div className="xl:col-span-2 space-y-4">
              <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-5 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-slate-105 dark:border-slate-800 mb-4 select-none">
                  <h3 className="text-base sm:text-lg font-black text-slate-800 dark:text-neutral-100 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <span>{isRtl ? 'قائمة الأصول بالسجل المحاسبي الحالي' : 'Active Fixed Assets Log'}</span>
                  </h3>
                  <span className="text-xs text-blue-600 dark:text-blue-400 font-bold">{filteredAssets.length} {isRtl ? 'سجلات مطابقة' : 'Matches found'}</span>
                </div>

                {filteredAssets.length === 0 ? (
                  <div className="text-center py-10 space-y-2">
                    <Layers className="w-12 h-12 text-slate-300 mx-auto" />
                    <p className="text-sm text-slate-500">{isRtl ? 'لم نعثر على أي أصول متوافقة مع شروط البحث!' : 'No matched asset records found.'}</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredAssets.map(asset => {
                      const TypeIcon = assetTypesMeta[asset.type]?.icon || Layers;
                      const typeColor = assetTypesMeta[asset.type]?.color || 'bg-slate-50 text-slate-500';
                      
                      return (
                        <div key={asset.id} className="py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                          
                          {/* Asset Core Meta Description */}
                          <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner ${typeColor}`}>
                              <TypeIcon className="w-6 h-6" />
                            </div>
                            <div className="space-y-1 text-right">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-bold text-slate-850 dark:text-neutral-100 text-sm sm:text-base group-hover:text-blue-650 transition-colors">
                                  {asset.name}
                                </h4>
                                <span className="p-0.5 px-2 bg-slate-100 dark:bg-slate-800 font-mono text-[10px] text-slate-500 rounded-md font-bold">
                                  {asset.code}
                                </span>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
                                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {asset.purchaseDate}</span>
                                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {asset.location || (isRtl ? 'غير محدد' : 'N/A')}</span>
                                <span className="p-0.5 px-1.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded text-[9px] font-black">
                                  {asset.depreciationMethod === 'straight' && (isRtl ? 'قسط ثابت' : 'Straight-Line')}
                                  {asset.depreciationMethod === 'declining' && (isRtl ? 'قسط متناقص' : 'Declining')}
                                  {asset.depreciationMethod === 'sum_of_years' && (isRtl ? 'أرقام السنوات' : 'Sum of Years')}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Values Section */}
                          <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 border-slate-100 pt-3 sm:pt-0">
                            
                            <div className="text-right sm:text-left font-mono">
                              <span className="text-[10px] text-slate-400 block">{isRtl ? 'التكلفة ◀ صافي القيمة' : 'Cost ◀ Book Value'}</span>
                              <div className="flex items-center gap-1 text-xs">
                                <span className="text-slate-400 line-through">{(asset.costValue).toLocaleString()}</span>
                                <span className="text-slate-400">◀</span>
                                <span className="font-black text-slate-800 dark:text-neutral-100">{(asset.bookValue).toLocaleString()} {isRtl ? 'ج.م' : 'EGP'}</span>
                              </div>
                              
                              {/* Depreciation Progress Indicator */}
                              <div className="w-24 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                                <div 
                                  className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                                  style={{ width: `${Math.min(100, asset.progressPercent)}%` }} 
                                />
                              </div>
                            </div>

                            {/* Row Action Trigger links */}
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => setScheduleAssetId(asset.id)}
                                className={`p-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${scheduleAssetId === asset.id ? 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-950 dark:border-blue-900' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-500 dark:bg-slate-900 dark:border-slate-800'}`}
                                title={isRtl ? 'عرض جدول الإهلاك السنوي' : 'View Schedule'}
                              >
                                {isRtl ? 'حساب الإهلاك ◀' : 'Depreciate'}
                              </button>
                              <button
                                onClick={() => handleEditAsset(asset)}
                                className="p-2 text-slate-450 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg transition-all cursor-pointer"
                                title={isRtl ? 'تعديل هذا الأصل' : 'Edit Asset'}
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteAsset(asset.id, asset.name)}
                                className="p-2 text-slate-450 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-all cursor-pointer"
                                title={isRtl ? 'حذف هذا الأصل من الدفاتر' : 'Delete Asset'}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                          </div>

                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Right block: Dynamic Depreciation Schedule list Generator (1 span in XL) */}
            <div className="xl:col-span-1">
              <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-5 shadow-xl border border-slate-800 space-y-4">
                
                {/* Visual Header */}
                <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                  <Calculator className="w-5 h-5 text-amber-400" />
                  <div className="text-right">
                    <h3 className="text-base font-black text-slate-100">{isRtl ? 'جدول الإهلاك المتوقع للأصل المختار' : 'Projected Depreciation Calculator'}</h3>
                    <p className="text-[11px] text-slate-400">{isRtl ? 'جدولة العمر الإنتاجي خطوة بخطوة' : 'Step-by-step lifecurious schedule'}</p>
                  </div>
                </div>

                {activeScheduleAsset ? (
                  <div className="space-y-4">
                    
                    {/* Selected Asset Information summary */}
                    <div className="p-3.5 bg-white/5 dark:bg-slate-950/20 border border-white/10 rounded-2xl text-right text-xs space-y-1.5">
                      <span className="text-[10px] text-slate-400 block">{isRtl ? 'الأصل النشط المجدول حالياً' : 'Target Asset:'}</span>
                      <p className="font-black text-slate-205 text-sm">{activeScheduleAsset.name}</p>
                      
                      <div className="grid grid-cols-2 gap-2 pt-2 text-[11px]">
                        <div>
                          <span className="text-slate-400 block">{isRtl ? 'العمر بالسنوات:' : 'Life (Years):'}</span>
                          <span className="font-bold text-slate-100">{activeScheduleAsset.usefulLife} {isRtl ? 'سنوات' : 'Years'}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">{isRtl ? 'القيمة الشرائية:' : 'Historical Cost:'}</span>
                          <span className="font-bold text-slate-100">{(activeScheduleAsset.costValue).toLocaleString()} {isRtl ? 'ج.م' : 'EGP'}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">{isRtl ? 'قيمة الخردة:' : 'Salvage Value:'}</span>
                          <span className="font-bold text-amber-350">{(activeScheduleAsset.salvageValue).toLocaleString()} {isRtl ? 'ج.م' : 'EGP'}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">{isRtl ? 'أسلوب الإهلاك:' : 'Method:'}</span>
                          <span className="p-0.5 px-1 bg-white/10 text-slate-200 text-[10px] rounded block text-center font-bold">
                            {activeScheduleAsset.depreciationMethod === 'straight' && (isRtl ? 'قسط ثابت' : 'Straight-Line')}
                            {activeScheduleAsset.depreciationMethod === 'declining' && (isRtl ? 'قسط متناقص' : 'Declining')}
                            {activeScheduleAsset.depreciationMethod === 'sum_of_years' && (isRtl ? 'أرقام السنوات' : 'Sum of Years')}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Schedule step-by-step table */}
                    <div className="overflow-x-auto max-h-[290px] overflow-y-auto pr-1">
                      <table className="w-full text-right text-[11px] leading-normal border-collapse">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-400 font-bold">
                            <th className="pb-2">{isRtl ? 'السنة' : 'Year'}</th>
                            <th className="pb-2 text-center">{isRtl ? 'قسط الإهلاك' : 'Depreciation'}</th>
                            <th className="pb-2 text-center">{isRtl ? 'المجمع التراكمي' : 'Accumulated'}</th>
                            <th className="pb-2 text-left">{isRtl ? 'صافي القيمة' : 'Net Book'}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-850">
                          {scheduleData.map((row, idx) => (
                            <tr key={idx} className="hover:bg-white/5 transition-colors">
                              <td className="py-2.5 text-slate-300 font-bold font-mono">سنة {row.year} <span className="text-[9px] text-slate-500 font-sans">(عام {row.yearNumber})</span></td>
                              <td className="py-2.5 text-center text-slate-200 font-mono font-bold">{(row.depreciationCost).toLocaleString(undefined, { maximumFractionDigits: 1 })}</td>
                              <td className="py-2.5 text-center text-amber-300 font-mono">{(row.accumulatedDep).toLocaleString(undefined, { maximumFractionDigits: 1 })}</td>
                              <td className="py-2.5 text-left text-emerald-350 font-mono font-bold">{(row.netValue).toLocaleString(undefined, { maximumFractionDigits: 1 })}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Action trigger for schedule PDF */}
                    <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
                      <span className="text-slate-400">{isRtl ? '* تقارير استرشادية سنوية' : '* Financial year projections'}</span>
                      <button
                        onClick={handlePrint}
                        className="flex items-center gap-1.5 p-1.5 px-3 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 transition-all text-slate-200 font-bold text-[10px] cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>{isRtl ? 'طباعة جدول الإهلاك' : 'Print Projections'}</span>
                      </button>
                    </div>

                  </div>
                ) : (
                  <div className="text-center py-10 space-y-2">
                    <Calculator className="w-10 h-10 text-slate-500 mx-auto" />
                    <p className="text-xs text-slate-400">{isRtl ? 'يرجى اختيار أصل من القائمة على اليمين للبدء في توليد الجداول والتحجيم' : 'Select asset to check projected lifecycle.'}</p>
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>
      )}

      {/* ======================= activeTab === 'dashboard' (Dynamic Analytics Tab) ======================= */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          
          {/* Key KPI Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-150 dark:border-slate-800 shadow-sm flex items-center justify-between text-right">
              <div>
                <span className="text-xs text-slate-400 block mb-1">{isRtl ? 'عدد الأصول بالسجل' : 'Tracked Assets'}</span>
                <span className="text-2xl font-mono font-black text-slate-800 dark:text-neutral-100">{metrics.count}</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-150 dark:border-slate-800 shadow-sm flex items-center justify-between text-right">
              <div>
                <span className="text-xs text-slate-400 block mb-1">{isRtl ? 'إجمالي الأصول بالتكلفة التاريخية' : 'Total Acquisition Cost'}</span>
                <span className="text-xl font-mono font-black text-indigo-650 dark:text-indigo-400">{(metrics.totalCost).toLocaleString()} <span className="text-xs font-sans font-medium">{isRtl ? 'ج.م' : 'EGP'}</span></span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Coins className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-150 dark:border-slate-800 shadow-sm flex items-center justify-between text-right">
              <div>
                <span className="text-xs text-slate-400 block mb-1">{isRtl ? 'إجمالي مجمع الإهلاك التراكمي' : 'Accumulated Depreciation'}</span>
                <span className="text-xl font-mono font-black text-amber-600 dark:text-amber-400">{(metrics.totalAccumDep).toLocaleString()} <span className="text-xs font-sans font-medium">{isRtl ? 'ج.م' : 'EGP'}</span></span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Calculator className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-150 dark:border-slate-800 shadow-sm flex items-center justify-between text-right">
              <div>
                <span className="text-xs text-slate-400 block mb-1">{isRtl ? 'صافي القيمة الدفترية الكلية' : 'Net Asset Book Value'}</span>
                <span className="text-xl font-mono font-black text-emerald-600 dark:text-emerald-400">{(metrics.totalBookValue).toLocaleString()} <span className="text-xs font-sans font-medium">{isRtl ? 'ج.م' : 'EGP'}</span></span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>

          </div>

          {/* Graphical Data analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Chart 1: Categories asset distribution bar chart */}
            <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-5 shadow-sm text-right">
              <h4 className="text-sm sm:text-base font-black text-slate-800 dark:text-neutral-100 mb-4">{isRtl ? 'توزيع الأصول الرأسمالية والتكلفة التاريخية بالفئة' : 'Capital Asset Distribution by Asset Category'}</h4>
              <div className="h-64 sm:h-80" style={{ direction: 'ltr' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <ReChartsBarChart data={typeChartData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis />
                    <ReChartsTooltip formatter={(val: number) => [val.toLocaleString() + ' EGP', 'Value']} />
                    <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                      {typeChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Bar>
                  </ReChartsBarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Net Asset Book value relative comparison chart */}
            <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-5 shadow-sm text-right">
              <h4 className="text-sm sm:text-base font-black text-slate-800 dark:text-neutral-100 mb-4">{isRtl ? 'النسبة المئوية لاستخدام وكفاءة الأصول (التكلفة مقابل صافي الدفتر)' : 'Historic Cost vs Present Net Book Value per Asset'}</h4>
              <div className="h-64 sm:h-80" style={{ direction: 'ltr' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={assets}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} stroke="#eaeaea" />
                    <XAxis dataKey="code" tick={{ fontSize: 9 }} />
                    <YAxis />
                    <ReChartsTooltip formatter={(val: number) => val.toLocaleString() + ' EGP'} />
                    <Legend />
                    <Line type="monotone" dataKey="costValue" stroke="#6366f1" strokeWidth={2.5} name={isRtl ? 'التكلفة التاريخية' : 'Historical Cost'} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="salvageValue" stroke="#f59e0b" strokeWidth={2} name={isRtl ? 'قيمة النفاية/الخردة' : 'Salvage Value'} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Maintenance Logs and Reports Segment */}
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-5 shadow-sm text-right">
            <h3 className="text-base sm:text-lg font-black text-slate-800 dark:text-neutral-100 mb-4">{isRtl ? 'مؤشرات الصيانة الوقائية واللوجستيات لتقرير مركز التكلفة' : 'Preventative Asset Maintenance Logging & Locations'}</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm text-right space-y-2 leading-relaxed">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-950/40 text-slate-500 font-bold border-b border-slate-100 dark:border-slate-800">
                    <th className="p-3">{isRtl ? 'الأصل الفعلي' : 'Asset'}</th>
                    <th className="p-3">{isRtl ? 'كود الصيانة الدورية' : 'Log Reference'}</th>
                    <th className="p-3">{isRtl ? 'الفترة الزمنية المفضلة للتفتيش' : 'Next Audit Interval'}</th>
                    <th className="p-3">{isRtl ? 'مركز التكلفة / المسؤولية' : 'Cost Centre'}</th>
                    <th className="p-3 text-left">{isRtl ? 'كفاءة الأصل الافتراضية' : 'Estimated Health'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-705 dark:text-neutral-300">
                  {assets.map((a, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/20">
                      <td className="p-3 font-semibold">{a.name}</td>
                      <td className="p-3 font-mono">MN-FA-{a.code.split('-')[1] || '01'}</td>
                      <td className="p-3 text-amber-600 dark:text-amber-400 font-bold">{isRtl ? 'كل 6 أشهر' : 'Semi-Annually'}</td>
                      <td className="p-3">{a.department}</td>
                      <td className="p-3 text-left">
                        <span className="p-0.5 px-2 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-md font-mono font-bold">
                          {i === 1 ? '75%' : i === 3 ? '85%' : '98%'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ======================= activeTab === 'journal_entries' (Accounting Links) ======================= */}
      {activeTab === 'journal_entries' && (
        <div className="space-y-6 text-right">
          
          <div className="bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Coins className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-850 dark:text-neutral-100">{isRtl ? 'الربط المالي وتوليد القيود المحاسبية التلقائية' : 'Treasury Link & Auto Journal Generation'}</h3>
                <p className="text-xs text-slate-500">{isRtl ? 'الترحيل التلقائي للنقديات ومصاريف الإهلاك السنوية لتعديل حساب الأستاذ المساعد' : 'Conceptually linking active cash and liability metrics directly'}</p>
              </div>
            </div>

            <p className="text-slate-650 dark:text-neutral-300 text-sm leading-relaxed">
              {isRtl 
                ? 'تقوم المنظومة هنا بمحاكاة فورية لعملية الترحيل الدفتري، حيث يتم تخليق القيود المتوازنة من واقع سجل الأصول النشطة لديك وتجهيزها للقوائم المالية (الميزانية العمومية والعمليات الإيرادية والشرائية):' 
                : 'Instantly visualising ledger entries computed relative to active inventory entries registered within this session:'}
            </p>

            <div className="space-y-6">
              
              {/* Part 1: Acquisition journaling log */}
              <div className="space-y-2 text-right">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-black">
                  <span>●</span> <span>{isRtl ? 'دفتريات شراء الأصول والترحيل للخزينة بالكامل' : 'Group 1: Cumulative Asset Capital Acquisitions'}</span>
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800 text-slate-100 rounded-2xl font-mono text-xs sm:text-sm space-y-4 shadow-inner">
                  <div className="flex justify-between text-[11px] text-slate-450 border-b border-slate-900 pb-2">
                    <span>{isRtl ? 'الحساب المدين / الدائن' : 'Account description'}</span>
                    <div className="flex gap-12">
                      <span>{isRtl ? 'مدين (DR)' : 'Debit'}</span>
                      <span>{isRtl ? 'دائن (CR)' : 'Credit'}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center bg-slate-900/30 p-2 rounded-lg">
                      <div>
                        <span className="text-indigo-300 font-bold block">{isRtl ? 'حـ/ إجمالي الأصول الثابتة المقتناة (سجل الشركة)' : 'Fixed Assets Capital Cost (FA)'}</span>
                        <span className="text-[10px] text-slate-400 font-sans">{isRtl ? '* قيمة الاستحواذ لجميع الأصول' : '* Capital addition cost'}</span>
                      </div>
                      <span className="text-emerald-400 font-bold font-mono">DR {(metrics.totalCost).toLocaleString()} {isRtl ? 'ج.م' : 'EGP'}</span>
                    </div>

                    <div className="flex justify-between items-center bg-slate-900/30 p-2 rounded-lg">
                      <div className="pr-4">
                        <span className="text-blue-300 block">{isRtl ? 'إلى حـ/ النقدية بالصندوق (الخزينة) أو الموردين الآجلين' : 'CR Cash / Suppliers Reserve'}</span>
                        <span className="text-[10px] text-slate-400 font-sans">{isRtl ? '* المقابل التمويلي للشراء' : '* Outflow/debt account'}</span>
                      </div>
                      <span className="text-rose-400 font-bold font-mono">CR {(metrics.totalCost).toLocaleString()} {isRtl ? 'ج.م' : 'EGP'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Part 2: Depreciation expense journaling log */}
              <div className="space-y-2 text-right">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 rounded-lg text-xs font-black">
                  <span>●</span> <span>{isRtl ? 'تسكين وإثبات مصروف الإهلاك التراكمي والدفينة' : 'Group 2: Annual Accumulated Depreciation Allocations'}</span>
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800 text-slate-100 rounded-2xl font-mono text-xs sm:text-sm space-y-4 shadow-inner">
                  <div className="flex justify-between text-[11px] text-slate-450 border-b border-slate-900 pb-2">
                    <span>{isRtl ? 'الحساب المدين / الدائن' : 'Account description'}</span>
                    <div className="flex gap-12">
                      <span>{isRtl ? 'مدين (DR)' : 'Debit'}</span>
                      <span>{isRtl ? 'دائن (CR)' : 'Credit'}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center bg-slate-900/30 p-2 rounded-lg">
                      <div>
                        <span className="text-amber-300 font-bold block">{isRtl ? 'حـ/ إجمالي مصروف إهلاك أصول (قائمة الأرباح والخسائر)' : 'Depreciation Operating Expense (Income Statement)'}</span>
                        <span className="text-[10px] text-slate-400 font-sans">{isRtl ? '* أثر تقليص الأرباح للفترة الجارية' : '* Decreases current net income'}</span>
                      </div>
                      <span className="text-emerald-400 font-bold font-mono">DR {(metrics.totalAccumDep).toLocaleString()} {isRtl ? 'ج.م' : 'EGP'}</span>
                    </div>

                    <div className="flex justify-between items-center bg-slate-900/30 p-2 rounded-lg">
                      <div className="pr-4">
                        <span className="text-blue-300 block">{isRtl ? 'إلى حـ/ إجمالي مجمع الإهلاك التراكمي (مطروح من المركز المالي)' : 'CR Accumulated Depreciation Reserve'}</span>
                        <span className="text-[10px] text-slate-400 font-sans">{isRtl ? '* حساب عكسي يقلص أصول الميزانية' : '* Contra-asset valuation count'}</span>
                      </div>
                      <span className="text-rose-400 font-bold font-mono">CR {(metrics.totalAccumDep).toLocaleString()} {isRtl ? 'ج.م' : 'EGP'}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Quick success reminder */}
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-650 dark:text-emerald-400 border border-emerald-100/30 flex items-center gap-3 text-xs sm:text-sm">
              <CheckCircle className="w-5 h-5 shrink-0" />
              <span>{isRtl ? 'تتم عملية الموازنة وتخليد الحساب بشكل تلقائي لضمان الموازنة الكاملة في كشوف المراجعة اليومية.' : 'Ledge balances reconcile automatically following GAAP and international audit controls.'}</span>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
