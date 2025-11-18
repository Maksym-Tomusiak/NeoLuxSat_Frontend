"use client";

import React from "react";
import SectionHeader from "../SectionHeader";
import ServicesPartnersSlider, {
  type SliderKey,
} from "./ServicesPartnersSlider";

type ServicesParnerSliderSectionProps = {
  sliderKey: SliderKey;
  description?: React.ReactNode;
  duration?: number;
};

const ServicesParnerSliderSection: React.FC<
  ServicesParnerSliderSectionProps
> = ({ description, sliderKey, duration }) => {
  return (
    <section>
      <div className="flex flex-col flex-wrap sm:flex-row justify-between lg:items-end w-full mb-[60px] gap-[24px]">
        <SectionHeader isCta={false}>
          Наші <br className="hidden sm:block" />
          партнери
        </SectionHeader>
        {description}
      </div>
      <ServicesPartnersSlider sliderKey={sliderKey} duration={duration} />
    </section>
  );
};

export default React.memo(ServicesParnerSliderSection);
