import { units } from "../../data/units";
import type { Unit } from "./unitTypes";

export function findUnitById(unitId: string): Unit | null {
  return units.find((unit) => unit.id === unitId) ?? null;
}