import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingBackdrop({open}: {open: boolean}) {
  return (
    <Backdrop sx={{color: '#FFE48F', zIndex: theme => theme.zIndex.drawer + 1}} open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
