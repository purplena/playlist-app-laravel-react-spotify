import React, { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import { Box, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import LinkButton from '../components/Button/LinkButton';
import { generatePath } from 'react-router-dom';
import StackComponentForGrid from '../components/Layout/StackComponentForGrid';
import { useUserStore } from '../js/useUserStore';

const CompanyHome = () => {
  const { user } = useUserStore();
  const spotifyPlaylistIdd = user.company?.spotify_playlist_data?.id;
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
            {loading ? (
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
                  {loading ? (
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
                {spotifyPlaylistIdd ? (
                  <>
                    <Stack spacing={1}>
                      <Typography
                        variant="body1"
                        component="p"
                        fontWeight={600}
                      >
                        {'Vous êtes connecté(e) à Spotify'}
                      </Typography>
                      <Typography
                        variant="body1"
                        component="p"
                        fontSize={'0.75rem'}
                        fontStyle={'italic'}
                      >
                        {
                          'La synchronisation de votre playlist est automatique. Tous les jours à 00:00:00 les chansons les plus votées sont ajoutées à votre playlist Spotify. Cependant vous pouvez toujours ajouter des chansons directement sur Spotify.'
                        }
                      </Typography>
                      <iframe
                        src={`https://open.spotify.com/embed/playlist/${spotifyPlaylistIdd}?utm_source=generator`}
                        width="100%"
                        height="152"
                        frameBorder="0"
                        allowfullscreen=""
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                      ></iframe>
                    </Stack>

                    <Stack>
                      <Typography variant="body1" component="p">
                        {"Gerez vos chansons d'aujourd'hui"}
                      </Typography>
                      <LinkButton to={generatePath('/manager/songs')}>
                        {'Chansons'}
                      </LinkButton>
                    </Stack>
                    <Stack>
                      <Typography variant="body1" component="p">
                        {'Gerez votre blacklist'}
                      </Typography>
                      <LinkButton
                        to={generatePath('/manager/blacklist')}
                        sx={{
                          backgroundColor: (theme) =>
                            theme.palette.primary.main,
                        }}
                      >
                        {'Blacklist'}
                      </LinkButton>
                    </Stack>
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
                        {
                          'Pour commencer cette aventure inoubliable connectez-vous à Spotify!'
                        }
                      </Typography>
                    </Stack>

                    <Link
                      href="/spotify/redirect"
                      sx={{
                        backgroundColor: (theme) => theme.palette.primary.main,
                        color: (theme) => theme.palette.text.secondary,
                        textDecoration: 'none',
                        fontWeight: '500',
                        fontSize: '0.875rem',
                        lineHeight: '1.75',
                        textTransform: 'uppercase',
                        minWidth: '64px',
                        padding: '6px 16px',
                        borderRadius: '4px',
                        textAlign: 'center',
                        '&:hover': {
                          backgroundColor: (theme) =>
                            theme.palette.primary.dark,
                          color: '#ffffff',
                          textDecoration: 'none',
                        },
                      }}
                    >
                      Connecter à Spotify
                    </Link>
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
                <LinkButton to={generatePath('/manager/carte')}>
                  Gerer la carte
                </LinkButton>
              </StackComponentForGrid>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
    </>
  );
};
export default CompanyHome;
