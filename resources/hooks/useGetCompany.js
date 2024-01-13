import axios from 'axios';
import { useEffect, useState } from 'react';
import { apiUrl } from '../js/App';

import { useParams } from 'react-router-dom';
import { useUserStore } from '../js/useUserStore';

export const useGetCompany = () => {
  const [company, setCompany] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUserStore();
  const { id: slug } = useParams();

  const companySlug = slug ?? user?.company?.slug;

  useEffect(() => {
    if (companySlug) {
      setIsLoading(true);
      axios
        .get(`${apiUrl}/${companySlug}/show`)
        .then((response) => {
          setCompany(response.data.company);
        })
        .finally(() => setIsLoading(false));
    }
  }, [companySlug]);

  return {
    company,
    isLoading,
  };
};
