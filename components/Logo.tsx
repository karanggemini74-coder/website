import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "h-10 w-10" }) => {
  return (
    <div className={`${className} relative flex items-center justify-center`}>
       <svg 
         viewBox="0 0 100 100" 
         fill="none" 
         xmlns="http://www.w3.org/2000/svg" 
         className="w-full h-full"
         aria-label="Growth Chart Logo"
       >
         {/* Bars */}
         {/* Bar 1: Cyan Blue */}
         <rect x="15" y="50" width="22" height="50" fill="#00b0f0" /> 
         {/* Bar 2: Orange */}
         <rect x="42" y="30" width="22" height="70" fill="#f7941d" /> 
         {/* Bar 3: Yellow */}
         <rect x="69" y="10" width="22" height="90" fill="#fff200" /> 
         
         {/* Arrow Trend Line */}
         {/* Zig-zag pattern: Up to bar 1 top, down slightly, Up to bar 2 top, down slightly, Up to top right */}
         <path 
           d="M5 85 L26 50 L38 60 L53 30 L65 40 L90 10" 
           stroke="#231f20" 
           strokeWidth="6" 
           strokeLinecap="round" 
           strokeLinejoin="round"
         />
         {/* Arrow Head */}
         <path 
           d="M75 10 L90 10 L90 25" 
           stroke="#231f20" 
           strokeWidth="6" 
           strokeLinecap="round" 
           strokeLinejoin="round"
         />

         {/* Stick Figure */}
         {/* Standing on the first bar (Blue), feet at y=50 */}
         <g transform="translate(26, 50)"> {/* Base point at feet */}
           {/* Legs - Walking pose */}
           <path d="M0 0 L-3 -10" stroke="#231f20" strokeWidth="4" strokeLinecap="round" />
           <path d="M0 0 L3 -10" stroke="#231f20" strokeWidth="4" strokeLinecap="round" />
           {/* Body */}
           <path d="M0 -10 L0 -22" stroke="#231f20" strokeWidth="4" strokeLinecap="round" />
           {/* Arms */}
           <path d="M0 -20 L-4 -15" stroke="#231f20" strokeWidth="4" strokeLinecap="round" />
           <path d="M0 -20 L4 -15" stroke="#231f20" strokeWidth="4" strokeLinecap="round" />
           {/* Head */}
           <circle cx="0" cy="-26" r="4.5" fill="#231f20" />
         </g>
       </svg>
    </div>
  );
};

export default Logo;