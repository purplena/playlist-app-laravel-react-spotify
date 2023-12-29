import { useState, useEffect } from 'react';
import { apiUrl } from '../js/App';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDebounce } from '@uidotdev/usehooks';

export const useSearchSong = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { id } = useParams();

  const handleInput = (e) => {
    setSearchResults([]);
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const handleSearch = async () => {
      setIsLoading(true);
      if (debouncedSearchTerm) {
        const response = await axios.get(`${apiUrl}/${id}/songs/search`, {
          params: {
            q: searchTerm,
          },
        });
        const data = response.data;
        setSearchResults(data);
      }
      setIsLoading(false);
    };
    handleSearch();
  }, [debouncedSearchTerm]);

  return { isLoading, searchResults, handleInput };
};
