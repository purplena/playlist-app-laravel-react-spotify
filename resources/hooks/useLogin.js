import { useUserStore } from '../js/useUserStore';
import { apiUrl } from '../js/App';
import { useState } from 'react';
import axios from 'axios';

export const useLogin = () => {
  const { setUser } = useUserStore();
  const [errors, setErrors] = useState(null);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      axios.get('/sanctum/csrf-cookie').then(() => {
        return axios
          .post(`${apiUrl}/user/login`, {
            email,
            password,
          })
          .then((response) => {
            console.log(response.data.user);
            if (response.data.user) {
              setUser(response.data.user);
            }
            resolve(response);
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
            reject(error);
          });
      });
    });
  };
  // Which approach you prefer?
  // const login = async (email, password) => {
  //     try {
  //         // make request first to sanctum/csrf-cookie endpoint
  //         // to initialize CSRF protection for the application
  //         await axios.get("/sanctum/csrf-cookie");

  //         const payload = {
  //             email,
  //             password,
  //         };

  //         const response = await axios.post(`${apiUrl}/user/login`, payload, {
  //             headers: { Accept: "application/json" },
  //         });

  //         if (response.data.user) {
  //             setUser(response.data.user);
  //         }
  //         return response;
  //     } catch (error) {
  //         if (!error.response?.data?.status) {
  //             setErrors({
  //                 loginError: [error.response.data.message],
  //             });
  //         }
  //         if (error.response.data.email || error.response.data.password) {
  //             setErrors(error.response.data);
  //         }
  //         throw error;
  //     }
  // };

  return {
    login,
    errors,
  };
};
