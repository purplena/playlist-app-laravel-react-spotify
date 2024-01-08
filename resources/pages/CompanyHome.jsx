import React, { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import { useMe } from '../hooks/useMe';

const CompanyHome = () => {
  const { user, isLoading } = useMe();
  const hasRefreshToken =
    user.company?.spotify_playlist_data?.has_refresh_token;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (user && user.company) {
      setLoading(false);
    }
  }, [user]);

  return (
    <>
      <h1>Home</h1>
      {hasRefreshToken ? (
        <>
          <div>Vous êtes déjà connecté(e) à Spotify</div>
          {/* <iframe
            // sx={{borderRadius="12px"}}
            src="https://open.spotify.com/embed/playlist/0aOhQdv6lINuFcppcDL736?utm_source=generator"
            width="100%"
            height="152"
            frameBorder="0"
            allowfullscreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe> */}
        </>
      ) : (
        <>
          <Link href="/spotify/redirect">Connecter à Spotify</Link>
          {isLoading || loading ? (
            'image is loading'
          ) : (
            <>
              <img src={user?.company?.logo} />

              <a href={`/api/manager/qr-code`} download>
                Download QR Code
              </a>
            </>
          )}
        </>
      )}
    </>
  );
};
export default CompanyHome;
