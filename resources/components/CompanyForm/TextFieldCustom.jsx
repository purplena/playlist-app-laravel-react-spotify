import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

const TextFieldCustom = ({ control, name, label, type, errors, rules}) => {
  const hasError = errors?.[name]?.message;

   return <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field }) => (
      <TextField
        {...field}
        label={label}
        type={type}
        variant="standard"
        style={{ width: '250px' }}  
        error={!!hasError}
        helperText={hasError}
      />
    )}
  />
};

export default TextFieldCustom;
