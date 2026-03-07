import React from 'react';
import { CheckCircle, Eye, Shield, Target, TrendingUp, Users, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';

const Mission: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <SEO 
        title="Our Mission" 
        description="Our mission is to empower investors through transparency, education, and research-driven insights for long-term wealth creation."
        keywords="investment mission, financial literacy, investor education, unbiased research, SEBI registered analyst mission"
      />
      {/* Hero Section with Modern Gradient */}
      <div className="relative bg-slate-900 text-white py-24 md:py-32 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full border border-brand-400/30 bg-brand-400/10 text-brand-300 text-sm font-semibold mb-6 tracking-wide uppercase">
            Driving Financial Excellence
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">Mission</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
            Empowering investors through transparency, education, and research-driven insights
          </p>
        </div>
      </div>

      {/* Floating Stats Section */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 -mt-16">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <div className="text-center pt-4 md:pt-0">
            <span className="block text-4xl font-extrabold text-brand-600 mb-2">1000+</span>
            <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">Happy Clients</span>
          </div>
          <div className="text-center pt-8 md:pt-0">
            <span className="block text-4xl font-extrabold text-brand-600 mb-2">5000+</span>
            <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">Research Reports</span>
          </div>
          <div className="text-center pt-8 md:pt-0">
            <span className="block text-4xl font-extrabold text-brand-600 mb-2">100%</span>
            <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">SEBI Compliant</span>
          </div>
        </div>
      </div>

      {/* Main Mission Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Democratizing Investment Knowledge</h2>
          <p className="text-slate-600 leading-relaxed text-lg md:text-xl font-light">
            To provide unbiased, fundamental research and financial education that helps common investors avoid high-risk traps (like F&O) and achieve financial freedom through the power of long-term compounding.
          </p>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">Core Principles</h2>
          <p className="text-slate-500 mt-3 text-lg">The foundation of our commitment to excellence</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {/* Principle Cards - Styled with hover effects */}
           {[
             { 
               icon: <Shield size={32} />, 
               color: "text-red-600", 
               bg: "bg-red-50",
               title: "Integrity & Compliance First", 
               desc: "We adhere strictly to SEBI (Research Analysts) Regulations, 2014. Our advisory is built on the foundation of honesty, fairness, and complete regulatory compliance. We do not engage in any manipulative practices or circulate unverified market rumors." 
             },
             { 
               icon: <BookOpen size={32} />, 
               color: "text-purple-600", 
               bg: "bg-purple-50",
               title: "Research Over Speculation", 
               desc: "We believe in data-driven decisions, not gambling. Every recommendation we provide is backed by thorough fundamental analysis, a documented rationale, and a deep study of market cycles. We strictly stay away from high-risk speculative instruments like Futures & Options (F&O)." 
             },
             { 
               icon: <Users size={32} />, 
               color: "text-orange-600", 
               bg: "bg-orange-50",
               title: "Client-Centric Approach", 
               desc: "Your financial well-being is our priority. We act in a fiduciary capacity, ensuring that our advice aligns with your risk profile and financial goals. We maintain a zero-conflict policy regarding the stocks we recommend, ensuring unbiased advice." 
             },
             { 
               icon: <Eye size={32} />, 
               color: "text-teal-600", 
               bg: "bg-teal-50",
               title: "Transparency & Truth", 
               desc: "No hidden agendas, no false promises. We do not promise \"Guaranteed Returns\" or \"Jackpot Calls.\" We are transparent about the risks involved in the stock market and ensure that our clients are fully informed before investing." 
             },
             { 
               icon: <TrendingUp size={32} />, 
               color: "text-green-600", 
               bg: "bg-green-50",
               title: "Long-Term Wealth Creation", 
               desc: "We focus on the power of compounding. Our goal is not quick, risky gains but sustainable wealth creation over the long term by investing in quality companies with strong fundamentals." 
             },
             { 
               icon: <CheckCircle size={32} />, 
               color: "text-brand-600", 
               bg: "bg-brand-50",
               title: "Unbiased & Independent Research", 
               desc: "We maintain a strict \"Zero Conflict of Interest\" policy. We do not trade against our clients, nor do we have any vested commercial interest in the stocks we recommend. Our research is 100% independent and objective, ensuring that every piece of advice is given solely for your benefit." 
             }
           ].map((item, index) => (
             <div key={index} className="group bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-brand-200 transition-all duration-300">
               <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${item.color} ${item.bg} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                 {item.icon}
               </div>
               <h3 className="font-bold text-xl text-slate-900 mb-3">{item.title}</h3>
               <p className="text-slate-600 leading-relaxed text-sm">{item.desc}</p>
             </div>
           ))}
        </div>
      </div>

      {/* Vision Section - Modern Layout */}
      <div className="bg-white py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative z-10">
               <div className="inline-flex items-center gap-2 text-brand-600 font-bold uppercase tracking-widest text-sm mb-4">
                  <span className="w-8 h-0.5 bg-brand-600"></span>
                  Forward Looking
               </div>
               <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">Our Vision</h2>
               <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                 To empower individuals to build sustainable wealth through disciplined, low-risk, and research-backed equity investing, free from the noise of speculation.
               </p>
               
               <div className="space-y-6">
                 {[
                   { title: "Long-term Relationships", desc: "Building trust through consistent performance" },
                   { title: "Value-Driven Approach", desc: "Delivering measurable value through actionable insights" },
                   { title: "Investor Empowerment", desc: "Equipping you with knowledge" }
                 ].map((item, idx) => (
                   <div key={idx} className="flex items-start">
                     <div className="flex-shrink-0 mt-1">
                       <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600">
                         <CheckCircle size={18} />
                       </div>
                     </div>
                     <div className="ml-4">
                       <h4 className="font-bold text-slate-900">{item.title}</h4>
                       <p className="text-slate-500 text-sm">{item.desc}</p>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
            
            <div className="lg:w-1/2 relative">
               {/* Abstract visual representation of vision */}
               <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop&fm=webp" 
                    alt="Vision Strategy" 
                    className="w-full h-auto object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex flex-col justify-end p-8">
                     <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                       <Target className="text-yellow-400 w-10 h-10 mb-4" />
                       <p className="text-white font-medium text-lg">Targeting Excellence</p>
                       <p className="text-slate-300 text-sm mt-1">Precision in every analysis</p>
                     </div>
                  </div>
               </div>
               {/* Decorative elements behind */}
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-500/10 rounded-full blur-3xl -z-10"></div>
               <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent-500/10 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mission;