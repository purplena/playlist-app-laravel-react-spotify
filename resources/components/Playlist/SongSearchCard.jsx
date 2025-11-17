import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import { Box, Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useSongAdd } from '../../hooks/useSongAdd';
import { useStore } from '../../js/useStore';
import { useNavigate } from 'react-router-dom';
import SongTrancatedComponent from './SongTrancatedComponent';

export default function SongSearchCard({ song, setOpen, setModalMessage, setModalHeader, setModalRedirect }) {
  const { user, company } = useStore();
  const navigate = useNavigate();
  const { addSong, isAdded } = useSongAdd(song);

  const handleSongAdd = async () => {
    if (!user) {
      navigate(`/${company.slug}/login`);
    }
    const response = await addSong();
    
    if(response.status === 'added') {
      setModalHeader('BRAVO!');
      setModalMessage(response.message);
      setOpen(true);
      setModalRedirect('song_list');
    } 
    else if (response.status === 'deleted') {
      setModalHeader("C'EST FAIT!");
      setModalMessage(response.message);
      setOpen(true);
      setModalRedirect('song_list');
    }
    else if (response.error) {
      setModalHeader('Oooooups!');
      setModalMessage(response.message);
      setOpen(true);
      setModalRedirect('song_list');
    }    
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
              <SongTrancatedComponent song={song.song_data.song_name} maxNameLength='20' variant='body2' />
              <SongTrancatedComponent song={song.song_data.artist_name} maxNameLength='20' variant='body2' />
            <Box onClick={handleSongAdd}>
              {isAdded ? <PlaylistAddCheckIcon /> : <PlaylistAddIcon />}
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}
