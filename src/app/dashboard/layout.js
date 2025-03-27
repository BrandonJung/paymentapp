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
        },
      ],
    },
  ];
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          margin: 20,
        }}>
        <Menu model={dashboardMenuItems} style={{ marginRight: 20 }} />
        {children}
      </div>
    </>
  );
}
