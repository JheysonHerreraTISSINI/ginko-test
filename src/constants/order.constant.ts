import type { StatusFilter } from "@/types/payment-order";

export const statusOptions: { value: StatusFilter; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "BORRADOR", label: "Borrador" },
  { value: "APROBADA", label: "Aprobada" },
  { value: "RECHAZADA", label: "Rechazada" },
  { value: "PAGADA", label: "Pagada" },
];
