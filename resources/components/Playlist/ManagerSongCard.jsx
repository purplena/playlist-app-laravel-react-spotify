import React from "react";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { apiUrl } from "../../js/App";

const ManagerSongCard = ({ index, title, artist, id, onDelete }) => {
    const handleDelete = () => {
        axios
            .post(`${apiUrl}/manager/blacklist/delete/${id}`)
            .then((response) => {
                onDelete(id);
            })
            .catch((error) => {
                console.log(error);
            });
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
                                    {title}
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
                                    {artist}
                                </Box>
                            </Typography>
                        </Grid>
                        <Stack
                            direction="row"
                            pl={2}
                            mt={2}
                            spacing={4}
                            alignItems="center"
                            justifyContent="end"
                        >
                            <DeleteIcon onClick={handleDelete} />
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};
export default ManagerSongCard;
