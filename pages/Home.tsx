import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, Shield, TrendingUp, BookOpen, CheckCircle, ArrowRight, Search, Handshake, Sprout, Scale } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import ContactForm from '../components/ContactForm';
import SEO from '../components/SEO';

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
        title="Home" 
        description="Karan Vijayvargiya is a SEBI Registered Research Analyst providing unbiased, data-driven equity research and financial education for long-term wealth creation."
        keywords="SEBI registered research analyst, stock market analysis, equity research, long term investing, Karan Vijayvargiya, fundamental analysis"
      />
      
      {/* Hero Section */}
      <div ref={heroRef} className="relative overflow-hidden bg-slate-900 text-white min-h-[90vh] flex items-center">
        {/* Background Image & Overlay */}
        <motion.div style={{ y: yBg }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-brand-900/90 to-slate-900/80 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=2000&auto=format&fit=crop&fm=webp" 
            alt="Stock Market Graph" 
            className="w-full h-full object-cover opacity-30"
            fetchPriority="high"
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
          <div className="max-w-4xl">
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
              className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight"
            >
              Data-Driven Research. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 to-white">Disciplined Investing.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-brand-200 mb-8 font-medium italic opacity-90"
            >
              (Data par aadharit research. Anushasit nivesh.)
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-2xl text-slate-300 max-w-2xl mb-12 font-light leading-relaxed"
            >
              Navigate the stock market with confidence. We provide unbiased, fundamental research reports designed for sustainable long-term growth—free from market noise.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <Link to="/services" className="px-8 py-4 bg-brand-600 text-white font-bold rounded-xl hover:bg-brand-500 transition-all shadow-lg hover:shadow-brand-500/30 flex items-center justify-center gap-2">
                View Services <ArrowRight size={20} />
              </Link>
              <Link to="/contact" className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all flex items-center justify-center">
                Contact Us
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Feature Strip - Overlapping */}
      <div className="relative z-30 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 -mt-24 mb-20">
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

      {/* Mission Snippet */}
      <section className="py-20 bg-slate-50 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-brand-600 font-bold uppercase tracking-widest text-sm mb-4 block"
          >
            Our Mission
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-8"
          >
            On a Mission
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-600 leading-relaxed text-xl md:text-2xl font-light"
          >
            To provide unbiased, fundamental research and financial education that helps common investors avoid high-risk traps (like F&O) and achieve financial freedom through the power of long-term compounding.
          </motion.p>
        </div>
      </section>

      {/* Highlights/Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7 }}
              className="group relative overflow-hidden bg-slate-900 text-white rounded-3xl p-10 shadow-2xl transition-transform hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <div className="bg-brand-600/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border border-brand-500/30">
                  <BarChart2 className="text-brand-400 w-8 h-8"/>
                </div>
                <h3 className="text-3xl font-bold mb-4">Core Research Insights</h3>
                <p className="text-slate-300 mb-8 text-lg leading-relaxed">In-depth fundamental and technical analysis on stocks, sectors, and market trends. Get comprehensive reports.</p>
                <Link to="/services" className="inline-flex items-center text-brand-300 font-bold hover:text-white transition-colors group-hover:gap-2">
                  Learn More <ArrowRight className="ml-2 w-5 h-5"/>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="group relative overflow-hidden bg-brand-700 text-white rounded-3xl p-10 shadow-2xl transition-transform hover:-translate-y-1"
            >
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
              <div className="relative z-10">
                <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border border-white/20">
                  <TrendingUp className="text-white w-8 h-8"/>
                </div>
                <h3 className="text-3xl font-bold mb-4">Market Outlook & Updates</h3>
                <p className="text-brand-100 mb-8 text-lg leading-relaxed">Stay ahead with our weekly market analysis and sector reviews. Regular updates to keep you informed.</p>
                <Link to="/services" className="inline-flex items-center text-white font-bold hover:text-brand-200 transition-colors group-hover:gap-2">
                  Subscribe Now <ArrowRight className="ml-2 w-5 h-5"/>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-slate-900 mb-4"
            >
              Core Pillars
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-500 max-w-2xl mx-auto"
            >
              The foundation of our research excellence and commitment to your financial growth.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Shield size={28}/>} 
              title="Integrity" 
              desc="We adhere strictly to SEBI (Research Analysts) Regulations, 2014. Honest, fair, and fully compliant advisory." 
              delay={0.1}
            />
            <FeatureCard 
              icon={<Search size={28}/>} 
              title="Research" 
              desc="Data-driven decisions backed by fundamental analysis. We believe in research over speculation." 
              delay={0.2}
            />
            <FeatureCard 
              icon={<Handshake size={28}/>} 
              title="Client-First" 
              desc="Your financial well-being is our priority. Fiduciary advice aligned with your risk profile and goals." 
              delay={0.3}
            />
            <FeatureCard 
              icon={<BookOpen size={28}/>} 
              title="Transparency" 
              desc="Complete disclosure of methodologies, risk factors, and potential conflicts of interest. No hidden agendas." 
              delay={0.4}
            />
            <FeatureCard 
              icon={<Sprout size={28}/>} 
              title="Long-Term" 
              desc="Focus on the power of compounding and sustainable wealth creation through quality investments." 
              delay={0.5}
            />
            <FeatureCard 
              icon={<Scale size={28}/>} 
              title="Unbiased" 
              desc="Zero conflict of interest. 100% independent and objective research solely for your benefit." 
              delay={0.6}
            />
          </div>
        </div>
      </section>

      {/* Founder Teaser */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50, rotate: -5 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, type: "spring" }}
              className="lg:w-1/2 relative"
            >
               <div className="absolute top-4 -left-4 w-full h-full border-2 border-brand-200 rounded-3xl z-0"></div>
               <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
                 <img 
                   src="https://lh3.googleusercontent.com/d/12GfNjWA-HHrpeqmKhSyCgnp7hbAhcneF" 
                   alt="Karan Vijayvargiya" 
                   className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                   referrerPolicy="no-referrer"
                   loading="lazy"
                   decoding="async"
                 />
                 <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-8">
                    <p className="text-white font-bold text-xl">Karan Vijayvargiya</p>
                    <p className="text-brand-300 text-sm">SEBI Registered Research Analyst</p>
                 </div>
               </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <span className="text-brand-600 font-bold uppercase tracking-widest text-sm mb-2 block">Meet the Expert</span>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Experience You Can Trust</h2>
              
              <div className="text-slate-600 mb-8 leading-relaxed text-lg space-y-4">
                <p>Hi, I’m <strong>Karan Vijayvargiya</strong>.</p>
                <p>For the last 8 years, I have lived and breathed the stock market. Through various market cycles—bull runs, corrections, and consolidations—I have learned one thing: Wealth is created through patience and right knowledge.</p>
                <p>I combined my practical market experience with academic rigor by completing my MBA, and further solidified my commitment to ethical advisory by becoming a <strong>SEBI Registered Research Analyst</strong>.</p>
                <p>I started this journey because I saw too many investors losing money on random tips and unverified news. I wanted to change that. Here, I provide you with analysis that is rooted in data, logic, and compliance.</p>
                <p className="font-medium text-slate-800">Join me, and let’s turn your financial goals into reality through disciplined investing.</p>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-10">
                 <div className="border-l-4 border-brand-500 pl-4">
                    <p className="text-3xl font-bold text-slate-900">SEBI</p>
                    <p className="text-slate-500 text-sm">Registered Analyst</p>
                 </div>
                 <div className="border-l-4 border-accent-500 pl-4">
                    <p className="text-3xl font-bold text-slate-900">100%</p>
                    <p className="text-slate-500 text-sm">Transparent Process</p>
                 </div>
              </div>

              <Link to="/founder" className="inline-flex items-center justify-center px-8 py-3 border border-brand-600 text-brand-600 font-bold rounded-full hover:bg-brand-600 hover:text-white transition-all">
                About the Founder
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
             <motion.div 
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="text-white"
             >
                <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
                <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                  Get in touch with us for a free consultation or to know more about our services. We are here to help you navigate the financial markets.
                </p>
                <div className="space-y-4">
                   <motion.div 
                     initial={{ opacity: 0, x: -20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: 0.2 }}
                     className="flex items-center gap-4"
                   >
                      <div className="w-12 h-12 rounded-full bg-brand-800 flex items-center justify-center text-brand-400">
                        <CheckCircle />
                      </div>
                      <div>
                        <h4 className="font-bold">Expert Guidance</h4>
                        <p className="text-slate-400 text-sm">Direct access to analyst insights</p>
                      </div>
                   </motion.div>
                   <motion.div 
                     initial={{ opacity: 0, x: -20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: 0.4 }}
                     className="flex items-center gap-4"
                   >
                      <div className="w-12 h-12 rounded-full bg-brand-800 flex items-center justify-center text-brand-400">
                        <CheckCircle />
                      </div>
                      <div>
                        <h4 className="font-bold">Tailored Strategies</h4>
                        <p className="text-slate-400 text-sm">Plans that fit your capital & goals</p>
                      </div>
                   </motion.div>
                </div>
             </motion.div>
             
             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
             >
                <ContactForm />
             </motion.div>
           </div>
        </div>
      </section>

    </div>
  );
};

export default Home;