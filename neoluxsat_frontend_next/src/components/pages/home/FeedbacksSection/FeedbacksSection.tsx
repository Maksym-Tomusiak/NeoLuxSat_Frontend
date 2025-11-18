"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules"; // Add Mousewheel module
import "swiper/css";
import "swiper/css/free-mode"; // Import FreeMode styles
import FeedbackIcon1 from "@/assets/svgs/feedbacks/feedback-icon-1.svg?component";
import FeedbackIcon2 from "@/assets/svgs/feedbacks/feedback-icon-2.svg?component";
import FeedbackIcon3 from "@/assets/svgs/feedbacks/feedback-icon-3.svg?component";
import FeedbackIcon4 from "@/assets/svgs/feedbacks/feedback-icon-4.svg?component";
import FeedbackIcon5 from "@/assets/svgs/feedbacks/feedback-icon-5.svg?component";
import FeedbackIcon6 from "@/assets/svgs/feedbacks/feedback-icon-6.svg?component";
import FeebackCard from "./FeebackCard";
import SectionHeader from "@/components/common/SectionHeader";
import { FeedbackService } from "@/services/feedbacks.service";
import type { FeedbackDto } from "@/types/feedback";
import FadeInFromDirection from "@/components/common/animations/FadeInFromDirection";

const icons = [
  <FeedbackIcon1 key="1" />,
  <FeedbackIcon2 key="2" />,
  <FeedbackIcon3 key="3" />,
  <FeedbackIcon4 key="4" />,
  <FeedbackIcon5 key="5" />,
  <FeedbackIcon6 key="6" />,
];

const FeedbacksSection = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackDto[]>([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const data = await FeedbackService.getAllFeedbacks();
        setFeedbacks(data);
      } catch (error) {
        console.error("Failed to fetch feedbacks", error);
      }
    };
    fetchFeedbacks();
  }, []);

  // Prepare slides data: Pairing feedbacks (Top & Bottom)
  const slidesData = (() => {
    const slides = [];
    const half = Math.ceil(feedbacks.length / 2);
    for (let i = 0; i < half; i++) {
      slides.push({
        top: feedbacks[i],
        bottom: feedbacks[i + half],
        index: i,
      });
    }
    return slides;
  })();

  return (
    <section className="flex flex-col gap-[32px] sm:gap-[40px] md:gap-[58px] overflow-hidden">
      <div className="flex w-full items-start sm:items-end justify-between gap-[16px]">
        <SectionHeader isCta={false}>Відгуки</SectionHeader>
        <p className="max-sm:mt-[10px] flex w-full max-w-[50%] sm:max-w-[330px] items-end font-noto font-normal text-primaryBlue text-[16px]/[120%] tracking-[-0.32px]">
          Довіра клієнтів — найкращий показник якості наших послуг.
        </p>
      </div>

      <div className="-mx-[10px] w-full px-[10px]">
        <Swiper
          slidesPerView="auto"
          spaceBetween={12}
          breakpoints={{
            768: {
              spaceBetween: 20,
            },
          }}
          freeMode={{
            enabled: true,
            sticky: false,
            momentum: true, // Enable momentum scrolling
            momentumBounce: false,
            momentumRatio: 1,
            momentumVelocityRatio: 1,
          }}
          mousewheel={{
            enabled: true, // Enable mousewheel/trackpad scrolling
            forceToAxis: true, // Force scroll direction to be horizontal
            sensitivity: 1, // Adjust sensitivity (lower = less sensitive)
            releaseOnEdges: false, // Prevent page scroll when reaching edges
          }}
          modules={[FreeMode, Mousewheel]} // Include both modules
          className="!overflow-visible"
          grabCursor={true} // Show grab cursor on desktop
          simulateTouch={true} // Enable mouse drag
          touchRatio={1} // Touch sensitivity
          touchAngle={45} // Maximum angle to trigger swipe
          threshold={5} // Minimum distance to start drag
        >
          {slidesData.map(({ top, bottom, index }) => (
            <SwiperSlide key={index} className="!w-auto !h-auto">
              <div className="flex w-[90vw] 2xs:w-[400px] max-w-[90vw] flex-col gap-[12px] xl:w-fit md:max-w-[447px]">
                {top && (
                  <FadeInFromDirection direction="left">
                    <FeebackCard
                      key={top.id}
                      icon={icons[index % icons.length]}
                      author={top.author}
                      content={top.content}
                      isBlue={index % 2 === 1}
                    />
                  </FadeInFromDirection>
                )}
                {bottom && (
                  <FadeInFromDirection direction="right">
                    <FeebackCard
                      key={bottom.id}
                      icon={icons[(index + 3) % icons.length]}
                      author={bottom.author}
                      content={bottom.content}
                      isBlue={index % 2 === 0}
                    />
                  </FadeInFromDirection>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default FeedbacksSection;
