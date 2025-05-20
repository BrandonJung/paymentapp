'use client';

import { items } from '../../dummyData';
import { useEffect, useState } from 'react';
import LoginModal from './components/loginModal';
import Header from './components/header';
import EndButton from './components/endButton';
import { useRouter } from 'next/navigation';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { Adb } from '@mui/icons-material';

const Home = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginOnClick = () => {
    if (!isLoggedIn) {
      setModalVisible(true);
    } else {
      router.push('/dashboard');
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userId = localStorage.getItem('userId');
      if (userId) {
        setIsLoggedIn(true);
      }
    }
  }, []);

  return (
    <div>
      {/* <Header
        items={items}
        end={
          <EndButton
            title={isLoggedIn ? 'Dashboard ->' : 'Log In'}
            handleOnClick={() => loginOnClick()}
          />
        }
      />
      <LoginModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        username={email}
        setUsername={setEmail}
        password={password}
        setPassword={setPassword}
      /> */}
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
                Polar Flow
              </Typography>
              <Typography
                variant='h6'
                component='div'
                sx={{ flexGrow: 1, marginLeft: 4, cursor: 'pointer' }}
                onClick={() => router.push('/core')}>
                Polar Core
              </Typography>
            </div>
            <Button color='inherit'>Login</Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Home;
