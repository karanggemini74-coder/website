import React from 'react';

const OfficerDetails: React.FC = () => {
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL || 'ra@karanvijayvargiya.com';
  const contactPhone = import.meta.env.VITE_CONTACT_PHONE || '+91 89592 22227';

  return (
    <div className="mt-16">
      <h3 className="text-lg font-bold text-blue-800 mb-6">Officers Contact Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        
        {/* Principal Officer */}
        <div>
           <h4 className="text-sm font-bold text-blue-600 mb-3">Principal Officer</h4>
           <div className="text-sm text-slate-800 space-y-1">
             <p><span className="font-bold">Name:</span> Karan Vijay Vargiya</p>
             <p><span className="font-bold">Email:</span> {contactEmail}</p>
             <p><span className="font-bold">Phone:</span> {contactPhone}</p>
           </div>
        </div>

        {/* Grievance Officer */}
        <div>
           <h4 className="text-sm font-bold text-blue-600 mb-3">Grievance Officer</h4>
           <div className="text-sm text-slate-800 space-y-1">
             <p><span className="font-bold">Name:</span> Karan Vijay Vargiya</p>
             <p><span className="font-bold">Email:</span> {contactEmail}</p>
             <p><span className="font-bold">Phone:</span> {contactPhone}</p>
           </div>
        </div>

        {/* Compliance Officer */}
        <div>
           <h4 className="text-sm font-bold text-blue-600 mb-3">Compliance Officer</h4>
           <div className="text-sm text-slate-800 space-y-1">
             <p><span className="font-bold">Name:</span> Karan Vijay Vargiya</p>
             <p><span className="font-bold">Email:</span> {contactEmail}</p>
             <p><span className="font-bold">Phone:</span> {contactPhone}</p>
           </div>
        </div>

        {/* Accessibility / Escalation Officer */}
        <div>
           <h4 className="text-sm font-bold text-blue-600 mb-3">Accessibility /<br/>Escalation Officer</h4>
           <div className="text-sm text-slate-800 space-y-1">
             <p><span className="font-bold">Name:</span> Karan Vijay Vargiya</p>
             <p><span className="font-bold">Email:</span> {contactEmail}</p>
             <p><span className="font-bold">Phone:</span> {contactPhone}</p>
           </div>
        </div>

      </div>
    </div>
  );
};

export default OfficerDetails;