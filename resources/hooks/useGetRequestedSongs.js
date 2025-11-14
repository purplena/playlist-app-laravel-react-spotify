import axios from 'axios';
import { apiUrl } from '../js/App';
import { useStore } from '../js/useStore';

export const useGetRequestedSongs = () => {
  const { company } = useStore();

  const getSongs = () => {
    return axios
      .get(`${apiUrl}/${company.slug}/songs`)
      .then((response) => {
        return { data: response.data.data };
      })
      .catch((error) => {
        return {
          error: error.response.data.error,
          message: error?.response?.data?.message,
        };
      });
  };

  return {
    getSongs,
  };
};
