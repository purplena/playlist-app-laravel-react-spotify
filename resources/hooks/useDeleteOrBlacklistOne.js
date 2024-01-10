import axios from 'axios';
import { apiUrl as baseUrl } from '../js/App';

export const actions = {
  storeBlacklist: 1,
  destroyBlacklist: 2,
  destroyRequestedSong: 3,
};

export const useDeleteOrBlacklistOne = ({
  action,
  setOpen,
  onClick,
  itemId,
}) => {
  const deleteOrBlacklist = () => {
    const endpoint = (function () {
      switch (action) {
        case actions.storeBlacklist:
          return `manager/blacklist/store/${itemId}`;
        case actions.destroyBlacklist:
          return `manager/blacklist/destroy/${itemId}`;
        case actions.destroyRequestedSong:
          return `manager/songs/destroy/${itemId}`;
      }
    })();

    axios
      .post(`${baseUrl}/${endpoint}`)
      .then(() => {
        onClick(itemId);
        setOpen(false);
      })
      .catch(() => {});
  };

  return {
    deleteOrBlacklist,
  };
};
