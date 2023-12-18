import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import { Box } from "@mui/material";
import { useSongAdd } from "../../hooks/useSongAdd";

export default function SongSearchCard({
    song,
    user,
    setOpen,
    setModalMessage,
    setModalHeader,
}) {
    const { addSong, isAdded } = useSongAdd(
        song,
        user,
        setOpen,
        setModalMessage,
        setModalHeader
    );
    const handleSongAdd = () => {
        addSong();
    };

    return (
        <>
            <Card sx={{ maxWidth: 150 }}>
                <CardMedia
                    component="img"
                    alt={song.song_data.artist_name}
                    height="140"
                    image={song.song_data.album_cover_img}
                />
                <CardContent>
                    <Typography
                        gutterBottom
                        variant="body1"
                        component="h2"
                        noWrap
                    >
                        {song.song_data.song_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                        {song.song_data.artist_name}
                    </Typography>
                    <Box onClick={handleSongAdd}>
                        {isAdded ? (
                            <PlaylistAddCheckIcon />
                        ) : (
                            <PlaylistAddIcon />
                        )}
                    </Box>
                </CardContent>
            </Card>
        </>
    );
}
