export type CustomerMode = "identified" | "guest";

export type Customer = {
  mode: CustomerMode;
  name: string;
  email: string;
};