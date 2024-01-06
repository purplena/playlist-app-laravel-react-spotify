import React, { useState } from 'react';
import Link from '@mui/material/Link';
import { useUserStore } from '../js/useUserStore';
import { HuePicker } from 'react-color';

const CompanyHome = () => {
  const { user } = useUserStore();
  const hasRefreshToken =
    user.company?.spotify_playlist_data?.has_refresh_token;
  const [state, setState] = useState({
    background: 'rgb(25,118,210,1)',
    color: '',
  });

  const changeHandler = (colors) => {
    const col =
      'rgb(' +
      colors.rgb.r +
      ',' +
      colors.rgb.g +
      ',' +
      colors.rgb.b +
      ',' +
      colors.rgb.a +
      ')';
    setState({ background: col, color: colors.rgb });
    console.log(col);
  };

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
          <HuePicker
            className="picker"
            color={state.color}
            onChange={changeHandler}
          />
          <div style={{ backgroundColor: state.background }}>
            <h1>React-Color Library</h1>
          </div>
        </>
      ) : (
        <Link href="/spotify/redirect">Connecter à Spotify</Link>
      )}
    </>
  );
};
export default CompanyHome;
