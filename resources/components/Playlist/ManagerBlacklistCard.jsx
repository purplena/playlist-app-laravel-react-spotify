import React from 'react';
import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import { apiUrl } from '../../js/App';
import LinkButton from '../Button/LinkButton';
import { useDeleteOrBlacklistOne } from '../../hooks/useDeleteOrBlacklistOne';

const ManagerBlacklistCard = ({
  index,
  blacklistedSong,
  onClick,
  setOpen,
  setModalHeader,
  setModalMessage,
  setSongClicked,
  setAction,
  setActionHandler,
}) => {
  const handleSongDeleteClick = () => {
    setOpen(true);
    setModalHeader('Attention!');
    setModalMessage(
      "Voulez-vous supprimer cette chanson de votre blacklist ? Après cette action, les utilisateurs pourront l'ajouter à nouveau dans votre playlist."
    );
    setSongClicked(blacklistedSong.song_data.song_name);
    setAction('supprimer de blacklist');
    setActionHandler(() => handleDelete);
  };

  const handleDelete = () => {
    const { deleteOrBlacklist } = useDeleteOrBlacklistOne(
      `${apiUrl}/manager/blacklist/destroy/${blacklistedSong.id}`,
      setOpen,
      onClick,
      blacklistedSong
    );

    deleteOrBlacklist();
  };

  return (
    <Paper
      sx={{
        width: 300,
        p: 2,
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <Paper
            elevation={0}
            sx={{
              borderRadius: '50%',
              width: '50px',
              height: '50px',
              background: '#1769aa',
            }}
          />
        </Grid>
        <Grid item xs container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                #{index + 1}
              </Typography>
              <Typography
                sx={{
                  width: 186,
                }}
                variant="body2"
                gutterBottom
                noWrap
              >
                {'Titre: '}
                <Box component="span" fontWeight="700">
                  {blacklistedSong.song_data.song_name}
                </Box>
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  width: 186,
                }}
                noWrap
              >
                {'Artiste: '}
                <Box component="span" fontWeight="700">
                  {blacklistedSong.song_data.artist_name}
                </Box>
              </Typography>
            </Grid>
            <Stack
              direction="row"
              pl={2}
              mt={2}
              spacing={4}
              alignItems="center"
              justifyContent="end"
            >
              <LinkButton
                onClick={handleSongDeleteClick}
                sx={{ fontSize: '10px' }}
                variant="text"
                size="small"
              >
                Supprimer
              </LinkButton>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default ManagerBlacklistCard;
