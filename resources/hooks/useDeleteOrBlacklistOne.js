import axios from 'axios';

export const useDeleteOrBlacklistOne = (
  uri,
  setOpen,
  onClick = '',
  item = ''
) => {
  const deleteOrBlacklist = () => {
    axios
      .post(uri)
      .then(() => {
        onClick(item.id);
        setOpen(false);
      })
      .catch(() => {});
  };

  return {
    deleteOrBlacklist,
  };
};
