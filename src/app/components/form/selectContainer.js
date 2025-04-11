import styles from '@/app/dashboard/jobs/new/page.module.css';

const SelectContainer = ({ children }) => {
  return (
    <div className={styles.selectContainer} style={{ gap: 4, marginLeft: 20 }}>
      {children}
    </div>
  );
};

export default SelectContainer;
