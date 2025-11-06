import React from 'react';
import EastIcon from '@mui/icons-material/East';
import LanguageIcon from '@mui/icons-material/Language';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import { Box, Stack, Typography } from '@mui/material';
import LineComponent from '../components/Layout/LineComponent';

const LandingPage = () => {
  const texts = [
    'proposer votre musique préférée ?',
    'liker vos chansons préférées ?',
    'consulter la carte ?',
  ];

  return (
    <Stack alignItems={'center'} justifyContent={'center'}>
      <Stack
        sx={{
          maxWidth: 500,
          width: '100%',
        }}
      >
        <Box
          component="img"
          sx={{
            height: '40vh',
            objectFit: 'cover',
          }}
          src="./images/hero-disk-image.jpg"
          alt="Photo of vinyle disk"
        />
        <Stack paddingLeft={2} paddingRight={2}>
          <LineComponent />
          <Stack spacing={5} mt={5}>
            <Typography variant="h2" component="h1">
              Êtes-vous prêt à
            </Typography>
            <Stack direction="column" spacing={1} textAlign={'right'}>
              {texts.map((text) => {
                return (
                  <Typography key={text} variant="body1" component="p">
                    {text}
                  </Typography>
                );
              })}
            </Stack>

            <LineComponent />

            <Stack
              spacing={4}
              mt={5}
              paddingLeft={2}
              paddingRight={2}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Typography variant="h5" component="h2">
                Scannez un QR-code !
              </Typography>
              <Stack direction={'row'} spacing={1} justifyContent={'center'} alignItems={'center'}>
                <SmartphoneIcon sx={{ fontSize: '48px' }} />
                <EastIcon sx={{ fontSize: '48px' }} />
                <QrCode2Icon sx={{ fontSize: '48px' }} />
              </Stack>
              <Typography variant="h5" component="h2">
                {"And let's the party started !"}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          spacing={2}
          sx={{
            padding: '2rem',
            backgroundColor: (theme) => theme.palette.primary.main,
            marginTop: '3rem',
          }}
        >
          <Typography variant="h6" component="h3">
            {"Integrez l'application chez vous !"}
          </Typography>
          <Typography variant="body1" component="p">
            {'Contactez notre equipe'}
          </Typography>
          <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <LanguageIcon sx={{ color: (theme) => theme.palette.text.primary }} />
            <Typography variant="body1" component="p" color="textPrimary">
              https://here.actual.site.web.fr
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default LandingPage;
