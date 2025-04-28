import ManageJobCard from './manageJobCard';
import styles from '@/app/dashboard/jobs/manage/page.module.css';

const ManageColumn = ({ title, customFlex = 1, jobs, moveJob, colIndex }) => {
  return (
    <div
      className={styles.columnContainer}
      style={{
        flex: customFlex,
      }}>
      <h3>{title}</h3>
      <div className={styles.container}>
        <div>
          {jobs?.length
            ? jobs.map((job, index) => {
                return (
                  <ManageJobCard
                    key={`${job._id}_${index}`}
                    job={job}
                    moveJob={moveJob}
                    colIndex={colIndex}
                  />
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default ManageColumn;
