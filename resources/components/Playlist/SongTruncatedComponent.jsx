import { Box, Typography } from "@mui/material";

const SongTruncatedComponent = ({song, label, maxNameLength, variant='body1', ...props}) => {
  const MAX_SONG_NAME_LENGTH = maxNameLength;
  const truncatedSongName =
    song.length <= MAX_SONG_NAME_LENGTH ? song : `${song.substring(0, MAX_SONG_NAME_LENGTH)}...`;

  return (
      <Typography {...props} gutterBottom variant={variant} component="p" noWrap>
        {' '}
        {label && `${label}: `}
        <Box component="span" fontWeight="700">
          {truncatedSongName}
        </Box>
      </Typography>
  );
}
export default SongTruncatedComponent
