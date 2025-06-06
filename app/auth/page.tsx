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
import PlaceholderText from '@/components/UI/InfoMessage/PlaceholderText';

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

  async function handleAuthentication(results: { email: string; password: string }, mode: `login` | `register`) {
    setBackdropState(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${mode}`, {
        email: results.email,
        password: results.password
      }).then(res => res.data as AxiosResponseInterface);

      if (response?.status === `success`
        && response?.data?.accessToken
        && response?.data?.user?.email
      ) {
        logIn(response.data.accessToken, response.data.user.email);
      } else {
        setErrorMessage(response.data?.error || `Failed to ${mode} the user. Please try again.`);
      }
    } catch (e) {
      setBackdropState(false);
      const error = e as AxiosErrorInterface;
      setErrorMessage(error?.response?.data?.message || `Failed to ${mode} the user. Please try again.`);
    }
  }

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
      await handleAuthentication(results, `login`);
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

    startTransition(async () => {
      await handleAuthentication(results, `register`);
    });
  }

  const submitFormBtnText = authState === `login` ? `Sign In` : `Sign Up`;

  return (
    <>
      <MUIBackdrop circularProgress={`percentage`} state={{ open: backdropState, setOpen: setBackdropState }} />
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
            {errorMessage && <ErrorMessage className={`flex items-center gap-3 mt-3`}>{errorMessage}</ErrorMessage>}

            <DivContainer className={`mt-4`}>
              <PlaceholderText className={`text-sm`} tooltipPlacement={`top`}
                               tooltipTitle={`I did change the Render server plan to free solution. The tech specialist approved my tech task, so I do not want to waste money on paid server `}
                               text={`Hey! :D The server can be in hibernation. In this case when you try to sign in/up, you need to wait
            up to 1 minute for it to spin up 😪`} />
            </DivContainer>
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
            {errorMessage && <ErrorMessage className={`flex items-center gap-3 mt-3`}>{errorMessage}</ErrorMessage>}

            <DivContainer className={`mt-4`}>
              <PlaceholderText className={`text-sm`} tooltipPlacement={`top`}
                               tooltipTitle={`I did change the Render server plan to free solution. The tech specialist approved my tech task, so I do not want to waste money on paid server `}
                               text={`Hey! :D The server can be in hibernation. In this case when you try to sign in/up, you need to wait
            up to 1 minute for it to spin up 😪`} />
            </DivContainer>
            <Button className={`mt-8 `}>
              {isPending ? <CircularProgress color={`error`} /> : <>{submitFormBtnText}</>}
            </Button>
          </form>
        )}
      </main>
    </>
  );
}
