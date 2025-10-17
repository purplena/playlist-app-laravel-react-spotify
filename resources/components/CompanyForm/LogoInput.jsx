import { Button, Stack, Typography } from "@mui/material";

const LogoInput = ({errors, selectFile, previewImage}) => {
  return (<>
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
    </>
  )
}
export default LogoInput
