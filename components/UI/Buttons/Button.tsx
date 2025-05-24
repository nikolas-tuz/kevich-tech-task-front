// 'use client';

import { ComponentPropsWithoutRef } from 'react';

type ButtonType = {
  mode?: `black` | `red` | `static-white`;
  // children: ReactNode;
} & ComponentPropsWithoutRef<'button'>;

export default function Button({ className, mode = `black`, ...props }: ButtonType) {
  const modeStylesApplied = mode === `black` ? `bg-zinc-950 text-white hover:bg-white hover:text-zinc-950 hover:border-1 hover:border-zinc-900 hover:bg-white ` :
    mode === `red` ? `bg-red-500 text-white hover:bg-red-600`: `bg-white text-zinc-950 border-1 border-zinc-900 bg-white hover:bg-zinc-950 hover:text-white`;
  return (
    <>
      <button {...props} className={`py-5 rounded-full font-medium border-1 border-transparent ${modeStylesApplied}
      transition-all duration-200 cursor-pointer  
      ${className}`}>
        {props.children}
      </button>
    </>
  );
}
