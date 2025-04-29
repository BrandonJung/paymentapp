import ContentContainer from '@/app/components/form/contentContainer';
import InvoiceReceiptContainer from '@/app/components/InvoiceReceiptContainer';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { Button } from 'primereact/button';

const PaymentForm = ({ job, organization }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handlePay = async () => {
    if (!stripe || !elements) {
      return;
    }

    const res = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
      //   confirmParams: {
      //     return_url: 'http://localhost:3000',
      //   },
    });
    console.log('Pay', res);
    if (res.status === 'succeeded') {
      // call api to update job
    } else {
      alert('Error paying, please try again', res.error);
    }
  };
  return (
    <ContentContainer>
      {job?.statusCode > 299 && job?.statusCode < 400 ? (
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
              <InvoiceReceiptContainer job={job} />
            </div>
          </div>
        </div>
      ) : null}
    </ContentContainer>
  );
};

export default PaymentForm;
