import type { PaymentOrder, PaymentOrderStatus, StatusFilter } from '@/types/payment-order'

const VALID_STATUSES: PaymentOrderStatus[] = [
  'BORRADOR',
  'APROBADA',
  'RECHAZADA',
  'PAGADA',
]

export function parseStatusFilter(value: unknown): StatusFilter {
  const raw = Array.isArray(value) ? value[0] : value
  if (typeof raw === 'string' && VALID_STATUSES.includes(raw as PaymentOrderStatus)) {
    return raw as PaymentOrderStatus
  }
  return 'todos'
}

export function parseSearchQuery(value: unknown): string {
  const raw = Array.isArray(value) ? value[0] : value
  return typeof raw === 'string' ? raw : ''
}

/** Filtros en AND: estado y búsqueda por proveedor. */
export function filterOrders(
  orders: PaymentOrder[],
  status: StatusFilter,
  search: string,
): PaymentOrder[] {
  const term = search.trim().toLowerCase()

  return orders.filter((order) => {
    const byStatus = status === 'todos' || order.estado === status
    const byProvider =
      term === '' || order.proveedor.toLowerCase().includes(term)
    return byStatus && byProvider
  })
}
