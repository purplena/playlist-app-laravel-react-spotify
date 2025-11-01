import { useState } from 'react';
import { Button, Link, Stack, Typography } from '@mui/material';
import { generatePath } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import SendIcon from '@mui/icons-material/Send';
import LinkButton from '../components/Button/LinkButton';
import { useAuthRedirect } from '../hooks/useAuthRedirect';
import LoginInputs from '../components/Layout/LoginInputs';
import { useStore } from '../js/useStore';
import { useRedirectIfAuthenticated } from '../hooks/useRedirectIfAuthenticated';
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { errors, login } = useLogin();
  const redirectAfterLogin = useAuthRedirect();
  const { company } = useStore();

  useRedirectIfAuthenticated({ redirect: `/${company.slug}` });


  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await login(email, password);
    if (response?.data?.status) {
      redirectAfterLogin();
    }
  };

  return (
    <>
      <Stack direction="column" spacing={4} justifyContent="center"
        alignItems="center">
        <LoginInputs
          handleLogin={handleLogin}
          errors={errors}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />
        <Link
          href={`/auth/google/redirect?companySlug=${company.slug}`}
          sx={{
            textDecoration: 'none',
          }}
        >
          <Button
            variant="contained"
            sx={{
              boxShadow: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              '&:hover': { boxShadow: 'none' },
            }}
            disableElevation
            startIcon={<GoogleIcon />}>
            Continue avec Google
          </Button>
        </Link>
        <Stack
          direction="column"
          spacing={1}
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
            <LinkButton to={generatePath(`/${company.slug}/signup`)} endIcon={<SendIcon />}>
              {"S'inscrire"}
            </LinkButton>
          )}
        </Stack>
      </Stack>
    </>
  );
};
export default Login;
