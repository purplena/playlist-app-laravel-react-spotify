import React, { useEffect } from 'react';
import { Outlet, generatePath, useNavigate } from 'react-router-dom';
import { useUserStore } from './useUserStore';

export default function ProtectedCompanyRoot() {
  const { user } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(generatePath('/manager/login'));
    } else if (user.role !== 1) {
      navigate(generatePath('/'));
    }
  }, [user]);

  if (!user || user.role !== 1) {
    return;
  }

  return <Outlet />;
}
