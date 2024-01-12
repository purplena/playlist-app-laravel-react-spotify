import * as React from 'react';
import { Stack, TextField } from '@mui/material';

export default function SearchBar({ handleInput }) {
  return (
    <Stack direction="column" maxWidth={500} alignItems="center" spacing={2}>
      <TextField
        id="outlined-basic"
        label="Taper votre chanson"
        variant="outlined"
        onChange={handleInput}
      />
    </Stack>
  );
}
