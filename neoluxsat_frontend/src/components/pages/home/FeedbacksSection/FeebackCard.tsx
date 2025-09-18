import React from 'react';

type FeedbackCardProps = {
  icon: React.ReactNode;
  author: string;
  content: string;
  isOrange: boolean;
};

const FeebackCard: React.FC<FeedbackCardProps> = ({
  icon,
  author,
  content,
  isOrange,
}) => {
  return (
    <div
      className={`flex flex-col flex-1 justify-between h-[200px] rounded-[20px] p-[24px] relative text-primaryWhite font-noto ${
        isOrange ? 'bg-primaryOrange' : 'bg-primaryBlue'
      }`}
    >
      <div className="absolute right-[0px] top-[0px]">{icon}</div>
      <p className="text-[16px]/[120%] tracking-[-0.32px] font-normal">
        {content}
      </p>
      <p className="text-[24px]/[120%] tracking-[-0.48px] font-medium">
        {author}
      </p>
    </div>
  );
};

export default FeebackCard;
