import { InputSwitch } from 'primereact/inputswitch';

const InputSwitchSelect = ({
  title,
  checked = true,
  setValue,
  customFlex = 1,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        flex: customFlex,
        paddingRight: 20,
        marginBottom: 20,
        minWidth: 250,
      }}>
      <label>{title}</label>
      <InputSwitch checked={checked} onChange={(e) => setValue(e.value)} />
    </div>
  );
};

export default InputSwitchSelect;
