import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import { Box } from "@mui/material";
import { useNavigate } from "react-router";
import { apiUrl } from "../../js/App";
import { useParams } from "react-router-dom";

export default function SongSearchCard({ song, user }) {
    let navigate = useNavigate();
    const { id } = useParams();
    const [isAdded, setIsAdded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const intialStateIsAdded = isAdded;
    const spotifyId = song.spotify_id;

    const handleSongAdd = () => {
        if (!user) {
            navigate("/login");
        }
        console.log(song);
        if (isLoading) return;
        setIsLoading(true);

        axios
            .post(`${apiUrl}/${id}/songs/${spotifyId}/store`, [
                {
                    spotifyId: spotifyId,
                },
            ])
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                setIsAdded(intialStateIsAdded);
            })
            .finally(() => setIsLoading(false));

        setIsAdded(!isAdded);
    };

    return (
        <Card sx={{ maxWidth: 150 }}>
            <CardMedia
                component="img"
                alt={song.song_data.artist_name}
                height="140"
                image={song.song_data.album_cover_img}
            />
            <CardContent>
                <Typography gutterBottom variant="body1" component="h2" noWrap>
                    {song.song_data.song_name}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                    {song.song_data.artist_name}
                </Typography>
                <Box onClick={handleSongAdd}>
                    {isAdded ? <PlaylistAddCheckIcon /> : <PlaylistAddIcon />}
                </Box>
            </CardContent>
        </Card>
    );
}
