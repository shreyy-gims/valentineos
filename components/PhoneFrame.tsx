'use client';

import React from 'react';

export default function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-background via-background to-primary/10 p-4">
      {/* Outer phone bezel */}
      <div className="relative w-full max-w-sm aspect-[9/16] bg-black rounded-3xl shadow-2xl overflow-hidden border-8 border-black">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-50" />

        {/* Screen content */}
        <div className="relative w-full h-full bg-background overflow-hidden flex flex-col">
          {/* Live wallpaper - floating hearts */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute text-4xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${4 + Math.random() * 2}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              >
                ❤️
              </div>
            ))}
          </div>

          {/* App content */}
          <div className="relative z-10 w-full h-full overflow-hidden flex flex-col">
            {children}
          </div>
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-foreground rounded-full z-50" />
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100vh) translateX(50px) scale(0.8);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
