// src/components/ServicesPartnersSlider/ServicesPartnersSlider.tsx

import React from 'react';
// 💡 Import the custom slider template
import ContinuousSliderTemplate from '@/components/common/ContinuousSliderTemplate';

// Importing your image assets
import Badge1 from '@/assets/images/trust-badges/ajax-slider-logo-1.png';
import Badge2 from '@/assets/images/trust-badges/ajax-slider-logo-2.png';
// Assuming the other assets are still used for TV/Internet partners
import Badge3 from '@/assets/images/trust-badges/trust-badge-3.png';
import Badge4 from '@/assets/images/trust-badges/trust-badge-4.png';
import Badge5 from '@/assets/images/trust-badges/trust-badge-5.png';
import Badge6 from '@/assets/images/trust-badges/trust-badge-6.png';

export type SliderKey = 'internet' | 'tv' | 'security';

type PartnersSliderProps = {
  sliderKey: SliderKey;
};

// --- Base Content Definition (No duplication needed here) ---

const BASE_SECURITY_CONTENT = [Badge1, Badge2];
const BASE_TV_CONTENT = [Badge3, Badge4];
const BASE_INTERNET_CONTENT = [Badge6, Badge5];

const SLIDER_CONTENT_MAP: Record<
  SliderKey,
  { orange: string[]; grey: string[] }
> = {
  security: {
    // Content is styled differently based on the band color
    orange: BASE_SECURITY_CONTENT,
    grey: BASE_SECURITY_CONTENT,
  },
  tv: {
    orange: BASE_TV_CONTENT,
    grey: BASE_TV_CONTENT,
  },
  internet: {
    orange: BASE_INTERNET_CONTENT,
    grey: BASE_INTERNET_CONTENT,
  },
};

// --- Helper for creating React Nodes ---

/** Creates an array of image React Nodes from an array of image sources. */
const createSlideNodes = (sources: string[]) => {
  const images = sources.map((src, index) => (
    <img
      key={index}
      src={src}
      alt={`Partner ${index}`}
      // Apply image sizing classes consistently
      className="min-h-[50px] max-h-[50px] w-auto"
    />
  ));
  const result = (
    <div className="flex items-center justify-center test gap-[56px] max-h-[50px]">
      {images.map((node) => node)}
    </div>
  );

  return [result, result, result, result, result, result, result];
};

const ServicesPartnersSlider: React.FC<PartnersSliderProps> = ({
  sliderKey,
}) => {
  const data = SLIDER_CONTENT_MAP[sliderKey];

  // Convert string arrays to React Nodes once
  const orangeSlides = createSlideNodes(data.orange);
  const greySlides = createSlideNodes(data.grey);

  // Set consistent parameters
  const DURATION = 20; // Time in seconds for one full loop (Adjust as needed)
  const SLIDE_GAP = '56px'; // Corresponds to the original Swiper padding

  return (
    <div className="relative w-[100%] h-[140px] md:h-[270px] mx-auto">
      {/* GREY BAND - Scroll Right */}
      <div
        className="absolute w-[120vw] min-h-[70px] top-[30px] lg:top-[70px] left-[calc(50%-60vw)] z-10 bg-primaryBlue/20 flex items-center justify-center rotate-5"
        style={{ backgroundColor: '#cdd2df' }}
      >
        <ContinuousSliderTemplate
          slides={greySlides}
          durationSeconds={DURATION}
          className="h-full"
          slideGap={SLIDE_GAP}
          direction="right"
        />
      </div>

      {/* ORANGE BAND - Scroll Left */}
      <div
        className="absolute w-[120vw] min-h-[70px] top-[30px] lg:top-[70px] left-[calc(50%-60vw)] z-10 flex items-center justify-center -rotate-5"
        style={{ backgroundColor: '#f6deca' }}
      >
        <ContinuousSliderTemplate
          slides={orangeSlides}
          durationSeconds={DURATION}
          className="h-full"
          slideGap={SLIDE_GAP}
        />
      </div>
    </div>
  );
};

export default ServicesPartnersSlider;
