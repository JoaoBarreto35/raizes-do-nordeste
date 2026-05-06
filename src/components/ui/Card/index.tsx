import type { HTMLAttributes, ReactNode } from "react";

import styles from "./styles.module.css";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  elevated?: boolean;
};

export function Card({
  children,
  elevated = false,
  className,
  ...props
}: CardProps) {
  const classNames = [styles.card, elevated ? styles.elevated : "", className ?? ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
}