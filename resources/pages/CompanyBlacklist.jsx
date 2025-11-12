import { useEffect, useState } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import axios from 'axios';
import LinkButton from '../components/Button/LinkButton';
import ModalWindow from '../components/Layout/ModalWindow';
import ManagerBlacklistCard from '../components/Playlist/ManagerBlacklistCard';
import { actions, useDeleteOrBlacklistAll } from '../hooks/userDeleteOrBlacklistAll';
import { apiUrl } from '../js/App';
import { useStore } from '../js/useStore';

const CompanyBlacklist = () => {
  const { user } = useStore();
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

  const getBlacklistedSongs = () => {
    axios
      .get(`${apiUrl}/manager/blacklist`)
      .then((response) => {
        setBlacklistedSongs(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    setBlacklistedSongs((prevSongs) => prevSongs.filter((song) => song.blacklist_id !== id));
  };

  const handleAllSongsDeleteClick = () => {
    setOpen(true);
    setModalHeader('Attention!');
    setModalMessage(
      'Voulez-vous supprimer toutes les chansons de votre blacklist ? Après cette action, les utilisateurs pourront les ajouter à nouveau dans votre playlist.',
    );
    setAction('supprimer de blacklist');
    setSongClicked('');
    setActionHandler(() => handleAllSongsDelete);
  };

  const handleAllSongsDelete = () => {
    const { deleteOrBlacklistAll } = useDeleteOrBlacklistAll({
      action: actions.destroyAllBlacklist,
      setOpen,
      setSongs: setBlacklistedSongs,
    });

    deleteOrBlacklistAll();
  };

  return (
    <>
      <Stack justifyContent="center" alignItems="center" mt={2} spacing={4}>
        <Typography variant="h4" component="h1">
          {'Blacklist'}
        </Typography>
        <Typography vatiant="body2" component="p" mt={4} maxWidth={500} textAlign="justify">
          {
            "Les chansons ajoutées au blacklist sont celles qui peuvent potentiellement perturber l'atmosphère positive que vous cherchez à promouvoir au sein de votre entreprise. Cela inclut des critères tels que des paroles explicites, des messages offensants, ou tout contenu susceptible de créer une ambiance inappropriée."
          }
        </Typography>
        <Typography vatiant="body2" component="p" mt={4} maxWidth={500} textAlign="justify">
          {
            "En ajoutant des chansons à votre blacklist, vous maintenez une culture d'entreprise respectueuse et inclusive, où chacun se sent à l'aise et valorisé."
          }
        </Typography>
      </Stack>
      {blacklistedSongs.length > 0 ? (
        <Stack justifyContent="center" alignItems="center" mt={2}>
          <LinkButton disableElevation onClick={handleAllSongsDeleteClick}>
            supprimer tout de blacklist
          </LinkButton>
        </Stack>
      ) : (
        ''
      )}
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
            {"Vous n'avez pas de chansons dans votre blacklist..."}
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
export default CompanyBlacklist;
