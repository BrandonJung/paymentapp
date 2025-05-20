'use client';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { Adb } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export default function Layout({ children }) {
  const router = useRouter();
  return (
    <AppBar position='static' sx={{ alignItems: 'center' }}>
      <Toolbar sx={{ width: '100%', justifyContent: 'center' }}>
        <div
          style={{
            maxWidth: 1000,
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Adb
              sx={{
                display: { xs: 'none', md: 'flex' },
                cursor: 'pointer',
              }}
              onClick={() => router.push('/')}
            />
            <Typography
              variant='h6'
              component='div'
              sx={{ flexGrow: 1, marginLeft: 4, cursor: 'pointer' }}
              onClick={() => router.push('/flow')}>
              Some Flow
            </Typography>
            <Typography
              variant='h6'
              component='div'
              sx={{ flexGrow: 1, marginLeft: 4, cursor: 'pointer' }}
              onClick={() => router.push('/core')}>
              Another Flow
            </Typography>
          </div>

          <Button color='inherit'>Login</Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
