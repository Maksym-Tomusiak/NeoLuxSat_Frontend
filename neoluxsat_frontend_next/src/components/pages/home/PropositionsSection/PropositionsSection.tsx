"use client";

import { useState, useRef, useEffect } from "react";
import { usePropositionsLogic } from "@/hooks/usePropositionsLogic";
import PropositionCard from "./PropositionCard";
import CustomPagination from "./CustomPagination";
import { motion } from "framer-motion";

const ANIMATION_DURATION = 8000;
const POST_ANIMATION_DELAY = 50;

const PropositionsSection = () => {
  // LOGIC STATE: Tracks if section is visible for Autoplay
  const [isSectionInView, setIsSectionInView] = useState(false);

  const { propositions, loading, error } = usePropositionsLogic();

  // --- HOOKS ---
  const [activeIndex, setActiveIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = propositions.length;
  const autoplayDelay = ANIMATION_DURATION + POST_ANIMATION_DELAY;

  // --- Autoplay Logic ---
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    if (isAutoplayPaused || !isSectionInView || totalSlides <= 1) {
      return;
    }

    timerRef.current = setInterval(() => {
      goToNextSlide();
    }, autoplayDelay);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoplayPaused, activeIndex, propositions, isSectionInView]);

  // --- Handlers ---
  const goToNextSlide = () => {
    const nextIndex = (activeIndex + 1) % totalSlides;
    setActiveIndex(nextIndex);
    setAnimationKey((prevKey) => prevKey + 1);
  };

  const handlePause = () => {
    setIsAutoplayPaused(true);
  };

  const handleResume = () => {
    setIsAutoplayPaused(false);
    setAnimationKey((prevKey) => prevKey + 1);
  };

  const handlePaginationClick = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    setAnimationKey((prevKey) => prevKey + 1);
  };

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

  const activeProposition = propositions[activeIndex];

  return (
    // 1. OUTER WRAPPER: LOGIC ONLY
    <motion.div
      className="w-full"
      // 2. FIX HERE: Reset animation key when entering viewport
      onViewportEnter={() => {
        setIsSectionInView(true);
        setAnimationKey((prev) => prev + 1); // <--- This resets progress to 0
      }}
      onViewportLeave={() => {
        setAnimationKey(0);
        setIsSectionInView(false);
      }}
      viewport={{ amount: 0.3 }}
    >
      {/* 2. INNER WRAPPER: VISUALS ONLY */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          duration: 0.5,
        }}
      >
        <section className="w-full">
          <div className="relative propositions-slider">
            <PropositionCard
              data={activeProposition}
              onPause={handlePause}
              onResume={handleResume}
              isPaused={isAutoplayPaused || !isSectionInView}
              animationKey={animationKey}
            />

            <CustomPagination
              total={totalSlides}
              active={activeIndex}
              onChange={handlePaginationClick}
            />
          </div>
        </section>
      </motion.div>
    </motion.div>
  );
};

export default PropositionsSection;
