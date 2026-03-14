import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import Logo from './Logo';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Mission', path: '/mission' },
    { label: 'Founder', path: '/founder' },
    { label: 'Services', path: '/services' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const complianceLinks = [
    { label: 'Complaint Status', path: '/compliance/complaints-status' },
    { label: 'Investor Charter', path: '/compliance/investor-charter' },
    { label: 'Grievance Redressal Policy', path: '/compliance/grievance-redressal' },
    { label: 'Terms & Condition', path: '/compliance/terms-conditions' },
    { label: 'Privacy Policy', path: '/compliance/privacy-policy' },
    { label: 'Disclaimer', path: '/compliance/disclaimer' },
    { label: 'Mandatory Disclosures', path: '/compliance/standard-disclosures' },
    { label: 'Nodal Officer', path: '/compliance/nodal-officer' },
    { label: 'Audit Report', path: '/compliance/audit-status' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <Logo className="h-10 w-10 transition-transform group-hover:scale-105" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-brand-700 tracking-tight leading-none">Karan Vijayvargiya</span>
                <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">SEBI Registered Research Analyst</span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive(link.path) ? 'text-brand-600' : 'text-slate-600 hover:text-brand-600'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Compliance Dropdown */}
            <div className="relative group">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center text-sm font-medium text-slate-600 hover:text-brand-600 focus:outline-none py-4"
              >
                Compliance <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute right-0 w-64 bg-white rounded-md shadow-lg py-1 border border-slate-100 ring-1 ring-black ring-opacity-5 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                {complianceLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-600"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-full bg-brand-600 text-white text-sm font-semibold hover:bg-brand-700 transition-colors shadow-sm"
            >
              Contact
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-brand-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 max-h-[80vh] overflow-y-auto">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-brand-600'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="px-3 py-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Compliance</p>
              <div className="space-y-1 pl-2 border-l-2 border-slate-100">
                {complianceLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 text-sm font-medium text-slate-600 hover:text-brand-600"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center mt-4 px-5 py-3 rounded-md bg-brand-600 text-white font-semibold"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;