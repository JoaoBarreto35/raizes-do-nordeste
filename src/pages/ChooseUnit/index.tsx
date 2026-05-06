import { useNavigate } from "react-router-dom";

import { PageHeader } from "../../components/layout/PageHeader";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { units } from "../../data/units";
import { useOrder } from "../../app/providers/OrderProvider";

import styles from "./styles.module.css";

export function ChooseUnit() {
  const navigate = useNavigate();
  const { state, dispatch } = useOrder();

  function handleSelectUnit(unitId: string) {
    dispatch({
      type: "SELECT_UNIT",
      payload: {
        unitId,
      },
    });

    navigate("/app/cardapio");
  }

  return (
    <main>
      <PageHeader
        eyebrow="Unidade"
        title="Escolha onde deseja pedir"
        description="A unidade selecionada define quais produtos estarão disponíveis no cardápio."
      />

      <section className={styles.grid}>
        {units.map((unit) => {
          const isSelected = state.selectedUnitId === unit.id;
          const isOpen = unit.status === "open";

          return (
            <Card
              className={`${styles.unitCard} ${isSelected ? styles.selected : ""}`}
              elevated={isSelected}
              key={unit.id}
            >
              <div className={styles.cardHeader}>
                <div>
                  <h2>{unit.name}</h2>
                  <p>{unit.neighborhood}</p>
                </div>

                {isOpen ? (
                  <Badge variant="success">Aberta</Badge>
                ) : (
                  <Badge variant="error">Fechada</Badge>
                )}
              </div>

              <p className={styles.address}>{unit.address}</p>

              <p className={styles.time}>
                {unit.estimatedTimeInMinutes
                  ? `Retirada estimada em ${unit.estimatedTimeInMinutes} minutos`
                  : "Indisponível no momento"}
              </p>

              <Button
                disabled={!isOpen}
                fullWidth
                onClick={() => handleSelectUnit(unit.id)}
                variant={isOpen ? "primary" : "ghost"}
              >
                {isOpen ? "Escolher unidade" : "Unidade fechada"}
              </Button>
            </Card>
          );
        })}
      </section>
    </main>
  );
}