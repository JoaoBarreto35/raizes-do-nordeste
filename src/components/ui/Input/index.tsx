import type { InputHTMLAttributes } from "react";

import styles from "./styles.module.css";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  errorMessage?: string;
};

export function Input({
  label,
  errorMessage,
  id,
  className,
  ...props
}: InputProps) {
  const inputId = id ?? props.name ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <label className={`${styles.field} ${className ?? ""}`} htmlFor={inputId}>
      <span className={styles.label}>{label}</span>

      <input
        className={`${styles.input} ${errorMessage ? styles.inputError : ""}`}
        id={inputId}
        {...props}
      />

      {errorMessage ? <span className={styles.error}>{errorMessage}</span> : null}
    </label>
  );
}