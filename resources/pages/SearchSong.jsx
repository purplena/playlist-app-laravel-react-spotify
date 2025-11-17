import { useState } from 'react';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { Box, Grid, Stack, TextField, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import LineComponent from '../components/Layout/LineComponent';
import ModalWindow from '../components/Layout/ModalWindow';
import SongSearchCard from '../components/Playlist/SongSearchCard';
import { useSearchSong } from '../hooks/useSearchSong';
import { useStore } from '../js/useStore';

function Search() {
  const { isLoading, searchResults, handleInput } = useSearchSong();
  const { user } = useStore();
  const [open, setOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalHeader, setModalHeader] = useState('');
  const [modalRedirect, setModalRedirect] = useState('');


  return (
    <>
      <Stack mb={2} direction="column" justifyContent="center" alignItems="center">
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
          <Stack direction="column" maxWidth={500} alignItems="center" spacing={2}>
            <TextField
              id="outlined-basic"
              label="Taper votre chanson"
              variant="outlined"
              onChange={handleInput}
            />
          </Stack>
          <Stack direction="row" spacing={1} justifyContent={'center'} alignItems={'center'}>
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
                  setModalRedirect={setModalRedirect}
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
          modalRedirect={modalRedirect}
          user={user}
        />
      ) : (
        ''
      )}
    </>
  );
}

export default Search;
