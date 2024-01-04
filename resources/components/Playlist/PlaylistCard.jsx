import React from 'react';
import { Box, Paper, Stack, Typography, Grid } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useUpvote } from '../../hooks/useUpvote';
import { useUserStore } from '../../js/useUserStore';
import LinkButton from '../Button/LinkButton';
import { apiUrl } from '../../js/App';
import { useDeleteOrBlacklistOne } from '../../hooks/useDeleteOrBlacklistOne';

const PlaylistCard = ({
  requestedSong,
  index,
  onClick,
  setOpen,
  setModalMessage,
  setModalHeader,
  setAction,
  setActionHandler,
  setSongClicked,
}) => {
  const { user } = useUserStore();
  const { upvote, isUpvoted, likes } = useUpvote(
    requestedSong,
    user,
    setOpen,
    setModalMessage,
    setModalHeader
  );

  const handleUpvote = () => {
    upvote();
  };

  const handleSongDeleteClick = () => {
    setOpen(true);
    setModalHeader('Attention!');
    setModalMessage('Voulez-vous supprimer cette chanson?');
    setSongClicked(requestedSong.song.song_data.song_name);
    setAction('supprimer');
    setActionHandler(() => handleSongDelete);
  };

  const handleSongDelete = () => {
    const { deleteOrBlacklist } = useDeleteOrBlacklistOne(
      `${apiUrl}/manager/songs/destroy/${requestedSong.id}`,
      setOpen,
      onClick,
      requestedSong
    );

    deleteOrBlacklist();
  };

  const handleSongBlacklistingClick = () => {
    setOpen(true);
    setModalHeader('Attention!');
    setModalMessage('Voulez-vous blacklister cette chanson?');
    setSongClicked(requestedSong.song.song_data.song_name);
    setAction('blacklister');
    setActionHandler(() => handleSongBlacklisting);
  };

  const handleSongBlacklisting = () => {
    const { deleteOrBlacklist } = useDeleteOrBlacklistOne(
      `${apiUrl}/manager/songs/store/${requestedSong.id}`,
      setOpen,
      onClick,
      requestedSong
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
                  width: user.company ? 260 : 186,
                }}
                variant="body2"
                gutterBottom
                noWrap
              >
                Titre:{' '}
                <Box component="span" fontWeight="700">
                  {requestedSong.song.song_data.song_name}
                </Box>
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  width: user.company ? 260 : 186,
                }}
                noWrap
              >
                Artiste:{' '}
                <Box component="span" fontWeight="700">
                  {requestedSong.song.song_data.artist_name}
                </Box>
              </Typography>
            </Grid>
            <Stack
              direction="row"
              pl={2}
              mt={2}
              spacing={2}
              alignItems="center"
            >
              {user.company ? (
                <>
                  <Typography variant="body2" sx={{ fontSize: '10px' }}>
                    {likes} {likes === 1 ? ' like' : ' likes'}
                  </Typography>
                  <LinkButton
                    onClick={handleSongDeleteClick}
                    sx={{ fontSize: '10px' }}
                    variant="text"
                    size="small"
                  >
                    Supprimer
                  </LinkButton>
                  <LinkButton
                    sx={{ fontSize: '10px' }}
                    variant="text"
                    size="small"
                    onClick={handleSongBlacklistingClick}
                  >
                    Blacklister
                  </LinkButton>
                </>
              ) : (
                <>
                  <Typography variant="body2">
                    {likes} {likes === 1 ? ' like' : ' likes'}
                  </Typography>
                  <Typography
                    sx={{ cursor: 'pointer' }}
                    variant="body2"
                    onClick={handleUpvote}
                  >
                    {isUpvoted ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                  </Typography>
                </>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default PlaylistCard;
