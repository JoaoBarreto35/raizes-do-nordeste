import type { ReactNode } from "react";

import styles from "./styles.module.css";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  rightSlot?: ReactNode;
  bottomSlot?: ReactNode;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  rightSlot,
  bottomSlot,
}: PageHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}

        <div className={styles.titleRow}>
          <div>
            <h1>{title}</h1>
            {description ? <p>{description}</p> : null}
          </div>

          {rightSlot ? <div className={styles.rightSlot}>{rightSlot}</div> : null}
        </div>
      </div>

      {bottomSlot ? <div className={styles.bottomSlot}>{bottomSlot}</div> : null}
    </header>
  );
}