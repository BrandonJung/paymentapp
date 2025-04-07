'use client';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { _apiCall } from '../utils/helpers/functions';
import { API_SERVICES } from '../utils/constants';

const fieldWidth = '25vw';
const fieldMargin = 6;
const fieldMarginTop = 28;

const LoginModal = ({ modalVisible, setModalVisible }) => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = async () => {
    try {
      setLoading(true);
      if (true) {
        const res = await _apiCall(API_SERVICES.user, 'create', 'post', {
          email: email || 'example@gmail.com',
          password: password || 'examplePassword',
        });
        const resObj = await res.json();
        if (res.status === 200) {
          router.push('/dashboard');
        } else {
          setErrorMessage(resObj.message);
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogIn = async () => {
    try {
      setLoading(true);
      if (true) {
        const res = await _apiCall(API_SERVICES.user, 'login', 'post', {
          email: email || 'example@gmail.com',
          password: password || 'examplePassword',
        });
        if (res.status === 200) {
          setErrorMessage('');
          const resObj = await res.json();
          router.push('/dashboard');
        } else {
          setErrorMessage('Invalid login credentials');
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleOnClickSubmit = () => {
    if (isSignUp) {
      handleSignUp();
    } else {
      handleLogIn();
    }
  };

  const handleLoginSignUpSwitch = () => {
    setErrorMessage('');
    setIsSignUp(!isSignUp);
  };

  return (
    <Dialog
      header=''
      showHeader={true}
      visible={modalVisible}
      draggable={false}
      dismissableMask={true}
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
        <label
          style={{
            margin: fieldMargin,
            marginBottom: 50,
            textWrap: 'wrap',
          }}>
          Welcome!
        </label>
        <FloatLabel
          style={{
            margin: fieldMargin,
            marginTop: fieldMarginTop,
          }}>
          <InputText
            style={{ width: fieldWidth }}
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor='email'>Email</label>
        </FloatLabel>
        <FloatLabel
          style={{
            margin: fieldMargin,
            marginTop: fieldMarginTop,
          }}>
          <Password
            inputStyle={{ width: fieldWidth }}
            inputId='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            feedback={false}
          />
          <label htmlFor='password'>Password</label>
        </FloatLabel>
        {isSignUp ? (
          <FloatLabel
            style={{
              margin: fieldMargin,
              marginTop: fieldMarginTop,
            }}>
            <Password
              inputStyle={{ width: fieldWidth }}
              inputId='confirmPassword'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              feedback={false}
            />
            <label htmlFor='password'>Confirm Password</label>
          </FloatLabel>
        ) : null}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ margin: fieldMargin }}>
            <label style={{ fontSize: 14, color: 'red' }}>
              {`${errorMessage}`}
            </label>
          </div>
          <div style={{ margin: fieldMargin }}>
            <label style={{ fontSize: 14, cursor: 'pointer' }}>
              Forgot Password?
            </label>
          </div>
          <div style={{ margin: fieldMargin }}>
            <label
              style={{
                fontSize: 14,
                cursor: 'pointer',
              }}
              onClick={() => {
                handleLoginSignUpSwitch();
              }}>
              {isSignUp ? 'Already have an account? Log in' : 'New? Sign Up'}
            </label>
          </div>
        </div>
        <Button
          label={isSignUp ? 'Sign Up' : 'Log In'}
          style={{
            margin: fieldMargin,
            width: fieldWidth,
            marginTop: 14,
            marginBottom: 66,
          }}
          onClick={() => handleOnClickSubmit()}
        />
      </div>
    </Dialog>
  );
};
export default LoginModal;
