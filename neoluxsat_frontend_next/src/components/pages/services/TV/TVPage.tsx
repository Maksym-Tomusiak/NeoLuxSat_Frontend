"use client";

import ServicesParnerSliderSection from "@/components/common/sections/ServicesParnerSliderSection";
import ServicesPageTemplate from "@/components/common/ServicesPageTemplate";
import { getServicePageData } from "@/services/servicesPageData";
import { useMemo } from "react";

const TVPage = () => {
  const pageData = getServicePageData("tv");

  const description = useMemo(
    () => (
      <p className="font-noto text-primaryBlue text-[16px]/[120%} tracking-[-0.32px] max-w-[680px]">
        Ми співпрацюємо лише з надійними партнерами, серед яких{" "}
        <a
          href="https://media.1plus1.ua/"
          target="_blank"
          className="font-noto text-[16px]/[120%] tracking-[-0.32px] text-primaryOrange font-medium"
        >
          1+1 media
        </a>{" "}
        з провідними телеканалами та преміальним контентом,{" "}
        <a
          href="https://viasat.com.ua/"
          target="_blank"
          className="font-noto text-[16px]/[120%] tracking-[-0.32px] text-primaryOrange font-medium"
        >
          Viasat
        </a>{" "}
        — міжнародний супутниковий <br className="hidden md:block" />
        оператор із широким вибором каналів, та{" "}
        <a
          href="https://nexon.ua/"
          target="_blank"
          className="font-noto text-[16px]/[120%] tracking-[-0.32px] text-primaryOrange font-medium"
        >
          Nexon
        </a>{" "}
        інтернет-магазин сучасних Android <br className="hidden md:block" />
        TV-приставок із великим вибором, вигідними цінами та швидкою доставкою
        по Україні.
      </p>
    ),
    []
  );

  return (
    <>
      <ServicesPageTemplate {...pageData}>
        <ServicesParnerSliderSection
          sliderKey={"tv"}
          description={description}
          duration={50}
        />
      </ServicesPageTemplate>
    </>
  );
};

export default TVPage;
