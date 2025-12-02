import axios from 'axios';
import { apiUrl } from '../js/App';

export const useGetBlacklistedSongs = () => {
  const getBlacklistedSongsByCompany = () => {
    return axios
      .get(`${apiUrl}/manager/blacklist`)
      .then((response) => {
        return { data: response.data.data };
      })
      .catch((error) => {
        const serverData = error?.response?.data || {};

        return { success: false, errors: serverData };
      });
  };

  return {
    getBlacklistedSongsByCompany,
  };
};
