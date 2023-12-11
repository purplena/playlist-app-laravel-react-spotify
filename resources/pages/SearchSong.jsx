import React from "react";
import { useSearchSong } from "../hooks/useSearchSong";
import SearchBar from "../components/Form/SearchBar";
import { Grid, Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import SongSearchCard from "../components/Playlist/SongSearchCard";

function Search() {
    const { isLoading, searchResults, handleInput } = useSearchSong();

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
                                    <SongSearchCard song={song} />
                                </Grid>
                            );
                        })}
                    </Grid>
                )}
            </Stack>
        </>
    );
}

export default Search;
