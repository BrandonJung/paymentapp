import ManageColumn from '@/app/components/manage/manageColumn';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { dummyManageServicesList } from '../../../../../dummyData';
import styles from '@/app/dashboard/jobs/manage/page.module.css';

const ManageJobsPage = () => {
  return (
    <div
      style={{
        width: '100%',
      }}>
      <Card className={styles.manageCardContainer} title={'Manage Jobs'}>
        <div className={styles.columnsContainer}>
          <ManageColumn title={'In Queue'} jobs={dummyManageServicesList} />
          <Divider layout='vertical' />
          <ManageColumn title={'In Progress'} />
          <Divider layout='vertical' />
          <ManageColumn title={'Waiting for Payment'} />
          <Divider layout='vertical' />
          <ManageColumn title={'Done'} />
        </div>
      </Card>
    </div>
  );
};

export default ManageJobsPage;
