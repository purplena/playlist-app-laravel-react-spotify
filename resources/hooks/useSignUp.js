import { apiUrl } from '../js/App';
import axios from 'axios';
import { useUserStore } from '../js/useUserStore';
import { useState } from 'react';

export const useSignUp = () => {
  const { setUser } = useUserStore();
  const [errors, setErrors] = useState(null);

  const signup = (email, password, username) => {
    return new Promise((resolve, reject) => {
      axios.get('/sanctum/csrf-cookie').then(() => {
        return axios
          .post(`${apiUrl}/user/register`, {
            email,
            password,
            username,
          })
          .then((response) => {
            if (response.data.user) {
              setUser(response.data.user);
              resolve(response);
            }
          })
          .catch((error) => {
            if (error.response.data.errors) {
              setErrors(error.response.data.errors);
            }
            reject(error);
          });
      });
    });
  };

  return {
    signup,
    errors,
  };
};
