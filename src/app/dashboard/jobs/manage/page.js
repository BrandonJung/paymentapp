import ManageColumn from '@/app/components/manage/manageColumn';
import { Divider } from 'primereact/divider';
import { dummyManageServicesList } from '../../../../../dummyData';
import styles from '@/app/dashboard/jobs/manage/page.module.css';
import CardContainer from '@/app/components/cardContainer';

const ManageJobsPage = () => {
  return (
    <CardContainer title={'Manage Jobs'}>
      <div className={styles.columnsContainer}>
        <ManageColumn title={'In Queue'} jobs={dummyManageServicesList} />
        <Divider layout='vertical' />
        <ManageColumn title={'In Progress'} />
        <Divider layout='vertical' />
        <ManageColumn title={'Waiting for Payment'} />
        <Divider layout='vertical' />
        <ManageColumn title={'Done'} />
      </div>
    </CardContainer>
  );
};

export default ManageJobsPage;
