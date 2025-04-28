'use client';
import ManageColumn from '@/app/components/manage/manageColumn';
import { Divider } from 'primereact/divider';
import styles from '@/app/dashboard/jobs/manage/page.module.css';
import CardContainer from '@/app/components/cardContainer';
import { useEffect, useState } from 'react';
import { _apiCall, checkForUserOrg } from '@/app/utils/helpers/functions';
import { API_SERVICES } from '@/app/utils/constants';
import NoOrganizationPage from '@/app/components/noOrganizationPage';

const ManageJobsPage = () => {
  const [jobs, setJobs] = useState({});

  const [loading, setLoading] = useState(false);

  const [userHasOrg, setUserHasOrg] = useState(false);

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

  const moveJob = (jobId, colIndex, newStatus) => {
    if (colIndex === 4) {
      // Do something to archive
      return;
    }
    const jobsClone = { ...jobs };
    const currJobsClone = [...jobsClone[colIndex]];

    const currJobIndex = currJobsClone.findIndex((job) => job._id === jobId);
    if (currJobIndex > -1) {
      const currJob = { ...currJobsClone[currJobIndex] };

      const nextJobsClone = [...jobsClone[colIndex + 1]];

      currJobsClone.splice(currJobIndex, 1);
      nextJobsClone.push({ ...currJob, statusCode: newStatus });

      jobsClone[colIndex] = currJobsClone;
      jobsClone[colIndex + 1] = nextJobsClone;

      setJobs(jobsClone);
    }
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      const userHasOrgRes = checkForUserOrg();
      setUserHasOrg(userHasOrgRes);
    }
  }, []);

  useEffect(() => {
    retrieveJobs();
  }, []);

  return (
    <CardContainer title={'Manage Jobs'}>
      {!loading && userHasOrg ? (
        <div className={styles.columnsContainer}>
          <ManageColumn
            title={'In Queue'}
            jobs={jobs[1]}
            moveJob={moveJob}
            colIndex={1}
          />
          <Divider layout='vertical' />
          <ManageColumn
            title={'In Progress'}
            jobs={jobs[2]}
            moveJob={moveJob}
            colIndex={2}
          />
          <Divider layout='vertical' />
          <ManageColumn
            title={'Waiting for Payment'}
            jobs={jobs[3]}
            moveJob={moveJob}
            colIndex={3}
          />
          <Divider layout='vertical' />
          <ManageColumn
            title={'Done'}
            jobs={jobs[4]}
            moveJob={moveJob}
            colIndex={4}
          />
        </div>
      ) : (
        <NoOrganizationPage />
      )}
    </CardContainer>
  );
};

export default ManageJobsPage;
