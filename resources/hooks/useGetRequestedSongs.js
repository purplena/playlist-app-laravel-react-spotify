import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../js/App';
import { useStore } from '../js/useStore';

export const useGetRequestedSongs = (setIsLoading) => {
  const [requestedSongs, setRequestedSongs] = useState([]);
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  const { id } = useParams();
  const { user } = useStore();
  let endpoint = '';

  if (!user) {
    endpoint = `${apiUrl}/${id}/songs`;
  } else {
    if (user.company) {
      endpoint = `${apiUrl}/${user.company.slug}/songs`;
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
