import type { PaymentResult } from "../domain/payment/paymentTypes";

type SimulatePaymentParams = {
  shouldApprove: boolean;
};

export async function simulatePayment({
  shouldApprove,
}: SimulatePaymentParams): Promise<PaymentResult> {
  await new Promise((resolve) => window.setTimeout(resolve, 1200));

  if (shouldApprove) {
    return {
      status: "approved",
      message: "Pagamento aprovado com sucesso.",
    };
  }

  return {
    status: "declined",
    message:
      "Pagamento recusado. Verifique os dados ou escolha outra forma de pagamento.",
  };
}