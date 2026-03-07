import React from 'react';
import ComplianceLayout from '../../components/ComplianceLayout';

const PrivacyPolicy: React.FC = () => {
  return (
    <ComplianceLayout title="Privacy Policy">
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-8 text-sm">
        This Privacy Policy describes how <strong>Karan Vijayvargiya (SEBI Registered Research Analyst)</strong> ("Company", "we", "our", "us") collects, uses, stores, and protects personal information of our users and clients.
        <br/><br/>
        By accessing or using our website, you agree to be bound by our Privacy Policy.
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">1. Information We Collect</h2>
          <p>We may collect the following types of information when you use our website or services:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong>Personal Data:</strong> Name, email address, phone number, date of birth, PAN card details, Aadhaar information</li>
            <li><strong>Financial Data:</strong> Bank account details, demat account information (for KYC purposes)</li>
            <li><strong>Usage Data:</strong> IP address, browser type, device information, pages visited, time spent on pages</li>
            <li><strong>Communication Data:</strong> Emails, messages, feedback, and queries sent to us</li>
            <li><strong>Payment Information:</strong> Transaction details, payment method (processed securely via third-party payment gateways)</li>
            <li><strong>Investment Preferences:</strong> Risk profile, investment goals, trading experience</li>
          </ul>
          <p className="text-xs italic mt-2 text-slate-500">Note: We only collect information that is necessary to provide our research and advisory services in compliance with SEBI regulations.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">2. How We Use Your Information</h2>
          <p>We use your personal information for the following purposes:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>To provide access to our research reports and advisory services</li>
            <li>To process subscription payments and manage billing</li>
            <li>To verify your identity and complete KYC (Know Your Customer) requirements as mandated by SEBI</li>
            <li>To send research reports, stock recommendations, and market insights</li>
            <li>To communicate service updates, changes, and important notices</li>
            <li>To improve our website, services, and user experience</li>
            <li>To respond to your queries, complaints, and support requests</li>
            <li>To comply with legal and regulatory obligations</li>
            <li>To prevent fraud, unauthorized access, and security threats</li>
          </ul>
          <p className="mt-2 text-sm">We will never sell, rent, or lease your personal information to third parties for marketing purposes.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">3. Payment Information</h2>
          <p>We use third-party payment processors to handle subscription payments. Your payment information (credit/debit card, UPI, net banking) is processed directly by these payment gateways and is NOT stored on our servers.</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
             <li><strong>Payment Processors:</strong> Razorpay, PayU, or similar PCI-DSS compliant gateways</li>
             <li><strong>Stored Data:</strong> We only store transaction IDs and payment status for billing records</li>
             <li><strong>Security:</strong> All payment transactions are encrypted using SSL/TLS technology</li>
          </ul>
          <p className="mt-2 text-sm">For refund policies, please refer to our Terms & Conditions.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">4. Cookies and Tracking Technologies</h2>
          <p>We use cookies and similar tracking technologies to:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Keep you logged in during your session</li>
            <li>Remember your preferences and settings</li>
            <li>Analyze website traffic and user behavior using Google Analytics</li>
            <li>Improve website performance and user experience</li>
          </ul>
          <p className="font-semibold mt-2">Types of Cookies We Use:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Essential Cookies:</strong> Required for website functionality (login, security)</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
            <li><strong>Performance Cookies:</strong> Improve website speed and performance</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">5. Sharing of Information</h2>
          <p>We do NOT sell, trade, or rent your personal information. However, we may share information in the following circumstances:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong>With SEBI/Regulators:</strong> When required by law or regulatory authorities</li>
            <li><strong>With Service Providers:</strong> Third-party vendors who assist with payment processing, email services, hosting, and analytics (subject to strict confidentiality agreements)</li>
            <li><strong>Legal Compliance:</strong> To comply with court orders, legal processes, or government requests</li>
            <li><strong>Business Transfers:</strong> In case of merger, acquisition, or sale of assets (you will be notified)</li>
          </ul>
          <p className="mt-2 text-sm">All third-party service providers are contractually obligated to keep your information secure and confidential.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">6. Data Security</h2>
          <p>We take data security seriously. We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, or misuse.</p>
          <p className="font-semibold mt-2">Security Measures:</p>
          <ul className="list-disc pl-5 space-y-1">
             <li>SSL/TLS encryption for data transmission</li>
             <li>Secure servers with firewall protection</li>
             <li>Regular security audits and vulnerability assessments</li>
             <li>Access controls and password protection</li>
             <li>Data backup and disaster recovery procedures</li>
          </ul>
           <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4 text-sm">
            <strong>Important:</strong> While we use reasonable security measures, no method of transmission over the internet is 100% secure. You are responsible for keeping your login credentials confidential.
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">7. Your Rights</h2>
          <p>You have the following rights regarding your personal data:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
             <li><strong>Right to Access:</strong> You can request a copy of the personal information we hold about you</li>
             <li><strong>Right to Rectification:</strong> You can update or correct inaccurate information</li>
             <li><strong>Right to Deletion:</strong> You can request deletion of your data (subject to legal/regulatory retention requirements)</li>
             <li><strong>Right to Withdraw Consent:</strong> You can withdraw consent for data processing at any time</li>
             <li><strong>Right to Data Portability:</strong> You can request your data in a machine-readable format</li>
             <li><strong>Right to Object:</strong> You can object to certain types of data processing</li>
          </ul>
          <p className="mt-2 text-sm">To exercise any of these rights, contact us at <a href="mailto:ra@karanvijayvargiya.com" className="text-brand-600">ra@karanvijayvargiya.com</a>.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">8. External Links</h2>
          <p>Our website may contain links to third-party websites, tools, or services (e.g., SEBI website, payment gateways, social media platforms). We are not responsible for the privacy practices of these external sites.</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>We do not control third-party websites or their content</li>
            <li>Third-party sites have their own privacy policies</li>
            <li>We encourage you to review privacy policies of any external websites you visit</li>
          </ul>
          <p className="mt-2 text-sm">By clicking on external links, you are leaving our website and interacting with a third party at your own risk.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">9. Changes to this Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or services. Any updates will be posted on this page with a revised "Last Updated" date.</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong>Major Changes:</strong> We will notify you via email or website banner for significant policy changes</li>
            <li><strong>Minor Updates:</strong> Continued use of our services after updates constitutes acceptance of the revised policy</li>
            <li><strong>Review Regularly:</strong> We recommend reviewing this page periodically to stay informed</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">10. Contact Information</h2>
          <p>If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your personal information, please contact us:</p>
           <div className="bg-slate-50 p-4 rounded-lg mt-4 text-sm">
            <p className="font-bold">Karan Vijay Vargiya (SEBI Registered Research Analyst)</p>
            <p><strong>SEBI Registration No.:</strong> INH00000XXXXX</p>
            <p><strong>Email:</strong> <a href="mailto:ra@karanvijayvargiya.com" className="text-brand-600">ra@karanvijayvargiya.com</a></p>
            <p><strong>Phone:</strong> +91 89592 22227</p>
            <p><strong>Address:</strong> Office 101, 654 Shyam Aashrey, Scheme No 114, Part 2, Vijaynagar, Indore, Madhya Pradesh - 452010</p>
          </div>
        </section>
      </div>
    </ComplianceLayout>
  );
};

export default PrivacyPolicy;