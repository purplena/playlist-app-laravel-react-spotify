import axios from 'axios';
import { useEffect, useState } from 'react';
import { apiUrl } from '../js/App';
import { useParams } from 'react-router-dom';
import { useStore } from '../js/useStore';

export const useGetCompany = () => {
  const { companySlug } = useParams();
  const { company, setCompany } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState(null);

  useEffect(() => {
    if (!companySlug) {
      setCompany(null);
      setIsLoading(false);

      return;
    }
    setIsLoading(true);
    axios
      .get(`${apiUrl}/${companySlug}/show`)
      .then((response) => {
        setCompany(response.data.company);
      })
      .catch((error) => {
        setErrorStatus(error.response.status);
      })
      .finally(() => setIsLoading(false));
  }, [companySlug]);

  return {
    company,
    isLoading,
    errorStatus,
  };
};
