'use client';

import InputField from '@/app/components/inputField';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { Card } from 'primereact/card';
import { useState } from 'react';
import { dummyUsers } from '../../../../dummyData';
import { Dropdown } from 'primereact/dropdown';

const NewPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedUsername, setSelectedUsername] = useState(null);

  const selectExistingUser = (user) => {
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

  const UserAccordion = () => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            flex: 2,
          }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            <InputField
              title={'First Name'}
              value={firstName}
              setValue={setFirstName}
            />
            <InputField
              title={'Last Name'}
              value={lastName}
              setValue={setLastName}
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              flex: 2,
            }}>
            <InputField title={'Email'} value={email} setValue={setEmail} />
            <InputField
              title={'Phone Number'}
              value={phoneNumber}
              setValue={setPhoneNumber}
            />
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flex: 1,
            flexWrap: 'wrap',
            flexDirection: 'column',
            gap: 4,
            paddingRight: 20,
            marginBottom: 20,
          }}>
          <label>{'Existing Users'}</label>
          <Dropdown
            value={selectedUsername}
            onChange={(e) => {
              selectExistingUser(e.value);
            }}
            options={dummyUsers}
            optionLabel='name'
            placeholder='Select a User'
          />
        </div>
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
      <Card
        title={'Create New'}
        style={{
          padding: 10,
        }}>
        <Accordion activeIndex={0}>
          <AccordionTab header={'Customer Information'}>
            {UserAccordion()}
          </AccordionTab>
          <AccordionTab header={'Job Information'}></AccordionTab>
          <AccordionTab header={'Payment Information'}></AccordionTab>
        </Accordion>
      </Card>
    </div>
  );
};

export default NewPage;
