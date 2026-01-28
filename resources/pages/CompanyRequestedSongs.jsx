import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import LinkButton from '../components/Button/LinkButton';
import ModalWindow from '../components/Layout/ModalWindow';
import CompanyPlaylistCard from '../components/Playlist/CompanyPlaylistCard';
import { actions, useDeleteOrBlacklistAll } from '../hooks/useDeleteOrBlacklistAll';
import { useGetRequestedSongs } from '../hooks/useGetRequestedSongs';
import { useStore } from '../js/useStore';

const CompanyRequestedSongs = () => {
  const { t } = useTranslation();
  const { user } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const { getSongs } = useGetRequestedSongs();
  const [requestedSongs, setRequestedSongs] = useState([]);
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const [open, setOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalHeader, setModalHeader] = useState('');
  const [action, setAction] = useState('');
  const [actionHandler, setActionHandler] = useState('');
  const [songClicked, setSongClicked] = useState('');

  useEffect(() => {
    getRequestedSongs();
  }, []);

  const handleDeleteOrBlacklist = (id) => {
    setRequestedSongs((prevSongs) => prevSongs.filter((song) => song.id !== id));
  };

  const deleteAllSongs = useDeleteOrBlacklistAll({
    action: actions.destroyAllRequestedSongs,
  });

  const blacklistAllSongs = useDeleteOrBlacklistAll({
    action: actions.storeAllInBlacklist,
  });

  const executeAction = async (actionFn) => {
    const response = await actionFn();
    if (response.status) {
      setOpen(false);
      setRequestedSongs([]);
    }
  };

  const handleAllSongsDeleteClick = () => {
    setOpen(true);
    setModalHeader(t('modal.attention'));
    setModalMessage(t('modal.q_delete_song_all'));
    setAction('supprimer');
    setSongClicked('');
    setActionHandler(() => handleAllSongsDelete);
  };

  const handleAllSongsDelete = () => {
    executeAction(deleteAllSongs.deleteOrBlacklistAll);
  };

  const handleAllSongsBlacklistClick = () => {
    setOpen(true);
    setModalHeader(t('modal.attention'));
    setModalMessage(t('modal.q_blacklist_song_all'));
    setAction('blacklister');
    setSongClicked('');
    setActionHandler(() => handleAllSongsBlacklist);
  };

  const handleAllSongsBlacklist = () => {
    executeAction(blacklistAllSongs.deleteOrBlacklistAll);
  };

  const getRequestedSongs = async () => {
    setIsLoading(true);

    const result = await getSongs();

    if (result?.error) {
      setIsLoading(false);
      return setServerErrorMessage(result.message || t('errors.unknown_error'));
    }

    setRequestedSongs(result.data);
    setServerErrorMessage('');
    setIsLoading(false);
  };

  return (
    <>
      <Typography variant="h4" component="h1" textAlign="center">
        {"Chansons sugérrées aujourd'hui"}
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" mt={4}>
        <LinkButton disableElevation size="small" onClick={handleAllSongsDeleteClick}>
          supprimer tout
        </LinkButton>
        <LinkButton disableElevation size="small" onClick={handleAllSongsBlacklistClick}>
          blacklister tout
        </LinkButton>
      </Stack>
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
        <Grid
          container
          mt={6}
          justifyContent="center"
          columnSpacing={{ xs: 1, sm: 2 }}
          rowSpacing={1}
        >
          {requestedSongs.length > 0 ? (
            requestedSongs.map((requestedSong, index) => {
              return (
                <CompanyPlaylistCard
                  key={requestedSong.id}
                  requestedSong={requestedSong}
                  index={index}
                  onClick={handleDeleteOrBlacklist}
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
            <Typography variant="subtitle2" textAlign={'center'} mt={21}>
              {t('user.requested_songs.no_songs')}
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
export default CompanyRequestedSongs;
