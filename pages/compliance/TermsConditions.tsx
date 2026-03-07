import React from 'react';
import ComplianceLayout from '../../components/ComplianceLayout';

const TermsConditions: React.FC = () => {
  const sebiRegNo = import.meta.env.VITE_SEBI_REG_NO || 'INH00000XXXX';

  return (
    <ComplianceLayout title="Terms & Conditions">
      <div className="space-y-8 text-slate-700">
        
        {/* Section 1 */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3 border-b pb-2">1. About Us</h2>
          <p className="text-sm leading-relaxed">
            KARAN VIJAYVARGIYA is a SEBI Registered Research Analyst entity bearing Registration No. {sebiRegNo}. Our website currently serves as an informational platform.
          </p>
        </section>

        {/* Section 2 */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3 border-b pb-2">2. Current Status of Services</h2>
          <div className="space-y-3 text-sm leading-relaxed">
            <p>As of now, we do not offer any research reports, investment recommendations, stock tips, buy/sell/hold calls, or any market-related paid or free services on this website.</p>
            <p>We are in the process of completing internal systems, compliance, and regulatory preparations.</p>
            <p>Our research services will be made available only after all processes are completed.</p>
          </div>
        </section>

        {/* Section 3 */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3 border-b pb-2">3. Future Services (Coming Soon)</h2>
          <p className="text-sm mb-3">In the future, we may offer the following services strictly within SEBI regulations:</p>
          <ul className="list-disc pl-6 space-y-1 text-sm mb-3">
            <li>Educational material related to financial markets</li>
            <li>Research analysis</li>
            <li>Market insights</li>
            <li>Subscription-based research reports</li>
          </ul>
          <p className="text-sm italic text-slate-500">Once these services are launched, updated Terms & Conditions will be published.</p>
        </section>

        {/* Section 4 */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3 border-b pb-2">4. No Advisory, No Assured Returns</h2>
          <p className="text-sm mb-3 font-semibold text-red-600">We do NOT provide:</p>
          <ul className="list-disc pl-6 space-y-1 text-sm mb-3">
            <li>Portfolio Management Services (PMS)</li>
            <li>Guaranteed / assured returns</li>
            <li>Profit commitments</li>
            <li>Risk-free advice</li>
            <li>Execution or trading/brokerage services</li>
          </ul>
          <p className="text-sm font-medium text-slate-800 bg-slate-100 p-3 rounded-md border border-slate-200">
            Investments in the securities market are subject to market risks.
          </p>
        </section>

        {/* Section 5 */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3 border-b pb-2">5. User Responsibilities</h2>
          <p className="text-sm mb-3 font-semibold">You must:</p>
          <ul className="list-disc pl-6 space-y-1 text-sm mb-3">
            <li>Be 18 years or older</li>
            <li>Use this website lawfully</li>
            <li>Not copy, misuse, or redistribute any content</li>
            <li>Not misrepresent our offerings</li>
          </ul>
          <p className="text-sm font-medium text-slate-800">
            You are solely responsible for your decisions related to any future services.
          </p>
        </section>

        {/* Section 6 */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3 border-b pb-2">6. Intellectual Property Rights</h2>
          <p className="text-sm leading-relaxed">
            All website content including text, graphics, logos, images, research concepts, and software is the property of Karan Vijayvargiya and cannot be used without permission.
          </p>
        </section>

        {/* Section 7 */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3 border-b pb-2">7. Payments and Refund Policy</h2>
          <p className="text-sm mb-3">If payments are collected for future services:</p>
          <ul className="list-disc pl-6 space-y-1 text-sm">
            <li>All payments are non-refundable, except where required by law</li>
            <li>No service is delivered at present</li>
            <li>Service delivery will begin only after official launch</li>
            <li>Payment processing is handled securely by Razorpay.</li>
          </ul>
        </section>

        {/* Section 8 */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3 border-b pb-2">8. Third-Party Tools</h2>
          <p className="text-sm leading-relaxed">
            We may use third-party services such as Razorpay, email automation platforms, analytics tools, etc. Each third party operates under its own policies.
          </p>
        </section>

        {/* Section 9 */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3 border-b pb-2">9. Limitation of Liability</h2>
          <p className="text-sm mb-3 font-semibold">We are not liable for:</p>
          <ul className="list-disc pl-6 space-y-1 text-sm mb-3">
            <li>Trading or investment losses</li>
            <li>Market fluctuations</li>
            <li>Decisions taken by users</li>
            <li>Technical or system failures</li>
            <li>Errors in external tools</li>
          </ul>
          <p className="text-sm font-medium text-slate-800 bg-slate-100 p-3 rounded-md border border-slate-200">
            Users understand that financial markets involve risk.
          </p>
        </section>

        {/* Section 10 */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3 border-b pb-2">10. Changes to Terms</h2>
          <p className="text-sm leading-relaxed">
            We may modify these Terms & Conditions anytime. Continued use of the website means acceptance of the updated terms.
          </p>
        </section>

        {/* Section 11 */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3 border-b pb-2">11. Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-2">Principal Officer</h3>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium text-slate-600">Name:</span> Karan Vijayvargiya</p>
                <p><span className="font-medium text-slate-600">Email:</span> <a href="mailto:ra@karanvijayvargiya.com" className="text-brand-600 hover:underline">ra@karanvijayvargiya.com</a></p>
                <p><span className="font-medium text-slate-600">Phone:</span> +91 89592 22227</p>
              </div>
            </div>
            
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <h3 className="font-bold text-slate-800 mb-2">Grievance / Compliance / Accessibility Officer</h3>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium text-slate-600">Name:</span> Karan Vijayvargiya</p>
                <p><span className="font-medium text-slate-600">Email:</span> <a href="mailto:ra@karanvijayvargiya.com" className="text-brand-600 hover:underline">ra@karanvijayvargiya.com</a></p>
                <p><span className="font-medium text-slate-600">Phone:</span> +91 89592 22227</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </ComplianceLayout>
  );
};

export default TermsConditions;