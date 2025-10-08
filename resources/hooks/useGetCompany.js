import axios from 'axios';
import { useEffect, useState } from 'react';
import { apiUrl } from '../js/App';
import { useParams } from 'react-router-dom';

export const useGetCompany = () => {
  const [company, setCompany] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState(null);
  const { companySlug } = useParams();


  useEffect(() => {
    if (companySlug) {
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
    }
  }, [companySlug]);

  return {
    company,
    isLoading,
    errorStatus
  };
};
