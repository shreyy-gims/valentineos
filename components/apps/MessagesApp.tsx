'use client';

import { useState, useEffect } from 'react';
import AppHeader from '../AppHeader';

const MESSAGES = [
  { text: 'Khushii ji', delay: 500 },
  { text: 'first of all sorry for everything', delay: 2500 },
  { text: 'i know i have hurt you alot .', delay: 4500 },
  { text: 'So I made this just for you 💕', delay: 6500 },
  { text: 'Open Valentine.exe ❤️', delay: 8500, highlight: true },
];

interface Message {
  text: string;
  delay: number;
  highlight?: boolean;
  visible?: boolean;
}

export default function MessagesApp({ onBack }: { onBack: () => void }) {
  const [messages, setMessages] = useState<Message[]>(
    MESSAGES.map(msg => ({ ...msg, visible: false }))
  );

  useEffect(() => {
    const timers = messages.map((msg, idx) =>
      setTimeout(() => {
        setMessages(prev => {
          const updated = [...prev];
          updated[idx] = { ...updated[idx], visible: true };
          return updated;
        });
      }, msg.delay)
    );

    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <div className="flex flex-col h-full bg-background">
      <AppHeader title="Messages" onBack={onBack} />

      {/* Chat container */}
      <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`transition-all duration-500 transform ${
              msg.visible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
            }`}
          >
            <div
              className={`rounded-xl px-3 py-2 max-w-xs text-xs leading-relaxed ${
                msg.highlight
                  ? 'bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/30'
                  : 'bg-muted text-foreground'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="border-t border-primary/20 p-2 bg-gradient-to-t from-background to-background/50">
        <div className="flex gap-1.5">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-muted text-foreground px-3 py-1.5 rounded-full text-xs placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary"
            disabled
          />
          <button className="bg-primary text-primary-foreground p-1.5 rounded-full hover:bg-accent transition-colors text-lg">
            ❤️
          </button>
        </div>
      </div>
    </div>
  );
}
