'use client';

import { useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import AndroidHomeScreen from '@/components/AndroidHomeScreen';
import MusicPlayer from '@/components/MusicPlayer';

export default function Home() {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // Loading screen completes after animations
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 6000); // Typewriter + progress bar animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showLoading ? (
        <LoadingScreen onComplete={() => setShowLoading(false)} />
      ) : (
        <AndroidHomeScreen />
      )}
      {!showLoading && <MusicPlayer />}
    </>
  );
}
