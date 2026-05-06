export type MenuCategory =
  | "combos"
  | "burgers"
  | "drinks"
  | "desserts"
  | "regional";

export type MenuItem = {
  id: string;
  unitIds: string[];
  name: string;
  description: string;
  category: MenuCategory;
  priceInCents: number;
  available: boolean;
  imageEmoji: string;
  loyaltyPoints: number;
};