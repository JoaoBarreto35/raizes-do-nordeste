export type PaymentMethod = "pix" | "card" | "meal-voucher";

export type PaymentStatus = "idle" | "processing" | "approved" | "declined";

export type PaymentResult = {
  status: Exclude<PaymentStatus, "idle" | "processing">;
  message: string;
};