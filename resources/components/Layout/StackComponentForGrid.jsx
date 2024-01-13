import React from 'react';
import { Stack } from '@mui/material';

const StackComponentForGrid = ({ children }) => {
  return (
    <Stack
      spacing={2}
      sx={(theme) => ({
        border: `1px solid ${theme.palette.primary.main}`,
        height: '100%',
        '@media (max-width: 898px)': {
          height: 'auto',
        },
      })}
      borderRadius={'5px'}
      padding={'1rem'}
      justifyContent={'space-between'}
    >
      {children}
    </Stack>
  );
};
export default StackComponentForGrid;
