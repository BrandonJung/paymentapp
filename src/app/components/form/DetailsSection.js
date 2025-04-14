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
      </InputContainer>
      <div style={{ display: 'flex', flex: 1 }} />
    </ContentContainer>
  );
};

export default DetailsSection;
