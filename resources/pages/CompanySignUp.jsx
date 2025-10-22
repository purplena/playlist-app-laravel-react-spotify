import { useState } from 'react';
import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router';
import { actionController, useSignUpCompany } from '../hooks/useSignUpCompany';
import TextFieldCustom from '../components/CompanyForm/TextFieldCustom';
import LogoInput from '../components/CompanyForm/LogoInput';
import { generalInfoFields } from '../components/CompanyForm/generalInfoFields';
import { useForm } from "react-hook-form"
import CustomThemeInput from '../components/CompanyForm/CustomThemeInput';
import { useTranslation } from 'react-i18next';

const CompanySignUp = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [submitLoader, setSubmitLoader] = useState(false)
  const [logo, setLogo] = useState(null);
  const [fontColor, setFontColor] = useState({ color: '#fff' });
  const [backgroundColor, setBackgroundColor] = useState({
    background: 'rgb(1,1,1)',
    color: '',
  });
  const { control, handleSubmit, setError, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
      username: '',
      name: '',
      tel: '',
      country: '',
      city: '',
      zip: '',
      address: ''
    },
    criteriaMode: 'all'
  })

 const { signup } = useSignUpCompany({
    action: actionController.storeCompany,
    setError, 
  });
    
  const onSubmit =  async (data) => {
    setSubmitLoader(true);
    const response = await signup({
      ...data,
      logo,
      background_color: hexBackgroundColor,
      font_color: fontColor.color,
    });
    setSubmitLoader(false);
    if (response?.data?.status) navigate("/manager");
  }

  const hexBackgroundColor = rgbToHex(
      backgroundColor?.color?.r,
      backgroundColor?.color?.g,
      backgroundColor?.color?.b
  );

  return (
    <>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        <Typography variant="h3" component="h1" textAlign="center">
          {t('company.register_form.h1')}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
            direction={{ xs: 'column', md: 'row', lg: 'row', xl: 'row' }}
            spacing={6}
            alignItems={{
              xs: 'center',
              md: 'flex-start',
              lg: 'flex-start',
              xl: 'flex-start',
            }}
          >
            <Stack>
              <Typography variant="h5" component="h2" textAlign="center">
                {'Information générale'}
              </Typography>

             {generalInfoFields.general.map(({ label, name, type }) => (
                  <TextFieldCustom
                    control={control}
                    name={name}
                    key={name}
                    label={label}
                    type={type}
                    errors={errors}
                    rules={{ required: `${label} est obligatoire` }}
                  />
                ))
              }
              <LogoInput 
                  control={control}
                  errors={errors}
                  setLogo={setLogo} 
                />
            </Stack>

            <Stack>
              <Typography variant="h5" component="h2" textAlign="center">
                {'Information de contact'}
              </Typography>
              {generalInfoFields.contact.map(({ label, name, type }) => (
                  <TextFieldCustom
                    control={control}
                    name={name}
                    key={name}
                    label={label}
                    type={type}
                    errors={errors}
                    rules={{ required: `${label} est obligatoire` }}
                  />
                ))
              }
            </Stack>

            <Stack>
              <Typography variant="h5" component="h2" textAlign="center">
                  Personnalisez votre application
              </Typography>
              <CustomThemeInput 
                fontColor={fontColor} 
                backgroundColor={backgroundColor}
                setFontColor={setFontColor}
                setBackgroundColor={setBackgroundColor}
              />
            </Stack>
          </Stack>
          <Stack direction="row" justifyContent="center" my={3}>
            <Button
              disabled={submitLoader}
              type="submit"
              variant="contained"
              sx={{
                boxShadow: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                '&:hover': { boxShadow: 'none' },
              }}
            >
              {"S'inscrire"}
              {submitLoader ? <CircularProgress size={20} /> : <SendIcon size={20} />}
            </Button>
          </Stack>
        </form>
      </Stack>
    </>
  );
};
export default CompanySignUp;

function rgbToHex(r, g, b) {
  const toHex = (c) => {
    const hex = c?.toString(16);
    return hex?.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
