import { apiUrl } from '../js/App';
import { useState } from 'react';
import axios from 'axios';
import { useStore } from '../js/useStore';

export const useLogin = () => {
  const { setUser } = useStore();
  const [errors, setErrors] = useState(null);

  const login = (email, password) => {
    return axios
      .post(`${apiUrl}/user/login`, {
        email,
        password,
      })
      .then((response) => {
        if (response.data.user) {
          setUser(response.data.user);
        }

        return response;
      })
      .catch((error) => {
        if (!error.response?.data?.status) {
          setErrors({
            loginError: [error.response.data.message],
          });
        }
        if (error.response.data.email || error.response.data.password) {
          setErrors(error.response.data);
        }

        return error.response;
      });
  };

  return {
    login,
    errors,
  };
};
