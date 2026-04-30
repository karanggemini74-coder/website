import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';

const Compliance: React.FC = () => {
  const documents = [
    { title: "Complaint Status", date: "Current Month", path: "/compliance/complaints-status" },
    { title: "Investor Charter", date: "Jan 2024", path: "/compliance/investor-charter" },
    { title: "Grievance Redressal Policy", date: "Jan 2024", path: "/compliance/grievance-redressal" },
    { title: "Terms & Condition", date: "Jan 2024", path: "/compliance/terms-conditions" },
    { title: "Privacy Policy", date: "Jan 2024", path: "/compliance/privacy-policy" },
    { title: "Disclaimer", date: "Jan 2024", path: "/compliance/disclaimer" },
    { title: "Mandatory Disclosures", date: "Jan 2024", path: "/compliance/standard-disclosures" },
    { title: "Nodal Officer", date: "Jan 2024", path: "/compliance/nodal-officer" }
  ];

  return (
    <div className="min-h-screen bg-white py-12">
      <SEO 
        title="Regulatory Compliance" 
        description="Access mandatory SEBI disclosures, investor charter, and grievance redressal information for Karan Vijayvargiya, SEBI Registered Research Analyst."
        keywords="SEBI compliance, research analyst disclosures, investor charter, grievance redressal, stock market regulations"
      />
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-slate-800 mb-8 pb-4 border-b">Regulatory Compliance & Disclosures</h1>
        
        <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-8">
           <p className="text-sm text-blue-800">
             <strong>Registration Status:</strong> We are a SEBI Registered Research Analyst (INH000025470). Compliance is at the core of our operations. Below are the mandatory disclosures and documents for investor reference.
           </p>
        </div>

        <div className="space-y-4">
          {documents.map((doc, index) => (
            <Link to={doc.path} key={index} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg hover:border-brand-300 hover:shadow-md transition-all group">
              <div className="flex items-center">
                <FileText className="text-slate-400 mr-4 group-hover:text-brand-500 transition-colors" />
                <div>
                  <h3 className="font-semibold text-slate-700 group-hover:text-brand-700 transition-colors">{doc.title}</h3>
                  <p className="text-xs text-slate-500">Updated: {doc.date}</p>
                </div>
              </div>
              <div className="flex items-center text-sm font-medium text-brand-600">
                View <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Grievance Redressal</h2>
          <p className="text-slate-600 text-sm mb-4">
            If you have any complaints or grievances, please reach out to our compliance officer at <a href="mailto:karanvijayvargiya29@gmail.com" className="text-brand-600 underline">karanvijayvargiya29@gmail.com</a>. We are committed to resolving issues within statutory timelines.
          </p>
          <p className="text-slate-600 text-sm">
             You can also lodge your complaints on the SEBI SCORES portal if unsatisfied with our resolution.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Compliance;