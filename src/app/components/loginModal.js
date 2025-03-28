import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { useRouter } from 'next/navigation';

const fieldWidth = '25vw';
const fieldMargin = 6;

const LoginModal = ({
  modalVisible,
  setModalVisible,
  email,
  setEmail,
  password,
  setPassword,
}) => {
  const router = useRouter();

  return (
    <Dialog
      header=''
      showHeader={true}
      visible={modalVisible}
      draggable={false}
      dismissableMask={true}
      // style={{
      //   width: '40%',
      //   height: '30%',
      // }}
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
          Welcome Back!
        </label>
        <FloatLabel
          style={{ margin: fieldMargin, marginBottom: 22, marginTop: 24 }}>
          <InputText
            style={{ width: fieldWidth }}
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor='email'>Email</label>
        </FloatLabel>
        <FloatLabel
          style={{ margin: fieldMargin, marginBottom: 14, marginTop: 24 }}>
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
          onClick={() => router.push('/dashboard')}
        />
      </div>
    </Dialog>
  );
};
export default LoginModal;
