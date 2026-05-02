import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, Home } from 'lucide-react';
import { NAV_ITEMS } from '../constants';

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) return null;

  const getTitle = (path: string) => {
    // Check main items
    const mainItem = NAV_ITEMS.find((item) => item.path === path);
    if (mainItem) return mainItem.title;

    // Check children
    for (const item of NAV_ITEMS) {
      if (item.children) {
        const child = item.children.find((c) => c.path === path);
        if (child) return child.title;
      }
    }
    
    // Fallback based on path
    const titles: Record<string, string> = {
      'accounting-portal': 'بوابة المحاسبة',
      'accounting-cycle': 'الدورة المحاسبية',
      'cost-accounting': 'محاسبة التكاليف',
      'tax-accounting': 'المحاسبة الضريبية',
      'construction-accounting': 'محاسبة المقاولات',
      'hospital-accounting': 'محاسبة المستشفيات',
      'customs-duties': 'الضريبة الجمركية',
      'internal-audit': 'المراجعة الداخلية',
      'accounting-standards': 'المعايير الدولية',
      'egyptian-standards': 'المعايير المصرية',
      'financial-regulations': 'اللائحة المالية',
      'financial-statements': 'القوائم المالية',
      'inventory': 'طرق حساب المخزون',
      'bank-reconciliation': 'مذكرة تسوية البنك',
      'about': 'من نحن',
      'services': 'خدماتنا',
      'contact': 'تواصل معنا'
    };
    return titles[path.replace('/', '')] || path;
  };

  return (
    <nav className="flex py-4 overflow-x-auto no-scrollbar" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 space-x-reverse md:space-x-2 md:space-x-reverse text-sm font-medium">
        <li className="inline-flex items-center">
          <Link to="/" className="inline-flex items-center text-slate-500 hover:text-blue-600 transition-colors">
            <Home className="w-4 h-4 ml-2" />
            الرئيسية
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          return (
            <li key={to} className="flex items-center">
              <ChevronLeft className="w-4 h-4 text-slate-400 mx-1" />
              {last ? (
                <span className="text-blue-600 font-bold" aria-current="page">
                  {getTitle(to)}
                </span>
              ) : (
                <Link to={to} className="text-slate-500 hover:text-blue-600 transition-colors">
                  {getTitle(to)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
