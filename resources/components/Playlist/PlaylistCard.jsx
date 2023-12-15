import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Box, Paper, Stack, Typography } from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { apiUrl } from "../../js/App";
import { useParams } from "react-router-dom";

const PlaylistCard = ({ requestedSong, index, user }) => {
    let navigate = useNavigate();
    const [likes, setLikes] = useState(requestedSong.upvotes_count);
    const [isUpvoted, setIsUpvoted] = useState(requestedSong.is_upvoted_by);
    const requestedSongId = requestedSong.id;
    const { id } = useParams();

    const handleUpvote = () => {
        if (!user) {
            navigate("/login");
        }

        axios
            .post(`${apiUrl}/${id}/songs/${requestedSongId}/upvote`)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });

        setIsUpvoted(!isUpvoted);
        isUpvoted ? setLikes(likes - 1) : setLikes(likes + 1);
    };

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
                <Typography variant="body2">{likes} likes</Typography>
                <Box onClick={handleUpvote}>
                    {isUpvoted ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                </Box>
            </Stack>
        </Stack>
    );
};
export default PlaylistCard;
