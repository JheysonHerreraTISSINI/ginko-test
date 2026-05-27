import type { CreatePaymentOrderForm } from '@/types/create-payment-order'
import type { PaymentOrder } from '@/types/payment-order'

export function buildPaymentOrder(
  form: CreatePaymentOrderForm,
  existingOrders: PaymentOrder[],
): PaymentOrder {
  const usedNumbers = existingOrders
    .map((order) => Number(order.id.replace(/\D/g, '')))
    .filter((num) => !Number.isNaN(num))

  const nextNumber = (usedNumbers.length ? Math.max(...usedNumbers) : 0) + 1

  return {
    id: `ord-${String(nextNumber).padStart(3, '0')}`,
    proveedor: form.proveedor.trim(),
    monto: form.monto as number,
    concepto: form.concepto.trim(),
    fechaCreacion: new Date().toISOString(),
    estado: 'BORRADOR',
  }
}
