import { Box, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import StackComponentForGrid from '../components/Layout/StackComponentForGrid';
import LinkButton from '../components/Button/LinkButton';
import { generatePath } from 'react-router-dom';
import { useMe } from '../hooks/useMe';

const CompanyInfo = () => {
  const { user } = useMe();

  return (
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
        spacing={8}
        maxWidth={'1080px'}
      >
        <Stack>
          <Typography variant="h3" component="h1" textAlign="center">
            Votre entreprise
          </Typography>
          <Typography variant="h6" component="p" textAlign="center">
            Gardez à jour vos informations !
          </Typography>
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
              Info générale
            </Typography>
            <StackComponentForGrid>
              <Stack spacing={2}>
                <Typography variant="body1" component="p">
                  {"Nom d'entreprise: "}
                  <Box component="span" fontWeight="700">
                    {user?.company?.name}
                  </Box>
                </Typography>
                <Typography variant="body1" component="p">
                  {'Email: '}
                  <Box component="span" fontWeight="700">
                    {user?.email}
                  </Box>
                </Typography>
                <Typography variant="body1" component="p">
                  {"Nom d'utilisateur: "}
                  <Box component="span" fontWeight="700">
                    {user?.username}
                  </Box>
                </Typography>
              </Stack>
            </StackComponentForGrid>
          </Grid>
          <Grid item xs={12} sm={8} md={4}>
            <Typography variant="h5" component="h2" textAlign="center">
              Contacts
            </Typography>
            <StackComponentForGrid>
              <Stack spacing={2}>
                <Typography variant="body1" component="p">
                  {'Téléphone: '}
                  <Box component="span" fontWeight="700">
                    {user?.company?.tel}
                  </Box>
                </Typography>
                <Typography variant="body1" component="p">
                  {'Pays: '}
                  <Box component="span" fontWeight="700">
                    {user?.company?.country}
                  </Box>
                </Typography>
                <Typography variant="body1" component="p">
                  {'Ville: '}
                  <Box component="span" fontWeight="700">
                    {user?.company?.city}
                  </Box>
                </Typography>
                <Typography variant="body1" component="p">
                  {'Code postal: '}
                  <Box component="span" fontWeight="700">
                    {user?.company?.zip}
                  </Box>
                </Typography>
                <Typography variant="body1" component="p">
                  {'Adresse: '}
                  <Box component="span" fontWeight="700">
                    {user?.company?.address}
                  </Box>
                </Typography>
              </Stack>
            </StackComponentForGrid>
          </Grid>
          <Grid item xs={12} sm={8} md={4}>
            <Typography variant="h5" component="h2" textAlign="center">
              Style
            </Typography>
            <StackComponentForGrid>
              <Stack spacing={2}>
                <Stack
                  direction={'row'}
                  spacing={2}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                >
                  <Typography variant="body1" component="p">
                    {'Couleur principale: '}
                    <Box component="span" fontWeight="700">
                      {user?.company?.background_color}
                    </Box>
                  </Typography>
                  <Box
                    sx={{
                      width: '50px',
                      height: '50px',
                      background: user?.company?.background_color
                        ? user.company.background_color
                        : '#ffffff',
                      border: '1px solid #000',
                      borderRadius: '5px',
                    }}
                  />
                </Stack>

                <Stack
                  direction={'row'}
                  spacing={2}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                >
                  <Typography variant="body1" component="p">
                    {'Couleur de police: '}
                    <Box component="span" fontWeight="700">
                      {user?.company?.font_color}
                    </Box>
                  </Typography>
                  <Box
                    sx={{
                      width: '50px',
                      height: '50px',
                      background: user?.company?.font_color
                        ? user.company.font_color
                        : '#ffffff',
                      border: '1px solid #000',
                      borderRadius: '5px',
                    }}
                  />
                </Stack>
                <Stack
                  direction={'row'}
                  spacing={2}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                >
                  <Typography variant="body1" component="p">
                    Logo
                  </Typography>
                  <Box
                    component="img"
                    sx={{
                      width: 100,
                      maxWidth: { xs: 70, md: 100 },
                    }}
                    alt="Company Logo"
                    src={'/storage/' + user?.company?.logo}
                  />
                </Stack>
              </Stack>
            </StackComponentForGrid>
          </Grid>
        </Grid>
        <LinkButton to={generatePath('/manager/entreprise/modifier')}>
          Modifier
        </LinkButton>
      </Stack>
    </Stack>
  );
};
export default CompanyInfo;
