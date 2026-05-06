import type { OrderStatus } from "./orderTypes";

export function getOrderStatusLabel(status: OrderStatus): string {
  const statusLabels: Record<OrderStatus, string> = {
    received: "Recebido",
    preparing: "Em preparo",
    ready: "Pronto para retirada",
    finished: "Finalizado",
  };

  return statusLabels[status];
}

export function getNextOrderStatusLabel(status: OrderStatus): string {
  const nextStatusLabels: Record<OrderStatus, string> = {
    received: "Iniciar preparo",
    preparing: "Marcar como pronto",
    ready: "Finalizar pedido",
    finished: "Pedido finalizado",
  };

  return nextStatusLabels[status];
}