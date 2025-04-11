'use client';

import { useRouter } from 'next/navigation';
import { _apiCall } from '../utils/helpers/functions';
import CardContainer from '../components/cardContainer';

const DashboardPage = () => {
  const router = useRouter();

  return <CardContainer title={'Home'}></CardContainer>;
};

export default DashboardPage;
