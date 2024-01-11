import { useLocation, useNavigate } from 'react-router-dom';

export const useAuthRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const redirectAfterLogin = () => {
    navigate(from, { replace: true });
  };

  return redirectAfterLogin;
};
