'use client';

import { Menu } from 'primereact/menu';
import { useRouter } from 'next/navigation';

export default function Layout({ children }) {
  const router = useRouter();

  const dashboardMenuItems = [
    {
      label: 'Jobs',
      items: [
        {
          label: 'Create New',
          icon: 'pi pi-plus',
          command: () => {
            router.push('/dashboard/new');
          },
        },
        {
          label: 'All',
          icon: 'pi pi-search',
        },
        {
          label: 'In Progress',
          icon: 'pi pi-search',
        },
        {
          label: 'Done',
          icon: 'pi pi-search',
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
        },
      ],
    },
  ];
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', margin: 20 }}>
        <Menu model={dashboardMenuItems} />
        {children}
      </div>
    </>
  );
}
