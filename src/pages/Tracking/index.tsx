import { Link, Navigate } from "react-router-dom";

import { useOrder } from "../../app/providers/OrderProvider";
import { PageHeader } from "../../components/layout/PageHeader";
import { OrderStatusTimeline } from "../../components/order/OrderStatusTimeline";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { units } from "../../data/units";
import { getOrderStatusLabel } from "../../domain/order/orderStatusHelpers";

import styles from "./styles.module.css";



export function Tracking() {
  const { state, dispatch } = useOrder();

  const order = state.currentOrder;
  const unit = units.find((item) => item.id === order?.unitId);

  if (!order) {
    return <Navigate replace to="/app/cardapio" />;
  }

  function handleAdvanceStatus(orderId: string) {
    dispatch({
      type: "ADVANCE_ORDER_STATUS",
      payload: {
        orderId,
      },
    });
  }

  return (
    <main>
      <PageHeader
        eyebrow="Acompanhamento"
        title={`Pedido nº ${order.orderNumber}`}
        description="Acompanhe o andamento do pedido até a retirada na unidade."
        rightSlot={
          <Link to="/admin">
            <Button variant="secondary">Ver painel interno</Button>
          </Link>
        }
      />

      <section className={styles.layout}>
        <Card className={styles.timelineCard} elevated>
          <div className={styles.cardHeader}>
            <div>
              <h2>Status do pedido</h2>
              <p>{unit?.name ?? "Unidade selecionada"}</p>
            </div>

            <Badge variant="primary">{getOrderStatusLabel(order.status)}</Badge>
          </div>

          <OrderStatusTimeline currentStatus={order.status} />

          <Button
            disabled={order.status === "finished"}
            fullWidth
            onClick={() => handleAdvanceStatus(order.id)}
            variant="secondary"
          >
            Simular avanço de status
          </Button>
        </Card>

        <Card className={styles.infoCard}>
          <h2>Informações</h2>

          <dl>
            <div>
              <dt>Cliente</dt>
              <dd>{order.customer?.name ?? "Visitante"}</dd>
            </div>

            <div>
              <dt>Canal</dt>
              <dd>{order.channel === "kiosk" ? "Totem" : "App"}</dd>
            </div>

            <div>
              <dt>Previsão</dt>
              <dd>{order.estimatedTimeInMinutes} min</dd>
            </div>

            <div>
              <dt>Pontos</dt>
              <dd>{order.totals.loyaltyPoints} pts</dd>
            </div>
          </dl>
        </Card>
      </section>
    </main>
  );
}