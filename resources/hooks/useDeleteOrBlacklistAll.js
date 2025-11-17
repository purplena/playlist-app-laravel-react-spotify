import axios from 'axios';
import { apiUrl as baseUrl } from '../js/App';

export const actions = {
  storeAllInBlacklist: 1,
  destroyAllRequestedSongs: 2,
  destroyAllBlacklist: 3,
};

export const useDeleteOrBlacklistAll = ({ action }) => {
  const deleteOrBlacklistAll = () => {
    const apiCallProps = (function () {
      switch (action) {
        case actions.storeAllInBlacklist:
          return {
            method: axios.post,
            endpoint: 'manager/blacklist/store',
          };
        case actions.destroyAllRequestedSongs:
          return {
            method: axios.delete,
            endpoint: 'manager/songs/destroy',
          };
        case actions.destroyAllBlacklist:
          return {
            method: axios.delete,
            endpoint: 'manager/blacklist/destroy',
          };
      }
    })();

    return apiCallProps
      .method(`${baseUrl}/${apiCallProps.endpoint}`)
      .then((response) => {
        return { status: response.data.status };
      })
      .catch((error) => {
        const serverData = error?.response?.data || {};

        return { success: false, errors: serverData };
      });
  };

  return {
    deleteOrBlacklistAll,
  };
};
