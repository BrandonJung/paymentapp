import { useState } from 'react';
import FieldContainer from './fieldContainer';
import InputSelectButton from './inputSelectButton';
import InputNumberField from './inputNumberField';
import InputTextField from './inputTextField';
import InputContainer from './inputContainer';
import ContentContainer from './contentContainer';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import SaveDeleteEditButton from './saveDeleteEditButton';

const taxAndFeeTypes = [
  {
    label: 'Tax',
    value: 'tax',
  },
  {
    label: 'Fee',
    value: 'fee',
  },
];

const TaxAndFeeRow = ({ index, taxesAndFees, setTaxesAndFees }) => {
  const [type, setType] = useState(taxAndFeeTypes[0].value);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(null);

  const [isEditing, setIsEditing] = useState(true);

  const handleSave = () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    setIsEditing(false);
  };

  const handleDelete = () => {
    return 'yay';
  };

  return (
    <ContentContainer>
      <InputContainer>
        <FieldContainer>
          <InputTextField
            title={type === 'fee' ? 'Fee name' : 'Tax name'}
            value={name}
            setValue={setName}
            placeholder={
              type === 'fee'
                ? 'Ex. Admin Fee, Products Fee'
                : 'Ex. GST, PST, Alc'
            }
            disabled={!isEditing}
          />
        </FieldContainer>
        <FieldContainer>
          <InputSelectButton
            title={'Type'}
            value={type}
            setValue={setType}
            options={taxAndFeeTypes}
            optionLabel={'label'}
            disabled={!isEditing}
          />
          <InputNumberField
            title={type === 'fee' ? 'Amount' : 'Percent'}
            value={amount}
            setValue={setAmount}
            disabled={!isEditing}
            isCurrency={type === 'fee' ? true : false}
            customSuffix={type === 'fee' ? '' : '%'}
            numberOfDigits={type === 'fee' ? 2 : 0}
          />
        </FieldContainer>
        <SaveDeleteEditButton
          isEditing={isEditing}
          handleSave={handleSave}
          handleDelete={handleDelete}
        />
      </InputContainer>
      <div style={{ display: 'flex', flex: 1 }} />

      <Divider />
    </ContentContainer>
  );
};

export default TaxAndFeeRow;
