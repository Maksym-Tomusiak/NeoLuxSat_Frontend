import React from 'react';
import CheckedIcon from '@/assets/svgs/shop/checked-icon.svg';

type ShopCardProps = {
  image: React.ReactNode;
  title: string;
  options: string[];
};

const ShopCard: React.FC<ShopCardProps> = ({ image, title, options }) => {
  return (
    <div className="relative flex flex-col justify-end gap-[24px] bg-primaryBlue w-[330px] h-[500px] p-[24px] rounded-[20px] overflow-hidden">
      {/* Image with fade */}
      <div className="absolute top-[14px] left-0 w-full">
        <div className="w-fit h-fit m-auto relative">
          {image}
          {/* Gradient overlay */}
          <div
            className="absolute bottom-0 left-0 w-full h-1/2"
            style={{
              background:
                'linear-gradient(to top, rgba(26, 38, 124, 0.80) 50%, rgba(0, 0, 0, 0) 60%)',
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative flex flex-col gap-[24px] text-primaryWhite z-10">
        <p className="font-manrope text-[24px]/[90%] font-semibold">{title}</p>
        <ul className="font-noto text-[16px]/[120%] font-normal tracking-[-0.32px] flex flex-col gap-[16px]">
          {options.map((option, index) => (
            <div
              key={index}
              className="flex gap-[8px] w-full px-[10px] py-[8px] rounded-[10px] bg-primaryWhite/10"
            >
              <CheckedIcon />
              <li>{option}</li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShopCard;
