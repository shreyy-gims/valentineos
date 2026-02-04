'use client';

import { useState, useEffect } from 'react';

export default function StatusBar() {
  const [time, setTime] = useState('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-gradient-to-b from-background to-background/80 px-3 py-1 flex items-center justify-between text-xs font-semibold text-foreground/80 border-b border-primary/10">
      {/* Time */}
      <span className="text-xs">{time}</span>

      {/* Icons */}
      <div className="flex items-center gap-0.5">
        {/* Signal */}
        <div className="flex gap-px">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-0.5 bg-foreground rounded-sm"
              style={{ height: `${i * 1.5}px` }}
            />
          ))}
        </div>

        {/* Wi-Fi */}
        <svg
          className="w-2.5 h-2.5 text-foreground/60"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
        </svg>

        {/* Heart battery */}
        <div className="w-4 h-2 border border-foreground/60 rounded-sm flex items-center px-0.5">
          <span className="text-red-500 text-xs">❤️</span>
        </div>
      </div>
    </div>
  );
}
