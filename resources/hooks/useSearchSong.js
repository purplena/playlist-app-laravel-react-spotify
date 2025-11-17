import { useEffect, useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import axios from 'axios';
import { apiUrl } from '../js/App';
import { useStore } from '../js/useStore';

export const useSearchSong = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { company } = useStore();

  const handleInput = (e) => {
    setSearchResults([]);
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const handleSearch = async () => {
      setIsLoading(true);
      if (debouncedSearchTerm) {
        const response = await axios.get(`${apiUrl}/${company.slug}/songs/search`, {
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
