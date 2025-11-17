import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import { useUpvote } from '../../hooks/useUpvote';
import { useStore } from '../../js/useStore';
import { useNavigate } from 'react-router-dom';
import SongTrancatedComponent from './SongTrancatedComponent';

const PlaylistCard = ({ requestedSong, index, setOpen, setModalMessage, setModalHeader, setModalRedirect, onUpvoteOptimistic, onUpvoteRefetch }) => {
  const navigate = useNavigate();
  const { user, company } = useStore();
  const { upvote, isUpvoted, likes } = useUpvote(requestedSong);

  const handleUpvote = async () => {
     if (!user) {
      navigate(`/${company.slug}/login`);
    }
    onUpvoteOptimistic(requestedSong.id);

    const response = await upvote();

    if (!response.error) {
      onUpvoteRefetch(); 
    }

    if(response.error) {
      setModalHeader('Oooooups!');
      setModalMessage(response.message);
      setOpen(true);
      setModalRedirect('song_suggest')
    }
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
                maxNameLength='16'
                label={'Titre'}
                fontSize={'14px'}
              />
              <SongTrancatedComponent
                song={requestedSong.song.song_data.artist_name}
                maxNameLength='16'
                label={'Artiste'}
                fontSize={'14px'}
              />
            </Stack>
          </Stack>

          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Typography gutterBottom variant="h6" component="p" mb={0} fontWeight={800}>
              #{index + 1}
            </Typography>

            <Stack direction="row" spacing={2} alignItems="center">
              <Typography variant="body2">
                {likes} {likes === 1 ? ' like' : ' likes'}
              </Typography>
              <Typography sx={{ cursor: 'pointer' }} variant="body2" onClick={handleUpvote}>
                {isUpvoted ? (
                  <ThumbUpIcon sx={{ color: (theme) => theme.palette.primary.dark }} />
                ) : (
                  <ThumbUpOutlinedIcon sx={{ color: (theme) => theme.palette.primary.dark }} />
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
