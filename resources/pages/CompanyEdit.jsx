import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { Stack, Typography } from '@mui/material';
import CustomThemeInput from '../components/CompanyForm/CustomThemeInput';
import FormBtn from '../components/CompanyForm/FormBtn';
import LogoInput from '../components/CompanyForm/LogoInput';
import TextFieldCustom from '../components/CompanyForm/TextFieldCustom';
import { companyFormInputs } from '../helpers/generalInfoFields';
import { hexToRgb, rgbToHex } from '../helpers/rgbToHexTransform';
import { serverErrorsHandler } from '../helpers/serverErrorsHandler';
import { actionController, useSignUpCompany } from '../hooks/useSignUpCompany';
import { useStore } from '../js/useStore';

const CompanyEdit = () => {
  const { user } = useStore();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [submitLoader, setSubmitLoader] = useState(false);
  const [logo, setLogo] = useState(null);
  const [fontColor, setFontColor] = useState({
    color: user?.company?.font_color,
  });
  const [backgroundColor, setBackgroundColor] = useState({
    background: hexToRgb(user?.company?.background_color),
    color: hexToRgb(user?.company?.background_color),
  });

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: user?.company?.description,
      tel: user?.company?.tel,
      country: user?.company?.country,
      city: user?.company?.city,
      zip: user?.company?.zip,
      address: user?.company?.address,
    },
    criteriaMode: 'all',
  });

  const mode = actionController.editCompany;
  const { signup } = useSignUpCompany({
    action: mode,
  });

  const onSubmit = async (data) => {
    setSubmitLoader(true);
    const response = await signup({
      ...data,
      logo,
      background_color: hexBackgroundColor,
      font_color: fontColor.color,
    });

    if (!response.success) {
      setSubmitLoader(false);
      serverErrorsHandler(response.errors, setError);
      return;
    }
    setSubmitLoader(false);
    navigate('/manager/entreprise');
  };

  const hexBackgroundColor = rgbToHex(
    backgroundColor?.color?.r,
    backgroundColor?.color?.g,
    backgroundColor?.color?.b,
  );

  return (
    <>
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={4}>
        <Typography variant="h3" component="h1" textAlign="center">
          {t('company.form.h1_modify')}
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
            <Stack spacing={2}>
              <Typography variant="h5" component="h2" textAlign="center">
                {t('company.form.h2_info')}
              </Typography>
              {companyFormInputs.general
                .filter((field) => field.showOn.includes(mode))
                .map(({ label, name, type, rows }) => (
                  <TextFieldCustom
                    control={control}
                    name={name}
                    key={name}
                    label={label}
                    type={type}
                    rows={rows}
                    errors={errors}
                    rules={{ required: `${label} est obligatoire` }}
                  />
                ))}
              <LogoInput control={control} errors={errors} setLogo={setLogo} />
            </Stack>

            <Stack spacing={2}>
              <Typography variant="h5" component="h2" textAlign="center">
                {t('company.form.h2_contact')}
              </Typography>
              {companyFormInputs.contact
                .filter((field) => field.showOn.includes(mode))
                .map(({ label, name, type }) => (
                  <TextFieldCustom
                    control={control}
                    name={name}
                    key={name}
                    label={label}
                    type={type}
                    errors={errors}
                    rules={{ required: `${label} est obligatoire` }}
                  />
                ))}
            </Stack>

            <Stack justifyContent={'center'} alignItems={'center'}>
              <Typography variant="h5" component="h2" textAlign="center">
                {t('company.form.h2_customize')}
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
            <FormBtn
              label={t('buttons.btn_modify')}
              submitLoader={submitLoader}
              Icon={AutoFixHighIcon}
            />
          </Stack>
        </form>
      </Stack>
    </>
  );
};
export default CompanyEdit;
