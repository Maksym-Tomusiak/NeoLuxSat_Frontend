import { useState, useRef, useEffect } from 'react';
import { usePropositionsLogic } from '@/hooks/usePropositionsLogic';
import PropositionCard from './PropositionCard';
import CustomPagination from './CustomPagination';

// --- Constants ---
const ANIMATION_DURATION = 8000; // 5 seconds (must match CSS)
const POST_ANIMATION_DELAY = 50; // Delay after border fills

const PropositionsSection = () => {
  const { propositions, loading, error } = usePropositionsLogic();

  // --- HOOKS ---
  const [activeIndex, setActiveIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  // 💡 REMOVED: isTransitioning state
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = propositions.length;
  // Total delay includes animation + post-animation pause
  const autoplayDelay = ANIMATION_DURATION + POST_ANIMATION_DELAY;

  // --- Autoplay Logic ---
  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (isAutoplayPaused || totalSlides <= 1) {
      return;
    }
    // Set timer for the full cycle
    timerRef.current = setInterval(() => {
      goToNextSlide();
    }, autoplayDelay);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isAutoplayPaused, activeIndex, propositions]);

  // --- Handlers ---
  const goToNextSlide = () => {
    const nextIndex = (activeIndex + 1) % totalSlides;
    // 💡 SIMPLIFIED: Just update state
    setActiveIndex(nextIndex);
    setAnimationKey((prevKey) => prevKey + 1); // Reset border
  };

  const handlePause = () => {
    setIsAutoplayPaused(true);
  };

  const handleResume = () => {
    setIsAutoplayPaused(false);
    // Reset animation key on resume to restart it
    setAnimationKey((prevKey) => prevKey + 1);
  };

  const handlePaginationClick = (index: number) => {
    if (index === activeIndex) return;
    // 💡 SIMPLIFIED: Just update state
    setActiveIndex(index);
    setAnimationKey((prevKey) => prevKey + 1); // Reset border
  };

  // --- Conditional Returns ---
  if (loading) {
    return (
      <section className="w-full">
        <div className="h-96 bg-gray-100 rounded-2xl flex items-center justify-center text-primaryBlue">
          Завантаження пропозицій...
        </div>
      </section>
    );
  }

  if (error || propositions.length === 0) {
    return null;
  }

  // --- Render ---
  const activeProposition = propositions[activeIndex];

  return (
    <section className="w-full">
      <div className="relative propositions-slider">
        <PropositionCard
          data={activeProposition} // Just pass the new data
          onPause={handlePause}
          onResume={handleResume}
          isPaused={isAutoplayPaused}
          animationKey={animationKey}
          // 💡 REMOVED: isTransitioning prop
        />

        <CustomPagination
          total={totalSlides}
          active={activeIndex}
          onChange={handlePaginationClick}
        />
      </div>
    </section>
  );
};

export default PropositionsSection;
