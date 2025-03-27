import styles from '@/app/dashboard/jobs/manage/page.module.css';

const ManageJobCardRow = ({ title, value }) => {
  return (
    <div className={styles.jobCardRow}>
      <div className={styles.jobCardKey}>{`${title}:`}</div>
      <div className={styles.jobCardValue}>{`${value}`}</div>
    </div>
  );
};

export default ManageJobCardRow;
