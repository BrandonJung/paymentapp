'use client';

import { COLOURS } from '@/app/utils/constants';
import ManageJobCardRow from './manageJobCardRow';
import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import styles from '@/app/dashboard/jobs/manage/page.module.css';
import { Button } from 'primereact/button';

const ManageJobCard = ({ job }) => {
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
    case '0':
      buttonText = 'Send Email';
      break;
    case '1':
      buttonText = 'Send Invoice';
      break;
    case '2':
      buttonText = 'Paid By Cash';
      break;
    case '3':
      buttonText = 'Archive';
      break;
    default:
      break;
  }

  const [showDetails, setShowDetails] = useState(false);

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
          <div style={{ marginBottom: 10 }}>{`${username}`}</div>
          <ManageJobCardRow title={'Start Date'} value={startDate.dateString} />
          {endDate ? (
            <ManageJobCardRow title={'End Date'} value={endDate.dateString} />
          ) : null}
          <ManageJobCardRow title={'Price'} value={totalPrice} />
          <ManageJobCardRow title={'Invoice Number'} value={invoiceNumber} />
        </div>
        <Button
          style={{
            marginTop: 10,
            width: '100%',
            justifyContent: 'center',
            height: 30,
            zIndex: 10,
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
