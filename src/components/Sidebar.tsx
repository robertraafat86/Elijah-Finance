import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { cn } from '../lib/utils';
import LanguageSwitcher from './LanguageSwitcher';

const sidebarItems = [
  { title: 'nav.home', path: '/', icon: <Home className="w-5 h-5" /> },
  { title: 'nav.portal', path: '/accounting-portal', icon: <LayoutDashboard className="w-5 h-5" /> },
  { 
    group: 'nav.ai_group',
    items: [
      { title: 'nav.ai_standards', path: '/ias/1', icon: <Sparkles className="w-5 h-5 text-amber-500" /> },
    ]
  },
  { 
    group: 'nav.specialties_group',
    items: [
      { title: 'nav.tax_accounting', path: '/tax-accounting', icon: <Calculator className="w-5 h-5" /> },
      { title: 'nav.construction_accounting', path: '/construction-accounting', icon: <Building2 className="w-5 h-5" /> },
      { title: 'nav.hospital_accounting', path: '/hospital-accounting', icon: <Hospital className="w-5 h-5" /> },
      { title: 'nav.cost_accounting', path: '/cost-accounting', icon: <Factory className="w-5 h-5" /> },
      { title: 'nav.customs_duties', path: '/customs-duties', icon: <Truck className="w-5 h-5" /> },
    ]
  },
  {
    group: 'nav.reports_group',
    items: [
      { title: 'nav.accounting_cycle', path: '/accounting-cycle', icon: <ChevronRight className="w-5 h-5" /> },
      { title: 'nav.financial_statements', path: '/financial-statements', icon: <FileText className="w-5 h-5" /> },
      { title: 'nav.financial_analysis', path: '/financial-analysis', icon: <BarChart3 className="w-5 h-5" /> },
      { title: 'nav.international_standards', path: '/accounting-standards', icon: <FileCheck className="w-5 h-5" /> },
      { title: 'nav.egyptian_standards', path: '/egyptian-standards', icon: <FileCheck className="w-5 h-5" /> },
      { title: 'nav.accounting_misc', path: '/accounting-misc', icon: <HelpCircle className="w-5 h-5" /> },
      { title: 'nav.financial_regulations', path: '/financial-regulations', icon: <BookOpen className="w-5 h-5" /> },
    ]
  },
  {
    group: 'nav.audit_group',
    items: [
      { title: 'nav.inventory', path: '/inventory', icon: <Package className="w-5 h-5" /> },
      { title: 'nav.bank_reconciliation', path: '/bank-reconciliation', icon: <Landmark className="w-5 h-5" /> },
      { title: 'nav.internal_audit', path: '/internal-audit', icon: <ShieldCheck className="w-5 h-5" /> },
    ]
  },
  {
    group: 'nav.general_group',
    items: [
      { title: 'nav.about', path: '/about', icon: <Users className="w-5 h-5" /> },
      { title: 'nav.contact', path: '/contact', icon: <MessageSquare className="w-5 h-5" /> },
    ]
  }
];

export default function Sidebar() {
  const { t, i18n } = useTranslation();

  return (
    <aside className={cn(
      "hidden lg:flex flex-col w-72 bg-white h-screen sticky top-0 overflow-y-auto z-40 scrollbar-hide",
      i18n.language === 'ar' ? "border-l border-slate-200" : "border-r border-slate-200"
    )}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-10 px-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-200">
              {t('common.brand_initial')}
            </div>
            <span className="text-2xl font-black text-slate-800 tracking-tighter">
              {t('common.brand_name')}
            </span>
          </div>
          <LanguageSwitcher />
        </div>

        <nav className="space-y-8">
          {sidebarItems.map((group, idx) => (
            <div key={idx}>
              {'group' in group && (
                <h3 className="px-4 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                  {t(group.group)}
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
                      <span>{t(item.title)}</span>
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
                    <span>{t(group.title)}</span>
                  </NavLink>
                )}
              </div>
            </div>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-slate-100 bg-slate-50/50">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-xs text-slate-500 font-medium mb-1">
            {t('common.need_help')}
          </p>
          <a 
            href="https://wa.me/201208538580" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-bold text-blue-600 hover:underline inline-flex items-center gap-1"
          >
            {t('common.chat_now')} 
            <ChevronRight className={cn("w-4 h-4", i18n.language === 'en' && "rotate-180")} />
          </a>
        </div>
      </div>
    </aside>
  );
}
