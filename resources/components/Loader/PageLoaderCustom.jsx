import { CircularProgress, Stack, Typography } from '@mui/material';

export default function PageLoaderCustom() {
  return (
    <>
      <Stack alignItems="center" justifyContent="center" minHeight="60vh">
        <CircularProgress />
        <Typography mt={2}>Chargement de vos données...</Typography>
      </Stack>
    </>
  );
}
