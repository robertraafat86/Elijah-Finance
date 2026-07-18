import React, { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import RightSidebar from './components/RightSidebar';
import WhatsAppButton from './components/WhatsAppButton';
import Breadcrumbs from './components/Breadcrumbs';
import Footer from './components/Footer';
import InstallPWA from './components/InstallPWA';
import SEOManager from './components/SEOManager';
import ErrorBoundary from './components/ErrorBoundary';
import { cn } from './lib/utils';

// Lazy-loaded pages for code splitting & faster load times
const Home = lazy(() => import('./pages/Home'));
const AccountingCycle = lazy(() => import('./pages/AccountingCycle'));
const FinancialStatements = lazy(() => import('./pages/FinancialStatements'));
const Services = lazy(() => import('./pages/Services'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const AccountingStandards = lazy(() => import('./pages/AccountingStandards'));
const EgyptianStandards = lazy(() => import('./pages/EgyptianStandards'));
const FinancialRegulations = lazy(() => import('./pages/FinancialRegulations'));
const Inventory = lazy(() => import('./pages/Inventory'));
const BankReconciliation = lazy(() => import('./pages/BankReconciliation'));
const InternalAudit = lazy(() => import('./pages/InternalAudit'));
const AccountingPortal = lazy(() => import('./pages/AccountingPortal'));
const TaxAccounting = lazy(() => import('./pages/TaxAccounting'));
const CustomsDuties = lazy(() => import('./pages/CustomsDuties'));
const ConstructionAccounting = lazy(() => import('./pages/ConstructionAccounting'));
const HospitalAccounting = lazy(() => import('./pages/HospitalAccounting'));
const CostAccounting = lazy(() => import('./pages/CostAccounting'));
const FinancialAnalysis = lazy(() => import('./pages/FinancialAnalysis'));
const AnalysisDetail = lazy(() => import('./pages/FinancialAnalysis/AnalysisDetail'));
const AccountingMisc = lazy(() => import('./pages/AccountingMisc'));
const SavedContent = lazy(() => import('./pages/SavedContent'));
const DepreciationMethods = lazy(() => import('./pages/DepreciationMethods'));
const Scrap = lazy(() => import('./pages/Scrap'));
const BadDebts = lazy(() => import('./pages/BadDebts'));
const FixedAssets = lazy(() => import('./pages/FixedAssets'));
const ProfessionalServices = lazy(() => import('./pages/ProfessionalServices'));
const AccountingTools = lazy(() => import('./pages/AccountingTools'));
const DigitalStore = lazy(() => import('./pages/DigitalStore'));
const AccountingTemplates = lazy(() => import('./pages/AccountingTemplates'));
const Careers = lazy(() => import('./pages/Careers'));
const Forum = lazy(() => import('./pages/Forum'));
const Membership = lazy(() => import('./pages/Membership'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const ElijahAcademy = lazy(() => import('./pages/ElijahAcademy'));
const ProfessionalBlog = lazy(() => import('./pages/ProfessionalBlog'));
const AiAssistant = lazy(() => import('./pages/AiAssistant'));

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
      const saved = localStorage.getItem('font-size-scale-v3');
      return saved ? parseInt(saved, 10) : 140;
    }
    return 140;
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
      localStorage.setItem('font-size-scale-v3', String(fontSizeScale));
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
      <SEOManager />
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
          <ErrorBoundary>
            <Suspense fallback={
              <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
                <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-xs text-slate-400 font-bold">
                  {isRtl ? 'جاري التحميل...' : 'Loading...'}
                </p>
              </div>
            }>
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
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
                  <Route path="/professional-services" element={<ProfessionalServices />} />
                  <Route path="/accounting-tools" element={<AccountingTools />} />
                  <Route path="/digital-store" element={<DigitalStore />} />
                  <Route path="/templates-library" element={<AccountingTemplates />} />
                  <Route path="/templates" element={<AccountingTemplates />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/jobs" element={<Careers />} />
                  <Route path="/forum" element={<Forum />} />
                  <Route path="/community-forum" element={<Forum />} />
                  <Route path="/membership" element={<Membership />} />
                  <Route path="/plans" element={<Membership />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                  <Route path="/academy" element={<ElijahAcademy />} />
                  <Route path="/blog" element={<ProfessionalBlog />} />
                  <Route path="/blog/:slug" element={<ProfessionalBlog />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/ai-assistant" element={<AiAssistant />} />
                </Routes>
              </motion.div>
            </Suspense>
          </ErrorBoundary>
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
