import { Alert, Grid, Link, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { generatePath, useParams } from 'react-router-dom';
import PlaylistCard from '../components/Playlist/PlaylistCard';
import CircularProgress from '@mui/material/CircularProgress';
import { useGetRequestedSongs } from '../hooks/useGetRequestedSongs';
import LinkButton from '../components/Button/LinkButton';
import ModalWindow from '../components/Layout/ModalWindow';
import { useUserStore } from '../js/useUserStore';
import LineComponent from '../components/Layout/LineComponent';
import { useGetCompany } from '../hooks/useGetCompany';
import { Box } from '@mui/system';

const RequestedSongs = () => {
  const { user } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const { getSongs, requestedSongs, serverErrorMessage } =
    useGetRequestedSongs(setIsLoading);
  const [open, setOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalHeader, setModalHeader] = useState('');
  const { id } = useParams();
  const { company } = useGetCompany();

  useEffect(() => {
    setIsLoading(true);
    getSongs();
  }, []);

  return (
    <>
      <Stack mb={2}>
        <Typography variant="h1" component="h1" textAlign="center" mb={2}>
          {"Créer de l'ambiance musicale"}
        </Typography>
        <Stack spacing={2} justifyContent={'center'} alignItems={'center'}>
          <Typography variant="body1" component="p" textAlign="center">
            Chaque jour, nous sélectionnons les chansons les plus votées pour
            les ajouter à notre playlist
          </Typography>
          <Typography variant="body1" component="p" textAlign="center">
            Découvrez notre playlist directement sur Spotify
          </Typography>
          <Link
            underline="none"
            href={`https://open.spotify.com/playlist/${company?.spotify_playlist_data?.id}`}
            sx={{
              color: '#000000',
              width: '120px',
            }}
          >
            <Stack
              sx={{
                padding: '10px 15px',
                border: '1px solid #000000',
                borderRadius: '5px',
                '&:hover': {
                  borderColor: (theme) => theme.palette.primary.main,
                },
              }}
              direction={'row'}
              spacing={2}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Box
                component="img"
                sx={{
                  width: '24px',
                }}
                src="../images/spotify-logo.png"
                alt="Logo Spotify"
              />
              <Typography
                variant="body1"
                component="p"
                textAlign="center"
                mt={2}
              >
                Playlist
              </Typography>
            </Stack>
          </Link>
        </Stack>
      </Stack>

      <LineComponent />

      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
        mt={4}
        mb={4}
      >
        <Typography variant="subtitle2" textAlign={'center'}>
          Voulez-vous suggérer une chanson?
        </Typography>
        <LinkButton
          disableElevation
          size="small"
          to={generatePath('/:id/songs/search', { id })}
        >
          suggérer
        </LinkButton>
      </Stack>
      <LineComponent />
      {isLoading && (
        <Stack justifyContent="center" alignItems="center" mt={4}>
          <CircularProgress />
        </Stack>
      )}
      <Grid
        container
        mt={4}
        justifyContent="center"
        alignItems="center"
        columnSpacing={{ xs: 1, sm: 2 }}
        rowSpacing={1}
      >
        {serverErrorMessage && (
          <Alert variant="outlined" severity="error">
            Oups! Il y a un problem. Réessayez plus tard.
          </Alert>
        )}
        {requestedSongs.length > 0 ? (
          requestedSongs.map((requestedSong, index) => {
            return (
              <PlaylistCard
                key={requestedSong.id}
                requestedSong={requestedSong}
                index={index}
                setOpen={setOpen}
                setModalMessage={setModalMessage}
                setModalHeader={setModalHeader}
              />
            );
          })
        ) : (
          <Typography variant="subtitle2" textAlign={'center'}>
            {"Oups! Il n'y a pas de chansons suggérées..."}
          </Typography>
        )}
      </Grid>
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
};

export default RequestedSongs;
