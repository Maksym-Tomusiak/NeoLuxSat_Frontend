import { useEffect, useState } from 'react';
import FeedbackIcon1 from '@/assets/svgs/feedbacks/feedback-icon-1.svg';
import FeedbackIcon2 from '@/assets/svgs/feedbacks/feedback-icon-2.svg';
import FeedbackIcon3 from '@/assets/svgs/feedbacks/feedback-icon-3.svg';
import FeedbackIcon4 from '@/assets/svgs/feedbacks/feedback-icon-4.svg';
import FeedbackIcon5 from '@/assets/svgs/feedbacks/feedback-icon-5.svg';
import FeedbackIcon6 from '@/assets/svgs/feedbacks/feedback-icon-6.svg';
import FeebackCard from './FeebackCard';
import { FeedbackService } from '@/services/feedbacks.service';

type Feedback = {
  id: string;
  author: string;
  content: string;
};

const icons = [
  <FeedbackIcon1 key="1" />,
  <FeedbackIcon2 key="2" />,
  <FeedbackIcon3 key="3" />,
  <FeedbackIcon4 key="4" />,
  <FeedbackIcon5 key="5" />,
  <FeedbackIcon6 key="6" />,
];

const FeedbacksSection = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

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
    <section className="flex flex-col gap-[58px]">
      <div className="flex w-full justify-between">
        <h2 className="font-manrone text-primaryBlue/20 text-[88px]/[90%] font-semibold tracking-[-2px]">
          Відгуки
        </h2>
        <p className="flex items-end font-noto text-primaryBlue text-[16px]/[120%] font-normal tracking-[-0.32px] w-[330px]">
          Довіра клієнтів — найкращий показник якості наших послуг.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px]">
        {feedbacks.map((fb, index) => (
          <FeebackCard
            key={fb.id}
            icon={icons[index % icons.length]}
            author={fb.author}
            content={fb.content}
            isOrange={index % 2 === 0}
          />
        ))}
      </div>
    </section>
  );
};

export default FeedbacksSection;
