import { Link, Stack, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useStore } from '../js/useStore';
import { useRedirectIfAuthenticated } from '../hooks/useRedirectIfAuthenticated';
import GoogleIcon from '@mui/icons-material/Google';
import { useTranslation } from 'react-i18next';
import LoginForm from '../components/Login/LoginForm';
import FormBtn from '../components/CompanyForm/FormBtn';
import LinkButton from '../components/Button/LinkButton';
import { generatePath } from 'react-router-dom';

const Login = () => {
  const { t } = useTranslation();
  const { company } = useStore();
  const redirecte = company.slug;
  useRedirectIfAuthenticated({ redirect: redirecte });

  return (
    <>
      <Stack direction="column" spacing={4} justifyContent="center"
        alignItems="center">
          <Typography variant="h1" component="h1" textAlign="center">
            {t('user.login.h1')}
          </Typography>
          <Stack>
            <Typography variant="body1" component="p" textAlign="center">
              {t('user.login.p_with_email')}
            </Typography>
            <LoginForm redirect={redirecte} />
          </Stack>
          <Stack alignItems="center"> 
            <Typography variant="body1" component="p" textAlign="center">
              {t('user.login.p_with_google')}
            </Typography>
            <Link
              href={`/auth/google/redirect?companySlug=${company.slug}`}
              sx={{
                textDecoration: 'none',
              }}
            >
              <FormBtn
                label={t('buttons.btn_google')}
                submit={false}
                Icon={GoogleIcon}
              />
            </Link>
          </Stack>
          <Stack alignItems="center">
            <Typography variant="body1" component="h1" textAlign="center">
              {t('user.login.p_sigup_invitation')}
            </Typography>
              <LinkButton 
                to={generatePath(`/${company.slug}/signup`)} 
                endIcon={<SendIcon/>}
              >
                {t('buttons.btn_signup')}
              </LinkButton>
 
          </Stack>
      </Stack>
    </>
  );
};
export default Login;
