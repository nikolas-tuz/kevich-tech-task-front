// 'use client';

import { ComponentPropsWithoutRef } from 'react';
import Paragraph from '@/components/UI/Typography/Paragraph';
import DivContainer from '@/components/UI/Containers/DivContainer';

type InputType = {
  // children: ReactNode;
  tooltip?: string;
  top?: boolean;
} & ComponentPropsWithoutRef<'input'>;

export default function Input({ className, tooltip, top = false, ...props }: InputType) {
  return (
    <DivContainer>
      {tooltip && top && <Paragraph className={`text-sm text-zinc-500/90 mt-2 pl-1 mb-1.5`}>{tooltip}</Paragraph>}

      <input {...props} className={`bg-zinc-100 px-8 py-4 
              rounded-full w-full outline-transparent transition-all duration-300 focus:outline-1 focus:outline-zinc-300 ${className}`} />

      {tooltip && !top && <Paragraph className={`text-sm text-zinc-500/90 mt-2 pl-1`}>{tooltip}</Paragraph>}

    </DivContainer>
  );
}
