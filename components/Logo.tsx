import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "h-10 w-10" }) => {
  return (
    <div className={`${className} relative flex items-center justify-center`}>
      <img 
        src="https://drive.google.com/thumbnail?id=1rwRNttgtEwLPHrDmK3edMtnu0TzBYrhK&sz=w800" 
        alt="Karan Vijayvargiya Logo" 
        className="w-full h-full object-contain"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

export default Logo;