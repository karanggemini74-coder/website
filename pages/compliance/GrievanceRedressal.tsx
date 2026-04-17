import React from 'react';
import ComplianceLayout from '../../components/ComplianceLayout';

const GrievanceRedressal: React.FC = () => {
  return (
    <ComplianceLayout title="Grievance Redressal Policy">
      <div className="space-y-6 text-slate-700">
        <h2 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">REDRESSAL OF GRIEVANCE</h2>
        <p className="text-sm leading-relaxed mb-4">
          Here are the steps a client can follow in case of grievance or feedback:
        </p>

        <ol className="list-decimal pl-6 space-y-4 text-sm leading-relaxed">
          <li>
            If you are not satisfied with our services and would like to lodge a complaint, we would request you to first talk to our representative / consultant from the Research Analyst Department who is your point of contact. You can discuss with him / her, and be rest assured that your complaint will be resolved on best efforts within 1 to 7 working days.
          </li>
          <li>
            You can also email or talk to the representative / consultant via telephone. The contact no. is 8959222227
          </li>
          <li>
            Alternatively, you can send us a complaint in writing or via email on <a href="mailto:karanvijayvargiya29@gmail.com" className="text-brand-600 hover:underline">karanvijayvargiya29@gmail.com</a>
          </li>
          <li>
            We will try to resolve your complaint within 1 to7 working days. The first step is for us to be clear about the nature of your complaint, and to identify what we can do to resolve the issue. When we have finished our investigations into your complaint, we will be in touch to provide you with a full response to your complaint.
          </li>
          <li>
            If you are not still not satisfied with the response or the handling of your complaint by our representative / consultant, you can approach and write an email to Karan Vijayvargiya at <a href="mailto:karanvijayvargiya29@gmail.com" className="text-brand-600 hover:underline">karanvijayvargiya29@gmail.com</a> with complete details. Karan Vijayvargiya will get in touch with you at the earliest and try to resolve your complaint as soon as possible.
          </li>
          <li>
            <p>If your complaint is not resolved within a period of one month, you may refer your complaint to the regulator - The Securities and Exchange Board of India (SEBI).</p>
            <p className="mt-2">SEBI has launched a centralized web based complaints redress system 'SCORES'.</p>
            <p className="mt-2">The link to the platform is <a href="https://scores.gov.in/scores/complaintRegister.html#" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">https://scores.gov.in/scores/complaintRegister.html#</a></p>
          </li>
          <li>
            If your complaint is not resolved on SCORES portal, you can start the dispute resolution process through the ODR Portal. The link for the platform is <a href="https://smartodr.in/login" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">https://smartodr.in/login</a>.
          </li>
        </ol>
      </div>
    </ComplianceLayout>
  );
};

export default GrievanceRedressal;