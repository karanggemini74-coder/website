import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ComplianceLayout from '../../components/ComplianceLayout';

const ComplaintsStatus: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
     fetch('/api/settings/complaints', { cache: 'no-store' })
        .then(res => res.json())
        .then(resData => {
            if (resData) {
                let parsedData = resData;
                if (typeof resData === 'string') {
                    try { parsedData = JSON.parse(resData); } catch(e) {}
                }
                setData(parsedData);
            }
            setLoading(false);
        })
        .catch(err => {
            console.error("Failed to load complaints data", err);
            setLoading(false);
        });
  }, []);

  if (loading) {
     return (
       <ComplianceLayout title="Complaints Status">
         <div className="p-8 text-center text-slate-500">Loading currently available data...</div>
       </ComplianceLayout>
     );
  }

  // Provide initial fallbacks if table data hasn't been saved yet.
  const monthEnding = data?.monthEnding || 'MARCH - 2026';
  const monthlyData = data?.monthlyData || [
        { source: 'Directly from investor', pendingLastMonth: 'Nil', received: 'Nil', resolved: 'N.A', totalPending: 'Nil', pendingGt3Months: 'Nil', avgResolutionTime: 'N.A' },
        { source: 'SEBI (SCORES)', pendingLastMonth: 'Nil', received: 'Nil', resolved: 'N.A', totalPending: 'Nil', pendingGt3Months: 'Nil', avgResolutionTime: 'N.A' },
        { source: 'Other Sources (if any)', pendingLastMonth: 'Nil', received: 'Nil', resolved: 'N.A', totalPending: 'Nil', pendingGt3Months: 'Nil', avgResolutionTime: 'N.A' },
        { source: 'Grand Total', pendingLastMonth: 'Nil', received: 'Nil', resolved: 'N.A', totalPending: 'Nil', pendingGt3Months: 'Nil', avgResolutionTime: 'N.A' }
  ];
  const monthlyTrend = data?.monthlyTrend || [
        { sr: 1, month: 'MARCH - 2026', carriedForward: 'NIL', received: 'NIL', resolved: 'N.A', pending: 'N.A' },
        { sr: 2, month: 'FEB - 2026', carriedForward: 'NIL', received: 'NIL', resolved: 'N.A', pending: 'N.A' },
        { sr: 3, month: 'JAN - 2026', carriedForward: 'NIL', received: 'NIL', resolved: 'N.A', pending: 'N.A' },
        { sr: 4, month: 'Grand Total', carriedForward: 'NIL', received: 'NIL', resolved: 'N.A', pending: 'N.A' }
  ];
  const annualDisposal = data?.annualDisposal || [
        { sr: 1, year: '2025-26', carriedForward: 'NIL', received: 'NIL', resolved: 'N.A', pending: 'N.A' },
        { sr: 2, year: '2026-27', carriedForward: 'NIL', received: 'NIL', resolved: 'N.A', pending: 'N.A' },
        { sr: 3, year: 'Grand Total', carriedForward: 'NIL', received: 'NIL', resolved: 'N.A', pending: 'N.A' }
  ];

  return (
    <ComplianceLayout title="Complaints Status">
      <div className="space-y-12 text-slate-800">
        
        {/* Table 1: Monthly Data */}
        <section>
          <h2 className="text-xl font-bold mb-2 text-slate-900">Number Of Client's Complaints</h2>
          <p className="text-sm text-slate-500 mb-6 uppercase font-medium tracking-wide">(DATA OF THE MONTH ENDING {monthEnding})</p>
          
          <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
            <table className="min-w-full text-xs md:text-sm text-center">
               <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-900">
                 <tr>
                   <th className="p-4 border-r border-slate-200 w-1/5 text-left bg-slate-100/50">Received from</th>
                   <th className="p-4 border-r border-slate-200">Pending at the end of last month</th>
                   <th className="p-4 border-r border-slate-200">Received</th>
                   <th className="p-4 border-r border-slate-200">Resolved *</th>
                   <th className="p-4 border-r border-slate-200">Total Pending #</th>
                   <th className="p-4 border-r border-slate-200">Pending complaints &gt; 3 months</th>
                   <th className="p-4 bg-slate-100/50">Average Resolution time ^ (in days)</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-200 bg-white">
                 {monthlyData.map((row: any, idx: number) => {
                     const isLast = idx === monthlyData.length - 1;
                     return (
                         <tr key={idx} className={`${isLast ? 'font-bold bg-slate-50 text-slate-900 border-t-2 border-slate-100' : 'hover:bg-slate-50 transition-colors'}`}>
                           <td className={`p-4 border-r border-slate-200 text-left ${!isLast && 'font-medium text-slate-700'}`}>{row.source}</td>
                           <td className={`p-4 border-r border-slate-200 ${!isLast && 'text-slate-600'}`}>{row.pendingLastMonth}</td>
                           <td className={`p-4 border-r border-slate-200 ${!isLast && 'text-slate-600'}`}>{row.received}</td>
                           <td className={`p-4 border-r border-slate-200 ${!isLast && 'text-slate-600'}`}>{row.resolved}</td>
                           <td className={`p-4 border-r border-slate-200 ${!isLast && 'text-slate-600'}`}>{row.totalPending}</td>
                           <td className={`p-4 border-r border-slate-200 ${!isLast && 'text-slate-600'}`}>{row.pendingGt3Months}</td>
                           <td className={`p-4 ${!isLast && 'text-slate-600'}`}>{row.avgResolutionTime}</td>
                         </tr>
                     );
                 })}
               </tbody>
            </table>
          </div>
          <p className="text-[11px] text-slate-500 mt-3 leading-relaxed">
            ^ Average Resolution time is the sum total of time taken to resolve each complaint in days, in the current month divided by total number of complaints resolved in the current month.
          </p>
        </section>

        {/* Table 2: Trend of Monthly Disposal */}
        <section>
          <h2 className="text-xl font-bold mb-4 text-slate-900">Trend of Monthly Disposal Of Complaints</h2>
          <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
            <table className="min-w-full text-xs md:text-sm text-center">
               <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-900">
                 <tr>
                   <th className="p-4 border-r border-slate-200">Sr No.</th>
                   <th className="p-4 border-r border-slate-200">Month</th>
                   <th className="p-4 border-r border-slate-200">Carried forward from previous month</th>
                   <th className="p-4 border-r border-slate-200">Received</th>
                   <th className="p-4 border-r border-slate-200">Resolved *</th>
                   <th className="p-4">Pending #</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-200 bg-white">
                 {monthlyTrend.map((row: any, idx: number) => {
                     const isLast = idx === monthlyTrend.length - 1;
                     return (
                         <tr key={idx} className={`${isLast ? 'font-bold bg-slate-50 text-slate-900 border-t-2 border-slate-100' : 'hover:bg-slate-50 transition-colors'}`}>
                           <td className={`p-4 border-r border-slate-200 ${!isLast && 'text-slate-600'}`}>{row.sr}</td>
                           <td className={`p-4 border-r border-slate-200 ${!isLast && 'text-slate-600'}`}>{row.month}</td>
                           <td className={`p-4 border-r border-slate-200 ${!isLast && 'text-slate-600'}`}>{row.carriedForward}</td>
                           <td className={`p-4 border-r border-slate-200 ${!isLast && 'text-slate-600'}`}>{row.received}</td>
                           <td className={`p-4 border-r border-slate-200 ${!isLast && 'text-slate-600'}`}>{row.resolved}</td>
                           <td className={`p-4 ${!isLast && 'text-slate-600'}`}>{row.pending}</td>
                         </tr>
                     );
                 })}
               </tbody>
            </table>
          </div>
           <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
            * Inclusive of complaints of previous months resolved in the current month.<br/>
            # Inclusive of complaints pending as on the last day of the month.
          </p>
        </section>

        {/* Table 3: Annual Disposal */}
        <section>
          <div className="mb-4">
              <p className="text-sm font-semibold text-slate-800 mb-1">Disclosure</p>
              <h2 className="text-xl font-bold text-slate-900">Annual Disposal Of Complaints</h2>
          </div>
          <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm">
            <table className="min-w-full text-xs md:text-sm text-center">
               <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-900">
                 <tr>
                   <th className="p-4 border-r border-slate-200">Sr No.</th>
                   <th className="p-4 border-r border-slate-200">Year</th>
                   <th className="p-4 border-r border-slate-200">Carried forward from Previous Year</th>
                   <th className="p-4 border-r border-slate-200">Received</th>
                   <th className="p-4 border-r border-slate-200">Resolved *</th>
                   <th className="p-4">Pending #</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-slate-200 bg-white">
                 {annualDisposal.map((row: any, idx: number) => {
                     const isLast = idx === annualDisposal.length - 1;
                     return (
                         <tr key={idx} className={`${isLast ? 'font-bold bg-slate-50 text-slate-900 border-t-2 border-slate-100' : 'hover:bg-slate-50 transition-colors'}`}>
                           <td className={`p-4 border-r border-slate-200 ${!isLast && 'text-slate-600'}`}>{row.sr}</td>
                           <td className={`p-4 border-r border-slate-200 ${!isLast && 'text-slate-600'}`}>{row.year}</td>
                           <td className={`p-4 border-r border-slate-200 ${!isLast && 'text-slate-600'}`}>{row.carriedForward}</td>
                           <td className={`p-4 border-r border-slate-200 ${!isLast && 'text-slate-600'}`}>{row.received}</td>
                           <td className={`p-4 border-r border-slate-200 ${!isLast && 'text-slate-600'}`}>{row.resolved}</td>
                           <td className={`p-4 ${!isLast && 'text-slate-600'}`}>{row.pending}</td>
                         </tr>
                     );
                 })}
               </tbody>
            </table>
          </div>
           <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
            * Inclusive of complaints of previous years resolved in the current year.<br/>
            # Inclusive of complaints pending as on the last day of the year.
          </p>
        </section>

        <div className="text-xs text-slate-500 leading-relaxed border-t border-slate-200 pt-6">
           Any complaints received by us will be handled as per the process mentioned in our <Link to="/compliance/grievance-redressal" className="text-blue-600 underline hover:text-blue-800 font-medium">Grievance Redressal Policy</Link> and the same would be handled by a dedicated Customer Service Team and Grievance Officer.
        </div>
      </div>
    </ComplianceLayout>
  );
};

export default ComplaintsStatus;