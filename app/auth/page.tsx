'use client';

/*
type AuthPageType = {
  // children: ReactNode;
}
*/

import SnackbarMUI, { SnackbarData } from '@/components/UI/Snackbars/SnackbarMUI';
import { useEffect, useState } from 'react';

export default function AuthPage(/*{}: AuthPageType*/) {
  const [snackbarState, setSnackbarState] = useState<boolean>(false);
  const [snackbarData, setSnackbarData] = useState<SnackbarData>();

  useEffect(() => {
    if (typeof window !== `undefined`) {
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
      <main className={`container m-auto px-4 mt-4`}>
        <h2>Auth page - Login + register</h2>
      </main>
    </>
  );
}
