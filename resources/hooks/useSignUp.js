import { apiUrl } from '../js/App';
import axios from 'axios';
import { useUserStore } from '../js/useUserStore';
import { useState } from 'react';

export const useSignUp = () => {
  const { setUser } = useUserStore();
  const [errors, setErrors] = useState(null);

  const signup = async (email, password, username) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${apiUrl}/user/register`, {
          email,
          password,
          username,
        })
        .then((response) => {
          if (response.data.user) {
            alert('New user is registered');
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
  };

  return {
    signup,
    errors,
  };
};
