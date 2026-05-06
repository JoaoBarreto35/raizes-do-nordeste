import type { Unit } from "../domain/unit/unitTypes";

export const units: Unit[] = [
  {
    id: "centro",
    name: "Unidade Centro",
    neighborhood: "Centro",
    address: "Rua das Palmeiras, 120",
    status: "open",
    estimatedTimeInMinutes: 20,
  },
  {
    id: "shopping",
    name: "Unidade Shopping",
    neighborhood: "Shopping Vale",
    address: "Av. Principal, 1500",
    status: "open",
    estimatedTimeInMinutes: 25,
  },
  {
    id: "rodoviaria",
    name: "Unidade Rodoviária",
    neighborhood: "Rodoviária",
    address: "Praça dos Viajantes, 45",
    status: "closed",
    estimatedTimeInMinutes: null,
  },
];