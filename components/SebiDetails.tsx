import React from 'react';

const SebiDetails: React.FC = () => {
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'ra@karanvijayvargiya.com';
  const contactPhone = import.meta.env.VITE_CONTACT_PHONE || '+91 89592 22227';
  const sebiRegNo = import.meta.env.VITE_SEBI_REG_NO || 'INH000025470';
  const officeAddress = import.meta.env.VITE_OFFICE_ADDRESS || 'Office 101, 654 Shyam Aashrey, Scheme No 114, Part 2, Vijaynagar, Indore, Madhya Pradesh - 452010';

  return (
    <div className="bg-[#f0f6ff] rounded-2xl p-8 mt-12 mb-12">
      <h3 className="font-bold text-blue-600 mb-4 text-base">SEBI Registered Research Analyst Details:</h3>
      <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
        <p><strong>Registered Name:</strong> KARAN VIJAY VARGIYA | <strong>Type:</strong> Individual | <strong>Registration No.:</strong> {sebiRegNo} | <strong>Validity:</strong> August 22, 2025 - Perpetual</p>
        <p><strong>Registered Office Address:</strong> {officeAddress}</p>
        <p><strong>Tel:</strong> {contactPhone} | <strong>Email:</strong> {contactEmail} | <strong>Enlistment Number (if applicable):</strong> 6728</p>
        <p className="pt-2"><strong>Disclaimer:</strong> Investments in securities market are subject to market risks. Read all the related documents carefully before investing. Registration granted by SEBI, membership of BASL and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors. The securities quoted anywhere on website is just to showcase our working methodology and not neither meant for Past performance nor for recommendation <a href="#" className="underline">Read More</a></p>
        <p className="pt-1"><a href="https://www.sebi.gov.in" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">SEBI Website Link for Verifying the SEBI Registration Details</a></p>
      </div>
    </div>
  );
};

export default SebiDetails;