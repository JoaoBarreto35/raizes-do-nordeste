import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useOrder } from "../../app/providers/OrderProvider";
import { CategoryTabs } from "../../components/menu/CategoryTabs";
import { CartSummary } from "../../components/order/CartSummary";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { EmptyState } from "../../components/ui/EmptyState";
import { menuItems } from "../../data/menuItems";
import type { MenuCategory, MenuItem } from "../../domain/menu/menuTypes";
import { selectOrderTotals } from "../../domain/order/orderSelectors";
import { findUnitById } from "../../domain/unit/unitHelpers";
import { createConfirmedOrder } from "../../services/mockOrderService";
import { simulatePayment } from "../../services/mockPaymentService";
import { formatCurrency } from "../../domain/order/orderFormatters";

import styles from "./styles.module.css";

const KIOSK_UNIT_ID = "shopping";

type SelectedCategory = MenuCategory | "all";

export function Kiosk() {
  const navigate = useNavigate();
  const { state, dispatch } = useOrder();

  const [selectedCategory, setSelectedCategory] =
    useState<SelectedCategory>("all");
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const kioskUnit = findUnitById(KIOSK_UNIT_ID);
  const totals = selectOrderTotals(state);

  const isProcessing = state.paymentStatus === "processing";

  const filteredProducts = useMemo(() => {
    return menuItems.filter((product) => {
      const belongsToUnit = product.unitIds.includes(KIOSK_UNIT_ID);
      const belongsToCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      return belongsToUnit && belongsToCategory;
    });
  }, [selectedCategory]);

  const itemsCount = state.items.reduce((total, item) => total + item.quantity, 0);
  function setupKioskContext() {
    dispatch({
      type: "SELECT_CHANNEL",
      payload: {
        channel: "kiosk",
      },
    });

    dispatch({
      type: "SELECT_UNIT",
      payload: {
        unitId: KIOSK_UNIT_ID,
      },
    });

    dispatch({
      type: "SET_CUSTOMER",
      payload: {
        customer: {
          mode: "guest",
          name: "Visitante Totem",
          email: "",
        },
      },
    });

    dispatch({
      type: "SET_PAYMENT_METHOD",
      payload: {
        paymentMethod: "card",
      },
    });
  }
  function handleStartKioskOrder() {
    dispatch({
      type: "RESET_CURRENT_ORDER",
    });

    setupKioskContext();
    setFeedbackMessage("Totem iniciado para pedido presencial.");
  }

  function getQuantityInCart(productId: string): number {
    return (
      state.items.find((item) => item.product.id === productId)?.quantity ?? 0
    );
  }

  function handleAddProduct(product: MenuItem) {
    if (state.selectedChannel !== "kiosk") {
      setupKioskContext();
    }

    dispatch({
      type: "ADD_ITEM",
      payload: {
        product,
      },
    });

    setFeedbackMessage(`${product.name} adicionado ao pedido.`);
  }

  function handleRemoveItem(productId: string) {
    dispatch({
      type: "REMOVE_ITEM",
      payload: {
        productId,
      },
    });
  }

  function handleConsentChange(accepted: boolean) {
    dispatch({
      type: "SET_LGPD_CONSENT",
      payload: {
        accepted,
      },
    });

    setFeedbackMessage(null);
  }

  async function handleKioskPayment(shouldApprove: boolean) {
    if (!kioskUnit) {
      setFeedbackMessage("Unidade do totem não encontrada.");
      return;
    }

    if (state.items.length === 0) {
      setFeedbackMessage("Adicione ao menos um item antes de finalizar.");
      return;
    }

    if (!state.lgpdConsentAccepted) {
      setFeedbackMessage("Aceite o aviso de privacidade para continuar.");
      return;
    }

    setupKioskContext();



    dispatch({
      type: "SET_PAYMENT_STATUS",
      payload: {
        paymentStatus: "processing",
      },
    });

    setFeedbackMessage("Processando pagamento no totem...");

    const paymentResult = await simulatePayment({
      shouldApprove,
    });

    dispatch({
      type: "SET_PAYMENT_STATUS",
      payload: {
        paymentStatus: paymentResult.status,
      },
    });

    setFeedbackMessage(paymentResult.message);

    if (paymentResult.status === "declined") {
      return;
    }

    const order = createConfirmedOrder({
      channel: "kiosk",
      unitId: KIOSK_UNIT_ID,
      customer: {
        mode: "guest",
        name: "Visitante Totem",
        email: "",
      },
      items: state.items,
      couponCode: state.couponCode,
      paymentMethod: "card",
      totals,
      estimatedTimeInMinutes: kioskUnit.estimatedTimeInMinutes ?? 25,
    });

    dispatch({
      type: "CONFIRM_ORDER",
      payload: {
        order,
      },
    });

    navigate("/app/confirmacao");
  }

  return (
    <main className={styles.kioskPage}>
      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Totem de Autoatendimento</p>
          <h1>Faça seu pedido no balcão digital</h1>
          <p>
            Unidade atual:{" "}
            <strong>{kioskUnit?.name ?? "Unidade não encontrada"}</strong>
          </p>
        </div>

        <div className={styles.heroActions}>
          <Button onClick={handleStartKioskOrder} size="lg" variant="secondary">
            Iniciar pedido
          </Button>

          <Badge variant="primary">{itemsCount} itens</Badge>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.menuColumn}>
          <CategoryTabs
            onSelectCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />

          {filteredProducts.length > 0 ? (
            <div className={styles.productsGrid}>
              {filteredProducts.map((product) => (
                <Card className={styles.productCard} key={product.id}>
                  <span className={styles.productEmoji} aria-hidden="true">
                    {product.imageEmoji}
                  </span>

                  <div className={styles.productContent}>
                    <div>
                      <h2>{product.name}</h2>
                      <p>{product.description}</p>
                    </div>

                    <div className={styles.productFooter}>
                      <strong>{formatCurrency(product.priceInCents)}</strong>

                      <Button
                        disabled={!product.available}
                        onClick={() => handleAddProduct(product)}
                        size="lg"
                      >
                        {getQuantityInCart(product.id) > 0
                          ? `Adicionar (${getQuantityInCart(product.id)})`
                          : "Adicionar"}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState
              description="Não há produtos disponíveis nesta categoria."
              title="Nenhum produto encontrado"
            />
          )}
        </div>

        <aside className={styles.sidebar}>
          <Card className={styles.cartCard} elevated>
            <div className={styles.sidebarHeader}>
              <h2>Pedido atual</h2>
              <Badge variant="primary">Totem</Badge>
            </div>

            {state.items.length > 0 ? (
              <ul className={styles.cartList}>
                {state.items.map((item) => (
                  <li key={item.product.id}>
                    <span>
                      {item.quantity}x {item.product.name}
                    </span>

                    <Button
                      onClick={() => handleRemoveItem(item.product.id)}
                      size="sm"
                      variant="ghost"
                    >
                      Remover
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.emptyCart}>Nenhum item adicionado.</p>
            )}
          </Card>

          <CartSummary totals={totals} />

          <Card className={styles.consentCard}>
            <h2>Privacidade</h2>
            <p>
              Usamos os dados do pedido apenas para simular a identificação,
              preparo e retirada.
            </p>

            <label className={styles.checkbox}>
              <input
                checked={state.lgpdConsentAccepted}
                onChange={(event) => handleConsentChange(event.target.checked)}
                type="checkbox"
              />
              <span>Li e aceito o uso dos dados para processar o pedido.</span>
            </label>
          </Card>

          {feedbackMessage ? (
            <p className={styles.feedback}>{feedbackMessage}</p>
          ) : null}

          <div className={styles.paymentActions}>
            <Button
              disabled={isProcessing}
              fullWidth
              onClick={() => handleKioskPayment(true)}
              size="lg"
            >
              {isProcessing ? "Processando..." : "Finalizar pedido"}
            </Button>

            <Button
              disabled={isProcessing}
              fullWidth
              onClick={() => handleKioskPayment(false)}
              size="lg"
              variant="secondary"
            >
              Simular recusa
            </Button>
          </div>
        </aside>
      </section>
    </main>
  );
}