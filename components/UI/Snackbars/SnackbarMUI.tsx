'use client';

import { Alert, AlertColor, AlertPropsColorOverrides, Snackbar, SnackbarCloseReason } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { OverridableStringUnion } from '@mui/types';

export type SnackbarData = {
  severity: OverridableStringUnion<AlertColor, AlertPropsColorOverrides> | undefined;
  message: string | undefined;
}

type SnackbarMUIType = {
  state: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>> }
  autoHideDurationInSecs?: number;
  // children: ReactNode;
} & SnackbarData;

export default function SnackbarMUI({ state, autoHideDurationInSecs = 6, message, severity }: SnackbarMUIType) {
  const { open, setOpen } = state;

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={autoHideDurationInSecs * 1000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
