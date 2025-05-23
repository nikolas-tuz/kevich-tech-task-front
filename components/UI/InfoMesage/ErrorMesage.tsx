// 'use client';

import { ComponentPropsWithoutRef } from 'react';
import DivContainer from '@/components/UI/Containers/DivContainer';
import Paragraph from '@/components/UI/Typography/Paragraph';

type ErrorMessageType = {
  // children: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

export default function ErrorMessage({ ...props }: ErrorMessageType) {
  return (
    <>
      <DivContainer {...props}>
        <span
          className={`w-8 h-8 rounded-full border-1 border-red-600 flex items-center justify-center text-red-500`}>!</span>
        <Paragraph className={`text-red-500`}>{props.children}</Paragraph>
      </DivContainer>
    </>
  );
}
