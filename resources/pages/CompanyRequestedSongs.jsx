import { useEffect, useState } from 'react';
import { useGetRequestedSongs } from '../hooks/useGetRequestedSongs';
import { CircularProgress, Grid, Stack, Typography } from '@mui/material';
import LinkButton from '../components/Button/LinkButton';
import CompanyPlaylistCard from '../components/Playlist/CompanyPlaylistCard';
import ModalWindow from '../components/Layout/ModalWindow';
import {
  actions,
  useDeleteOrBlacklistAll,
} from '../hooks/userDeleteOrBlacklistAll';
import { useStore } from '../js/useStore';

const CompanyRequestedSongs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { getSongs, requestedSongs, setRequestedSongs } =
    useGetRequestedSongs(setIsLoading);
  const [open, setOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalHeader, setModalHeader] = useState('');
  const { user } = useStore();
  const [action, setAction] = useState('');
  const [actionHandler, setActionHandler] = useState('');
  const [songClicked, setSongClicked] = useState('');

  const handleDeleteOrBlacklist = (id) => {
    setRequestedSongs((prevSongs) =>
      prevSongs.filter((song) => song.id !== id)
    );
  };

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

  const handleAllSongsDelete = () => {
    const { deleteOrBlacklistAll } = useDeleteOrBlacklistAll({
      action: actions.destroyAllRequestedSongs,
      setOpen,
      setSongs: setRequestedSongs,
    });

    deleteOrBlacklistAll();
  };

  useEffect(() => {
    setIsLoading(true);
    getSongs();
  }, []);

  return (
    <>
      <Typography variant="h4" component="h1" textAlign="center">
        {"Chansons sugérrées aujourd'hui"}
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        alignItems="center"
        mt={4}
      >
        <LinkButton
          disableElevation
          size="small"
          onClick={handleAllSongsDeleteClick}
        >
          supprimer tout
        </LinkButton>
        <LinkButton
          disableElevation
          size="small"
          onClick={handleAllSongsBlacklistClick}
        >
          blacklister tout
        </LinkButton>
      </Stack>
      {isLoading && (
        <Stack justifyContent="center" alignItems="center" mt={4}>
          <CircularProgress />
        </Stack>
      )}

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
            {"Oups! Il n'y a pas de chansons suggérées..."}
          </Typography>
        )}
      </Grid>
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
