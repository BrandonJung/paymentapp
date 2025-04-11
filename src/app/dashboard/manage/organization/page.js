'use client';
import CardContainer from '@/app/components/cardContainer';
import ContentContainer from '@/app/components/form/contentContainer';
import FieldContainer from '@/app/components/form/fieldContainer';
import InputContainer from '@/app/components/form/inputContainer';
import InputSection from '@/app/components/form/inputSection';
import InputTextField from '@/app/components/form/inputTextField';
import TaxAndFeeRow from '@/app/components/form/taxAndFeeRow';
import { checkForUserOrg } from '@/app/utils/helpers/functions';
import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';

const OrganizationPage = () => {
  const [userHasOrg, setUserHasOrg] = useState(false);

  const [organizationName, setOrganizationName] = useState('');
  const [organizationTag, setOrganizationTag] = useState('');
  const [taxesAndFees, setTaxesAndFees] = useState([]);

  const retrieveOrganizationDetails = () => {
    return {};
  };

  useEffect(() => {
    const userHasOrgRes = checkForUserOrg();
    if (userHasOrgRes) {
      retrieveOrganizationDetails();
    }
    setUserHasOrg(userHasOrgRes);
  }, []);

  const DetailsSection = () => {
    return (
      <ContentContainer>
        <InputContainer>
          <FieldContainer>
            <InputTextField
              title={'Name'}
              value={organizationName}
              setValue={setOrganizationName}
              placeholder='Organization name'
            />
            <InputTextField
              title={'Tag'}
              value={organizationTag}
              setValue={setOrganizationTag}
              placeholder='For invoice number'
            />
          </FieldContainer>
        </InputContainer>
        <div style={{ display: 'flex', flex: 1 }} />
      </ContentContainer>
    );
  };

  const handleAddTaxAndFee = () => {
    let tempArray = [...taxesAndFees];
    tempArray.push({
      name: '',
      code: '',
      amount: 0,
      type: 'percent',
    });
    setTaxesAndFees(tempArray);
  };

  const TaxesAndFeesSection = () => {
    return (
      <div>
        {taxesAndFees.map((data, index) => {
          return (
            <div key={index}>
              <TaxAndFeeRow
                index={index}
                taxesAndFees={taxesAndFees}
                setTaxesAndFees={setTaxesAndFees}
              />
            </div>
          );
        })}
        <Button onClick={() => handleAddTaxAndFee()}>Add Tax or Fee</Button>
      </div>
    );
  };

  const handleCreateOrg = () => {
    return 'yay';
  };

  return (
    <CardContainer
      title={userHasOrg ? 'New Organization' : 'Organization'}
      overflow='scroll'>
      <InputSection title={'Details'} section={DetailsSection} />
      <InputSection title={'Taxes and Fees'} section={TaxesAndFeesSection} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Button style={{ marginRight: 10 }} onClick={() => handleCreateOrg()}>
          Save
        </Button>
      </div>
    </CardContainer>
  );
};

export default OrganizationPage;
