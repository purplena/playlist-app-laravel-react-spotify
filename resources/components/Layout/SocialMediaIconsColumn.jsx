import React from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Stack } from '@mui/material';
import LoginSocialMediaIButton from '../Button/LoginSocialMediaButton';

const SocialMediaIconsColumn = () => {
  const buttons = [
    {
      icon: <GoogleIcon />,
      mediaName: 'GOOGLE',
    },
    {
      icon: <FacebookIcon />,
      mediaName: 'FACEBOOK',
    },
    {
      icon: <TwitterIcon />,
      mediaName: 'TWITTER',
    },
  ];
  return (
    <Stack direction="column" spacing={2}>
      {buttons.map((button) => {
        return <LoginSocialMediaIButton key={button.mediaName} {...button} />;
      })}
    </Stack>
  );
};
export default SocialMediaIconsColumn;
