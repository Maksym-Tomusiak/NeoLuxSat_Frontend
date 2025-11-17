"use client";

import FadeInFromDirection from "../animations/FadeInFromDirection";
import SectionHeader from "../SectionHeader";
import mapImage from "@/assets/images/areas/areas-map-image.png";

const WorkAreasSection = () => {
  return (
    <section>
      <div className="flex justify-between items-start flex-wrap gap-[24px]">
        <SectionHeader isCta={false}>
          Де ми <br className="hidden sm:inline" />
          працюємо
        </SectionHeader>
        <p className="font-noto max-w-[330px] text-primaryBlue text-[16px]/[120%] tracking-[-0.32px]">
          Ми працюємо по всій Західній Україні, забезпечуючи надійні послуги та
          якісний сервіс у кожному регіоні, позначеному на карті.
        </p>
      </div>

      <FadeInFromDirection direction="fade">
        <div className="mx-auto w-full areas-map-container mt-[40px]">
          <img src={mapImage.src} alt="areas map" className="mx-auto" />
        </div>
      </FadeInFromDirection>
    </section>
  );
};

export default WorkAreasSection;
