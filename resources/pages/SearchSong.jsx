import React, { useState } from "react";
import { useSearchSong } from "../hooks/useSearchSong";
import SearchBar from "../components/Form/SearchBar";
import { Grid, Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import SongSearchCard from "../components/Playlist/SongSearchCard";
import { useUserStore } from "../js/useUserStore";
import ModalWindow from "../components/Layout/ModalWindow";

function Search() {
    const { isLoading, searchResults, handleInput } = useSearchSong();
    const { user } = useUserStore();
    const [open, setOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalHeader, setModalHeader] = useState("");

    return (
        <>
            <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                <SearchBar isLoading={isLoading} handleInput={handleInput} />

                {isLoading && <CircularProgress />}
                {searchResults && (
                    <Grid container spacing={3}>
                        {searchResults.map((song) => {
                            return (
                                <Grid item xs={6} key={song.spotify_id}>
                                    <SongSearchCard
                                        song={song}
                                        user={user}
                                        setOpen={setOpen}
                                        setModalMessage={setModalMessage}
                                        setModalHeader={setModalHeader}
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                )}
            </Stack>
            <ModalWindow
                open={open}
                setOpen={setOpen}
                modalMessage={modalMessage}
                modalHeader={modalHeader}
            />
        </>
    );
}

export default Search;
