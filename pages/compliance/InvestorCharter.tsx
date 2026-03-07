import React from 'react';
import ComplianceLayout from '../../components/ComplianceLayout';

const InvestorCharter: React.FC = () => {
  return (
    <ComplianceLayout title="Investor Charter in Respect of Research Analyst (RA)">
      <div className="space-y-8 text-slate-700">
        
        {/* Section A */}
        <section>
          <h2 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4">A. Vision and Mission Statements for investors</h2>
          <div className="pl-4 space-y-4">
             <div>
               <h3 className="font-semibold text-slate-800">Vision</h3>
               <p className="text-sm">Invest with knowledge & safety.</p>
             </div>
             <div>
               <h3 className="font-semibold text-slate-800">Mission</h3>
               <p className="text-sm">Every investor should be able to invest in right investment products based on their needs, manage and monitor them to meet their goals, access reports and enjoy financial wellness.</p>
             </div>
          </div>
        </section>

        {/* Section B */}
        <section>
          <h2 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4">B. Details of business transacted by the Research Analyst with respect to the investors</h2>
          <ul className="list-disc pl-8 space-y-2 text-sm">
            <li>To publish research report based on the research activities of the Research Analyst.</li>
            <li>To provide an independent unbiased view on securities.</li>
            <li>To offer unbiased recommendation, disclosing the financial interests in recommended securities.</li>
            <li>To provide research recommendation, based on analysis of publicly available information and known observations.</li>
            <li>To conduct audit annually.</li>
            <li>To ensure that all advertisements / marketing / promotional material are in adherence to the provisions of the Advertisement Code for Research Analysts.</li>
            <li>To maintain records of interactions with all clients including prospective clients (prior to onboarding), where any conversation related to the research services has taken place.</li>
          </ul>
        </section>

        {/* Section C */}
        <section>
          <h2 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4">C. Details of services provided to investors (No Indicative Timelines)</h2>
          <div className="pl-4 space-y-4">
             <div>
               <h3 className="font-semibold text-slate-800 mb-2">Onboarding of Clients</h3>
               <ul className="list-disc pl-5 space-y-1 text-sm">
                 <li>Sharing of terms and conditions of research services.</li>
                 <li>Completing KYC of clients.</li>
               </ul>
             </div>
             <div>
               <h3 className="font-semibold text-slate-800 mb-2">Disclosure to Clients</h3>
               <ul className="list-disc pl-5 space-y-2 text-sm">
                 <li>To disclose information that is material for the client to make an informed decision, including details of its business activity, disciplinary history, the terms and conditions of research services, details of associates, risks and conflicts of interest, if any.</li>
                 <li>To disclose the extent of use of Artificial Intelligence tools in providing research services.</li>
                 <li>To disclose, while distributing a third party research report, any material conflict of interest of such third party research provider or provide web address that directs a recipient to the relevant disclosures.</li>
                 <li>To distribute research reports and recommendations to the clients without discrimination.</li>
                 <li>To maintain confidentiality with respect to publication of the research report until made available in the public domain.</li>
                 <li>To respect data privacy rights of clients and take measures to protect unauthorized use of their confidential information.</li>
                 <li>To disclose the timelines for the services provided by the research analyst to clients and ensure adherence to the said timelines.</li>
                 <li>To provide clear guidance and adequate caution notice to clients when providing recommendations for dealing in complex and high-risk financial products / services.</li>
                 <li>To treat all clients with honesty and integrity.</li>
                 <li>To ensure confidentiality of information shared by investors unless such information is required to be provided in furtherance of discharging legal obligations or investors have provided specific consent to share such information.</li>
               </ul>
             </div>
          </div>
        </section>

        {/* Section D */}
        <section>
          <h2 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4">D. Details of grievance redressal mechanism and how to access it</h2>
          <div className="pl-4 space-y-6">
             <div>
               <h3 className="font-semibold text-slate-800 mb-2">1. Investor can lodge complaint / grievance against Research Analyst in the following ways:</h3>
               
               <div className="space-y-4 mt-3">
                 <div>
                   <h4 className="font-medium text-slate-800">Mode of filing the complaint with Research Analyst</h4>
                   <p className="text-sm mt-1">In case of any grievance / complaint, an investor may approach the concerned Research Analyst who shall strive to redress the grievance immediately, but not later than 21 days of the receipt of the grievance.</p>
                 </div>
                 
                 <div>
                   <h4 className="font-medium text-slate-800">Mode of filing the complaint on SCORES or with Research Analyst Administration and Supervisory Body (RAASB)</h4>
                   <ul className="list-disc pl-5 mt-2 space-y-2 text-sm">
                     <li>SCORES 2.0 (a web based centralized grievance redressal system of SEBI for facilitating effective grievance redressal in time-bound manner): <a href="https://scores.sebi.gov.in/" target="_blank" rel="noreferrer" className="text-brand-600 hover:underline">https://scores.sebi.gov.in/</a></li>
                     <li>Two level review for complaint / grievance against Research Analyst:
                       <ul className="list-[circle] pl-5 mt-1 space-y-1">
                         <li>First review done by designated body (RAASB).</li>
                         <li>Second review done by SEBI.</li>
                       </ul>
                     </li>
                     <li>Email to designated email ID of RAASB.</li>
                   </ul>
                 </div>
               </div>
             </div>

             <div>
               <h3 className="font-semibold text-slate-800 mb-2">2. If the Investor is not satisfied with the resolution provided by the Market Participants, then the Investor has the option to file the complaint / grievance on SMARTODR platform for its resolution through online conciliation or arbitration.</h3>
               <p className="text-sm mt-2">With regard to physical complaints, investors may send their complaints to:<br/>
               Office of Investor Assistance and Education, Securities and Exchange Board of India,<br/>
               SEBI Bhavan, Plot No. C4-A, 'G' Block, Bandra-Kurla Complex, Bandra (E), Mumbai - 400 051.</p>
             </div>
          </div>
        </section>

        {/* Section E */}
        <section>
          <h2 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4">E. Rights of investors</h2>
          <ul className="list-disc pl-8 space-y-2 text-sm">
            <li>Right to Privacy and Confidentiality.</li>
            <li>Right to Transparent Practices.</li>
            <li>Right to Fair and Equitable Treatment.</li>
            <li>Right to Adequate Information.</li>
            <li>Right to Initial and Continuing Disclosure – Right to receive information about all the statutory and regulatory disclosures.</li>
            <li>Right to Fair & True Advertisement.</li>
            <li>Right to Awareness about Service Parameters and Turnaround Times.</li>
            <li>Right to be informed of the timelines for each service.</li>
            <li>Right to be Heard and Satisfactory Grievance Redressal.</li>
            <li>Right to have timely redressal.</li>
            <li>Right to Exit from financial product or service.</li>
            <li>Right to receive clear guidance and caution notice when dealing in complex and high-risk financial products and services.</li>
            <li>Additional rights to vulnerable consumers – right to get access to services in a suitable manner even if differently abled.</li>
            <li>Right to provide feedback on the financial products and services used.</li>
            <li>Right against coercive, unfair, and one-sided clauses in financial agreements.</li>
            <li>Right to enforceability and holding the Research Analyst responsible for monitoring and enforcing investor rights.</li>
          </ul>
        </section>

        {/* Section F */}
        <section>
          <h2 className="text-lg font-bold text-slate-800 border-b pb-2 mb-4">F. Expectations from the investors (Responsibilities of investors)</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
             {/* Do's */}
             <div className="bg-green-50 p-5 rounded-xl border border-green-200">
               <h3 className="font-bold text-green-800 mb-3 text-lg">Do's</h3>
               <ul className="list-disc pl-5 space-y-2 text-sm text-green-900">
                 <li>Always deal with SEBI registered Research Analyst.</li>
                 <li>Ensure that the Research Analyst has a valid registration certificate.</li>
                 <li>Check for SEBI registration number. Please refer to the list of all SEBI registered Research Analyst which is available on SEBI website in the following link: <a href="https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognisedFpi=yes&intmId=14" target="_blank" rel="noreferrer" className="underline break-all">https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognisedFpi=yes&intmId=14</a></li>
                 <li>Always pay attention towards disclosures made in the research reports before investing.</li>
                 <li>Pay your Research Analyst through banking channels only and maintain duly signed receipts mentioning the details of your payments. You may make payment of fees through Centralized Fee Collection Mechanism (CeFCoM) of RAASB if Research Analyst has opted for the mechanism.</li>
                 <li>Before buying / selling securities or applying in public offer, check for the research recommendation provided by your Research Analyst.</li>
                 <li>Ask all relevant questions and clear your doubts with your Research Analyst before acting on recommendation.</li>
                 <li>Seek clarifications and guidance on research recommendations from your Research Analyst, especially if it involves complex and high risk financial products and services.</li>
                 <li>Always be aware that you have the right to stop availing the service of a Research Analyst as per the terms of service agreed between you and your Research Analyst.</li>
                 <li>Always be aware that you have the right to provide feedback to your Research Analyst in respect of the services received.</li>
                 <li>Always be aware that you will not be bound by any clause, prescribed by the Research Analyst, which is contravening any regulatory provisions.</li>
                 <li>Inform SEBI about Research Analyst offering assured or guaranteed returns.</li>
               </ul>
             </div>
             
             {/* Don'ts */}
             <div className="bg-red-50 p-5 rounded-xl border border-red-200">
               <h3 className="font-bold text-red-800 mb-3 text-lg">Don'ts</h3>
               <ul className="list-disc pl-5 space-y-2 text-sm text-red-900">
                 <li>Do not provide funds for investment to the Research Analyst.</li>
                 <li>Don't fall prey to luring advertisements or market rumors.</li>
                 <li>Do not get attracted to limited period discount or other incentives, gifts, etc. offered by Research Analyst.</li>
                 <li>Do not share login credentials and passwords of your trading, demat or bank accounts with the Research Analyst.</li>
               </ul>
             </div>
          </div>
        </section>

      </div>
    </ComplianceLayout>
  );
};

export default InvestorCharter;