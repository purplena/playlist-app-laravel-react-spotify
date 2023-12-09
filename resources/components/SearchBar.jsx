import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export default function SearchBar({ handleInput, isLoading }) {
    return (
        <Paper
            sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                maxWidth: 500,
            }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Taper votre chanson"
                onChange={handleInput}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                {isLoading ? <MoreHorizIcon /> : <SearchIcon />}
            </IconButton>
        </Paper>
    );
}
