import styles from "./Error.module.css";

const Error = ({ message }) => {
  return <p className={styles.error}>{message}</p>;
};

export default Error;
