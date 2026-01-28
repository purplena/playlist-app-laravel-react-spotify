import { useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../js/App';
import { useStore } from '../js/useStore';

export const useSongRequestHandler = (song) => {
  const intialStateIsAdded = song.is_requested;
  const [isAdded, setIsAdded] = useState(intialStateIsAdded);
  const [isLoading, setIsLoading] = useState(false);

  const spotifyId = song.spotify_id;
  const { company } = useStore();

  const addSong = () => {
    if (isLoading) return;
    setIsLoading(true);
    setIsAdded(true);
    return axios
      .post(`${apiUrl}/${company.slug}/songs`, { spotifyId })
      .then((response) => {
        return {
          status: response.data.status,
          message: response.data.message,
        };
      })
      .catch((error) => {
        setIsAdded(false);
        return {
          error: true,
          message: error?.response?.data?.errors?.message || error.response.data.message,
        };
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteSong = () => {
    if (isLoading) return;
    setIsLoading(true);
    setIsAdded(false);
    return axios
      .delete(`${apiUrl}/${company.slug}/songs/${spotifyId}`)
      .then((response) => {
        return {
          status: response.data.status,
          message: response.data.message,
        };
      })
      .catch((error) => {
        setIsAdded(true);
        return {
          error: true,
          message: error?.response?.data?.errors?.message || error.response.data.message,
        };
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    addSong,
    deleteSong,
    isAdded,
    isLoading,
  };
};
