import { useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../js/App';
import { useStore } from '../js/useStore';

export const useSongAdd = (song) => {
  const intialStateIsAdded = song.is_requested;
  const [isAdded, setIsAdded] = useState(intialStateIsAdded);
  const [isLoading, setIsLoading] = useState(false);

  const spotifyId = song.spotify_id;
  const { company } = useStore();

  const addSong = () => {
    if (isLoading) return;
    setIsLoading(true);
    setIsAdded(!isAdded);
    return axios
      .post(`${apiUrl}/${company.slug}/songs/${spotifyId}/store`, [{ spotifyId }])
      .then((response) => {
        return {
          status: response.data.status,
          message: response.data.message,
        };
      })
      .catch((error) => {
        setIsAdded(intialStateIsAdded);
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
    isAdded,
  };
};
