'use client';

import { Menu } from 'primereact/menu';
import { useRouter } from 'next/navigation';
import { _apiCall } from '../utils/helpers/functions';
import { API_SERVICES } from '../utils/constants';

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

  const handleDeleteUsers = async () => {
    if (process.env.NEXT_PUBLIC_STAGE !== 'dev') {
      return;
    }
    try {
      const res = await _apiCall(
        API_SERVICES.user,
        'deleteAllUsers',
        'delete',
        {},
      );
      if (res.status === 200) {
        alert('All users deleted');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const dashboardMenuItems = [
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
      label: 'Profile',
      items: [
        {
          label: 'Settings',
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
      label: 'Delete users',
      icon: 'pi pi-sign-out',
      command: () => {
        handleDeleteUsers();
      },
    },
  ];
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        margin: 20,
        marginBottom: 40,
      }}>
      <Menu model={dashboardMenuItems} style={{ marginRight: 20 }} />
      {children}
    </div>
  );
}
