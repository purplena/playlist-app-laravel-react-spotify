import React, { useEffect, useState } from 'react';
import { useGetRequestedSongs } from '../hooks/useGetRequestedSongs';
import { CircularProgress, Grid, Stack, Typography } from '@mui/material';
import LinkButton from '../components/Button/LinkButton';
import PlaylistCard from '../components/Playlist/PlaylistCard';

const CompanyRequestedSongs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { getSongs, requestedSongs, setRequestedSongs } =
    useGetRequestedSongs(setIsLoading);

  // const songs = requestedSongs;

  const handleDeleteOrBlacklist = (id) => {
    setRequestedSongs((prevSongs) =>
      prevSongs.filter((song) => song.id !== id)
    );
  };

  useEffect(() => {
    setIsLoading(true);
    getSongs();
  }, []);

  return (
    <>
      <Typography variant="h4" component="h1" textAlign="center">
        Chansons sugérrées aujourd&apos;hui
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
        mt={4}
      >
        <LinkButton disableElevation size="small">
          supprimer tout
        </LinkButton>
        <LinkButton disableElevation size="small">
          blacklister tout
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
        {requestedSongs.length > 0 ? (
          requestedSongs.map((requestedSong, index) => {
            return (
              <PlaylistCard
                key={requestedSong.id}
                requestedSong={requestedSong}
                index={index}
                onClick={handleDeleteOrBlacklist}
              />
            );
          })
        ) : (
          <Typography variant="subtitle2" textAlign={'center'} mt={21}>
            {"Oups! Il n'y a pas de chansons suggérées..."}
          </Typography>
        )}
      </Grid>
    </>
  );
};
export default CompanyRequestedSongs;
