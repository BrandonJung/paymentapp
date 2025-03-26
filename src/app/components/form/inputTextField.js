const { InputText } = require('primereact/inputtext');

const InputTextField = ({
  title,
  value,
  setValue,
  customFlex = 1,
  disabled = false,
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
      <InputText
        disabled={disabled}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default InputTextField;
