import React from 'react';
import Link from '@mui/material/Link';
import { apiUrl } from '../js/App';
import { useUserStore } from '../js/useUserStore';

const CompanyHome = () => {
  const { user } = useUserStore();
  const hasRefreshToken =
    user.company?.spotify_playlist_data?.has_refresh_token;

  return (
    <>
      <h1>Home</h1>
      {hasRefreshToken ? (
        'Vous êtes déjà connecté(e) à Spotify '
      ) : (
        <Link href="/spotify/redirect">Connecter à Spotify</Link>
      )}
    </>
  );
};
export default CompanyHome;
