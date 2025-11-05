import { Alert, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import { useTranslation } from 'react-i18next';
import { useLogin } from '../../hooks/useLogin';
import TextFieldCustom from '../CompanyForm/TextFieldCustom';
import { serverErrorsHandler } from '../../helpers/serverErrorsHandler';
import FormBtn from '../CompanyForm/FormBtn';


const LoginForm =({redirect}) => {
    const { t } = useTranslation();
    const { login } = useLogin();
    const [submitLoader, setSubmitLoader] = useState(false)
    const navigate = useNavigate();

     const { control, handleSubmit, setError, clearErrors, watch, formState: { errors } } = useForm({
        defaultValues: {
          email: '',
          password: '',
        }
      });
    
      useEffect(() => {
        watch(() => {
          if (errors.nonauthorized) clearErrors('nonauthorized');
        });
      }, [watch, errors, clearErrors]);
    
      const onSubmit = async (data) => {
        setSubmitLoader(true);
        const response = await login({ ...data });
    
        if (!response.success) {
          setSubmitLoader(false);
          if (response.errors.message) {
            setError('nonauthorized', { type: 'server', message: response.errors.message });
          } else {
            serverErrorsHandler(response.errors, setError);
          }
          return;
        }
        setSubmitLoader(false);
        navigate(redirect);
      }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={2}
            noValidate
            autoComplete="off"
            textAlign="center"
          >
            {errors?.nonauthorized && (
              <Alert severity="error">{errors.nonauthorized.message}</Alert>
            )}
            <TextFieldCustom
              control={control}
              name={'email'}
              label={'Email'}
              type={'email'}
              errors={errors}
              rules={{ required: `Email est obligatoire` }}
            />

            <TextFieldCustom
              control={control}
              name={'password'}
              label={'Mot de passe'}
              type={'password'}
              errors={errors}
              rules={{ required: `Mot de passe est obligatoire` }}
            />
            <FormBtn
              label={t('buttons.btn_login')}
              submitLoader={submitLoader}
              Icon={LoginIcon}
            />
          </Stack>
        </form>
    )
}

export default LoginForm;
