export type PaymentOrderStatus = 'BORRADOR' | 'APROBADA' | 'RECHAZADA' | 'PAGADA'
export type StatusFilter = 'todos' | PaymentOrderStatus

export interface PaymentOrder {
  id: string
  proveedor: string
  monto: number
  concepto: string
  fechaCreacion: string
  estado: PaymentOrderStatus
}
