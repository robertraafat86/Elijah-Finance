import { ReactNode } from "react";

export interface NavItem {
  title: string;
  path: string;
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

export interface AccountingStandard {
  code: string;
  title: string;
  description: string;
  usage: string;
  example?: string;
  icon?: ReactNode;
}

export interface Review {
  id: string;
  name: string;
  company: string;
  comment: string;
  rating: number;
}
