import { Link, Stack, Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const SpotifyPlaylistLinkButton = ({company}) => {
  const { t } = useTranslation();
  const playlistId = company?.spotify_playlist_data?.id;
  const spotifyUrl = `https://open.spotify.com/playlist/${playlistId}`;

  return (
    <Link
      href={spotifyUrl}
      underline="none"
      target="_blank"
      rel="noopener noreferrer"
      sx={{
        display: 'inline-block',
        color: 'text.primary',
        textDecoration: 'none',
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'translateY(-1px)',
        },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={1.5}
        sx={{
          px: 2,
          py: 1,
          border: 1,
          borderColor: 'text.primary',
          borderRadius: 2,
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: 'primary.main',
            color: 'primary.main'
          },
        }}
      >
        <Box
          component="img"
          src="/images/spotify-logo.png"
          alt="Logo Spotify"
          sx={{ width: 24, height: 24 }}
        />
        <Typography
          variant="body1"
          sx={{
            fontWeight: 500,
            textAlign: 'center',
          }}
        >
          {t('user.requested_songs.playlist_btn')}
        </Typography>
      </Stack>
    </Link>
  );
}
export default SpotifyPlaylistLinkButton
