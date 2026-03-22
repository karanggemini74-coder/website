import React, { useState } from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "h-10 w-10" }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`${className} relative flex items-center justify-center`}>
      {!imgError ? (
        <img 
          src="/logo.png" 
          alt="Karan Vijayvargiya Logo" 
          width="40"
          height="40"
          className="w-full h-full object-contain"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-brand-600 text-white font-bold rounded-lg text-xl shadow-sm">
          KV
        </div>
      )}
    </div>
  );
};

export default Logo;