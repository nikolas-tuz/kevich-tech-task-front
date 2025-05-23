// 'use client';

import { ComponentPropsWithoutRef } from 'react';
import DivContainer from '@/components/UI/Containers/DivContainer';
import Paragraph from '@/components/UI/Typography/Paragraph';
import ChevronIcon from '@/components/UI/Icons/ChevronIcon';

type SelectType = {
  tooltip?: string;
  // children: ReactNode;
} & ComponentPropsWithoutRef<'select'>;

export default function Select({ className = ``, tooltip, ...props }: SelectType) {
  return (
    <>
      <DivContainer className={`relative`}>
        {tooltip && <Paragraph className={`text-sm text-zinc-500/90 mt-2 pl-1 mb-1.5`}>{tooltip}</Paragraph>}
        <select
          {...props}
          className={`bg-zinc-100 px-8 py-4 
            rounded-full w-full outline-transparent transition-all duration-300 focus:outline-1 focus:outline-zinc-300
            appearance-none pr-10 ${className}`} // Add appearance-none and padding-right
        >
          {props.children}
        </select>
        <ChevronIcon className={`absolute top-12 right-3`} />
      </DivContainer>
    </>
  );
}
