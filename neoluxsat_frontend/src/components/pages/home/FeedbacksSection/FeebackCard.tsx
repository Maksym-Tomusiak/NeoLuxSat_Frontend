import React from 'react';

type FeedbackCardProps = {
  icon: React.ReactNode;
  author: string;
  content: string;
  isBlue: boolean;
};

const FeebackCard: React.FC<FeedbackCardProps> = ({
  icon,
  author,
  content,
  isBlue,
}) => {
  return (
    <div
      className={`relative flex flex-1 flex-col justify-between font-noto  min-h-[200px] rounded-[20px] p-[24px] ${
        isBlue
          ? 'bg-primaryBlue text-primaryWhite'
          : 'bg-primaryBlue/20 text-primaryBlue'
      }`}
    >
      <div className="absolute right-[0px] top-[-10px]">{icon}</div>
      <p className="font-normal text-[14px]/[120%] 2xs:text-[16px]/[120%] tracking-[-0.32px]">
        {content}
      </p>
      <p className="font-medium text-[20px]/[120%] 2xs:text-[24px]/[120%] tracking-[-0.48px]">
        {author}
      </p>
    </div>
  );
};

export default FeebackCard;
