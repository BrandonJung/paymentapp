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
import { Dialog } from 'primereact/dialog';

const taxAndFeeTypes = [
  {
    label: 'Tax',
    value: 'percent',
  },
  {
    label: 'Fee',
    value: 'flat',
  },
];

const TaxAndFeeRow = ({ taxAndFee, taxesAndFees, setTaxesAndFees }) => {
  const [type, setType] = useState(taxAndFeeTypes[0].value);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(null);

  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorDialog, setShowErrorDialog] = useState(false);

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
            title={type === 'flat' ? 'Fee name' : 'Tax name'}
            value={name}
            setValue={setName}
            placeholder={
              type === 'flat'
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
            title={type === 'flat' ? 'Amount' : 'Percent'}
            value={amount}
            setValue={setAmount}
            disabled={!isEditing}
            isCurrency={type === 'flat' ? true : false}
            customSuffix={type === 'flat' ? '' : '%'}
            numberOfDigits={type === 'flat' ? 2 : 0}
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
      <Dialog
        header='Invalid Service Field'
        visible={showErrorDialog}
        style={{ width: '50vw' }}
        onHide={() => {
          if (!showErrorDialog) return;
          setShowErrorDialog(false);
        }}>
        <p className='m-0'>{errorMessage}</p>
      </Dialog>
    </ContentContainer>
  );
};

export default TaxAndFeeRow;
