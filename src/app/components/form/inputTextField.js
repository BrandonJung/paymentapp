const { InputText } = require('primereact/inputtext');

const InputTextField = ({
  title,
  field,
  value,
  setValue,
  customFlex = 1,
  customMinLength = 0,
  customMaxLength = 30,
  placeholder = '',
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
        minLength={customMinLength}
        maxLength={customMaxLength}
        onChange={(e) => setValue(e.target.value, field)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputTextField;
