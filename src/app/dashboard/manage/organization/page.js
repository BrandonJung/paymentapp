'use client';
import CardContainer from '@/app/components/cardContainer';
import DetailsSection from '@/app/components/form/DetailsSection';
import InputSection from '@/app/components/form/inputSection';
import TaxesAndFeesSection from '@/app/components/form/taxesAndFeesSection';
import { API_SERVICES, defaultOrgObj } from '@/app/utils/constants';
import {
  createDefaultTaxAndFeeObj,
  validateOrgFields,
  validateTaxesAndFees,
} from '@/app/utils/helpers/form';
import { _apiCall, checkForUserOrg } from '@/app/utils/helpers/functions';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { useCallback, useEffect, useState } from 'react';

const OrganizationPage = () => {
  const [userHasOrg, setUserHasOrg] = useState(false);

  const [organization, setOrganization] = useState(defaultOrgObj);

  const [taxesAndFees, setTaxesAndFees] = useState([]);
  const [isAnyEditing, setIsAnyEditing] = useState(0);

  const [showDialog, setShowDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const retrieveOrganizationDetails = async () => {
    const userId = localStorage.getItem('userId');

    try {
      const orgRes = await _apiCall(
        API_SERVICES.organization,
        'retrieve',
        'get',
        { userId },
      );
      console.log('Org res: ', orgRes);
      if (orgRes.status === 200) {
        setOrganization(orgRes.details);
        const cloneTaxAndFeeRates = orgRes.taxesAndFeeRates;
        cloneTaxAndFeeRates.map((tf) => {
          if (tf.type === 'flat') {
            tf.amount = tf.amount / 100;
          }
        });
        setTaxesAndFees(cloneTaxAndFeeRates);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      const userHasOrgRes = checkForUserOrg();
      if (userHasOrgRes) {
        setUserHasOrg(userHasOrgRes);
        retrieveOrganizationDetails();
      }
    }
  }, []);

  const handleCreateOrg = async () => {
    if (isAnyEditing > 0) {
      alert('A tax or fee is not saved');
      return;
    }
    const organizationObj = { ...organization, taxesAndFees };
    const orgFieldsAreValid = validateOrgFields(organizationObj);
    if (!orgFieldsAreValid.valid) {
      alert(orgFieldsAreValid.message);
      return;
    }

    const taxAndRatesAreValid = validateTaxesAndFees(
      organizationObj.taxesAndFees,
    );
    if (!taxAndRatesAreValid.valid) {
      alert(taxAndRatesAreValid.message);
      return;
    }

    try {
      const userId = localStorage.getItem('userId');
      const createOrgRes = await _apiCall(
        API_SERVICES.organization,
        'create',
        'post',
        { ...organizationObj, userId },
      );
      console.log(createOrgRes);
      if (createOrgRes.status === 200) {
        const isAnyEditingArray = new Array(
          createOrgRes.taxesAndFeeRates.length,
        )
          .fill(0)
          .map((e) => new Array(createOrgRes.taxesAndFeeRates.length).fill(!1));
        setOrganization(createOrgRes.details);
        setTaxesAndFees(createOrgRes.taxesAndFeeRates);
        setIsAnyEditing(isAnyEditingArray);
        localStorage.setItem('userHasOrg', true);
        setShowDialog(true);
      } else {
        alert(`${createOrgRes.message}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateOrganization = useCallback((value, field) => {
    setOrganization((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  }, []);

  const addTaxAndFee = () => {
    const defaultTaxAndFeeObj = createDefaultTaxAndFeeObj();
    setTaxesAndFees((prevState) => [...prevState, defaultTaxAndFeeObj]);
    isEditingTax();
  };

  const saveTaxAndFee = (passedTaxAndFee) => {
    setTaxesAndFees((prevStates) =>
      prevStates.map((item) => {
        return item.identifier === passedTaxAndFee.identifier
          ? { ...item, ...passedTaxAndFee }
          : item;
      }),
    );
    saveEditingTax();
  };

  const deleteTaxAndFee = (passedTaxAndFee) => {
    setTaxesAndFees((prevStates) =>
      prevStates.filter(
        (item) => item.identifier !== passedTaxAndFee.identifier,
      ),
    );
    saveEditingTax();
  };

  const isEditingTax = () => {
    setIsAnyEditing(isAnyEditing + 1);
  };

  const saveEditingTax = () => {
    setIsAnyEditing(isAnyEditing - 1);
  };

  return (
    <CardContainer title={'Organization'} overflow='scroll'>
      <InputSection title={'Details'}>
        <DetailsSection
          organization={organization}
          updateOrganization={updateOrganization}
        />
      </InputSection>
      <InputSection title={'Taxes and Fees'}>
        <TaxesAndFeesSection
          taxesAndFees={taxesAndFees}
          addTaxAndFee={addTaxAndFee}
          saveTaxAndFee={saveTaxAndFee}
          deleteTaxAndFee={deleteTaxAndFee}
          isEditingTax={isEditingTax}
          saveEditingTax={saveEditingTax}
        />
      </InputSection>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Button styles={{ marginRight: 10 }} onClick={() => handleCreateOrg()}>
          Save
        </Button>
      </div>
      <Dialog
        header='Success!'
        visible={showDialog}
        style={{ width: '50vw' }}
        onHide={() => {
          if (!showDialog) return;
          setShowDialog(false);
        }}>
        <p>Organization saved</p>
      </Dialog>
    </CardContainer>
  );
};

export default OrganizationPage;
