import React, { useState } from 'react';
import { ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedName, setSubmittedName] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }

    setFormData({ ...formData, [name]: value });
  };

  // Security: Input Sanitization to remove basic XSS vectors
  const sanitizeInput = (input: string): string => {
    return input.replace(/[<>]/g, '').trim();
  };

  // Security: Strict Input Validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Name: Allow letters, spaces, and hyphens only
    const nameRegex = /^[a-zA-Z\s\-]+$/;
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (!nameRegex.test(formData.name)) {
      newErrors.name = 'Name contains invalid characters';
      isValid = false;
    }

    // Email: Strict email pattern
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Phone: Digits, spaces, +, - only. Length 10-15.
    const phoneRegex = /^[0-9+\-\s]{10,15}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number format';
      isValid = false;
    }

    // Service: Selection required
    if (!formData.service) {
      newErrors.service = 'Please select a service';
      isValid = false;
    }

    // Message: Max length check
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    } else if (formData.message.length > 1000) {
      newErrors.message = 'Message exceeds 1000 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateForm()) {
      // Sanitize before usage/transmission
      const cleanData = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        phone: sanitizeInput(formData.phone),
        service: sanitizeInput(formData.service),
        message: sanitizeInput(formData.message),
      };

      // Simulating API call with sanitized data
      console.log('Secure Form Submission:', cleanData);
      
      setTimeout(() => {
        // Securely setting state for rendering. React will escape this when rendering {submittedName} below.
        setSubmittedName(cleanData.name);
        setIsSuccess(true);
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
        setIsSubmitting(false);
      }, 500);
    } else {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-brand-600 rounded-2xl shadow-xl p-8 md:p-10 text-white flex flex-col items-center justify-center text-center min-h-[400px]">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
          <CheckCircle size={32} className="text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Message Sent Successfully!</h3>
        <p className="text-brand-100 mb-6">
          Thank you, <strong className="text-white">{submittedName}</strong>. We have received your inquiry and will contact you shortly.
        </p>
        <button 
          onClick={() => setIsSuccess(false)}
          className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-semibold transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-brand-600 rounded-2xl shadow-xl p-8 md:p-10 text-white">
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold mb-2">Get in Touch</h3>
        <p className="text-brand-100">Ready to start your investment journey? Contact us for a free consultation.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1">Full Name *</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={`w-full px-4 py-3 rounded-lg bg-brand-700 border ${errors.name ? 'border-red-400 focus:ring-red-400' : 'border-brand-500 focus:ring-white'} text-white placeholder-brand-300 focus:outline-none focus:ring-2 transition-shadow`}
            />
            {errors.name && <p className="text-red-300 text-xs mt-1 flex items-center"><AlertCircle size={12} className="mr-1"/> {errors.name}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-1">Email Address *</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className={`w-full px-4 py-3 rounded-lg bg-brand-700 border ${errors.email ? 'border-red-400 focus:ring-red-400' : 'border-brand-500 focus:ring-white'} text-white placeholder-brand-300 focus:outline-none focus:ring-2 transition-shadow`}
            />
            {errors.email && <p className="text-red-300 text-xs mt-1 flex items-center"><AlertCircle size={12} className="mr-1"/> {errors.email}</p>}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-1">Phone Number</label>
          <input 
            type="tel" 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 89592 22227"
            className={`w-full px-4 py-3 rounded-lg bg-brand-700 border ${errors.phone ? 'border-red-400 focus:ring-red-400' : 'border-brand-500 focus:ring-white'} text-white placeholder-brand-300 focus:outline-none focus:ring-2 transition-shadow`}
          />
          {errors.phone && <p className="text-red-300 text-xs mt-1 flex items-center"><AlertCircle size={12} className="mr-1"/> {errors.phone}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-1">Service Interest *</label>
          <select 
            name="service"
            value={formData.service}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg bg-brand-700 border ${errors.service ? 'border-red-400 focus:ring-red-400' : 'border-brand-500 focus:ring-white'} text-white placeholder-brand-300 focus:outline-none focus:ring-2 appearance-none transition-shadow`}
          >
            <option value="" className="text-slate-800">Select a service</option>
            <option value="advisory" className="text-slate-800">Premium Advisory</option>
            <option value="education" className="text-slate-800">Education / Courses</option>
            <option value="general" className="text-slate-800">General Inquiry</option>
          </select>
          {errors.service && <p className="text-red-300 text-xs mt-1 flex items-center"><AlertCircle size={12} className="mr-1"/> {errors.service}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider mb-1">Message *</label>
          <textarea 
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your investment goals..."
            className={`w-full px-4 py-3 rounded-lg bg-brand-700 border ${errors.message ? 'border-red-400 focus:ring-red-400' : 'border-brand-500 focus:ring-white'} text-white placeholder-brand-300 focus:outline-none focus:ring-2 resize-none transition-shadow`}
          />
          {errors.message && <p className="text-red-300 text-xs mt-1 flex items-center"><AlertCircle size={12} className="mr-1"/> {errors.message}</p>}
        </div>

        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-white text-brand-700 font-bold py-3 rounded-lg hover:bg-brand-50 transition-colors flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Processing...' : 'Send Message'} {!isSubmitting && <ArrowRight className="h-4 w-4" />}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;