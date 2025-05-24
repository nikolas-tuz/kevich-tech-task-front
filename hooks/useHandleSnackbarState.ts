import { useState } from 'react';
import { SnackbarData } from '@/components/UI/Snackbars/SnackbarMUI';
import { OverridableStringUnion } from '@mui/types';
import { AlertColor, AlertPropsColorOverrides } from '@mui/material';

export function useHandleSnackbarState() {
  const [snackbarState, setSnackbarState] = useState<boolean>(false);
  const [snackbarData, setSnackbarData] = useState<SnackbarData>();

  function handleSnackbarState(severity: OverridableStringUnion<AlertColor, AlertPropsColorOverrides>,
                               message: string, state = true) {
    setSnackbarState(state);
    setSnackbarData({ severity, message });
  }

  return {
    snackbarState,
    snackbarData,
    setSnackbarState,
    handleSnackbarState
  };
}