import React from "react";
import styles from "./Button.module.css";
import PropTypes from "prop-types";
import classNames from "classnames";

const Button = ({ disabled, type, children, onClick, color = "accent" }) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={classNames(
        styles.button,
        !!color && styles[`button_${color}`]
      )}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(["accent", "edit"]),
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
