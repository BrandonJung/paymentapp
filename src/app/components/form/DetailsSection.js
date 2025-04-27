import ContentContainer from './contentContainer';
import FieldContainer from './fieldContainer';
import InputContainer from './inputContainer';
import InputTextField from './inputTextField';

const DetailsSection = ({ organization, updateOrganization }) => {
  return (
    <ContentContainer>
      <InputContainer>
        <FieldContainer>
          <InputTextField
            title={'Name*'}
            field={'name'}
            value={organization.name}
            setValue={updateOrganization}
            placeholder='Organization name'
          />
          <InputTextField
            title={'Tag (3-5 characters)'}
            field={'tag'}
            value={organization.tag}
            setValue={updateOrganization}
            placeholder='For invoice numbers'
            customMinLength={3}
            customMaxLength={5}
          />
        </FieldContainer>
        <FieldContainer>
          <InputTextField
            title={'Email*'}
            field={'email'}
            value={organization.email}
            setValue={updateOrganization}
            placeholder='Email'
          />
          <InputTextField
            title={'Phone Number*'}
            field={'phoneNumber'}
            value={organization.phoneNumber}
            setValue={updateOrganization}
            placeholder='Phone number'
          />
        </FieldContainer>
      </InputContainer>
      <div style={{ display: 'flex', flex: 1 }} />
    </ContentContainer>
  );
};

export default DetailsSection;
