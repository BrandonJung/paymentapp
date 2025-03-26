'use client';

import InputTextField from '@/app/components/form/inputTextField';
import { Card } from 'primereact/card';
import { useState } from 'react';
import {
  dummyAddresses,
  dummyServicesList,
  dummyTaxes,
  dummyUsers,
} from '../../../../dummyData';
import { Dropdown } from 'primereact/dropdown';
import InputSection from '@/app/components/form/inputSection';
import { Divider } from 'primereact/divider';

import styles from './page.module.css';
import { Button } from 'primereact/button';
import InputMultiSelect from '@/app/components/form/inputMultiSelect';
import InputDateSelect from '@/app/components/form/inputDateSelect';
import InputSwitchSelect from '@/app/components/form/inputSwitchSelect';

const NewPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedUsername, setSelectedUsername] = useState(null);

  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTaxes, setSelectedTaxes] = useState([]);
  const [isHourlyRate, setIsHourlyRate] = useState(false);

  const [address, setAddress] = useState('');
  const [unitNumber, setUnitNumber] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('Canada');

  const [showUserSection, setShowUserSection] = useState(true);
  const [showJobSection, setShowJobSection] = useState(false);
  const [showServicesSection, setShowServicesSection] = useState(false);
  const [showPaymentSection, setShowPaymentSection] = useState(false);

  const selectExistingUser = (user) => {
    if (!user) return;
    const uFirstName = user.firstName;
    const uLastName = user.lastName;
    const uEmail = user.email;
    const uPhoneNumber = user.phoneNumber;
    setFirstName(uFirstName);
    setLastName(uLastName);
    setEmail(uEmail);
    setPhoneNumber(uPhoneNumber);
    setSelectedUsername(user);
  };

  const UserSection = () => {
    return (
      <div className={styles.contentContainer}>
        <div className={styles.inputContainer}>
          <div className={styles.fieldContainer}>
            <InputTextField
              title={'First Name'}
              value={firstName}
              setValue={setFirstName}
            />
            <InputTextField
              title={'Last Name'}
              value={lastName}
              setValue={setLastName}
            />
          </div>
          <div className={styles.fieldContainer}>
            <InputTextField title={'Email'} value={email} setValue={setEmail} />
            <InputTextField
              title={'Phone Number'}
              value={phoneNumber}
              setValue={setPhoneNumber}
            />
          </div>
        </div>
        <Divider layout='vertical' />
        <div
          className={styles.selectContainer}
          style={{ gap: 4, marginLeft: 20 }}>
          <label>{'Existing Users'}</label>
          <Dropdown
            value={selectedUsername}
            onChange={(e) => {
              selectExistingUser(e.value);
            }}
            options={dummyUsers}
            optionLabel='name'
            placeholder='Select a user'
          />
        </div>
      </div>
    );
  };

  const JobSection = () => {
    return (
      <div className={styles.contentContainer}>
        <div className={styles.inputContainer}>
          <div className={styles.fieldContainer}>
            <InputTextField
              customFlex={3}
              title={'Address *'}
              value={address}
              setValue={setAddress}
            />
            <InputTextField
              customFlex={1}
              title={'Unit #'}
              value={unitNumber}
              setValue={setUnitNumber}
            />
          </div>
          <div className={styles.fieldContainer}>
            <InputTextField title={'City *'} value={city} setValue={setCity} />
            <InputTextField
              title={'Province *'}
              value={province}
              setValue={setProvince}
            />
          </div>
          <div className={styles.fieldContainer}>
            <InputTextField
              title={'Postal Code *'}
              value={postalCode}
              setValue={setPostalCode}
            />
            <InputTextField
              title={'Country'}
              value={country}
              setValue={setCountry}
              disabled
            />
          </div>
        </div>
        <Divider layout='vertical' />
        <div
          className={styles.selectContainer}
          style={{ gap: 4, marginLeft: 20 }}>
          <label>{'Past Addresses'}</label>
          <Dropdown
            filter
            value={selectedUsername}
            onChange={(e) => {
              selectExistingUser(e.value);
            }}
            options={dummyAddresses}
            optionLabel='search'
            placeholder='Search addresses'
          />
        </div>
      </div>
    );
  };

  const ServicesSection = () => {
    return (
      <div
        className={styles.contentContainer}
        style={{
          alignItems: 'center',
        }}>
        <div className={styles.inputContainer}>
          <div className={styles.fieldContainer}>
            <InputMultiSelect
              title={'Services'}
              value={selectedServices}
              setValue={setSelectedServices}
              options={dummyServicesList}
              optionLabel='name'
              placeholder={'Select Services'}
            />
          </div>
          <div className={styles.fieldContainer}>
            <InputDateSelect
              title={'Date'}
              value={selectedDate}
              setValue={setSelectedDate}
              placeholder='Select a date'
            />
          </div>
        </div>
        <Divider layout='vertical' />
        <div
          className={styles.selectContainer}
          style={{
            gap: 4,
            marginLeft: 20,
            cursor: 'pointer',
            flexDirection: 'row',
          }}></div>
      </div>
    );
  };

  const PaymentSection = () => {
    return (
      <div
        className={styles.contentContainer}
        style={{
          alignItems: 'center',
        }}>
        <div className={styles.inputContainer}>
          <div className={styles.fieldContainer}>
            <InputSwitchSelect
              title={'Hourly?'}
              checked={isHourlyRate}
              setValue={setIsHourlyRate}
            />
          </div>
          <div className={styles.fieldContainer}>
            <InputMultiSelect
              title={'Applicable Taxes'}
              value={selectedTaxes}
              setValue={setSelectedTaxes}
              options={dummyTaxes}
              optionLabel='name'
              placeholder={'Select Applicable Taxes'}
            />
          </div>
        </div>
        <Divider layout='vertical' />
        <div
          className={styles.selectContainer}
          style={{
            gap: 4,
            marginLeft: 20,
            cursor: 'pointer',
            flexDirection: 'row',
          }}></div>
      </div>
    );
  };

  return (
    <div
      style={{
        width: '100%',
        marginLeft: 20,
        marginRight: 20,
      }}>
      <Card title={'Create New Job'} style={{ padding: 10 }}>
        <InputSection
          handleOnClick={setShowUserSection}
          onClickParam={showUserSection}
          title={'Customer Information'}
          section={UserSection}
        />
        <InputSection
          handleOnClick={setShowJobSection}
          onClickParam={showJobSection}
          title={'Location Details'}
          section={JobSection}
        />
        <InputSection
          handleOnClick={setShowServicesSection}
          onClickParam={showServicesSection}
          title={'Service Details'}
          section={ServicesSection}
        />
        <InputSection
          handleOnClick={setShowPaymentSection}
          onClickParam={showPaymentSection}
          title={'Payment Information'}
          section={PaymentSection}
        />
        <div style={{ marginTop: 40 }}>
          <Button>Create Job</Button>
        </div>
      </Card>
    </div>
  );
};

export default NewPage;
