'use client';

import { API_SERVICES, COLOURS } from '@/app/utils/constants';
import ManageJobCardRow from './manageJobCardRow';
import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import styles from '@/app/dashboard/jobs/manage/page.module.css';
import { Button } from 'primereact/button';
import { convertPriceToDisplay } from '@/app/utils/helpers/formatters';
import { _apiCall } from '@/app/utils/helpers/functions';

const ManageJobCard = ({ job, moveJob, colIndex }) => {
  const {
    customer,
    services,
    location,
    totalPrice,
    date,
    invoiceNumber,
    statusCode,
  } = job;
  const { username, email, phoneNumber } = customer;
  const { street } = location;
  const { startDate, endDate } = date;
  const statusColumn = statusCode.toString().charAt(0);

  let buttonText = '';

  switch (statusColumn) {
    case '1':
      buttonText = 'Send Email';
      break;
    case '2':
      buttonText = 'Send Invoice';
      break;
    case '3':
      buttonText = 'Paid By Cash';
      break;
    case '4':
      buttonText = 'Archive';
      break;
    default:
      break;
  }

  const [showDetails, setShowDetails] = useState(false);

  const handleStartJob = async () => {
    try {
      const res = await _apiCall(API_SERVICES.job, 'start', 'post', {
        job,
      });
      console.log('Send email to customer res', res);
      if (res.success) {
        moveJob(job._id, colIndex, 200);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleInvoiceJob = async () => {
    try {
      const res = await _apiCall(API_SERVICES.job, 'invoice', 'post', {
        job,
      });
      console.log('Send invoice to customer res', res);
      if (res.success) {
        moveJob(job._id, colIndex, 300);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleReceiptJob = async () => {
    try {
      const res = await _apiCall(API_SERVICES.job, 'receipt', 'post', {
        job,
      });
      console.log('Send receipt to customer res', res);
      if (res.success) {
        moveJob(job._id, colIndex, 400);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleArchiveJob = async () => {
    try {
      const res = await _apiCall(API_SERVICES.job, 'archive', 'post', {
        job,
      });
      console.log('Archive job res', res);
      if (res.success) {
        moveJob(job._id, colIndex, 500);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnClick = () => {
    switch (statusColumn) {
      case '1':
        handleStartJob();
        break;
      case '2':
        handleInvoiceJob();
        break;
      case '3':
        handleReceiptJob();
        break;
      case '4':
        handleArchiveJob();
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div
        className={styles.jobCardContainer}
        style={{
          borderColor: COLOURS.tertiary,
          backgroundColor: COLOURS.secondary,
        }}>
        <div
          className={styles.jobRowContainer}
          onClick={() => {
            setShowDetails(true);
          }}>
          <div style={{ marginBottom: 20, fontSize: 18 }}>{`${username}`}</div>
          <ManageJobCardRow title={'Start Date'} value={startDate.dateString} />

          <ManageJobCardRow
            title={'End Date'}
            value={endDate.dateString ?? startDate.dateString}
          />

          <ManageJobCardRow
            title={'Price'}
            value={`$${convertPriceToDisplay(totalPrice)}`}
          />
          <ManageJobCardRow title={'Invoice Number'} value={invoiceNumber} />
        </div>
        <Button
          style={{
            marginTop: 10,
            width: '100%',
            justifyContent: 'center',
            height: 30,
            zIndex: 10,
          }}
          onClick={() => {
            handleOnClick();
          }}>
          {buttonText}
        </Button>
      </div>
      <Dialog
        header='Header'
        visible={showDetails}
        style={{ width: '50vw' }}
        closable
        closeOnEscape
        dismissableMask
        onHide={() => {
          setShowDetails(false);
        }}>
        <p>hey</p>
      </Dialog>
    </div>
  );
};

export default ManageJobCard;
