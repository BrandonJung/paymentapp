'use client';

import { Menu } from 'primereact/menu';
import { useRouter } from 'next/navigation';
import { _apiCall } from '../utils/helpers/functions';
import { API_SERVICES, containerMaxHeight } from '../utils/constants';
import { useEffect, useState } from 'react';

export default function Layout({ children }) {
  const router = useRouter();

  const [userHasOrg, setUserHasOrg] = useState(false);

  const handleLogout = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const res = await _apiCall(API_SERVICES.user, 'logout', 'post', {
        userId,
      });
      localStorage.clear();
      router.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteAll = async (service, collection) => {
    if (process.env.NEXT_PUBLIC_STAGE !== 'dev') {
      return;
    }
    try {
      const path = `deleteAll${collection}`;
      const res = await _apiCall(service, path, 'delete', {});
      if (res.status === 200) {
        alert(`All ${collection} deleted`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const checkIfUserHasOrg = async () => {
    const userOrg = localStorage.get('userHasOrg');
    if (userOrg) {
      setUserHasOrg(userOrg);
    }
  };

  useEffect(() => {
    checkIfUserHasOrg();
  }, []);

  const dashboardMenuItems = [
    {
      label: 'Dashboard',
      items: [
        {
          label: 'Home',
          icon: 'pi pi-home',
          command: () => {
            router.push('/dashboard');
          },
        },
      ],
    },
    {
      label: 'Jobs',
      items: [
        {
          label: 'Create',
          icon: 'pi pi-plus',
          command: () => {
            router.push('/dashboard/jobs/new');
          },
          disabled: !userHasOrg,
        },
        {
          label: 'Manage',
          icon: 'pi pi-list',
          command: () => {
            router.push('/dashboard/jobs/manage');
          },
          disabled: !userHasOrg,
        },
        {
          label: 'Pictures',
          icon: 'pi pi-image',
          command: () => {
            router.push('/dashboard/jobs/pictures');
          },
          disabled: !userHasOrg,
        },
        {
          label: 'View All',
          icon: 'pi pi-book',
          command: () => {
            router.push('/dashboard/jobs/view');
          },
          disabled: !userHasOrg,
        },
      ],
    },
    {
      label: 'Reports',
      items: [
        {
          label: 'Overview',
          icon: 'pi pi-chart-line',
          command: () => {
            router.push('/dashboard/reports/');
          },
          disabled: !userHasOrg,
        },
      ],
    },
    {
      label: 'Management',

      items: [
        {
          label: 'Organization',
          icon: 'pi pi-warehouse',
          command: () => {
            router.push('/dashboard/manage/organization');
          },
        },
        {
          label: 'Users',
          icon: 'pi pi-address-book',
          command: () => {
            router.push('/dashboard/manage/users');
          },
          disabled: !userHasOrg,
        },
      ],
    },
    {
      label: 'Settings',
      items: [
        {
          label: 'Account',
          icon: 'pi pi-user',
          command: () => {
            router.push('/dashboard/settings/account');
          },
        },
        {
          label: 'Preferences',
          icon: 'pi pi-cog',
          command: () => {
            router.push('/dashboard/settings/preferences');
          },
        },
        {
          label: 'Logout',
          icon: 'pi pi-sign-out',
          command: () => {
            handleLogout();
          },
        },
      ],
    },
    {
      label: 'Delete Users',
      icon: 'pi pi-megaphone',
      command: () => {
        handleDeleteAll(API_SERVICES.user, 'Users');
      },
    },
    {
      label: 'Delete Locations',
      icon: 'pi pi-megaphone',
      command: () => {
        handleDeleteAll(API_SERVICES.location, 'Locations');
      },
    },
    {
      label: 'Delete Customers',
      icon: 'pi pi-megaphone',
      command: () => {
        handleDeleteAll(API_SERVICES.customer, 'Customers');
      },
    },
    {
      label: 'Delete Jobs',
      icon: 'pi pi-megaphone',
      command: () => {
        handleDeleteAll(API_SERVICES.job, 'Jobs');
      },
    },
    {
      label: 'Delete Orgs',
      icon: 'pi pi-megaphone',
      command: () => {
        handleDeleteAll(API_SERVICES.organization, 'Orgs');
      },
    },
    {
      label: 'Delete Services',
      icon: 'pi pi-megaphone',
      command: () => {
        handleDeleteAll(API_SERVICES.service, 'Services');
      },
    },
  ];
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
      }}>
      <Menu
        style={{
          maxHeight: containerMaxHeight,
          overflow: 'scroll',
          marginRight: 10,
        }}
        model={dashboardMenuItems}
      />
      {children}
    </div>
  );
}
