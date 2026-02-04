'use client';

import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import AppHeader from '../AppHeader';
import Confetti from '../Confetti';

type Stage = 'proposal' | 'success';

export default function ValentineApp({ onBack }: { onBack: () => void }) {
  const [stage, setStage] = useState<Stage>('proposal');
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [attemptCount, setAttemptCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [screenshotTaken, setScreenshotTaken] = useState(false);

  const noButtonRef = useRef<HTMLButtonElement>(null);
  const successScreenRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 🎵 Initialize audio ONCE
  useEffect(() => {
    audioRef.current = new Audio('/meribano.mp3');
    audioRef.current.volume = 0.4;

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const handleYes = () => {
    setStage('success');
    setShowConfetti(true);

    audioRef.current?.play().catch(() => {
      console.log('Audio autoplay blocked');
    });
  };

  const handleBack = () => {
    audioRef.current?.pause();
    if (audioRef.current) audioRef.current.currentTime = 0;
    onBack();
  };

  const handleNoHover = () => {
    const randomX = (Math.random() - 0.5) * 200;
    const randomY = (Math.random() - 0.5) * 150;
    setNoButtonPos({ x: randomX, y: randomY });
    setAttemptCount(prev => prev + 1);
  };

  const handleNoTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    handleNoHover();
  };

  const teaseMessages = [
    'Yrr Pleasee 😜',
    'Esa kroge ab aap?',
    'Not a valid answer 💕',
    'Try YES! ❤️',
  ];

  const currentTease =
    teaseMessages[Math.min(attemptCount - 1, teaseMessages.length - 1)];

  const takeScreenshot = async () => {
    if (!successScreenRef.current) return;

    const canvas = await html2canvas(successScreenRef.current, {
      backgroundColor: '#fff',
      scale: 2,
      useCORS: true,
    });

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `Valentine-Yes-${Date.now()}.png`;
    link.click();

    setScreenshotTaken(true);
    setTimeout(() => setScreenshotTaken(false), 2000);
  };

  // 💖 SUCCESS SCREEN
  if (stage === 'success') {
    return (
      <div className="flex flex-col h-full bg-gradient-to-b from-primary/20 via-background to-accent/10 relative overflow-hidden">
        <AppHeader title="Valentine.exe" onBack={handleBack} showBack={false} />

        {showConfetti && <Confetti />}

        <div className="flex-1 flex flex-col items-center justify-center gap-5 px-4 z-10">
          <div ref={successScreenRef} className="flex flex-col items-center gap-3">
            <div className="text-5xl animate-bounce">💌</div>
            <h1 className="text-3xl font-bold text-primary">YAY 💕</h1>
            <p className="text-lg font-semibold">I knew it!</p>
            <p className="text-sm text-center text-muted-foreground">
              Thank you for being my Valentine 💖
            </p>
          </div>

          <div className="flex gap-3 w-full max-w-sm">
            <button
              onClick={takeScreenshot}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold transition ${
                screenshotTaken
                  ? 'bg-green-500 text-white'
                  : 'bg-accent hover:bg-primary'
              }`}
            >
              {screenshotTaken ? '✓ Saved!' : '📸 Share'}
            </button>

            <button
              onClick={handleBack}
              className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:bg-accent"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 💌 PROPOSAL SCREEN
  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-primary/20 via-background to-accent/10">
      <AppHeader title="Valentine.exe" onBack={onBack} />

      <div className="flex-1 flex flex-col items-center justify-center gap-5 px-4">
        <div className="text-5xl animate-pulse">💌</div>

        <h1 className="text-2xl font-bold text-primary text-center">
          Will you be my Valentine?
        </h1>

        <div className="flex flex-col gap-3 w-full max-w-xs">
          <button
            onClick={handleYes}
            className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:bg-accent transition transform hover:scale-105"
          >
            YES 💖
          </button>

          <div className="relative h-12 flex justify-center items-center">
            <button
              ref={noButtonRef}
              onMouseEnter={handleNoHover}
              onTouchStart={handleNoTouchStart}
              className="absolute bg-muted px-4 py-2 rounded-lg font-bold transition"
              style={{
                transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
              }}
            >
              NO 🙅‍♀️
            </button>
          </div>
        </div>

        {attemptCount > 0 && (
          <p className="text-xs font-semibold text-primary animate-pulse">
            {currentTease}
          </p>
        )}
      </div>
    </div>
  );
}
