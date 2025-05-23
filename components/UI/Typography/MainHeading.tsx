// 'use client';

import { ComponentPropsWithoutRef } from 'react';

type MainHeadingType = {
  // children: ReactNode;
} & ComponentPropsWithoutRef<'h2'>;

export default function MainHeading({ className, ...props }: MainHeadingType) {
  return (
    <>
      <h2 className={`text-4xl font-medium text-center mb-4 ${className}`}>{props.children}</h2>
    </>
  );
}
