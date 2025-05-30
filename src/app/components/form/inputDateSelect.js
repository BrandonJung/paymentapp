import { Calendar } from 'primereact/calendar';

const InputDateSelect = ({
  title,
  field,
  value,
  setValue,
  disabled = false,
  placeholder = '',
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
        maxWidth: '40%',
      }}>
      <label>{title}</label>
      <Calendar
        value={value}
        onChange={(e) => {
          setValue(e.value, field);
        }}
        placeholder={placeholder}
        disabled={disabled}
        showTime
        hourFormat='24'
      />
    </div>
  );
};

export default InputDateSelect;
