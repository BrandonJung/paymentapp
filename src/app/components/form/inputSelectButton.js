const { SelectButton } = require('primereact/selectbutton');

const InputSelectButton = ({
  title,
  field,
  value,
  setValue,
  options,
  optionLabel,
  disabled,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        marginBottom: 20,
        marginRight: 20,
      }}>
      <label>{title}</label>
      <SelectButton
        value={value}
        onChange={(e) => setValue(e.value, field)}
        options={options}
        optionLabel={optionLabel}
        disabled={disabled}
      />
    </div>
  );
};

export default InputSelectButton;
