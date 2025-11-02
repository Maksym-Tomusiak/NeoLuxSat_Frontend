import { useEffect, useState } from 'react';
import FeedbackIcon1 from '@/assets/svgs/feedbacks/feedback-icon-1.svg';
import FeedbackIcon2 from '@/assets/svgs/feedbacks/feedback-icon-2.svg';
import FeedbackIcon3 from '@/assets/svgs/feedbacks/feedback-icon-3.svg';
import FeedbackIcon4 from '@/assets/svgs/feedbacks/feedback-icon-4.svg';
import FeedbackIcon5 from '@/assets/svgs/feedbacks/feedback-icon-5.svg';
import FeedbackIcon6 from '@/assets/svgs/feedbacks/feedback-icon-6.svg';
import FeebackCard from './FeebackCard';
import SectionHeader from '@/components/common/SectionHeader';
import { FeedbackService } from '@/services/feedbacks.service';
import type { FeedbackDto } from '@/types/feedback';

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
        setFeedbacks(data.slice(0, 6)); // only 6 first
      } catch (error) {
        console.error('Failed to fetch feedbacks', error);
      }
    };
    fetchFeedbacks();
  }, []);

  return (
    <section className="flex flex-col gap-[32px] sm:gap-[40px] md:gap-[58px]">
      <div className="flex w-full items-center sm:items-end justify-between gap-[16px]">
        <SectionHeader isCta={false}>Відгуки</SectionHeader>
        <p className="flex w-full max-w-[50%] sm:max-w-[360px] items-end font-noto font-normal text-primaryBlue text-[16px]/[120%] tracking-[-0.32px]">
          Довіра клієнтів — найкращий показник якості наших послуг.
        </p>
      </div>

      <div className="-mx-[10px] min-h-fit flex snap-x snap-mandatory gap-[12px] min-[1360px]:justify-center overflow-y-hidden overflow-x-auto px-[10px] md:gap-[20px] scrollbar-hide">
        {(() => {
          const slides = [];
          const half = Math.ceil(feedbacks.length / 2);
          for (let i = 0; i < half; i++) {
            const top = feedbacks[i];
            const bottom = feedbacks[i + half];

            slides.push(
              <div key={i} className="snap-center shrink-0 min-h-fit">
                <div className="flex w-[90vw] 2xs:w-[400px] max-w-[90vw] flex-col gap-[12px] md:w-[420px] md:max-w-[450px]">
                  {top && (
                    <FeebackCard
                      key={top.id}
                      icon={icons[i]}
                      author={top.author}
                      content={top.content}
                      isBlue={i % 2 === 1}
                    />
                  )}
                  {bottom && (
                    <FeebackCard
                      key={bottom.id}
                      icon={icons[i + half]}
                      author={bottom.author}
                      content={bottom.content}
                      isBlue={i % 2 === 0}
                    />
                  )}
                </div>
              </div>
            );
          }
          return slides;
        })()}
      </div>
    </section>
  );
};

export default FeedbacksSection;
