'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { _apiCall } from '../utils/helpers/functions';
import { API_SERVICES } from '../utils/constants';
import CardContainer from '../components/cardContainer';

const DashboardPage = () => {
  const router = useRouter();

  const getUserData = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert('Please log in again');
        router.push('/');
      }
      const res = await _apiCall(API_SERVICES.user, 'user', 'get', {
        userId,
        fields: ['_id', 'email', 'roles', 'emailVerified', 'organization'],
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return <CardContainer title={'Home'}></CardContainer>;
};

export default DashboardPage;
