// 'use client';

import { ComponentPropsWithoutRef } from 'react';

type ButtonType = {
  // children: ReactNode;
} & ComponentPropsWithoutRef<'button'>;

export default function Button({ className, ...props }: ButtonType) {
  return (
    <>
      <button {...props} className={`py-5 rounded-full bg-zinc-950 text-white font-medium border-1 border-transparent 
      transition-all duration-200 hover:bg-white cursor-pointer hover:text-zinc-950 hover:border-1 hover:border-zinc-900 
      ${className}`}>
        {props.children}
      </button>
    </>
  );
}
