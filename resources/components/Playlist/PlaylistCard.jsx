import React from "react";
import { Box, Paper, Stack, Typography, Grid } from "@mui/material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useUpvote } from "../../hooks/useUpvote";
import { useUserStore } from "../../js/useUserStore";

const PlaylistCard = ({ requestedSong, index }) => {
    const { user } = useUserStore();
    const { upvote, isUpvoted, likes } = useUpvote(requestedSong, user);
    const handleUpvote = () => {
        upvote();
    };

    return (
        <Paper
            sx={{
                width: 300,
                p: 2,
            }}
        >
            <Grid container spacing={2}>
                <Grid item>
                    <Paper
                        elevation={0}
                        sx={{
                            borderRadius: "50%",
                            width: "50px",
                            height: "50px",
                            background: "#1769aa",
                        }}
                    />
                </Grid>
                <Grid item xs container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography
                                gutterBottom
                                variant="subtitle1"
                                component="div"
                            >
                                #{index + 1}
                            </Typography>
                            <Typography
                                sx={{
                                    width: 186,
                                }}
                                variant="body2"
                                gutterBottom
                                noWrap
                            >
                                Titre:{" "}
                                <Box component="span" fontWeight="700">
                                    {requestedSong.song.song_data.song_name}
                                </Box>
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    width: 186,
                                }}
                                noWrap
                            >
                                Artiste:{" "}
                                <Box component="span" fontWeight="700">
                                    {requestedSong.song.song_data.artist_name}
                                </Box>
                            </Typography>
                        </Grid>
                        <Stack
                            direction="row"
                            pl={2}
                            mt={2}
                            spacing={4}
                            alignItems="center"
                        >
                            <Typography variant="body2">
                                {likes} {likes == 1 ? " like" : " likes"}
                            </Typography>

                            <Typography
                                sx={{ cursor: "pointer" }}
                                variant="body2"
                                onClick={handleUpvote}
                            >
                                {isUpvoted ? (
                                    <ThumbUpIcon />
                                ) : (
                                    <ThumbUpOutlinedIcon />
                                )}
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};
export default PlaylistCard;
