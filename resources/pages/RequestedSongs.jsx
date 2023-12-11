import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { generatePath, useParams } from "react-router-dom";
import PlaylistCard from "../components/Playlist/PlaylistCard";
import { apiUrl } from "../js/App";

const RequestedSongs = () => {
    const [requestedSongs, setRequestedSongs] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetch(`${apiUrl}/${id}/songs`)
            .then((res) => res.json())
            .then((data) => {
                setRequestedSongs(data.data);
            });
    }, [id]);

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
            <Stack
                direction="column"
                spacing={3}
                justifyContent="center"
                mt={6}
            >
                {requestedSongs.map((requestedSong, index) => {
                    return (
                        <PlaylistCard
                            key={requestedSong.id}
                            requestedSong={requestedSong}
                            index={index}
                        />
                    );
                })}
            </Stack>
        </>
    );
};
export default RequestedSongs;
