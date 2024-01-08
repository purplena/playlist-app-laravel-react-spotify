import { apiUrl } from '../js/App';
import axios from 'axios';
import { useUserStore } from '../js/useUserStore';
import { useState } from 'react';

export const useSignUpCompany = () => {
  const { setUser } = useUserStore();
  const [errors, setErrors] = useState(null);

  const signup = (data) => {
    return new Promise((resolve, reject) => {
      axios.get('/sanctum/csrf-cookie').then(() => {
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
          formData.append(key, data[key]);
        });

        return axios
          .post(`${apiUrl}/manager/register`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
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
    });
  };

  return {
    signup,
    errors,
  };
};
