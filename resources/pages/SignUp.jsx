import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import SendIcon from '@mui/icons-material/Send';
import { Stack, Typography } from '@mui/material';
import FormBtn from '../components/CompanyForm/FormBtn';
import TextFieldCustom from '../components/CompanyForm/TextFieldCustom';
import { userFormInputs } from '../helpers/generalInfoFields';
import { serverErrorsHandler } from '../helpers/serverErrorsHandler';
import { useRedirectIfAuthenticated } from '../hooks/useRedirectIfAuthenticated';
import { useSignUp } from '../hooks/useSignUp';
import { useStore } from '../js/useStore';

const SignUp = () => {
  const { t } = useTranslation();
  const [submitLoader, setSubmitLoader] = useState(false);
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      username: '',
    },
  });
  const { signup } = useSignUp();
  const navigate = useNavigate();
  const { company } = useStore();

  useRedirectIfAuthenticated({ redirect: `/${company.slug}` });

  const onSubmit = async (data) => {
    setSubmitLoader(true);
    const response = await signup({ ...data });
    if (!response.success) {
      setSubmitLoader(false);
      serverErrorsHandler(response.errors, setError);
      return;
    }
    setSubmitLoader(false);
    navigate(`/${company.slug}`);
  };

  return (
    <>
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
        <Typography variant="h5" component="h1" textAlign="center">
          Vous êtes presque là!
        </Typography>
        <Typography variant="body1" component="h2" textAlign="center">
          Nous vous invitons à créer votre compte
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
            spacing={2}
            noValidate
            autoComplete="off"
            textAlign="center"
            direction="column"
            justifyContent="center"
            alignItems="center"
            onSubmit={handleSubmit}
          >
            {userFormInputs.map((input) => (
              <TextFieldCustom
                key={input.name}
                control={control}
                name={input.name}
                label={input.label}
                type={input.type}
                errors={errors}
                rules={input.required ? { required: `${input.label} est obligatoire` } : {}}
              />
            ))}
            <FormBtn label={t('buttons.btn_signup')} submitLoader={submitLoader} Icon={SendIcon} />
          </Stack>
        </form>
      </Stack>
    </>
  );
};
export default SignUp;
