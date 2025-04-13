import { useState } from 'react';
import ContentContainer from './contentContainer';
import InputContainer from './inputContainer';
import FieldContainer from './fieldContainer';
import InputTextField from './inputTextField';
import { Divider } from 'primereact/divider';
import SelectContainer from './selectContainer';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

const CustomerSection = ({
  customer,
  updateCustomer,
  selectExistingCustomer,
  existingCustomers,
  disableEditing = false,
  resetCustomer,
}) => {
  const [isUpdateExistingCustomer, setIsUpdateExistingCustomer] =
    useState(false);

  return (
    <ContentContainer>
      <InputContainer>
        <FieldContainer>
          <InputTextField
            title={'First Name'}
            field={'firstName'}
            value={customer.firstName}
            setValue={updateCustomer}
            disabled={disableEditing && !isUpdateExistingCustomer}
          />
          <InputTextField
            title={'Last Name'}
            field={'lastName'}
            value={customer.lastName}
            setValue={updateCustomer}
            disabled={disableEditing && !isUpdateExistingCustomer}
          />
        </FieldContainer>
        <FieldContainer>
          <InputTextField
            title={'Email'}
            field={'email'}
            value={customer.email}
            setValue={updateCustomer}
            disabled={disableEditing && !isUpdateExistingCustomer}
          />
          <InputTextField
            title={'Phone Number'}
            field={'phoneNumber'}
            value={customer.phoneNumber}
            setValue={updateCustomer}
            disabled={disableEditing && !isUpdateExistingCustomer}
          />
        </FieldContainer>
      </InputContainer>
      <Divider layout='vertical' />
      <SelectContainer>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}>
          <label style={{ marginBottom: 4 }}>{'Existing Customers'}</label>
          <Dropdown
            value={customer}
            onChange={(e) => {
              selectExistingCustomer(e.value);
            }}
            options={existingCustomers ?? []}
            optionLabel='label'
            placeholder='Select a customer'
            filter
          />
        </div>
        {customer._id ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              flexWrap: 'wrap',
              flex: 1,
            }}>
            <Button
              onClick={() => {
                resetCustomer();
                setIsUpdateExistingCustomer(false);
              }}>
              New customer
            </Button>
            <Button
              onClick={() => {
                setIsUpdateExistingCustomer(true);
              }}>
              Edit customer
            </Button>
          </div>
        ) : null}
      </SelectContainer>
    </ContentContainer>
  );
};

export default CustomerSection;
