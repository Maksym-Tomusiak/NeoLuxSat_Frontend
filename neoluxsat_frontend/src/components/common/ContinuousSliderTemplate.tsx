// src/components/common/ContinuousSliderTemplate.tsx

import React from 'react';

// 💡 NEW: Define possible directions
type Direction = 'left' | 'right';

interface ContinuousSliderTemplateProps {
  slides: React.ReactNode[];
  durationSeconds?: number;
  className?: string;
  slideGap?: string;
  // 💡 NEW: Prop for setting the scroll direction
  direction?: Direction;
}

const ContinuousSliderTemplate: React.FC<ContinuousSliderTemplateProps> = ({
  slides,
  durationSeconds = 20,
  className = 'w-full h-auto',
  slideGap = '16px',
  direction = 'left', // 💡 Default direction is 'left'
}) => {
  if (slides.length === 0) return null;

  // Duplicate slides for seamless loop
  const duplicatedSlides = [...slides, ...slides];

  // 💡 Determine the appropriate CSS animation class
  const animationClass =
    direction === 'right'
      ? 'continuous-slider-track--right'
      : 'continuous-slider-track--left';

  // Update style object to include the --slide-gap variable
  const style = {
    '--slider-duration': `${durationSeconds}s`,
    '--slide-gap': slideGap,
  } as React.CSSProperties;

  return (
    <div className={`overflow-hidden ${className}`}>
      {/* 💡 Apply the dynamic animation class along with the base track class */}
      <div
        className={`continuous-slider-track ${animationClass}`}
        style={style}
      >
        {duplicatedSlides.map((s, idx) => (
          // Apply the margin using a custom class that references the CSS variable
          <div
            key={idx}
            className="continuous-slider-slide-wrapper flex justify-center items-center shrink-0"
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContinuousSliderTemplate;
