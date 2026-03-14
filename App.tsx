import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RegulatoryBanner from './components/RegulatoryBanner';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const Mission = lazy(() => import('./pages/Mission'));
const Founder = lazy(() => import('./pages/Founder'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const Compliance = lazy(() => import('./pages/Compliance'));

// Lazy load Compliance Pages
const Disclaimer = lazy(() => import('./pages/compliance/Disclaimer'));
const PrivacyPolicy = lazy(() => import('./pages/compliance/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./pages/compliance/TermsConditions'));
const AuditStatus = lazy(() => import('./pages/compliance/AuditStatus'));
const NodalOfficer = lazy(() => import('./pages/compliance/NodalOfficer'));
const GrievanceRedressal = lazy(() => import('./pages/compliance/GrievanceRedressal'));
const ComplaintsStatus = lazy(() => import('./pages/compliance/ComplaintsStatus'));
const InvestorCharter = lazy(() => import('./pages/compliance/InvestorCharter'));
const StandardDisclosures = lazy(() => import('./pages/compliance/StandardDisclosures'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-600"></div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <RegulatoryBanner />
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/mission" element={<Mission />} />
              <Route path="/founder" element={<Founder />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/compliance" element={<Compliance />} />
              
              {/* Compliance Routes */}
              <Route path="/compliance/disclaimer" element={<Disclaimer />} />
              <Route path="/compliance/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/compliance/terms-conditions" element={<TermsConditions />} />
              <Route path="/compliance/audit-status" element={<AuditStatus />} />
              <Route path="/compliance/nodal-officer" element={<NodalOfficer />} />
              <Route path="/compliance/grievance-redressal" element={<GrievanceRedressal />} />
              <Route path="/compliance/complaints-status" element={<ComplaintsStatus />} />
              <Route path="/compliance/investor-charter" element={<InvestorCharter />} />
              <Route path="/compliance/standard-disclosures" element={<StandardDisclosures />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;