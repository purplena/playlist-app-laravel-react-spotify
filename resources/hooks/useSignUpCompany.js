import { apiUrl } from '../js/App';
import axios from 'axios';
import { useUserStore } from '../js/useUserStore';
import { useState } from 'react';

export const actionController = {
  storeCompany: 1,
  editCompany: 2,
};

export const useSignUpCompany = ({ action }) => {
  const { setUser } = useUserStore();
  const [errors, setErrors] = useState(null);

  const signup = (data) => {
    return new Promise((resolve, reject) => {
      axios.get('/sanctum/csrf-cookie').then(() => {
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
          if (data[key]) formData.append(key, data[key]);
        });

        const endpoint = (function () {
          switch (action) {
            case actionController.storeCompany:
              return `manager/register`;
            case actionController.editCompany:
              return `manager/update`;
          }
        })();

        return axios
          .post(`${apiUrl}/${endpoint}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
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
