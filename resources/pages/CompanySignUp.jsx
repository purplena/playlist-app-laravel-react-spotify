import { useState } from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router';
import { actionController, useSignUpCompany } from '../hooks/useSignUpCompany';
import { SliderPicker } from 'react-color';
import LinkButton from '../components/Button/LinkButton';
import { Box } from '@mui/system';
import PageLoaderCustom from '../components/Loader/PageLoaderCustom';

const CompanySignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [address, setAddress] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signup, errors } = useSignUpCompany({
    action: actionController.storeCompany,
  });
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(undefined);
  const [logo, setLogo] = useState(null);
  const [fontColor, setFontColor] = useState({ color: '#fff' });
  const [backgroundColor, setBackgroundColor] = useState({
    background: 'rgb(1,1,1)',
    color: '',
  });

  const [submitLoader, setSubmitLoader] = useState(false)

  const selectFile = (e) => {
    setLogo(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoader(true)

    const response = await signup({
      email,
      password,
      password_confirmation: confirmPassword,
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
      setSubmitLoader(false)
      navigate('/manager');
    }
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

  if (submitLoader) {
    return <PageLoaderCustom />;
  }

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

              <TextField
                error={!!errors?.email}
                style={{ width: '250px' }}
                id="email"
                label={'Email'}
                type="email"
                variant="standard"
                value={email}
                helperText={errors?.email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                error={!!errors?.password}
                style={{ width: '250px' }}
                id="password"
                label={'Mot de passe'}
                type="password"
                variant="standard"
                value={password}
                helperText={errors?.password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                error={!!errors?.password_confirmation}
                style={{ width: '250px' }}
                id="password_confirmation"
                label={'Confirmez votre mot de passe'}
                type="password"
                variant="standard"
                value={confirmPassword}
                helperText={errors?.password_confirmation}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <TextField
                error={!!errors?.name}
                style={{ width: '250px' }}
                id="name"
                label={'Nom d\u0027entreprise'}
                variant="standard"
                value={name}
                helperText={errors?.name}
                onChange={(e) => setName(e.target.value)}
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
              />
            </Stack>

            <Stack>
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
                    {'Ajouter votre logo'}
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
                      style={{ fontSize: '12px' }}
                    >
                      Choisir
                    </Button>
                  </label>
                </Stack>
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
            <Button disabled={submitLoader} type="submit" variant="outlined" endIcon={<SendIcon />}>
              {"S'inscrire"}
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
