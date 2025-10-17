import { TextField } from "@mui/material"

const TextFieldCustom = ({label, id, type, errors, value, setValue}) => {
  const hasError = !!errors?.[id];
  
    return (
    <TextField
        error={hasError}
        style={{ width: '250px' }}
        id={id}
        label={label}
        type={type}
        variant="standard"
        value={value}
        helperText={errors?.[id]}
        onChange={(e) => setValue(e.target.value)}
    />
  )
}
export default TextFieldCustom
