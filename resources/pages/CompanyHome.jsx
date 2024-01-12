import React, { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import { useMe } from '../hooks/useMe';
import { Box, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import LinkButton from '../components/Button/LinkButton';
import { generatePath } from 'react-router-dom';
import StackComponentForGrid from '../components/Layout/StackComponentForGrid';

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

  const handleDownload = (event) => {
    event.preventDefault();
    const link = document.createElement('a');
    link.href = '/api/manager/qr-code';
    link.download = true;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        mt={6}
        mb={10}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={4}
          maxWidth={'1080px'}
        >
          <Stack spacing={2} justifyContent="center" alignItems="center">
            <Typography variant="h3" component="h1" textAlign="center">
              Bienvenue dans votre espace personnel
            </Typography>
            {isLoading || loading ? (
              <CircularProgress />
            ) : (
              <Box
                component="img"
                sx={{
                  width: 150,
                  maxWidth: { xs: 100, md: 150 },
                }}
                alt="Company Logo"
                src={'/storage/' + user?.company?.logo}
              />
            )}
          </Stack>
          <Grid
            container
            spacing={2}
            sx={() => ({
              '@media (max-width: 898px)': {
                alignItems: 'center',
                justifyContent: 'center',
              },
            })}
          >
            <Grid item xs={12} sm={8} md={4}>
              <Typography variant="h5" component="h2" textAlign="center">
                ENTREPRISE
              </Typography>
              <StackComponentForGrid>
                <Stack spacing={2}>
                  <Typography variant="body1" component="p">
                    Voulez-vous mettre à jour vos informations de contact?
                  </Typography>
                  <Typography variant="body1" component="p">
                    Voulez-vous changer votre logo?
                  </Typography>
                  <LinkButton to={generatePath('/manager/entreprise')}>
                    {"Gerer l'entreprise"}
                  </LinkButton>
                </Stack>
                <Stack spacing={2}>
                  <Stack>
                    <Typography variant="body1" component="p">
                      Téléchargez et imprimez votre QR-code!
                    </Typography>
                    <Typography variant="body1" component="p" fontSize={'12px'}>
                      En scannant le QR Code, vos clients accèdent à vos
                      contenus en temps réel
                    </Typography>
                  </Stack>
                  {isLoading || loading ? (
                    <CircularProgress />
                  ) : (
                    <Box
                      justifySelf={'center'}
                      alignSelf={'center'}
                      component="img"
                      sx={{
                        width: 70,
                        maxWidth: { xs: 50, md: 70 },
                      }}
                      alt="Company Logo"
                      src={'/storage/' + user?.company?.qr_code}
                    />
                  )}
                  <LinkButton onClick={handleDownload}>
                    Télécharger QR-code
                  </LinkButton>
                </Stack>
              </StackComponentForGrid>
            </Grid>
            <Grid item xs={12} sm={8} md={4}>
              <Typography variant="h5" component="h2" textAlign="center">
                MUSIQUE
              </Typography>
              <StackComponentForGrid>
                {hasRefreshToken ? (
                  <>
                    <Typography variant="body1" component="p">
                      {'Vous êtes connecté(e) à Spotify'}
                    </Typography>
                  </>
                ) : (
                  <>
                    <Stack spacing={2}>
                      <Typography variant="body1" component="p">
                        {
                          "La musique joue un rôle crucial dans la définition de l'identité du lieu."
                        }
                      </Typography>
                      <Typography variant="body1" component="p">
                        {
                          'Dès maintenant, vos clients peuvent participer à la création de la playlist de votre établissement.'
                        }
                      </Typography>

                      <Typography variant="body1" component="p">
                        {'Vous êtes connecté(e) à Spotify'}
                      </Typography>

                      <Typography variant="body1" component="p">
                        {
                          'Pour commencer cette aventure inoubliable connectez-vous à Spotify!'
                        }
                      </Typography>
                    </Stack>

                    <LinkButton to="/spotify/redirect">
                      Connecter à Spotify
                    </LinkButton>
                  </>
                )}
              </StackComponentForGrid>
            </Grid>
            <Grid item xs={12} sm={8} md={4}>
              <Typography variant="h5" component="h2" textAlign="center">
                CARTE
              </Typography>
              <StackComponentForGrid>
                <Stack spacing={2}>
                  <Typography variant="body1" component="p">
                    En créant votre carte en ligne, vous pouvez
                    significativement simplifier le processus de choix et
                    améliorer la satisfaction globale de vos clients.
                  </Typography>
                  <Typography variant="body1" component="p">
                    Suivez des instructions simples pour créer et mettre à jour
                    la carte de votre établissement !
                  </Typography>
                </Stack>
                <LinkButton>Gerer la carte</LinkButton>
              </StackComponentForGrid>
            </Grid>
          </Grid>
        </Stack>
      </Stack>

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
        </>
      )}
    </>
  );
};
export default CompanyHome;
