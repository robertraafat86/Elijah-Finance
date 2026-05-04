import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  LayoutDashboard, 
  FileText, 
  BarChart3,
  Calculator, 
  Building2, 
  Hospital, 
  Factory, 
  Truck, 
  FileCheck, 
  Package, 
  Landmark, 
  ShieldCheck,
  BookOpen,
  Users,
  MessageSquare,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { cn } from '../lib/utils';

const sidebarItems = [
  { title: 'الرئيسية', path: '/', icon: <Home className="w-5 h-5" /> },
  { title: 'بوابة المحاسبة', path: '/accounting-portal', icon: <LayoutDashboard className="w-5 h-5" /> },
  { 
    group: 'الذكاء الاصطناعي',
    items: [
      { title: 'شرح المعايير (AI)', path: '/ias/1', icon: <Sparkles className="w-5 h-5 text-amber-500" /> },
    ]
  },
  { 
    group: 'تخصصات محاسبية',
    items: [
      { title: 'المحاسبة الضريبية', path: '/tax-accounting', icon: <Calculator className="w-5 h-5" /> },
      { title: 'محاسبة المقاولات', path: '/construction-accounting', icon: <Building2 className="w-5 h-5" /> },
      { title: 'محاسبة المستشفيات', path: '/hospital-accounting', icon: <Hospital className="w-5 h-5" /> },
      { title: 'محاسبة التكاليف', path: '/cost-accounting', icon: <Factory className="w-5 h-5" /> },
      { title: 'الضريبة الجمركية', path: '/customs-duties', icon: <Truck className="w-5 h-5" /> },
    ]
  },
  {
    group: 'تقارير ومعايير',
    items: [
      { title: 'الدورة المحاسبية', path: '/accounting-cycle', icon: <ChevronRight className="w-5 h-5" /> },
      { title: 'القوائم المالية', path: '/financial-statements', icon: <FileText className="w-5 h-5" /> },
      { title: 'التحليل المالي', path: '/financial-analysis', icon: <BarChart3 className="w-5 h-5" /> },
      { title: 'المعايير الدولية', path: '/accounting-standards', icon: <FileCheck className="w-5 h-5" /> },
      { title: 'المعايير المصرية', path: '/egyptian-standards', icon: <FileCheck className="w-5 h-5" /> },
      { title: 'اللائحة المالية', path: '/financial-regulations', icon: <BookOpen className="w-5 h-5" /> },
    ]
  },
  {
    group: 'أدوات المراجعة',
    items: [
      { title: 'طرق حساب المخزون', path: '/inventory', icon: <Package className="w-5 h-5" /> },
      { title: 'مذكرة تسوية البنك', path: '/bank-reconciliation', icon: <Landmark className="w-5 h-5" /> },
      { title: 'المراجعة الداخلية', path: '/internal-audit', icon: <ShieldCheck className="w-5 h-5" /> },
    ]
  },
  {
    group: 'عام',
    items: [
      { title: 'من نحن', path: '/about', icon: <Users className="w-5 h-5" /> },
      { title: 'تواصل معنا', path: '/contact', icon: <MessageSquare className="w-5 h-5" /> },
    ]
  }
];

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-72 bg-white border-l border-slate-200 h-screen sticky top-0 overflow-y-auto z-40 scrollbar-hide">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-200">
            أ
          </div>
          <span className="text-2xl font-black text-slate-800 tracking-tighter">إيليجا</span>
        </div>

        <nav className="space-y-8">
          {sidebarItems.map((group, idx) => (
            <div key={idx}>
              {'group' in group && (
                <h3 className="px-4 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                  {group.group}
                </h3>
              )}
              <div className="space-y-1">
                {'items' in group ? (
                  group.items.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) => 
                        cn("sidebar-link", isActive && "sidebar-link-active")
                      }
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </NavLink>
                  ))
                ) : (
                   <NavLink
                    to={group.path}
                    className={({ isActive }) => 
                      cn("sidebar-link", isActive && "sidebar-link-active")
                    }
                  >
                    {group.icon}
                    <span>{group.title}</span>
                  </NavLink>
                )}
              </div>
            </div>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-slate-100 bg-slate-50/50">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-medium mb-1">تحتاج مساعدة؟</p>
          <a 
            href="https://wa.me/201208538580" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-bold text-blue-600 hover:underline inline-flex items-center gap-1"
          >
            تحدث معنا <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </aside>
  );
}
