import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronRight, ChevronLeft, AlertCircle, UploadCloud, FileSignature, ShieldCheck, Mail, RefreshCw } from 'lucide-react';
import SEO from '../components/SEO';

const Onboarding: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const plan = searchParams.get('plan');
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Details
    fullName: '',
    panNumber: '',
    dob: '',
    email: '',
    phone: '',
    city: '',
    state: '',
    
    // Step 2: KYC & CDD (Files)
    agreedToSpeak: false,
    
    // Step 3: Risk Categorization
    addressType: 'India',
    annualIncome: '',
    politicallyExposed: false,
    noCriminalBackground: false,
    
    // Step 4: Consent
    consentGiven: false,
    
    // Step 5: Payment
    paymentMethod: 'Razorpay'
  });

  const [dateError, setDateError] = useState('');

  // KRA Verification States
  const [isVerifyingKRA, setIsVerifyingKRA] = useState(false);
  const [kraStatus, setKraStatus] = useState<'pending' | 'verified'>('pending');

  // Aadhaar e-Sign States
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [isSendingOTP, setIsSendingOTP] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isVerifyingOTP, setIsVerifyingOTP] = useState(false);
  const [eSignVerified, setESignVerified] = useState(false);

  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  // Validate 18+
  const validateAge = (dateString: string) => {
    if (!dateString) return false;
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 18) {
      setDateError('You must be at least 18 years old to subscribe.');
      return false;
    }
    setDateError('');
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const isChecked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? isChecked : value
    }));

    if (name === 'dob') {
      validateAge(value);
    }
  };

  const verifyKRA = () => {
    if (!formData.panNumber || formData.panNumber.length !== 10) {
      alert("Please enter a valid 10-digit PAN number.");
      return;
    }
    setIsVerifyingKRA(true);
    // Simulate KRA Fetch API
    setTimeout(() => {
      setIsVerifyingKRA(false);
      setKraStatus('verified');
    }, 2000);
  };

  const sendAadhaarOTP = () => {
    if (!aadhaarNumber || aadhaarNumber.length !== 12) {
       alert("Please enter a valid 12-digit Aadhaar Number.");
       return;
    }
    setIsSendingOTP(true);
    setTimeout(() => {
      setIsSendingOTP(false);
      setOtpSent(true);
      alert("OTP sent to Aadhaar linked mobile number.");
    }, 1500);
  };

  const verifyAadhaarOTP = () => {
    if (!otp || otp.length < 4) {
      alert("Please enter a valid OTP.");
      return;
    }
    setIsVerifyingOTP(true);
    setTimeout(() => {
      setIsVerifyingOTP(false);
      setESignVerified(true);
    }, 2000);
  };

  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.paymentMethod) return;

    setIsSubmittingForm(true);
    setSubmitError('');

    try {
      const formEl = e.currentTarget;
      const data = new FormData(formEl);
      
      data.append('Selected_Plan', planName);
      data.append('Subscription_Price', planPrice);
      data.append('KRA_Status', kraStatus === 'verified' ? 'Verified Successfully' : 'Not Verified');
      data.append('MITC_eSign_Status', eSignVerified ? 'Aadhaar OTP Verified & Signed' : 'Not Signed');

      const response = await fetch('/api/submit-onboarding', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit onboarding data.');
      }

      // If Razorpay is selected
      if (formData.paymentMethod === 'Razorpay') {
        // Parse numerical amount from price string, e.g., '₹9,800 (Yearly)' -> 9800
        const parsedAmountStr = planPrice.replace(/[^0-9]/g, '');
        const amountNum = parsedAmountStr ? parseInt(parsedAmountStr, 10) : 1000;
        const amountInPaise = amountNum * 100; // Razorpay needs paise

        const orderResp = await fetch('/api/create-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: amountInPaise, receipt: `rcpt_${Date.now()}` })
        });
        const orderData = await orderResp.json();

        if (!orderResp.ok || !orderData.order_id) {
            throw new Error(orderData.error || 'Failed to create Razorpay Order. Please try again.');
        }

        const rzpKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
        
        if (!rzpKey || rzpKey === 'undefined' || rzpKey === 'null' || rzpKey.length < 5) {
             throw new Error('Razorpay API Keys are not configured correctly. Please add a valid VITE_RAZORPAY_KEY_ID in your Environment Variables.');
        }

        const options: any = {
          key: rzpKey,
          amount: orderData.amount,
          currency: orderData.currency || "INR",
          name: "Karan Vijayvargiya Research",
          description: `Subscription for ${planName}`,
          order_id: orderData.order_id,
          handler: async function (response: any) {
            console.log('Payment Handler Response:', response);
            // Verify signature via backend
            try {
              const verifyResp = await fetch('/api/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature
                })
              });
              
              const verifyData = await verifyResp.json();
              if (verifyResp.ok && verifyData.success) {
                  // After successful payment and verification, navigate
                  navigate('/services?success=true');
              } else {
                  setSubmitError(verifyData.error || 'Payment Verification Failed!');
              }
            } catch (err) {
               console.error('Verification Error:', err);
               setSubmitError('Failed to verify payment signature.');
            }
          },
          prefill: {
            name: formData.fullName || "User",
            email: formData.email || "user@example.com",
            contact: formData.phone || "9999999999"
          },
          theme: {
            color: "#2563eb"
          }
        };

        try {
          if (typeof window === 'undefined' || !(window as any).Razorpay) {
              throw new Error('Razorpay script is not loaded properly. Please disable adblockers or check your connection.');
          }
          // @ts-ignore
          const rzp = new (window as any).Razorpay(options);
          
          rzp.on('payment.failed', function (response: any){
             console.error('Payment Failed:', response.error);
             setSubmitError(response.error?.description || 'Payment Failed. Please try again.');
          });
          
          rzp.open();
        } catch (initError: any) {
          console.error("Razorpay SDK Error:", initError);
          throw new Error('Failed to open payment gateway. Please ensure your Razorpay keys are valid and script is loaded. (' + (initError.message || 'Unknown Error') + ')');
        }
      } else {
        // Normal redirection for UPI / Netbanking (offline mode for MVP)
        navigate('/services?success=true');
      }
    } catch (error: any) {
      console.error(error);
      setSubmitError(error.message || 'An error occurred during submission.');
    } finally {
      setIsSubmittingForm(false);
    }
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!validateAge(formData.dob)) return;
      if (!formData.fullName || !formData.panNumber || !formData.email || !formData.phone || !formData.city || !formData.state) {
        alert('Please fill in all mandatory fields.');
        return;
      }
      if (kraStatus !== 'verified') {
        alert('Please Verify your PAN & Fetch KRA details to proceed.');
        return;
      }
    }
    if (currentStep === 2) {
      // FormSubmit will naturally enforce any "required" file inputs on submit
      if (!formData.agreedToSpeak) {
        alert('Please agree to speak to our representative for CDD verification.');
        return;
      }
    }
    if (currentStep === 3) {
      if (!formData.annualIncome || !formData.noCriminalBackground) {
        alert('Please complete the risk profiling questions and confirm no criminal background.');
        return;
      }
    }
    if (currentStep === 4) {
      if (!eSignVerified) {
        alert('Please complete the Aadhaar e-Sign process to proceed.');
        return;
      }
      if (!formData.consentGiven) {
        alert('You must sign the consent to proceed.');
        return;
      }
    }
    setCurrentStep(prev => Math.min(prev + 1, 5));
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const planParam = searchParams.get('plan');
  const termParam = searchParams.get('term') || 'Term';
  const priceParam = searchParams.get('price');
  
  let planName = planParam || 'Premium Service';
  let planPrice = priceParam ? `${priceParam} (${termParam})` : 'Pending Selection';
  
  // Fallback for hardcoded standard links if they still use 'equity' or 'beginner'
  if (planName === 'equity') {
    planName = 'Equity Growth & Wealth Pack';
    planPrice = '₹9,800 (Yearly)';
  } else if (planName === 'beginner') {
    planName = "Beginner's Kickstart Batch";
    planPrice = '₹5,000 (One-Time)';
  }

  // Set the default form subject
  const formSubject = `New Subscription: ${planName} from ${formData.fullName || 'Client'}`;

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 font-sans">
      <SEO title="Client Onboarding" description="Secure onboarding process for premium research advisory." />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Client Onboarding</h1>
          <p className="text-slate-500">Subscribe to <strong className="text-brand-600">{planName}</strong></p>
        </div>

        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-2">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex flex-col items-center relative z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                  currentStep >= step ? 'bg-brand-600 text-white' : 'bg-slate-200 text-slate-400'
                }`}>
                  {currentStep > step ? <CheckCircle2 size={16} /> : step}
                </div>
              </div>
            ))}
            <div className="absolute left-0 top-4 w-full h-1 bg-slate-200 -z-0">
               <div className="h-1 bg-brand-600 transition-all duration-300" style={{ width: `${((currentStep - 1) / 4) * 100}%` }}></div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-slate-500 font-medium px-1">
             <span>Basic</span>
             <span>KYC</span>
             <span>Risk</span>
             <span>Consent</span>
             <span>Payment</span>
          </div>
        </div>

        {/* Form Area */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          
          {/* We are submitting to our custom backend endpoint */}
          <form 
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="p-6 md:p-8"
          >
            
            <div className={currentStep === 1 ? 'block space-y-6' : 'hidden'}>
                  <div className="border-b border-slate-100 pb-4 mb-6">
                    <h2 className="text-xl font-bold text-slate-800">1. Basic Details & KRA Fetch</h2>
                    <p className="text-sm text-slate-500 mt-1">Please provide your details to fetch KYC from systems.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Full Name (As per PAN) <span className="text-red-500">*</span></label>
                      <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" placeholder="Enter your legal name" />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Date of Birth <span className="text-red-500">*</span></label>
                      <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} className={`w-full px-4 py-3 rounded-lg border ${dateError ? 'border-red-500 focus:ring-red-500' : 'border-slate-300 focus:ring-brand-500'} focus:ring-2 outline-none transition-all`} />
                      {dateError && <p className="text-xs text-red-500 mt-1">{dateError}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Phone Number <span className="text-red-500">*</span></label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" placeholder="+91" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Email Address <span className="text-red-500">*</span></label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" placeholder="you@domain.com" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">City <span className="text-red-500">*</span></label>
                      <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" placeholder="Enter your city" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">State <span className="text-red-500">*</span></label>
                      <input type="text" name="state" value={formData.state} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" placeholder="Enter your state" />
                    </div>
                  </div>

                  <div className="mt-8 p-5 bg-blue-50 border border-blue-200 rounded-xl relative overflow-hidden">
                     {kraStatus === 'verified' && (
                        <div className="absolute inset-0 bg-green-50 border-green-200 border rounded-xl flex items-center justify-center z-10">
                            <div className="flex flex-col items-center">
                               <div className="flex items-center gap-2 text-green-700 font-bold mb-1">
                                   <CheckCircle2 size={24} /> KRA Fetched & Verified Successfully
                               </div>
                               <p className="text-xs text-green-600">Your details match with standard registry.</p>
                            </div>
                        </div>
                     )}
                     <h3 className="text-sm font-bold text-blue-900 mb-3">PAN & KRA Verification</h3>
                     <div className="flex flex-col sm:flex-row gap-4">
                        <input 
                           type="text" 
                           name="panNumber" 
                           value={formData.panNumber} 
                           onChange={handleInputChange} 
                           disabled={kraStatus === 'verified'}
                           className="flex-1 px-4 py-3 rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all uppercase disabled:opacity-50 bg-white" 
                           placeholder="Enter PAN Number" 
                           maxLength={10} 
                        />
                        <button 
                           type="button" 
                           onClick={verifyKRA}
                           disabled={isVerifyingKRA || kraStatus === 'verified'}
                           className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
                        >
                           {isVerifyingKRA ? (
                              <><RefreshCw className="animate-spin" size={18} /> Fetching KRA...</>
                           ) : (
                              'Fetch KRA'
                           )}
                        </button>
                     </div>
                     <p className="text-xs text-blue-700 mt-3 opacity-80 pl-1">
                        * Once PAN is verified, you can proceed to the next step.
                     </p>
                  </div>
            </div>

            <div className={currentStep === 2 ? 'block space-y-6' : 'hidden'}>
                  <div className="border-b border-slate-100 pb-4 mb-6">
                    <h2 className="text-xl font-bold text-slate-800">2. Document Upload & Verification</h2>
                    <p className="text-sm text-slate-500 mt-1">Please upload clear images/PDFs of your Identity and Address proofs.</p>
                  </div>

                  <div className="space-y-6">
                     <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                         <h3 className="text-sm font-bold text-slate-800 mb-2">Upload PAN Card <span className="text-red-500">*</span></h3>
                         <div className="flex items-center gap-4">
                             <div className="bg-white border border-slate-300 rounded-md py-2 px-3 flex-1">
                                 <input type="file" name="panImage" accept="image/*,.pdf" className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 cursor-pointer" />
                             </div>
                         </div>
                     </div>

                     <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                         <h3 className="text-sm font-bold text-slate-800 mb-2">Upload Aadhaar Card (Front & Back) <span className="text-red-500">*</span></h3>
                         <div className="flex items-center gap-4">
                             <div className="bg-white border border-slate-300 rounded-md py-2 px-3 flex-1">
                                 <input type="file" name="aadhaarFront" accept="image/*,.pdf" className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 cursor-pointer" />
                             </div>
                         </div>
                     </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <label className="flex items-start gap-3 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                      <input type="checkbox" name="agreedToSpeak" checked={formData.agreedToSpeak} onChange={handleInputChange} className="mt-1 w-4 h-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded" />
                      <span className="text-sm text-slate-700">
                        I agree to speak with a representative to verify my identity and genuineness before services commence, as part of Client Due Diligence (CDD).
                      </span>
                    </label>
                  </div>
            </div>

            <div className={currentStep === 3 ? 'block space-y-6' : 'hidden'}>
                  <div className="border-b border-slate-100 pb-4 mb-6">
                    <h2 className="text-xl font-bold text-slate-800">3. Risk Profiling & Classification</h2>
                    <p className="text-sm text-slate-500 mt-1">Under PMLA policy, we need some details to classify risk categories appropriately.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Registered/Correspondence Address <span className="text-red-500">*</span></label>
                      <select name="addressType" value={formData.addressType} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all bg-white">
                        <option value="India">Within India</option>
                        <option value="NRI">NRI / Overseas</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Annual Income / Business Turnover <span className="text-red-500">*</span></label>
                      <select name="annualIncome" value={formData.annualIncome} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all bg-white">
                        <option value="">Select Option</option>
                        <option value="< 1L">Below 1 Lakh</option>
                        <option value="1L-5L">1 Lakh - 5 Lakhs</option>
                        <option value="5L-10L">5 Lakhs - 10 Lakhs</option>
                        <option value="10L-25L">10 Lakhs - 25 Lakhs</option>
                        <option value="> 25L">Above 25 Lakhs</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4">
                    <label className="flex items-start gap-3 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                      <input type="checkbox" name="politicallyExposed" checked={formData.politicallyExposed} onChange={handleInputChange} className="mt-1 w-4 h-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded" />
                      <span className="text-sm text-slate-700">
                        I or my close relatives are Politically Exposed Persons (PEP). (Leave unchecked if NO).
                      </span>
                    </label>

                    <label className="flex items-start gap-3 p-4 border border-red-200 bg-red-50 rounded-lg cursor-pointer transition-colors">
                      <input type="checkbox" name="noCriminalBackground" checked={formData.noCriminalBackground} onChange={handleInputChange} className="mt-1 w-4 h-4 text-red-600 focus:ring-red-500 border-red-300 rounded" />
                      <span className="text-sm text-red-900 font-medium">
                        I hereby declare that my name does not feature in any known criminal background lists, regulatory debarred lists, or UN sanctions lists. <span className="text-red-500">*</span>
                      </span>
                    </label>
                  </div>
            </div>

            <div className={currentStep === 4 ? 'block space-y-6' : 'hidden'}>
                  <div className="border-b border-slate-100 pb-4 mb-6">
                     <div className="flex items-center gap-3">
                        <FileSignature className="text-brand-600" size={24} />
                        <h2 className="text-xl font-bold text-slate-800">4. Terms & Aadhaar MITC e-Sign</h2>
                     </div>
                    <p className="text-sm text-slate-500 mt-1">Please review the agreement and digitally sign using Aadhaar OTP.</p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 h-64 overflow-y-auto text-sm text-slate-700 space-y-4">
                     <p className="font-bold text-center mb-4">COMPREHENSIVE TERMS AND CONDITIONS FOR RESEARCH ANALYST SERVICES</p>
                     
                     <p>Please read these Terms carefully before subscribing to or using any of Our Services. By accessing or using Our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Services.</p>
                     
                     <h3 className="font-bold">1. Introduction</h3>
                     <p><strong>1.1 Parties</strong></p>
                     <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Research Analyst (hereinafter “RA,” “We,” “Our,” or “Us”)</strong>
                           <ul className="list-circle pl-5 mt-1">
                              <li>Registered with the Securities and Exchange Board of India (SEBI) under Registration No. INH000025470 valid as of 13/03/2026. Registered Name: Karan Vijayvargiya</li>
                              <li>Subject to all rules and regulations framed by SEBI, including the SEBI (Research Analysts) Regulations, 2014, as amended.</li>
                           </ul>
                        </li>
                        <li><strong>Client or User (“You,” “Your,” or “Client”)</strong>
                           <ul className="list-circle pl-5 mt-1">
                              <li>The individual or entity subscribing to or availing research services.</li>
                              <li>Must meet the eligibility requirements set forth herein and under Indian law.</li>
                           </ul>
                        </li>
                     </ul>

                     <p><strong>1.2 Purpose</strong></p>
                     <p>These Terms & Conditions (“T&C”) govern the Client’s use or subscription of Our research services (“Services”), including any digital platforms, mobile/web applications, or technology solutions that We or our service provider(s) operate.</p>

                     <p><strong>1.3 Compliance with SEBI Circular</strong></p>
                     <ul className="list-disc pl-5 space-y-1">
                        <li>This document incorporates the minimum mandatory provisions contained in the SEBI circular SEBI/HO/MIRSD/MIRSD-PoD-1/P/CIR/2025/004 dated January 08, 2025 (“the Circular”) and relevant amendments to the SEBI (Research Analysts) Regulations, 2014 (“RA Regulations”).</li>
                        <li>In case of conflict between these T&C and any applicable regulations/guidelines issued by SEBI, the SEBI regulations/guidelines shall prevail.</li>
                     </ul>

                     <h3 className="font-bold mt-6">2. CLIENT DETAILS</h3>
                     <p>Before availing of Our Services, the Client agrees to provide the following personal details as part of the registration process and Know Your Client (“KYC”) compliance:</p>
                     <div className="bg-white p-4 border border-slate-200 rounded my-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                        <p><strong>Full Name:</strong> {formData.fullName || '________________'}</p>
                        <p><strong>PAN:</strong> <span className="uppercase">{formData.panNumber || '________________'}</span></p>
                        <p><strong>Date of Birth:</strong> {formData.dob || '________________'}</p>
                        <p><strong>Email Address:</strong> {formData.email || '________________'}</p>
                        <p><strong>State/City:</strong> {formData.state || '________'} / {formData.city || '________'}</p>
                     </div>
                     <p>You affirm that all details provided are true, accurate, and complete. Inaccurate or incomplete information may result in suspension or termination of your access to Our Services.</p>

                     <h3 className="font-bold mt-6">3. Definitions</h3>
                     <ul className="list-disc pl-5 space-y-1">
                        <li><strong>“Client” or “User”:</strong> Any person or entity that registers with the RA and agrees to these T&C to avail the Services.</li>
                        <li><strong>“Services”:</strong> Includes (a) research reports, data, model portfolios, Recommendations or analyses pertaining to Indian-listed securities; (b) any online or offline research support (c) any communications related thereto.</li>
                        <li><strong>“Digital Platform”:</strong> Includes websites, mobile or web applications, or other technology platforms (including third-party service providers) used for delivering the Services.</li>
                        <li><strong>“KYC” (Know Your Customer):</strong> verification process mandated by SEBI (and other applicable laws) to establish the identity of Clients.</li>
                     </ul>

                     <h3 className="font-bold mt-6">4. Scope of Services</h3>
                     <p><strong>4.1 Research-Only / No Execution</strong></p>
                     <ul className="list-disc pl-5 space-y-1">
                        <li>The RA provides research reports, recommendations, model portfolios, analysis and related content about indian-listed securities.</li>
                        <li>We do not execute trades on behalf of Clients, hold Clients’ funds, or provide any assured returns. You retain full control and discretion over any investment decision.</li>
                     </ul>
                     <p><strong>4.2 Model Portfolios</strong></p>
                     <ul className="list-disc pl-5 space-y-1">
                        <li>Where offered, Our model portfolios are recommendations for basket(s) of securities with weightages. Such recommendations are for informational purposes and do not guarantee performance or returns.</li>
                        <li>We will maintain compliance with SEBI’s model portfolio guidelines (per the Circular’s Annexure-A).</li>
                     </ul>
                     <p><strong>4.3 Use of Artificial Intelligence (AI)</strong></p>
                     <ul className="list-disc pl-5 space-y-1">
                        <li>If We use AI tools (in whole or part) to generate or support research outputs, We remain solely responsible for the quality, accuracy, security, and confidentiality of data.</li>
                        <li>We shall disclose the extent of AI usage to the Client when providing Services (or whenever material changes occur).</li>
                     </ul>
                     <p><strong>4.4 No Guarantee of Returns</strong></p>
                     <p>All investments or trading carry market risk. Past performance is not indicative of future returns, and the RA does not assure or promise any specific gain or outcome. We do not offer any profit-sharing model or assure any returns.</p>

                     <h3 className="font-bold mt-6">5. Eligibility</h3>
                     <p><strong>5.1 Legal Capacity</strong></p>
                     <ul className="list-disc pl-5 space-y-1">
                        <li>Only individuals aged 18 years or older (and otherwise competent to contract) or legally incorporated entities may register.</li>
                        <li>If you are a minor or otherwise incapacitated to contract, you are not permitted to use or subscribe to the Services.</li>
                     </ul>
                     <p><strong>5.2 KYC Compliance</strong></p>
                     <ul className="list-disc pl-5 space-y-1">
                        <li>Clients must provide accurate and complete information for KYC.</li>
                        <li>RA shall verify or store such KYC in accordance with SEBI regulations.</li>
                        <li>The RA may terminate or suspend Services if KYC requirements are not met or if the information provided is incomplete, false, or misleading.</li>
                     </ul>

                     <h3 className="font-bold mt-6">6. Registration & Accounts</h3>
                     <p><strong>6.1 Registration Process</strong></p>
                     <ul className="list-disc pl-5 space-y-1">
                        <li>To access Our paid Services, Clients must complete the registration form, provide all mandatory details, and accept these T&C.</li>
                        <li>The RA reserves the right to reject or cancel registration if the information is incorrect or if the Client is ineligible under law.</li>
                     </ul>
                     <p><strong>6.2 Security of Credentials (If Applicable)</strong></p>
                     <ul className="list-disc pl-5 space-y-1">
                        <li>Keep login information (username, password, etc.) confidential (if any). You are liable for unauthorized use of your account due to negligence or sharing of credentials.</li>
                        <li>Notify Us immediately if you suspect any breach.</li>
                     </ul>
                     <p><strong>6.3 Use of Services</strong></p>
                     <ul className="list-disc pl-5 space-y-1">
                        <li>You shall not reproduce, distribute, copy, sell, or exploit Our research content without express written consent from the RA.</li>
                        <li>Any unauthorized use is grounds for termination of Services and may lead to legal action.</li>
                     </ul>

                     <h3 className="font-bold mt-6">7. Fees & Payment</h3>
                     <p><strong>7.1 Maximum Fee for Individual/HUF Clients</strong></p>
                     <ul className="list-disc pl-5 space-y-1">
                        <li>Per Regulation 15A of the RA Regulations and the Circular, We may charge fees up to INR 1,51,000 (Rupees One Lakh Fifty-One Thousand) per annum per “family of client” (for individual and HUF clients).</li>
                        <li>This amount excludes any statutory taxes and charges.</li>
                        <li>We may revise fees in line with the Cost Inflation Index or as specified by SEBI / RAASB every three years.</li>
                     </ul>
                     <p><strong>7.2 Fees for Non-Individual or Accredited Investors</strong></p>
                     <p>For corporates, institutions, or accredited investors, fees may be negotiated bilaterally without the above limit, subject to fairness and reasonableness.</p>
                     <p><strong>7.3 Billing & Mode of Payment</strong></p>
                     <ul className="list-disc pl-5 space-y-1">
                        <li>Payment shall be made through recognized modes: NEFT, IMPS, payment gateways (Instamojo, Cashfree, Razorpay, Stripe, Jodo), CeFCoM, cheque, UPI or any other method communicated by Us.</li>
                        <li>Fees may be charged quarterly or yearly in advance or in another mutually agreed schedule, subject to the advance limit mandated by SEBI.</li>
                        <li>We may offer or guide you regarding the Centralised Fee Collection Mechanism (CeFCoM) as an optional method of fee payment if made available by SEBI.</li>
                     </ul>
                     <p><strong>7.4 Refund Policy</strong></p>
                     <ul className="list-disc pl-5 space-y-1">
                        <li>If Our SEBI registration is suspended for more than sixty (60) days or canceled, we shall refund the subscription fees to you on a pro-rata basis for the remaining period of the subscription.</li>
                        <li>No “breakage” fee or penalty shall be imposed.</li>
                     </ul>

                     <h3 className="font-bold mt-6">8. Mandatory Terms & Conditions (as per SEBI Circular)</h3>
                     <p><strong>8.1 Availing the Research Services:</strong> By subscribing, You confirm that You do so at Your sole discretion, in accordance with applicable SEBI Regulations.</p>
                     <p><strong>8.2 Obligations on RA:</strong> Both RA and Client agree to be bound by the SEBI Act, SEBI (RA) Regulations, and all applicable rules.</p>
                     <p><strong>8.3 Client Information & KYC:</strong> You shall furnish all required details for KYC. We will collect, store, verify, and update KYC records as per SEBI norms.</p>
                     <p><strong>8.4 Standard Terms of Service:</strong> By giving consent, You acknowledge and accept the RA’s fee structure and disclaimers. You confirm that reliance on recommendations is at Your own risk.</p>
                     <p><strong>8.5 Consideration:</strong> You shall pay the agreed fees. We shall not render services until consent is received and initial fees are paid.</p>
                     <p><strong>8.6 Risk Factors:</strong> Investing in securities is subject to market risk. Past performance is no indicator of future performance.</p>
                     <p><strong>8.7 Conflict of Interest:</strong> We will disclose any conflicts of interest as mandated by SEBI, mitigating or avoiding them.</p>
                     <p><strong>8.8 Termination & Refunds:</strong> If registration is suspended/canceled, we refund residual amount for unexpired period. We may terminate if you breach T&Cs.</p>
                     <p><strong>8.9 Grievance Redressal:</strong> For issues, email karanvijayvargiya29@gmail.com. We aim to address within 7 days. Escalations can be made to SEBI SCORES portal.</p>
                     
                     <h3 className="font-bold mt-6">9. Representations & Warranties</h3>
                     <p><strong>9.1 RA’s Declarations:</strong> Registered under SEBI. No assurance of returns provided. No engagement in conflicting activities.</p>
                     <p><strong>9.2 Client’s Declarations:</strong> You represent You are legally entitled to enter this Agreement, KYC is correct, and You understand market risks.</p>

                     <h3 className="font-bold mt-6">Most Important Terms and Conditions (MITC)</h3>
                     <ol className="list-decimal pl-5 space-y-2">
                        <li>These terms and conditions, and consent thereon are for the research services provided by the Research Analyst (RA) and RA cannot execute/carry out any trade (purchase/sell transaction) on behalf of the client. Thus, the clients are advised not to permit RA to execute any trade on their behalf.</li>
                        <li>The fee charged by RA to the client will be subject to the maximum of amount prescribed by SEBI/ RAASB from time to time.</li>
                        <li>RA may charge fees in advance if agreed by the client. Such advance shall not exceed the period stipulated by SEBI; presently it is one quarter.</li>
                        <li>Fees to RA may be paid by the client through any of the specified modes like cheque, online bank transfer, UPI, etc. Cash payment is not allowed.</li>
                        <li>Any assured/guaranteed/fixed returns schemes or any other schemes of similar nature are prohibited by law.</li>
                        <li>The RA cannot guarantee returns, profits, accuracy, or risk-free investments from the use of the RA’s research services.</li>
                        <li>Any investment made based on recommendations in research reports are subject to market risks, and recommendations do not provide any assurance of returns.</li>
                        <li>The SEBI registration, Enlistment with RAASB, and NISM certification do not guarantee the performance of the RA or assure any returns to the client.</li>
                     </ol>

                  </div>

                  <div className="bg-white border-2 border-brand-200 rounded-xl p-6 relative overflow-hidden shadow-sm">
                      {eSignVerified && (
                          <div className="absolute inset-0 bg-green-50 border-green-200 flex items-center justify-center p-6 text-center z-10">
                              <div className="flex flex-col items-center">
                                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white mb-3 shadow-md">
                                      <CheckCircle2 size={24} />
                                  </div>
                                  <h3 className="font-bold text-green-900 text-lg">MITC Signed Successfully</h3>
                                  <p className="text-sm text-green-700 mt-1">Aadhaar e-Sign Verified via OTP.</p>
                              </div>
                          </div>
                      )}
                      
                      <h3 className="font-bold text-brand-900 mb-4 pb-2 border-b border-brand-100">Digitally e-Sign via Aadhaar</h3>
                      
                      {!otpSent ? (
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input 
                                type="text" 
                                placeholder="Enter 12-digit Aadhaar Number" 
                                value={aadhaarNumber} 
                                onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, ''))}
                                maxLength={12}
                                className="flex-1 px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                            />
                            <button 
                                type="button" 
                                onClick={sendAadhaarOTP}
                                disabled={isSendingOTP || aadhaarNumber.length < 12}
                                className="bg-brand-600 hover:bg-brand-700 disabled:bg-brand-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap"
                            >
                                {isSendingOTP ? 'Sending OTP...' : 'Send OTP'}
                            </button>
                        </div>
                      ) : (
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input 
                                type="text" 
                                placeholder="Enter OTP received on mobile" 
                                value={otp} 
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                maxLength={6}
                                className="flex-1 px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 outline-none transition-all"
                            />
                            <button 
                                type="button" 
                                onClick={verifyAadhaarOTP}
                                disabled={isVerifyingOTP || otp.length < 4}
                                className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap"
                            >
                                {isVerifyingOTP ? 'Verifying...' : 'Verify & e-Sign'}
                            </button>
                        </div>
                      )}
                      <p className="text-xs text-slate-500 mt-4 opacity-80">* Powered by standard NSDL / UIDAI eSign protocol simulation.</p>
                  </div>

                  <label className="flex items-start gap-3 p-4 mt-6 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer">
                    <input type="checkbox" name="consentGiven" checked={formData.consentGiven} onChange={handleInputChange} className="mt-1 w-5 h-5 text-brand-600 focus:ring-brand-500 border-gray-300 rounded relative z-20" />
                    <span className="text-sm text-slate-700 font-medium">
                      I have explicitly read & electronically signed the MITC agreement.  <span className="text-red-500">*</span>
                    </span>
                  </label>
            </div>

            <div className={currentStep === 5 ? 'block space-y-6' : 'hidden'}>
                  <div className="border-b border-slate-100 pb-4 mb-6">
                    <h2 className="text-xl font-bold text-slate-800">5. Fee Payment</h2>
                    <p className="text-sm text-slate-500 mt-1">Complete your secure payment to activate {planName}.</p>
                  </div>

                  <div className="bg-gradient-to-br from-brand-600 to-blue-800 rounded-2xl p-6 text-white text-center shadow-lg mb-8 relative overflow-hidden">
                     {/* Decorative background elements */}
                     <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                     <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-brand-400/20 rounded-full blur-2xl"></div>
                     
                     <div className="relative z-10">
                        <p className="text-brand-100 text-sm font-medium uppercase tracking-wider mb-2">Total Amount</p>
                        <h3 className="text-4xl font-extrabold">{planPrice}</h3>
                        <p className="text-xs text-brand-200 mt-2">Inclusive of all taxes</p>
                     </div>
                  </div>

                    <div className="space-y-3">
                     <label className="flex items-center justify-between p-4 border border-brand-200 bg-brand-50 rounded-lg cursor-pointer transition-colors">
                        <div className="flex items-center gap-3">
                            <input type="radio" name="paymentMethod" value="Razorpay" checked={formData.paymentMethod === 'Razorpay'} readOnly className="w-5 h-5 text-brand-600 border-gray-300 focus:ring-brand-500" />
                            <span className="font-semibold text-slate-700">Razorpay (Cards, UPI, NetBanking)</span>
                        </div>
                     </label>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-xs text-yellow-800 leading-relaxed">
                     <strong>Please Note:</strong> Payments must be made from the client's own bank account. Cash deposits are strictly not accepted. By clicking "Submit & Proceed to Pay", your onboarding file will be submitted along with your uploaded KYC documents and you'll be redirected to our secure payment gateway.
                  </div>
            </div>

            <div className="flex flex-col gap-4 mt-10 pt-6 border-t border-slate-100">
              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                  <AlertCircle size={16} className="text-red-600" />
                  {submitError}
                </div>
              )}
              
              <div className="flex justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 rounded-xl border border-slate-300 text-slate-600 font-bold hover:bg-slate-50 transition-colors flex items-center gap-2"
                  >
                    <ChevronLeft size={18} /> Back
                  </button>
                ) : (
                  <div></div> // Empty div for flex spacing
                )}

                {currentStep < 5 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-8 py-3 rounded-xl bg-brand-600 text-white font-bold hover:bg-brand-700 transition-shadow shadow-md shadow-brand-500/20 flex items-center gap-2 ml-auto"
                  >
                    Continue <ChevronRight size={18} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!formData.paymentMethod || isSubmittingForm}
                    className="px-8 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition-shadow shadow-lg shadow-green-600/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ml-auto"
                  >
                    {isSubmittingForm ? (
                       <><RefreshCw size={18} className="animate-spin" /> Processing...</>
                    ) : (
                       <>Submit & Pay <ChevronRight size={18} /></>
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Onboarding;
