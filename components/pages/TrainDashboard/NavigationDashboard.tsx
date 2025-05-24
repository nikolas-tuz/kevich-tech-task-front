'use client';

import { ComponentPropsWithoutRef } from 'react';
import LogoIcon from '@/components/UI/Icons/LogoIcon';
import DivContainer from '@/components/UI/Containers/DivContainer';
import Paragraph from '@/components/UI/Typography/Paragraph';
import LogoutIcon from '@/components/UI/Icons/LogoutIcon';
import { trimText } from '@/utils/functions/trimText';
import { logOut } from '@/utils/auth/logOut';
import { useGetUserEmail } from '@/hooks/getUserEmail';
import { Skeleton } from '@mui/material';

type NavigationDashboardType = {
  // children: ReactNode;
} & ComponentPropsWithoutRef<'nav'>;

export default function NavigationDashboard({ ...props }: NavigationDashboardType) {
  const { userEmail, loading } = useGetUserEmail();

  return (
    <>
      <nav {...props}>
        <DivContainer className={`flex items-center justify-between`}>
          <DivContainer className={`flex items-center gap-4`}>
            <LogoIcon />
            <h2 className={`font-medium text-xl`}>Train Schedule</h2>
          </DivContainer>
          <DivContainer className={`flex items-center gap-3`}>
            {!loading && userEmail && <Paragraph>{trimText(`${userEmail}`, 14)}</Paragraph>}
            {loading && <Skeleton width={200} height={30}></Skeleton>}
            <Paragraph className={`w-14 h-14 rounded-full flex items-center justify-center border-1 
              border-zinc-900 font-medium`}>You</Paragraph>
            <LogoutIcon onClick={logOut}
                        className={`cursor-pointer transition-all duration-200 hover:scale-105`} />
          </DivContainer>
        </DivContainer>
      </nav>
    </>
  );
}