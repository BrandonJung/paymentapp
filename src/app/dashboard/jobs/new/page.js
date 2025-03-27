'use client';

import InputTextField from '@/app/components/form/inputTextField';
import { Card } from 'primereact/card';
import { useEffect, useState } from 'react';
import { dummyAddresses, dummyUsers } from '../../../../../dummyData';
import { Dropdown } from 'primereact/dropdown';
import InputSection from '@/app/components/form/inputSection';
import { Divider } from 'primereact/divider';

import styles from './page.module.css';
import { Button } from 'primereact/button';
import { formatPriceDisplay } from '@/app/utils/helpers/formatters';
import ServiceRow from '@/app/components/form/serviceRow';
import {
  validateLocationFields,
  validateServices,
  validateUserFields,
} from '@/app/utils/helpers/form';
import { useRouter } from 'next/navigation';
import { Checkbox } from 'primereact/checkbox';

const NewJobPage = () => {
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedUsername, setSelectedUsername] = useState('');

  const [selectedServices, setSelectedServices] = useState([]);

  const [street, setStreet] = useState('');
  const [unitNumber, setUnitNumber] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('Canada');
  const [selectedLocation, setSelectedLocation] = useState('');

  const [showUserSection, setShowUserSection] = useState(true);
  const [showLocationSection, setShowLocationSection] = useState(false);
  const [showServicesSection, setShowServicesSection] = useState(false);

  const [estimatedTotal, setEstimatedTotal] = useState(0);
  const [sendToUser, setSendToUser] = useState(false);

  const calculateEstimatedTotal = (services) => {
    let retTotal = 0;
    for (let service of services) {
      if (isNaN(service.price)) continue;
      let sPrice = service.price;
      let taxTotalMultiplier = 1;
      for (let tax of service.taxes) {
        taxTotalMultiplier += tax.amount;
      }
      let sTotalAmount = sPrice * taxTotalMultiplier;
      retTotal += sTotalAmount;
    }
    setEstimatedTotal(retTotal);
  };

  useEffect(() => {
    if (selectedServices.length > 0) {
      calculateEstimatedTotal(selectedServices);
    }
  }, [selectedServices]);

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

  const selectExistingLocation = (location) => {
    const address = location.address;
    if (!address) return;
    const lStreet = address.street;
    const lUnitNumber = address.unitNumber;
    const lCity = address.city;
    const lProvince = address.province;
    const lPostalCode = address.postalCode;
    const lCountry = address.country;

    setStreet(lStreet);
    setUnitNumber(lUnitNumber);
    setCity(lCity);
    setProvince(lProvince);
    setPostalCode(lPostalCode);
    setCountry(lCountry);
    setSelectedLocation(location);
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
            filter
          />
        </div>
      </div>
    );
  };

  const LocationSection = () => {
    return (
      <div className={styles.contentContainer}>
        <div className={styles.inputContainer}>
          <div className={styles.fieldContainer}>
            <InputTextField
              customFlex={3}
              title={'Address *'}
              value={street}
              setValue={setStreet}
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
            value={selectedLocation}
            onChange={(e) => {
              selectExistingLocation(e.value);
            }}
            options={dummyAddresses}
            optionLabel='search'
            placeholder='Search addresses'
          />
        </div>
      </div>
    );
  };

  const handleAddService = () => {
    let tempArray = [...selectedServices];
    tempArray.push({
      name: '',
      description: '',
      taxes: [],
      quantity: 1,
    });
    setSelectedServices(tempArray);
  };

  const ServicesSection = () => {
    return (
      <div>
        {selectedServices.map((service, index) => {
          return (
            <div key={index}>
              <ServiceRow
                index={index}
                selectedServices={selectedServices}
                setSelectedServices={setSelectedServices}
              />
            </div>
          );
        })}
        <div className={styles.fieldContainer}></div>
        <Button onClick={() => handleAddService()}>Add Service</Button>
      </div>
    );
  };

  const handleCreateJob = () => {
    const userObj = {
      firstName,
      lastName,
      email,
      phoneNumber,
    };
    const locationObj = {
      street,
      unitNumber,
      city,
      province,
      postalCode,
      country,
    };
    const servicesList = selectedServices;
    const userIsValid = validateUserFields(userObj);
    const locationIsValid = validateLocationFields(locationObj);
    const servicesIsValid = validateServices(servicesList);

    if (userIsValid && locationIsValid && servicesIsValid) {
      // TODO: Hook up to API
      // call api
      if (true) {
        router.push('/dashboard/jobs/manage');
      }
    }
  };

  return (
    <div
      style={{
        width: '100%',
      }}>
      <Card title={'Create New Job'} style={{ padding: 10 }}>
        <InputSection
          handleOnClick={setShowUserSection}
          onClickParam={showUserSection}
          title={'Customer Information'}
          section={UserSection}
        />
        <InputSection
          handleOnClick={setShowLocationSection}
          onClickParam={showLocationSection}
          title={'Location Details'}
          section={LocationSection}
        />
        <InputSection
          handleOnClick={setShowServicesSection}
          onClickParam={showServicesSection}
          title={'Service Details'}
          section={ServicesSection}
        />

        <div style={{ display: 'flex', alignItems: 'center', marginTop: 20 }}>
          <Checkbox
            onChange={(e) => setSendToUser(e.checked)}
            checked={sendToUser}
          />
          <label
            htmlFor='ingredient1'
            className='ml-2'
            style={{ marginLeft: 6 }}>
            Send confirmation email to user
          </label>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Button style={{ marginRight: 10 }} onClick={() => handleCreateJob()}>
            Create Job
          </Button>
          <div>Estimated Total: {formatPriceDisplay(estimatedTotal)}</div>
        </div>
      </Card>
    </div>
  );
};

export default NewJobPage;
