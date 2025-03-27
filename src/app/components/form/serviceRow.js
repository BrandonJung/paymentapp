const { Divider } = require('primereact/divider');
import { useState } from 'react';
import styles from '../../dashboard/new/page.module.css';
import InputTextField from './inputTextField';
import InputMultiSelect from './inputMultiSelect';
import { dummyTaxes } from '../../../../dummyData';
import InputSelectButton from './inputSelectButton';
import InputNumberField from './inputNumberField';
import { validateServiceFields } from '@/app/lib/helper';
import { Dialog } from 'primereact/dialog';

const rateOptions = [
  { label: 'Flat Rate', value: 'flat' },
  { label: 'Hourly', value: 'hourly' },
];

const ServiceRow = ({ index, selectedServices, setSelectedServices }) => {
  const [sName, setSName] = useState('');
  const [sDescription, setSDescription] = useState('');
  const [sTaxes, setSTaxes] = useState([]);
  const [sQuantity, setSQuantity] = useState(1);
  const [sPrice, setSPrice] = useState(null);
  const [sRate, setSRate] = useState('flat');
  const [isEditing, setIsEditing] = useState(true);

  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const handleSave = () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    const tempSelectedServices = [...selectedServices];
    let tempService = {
      name: sName,
      description: sDescription,
      taxes: sTaxes,
      quantity: sQuantity,
      price: sPrice * 100,
      rate: sRate,
    };

    const allServiceFieldsValid = validateServiceFields(
      sName,
      sDescription,
      sTaxes,
      sQuantity,
      sPrice,
      sRate,
    );
    if (allServiceFieldsValid.valid) {
      tempSelectedServices[index] = tempService;
      setSelectedServices(tempSelectedServices);
      setIsEditing(false);
    } else {
      setErrorMessage(allServiceFieldsValid.message);
      setShowErrorDialog(true);
    }
  };

  return (
    <div className={styles.contentContainer}>
      <div className={styles.inputContainer}>
        <div className={styles.fieldContainer}>
          <InputTextField
            title={'Service Name'}
            value={sName}
            setValue={setSName}
            disabled={!isEditing}
          />
          <InputTextField
            title={'Service Description'}
            value={sDescription}
            setValue={setSDescription}
            disabled={!isEditing}
          />
        </div>
        <div className={styles.fieldContainer}>
          <InputSelectButton
            title={'Service Rate'}
            value={sRate}
            setValue={setSRate}
            options={rateOptions}
            optionLabel={'label'}
            disabled={!isEditing}
          />
          <InputNumberField
            title={sRate === 'hourly' ? 'Hourly' : 'Price'}
            value={sPrice}
            setValue={setSPrice}
            isCurrency={true}
            numberOfDigits={2}
            disabled={!isEditing}
          />
          {sRate === 'hourly' ? (
            <InputNumberField
              title={'Number of hours'}
              value={sQuantity}
              setValue={setSQuantity}
              numberOfDigits={0}
              disabled={!isEditing}
            />
          ) : null}
        </div>
        <div className={styles.fieldContainer}>
          <InputMultiSelect
            title={'Applicable Taxes'}
            value={sTaxes}
            setValue={setSTaxes}
            options={dummyTaxes}
            optionLabel='name'
            placeholder={'Select Applicable Taxes'}
            disabled={!isEditing}
          />
        </div>
      </div>
      <Divider layout='vertical' />
      <div
        className={styles.selectContainer}
        style={{
          gap: 4,
          marginLeft: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <p
          onClick={() => {
            handleSave();
          }}
          style={{ paddingRight: 6, cursor: 'pointer' }}>
          {isEditing ? 'Save' : 'Edit'}
        </p>
        <i
          style={{
            cursor: 'pointer',
          }}
          onClick={() => {
            handleSave();
          }}
          className={isEditing ? 'pi pi-check' : 'pi pi-pencil'}></i>
      </div>
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
    </div>
  );
};

export default ServiceRow;
