'use client';
import CardContainer from '@/app/components/cardContainer';
import PaymentForm from '@/app/components/paymentForm';
import { API_SERVICES } from '@/app/utils/constants';
import { _apiCall } from '@/app/utils/helpers/functions';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_TEST_STRIPE_KEY);

const CustomerPayPage = () => {
  const params = useParams();

  const [job, setJob] = useState(null);
  const [organization, setOrganization] = useState(null);
  const [clientSecret, setClientSecret] = useState('');

  const retrieveOrganization = async (passedOrgId) => {
    try {
      const res = await _apiCall(API_SERVICES.organization, '', 'get', {
        orgId: passedOrgId,
      });
      console.log('Retrieve org res', res);
      if (res.success) {
        setOrganization(res.org);
      } else {
        alert('Error retrieving organization');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const createPaymentIntent = async () => {
    try {
      const res = await _apiCall(API_SERVICES.payment, 'createIntent', 'post', {
        jobId: decodeURIComponent(params.id),
      });
      console.log('Create payment intent', res);
      if (res.success) {
        setJob(res.job);
        setClientSecret(res.clientSecret);
        retrieveOrganization(res.job.organizationId);
      } else {
        alert('Error retrieving organization');
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    createPaymentIntent();
    retrieveOrganization();
  }, []);

  const options = {
    clientSecret: clientSecret,
  };

  return (
    <CardContainer overflow='scroll'>
      {clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <PaymentForm job={job} organization={organization} />
        </Elements>
      ) : null}
    </CardContainer>
  );
};

export default CustomerPayPage;
