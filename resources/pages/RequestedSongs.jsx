import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaylistCard from "../components/PlaylistCard";

const RequestedSongs = () => {
    const [requestedSongs, setRequestedSongs] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://playlist-app.localhost/api/companies/${id}/songs`)
            .then((res) => res.json())
            .then((data) => {
                setRequestedSongs(data.data);
            });
    }, [id]);

    console.log(requestedSongs);

    return (
        <>
            <Typography variant="h4" component="h1" textAlign="center">
                Créer de l’ambiance musicale
            </Typography>
            <Typography variant="body1" textAlign="center" marginTop={"1rem"}>
                Chaque jour, nous sélectionnons les 10 chansons les plus votées
                pour les ajouter à notre playlist
            </Typography>
            <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                alignItems="center"
                marginTop={"2rem"}
            >
                <Typography
                    variant="subtitle2"
                    textAlign={"center"}
                    marginTop={"16px"}
                >
                    Voulez-vous suggérer une chanson?
                </Typography>
                <Button
                    variant="contained"
                    disableElevation
                    size="small"
                    href="#"
                    sx={{ textTransform: "uppercase" }}
                >
                    suggérer
                </Button>
            </Stack>
            <Stack
                direction="column"
                spacing={3}
                justifyContent="center"
                mt={"3rem"}
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
