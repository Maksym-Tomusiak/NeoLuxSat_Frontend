"use client";

import ServicesParnerSliderSection from "@/components/common/sections/ServicesParnerSliderSection";
import ServicesPageTemplate from "@/components/common/ServicesPageTemplate";
import { getServicePageData } from "@/services/servicesPageData";
import { useMemo } from "react";

const InternetPage = () => {
  const pageData = getServicePageData("internet");

  const description = useMemo(
    () => (
      <p className="font-noto text-primaryBlue text-[16px]/[120%} tracking-[-0.32px] max-w-[330px]">
        Ми співпрацюємо з провайдером
        <br />
        <a
          href="https://rivneisp.net/tariff"
          target="_blank"
          className="font-noto text-[16px]/[120%] tracking-[-0.32px] text-primaryOrange font-medium"
        >
          Rivne ISP
        </a>{" "}
        , щоб забезпечити вам найкращі рішення.{" "}
        <a
          href="https://rivneisp.net/tariff"
          target="_blank"
          className="font-noto text-[16px]/[120%] tracking-[-0.32px] text-primaryOrange font-medium"
        >
          Rivne ISP
        </a>{" "}
        — регіональний провайдер із Рівненщини, який спеціалізується на
        оптоволоконному підключенні зі швидкістю до 1000 Мбіт/с.
      </p>
    ),
    []
  );

  return (
    <>
      <ServicesPageTemplate {...pageData}>
        <ServicesParnerSliderSection
          sliderKey={"internet"}
          description={description}
        />
      </ServicesPageTemplate>
    </>
  );
};

export default InternetPage;
