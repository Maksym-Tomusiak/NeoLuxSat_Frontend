"use client";

import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperInstance } from "swiper";

type CustomPaginationProps = {
  total: number;
  active: number; // Active index from the PARENT slider
  onChange: (index: number) => void; // Function to control the PARENT slider
};

const CustomPagination: React.FC<CustomPaginationProps> = ({
  total,
  active,
  onChange,
}) => {
  const [paginationSwiper, setPaginationSwiper] =
    useState<SwiperInstance | null>(null);

  // Ref to track if a snap is in progress
  const isSnapping = useRef(false);

  // --- Define Geometry ---
  const bulletWidth = 60;
  const bulletGap = 16;
  const slidesPerView = 3;

  // 1. No pagination needed
  if (total <= 1) return null;

  // 2. For 2 slides (no change)
  if (total === 2) {
    const twoSlidesWidth = bulletWidth * 2 + bulletGap;
    return (
      <div
        className="custom-pagination-wrapper"
        style={{ width: `${twoSlidesWidth}px` }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: `${bulletGap}px`,
          }}
        >
          {Array.from({ length: total }).map((_, index) => (
            <button
              key={index}
              onClick={() => onChange(index)}
              className={`custom-pagination-bullet ${
                index === active ? "active" : ""
              }`}
              aria-label={`Перейти до слайду ${index + 1}`}
            />
          ))}
        </div>
      </div>
    );
  }

  // 3. For 3+ slides, we use Swiper

  // *** THIS IS YOUR LOGIC ***
  // We use Swiper's native loop for 5+ slides (which works)
  const useNativeLoop = total >= 5;

  // For 3 or 4 slides, we manually create the "loop"
  const isManuallyLooped = total === 3 || total === 4;

  let slidesToRender: number[] = [];
  let initialSlide = active;

  if (isManuallyLooped) {
    // Create the 3x duplicated array
    const originalSlides = Array.from({ length: total }, (_, i) => i);
    slidesToRender = [
      ...originalSlides, // [0, 1, 2]
      ...originalSlides, // [0, 1, 2]
      ...originalSlides, // [0, 1, 2]
    ];
    // Start on the *middle* set
    initialSlide = total + active;
  } else {
    // For 1, 2, or 5+ slides
    slidesToRender = Array.from({ length: total }, (_, i) => i);
  }

  // This effect syncs the PARENT slider TO this pagination slider
  useEffect(() => {
    if (!paginationSwiper || paginationSwiper.destroyed || isSnapping.current) {
      return;
    }

    if (useNativeLoop) {
      // For 5+, Swiper's loop works perfectly
      paginationSwiper.slideToLoop(active);
    } else if (isManuallyLooped) {
      // For 3-4, we slide to the correct index in our 3x array
      // e.g., active=0 -> slide to index 3 (the first "0" in the middle set)
      const newSlideIndex = total + active;

      if (paginationSwiper.realIndex === newSlideIndex) {
        return; // Already on the correct slide
      }

      // Check if we need to "snap"
      const isWrappingForward =
        paginationSwiper.realIndex === total * 2 - 1 && active === 0;
      const isWrappingBackward =
        paginationSwiper.realIndex === total && active === total - 1;

      if (isWrappingForward || isWrappingBackward) {
        isSnapping.current = true;

        // 1. Animate to the clone slide
        const targetCloneIndex = isWrappingForward
          ? total * 2 // Animate to the first slide of the 3rd set
          : total - 1; // Animate to the last slide of the 1st set

        paginationSwiper.slideTo(targetCloneIndex);

        // 2. After animation, "snap" back to the real slide
        const handleTransitionEnd = () => {
          paginationSwiper.off("transitionEnd", handleTransitionEnd);
          paginationSwiper.slideTo(newSlideIndex, 0); // Snap with 0ms duration
          isSnapping.current = false;
        };
        paginationSwiper.on("transitionEnd", handleTransitionEnd);
      } else {
        // Normal slide
        paginationSwiper.slideTo(newSlideIndex);
      }
    }
  }, [active, paginationSwiper, total, useNativeLoop, isManuallyLooped]);

  // Create the <SwiperSlide> components
  const bullets = slidesToRender.map((realIndex, i) => (
    <SwiperSlide key={`${realIndex}-${i}`}>
      {/* We must use `isActive` for the `useNativeLoop` case */}
      {({ isActive }) => (
        <button
          className={`custom-pagination-bullet ${
            // For manual loop, we use `realIndex`. For native loop, Swiper's `isActive`.
            (isManuallyLooped ? realIndex === active : isActive) ? "active" : ""
          }`}
          onClick={() => onChange(realIndex)}
          aria-label={`Перейти до слайду ${realIndex + 1}`}
        />
      )}
    </SwiperSlide>
  ));

  // Viewport width for 3 bullets
  const viewportWidth =
    slidesPerView * bulletWidth + (slidesPerView - 1) * bulletGap;

  return (
    <div
      className="custom-pagination-wrapper"
      style={{ width: `${viewportWidth}px` }}
    >
      <Swiper
        onSwiper={setPaginationSwiper}
        // --- This is the core logic ---
        slidesPerView={slidesPerView}
        centeredSlides={true}
        loop={useNativeLoop} // <-- Only loop for 5+
        initialSlide={initialSlide} // <-- Set initial slide
        // --- End of logic ---

        allowTouchMove={false}
        slideToClickedSlide={false}
        className="pagination-swiper"
      >
        {bullets}
      </Swiper>
    </div>
  );
};

export default CustomPagination;
