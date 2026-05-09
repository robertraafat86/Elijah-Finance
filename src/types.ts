import { ReactNode } from "react";

export interface NavItem {
  title: string;
  path: string;
  children?: NavItem[];
  isMega?: boolean;
  icon?: React.ReactNode;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: ReactNode;
}

export interface AccountingStep {
  id: string;
  title: string;
  description: string;
  example: string;
}

export interface FinancialStatement {
  id: string;
  title: string;
  description: string;
  example: string;
  template?: string;
}

export interface AccountingPrinciple {
  id: string;
  title: string;
  description: string;
  example: string;
  icon: ReactNode;
}

export interface AccountingStandardDetail {
  definition: string;
  objective: string;
  scope: {
    includes: string[];
    excludes: string[];
  };
  keyConcepts: string[];
  accountingTreatment: {
    recognition: string;
    measurement: string;
    presentation: string;
    disclosure: string;
  };
  practicalExamples: {
    case: string;
    solution: string;
  }[];
  journalEntries: {
    description: string;
    entries: { account: string; debit?: string; credit?: string }[];
  }[];
  commonErrors: string[];
  comparisons?: string;
  summary: string[];
}

export interface AccountingStandard {
  code: string;
  title: string;
  description: string;
  usage: string;
  category: 'IAS' | 'IFRS' | 'EAS';
  example?: string;
  icon?: ReactNode;
  details?: AccountingStandardDetail;
}

export interface Review {
  id: string;
  name: string;
  company: string;
  comment: string;
  rating: number;
}

export interface FinancialRatio {
  name: string;
  formula: string;
  description: string;
  interpretation: string;
  goodRange: string;
}

export interface FinancialAnalysisDetail {
  id: string;
  title: string;
  definition: string;
  objective: string;
  ratios: FinancialRatio[];
  practicalExample: {
    data: { [key: string]: string | number }[];
    steps: string[];
    result: string;
    interpretation: string;
  };
  commonErrors: string[];
  summary: string[];
}

export type AccountingMiscCategory = 
  | 'basic-concepts'
  | 'terminology'
  | 'tips'
  | 'common-errors'
  | 'quick-q'
  | 'general-info';

export interface AccountingMiscItem {
  id: string;
  question: string;
  answer: string;
  category: AccountingMiscCategory;
  details?: string;
  example?: string;
  isQuick?: boolean;
}
