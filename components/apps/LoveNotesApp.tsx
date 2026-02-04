'use client';

import { useState } from 'react';
import AppHeader from '../AppHeader';

const LOVE_NOTES = [
  {
    id: 1,
    title: 'First Thoughts bout you',
    content:
      'The moment we first talked in insta, I never knew tht this bond will stay this longer,The world seems brighter when you are around, and I find myself smiling at the thought of you even when we are apart. Your presence brings a warmth to my heart that I have never felt before.',
  },
  {
    id: 2,
    title: 'Your Magic in ma life',
    content:
      'You have this magic that makes everything else fade away when you’re around. I swear, I’ve fallen for you—khikhikhi—and I don’t even try to hide it. I miss you, and I really miss those little stories you told me about your village. They made me feel closer to you, like home was speaking to me.',
  },
  {
    id: 3,
    title: 'Forever',
    content:
      'I want you to know this isn’t just a crush for me. I’m really serious bout you this time. I see a future when I think of us—sharing days, dreams, and growing together. I don’t want something temporary; I want something real, with trust, effort, and commitment. If I choose you, I choose you completely khushi',
  },
  {
    id: 4,
    title: 'A Promise',
    content:
      'I’m choosing you with a full heart. I promise to be loyal, honest, and by your side in every good and bad moment. I want to grow with you, laugh with you, and hold your hand through everything life brings. This isn’t temporary for me—I want us, today, tomorrow, and for all my days, until my last breath.',
  },
];

interface Note {
  id: number;
  title: string;
  content: string;
}

export default function LoveNotesApp({ onBack }: { onBack: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentNote = LOVE_NOTES[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev === 0 ? LOVE_NOTES.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev === LOVE_NOTES.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <AppHeader title="Love Notes" onBack={onBack} />

      {/* Note display */}
      <div className="flex-1 overflow-hidden flex flex-col p-2">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full bg-gradient-to-br from-pink-100 to-primary/10 rounded-2xl p-4 shadow-lg border-2 border-primary/20">
            {/* Handwritten style title */}
            <h2 className="text-lg font-bold text-primary mb-2 text-center italic">
              {currentNote.title}
            </h2>

            {/* Content */}
            <p className="text-foreground/80 leading-relaxed text-xs text-justify mb-3 max-h-32 overflow-y-auto">
              {currentNote.content}
            </p>

            {/* Signature */}
            <p className="text-right text-primary italic font-semibold text-xs">
              All my love ❤️
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-2 mt-3">
          <button
            onClick={goToPrevious}
            className="flex-1 bg-muted hover:bg-muted/80 text-foreground py-1.5 rounded-lg transition-colors font-semibold text-xs"
          >
            ← Prev
          </button>

          {/* Dots indicator */}
          <div className="flex gap-1">
            {LOVE_NOTES.map((_, idx) => (
              <div
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === currentIndex ? 'bg-primary w-4' : 'bg-primary/30'
                }`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            className="flex-1 bg-primary hover:bg-accent text-primary-foreground py-1.5 rounded-lg transition-colors font-semibold text-xs"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
