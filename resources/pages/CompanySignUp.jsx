import React, { useState } from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router';
import { useSignUpCompany } from '../hooks/useSignUpCompany';

const CompanySignUp = ({ redirect = '/manager' }) => {
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
  const { signup, errors } = useSignUpCompany();
  const navigate = useNavigate();

  // image
  const [previewImage, setPreviewImage] = useState(undefined);
  const [message, setMessage] = useState('');
  const [logo, setLogo] = useState(null);
  // const [isError, setIsError] = useState(false);

  const selectFile = (e) => {
    setLogo(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
    setMessage('');
  };

  // image

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    });
    console.log(response);
    if (response?.data?.status) {
      navigate(redirect);
    }
  };

  return (
    <>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
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
              onChange={(e) => setCountry(e.target.value)}
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
            <Typography mt={3} variant="h5" component="h2" textAlign="center">
              {'Personnalisez votre application!'}
            </Typography>

            <Stack mb={3}>
              <Stack direction={'row'} spacing={2} mt={2} alignItems={'center'}>
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
              {message && (
                <Typography
                  variant="subtitle2"
                  // className={`upload-message ${isError ? 'error' : ''}`}
                >
                  {message}
                </Typography>
              )}
            </Stack>
            <Button type="submit" variant="outlined" endIcon={<SendIcon />}>
              {"S'inscrire"}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
export default CompanySignUp;
