const { InputText } = require('primereact/inputtext');

const InputField = ({ title, value, setValue }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        flex: 1,
        paddingRight: 20,
        marginBottom: 20,
      }}>
      <label>{title}</label>
      <InputText value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
};

export default InputField;
