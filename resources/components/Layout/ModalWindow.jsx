import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { generatePath, useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Stack } from '@mui/material';
import LinkButton from '../Button/LinkButton';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
};

export default function ModalWindow({
  modalMessage,
  open,
  setOpen,
  modalHeader,
  user,
  action = '',
  actionHandler = '',
  songClicked = '',
}) {
  const { id } = useParams();

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {modalHeader}
          </Typography>
          <Button
            onClick={() => setOpen(false)}
            sx={{
              justifyContent: 'flex-end',
              backgroundColor: 'transparent',
              ':hover': {
                backgroundColor: 'transparent',
                color: (theme) => theme.palette.primary.dark,
              },
            }}
          >
            <CloseIcon />
          </Button>
        </Stack>

        <Typography
          id="modal-modal-description"
          sx={{ mt: 2, mb: 2, textAlign: 'justify' }}
        >
          {modalMessage}
        </Typography>
        {user.company ? (
          <>
            {songClicked ? (
              <>
                <Typography
                  id="modal-modal-description"
                  sx={{ mb: 2, fontSize: '12px' }}
                >
                  Titre:{' '}
                  <Box component="span" fontWeight="700">
                    {songClicked}
                  </Box>
                </Typography>
              </>
            ) : (
              ''
            )}
            <LinkButton onClick={actionHandler}>{action}</LinkButton>
          </>
        ) : (
          <LinkButton disableElevation to={generatePath('/:id/songs', { id })}>
            {"Chansons d'aujourd'hui"}
          </LinkButton>
        )}
      </Box>
    </Modal>
  );
}
