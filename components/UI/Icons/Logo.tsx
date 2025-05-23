// 'use client';

import { ComponentPropsWithoutRef } from 'react';

type LogoType = {
  // children: ReactNode;
} & ComponentPropsWithoutRef<'svg'>;

export default function Logo({ ...props }: LogoType) {
  return (
    <>
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="24" y="24" width="24" height="24" rx="3" transform="rotate(-180 24 24)" fill="#272727" />
        <rect x="10.44" y="20.88" width="7.32" height="10.5" rx="1.44" transform="rotate(-180 10.44 20.88)"
              fill="white" />
        <rect x="20.88" y="20.88" width="7.32" height="16.5" rx="1.44" transform="rotate(-180 20.88 20.88)"
              fill="white" />
      </svg>
    </>
  );
}
