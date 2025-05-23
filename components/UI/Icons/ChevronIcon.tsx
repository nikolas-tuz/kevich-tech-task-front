// 'use client';

import { ComponentPropsWithoutRef } from 'react';

type ChevronIconType = {
  // children: ReactNode;
} & ComponentPropsWithoutRef<'svg'>;

export default function ChevronIcon({ ...props }: ChevronIconType) {
  return (
    <>
      <svg {...props} className={`absolute top-12 right-3`} xmlns="http://www.w3.org/2000/svg" width="24" height="24"
           viewBox="0 0 24 24" fill="none">
        <path d="M7.41 15.41L12 10.83L16.59 15.41L18 14L12 8L6 14L7.41 15.41Z" fill="black" />
      </svg>
    </>
  );
}
