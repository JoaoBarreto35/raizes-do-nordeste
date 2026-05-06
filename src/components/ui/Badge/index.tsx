import type { ReactNode } from "react";

import styles from "./styles.module.css";

type BadgeVariant = "neutral" | "success" | "warning" | "error" | "primary";

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
};

export function Badge({ children, variant = "neutral" }: BadgeProps) {
  return <span className={`${styles.badge} ${styles[variant]}`}>{children}</span>;
}