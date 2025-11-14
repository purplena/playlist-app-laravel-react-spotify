import axios from 'axios';
import { apiUrl } from '../js/App';
import { useStore } from '../js/useStore';

export const useGetRequestedSongs = () => {
  const { user, company } = useStore();

  const endpoint = user?.company ? user.company.slug : company.slug;

  const getSongs = () => {
    return axios
      .get(`${apiUrl}/${endpoint}/songs`)
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
