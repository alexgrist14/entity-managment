import styles from "./Input.module.css";
import classNames from "classnames";

const Input = ({
  name,
  id,
  ref,
  type,
  value,
  onChange,
  placeholder,
  readOnly,
  className,
  onClick,
  disabled,
}) => {
  return (
    <input
      onClick={onClick}
      readOnly={readOnly}
      disabled={disabled}
      id={id}
      ref={ref}
      className={classNames(styles.input, className)}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default Input;
