import { useEffect, useState } from 'react';

// Calm Ocean Palette for confetti
const confettiColors = [
  '#4299E1', // Blue
  '#38B2AC', // Teal
  '#48BB78', // Green
  '#63B3ED', // Light Blue
  '#81E6D9', // Light Teal
  '#9AE6B4', // Light Green
  '#ECC94B', // Yellow (Accent)
  '#ED8936'  // Orange (Accent)
];

function Confetti({ isActive, onComplete }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (isActive) {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
          delay: Math.random() * 0.5,
          rotation: Math.random() * 360,
          size: Math.random() * 6 + 4 // Slightly smaller for less visual noise
        });
      }
      setParticles(newParticles);

      const timer = setTimeout(() => {
        setParticles([]);
        if (onComplete) onComplete();
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  if (!isActive || particles.length === 0) return null;

  return (
    <div className="confetti-container">
      {particles.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.x}%`,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            transform: `rotate(${p.rotation}deg)`,
            width: `${p.size}px`,
            height: `${p.size}px`
          }}
        />
      ))}
    </div>
  );
}

export default Confetti;
