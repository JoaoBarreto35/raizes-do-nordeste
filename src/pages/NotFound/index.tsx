import { Link } from "react-router-dom";

import { PageHeader } from "../../components/layout/PageHeader";
import { Button } from "../../components/ui/Button";
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
    </main>
  );
}