import type { MenuItem } from "../../../domain/menu/menuTypes";
import { formatCurrency } from "../../../domain/order/orderFormatters";
import { Badge } from "../../ui/Badge";
import { Button } from "../../ui/Button";

import styles from "./styles.module.css";

type ProductCardProps = {
  product: MenuItem;
  quantityInCart: number;
  onAdd: (product: MenuItem) => void;
};

export function ProductCard({
  product,
  quantityInCart,
  onAdd,
}: ProductCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.emoji} aria-hidden="true">
        {product.imageEmoji}
      </div>

      <div className={styles.content}>
        <div className={styles.titleRow}>
          <h2>{product.name}</h2>

          {product.available ? (
            <Badge variant="success">Disponível</Badge>
          ) : (
            <Badge variant="error">Indisponível</Badge>
          )}
        </div>

        <p>{product.description}</p>

        <div className={styles.footer}>
          <div>
            <strong>{formatCurrency(product.priceInCents)}</strong>
            <span>{product.loyaltyPoints} pontos</span>
          </div>

          <Button
            disabled={!product.available}
            onClick={() => onAdd(product)}
            size="sm"
            variant={product.available ? "primary" : "ghost"}
          >
            {quantityInCart > 0 ? `+ Adicionar (${quantityInCart})` : "+ Adicionar"}
          </Button>
        </div>
      </div>
    </article>
  );
}