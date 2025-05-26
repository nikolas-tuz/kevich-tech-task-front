// 'use client';

import { Placement } from '@popperjs/core';
import { Tooltip } from '@mui/material';
import Paragraph from '@/components/UI/Typography/Paragraph';
import { ComponentPropsWithoutRef } from 'react';

type PlaceholderTextType = {
  tooltipTitle: string;
  text: string;
  tooltipPlacement: Placement;
  // children: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

export default function PlaceholderText({ tooltipTitle, text, tooltipPlacement, ...props }: PlaceholderTextType) {
  return (
    <>
      <Tooltip {...props} placement={tooltipPlacement}
               title={tooltipTitle}>
        <Paragraph>{text}</Paragraph>
      </Tooltip>
    </>
  );
}
