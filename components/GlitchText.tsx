import React from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  active?: boolean;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className = "", active = true }) => {
  if (!active) return <span className={className}>{text}</span>;

  return (
    <div className={`relative inline-block group ${className}`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-red-500 opacity-70 animate-glitch" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)', transform: 'translate(-2px)' }}>
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-blue-500 opacity-70 animate-glitch" style={{ clipPath: 'polygon(0 80%, 100% 20%, 100% 100%, 0 100%)', transform: 'translate(2px)', animationDirection: 'reverse' }}>
        {text}
      </span>
    </div>
  );
};

export default GlitchText;