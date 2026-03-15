import React from 'react';
import ComplianceLayout from '../../components/ComplianceLayout';

const AuditStatus: React.FC = () => {
  return (
    <ComplianceLayout title="Disclosure of Status of Compliance Audit Report">
      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <p className="text-sm">
          In accordance with <strong>Regulation 25(3)</strong> of the SEBI (Research Analysts) Regulations, 2014, and SEBI Circular SEBI/HO/MIRSD/MIRSD_RTAMB/P/CIR/2025/04 dated January 08, 2025, Research Analysts are required to publish the status of their <strong>Annual Compliance Audit Report</strong> on their website.
        </p>
      </div>

      <div className="space-y-6">
        <p>Since <strong>Karan Vijayvargiya</strong> received its SEBI Research Analyst Registration (<strong>Reg. No. INH000025470</strong>) on <strong>13 March 2026</strong>, one full financial year has <strong className="text-red-600">not yet been completed</strong>.</p>
        
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
          <p className="text-sm font-semibold text-red-800">
            Accordingly, the requirement to conduct and disclose the Annual Compliance Audit Report is <span className="underline">not applicable at this time</span>.
          </p>
        </div>

        <p>The <strong>audit status</strong> for the current period is as follows:</p>
        
        <div className="overflow-x-auto">
          <table className="min-w-full border border-slate-300">
            <thead className="bg-slate-100">
              <tr>
                <th className="border border-slate-300 px-4 py-2 text-left font-bold text-slate-700">Financial Year</th>
                <th className="border border-slate-300 px-4 py-2 text-left font-bold text-slate-700">Audit Status (Complied / Not Applicable / Not Complied)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-300 px-4 py-2">2025–26</td>
                <td className="border border-slate-300 px-4 py-2 font-bold">Not Applicable <span className="font-normal">(First financial year not completed)</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200 mt-6">
          <p className="text-sm text-green-800">
            The Compliance Audit Report will be uploaded here <strong>after completion of one full financial year</strong>, as mandated by SEBI.
          </p>
        </div>
      </div>
    </ComplianceLayout>
  );
};

export default AuditStatus;