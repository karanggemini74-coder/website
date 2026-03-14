import React from 'react';
import ComplianceLayout from '../../components/ComplianceLayout';

const Disclaimer: React.FC = () => {
  return (
    <ComplianceLayout title="Disclaimer">
      <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-8 text-sm text-red-800">
        <strong>This disclaimer is applicable to the services provided and advice/research offered by Karan Vijayvargiya.</strong> By accessing the website, you acknowledge that you understand and agree to the points in this disclaimer.
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">1. About Us</h2>
          <p>Karan Vijayvargiya (hereinafter referred to as "Research Analyst", "we", "our", "us") is registered with SEBI as a Research Analyst under the provisions of SEBI (Research Analysts) Regulations, 2014.</p>
          <p className="mt-2 text-sm"><strong>SEBI Registration No.:</strong> INH000025470 | <strong>Validity:</strong> Valid till XX-XX-XXXX | <strong>Type:</strong> Individual</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">2. Current Scope of Services</h2>
          <p>As of now, the scope of services provided by Karan Vijayvargiya, SEBI Reg. No.: INH000025470 (Validity of Certificate not mentioned as per the requirement):</p>
          <p className="mt-2">As of now, the scope of services we offer to both website visitors and office visit:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Conducting equity research and technical analysis</li>
            <li>Providing buy/sell/hold recommendations</li>
            <li>Publishing research reports and market insights</li>
            <li>Stock recommendations and portfolio guidance</li>
            <li>Investment advisory services</li>
            <li>Educational courses on investing and trading</li>
            <li>Market updates and analysis (Coming soon)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">3. No Investment Advice</h2>
          <p>Nothing on this website or in our research reports should be construed as:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>An offer to buy or sell any securities</li>
            <li>A solicitation to invest in any particular stock or security</li>
            <li>Investment advice tailored to your specific financial situation</li>
            <li>A guarantee of profits or returns</li>
            <li>Tax, legal, or accounting advice</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">4. No Guarantee / No Assured Returns</h2>
          <p>We do NOT guarantee:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Profits or returns of any kind</li>
            <li>Accuracy or completeness of research reports</li>
            <li>Success of any investment recommendation</li>
            <li>Protection from market losses or volatility</li>
            <li>Suitability of recommendations for your risk profile</li>
          </ul>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4 text-sm">
            <strong>Important:</strong> SEBI registration does not guarantee performance, profits, or protection from losses. It only certifies regulatory compliance.
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">5. Market Risks</h2>
          <p><strong>Stock market investments are subject to market risks.</strong> Read all research documents, disclosures, and risk warnings carefully before investing.</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li><strong>Market Volatility:</strong> Stock prices can fluctuate rapidly and unpredictably</li>
            <li><strong>Economic Factors:</strong> Global events, policy changes, and economic conditions affect markets</li>
            <li><strong>Company Performance:</strong> Individual stock performance depends on company fundamentals and management</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">6. Research Analyst Disclosure</h2>
          <p>I, Karan Vijayvargiya (SEBI Registered Research Analyst - Reg. No.: INH000025470), hereby disclose:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>I may or may not have positions in the stocks recommended in research reports. Any personal holdings will be disclosed in individual research reports.</li>
            <li>I do not receive any compensation from companies covered in research reports (other than subscription fees from clients).</li>
            <li>All research is conducted independently based on publicly available information and proprietary analysis.</li>
            <li>No conflict of interest exists at the time of publication.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">7. Responsibility of Users</h2>
          <p>As a user/investor, you are solely responsible for:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Conducting your own due diligence before making investment decisions</li>
            <li>Evaluating risks and suitability based on your financial situation</li>
            <li>Consulting with your financial advisor, tax consultant, or legal advisor</li>
            <li>Understanding that past performance is not indicative of future results</li>
            <li>Any losses or damages arising from investment decisions</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">8. Market Risk Warning</h2>
          <p>Investment in the stock market involves substantial risks, including but not limited to:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Loss of principal amount invested</li>
            <li>Market volatility and price fluctuations</li>
            <li>Liquidity risks (inability to sell securities quickly)</li>
            <li>Interest rate risks and currency risks</li>
          </ul>
           <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-4 text-sm text-red-800">
            <strong>RISK WARNING:</strong> You may lose part or all of your invested capital. Do not invest money you cannot afford to lose.
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">9. Accuracy of Information</h2>
          <p>While we strive to provide accurate and up-to-date information, we cannot guarantee the accuracy, completeness, or timeliness of the content on this website or in research reports.</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Information is based on publicly available data, which may be outdated or incorrect</li>
            <li>Market conditions change rapidly, and research may become outdated</li>
            <li>We are not liable for any errors, omissions, or inaccuracies</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">10. No Liability</h2>
          <p>We shall not be liable for any direct, indirect, incidental, or consequential damages arising from:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Use of our website, services, or research reports</li>
            <li>Investment decisions made based on our recommendations</li>
            <li>Market losses, volatility, or adverse price movements</li>
            <li>Errors, omissions, or delays in research reports</li>
            <li>Technical issues, website downtime, or interruptions</li>
          </ul>
          <p className="mt-2">Your use of our services is entirely at your own risk. We assume no responsibility for your investment outcomes.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">11. Third-Party Links</h2>
          <p>Our website may contain links to third-party websites or resources. We do not endorse, control, or assume responsibility for:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Content, accuracy, or privacy policies of third-party websites</li>
            <li>Any transactions or interactions with third parties</li>
            <li>Losses arising from third-party services or products</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">12. Communication & SMS Disclaimer</h2>
          <p>By subscribing to our services, you consent to receive research reports, stock recommendations, and other investment-related information via email or SMS (if applicable).</p>
          <p className="mt-2 text-sm">You may opt-out at any time by contacting us at <a href="mailto:ra@karanvijayvargiya.com" className="text-brand-600">ra@karanvijayvargiya.com</a>.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">13. No Guaranteed Price-Return</h2>
          <p>We do not and cannot guarantee any specific price targets or returns on recommended stocks or securities.</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
             <li>All target prices are estimates based on available information and may not be achieved</li>
             <li>Market conditions can change rapidly, affecting stock performance</li>
             <li>Past recommendations' performance does NOT guarantee future success</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">14. Changes to this Disclaimer</h2>
          <p>We reserve the right to modify this disclaimer at any time without prior notice. Updated disclaimers will be posted on this page. Continued use of our services constitutes acceptance of the revised disclaimer.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">15. Contact Information</h2>
          <p>If you have any questions or concerns regarding this disclaimer, please contact us:</p>
          <div className="bg-slate-50 p-4 rounded-lg mt-4 text-sm">
            <p className="font-bold">Karan Vijay Vargiya (SEBI Registered Research Analyst)</p>
            <p><strong>SEBI Registration No.:</strong> INH000025470</p>
            <p><strong>Email:</strong> <a href="mailto:ra@karanvijayvargiya.com" className="text-brand-600">ra@karanvijayvargiya.com</a></p>
            <p><strong>Phone:</strong> +91 89592 22227</p>
            <p><strong>Address:</strong> Office 101, 654 Shyam Aashrey, Scheme No 114, Part 2, Vijaynagar, Indore, Madhya Pradesh - 452010</p>
            <p><strong>Website:</strong> www.karanvijayvargiya.com</p>
          </div>
        </section>
      </div>
    </ComplianceLayout>
  );
};

export default Disclaimer;