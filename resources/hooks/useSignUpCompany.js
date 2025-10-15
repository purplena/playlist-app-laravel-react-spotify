import { apiUrl } from '../js/App';
import axios from 'axios';
import { useState } from 'react';
import { useStore } from '../js/useStore';

export const actionController = {
  storeCompany: 1,
  editCompany: 2,
};

export const useSignUpCompany = ({ action }) => {
  const { setUser } = useStore();
  const [errors, setErrors] = useState(null);

  const signup = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key]) formData.append(key, data[key]);
    });

    const endpoint =
      action === actionController.storeCompany
        ? 'manager/register'
        : 'manager/update';

    return axios
      .post(`${apiUrl}/${endpoint}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        if (response.data.user) {
          setUser(response.data.user);
        }

        return response;
      })
      .catch((error) => {
        if (error.response?.data?.errors) {
          setErrors(error.response.data.errors);
        }
      });
  };

  return {
    signup,
    errors,
  };
};
