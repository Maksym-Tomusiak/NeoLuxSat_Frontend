import { cn } from '@/lib/utils';
import CheckedIcon from '@/assets/svgs/services/servicesPage/checked-icon.svg';
import LeaveApplicationButton from '../../LeaveApplicationButton';
import type React from 'react';

export type OurServicesCardProps = {
  icon: React.ReactNode;
  title: React.ReactNode;
  points: React.ReactNode[];
  isTarif: boolean;
  tarifHref?: string;
  className?: string;
  children?: React.ReactNode;
};

type TarifButtonProps = {
  href: string;
};

const TarifButton: React.FC<TarifButtonProps> = ({ href }) => {
  return (
    <a
      href={href}
      target="_blank"
      className={`w-full justify-center application-button border border-[2px] border-primaryWhite rounded-[10px] py-[14px] px-[20px] h-[40px] flex items-center text-[18px]/[120%] align-middle max-h-fit 
      hover:border-primaryOrange transition duration-300 ease-in-out cursor-pointer font-noto font-semibold text-primaryWhite`}
    >
      Тарифи
    </a>
  );
};

const OurServicesCard: React.FC<OurServicesCardProps> = ({
  icon,
  title,
  points,
  isTarif,
  tarifHref,
  className,
  children,
}) => {
  const serviceTitle = window.location.pathname.split('/').pop();
  return (
    <div
      className={cn(
        `relative flex flex-col justify-between w-full max-w-[330px]
          rounded-[14px] sm:rounded-[16px] md:rounded-[20px]
          bg-primaryBlue
          p-[16px] sm:p-[20px] md:p-[24px]
          gap-[24px]
          min-h-[380px]
        `,
        className
      )}
    >
      <div className="absolute -right-8 -top-7">{icon}</div>
      {/* Top row */}
      <div className="flex flex-col gap-[40px]">
        <div className="flex w-full justify-between items-center gap-[40px] text-primaryWhite">
          <p className="w-full text-left font-manrope text-[24px]/[90%] font-semibold">
            {title}
          </p>
        </div>

        <div className="flex flex-col gap-[24px] text-primaryWhite">
          {points.map((point, index) => (
            <div
              key={index}
              className="w-full flex justify-start items-center gap-[8px]
          text-primaryWhite"
            >
              <div className="min-h-[24px] min-w-[24px]">
                <CheckedIcon />
              </div>
              <p className="font-noto text-[16px]/[120%] tracking-[-0.32px]">
                {point}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-end gap-[14px]">
        {children}
        {isTarif ? (
          <>
            <TarifButton href={tarifHref || '#'} />
          </>
        ) : (
          <>
            <LeaveApplicationButton
              isOrange
              preselectedServiceTitle={serviceTitle}
              className="min-w-full justify-center hover:text-primaryWhite!"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default OurServicesCard;
