import type { MenuCategory } from "../../../domain/menu/menuTypes";

import styles from "./styles.module.css";

type CategoryOption = {
  value: MenuCategory | "all";
  label: string;
};

const categories: CategoryOption[] = [
  { value: "all", label: "Todos" },
  { value: "combos", label: "Combos" },
  { value: "burgers", label: "Lanches" },
  { value: "drinks", label: "Bebidas" },
  { value: "desserts", label: "Sobremesas" },
  { value: "regional", label: "Regionais" },
];

type CategoryTabsProps = {
  selectedCategory: MenuCategory | "all";
  onSelectCategory: (category: MenuCategory | "all") => void;
};

export function CategoryTabs({
  selectedCategory,
  onSelectCategory,
}: CategoryTabsProps) {
  return (
    <div className={styles.tabs} role="tablist" aria-label="Categorias do cardápio">
      {categories.map((category) => (
        <button
          aria-selected={selectedCategory === category.value}
          className={`${styles.tab} ${selectedCategory === category.value ? styles.active : ""
            }`}
          key={category.value}
          onClick={() => onSelectCategory(category.value)}
          role="tab"
          type="button"
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}