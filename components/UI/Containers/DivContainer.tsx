// 'use client';

import { ComponentPropsWithoutRef } from 'react';

type DivContainerType = {
  // children: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

export default function DivContainer({ ...props }: DivContainerType) {
  return (
    <div {...props}>
      {props.children}
    </div>
  );
}
