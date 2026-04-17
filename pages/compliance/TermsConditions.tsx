import React from 'react';
import ComplianceLayout from '../../components/ComplianceLayout';

const TermsConditions: React.FC = () => {
  return (
    <ComplianceLayout title="Terms & Conditions">
      <div className="space-y-8 text-slate-700">
        
        <p className="text-sm leading-relaxed mb-6">
          These terms and conditions outline the rules and regulations for the use of www.karanvijayvargiya.com
        </p>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3 border-b pb-2">1. TERMS</h2>
          <p className="text-sm leading-relaxed">
            By accessing this website you are agreeing to be bound by these terms and conditions. Do not continue to use if you do not agree to take all of the terms and conditions stated on this page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3 border-b pb-2">2. USE LICENSE</h2>
          <p className="text-sm leading-relaxed mb-2">
            A. Permission is granted to temporarily download one copy of the materials (information) on Karan Vijayvargiya web site for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul className="list-[lower-roman] pl-6 space-y-1 text-sm">
            <li>Modify or copy the materials;</li>
            <li>Use the materials for any commercial purpose, or for any public display (commercial or non-commercial)</li>
            <li>Attempt to decompile or reverse engineer any software contained on Karan Vijayvargiya web site</li>
            <li>Remove any copyright or other proprietary notations from the materials or</li>
            <li>Transfer the materials to another person or “mirror” the materials on any other server.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3 border-b pb-2">3. DISCLAIMERS AND DISCLOSURES</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>Investment in securities market is subject to market risks. Read all the related documents carefully before investing.</li>
            <li>Market Risks refer to partial or permanent loss on your investments in certain market conditions.</li>
            <li>Registration granted by SEBI and certification from NISM in no way guarantees the performance of the intermediary or provide any assurance of returns to investors.</li>
            <li>We do not promise any guaranteed returns.</li>
            <li>The fees paid towards the subscription is non-refundable.</li>
            <li>Risk management and position sizing should be carried out by the investor himself.</li>
            <li>Recommendations will be provided via Telegram or WhatsApp.</li>
            <li>Karan Vijayvargiya is a SEBI registered ‘Research Analyst’ not ‘Investment advisor’. We are registered as an RA vide registration number INH000025470 on 13/03/2026</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3 border-b pb-2">4. LIMITATIONS</h2>
          <p className="text-sm leading-relaxed">
            In no event shall Karan Vijayvargiya or its suppliers be liable for any damages (including, without limitation, damages for loss or profit, monetary and/or non monetary,) arising out of the use or inability to use the materials communicated by Karan Vijayvargiya and its Employees.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3 border-b pb-2">5. REVISIONS AND ERRATA</h2>
          <p className="text-sm leading-relaxed">
            The materials appearing on Karan Vijayvargiya web site could include technical, typographical, or photographic errors. Karan Vijayvargiya does not warrant that any of the materials on its web site are accurate, complete, or current.Karan Vijayvargiya may make changes to the materials contained on its web site at any time without notice.Karan Vijayvargiya does not, however, make any commitment to update the materials.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3 border-b pb-2">6. LINKS</h2>
          <p className="text-sm leading-relaxed">
            Karan Vijayvargiya has not reviewed all of the sites linked to its Internet web site and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Karan Vijayvargiya of the site. Use of any such linked web site is at the user own risk.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3 border-b pb-2">7. SITE TERMS OF USE MODIFICATIONS</h2>
          <p className="text-sm leading-relaxed">
            Karan Vijayvargiya may revise these terms of use for its web site at any time without notice. By using this web site you are agreeing to be bound by the then current version of these Terms of Use.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3 border-b pb-2">8. REMOVAL OF LINKS FROM OUR WEBSITE</h2>
          <p className="text-sm leading-relaxed mb-3">
            If you find any link on our website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.
          </p>
          <p className="text-sm leading-relaxed">
            We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3 border-b pb-2">9. RESERVATION OF RIGHTS</h2>
          <p className="text-sm leading-relaxed">
            We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it’s linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3 border-b pb-2">10. GOVERNING LAW</h2>
          <p className="text-sm leading-relaxed mb-6">
            Any claim relating to Karan Vijayvargiya web site shall be governed by the Indian laws, without regard to its conflict of law provisions.
          </p>
          <p className="text-sm leading-relaxed italic text-slate-600">
            General Terms and Conditions applicable to Use of a Website.
          </p>
        </section>

      </div>
    </ComplianceLayout>
  );
};

export default TermsConditions;