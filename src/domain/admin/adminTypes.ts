export type AdminRole = "attendant" | "kitchen" | "manager";

export type AdminRoleOption = {
  value: AdminRole;
  label: string;
  description: string;
};

export const adminRoleOptions: AdminRoleOption[] = [
  {
    value: "attendant",
    label: "Atendente",
    description: "Acompanha pedidos e auxilia na entrega ao cliente.",
  },
  {
    value: "kitchen",
    label: "Cozinha",
    description: "Visualiza pedidos e atualiza etapas de preparo.",
  },
  {
    value: "manager",
    label: "Gerente/Admin",
    description: "Acompanha operação, pedidos e visão geral da unidade.",
  },
];

export function canRoleAdvanceOrder(role: AdminRole): boolean {
  return role === "attendant" || role === "kitchen" || role === "manager";
}

export function canRoleViewManagementInfo(role: AdminRole): boolean {
  return role === "manager";
}