import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useOrder } from "../../app/providers/OrderProvider";
import { ConsentBox } from "../../components/lgpd/ConsentBox";
import { PageHeader } from "../../components/layout/PageHeader";
import { CartSummary } from "../../components/order/CartSummary";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { units } from "../../data/units";
import type { PaymentMethod } from "../../domain/payment/paymentTypes";
import {
  selectCanFinishPayment,
  selectOrderTotals,
} from "../../domain/order/orderSelectors";
import { simulatePayment } from "../../services/mockPaymentService";
import { createConfirmedOrder } from "../../services/mockOrderService";

import styles from "./styles.module.css";

type PaymentOption = {
  value: PaymentMethod;
  label: string;
  description: string;
  icon: string;
};

const paymentOptions: PaymentOption[] = [
  {
    value: "pix",
    label: "Pix",
    description: "Pagamento instantâneo simulado.",
    icon: "⚡",
  },
  {
    value: "card",
    label: "Cartão",
    description: "Cartão de crédito ou débito simulado.",
    icon: "💳",
  },
  {
    value: "meal-voucher",
    label: "Vale-refeição",
    description: "Benefício alimentação simulado.",
    icon: "🍽️",
  },
];

export function Payment() {
  const navigate = useNavigate();
  const { state, dispatch } = useOrder();

  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const totals = selectOrderTotals(state);
  const canFinishPayment = selectCanFinishPayment(state);
  const selectedUnit = units.find((unit) => unit.id === state.selectedUnitId);

  const hasItems = state.items.length > 0;
  const isProcessing = state.paymentStatus === "processing";

  function handleSelectPaymentMethod(paymentMethod: PaymentMethod) {
    dispatch({
      type: "SET_PAYMENT_METHOD",
      payload: {
        paymentMethod,
      },
    });

    setFeedbackMessage(null);
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

  async function handlePayment(shouldApprove: boolean) {
    if (!selectedUnit || !state.selectedUnitId || !state.paymentMethod) {
      setFeedbackMessage("Revise unidade, carrinho e forma de pagamento.");
      return;
    }

    if (!state.lgpdConsentAccepted) {
      setFeedbackMessage(
        "É necessário aceitar o uso dos dados para finalizar o pedido."
      );
      return;
    }

    if (!canFinishPayment) {
      setFeedbackMessage("Preencha os dados obrigatórios para continuar.");
      return;
    }

    dispatch({
      type: "SET_PAYMENT_STATUS",
      payload: {
        paymentStatus: "processing",
      },
    });

    setFeedbackMessage("Enviando solicitação ao provedor externo...");

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
      channel: state.selectedChannel === "kiosk" ? "kiosk" : "customer-app",
      unitId: state.selectedUnitId,
      customer: state.customer,
      items: state.items,
      couponCode: state.couponCode,
      paymentMethod: state.paymentMethod,
      totals,
      estimatedTimeInMinutes: selectedUnit.estimatedTimeInMinutes ?? 20,
    });

    dispatch({
      type: "CONFIRM_ORDER",
      payload: {
        order,
      },
    });

    navigate("/app/confirmacao");
  }

  if (!hasItems) {
    return <Navigate replace to="/app/carrinho" />;
  }

  if (!state.customer) {
    return <Navigate replace to="/app/identificacao" />;
  }

  return (
    <main>
      <PageHeader
        eyebrow="Pagamento"
        title="Finalize seu pedido"
        description="Escolha uma forma de pagamento, aceite o aviso de privacidade e simule o processamento externo."
      />

      <section className={styles.layout}>
        <div className={styles.mainColumn}>
          <Card className={styles.paymentCard} elevated>
            <div className={styles.cardTitle}>
              <h2>Forma de pagamento</h2>
              <Badge variant="primary">Simulado</Badge>
            </div>

            <div className={styles.paymentOptions}>
              {paymentOptions.map((option) => {
                const isSelected = state.paymentMethod === option.value;

                return (
                  <button
                    className={`${styles.paymentOption} ${isSelected ? styles.selected : ""
                      }`}
                    key={option.value}
                    onClick={() => handleSelectPaymentMethod(option.value)}
                    type="button"
                  >
                    <span className={styles.optionIcon} aria-hidden="true">
                      {option.icon}
                    </span>

                    <span>
                      <strong>{option.label}</strong>
                      <small>{option.description}</small>
                    </span>
                  </button>
                );
              })}
            </div>
          </Card>

          <ConsentBox
            checked={state.lgpdConsentAccepted}
            onChange={handleConsentChange}
          />

          <Card className={styles.simulationCard}>
            <h2>Simulação do retorno externo</h2>

            <p>
              Para fins acadêmicos, os botões abaixo simulam o retorno do
              provedor externo de pagamento.
            </p>

            {feedbackMessage ? (
              <p className={styles.feedback}>{feedbackMessage}</p>
            ) : null}

            <div className={styles.actions}>
              <Button
                disabled={isProcessing}
                fullWidth
                onClick={() => handlePayment(true)}
                size="lg"
              >
                {isProcessing ? "Processando..." : "Simular pagamento aprovado"}
              </Button>

              <Button
                disabled={isProcessing}
                fullWidth
                onClick={() => handlePayment(false)}
                size="lg"
                variant="secondary"
              >
                Simular pagamento recusado
              </Button>
            </div>
          </Card>
        </div>

        <aside className={styles.sidebar}>
          <Card className={styles.orderInfo}>
            <h2>Resumo do pedido</h2>

            <dl>
              <div>
                <dt>Unidade</dt>
                <dd>{selectedUnit?.name ?? "Não selecionada"}</dd>
              </div>

              <div>
                <dt>Cliente</dt>
                <dd>{state.customer.name}</dd>
              </div>

              <div>
                <dt>Itens</dt>
                <dd>{state.items.length}</dd>
              </div>
            </dl>
          </Card>

          <CartSummary totals={totals} />
        </aside>
      </section>
    </main>
  );
}