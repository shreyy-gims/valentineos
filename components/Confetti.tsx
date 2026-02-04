'use client';

export default function Confetti() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-10px',
            animation: `confetti ${2 + Math.random() * 1}s linear forwards`,
            animationDelay: `${Math.random() * 0.5}s`,
          }}
        >
          {['❤️', '🍓', '🎀', '🌸', '✨'][Math.floor(Math.random() * 5)]}
        </div>
      ))}

      <style jsx>{`
        @keyframes confetti {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        .animate-confetti {
          animation: confetti 3s ease-in forwards;
        }
      `}</style>
    </div>
  );
}
