import React from 'react';
import { Box, Paper, Stack, Typography, Grid } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useUpvote } from '../../hooks/useUpvote';
import { useUserStore } from '../../js/useUserStore';

const PlaylistCard = ({
  requestedSong,
  index,
  setOpen,
  setModalMessage,
  setModalHeader,
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

  return (
    <Grid item xxs={12} xs={10} sm={8}>
      <Paper>
        <Stack padding={3} spacing={2}>
          <Stack spacing={3} direction={'row'} pt={'3px'}>
            <Box
              component="img"
              sx={{
                borderRadius: '5px',
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
