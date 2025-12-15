import React from 'react';
import clsx from 'clsx';
import '../styles/pixel-theme.css';

const PixelCard = ({ children, className, title }) => {
  return (
    <div className={clsx('pixel-card', className)}>
      {title && <h2 className="text-xl mb-4 text-[var(--pixel-accent)]">{title}</h2>}
      {children}
    </div>
  );
};

export default PixelCard;
