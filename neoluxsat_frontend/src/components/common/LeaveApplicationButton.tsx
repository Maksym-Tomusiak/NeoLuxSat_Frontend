// src/components/common/LeaveApplicationButton.tsx
import React from 'react';
import { cn } from '@/lib/utils';
import { useModal } from '@/contexts/modalContext'; // Import the hook

type LeaveApplicationButtonProps = {
  isOrange?: boolean;
  className?: string;
  // 💡 NEW: Optional prop to pass preselected service title
  preselectedServiceTitle?: string | null;
};

const LeaveApplicationButton: React.FC<LeaveApplicationButtonProps> = ({
  isOrange,
  className,
  preselectedServiceTitle = 'consult',
}) => {
  const { openModal } = useModal(); // Get the openModal function from context

  const orangeClasses = `bg-primaryOrange border-primaryOrange text-primaryWhite hover:text-primaryBlue`;
  const blueClasses = `bg-primaryBlue border-primaryBlue text-primaryWhite hover:text-primaryBlue`;

  // 💡 Call openModal with the preselected title on click
  const handleClick = () => {
    openModal(preselectedServiceTitle);
  };

  return (
    <button
      className={cn(
        'application-button border border-[2px] rounded-[10px] py-[14px] px-[20px] h-[40px] flex items-center text-[18px]/[120%] align-middle max-h-fit hover:bg-transparent transition duration-300 ease-in-out cursor-pointer font-noto font-semibold ',
        className,
        isOrange ? orangeClasses : blueClasses
      )}
      onClick={handleClick} // Use the internal handler
    >
      Залишити заявку
    </button>
  );
};

export default LeaveApplicationButton;
