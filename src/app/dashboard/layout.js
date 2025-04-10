'use client';

import { Menu } from 'primereact/menu';
import { useRouter } from 'next/navigation';
import { _apiCall } from '../utils/helpers/functions';
import { API_SERVICES, containerMaxHeight } from '../utils/constants';

export default function Layout({ children }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const res = await _apiCall(API_SERVICES.user, 'logout', 'post', {
        userId,
      });
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userId');
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

  const dashboardMenuItems = [
    {
      label: 'Dashboard',
      items: [
        {
          label: 'Home',
          icon: 'pi pi-plus',
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
        },
        {
          label: 'Manage',
          icon: 'pi pi-search',
          command: () => {
            router.push('/dashboard/jobs/manage');
          },
        },
      ],
    },
    {
      label: 'Reports',
      items: [
        {
          label: 'Overview',
          icon: 'pi pi-cog',
        },
      ],
    },
    {
      label: 'Management',
      items: [
        {
          label: 'Users',
          icon: 'pi pi-search',
        },
      ],
    },
    {
      label: 'Settings',
      items: [
        {
          label: 'Account',
          icon: 'pi pi-cog',
        },
        {
          label: 'Preferences',
          icon: 'pi pi-cog',
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
      icon: 'pi pi-sign-out',
      command: () => {
        handleDeleteAll(API_SERVICES.user, 'Users');
      },
    },
    {
      label: 'Delete Locations',
      icon: 'pi pi-sign-out',
      command: () => {
        handleDeleteAll(API_SERVICES.location, 'Locations');
      },
    },
    {
      label: 'Delete Customers',
      icon: 'pi pi-sign-out',
      command: () => {
        handleDeleteAll(API_SERVICES.customer, 'Customers');
      },
    },
    {
      label: 'Delete Jobs',
      icon: 'pi pi-sign-out',
      command: () => {
        handleDeleteAll(API_SERVICES.job, 'Jobs');
      },
    },
    {
      label: 'Delete Orgs',
      icon: 'pi pi-sign-out',
      command: () => {
        handleDeleteAll(API_SERVICES.organization, 'Orgs');
      },
    },
    {
      label: 'Delete Services',
      icon: 'pi pi-sign-out',
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
