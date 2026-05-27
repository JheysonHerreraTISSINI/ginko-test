import type { PaymentOrderStatus, StatusFilter } from '@/types/payment-order'

export const statusOptions: { value: StatusFilter; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'BORRADOR', label: 'Borrador' },
  { value: 'APROBADA', label: 'Aprobada' },
  { value: 'RECHAZADA', label: 'Rechazada' },
  { value: 'PAGADA', label: 'Pagada' },
]

export const statusLabels: Record<PaymentOrderStatus, string> = {
  BORRADOR: 'Borrador',
  APROBADA: 'Aprobada',
  RECHAZADA: 'Rechazada',
  PAGADA: 'Pagada',
}

export const statusTagTypes: Record<
  PaymentOrderStatus,
  'info' | 'primary' | 'danger' | 'success'
> = {
  BORRADOR: 'info',
  APROBADA: 'primary',
  RECHAZADA: 'danger',
  PAGADA: 'success',
}

export const MAX_CONCEPT_LENGTH = 250
