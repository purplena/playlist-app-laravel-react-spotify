import React from 'react';
import { generatePath, useRouteError } from 'react-router-dom';
import { indigo } from '@mui/material/colors';
import { Box, Typography } from '@mui/material';
import LinkButton from '../components/Button/LinkButton';

export default function ErrorPage() {
  const error = useRouteError();
  const primary = indigo[600];
  const btnColor = indigo[900];

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: primary,
        gap: '2rem',
      }}
    >
      <Typography variant="h1" style={{ color: 'white' }}>
        Erreur {error.status}
      </Typography>
      <Typography variant="h6" style={{ color: 'white' }}>
        {"Retourner à la page d'accueil"}
      </Typography>
      <LinkButton sx={{ backgroundColor: btnColor }} to={generatePath('/')}>
        Back Home
      </LinkButton>
    </Box>
  );
}
