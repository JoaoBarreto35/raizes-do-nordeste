import { Link, Navigate } from "react-router-dom";

import { useOrder } from "../../app/providers/OrderProvider";
import { PageHeader } from "../../components/layout/PageHeader";
import { CartSummary } from "../../components/order/CartSummary";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { units } from "../../data/units";

import styles from "./styles.module.css";

export function Confirmation() {
  const { state } = useOrder();

  const order = state.currentOrder;
  const unit = units.find((item) => item.id === order?.unitId);

  if (!order) {
    return <Navigate replace to="/app/cardapio" />;
  }

  return (
    <main>
      <PageHeader
        eyebrow="Pedido confirmado"
        title="Pagamento aprovado!"
        description="Seu pedido foi recebido pela unidade e já pode ser acompanhado pelo status."
      />

      <section className={styles.layout}>
        <Card className={styles.successCard} elevated>
          <span className={styles.successIcon} aria-hidden="true">
            ✅
          </span>

          <div>
            <h2>Pedido nº {order.orderNumber}</h2>
            <p>
              Unidade: <strong>{unit?.name ?? "Unidade selecionada"}</strong>
            </p>
            <p>
              Previsão de retirada:{" "}
              <strong>{order.estimatedTimeInMinutes} minutos</strong>
            </p>
            <p>
              Status inicial: <strong>Recebido</strong>
            </p>
          </div>

          <div className={styles.actions}>
            <Link to="/app/status">
              <Button fullWidth size="lg">
                Acompanhar pedido
              </Button>
            </Link>

            <Link to="/app/cardapio">
              <Button fullWidth size="lg" variant="secondary">
                Fazer novo pedido
              </Button>
            </Link>
          </div>
        </Card>

        <aside className={styles.sidebar}>
          <Card className={styles.itemsCard}>
            <h2>Itens do pedido</h2>

            <ul>
              {order.items.map((item) => (
                <li key={item.product.id}>
                  <span>
                    {item.quantity}x {item.product.name}
                  </span>
                  <strong>{item.product.imageEmoji}</strong>
                </li>
              ))}
            </ul>
          </Card>

          <CartSummary totals={order.totals} />
        </aside>
      </section>
    </main>
  );
}