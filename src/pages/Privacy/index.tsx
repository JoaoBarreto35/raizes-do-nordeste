import { Link } from "react-router-dom";

import { PageHeader } from "../../components/layout/PageHeader";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";

import styles from "./styles.module.css";

type DataUsageItem = {
  data: string;
  usage: string;
};

const dataUsageItems: DataUsageItem[] = [
  {
    data: "Nome",
    usage: "Identificar o cliente no pedido e no programa de fidelidade.",
  },
  {
    data: "E-mail",
    usage: "Simular login, cadastro e vínculo com benefícios de fidelidade.",
  },
  {
    data: "Unidade selecionada",
    usage: "Definir cardápio disponível e local de retirada do pedido.",
  },
  {
    data: "Itens do pedido",
    usage: "Preparar o pedido, calcular valores e acompanhar status.",
  },
  {
    data: "Forma de pagamento",
    usage: "Simular o envio para um provedor externo de pagamento.",
  },
  {
    data: "Status do pedido",
    usage: "Permitir acompanhamento pelo cliente e operação interna.",
  },
];

export function Privacy() {
  return (
    <main>
      <PageHeader
        eyebrow="LGPD"
        title="Política de Privacidade"
        description="Entenda como os dados são usados neste protótipo acadêmico da Rede Raízes do Nordeste."
        rightSlot={
          <Link to="/canal">
            <Button variant="secondary">Voltar aos canais</Button>
          </Link>
        }
      />

      <section className={styles.layout}>
        <Card className={styles.introCard} elevated>
          <div className={styles.cardHeader}>
            <span className={styles.icon} aria-hidden="true">
              🔒
            </span>

            <Badge variant="primary">Protótipo acadêmico</Badge>
          </div>

          <h2>Transparência no uso dos dados</h2>

          <p>
            A aplicação Raízes do Nordeste foi desenvolvida como um protótipo
            front-end para demonstrar fluxos de pedido, fidelidade, pagamento
            simulado e acompanhamento de status.
          </p>

          <p>
            Nenhum pagamento real é processado. A aplicação não solicita dados
            bancários verdadeiros e não utiliza banco de dados real para
            armazenamento definitivo das informações.
          </p>
        </Card>

        <Card className={styles.sectionCard}>
          <h2>Quais dados aparecem no fluxo?</h2>

          <div className={styles.dataGrid}>
            {dataUsageItems.map((item) => (
              <article className={styles.dataItem} key={item.data}>
                <strong>{item.data}</strong>
                <p>{item.usage}</p>
              </article>
            ))}
          </div>
        </Card>

        <Card className={styles.sectionCard}>
          <h2>Finalidade do uso</h2>

          <p>
            Os dados utilizados no protótipo servem apenas para representar o
            funcionamento de um sistema real de pedidos. Eles ajudam a simular a
            identificação do cliente, o cálculo de pontos, a montagem do pedido,
            o processamento visual do pagamento e o acompanhamento do status.
          </p>

          <p>
            A interface informa o uso dos dados antes da finalização do pedido e
            solicita consentimento para prosseguir. Essa decisão demonstra a
            aplicação de privacidade dentro do próprio fluxo de uso.
          </p>
        </Card>

        <Card className={styles.sectionCard}>
          <h2>Consentimento</h2>

          <p>
            Antes do pagamento, o usuário visualiza um aviso de privacidade e
            precisa marcar o aceite para finalizar o pedido. Caso o aceite não
            seja marcado, a aplicação bloqueia ou orienta a finalização.
          </p>

          <p>
            No Totem de Autoatendimento, o aviso é apresentado de forma mais
            objetiva, mantendo a clareza necessária para o contexto presencial.
          </p>
        </Card>

        <Card className={styles.sectionCard}>
          <h2>Limitações do protótipo</h2>

          <ul>
            <li>Não há pagamento real.</li>
            <li>Não há armazenamento definitivo em banco de dados.</li>
            <li>Não há autenticação real.</li>
            <li>Os dados são utilizados apenas para simulação acadêmica.</li>
            <li>As informações podem ser perdidas ao recarregar a página.</li>
          </ul>
        </Card>

        <div className={styles.actions}>
          <Link to="/canal">
            <Button size="lg">Escolher canal</Button>
          </Link>

          <Link to="/app/pagamento">
            <Button size="lg" variant="secondary">
              Voltar ao pagamento
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}