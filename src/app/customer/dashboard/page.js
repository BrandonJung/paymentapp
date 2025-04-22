'use client';
import CardContainer from '@/app/components/cardContainer';
import { v2DummyJobs } from '../../../../dummyData';
import { useCallback, useRef, useState } from 'react';
import { TabPanel, TabView } from 'primereact/tabview';
import InputSection from '@/app/components/form/inputSection';
import CustomerSection from '@/app/components/form/customerSection';
import {
  defaultCustomerObj,
  defaultPaymentInformation,
} from '@/app/utils/constants';
import SaveDeleteEditButton from '@/app/components/form/saveDeleteEditButton';
import { Toast } from 'primereact/toast';
import PaymentSection from '@/app/components/payment/PaymentSection';
import { Button } from 'primereact/button';

const CustomerDashboard = () => {
  const [invoices, setInvoices] = useState(
    v2DummyJobs.map((job) => {
      return (job = { ...job, visible: false });
    }),
  );

  const [customer, setCustomer] = useState(defaultCustomerObj);
  const [paymentInformation, setPaymentInformation] = useState(
    defaultPaymentInformation,
  );
  const [billingInformation, setBillingInformation] = useState();
  const [paymentAddress, setPaymentAddress] = useState();
  const [billingAddress, setBillingAddress] = useState();

  const toast = useRef(null);

  const [isBillingSame, setIsBillingSame] = useState(true);

  const [isEditingPaymentInformation, setIsEditingPaymentInformation] =
    useState(true);
  const [isEditingBillingInformation, setIsEditingBillingInformation] =
    useState(false);
  const [isEditingCustomer, setIsEditingCustomer] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleOnClickPay = (passedIndex) => {
    const invoiceClone = [...invoices];
    invoiceClone[passedIndex].visible = true;
    setActiveIndex(passedIndex + 1);
    setInvoices(invoiceClone);
  };

  const hideInvoice = (passedIndex) => {
    const invoiceClone = [...invoices];
    invoiceClone[passedIndex].visible = false;
    setActiveIndex(0);
    setInvoices(invoiceClone);
  };

  const updateCustomer = useCallback((value, field) => {
    setCustomer((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  }, []);

  const updatePaymentInformation = useCallback((value, field) => {
    setPaymentInformation((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  }, []);

  const updateBillingInformation = useCallback((value, field) => {
    setBillingInformation((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  }, []);

  const updatePaymentAddress = useCallback((value, field) => {
    setPaymentAddress((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  }, []);

  const updateBillingAddress = useCallback((value, field) => {
    setBillingAddress((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  }, []);

  const handleCustomerSave = () => {
    toast.current.show({
      severity: 'success',
      summary: 'Success!',
      detail: 'Information Saved',
    });
    setIsEditingCustomer(false);
  };

  const handleCustomerEdit = () => {
    setIsEditingCustomer(true);
  };

  const handlePaymentSave = () => {
    toast.current.show({
      severity: 'success',
      summary: 'Success!',
      detail: 'Payment Saved',
    });
    setIsEditingPaymentInformation(false);
  };

  const handlePaymentEdit = () => {
    setIsEditingPaymentInformation(true);
  };

  const handleBillingSave = () => {
    toast.current.show({
      severity: 'success',
      summary: 'Success!',
      detail: 'Payment Saved',
    });
    setIsEditingPaymentInformation(false);
  };

  const handleBillingEdit = () => {
    setIsEditingPaymentInformation(true);
  };

  const handleSubmit = () => {
    toast.current.show({
      severity: 'info',
      summary: 'Payment Submitted',
      detail: 'Thanks!',
    });
  };

  return (
    <CardContainer title={'Home'} overflow='scroll'>
      {invoices?.length > 0 ? (
        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}>
          <TabPanel header={'Invoices'}>
            <div>
              Outstanding invoices:
              {invoices.map((invoice, index) => {
                return (
                  <div
                    key={`${invoice._id}_${index}`}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: 200,
                      marginTop: 20,
                    }}>
                    <div>{invoice.invoiceNumber + ' ' + index}</div>
                    <div
                      style={{
                        backgroundColor: 'purple',
                        padding: 10,
                        borderRadius: 6,
                      }}
                      onClick={() => handleOnClickPay(index)}>
                      {'Pay'}
                    </div>
                  </div>
                );
              })}
            </div>
          </TabPanel>
          {invoices.map((invoice, index) => {
            return (
              <TabPanel
                key={invoice._id + index}
                header={invoice.invoiceNumber}
                visible={invoice.visible}>
                <InputSection title={'Your Details'}>
                  <CustomerSection
                    customer={customer}
                    updateCustomer={updateCustomer}
                    disableEditing={!isEditingCustomer}
                  />
                  <SaveDeleteEditButton
                    isEditing={isEditingCustomer}
                    handleSave={handleCustomerSave}
                    handleEdit={handleCustomerEdit}
                  />
                </InputSection>
                <InputSection title={'Payment Information'}>
                  <PaymentSection
                    paymentInformation={paymentInformation}
                    updatePaymentInformation={updatePaymentInformation}
                    disableEditing={!isEditingPaymentInformation}
                  />
                  <SaveDeleteEditButton
                    isEditing={isEditingPaymentInformation}
                    handleSave={handlePaymentSave}
                    handleEdit={handlePaymentEdit}
                  />
                </InputSection>
              </TabPanel>
            );
          })}
        </TabView>
      ) : null}
      <Toast ref={toast} />
      {activeIndex > 0 ? (
        <Button onClick={() => handleSubmit()}>Submit</Button>
      ) : null}
    </CardContainer>
  );
};

export default CustomerDashboard;
