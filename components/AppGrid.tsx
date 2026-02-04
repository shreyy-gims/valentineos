'use client';

import React from 'react';

type AppType = 'messages' | 'gallery' | 'notes' | 'valentine';

interface AppIcon {
  id: AppType;
  label: string;
  icon: string;
  bgColor: string;
}

const APPS: AppIcon[] = [
  {
    id: 'messages',
    label: 'Messages',
    icon: '💬',
    bgColor: 'bg-gradient-to-br from-blue-400 to-blue-500',
  },
  {
    id: 'gallery',
    label: 'Gallery',
    icon: '📸',
    bgColor: 'bg-gradient-to-br from-purple-400 to-pink-400',
  },
  {
    id: 'notes',
    label: 'Love Notes',
    icon: '📝',
    bgColor: 'bg-gradient-to-br from-pink-300 to-rose-400',
  },
  {
    id: 'valentine',
    label: 'Valentine.exe',
    icon: '❤️',
    bgColor: 'bg-gradient-to-br from-red-400 to-pink-500',
  },
];

export default function AppGrid({
  onAppSelect,
}: {
  onAppSelect: (app: AppType) => void;
}) {
  return (
    <div className="flex-1 overflow-y-auto p-3">
      <div className="grid grid-cols-2 gap-4">
        {APPS.map((app) => (
          <button
            key={app.id}
            onClick={() => onAppSelect(app.id)}
            className="group flex flex-col items-center gap-1.5 cursor-pointer transform transition-transform hover:scale-110 active:scale-95"
          >
            {/* App Icon */}
            <div
              className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl shadow-lg transition-all group-hover:shadow-xl group-active:shadow-md ${app.bgColor}`}
            >
              {app.icon}
            </div>

            {/* App Label */}
            <span className="text-xs font-medium text-foreground text-center max-w-16 line-clamp-2">
              {app.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
