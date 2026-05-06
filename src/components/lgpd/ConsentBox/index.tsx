import { Link } from "react-router-dom";

import styles from "./styles.module.css";

type ConsentBoxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function ConsentBox({ checked, onChange }: ConsentBoxProps) {
  return (
    <section className={styles.box} aria-labelledby="lgpd-title">
      <div>
        <h2 id="lgpd-title">Aviso de privacidade</h2>

        <p>
          Usamos seus dados apenas para identificar o pedido, calcular benefícios
          de fidelidade e permitir o acompanhamento do status. Nenhum pagamento
          real será processado neste protótipo.
        </p>
      </div>

      <label className={styles.checkbox}>
        <input
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          type="checkbox"
        />
        <span>Li e aceito o uso dos dados para processamento do pedido.</span>
      </label>

      <Link className={styles.link} to="/privacidade">
        Ver política de privacidade
      </Link>
    </section>
  );
}