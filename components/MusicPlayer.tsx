'use client';

import { useState, useEffect, useRef } from 'react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.volume = 0.2;
      audio.play().catch(() => {
        // Autoplay might be blocked
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="https://on.soundcloud.com/AYePfgiMwq3nxoOnWU"
        loop
      />
      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-40 bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center hover:bg-accent transition-all hover:shadow-lg shadow-primary/30 transform hover:scale-110 active:scale-95"
        title={isPlaying ? 'Mute music' : 'Play music'}
      >
        {isPlaying ? '🔊' : '🔇'}
      </button>
    </>
  );
}
