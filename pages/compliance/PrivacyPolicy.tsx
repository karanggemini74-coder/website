import React from 'react';
import ComplianceLayout from '../../components/ComplianceLayout';

const PrivacyPolicy: React.FC = () => {
  return (
    <ComplianceLayout title="Privacy Policy">
      <div className="space-y-8 text-slate-700">
        
        <p className="text-sm leading-relaxed mb-6">
          Your privacy is very important to us. Accordingly, we have developed this Policy in order for you to understand how we collect, use, communicate and disclose and make use of personal information. The following outlines our privacy policy.
        </p>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3 border-b pb-2">GENERAL PRIVACY</h2>
          <p className="text-sm leading-relaxed mb-3">
            Like most Websites Karan Vijayvargiya collects non-personally-identifying information of the sort that web browsers and servers typically make available, such as the browser type, language preference, referring site, and the date and time of each visitor request.
          </p>
          <p className="text-sm leading-relaxed mb-3">
            www.karanvijayvargiya.com also collects potentially personally-identifying information like Internet Protocol (IP) addresses for security reasons.
          </p>
          <p className="text-sm leading-relaxed">
            Karan Vijayvargiya does not disclose personally-identifying information other than as described below. Visitors can always refuse to supply personally-identifying information, with the caveat that it may prevent them from engaging in certain website-related activities.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3 border-b pb-2">PROTECTION OF CERTAIN PERSONALLY-IDENTIFYING INFORMATION</h2>
          <p className="text-sm leading-relaxed mb-3">
            Karan Vijayvargiya discloses potentially personally-identifying and personally-identifying information only to those of its employees, contractors and affiliated organizations that (i) need to know that information in order to process it on Karan Vijayvargiya’ behalf or to provide services available at Karan Vijayvargiya’ websites, and (ii) that have agreed not to disclose it to others. Karan Vijayvargiya will not rent or sell potentially personally-identifying and personally-identifying information to anyone.
          </p>
          <p className="text-sm leading-relaxed">
            If you are a registered user of Karan Vijayvargiya website and have supplied your email address, Karan Vijayvargiya may occasionally send you an email, WhatsApp, Telegram to tell you about new features, solicit your feedback, or just keep you up to date with what’s going on with Karan Vijayvargiya and our products. Karan Vijayvargiya takes all measures reasonably necessary to protect against the unauthorized access, use, alteration or destruction of potentially personally-identifying and personally-identifying information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3 border-b pb-2">COOKIES</h2>
          <p className="text-sm leading-relaxed">
            A cookie is a string of information that a website stores on a visitor’s computer, and that the visitor’s browser provides to the website each time the visitor returns. Karan Vijayvargiya uses cookies to help Karan Vijayvargiya identify and track visitors, their usage of Karan Vijayvargiya website, and their website access preferences. Karan Vijayvargiya visitors who do not wish to have cookies placed on their computers should set their browsers to refuse cookies before using Karan Vijayvargiya’ websites, with the drawback that certain features of Karan Vijayvargiya’ websites may not function properly without the aid of cookies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3 border-b pb-2">PRIVACY POLICY CHANGES</h2>
          <p className="text-sm leading-relaxed">
            Although most changes are likely to be minor, Karan Vijayvargiya may change its Privacy Policy from time to time, and in Karan Vijayvargiya’ sole discretion. Karan Vijayvargiya encourages visitors to frequently check this page for any changes to its Privacy Policy. Your continued use of this site after any change in this Privacy Policy will constitute your acceptance of such change.
          </p>
        </section>

      </div>
    </ComplianceLayout>
  );
};

export default PrivacyPolicy;