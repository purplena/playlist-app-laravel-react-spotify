import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Stack, TextField, Typography, Button, Alert } from '@mui/material';
import { generatePath } from 'react-router-dom';
import SocialMediaIconsColumn from '../components/Layout/SocialMediaIconsColumn';
import { useLogin } from '../hooks/useLogin';
import SendIcon from '@mui/icons-material/Send';
import LinkButton from '../components/Button/LinkButton';

const Login = ({ redirect = '/' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { errors, login } = useLogin();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await login(email, password);
    if (response?.data?.status) {
      navigate(redirect);
    }
  };

  return (
    <>
      <Stack direction="column" spacing={8}>
        {window.location.pathname === '/manager/login' ? (
          ''
        ) : (
          <SocialMediaIconsColumn />
        )}

        <Stack
          direction="column"
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h6" component="h1" textAlign="center">
            Vous avez un mot de passe? Continuez avec votre email
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
            <Button type="submit" variant="outlined">
              Se connecter
            </Button>
          </Stack>
        </Stack>
        <Stack
          direction="column"
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="body1" component="h1" textAlign="center">
            {"Pas de compte? Inscrivez-vous s'il vous plaît"}
          </Typography>
          {window.location.pathname === '/manager/login' ? (
            <LinkButton
              to={generatePath('/manager/registration')}
              endIcon={<SendIcon />}
            >
              {"S'inscrire"}
            </LinkButton>
          ) : (
            <LinkButton to={generatePath('/signup')} endIcon={<SendIcon />}>
              {"S'inscrire"}
            </LinkButton>
          )}
        </Stack>
      </Stack>
    </>
  );
};
export default Login;
