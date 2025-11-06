import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Grid, Stack, Typography } from '@mui/material';
import LineComponent from './LineComponent';

const Footer = ({ company }) => {
  return (
    <Stack mt={5} alignItems={'center'} justifyContent={'center'}>
      <Stack maxWidth={500} width={'100%'} spacing={2} padding={2}>
        <LineComponent />
        <Typography variant="h6" component="h3">
          {"N'hésitez pas à nous contacter"}
        </Typography>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle" component="p" fontWeight={'800'}>
              Adresse:
            </Typography>
            <Typography variant="subtitle" component="p">
              {company.zip} {company.city}
            </Typography>
            <Typography variant="subtitle" component="p">
              {company.address}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle" component="p" fontWeight={'800'}>
              Contact:
            </Typography>
            <Typography variant="subtitle" component="p">
              {company.tel}
            </Typography>
            <Typography variant="subtitle" component="p" sx={{ textDecoration: 'underline' }}>
              example@wallacepub.fr
            </Typography>
          </Grid>
        </Grid>
        <Stack direction={'row'} spacing={3} justifyContent={'center'} alignItems={'center'}>
          <InstagramIcon
            sx={{
              color: (theme) => theme.palette.primary.dark,
              fontSize: '40px',
              cursor: 'pointer',
            }}
          />
          <FacebookIcon
            sx={{
              color: (theme) => theme.palette.primary.dark,
              fontSize: '40px',
              cursor: 'pointer',
            }}
          />
        </Stack>
        <Stack direction={'row'} spacing={2} justifyContent={'center'}>
          <Typography sx={{ color: '#AAA7A7', textDecoration: 'underline' }}>
            Spotify Developer Terms
          </Typography>
          <Typography sx={{ color: '#AAA7A7', textDecoration: 'underline' }}>
            Mentions legales
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default Footer;
