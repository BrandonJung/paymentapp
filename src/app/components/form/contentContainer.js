import styles from '@/app/dashboard/jobs/new/page.module.css';

const ContentContainer = ({ children, style }) => {
  return (
    <div style={style} className={styles.contentContainer}>
      {children}
    </div>
  );
};

export default ContentContainer;
