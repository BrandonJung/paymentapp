'use client';

import { items } from '../../dummyData';
import { useEffect, useState } from 'react';
import LoginModal from './components/loginModal';
import Header from './components/header';
import EndButton from './components/endButton';
import { useRouter } from 'next/navigation';

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
    const userId = localStorage.getItem('userId');
    if (userId) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <Header
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
      />
      <div>hey</div>
    </div>
  );
};

export default Home;
