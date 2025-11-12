import { useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../js/App';
import { useStore } from '../js/useStore';

export const useGetRequestedSongs = (setIsLoading) => {
  const [requestedSongs, setRequestedSongs] = useState([]);
  const [serverErrorMessage, setServerErrorMessage] = useState('');
  // const { id } = useParams();
  const { user, company } = useStore();
  let endpoint = '';

  if (!user) {
    endpoint = `${apiUrl}/${company.slug}/songs`;
  } else {
    if (user.company) {
      endpoint = `${apiUrl}/${user.company.slug}/songs`;
    } else {
      endpoint = `${apiUrl}/${company.slug}/songs`;
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
