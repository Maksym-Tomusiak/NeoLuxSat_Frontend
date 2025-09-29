import React from 'react';
import { cn } from '@/lib/utils';

type LeaveApplicationButtonProps = {
  isOrange?: boolean;
  onApplicationClick?: () => void;
  className?: string;
};

const LeaveApplicationButton: React.FC<LeaveApplicationButtonProps> = ({
  isOrange,
  onApplicationClick,
  className,
}) => {
  const orangeClasses = `bg-primaryOrange border-primaryOrange text-primaryWhite hover:text-primaryBlue`;
  const blueClasses = `bg-primaryBlue border-primaryBlue text-primaryWhite hover:text-primaryBlue`;
  return (
    <button
      className={cn(
        'application-button border border-[2px] rounded-[10px] py-[14px] px-[20px] h-[40px] flex items-center text-[18px]/[120%] align-middle max-h-fill hover:bg-transparent transition duration-300 ease-in-out cursor-pointer font-noto font-semibold ',
        className,
        isOrange ? orangeClasses : blueClasses
      )}
      onClick={onApplicationClick}
    >
      Залишити заявку
    </button>
  );
};

export default LeaveApplicationButton;
