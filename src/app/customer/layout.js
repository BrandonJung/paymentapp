'use client';
import { useRouter } from 'next/navigation';
import { Menu } from 'primereact/menu';
import { containerMaxHeight } from '../utils/constants';

export default function Layout({ children }) {
  const router = useRouter();
  const dashboardMenuItems = [
    {
      label: 'Dashboard',
      items: [
        {
          label: 'Home',
          icon: 'pi pi-home',
          command: () => {
            router.push('/customer/dashboard');
          },
        },
        {
          label: 'Pictures',
          icon: 'pi pi-image',
          command: () => {
            router.push('/customer/pictures');
          },
        },
      ],
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
          minWidth: 175,
        }}
        model={dashboardMenuItems}
      />
      {children}
    </div>
  );
}
