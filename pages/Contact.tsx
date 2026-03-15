import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Shield, Facebook, Instagram, Youtube, Gavel, ExternalLink, Twitter, Linkedin, AtSign } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import SEO from '../components/SEO';

const Contact: React.FC = () => {
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'ra@karanvijayvargiya.com';
  const contactPhone = import.meta.env.VITE_CONTACT_PHONE || '+91 89592 22227';
  const sebiRegNo = import.meta.env.VITE_SEBI_REG_NO || 'INH000025470';
  const officeAddress = import.meta.env.VITE_OFFICE_ADDRESS || 'Office 101, 654 Shyam Aashrey, Scheme No 114, Part 2, Vijaynagar, Indore, Madhya Pradesh - 452010';

  return (
    <div className="bg-slate-50 min-h-screen pt-12 pb-24">
      <SEO 
        title="Contact Us" 
        description="Get in touch with Karan Vijayvargiya for expert investment guidance. Reach out via email, phone, or visit our office in Indore."
        keywords="contact research analyst, investment consultation, stock market advisory contact, Indore stock analyst"
      />
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Contact Information</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">Have questions? We're here to help. Reach out through any of the following channels.</p>
        </div>

        {/* HIGHLIGHTED GRIEVANCE OFFICER SECTION - Moved to top for better layout */}
        <div className="max-w-5xl mx-auto mb-16">
             <div className="bg-red-50 p-6 md:p-8 rounded-xl border border-red-200 shadow-md flex flex-col md:flex-row items-start md:items-center gap-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-red-100 rounded-full -mr-10 -mt-10 opacity-50"></div>
               
               <div className="bg-red-100 p-4 rounded-full text-red-600 z-10">
                   <Gavel size={32} />
               </div>
               
               <div className="flex-grow z-10">
                   <h3 className="font-bold text-red-900 text-xl mb-2">Grievance Redressal</h3>
                   <div className="flex flex-col md:flex-row gap-2 md:gap-8 text-sm text-red-800">
                       <p><span className="font-semibold text-red-900">Officer:</span> Karan Vijay Vargiya</p>
                       <p><span className="font-semibold text-red-900">Phone:</span> {contactPhone}</p>
                   </div>
                   <p className="text-sm text-red-800 mt-1"><span className="font-semibold text-red-900">Email:</span> <a href={`mailto:${contactEmail}`} className="underline hover:text-red-950 font-bold">{contactEmail}</a></p>
               </div>
               
               <div className="z-10 w-full md:w-auto border-t md:border-t-0 md:border-l border-red-200 pt-4 md:pt-0 md:pl-6">
                  <p className="text-[10px] text-red-700 mb-3 font-bold uppercase tracking-wider">Lodge a Complaint</p>
                  <div className="flex flex-wrap gap-3">
                       <a href="https://scores.sebi.gov.in/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs bg-white border border-red-200 text-red-700 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition-all font-bold shadow-sm">
                          SEBI SCORES <ExternalLink size={14}/>
                       </a>
                       <a href="https://smartodr.in/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs bg-white border border-red-200 text-red-700 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition-all font-bold shadow-sm">
                          Smart ODR <ExternalLink size={14}/>
                       </a>
                  </div>
               </div>
             </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-start">
          
          <div className="col-span-1 space-y-4">
             {/* Email */}
             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start">
               <div className="bg-brand-100 p-3 rounded-full mr-4 text-brand-600">
                 <Mail size={24} />
               </div>
               <div>
                 <h3 className="font-bold text-slate-800">Email</h3>
                 <p className="text-sm text-slate-500 break-all"><a href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
               </div>
             </div>

             {/* Phone */}
             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start">
               <div className="bg-green-100 p-3 rounded-full mr-4 text-green-600">
                 <Phone size={24} />
               </div>
               <div>
                 <h3 className="font-bold text-slate-800">Phone</h3>
                 <p className="text-sm text-slate-500">{contactPhone}</p>
                 <p className="text-xs text-slate-400 mt-1">Mon-Fri, 10 AM - 6 PM IST</p>
               </div>
             </div>

             {/* Address */}
             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start">
               <div className="bg-orange-100 p-3 rounded-full mr-4 text-orange-600">
                 <MapPin size={24} />
               </div>
               <div>
                 <h3 className="font-bold text-slate-800">Office Address</h3>
                 <p className="text-sm text-slate-500">
                   {officeAddress}
                 </p>
               </div>
             </div>

             {/* SEBI */}
             <div className="bg-brand-50 p-6 rounded-xl border border-brand-200 shadow-sm flex items-start">
               <div className="bg-brand-600 p-3 rounded-full mr-4 text-white">
                 <Shield size={24} />
               </div>
               <div>
                 <h3 className="font-bold text-brand-900">SEBI Registration</h3>
                 <p className="text-sm text-brand-700">Registration No: {sebiRegNo}</p>
                 <p className="text-xs text-brand-600 mt-1">Valid Until: MAR-12-2031</p>
               </div>
             </div>
             
             {/* Social */}
             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4">Follow Us</h3>
                <div className="flex flex-wrap gap-4">
                  <a href="https://www.instagram.com/karanvijayvargiya2/" target="_blank" rel="noreferrer" className="p-2 bg-pink-100 text-pink-600 rounded-lg hover:bg-pink-200 transition-colors"><Instagram size={20}/></a>
                  <a href="https://www.facebook.com/karanvijayvargiya2/" target="_blank" rel="noreferrer" className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"><Facebook size={20}/></a>
                  <a href="https://www.youtube.com/@karanvijayvargiya1" target="_blank" rel="noreferrer" className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"><Youtube size={20}/></a>
                  <a href="https://x.com/karanvv" target="_blank" rel="noreferrer" className="p-2 bg-slate-100 text-slate-800 rounded-lg hover:bg-slate-200 transition-colors"><Twitter size={20}/></a>
                  <a href="https://www.linkedin.com/in/karan-vijayvargiya-5b463485/" target="_blank" rel="noreferrer" className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"><Linkedin size={20}/></a>
                  <a href="https://www.threads.com/@karanvijayvargiya2" target="_blank" rel="noreferrer" className="p-2 bg-slate-100 text-slate-900 rounded-lg hover:bg-slate-200 transition-colors"><AtSign size={20}/></a>
                </div>
             </div>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <div className="bg-brand-600 rounded-2xl shadow-xl h-full p-8 md:p-12 text-white">
               <h2 className="text-2xl font-bold mb-2">Send us a Message</h2>
               <p className="text-brand-100 mb-8">Fill out the form below and we will get back to you within 24-48 hours.</p>
               
               <div className="text-left">
                  <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" placeholder="Full Name *" className="w-full p-3 rounded-lg bg-brand-700 border-brand-500 placeholder-brand-300 focus:outline-none focus:ring-1 focus:ring-white" />
                        <input type="email" placeholder="Email Address *" className="w-full p-3 rounded-lg bg-brand-700 border-brand-500 placeholder-brand-300 focus:outline-none focus:ring-1 focus:ring-white" />
                      </div>
                      <input type="text" placeholder="Phone Number" className="w-full p-3 rounded-lg bg-brand-700 border-brand-500 placeholder-brand-300 focus:outline-none focus:ring-1 focus:ring-white" />
                      <input type="text" placeholder="Subject *" className="w-full p-3 rounded-lg bg-brand-700 border-brand-500 placeholder-brand-300 focus:outline-none focus:ring-1 focus:ring-white" />
                      <textarea rows={5} placeholder="Message *" className="w-full p-3 rounded-lg bg-brand-700 border-brand-500 placeholder-brand-300 focus:outline-none focus:ring-1 focus:ring-white"></textarea>
                      <button className="w-full bg-white text-brand-600 font-bold py-3 rounded-lg hover:bg-brand-50 transition-colors">Send Message &rarr;</button>
                  </form>
               </div>
            </div>
          </div>

        </div>

        {/* Quick Links Section matching image */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-center mb-8">Quick Links</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <Link to="/services" className="bg-white p-6 rounded-xl border border-slate-100 text-center hover:shadow-md transition-shadow block">
               <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 text-blue-600"><MapPin size={20}/></div>
               <h4 className="font-bold text-slate-800">Services</h4>
               <p className="text-xs text-slate-500">View advisory plans</p>
             </Link>
             <Link to="/compliance" className="bg-white p-6 rounded-xl border border-slate-100 text-center hover:shadow-md transition-shadow block">
               <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 text-green-600"><Shield size={20}/></div>
               <h4 className="font-bold text-slate-800">Compliance</h4>
               <p className="text-xs text-slate-500">SEBI disclosures</p>
             </Link>
             <Link to="/compliance/grievance-redressal" className="bg-white p-6 rounded-xl border border-slate-100 text-center hover:shadow-md transition-shadow block">
               <div className="bg-orange-100 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 text-orange-600"><Shield size={20}/></div>
               <h4 className="font-bold text-slate-800">Grievance</h4>
               <p className="text-xs text-slate-500">File a complaint</p>
             </Link>
             <Link to="/founder" className="bg-white p-6 rounded-xl border border-slate-100 text-center hover:shadow-md transition-shadow block">
               <div className="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 text-purple-600"><MapPin size={20}/></div>
               <h4 className="font-bold text-slate-800">About Founder</h4>
               <p className="text-xs text-slate-500">Meet Karan</p>
             </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;