'use client';

import { Menubar } from 'primereact/menubar';
import { items } from '../../dummyData';
import { Button } from 'primereact/button';
import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

const fieldWidth = '25vw';
const fieldMargin = 8;

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
    <div style={{ maxWidth: 1500, width: '100%' }}>
      <Menubar model={items} end={loginButton} />
      <Dialog
        header=''
        showHeader={true}
        visible={modalVisible}
        draggable={false}
        dismissableMask={true}
        style={{
          width: '35vw',
          height: '30vw',
        }}
        contentStyle={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onHide={() => {
          if (!modalVisible) return;
          setModalVisible(false);
        }}>
        <div>
          <label style={{ margin: fieldMargin }}>Welcome Back!</label>
          <FloatLabel
            style={{ margin: fieldMargin, marginBottom: 22, marginTop: 14 }}>
            <InputText
              style={{ width: fieldWidth }}
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor='username'>Username</label>
          </FloatLabel>
          <FloatLabel style={{ margin: fieldMargin, marginBottom: 14 }}>
            <Password
              inputStyle={{ width: fieldWidth }}
              inputId='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              feedback={false}
            />
            <label htmlFor='password'>Password</label>
          </FloatLabel>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ margin: fieldMargin, fontSize: 14 }}>
              Forgot Password?
            </label>
            <label style={{ margin: fieldMargin, fontSize: 14 }}>
              New? Sign Up!
            </label>
          </div>
          <Button
            label='Log In'
            style={{
              margin: fieldMargin,
              width: fieldWidth,
              marginTop: 14,
              marginBottom: 66,
            }}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default Home;
