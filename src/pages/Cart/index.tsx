import { useState } from "react";
import { Link } from "react-router-dom";

import { useOrder } from "../../app/providers/OrderProvider";
import { PageHeader } from "../../components/layout/PageHeader";
import { CartSummary } from "../../components/order/CartSummary";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { EmptyState } from "../../components/ui/EmptyState";
import { Input } from "../../components/ui/Input";
import { coupons } from "../../data/promotions";
import { formatCurrency } from "../../domain/order/orderFormatters";
import { selectAppliedCoupon, selectOrderTotals } from "../../domain/order/orderSelectors";

import styles from "./styles.module.css";

export function Cart() {
  const { state, dispatch } = useOrder();
  const [couponInput, setCouponInput] = useState(state.couponCode ?? "");
  const [couponMessage, setCouponMessage] = useState<string | null>(null);

  const totals = selectOrderTotals(state);
  const appliedCoupon = selectAppliedCoupon(state);

  const hasItems = state.items.length > 0;

  function handleDecreaseQuantity(productId: string, currentQuantity: number) {
    dispatch({
      type: "CHANGE_ITEM_QUANTITY",
      payload: {
        productId,
        quantity: currentQuantity - 1,
      },
    });
  }

  function handleIncreaseQuantity(productId: string, currentQuantity: number) {
    dispatch({
      type: "CHANGE_ITEM_QUANTITY",
      payload: {
        productId,
        quantity: currentQuantity + 1,
      },
    });
  }

  function handleRemoveItem(productId: string) {
    dispatch({
      type: "REMOVE_ITEM",
      payload: {
        productId,
      },
    });
  }

  function handleApplyCoupon() {
    const normalizedCoupon = couponInput.trim().toUpperCase();

    if (!normalizedCoupon) {
      setCouponMessage("Informe um cupom para aplicar.");
      return;
    }

    const coupon = coupons.find((item) => item.code === normalizedCoupon);

    if (!coupon) {
      setCouponMessage("Cupom não encontrado.");
      return;
    }

    if (!coupon.active) {
      setCouponMessage("Este cupom não está ativo.");
      return;
    }

    dispatch({
      type: "APPLY_COUPON",
      payload: {
        couponCode: normalizedCoupon,
      },
    });

    setCouponMessage(`Cupom ${normalizedCoupon} aplicado com sucesso.`);
  }

  function handleClearCoupon() {
    dispatch({
      type: "CLEAR_COUPON",
    });

    setCouponInput("");
    setCouponMessage("Cupom removido.");
  }

  if (!hasItems) {
    return (
      <main>
        <PageHeader
          eyebrow="Carrinho"
          title="Seu carrinho está vazio"
          description="Adicione produtos do cardápio para continuar o pedido."
        />

        <EmptyState
          action={
            <Link to="/app/cardapio">
              <Button>Voltar ao cardápio</Button>
            </Link>
          }
          description="Nenhum produto foi adicionado ao pedido até o momento."
          icon="🛒"
          title="Nada por aqui ainda"
        />
      </main>
    );
  }

  return (
    <main>
      <PageHeader
        eyebrow="Carrinho"
        title="Revise seu pedido"
        description="Confira os produtos, ajuste quantidades, aplique cupom e avance para identificação."
        rightSlot={
          <Link to="/app/cardapio">
            <Button variant="secondary">Adicionar mais itens</Button>
          </Link>
        }
      />

      <section className={styles.layout}>
        <div className={styles.itemsList}>
          {state.items.map((item) => (
            <Card className={styles.cartItem} key={item.product.id}>
              <div className={styles.itemMain}>
                <span className={styles.itemEmoji} aria-hidden="true">
                  {item.product.imageEmoji}
                </span>

                <div>
                  <h2>{item.product.name}</h2>
                  <p>{item.product.description}</p>
                  <strong>{formatCurrency(item.product.priceInCents)}</strong>
                </div>
              </div>

              <div className={styles.itemActions}>
                <div className={styles.quantityControl} aria-label="Controle de quantidade">
                  <Button
                    onClick={() =>
                      handleDecreaseQuantity(item.product.id, item.quantity)
                    }
                    size="sm"
                    variant="ghost"
                  >
                    -
                  </Button>

                  <span>{item.quantity}</span>

                  <Button
                    onClick={() =>
                      handleIncreaseQuantity(item.product.id, item.quantity)
                    }
                    size="sm"
                    variant="ghost"
                  >
                    +
                  </Button>
                </div>

                <Button
                  onClick={() => handleRemoveItem(item.product.id)}
                  size="sm"
                  variant="danger"
                >
                  Remover
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <aside className={styles.sidebar}>
          <Card className={styles.couponCard}>
            <h2>Cupom promocional</h2>

            <Input
              label="Código do cupom"
              name="coupon"
              onChange={(event) => setCouponInput(event.target.value)}
              placeholder="Ex: NORDESTE10"
              value={couponInput}
            />

            {couponMessage ? (
              <p className={styles.couponMessage}>{couponMessage}</p>
            ) : null}

            {appliedCoupon ? (
              <p className={styles.appliedCoupon}>
                Aplicado: {appliedCoupon.description}
              </p>
            ) : null}

            <div className={styles.couponActions}>
              <Button fullWidth onClick={handleApplyCoupon} variant="secondary">
                Aplicar cupom
              </Button>

              {state.couponCode ? (
                <Button fullWidth onClick={handleClearCoupon} variant="ghost">
                  Remover cupom
                </Button>
              ) : null}
            </div>
          </Card>

          <CartSummary totals={totals} />

          <Link to="/app/identificacao">
            <Button fullWidth size="lg">
              Continuar
            </Button>
          </Link>
        </aside>
      </section>
    </main>
  );
}