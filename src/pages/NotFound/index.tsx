import { Link } from "react-router-dom";

import { PageHeader } from "../../components/layout/PageHeader";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { EmptyState } from "../../components/ui/EmptyState";

import styles from "./styles.module.css";

export function NotFound() {
  return (
    <main className={styles.page}>
      <PageHeader
        eyebrow="Erro 404"
        title="Página não encontrada"
        description="O endereço acessado não corresponde a nenhuma tela da aplicação."
      />

      <EmptyState
        action={
          <Link to="/">
            <Button>Voltar ao início</Button>
          </Link>
        }
        description="Use a navegação principal para retornar a um fluxo válido."
        icon="🧭"
        title="Rota inválida"
      />

      <Card className={styles.quickLinks}>
        <h2>Acessos rápidos</h2>

        <div>
          <Link to="/canal">
            <Button variant="secondary">Escolher canal</Button>
          </Link>

          <Link to="/admin">
            <Button variant="secondary">Painel Admin</Button>
          </Link>

          <Link to="/privacidade">
            <Button variant="secondary">Privacidade</Button>
          </Link>
        </div>
      </Card>
    </main>
  );
}