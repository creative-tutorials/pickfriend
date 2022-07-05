import React from "react";
import lgn from "../../../styles/login.module.css";
export function Form_error({ errorClass, errorMsg }) {
  return (
    <div className={lgn.errorDiv} ref={errorClass}>
      <span ref={errorMsg}>
        <i className="fa-light fa-exclamation-triangle"></i>
        Hello
      </span>
    </div>
  );
}
