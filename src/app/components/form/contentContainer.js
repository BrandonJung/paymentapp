import styles from '@/app/dashboard/jobs/new/page.module.css';

const ContentContainer = ({ children }) => {
  return <div className={styles.contentContainer}>{children}</div>;
};

export default ContentContainer;
