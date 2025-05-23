'use client';

import { ComponentPropsWithoutRef } from 'react';
import LogoIcon from '@/components/UI/Icons/LogoIcon';
import DivContainer from '@/components/UI/Containers/DivContainer';
import Paragraph from '@/components/UI/Typography/Paragraph';
import LogoutIcon from '@/components/UI/Icons/LogoutIcon';
import { trimText } from '@/utils/functions/trimText';

type NavigationDashboardType = {
  // children: ReactNode;
} & ComponentPropsWithoutRef<'nav'>;

export default function NavigationDashboard({ ...props }: NavigationDashboardType) {

  function handleLogout() {
    /* TODO: HANDLE LOGOUT. REMOVE ACCESS TOKEN AND REDIRECT USER TO /AUTH */
  }

  return (
    <>
      <nav {...props}>
        <DivContainer className={`flex items-center justify-between`}>
          <DivContainer className={`flex items-center gap-4`}>
            <LogoIcon />
            <h2 className={`font-medium text-xl`}>Train Schedule</h2>
          </DivContainer>
          <DivContainer className={`flex items-center gap-3`}>
            <Paragraph>{trimText(`tuznikolas@gmail.com`, 14)}</Paragraph>
            <Paragraph className={`w-14 h-14 rounded-full flex items-center justify-center border-1 
              border-zinc-900 font-medium`}>You</Paragraph>
            <LogoutIcon onClick={handleLogout}
                        className={`cursor-pointer transition-all duration-200 hover:scale-105`} />
          </DivContainer>
        </DivContainer>
      </nav>
    </>
  );
}