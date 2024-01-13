import React from 'react';
import { Box, Paper, Stack, Typography, Grid } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useUpvote } from '../../hooks/useUpvote';
import { useUserStore } from '../../js/useUserStore';
import LinkButton from '../Button/LinkButton';
import {
  actions,
  useDeleteOrBlacklistOne,
} from '../../hooks/useDeleteOrBlacklistOne';

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
    const { deleteOrBlacklist } = useDeleteOrBlacklistOne({
      action: actions.destroyRequestedSong,
      setOpen,
      onClick,
      itemId: requestedSong.id,
    });

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
    const { deleteOrBlacklist } = useDeleteOrBlacklistOne({
      action: actions.storeBlacklist,
      setOpen,
      onClick,
      itemId: requestedSong.id,
    });

    deleteOrBlacklist();
  };

  return (
    <Grid item xxs={12} xs={10} sm={8} md={6} lg={4}>
      <Paper>
        <Stack padding={3} spacing={2}>
          <Stack spacing={1} direction={'row'} pt={'3px'}>
            <Box
              component="img"
              sx={{
                borderRadius: '50%',
                width: '60px',
                height: '60px',
              }}
              src={requestedSong?.song.song_data?.album_cover_img}
            />

            <Stack>
              <SongTrancatedComponent
                song={requestedSong.song.song_data.song_name}
                label={'Titre'}
                fontSize={'14px'}
              />
              <SongTrancatedComponent
                song={requestedSong.song.song_data.artist_name}
                label={'Artiste'}
                fontSize={'14px'}
              />
            </Stack>
          </Stack>

          <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography
              gutterBottom
              variant="h6"
              component="p"
              mb={0}
              fontWeight={800}
            >
              #{index + 1}
            </Typography>

            <Stack direction="row" spacing={2} alignItems="center">
              {user?.company ? (
                <>
                  <Typography variant="body2" sx={{ fontSize: '10px' }}>
                    {likes} {likes === 1 ? ' like' : ' likes'}
                  </Typography>
                  <LinkButton
                    onClick={handleSongDeleteClick}
                    sx={{
                      fontSize: '10px',
                      '&:hover': {
                        backgroundColor: (theme) => theme.palette.primary.dark,
                        color: (theme) => theme.palette.text.secondary,
                      },
                    }}
                    variant="text"
                    size="small"
                  >
                    Supprimer
                  </LinkButton>
                  <LinkButton
                    sx={{
                      fontSize: '10px',
                      '&:hover': {
                        backgroundColor: (theme) => theme.palette.primary.dark,
                        color: (theme) => theme.palette.text.secondary,
                      },
                    }}
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
                    {isUpvoted ? (
                      <ThumbUpIcon
                        sx={{ color: (theme) => theme.palette.primary.dark }}
                      />
                    ) : (
                      <ThumbUpOutlinedIcon
                        sx={{ color: (theme) => theme.palette.primary.dark }}
                      />
                    )}
                  </Typography>
                </>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </Grid>
  );
};
export default PlaylistCard;

function SongTrancatedComponent({ song, label, ...props }) {
  const MAX_SONG_NAME_LENGTH = 16;
  const truncatedSongName =
    song.length <= MAX_SONG_NAME_LENGTH
      ? song
      : `${song.substring(0, MAX_SONG_NAME_LENGTH)}...`;

  return (
    <div>
      <Typography {...props} gutterBottom variant="body1" component="h2">
        {' '}
        {label} {': '}
        <Box component="span" fontWeight="700">
          {truncatedSongName}
        </Box>
      </Typography>
    </div>
  );
}
