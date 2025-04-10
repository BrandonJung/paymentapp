const { Divider } = require('primereact/divider');
import { useState } from 'react';
import styles from '../../dashboard/jobs/new/page.module.css';
import InputTextField from './inputTextField';
import InputMultiSelect from './inputMultiSelect';
import { dummyTaxes } from '../../../../dummyData';
import InputSelectButton from './inputSelectButton';
import InputNumberField from './inputNumberField';
import { Dialog } from 'primereact/dialog';
import { validateServiceFields } from '@/app/utils/helpers/form';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

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
  const [selectedService, setSelectedService] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const selectExistingService = (service) => {
    const { name, description, taxes, quantity, price, rate } = service;
    const allServiceFieldsValid = validateServiceFields(service);
    if (allServiceFieldsValid.valid) {
      setSName(name);
      setSDescription(description);
      setSTaxes(taxes);
      setSQuantity(quantity);
      setSPrice(price);
      setSRate(rate);
      setSelectedService(service);
    } else {
      setErrorMessage(allServiceFieldsValid.message);
      setShowErrorDialog(true);
    }
  };

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

    const allServiceFieldsValid = validateServiceFields(tempService);
    if (allServiceFieldsValid.valid) {
      tempSelectedServices[index] = tempService;
      setSelectedServices(tempSelectedServices);
      setIsEditing(false);
    } else {
      setErrorMessage(allServiceFieldsValid.message);
      setShowErrorDialog(true);
    }
  };

  const handleDelete = () => {
    const tempSelectedServices = [...selectedServices];
    tempSelectedServices.splice(index, 1);
    setSelectedServices(tempSelectedServices);
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: isEditing ? 'space-between' : 'flex-end',
              flex: 1,
            }}>
            {isEditing ? (
              <Button
                onClick={() => {
                  handleDelete();
                }}
                style={{
                  backgroundColor: 'grey',
                  borderColor: '#000000',
                  color: '#000000',
                }}>
                {isEditing ? 'Delete' : 'Edit'}
                <i
                  style={{
                    color: '#000000',
                    marginLeft: 10,
                    cursor: 'pointer',
                  }}
                  className={isEditing ? 'pi pi-trash' : 'pi pi-pencil'}></i>
              </Button>
            ) : null}
            <Button
              onClick={() => {
                handleSave();
              }}>
              {isEditing ? 'Save' : 'Edit'}
              <i
                style={{
                  marginLeft: 10,
                  cursor: 'pointer',
                }}
                className={isEditing ? 'pi pi-check' : 'pi pi-pencil'}></i>
            </Button>
          </div>
        </div>
      </div>
      <Divider layout='vertical' />

      <div
        className={styles.selectContainer}
        style={{ gap: 4, marginLeft: 20 }}>
        <label>{'Past Services'}</label>
        <Dropdown
          filter
          value={selectedService}
          onChange={(e) => {
            selectExistingService(e.value);
          }}
          options={[]}
          optionLabel='search'
          placeholder='Search services'
          disabled={!isEditing}
        />
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
