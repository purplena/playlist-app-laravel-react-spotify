import axios from 'axios';
import { apiUrl } from '../js/App';
import { useStore } from '../js/useStore';

export const useLogout = () => {
  const { user, setUser } = useStore();

  const handleLogout = async () => {
    return axios
      .post(`${apiUrl}/user/logout`)
      .then((response) => {
        setUser(null);

        return response;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { user, logout: handleLogout };
};
