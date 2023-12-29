import { Alert, Button, Grid, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { generatePath } from 'react-router-dom';
import PlaylistCard from '../components/Playlist/PlaylistCard';
import CircularProgress from '@mui/material/CircularProgress';
import { useGetRequestedSongs } from '../hooks/useGetRequestedSongs';
import LinkButton from '../components/Button/LinkButton';

const RequestedSongs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { getSongs, requestedSongs, serverErrorMessage } =
    useGetRequestedSongs(setIsLoading);

  useEffect(() => {
    setIsLoading(true);
    getSongs();
  }, []);

  return (
    <>
      <Typography variant="h4" component="h1" textAlign="center">
        Créer de l’ambiance musicale
      </Typography>
      <Typography variant="body1" textAlign="center" mt={2}>
        Chaque jour, nous sélectionnons les 10 chansons les plus votées pour les
        ajouter à notre playlist
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
        mt={4}
      >
        <Typography variant="subtitle2" textAlign={'center'} mt={21}>
          Voulez-vous suggérer une chanson?
        </Typography>
        <LinkButton
          disableElevation
          size="small"
          to={generatePath('/:id/songs/search', { id: 1 })}
        >
          suggérer
        </LinkButton>
      </Stack>
      {isLoading && (
        <Stack justifyContent="center" alignItems="center" mt={4}>
          <CircularProgress />
        </Stack>
      )}
      <Grid
        container
        gap={3}
        mt={6}
        justifyContent="center"
        flexBasis="flex-start"
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
              />
            );
          })
        ) : (
          <Typography variant="subtitle2" textAlign={'center'} mt={21}>
            Oups! Il n'y a pas de chansons suggérées...
          </Typography>
        )}
      </Grid>
    </>
  );
};

export default RequestedSongs;
