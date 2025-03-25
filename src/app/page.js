'use client';

import { Menubar } from 'primereact/menubar';
import { items } from '../../dummyData';
import { Button } from 'primereact/button';
import { useState } from 'react';
import LoginModal from './components/loginModal';

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginButton = (
    <div>
      <Button
        label='Log In'
        onClick={() => {
          setModalVisible(true);
        }}
      />
    </div>
  );

  return (
    <div style={{ maxWidth: 1550, width: '100%' }}>
      <Menubar model={items} end={loginButton} />
      <LoginModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      />
    </div>
  );
};

export default Home;
