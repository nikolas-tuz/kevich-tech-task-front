// 'use client';

import { ComponentPropsWithoutRef } from 'react';

type BadgeButtonType = {
  active?: boolean;
  // children: ReactNode;
} & ComponentPropsWithoutRef<'button'>;

export default function BadgeButton({ active = true, className, ...props }: BadgeButtonType) {
  const appliedStyles = active ? `rounded-full bg-zinc-950 text-white px-5 py-2 text-sm` : `rounded-full border-1 border-zinc-900 text-zinc-800 px-5 py-2 text-sm `;
  return (
    <>
      <button {...props}
              className={`${appliedStyles} transition-all duration-200  hover:scale-105 cursor-pointer ${className}`}>{props.children}</button>
    </>
  );
}
