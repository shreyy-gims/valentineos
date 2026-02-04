'use client';

import { useState, useEffect } from 'react';

const LOADING_MESSAGES = [
  'Booting Valentine OS…',
  'Injecting butterflies…',
  'Calibrating heartbeats…',
  'Locating my favorite person…',
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Typewriter animation
  useEffect(() => {
    const currentMessage = LOADING_MESSAGES[currentMessageIndex];
    let charIndex = 0;

    const typeInterval = setInterval(() => {
      if (charIndex < currentMessage.length) {
        setDisplayedText(currentMessage.substring(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        // Wait before switching message
        const switchTimer = setTimeout(() => {
          if (currentMessageIndex < LOADING_MESSAGES.length - 1) {
            setCurrentMessageIndex(currentMessageIndex + 1);
            setDisplayedText('');
          } else {
            // Last message done, start progress completion
            setProgress(100);
            setIsComplete(true);
          }
        }, 500);
        return () => clearTimeout(switchTimer);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [currentMessageIndex]);

  // Progress bar animation
  useEffect(() => {
    if (isComplete) {
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 800);
      return () => clearTimeout(completeTimer);
    }

    if (currentMessageIndex > 0 && progress < 100) {
      const baseProgress = (currentMessageIndex / LOADING_MESSAGES.length) * 100;
      const animationTimer = setInterval(() => {
        setProgress((prev) => {
          const nextProgress = prev + Math.random() * 10;
          return Math.min(nextProgress, baseProgress);
        });
      }, 200);
      return () => clearInterval(animationTimer);
    }
  }, [currentMessageIndex, progress, isComplete, onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/20 animate-pulse" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-8">
        {/* Typewriter text */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary mb-2 min-h-12">
            {displayedText}
            <span className="animate-blink">|</span>
          </h1>
        </div>

        {/* Heart-shaped progress bar container */}
        <div className="w-48 h-4 bg-muted rounded-full overflow-hidden border-2 border-primary/30">
          <div
            className="h-full bg-gradient-to-r from-primary via-accent to-primary transition-all duration-300 rounded-full shadow-lg shadow-primary/50"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Floating hearts animation */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-float"
              style={{
                left: `${20 + i * 20}%`,
                top: `${30 + i * 10}%`,
                animation: `float ${3 + i}s ease-in-out infinite`,
                opacity: 0.4,
              }}
            >
              ❤️
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%,
          49% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-30px) translateX(10px);
          }
        }

        .animate-blink {
          animation: blink 0.7s infinite;
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
