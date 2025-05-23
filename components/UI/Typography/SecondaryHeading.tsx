// 'use client';

import { ComponentPropsWithoutRef } from 'react';

type SecondaryHeadingType = {
  // children: ReactNode;
} & ComponentPropsWithoutRef<'h2'>;

export default function SecondaryHeading({ className, ...props }: SecondaryHeadingType) {
  return (
    <>
      <h2 {...props} className={`text-2xl ${className}`}>Here we are! Let’s begin our train journey :D</h2>
    </>
  );
}
