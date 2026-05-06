import { formatCurrency } from "../../../domain/order/orderFormatters";
import type { OrderTotals } from "../../../domain/order/orderTypes";

import styles from "./styles.module.css";

type CartSummaryProps = {
  totals: OrderTotals;
};

export function CartSummary({ totals }: CartSummaryProps) {
  return (
    <section className={styles.summary} aria-labelledby="cart-summary-title">
      <h2 id="cart-summary-title">Resumo</h2>

      <dl>
        <div>
          <dt>Subtotal</dt>
          <dd>{formatCurrency(totals.subtotalInCents)}</dd>
        </div>

        <div>
          <dt>Desconto</dt>
          <dd>-{formatCurrency(totals.discountInCents)}</dd>
        </div>

        <div>
          <dt>Pontos</dt>
          <dd>{totals.loyaltyPoints} pts</dd>
        </div>

        <div className={styles.total}>
          <dt>Total</dt>
          <dd>{formatCurrency(totals.totalInCents)}</dd>
        </div>
      </dl>
    </section>
  );
}