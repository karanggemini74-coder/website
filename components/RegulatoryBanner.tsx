import React from 'react';

const RegulatoryBanner: React.FC = () => {
  return (
    <div className="bg-slate-50 border-b border-slate-200 text-slate-700 text-[11px] md:text-xs font-semibold py-2 px-4 text-center tracking-wide">
      <p>
        Investment in securities market are subject to market risks. Read all the related documents carefully before investing.
      </p>
    </div>
  );
};

export default RegulatoryBanner;