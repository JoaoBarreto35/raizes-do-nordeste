import { useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import { useOrder } from "../../app/providers/OrderProvider";
import { PageHeader } from "../../components/layout/PageHeader";
import { CategoryTabs } from "../../components/menu/CategoryTabs";
import { ProductCard } from "../../components/menu/ProductCard";
import { Button } from "../../components/ui/Button";
import { EmptyState } from "../../components/ui/EmptyState";
import { menuItems } from "../../data/menuItems";
import { units } from "../../data/units";
import type { MenuCategory, MenuItem } from "../../domain/menu/menuTypes";

import styles from "./styles.module.css";

type SelectedCategory = MenuCategory | "all";

export function CustomerMenu() {
  const { state, dispatch } = useOrder();
  const [selectedCategory, setSelectedCategory] =
    useState<SelectedCategory>("all");

  const selectedUnit = units.find((unit) => unit.id === state.selectedUnitId);

  const filteredProducts = useMemo(() => {
    const selectedUnitId = state.selectedUnitId;

    if (!selectedUnitId) {
      return [];
    }

    return menuItems.filter((product) => {
      const belongsToUnit = product.unitIds.includes(selectedUnitId);
      const belongsToCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      return belongsToUnit && belongsToCategory;
    });
  }, [selectedCategory, state.selectedUnitId]);

  const cartItemsCount = state.items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  function getQuantityInCart(productId: string): number {
    return (
      state.items.find((item) => item.product.id === productId)?.quantity ?? 0
    );
  }

  function handleAddProduct(product: MenuItem) {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        product,
      },
    });
  }

  if (!state.selectedUnitId || !selectedUnit) {
    return <Navigate to="/unidades" replace />;
  }

  return (
    <main>
      <PageHeader
        bottomSlot={
          <CategoryTabs
            onSelectCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
        }
        description={`Cardápio disponível para ${selectedUnit.name}. Escolha seus itens e avance para o carrinho.`}
        eyebrow="Cardápio"
        rightSlot={
          <Link to="/app/carrinho">
            <Button variant={cartItemsCount > 0 ? "primary" : "secondary"}>
              Carrinho ({cartItemsCount})
            </Button>
          </Link>
        }
        title="O que você quer comer hoje?"
      />

      {filteredProducts.length > 0 ? (
        <section className={styles.productGrid}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              onAdd={handleAddProduct}
              product={product}
              quantityInCart={getQuantityInCart(product.id)}
            />
          ))}
        </section>
      ) : (
        <EmptyState
          description="Não encontramos produtos para esta categoria na unidade selecionada."
          title="Nenhum produto encontrado"
        />
      )}

      {cartItemsCount > 0 ? (
        <footer className={styles.stickyFooter}>
          <span>
            {cartItemsCount} {cartItemsCount === 1 ? "item" : "itens"} no
            carrinho
          </span>

          <Link to="/app/carrinho">
            <Button>Ver carrinho</Button>
          </Link>
        </footer>
      ) : null}
    </main>
  );
}