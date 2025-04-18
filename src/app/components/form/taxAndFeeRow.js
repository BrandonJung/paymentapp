import { useCallback, useEffect, useState } from 'react';
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
import { taxAndFeeTypes } from '@/app/utils/constants';

const TaxAndFeeRow = ({ taxAndFeeObj, saveTaxAndFee, deleteTaxAndFee }) => {
  const [taxAndFee, setTaxAndFee] = useState(taxAndFeeObj);

  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const [isEditing, setIsEditing] = useState(taxAndFeeObj?.name ? false : true);

  const handleSave = () => {
    const allTaxesAndFeesValid = validateTaxAndFeeFields(taxAndFee);
    if (allTaxesAndFeesValid.valid) {
      saveTaxAndFee(taxAndFee);
      setIsEditing(false);
    } else {
      setErrorMessage(allTaxesAndFeesValid.message);
      setShowErrorDialog(true);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    deleteTaxAndFee(taxAndFee);
  };

  const updateTaxAndFee = useCallback((value, field) => {
    setTaxAndFee((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  }, []);

  return (
    <ContentContainer style={{ flexWrap: 'wrap' }}>
      <InputContainer>
        <FieldContainer>
          <InputTextField
            title={taxAndFee.type === 'flat' ? 'Fee name' : 'Tax name'}
            field={'name'}
            value={taxAndFee.name}
            setValue={updateTaxAndFee}
            placeholder={
              taxAndFee.type === 'flat'
                ? 'Ex. Admin Fee, Products Fee'
                : 'Ex. GST, PST, Alc'
            }
            disabled={!isEditing}
          />
        </FieldContainer>
        <FieldContainer>
          <InputSelectButton
            title={'Type'}
            field={'type'}
            value={taxAndFee.type}
            setValue={updateTaxAndFee}
            options={taxAndFeeTypes}
            optionLabel={'label'}
            disabled={!isEditing}
          />
          <InputNumberField
            title={taxAndFee.type === 'flat' ? 'Amount' : 'Percent'}
            field={'amount'}
            value={taxAndFee.amount}
            setValue={updateTaxAndFee}
            disabled={!isEditing}
            isCurrency={taxAndFee.type === 'flat' ? true : false}
            customSuffix={taxAndFee.type === 'flat' ? '' : '%'}
            numberOfDigits={taxAndFee.type === 'flat' ? 2 : 0}
          />
        </FieldContainer>
        <SaveDeleteEditButton
          isEditing={isEditing}
          handleSave={handleSave}
          handleEdit={handleEdit}
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
