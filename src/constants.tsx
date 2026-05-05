import React from 'react';
import { 
  BookOpen, 
  FileText, 
  BarChart3, 
  ShieldCheck, 
  Calculator, 
  PieChart, 
  TrendingUp, 
  Users,
  RefreshCcw,
  Scale,
  Eye,
  AlertTriangle,
  ArrowLeftRight,
  Globe,
  Briefcase,
  CheckCircle,
  Award,
  Clock
} from 'lucide-react';
import { NavItem, Service, AccountingStep, FinancialStatement, Review, AccountingPrinciple, AccountingStandard } from './types';

export const LOGO_URL = "https://lh3.googleusercontent.com/d/1WlIcRYhnRU8PeT4VN615H0ZOBEMdOKcs";

export const NAV_ITEMS: NavItem[] = [
  { title: 'nav.home', path: '/' },
  { title: 'nav.portal', path: '/accounting-portal' },
  { title: 'nav.accounting_cycle', path: '/accounting-cycle' },
  { title: 'nav.cost_accounting', path: '/cost-accounting' },
  { title: 'nav.tax_accounting', path: '/tax-accounting' },
  { title: 'nav.construction_accounting', path: '/construction-accounting' },
  { title: 'nav.hospital_accounting', path: '/hospital-accounting' },
  { title: 'nav.financial_analysis', path: '/financial-analysis' },
  { title: 'nav.customs_duties', path: '/customs-duties' },
  { title: 'nav.internal_audit', path: '/internal-audit' },
  { 
    title: 'nav.reports_group', 
    path: '#standards', 
    children: [
      { title: 'nav.ai_standards', path: '/ias/1' },
      { title: 'nav.financial_statements', path: '/financial-statements' },
      { title: 'nav.international_standards', path: '/accounting-standards' },
      { title: 'nav.egyptian_standards', path: '/egyptian-standards' },
      { title: 'nav.financial_regulations', path: '/financial-regulations' },
    ]
  },
  { 
    title: 'nav.accounting_misc', 
    path: '/accounting-portal#knowledge-bank', 
    children: [
      { title: 'nav.inventory', path: '/inventory' },
      { title: 'nav.bank_reconciliation', path: '/bank-reconciliation' },
      { title: 'nav.bad_debts', path: '/bad-debts' },
      { title: 'nav.scrap', path: '/scrap' },
      { title: 'nav.depreciation', path: '/depreciation-methods' },
    ]
  },
];

export const ACCOUNTING_PRINCIPLES: AccountingPrinciple[] = [
  {
    id: 'accrual',
    title: 'principles.accrual.title',
    description: 'principles.accrual.desc',
    example: 'principles.accrual.example',
    icon: <Clock className="w-6 h-6" />,
  },
  {
    id: 'going-concern',
    title: 'principles.going_concern.title',
    description: 'principles.going_concern.desc',
    example: 'principles.going_concern.example',
    icon: <RefreshCcw className="w-6 h-6" />,
  },
  {
    id: 'consistency',
    title: 'principles.consistency.title',
    description: 'principles.consistency.desc',
    example: 'principles.consistency.example',
    icon: <Scale className="w-6 h-6" />,
  },
  {
    id: 'materiality',
    title: 'principles.materiality.title',
    description: 'principles.materiality.desc',
    example: 'principles.materiality.example',
    icon: <BarChart3 className="w-6 h-6" />,
  },
  {
    id: 'full-disclosure',
    title: 'principles.full_disclosure.title',
    description: 'principles.full_disclosure.desc',
    example: 'principles.full_disclosure.example',
    icon: <Eye className="w-6 h-6" />,
  },
  {
    id: 'prudence',
    title: 'principles.prudence.title',
    description: 'principles.prudence.desc',
    example: 'principles.prudence.example',
    icon: <AlertTriangle className="w-6 h-6" />,
  },
  {
    id: 'comparability',
    title: 'principles.comparability.title',
    description: 'principles.comparability.desc',
    example: 'principles.comparability.example',
    icon: <ArrowLeftRight className="w-6 h-6" />,
  },
];

export const ACCOUNTING_STANDARDS_IAS: AccountingStandard[] = [
  {
    code: 'IAS 1',
    title: 'standards.ias1.title',
    category: 'IAS',
    description: 'standards.ias1.desc',
    usage: 'standards.ias1.usage',
  },
  {
    code: 'IAS 2',
    title: 'standards.ias2.title',
    category: 'IAS',
    description: 'standards.ias2.desc',
    usage: 'standards.ias2.usage',
  },
  {
    code: 'IAS 7',
    title: 'standards.ias7.title',
    category: 'IAS',
    description: 'standards.ias7.desc',
    usage: 'standards.ias7.usage',
  },
  {
    code: 'IAS 16',
    title: 'standards.ias16.title',
    category: 'IAS',
    description: 'standards.ias16.desc',
    usage: 'standards.ias16.usage',
  },
];

export const ACCOUNTING_STANDARDS_IFRS: AccountingStandard[] = [
  {
    code: 'IFRS 15',
    title: 'standards.ifrs15.title',
    category: 'IFRS',
    description: 'standards.ifrs15.desc',
    usage: 'standards.ifrs15.usage',
  },
  {
    code: 'IFRS 16',
    title: 'standards.ifrs16.title',
    category: 'IFRS',
    description: 'standards.ifrs16.desc',
    usage: 'standards.ifrs16.usage',
  },
  {
    code: 'IFRS 9',
    title: 'standards.ifrs9.title',
    category: 'IFRS',
    description: 'standards.ifrs9.desc',
    usage: 'standards.ifrs9.usage',
  },
];

export const ACCOUNTING_STANDARDS_EAS: AccountingStandard[] = [
  {
    code: 'EAS 1',
    title: 'standards.eas1.title',
    category: 'EAS',
    description: 'standards.eas1.desc',
    usage: 'standards.eas1.usage',
    example: 'standards.eas1.example',
    icon: <FileText className="w-6 h-6" />,
  },
  {
    code: 'EAS 2',
    title: 'standards.eas2.title',
    category: 'EAS',
    description: 'standards.eas2.desc',
    usage: 'standards.eas2.usage',
    example: 'standards.eas2.example',
    icon: <PieChart className="w-6 h-6" />,
  },
  {
    code: 'EAS 7',
    title: 'standards.eas7.title',
    category: 'EAS',
    description: 'standards.eas7.desc',
    usage: 'standards.eas7.usage',
    example: 'standards.eas7.example',
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    code: 'EAS 16',
    title: 'standards.eas16.title',
    category: 'EAS',
    description: 'standards.eas16.desc',
    usage: 'standards.eas16.usage',
    example: 'standards.eas16.example',
    icon: <Calculator className="w-6 h-6" />,
  },
  {
    code: 'EAS 17',
    title: 'standards.eas17.title',
    category: 'EAS',
    description: 'standards.eas17.desc',
    usage: 'standards.eas17.usage',
    example: 'standards.eas17.example',
    icon: <BarChart3 className="w-6 h-6" />,
  },
];

export const SERVICES: Service[] = [
  {
    id: 'bookkeeping',
    title: 'services.bookkeeping.title',
    description: 'services.bookkeeping.desc',
    features: ['services.bookkeeping.f1', 'services.bookkeeping.f2', 'services.bookkeeping.f3'],
    icon: <BookOpen className="w-8 h-8" />,
  },
  {
    id: 'financial-statements',
    title: 'services.statements.title',
    description: 'services.statements.desc',
    features: ['services.statements.f1', 'services.statements.f2', 'services.statements.f3'],
    icon: <FileText className="w-8 h-8" />,
  },
  {
    id: 'internal-audit',
    title: 'services.audit.title',
    description: 'services.audit.desc',
    features: ['services.audit.f1', 'services.audit.f2', 'services.audit.f3'],
    icon: <ShieldCheck className="w-8 h-8" />,
  },
  {
    id: 'taxes',
    title: 'services.taxes.title',
    description: 'services.taxes.desc',
    features: ['services.taxes.f1', 'services.taxes.f2', 'services.taxes.f3'],
    icon: <Calculator className="w-8 h-8" />,
  },
];

export const ACCOUNTING_STEPS: AccountingStep[] = [
  {
    id: 'analysis',
    title: 'steps.analysis.title',
    description: 'steps.analysis.desc',
    example: 'steps.analysis.example',
  },
  {
    id: 'journal',
    title: 'steps.journal.title',
    description: 'steps.journal.desc',
    example: 'steps.journal.example',
  },
  {
    id: 'ledger',
    title: 'steps.ledger.title',
    description: 'steps.ledger.desc',
    example: 'steps.ledger.example',
  },
  {
    id: 'trial-balance',
    title: 'steps.trial_balance.title',
    description: 'steps.trial_balance.desc',
    example: 'steps.trial_balance.example',
  },
  {
    id: 'adjustments',
    title: 'steps.adjustments.title',
    description: 'steps.adjustments.desc',
    example: 'steps.adjustments.example',
  },
];

export const FINANCIAL_STATEMENTS: FinancialStatement[] = [
  {
    id: 'income-statement',
    title: 'statements.income.title',
    description: 'statements.income.desc',
    example: 'statements.income.example',
    template: 'statements.income.template',
  },
  {
    id: 'balance-sheet',
    title: 'statements.balance.title',
    description: 'statements.balance.desc',
    example: 'statements.balance.example',
    template: 'statements.balance.template',
  },
  {
    id: 'cash-flow',
    title: 'statements.cash_flow.title',
    description: 'statements.cash_flow.desc',
    example: 'statements.cash_flow.example',
    template: 'statements.cash_flow.template',
  },
  {
    id: 'equity-statement',
    title: 'statements.equity.title',
    description: 'statements.equity.desc',
    example: 'statements.equity.example',
    template: 'statements.equity.template',
  },
];

export const REVIEWS: Review[] = [
  {
    id: '1',
    name: 'reviews.r1.name',
    company: 'reviews.r1.company',
    comment: 'reviews.r1.comment',
    rating: 5,
  },
  {
    id: '2',
    name: 'reviews.r2.name',
    company: 'reviews.r2.company',
    comment: 'reviews.r2.comment',
    rating: 5,
  },
  {
    id: '3',
    name: 'reviews.r3.name',
    company: 'reviews.r3.company',
    comment: 'reviews.r3.comment',
    rating: 4,
  },
];
