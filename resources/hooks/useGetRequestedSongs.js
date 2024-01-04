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
  let endpoint = '';

  if (!user) {
    endpoint = `${apiUrl}/${id}/songs`;
  } else {
    if (user.company) {
      endpoint = `${apiUrl}/${user.company.id}/songs`;
    } else {
      endpoint = `${apiUrl}/${id}/songs`;
    }
  }

  const getSongs = () => {
    axios
      .get(endpoint)
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
