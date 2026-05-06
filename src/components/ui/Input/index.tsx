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
  const fieldClassName = [styles.field, className ?? ""].filter(Boolean).join(" ");
  const inputClassName = [
    styles.input,
    errorMessage ? styles.inputError : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label className={fieldClassName} htmlFor={inputId}>
      <span className={styles.label}>{label}</span>

      <input className={inputClassName} id={inputId} {...props} />

      {errorMessage ? <span className={styles.error}>{errorMessage}</span> : null}
    </label>
  );
}