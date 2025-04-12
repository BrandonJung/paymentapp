import { useState } from 'react';
import FieldContainer from './fieldContainer';
import InputSelectButton from './inputSelectButton';
import InputNumberField from './inputNumberField';
import InputTextField from './inputTextField';
import InputContainer from './inputContainer';
import ContentContainer from './contentContainer';
import { Divider } from 'primereact/divider';
import SaveDeleteEditButton from './saveDeleteEditButton';
import { validateTaxAndFeeFields } from '@/app/utils/helpers/form';

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

const TaxAndFeeRow = ({ taxAndFee, taxesAndFees, setTaxesAndFees }) => {
  const [type, setType] = useState(taxAndFeeTypes[0].value);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(null);

  const [isEditing, setIsEditing] = useState(true);

  const handleSave = () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    const tempTaxesAndFees = [...taxesAndFees];
    let tempTaxAndFee = {
      ...taxAndFee,
      name,
      type,
      amount,
    };

    const allTaxAndFeesValid = validateTaxAndFeeFields(tempTaxAndFee);
    if (allTaxAndFeesValid.valid) {
      const index = tempTaxesAndFees.findIndex((t) => t.id === taxAndFee.id);
      if (index !== -1) {
        tempTaxesAndFees[index] = tempTaxAndFee;
        setTaxesAndFees(tempTaxesAndFees);
        setIsEditing(false);
      }
    } else {
      setErrorMessage(allTaxAndFeesValid.message);
      setShowErrorDialog(true);
    }
  };

  const handleDelete = () => {
    const tempTaxesAndFees = taxesAndFees.filter(
      (taxAndFeeItem) => taxAndFee.id !== taxAndFeeItem.id,
    );
    setTaxesAndFees(tempTaxesAndFees);
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
