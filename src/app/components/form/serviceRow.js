const { Divider } = require('primereact/divider');
import { useCallback, useEffect, useState } from 'react';
import InputTextField from './inputTextField';
import InputMultiSelect from './inputMultiSelect';
import { dummyTaxes } from '../../../../dummyData';
import InputSelectButton from './inputSelectButton';
import InputNumberField from './inputNumberField';
import { Dialog } from 'primereact/dialog';
import { validateServiceFields } from '@/app/utils/helpers/form';
import { Dropdown } from 'primereact/dropdown';
import ContentContainer from './contentContainer';
import InputContainer from './inputContainer';
import SelectContainer from './selectContainer';
import FieldContainer from './fieldContainer';
import SaveDeleteEditButton from './saveDeleteEditButton';

const rateOptions = [
  { label: 'Flat Rate', value: 'flat' },
  { label: 'Hourly', value: 'hourly' },
];

const ServiceRow = ({
  serviceObj,
  existingServices,
  saveService,
  deleteService,
  selectExistingService,
  updateIsAnyEditing,
  index,
  removeIsAnyEditing,
}) => {
  const [service, setService] = useState(serviceObj);

  const [isEditing, setIsEditing] = useState(serviceObj.name ? false : true);
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const handleSave = () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }
    const allServiceFieldsValid = validateServiceFields(service);
    if (allServiceFieldsValid.valid) {
      saveService(service);
      setIsEditing(false);
    } else {
      setErrorMessage(allServiceFieldsValid.message);
      setShowErrorDialog(true);
    }
  };

  const handleDelete = () => {
    deleteService(service);
    removeIsAnyEditing(index);
  };

  const handleSelectService = (passedService) => {
    selectExistingService(passedService);
    const { name, description, rate, price, taxesAndFees, _id } = passedService;
    const { identifier } = service;
    setService({
      identifier,
      name,
      description,
      rate,
      price,
      taxesAndFees,
      _id,
    });
  };

  const updateService = useCallback((value, field) => {
    setService((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  }, []);

  useEffect(() => {
    updateIsAnyEditing(index, isEditing);
  }, [isEditing, index]);

  return (
    <ContentContainer style={{ flexWrap: 'wrap' }}>
      <InputContainer>
        <FieldContainer>
          <InputTextField
            title={'Service Name'}
            field={'name'}
            value={service.name}
            setValue={updateService}
            disabled={!isEditing}
          />
          <InputTextField
            title={'Service Description'}
            field={'description'}
            value={service.description}
            setValue={updateService}
            disabled={!isEditing}
          />
        </FieldContainer>
        <FieldContainer>
          <InputSelectButton
            title={'Service Rate'}
            field={'rate'}
            value={service.rate}
            setValue={updateService}
            options={rateOptions}
            optionLabel={'label'}
            disabled={!isEditing}
          />
          <InputNumberField
            title={service.rate === 'hourly' ? 'Hourly' : 'Price'}
            field={'price'}
            value={service.price}
            setValue={updateService}
            isCurrency={true}
            numberOfDigits={2}
            disabled={!isEditing}
          />
          {service.rate === 'hourly' ? (
            <InputNumberField
              title={'Number of hours'}
              field={'quantity'}
              value={service.quantity}
              setValue={updateService}
              numberOfDigits={0}
              disabled={!isEditing}
            />
          ) : null}
        </FieldContainer>
        <FieldContainer>
          <InputMultiSelect
            title={'Applicable Taxes'}
            field={'taxesAndFees'}
            value={service.taxesAndFees}
            setValue={updateService}
            options={dummyTaxes}
            optionLabel='name'
            placeholder={'Select Applicable Taxes'}
            disabled={!isEditing}
          />
        </FieldContainer>
        <SaveDeleteEditButton
          isEditing={isEditing}
          handleDelete={handleDelete}
          handleSave={handleSave}
        />
      </InputContainer>
      <Divider layout='vertical' />
      <SelectContainer>
        <label>{'Past Services'}</label>
        <Dropdown
          filter
          value={service}
          onChange={(e) => {
            handleSelectService(e.value);
          }}
          options={existingServices.filter((item) => !item.selected)}
          optionLabel='search'
          placeholder='Search services'
          disabled={!isEditing}
        />
      </SelectContainer>
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

export default ServiceRow;
