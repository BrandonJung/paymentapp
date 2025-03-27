import { Calendar } from 'primereact/calendar';

const InputDateSelect = ({
  title,
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
      }}>
      <label>{title}</label>
      <Calendar
        value={value}
        onChange={(e) => {
          setValue(e.value);
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
