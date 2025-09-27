import React from 'react';
import { cn } from '@/lib/utils';

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
    ? 'text-primaryWhite text-[64px]/[90%]'
    : 'text-primaryBlue/20 text-[88px]/[90%] tracking-[-2px]';

  return (
    <h2 className={cn('font-manrope font-semibold', classes, className)}>
      {children}
    </h2>
  );
};

export default SectionHeader;
