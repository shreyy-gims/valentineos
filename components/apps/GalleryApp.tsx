'use client';

import { useState } from 'react';
import Image from 'next/image';
import AppHeader from '../AppHeader';

const GALLERY_QUOTES = [
  {
    id: 1,
    quote: 'You are my favorite notification',
    image: '/AA1.jpeg',
  },
  {
    id: 2,
    quote: 'Every moment with you feels like a dream',
    image: '/AA2.jpeg',
  },
  {
    id: 3,
    quote: 'My heart chose you before my mind knew',
    image: '/AA3.jpeg',
  },
  {
    id: 4,
    quote: 'You make my world colorful',
    image: '/AA4.jpeg',
  },
  {
    id: 5,
    quote: 'Forever is not long enough with you',
    image: '/AA5.jpeg',
  },
  {
    id: 6,
    quote: 'You are my happily ever after',
    image: '/AA6.jpeg',
  },
];

interface Card {
  id: number;
  isFlipped: boolean;
  quote: string;
  image: string;
}

export default function GalleryApp({ onBack }: { onBack: () => void }) {
  const [cards, setCards] = useState<Card[]>(
    GALLERY_QUOTES.map(item => ({
      id: item.id,
      isFlipped: false,
      quote: item.quote,
      image: item.image,
    }))
  );

  const toggleFlip = (id: number) => {
    setCards(prev =>
      prev.map(card =>
        card.id === id
          ? { ...card, isFlipped: !card.isFlipped }
          : card
      )
    );
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <AppHeader title="Gallery" onBack={onBack} />

      <div className="flex-1 overflow-y-auto p-2">
        <div className="grid grid-cols-2 gap-3">
          {cards.map(card => (
            <div
              key={card.id}
              className="h-32 cursor-pointer perspective"
              onClick={() => toggleFlip(card.id)}
            >
              <div
                className="relative w-full h-full transition-transform duration-500 transform-gpu"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: card.isFlipped
                    ? 'rotateY(180deg)'
                    : 'rotateY(0deg)',
                }}
              >
                {/* FRONT — IMAGE */}
                <div
                  className="absolute inset-0 rounded-lg overflow-hidden shadow-lg"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <Image
                    src={card.image}
                    alt="gallery image"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* BACK — QUOTE */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center p-3 shadow-lg"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <p className="text-center text-xs font-semibold text-primary-foreground leading-snug">
                    {card.quote}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
