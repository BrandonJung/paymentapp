import { MultiSelect } from 'primereact/multiselect';

const InputMultiSelect = ({
  title,
  field,
  value,
  setValue,
  options,
  optionLabel,
  placeholder = '',
  disabled = false,
  customFlex = 1,
  filter = false,
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
      <MultiSelect
        value={value}
        onChange={(e) => setValue(e.value, field)}
        options={options}
        optionLabel={optionLabel}
        placeholder={placeholder}
        disabled={disabled}
        filter={filter}
      />
    </div>
  );
};

export default InputMultiSelect;
