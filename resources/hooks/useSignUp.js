import { apiUrl } from '../js/App';
import axios from 'axios';

import { useState } from 'react';
import { useStore } from '../js/useStore';

export const useSignUp = () => {
  const { setUser } = useStore();
  const [errors, setErrors] = useState(null);

  const signup = (email, password, username) => {
    return axios
      .post(`${apiUrl}/user/register`, {
        email,
        password,
        username,
      })
      .then((response) => {
        if (response.data.user) {
          setUser(response.data.user);
        }

        return response;
      })
      .catch((error) => {
        if (error.response.data.errors) {
          setErrors(error.response.data.errors);
        }
      });
  };

  return {
    signup,
    errors,
  };
};
