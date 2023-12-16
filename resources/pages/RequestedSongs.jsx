import { Button, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { generatePath, useParams } from "react-router-dom";
import PlaylistCard from "../components/Playlist/PlaylistCard";
import { useUserStore } from "../js/useUserStore";
import { apiUrl } from "../js/App";

const RequestedSongs = () => {
    const [requestedSongs, setRequestedSongs] = useState([]);
    const { id } = useParams();
    const { user } = useUserStore();

    useEffect(() => {
        getSongs();
    }, []);

    const getSongs = () => {
        axios
            .get(`${apiUrl}/${id}/songs`)
            .then((response) => {
                setRequestedSongs(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <Typography variant="h4" component="h1" textAlign="center">
                Créer de l’ambiance musicale
            </Typography>
            <Typography variant="body1" textAlign="center" mt={2}>
                Chaque jour, nous sélectionnons les 10 chansons les plus votées
                pour les ajouter à notre playlist
            </Typography>
            <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                alignItems="center"
                mt={4}
            >
                <Typography variant="subtitle2" textAlign={"center"} mt={21}>
                    Voulez-vous suggérer une chanson?
                </Typography>
                <Button
                    variant="contained"
                    disableElevation
                    size="small"
                    href={generatePath("/:id/songs/search", { id: 1 })}
                    sx={{ textTransform: "uppercase" }}
                >
                    suggérer
                </Button>
            </Stack>
            <Grid
                container
                gap={3}
                mt={6}
                justifyContent="center"
                flexBasis="flex-start"
            >
                {requestedSongs.map((requestedSong, index) => {
                    return (
                        <PlaylistCard
                            user={user}
                            key={requestedSong.id}
                            requestedSong={requestedSong}
                            index={index}
                        />
                    );
                })}
            </Grid>
        </>
    );
};

export default RequestedSongs;
