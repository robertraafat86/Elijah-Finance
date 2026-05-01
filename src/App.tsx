import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
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

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex font-sans">
        <ScrollToTop />
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Navbar />
          <main className="flex-grow pt-20 lg:pt-0">
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
              <Route path="/tax-accounting" element={<TaxAccounting />} />
              <Route path="/customs-duties" element={<CustomsDuties />} />
              <Route path="/construction-accounting" element={<ConstructionAccounting />} />
              <Route path="/hospital-accounting" element={<HospitalAccounting />} />
              <Route path="/cost-accounting" element={<CostAccounting />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <WhatsAppButton />
      </div>
    </Router>
  );
}
