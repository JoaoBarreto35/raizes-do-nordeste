import type { OrderStatus } from "../../../domain/order/orderTypes";

import styles from "./styles.module.css";

type TimelineStep = {
  status: OrderStatus;
  label: string;
  description: string;
};

const steps: TimelineStep[] = [
  {
    status: "received",
    label: "Recebido",
    description: "Pedido confirmado.",
  },
  {
    status: "preparing",
    label: "Em preparo",
    description: "A cozinha iniciou o preparo.",
  },
  {
    status: "ready",
    label: "Pronto para retirada",
    description: "Aguarde a chamada no balcão.",
  },
  {
    status: "finished",
    label: "Finalizado",
    description: "Pedido retirado pelo cliente.",
  },
];

type OrderStatusTimelineProps = {
  currentStatus: OrderStatus;
};

export function OrderStatusTimeline({ currentStatus }: OrderStatusTimelineProps) {
  const currentIndex = steps.findIndex((step) => step.status === currentStatus);

  return (
    <ol className={styles.timeline}>
      {steps.map((step, index) => {
        const isDone = index <= currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <li
            className={`${styles.step} ${isDone ? styles.done : ""} ${isCurrent ? styles.current : ""
              }`}
            key={step.status}
          >
            <span className={styles.dot} aria-hidden="true" />

            <div>
              <strong>{step.label}</strong>
              <p>{step.description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}