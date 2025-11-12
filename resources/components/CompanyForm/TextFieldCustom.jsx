import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

const TextFieldCustom = ({ control, name, label, type, errors, rules = {}, rows }) => {
  const hasError = errors?.[name]?.message;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <TextField
          {...field}
          autoComplete="true"
          label={label}
          {...(rows ? { rows, multiline: true } : {})}
          type={type}
          variant="standard"
          error={!!hasError}
          helperText={hasError}
          sx={{
            width: 250,
            '& .MuiInputLabel-root': {
              color: '#222',
            },
          }}
        />
      )}
    />
  );
};

export default TextFieldCustom;
