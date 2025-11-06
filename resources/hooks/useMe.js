import { useEffect, useState } from 'react';
import axios from 'axios';
import { apiUrl } from '../js/App';
import { useStore } from '../js/useStore';

export const useMe = () => {
  const { setUser, user } = useStore();
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
