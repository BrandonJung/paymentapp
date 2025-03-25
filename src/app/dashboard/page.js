'use client';

import { useRouter } from 'next/navigation';
import { dashboardItems } from '../../../dummyData';
import Header from '../components/header';
import EndButton from '../components/endButton';

const DashboardPage = () => {
  const router = useRouter();
  const signoutOnClick = () => {
    router.back();
  };

  return (
    <div>
      <Header
        items={dashboardItems}
        end={
          <EndButton
            title={'Sign Out'}
            handleOnClick={() => signoutOnClick()}
          />
        }
      />
      dashboard page
    </div>
  );
};

export default DashboardPage;
