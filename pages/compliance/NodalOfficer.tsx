import React from 'react';
import ComplianceLayout from '../../components/ComplianceLayout';

const NodalOfficer: React.FC = () => {
  return (
    <ComplianceLayout title="Accessibility Nodal Officer">
      <div className="grid grid-cols-1 gap-8 mb-12">
        {/* Nodal Officer Card */}
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
             <h2 className="text-lg font-bold text-slate-800">Accessibility Nodal Officer</h2>
          </div>
          <div className="p-6 space-y-2 text-sm text-slate-700">
             <p><strong>Name & Designation:</strong> Karan Vijay Vargiya</p>
             <p><strong>Email:</strong> <a href="mailto:ra@karanvijayvargiya.com" className="text-brand-600">ra@karanvijayvargiya.com</a></p>
             <p><strong>Phone:</strong> +91 89592 22227</p>
          </div>
        </div>

        {/* Escalation Card */}
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
             <h2 className="text-lg font-bold text-slate-800">Grievance Redressal (Escalation)</h2>
          </div>
          <div className="p-6 space-y-2 text-sm text-slate-700">
             <p><strong>Name of Officer:</strong> Karan Vijay Vargiya</p>
             <p><strong>Dedicated Email:</strong> <a href="mailto:ra@karanvijayvargiya.com" className="text-brand-600">ra@karanvijayvargiya.com</a></p>
             <p><strong>Phone Helpline:</strong> +91 89592 22227</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-bold text-blue-900 mb-3">How to File a Complaint</h3>
        <div className="text-sm text-blue-800 space-y-2">
          <p>If you have any grievances or complaints, you may contact the Nodal Officer through the above-mentioned email or phone number. We are committed to resolving all complaints in a timely and fair manner.</p>
          <p>For detailed information on our grievance redressal process, please visit our <a href="#/compliance/grievance-redressal" className="underline font-bold">Grievance Redressal Policy</a>.</p>
          <p>You may also file complaints directly with:
             <br/>
             1. <strong>SEBI SCORES:</strong> <a href="https://scores.sebi.gov.in/" target="_blank" rel="noreferrer" className="underline font-bold">https://scores.sebi.gov.in/</a>
             <br/>
             2. <strong>Smart ODR:</strong> <a href="https://smartodr.in/" target="_blank" rel="noreferrer" className="underline font-bold">https://smartodr.in/</a>
          </p>
        </div>
      </div>
    </ComplianceLayout>
  );
};

export default NodalOfficer;