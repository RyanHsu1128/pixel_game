import React from 'react';
import clsx from 'clsx';
import '../styles/pixel-theme.css';

const PixelButton = ({ children, onClick, className, disabled, variant = 'primary' }) => {
  const baseStyle = "pixel-border relative inline-flex items-center justify-center px-4 py-2 font-bold uppercase transition-transform active:translate-y-1 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[var(--pixel-primary)] text-white hover:brightness-110",
    secondary: "bg-[var(--pixel-secondary)] text-black hover:brightness-110",
    accent: "bg-[var(--pixel-accent)] text-black hover:brightness-110",
    outline: "bg-transparent border-2 border-white text-white hover:bg-white/10"
  };

  // Note: Since we are using vanilla CSS mostly but I imported tailwind properties for layout utility like 'relative', 'items-center'. 
  // Wait, I didn't verify tailwind setup fully. 
  // I installed 'clsx' and 'tailwind-merge' but I didn't actually configure tailwind.config.js 
  // The 'create vite' standard react template does NOT include tailwind by default unless specified.
  // The user asked for "Vanilla CSS". 
  // I should write CSS classes instead of relying on utility classes if Tailwind isn't set up.
  // BUT, I can simulate it or just write inline styles / className.
  // Let's stick to CSS Modules or just BEM-ish classes defined in pixel-theme.css or locally.
  
  // Correction: I will use standard CSS classes.
  
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={clsx('pixel-btn', `pixel-btn-${variant}`, className)}
    >
      {children}
    </button>
  );
};

export default PixelButton;
