import { type FormEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useOrder } from "../../app/providers/OrderProvider";
import { PageHeader } from "../../components/layout/PageHeader";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import type { Customer } from "../../domain/customer/customerTypes";

import styles from "./styles.module.css";

type FormErrors = {
  name?: string;
  email?: string;
};

function isValidEmail(email: string): boolean {
  return email.includes("@") && email.includes(".");
}

export function Identification() {
  const navigate = useNavigate();
  const { state, dispatch } = useOrder();

  const [name, setName] = useState(state.customer?.name ?? "");
  const [email, setEmail] = useState(state.customer?.email ?? "");
  const [errors, setErrors] = useState<FormErrors>({});

  const hasItems = state.items.length > 0;

  function validateForm(): FormErrors {
    const validationErrors: FormErrors = {};

    if (!name.trim()) {
      validationErrors.name = "Informe seu nome.";
    }

    if (!email.trim()) {
      validationErrors.email = "Informe seu e-mail.";
    } else if (!isValidEmail(email)) {
      validationErrors.email = "Informe um e-mail válido.";
    }

    return validationErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const customer: Customer = {
      mode: "identified",
      name: name.trim(),
      email: email.trim().toLowerCase(),
    };

    dispatch({
      type: "SET_CUSTOMER",
      payload: {
        customer,
      },
    });

    navigate("/app/pagamento");
  }

  function handleContinueAsGuest() {
    dispatch({
      type: "SET_CUSTOMER",
      payload: {
        customer: {
          mode: "guest",
          name: "Visitante",
          email: "",
        },
      },
    });

    navigate("/app/pagamento");
  }

  if (!hasItems) {
    return <Navigate replace to="/app/carrinho" />;
  }

  return (
    <main>
      <PageHeader
        eyebrow="Identificação"
        title="Como deseja continuar?"
        description="Clientes identificados acumulam pontos de fidelidade. Também é possível continuar como visitante."
      />

      <section className={styles.layout}>
        <Card className={styles.formCard} elevated>
          <div>
            <h2>Entrar para acumular pontos</h2>
            <p>
              Use uma identificação simulada para vincular o pedido ao programa
              de fidelidade.
            </p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <Input
              errorMessage={errors.name}
              label="Nome"
              name="name"
              onChange={(event) => {
                setName(event.target.value);
                setErrors((currentErrors) => {
                  const nextErrors = { ...currentErrors };
                  delete nextErrors.name;
                  return nextErrors;
                });
              }}
              placeholder="Ex: João"
              value={name}
            />

            <Input
              errorMessage={errors.email}
              label="E-mail"
              name="email"
              onChange={(event) => {
                setEmail(event.target.value);
                setErrors((currentErrors) => {
                  const nextErrors = { ...currentErrors };
                  delete nextErrors.email;
                  return nextErrors;
                });
              }}
              placeholder="Ex: joao@email.com"
              type="email"
              value={email}
            />

            <Button fullWidth size="lg" type="submit">
              Continuar identificado
            </Button>
          </form>
        </Card>

        <Card className={styles.guestCard}>
          <span className={styles.guestIcon} aria-hidden="true">
            🧾
          </span>

          <h2>Continuar como visitante</h2>

          <p>
            Visitantes podem finalizar pedidos normalmente, mas não acumulam os
            benefícios completos de fidelidade.
          </p>

          <Button fullWidth onClick={handleContinueAsGuest} variant="secondary">
            Continuar como visitante
          </Button>
        </Card>
      </section>
    </main>
  );
}