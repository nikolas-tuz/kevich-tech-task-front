// 'use client';

import { ComponentPropsWithoutRef } from 'react';

type LogoutType = {
  // children: ReactNode;
} & ComponentPropsWithoutRef<'svg'>;

export default function LogoutIcon({ ...props }: LogoutType) {
  return (
    <>
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="none">
        <path
          d="M11.3334 4.66667L10.3934 5.60667L12.1134 7.33333H5.33337V8.66667H12.1134L10.3934 10.3867L11.3334 11.3333L14.6667 8M2.66671 3.33333H8.00004V2H2.66671C1.93337 2 1.33337 2.6 1.33337 3.33333V12.6667C1.33337 13.4 1.93337 14 2.66671 14H8.00004V12.6667H2.66671V3.33333Z"
          fill="black" />
      </svg>
    </>
  );
}
