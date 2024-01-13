import React from 'react';
import { Alert, Button, Stack, TextField, Typography } from '@mui/material';

const LoginInputs = ({
  handleLogin,
  errors,
  email,
  setEmail,
  password,
  setPassword,
}) => {
  return (
    <>
      <Stack
        direction="column"
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h1" component="h1" textAlign="center">
          Vous avez un mot de passe?
        </Typography>
        <Typography variant="body1" component="p" textAlign="center">
          Continuez avec votre email
        </Typography>
        <Stack
          onSubmit={handleLogin}
          component="form"
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={2}
          noValidate
          autoComplete="off"
          textAlign="center"
        >
          {errors?.loginError && (
            <Alert severity="error">{errors.loginError}</Alert>
          )}

          <TextField
            error={!!errors}
            style={{ width: '250px' }}
            id="email"
            label={errors ? 'Error' : 'Email'}
            variant="standard"
            value={email}
            helperText={errors?.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            error={!!errors}
            style={{ width: '250px' }}
            id="password"
            label={errors ? 'Error' : 'Mot de passe'}
            type="password"
            variant="standard"
            value={password}
            helperText={errors?.password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="outlined"
            sx={{
              backgroundColor: 'transparent',
              '&:hover': {
                backgroundColor: 'transparent',
                color: (theme) => theme.palette.text.primary,
                fontWeight: 600,
              },
            }}
          >
            Se connecter
          </Button>
        </Stack>
      </Stack>
    </>
  );
};
export default LoginInputs;
