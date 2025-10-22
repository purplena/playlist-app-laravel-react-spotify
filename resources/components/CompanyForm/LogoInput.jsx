import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { Controller } from "react-hook-form";

const LogoInput = ({ control, errors, setLogo }) => {
    const [previewImage, setPreviewImage] = useState(undefined);
    const selectFile = (e) => {
      setLogo(e.target.files[0]);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    };

    return (
      <>
        <Stack direction="row" spacing={2} mt={2} alignItems="center">
          <Typography variant="body2" component="p">
            Ajouter votre logo
          </Typography>

          <Controller
            name="logo"
            control={control}
            render={({ field }) => (
              <>
                <input
                  id="logo"
                  name={field.name}
                  style={{ display: "none" }}
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
                        '&:hover': {boxShadow: 'none'}
                    }} 
                  >
                    Choisir
                  </Button>
                </label>
              </>
            )}
          />
        </Stack>

        {previewImage && (
          <Stack
            mt={3}
            mb={3}
            spacing={1}
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="body2">
              Vous avez choisi cette image
            </Typography>
            <img
              width="150px"
              className="preview"
              src={previewImage}
              alt="Logo Preview"
            />
          </Stack>
        )}
   
        {errors?.logo?.message && (
          <Typography
            variant="body1"
            sx={{ fontSize: "12px", color: "#D32F2F", mt: 1 }}
          >
            {errors.logo.message}
          </Typography>
        )}
      </>
    );
};

export default LogoInput;
