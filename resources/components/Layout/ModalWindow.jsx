import React from 'react';
import { generatePath } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import LinkButton from '../Button/LinkButton';
import { useTranslation } from 'react-i18next';
import { useStore } from '../../js/useStore';

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
  modalRedirect = ''
}) {
  const { company } = useStore();
  const { t } = useTranslation();

  const redirects = {
    'song_list': {
      path: `/${company?.slug}/songs`,
      label: t('buttons.btn_song_list')
    },
    'song_suggest': {
      path: `/${company?.slug}/songs/search`, 
      label: t('buttons.btn_suggest_song')
    }
  }

  const redirectConfig = modalRedirect ? redirects[modalRedirect] : null;

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
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

        <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2, textAlign: 'justify' }}>
          {modalMessage}
        </Typography>
        {user.company ? (
          <>
            {songClicked ? (
              <>
                <Typography id="modal-modal-description" sx={{ mb: 2, fontSize: '12px' }}>
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
          redirectConfig && (
          <LinkButton disableElevation to={generatePath(redirectConfig.path)}>
            {redirectConfig.label}
          </LinkButton>
          )
        )}
      </Box>
    </Modal>
  );
}
