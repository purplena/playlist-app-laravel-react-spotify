import React from "react";
import { Paper, Stack, Typography } from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
// import ThumbUpIcon from "@mui/icons-material/ThumbUp";

const PlaylistCard = ({ requestedSong, index }) => {
    console.log(requestedSong);

    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            padding={2}
            sx={{ border: "1px solid black" }}
        >
            <Typography variant="body2">#{index + 1}</Typography>
            <Stack direction="row" spacing={2}>
                <Paper
                    elevation={0}
                    sx={{ borderRadius: "50%", width: "30px", height: "30px" }}
                />
                <Stack direction="column">
                    <Typography variant="body1" fontWeight="bold">
                        Titre: {requestedSong.song.song_data.song_name}
                    </Typography>
                    <Typography variant="body1">
                        Artiste: {requestedSong.song.song_data.artist_name}
                    </Typography>
                </Stack>
            </Stack>
            <Stack
                direction="row"
                spacing={2}
                justifyContent="space-between"
                alignItems="center"
            >
                <Typography variant="body2">
                    {requestedSong.upvotes.length} likes
                </Typography>
                <ThumbUpOutlinedIcon />
            </Stack>
        </Stack>
    );
};
export default PlaylistCard;
