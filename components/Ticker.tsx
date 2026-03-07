import React from 'react';

const Ticker: React.FC = () => {
  return (
    <div className="bg-slate-900 text-white text-xs py-2 overflow-hidden whitespace-nowrap border-b border-slate-800">
      <div className="inline-block animate-marquee pl-4">
        <span className="mx-4">NIFTY 50 <span className="text-green-400">₹21,850.75 ▲ 0.85%</span></span>
        <span className="mx-4">SENSEX <span className="text-green-400">₹72,240.26 ▲ 0.92%</span></span>
        <span className="mx-4">BANK NIFTY <span className="text-red-400">₹45,320.50 ▼ 0.35%</span></span>
        <span className="mx-4">RELIANCE <span className="text-green-400">₹2,456.30 ▲ 1.25%</span></span>
        <span className="mx-4">TCS <span className="text-red-400">₹3,789.45 ▼ 0.42%</span></span>
        <span className="mx-4">HDFC BANK <span className="text-green-400">₹1,678.90 ▲ 0.68%</span></span>
        <span className="mx-4">INFY <span className="text-green-400">₹1,650.20 ▲ 0.55%</span></span>
        {/* Duplicate for seamless scrolling illusion if we added animation, static for now as per image style */}
      </div>
    </div>
  );
};

export default Ticker;