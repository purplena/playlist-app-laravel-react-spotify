import axios from 'axios';

export const useDeleteOrBlacklistAll = (uri, setOpen, setRequestedSongs) => {
  const deleteOrBlacklistAll = () => {
    axios
      .post(uri)
      .then(() => {
        setRequestedSongs([]);
        setOpen(false);
      })
      .catch(() => {});
  };

  return {
    deleteOrBlacklistAll,
  };
};
