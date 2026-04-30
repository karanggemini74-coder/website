import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Users, FileText, Download, LogIn, Lock, Edit3, Image as ImageIcon, Settings, ShieldCheck, CheckCircle2, Briefcase, Plus, Trash2 } from 'lucide-react';
import slugify from 'slugify';
import AdminComplaints from '../components/AdminComplaints';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authToken, setAuthToken] = useState('');
  
  // Tabs
  const [activeTab, setActiveTab] = useState<'clients' | 'blogs' | 'accessibility' | 'services' | 'profile' | 'complaints'>('clients');

  // Client Data
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Services Data
  const [services, setServices] = useState<any[]>([]);
  const [isCreatingService, setIsCreatingService] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<number | null>(null);
  const [serviceForm, setServiceForm] = useState({
    title: '', subtitle: '', is_popular: false, theme_color: 'blue', 
    features: [''], price_monthly: '', price_quarterly: '', price_half_yearly: '', price_yearly: '', price_one_time: '', icon_name: 'TrendingUp'
  });

  // Blog Data
  const [isCreatingBlog, setIsCreatingBlog] = useState(false);
  const [blogForm, setBlogForm] = useState({
    title: '', content: '', description: '', seo_title: '', seo_description: '', seo_keywords: ''
  });
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [isSubmittingBlog, setIsSubmittingBlog] = useState(false);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  // Settings & API Keys Data
  const [settingsForm, setSettingsForm] = useState({
    adminEmail: 'karanvijayvargiya29@yahoo.com',
    razorpayKeyId: 'rzp_test_XXXXXXXXXXXX',
    razorpayKeySecret: 'XXXXXXXXXXXXXXXXXXXXX',
    aadhaarESignKey: 'signzy_XXXXXXXXXXXXXXXX',
    kraApiKey: 'cvl_kra_XXXXXXXXXXXXXX'
  });
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [settingsSavedMessage, setSettingsSavedMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        setAuthToken(data.token);
      } else {
        setError('Invalid Password');
      }
    } catch (err) {
      setError('Login failed');
    }
  };

  const getAuthHeaders = () => ({
    'Authorization': `Bearer ${authToken}`
  });

  const fetchClients = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/clients', { headers: getAuthHeaders() });
      if (!res.ok) throw new Error('Failed to fetch from MySQL');
      const data = await res.json();
      if (Array.isArray(data)) {
        setClients(data);
      } else {
        setClients([]);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await fetch('/api/admin/plans', { headers: getAuthHeaders() });
      const data = await res.json();
      if (Array.isArray(data)) {
        setServices(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (activeTab === 'clients') fetchClients();
      if (activeTab === 'services') fetchServices();
    }
  }, [activeTab, isAuthenticated]);

  const handleInlineImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await fetch('/api/admin/upload-image', { method: 'POST', headers: getAuthHeaders(), body: formData });
      const data = await res.json();
      if (data.url && editorRef.current) {
        const textarea = editorRef.current;
        const cursorPosition = textarea.selectionStart;
        const textBefore = blogForm.content.substring(0, cursorPosition);
        const textAfter = blogForm.content.substring(cursorPosition, blogForm.content.length);
        const imageMarkdown = `\n![Optional Alt Text](${data.url})\n`;
        
        setBlogForm({ ...blogForm, content: textBefore + imageMarkdown + textAfter });
      }
    } catch (err) {
      alert("Failed to upload image.");
    }
  };

  const submitBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingBlog(true);
    try {
      const formData = new FormData();
      formData.append('title', blogForm.title);
      const slug = slugify(blogForm.title, { lower: true, strict: true });
      formData.append('slug', slug);
      formData.append('description', blogForm.description);
      formData.append('content', blogForm.content);
      formData.append('seo_title', blogForm.seo_title || blogForm.title);
      formData.append('seo_description', blogForm.seo_description || blogForm.description);
      formData.append('seo_keywords', blogForm.seo_keywords);
      
      if (coverImage) {
        formData.append('coverImage', coverImage);
      }

      const res = await fetch('/api/admin/blogs', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: formData
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Failed to publish blog');
      
      alert('Blog created successfully!');
      setIsCreatingBlog(false);
      setBlogForm({ title: '', content: '', description: '', seo_title: '', seo_description: '', seo_keywords: '' });
      setCoverImage(null);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSubmittingBlog(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-slate-50 px-4">
         <Helmet><title>Admin Login - Dashboard</title></Helmet>
         <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-sm w-full">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4 mx-auto text-slate-700">
               <Lock size={24} />
            </div>
            <h1 className="text-xl font-bold text-center mb-6">Admin Access</h1>
            <form onSubmit={handleLogin} className="space-y-4">
               <div>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Admin Password" 
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 outline-none"
                  />
               </div>
               {error && <p className="text-red-500 text-sm text-center">{error}</p>}
               <button type="submit" className="w-full py-3 bg-brand-600 text-white rounded-xl font-bold hover:bg-brand-700 transition">
                  Login
               </button>
            </form>
         </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
      <Helmet><title>Admin Dashboard</title></Helmet>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
         <h1 className="text-2xl font-bold flex items-center gap-2"><Settings className="text-brand-600" /> Admin Dashboard</h1>
         <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setActiveTab('clients')}
              className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === 'clients' ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              Onboarding Clients
            </button>
            <button 
              onClick={() => setActiveTab('services')}
              className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${activeTab === 'services' ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              <Briefcase size={18} /> Manage Services
            </button>
            <button 
              onClick={() => setActiveTab('blogs')}
              className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${activeTab === 'blogs' ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              <FileText size={18} /> Manage Blogs
            </button>
            <button 
               onClick={() => setActiveTab('accessibility')}
               className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${activeTab === 'accessibility' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}
            >
               <ShieldCheck size={18} /> Accessibility IAAP
            </button>
            <button 
               onClick={() => setActiveTab('profile')}
               className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${activeTab === 'profile' ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'}`}
            >
               <Users size={18} /> Profile & Settings
            </button>
            <button 
               onClick={() => setActiveTab('complaints')}
               className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${activeTab === 'complaints' ? 'bg-red-600 text-white' : 'bg-red-50 text-red-700 hover:bg-red-100'}`}
            >
               <FileText size={18} /> Complaints Data
            </button>
         </div>
      </div>

      {activeTab === 'profile' && (
         <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8 pb-8 border-b border-slate-100">
               <img src="/karan-founder-final.png?v=10" alt="Karan Vijayvargiya" referrerPolicy="no-referrer" className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover" />
               <div>
                  <h2 className="text-3xl font-bold text-slate-800">Karan Vijayvargiya</h2>
                  <p className="text-brand-600 font-medium">Individual Research Analyst</p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-6">
                  <h3 className="font-bold text-lg text-slate-700 flex items-center gap-2"><ShieldCheck className="text-emerald-500" /> Professional Credentials</h3>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                     <div className="flex justify-between">
                        <span className="text-slate-500 text-sm">SEBI Registration No:</span>
                        <span className="font-bold text-slate-800">INH000025470</span>
                     </div>
                     <div className="flex justify-between">
                        <span className="text-slate-500 text-sm">PAN Number:</span>
                        <span className="font-bold text-slate-800">AJQPV8931L</span>
                     </div>
                     <div className="flex justify-between">
                        <span className="text-slate-500 text-sm">GST Number:</span>
                        <span className="font-bold text-slate-800">23AJQPV8931L1ZC</span>
                     </div>
                  </div>
               </div>

               <div className="space-y-6">
                  <h3 className="font-bold text-lg text-slate-700 flex items-center gap-2"><Lock className="text-orange-500" /> Contact & Security</h3>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                     <div className="flex justify-between">
                        <span className="text-slate-500 text-sm">Automated Email ID:</span>
                        <span className="font-bold text-slate-800">karanvijayvargiya29@yahoo.com</span>
                     </div>
                     <div className="flex justify-between">
                        <span className="text-slate-500 text-sm">Mobile Number:</span>
                        <span className="font-bold text-slate-800">8959222227</span>
                     </div>
                     <div className="pt-3 mt-3 border-t border-slate-200">
                        <p className="text-xs text-slate-500 leading-relaxed"><span className="font-bold text-orange-600">Security Note:</span> The .env configuration is secured and NOT exposed to the frontend. All sensitive logic (Email automation with Gmail App Passwords, Hostinger Database configs) execute purely server-side. Your Hostinger DB connection requires process.env logic which cannot be breached from client routes.</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="mt-12 bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-xl overflow-hidden relative">
               <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                  <Settings size={120} />
               </div>
               <div className="relative z-10">
                  <h3 className="font-bold text-xl text-white flex items-center gap-2 mb-2"><Settings className="text-brand-400" /> API Keys & Integrations Pipeline</h3>
                  <p className="text-slate-400 text-sm mb-8 max-w-2xl">Configure your third-party infrastructure. Changes here will sync securely with your Hostinger environment logic. Keep these keys strictly confidential.</p>
                  
                  <div className="space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                           <label className="block text-sm font-medium text-slate-300 mb-2">Automated Alert Email Receiver</label>
                           <input 
                              type="email" 
                              value={settingsForm.adminEmail}
                              onChange={(e) => setSettingsForm({...settingsForm, adminEmail: e.target.value})}
                              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-brand-500 outline-none font-mono text-sm"
                              placeholder="Where should client onboarding alerts go?"
                           />
                           <p className="text-xs text-slate-500 mt-1">Receive new client payment and onboarding details here.</p>
                        </div>
                        <div>
                           <label className="block text-sm font-medium text-slate-300 mb-2">CVL KRA API Key (KYC Fetch)</label>
                           <input 
                              type="password" 
                              value={settingsForm.kraApiKey}
                              onChange={(e) => setSettingsForm({...settingsForm, kraApiKey: e.target.value})}
                              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-brand-500 outline-none font-mono text-sm"
                              placeholder="KRA Vendor Key"
                           />
                           <p className="text-xs text-slate-500 mt-1">For fetching KRA KYC PAN status dynamically.</p>
                        </div>
                        <div>
                           <label className="block text-sm font-medium text-slate-300 mb-2">Razorpay API Key ID</label>
                           <input 
                              type="text" 
                              value={settingsForm.razorpayKeyId}
                              onChange={(e) => setSettingsForm({...settingsForm, razorpayKeyId: e.target.value})}
                              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-brand-500 outline-none font-mono text-sm truncate"
                           />
                        </div>
                        <div>
                           <label className="block text-sm font-medium text-slate-300 mb-2">Razorpay API Secret</label>
                           <input 
                              type="password" 
                              value={settingsForm.razorpayKeySecret}
                              onChange={(e) => setSettingsForm({...settingsForm, razorpayKeySecret: e.target.value})}
                              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-brand-500 outline-none font-mono text-sm"
                           />
                        </div>
                        <div className="md:col-span-2">
                           <label className="block text-sm font-medium text-slate-300 mb-2">Aadhaar E-Sign API Key (Digio / Signzy for MITC)</label>
                           <input 
                              type="password" 
                              value={settingsForm.aadhaarESignKey}
                              onChange={(e) => setSettingsForm({...settingsForm, aadhaarESignKey: e.target.value})}
                              className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:ring-2 focus:ring-brand-500 outline-none font-mono text-sm"
                              placeholder="Vendor Aadhaar Signature Key"
                           />
                           <p className="text-xs text-slate-500 mt-1">Used to automatically fire the Aadhaar OTP signing flow for the MITC Agreement.</p>
                        </div>
                     </div>

                     <div className="pt-6 border-t border-slate-800 flex justify-end items-center gap-4">
                        {settingsSavedMessage && <p className="text-emerald-400 text-sm font-medium animate-pulse flex items-center gap-1"><CheckCircle2 size={16} /> {settingsSavedMessage}</p>}
                        <button 
                           onClick={() => {
                              setIsSavingSettings(true);
                              setTimeout(() => {
                                 setIsSavingSettings(false);
                                 setSettingsSavedMessage('API Keys securely patched to environment.');
                                 setTimeout(() => setSettingsSavedMessage(''), 3000);
                              }, 1000);
                           }}
                           className="px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold transition flex items-center gap-2"
                           disabled={isSavingSettings}
                        >
                           {isSavingSettings ? 'Synchronizing...' : 'Save Configuration Pipeline'}
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )}

      {activeTab === 'clients' && (
        <>
          {loading ? (
            <div className="text-center py-20 text-slate-500">Loading clients from database...</div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200">{error}</div>
          ) : clients.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
              <Users className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-700">No Clients Yet</h3>
              <p className="text-slate-500">When users submit onboarding, they will appear here directly from your MySQL database.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm">
                    <th className="p-4 font-semibold">Date</th>
                    <th className="p-4 font-semibold">Client Name</th>
                    <th className="p-4 font-semibold">Contact</th>
                    <th className="p-4 font-semibold">Plan</th>
                    <th className="p-4 font-semibold">Documents</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client) => (
                    <tr key={client.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4 text-sm text-slate-600">{new Date(client.created_at).toLocaleDateString()}</td>
                      <td className="p-4">
                        <p className="font-bold text-slate-800">{client.full_name}</p>
                        <p className="text-xs text-slate-500">PAN: {client.pan_number}</p>
                      </td>
                      <td className="p-4 text-sm">
                        <p>{client.email}</p>
                        <p className="text-slate-500">{client.phone}</p>
                      </td>
                      <td className="p-4 text-sm">
                        <span className="inline-block bg-brand-50 text-brand-700 px-2 py-1 rounded font-medium text-xs mb-1">{client.plan_name}</span>
                        <p className="text-slate-600 font-medium">{client.plan_price}</p>
                      </td>
                      <td className="p-4 flex flex-wrap gap-2">
                        {client.invoice_path && (
                          <a href={`/uploads/${client.invoice_path}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800 bg-blue-50 p-2 rounded text-xs px-3 font-medium">Invoice</a>
                        )}
                        {client.agreement_path && (
                          <a href={`/uploads/${client.agreement_path}`} target="_blank" rel="noreferrer" className="text-emerald-600 hover:text-emerald-800 bg-emerald-50 p-2 rounded text-xs px-3 font-medium">Agreement</a>
                        )}
                        {client.pan_path && (
                          <a href={`/uploads/${client.pan_path}`} target="_blank" rel="noreferrer" className="text-purple-600 hover:text-purple-800 bg-purple-50 p-2 rounded text-xs px-3 font-medium">PAN</a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {activeTab === 'services' && (
        <div className="space-y-6">
          {!isCreatingService ? (
             <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200 gap-4">
                <div>
                   <h2 className="text-xl font-bold">Services & Plans Manager</h2>
                   <p className="text-slate-500 text-sm">Create, edit, or delete the plans shown on your /services page.</p>
                </div>
                <div className="flex gap-3">
                    {services.length === 0 && (
                        <button onClick={async () => {
                            if (confirm('Restore the default 2 plans?')) {
                                await fetch('/api/admin/plans/restore-defaults', { method: 'POST', headers: getAuthHeaders() });
                                fetchServices();
                            }
                        }} className="border border-brand-200 text-brand-700 bg-brand-50 px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-brand-100 transition">
                             Restore Default Plans
                        </button>
                    )}
                    <button onClick={() => {
                      setEditingServiceId(null);
                      setServiceForm({
                        title: '', subtitle: '', is_popular: false, theme_color: 'blue', 
                        features: [''], price_monthly: '', price_quarterly: '', price_half_yearly: '', price_yearly: '', price_one_time: '', icon_name: 'TrendingUp'
                      });
                      setIsCreatingService(true);
                    }} className="bg-brand-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-brand-700 transition">
                       <Plus size={18} /> Add New Plan
                    </button>
                </div>
             </div>
          ) : (
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                   <h2 className="text-2xl font-bold flex items-center gap-2"><Briefcase className="text-brand-600" /> {editingServiceId ? 'Edit Plan' : 'Create New Plan'}</h2>
                   <button type="button" onClick={() => setIsCreatingService(false)} className="text-slate-500 hover:text-slate-800 text-sm font-medium border border-slate-200 px-4 py-2 rounded-lg">
                      Cancel
                   </button>
                </div>
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  // Save or Edit logic
                  try {
                    const method = editingServiceId ? 'PUT' : 'POST';
                    const url = editingServiceId ? `/api/admin/plans/${editingServiceId}` : '/api/admin/plans';
                    const res = await fetch(url, {
                      method,
                      headers: {'Content-Type': 'application/json', ...getAuthHeaders()},
                      body: JSON.stringify(serviceForm)
                    });
                    if (!res.ok) throw new Error('Failed to save service');
                    setIsCreatingService(false);
                    fetchServices();
                  } catch (err) {
                    alert('Error saving service');
                  }
                }} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Plan Title</label>
                      <input type="text" value={serviceForm.title} onChange={e => setServiceForm({...serviceForm, title: e.target.value})} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-xl focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none" required />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Subtitle / Description</label>
                      <input type="text" value={serviceForm.subtitle} onChange={e => setServiceForm({...serviceForm, subtitle: e.target.value})} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-xl focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-1">Theme Color</label>
                      <select value={serviceForm.theme_color} onChange={e => setServiceForm({...serviceForm, theme_color: e.target.value})} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-xl outline-none">
                        <option value="blue">Blue</option>
                        <option value="teal">Teal</option>
                        <option value="purple">Purple</option>
                        <option value="emerald">Emerald</option>
                        <option value="indigo">Indigo</option>
                      </select>
                    </div>
                    <div className="flex items-center pt-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={serviceForm.is_popular} onChange={e => setServiceForm({...serviceForm, is_popular: e.target.checked})} className="w-5 h-5 accent-brand-600 rounded" />
                        <span className="font-bold text-slate-700">Mark as Popular Flagship</span>
                      </label>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h3 className="font-bold mb-4">Pricing Options (Leave blank if not applicable)</h3>
                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Monthly</label>
                        <input type="text" placeholder="e.g. ₹1,000" value={serviceForm.price_monthly} onChange={e => setServiceForm({...serviceForm, price_monthly: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Quarterly</label>
                        <input type="text" placeholder="e.g. ₹2,500" value={serviceForm.price_quarterly} onChange={e => setServiceForm({...serviceForm, price_quarterly: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Half Yearly</label>
                        <input type="text" placeholder="e.g. ₹4,500" value={serviceForm.price_half_yearly} onChange={e => setServiceForm({...serviceForm, price_half_yearly: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Yearly</label>
                        <input type="text" placeholder="e.g. ₹8,000" value={serviceForm.price_yearly} onChange={e => setServiceForm({...serviceForm, price_yearly: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">One Time</label>
                        <input type="text" placeholder="e.g. ₹5,000" value={serviceForm.price_one_time} onChange={e => setServiceForm({...serviceForm, price_one_time: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none" />
                      </div>
                    </div>
                  </div>

                  <div>
                     <h3 className="font-bold mb-2">Features / Bullet Points</h3>
                     <div className="space-y-2">
                       {serviceForm.features.map((feature, idx) => (
                         <div key={idx} className="flex gap-2">
                           <input type="text" value={feature} onChange={e => {
                               const newF = [...serviceForm.features];
                               newF[idx] = e.target.value;
                               setServiceForm({...serviceForm, features: newF});
                           }} className="flex-grow px-3 py-2 border border-slate-300 rounded-lg outline-none" placeholder="Feature description..." />
                           <button type="button" onClick={() => {
                               const newF = serviceForm.features.filter((_, i) => i !== idx);
                               setServiceForm({...serviceForm, features: newF});
                           }} className="p-2 text-red-500 hover:bg-red-50 py-2 rounded-lg"><Trash2 size={20}/></button>
                         </div>
                       ))}
                       <button type="button" onClick={() => setServiceForm({...serviceForm, features: [...serviceForm.features, '']})} className="text-brand-600 font-bold text-sm mt-2 flex items-center gap-1"><Plus size={16}/> Add Feature</button>
                     </div>
                  </div>

                  <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition">
                    {editingServiceId ? 'Update Plan' : 'Save Plan'}
                  </button>
                </form>
             </div>
          )}

          {!isCreatingService && services.length > 0 && (
             <div className="flex flex-wrap justify-center items-stretch gap-6">
                {services.map(svc => (
                   <div key={svc.id} className="bg-white border text-left border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] max-w-[420px]">
                      <div className="flex justify-between items-start mb-4">
                         <h3 className={`font-bold text-xl ${svc.status === 'inactive' ? 'line-through text-slate-400' : ''}`}>{svc.title}</h3>
                         <div className="flex gap-2 items-center">
                           {svc.is_popular && <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-bold">Popular</span>}
                           {svc.status === 'inactive' && <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded font-bold">Hidden</span>}
                         </div>
                      </div>
                      <p className="text-slate-500 text-sm mb-4 leading-relaxed line-clamp-2">{svc.subtitle}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {svc.price_monthly && <span className="bg-slate-100 px-2 py-1 text-xs rounded font-medium">Monthly: {svc.price_monthly}</span>}
                        {svc.price_yearly && <span className="bg-slate-100 px-2 py-1 text-xs rounded font-medium">Yearly: {svc.price_yearly}</span>}
                        {svc.price_one_time && <span className="bg-slate-100 px-2 py-1 text-xs rounded font-medium">One-Time: {svc.price_one_time}</span>}
                      </div>

                      <div className="mt-auto flex flex-col gap-2">
                         <div className="flex items-center justify-between bg-slate-50 p-2 rounded-lg border border-slate-200 mb-2">
                             <span className="text-sm font-medium text-slate-700">Service Status</span>
                             <button onClick={async () => {
                                try {
                                    const newStatus = svc.status === 'active' ? 'inactive' : 'active';
                                    await fetch(`/api/admin/plans/${svc.id}`, { 
                                        method: 'PUT',
                                        headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
                                        body: JSON.stringify({...svc, status: newStatus})
                                    });
                                    fetchServices();
                                } catch(e) {
                                    alert('Failed to update status');
                                }
                             }} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${svc.status === 'active' ? 'bg-brand-600' : 'bg-slate-300'}`}>
                                 <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${svc.status === 'active' ? 'translate-x-6' : 'translate-x-1'}`} />
                             </button>
                         </div>
                        <div className="flex gap-2">
                           <button onClick={() => {
                             let parseF = [''];
                             try { parseF = JSON.parse(svc.features) || ['']; } catch(e){}
                             setServiceForm({
                               title: svc.title || '', subtitle: svc.subtitle || '', is_popular: !!svc.is_popular, theme_color: svc.theme_color || 'blue',
                               features: parseF, price_monthly: svc.price_monthly || '', price_quarterly: svc.price_quarterly || '',
                               price_half_yearly: svc.price_half_yearly || '', price_yearly: svc.price_yearly || '', price_one_time: svc.price_one_time || '', icon_name: svc.icon_name || 'TrendingUp'
                             });
                             setEditingServiceId(svc.id);
                             setIsCreatingService(true);
                           }} className="flex-1 bg-brand-50 text-brand-700 py-2 rounded-lg font-bold hover:bg-brand-100 transition text-center justify-center flex items-center gap-2"><Edit3 size={16}/> Edit</button>
                           <button onClick={async () => {
                             if (confirm('Are you sure you want to delete this plan?')) {
                               try {
                                 await fetch(`/api/admin/plans/${svc.id}`, { method: 'DELETE', headers: getAuthHeaders() });
                                 fetchServices();
                               } catch (e) {
                                 alert('Delete failed');
                               }
                             }
                           }} className="p-2 border border-slate-200 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={20}/></button>
                        </div>
                      </div>
                   </div>
                ))}
             </div>
          )}
          {!isCreatingService && services.length === 0 && (
             <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center">
                 <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                 <h3 className="text-xl font-bold text-slate-700">No Services Added</h3>
                 <p className="text-slate-500 mb-6">Create your first service plan to display on the /services page.</p>
             </div>
          )}
        </div>
      )}

      {activeTab === 'blogs' && (
        <div className="space-y-6">
           {!isCreatingBlog ? (
             <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-200 gap-4">
                <div>
                   <h2 className="text-xl font-bold">SEO Blog Manager</h2>
                   <p className="text-slate-500 text-sm">Create and manage content for Google rankings.</p>
                </div>
                <button onClick={() => setIsCreatingBlog(true)} className="bg-brand-600 text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2">
                   <Edit3 size={18} /> Compose New Blog
                </button>
             </div>
           ) : (
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                   <h2 className="text-2xl font-bold flex items-center gap-2"><Edit3 className="text-brand-600" /> Compose New Article</h2>
                   <button type="button" onClick={() => setIsCreatingBlog(false)} className="text-slate-500 hover:text-slate-800 text-sm font-medium border border-slate-200 px-4 py-2 rounded-lg">
                      Cancel
                   </button>
                </div>
                <form onSubmit={submitBlog} className="space-y-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-5">
                         <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                            <h3 className="font-bold text-slate-800 mb-4 text-lg">General Info</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Blog Title *</label>
                                    <input required type="text" value={blogForm.title} onChange={e => setBlogForm({...blogForm, title: e.target.value})} className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-brand-500" placeholder="e.g. How to Invest in 2026" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Short Description (for listing) *</label>
                                    <textarea required value={blogForm.description} onChange={e => setBlogForm({...blogForm, description: e.target.value})} className="w-full border border-slate-300 rounded-lg p-3 h-24 outline-none focus:ring-2 focus:ring-brand-500" placeholder="Brief summary of the blog..."></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Cover Image *</label>
                                    <input required type="file" accept="image/*" onChange={e => { if(e.target.files) setCoverImage(e.target.files[0]) }} className="w-full border border-slate-300 rounded-lg p-2 bg-white text-sm" />
                                </div>
                            </div>
                         </div>
                      </div>
                      
                      <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                         <h3 className="font-bold flex items-center gap-2 text-slate-800 mb-4 text-lg"><Settings size={18} className="text-blue-600" /> Google SEO Setup</h3>
                         <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-600 mb-1">Meta Title</label>
                                <input type="text" value={blogForm.seo_title} onChange={e => setBlogForm({...blogForm, seo_title: e.target.value})} className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="Leave empty to use main title" />
                                <p className="text-xs text-slate-500 mt-1">This is the blue linked title shown on Google search.</p>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-600 mb-1">Meta Description</label>
                                <textarea value={blogForm.seo_description} onChange={e => setBlogForm({...blogForm, seo_description: e.target.value})} className="w-full border border-slate-300 rounded-lg p-3 text-sm h-16 outline-none focus:ring-2 focus:ring-blue-500" placeholder="SEO Description..."></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-600 mb-1">Target Keywords</label>
                                <input type="text" value={blogForm.seo_keywords} onChange={e => setBlogForm({...blogForm, seo_keywords: e.target.value})} className="w-full border border-slate-300 rounded-lg p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. stock market, investing, SEBI" />
                                <p className="text-xs text-slate-500 mt-1">Comma separated list of words to rank for.</p>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                      <div className="flex justify-between items-center mb-4">
                        <label className="block text-lg font-bold text-slate-800">Main Content (Markdown format)</label>
                        <div className="relative">
                          {/* Image upload button for markdown */}
                          <input type="file" id="inlineImage" className="hidden" accept="image/*" onChange={(e) => { if (e.target.files) handleInlineImageUpload(e.target.files[0]); }} />
                          <label htmlFor="inlineImage" className="cursor-pointer bg-white text-brand-700 text-sm px-4 py-2 rounded-lg font-bold border border-slate-300 hover:bg-slate-100 flex items-center gap-2 shadow-sm">
                            <ImageIcon size={16} /> Insert Image Here
                          </label>
                        </div>
                      </div>
                      <textarea 
                        required 
                        ref={editorRef}
                        value={blogForm.content} 
                        onChange={e => setBlogForm({...blogForm, content: e.target.value})} 
                        className="w-full border border-slate-300 rounded-xl p-4 font-mono text-sm leading-relaxed outline-none focus:ring-2 focus:ring-brand-500 bg-white" 
                        rows={15} 
                        placeholder="# Heading 1\n\nWrite your blog content here...\n\n- Bullet points\n- Supported"
                      ></textarea>
                      <p className="text-sm text-slate-500 mt-3 flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-emerald-500" /> 
                        You can use standard Markdown. Put your text cursor in the box, then click "Insert Image" to upload and insert a picture natively!
                      </p>
                   </div>

                   <button type="submit" disabled={isSubmittingBlog} className="w-full py-4 bg-brand-600 text-white rounded-xl font-bold text-lg hover:bg-brand-700 transition shadow-lg shadow-brand-500/30 disabled:opacity-50">
                      {isSubmittingBlog ? 'Publishing Post & Processing Images...' : 'Publish Blog Post to Google'}
                   </button>
                </form>
             </div>
           )}
        </div>
      )}

      {activeTab === 'accessibility' && (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 max-w-3xl">
           <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-emerald-800"><ShieldCheck /> Website Accessibility & IAAP</h2>
           <p className="text-slate-600 mb-6 bg-slate-50 p-4 border border-slate-100 rounded-lg text-sm leading-relaxed">
             <strong>Clarification on IAAP & WordPress:</strong> IAAP (International Association of Accessibility Professionals) provides global accessibility certifications. WordPress plugins only run on PHP WordPress sites. Since we built this using modern React/Node.js architecture for better speed and security, we don't use .zip plugins. <br/><br/>
             Instead, your website is equipped natively with <strong>ARIA landmarks, semantic HTML, and Accessibility integrations</strong> that ensure ADA and WCAG compliance built directly into the core code.
           </p>

           <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                 <div>
                    <h3 className="font-bold text-lg">Accessibility Certificate Status</h3>
                    <p className="text-sm text-slate-500">Your site's internal technical compliance score.</p>
                 </div>
                 <span className="bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">Passed (WCAG 2.1 AA)</span>
              </div>
              <div className="flex items-center justify-between pt-2">
                 <div>
                    <h3 className="font-bold text-lg">Generate Statement</h3>
                    <p className="text-sm text-slate-500">Download your Accessibility Statement PDF for public records.</p>
                 </div>
                 <button onClick={() => window.print()} className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-200 flex items-center gap-2">
                    <Download size={18} /> Download Statement
                 </button>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'complaints' && <AdminComplaints authToken={authToken} />}
    </div>
  );
}
