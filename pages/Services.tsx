import React from 'react';
import { Check, BookOpen, Shield, TrendingUp, Lock, Star } from 'lucide-react';
import { motion } from 'motion/react';
import SEO from '../components/SEO';

const Services: React.FC = () => {
  // Content from screenshot
  const equityFeatures = [
    "Weekly Picks: 4 High-quality stock recommendations every month (Short/Medium Term).",
    "Monthly Wealth Report: 1 Fundamentally strong stock for Long Term Investment.",
    "Bonus Swing Setups: Opportunity-based swing trades (whenever market allows).",
    "Research Reports: Detailed rationale with every recommendation.",
    "Risk Level: Medium."
  ];

  const educationFeatures = [
    "30-Day Access: Complete Stock Market Basics Course (Video/LMS).",
    "Learn the Logic: Understand Why and How to invest.",
    "1 Solid Recommendation: Get 1 Long-Term Stock Pick (Large Cap) at the end of the course (Day 30).",
    "Research Report: Full fundamental analysis included.",
    "Risk Level: Low."
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans overflow-hidden">
        <SEO 
          title="Our Services" 
          description="Explore our research-driven investment strategies, including equity growth packs and beginner's kickstart batches for long-term wealth."
          keywords="investment services, stock recommendations, equity research, stock market course, portfolio management services"
        />
        
        {/* Hero Section */}
        <div className="relative bg-slate-900 pb-32 pt-24 overflow-hidden">
            {/* Abstract Background */}
            <div className="absolute inset-0">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-0 right-0 w-[800px] h-[600px] bg-brand-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
                />
                <motion.div 
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-600/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"
                />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            </div>

            <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-300 text-sm font-semibold mb-8 backdrop-blur-sm"
                >
                    <Star size={14} className="fill-brand-300" /> Premium Advisory
                </motion.div>
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-tight"
                >
                    Research-Driven <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-blue-200 to-white">Investment Strategies</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
                >
                    Designed for clarity, growth, and long-term wealth creation. Choose the path that fits your financial goals.
                </motion.p>
            </div>
        </div>

        {/* Cards Section - Floating Over Hero */}
        <div className="relative z-20 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 -mt-20 mb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                
                {/* Card 1: Equity Growth */}
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7 }}
                  className="group relative flex flex-col h-full"
                >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-[2rem] opacity-75 blur group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative flex flex-col h-full bg-slate-900 rounded-[1.9rem] border border-slate-700/50 p-8 md:p-10 overflow-hidden">
                        
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 text-blue-400">
                                    <TrendingUp size={32} />
                                </div>
                                <span className="px-4 py-1.5 rounded-full bg-blue-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-500/25">
                                    Flagship
                                </span>
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Equity Growth & Wealth Pack</h3>
                            <p className="text-slate-400 text-sm font-medium mb-8">For Serious Investors seeking Long Term Wealth.</p>

                            <div className="space-y-5 mb-10 flex-grow">
                                {equityFeatures.map((item, i) => (
                                    <motion.div 
                                      initial={{ opacity: 0, x: -20 }}
                                      whileInView={{ opacity: 1, x: 0 }}
                                      viewport={{ once: true }}
                                      transition={{ duration: 0.5, delay: i * 0.1 }}
                                      key={i} 
                                      className="flex gap-4"
                                    >
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5">
                                            <Check size={14} className="text-blue-400" />
                                        </div>
                                        <p className="text-slate-300 text-sm leading-relaxed">{item}</p>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-auto">
                                <button disabled className="w-full group/btn relative overflow-hidden rounded-xl bg-slate-800 border border-slate-700 p-4 text-center transition-all cursor-not-allowed mb-3">
                                    <div className="flex items-center justify-center gap-2 text-slate-400 font-semibold">
                                        <Lock size={18} />
                                        <span>Coming Soon</span>
                                    </div>
                                </button>
                                <p className="text-[10px] text-slate-500 text-center bg-slate-800/50 py-2 rounded-lg border border-slate-700/50">
                                    Services are currently paused for new subscriptions pending final integration.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Card 2: Beginner's Kickstart */}
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="group relative flex flex-col h-full"
                >
                    {/* Different gradient for distinction */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-[2rem] opacity-50 blur group-hover:opacity-100 transition duration-500"></div>
                    <div className="relative flex flex-col h-full bg-slate-900 rounded-[1.9rem] border border-slate-700/50 p-8 md:p-10 overflow-hidden">
                         
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-teal-500/10 rounded-2xl border border-teal-500/20 text-teal-400">
                                    <BookOpen size={32} />
                                </div>
                                <span className="px-4 py-1.5 rounded-full bg-teal-900/50 border border-teal-500/30 text-teal-300 text-xs font-bold uppercase tracking-wider">
                                    Education + Advisory
                                </span>
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Beginner's Kickstart Batch</h3>
                            <p className="text-slate-400 text-sm font-medium mb-8">Learn First, Invest Later. Perfect for new entrants.</p>

                            <div className="space-y-5 mb-10 flex-grow">
                                {educationFeatures.map((item, i) => (
                                    <motion.div 
                                      initial={{ opacity: 0, x: -20 }}
                                      whileInView={{ opacity: 1, x: 0 }}
                                      viewport={{ once: true }}
                                      transition={{ duration: 0.5, delay: i * 0.1 }}
                                      key={i} 
                                      className="flex gap-4"
                                    >
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center mt-0.5">
                                            <Check size={14} className="text-teal-400" />
                                        </div>
                                        <p className="text-slate-300 text-sm leading-relaxed">{item}</p>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-auto">
                                <button disabled className="w-full group/btn relative overflow-hidden rounded-xl bg-slate-800 border border-slate-700 p-4 text-center transition-all cursor-not-allowed mb-3">
                                    <div className="flex items-center justify-center gap-2 text-slate-400 font-semibold">
                                        <Lock size={18} />
                                        <span>Coming Soon</span>
                                    </div>
                                </button>
                                <p className="text-[10px] text-slate-500 text-center bg-slate-800/50 py-2 rounded-lg border border-slate-700/50">
                                    Services are currently paused for new subscriptions pending final integration.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>

        {/* How It Works Section - Clean & Light */}
        <div className="py-24 bg-white relative">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.span 
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="text-brand-600 font-bold uppercase tracking-widest text-sm mb-2 block"
                    >
                      Process
                    </motion.span>
                    <motion.h2 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
                    >
                      How It Works
                    </motion.h2>
                    <motion.p 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-slate-500 text-lg"
                    >
                      The Right Way to Invest (Compliance-First Process)
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {/* Connecting Line */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

                    {[
                        { 
                          num: "01", 
                          title: "Register & Complete KYC", 
                          desc: "Sign up with your mobile number and complete your mandatory KYC and Risk Profiling to help us understand your financial goals and risk appetite." 
                        },
                        { 
                          num: "02", 
                          title: "Sign Agreement & Subscribe", 
                          desc: "Review your risk score and sign the mandatory agreement (MITC) via Aadhaar OTP. Once signed, choose your plan and pay the fees to activate services." 
                        },
                        { 
                          num: "03", 
                          title: "Receive Research & Execute", 
                          desc: "Get actionable research reports and recommendations directly on your Dashboard/App. Execute trades via your own broker." 
                        }
                    ].map((step, idx) => (
                        <motion.div 
                          initial={{ opacity: 0, y: 50 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 0.6, delay: idx * 0.2 }}
                          key={idx} 
                          className="relative flex flex-col items-center text-center"
                        >
                            <div className="w-24 h-24 rounded-full bg-white border-4 border-slate-50 shadow-xl flex items-center justify-center mb-8 relative z-10 group hover:border-brand-100 transition-colors duration-300">
                                <span className="text-3xl font-black text-slate-200 group-hover:text-brand-600 transition-colors duration-300">{step.num}</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>

        {/* Regulatory Banner - Subdued but Clear */}
        <div className="bg-slate-50 border-t border-slate-200 py-16">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-5xl mx-auto px-4 text-center"
            >
                <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-sm mb-6">
                    <Shield className="text-slate-400 w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-700 uppercase tracking-widest mb-3">Regulatory Disclaimer</h4>
                <p className="text-xs text-slate-500 leading-relaxed max-w-3xl mx-auto">
                    Investments in securities market are subject to market risks. Read all the related documents carefully before investing. 
                    Registration granted by SEBI, membership of BASL (in case of IAs) and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.
                </p>
            </motion.div>
        </div>

    </div>
  );
};

export default Services;