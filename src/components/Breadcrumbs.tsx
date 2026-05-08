import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { NAV_ITEMS } from '../constants';

export default function Breadcrumbs() {
  const { t } = useTranslation();
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
      'accounting-portal': 'nav.portal',
      'accounting-cycle': 'nav.accounting_cycle',
      'cost-accounting': 'nav.cost_accounting',
      'tax-accounting': 'nav.tax_accounting',
      'construction-accounting': 'nav.construction_accounting',
      'hospital-accounting': 'nav.hospital_accounting',
      'customs-duties': 'nav.customs_duties',
      'internal-audit': 'nav.internal_audit',
      'accounting-standards': 'nav.international_standards',
      'egyptian-standards': 'nav.egyptian_standards',
      'financial-regulations': 'nav.financial_regulations',
      'financial-statements': 'nav.financial_statements',
      'inventory': 'nav.inventory',
      'bank-reconciliation': 'nav.bank_reconciliation',
      'about': 'nav.about',
      'services': 'nav.services',
      'contact': 'nav.contact'
    };
    const key = titles[path.replace(/^\//, '')];
    return key ? key : path.replace(/^\//, '');
  };

  return (
    <nav className="flex py-4 overflow-x-auto no-scrollbar" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 space-x-reverse md:space-x-2 md:space-x-reverse text-sm font-medium">
        <li className="inline-flex items-center">
          <Link to="/" className="inline-flex items-center text-slate-500 hover:text-blue-600 transition-colors">
            <Home className="w-4 h-4 ml-2" />
            {t('nav.home')}
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const titleKey = getTitle(to);

          return (
            <li key={to} className="flex items-center">
              <ChevronLeft className="w-4 h-4 text-slate-400 mx-1" />
              {last ? (
                <span className="text-blue-600 font-bold" aria-current="page">
                  {t(titleKey)}
                </span>
              ) : (
                <Link to={to} className="text-slate-500 hover:text-blue-600 transition-colors">
                  {t(titleKey)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
