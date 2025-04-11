'use client';

import { useRouter } from 'next/navigation';
import { _apiCall, checkForUserOrg } from '../utils/helpers/functions';
import CardContainer from '../components/cardContainer';
import { useEffect, useState } from 'react';

const DashboardPage = () => {
  const router = useRouter();
  const [userHasOrg, setUserHasOrg] = useState(false);

  useEffect(() => {
    const userHasOrgRes = checkForUserOrg();
    setUserHasOrg(userHasOrgRes);
  }, []);

  return (
    <CardContainer title={'Home'}>
      {!userHasOrg ? (
        <div>
          To get started, go to Organization under Management on the menu bar
          and create your organization
        </div>
      ) : null}
    </CardContainer>
  );
};

export default DashboardPage;
