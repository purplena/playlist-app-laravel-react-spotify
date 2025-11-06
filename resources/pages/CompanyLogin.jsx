import { useTranslation } from 'react-i18next';
import { Stack, Typography } from '@mui/material';
import LoginForm from '../components/Login/LoginForm';
import { useRedirectIfAuthenticated } from '../hooks/useRedirectIfAuthenticated';

const CompanyLogin = ({ redirect = '/manager' }) => {
  const { t } = useTranslation();
  useRedirectIfAuthenticated({ redirect });

  return (
    <>
      <Stack direction="column" spacing={2} justifyContent="center" alignItems="center">
        <Typography variant="h1" component="h1" textAlign="center">
          {t('company.login.h1')}
        </Typography>
        <Typography variant="body1" component="p" textAlign="center">
          {t('company.login.p1')}
        </Typography>
        <LoginForm redirect={redirect} />
      </Stack>
    </>
  );
};
export default CompanyLogin;
