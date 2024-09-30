import React, { useState } from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { actionController, useSignUpCompany } from '../hooks/useSignUpCompany';
import { SliderPicker } from 'react-color';
import LinkButton from '../components/Button/LinkButton';
import { Box } from '@mui/system';
import { useUserStore } from '../js/useUserStore';

const CompanyEdit = ({ redirect = '/manager/entreprise' }) => {
  const { user } = useUserStore();
  const [username, setUsername] = useState(user?.username);
  const [name, setName] = useState(user?.company?.name);
  const [tel, setTel] = useState(user?.company?.tel);
  const [country, setCountry] = useState(user?.company?.country);
  const [city, setCity] = useState(user?.company?.city);
  const [zip, setZip] = useState(user?.company?.zip);
  const [address, setAddress] = useState(user?.company?.address);
  const { signup, errors } = useSignUpCompany({
    action: actionController.editCompany,
  });
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(undefined);
  const [logo, setLogo] = useState(null);
  const [logoDB, setLogoDB] = useState(true);
  const [fontColor, setFontColor] = useState({
    color: user?.company?.font_color,
  });
  const [backgroundColor, setBackgroundColor] = useState({
    background: hexToRgb(user?.company?.background_color),
    color: hexToRgb(user?.company?.background_color),
  });

  const selectFile = (e) => {
    setLogoDB(false);
    setLogo(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  const hexBackgroundColor = rgbToHex(
    backgroundColor?.color?.r,
    backgroundColor?.color?.g,
    backgroundColor?.color?.b
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await signup({
      username,
      name,
      tel,
      country,
      city,
      zip,
      address,
      logo,
      background_color: hexBackgroundColor,
      font_color: fontColor.color,
    });
    if (response?.data?.status) {
      navigate(redirect);
    }
  };

  const changeBackgroungHandler = (colors) => {
    const col =
      'rgb(' + colors.rgb.r + ',' + colors.rgb.g + ',' + colors.rgb.b + ')';
    setBackgroundColor({ background: col, color: colors.rgb });
  };

  return (
    <>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        <Typography variant="h3" component="h1" textAlign="center">
          {"Modification de l'information"}
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
            <Stack spacing={2}>
              <Typography variant="h5" component="h2" textAlign="center">
                {'Information générale'}
              </Typography>
              <TextField
                error={!!errors?.name}
                style={{ width: '250px' }}
                id="name"
                label={'Nom d\u0027entreprise'}
                variant="standard"
                value={name}
                helperText={errors?.name}
                onChange={(e) => setName(e.target.value)}
                sx={{
                  label: { color: (theme) => theme.palette.text.primary },
                }}
              />
              <TextField
                error={!!errors?.username}
                style={{ width: '250px' }}
                id="username"
                label={'Username'}
                variant="standard"
                value={username}
                helperText={errors?.username ? errors?.username : 'optionel'}
                onChange={(e) => setUsername(e.target.value)}
                sx={{
                  label: { color: (theme) => theme.palette.text.primary },
                }}
              />
            </Stack>

            <Stack spacing={2}>
              <Typography variant="h5" component="h2" textAlign="center">
                {'Information de contact'}
              </Typography>
              <TextField
                error={!!errors?.tel}
                style={{ width: '250px' }}
                id="tel"
                label={'Téléphone'}
                variant="standard"
                value={tel}
                helperText={errors?.tel}
                onChange={(e) => setTel(e.target.value)}
                sx={{
                  label: { color: (theme) => theme.palette.text.primary },
                }}
              />

              <TextField
                error={!!errors?.country}
                style={{ width: '250px' }}
                id="country"
                label={'Pays'}
                variant="standard"
                value={country}
                helperText={errors?.country}
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
                sx={{
                  label: { color: (theme) => theme.palette.text.primary },
                }}
              />

              <TextField
                error={!!errors?.city}
                style={{ width: '250px' }}
                id="city"
                label={'Ville'}
                variant="standard"
                value={city}
                helperText={errors?.city}
                onChange={(e) => setCity(e.target.value)}
                sx={{
                  label: { color: (theme) => theme.palette.text.primary },
                }}
              />

              <TextField
                error={!!errors?.zip}
                style={{ width: '250px' }}
                id="zip"
                label={'Code postale'}
                variant="standard"
                value={zip}
                helperText={errors?.zip}
                onChange={(e) => setZip(e.target.value)}
                sx={{
                  label: { color: (theme) => theme.palette.text.primary },
                }}
              />
              <TextField
                error={!!errors?.address}
                style={{ width: '250px' }}
                id="address"
                label={'Adresse'}
                variant="standard"
                value={address}
                helperText={errors?.address}
                onChange={(e) => setAddress(e.target.value)}
                sx={{
                  label: { color: (theme) => theme.palette.text.primary },
                }}
              />
            </Stack>

            <Stack justifyContent={'center'} alignItems={'center'}>
              <Typography variant="h5" component="h2" textAlign="center">
                {'Personnalisez votre application!'}
              </Typography>

              <Stack mb={3} justifyContent={'center'} alignItems={'center'}>
                <Stack
                  direction={'row'}
                  spacing={2}
                  mt={2}
                  alignItems={'center'}
                >
                  <Typography variant="body2" component="p">
                    {'Modifier votre logo'}
                  </Typography>
                  <Typography variant="body2">{!!errors?.logo}</Typography>
                  <input
                    id="logo"
                    name="logo"
                    style={{ display: 'none' }}
                    type="file"
                    accept="image/*"
                    onChange={selectFile}
                  />
                  <label htmlFor="logo">
                    <Button
                      variant="outlined"
                      component="span"
                      sx={{
                        fontSize: '12px',
                        color: (theme) => theme.palette.text.secondary,
                        '&:hover': {
                          backgroundColor: (theme) =>
                            theme.palette.primary.dark,
                          color: (theme) => theme.palette.text.secondary,
                        },
                      }}
                    >
                      Choisir
                    </Button>
                  </label>
                </Stack>
                {logoDB && (
                  <Box
                    mt={2}
                    component="img"
                    sx={{
                      width: 100,
                      maxWidth: { xs: 70, md: 100 },
                    }}
                    alt="Company Logo"
                    src={'/storage/' + user?.company?.logo}
                  />
                )}
                {previewImage && (
                  <Stack
                    mt={3}
                    spacing={1}
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    <Typography variant="body2">
                      {'Vous avez choisi cette image'}
                    </Typography>
                    <img
                      width={'150px'}
                      className="preview"
                      src={previewImage}
                      alt=""
                    />
                  </Stack>
                )}
                <Stack mt={2}>
                  {errors?.logo &&
                    errors?.logo.map((error) => {
                      return (
                        <Typography
                          key={error}
                          variant="body1"
                          sx={{ fontSize: '12px', color: '#D32F2F' }}
                        >
                          {error}
                        </Typography>
                      );
                    })}
                </Stack>
                <Stack spacing={2}>
                  <Stack>
                    <Typography variant="body2" component="p">
                      Modifier vos couleur principales
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
              type="submit"
              variant="outlined"
              sx={{
                color: (theme) => theme.palette.text.primary,
                backgroundColor: 'transparent',
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.primary.main,
                  color: (theme) => theme.palette.text.secondary,
                },
              }}
            >
              {'Modifier'}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
export default CompanyEdit;

function rgbToHex(r, g, b) {
  const toHex = (c) => {
    const hex = c?.toString(16);
    return hex?.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return { r, g, b };
}
