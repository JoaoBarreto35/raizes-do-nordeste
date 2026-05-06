import { Link } from "react-router-dom";

import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";

import styles from "./styles.module.css";

export function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>Projeto Front-End</p>

          <h1>Raízes do Nordeste</h1>

          <p className={styles.description}>
            Sistema multicanal de pedidos para uma rede de lanchonetes,
            simulando App Cliente, Totem de Autoatendimento e Painel Web/Admin.
          </p>

          <div className={styles.actions}>
            <Link to="/canal">
              <Button size="lg">Começar pedido</Button>
            </Link>

            <Link to="/privacidade">
              <Button size="lg" variant="secondary">
                Ver privacidade
              </Button>
            </Link>
          </div>
        </div>

        <Card className={styles.infoCard} elevated>
          <span className={styles.cardIcon} aria-hidden="true">
            🌵
          </span>

          <h2>Experiência simulada</h2>

          <p>
            Este protótipo utiliza dados mockados para demonstrar cardápio por unidade,
            carrinho, fidelidade, LGPD, pagamento externo simulado, acompanhamento de
            status e painel interno conceitual.
          </p>
        </Card>
      </section>
    </main>
  );
}