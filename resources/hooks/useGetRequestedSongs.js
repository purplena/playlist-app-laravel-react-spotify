import { useParams } from 'react-router-dom';
import { apiUrl } from '../js/App';
import { useState } from 'react';
import axios from 'axios';
import { useUserStore } from '../js/useUserStore';

export const useGetRequestedSongs = (setIsLoading) => {
  const [requestedSongs, setRequestedSongs] = useState([]);
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const { id } = useParams();
  const { user } = useUserStore();

  const getSongs = () => {
    axios
      .get(
        user.company
          ? `${apiUrl}/${user.company.id}/songs`
          : `${apiUrl}/${id}/songs`
      )
      .then((response) => {
        setRequestedSongs(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(true);
        setServerErrorMessage(error);
      });
  };

  return {
    getSongs,
    requestedSongs,
    serverErrorMessage,
    setRequestedSongs,
  };
};
