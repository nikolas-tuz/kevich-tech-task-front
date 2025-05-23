// 'use client';

import { ComponentPropsWithoutRef } from 'react';

type ParagraphType = {
  // children: ReactNode;
} & ComponentPropsWithoutRef<'p'>;

export default function Paragraph({ ...props }: ParagraphType) {
  return (
    <>
      <p {...props}>{props.children}</p>
    </>
  );
}
