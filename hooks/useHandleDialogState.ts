import { useState } from 'react';

type DialogModeType = `Edit` | `Create`;

export function useHandleDialogState() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<DialogModeType>();

  function handleDialogState(dialogMode: DialogModeType, state: boolean) {
    setDialogMode(dialogMode);
    setDialogOpen(state);
  }

  return {
    dialogMode,
    dialogOpen,
    setDialogMode,
    setDialogOpen,
    handleDialogState
  };
}