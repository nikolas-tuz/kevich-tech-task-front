'use client';

import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { Dialog } from '@mui/material';
import { createPortal } from 'react-dom';
import { isWindowDefined } from '@/utils/functions/isWindowDefined';

type MUIDialogType = {
  modalState: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>> }
  children: ReactNode;
};

export default function MUIDialog({ modalState, children }: MUIDialogType) {
  const [dialogContainer, setDialogContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (isWindowDefined()) {
      let container = document.getElementById('dialog');
      if (!container) {
        container = document.createElement('div');
        container.id = 'dialog';
        document.body.appendChild(container);
      }
      setDialogContainer(container);
    }
  }, []);

  const handleClose = () => {
    modalState.setOpen(false);
  };

  const { open } = modalState;

  if (!dialogContainer) return null;

  return createPortal(
    <Dialog
      BackdropProps={{
        sx: {
          backdropFilter: 'blur(3px)'
        }
      }}
      maxWidth="md"
      onClose={handleClose}
      open={open}
    >
      {children}
    </Dialog>,
    dialogContainer
  );
}