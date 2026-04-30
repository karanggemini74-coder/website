import React, { useEffect, useState } from 'react';
import { Check, BookOpen, Shield, TrendingUp, Lock, Star, Briefcase, LineChart, Link as LinkIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const iconMap: Record<string, React.ReactNode> = {
  TrendingUp: <TrendingUp size={32} />,
  BookOpen: <BookOpen size={32} />,
  Shield: <Shield size={32} />,
  Lock: <Lock size={32} />,
  Star: <Star size={32} />,
  Briefcase: <Briefcase size={32} />,
  LineChart: <LineChart size={32} />
};

const themeMap: Record<string, any> = {
  blue: { bgGrad: 'from-blue-600 to-cyan-600', text: 'text-blue-400', bgLight: 'bg-blue-500/10', border: 'border-blue-500/20', bgSolid: 'bg-blue-500', shadow: 'shadow-blue-500/25', btnObj: 'bg-blue-600 hover:bg-blue-500 border-blue-500' },
  teal: { bgGrad: 'from-teal-500 to-emerald-500', text: 'text-teal-400', bgLight: 'bg-teal-500/10', border: 'border-teal-500/20', bgSolid: 'bg-teal-500', shadow: 'shadow-teal-500/25', btnObj: 'bg-teal-600 hover:bg-teal-500 border-teal-500' },
  purple: { bgGrad: 'from-purple-600 to-fuchsia-600', text: 'text-purple-400', bgLight: 'bg-purple-500/10', border: 'border-purple-500/20', bgSolid: 'bg-purple-500', shadow: 'shadow-purple-500/25', btnObj: 'bg-purple-600 hover:bg-purple-500 border-purple-500' },
  emerald: { bgGrad: 'from-emerald-600 to-green-500', text: 'text-emerald-400', bgLight: 'bg-emerald-500/10', border: 'border-emerald-500/20', bgSolid: 'bg-emerald-500', shadow: 'shadow-emerald-500/25', btnObj: 'bg-emerald-600 hover:bg-emerald-500 border-emerald-500' },
  indigo: { bgGrad: 'from-indigo-600 to-blue-500', text: 'text-indigo-400', bgLight: 'bg-indigo-500/10', border: 'border-indigo-500/20', bgSolid: 'bg-indigo-500', shadow: 'shadow-indigo-500/25', btnObj: 'bg-indigo-600 hover:bg-indigo-500 border-indigo-500' }
};

const ServicesSection: React.FC = () => {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch('/api/plans');
        const data = await res.json();
        if (Array.isArray(data)) {
          setPlans(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  return (
    <div id="services" className="bg-slate-50 font-sans overflow-hidden">
        
        {/* Header Section */}
        <div className="relative bg-slate-50 py-24 overflow-hidden border-t border-slate-200">
            <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-200 bg-brand-50 text-brand-600 text-sm font-semibold mb-8 backdrop-blur-sm"
                >
                    <Star size={14} className="fill-brand-600" /> Premium Advisory
                </motion.div>
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight"
                >
                    Research-Driven <br className="hidden md:block" />
                    <span className="text-brand-600">Investment Strategies</span>
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
                >
                    Designed for clarity, growth, and long-term wealth creation. Choose the path that fits your financial goals.
                </motion.p>
            </div>
        </div>

        {/* Cards Section */}
        <div className="relative z-20 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-24">
            {loading ? (
                <div className="flex justify-center items-center py-20 bg-white rounded-[2rem] border border-slate-200">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
                </div>
            ) : plans.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-[2rem] border border-slate-200">
                     <Briefcase className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                     <h3 className="text-xl font-bold text-slate-800 mb-2">No Plans Available</h3>
                     <p className="text-slate-500">Please check back later for updated investment strategies.</p>
                </div>
            ) : (
                <div className="flex flex-wrap justify-center items-stretch gap-8 lg:gap-12 w-full max-w-7xl mx-auto">
                    {plans.map((plan, index) => {
                        const theme = themeMap[plan.theme_color] || themeMap.blue;
                        let features = [];
                        try {
                            features = JSON.parse(plan.features) || [];
                        } catch(e) {}

                        return (
                            <motion.div 
                                key={plan.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.7, delay: index * 0.1 }}
                                className="group relative flex flex-col w-full md:flex-1 md:min-w-[450px] max-w-[600px]"
                            >
                                <div className="absolute -inset-0.5 bg-slate-200 rounded-[2rem] opacity-50 blur group-hover:opacity-100 transition duration-500"></div>
                                <div className="relative flex flex-col h-full bg-white rounded-[1.9rem] border border-slate-200 p-8 md:p-10 overflow-hidden shadow-sm hover:shadow-xl transition-shadow">
                                    
                                    {/* Background Decoration */}
                                    <div className={`absolute top-0 right-0 w-64 h-64 ${theme.bgLight} rounded-full blur-3xl -translate-y-1/2 translate-x-1/2`}></div>
                                    
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className={`p-3 ${theme.bgLight} rounded-2xl border ${theme.border} ${theme.text}`}>
                                                {iconMap[plan.icon_name] || <TrendingUp size={32} />}
                                            </div>
                                            {plan.is_popular ? (
                                                <span className={`px-4 py-1.5 rounded-full ${theme.bgSolid} text-white text-xs font-bold uppercase tracking-wider ${theme.shadow}`}>
                                                    Flagship
                                                </span>
                                            ) : (
                                                <span className={`px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-500 text-xs font-bold uppercase tracking-wider`}>
                                                    Standard
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{plan.title}</h3>
                                        <p className="text-slate-500 text-sm font-medium mb-8">{plan.subtitle}</p>

                                        <div className="space-y-5 mb-8 flex-grow">
                                            {features.map((item: string, i: number) => (
                                                <motion.div 
                                                  initial={{ opacity: 0, x: -20 }}
                                                  whileInView={{ opacity: 1, x: 0 }}
                                                  viewport={{ once: true }}
                                                  transition={{ duration: 0.5, delay: i * 0.1 }}
                                                  key={i} 
                                                  className="flex gap-4"
                                                >
                                                    <div className={`flex-shrink-0 w-6 h-6 rounded-full ${theme.bgLight} flex items-center justify-center mt-0.5`}>
                                                        <Check size={14} className={theme.text} />
                                                    </div>
                                                    <p className="text-slate-600 text-sm leading-relaxed">{item}</p>
                                                </motion.div>
                                            ))}
                                        </div>

                                        <div className="mt-auto">
                                            {plan.price_monthly && (
                                                <div className="mb-2 flex justify-between items-end border-b border-slate-100 pb-2">
                                                    <div>
                                                        <span className="text-slate-500 text-sm font-medium block">Monthly</span>
                                                        <Link to={`/onboarding?plan=${encodeURIComponent(plan.title)}&term=Monthly&price=${encodeURIComponent(plan.price_monthly)}`} className={`text-xs ${theme.text} hover:text-brand-700 transition mt-1 inline-block font-bold`}>+ Subscribe Monthly</Link>
                                                    </div>
                                                    <span className="text-xl font-bold text-slate-900">{plan.price_monthly}</span>
                                                </div>
                                            )}
                                            {plan.price_quarterly && (
                                                <div className="mb-2 flex justify-between items-end border-b border-slate-100 pb-2">
                                                    <div>
                                                        <span className="text-slate-500 text-sm font-medium block">Quarterly</span>
                                                        <Link to={`/onboarding?plan=${encodeURIComponent(plan.title)}&term=Quarterly&price=${encodeURIComponent(plan.price_quarterly)}`} className={`text-xs ${theme.text} hover:text-brand-700 transition mt-1 inline-block font-bold`}>+ Subscribe Quarterly</Link>
                                                    </div>
                                                    <span className="text-xl font-bold text-slate-900">{plan.price_quarterly}</span>
                                                </div>
                                            )}
                                            {plan.price_half_yearly && (
                                                <div className="mb-2 flex justify-between items-end border-b border-slate-100 pb-2">
                                                    <div>
                                                        <span className="text-slate-500 text-sm font-medium block">Half Yearly</span>
                                                        <Link to={`/onboarding?plan=${encodeURIComponent(plan.title)}&term=Half Yearly&price=${encodeURIComponent(plan.price_half_yearly)}`} className={`text-xs ${theme.text} hover:text-brand-700 transition mt-1 inline-block font-bold`}>+ Subscribe Half Yearly</Link>
                                                    </div>
                                                    <span className="text-xl font-bold text-slate-900">{plan.price_half_yearly}</span>
                                                </div>
                                            )}
                                            {plan.price_yearly && (
                                                <div className="mb-2 flex justify-between items-end border-b border-slate-100 pb-2">
                                                    <div>
                                                        <span className="text-slate-500 text-sm font-medium block">Yearly</span>
                                                        <Link to={`/onboarding?plan=${encodeURIComponent(plan.title)}&term=Yearly&price=${encodeURIComponent(plan.price_yearly)}`} className={`text-xs ${theme.text} hover:text-brand-700 transition mt-1 inline-block font-bold`}>+ Subscribe Yearly</Link>
                                                    </div>
                                                    <span className="text-xl font-bold text-slate-900">{plan.price_yearly}</span>
                                                </div>
                                            )}
                                            {plan.price_one_time && (
                                                <div className="mb-4 flex justify-between items-end border-b border-slate-100 pb-2">
                                                    <div>
                                                        <span className="text-slate-500 text-sm font-medium block">One-Time</span>
                                                        <Link to={`/onboarding?plan=${encodeURIComponent(plan.title)}&term=One-Time&price=${encodeURIComponent(plan.price_one_time)}`} className={`text-xs ${theme.text} hover:text-brand-700 transition mt-1 inline-block font-bold`}>+ Subscribe One-Time</Link>
                                                    </div>
                                                    <span className="text-2xl font-bold text-slate-900">{plan.price_one_time}</span>
                                                </div>
                                            )}
                                            {/* Spacer */}
                                            <div className="mb-6"></div>
                                            
                                            {(() => {
                                                const defaultTerm = plan.price_yearly ? 'Yearly' : plan.price_half_yearly ? 'Half Yearly' : plan.price_quarterly ? 'Quarterly' : plan.price_monthly ? 'Monthly' : plan.price_one_time ? 'One-Time' : 'Standard';
                                                const defaultPrice = plan.price_yearly || plan.price_half_yearly || plan.price_quarterly || plan.price_monthly || plan.price_one_time || 'Variable';
                                                return (
                                                    <Link to={`/onboarding?plan=${encodeURIComponent(plan.title)}&term=${defaultTerm}&price=${encodeURIComponent(defaultPrice)}`} className={`block w-full group/btn relative overflow-hidden rounded-xl ${theme.bgSolid} ${theme.border} border p-4 text-center transition-all shadow-md mb-3 hover:shadow-lg hover:-translate-y-0.5`}>
                                                        <div className="flex items-center justify-center gap-2 text-white font-bold">
                                                            <span>Proceed to Onboarding</span>
                                                        </div>
                                                    </Link>
                                                );
                                            })()}
                                            <p className="text-[10px] text-slate-500 text-center bg-slate-50 py-2 rounded-lg border border-slate-100">
                                                100% Secure Onboarding Process
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}
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
                    Registration granted by SEBI, membership of BASL and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.
                </p>
            </motion.div>
        </div>

    </div>
  );
};

export default ServicesSection;