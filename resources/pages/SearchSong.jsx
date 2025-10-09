import React, { useState } from 'react';
import { useSearchSong } from '../hooks/useSearchSong';
import SearchBar from '../components/Form/SearchBar';
import { Box, Grid, Stack, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import SongSearchCard from '../components/Playlist/SongSearchCard';
import ModalWindow from '../components/Layout/ModalWindow';
import LineComponent from '../components/Layout/LineComponent';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { useStore } from '../js/useStore';

function Search() {
  const { isLoading, searchResults, handleInput } = useSearchSong();
  const { user } = useStore();
  const [open, setOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalHeader, setModalHeader] = useState('');

  return (
    <>
      <Stack
        mb={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h1" component="h1" textAlign="center">
          {'Ajoutez vos chansons préférées'}
        </Typography>
        <Box
          component="img"
          sx={{
            transform: 'rotate(180deg)',
            height: '80px',
            objectFit: 'contain',
          }}
          src="/images/hero-disk-image.jpg"
          alt="Photo of vinyle disk"
        />
        <LineComponent />
        <Stack mt={2} mb={2} spacing={2}>
          <SearchBar handleInput={handleInput} />
          <Stack
            direction="row"
            spacing={1}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Typography variant="body1" component="p" fontSize={'12px'}>
              cliquez sur
            </Typography>
            <PlaylistAddIcon />
            <Typography variant="body1" component="p" fontSize={'12px'}>
              pour ajouter une chanson
            </Typography>
          </Stack>
        </Stack>
        <LineComponent mb={2} />

        {isLoading && <CircularProgress />}
        {searchResults.length > 0 ? (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            columnSpacing={{ xs: 1, sm: 2 }}
            rowSpacing={1}
          >
            {searchResults.map((song) => {
              return (
                <SongSearchCard
                  song={song}
                  setOpen={setOpen}
                  setModalMessage={setModalMessage}
                  setModalHeader={setModalHeader}
                  key={song.spotify_id}
                />
              );
            })}
          </Grid>
        ) : (
          <Stack height={'50vh'} />
        )}
      </Stack>
      {user ? (
        <ModalWindow
          open={open}
          setOpen={setOpen}
          modalMessage={modalMessage}
          modalHeader={modalHeader}
          user={user}
        />
      ) : (
        ''
      )}
    </>
  );
}

export default Search;
