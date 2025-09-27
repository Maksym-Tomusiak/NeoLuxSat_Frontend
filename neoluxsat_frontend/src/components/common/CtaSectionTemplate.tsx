import React from 'react';
import LeaveApplicationButton from '@/components/common/LeaveApplicationButton';
import SectionHeader from '@/components/common/SectionHeader';

type CtaSectionTemplateProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  onApplicationClick?: () => void;
};

const CtaSectionTemplate: React.FC<CtaSectionTemplateProps> = ({
  icon,
  title,
  description,
  onApplicationClick,
}) => {
  const applicationButtonParams = {
    color: 'primaryWhite',
    hoverColor: 'primaryBlue',
    backgroundColor: 'primaryBlue',
  };

  return (
    <section className="relative bg-primaryOrange rounded-[20px] pt-[32px] pb-[24px] px-[24px] flex flex-col justify-between h-[345px]">
      <div className="absolute right-0 top-0">{icon}</div>
      <SectionHeader isCta={true} className="max-w-[60%]">
        {title}
      </SectionHeader>
      <div className="bg-primaryWhite p-[10px] rounded-[10px] flex justify-between z-1">
        <p className="text-primaryBlue/80 text-[16px]/[120%] font-noto font-medium max-w-[28%]">
          {description}
        </p>
        <LeaveApplicationButton
          {...applicationButtonParams}
          onApplicationClick={onApplicationClick}
        />
      </div>
    </section>
  );
};

export default CtaSectionTemplate;
