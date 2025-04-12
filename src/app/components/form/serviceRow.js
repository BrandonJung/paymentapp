const { Divider } = require('primereact/divider');
import { useState } from 'react';
import InputTextField from './inputTextField';
import InputMultiSelect from './inputMultiSelect';
import { dummyTaxes } from '../../../../dummyData';
import InputSelectButton from './inputSelectButton';
import InputNumberField from './inputNumberField';
import { Dialog } from 'primereact/dialog';
import { validateServiceFields } from '@/app/utils/helpers/form';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
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
  service,
  selectedServices,
  setSelectedServices,
  existingServices,
}) => {
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

  const selectExistingService = (passedService) => {
    const {
      _id,
      name,
      description,
      taxAndFees,
      quantity,
      price,
      rate,
      active,
      organizationId,
    } = passedService;
    const allServiceFieldsValid = validateServiceFields(passedService);
    if (allServiceFieldsValid.valid) {
      setSName(name);
      setSDescription(description);
      setSTaxes(taxAndFees);
      setSQuantity(quantity);
      setSPrice(price / 100);
      setSRate(rate);
      setSelectedService(passedService);
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
    console.log('asdf', service);
    let tempService = {
      ...selectedService,
      identifier: service.identifier || crypto.randomUUID(),
      name: sName,
      description: sDescription,
      taxAndFees: sTaxes,
      quantity: sQuantity,
      price: sPrice * 100,
      rate: sRate,
    };

    const allServiceFieldsValid = validateServiceFields(tempService);
    if (allServiceFieldsValid.valid) {
      const index = tempSelectedServices.findIndex(
        (s) => s.identifier === service.identifier,
      );
      if (index !== -1) {
        tempSelectedServices[index] = tempService;
        setSelectedServices(tempSelectedServices);
        setIsEditing(false);
      }
    } else {
      setErrorMessage(allServiceFieldsValid.message);
      setShowErrorDialog(true);
    }
  };

  const handleDelete = () => {
    const tempSelectedServices = selectedServices.filter(
      (serviceItem) => serviceItem.identifier !== service.identifier,
    );
    setSelectedServices(tempSelectedServices);
  };

  return (
    <ContentContainer>
      <InputContainer>
        <FieldContainer>
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
        </FieldContainer>
        <FieldContainer>
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
        </FieldContainer>
        <FieldContainer>
          <InputMultiSelect
            title={'Applicable Taxes'}
            value={sTaxes}
            setValue={setSTaxes}
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
          value={selectedService}
          onChange={(e) => {
            selectExistingService(e.value);
          }}
          options={existingServices}
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
