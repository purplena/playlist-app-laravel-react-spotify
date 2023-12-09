import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function SongSearchCard({ song }) {
    return (
        <Card sx={{ maxWidth: 150 }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image={song.song_data.album_cover_img}
            />
            <CardContent>
                <Typography gutterBottom variant="body1" component="h2">
                    {song.song_data.song_name.length >= 14
                        ? song.song_data.song_name.slice(0, 14) + "..."
                        : song.song_data.song_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {song.song_data.artist_name.length >= 14
                        ? song.song_data.artist_name.slice(0, 14) + "..."
                        : song.song_data.artist_name}
                </Typography>
            </CardContent>
        </Card>
    );
}
