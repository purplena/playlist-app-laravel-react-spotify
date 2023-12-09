import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../js/App";
import { useParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { Grid, Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import SongSearchCard from "../components/SongSearchCard";
import { useDebounce } from "@uidotdev/usehooks";

function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const { id } = useParams();

    // const handleSearch = async () => {
    //     setIsLoading(true);
    //     const response = await axios.get(`${apiUrl}/${id}/songs/search`, {
    //         params: {
    //             q: searchTerm,
    //         },
    //     });
    //     const data = response.data;
    //     setSearchResults(data);
    //     setIsLoading(false);
    // };

    // useEffect(() => {
    //     setSearchTerm("");
    // }, [searchResults]);

    const handleInput = (e) => {
        setSearchResults([]);
        setSearchTerm(e.target.value);
    };

    useEffect(() => {
        const handleSearch = async () => {
            setIsLoading(true);
            if (debouncedSearchTerm) {
                const response = await axios.get(
                    `${apiUrl}/${id}/songs/search`,
                    {
                        params: {
                            q: searchTerm,
                        },
                    }
                );
                const data = response.data;
                setSearchResults(data);
            }
            setIsLoading(false);
        };
        handleSearch();
    }, [debouncedSearchTerm]);

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
                                <Grid item xs={6} key={song.id}>
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
