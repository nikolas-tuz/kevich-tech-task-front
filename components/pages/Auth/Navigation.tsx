// 'use client';

import { ComponentPropsWithoutRef } from 'react';
import Logo from '@/components/UI/Icons/Logo';
import { Skeleton } from '@mui/material';

type NavigationType = {
  // children: ReactNode;
} & ComponentPropsWithoutRef<'nav'>;

export default function Navigation({ ...props }: NavigationType) {
  return (
    <>
      <nav {...props}>
        <div className={`flex items-center justify-between`}>
          <div className={`flex items-center gap-4`}>
            <Logo />
            <h2 className={`font-medium text-xl`}>Train Schedule</h2>
          </div>
          <div>
            <Skeleton animation={`wave`} variant={`circular`} height={50} width={50}></Skeleton>
          </div>
        </div>
      </nav>
    </>
  );
}
