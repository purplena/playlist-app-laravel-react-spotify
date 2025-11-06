import { apiUrl } from '../js/App';
import axios from 'axios';
import { useStore } from '../js/useStore';

export const actionController = {
  storeCompany: 'create',
  editCompany: 'edit',
};

export const useSignUpCompany = ({ action }) => {
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
