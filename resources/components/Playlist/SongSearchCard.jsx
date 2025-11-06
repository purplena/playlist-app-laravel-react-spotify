import React from 'react';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { Box, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useSongAdd } from '../../hooks/useSongAdd';

export default function SongSearchCard({ song, setOpen, setModalMessage, setModalHeader }) {
  const { addSong, isAdded } = useSongAdd(song, setOpen, setModalMessage, setModalHeader);
  const handleSongAdd = () => {
    addSong();
  };

  return (
    <>
      <Grid item xxs={12} xs={6} sm={4}>
        <Card>
          <CardMedia
            component="img"
            alt={song.song_data.artist_name}
            height="140"
            image={song.song_data.album_cover_img}
          />
          <CardContent>
            <Typography gutterBottom variant="body1" component="h2" noWrap>
              <SongTrancatedComponent song={song.song_data.song_name} />
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              <SongTrancatedComponent song={song.song_data.artist_name} />
            </Typography>
            <Box onClick={handleSongAdd}>
              {isAdded ? <PlaylistAddCheckIcon /> : <PlaylistAddIcon />}
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

function SongTrancatedComponent({ song }) {
  const MAX_SONG_NAME_LENGTH = 20;
  const truncatedSongName =
    song.length <= MAX_SONG_NAME_LENGTH ? song : `${song.substring(0, MAX_SONG_NAME_LENGTH)}...`;

  return (
    <div>
      <Typography gutterBottom variant="body1" component="h2">
        {truncatedSongName}
      </Typography>
    </div>
  );
}
