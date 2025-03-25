'use client';

import { items } from '../../dummyData';
import { useState } from 'react';
import LoginModal from './components/loginModal';
import Header from './components/header';
import EndButton from './components/endButton';

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginOnClick = () => {
    setModalVisible(true);
  };

  return (
    <div>
      <Header
        items={items}
        end={
          <EndButton title={'Log In'} handleOnClick={() => loginOnClick()} />
        }
      />
      <LoginModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
      <div>hey</div>
    </div>
  );
};

export default Home;
