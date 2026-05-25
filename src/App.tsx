import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import RightSidebar from './components/RightSidebar';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import AccountingCycle from './pages/AccountingCycle';
import FinancialStatements from './pages/FinancialStatements';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import AccountingStandards from './pages/AccountingStandards';
import EgyptianStandards from './pages/EgyptianStandards';
import FinancialRegulations from './pages/FinancialRegulations';
import Inventory from './pages/Inventory';
import BankReconciliation from './pages/BankReconciliation';
import InternalAudit from './pages/InternalAudit';
import AccountingPortal from './pages/AccountingPortal';
import TaxAccounting from './pages/TaxAccounting';
import CustomsDuties from './pages/CustomsDuties';
import ConstructionAccounting from './pages/ConstructionAccounting';
import HospitalAccounting from './pages/HospitalAccounting';
import CostAccounting from './pages/CostAccounting';
import FinancialAnalysis from './pages/FinancialAnalysis';
import AnalysisDetail from './pages/FinancialAnalysis/AnalysisDetail';
import AccountingMisc from './pages/AccountingMisc';
import SavedContent from './pages/SavedContent';
import DepreciationMethods from './pages/DepreciationMethods';
import Scrap from './pages/Scrap';
import BadDebts from './pages/BadDebts';
import FixedAssets from './pages/FixedAssets';
import Breadcrumbs from './components/Breadcrumbs';
import Footer from './components/Footer';
import InstallPWA from './components/InstallPWA';
import { cn } from './lib/utils';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const { i18n } = useTranslation();
  
  // Theme Dark Mode state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  // Usability & Accessibility Font Size Scale state
  const [fontSizeScale, setFontSizeScale] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('font-size-scale');
      return saved ? parseInt(saved, 10) : 100;
    }
    return 100;
  });

  // Desktop Expand/Collapse Right Sidebar State
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sidebar_collapsed') === 'true';
    }
    return false;
  });

  // Mobile drawer visible/hidden sidebar State
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Apply font scale dynamically for enhanced physical accessibility across entire website
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.style.fontSize = `${fontSizeScale}%`;
      localStorage.setItem('font-size-scale', String(fontSizeScale));
    }
  }, [fontSizeScale]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(prev => {
      const next = !prev;
      localStorage.setItem('sidebar_collapsed', String(next));
      return next;
    });
  };

  const isRtl = i18n.language === 'ar';

  // Calculate dynamic content shift margins based on Right/Left Sidebar orientation and expanded/collapsed width
  const layoutMarginClass = isRtl
    ? (isSidebarCollapsed ? "lg:mr-20" : "lg:mr-80")
    : (isSidebarCollapsed ? "lg:ml-20" : "lg:ml-80");

  return (
    <Router>
      <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 flex flex-col font-sans transition-colors duration-500">
        <ScrollToTop />
        
        {/* Topbar Navigation Header */}
        <Navbar 
          isDarkMode={isDarkMode} 
          toggleDarkMode={toggleDarkMode}
          isCollapsed={isSidebarCollapsed}
          toggleCollapse={toggleSidebarCollapse}
          isOpenMobile={isOpenMobile}
          setIsOpenMobile={setIsOpenMobile}
          fontSizeScale={fontSizeScale}
          setFontSizeScale={setFontSizeScale}
        />

        {/* Right Sidebar Component Navigation */}
        <RightSidebar
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          isCollapsed={isSidebarCollapsed}
          toggleCollapse={toggleSidebarCollapse}
          isOpenMobile={isOpenMobile}
          setIsOpenMobile={setIsOpenMobile}
          fontSizeScale={fontSizeScale}
          setFontSizeScale={setFontSizeScale}
        />

        {/* Dynamic margin shifted Content Body area */}
        <main 
          className={cn(
            "flex-grow pt-24 lg:pt-24 px-4 sm:px-6 transition-all duration-300", 
            layoutMarginClass
          )}
        >
          <div className="container mx-auto py-2">
            <Breadcrumbs />
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/accounting-cycle" element={<AccountingCycle />} />
            <Route path="/financial-statements" element={<FinancialStatements />} />
            <Route path="/accounting-standards" element={<AccountingStandards />} />
            <Route path="/egyptian-standards" element={<EgyptianStandards />} />
            <Route path="/financial-regulations" element={<FinancialRegulations />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/bank-reconciliation" element={<BankReconciliation />} />
            <Route path="/internal-audit" element={<InternalAudit />} />
            <Route path="/accounting-portal" element={<AccountingPortal />} />
            <Route path="/accounting/:sectionId" element={<AccountingMisc />} />
            <Route path="/tax-accounting" element={<TaxAccounting />} />
            <Route path="/customs-duties" element={<CustomsDuties />} />
            <Route path="/construction-accounting" element={<ConstructionAccounting />} />
            <Route path="/hospital-accounting" element={<HospitalAccounting />} />
            <Route path="/cost-accounting" element={<CostAccounting />} />
            <Route path="/financial-analysis" element={<FinancialAnalysis />} />
            <Route path="/financial-analysis/:id" element={<AnalysisDetail />} />
            <Route path="/accounting-misc" element={<AccountingMisc />} />
            <Route path="/saved-content" element={<SavedContent />} />
            <Route path="/depreciation-methods" element={<DepreciationMethods />} />
            <Route path="/scrap" element={<Scrap />} />
            <Route path="/bad-debts" element={<BadDebts />} />
            <Route path="/fixed-assets-management" element={<FixedAssets />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        {/* Dynamic margin footer */}
        <div className={cn("transition-all duration-300", layoutMarginClass)}>
          <Footer />
        </div>

        <WhatsAppButton />
        <InstallPWA />
      </div>
    </Router>
  );
}
