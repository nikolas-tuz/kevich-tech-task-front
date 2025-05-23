'use client';

/*
type AuthPageType = {
  // children: ReactNode;
}
*/

import SnackbarMUI, { SnackbarData } from '@/components/UI/Snackbars/SnackbarMUI';
import { useEffect, useState } from 'react';
import { isWindowDefined } from '@/utils/functions/isWindowDefined';
import Navigation from '@/components/pages/Auth/Navigation';
import BadgeButton from '@/components/UI/Buttons/BadgeButton';
import MainHeading from '@/components/UI/Typography/MainHeading';
import DivContainer from '@/components/UI/Containers/DivContainer';

type AuthStateType = `login` | `register`;

export default function AuthPage(/*{}: AuthPageType*/) {
  const [authState, setAuthState] = useState<AuthStateType>(`login`);
  const [snackbarState, setSnackbarState] = useState<boolean>(false);
  const [snackbarData, setSnackbarData] = useState<SnackbarData>();

  useEffect(() => {
    if (isWindowDefined()) {
      const params = new URLSearchParams(window.location.search);
      const error = params.get('error');

      if (error) {
        setSnackbarData({
          severity: `error`,
          message: error
        });
        setSnackbarState(true);
      }

      // cleanse query
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return (
    <>
      <SnackbarMUI
        severity={snackbarData?.severity}
        message={snackbarData?.message}
        state={{ open: snackbarState, setOpen: setSnackbarState }}
      />
      <main className={`container m-auto px-8 mt-4`}>
        <Navigation className={`mb-7`} />
        <>
          <MainHeading>{authState === `login` ? `Login Onto System` : `Register Onto System!`}</MainHeading>
          <DivContainer className={`flex items-center justify-center gap-3`}>
            <BadgeButton
              onClick={() => setAuthState(`login`)}
              active={authState === `login`}>Login</BadgeButton>
            <BadgeButton
              onClick={() => setAuthState('register')}
              active={authState === 'register'}
            >
              Register
            </BadgeButton>
          </DivContainer>
        </>
      </main>
    </>
  );
}
