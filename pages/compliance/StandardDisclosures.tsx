import React from 'react';
import ComplianceLayout from '../../components/ComplianceLayout';

const StandardDisclosures: React.FC = () => {
  return (
    <ComplianceLayout title="Disclosures As Per Securities and Exchange Board of India (Research Analysts) Regulations, 2014">
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-8 text-sm">
        In accordance with the SEBI (Research Analysts) Regulations, 2014, the following disclosures are presented for <strong>Karan Vijayvargiya</strong>, SEBI Reg. No. INH000025470 (Registration valid till XX-XX-XXXX).
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">1. About the Research Entity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm bg-slate-50 p-4 rounded border border-slate-200">
             <div>
               <p><strong>Name of Research Analyst:</strong><br/>Karan Vijayvargiya</p>
               <p className="mt-2"><strong>SEBI Registration Number:</strong><br/>INH000025470</p>
               <p className="mt-2"><strong>Validity:</strong><br/>Valid till XX-XX-XXXX</p>
             </div>
             <div>
               <p><strong>Category:</strong><br/>Research Analyst (Individual)</p>
               <p className="mt-2"><strong>Type:</strong><br/>Individual</p>
               <p className="mt-2"><strong>Registration Date:</strong><br/>XX-XX-20XX</p>
             </div>
             <div className="col-span-1 md:col-span-2 mt-2">
               <p><strong>Registered Office Address:</strong><br/>Office 101, 654 Shyam Aashrey, Scheme No 114, Part 2, Vijaynagar, Indore, Madhya Pradesh - 452010</p>
             </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">2. Current Business Activity</h2>
          <p>Presently, no research, recommendation, advisory, tips, or investment-related services are offered on this website.</p>
          <p className="mt-2">We are currently strengthening:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2 text-sm">
            <li>Regulatory compliance</li>
            <li>Internal systems & documentation</li>
            <li>Technology infrastructure</li>
            <li>Operational readiness</li>
          </ul>
          <p className="mt-2 text-sm">Future services, if launched, will strictly adhere to SEBI RA regulations.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">3. Services Not Provided</h2>
          <ul className="list-disc pl-5 space-y-1 mt-2 text-sm">
            <li>Investment Advisory (IA)</li>
            <li>Portfolio or custom financial planning</li>
            <li>Execution/distribution services</li>
            <li>PMS or brokerage activities</li>
            <li>Trading calls / intraday tips / stock signals</li>
            <li>Guaranteed or assured returns</li>
            <li>Broker/intermediary endorsement</li>
          </ul>
          <p className="mt-2 text-sm">We are not affiliated with any stockbroker or intermediary.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">4. Disciplinary History</h2>
          <p>There are no pending or past disciplinary actions against the Company, its directors, principal officers, or associates.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">5. Mandatory SEBI RA Disclosures</h2>
          <p>Applicable prospectively when research services are activated.</p>
          
          <div className="mt-4">
            <h3 className="font-bold text-slate-800">A) Financial Interest & Ownership</h3>
            <ul className="list-disc pl-5 space-y-1 mt-1 text-sm">
              <li>No financial interest currently in any subject company</li>
              <li>No beneficial ownership ≥ 1% in any securities discussed</li>
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="font-bold text-slate-800">B) Conflicts of Interest</h3>
            <p className="text-sm mt-1">No existing material conflict of interest. Any future conflict will be transparently disclosed.</p>
          </div>

          <div className="mt-4">
            <h3 className="font-bold text-slate-800">C) Compensation Disclosure</h3>
            <ul className="list-disc pl-5 space-y-1 mt-1 text-sm">
              <li>No compensation from subject companies for research services in last 12 months</li>
              <li>No merchant/investment banking related compensation received</li>
              <li>No benefits received from any third party</li>
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="font-bold text-slate-800">D) Employment & Market-Making</h3>
            <ul className="list-disc pl-5 space-y-1 mt-1 text-sm">
              <li>No officer/director role in subject companies</li>
              <li>The Company is not engaged in market-making activities</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">6. Technology / AI Usage</h2>
          <p>No AI-based automation is used to generate research presently. Any future usage will be duly disclosed.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">7. Definitions (Effective After Launch)</h2>
          <ul className="list-disc pl-5 space-y-1 mt-2 text-sm">
            <li><strong>Buy:</strong> Recommendation to enter position</li>
            <li><strong>Sell:</strong> Recommendation to exit, at specified level</li>
            <li><strong>Hold:</strong> Maintain current position</li>
            <li><strong>Stop-Loss:</strong> Risk-control exit level</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">8. Entity & Contact Information</h2>
          <div className="bg-slate-50 p-4 rounded-lg mt-4 text-sm border border-slate-200">
            <p><strong>Brand Name:</strong> Karan Vijayvargiya (Individual Research Analyst)</p>
            <p><strong>SEBI RA No.:</strong> INH000025470</p>
            <p><strong>Registered Office:</strong> Office 101, 654 Shyam Aashrey, Scheme No 114, Part 2, Vijaynagar, Indore, Madhya Pradesh - 452010</p>
            <p><strong>Compliance / Grievance Officer:</strong> Karan Vijayvargiya</p>
            <p><strong>Email:</strong> <a href="mailto:ra@karanvijayvargiya.com" className="text-brand-600 hover:underline">ra@karanvijayvargiya.com</a></p>
            <p><strong>Phone:</strong> +91 89592 22227</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">9. SEBI Mandatory Disclaimers</h2>
          <div className="bg-yellow-50 border border-yellow-200 p-4 mt-4 text-sm rounded-lg">
             <p className="italic mb-2">“Investments in securities markets are subject to market risks. Read all the related documents carefully before investing.”</p>
             <p className="italic">“Registration granted by SEBI and certification by NISM in no way guarantee performance or returns.”</p>
          </div>
        </section>
      </div>
    </ComplianceLayout>
  );
};

export default StandardDisclosures;