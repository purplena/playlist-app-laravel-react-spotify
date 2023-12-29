import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Stack, TextField } from '@mui/material';

export default function SearchBar({ handleInput, isLoading }) {
  return (
    <Stack direction="row" maxWidth={500} alignItems="center">
      <TextField
        id="outlined-basic"
        label="Taper votre chanson"
        variant="outlined"
        onChange={handleInput}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        {isLoading ? <MoreHorizIcon /> : <SearchIcon />}
      </IconButton>
    </Stack>
  );
}
