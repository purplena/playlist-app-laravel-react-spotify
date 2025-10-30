import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../js/useStore';

export const useRedirectIfAuthenticated = ({ redirect }) => {
  const { user } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
  }, [user, navigate]);
};
