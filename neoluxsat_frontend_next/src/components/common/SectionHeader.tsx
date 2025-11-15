"use client";

import React from "react";
import { cn } from "@/lib/utils";

const SectionHeader = ({
  children,
  className,
  isCta,
}: {
  children: React.ReactNode;
  className?: string;
  isCta?: boolean;
}) => {
  const classes = isCta
    ? "text-primaryWhite text-[40px]/[90%] 2xs:text-[48px]/[90%] md:text-[52px]/[90%] lg:text-[64px]/[90%]"
    : "text-primaryBlue/20 text-[40px]/[90%] 2xs:text-[48px]/[90%] md:text-[52px]/[90%] lg:text-[64px]/[90%] xl:text-[88px]/[90%]";

  return (
    <h2
      className={cn(
        "font-manrope font-semibold tracking-[-2px]",
        classes,
        className
      )}
    >
      {children}
    </h2>
  );
};

export default React.memo(SectionHeader);
