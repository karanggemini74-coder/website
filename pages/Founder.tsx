import React from 'react';
import { Award, Book, TrendingUp, Shield, Target, Eye, Heart, CheckCircle, ArrowRight, Quote } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const Founder: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      <SEO 
        title="About the Founder - Karan Vijayvargiya" 
        description="Meet Karan Vijayvargiya, a SEBI Registered Research Analyst with over 8 years of experience and an MBA, dedicated to unbiased investment advice."
        keywords="Karan Vijayvargiya, SEBI registered research analyst, founder profile, investment expert, stock market analyst India"
      />
      
      {/* Modern Hero Section */}
      <div className="relative bg-slate-900 text-white pt-24 pb-48 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-10"></div>

        <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-400/30 bg-brand-500/10 text-brand-300 text-xs font-bold uppercase tracking-widest mb-8">
            <Award size={14} /> 
            <span>SEBI Registered Authority</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
            Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-blue-200 to-white">Founder</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Your partner in wealth creation. Combining market experience with academic rigor to deliver unbiased investment research.
          </p>
        </div>
      </div>

      {/* Main Profile Section */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-20 pb-20">
        <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col lg:flex-row">
            
            {/* Left: Image & Stats */}
            <div className="lg:w-2/5 relative min-h-[500px] lg:min-h-full">
              <div className="absolute inset-0 bg-slate-200">
                <img 
                  src="/founder.png" 
                  alt="Karan Vijayvargiya" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop";
                  }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent lg:hidden"></div>
              
              {/* Floating Name Card - Visible on Mobile (Bottom) & Desktop (Bottom) */}
              <div className="absolute bottom-0 left-0 w-full p-8 lg:bg-gradient-to-t lg:from-slate-900/90 lg:to-transparent">
                <div className="lg:text-white text-white">
                    <h3 className="text-3xl font-bold mb-1">Karan Vijayvargiya</h3>
                    <p className="text-brand-300 font-medium text-sm mb-4 uppercase tracking-wider">SEBI Registered Research Analyst</p>
                    <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded border border-white/20 text-xs font-mono text-white/90">
                      Reg No: INH000025470
                    </div>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="lg:w-3/5 p-8 md:p-14 flex flex-col justify-center bg-white">
              
              {/* About Section */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="w-12 h-1.5 bg-brand-600 rounded-full"></span>
                  The Person Behind the Research
                </h2>
                <div className="prose prose-lg text-slate-600 leading-relaxed space-y-4">
                  <p>
                    Hello, I am <strong>Karan Vijayvargiya</strong>.
                  </p>
                  <p>
                    With over <strong>8 years of experience</strong> in the Indian financial markets, I founded this platform with a single goal: to provide unbiased, research-backed investment advice that truly helps investors.
                  </p>
                  <p>
                    Holding a <strong>Master of Business Administration (MBA)</strong>, I combine academic principles with practical market strategies. I understand that the stock market is not a casino; it is a mechanism for wealth transfer from the impatient to the patient.
                  </p>
                  <p>
                    As a <strong>SEBI Registered Research Analyst</strong>, I adhere to the highest standards of integrity. My mission is to filter out the noise and focus on fundamental growth, helping you navigate the markets with confidence.
                  </p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-6 mb-12 border-y border-slate-100 py-8">
                 <div className="text-center">
                    <span className="block text-4xl font-extrabold text-brand-600 mb-1">8+</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Years Experience</span>
                 </div>
                 <div className="text-center border-l border-slate-100">
                    <span className="block text-4xl font-extrabold text-brand-600 mb-1">MBA</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Qualified</span>
                 </div>
                 <div className="text-center border-l border-slate-100">
                    <span className="block text-4xl font-extrabold text-brand-600 mb-1">100%</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Compliance</span>
                 </div>
              </div>

              {/* Qualifications */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-5 uppercase tracking-wide text-sm">Qualifications & Credentials</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "SEBI Registered Research Analyst",
                    "Master of Business Administration (MBA)",
                    "NISM Certified (Research Analyst)",
                    "Equity Research Specialist"
                  ].map((qual, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-brand-200 transition-colors">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                         <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                      </div>
                      <span className="text-sm text-slate-700 font-semibold">{qual}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
        </div>
      </div>

      {/* Philosophy Section - Dark Contrast */}
      <section className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 text-brand-400 font-bold tracking-widest uppercase text-xs mb-8">
            <Quote size={16} /> Investment Philosophy
          </div>
          
          <div className="relative">
            <h2 className="text-2xl md:text-4xl font-light text-white leading-relaxed font-serif italic">
              "The stock market is not a casino; it’s a place for disciplined wealth creation. My goal is not just to give you a stock name, but to equip you with the 'Rationale' behind it."
            </h2>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-2">
             <div className="text-white font-bold text-lg">Karan Vijayvargiya</div>
             <div className="text-brand-500 text-sm font-medium">Founder & Research Analyst</div>
          </div>
        </div>
      </section>

      {/* Expertise & Values Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Expertise */}
            <div>
               <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                 <span className="bg-brand-100 p-2 rounded-lg text-brand-600"><TrendingUp size={24}/></span>
                 Areas of Expertise
               </h2>
               <div className="space-y-4">
                  <div className="group p-6 rounded-2xl border border-slate-100 hover:border-brand-200 hover:shadow-lg transition-all cursor-default bg-slate-50 hover:bg-white">
                     <h4 className="font-bold text-slate-900 mb-1 group-hover:text-brand-600 transition-colors">Equity Research</h4>
                     <p className="text-sm text-slate-500">Deep-dive fundamental analysis into company balance sheets and growth prospects.</p>
                  </div>
                  <div className="group p-6 rounded-2xl border border-slate-100 hover:border-brand-200 hover:shadow-lg transition-all cursor-default bg-slate-50 hover:bg-white">
                     <h4 className="font-bold text-slate-900 mb-1 group-hover:text-brand-600 transition-colors">Technical Analysis</h4>
                     <p className="text-sm text-slate-500">Timing entry and exit points using price action and market structure.</p>
                  </div>
                  <div className="group p-6 rounded-2xl border border-slate-100 hover:border-brand-200 hover:shadow-lg transition-all cursor-default bg-slate-50 hover:bg-white">
                     <h4 className="font-bold text-slate-900 mb-1 group-hover:text-brand-600 transition-colors">Portfolio Construction</h4>
                     <p className="text-sm text-slate-500">Designing balanced portfolios aligned with individual risk profiles.</p>
                  </div>
               </div>
            </div>

            {/* Core Values */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                 <span className="bg-accent-100 p-2 rounded-lg text-accent-600"><Shield size={24}/></span>
                 Core Values
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {[
                   { icon: <Target size={20}/>, title: "Integrity", desc: "Unbiased, honest advice." },
                   { icon: <Eye size={20}/>, title: "Transparency", desc: "No hidden agendas." },
                   { icon: <Book size={20}/>, title: "Education", desc: "Empowering investors." },
                   { icon: <Heart size={20}/>, title: "Client First", desc: "Your goals matter most." }
                 ].map((val, idx) => (
                   <div key={idx} className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 mb-4">
                        {val.icon}
                      </div>
                      <h4 className="font-bold text-slate-900 mb-1">{val.title}</h4>
                      <p className="text-xs text-slate-500">{val.desc}</p>
                   </div>
                 ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Modern CTA */}
      <div className="bg-brand-600 py-20 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
           <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Your Investment Journey Today</h2>
           <p className="text-brand-100 mb-10 text-lg max-w-2xl mx-auto">
             Don't navigate the market alone. Get professional, research-backed guidance.
           </p>
           <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact" className="px-8 py-4 bg-white text-brand-600 font-bold rounded-xl hover:bg-slate-100 transition-all shadow-xl flex items-center justify-center gap-2">
                 Schedule Consultation <ArrowRight size={20} />
              </Link>
              <Link to="/services" className="px-8 py-4 bg-transparent border border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-all flex items-center justify-center">
                 Explore Services
              </Link>
           </div>
        </div>
      </div>

    </div>
  );
};

export default Founder;