'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { _apiCall } from '../utils/helpers/functions';
import { API_SERVICES } from '../utils/constants';

const DashboardPage = () => {
  const router = useRouter();

  const getUserData = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert('Please log in again');
        router.push('/');
      }
      const res = await _apiCall(API_SERVICES.user, 'retrieveUserData', 'get', {
        userId,
        fields: ['_id', 'email', 'role', 'emailVerified'],
      });
      console.log(res);
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
