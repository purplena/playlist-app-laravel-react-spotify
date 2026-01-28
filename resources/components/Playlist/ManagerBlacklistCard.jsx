import { useTranslation } from 'react-i18next';
import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import { actions, useDeleteOrBlacklistOne } from '../../hooks/useDeleteOrBlacklistOne';
import LinkButton from '../Button/LinkButton';

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
  const { t } = useTranslation();
  const handleSongDeleteClick = () => {
    setOpen(true);
    setModalHeader(t('modal.attention'));
    setModalMessage(t('modal.q_delete_blackliste_song'));
    setSongClicked(blacklistedSong.song_data.song_name);
    setAction('supprimer de blacklist');
    setActionHandler(() => handleDeleteSongFromBlacklist);
  };

  const handleDeleteSongFromBlacklist = async () => {
    const { deleteOrBlacklist } = useDeleteOrBlacklistOne({
      action: actions.destroyBlacklist,
      itemId: blacklistedSong.blacklist_id,
    });

    const response = await deleteOrBlacklist();

    if (response.status) {
      setOpen(false);
      onClick(blacklistedSong.blacklist_id);
    }
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
                {t('buttons.btn_delete')}
              </LinkButton>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default ManagerBlacklistCard;
