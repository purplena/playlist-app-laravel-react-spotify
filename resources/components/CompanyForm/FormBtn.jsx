import { Button, CircularProgress } from '@mui/material';

const FormBtn = ({ label, submitLoader = false, submit = true, Icon }) => {
  return (
    <>
      <Button
        disabled={submitLoader}
        type={submit ? 'submit' : 'button'}
        variant="contained"
        sx={{
          boxShadow: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          '&:hover': { boxShadow: 'none' },
        }}
      >
        {label}
        {submitLoader ? <CircularProgress size={20} /> : <Icon size={20} />}
      </Button>
    </>
  );
};
export default FormBtn;
