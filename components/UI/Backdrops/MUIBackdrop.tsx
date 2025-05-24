import * as React from 'react';
import { Dispatch, SetStateAction } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

type MUIBackdropType = {
  state: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
  }
}

export default function MUIBackdrop({ state }: MUIBackdropType) {
  const { open, setOpen } = state;
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}