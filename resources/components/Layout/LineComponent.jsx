import React from 'react';
import { Box } from '@mui/material';

const LineComponent = ({ ...props }) => {
  return (
    <Box
      {...props}
      sx={{
        height: '2px',
        width: '100%',
        backgroundColor: (theme) => theme.palette.primary.main,
      }}
    />
  );
};
export default LineComponent;
