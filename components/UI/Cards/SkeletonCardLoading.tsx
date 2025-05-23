// 'use client';

/*
type SkeletonCardLoadingType = {
  // children: ReactNode;
}
*/

import DivContainer from '@/components/UI/Containers/DivContainer';
import { CircularProgress } from '@mui/material';

export default function SkeletonCardLoading(/*{}: SkeletonCardLoadingType*/) {
  return (
    <>
      <DivContainer className={`flex items-center justify-center min-w-[362px] h-[300px]`}>
        <CircularProgress />
      </DivContainer>
    </>
  );
}
