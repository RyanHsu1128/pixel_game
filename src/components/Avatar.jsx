import React, { useState } from 'react';
import clsx from 'clsx';

const Avatar = ({ seed, className, size = 120 }) => {
  const [loaded, setLoaded] = useState(false);
  const url = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${seed}`;

  return (
    <div 
      className={clsx("relative inline-block pixel-border bg-white/10", className)}
      style={{ width: size, height: size }}
    >
      <img
        src={url}
        alt={`Avatar ${seed}`}
        onLoad={() => setLoaded(true)}
        style={{ width: '100%', height: '100%', display: loaded ? 'block' : 'none' }}
      />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center text-xs animate-pulse">
            ...
        </div>
      )}
    </div>
  );
};

export default Avatar;
