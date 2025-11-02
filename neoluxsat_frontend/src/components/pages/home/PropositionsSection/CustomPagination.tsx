import React from 'react';

type CustomPaginationProps = {
  total: number;
  active: number;
  onChange: (index: number) => void;
};

const CustomPagination: React.FC<CustomPaginationProps> = ({
  total,
  active,
  onChange,
}) => {
  // 1. No pagination needed for 1 slide
  if (total <= 1) return null;

  // --- 2. Define Geometry (from your CSS) ---
  const bulletWidth = 60;
  const bulletGap = 16;
  const bulletAndGapWidth = bulletWidth + bulletGap; // 76

  // --- 3. Calculate Viewport Width ---
  // The viewport should show 3 bullets, or just 2 if that's all there are.
  const visibleBullets = Math.min(total, 3);
  const viewportWidth =
    visibleBullets * bulletWidth + (visibleBullets - 1) * bulletGap;
  // If total=2, width = (2*60) + (1*16) = 136px
  // If total>=3, width = (3*60) + (2*16) = 212px

  // --- 4. Determine Target Index to Center ---
  // This is the index of the bullet that should be in the
  // *middle* of the viewport.
  let targetIndex: number;

  if (total <= 2) {
    // For 2 bullets, center *between* them (index 0.5)
    targetIndex = 0.5;
  } else if (total === 3) {
    // For 3 bullets, always center the middle one (index 1)
    targetIndex = 1;
  } else {
    // For > 3 bullets, use the "left-middle-right" logic
    if (active === 0) {
      // First slide: center the 2nd bullet (index 1)
      targetIndex = 1;
    } else if (active === total - 1) {
      // Last slide: center the 2nd-to-last bullet (index total - 2)
      targetIndex = total - 2;
    } else {
      // Middle slides: center the active bullet
      targetIndex = active;
    }
  }

  // --- 5. Calculate Transform Offset ---
  const targetBulletCenter = targetIndex * bulletAndGapWidth + bulletWidth / 2;

  // This offset will slide the track to the correct position
  const transformOffset = viewportWidth / 2 - targetBulletCenter;

  return (
    <div
      className="custom-pagination-wrapper"
      // Set the dynamic viewport width
      style={{ width: `${viewportWidth}px` }}
    >
      <div
        className="custom-pagination-track"
        style={{
          transform: `translateX(${transformOffset}px)`,
        }}
      >
        {Array.from({ length: total }).map((_, index) => (
          <button
            key={index}
            onClick={() => onChange(index)}
            className={`custom-pagination-bullet ${
              index === active ? 'active' : ''
            }`}
            aria-label={`Перейти до слайду ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomPagination;
