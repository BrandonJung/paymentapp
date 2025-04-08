'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { _apiCall } from '../utils/helpers/functions';
import { API_SERVICES } from '../utils/constants';

const DashboardPage = () => {
  const router = useRouter();

  const getUserData = () => {
    try {
      const res = _apiCall(API_SERVICES.user, 'retrieveUserData', 'get', {});
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return <div></div>;
};

export default DashboardPage;
