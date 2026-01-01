import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import About from "./pages/About";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import Careers from "./pages/Careers";

import Allnews from "./pages/Allnews";
import DueDates from "./pages/DueDates";
import NotFound from "./pages/NotFound";

// Services
import CorporateServices from "./pages/Services/CorporateServices";
import AuditServices from "./pages/Services/AuditServices";
import CorporateFinance from "./pages/Services/CorporateFinance";
import ServicesForNonResidents from "./pages/Services/ServicesForNonResidents";
import AccountingServices from "./pages/Services/AccountingServices";
import PayRoll from "./pages/Services/PayRoll";
import BenefitsOfOutsourcing from "./pages/Services/BenefitsOfOutsourcing";
import IncomeTax from "./pages/Services/IncomeTax";
import GST from "./pages/Services/GST";
import CorporateGovernance from "./pages/Services/CorporateGovernance";
import TDS from "./pages/Services/TDS";

export default function App() {
  return (
    <>
      <ScrollToTop />

      <Header />

      <main className="min-h-screen">
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />

          <Route path="/news" element={<Allnews />} />
          <Route path="/due-dates" element={<DueDates />} />

          <Route path="/services/corporate-services" element={<CorporateServices />} />
          <Route path="/services/audit" element={<AuditServices />} />
          <Route path="/services/corporate-finance" element={<CorporateFinance />} />
          <Route path="/services/services-for-non-residents" element={<ServicesForNonResidents />} />
          <Route path="/services/accounting-services" element={<AccountingServices />} />
          <Route path="/services/payroll" element={<PayRoll />} />
          <Route path="/services/benefits-of-outsourcing" element={<BenefitsOfOutsourcing />} />
          <Route path="/services/income-tax" element={<IncomeTax />} />
          <Route path="/services/gst" element={<GST />} />
          <Route path="/services/corporate-governance" element={<CorporateGovernance />} />
          <Route path="/services/tds" element={<TDS />} />
          <Route path="*" element={<NotFound />} />


          <Route path="/admin" element={<AdminLogin />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}
