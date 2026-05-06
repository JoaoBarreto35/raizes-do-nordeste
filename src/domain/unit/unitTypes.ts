export type UnitStatus = "open" | "closed";

export type Unit = {
  id: string;
  name: string;
  neighborhood: string;
  address: string;
  status: UnitStatus;
  estimatedTimeInMinutes: number | null;
};