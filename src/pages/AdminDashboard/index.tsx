import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  adminRoleOptions,
  canRoleAdvanceOrder,
  canRoleViewManagementInfo,
  type AdminRole,
} from "../../domain/admin/adminTypes";
import { useOrder } from "../../app/providers/OrderProvider";
import { PageHeader } from "../../components/layout/PageHeader";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { EmptyState } from "../../components/ui/EmptyState";
import { units } from "../../data/units";
import { formatCurrency } from "../../domain/order/orderFormatters";
import {
  getNextOrderStatusLabel,
  getOrderStatusLabel,
} from "../../domain/order/orderStatusHelpers";
import type { ConfirmedOrder, OrderStatus } from "../../domain/order/orderTypes";

import styles from "./styles.module.css";

type StatusFilter = OrderStatus | "all";

type StatusFilterOption = {
  value: StatusFilter;
  label: string;
};

const statusFilters: StatusFilterOption[] = [
  { value: "all", label: "Todos" },
  { value: "received", label: "Recebidos" },
  { value: "preparing", label: "Em preparo" },
  { value: "ready", label: "Prontos" },
  { value: "finished", label: "Finalizados" },
];

function getChannelLabel(channel: ConfirmedOrder["channel"]): string {
  const channelLabels: Record<ConfirmedOrder["channel"], string> = {
    "customer-app": "App Cliente",
    kiosk: "Totem",
  };

  return channelLabels[channel];
}

function getStatusBadgeVariant(status: OrderStatus) {
  const variantMap: Record<OrderStatus, "primary" | "warning" | "success" | "neutral"> = {
    received: "primary",
    preparing: "warning",
    ready: "success",
    finished: "neutral",
  };

  return variantMap[status];
}

export function AdminDashboard() {
  const { state, dispatch } = useOrder();
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("all");
  const [selectedRole, setSelectedRole] = useState<AdminRole>("manager");

  const filteredOrders = useMemo(() => {
    if (selectedStatus === "all") {
      return state.confirmedOrders;
    }

    return state.confirmedOrders.filter((order) => order.status === selectedStatus);
  }, [selectedStatus, state.confirmedOrders]);

  const totalOrders = state.confirmedOrders.length;

  const receivedCount = state.confirmedOrders.filter(
    (order) => order.status === "received"
  ).length;

  const preparingCount = state.confirmedOrders.filter(
    (order) => order.status === "preparing"
  ).length;

  const readyCount = state.confirmedOrders.filter(
    (order) => order.status === "ready"
  ).length;

  const canAdvanceOrder = canRoleAdvanceOrder(selectedRole);
  const canViewManagementInfo = canRoleViewManagementInfo(selectedRole);
  function handleAdvanceStatus(orderId: string) {
    dispatch({
      type: "ADVANCE_ORDER_STATUS",
      payload: {
        orderId,
      },
    });
  }

  function getUnitName(unitId: string): string {
    return units.find((unit) => unit.id === unitId)?.name ?? "Unidade não encontrada";
  }

  return (
    <main>
      <PageHeader
        eyebrow="Painel Web/Admin"
        title="Operação de pedidos"
        description="Acompanhe pedidos recebidos pelo App Cliente e pelo Totem, visualize detalhes e atualize o status operacional."
        rightSlot={
          <Link to="/canal">
            <Button variant="secondary">Trocar canal</Button>
          </Link>
        }
      />
      <Card className={styles.simulationNotice}>
        <div>
          <h2>Ambiente interno simulado</h2>
          <p>
            Este painel representa o acesso de funcionários da operação. Como o
            projeto é um protótipo front-end com dados mockados, não há autenticação
            real. Em uma aplicação real, esta área seria protegida por login e
            permissões por perfil.
          </p>
        </div>

        <div className={styles.roleSelector}>
          <span>Perfil simulado</span>

          <div className={styles.roleButtons}>
            {adminRoleOptions.map((role) => (
              <button
                className={`${styles.roleButton} ${selectedRole === role.value ? styles.activeRole : ""
                  }`}
                key={role.value}
                onClick={() => setSelectedRole(role.value)}
                type="button"
              >
                <strong>{role.label}</strong>
                <small>{role.description}</small>
              </button>
            ))}
          </div>
        </div>
      </Card>


      {canViewManagementInfo ? (
        <section className={styles.metricsGrid} aria-label="Resumo operacional">
          <Card className={styles.metricCard}>
            <span>Total</span>
            <strong>{totalOrders}</strong>
            <p>Pedidos registrados</p>
          </Card>

          <Card className={styles.metricCard}>
            <span>Recebidos</span>
            <strong>{receivedCount}</strong>
            <p>Aguardando preparo</p>
          </Card>

          <Card className={styles.metricCard}>
            <span>Em preparo</span>
            <strong>{preparingCount}</strong>
            <p>Na cozinha</p>
          </Card>

          <Card className={styles.metricCard}>
            <span>Prontos</span>
            <strong>{readyCount}</strong>
            <p>Para retirada</p>
          </Card>
        </section>
      ) : (
        <Card className={styles.limitedRoleCard}>
          <h2>Visão operacional</h2>
          <p>
            O perfil selecionado possui foco na execução dos pedidos. Métricas
            gerenciais completas ficam disponíveis para Gerente/Admin.
          </p>
        </Card>
      )}

      <section className={styles.panel}>
        <div className={styles.panelHeader}>
          <div>
            <h2>Pedidos</h2>
            <p>Filtre por status e atualize o andamento de cada pedido.</p>
          </div>

          <div className={styles.filters} aria-label="Filtros por status">
            {statusFilters.map((filter) => (
              <button
                className={`${styles.filterButton} ${selectedStatus === filter.value ? styles.activeFilter : ""
                  }`}
                key={filter.value}
                onClick={() => setSelectedStatus(filter.value)}
                type="button"
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {filteredOrders.length > 0 ? (
          <div className={styles.ordersList}>
            {filteredOrders.map((order) => (
              <Card className={styles.orderCard} elevated key={order.id}>
                <div className={styles.orderHeader}>
                  <div>
                    <h3>Pedido #{order.orderNumber}</h3>
                    <p>
                      {getChannelLabel(order.channel)} • {getUnitName(order.unitId)}
                    </p>
                  </div>

                  <Badge variant={getStatusBadgeVariant(order.status)}>
                    {getOrderStatusLabel(order.status)}
                  </Badge>
                </div>

                <div className={styles.orderBody}>
                  <div className={styles.orderInfo}>
                    <span>Cliente</span>
                    <strong>{order.customer?.name ?? "Visitante"}</strong>
                  </div>

                  <div className={styles.orderInfo}>
                    <span>Total</span>
                    <strong>{formatCurrency(order.totals.totalInCents)}</strong>
                  </div>

                  <div className={styles.orderInfo}>
                    <span>Previsão</span>
                    <strong>{order.estimatedTimeInMinutes} min</strong>
                  </div>
                </div>

                <div className={styles.itemsBox}>
                  <strong>Itens</strong>

                  <ul>
                    {order.items.map((item) => (
                      <li key={item.product.id}>
                        <span>
                          {item.quantity}x {item.product.name}
                        </span>
                        <span>{item.product.imageEmoji}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.orderActions}>
                  <Button
                    disabled={order.status === "finished" || !canAdvanceOrder}
                    onClick={() => handleAdvanceStatus(order.id)}
                    variant={order.status === "finished" || !canAdvanceOrder ? "ghost" : "primary"}
                  >
                    {canAdvanceOrder
                      ? getNextOrderStatusLabel(order.status)
                      : "Sem permissão"}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            description="Nenhum pedido foi encontrado para o filtro selecionado."
            icon="📋"
            title="Sem pedidos neste status"
          />
        )}
      </section>
    </main>
  );
}