import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Twitter, Linkedin, AtSign } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'ra@karanvijayvargiya.com';
  const contactPhone = import.meta.env.VITE_CONTACT_PHONE || '+91 89592 22227';
  const sebiRegNo = import.meta.env.VITE_SEBI_REG_NO || 'INH000025470';
  const officeAddress = import.meta.env.VITE_OFFICE_ADDRESS || 'Office 101, 654 Shyam Aashrey, Scheme No 114, Part 2, Vijaynagar, Indore, Madhya Pradesh - 452010';

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800 font-sans">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & Disclaimer */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <Logo className="h-8 w-8" />
              <h3 className="text-white text-lg font-bold group-hover:text-brand-400 transition-colors">Karan Vijayvargiya</h3>
            </Link>
            <div className="text-sm text-slate-400 mb-4 leading-relaxed space-y-1">
              <p><span className="font-semibold text-slate-300">Registered Name:</span> Karan Vijayvargiya</p>
              <p><span className="font-semibold text-slate-300">SEBI Reg. No:</span> {sebiRegNo}</p>
              <p className="text-xs mt-2">SEBI Registered Research Analyst providing transparent, research-driven investment insights.</p>
            </div>
            <div className="flex flex-wrap gap-4">
               <a href="https://www.instagram.com/karanvijayvargiya2/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-pink-500 transition-colors" aria-label="Instagram"><Instagram size={20} /></a>
               <a href="https://www.facebook.com/karanvijayvargiya2/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-500 transition-colors" aria-label="Facebook"><Facebook size={20} /></a>
               <a href="https://www.youtube.com/@karanvijayvargiya1" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-red-500 transition-colors" aria-label="YouTube"><Youtube size={20} /></a>
               <a href="https://x.com/karanvv" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-200 transition-colors" aria-label="Twitter"><Twitter size={20} /></a>
               <a href="https://www.linkedin.com/in/karan-vijayvargiya-5b463485/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors" aria-label="LinkedIn"><Linkedin size={20} /></a>
               <a href="https://www.threads.com/@karanvijayvargiya2" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-200 transition-colors" aria-label="Threads"><AtSign size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-brand-400 transition-colors">Home</Link></li>
              <li><Link to="/mission" className="hover:text-brand-400 transition-colors">About</Link></li>
              <li><Link to="/services" className="hover:text-brand-400 transition-colors">Services</Link></li>
              <li><Link to="/founder" className="hover:text-brand-400 transition-colors">Founders</Link></li>
            </ul>
          </div>

          {/* Compliance */}
          <div>
            <h4 className="text-white font-semibold mb-4">Compliance</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/compliance/complaints-status" className="hover:text-brand-400 transition-colors">Complaint Status</Link></li>
              <li><Link to="/compliance/investor-charter" className="hover:text-brand-400 transition-colors">Investor Charter</Link></li>
              <li><Link to="/compliance/grievance-redressal" className="hover:text-brand-400 transition-colors">Grievance Redressal Policy</Link></li>
              <li><Link to="/compliance/terms-conditions" className="hover:text-brand-400 transition-colors">Terms & Condition</Link></li>
              <li><Link to="/compliance/privacy-policy" className="hover:text-brand-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/compliance/disclaimer" className="hover:text-brand-400 transition-colors">Disclaimer</Link></li>
              <li><Link to="/compliance/standard-disclosures" className="hover:text-brand-400 transition-colors">Mandatory Disclosures</Link></li>
              <li><Link to="/compliance/nodal-officer" className="hover:text-brand-400 transition-colors">Nodal Officer</Link></li>
              <li><Link to="/compliance/audit-status" className="hover:text-brand-400 transition-colors">Audit Report</Link></li>
            </ul>
          </div>

          {/* Contact - STRICT COMPLIANCE */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Details</h4>
            <div className="text-sm space-y-3 text-slate-400">
              <div>
                <p className="text-xs uppercase font-semibold text-slate-500">Email</p>
                <a href={`mailto:${contactEmail}`} className="hover:text-brand-400 text-white">{contactEmail}</a>
              </div>
              <div>
                <p className="text-xs uppercase font-semibold text-slate-500">Phone</p>
                <p className="text-white">{contactPhone}</p>
              </div>
              <div>
                <p className="text-xs uppercase font-semibold text-slate-500">Registered Address</p>
                <p>{officeAddress}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory Disclaimer Bar */}
        <div className="border-t border-slate-800 pt-8 mt-8">
          <div className="bg-slate-800 rounded-lg p-6 mb-8 text-[11px] text-slate-400 leading-relaxed text-justify">
            <p className="font-bold text-slate-200 mb-2 uppercase">Statutory Disclaimer</p>
            <p className="mb-2">
              Registration granted by SEBI, membership of BASL (in case of IAs) and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.
            </p>
            <p className="mb-2">
              Investment in securities market are subject to market risks. Read all the related documents carefully before investing.
            </p>
            <p>
              The securities quoted are for illustration only and are not recommendatory.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} Karan Vijayvargiya. All rights reserved. | SEBI Registered Research Analyst ({sebiRegNo})</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link to="/compliance/privacy-policy" className="hover:text-white">Privacy Policy</Link>
              <Link to="/compliance/terms-conditions" className="hover:text-white">Terms & Conditions</Link>
              <Link to="/compliance/disclaimer" className="hover:text-white">Disclaimer</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;