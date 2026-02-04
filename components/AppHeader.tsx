'use client';

interface AppHeaderProps {
  title: string;
  onBack: () => void;
  showBack?: boolean;
}

export default function AppHeader({ title, onBack, showBack = true }: AppHeaderProps) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 border-b border-primary/20 bg-gradient-to-b from-background to-background/50">
      {showBack && (
        <button
          onClick={onBack}
          className="text-primary hover:text-accent transition-colors text-lg"
        >
          ←
        </button>
      )}
      <h1 className="flex-1 text-base font-bold text-foreground">{title}</h1>
      <div className="w-6 h-6 rounded-full bg-primary/20" />
    </div>
  );
}
