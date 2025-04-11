import { InputNumber } from 'primereact/inputnumber';

const InputNumberField = ({
  title,
  value,
  setValue,
  customFlex = 1,
  disabled = false,
  isCurrency = false,
  currency = 'CAD',
  showButtons = false,
  numberOfDigits = 2,
  customSuffix = '',
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
        minWidth: 125,
      }}>
      <label>{title}</label>
      <InputNumber
        value={value}
        onValueChange={(e) => setValue(e.value)}
        mode={isCurrency ? 'currency' : 'decimal'}
        currency={currency}
        showButtons={showButtons}
        maxFractionDigits={numberOfDigits}
        disabled={disabled}
        variant='outlined'
        suffix={customSuffix}
      />
    </div>
  );
};

export default InputNumberField;
