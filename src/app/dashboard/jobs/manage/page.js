'use client';
import ManageColumn from '@/app/components/manage/manageColumn';
import { Divider } from 'primereact/divider';
import { dummyManageServicesList } from '../../../../../dummyData';
import styles from '@/app/dashboard/jobs/manage/page.module.css';
import CardContainer from '@/app/components/cardContainer';
import { useEffect, useState } from 'react';
import { _apiCall } from '@/app/utils/helpers/functions';
import { API_SERVICES } from '@/app/utils/constants';

const ManageJobsPage = () => {
  const [jobs, setJobs] = useState({});

  const [loading, setLoading] = useState(false);

  const retrieveJobs = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem('userId');

      const res = await _apiCall(API_SERVICES.job, 'jobs', 'get', { userId });

      console.log('Retrieved Manage Jobs', res);
      if (res.status === 200) {
        setJobs(res.jobs);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    retrieveJobs();
  }, []);

  return (
    <CardContainer title={'Manage Jobs'}>
      {!loading ? (
        <div className={styles.columnsContainer}>
          <ManageColumn title={'In Queue'} jobs={jobs[1]} />
          <Divider layout='vertical' />
          <ManageColumn title={'In Progress'} jobs={jobs[2]} />
          <Divider layout='vertical' />
          <ManageColumn title={'Waiting for Payment'} jobs={jobs[3]} />
          <Divider layout='vertical' />
          <ManageColumn title={'Done'} jobs={jobs[4]} />
        </div>
      ) : null}
    </CardContainer>
  );
};

export default ManageJobsPage;
