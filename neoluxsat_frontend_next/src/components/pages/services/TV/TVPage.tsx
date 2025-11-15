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
        — міжнародний супутниковий оператор із широким вибором каналів, та{" "}
        <a
          href="/"
          target="_blank"
          className="font-noto text-[16px]/[120%] tracking-[-0.32px] text-primaryOrange font-medium"
        >
          Комлайн
        </a>{" "}
        — телеком-компанія, що забезпечує інтернет, телефонію й телебачення з
        високим рівнем сервісу.
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
        />
      </ServicesPageTemplate>
    </>
  );
};

export default TVPage;
