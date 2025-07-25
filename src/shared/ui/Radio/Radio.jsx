import styles from "./Radio.module.css";

const Radio = ({ id, name, value, checked, ref, onChange, label }) => {
  return (
    <div className={styles.block}>
      <div className={styles.wrapper}>
        <input
          ref={ref}
          type="radio"
          value={value}
          checked={checked}
          id={id}
          name={name}
          onChange={onChange}
          className={styles.radio}
        />
        <div className={styles.check}></div>
      </div>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
    </div>
  );
};

export default Radio;
