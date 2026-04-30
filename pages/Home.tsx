import React, { useRef } from 'react';
import { BarChart2, Shield, TrendingUp, BookOpen, CheckCircle, ArrowRight, Search, Handshake, Sprout, Scale, LineChart, PieChart } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SEO from '../components/SEO';
import MissionSection from '../components/MissionSection';
import FounderSection from '../components/FounderSection';
import ServicesSection from '../components/ServicesSection';
import ContactSection from '../components/ContactSection';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; desc: string; delay?: number }> = ({ icon, title, desc, delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay }}
    className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-brand-100 transition-all duration-300"
  >
    <div className="bg-brand-50 w-14 h-14 rounded-xl flex items-center justify-center text-brand-600 mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-700 transition-colors">{title}</h3>
    <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
  </motion.div>
);

const Home: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scaleText = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 overflow-hidden">
      <SEO 
        title="SEBI Registered Research Analyst India | Long Term & Small Cap Stock Research" 
        description="SEBI Registered Research Analyst providing independent stock research, small cap analysis, and long-term investment insights for Indian investors."
        keywords="SEBI registered research analyst, stock market analysis, equity research, long term investing, Karan Vijayvargiya, fundamental analysis"
      />
      
      {/* Hero Section */}
      <div ref={heroRef} className="relative overflow-hidden bg-slate-900 text-white min-h-[90vh] flex items-center">
        {/* Background Image & Overlay */}
        <motion.div style={{ y: yBg }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-brand-900/90 to-slate-900/80 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1200&auto=format&fit=crop" 
            alt="Stock Market Graph" 
            className="w-full h-full object-cover opacity-30"
            fetchPriority="high"
            width="1200"
            height="800"
            loading="eager"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        {/* Decorative blobs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-0 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl z-10"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 left-0 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl z-10"
        />

        <motion.div 
          style={{ opacity: opacityText, scale: scaleText, y: useTransform(scrollYProgress, [0, 1], ["0%", "30%"]) }}
          className="relative z-20 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 w-full py-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 max-w-4xl">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-brand-100 text-sm font-medium mb-8"
              >
                 <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                 SEBI Registered Research Analyst (Reg. No. INH000025470)
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight"
              >
                SEBI Registered Research Analyst for <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-white">Long-Term & Small Cap Stock</span> Research in India
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-brand-100 mb-6 font-medium leading-relaxed"
              >
                Get unbiased, research-driven stock recommendations focused on fundamentally strong companies and long-term wealth creation.
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-lg text-slate-300 max-w-2xl mb-12 font-light leading-relaxed"
              >
                We provide independent equity research, small cap analysis, and long-term investment insights to help investors make disciplined, data-driven decisions in the Indian stock market.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-6"
              >
                <a href="#services" className="px-8 py-4 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-500 transition-all shadow-lg hover:shadow-brand-500/30 flex items-center justify-center gap-2">
                  View Services <ArrowRight size={20} />
                </a>
                <a href="#contact" className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all flex items-center justify-center">
                  Contact Us
                </a>
              </motion.div>
            </div>

            {/* Right Side Premium Terminal Mockup */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:block lg:col-span-5 relative perspective-1000"
            >
              <motion.div 
                animate={{ rotateY: [-2, 2, -2], rotateX: [2, -2, 2] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full max-w-lg mx-auto"
              >
                {/* Main App Mockup */}
                <div className="bg-[#0B1120]/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden relative z-10">
                  {/* Header */}
                  <div className="px-4 py-3 border-b border-slate-800/80 flex justify-between items-center bg-slate-900/50">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <div className="text-slate-400 text-xs font-mono flex items-center gap-2">
                      <Shield size={12} className="text-brand-400" />
                      SEBI: INH000025470
                    </div>
                  </div>
                  
                  {/* Body */}
                  <div className="p-6">
                    <div className="flex justify-between items-end mb-8">
                      <div>
                        <p className="text-slate-400 text-sm mb-1 font-medium tracking-wide uppercase">Small Cap Index Focus</p>
                        <h3 className="text-3xl font-bold text-white tracking-tight">Data-Driven</h3>
                      </div>
                      <div className="flex gap-1.5 items-end h-12">
                        {[40, 70, 45, 90, 65, 100, 80].map((h, i) => (
                          <motion.div 
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${h}%` }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                            className="w-2.5 bg-brand-500 rounded-t-sm opacity-80"
                          />
                        ))}
                      </div>
                    </div>

                    {/* Data Rows */}
                    <div className="space-y-3 mb-8">
                      {[
                        { label: 'Fundamental Score', val: '92/100', color: 'bg-green-500' },
                        { label: 'Valuation Gap', val: '+45%', color: 'bg-brand-400' },
                        { label: 'Risk Adjusted', val: 'High', color: 'bg-accent-500' }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50">
                          <span className="text-slate-300 text-sm font-medium">{item.label}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-white font-bold">{item.val}</span>
                            <div className={`w-2 h-2 rounded-full ${item.color} shadow-[0_0_8px_rgba(0,0,0,0.5)]`}></div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Decorative Line Chart */}
                    <div className="relative h-28 w-full mt-4">
                      <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                        <motion.path
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 2, ease: "easeInOut" }}
                          d="M0,35 Q10,25 20,30 T40,15 T60,20 T80,5 T100,0"
                          fill="none"
                          stroke="url(#gradient)"
                          strokeWidth="3"
                          strokeLinecap="round"
                          className="drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#10b981" />
                          </linearGradient>
                        </defs>
                      </svg>
                      
                      {/* Floating Data Point */}
                      <motion.div 
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 2, duration: 0.5 }}
                        className="absolute top-[-10px] right-[-10px] bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-lg"
                      >
                        +Alpha
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Floating Badge 1 */}
                <motion.div 
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -right-6 top-12 bg-white p-4 rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-4 z-20"
                >
                  <div className="bg-brand-100 p-2.5 rounded-xl text-brand-600">
                    <Search size={22} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Analysis</p>
                    <p className="text-sm text-slate-900 font-extrabold">Deep Dive</p>
                  </div>
                </motion.div>

                {/* Floating Badge 2 */}
                <motion.div 
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -left-6 bottom-16 bg-slate-900 p-4 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-4 z-20"
                >
                  <div className="bg-green-500/20 p-2.5 rounded-xl text-green-400">
                    <TrendingUp size={22} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Focus</p>
                    <p className="text-sm text-white font-extrabold">Long-Term</p>
                  </div>
                </motion.div>

              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Feature Strip - Overlapping */}
      <div className="relative z-30 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 -mt-24 mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100"
        >
          <div className="text-center px-4">
             <div className="text-brand-600 font-extrabold text-3xl md:text-4xl mb-2">Data</div>
             <p className="text-slate-500 font-medium uppercase tracking-wider text-xs">Driven Research</p>
          </div>
          <div className="text-center px-4">
             <div className="text-brand-600 font-extrabold text-3xl md:text-4xl mb-2">100%</div>
             <p className="text-slate-500 font-medium uppercase tracking-wider text-xs">Independent Analysis</p>
          </div>
          <div className="text-center px-4">
             <div className="text-brand-600 font-extrabold text-3xl md:text-4xl mb-2">Unbiased</div>
             <p className="text-slate-500 font-medium uppercase tracking-wider text-xs">Recommendations</p>
          </div>
          <div className="text-center px-4">
             <div className="text-brand-600 font-extrabold text-3xl md:text-4xl mb-2">Equity</div>
             <p className="text-slate-500 font-medium uppercase tracking-wider text-xs">Research Focus</p>
          </div>
        </motion.div>
      </div>

      {/* SEO Section - Clean & Minimal Layout */}
      <section className="pt-24 pb-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Centered Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-600 font-medium text-sm mb-6 shadow-sm"
            >
              <Shield size={16} className="text-brand-600" />
              <span>SEBI Registered Research Analyst</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight"
            >
              Independent Equity Research for Serious Investors
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-600 leading-relaxed"
            >
              We provide unbiased, data-backed stock recommendations designed to help you navigate the complexities of the Indian stock market with confidence.
            </motion.p>
          </div>

          {/* Clean 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <TrendingUp size={28} className="text-brand-600" />,
                title: "Long-Term Wealth",
                desc: "Strategic stock research focused on sustainable wealth creation and compounding."
              },
              {
                icon: <Search size={28} className="text-brand-600" />,
                title: "Fundamental Analysis",
                desc: "Rigorous evaluation of Indian equities, financial statements, and business models."
              },
              {
                icon: <LineChart size={28} className="text-brand-600" />,
                title: "Small Cap Focus",
                desc: "In-depth research reports on high-growth emerging companies with strong potential."
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + (index * 0.1) }}
                className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 rounded-xl bg-brand-50 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <MissionSection />

      <ServicesSection />
      
      <FounderSection />

      <ContactSection />

    </div>
  );
};

export default Home;