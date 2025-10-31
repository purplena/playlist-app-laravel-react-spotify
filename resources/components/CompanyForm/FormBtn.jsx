import { Button, CircularProgress } from "@mui/material"
import SendIcon from '@mui/icons-material/Send';

const FormBtn = ({label, submitLoader=false}) => {
  return (<>
    <Button
        disabled={submitLoader}
        type="submit"
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
        {submitLoader ? <CircularProgress size={20} /> : <SendIcon size={20} />}
    </Button>
  </>
  )
}
export default FormBtn
