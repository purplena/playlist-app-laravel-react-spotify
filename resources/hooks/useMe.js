import { useUserStore } from '../js/useUserStore';
import { apiUrl } from '../js/App';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const useMe = () => {
  const { setUser, user } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${apiUrl}/user/me`)
      .then((response) => {
        setUser(response.data.user);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return {
    isLoading,
    user,
  };
};
