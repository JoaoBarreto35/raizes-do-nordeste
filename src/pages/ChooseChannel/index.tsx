import { useNavigate } from "react-router-dom";

import { PageHeader } from "../../components/layout/PageHeader";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { useOrder } from "../../app/providers/OrderProvider";
import type { Channel } from "../../domain/order/orderTypes";

import styles from "./styles.module.css";

type ChannelOption = {
  value: Channel;
  title: string;
  description: string;
  icon: string;
  actionLabel: string;
};

const channelOptions: ChannelOption[] = [
  {
    value: "customer-app",
    title: "App Cliente",
    description:
      "Fluxo mobile para escolher unidade, montar pedido, pagar e acompanhar status.",
    icon: "📱",
    actionLabel: "Acessar App",
  },
  {
    value: "kiosk",
    title: "Totem de Autoatendimento",
    description:
      "Experiência presencial simplificada para pedido rápido dentro da unidade.",
    icon: "🧾",
    actionLabel: "Abrir Totem",
  },
  {
    value: "admin",
    title: "Painel Web/Admin",
    description:
      "Visão interna para acompanhar pedidos e atualizar status da operação.",
    icon: "🖥️",
    actionLabel: "Abrir Painel",
  },
];

export function ChooseChannel() {
  const navigate = useNavigate();
  const { dispatch } = useOrder();

  function handleSelectChannel(channel: Channel) {
    dispatch({
      type: "SELECT_CHANNEL",
      payload: {
        channel,
      },
    });

    if (channel === "customer-app") {
      navigate("/unidades");
      return;
    }

    if (channel === "kiosk") {
      navigate("/totem");
      return;
    }

    navigate("/admin");
  }

  return (
    <main>
      <PageHeader
        eyebrow="Multicanalidade"
        title="Escolha o canal de atendimento"
        description="A aplicação demonstra três contextos de uso: cliente no aplicativo, cliente presencial no totem e operação interna no painel web."
      />

      <section className={styles.grid}>
        {channelOptions.map((option) => (
          <Card className={styles.channelCard} elevated key={option.value}>
            <span className={styles.icon} aria-hidden="true">
              {option.icon}
            </span>

            <div className={styles.content}>
              <h2>{option.title}</h2>
              <p>{option.description}</p>
            </div>

            <Button
              fullWidth
              onClick={() => handleSelectChannel(option.value)}
              variant={option.value === "customer-app" ? "primary" : "secondary"}
            >
              {option.actionLabel}
            </Button>
          </Card>
        ))}
      </section>
    </main>
  );
}