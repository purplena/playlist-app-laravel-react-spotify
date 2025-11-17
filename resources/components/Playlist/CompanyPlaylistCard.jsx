import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import { actions, useDeleteOrBlacklistOne } from '../../hooks/useDeleteOrBlacklistOne';
import LinkButton from '../Button/LinkButton';
import SongTrancatedComponent from './SongTrancatedComponent';

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
  const likes = requestedSong.upvotes_count;
  const deleteSong = useDeleteOrBlacklistOne({
    action: actions.destroyRequestedSong,
    itemId: requestedSong.id,
  });

  const blacklistSong = useDeleteOrBlacklistOne({
    action: actions.storeBlacklist,
    itemId: requestedSong.id,
  });

  const executeAction = async (actionFn) => {
    const response = await actionFn();
    if (response.status) {
      setOpen(false);
      onClick(requestedSong.id);
    }
  };

  const handleSongDelete = () =>
    executeAction(deleteSong.deleteOrBlacklist);

  const handleSongDeleteClick = () => {
    setOpen(true);
    setModalHeader('Attention!');
    setModalMessage('Voulez-vous supprimer cette chanson?');
    setSongClicked(requestedSong.song.song_data.song_name);
    setAction('supprimer');
    setActionHandler(() => handleSongDelete);
  };

  const handleSongBlacklisting = () =>
    executeAction(blacklistSong.deleteOrBlacklist);

  const handleSongBlacklistingClick = () => {
    setOpen(true);
    setModalHeader('Attention!');
    setModalMessage('Voulez-vous blacklister cette chanson?');
    setSongClicked(requestedSong.song.song_data.song_name);
    setAction('blacklister');
    setActionHandler(() => handleSongBlacklisting);
  };

  return (
    <Grid item xxs={12} xs={10} sm={8} md={6} lg={4}>
      <Paper>
        <Stack padding={3} spacing={2}>
          <Stack spacing={1} direction={'row'} pt={'3px'}>
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
                maxNameLength='16'
                fontSize={'14px'}
              />
              <SongTrancatedComponent
                song={requestedSong.song.song_data.artist_name}
                label={'Artiste'}
                maxNameLength='16'
                fontSize={'14px'}
              />
            </Stack>
          </Stack>

          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Typography gutterBottom variant="h6" component="p" mb={0} fontWeight={800}>
              #{index + 1}
            </Typography>

            <Stack direction="row" spacing={2} alignItems="center">  
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
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </Grid>
  );
};
export default PlaylistCard;
