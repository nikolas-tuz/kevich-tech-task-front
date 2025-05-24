import { useEffect, useState } from 'react';
import { isWindowDefined } from '@/utils/functions/isWindowDefined';
import { getUserEmail } from '@/utils/auth/getUserEmail';

export function useGetUserEmail() {
  const [userEmail, setUserEmail] = useState(``);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(``);

  useEffect(() => {
    if (isWindowDefined()) {
      const userEmail = getUserEmail();
      if (userEmail) {
        setUserEmail(userEmail);
        setLoading(false);
      } else {
        setErrorMessage(`Failed to load the user email.`);
      }
    }
  }, []);

  return {
    userEmail,
    loading,
    errorMessage
  };
}