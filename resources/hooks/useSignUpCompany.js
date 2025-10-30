import { apiUrl } from '../js/App';
import axios from 'axios';
import { useStore } from '../js/useStore';

export const actionController = {
  storeCompany: 'create',
  editCompany: 'edit',
};

export const useSignUpCompany = ({ action, setError }) => {
  const { setUser } = useStore();

  const signup = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key]) formData.append(key, data[key]);
    });

    const requestParams = {
      endpoint:
        action === actionController.storeCompany
          ? 'manager/register'
          : 'manager/update',
      method: axios.post,
    };

    if (action === actionController.editCompany) {
      formData.append('_method', 'put');
    }

    return requestParams
      .method(`${apiUrl}/${requestParams.endpoint}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => {
        if (response.data.user) {
          setUser(response.data.user);
        }

        return response;
      })
      .catch((error) => {
        if (error.response?.data?.errors) {
          const serverErrors = error.response.data.errors;

          Object.entries(serverErrors).forEach(([field, messages]) => {
            setError(field, {
              type: 'server',
              message: Array.isArray(messages) ? messages[0] : messages,
            });
          });
        }

        return error;
      });
  };

  return {
    signup,
  };
};
