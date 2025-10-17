import { useState } from 'react';
import { Button, CircularProgress, Stack, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router';
import { actionController, useSignUpCompany } from '../hooks/useSignUpCompany';
import { SliderPicker } from 'react-color';
import LinkButton from '../components/Button/LinkButton';
import { Box } from '@mui/system';
import TextFieldCustom from '../components/CompanyForm/TextFieldCustom';
import LogoInput from '../components/CompanyForm/LogoInput';
import { generalInfoFields } from '../components/CompanyForm/generalInfoFields';

const CompanySignUp = () => {
  const navigate = useNavigate();
  const [submitLoader, setSubmitLoader] = useState(false)

  const [formData, setFormData] = useState({
  email: '',
  password: '',
  username: '',
  name: '',
  tel: '',
  country: '',
  city: '',
  zip: '',
  address: '',
});

  const { signup, errors } = useSignUpCompany({
    action: actionController.storeCompany,
  });
  const [previewImage, setPreviewImage] = useState(undefined);
  const [logo, setLogo] = useState(null);
  const [fontColor, setFontColor] = useState({ color: '#fff' });
  const [backgroundColor, setBackgroundColor] = useState({
    background: 'rgb(1,1,1)',
    color: '',
  });

  const handleChange = (field) => (value) => {
  setFormData((prev) => ({ ...prev, [field]: value }));
};


  const selectFile = (e) => {
    setLogo(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoader(true);
    
    const response = await signup({
      ...formData,
      logo,
      background_color: hexBackgroundColor,
      font_color: fontColor.color,
    });

    if (response?.data?.errors || response?.response?.data?.errors) {
      setSubmitLoader(false);
      return;
    }
    if (response?.data?.status) {
      navigate("/manager");
    }

    setSubmitLoader(false);
  };

  const changeBackgroungHandler = (colors) => {
    const col =
      'rgb(' + colors.rgb.r + ',' + colors.rgb.g + ',' + colors.rgb.b + ')';
    setBackgroundColor({ background: col, color: colors.rgb });
  };

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
          Inscription de votre entreprise
        </Typography>

        <Stack
          component="form"
          spacing={4}
          noValidate
          autoComplete="off"
          textAlign="center"
          direction="column"
          justifyContent="center"
          alignItems="center"
          onSubmit={handleSubmit}
        >
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

             {generalInfoFields.general.map(({ label, id, type }) => (
                  <TextFieldCustom
                    key={id}
                    label={label}
                    id={id}
                    type={type}
                    errors={errors}
                    value={formData[id]}
                    setValue={handleChange(id)}
                  />
                ))
              }
            </Stack>

            <Stack>
              <Typography variant="h5" component="h2" textAlign="center">
                {'Information de contact'}
              </Typography>
              {generalInfoFields.contact.map(({ label, id, type }) => (
                  <TextFieldCustom
                    key={id}
                    label={label}
                    id={id}
                    type={type}
                    errors={errors}
                    value={formData[id]}
                    setValue={handleChange(id)}
                  />
                ))
              }
            </Stack>

            <Stack justifyContent={'center'} alignItems={'center'}>
              <Typography variant="h5" component="h2" textAlign="center">
                {'Personnalisez votre application!'}
              </Typography>

              <Stack mb={3} justifyContent={'center'} alignItems={'center'}>
                <LogoInput errors={errors} selectFile={selectFile} previewImage={previewImage} />
                <Stack spacing={2}>
                  <Stack>
                    <Typography variant="body2" component="p">
                      Ajouter vos couleur principales
                    </Typography>
                    <Typography
                      variant="body2"
                      component="p"
                      sx={{ color: '#979797', fontSize: '11px' }}
                    >
                      optionel
                    </Typography>
                  </Stack>

                  <Stack>
                    <Typography variant="body2" component="p">
                      {'Couleur de navigation, bas de page et boutons'}
                    </Typography>
                    <SliderPicker
                      className="picker"
                      color={backgroundColor.color}
                      onChange={changeBackgroungHandler}
                    />
                  </Stack>

                  <Stack>
                    <Typography variant="body2" component="p">
                      {'Couleur de police'}
                    </Typography>
                    <Stack
                      direction={'row'}
                      spacing={3}
                      justifyContent={'center'}
                      alignItems={'center'}
                    >
                      <Box
                        onClick={() => setFontColor({ color: '#000000' })}
                        sx={{
                          width: '50px',
                          height: '50px',
                          background: '#000',
                          border: '1px solid #000',
                          borderRadius: '5px',
                        }}
                      ></Box>
                      <Box
                        onClick={() => setFontColor({ color: '#ffffff' })}
                        sx={{
                          width: '50px',
                          height: '50px',
                          background: '#fff',
                          border: '1px solid #000',
                          borderRadius: '5px',
                        }}
                      ></Box>
                    </Stack>
                  </Stack>
                  <Stack justifyContent={'center'} alignItems={'center'} mt={3}>
                    <Typography variant="body2" component="p">
                      Prévisualisation
                    </Typography>

                    <LinkButton
                      style={{
                        backgroundColor: backgroundColor.background,
                        color: fontColor.color,
                        width: '90px',
                      }}
                      mt={2}
                    >
                      {'Button'}
                    </LinkButton>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack>
            <Button
              disabled={submitLoader} 
              type="submit" 
              variant="contained" 
              sx={{
                boxShadow: 'none', 
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                  '&:hover': {boxShadow: 'none'}
              }} 
            >
              {"S'inscrire"}
              {submitLoader ? <CircularProgress size={20} /> : <SendIcon size={20} />}
            </Button>
          </Stack>
        </Stack>
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
