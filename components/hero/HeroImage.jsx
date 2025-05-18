"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function HeroImage() {
  // For floating animation effect
  const [offsetY, setOffsetY] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setOffsetY(prev => {
        // Create a gentle floating effect between -5px and 5px
        return Math.sin(Date.now() / 1000) * 5;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[400px] md:h-[500px] w-full">
      <div 
        className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl backdrop-blur-sm"
        style={{ transform: `translateY(${offsetY}px)` }}
      ></div>
      
      {/* Feature callouts */}
      <div className="absolute -top-4 left-1/4 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg text-xs font-medium text-primary border border-primary/20 hidden sm:flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-recycle">
          <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"></path>
          <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"></path>
          <path d="m14 16-3 3 3 3"></path>
          <path d="M8.293 13.596 4.525 7.88a1.786 1.786 0 0 1-.097-1.765A1.83 1.83 0 0 1 6 5h4.605"></path>
          <path d="m10 5 3-3 3 3"></path>
          <path d="M18.364 6.1 16.357 9.6a1.786 1.786 0 0 0-.136 1.718 1.83 1.83 0 0 0 1.57.882H19"></path>
          <path d="m16 10 4 2-4 2"></path>
        </svg>
        Reduce Waste
      </div>
      
      <div className="absolute top-1/4 right-10 transform rotate-3 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg text-xs font-medium text-secondary border border-secondary/20 hidden md:flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-wallet">
          <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
          <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
          <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
        </svg>
        Earn Rewards
      </div>
      
      <div className="absolute bottom-10 left-10 transform -rotate-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg text-xs font-medium text-primary/90 border border-primary/20 hidden md:flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          <path d="M2 12h20"></path>
        </svg>
        Help the Planet
      </div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="relative w-full h-full max-w-[90%] max-h-[90%]"
          style={{ transform: `translateY(${offsetY}px)` }}
        >
          <Image
            src="/images/recycling-hero.svg"
            alt="Plastic Recycling Illustration"
            fill
            priority
            className="object-contain drop-shadow-lg"
          />
        </div>
      </div>
      
      {/* Floating elements for visual interest */}
      <div className="absolute -top-6 right-20 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 -left-6 w-36 h-36 bg-secondary/10 rounded-full blur-xl"></div>
    </div>
  );
} 