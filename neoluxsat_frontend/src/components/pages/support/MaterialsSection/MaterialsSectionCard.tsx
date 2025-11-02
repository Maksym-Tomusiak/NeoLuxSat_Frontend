import React from 'react';
import IconCommon from '@/assets/svgs/services/services-icon-common.svg';
import { cn } from '@/lib/utils';
// 1. Import the new types
import type { MaterialPoint, ModalData } from '@/types/materials';

// 2. Update the props type
type MaterialsCardProps = {
  icon: React.ReactNode;
  title: string;
  points: MaterialPoint[]; // <--- FIX 1: Was string[]
  onPointClick: (modalContent: ModalData) => void; // <--- FIX 2: Add handler
  className?: string;
};

const MaterialsCard: React.FC<MaterialsCardProps> = ({
  icon,
  title,
  points,
  onPointClick, // <--- FIX 3: Destructure handler
  className,
}) => {
  return (
    <div
      className={cn(
        `flex flex-col w-full max-w-[330px]
         sm:max-md:w-full
         rounded-[14px] sm:rounded-[16px] md:rounded-[20px]
         bg-primaryBlue
         p-[16px] sm:p-[20px] md:p-[24px]
         gap-[24px]
         min-h-[220px] sm:min-h-[330px]
        `,
        className
      )}
    >
      {/* Top row */}
      <div className="flex w-full justify-between items-center gap-[10px] text-primaryWhite">
        <div>{icon}</div>
        <p className="w-full text-left font-manrope text-[24px]/[90%] font-semibold">
          {title}
        </p>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-[16px] text-primaryWhite">
        {/* FIX 4: Map over points and use a <button> */}
        {points.map((point) => (
          <button
            key={point.id}
            onClick={() => onPointClick(point.modalContent)}
            className="w-full flex justify-between items-center gap-[8px] p-[12px] bg-primaryWhite/10 rounded-[10px]
             text-primaryWhite fill-primaryWhite hover:fill-primaryOrange hover:text-primaryOrange transition-colors duration-300
             text-left cursor-pointer" // Added text-left
          >
            <p className="font-noto text-[16px]/[120%]">{point.title}</p>
            <div>
              <IconCommon />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default React.memo(MaterialsCard);
