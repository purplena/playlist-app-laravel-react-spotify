import React, { useState } from "react";
import axios from "axios";
import { apiUrl } from "../js/App";
import { useParams } from "react-router-dom";

function Search() {
    const [searchTerm, setSearchTerm] = useState("");
    const { id } = useParams();

    const handleSearch = async () => {
        const response = await axios.get(
            `${apiUrl}/companies/${id}/songs/search`,
            {
                params: {
                    q: searchTerm,
                },
            }
        );
        console.log(response.data);
    };

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default Search;
