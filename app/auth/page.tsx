'use client';

/*
type AuthPageType = {
  // children: ReactNode;
}
*/

import SnackbarMUI, { SnackbarData } from '@/components/UI/Snackbars/SnackbarMUI';
import { FormEvent, useEffect, useState, useTransition } from 'react';
import { isWindowDefined } from '@/utils/functions/isWindowDefined';
import Navigation from '@/components/pages/Auth/Navigation';
import BadgeButton from '@/components/UI/Buttons/BadgeButton';
import MainHeading from '@/components/UI/Typography/MainHeading';
import DivContainer from '@/components/UI/Containers/DivContainer';
import Input from '@/components/UI/FormControls/Input';
import ErrorMessage from '@/components/UI/InfoMessage/ErrorMesage';
import Button from '@/components/UI/Buttons/Button';
import { loginSchema } from '@/utils/schemas/login.schema';
import { CircularProgress } from '@mui/material';
import { registerSchema } from '@/utils/schemas/register.schema';
import axios from 'axios';
import { AxiosErrorInterface, AxiosResponseInterface } from '@/utils/interfaces/AxiosResponse.interface';
import { logIn } from '@/utils/auth/logIn';
import MUIBackdrop from '@/components/UI/Backdrops/MUIBackdrop';

type AuthStateType = `login` | `register`;

export default function AuthPage(/*{}: AuthPageType*/) {
  const [authState, setAuthState] = useState<AuthStateType>(`login`);
  const [snackbarState, setSnackbarState] = useState<boolean>(false);
  const [snackbarData, setSnackbarData] = useState<SnackbarData>();
  const [errorMessage, setErrorMessage] = useState(``);
  const [isPending, startTransition] = useTransition();
  const [backdropState, setBackdropState] = useState(false);

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

  function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErrorMessage(``);

    const currObject = e.currentTarget;
    const formData = new FormData(currObject);
    const results = Object.fromEntries(formData.entries()) as { email: string; password: string };

    const validate = loginSchema.safeParse({ email: results?.email, password: results?.password });

    if (!validate.success) {
      setErrorMessage(validate.error.errors[0].message);
      return;
    }

    setBackdropState(true);
    startTransition(async () => {
      try {
        const login = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login`, {
          email: results.email,
          password: results.password
        }).then(res => res.data as AxiosResponseInterface);

        if (login?.status === `success`
          && login?.data?.accessToken
          && login?.data?.user?.email
        ) {
          logIn(login.data.accessToken, login.data.user.email);
        } else {
          setErrorMessage(login.data?.error || `Failed to log the user. Please try again.`);
        }
      } catch (e) {
        setBackdropState(false);
        const error = e as AxiosErrorInterface;
        setErrorMessage(error?.response?.data?.message || `Failed to log the user. Please try again.`);
      }
    });
  }

  function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setErrorMessage(``);

    const currObject = e.currentTarget;
    const formData = new FormData(currObject);
    const results = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string,
      confirmPassword: string;
    };

    const validate = registerSchema.safeParse({
      email: results?.email, password: results?.password,
      confirmPassword: results?.confirmPassword
    });

    if (!validate.success) {
      setErrorMessage(validate.error.errors[0].message);
      return;
    }
    setBackdropState(true);

    /* TODO: LOG THE USER IN
    *   first, use the API to  create a user, and generate a token. Then assign JWT to cookie */

    startTransition(async () => {
      try {
        // simulate loading for 2 secs
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
          console.error(e);
      }
    });

    // resetting the form
    // currObject.reset();
    // output
    console.log('results:', results);
  }

  const submitFormBtnText = authState === `login` ? `Sign In` : `Sign Up`;

  return (
    <>
      <MUIBackdrop state={{ open: backdropState, setOpen: setBackdropState }} />
      <SnackbarMUI
        severity={snackbarData?.severity}
        message={snackbarData?.message}
        state={{ open: snackbarState, setOpen: setSnackbarState }}
      />
      <main className={`container m-auto px-8 mt-4`}>
        <Navigation className={`mb-7`} />
        <MainHeading>{authState === `login` ? `Login Onto System` : `Register Onto System!`}</MainHeading>
        <DivContainer className={`flex items-center justify-center gap-3 mb-7`}>
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
        {authState === `login` && (
          <form onSubmit={handleLogin} className={`flex flex-col justify-center w-[400px] m-auto`}>
            <DivContainer className={`w-full flex justify-center flex-col gap-5`}>
              <Input
                disabled={isPending}
                tooltip={`Please enter a valid email address`}
                name={`email`}
                // required
                type={`email`}
                placeholder={`Enter Email`}
              />

              <Input
                disabled={isPending}
                tooltip={`Please enter your password`}
                name={`password`}
                // required
                type={`password`}
                placeholder={`Enter Password`}
              />
            </DivContainer>
            <DivContainer>
            </DivContainer>
            {errorMessage && <ErrorMessage className={`flex items-center gap-3 mt-3`}>{errorMessage}</ErrorMessage>}
            <Button className={`mt-8 `}>
              {isPending ? <CircularProgress color={`error`} /> : <>Sign In</>}
            </Button>
          </form>
        )}

        {authState === `register` && (
          <form onSubmit={handleRegister} className={`flex flex-col justify-center w-[400px] m-auto`}>
            <DivContainer className={`w-full flex justify-center flex-col gap-5`}>
              <Input
                disabled={isPending}
                tooltip={`Please enter a valid email address`}
                name={`email`}
                // required
                type={`email`}
                placeholder={`Enter Email`}
              />

              <Input
                disabled={isPending}
                tooltip={`Please enter your password`}
                name={`password`}
                // required
                type={`password`}
                placeholder={`Enter Password`}
              />

              <Input
                disabled={isPending}
                tooltip={`Please confirm your password`}
                name={`confirmPassword`}
                // required
                type={`password`}
                placeholder={`Confirm Password`}
              />
            </DivContainer>
            <DivContainer>
            </DivContainer>
            {errorMessage && <ErrorMessage className={`flex items-center gap-3 mt-3`}>{errorMessage}</ErrorMessage>}
            <Button className={`mt-8 `}>
              {isPending ? <CircularProgress color={`error`} /> : <>{submitFormBtnText}</>}
            </Button>
          </form>
        )}
      </main>
    </>
  );
}
