import React from 'react';
import OfficerDetails from './OfficerDetails';
import SebiDetails from './SebiDetails';
import SEO from './SEO';

interface ComplianceLayoutProps {
  title: string;
  children: React.ReactNode;
}

const ComplianceLayout: React.FC<ComplianceLayoutProps> = ({ title, children }) => {
  return (
    <div className="bg-white min-h-screen pb-12">
      <SEO 
        title={title} 
        description={`${title} - Karan Vijayvargiya, SEBI Registered Research Analyst. Read our regulatory disclosures and compliance information.`}
        keywords={`SEBI compliance, ${title}, research analyst regulations, investor protection`}
      />
      <div className="bg-brand-600 text-white py-16 text-center shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="prose max-w-none text-slate-700 mb-12">
          {children}
        </div>
        
        <div className="mt-16 pt-8 border-t border-slate-200">
           <OfficerDetails />
        </div>
        <div className="mt-8 pt-8 border-t border-slate-200">
           <SebiDetails />
        </div>
      </div>
    </div>
  );
};

export default ComplianceLayout;