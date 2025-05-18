"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export function WavyBackground({ 
  children,
  className,
  colors = ["#5a9e74", "#94d76b", "#cbf0b3"],
  waveWidth = 50,
  backgroundFill = "white",
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  id = "wavy-background",
  ...props
}) {
  const svgId = id;
  const animationSpeed = speed === "fast" ? "20s" : speed === "slow" ? "40s" : "30s";
  const [paths, setPaths] = useState([]);
  
  // Generate the wave paths on mount only
  useEffect(() => {
    const generatedPaths = [];
    
    for (let i = 0; i < 5; i++) {
      const defaultWaveWidth = waveWidth;
      const waveHeight = 40;
      // Position the waves higher to start with
      const yPos = 550 + i * 30;
      
      let d = `M 0 ${yPos} Q ${defaultWaveWidth/2} ${yPos + waveHeight}, ${defaultWaveWidth} ${yPos} `;
      
      // Create fixed offsets for each segment to avoid randomness
      for (let x = defaultWaveWidth; x < 1100; x += defaultWaveWidth) {
        const upDown = (i % 2 === 0) ? -1 : 1;
        // Instead of random, use a predictable pattern based on x and i
        const offset = upDown * ((x % 5) + 1);
        d += `T ${x + defaultWaveWidth} ${yPos + offset}`;
      }
      
      // Extend the wave all the way to the bottom of the SVG viewBox
      d += ` T 1100 ${yPos} V 850 H 0 Z`;
      
      generatedPaths.push(d);
    }
    
    setPaths(generatedPaths);
    
    // Apply animations after path generation
    const svg = document.getElementById(svgId);
    if (!svg) return;
    
    const allPaths = svg.querySelectorAll("path");
    allPaths.forEach((path, i) => {
      if (i === allPaths.length - 1) return;
      
      const delay = i * 0.1;
      path.style.animation = `move-wave ${animationSpeed} linear infinite`;
      path.style.animationDelay = `${delay}s`;
    });
  }, [waveWidth, animationSpeed, svgId]);
  
  return (
    <div className={cn("relative flex flex-col items-center justify-center overflow-hidden", className)} {...props}>
      {/* Add a fixed bottom wave section */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-r from-primary/10 to-secondary/10"></div>
      
      <svg
        id={svgId}
        className="absolute inset-0 w-full h-full z-0"
        viewBox="0 0 1100 850" /* Increased the height of the viewBox */
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={`${svgId}-gradient`} x1="0%" y1="0%" x2="100%" y2="0%">
            {colors.map((color, i) => (
              <stop
                key={i}
                offset={`${(i / (colors.length - 1)) * 100}%`}
                stopColor={color}
                stopOpacity={waveOpacity}
              />
            ))}
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill={backgroundFill} />
        <g>
          {paths.map((d, i) => (
            <path
              key={i}
              d={d}
              fill={`url(#${svgId}-gradient)`}
              style={{
                transformOrigin: "center",
                transform: "translate3d(0, 0, 0)",
              }}
            />
          ))}
        </g>
        <filter id={`${svgId}-blur`} x="0" y="0">
          <feGaussianBlur in="SourceGraphic" stdDeviation={blur} />
        </filter>
      </svg>
      <div className="relative z-10 w-full">
        {children}
      </div>
      <div className="spotlight z-0"></div>
    </div>
  );
} 