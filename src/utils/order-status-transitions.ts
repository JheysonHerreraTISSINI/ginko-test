import axios from 'axios'
import { statusLabels } from '@/constants/order.constant'
import type { PaymentOrderStatus } from '@/types/payment-order'

type TransitionButtonType = 'primary' | 'danger' | 'success'

/** Estados a los que se puede transicionar (nunca BORRADOR). */
export type TransitionTargetStatus = Exclude<PaymentOrderStatus, 'BORRADOR'>

interface OrderTransitionAction {
  targetStatus: TransitionTargetStatus
  label: string
  buttonType: TransitionButtonType
}

const ALLOWED_TARGETS: Record<PaymentOrderStatus, TransitionTargetStatus[]> = {
  BORRADOR: ['APROBADA', 'RECHAZADA'],
  APROBADA: ['PAGADA'],
  RECHAZADA: [],
  PAGADA: [],
}

const ACTION_META: Record<
  TransitionTargetStatus,
  { label: string; buttonType: TransitionButtonType }
> = {
  APROBADA: { label: 'Aprobar orden', buttonType: 'primary' },
  RECHAZADA: { label: 'Rechazar orden', buttonType: 'danger' },
  PAGADA: { label: 'Marcar como pagada', buttonType: 'success' },
}

export function canTransitionTo(
  from: PaymentOrderStatus,
  to: TransitionTargetStatus,
): boolean {
  return ALLOWED_TARGETS[from].includes(to)
}

export function getAllowedTransitions(
  status: PaymentOrderStatus,
): OrderTransitionAction[] {
  return ALLOWED_TARGETS[status].map((targetStatus) => ({
    targetStatus,
    label: ACTION_META[targetStatus].label,
    buttonType: ACTION_META[targetStatus].buttonType,
  }))
}

export function transitionSuccessMessage(
  targetStatus: PaymentOrderStatus,
): string {
  return `Orden marcada como ${statusLabels[targetStatus].toLowerCase()}`
}

const CONFIRM_VERB: Record<TransitionTargetStatus, string> = {
  APROBADA: 'aprobar',
  RECHAZADA: 'rechazar',
  PAGADA: 'marcar como pagada',
}

export const TRANSITION_ERROR_FALLBACK =
  'No pudimos actualizar el estado de la orden. Intenta de nuevo.'

export function transitionConfirmMessage(
  targetStatus: TransitionTargetStatus,
  proveedor: string,
): string {
  return `¿Confirmas ${CONFIRM_VERB[targetStatus]} la orden de ${proveedor}?`
}

export function getApiErrorMessage(
  error: unknown,
  fallback: string,
): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return 'No pudimos conectar con el servidor. Verifica que la API esté en ejecución.'
    }
    if (error.response.status === 404) {
      return 'La orden ya no existe en el servidor.'
    }
    return fallback
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallback
}