import { useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { generatePath } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import SendIcon from '@mui/icons-material/Send';
import LinkButton from '../components/Button/LinkButton';
import { useAuthRedirect } from '../hooks/useAuthRedirect';
import LoginInputs from '../components/Layout/LoginInputs';
import { useStore } from '../js/useStore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { errors, login } = useLogin();
  const redirectAfterLogin = useAuthRedirect();
  const { company } = useStore();
  

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await login(email, password);
    if (response?.data?.status) {
      redirectAfterLogin();
    }
  };

  return (
    <>
      <Stack direction="column" spacing={8}>
        <LoginInputs
          handleLogin={handleLogin}
          errors={errors}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />
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
