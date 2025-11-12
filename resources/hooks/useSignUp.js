import axios from 'axios';
import { apiUrl } from '../js/App';
import { useStore } from '../js/useStore';

export const useSignUp = () => {
  const { setUser } = useStore();

  const signup = (data) => {
    return axios
      .post(`${apiUrl}/user/register`, {
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
    signup,
  };
};
