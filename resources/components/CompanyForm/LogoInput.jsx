import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, Stack, Typography } from '@mui/material';
import { useStore } from '../../js/useStore';

const LogoInput = ({ control, errors, setLogo }) => {
  const { user } = useStore();
  const { t } = useTranslation();
  const [displayLogoDB, setdisplayLogoDB] = useState(user?.company?.logo);
  const [previewImage, setPreviewImage] = useState(undefined);
  const selectFile = (e) => {
    setdisplayLogoDB(false);
    setLogo(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <>
      <Stack direction="row" spacing={2} mt={2} alignItems="center">
        <Typography variant="body2" component="p">
          {user ? t('company.form.logo_modify') : t('company.form.logo_add')}
        </Typography>

        <Controller
          name="logo"
          control={control}
          render={({ field }) => (
            <>
              <input
                id="logo"
                name={field.name}
                style={{ display: 'none' }}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  field.onChange(file);
                  selectFile(e);
                }}
              />
              <label htmlFor="logo">
                <Button
                  component="span"
                  variant="contained"
                  sx={{
                    boxShadow: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '10px',
                    gap: 1,
                    '&:hover': { boxShadow: 'none' },
                  }}
                >
                  {t('buttons.btn_add')}
                </Button>
              </label>
            </>
          )}
        />
      </Stack>

      {errors?.logo?.message && (
        <Typography variant="body1" sx={{ fontSize: '12px', color: '#D32F2F', mt: 1 }}>
          {errors.logo.message}
        </Typography>
      )}
      <Stack>
        {displayLogoDB && (
          <Stack my={2}>
            <Typography variant="body2">{t('company.form.logo_your_logo')}</Typography>
            <img width="150px" src={'/storage/' + user?.company?.logo} alt="Logo" />
          </Stack>
        )}
        {previewImage && (
          <Stack my={2} spacing={1}>
            <Typography variant="body2">{t('company.form.logo_preview')}</Typography>
            <img width="150px" className="preview" src={previewImage} alt="Logo Preview" />
          </Stack>
        )}
      </Stack>
    </>
  );
};

export default LogoInput;
