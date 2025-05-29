import * as React from 'react';
import { Dispatch, SetStateAction, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import { Box, Typography } from '@mui/material';

type MUIBackdropType = {
  state: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
  };
  circularProgress?: `default` | `percentage`;
}

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ color: '#e2e2e2' }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function MUIBackdrop({ state, circularProgress = `default` }: MUIBackdropType) {
  const { open, setOpen } = state;
  const handleClose = () => {
    setOpen(false);
  };

  const [progress, setProgress] = React.useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={open}
        onClick={handleClose}
      >
        {circularProgress === `default` ? <CircularProgress color="inherit" /> :
          <CircularProgressWithLabel value={progress} />}
      </Backdrop>
    </div>
  );
}