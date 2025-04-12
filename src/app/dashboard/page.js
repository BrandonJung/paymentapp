'use client';

import { useRouter } from 'next/navigation';
import { _apiCall } from '../utils/helpers/functions';
import CardContainer from '../components/cardContainer';

const DashboardPage = () => {
  const router = useRouter();

  return (
    <CardContainer title={'Home'}>
      <h1>Getting started checklist</h1>
      <h4>Create your organization</h4>
      <h4>Set up your account details</h4>
      <h4>Check your preferences</h4>
      <h4>Start creating some jobs!</h4>
    </CardContainer>
  );
};

export default DashboardPage;
