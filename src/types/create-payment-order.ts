export interface CreatePaymentOrderForm {
  proveedor: string
  monto: number | null
  concepto: string
}

export function emptyCreatePaymentOrderForm(): CreatePaymentOrderForm {
  return {
    proveedor: '',
    monto: null,
    concepto: '',
  }
}
