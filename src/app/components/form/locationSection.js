import { useState } from 'react';
import ContentContainer from './contentContainer';
import FieldContainer from './fieldContainer';
import InputContainer from './inputContainer';
import InputTextField from './inputTextField';
import { Divider } from 'primereact/divider';
import SelectContainer from './selectContainer';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

const LocationSection = ({
  location,
  updateLocation,
  selectExistingLocation,
  existingLocations,
  disableEditing = false,
  resetLocation,
}) => {
  const [isUpdateExistingLocation, setIsUpdateExistingLocation] =
    useState(false);

  return (
    <ContentContainer>
      <InputContainer>
        <FieldContainer>
          <InputTextField
            customFlex={3}
            title={'Address *'}
            field={'street'}
            value={location.street}
            setValue={updateLocation}
            disabled={disableEditing && !isUpdateExistingLocation}
          />
          <InputTextField
            customFlex={1}
            title={'Unit #'}
            field={'unitNumber'}
            value={location.unitNumber}
            setValue={updateLocation}
            disabled={disableEditing && !isUpdateExistingLocation}
          />
        </FieldContainer>
        <FieldContainer>
          <InputTextField
            title={'City *'}
            field={'city'}
            value={location.city}
            setValue={updateLocation}
            disabled={disableEditing && !isUpdateExistingLocation}
          />
          <InputTextField
            title={'Province *'}
            field={'province'}
            value={location.province}
            setValue={updateLocation}
            disabled={disableEditing && !isUpdateExistingLocation}
          />
        </FieldContainer>
        <FieldContainer>
          <InputTextField
            title={'Postal Code *'}
            field={'postalCode'}
            value={location.postalCode}
            setValue={updateLocation}
            disabled={disableEditing && !isUpdateExistingLocation}
          />
          <InputTextField
            title={'Country'}
            field={'country'}
            value={location.country}
            setValue={updateLocation}
            disabled
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
          <label style={{ marginBottom: 4 }}>{'Past Addresses'}</label>
          <Dropdown
            value={location}
            onChange={(e) => {
              selectExistingLocation(e.value);
            }}
            options={existingLocations ?? []}
            optionLabel='search'
            placeholder='Select past addresses'
            filter
          />
        </div>
        {location._id ? (
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
                resetLocation();
                setIsUpdateExistingLocation(false);
              }}>
              New location
            </Button>
            <Button
              onClick={() => {
                setIsUpdateExistingLocation(true);
              }}>
              Edit location
            </Button>
          </div>
        ) : null}
      </SelectContainer>
    </ContentContainer>
  );
};

export default LocationSection;
