import axios from 'axios';
import { useEffect, useState } from 'react';
import { apiUrl } from '../js/App';

export const useGetCompany = () => {
  const [company, setCompany] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const companySlug = window.location.pathname.split('/')[1];

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${apiUrl}/${companySlug}/show`)
      .then((response) => {
        setCompany(response.data.company);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return {
    company,
    isLoading,
  };
};
