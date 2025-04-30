import ContentContainer from '@/app/components/form/contentContainer';
import InvoiceReceiptContainer from '@/app/components/InvoiceReceiptContainer';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { Button } from 'primereact/button';
import { _apiCall } from '../utils/helpers/functions';
import { API_SERVICES } from '../utils/constants';
import { useState } from 'react';

const PaymentForm = ({ job, organization }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [currJob, setCurrJob] = useState(job);

  const handlePay = async () => {
    if (!stripe || !elements) {
      return;
    }

    try {
      const res = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
        //   confirmParams: {
        //     return_url: 'http://localhost:3000',
        //   },
      });
      console.log('Pay', res.paymentIntent);
      if (res.paymentIntent.status === 'succeeded') {
        const res = await _apiCall(API_SERVICES.job, 'receipt', 'post', {
          job: currJob,
        });
        if (res.success) {
          setCurrJob(res.job);
          alert('Payment success');
        }
      } else {
        alert('Error paying, please try again', res.error);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ContentContainer>
      {currJob?.statusCode > 299 && currJob?.statusCode < 400 ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
          }}>
          <h2 style={{ textAlign: 'center', marginBottom: 0 }}>Welcome!</h2>
          <h2 style={{ textAlign: 'center', marginBottom: 50 }}>
            {`Pay using a payment method below or e-transfer to ${organization?.email}`}
          </h2>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              height: '100%',
            }}>
            <div
              style={{
                display: 'flex',
                flex: 1,
              }}>
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#FFFFFF',
                  padding: 20,
                  borderRadius: 6,
                }}>
                <PaymentElement
                  options={{ defaultCollapsed: true, layout: 'tabs' }}
                />
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    flex: 1,
                    marginTop: 10,
                  }}>
                  <Button
                    onClick={() => {
                      handlePay();
                    }}>
                    Pay
                  </Button>
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flex: 1,
              }}>
              <InvoiceReceiptContainer currJob={currJob} />
            </div>
          </div>
        </div>
      ) : null}
    </ContentContainer>
  );
};

export default PaymentForm;
