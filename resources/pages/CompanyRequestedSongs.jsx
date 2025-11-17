import { useEffect, useState } from 'react';
import { Alert, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import LinkButton from '../components/Button/LinkButton';
import ModalWindow from '../components/Layout/ModalWindow';
import CompanyPlaylistCard from '../components/Playlist/CompanyPlaylistCard';
import { useGetRequestedSongs } from '../hooks/useGetRequestedSongs';
import { actions, useDeleteOrBlacklistAll } from '../hooks/useDeleteOrBlacklistAll';
import { useStore } from '../js/useStore';
import { useTranslation } from 'react-i18next';

const CompanyRequestedSongs = () => {
  const { t } = useTranslation();
  const { user } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const { getSongs} = useGetRequestedSongs();
  const [requestedSongs, setRequestedSongs] = useState([])
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalHeader, setModalHeader] = useState('');
  const [action, setAction] = useState('');
  const [actionHandler, setActionHandler] = useState('');
  const [songClicked, setSongClicked] = useState('');

  const handleDeleteOrBlacklist = (id) => {
    setRequestedSongs((prevSongs) => prevSongs.filter((song) => song.id !== id));
  };

  
  // Check the functionality
    const deleteAllSongs = useDeleteOrBlacklistAll({
      action: actions.destroyAllRequestedSongs
    })

    // const blacklistAllSongs = useDeleteOrBlacklistAll({
    //   action: actions.storeAllInBlacklist
    // })

  const handleAllSongsDeleteClick = () => {
    setOpen(true);
    setModalHeader('Attention!');
    setModalMessage('Voulez-vous supprimer toutes les chansons?');
    setAction('supprimer');
    setSongClicked('');
    setActionHandler(() => handleAllSongsDelete);
  };

  const handleAllSongsBlacklistClick = () => {
    setOpen(true);
    setModalHeader('Attention!');
    setModalMessage('Voulez-vous blacklister toutes les chansons?');
    setAction('blacklister');
    setSongClicked('');
    setActionHandler(() => handleAllSongsBlacklist);
  };

  const handleAllSongsBlacklist = () => {
    const { deleteOrBlacklistAll } = useDeleteOrBlacklistAll({
      action: actions.storeAllInBlacklist,
      setOpen,
      setSongs: setRequestedSongs,
    });

    deleteOrBlacklistAll();
  };

  // const handleAllSongsDelete = () => {
  //   const { deleteOrBlacklistAll } = useDeleteOrBlacklistAll({
  //     action: actions.destroyAllRequestedSongs,
  //     setOpen,
  //     setSongs: setRequestedSongs,
  //   });

  //   deleteOrBlacklistAll();
  // };

  const handleAllSongsDelete = async () => {
    const response = await deleteAllSongs.deleteOrBlacklistAll()

    if (response.status) {
      setOpen(false); 
      setRequestedSongs([]);
    }

    // const { deleteOrBlacklistAll } = useDeleteOrBlacklistAll({
    //   action: actions.destroyAllRequestedSongs,
    //   setOpen,
    //   setSongs: setRequestedSongs,
    // });

    // deleteOrBlacklistAll();
  };

  const getRequestedSongs = async () => {
    setIsLoading(true);

    const result = await getSongs();

    if (result?.error) {
      setIsLoading(false);
      return setServerErrorMessage(result.message || t("errors.unknown_error"));
    }

    setRequestedSongs(result.data);
    setServerErrorMessage("");
    setIsLoading(false);
  };

  useEffect(() => {
    getRequestedSongs();
  }, []);

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
      ) : ( 
        serverErrorMessage ? (
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
        )
      )
    }
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
