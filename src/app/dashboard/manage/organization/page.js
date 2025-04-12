'use client';
import CardContainer from '@/app/components/cardContainer';
import ContentContainer from '@/app/components/form/contentContainer';
import FieldContainer from '@/app/components/form/fieldContainer';
import InputContainer from '@/app/components/form/inputContainer';
import InputSection from '@/app/components/form/inputSection';
import InputTextField from '@/app/components/form/inputTextField';
import TaxAndFeeRow from '@/app/components/form/taxAndFeeRow';
import { API_SERVICES } from '@/app/utils/constants';
import {
  validateOrgFields,
  validateTaxAndFees,
} from '@/app/utils/helpers/form';
import { _apiCall, checkForUserOrg } from '@/app/utils/helpers/functions';
import { Button } from 'primereact/button';
import { useEffect, useState } from 'react';

const OrganizationPage = () => {
  const [userHasOrg, setUserHasOrg] = useState(false);

  const [organizationName, setOrganizationName] = useState('');
  const [organizationTag, setOrganizationTag] = useState('');
  const [taxesAndFees, setTaxesAndFees] = useState([]);
  const [loading, setLoading] = useState(false);

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
              title={'Name*'}
              value={organizationName}
              setValue={setOrganizationName}
              placeholder='Organization name'
            />
            <InputTextField
              title={'Tag (3-5 characters)'}
              value={organizationTag}
              setValue={setOrganizationTag}
              placeholder='For invoice number'
              customMinLength={3}
              customMaxLength={5}
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
      identifier: crypto.randomUUID(),
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
        {taxesAndFees.map((taxAndFee, index) => {
          return (
            <TaxAndFeeRow
              key={taxAndFee.identifier || crypto.randomUUID()}
              taxAndFee={taxAndFee}
              taxesAndFees={taxesAndFees}
              setTaxesAndFees={setTaxesAndFees}
            />
          );
        })}
        <Button onClick={() => handleAddTaxAndFee()}>Add Tax or Fee</Button>
      </div>
    );
  };

  const handleCreateOrg = async () => {
    const organizationObj = {
      orgName: organizationName,
      orgTaxAndFeeRates: taxesAndFees,
      orgTag: organizationTag,
    };
    const orgFieldsAreValid = validateOrgFields(organizationObj);
    if (!orgFieldsAreValid.valid) {
      alert(orgFieldsAreValid.message);
      return;
    }

    const taxAndRatesAreValid = validateTaxAndFees(
      organizationObj.orgTaxAndFeeRates,
    );
    if (!taxAndRatesAreValid.valid) {
      alert(taxAndRatesAreValid.message);
      return;
    }

    try {
      setLoading(true);
      const userId = localStorage.getItem('userId');
      const createOrgRes = await _apiCall(
        API_SERVICES.organization,
        'create',
        'post',
        { ...organizationObj, userId },
      );
      if (createOrgRes.status === 200) {
        alert('Organization created');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
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
