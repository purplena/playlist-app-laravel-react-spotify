import React, { useEffect, useState } from "react";
import { apiUrl } from "../js/App";
import { Grid } from "@mui/material";
import ManagerSongCard from "../components/Playlist/ManagerSongCard";

const CompanyBlacklist = () => {
    const [blacklistedSongs, setBlacklistedSongs] = useState([]);

    useEffect(() => {
        getBlacklistedSongs();
    }, []);

    const getBlacklistedSongs = () => {
        axios
            .get(`${apiUrl}/manager/blacklist`)
            .then((response) => {
                setBlacklistedSongs(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleDelete = (id) => {
        setBlacklistedSongs((prevSongs) =>
            prevSongs.filter((song) => song.id !== id)
        );
    };

    return (
        <>
            <Grid container gap={3} mt={6} justifyContent="start">
                {blacklistedSongs.map((blacklistedSong, index) => {
                    return (
                        <ManagerSongCard
                            key={blacklistedSong.id}
                            title={blacklistedSong.song_data.song_name}
                            artist={blacklistedSong.song_data.artist_name}
                            index={index}
                            id={blacklistedSong.id}
                            onDelete={handleDelete}
                        />
                    );
                })}
            </Grid>
        </>
    );
};
export default CompanyBlacklist;
