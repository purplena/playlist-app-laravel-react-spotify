import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import LinkButton from '../components/Button/LinkButton';
import ModalWindow from '../components/Layout/ModalWindow';
import ManagerBlacklistCard from '../components/Playlist/ManagerBlacklistCard';
import { actions, useDeleteOrBlacklistAll } from '../hooks/useDeleteOrBlacklistAll';
import { useGetBlacklistedSongs } from '../hooks/useGetBlacklistedSongs';
import { useStore } from '../js/useStore';

const CompanyBlacklist = () => {
  const { t } = useTranslation();
  const { user } = useStore();
  const { getBlacklistedSongsByCompany } = useGetBlacklistedSongs();
  const [isLoading, setIsLoading] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [blacklistedSongs, setBlacklistedSongs] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalHeader, setModalHeader] = useState('');
  const [action, setAction] = useState('');
  const [actionHandler, setActionHandler] = useState('');
  const [songClicked, setSongClicked] = useState('');

  useEffect(() => {
    getBlacklistedSongs();
  }, []);

  const getBlacklistedSongs = async () => {
    setIsLoading(true);

    const result = await getBlacklistedSongsByCompany();

    if (result?.error) {
      setIsLoading(false);
      return setServerErrorMessage(result.message || t('errors.unknown_error'));
    }

    setBlacklistedSongs(result.data);
    setServerErrorMessage('');
    setIsLoading(false);
  };

  const handleDelete = (id) => {
    setBlacklistedSongs((prevSongs) => prevSongs.filter((song) => song.blacklist_id !== id));
  };

  const handleAllSongsDeleteClick = () => {
    setOpen(true);
    setModalHeader(t('modal.attention'));
    setModalMessage(t('modal.q_delete_blacklist_song_all'));
    setAction('supprimer de blacklist');
    setSongClicked('');
    setActionHandler(() => handleAllSongsDelete);
  };

  const handleAllSongsDelete = async () => {
    const { deleteOrBlacklistAll } = useDeleteOrBlacklistAll({
      action: actions.destroyAllBlacklist,
    });

    const response = await deleteOrBlacklistAll();

    if (response.status) {
      setOpen(false);
      setBlacklistedSongs([]);
    }
  };

  return (
    <>
      <Stack justifyContent="center" alignItems="center" mt={2} spacing={4}>
        <Typography variant="h4" component="h1">
          {t('company.blacklist.h1')}
        </Typography>
        <Typography vatiant="body2" component="p" mt={4} maxWidth={500} textAlign="justify">
          {t('company.blacklist.p_warning_1')}
        </Typography>
        <Typography vatiant="body2" component="p" mt={4} maxWidth={500} textAlign="justify">
          {t('company.blacklist.p_warning_2')}
        </Typography>
      </Stack>
      {blacklistedSongs.length > 0 ? (
        <Stack justifyContent="center" alignItems="center" mt={2}>
          <LinkButton disableElevation onClick={handleAllSongsDeleteClick}>
            {t('buttons.btn_delete_all_from_blacklist')}
          </LinkButton>
        </Stack>
      ) : (
        ''
      )}
      {isLoading ? (
        <Stack justifyContent="center" alignItems="center" mt={4}>
          <CircularProgress />
        </Stack>
      ) : serverErrorMessage ? (
        <Stack justifyContent="center" alignItems="center" mt={4}>
          <Alert variant="outlined" severity="error">
            {serverErrorMessage}
          </Alert>
        </Stack>
      ) : (
        <Grid container gap={3} mt={6} justifyContent="center">
          {blacklistedSongs.length > 0 ? (
            blacklistedSongs.map((blacklistedSong, index) => {
              return (
                <ManagerBlacklistCard
                  key={blacklistedSong.id}
                  title={blacklistedSong.song_data.song_name}
                  artist={blacklistedSong.song_data.artist_name}
                  index={index}
                  blacklistedSong={blacklistedSong}
                  onClick={handleDelete}
                  setOpen={setOpen}
                  setModalMessage={setModalMessage}
                  setModalHeader={setModalHeader}
                  setAction={setAction}
                  setActionHandler={setActionHandler}
                  setSongClicked={setSongClicked}
                />
              );
            })
          ) : (
            <Typography variant="h6" textAlign={'center'} mt={21}>
              {t('company.blacklist.no_blacklisted_songs')}
            </Typography>
          )}
        </Grid>
      )}
      <ModalWindow
        open={open}
        setOpen={setOpen}
        modalMessage={modalMessage}
        modalHeader={modalHeader}
        user={user}
        action={action}
        actionHandler={actionHandler}
        songClicked={songClicked}
      />
    </>
  );
};
export default CompanyBlacklist;
