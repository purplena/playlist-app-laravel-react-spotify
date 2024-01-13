import React from 'react';
import { Box } from '@mui/material';

const ImageComponent = ({ src, alt, ...props }) => {
  return <Box {...props} component="img" alt={alt} src={src} />;
};
export default ImageComponent;
