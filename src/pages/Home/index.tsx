import { Link } from "react-router-dom";

import styles from "./styles.module.css";

export function Home() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Rede Raízes do Nordeste</p>

        <h1>Sistema multicanal de pedidos</h1>

        <p className={styles.description}>
          Uma experiência front-end para App Cliente, Totem de Autoatendimento e
          Painel Web/Admin.
        </p>

        <Link className={styles.primaryAction} to="/canal">
          Começar
        </Link>
      </section>
    </main>
  );
}