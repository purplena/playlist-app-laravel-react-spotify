import { useEffect, useState } from 'react';
import { generatePath } from 'react-router-dom';
import { Alert, Grid, Stack, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import LinkButton from '../components/Button/LinkButton';
import LineComponent from '../components/Layout/LineComponent';
import ModalWindow from '../components/Layout/ModalWindow';
import PlaylistCard from '../components/Playlist/PlaylistCard';
import { useGetRequestedSongs } from '../hooks/useGetRequestedSongs';
import { useStore } from '../js/useStore';
import { useTranslation } from 'react-i18next';
import SpotifyPlaylistLinkButton from '../components/Button/SpotifyPlaylistLinkButton';
import { optimisticReorder } from '../helpers/optimisticReorder';

const RequestedSongs = () => {
  const { t } = useTranslation();
  const { user, company } = useStore();
  const [serverErrorMessage, setServerErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [requestedSongs, setRequestedSongs] = useState([])
  const { getSongs} = useGetRequestedSongs();
  const [open, setOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalHeader, setModalHeader] = useState('');
  const [modalRedirect, setModalRedirect] = useState('');  


const silentRefreshRequestedSongs = async () => {
  const result = await getSongs();

  if (result?.error) return; 

  setRequestedSongs((prevSongs) => {
    const isSame =
      JSON.stringify(prevSongs) === JSON.stringify(result.data);

    return isSame ? prevSongs : result.data;
  });
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
      <Stack mb={2}>
        <Typography variant="h1" component="h1" textAlign="center" mb={2}>
          {t('user.requested_songs.h1')}
        </Typography>
        <Stack spacing={2} justifyContent={'center'} alignItems={'center'}>
          <Typography variant="body1" component="p" textAlign="center">
            {t('user.requested_songs.p1')}
          </Typography>
          {company.spotify_playlist_data && (
              <>
                <Typography variant="body1" component="p" textAlign="center">
                  {t('user.requested_songs.check_out_spotify')}
                </Typography>
                <SpotifyPlaylistLinkButton company={company} />
              </>
          )}
        </Stack>
      </Stack>

      <LineComponent />

      <Stack direction="row" spacing={2} justifyContent="center" alignItems="center" mt={4} mb={4}>
        <Typography variant="subtitle2" textAlign={'center'}>
          {t('user.requested_songs.suggest_song')}
        </Typography>
        <LinkButton
          disableElevation
          size="small"
          to={generatePath(`/${company.slug}/songs/search`)}
        >
          {t('buttons.btn_suggest_song')}
        </LinkButton>
      </Stack>

      <LineComponent />

      <Grid
        container
        mt={4}
        justifyContent="center"
        alignItems="center"
        columnSpacing={{ xs: 1, sm: 2 }}
        rowSpacing={1}
      >
        {isLoading ? (
          <Stack justifyContent="center" alignItems="center" mt={4}>
            <CircularProgress />
          </Stack>
        ) : (
            serverErrorMessage ? (
              <Alert variant="outlined" severity="error">
                {serverErrorMessage}
              </Alert>
            ) : (
              requestedSongs.length > 0 ? (
                requestedSongs.map((requestedSong, index) => {
                  return (
                    <PlaylistCard
                      key={requestedSong.id}
                      requestedSong={requestedSong}
                      index={index}
                      setOpen={setOpen}
                      setModalMessage={setModalMessage}
                      setModalHeader={setModalHeader}
                      setModalRedirect={setModalRedirect}
                      onUpvoteOptimistic={optimisticReorder}
                      onUpvoteRefetch={silentRefreshRequestedSongs}
                      setRequestedSongs={setRequestedSongs}
                    />
                  );
              })
                ) : (
                  <Typography variant="subtitle2" textAlign={'center'}>
                     {t('user.requested_songs.no_songs')}
                  </Typography>
                )
          )
      )}
      </Grid>
      {user && (
        <ModalWindow
          open={open}
          setOpen={setOpen}
          modalMessage={modalMessage}
          modalHeader={modalHeader}
          modalRedirect={modalRedirect}
          user={user}
        />
      )}
    </>
  );
};

export default RequestedSongs;
