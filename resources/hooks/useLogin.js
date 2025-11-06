import axios from 'axios';
import { apiUrl } from '../js/App';
import { useStore } from '../js/useStore';

export const useLogin = () => {
  const { setUser } = useStore();

  const login = (data) => {
    return axios
      .post(`${apiUrl}/user/login`, {
        ...data,
      })
      .then((response) => {
        if (response.data.user) {
          setUser(response.data.user);
        }

        return { success: true, data: response.data };
      })
      .catch((error) => {
        const serverData = error?.response?.data || {};

        return { success: false, errors: serverData };
      });
  };

  return {
    login,
  };
};
