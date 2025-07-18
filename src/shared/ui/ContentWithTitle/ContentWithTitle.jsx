import styles from "./ContentWithTitle.module.css";

const ContentWithTitle = ({ title, children }) => {
  return (
    <div className={styles.block}>
      <div className={styles.block__title}>{title}</div>
      {children}
    </div>
  );
};

export default ContentWithTitle;
