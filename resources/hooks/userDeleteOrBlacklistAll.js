import axios from 'axios';
import { apiUrl as baseUrl } from '../js/App';

export const actions = {
  storeAllInBlacklist: 1,
  destroyAllRequestedSongs: 2,
  destroyAllBlacklist: 3,
};

export const useDeleteOrBlacklistAll = ({ action, setOpen, setSongs }) => {
  const deleteOrBlacklistAll = () => {
    const endpoint = (function () {
      switch (action) {
        case actions.storeAllInBlacklist:
          return 'manager/blacklist/store';
        case actions.destroyAllRequestedSongs:
          return 'manager/songs/destroy';
        case actions.destroyAllBlacklist:
          return 'manager/blacklist/destroy';
      }
    })();

    axios
      .post(`${baseUrl}/${endpoint}`)
      .then(() => {
        setSongs([]);
        setOpen(false);
      })
      .catch(() => {});
  };

  return {
    deleteOrBlacklistAll,
  };
};
